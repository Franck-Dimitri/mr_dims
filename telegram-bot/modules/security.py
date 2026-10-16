import subprocess
import shutil
import html
import time
from pathlib import Path
from config import PROJECT_PATH, ENABLE_ARBITRARY_SHELL, SHELL_TIMEOUT

def run_shell_command(cmd_str: str, timeout: int = None):
    """
    Exécute une commande shell arbitraire sur le VPS pour l'administrateur autorisé.
    Retourne (success, formatted_output, is_truncated, full_raw_output).
    """
    if not ENABLE_ARBITRARY_SHELL:
        return False, "⚠️ L'exécution shell arbitraire est désactivée dans la configuration (`ENABLE_ARBITRARY_SHELL=false`).", False, ""

    if not cmd_str or not cmd_str.strip():
        return False, "⚠️ Commande vide.", False, ""

    actual_timeout = timeout or SHELL_TIMEOUT
    start_time = time.time()

    try:
        process = subprocess.run(
            cmd_str,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            timeout=actual_timeout
        )
        elapsed = round(time.time() - start_time, 2)
        raw_output = process.stdout.strip()
        returncode = process.returncode

        if not raw_output:
            raw_output = f"(Commande exécutée avec succès en {elapsed}s, aucune sortie texte)"

        is_truncated = len(raw_output) > 3500
        preview = raw_output[:3500] + ("\n\n... [Sortie tronquée : fichier complet joint ci-dessous]" if is_truncated else "")

        status_emoji = "✅" if returncode == 0 else "❌"
        formatted = (
            f"{status_emoji} <b>Code {returncode}</b> <i>({elapsed}s)</i>\n"
            f"<pre>{html.escape(preview)}</pre>"
        )
        return (returncode == 0), formatted, is_truncated, raw_output

    except subprocess.TimeoutExpired:
        elapsed = round(time.time() - start_time, 2)
        return False, f"⏱️ <b>Délai d'attente dépassé ({actual_timeout}s)</b> pour la commande :\n<code>{html.escape(cmd_str)}</code>", False, ""
    except Exception as e:
        return False, f"❌ <b>Erreur d'exécution :</b> {html.escape(str(e))}", False, ""


def get_recent_ssh_logins(count: int = 5) -> str:
    """
    Récupère les dernières connexions SSH réussies (via `last` ou `journalctl`).
    """
    if shutil.which("last"):
        try:
            res = subprocess.run(["last", "-n", str(count)], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            output = res.stdout.strip()
            if output:
                return output
        except Exception:
            pass

    try:
        cmd = f"journalctl -u ssh -n {count} --no-pager | grep 'Accepted '"
        res = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
        output = res.stdout.strip()
        if output:
            return output
    except Exception:
        pass

    return "Aucune connexion récente trouvée"


def get_ssh_audit() -> str:
    """
    Audit complet des sessions SSH actives et dernières connexions.
    """
    # 1. Sessions actives
    try:
        res_who = subprocess.run(["who"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
        active_sessions = res_who.stdout.strip() or "Aucune session active actuellement."
    except Exception as e:
        active_sessions = f"Erreur who: {e}"

    # 2. Historique récent
    recent = get_recent_ssh_logins(5)

    msg = (
        f"🔑 <b>Audit des Accès SSH</b>\n\n"
        f"🟢 <b>Sessions actives (who) :</b>\n<pre>{html.escape(active_sessions)}</pre>\n"
        f"📜 <b>Dernières connexions :</b>\n<pre>{html.escape(recent)}</pre>"
    )
    return msg


def get_ufw_status() -> str:
    """
    Audit du pare-feu UFW.
    """
    try:
        # Essayer avec sudo d'abord
        res = subprocess.run(["sudo", "ufw", "status", "numbered"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
        output = res.stdout.strip()
        if res.returncode == 0 and output:
            return output
        
        # Fallback sans sudo
        res_fallback = subprocess.run(["ufw", "status"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
        output_fb = res_fallback.stdout.strip() or res_fallback.stderr.strip()
        if output_fb:
            return output_fb
    except Exception as e:
        return f"Erreur UFW: {e}"

    return "Impossible de récupérer le statut UFW (vérifiez les droits sudo)"


def get_fail2ban_status() -> str:
    """
    Audit Fail2ban : liste des prisons actives et IPs bannies.
    """
    try:
        res = subprocess.run(["sudo", "fail2ban-client", "status"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
        if res.returncode != 0:
            err = res.stderr.strip() or "Erreur d'accès fail2ban-client"
            return f"Fail2ban indisponible : {err}"

        output = res.stdout.strip()
        jails = []
        for line in output.splitlines():
            if "Jail list:" in line:
                jails_raw = line.split("Jail list:")[-1].strip()
                jails = [j.strip() for j in jails_raw.split(",") if j.strip()]

        if not jails:
            return "Aucune prison (jail) Fail2ban active."

        details = []
        for jail in jails:
            res_jail = subprocess.run(["sudo", "fail2ban-client", "status", jail], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            if res_jail.returncode == 0:
                out_j = res_jail.stdout
                currently_banned = "0"
                banned_list = ""
                for l in out_j.splitlines():
                    if "Currently banned:" in l:
                        currently_banned = l.split("Currently banned:")[-1].strip()
                    if "Banned IP list:" in l:
                        banned_list = l.split("Banned IP list:")[-1].strip()
                details.append(f"• <b>{html.escape(jail)}</b> : {currently_banned} IP(s) bannie(s)" + (f" (<code>{html.escape(banned_list)}</code>)" if banned_list else ""))
            else:
                details.append(f"• <b>{html.escape(jail)}</b> : Actif")

        return "\n".join(details)
    except Exception as e:
        return f"Erreur Fail2ban : {e}"


def get_listening_ports() -> str:
    """
    Liste les ports en écoute sur le VPS (ss -tulpn).
    """
    try:
        cmd = "ss -tulpn 2>/dev/null | grep LISTEN | awk '{print $1, $5, $7}' | head -n 12"
        res = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
        out = res.stdout.strip()
        if out:
            return out
    except Exception:
        pass
    return "Aucune information de port disponible"


def get_pending_updates() -> str:
    """
    Vérifie si des mises à jour système sont disponibles (Debian/Ubuntu).
    """
    try:
        cmd = "apt list --upgradable 2>/dev/null | grep -v 'Listing...' | head -n 10"
        res = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=10)
        out = res.stdout.strip()
        if not out:
            return "✅ Système à jour (aucune mise à jour en attente)"
        lines = out.splitlines()
        return f"📦 <b>{len(lines)} mise(s) à jour disponible(s) :</b>\n<pre>{html.escape(out[:1000])}</pre>"
    except Exception as e:
        return f"Vérification mises à jour impossible : {e}"


def get_full_security_audit() -> str:
    """
    Génère un rapport de sécurité et d'audit complet prêt pour Telegram.
    """
    ssh_info = get_ssh_audit()
    ufw_info = get_ufw_status()
    f2b_info = get_fail2ban_status()
    ports_info = get_listening_ports()
    updates_info = get_pending_updates()

    report = (
        f"🛡️ <b>[RAPPORT D'AUDIT SÉCURITÉ DU VPS]</b>\n\n"
        f"{ssh_info}\n\n"
        f"🧱 <b>Pare-feu UFW :</b>\n<pre>{html.escape(ufw_info[:600])}</pre>\n\n"
        f"🚨 <b>Fail2ban :</b>\n{f2b_info}\n\n"
        f"🔌 <b>Ports en écoute (LISTEN) :</b>\n<pre>{html.escape(ports_info[:600])}</pre>\n\n"
        f"{updates_info}"
    )
    return report


def execute_whitelisted_command(action, service_name=None):
    """
    Exécute des commandes d'administration courantes.
    """
    allowed_services = ["nginx", "mysql", "mariadb", "php8.2-fpm", "php8.3-fpm", "redis", "docker", "fail2ban"]

    if action == "restart_service":
        if not service_name or service_name not in allowed_services:
            return False, f"⚠️ Spécifiez un service valide : <code>/restart nginx</code>, <code>mysql</code>, <code>docker</code>..."
        cmd = ["sudo", "systemctl", "restart", service_name]

    elif action == "clear_laravel_cache":
        if not PROJECT_PATH.exists():
            return False, f"Dossier du projet {PROJECT_PATH} introuvable."
        cmd = ["php", str(PROJECT_PATH / "artisan"), "optimize:clear"]

    else:
        return False, "Action inconnue ou non autorisée."

    try:
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=30)
        if res.returncode == 0:
            output = res.stdout.strip() or "Service redémarré avec succès."
            return True, output
        else:
            return False, f"Erreur d'exécution: {res.stderr.strip() or res.stdout.strip()}"
    except Exception as e:
        return False, f"Exception: {str(e)}"


def get_service_logs(service_name=None, lines=25):
    """
    Récupère les derniers logs pour un service donné (/logs laravel, /logs nginx, /logs syslog, etc.).
    """
    if not service_name:
        return "⚠️ <b>Spécifiez un service :</b> <code>/logs laravel</code>, <code>/logs nginx</code>, <code>/logs syslog</code>..."

    service_name = service_name.lower().strip()

    if service_name in ["laravel", "app"]:
        log_file = PROJECT_PATH / "storage" / "logs" / "laravel.log"
        if not log_file.exists():
            return f"📝 <b>Logs <code>laravel</code> :</b>\n<pre>-- Fichier storage/logs/laravel.log introuvable --</pre>"
        try:
            res = subprocess.run(["tail", "-n", str(lines), str(log_file)], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            content = res.stdout.strip() or "-- Aucun log enregistré --"
            safe_content = html.escape(content[-3500:])
            return f"📝 <b>Derniers logs <code>laravel</code> :</b>\n<pre>{safe_content}</pre>"
        except Exception as e:
            return f"Erreur de lecture : {html.escape(str(e))}"

    elif service_name == "nginx":
        log_file = Path("/var/log/nginx/error.log")
        if not log_file.exists():
            return f"📝 <b>Logs <code>nginx</code> :</b>\n<pre>-- /var/log/nginx/error.log introuvable --</pre>"
        try:
            res = subprocess.run(["tail", "-n", str(lines), str(log_file)], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            content = res.stdout.strip() or "-- Fichier error.log vide --"
            safe_content = html.escape(content[-3500:])
            return f"📝 <b>Derniers logs <code>nginx (error.log)</code> :</b>\n<pre>{safe_content}</pre>"
        except Exception as e:
            return f"Erreur de lecture : {html.escape(str(e))}"

    else:
        try:
            cmd = f"journalctl -u {service_name} -n {lines} --no-pager"
            res = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            content = res.stdout.strip() or "-- Aucune entrée journalctl --"
            safe_content = html.escape(content[-3500:])
            return f"📝 <b>Derniers logs <code>{service_name}</code> :</b>\n<pre>{safe_content}</pre>"
        except Exception as e:
            return f"Erreur de lecture pour <code>{service_name}</code> : {html.escape(str(e))}"

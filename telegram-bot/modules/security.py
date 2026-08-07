import subprocess
import shutil
import html
from pathlib import Path
from config import PROJECT_PATH

def execute_whitelisted_command(action, service_name=None):
    """
    Exécute uniquement des commandes d'administration autorisées sans risque d'injection.
    """
    allowed_services = ["nginx", "mysql", "php8.2-fpm", "php8.3-fpm", "redis", "supervisor"]

    if action == "restart_service":
        if not service_name or service_name not in allowed_services:
            return False, f"⚠️ Spécifiez un service valide : <code>/restart nginx</code> ou <code>/restart mysql</code> ou <code>/restart php8.2-fpm</code>"
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

def get_ssh_audit():
    """
    Audit complet des sessions SSH actives et dernières connexions (Format HTML Sécurisé).
    """
    # 1. Sessions SSH actives
    try:
        res_who = subprocess.run(["who"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
        active_sessions = res_who.stdout.strip()
        if not active_sessions:
            active_str = "Aucune session SSH active"
        else:
            active_str = active_sessions
    except Exception as e:
        active_str = f"Erreur vérification who: {e}"

    # 2. Dernières connexions via `last` ou `journalctl`
    last_str = ""
    if shutil.which("last"):
        try:
            res_last = subprocess.run(["last", "-n", "5"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            last_str = res_last.stdout.strip()
        except Exception:
            pass

    if not last_str:
        try:
            cmd = "journalctl -u ssh -n 5 --no-pager | grep 'Accepted '"
            res_journal = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            last_str = res_journal.stdout.strip()
        except Exception:
            pass

    if not last_str:
        last_str = "Aucune entrée récente disponible"

    active_safe = html.escape(active_str)
    last_safe = html.escape(last_str)

    msg = (
        f"🔑 <b>Audit des Connexions SSH</b>\n\n"
        f"🟢 <b>Sessions SSH actives :</b>\n<code>{active_safe}</code>\n\n"
        f"📜 <b>Dernières connexions :</b>\n<pre>{last_safe}</pre>"
    )
    return msg

def get_service_logs(service_name=None, lines=20):
    """
    Récupère les derniers logs pour un service donné (/logs laravel, /logs nginx, /logs syslog).
    """
    if not service_name:
        return "⚠️ <b>Spécifiez un service :</b> <code>/logs laravel</code> <b>ou</b> <code>/logs nginx</code> <b>ou</b> <code>/logs syslog</code>"

    service_name = service_name.lower().strip()

    if service_name in ["laravel", "app"]:
        log_file = PROJECT_PATH / "storage" / "logs" / "laravel.log"
        if not log_file.exists():
            return f"📝 <b>Derniers logs pour <code>{service_name}</code> :</b>\n<pre>-- Fichier laravel.log introuvable --</pre>"
        try:
            res = subprocess.run(["tail", "-n", str(lines), str(log_file)], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            content = res.stdout.strip() or "-- Aucun log enregistré --"
            safe_content = html.escape(content[-3500:])
            return f"📝 <b>Derniers logs pour <code>laravel</code> :</b>\n<pre>{safe_content}</pre>"
        except Exception as e:
            return f"Erreur de lecture : {html.escape(str(e))}"

    elif service_name == "nginx":
        log_file = Path("/var/log/nginx/error.log")
        if not log_file.exists():
            return f"📝 <b>Derniers logs pour <code>nginx</code> :</b>\n<pre>-- Fichier /var/log/nginx/error.log introuvable --</pre>"
        try:
            res = subprocess.run(["tail", "-n", str(lines), str(log_file)], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            content = res.stdout.strip() or "-- Fichier log vide --"
            safe_content = html.escape(content[-3500:])
            return f"📝 <b>Derniers logs pour <code>nginx</code> :</b>\n<pre>{safe_content}</pre>"
        except Exception as e:
            return f"Erreur de lecture : {html.escape(str(e))}"

    else:
        # Journalctl fallback
        try:
            cmd = f"journalctl -u {service_name} -n {lines} --no-pager"
            res = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=5)
            content = res.stdout.strip() or "-- Aucune entrée --"
            safe_content = html.escape(content[-3500:])
            return f"📝 <b>Derniers logs pour <code>{service_name}</code> :</b>\n<pre>{safe_content}</pre>"
        except Exception as e:
            return f"Erreur de lecture pour <code>{service_name}</code> : {html.escape(str(e))}"

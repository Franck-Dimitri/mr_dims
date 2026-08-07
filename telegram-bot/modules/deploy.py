import subprocess
import html
from pathlib import Path
from config import PROJECT_PATH

def run_laravel_deployment(branch="main"):
    """
    Exécute la séquence complète de déploiement automatique Laravel :
    1. git pull origin <branch>
    2. composer install --no-dev --optimize-autoloader (si présent)
    3. npm run build (si Vite/React présent)
    4. php artisan migrate --force
    5. php artisan optimize:clear
    """
    if not PROJECT_PATH.exists():
        return False, f"Dossier du projet introuvable : <code>{PROJECT_PATH}</code>"

    steps = [
        ("Git Pull", f"git -C {PROJECT_PATH} pull origin {branch}"),
        ("Composer Install", f"composer install --no-dev --optimize-autoloader --working-dir={PROJECT_PATH}"),
        ("Build Front-end (NPM)", f"npm --prefix {PROJECT_PATH} run build"),
        ("Migrations Laravel", f"php {PROJECT_PATH}/artisan migrate --force"),
        ("Optimisation & Cache", f"php {PROJECT_PATH}/artisan optimize:clear")
    ]

    logs = []
    overall_success = True

    for step_name, cmd in steps:
        try:
            res = subprocess.run(cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, timeout=180)
            output = res.stdout.strip() or res.stderr.strip() or "OK"
            
            if res.returncode == 0:
                logs.append(f"✅ <b>{step_name}</b>\n<pre>{html.escape(output[-600:])}</pre>")
            else:
                # Si npm ou composer n'est pas présent, avertir sans bloquer
                logs.append(f"⚠️ <b>{step_name}</b> (Code {res.returncode})\n<pre>{html.escape(output[-600:])}</pre>")
                if step_name in ["Git Pull"]:
                    overall_success = False
        except Exception as e:
            logs.append(f"❌ <b>{step_name}</b> : Exception: {html.escape(str(e))}")
            if step_name in ["Git Pull"]:
                overall_success = False

    summary = "\n\n".join(logs)
    return overall_success, summary

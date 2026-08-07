import os
import subprocess
import datetime
from pathlib import Path
from config import (
    DB_ENGINE, SQLITE_PATH,
    DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD,
    PROJECT_PATH, BACKUP_DIR, RETENTION_DAYS, PROJECT_NAME
)

def ensure_backup_dir():
    """Vérifie et crée le dossier de sauvegarde si nécessaire."""
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)

def dump_database():
    """Exécute la sauvegarde de la BD (SQLite ou MySQL) avec métadonnées enrichies."""
    ensure_backup_dir()
    now_dt = datetime.datetime.now()
    timestamp = now_dt.strftime("%Y%m%d_%H%M%S")
    date_formatted = now_dt.strftime("%d/%m/%Y à %H:%M:%S")

    # Cas 1 : Base de données SQLite
    if DB_ENGINE.lower() == "sqlite":
        sqlite_file = Path(SQLITE_PATH)
        if not sqlite_file.exists():
            return False, f"Fichier SQLite introuvable : `{sqlite_file}`", None, {}

        output_path = BACKUP_DIR / f"portfolio_sqlite_{timestamp}.sqlite.gz"
        try:
            cmd = f"gzip -c {sqlite_file} > {output_path}"
            process = subprocess.run(cmd, shell=True, stderr=subprocess.PIPE, text=True, timeout=60)
            if process.returncode == 0 and output_path.exists():
                size_mb = round(output_path.stat().st_size / (1024 * 1024), 2)
                meta = {
                    "project": PROJECT_NAME,
                    "date": date_formatted,
                    "filename": output_path.name,
                    "size_mb": size_mb
                }
                return True, f"Base SQLite sauvegardée & compressée ({size_mb} Mo)", output_path, meta
            else:
                return False, f"Erreur de compression SQLite : {process.stderr}", None, {}
        except Exception as e:
            return False, f"Exception pendant le backup SQLite : {str(e)}", None, {}

    # Cas 2 : Base de données MySQL
    else:
        filename = f"{DB_NAME}_db_{timestamp}.sql.gz"
        output_path = BACKUP_DIR / filename

        if not DB_NAME or not DB_USER:
            return False, "Nom de BD ou utilisateur non configuré dans .env", None, {}

        try:
            cmd = f"mysqldump -h {DB_HOST} -P {DB_PORT} -u {DB_USER} -p'{DB_PASSWORD}' {DB_NAME} | gzip > {output_path}"
            process = subprocess.run(cmd, shell=True, stderr=subprocess.PIPE, text=True, timeout=180)

            if process.returncode == 0 and output_path.exists() and output_path.stat().st_size > 0:
                size_mb = round(output_path.stat().st_size / (1024 * 1024), 2)
                meta = {
                    "project": PROJECT_NAME,
                    "date": date_formatted,
                    "filename": output_path.name,
                    "size_mb": size_mb
                }
                return True, f"Base MySQL exportée ({size_mb} Mo)", output_path, meta
            else:
                return False, f"Erreur mysqldump: {process.stderr}", None, {}
        except Exception as e:
            return False, f"Exception pendant le dump BD: {str(e)}", None, {}

def archive_project_files():
    """Archive les fichiers importants du portfolio Laravel."""
    ensure_backup_dir()
    now_dt = datetime.datetime.now()
    timestamp = now_dt.strftime("%Y%m%d_%H%M%S")
    date_formatted = now_dt.strftime("%d/%m/%Y à %H:%M:%S")
    output_path = BACKUP_DIR / f"portfolio_files_{timestamp}.tar.gz"

    if not PROJECT_PATH.exists():
        return False, f"Le chemin du projet {PROJECT_PATH} n'existe pas", None, {}

    try:
        cmd = [
            "tar", "-czf", str(output_path),
            "--exclude=node_modules",
            "--exclude=vendor",
            "--exclude=storage/framework/cache",
            "--exclude=storage/framework/sessions",
            "--exclude=storage/framework/views",
            "-C", str(PROJECT_PATH),
            "storage", ".env"
        ]

        process = subprocess.run(cmd, stderr=subprocess.PIPE, text=True, timeout=300)

        if process.returncode == 0 and output_path.exists():
            size_mb = round(output_path.stat().st_size / (1024 * 1024), 2)
            meta = {
                "project": PROJECT_NAME,
                "date": date_formatted,
                "filename": output_path.name,
                "size_mb": size_mb
            }
            return True, f"Fichiers archivés avec succès ({size_mb} Mo)", output_path, meta
        else:
            return False, f"Erreur compression fichiers: {process.stderr}", None, {}
    except Exception as e:
        return False, f"Exception pendant l'archivage: {str(e)}", None, {}

def clean_old_backups():
    """Supprime les sauvegardes locales datant de plus de RETENTION_DAYS jours."""
    ensure_backup_dir()
    deleted_count = 0
    now = datetime.datetime.now()

    for file_path in BACKUP_DIR.glob("*.*"):
        if file_path.is_file():
            file_time = datetime.datetime.fromtimestamp(file_path.stat().st_mtime)
            age_days = (now - file_time).days
            if age_days > RETENTION_DAYS:
                try:
                    file_path.unlink()
                    deleted_count += 1
                except Exception:
                    pass

    return deleted_count

def run_full_backup():
    """Exécute la sauvegarde complète et renvoie les métadonnées pour Telegram."""
    results = []

    db_success, db_msg, db_file, db_meta = dump_database()
    results.append(("BD", db_success, db_msg, db_file, db_meta))

    files_success, files_msg, files_file, files_meta = archive_project_files()
    results.append(("Fichiers", files_success, files_msg, files_file, files_meta))

    deleted = clean_old_backups()
    results.append(("Rotation", True, f"{deleted} ancienne(s) sauvegarde(s) nettoyée(s)", None, {}))

    return results

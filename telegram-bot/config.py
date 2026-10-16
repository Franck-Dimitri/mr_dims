import os
from pathlib import Path
from dotenv import load_dotenv

# Charger les variables depuis le fichier .env
BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"

if ENV_PATH.exists():
    load_dotenv(dotenv_path=ENV_PATH)
else:
    load_dotenv()

# Tokens & Identifiants Telegram
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
ALLOWED_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")

# Informer si le chat ID est renseigné comme entier
try:
    ALLOWED_CHAT_ID = int(ALLOWED_CHAT_ID) if ALLOWED_CHAT_ID else None
except ValueError:
    ALLOWED_CHAT_ID = None

# Projet
PROJECT_NAME = os.getenv("PROJECT_NAME", "Portfolio & VPS Supervisor")
PROJECT_PATH = Path(os.getenv("PROJECT_PATH", "/var/www/mrdims-portfolio"))
PROJECT_URL = os.getenv("PROJECT_URL", "http://localhost")

# Base de Données (Support SQLite & MySQL)
DB_ENGINE = os.getenv("DB_ENGINE", "sqlite") # "sqlite" ou "mysql"
SQLITE_PATH = Path(os.getenv("SQLITE_PATH", str(PROJECT_PATH / "database" / "database.sqlite")))

DB_HOST = os.getenv("DB_HOST", "127.0.0.1")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "")
DB_USER = os.getenv("DB_USER", "")
DB_PASSWORD = os.getenv("DB_PASSWORD", "")

# Sauvegardes
BACKUP_DIR = Path(os.getenv("BACKUP_DIR", str(PROJECT_PATH / "backups")))
RETENTION_DAYS = int(os.getenv("RETENTION_DAYS", "14"))

# Seuils d'alerte (%)
CPU_THRESHOLD = float(os.getenv("CPU_THRESHOLD", "85.0"))
RAM_THRESHOLD = float(os.getenv("RAM_THRESHOLD", "90.0"))
DISK_THRESHOLD = float(os.getenv("DISK_THRESHOLD", "85.0"))

# Contrôle à distance Shell & Sécurité
ENABLE_ARBITRARY_SHELL = os.getenv("ENABLE_ARBITRARY_SHELL", "true").lower() in ("true", "1", "yes")
SHELL_TIMEOUT = int(os.getenv("SHELL_TIMEOUT", "45"))

# Services à surveiller sur le serveur Linux
raw_services = os.getenv("CRITICAL_SERVICES", "nginx,mysql,php8.2-fpm,php8.3-fpm,docker")
CRITICAL_SERVICES = [s.strip() for s in raw_services.split(",") if s.strip()]

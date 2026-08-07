import sys
import html
from pathlib import Path

# S'assurer que le dossier telegram-bot est dans le sys.path
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

import time
import logging
import asyncio
from telegram import Bot
from config import TELEGRAM_BOT_TOKEN, ALLOWED_CHAT_ID, PROJECT_NAME
from modules.monitor import evaluate_alerts
from modules.security import get_recent_ssh_logins

logging.basicConfig(format='%(asctime)s - Watchdog - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger("Watchdog")

CHECK_INTERVAL = 60
ALERT_THROTTLE_SECONDS = 900

last_alert_times = {}
last_ssh_snapshot = ""

async def send_alert_telegram(bot: Bot, alert_msg: str, alert_key: str):
    """Envoie l'alerte sur Telegram en mode HTML sécurisé."""
    now = time.time()
    if alert_key in last_alert_times:
        elapsed = now - last_alert_times[alert_key]
        if elapsed < ALERT_THROTTLE_SECONDS:
            logger.info(f"Alerte ignorée (throttling {int(ALERT_THROTTLE_SECONDS - elapsed)}s restantes) : {alert_key}")
            return

    try:
        proj = html.escape(PROJECT_NAME)
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
        msg = (
            f"🚨 <b>ALERTE SERVEUR - {proj}</b> 🚨\n\n"
            f"{alert_msg}\n\n"
            f"⏱️ <i>Horodatage : {timestamp}</i>"
        )
        await bot.send_message(chat_id=ALLOWED_CHAT_ID, text=msg, parse_mode="HTML")
        last_alert_times[alert_key] = now
        logger.info(f"Alerte transmise sur Telegram : {alert_key}")
    except Exception as e:
        logger.error(f"Erreur lors de l'envoi Telegram : {e}")

async def run_watchdog_loop():
    """Boucle principale du Watchdog."""
    global last_ssh_snapshot

    if not TELEGRAM_BOT_TOKEN or not ALLOWED_CHAT_ID:
        logger.error("TELEGRAM_BOT_TOKEN ou CHAT_ID non configuré. Arrêt du Watchdog.")
        return

    bot = Bot(token=TELEGRAM_BOT_TOKEN)
    logger.info("Moteur d'alertes en temps réel (Watchdog) démarré en mode HTML...")

    last_ssh_snapshot = get_recent_ssh_logins(1)

    while True:
        try:
            alerts, metrics = evaluate_alerts()
            if alerts:
                combined_msg = "\n".join([f"• {a}" for a in alerts])
                alert_key = "|".join(alerts)
                await send_alert_telegram(bot, combined_msg, alert_key)

            current_ssh = get_recent_ssh_logins(1)
            if current_ssh and current_ssh != last_ssh_snapshot and "Aucune connexion" not in current_ssh:
                ssh_alert = f"🔑 <b>Nouvelle Connexion SSH Détectée !</b>\n<pre>{html.escape(current_ssh)}</pre>"
                await send_alert_telegram(bot, ssh_alert, f"ssh_{current_ssh}")
                last_ssh_snapshot = current_ssh

        except Exception as e:
            logger.error(f"Erreur imprévue dans la boucle Watchdog : {e}")

        await asyncio.sleep(CHECK_INTERVAL)

def main():
    asyncio.run(run_watchdog_loop())

if __name__ == "__main__":
    main()

import sys
import html
from pathlib import Path

# S'assurer que le dossier telegram-bot est dans le sys.path
BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

import logging
import asyncio
from telegram import Update, ReplyKeyboardMarkup, KeyboardButton, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import (
    Application, CommandHandler, MessageHandler, CallbackQueryHandler, ContextTypes, filters
)
from config import TELEGRAM_BOT_TOKEN, ALLOWED_CHAT_ID, PROJECT_NAME, PROJECT_URL, DB_ENGINE, SQLITE_PATH
from modules.monitor import get_system_resources, check_all_services, check_website_health
from modules.backup import run_full_backup
from modules.security import execute_whitelisted_command, get_ssh_audit, get_service_logs
from modules.deploy import run_laravel_deployment

# Setup logging
logging.basicConfig(format='%(asctime)s - Bot - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger("TelegramBot")

async def is_authorized_and_notify(update: Update, context: ContextTypes.DEFAULT_TYPE) -> bool:
    """
    Vérifie l'autorisation et alerte l'administrateur en cas de tentative d'intrusion.
    """
    user = update.effective_user
    chat_id = update.effective_chat.id if update.effective_chat else None
    user_id = user.id if user else None

    if ALLOWED_CHAT_ID is None or (chat_id != ALLOWED_CHAT_ID and user_id != ALLOWED_CHAT_ID):
        attempted_cmd = html.escape(update.message.text) if update.message and update.message.text else "Action Inconnue"
        username = html.escape(f"{user.first_name or ''} ({user.username or 'Sans pseudo'})") if user else "Inconnu"
        
        logger.warning(f"Tentative non autorisée par ID={user_id}, utilisateur={username}, commande={attempted_cmd}")

        if update.message:
            await update.message.reply_text("⛔ <b>Accès Refusé.</b> Vous n'êtes pas autorisé à utiliser ce bot de supervision.", parse_mode="HTML")

        if ALLOWED_CHAT_ID:
            alert_admin_msg = (
                f"⚠️ <b>TENTATIVE D'ACCÈS NON AUTORISÉE AU BOT</b>\n\n"
                f"Utilisateur : {username} (<code>{user_id}</code>)\n"
                f"Commande tentée : <code>{attempted_cmd}</code>"
            )
            try:
                await context.bot.send_message(chat_id=ALLOWED_CHAT_ID, text=alert_admin_msg, parse_mode="HTML")
            except Exception:
                pass
        return False
    return True

def main_keyboard():
    """Génère le menu clavier interactif sous la barre de saisie."""
    keyboard = [
        [KeyboardButton("📊 /status"), KeyboardButton("💻 /uptime")],
        [KeyboardButton("🔑 /ssh"), KeyboardButton("🗄️ /db")],
        [KeyboardButton("🌐 /health"), KeyboardButton("💾 /backup")],
        [KeyboardButton("🚀 /deploy"), KeyboardButton("📜 /logs")],
        [KeyboardButton("🔄 /restart"), KeyboardButton("❓ /help")]
    ]
    return ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /start ou /help : Présentation structurée."""
    if not await is_authorized_and_notify(update, context):
        return

    first_name = html.escape(update.effective_user.first_name) if update.effective_user and update.effective_user.first_name else "Administrateur"
    proj_name = html.escape(PROJECT_NAME)

    help_msg = (
        f"🛡️ <b>{proj_name} — Bot Sécurité & Supervision</b>\n\n"
        f"Bonjour {first_name} !\n"
        f"Voici les commandes d'administration disponibles :\n\n"
        f"🚀 <b>/deploy</b> — Git pull, migrations BD & build front-end\n"
        f"📊 <b>/status</b> — État de santé des services principaux\n"
        f"💻 <b>/uptime</b> — CPU, RAM, Charge & Disque du serveur\n"
        f"🔑 <b>/ssh</b> — Sessions SSH actives & connexions récentes\n"
        f"🗄️ <b>/db</b> — Connexions & taille de la base de données\n"
        f"🌐 <b>/health</b> — Tests de santé HTTP du Portfolio\n"
        f"📝 <b>/logs &lt;service&gt;</b> — Dernières lignes de logs (laravel, nginx, syslog)\n"
        f"🔄 <b>/restart &lt;service&gt;</b> — Redémarrer un service\n"
        f"💾 <b>/db_backup</b> — Déclencher une sauvegarde immédiate\n"
    )
    await update.message.reply_text(help_msg, parse_mode="HTML", reply_markup=main_keyboard())

async def deploy_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /deploy : Déclenche le git pull et la mise à jour complète."""
    if not await is_authorized_and_notify(update, context):
        return

    branch = context.args[0] if context.args else "main"
    safe_branch = html.escape(branch)

    await update.message.reply_text(
        f"🚀 <b>Lancement du Déploiement Automatique</b> (Branche : <code>{safe_branch}</code>)...\n"
        f"<i>Veuillez patienter pendant le git pull, les migrations et la compilation front-end.</i>",
        parse_mode="HTML"
    )

    loop = asyncio.get_running_loop()
    success, summary = await loop.run_in_executor(None, run_laravel_deployment, branch)

    icon = "🎉" if success else "⚠️"
    status_title = "Déploiement Terminé !" if success else "Déploiement Terminé avec des Avertissements"

    msg = (
        f"{icon} <b>{status_title}</b>\n\n"
        f"{summary}"
    )
    await update.message.reply_text(msg, parse_mode="HTML")

async def uptime_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /uptime : Affichage des ressources système."""
    if not await is_authorized_and_notify(update, context):
        return

    res = get_system_resources()
    hostname = html.escape(str(res['hostname']))

    msg = (
        f"💻 <b>Ressources Serveur {hostname}</b>\n\n"
        f"⏱️ <b>Uptime :</b> up {res['uptime']}\n"
        f"⚙️ <b>Charge CPU (1,5,15m) :</b> {res['cpu_load']}\n"
        f"🧠 <b>RAM Utilisée :</b> {res['ram_used_gi']}Gi / {res['ram_total_gi']}Gi ({res['ram_percent']}%)\n"
        f"💾 <b>Disque (/) :</b> {res['disk_used_gi']}G / {res['disk_total_gi']}G ({res['disk_percent']}% utilisé)"
    )
    await update.message.reply_text(msg, parse_mode="HTML")

async def status_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /status : État temps réel des services."""
    if not await is_authorized_and_notify(update, context):
        return

    services = check_all_services()
    active_count = sum(1 for is_act in services.values() if is_act)
    total_count = len(services)

    services_lines = [f"  • <code>{html.escape(srv)}</code> : {'🟢 Actif' if is_act else '🔴 Arrêté'}" for srv, is_act in services.items()]
    
    msg = (
        f"📊 <b>Statut Temps Réel des Services ({active_count}/{total_count})</b>\n\n"
        + "\n".join(services_lines)
    )
    await update.message.reply_text(msg, parse_mode="HTML")

async def ssh_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /ssh : Audit SSH."""
    if not await is_authorized_and_notify(update, context):
        return

    ssh_msg = get_ssh_audit()
    await update.message.reply_text(ssh_msg, parse_mode="HTML")

async def db_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /db : Informations sur la base de données."""
    if not await is_authorized_and_notify(update, context):
        return

    if DB_ENGINE.lower() == "sqlite":
        sqlite_file = Path(SQLITE_PATH)
        if sqlite_file.exists():
            size_mb = round(sqlite_file.stat().st_size / (1024 * 1024), 2)
            msg = (
                f"🗄️ <b>Base de Données SQLite</b>\n\n"
                f"📄 <b>Fichier :</b> <code>{html.escape(sqlite_file.name)}</code>\n"
                f"💾 <b>Taille actuelle :</b> <code>{size_mb} Mo</code>\n"
                f"🟢 <b>Statut :</b> Accessible & Opérationnelle"
            )
        else:
            msg = f"🗄️ <b>Base de Données SQLite</b>\n🔴 Fichier introuvable à <code>{html.escape(str(sqlite_file))}</code>"
    else:
        msg = f"🗄️ <b>Base de Données MySQL</b>\n🟢 Moteur MySQL configuré pour <code>{html.escape(PROJECT_NAME)}</code>."

    await update.message.reply_text(msg, parse_mode="HTML")

async def health_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /health : Test HTTP du portfolio."""
    if not await is_authorized_and_notify(update, context):
        return

    health = check_website_health()
    safe_url = html.escape(PROJECT_URL)

    if health["is_up"]:
        msg = (
            f"🌐 <b>Health Check HTTP</b>\n\n"
            f"🎯 <b>URL :</b> <code>{safe_url}</code>\n"
            f"🟢 <b>Statut :</b> <code>200 OK</code>\n"
            f"⚡ <b>Temps de réponse :</b> <code>{health['response_time_ms']} ms</code>"
        )
    else:
        err = html.escape(str(health.get('error', f"HTTP {health['status_code']}")))
        msg = (
            f"🌐 <b>Health Check HTTP</b>\n\n"
            f"🎯 <b>URL :</b> <code>{safe_url}</code>\n"
            f"🔴 <b>Statut :</b> Indisponible ({err})"
        )
    await update.message.reply_text(msg, parse_mode="HTML")

async def logs_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /logs : Consultation dynamique des logs."""
    if not await is_authorized_and_notify(update, context):
        return

    args = context.args
    service_name = args[0] if args else None
    
    logs_output = get_service_logs(service_name)
    await update.message.reply_text(logs_output, parse_mode="HTML")

async def restart_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /restart : Redémarrage sécurisé d'un service."""
    if not await is_authorized_and_notify(update, context):
        return

    args = context.args
    if not args:
        await update.message.reply_text(
            "⚠️ <b>Spécifiez le service :</b> <code>/restart nginx</code> <b>ou</b> <code>/restart php8.2-fpm</code> <b>ou</b> <code>/restart mysql</code>",
            parse_mode="HTML"
        )
        return

    service_name = args[0]
    safe_name = html.escape(service_name)
    await update.message.reply_text(f"⏳ <i>Redémarrage du service <code>{safe_name}</code>...</i>", parse_mode="HTML")
    success, output = execute_whitelisted_command("restart_service", service_name)
    icon = "✅" if success else "❌"
    safe_out = html.escape(output)
    await update.message.reply_text(f"{icon} <b>Résultat Redémarrage <code>{safe_name}</code> :</b>\n<pre>{safe_out}</pre>", parse_mode="HTML")

async def backup_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Commande /backup ou /db_backup : Génération et expédition de la carte de sauvegarde."""
    if not await is_authorized_and_notify(update, context):
        return

    await update.message.reply_text("⏳ <i>Génération de la sauvegarde complète...</i>", parse_mode="HTML")
    
    loop = asyncio.get_running_loop()
    results = await loop.run_in_executor(None, run_full_backup)

    for name, success, msg, file_path, meta in results:
        if success and file_path and file_path.exists():
            proj_title = html.escape(meta.get('project', PROJECT_NAME))
            date_str = html.escape(meta.get('date', ''))
            fname_str = html.escape(meta.get('filename', file_path.name))
            size_mb = meta.get('size_mb', 0)

            card_msg = (
                f"📦 <b>[Sauvegarde {name}] {proj_title}</b>\n\n"
                f"📅 <b>Date :</b> <code>{date_str}</code>\n"
                f"📄 <b>Fichier :</b> <code>{fname_str}</code>\n"
                f"💾 <b>Taille :</b> <code>{size_mb} Mo</code>\n"
                f"✅ <b>Statut :</b> <code>Succès</code>"
            )
            
            if size_mb <= 45:
                try:
                    with open(file_path, "rb") as doc:
                        await update.message.reply_document(document=doc, filename=file_path.name, caption=card_msg, parse_mode="HTML")
                except Exception as e:
                    await update.message.reply_text(f"{card_msg}\n⚠️ Erreur envoi fichier: {html.escape(str(e))}", parse_mode="HTML")
            else:
                await update.message.reply_text(f"{card_msg}\nℹ️ <i>Fichier trop volumineux pour Telegram (&gt;45Mo), conservé sur le serveur.</i>", parse_mode="HTML")
        elif not success and name != "Rotation":
            await update.message.reply_text(f"❌ <b>Erreur Sauvegarde {name} :</b> {html.escape(msg)}", parse_mode="HTML")

async def handle_text_messages(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Redirige les boutons du clavier vers les commandes correspondantes."""
    text = update.message.text.strip() if update.message and update.message.text else ""
    
    if "/deploy" in text:
        await deploy_command(update, context)
    elif "/status" in text:
        await status_command(update, context)
    elif "/uptime" in text:
        await uptime_command(update, context)
    elif "/ssh" in text:
        await ssh_command(update, context)
    elif "/db" in text:
        await db_command(update, context)
    elif "/health" in text:
        await health_command(update, context)
    elif "/backup" in text or "/db_backup" in text:
        await backup_command(update, context)
    elif "/logs" in text:
        await logs_command(update, context)
    elif "/restart" in text:
        await restart_command(update, context)
    else:
        await help_command(update, context)

def main():
    """Initialisation du Bot Telegram."""
    if not TELEGRAM_BOT_TOKEN:
        logger.error("TELEGRAM_BOT_TOKEN manquant dans le fichier .env !")
        return

    app = Application.builder().token(TELEGRAM_BOT_TOKEN).build()

    # Handlers
    app.add_handler(CommandHandler(["start", "help"], help_command))
    app.add_handler(CommandHandler("deploy", deploy_command))
    app.add_handler(CommandHandler("status", status_command))
    app.add_handler(CommandHandler("uptime", uptime_command))
    app.add_handler(CommandHandler("ssh", ssh_command))
    app.add_handler(CommandHandler("db", db_command))
    app.add_handler(CommandHandler("health", health_command))
    app.add_handler(CommandHandler(["backup", "db_backup"], backup_command))
    app.add_handler(CommandHandler("logs", logs_command))
    app.add_handler(CommandHandler("restart", restart_command))

    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_text_messages))

    logger.info("Bot de supervision initialisé avec fonction /deploy !")
    app.run_polling()

if __name__ == "__main__":
    main()

#!/usr/bin/env bash
# ==============================================================================
# Script d'installation automatique des services Systemd & Sudoers pour le Bot VPS
# Utilisation : sudo bash setup_services.sh
# ==============================================================================

set -e

if [ "$EUID" -ne 0 ]; then
  echo "❌ Ce script doit être exécuté avec les privilèges root (sudo bash setup_services.sh)"
  exit 1
fi

BASE_DIR="/var/www/mrdims-portfolio/telegram-bot"

echo "➡️ 1. Installation de la règle sudoers..."
cp "$BASE_DIR/systemd/sudoers-mrdims-bot" /etc/sudoers.d/mrdims-bot
chmod 0440 /etc/sudoers.d/mrdims-bot
echo "✅ Règle sudoers installée avec succès dans /etc/sudoers.d/mrdims-bot."

echo "➡️ 2. Copie des fichiers services Systemd..."
cp "$BASE_DIR/systemd/telegram-bot.service" /etc/systemd/system/telegram-bot.service
cp "$BASE_DIR/systemd/telegram-watchdog.service" /etc/systemd/system/telegram-watchdog.service

echo "➡️ 3. Rechargement du démon systemd..."
systemctl daemon-reload

echo "➡️ 4. Activation et démarrage des services..."
systemctl enable telegram-bot.service
systemctl enable telegram-watchdog.service
systemctl restart telegram-bot.service
systemctl restart telegram-watchdog.service

echo ""
echo "🎉 Services Systemd installés et configurés !"
echo "Pour vérifier le statut :"
echo "  sudo systemctl status telegram-bot"
echo "  sudo systemctl status telegram-watchdog"

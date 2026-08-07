#!/bin/bash

# Script exécuté par Cron pour lancer la sauvegarde quotidienne
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BOT_DIR="$(dirname "$SCRIPT_DIR")"

# Charger l'environnement virtuel et exécuter le backup
if [ -d "$BOT_DIR/venv" ]; then
    source "$BOT_DIR/venv/bin/activate"
fi

python3 -c "from modules.backup import run_full_backup; print(run_full_backup())"

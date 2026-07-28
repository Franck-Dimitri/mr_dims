#!/bin/bash
set -e

echo "🚀 [1/6] Mise en mode maintenance de l'application..."
php artisan down || true

echo "📦 [2/6] Récupération du dernier code depuis GitHub (git pull)..."
git pull origin main

echo "⚡ [3/6] Installation des dépendances PHP et JavaScript..."
composer install --no-dev --optimize-autoloader
npm ci || npm install
npm run build

echo "🗄️ [4/6] Exécution sécurisée des migrations..."
php artisan migrate --force

echo "🧹 [5/6] Optimisation des caches Laravel (Config, Routes, Views)..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "🟢 [6/6] Remise en ligne du serveur (php artisan up)..."
php artisan up

echo "✅ [SUCCESS] Déploiement terminé avec succès et zéro interruption pour la prod !"


# git stash | git pull origin main | composer install --no-dev --optimize-autoloader  |  npm install | npm run build  | php artisan migrate --force  | php artisan config:cache | php artisan route:cache | php artisan view:cache



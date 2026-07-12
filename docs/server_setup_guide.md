# Guide Complet : Hébergement Laravel sur Debian 12

Ce guide est votre "Cheat Sheet". Il contient toutes les commandes à taper sur votre serveur (via SSH) pour configurer un environnement vierge et déployer votre portfolio Laravel/React.

---

## 1. Prérequis & Mises à jour
On commence toujours par mettre à jour le serveur et installer les outils de base.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl zip unzip git sqlite3
```

## 2. Installation de PHP 8.4 & Extensions
Laravel 11+ nécessite PHP 8.2 ou 8.3 minimum. Comme votre environnement local utilise PHP 8.4+, nous allons installer PHP 8.4 sur le serveur pour éviter tout conflit de version.

```bash
sudo apt install -y apt-transport-https lsb-release ca-certificates wget
sudo wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/php.list
sudo apt update
sudo apt install -y php8.4-fpm php8.4-cli php8.4-common php8.4-sqlite3 \
    php8.4-mbstring php8.4-xml php8.4-curl php8.4-zip php8.4-bcmath php8.4-intl
```

## 3. Installation de Composer
Composer est indispensable pour installer les paquets PHP (Laravel).

```bash
curl -sS https://getcomposer.org/installer -o composer-setup.php
sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer
rm composer-setup.php
```

## 4. Installation de Node.js (v20)
Indispensable pour compiler React et Tailwind avec Vite (`npm run build`).

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## 5. Clonage du projet et Dépendances
C'est ici que l'on place votre code sur le serveur. Le dossier standard est `/var/www`.

```bash
cd /var/www

# Clonez votre projet (à remplacer par le vrai lien Github/Gitlab)
sudo git clone https://github.com/votre-compte/votre-portfolio.git portfolio

# On se donne temporairement les droits pour installer les paquets
sudo chown -R $USER:$USER /var/www/portfolio
cd portfolio

# Installation Backend (sans les paquets de dev qui alourdissent)
composer install --optimize-autoloader --no-dev

# Installation Frontend et compilation
npm install
npm run build
```

---

## 6. Configuration Laravel (.env & DB)
Préparation de l'environnement et de la base de données SQLite.

```bash
# Copie du fichier d'exemple
cp .env.example .env

# Génération de la clé de sécurité
php artisan key:generate

# Lier le dossier de stockage (pour vos pièces jointes/images)
php artisan storage:link

# Créer le fichier SQLite s'il n'existe pas
touch database/database.sqlite

# Migrer la base de données (créer les tables)
php artisan migrate --force
```

Ouvrez ensuite le `.env` pour le modifier :
```bash
nano .env
```
*Modifiez ces lignes cruciales :*
- `APP_ENV=production`
- `APP_DEBUG=false` (Très important pour la sécurité)
- `APP_URL=http://VOTRE_ADRESSE_IP` (ou votre domaine plus tard)
- `DB_CONNECTION=sqlite`
- Ajoutez vos identifiants SMTP Gmail configurés précédemment.

---

## 7. Configuration des Permissions (Le plus important !)
C'est l'erreur numéro 1 en déploiement. Nginx (qui tourne sous l'utilisateur `www-data`) doit avoir le droit de lire les fichiers et d'écrire dans les dossiers `storage` et `bootstrap/cache`.

```bash
sudo chown -R www-data:www-data /var/www/portfolio
sudo find /var/www/portfolio -type f -exec chmod 644 {} \;
sudo find /var/www/portfolio -type d -exec chmod 755 {} \;
sudo chmod -R 775 /var/www/portfolio/storage
sudo chmod -R 775 /var/www/portfolio/bootstrap/cache
```

---

## 8. Configuration de NGINX
Maintenant on explique à Nginx comment afficher votre site.

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Collez cette configuration (remplacez l'IP par celle de votre serveur) :

```nginx
server {
    listen 80;
    server_name VOTRE_ADRESSE_IP; # Remplacez par votre domaine plus tard
    root /var/www/portfolio/public; # Toujours pointer vers le dossier public !

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

On active le site et on relance Nginx :
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t   # Vérifie qu'il n'y a pas d'erreur de syntaxe
sudo systemctl reload nginx
```

🎉 **Votre site est maintenant en ligne sur votre adresse IP !**

---

## 9. Le Futur : Ajouter un Nom de Domaine et le SSL (HTTPS)
Dès que vous achèterez `mrdims.dev` et que vous le ferez pointer vers votre IP, il suffira de faire ceci :

1. Modifiez `server_name` dans la config Nginx (`sudo nano /etc/nginx/sites-available/portfolio`) pour mettre `mrdims.dev`.
2. Tapez ces commandes magiques pour avoir le cadenas vert gratuit :
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d mrdims.dev
```

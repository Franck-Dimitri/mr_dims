# Plan d'Implémentation : CI/CD avec GitHub Actions

Ce document explique le fonctionnement de l'intégration et du déploiement continus (CI/CD) et détaille les étapes pour l'implémenter sur votre portfolio.

## Comment ça fonctionne ? (Le principe du CI/CD)

1. **Le "Robot" GitHub** : GitHub Actions est un service gratuit de GitHub. Il agit comme un robot invisible.
2. **Le Déclencheur** : À chaque fois que vous faites un `git push` sur la branche `main` depuis votre ordinateur (VSCode), le robot se réveille.
3. **Le Fichier d'Instructions** : Il lit un fichier spécial (que nous allons créer) appelé `.github/workflows/deploy.yml`.
4. **L'Action** : Le robot se connecte à votre serveur à votre place (via une connexion SSH sécurisée et masquée), et tape toutes les commandes fastidieuses que nous avons tapées manuellement (pull, npm install, build, artisan migrate).
5. **Le Résultat** : En 1 minute, votre code est automatiquement en ligne, sans que vous n'ayez touché au serveur !

## Open Questions

> [!IMPORTANT]
> Pour que le robot GitHub puisse se connecter à votre serveur et exécuter les commandes avec `sudo`, il aura besoin de votre mot de passe serveur (celui de l'utilisateur `franc`).
> - Êtes-vous d'accord pour que nous ajoutions ce mot de passe de manière totalement sécurisée et cryptée dans les "Secrets" de votre dépôt GitHub ? (Personne ne pourra jamais le lire, pas même vous après l'avoir entré, il servira uniquement au robot).

## Proposed Changes

### 1. Fichier de configuration CI/CD (Local)

Nous allons créer un fichier `.github/workflows/deploy.yml` dans votre code local. Ce fichier contiendra les étapes suivantes :

#### [NEW] `.github/workflows/deploy.yml`
- Vérification du code source (checkout).
- Connexion SSH au serveur `87.106.192.105` avec l'utilisateur `franc`.
- Exécution du script de déploiement en utilisant `sudo -S` (pour passer le mot de passe de manière non-interactive) et `-u www-data` pour garder les bonnes permissions.

Les commandes qui seront exécutées automatiquement :
```bash
cd /var/www/mr_dims
echo "LE_MOT_DE_PASSE" | sudo -S -u www-data git pull origin main
echo "LE_MOT_DE_PASSE" | sudo -S -u www-data composer install --optimize-autoloader --no-dev
echo "LE_MOT_DE_PASSE" | sudo -S -u www-data npm install
echo "LE_MOT_DE_PASSE" | sudo -S -u www-data npm run build
echo "LE_MOT_DE_PASSE" | sudo -S -u www-data php artisan migrate --force
```

### 2. Configuration des Secrets GitHub (Manuel)

Vous devrez vous rendre sur la page web de votre dépôt GitHub (Settings > Secrets and variables > Actions) pour ajouter 3 variables secrètes :
- `SERVER_IP` : `87.106.192.105`
- `SERVER_USER` : `franc`
- `SERVER_PASSWORD` : Votre mot de passe serveur.

## Verification Plan
1. Nous allons créer et "commit" le fichier `.github/workflows/deploy.yml`.
2. Vous ajouterez les 3 secrets sur Github.
3. Vous ferez un `git push`.
4. Nous irons dans l'onglet "Actions" de Github pour voir le robot exécuter le déploiement en direct avec succès.

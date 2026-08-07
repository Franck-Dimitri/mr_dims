<div align="center">

# 🚀 FRANCK DIMITRI KOUONGME (Mr Dim's)
### Ingénieur Informaticien — Génie Logiciel & Architecte Full Stack

[![Portfolio](https://img.shields.io/badge/Website-mrdims.dev-00f2fe?style=for-the-badge&logo=google-chrome&logoColor=white)](https://mrdims.dev)
[![GitHub](https://img.shields.io/badge/GitHub-Franck--Dimitri-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Franck-Dimitri)
[![LinkedIn](https://img.shields.io/badge/Contact-Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:franckdimitrio009@gmail.com)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-+237_676383986-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/237676383986)

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-13.x-FF2D20?style=flat-square&logo=laravel&logoColor=white" />
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=flat-square&logo=inertia&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/PHP-8.3+-777BB4?style=flat-square&logo=php&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white" />
</p>

---

</div>

## 📌 À Propos / Overview

Bienvenue sur le dépôt officiel du **Portfolio Professionnel** de **Franck Dimitri Kouongme (Mr Dim's)**.

Ce projet est une application web moderne conçue selon une esthétique **Blueprint / System Architecture & Cyberpunk**, mettant en avant mon expertise technique, mes réalisations logicielles, mes services d'ingénierie et mon parcours professionnel.

🌐 **Site web en ligne** : [https://mrdims.dev](https://mrdims.dev)

---

## ✨ Fonctionnalités Clés du Portfolio

- **📄 Lecteur de CV Interactif Intégré** :
  - Modal avec vue **PDF** et **Aperçu Image HD**.
  - Téléchargement direct du CV au format PDF (`CV_KOUONGME_MBOUOM_FRANCK_DIMITRI.pdf`).
  - Partage de lien via l'API Web Share native ou copie rapide dans le presse-papier avec confirmation toast.
- **🌐 Support Bilingue (FR / EN)** :
  - Basculement instantané de la langue (Français et Anglais) via `LanguageContext` et sauvegarde des préférences locales.
- **💼 Vitrine des Projets & Filtres** :
  - Catégorisation dynamique (Web Apps, APIs, Mobile).
  - Liens direct vers les dépôts GitHub et démos en direct (Live).
- **🧮 Calculateurs & Estimateur de Devis** :
  - Outil interactif d'estimation de budget projet en temps réel selon les spécifications et fonctionnalités choisies.
- **📝 Blog & Base de Connaissances** :
  - Articles techniques, retours d'expérience, gestion des vues, likes et commentaires.
- **📩 Système de Contact Multi-Canal** :
  - Formulaire de transmission de cahier des charges avec support de pièces jointes (max 2 Mo).
  - Intégration WhatsApp direct et boutons de contact rapides.
- **🎨 Design Blueprint UI & Performance** :
  - Thème sombre & clair dynamique.
  - Micro-animations fluides alimentées par **Framer Motion**.
  - Architecture SPA fluide grâce à **Inertia.js** et **React**.

---

## 🛠️ Stack Technique & Compétences

### **Frontend**
- **Framework & Libs** : React 18, Inertia.js 2, Framer Motion, Headless UI
- **Styling** : Tailwind CSS, CSS Grid/Flexbox, Design System Blueprint

### **Backend & APIs**
- **Langages & Frameworks** : PHP 8.3+, Laravel 13, Python (Django)
- **Architecture & Sécurité** : APIs RESTful, Sanctum Auth, CSRF Protection, Throttling & Rate Limiting
- **Base de Données** : MySQL, Eloquent ORM

### **DevOps & Environnements**
- **Systèmes & Outils** : Linux (Ubuntu, Debian, Mint, Kali), Git, GitHub, Docker, Nginx
- **Déploiement & Cloud** : VPS Linux, SSL, Pipelines CI/CD

---

## 📁 Structure du Dépôt

```
mr_dims/portfolio/
├── app/                        # Modèles, Contrôleurs & Logique Métier Laravel
│   ├── Http/Controllers/       # Controllers Admin, Projects, Blog, Contact, etc.
│   └── Models/                 # Modèles Eloquent (Project, Blog, Comment, etc.)
├── public/                     # Assets publics (CV PDF/JPG, images, build Vite)
│   ├── cv.pdf                  # Curriculum Vitae officiel (PDF)
│   ├── cv.jpg                  # Aperçu Image du CV (HD)
│   └── profile.jpg             # Photo de profil
├── resources/js/               # Application Frontend React (Inertia.js)
│   ├── Components/             # Composants réutilisables (CvModal, Modal, SEO...)
│   ├── Context/                # Contexts (LanguageContext pour FR/EN)
│   ├── Layouts/                # BlueprintLayout, AuthenticatedLayout...
│   └── Pages/                  # Pages React (Welcome, About, Projects, Blog, Services...)
├── routes/                     # Configuration des routes (web.php, auth.php)
└── storage/                    # Fichiers de stockage et pièces jointes
```

---

## ⚙️ Installation & Lancement en Local

### Prérequis
- **PHP** >= 8.2 (recommandé 8.3+)
- **Composer** >= 2.x
- **Node.js** >= 18.x & **npm**
- **MySQL**

### 1. Cloner le dépôt
```bash
git clone https://github.com/Franck-Dimitri/mr_dims.git
cd mr_dims/portfolio
```

### 2. Installer les dépendances
```bash
# Dépendances PHP
composer install

# Dépendances JavaScript
npm install
```

### 3. Configuration de l'environnement
```bash
cp .env.example .env
php artisan key:generate
```
Configurez ensuite vos accès base de données MySQL dans le fichier `.env` :
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mr_dims_portfolio
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Migrations & Données initiales
```bash
php artisan migrate --seed
php artisan storage:link
```

### 5. Lancement des serveurs de développement
```bash
# Lancement simultané (Laravel Serve + Vite Hot Reload + Queue + Logs)
composer run dev
```
Accédez ensuite à l'application dans votre navigateur : `http://127.0.0.1:8000`

---

## 👨‍💻 Auteur

**KOUONGME MBOUOM F. DIMITRI (Franck Dimitri / Mr Dim's)**  
*Ingénieur Informaticien — Génie Logiciel & Architecte Full Stack*

- 🌐 Site Web : [https://mrdims.dev](https://mrdims.dev)
- ✉️ Email : [franckdimitrio009@gmail.com](mailto:franckdimitrio009@gmail.com)
- 📱 WhatsApp : [+237 676383986](https://wa.me/237676383986)
- 🐙 GitHub : [@Franck-Dimitri](https://github.com/Franck-Dimitri)
- 📍 Localisation : Yaoundé, Cameroun / Remote

---

<div align="center">
  <sub>Développé avec passion, précision architecturale et soin par <strong>Franck Dimitri (Mr Dim's)</strong>.</sub>
</div>

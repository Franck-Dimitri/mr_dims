<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PrivateProduct;
use Illuminate\Support\Str;

class PrivateProductSeeder extends Seeder
{
    public function run(): void
    {
        // Clean existing records to guarantee fresh non-coding products
        PrivateProduct::query()->delete();

        $products = [
            [
                'title' => 'Masterclass CapCut Pro & Pack 150+ Transitions & Effets Animés',
                'slug' => 'masterclass-capcut-pro-pack-presets-video',
                'token' => 'capcut-pro-v88a9',
                'category' => 'formation_video',
                'price' => 100.00,
                'original_price' => 25000.00,
                'ad_spend' => 15000.00,
                'access_type' => 'drive',
                'access_url' => 'https://drive.google.com/drive/folders/capcut-masterclass-demo',
                'badge_text' => 'MINI-MASTERCLASS',
                'tagline' => 'Exploitez 100% des fonctions Pro de CapCut (PC & Mobile) et accédez à plus de 150 presets de transitions, titres et sous-titres dynamiques.',
                'cover_image' => 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'description_markdown' => "### Créez des vidéos virales sur TikTok, Reels et Shorts sans abonnement mensuel !

Dans ce pack complet de 1h45 + ressources créateurs, découvrez comment maîtriser le logiciel **CapCut** sur ordinateur et téléphone pour produire des vidéos captivantes.

#### 🎯 Ce que vous allez obtenir :
1. **Module 1 : Prise en main & réglages 4K 60fps** sans perte de qualité.
2. **Module 2 : Montage dynamique & découpes rythmées** (suivi de mouvement, keyframes, masques).
3. **Module 3 : Sous-titres animés automatiques** style Alex Hormozi avec animations mot par mot.
4. **Module 4 : Color Grading & Mixage Audio Clean** pour un rendu cinématique.

#### 🎁 Bonus inclus dans le dossier Drive :
- Pack de 50+ FX sonores (Swoosh, Pop, Impact, Whoosh).
- 100+ Overlays de textures, fuites de lumière et grains de film.",
                'features' => [
                    "1h45 de vidéo HD accessible à vie sur Google Drive",
                    "Guide étape par étape PC, Mac, iOS & Android",
                    "Pack de 150+ Presets & FX Sonores inclus",
                    "Mises à jour gratuites des futurs dossiers"
                ],
                'curriculum' => [
                    ["title" => "Module 1 : Configuration & Exportation 4K 60fps", "duration" => "15 min"],
                    ["title" => "Module 2 : Keyframes, Cuts & Effets Dynamic", "duration" => "30 min"],
                    ["title" => "Module 3 : Sous-titrage Automatique Stylisé", "duration" => "35 min"],
                    ["title" => "Module 4 : Colorimétrie & Mixage Audio", "duration" => "25 min"]
                ],
                'access_details' => "Accès direct au dossier Google Drive sécurisé contenant les modules vidéo et l'ensemble des fichiers de presets.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 48,
                'views_count' => 312,
            ],
            [
                'title' => 'Pack 500+ Templates Canva Pro pour Réseaux Sociaux & Carrousels Instagram',
                'slug' => 'pack-500-templates-canva-pro-reseaux-sociaux',
                'token' => 'canva-pack-c77y3',
                'category' => 'template_design',
                'price' => 100.00,
                'original_price' => 19500.00,
                'ad_spend' => 10000.00,
                'access_type' => 'drive',
                'access_url' => 'https://drive.google.com/drive/folders/canva-templates-demo',
                'badge_text' => 'PACK GRAPHISME',
                'tagline' => 'Économisez des dizaines d\'heures de création. Modèles Canva 100% personnalisables pour carrousels, stories, posts et miniatures YouTube.',
                'cover_image' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => null,
                'description_markdown' => "### Donnez un look haut de gamme à vos réseaux sociaux en 3 clics !

Ce pack contient 500+ modèles Canva éditables directement dans votre compte gratuit ou Pro Canva.

#### 🎨 Contenu du kit de création :
- **150 Modèles de Carrousels Instagram** orientés valeur & éducation.
- **100 Templates de Stories & Reels Covers** à fort taux de clic.
- **150 Bannières & Posts promotionnels** (promotions, offres, annonces).
- **100 Miniatures YouTube Virales** avec typographies percutantes.

#### ⚡ Pourquoi ce pack est indispensable :
- 100% modifiable sur mobile ou ordinateur.
- Polices, couleurs et visuels interchangeables en 1 clic.",
                'features' => [
                    "500+ Templates Canva prêt à l'emploi",
                    "Compatible Canva Gratuit & Canva Pro",
                    "Guide vidéo d'utilisation et personnalisation rapide",
                    "Accès permanent et réutilisable à l'infini"
                ],
                'curriculum' => [
                    ["title" => "Liens d'accès directs aux modèles Canva", "duration" => "Accès permanent"],
                    ["title" => "Tutoriel vidéo : Modifier les polices et couleurs", "duration" => "10 min"],
                    ["title" => "Guide d'exportation pour qualité maximale", "duration" => "PDF Guide"]
                ],
                'access_details' => "Liens d'intégration directe Canva + dossier Drive de secours.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 62,
                'views_count' => 450,
            ],
            [
                'title' => 'Ebook PDF & Guide Pratique : Prospection Client & Devis Signants Freelance',
                'slug' => 'ebook-prospection-client-devis-freelance',
                'token' => 'freelance-ebook-f44z1',
                'category' => 'ebook_guide',
                'price' => 100.00,
                'original_price' => 30000.00,
                'ad_spend' => 8000.00,
                'access_type' => 'direct_download',
                'access_url' => 'https://example.com/downloads/ebook-prospection-freelance.pdf',
                'badge_text' => 'EBOOK PDF + TEMPLATES',
                'tagline' => 'Le guide pratique pour trouver des clients qualifiés, rédiger des propositions commerciales irrésistibles et valider vos acomptes.',
                'cover_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => null,
                'description_markdown' => "### Ne bradez plus vos prestations de services !

Un guide étape par étape rédigé à partir d'expériences réelles de consulting et de vente de services digitaux.

#### 📘 Au sommaire de cet Ebook (94 pages + annexes) :
1. **Positionnement Stratégique** : Passer de prestataire à consultant incontournable.
2. **Scripts de Prospection LinkedIn & Email** : Les messages exacts pour décrocher des rendez-vous.
3. **Trame de Devis & Contrats** : Modèle Word/PDF réutilisable pour sécuriser vos acomptes de 50%.
4. **Techniques de Négociation** : Répondre aux objections de prix avec aplomb.",
                'features' => [
                    "Ebook PDF complet de 94 pages (lecture PC & Mobile)",
                    "Modèles Word/PDF de devis et contrat juridiquement bordés",
                    "Scripts de prospection LinkedIn & d'approche commerciale",
                    "Téléchargement direct immédiat"
                ],
                'curriculum' => [
                    ["title" => "Ebook PDF principal : Guide complet de prospection", "duration" => "94 pages"],
                    ["title" => "Pack de Modèles Word / PDF Devis & Contrats", "duration" => "Archive ZIP"],
                    ["title" => "Scripts d'emails d'approche client", "duration" => "Fichier TXT"]
                ],
                'access_details' => "Téléchargement immédiat du livre numérique PDF et du dossier d'annexes.",
                'is_active' => true,
                'is_featured' => false,
                'sales_count' => 38,
                'views_count' => 280,
            ],
            [
                'title' => 'Pack 1000+ Overlays, LUTs Cinéma & FX Sonores pour Vidéastes',
                'slug' => 'pack-1000-overlays-luts-cinema-fx-sonores',
                'token' => 'videomaker-pack-v99b2',
                'category' => 'pack_ressources',
                'price' => 100.00,
                'original_price' => 35000.00,
                'ad_spend' => 20000.00,
                'access_type' => 'drive',
                'access_url' => 'https://drive.google.com/drive/folders/videomaker-bundle-demo',
                'badge_text' => 'RESSOURCES VIDÉO',
                'tagline' => 'Le méga-pack de ressources créatives indispensables pour sublimer vos montages sur Premiere Pro, Final Cut, CapCut et DaVinci Resolve.',
                'cover_image' => 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => null,
                'description_markdown' => "### Donnez un style hollywoodien et dynamique à toutes vos productions vidéo !

Ce bundle regroupe l'essentiel des effets visuels et sonores les plus recherchés par les monteurs et créateurs de contenu.

#### 🍿 Ce que contient ce bundle géant :
- **300+ FX Sonores Premium** (Whoosh, Riser, Glitch, Pass-by, Impact, Cinematic Bass).
- **250+ LUTs Colorimétriques** (Vlog, Teal & Orange, Moody Dark, Vintage Film).
- **200+ Overlays Glitch, Grain 4K & Fuites de lumière**.
- **250+ Bruits de fond et ambiances sonores libres de droits**.",
                'features' => [
                    "Plus de 1000 fichiers multimédias HD & 4K libres de droits",
                    "Compatible CapCut, Premiere Pro, FCPX, DaVinci Resolve",
                    "Fichiers organisés par dossiers clairs dans Google Drive",
                    "Utilisation commerciale autorisée"
                ],
                'curriculum' => [
                    ["title" => "Dossier 1 : LUTs Cinématographiques (.cube)", "duration" => "250+ fichiers"],
                    ["title" => "Dossier 2 : Sound Effects & Mixage Audio (.wav)", "duration" => "300+ fichiers"],
                    ["title" => "Dossier 3 : Overlays & Fuites de lumière 4K (.mp4)", "duration" => "200+ fichiers"]
                ],
                'access_details' => "Lien permanent d'accès au dossier Google Drive partagé.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 89,
                'views_count' => 590,
            ],
            [
                'title' => 'System.io & Notion Template All-In-One : Système de Vente pour Solopreneur',
                'slug' => 'systeme-vente-solopreneur-notion-systemio',
                'token' => 'solopreneur-system-s55t9',
                'category' => 'template_system',
                'price' => 100.00,
                'original_price' => 45000.00,
                'ad_spend' => 12000.00,
                'access_type' => 'drive',
                'access_url' => 'https://drive.google.com/drive/folders/solopreneur-system-demo',
                'badge_text' => 'SYSTÈME & PRODUCTIVITÉ',
                'tagline' => 'Installez votre tunnel de vente automatisé et gérez l\'intégralité de vos projets, clients et contenus depuis un espace Notion optimisé.',
                'cover_image' => 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => null,
                'description_markdown' => "### Automatisez vos ventes et votre organisation sans vous éparpiller !

Un système complet clé en main pour structurer votre activité de vente de produits digitaux ou de services.

#### ⚙️ Inclus dans ce pack d'automatisation :
1. **Template Notion Business OS** : Suivi des revenus, CRM client, calendrier éditorial et gestion de projets.
2. **Tunnel de Vente System.io dupliquable** : Page de capture, page de vente et séquence d'emails automatiques.
3. **Guide de Configuration pas à pas** pour connecter le tout en moins d'une heure.",
                'features' => [
                    "Espace Notion dupliquable en 1 clic",
                    "Tunnel de vente System.io prêt à importer",
                    "Séquences d'emails de relance automatiques rédigées",
                    "Accès illimité et réutilisable"
                ],
                'curriculum' => [
                    ["title" => "Lien de duplication du Workspace Notion Business OS", "duration" => "Accès 1-Click"],
                    ["title" => "Lien d'importation du Tunnel de Vente System.io", "duration" => "Accès 1-Click"],
                    ["title" => "Tutoriel vidéo de déploiement express", "duration" => "20 min"]
                ],
                'access_details' => "Liens de duplication directe pour Notion et System.io + guide vidéo.",
                'is_active' => true,
                'is_featured' => false,
                'sales_count' => 45,
                'views_count' => 310,
            ],
        ];

        foreach ($products as $pData) {
            PrivateProduct::create($pData);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PrivateProduct;

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
                'badge_text' => 'PACK VIDÉO',
                'tagline' => 'Exploitez 100% des fonctions Pro de CapCut (PC & Mobile) et accédez à plus de 150 presets de transitions, titres et sous-titres dynamiques.',
                'cover_image' => 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                'description_markdown' => "### Créez des vidéos virales sur TikTok, Reels et Shorts sans abonnement mensuel !

Dans ce pack complet de ressources pour créateurs, découvrez comment maîtriser le logiciel **CapCut** sur ordinateur et téléphone pour produire des vidéos captivantes.

#### 🎯 Ce que contient cette ressource :
1. **Fichier Vidéo HD (1h45)** : Prise en main, montage rythmé, animations de texte avancées.
2. **Pack de Presets & Transitions** : Titres et transitions animés éditables.
3. **Pack Audio Sound FX** : Plus de 50 effets sonores de transition (Swoosh, Glitch, Pops).
4. **Overlays Visuels** : Textures rétro, fuites de lumière et poussière de film 4K.

#### 🎁 Bonus inclus dans le dossier de téléchargement :
- Guide PDF des raccourcis clavier CapCut PC/Mac.
- Accès à vie aux futures mises à jour du dossier.",
                'features' => [
                    "Vidéo explicative HD accessible en ligne",
                    "Guide pratique étape par étape pour tous les supports",
                    "Pack de 150+ Presets & FX Sonores libres de droits",
                    "Téléchargement direct et permanent"
                ],
                'curriculum' => [
                    ["title" => "Fichier vidéo MP4 : Masterclass CapCut Pro (1h45)", "duration" => "Format HD 1080p"],
                    ["title" => "Pack de Presets (.prfpset) : 150+ Transitions & Effets", "duration" => "Archive ZIP 15 Mo"],
                    ["title" => "Kit audio (.wav) : 50+ FX Sonores pour montage dynamique", "duration" => "Archive ZIP 45 Mo"],
                    ["title" => "Guide des raccourcis clavier CapCut", "duration" => "Fichier PDF"]
                ],
                'access_details' => "Accès direct au dossier Google Drive sécurisé contenant la masterclass vidéo et l'ensemble des fichiers de presets.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 0,
                'views_count' => 0,
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
                    "500+ Templates Canva éditables",
                    "Compatible Canva Gratuit & Canva Pro",
                    "Notice PDF d'importation rapide en 1 clic",
                    "Accès permanent et réutilisable à l'infini"
                ],
                'curriculum' => [
                    ["title" => "Modèles de Carrousels Instagram (150 Templates)", "duration" => "Format Carré & Portrait"],
                    ["title" => "Modèles de Stories & Reels Covers (100 Templates)", "duration" => "Format Vertical 9:16"],
                    ["title" => "Bannières & Posts promotionnels (150 Templates)", "duration" => "Format Carré & Paysage"],
                    ["title" => "Miniatures YouTube (100 Templates Canva)", "duration" => "Format Paysage 16:9"]
                ],
                'access_details' => "Liens d'intégration directe Canva + dossier Drive de secours contenant les modèles.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 0,
                'views_count' => 0,
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
                'badge_text' => 'LIVRE NUMÉRIQUE',
                'tagline' => 'Le guide pratique pour trouver des clients qualifiés, rédiger des propositions commerciales irrésistibles et valider vos acomptes.',
                'cover_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => null,
                'description_markdown' => "### Ne bradez plus vos prestations de services !

Un guide étape par étape rédigé à partir d'expériences réelles de consulting et de vente de services digitaux.

#### 📘 Au sommaire de cet Ebook (94 pages + annexes) :
1. **Positionnement Stratégique** : Passer de simple exécutant à conseiller indispensable.
2. **Scripts de Prospection LinkedIn & Email** : Les structures exactes pour décrocher des rendez-vous.
3. **Trame de Devis & Contrats** : Modèle Word/PDF réutilisable pour sécuriser vos acomptes de 50%.
4. **Techniques de Négociation** : Répondre aux objections de prix avec aplomb.",
                'features' => [
                    "Ebook PDF complet de 94 pages (lecture PC & Mobile)",
                    "Modèles Word/PDF de devis et contrat éditables",
                    "Scripts de prospection LinkedIn & d'approche commerciale",
                    "Téléchargement direct immédiat"
                ],
                'curriculum' => [
                    ["title" => "Guide pratique PDF : Prospection & Devis Freelance", "duration" => "Livre de 94 pages"],
                    ["title" => "Modèle Word / Excel : Devis & Contrats éditables", "duration" => "Fichier DOCX / XLSX"],
                    ["title" => "Scripts textuels : Relance client & LinkedIn", "duration" => "Fichier TXT"]
                ],
                'access_details' => "Téléchargement immédiat du livre numérique PDF et de son dossier d'annexes et modèles.",
                'is_active' => true,
                'is_featured' => false,
                'sales_count' => 0,
                'views_count' => 0,
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
                'badge_text' => 'PACK RESSOURCES',
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
                    ["title" => "Effets Sonores (300+ Sound FX pour monteurs)", "duration" => "Format WAV Haute Qualité"],
                    ["title" => "LUTs Cinéma (250+ Fichiers de colorimétrie)", "duration" => "Fichiers .CUBE"],
                    ["title" => "Overlays vidéo (200+ Textures, Glitch & Grain)", "duration" => "Fichiers MP4 4K"],
                    ["title" => "Bruits de fond & Ambiances sonores", "duration" => "250+ Fichiers WAV"]
                ],
                'access_details' => "Lien permanent d'accès au dossier Google Drive partagé contenant le méga-pack.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 0,
                'views_count' => 0,
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
                'badge_text' => 'TEMPLATE & SYSTEM',
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
                    ["title" => "Workspace Notion : OS Business complet", "duration" => "Lien de duplication direct"],
                    ["title" => "Tunnel de Vente System.io : Duplicable", "duration" => "Lien d'importation direct"],
                    ["title" => "Guide de déploiement PDF & vidéo tutoriel", "duration" => "Fichier PDF & Vidéo MP4"]
                ],
                'access_details' => "Liens de duplication directe pour Notion et System.io + guide de configuration rapide.",
                'is_active' => true,
                'is_featured' => false,
                'sales_count' => 0,
                'views_count' => 0,
            ],
        ];

        foreach ($products as $pData) {
            PrivateProduct::create($pData);
        }
    }
}

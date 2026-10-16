<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PrivateProduct;

class PrivateProductSeeder extends Seeder
{
    public function run(): void
    {
        // Clean existing records to guarantee fresh products
        PrivateProduct::query()->delete();

        $products = [
            [
                'title' => 'Comment monter des vidéos professionnelles avec CapCut Pro gratuitement',
                'slug' => 'monter-videos-professionnelles-capcut-pro',
                'token' => 'capcut-pro-v1',
                'category' => 'formation_video',
                'price' => 2800.00,
                'original_price' => 15000.00,
                'ad_spend' => 0.00,
                'access_type' => 'drive',
                'access_url' => 'https://drive.google.com/drive/folders/votre-dossier-capcut-pro-ici',
                'badge_text' => 'FORMATION VIDÉO',
                'tagline' => 'Dominez le montage vidéo sur smartphone et PC. Créez des transitions fluides, des effets accrocheurs et des textes animés pour booster vos réseaux.',
                'cover_image' => 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => null,
                'description_markdown' => "### Créez des vidéos virales à fort impact sur TikTok, Reels et Shorts !
                
Dans cette formation complète et pratique, apprenez à maîtriser le logiciel **CapCut** (sur PC/Mac et Mobile) pour concevoir des vidéos au rendu professionnel sans y passer des heures.

#### 🎯 Ce que vous allez apprendre :
1. **Montage dynamique** : Rythmer vos plans, couper les silences et animer l'écran.
2. **Transitions et Effets** : Ajouter des effets professionnels (Zoom, Pan, Glow) et des bruitages synchronisés.
3. **Sous-titres stylisés** : Générer et animer des sous-titres captivants qui retiennent l'attention.
4. **Correction colorimétrique** : Rendre vos vidéos éclatantes et de haute qualité.

#### 📦 Fichiers inclus dans votre accès :
- Masterclass vidéo chapitrée (1h30).
- Pack de transitions et d'overlays libres de droits.
- Guide PDF des raccourcis clavier.",
                'features' => [
                    "Masterclass vidéo complète (Accès à vie)",
                    "Méthodes applicables sur PC, Mac et Smartphone",
                    "Pack de transitions et effets audio/visuels inclus",
                    "Mises à jour gratuites régulières"
                ],
                'curriculum' => [
                    ["title" => "Module 1 : Prise en main et découpe dynamique", "duration" => "15 min"],
                    ["title" => "Module 2 : Transitions, Effets et Masques", "duration" => "25 min"],
                    ["title" => "Module 3 : Textes animés et sous-titres automatiques", "duration" => "20 min"],
                    ["title" => "Module 4 : Étalonnage et Sound Design pro", "duration" => "30 min"]
                ],
                'access_details' => "Accès direct au dossier Google Drive contenant les vidéos de formation et les ressources téléchargeables.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 0,
                'views_count' => 0,
            ],
            [
                'title' => 'Documents et ressources freelance en design graphique pour facturer 5 fois plus cher',
                'slug' => 'documents-ressources-freelance-design-graphique',
                'token' => 'freelance-design-v2',
                'category' => 'ebook_guide',
                'price' => 5500.00,
                'original_price' => 25000.00,
                'ad_spend' => 0.00,
                'access_type' => 'drive',
                'access_url' => 'https://drive.google.com/drive/folders/votre-dossier-freelance-ici',
                'badge_text' => 'KIT FREELANCE',
                'tagline' => 'Le kit complet des freelances d\'élite. Modèles de devis signants, contrats de prestation sécurisés, grilles tarifaires et scripts de vente.',
                'cover_image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => null,
                'description_markdown' => "### Arrêtez de brader votre talent et passez à la vitesse supérieure !

Ce kit complet contient l'intégralité des documents contractuels, stratégiques et commerciaux dont vous avez besoin pour structurer votre activité de designer freelance et signer des projets à forte valeur.

#### 💼 Contenu détaillé de la boîte à outils :
1. **Modèle de Devis & CGV** : Des documents épurés et rassurants qui justifient vos tarifs.
2. **Contrat de Prestation** : Un contrat type rédigé pour sécuriser vos acomptes et protéger vos droits d'auteur.
3. **Calculateur de TJM** : Un simulateur Excel pour définir vos tarifs journaliers réels et vos marges.
4. **Scripts d'entretien** : La trame exacte de questions à poser en appel découverte pour convaincre vos prospects sans forcer.

#### 🎁 Bonus inclus :
- Guide PDF sur le positionnement de marque personnelle pour attirer des clients qualifiés sans démarcher activement.",
                'features' => [
                    "Modèles Word/Excel 100% modifiables et réutilisables",
                    "Contrats juridiques simplifiés et protecteurs",
                    "Scripts de relance et traitement des objections de prix",
                    "Accès permanent et téléchargement instantané"
                ],
                'curriculum' => [
                    ["title" => "Guide PDF : Facturer à la valeur en Freelance (45 pages)", "duration" => "Lecture 1h"],
                    ["title" => "Modèle Word : Contrat de Prestation sécurisé", "duration" => "Fichier éditables (.docx)"],
                    ["title" => "Modèle Excel : Calculateur de TJM et Budget", "duration" => "Fichier éditables (.xlsx)"],
                    ["title" => "Scripts textuels : Réponses aux objections de prix", "duration" => "Fichier PDF"]
                ],
                'access_details' => "Accès permanent au dossier Google Drive regroupant tous les templates de contrats, fiches de calcul et guides commerciaux.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 0,
                'views_count' => 0,
            ],
            [
                'title' => 'Pack de templates et mockups flyer en design graphique',
                'slug' => 'pack-templates-mockups-flyer-design-graphique',
                'token' => 'flyer-templates-v3',
                'category' => 'template_design',
                'price' => 6000.00,
                'original_price' => 25000.00,
                'ad_spend' => 0.00,
                'access_type' => 'drive',
                'access_url' => 'https://drive.google.com/drive/folders/votre-dossier-flyers-ici',
                'badge_text' => 'PACK TEMPLATES',
                'tagline' => 'Sublimez vos présentations clients avec des flyers professionnels. Templates de flyers éditables et mockups photoréalistes en haute résolution.',
                'cover_image' => 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => null,
                'description_markdown' => "### Divisez par deux votre temps de conception graphique !

Un ensemble massif de templates de flyers éditables sous Photoshop et de mockups professionnels de haute qualité pour présenter vos travaux sous leur meilleur jour et déclencher des coups de cœur clients.

#### 🎨 Ce que comprend ce pack :
- **Templates de Flyers (25 fichiers PSD éditables)** : Fichiers organisés en calques structurés (styles événements, soirées, corporate, immobilier, restauration).
- **Mockups Premium (10 PSD)** : Des mises en situation réelles (papier texturé, reflets, ombres réalistes) avec objets dynamiques pour insérer vos créations en un clic.
- **Dossier typographique** : Liens et fichiers de polices modernes gratuites utilisées dans les designs.

#### ⚡ Caractéristiques techniques :
- Format A5 (standard impression).
- Résolution 300 DPI, profils de couleurs CMJN (prêt pour impression).
- Entièrement modifiable et personnalisable.",
                'features' => [
                    "25 Templates de Flyers PSD éditables",
                    "10 Mockups de présentation réalistes avec Objets Dynamiques",
                    "Résolution professionnelle 300 DPI prête pour impression",
                    "Polices de caractères gratuites et modernes incluses"
                ],
                'curriculum' => [
                    ["title" => "Templates de Flyers Événementiels (15 fichiers PSD)", "duration" => "Format A5 / 300 DPI"],
                    ["title" => "Templates de Flyers Corporate (10 fichiers PSD)", "duration" => "Format A5 / CMJN"],
                    ["title" => "Mockups de mise en situation (10 fichiers PSD)", "duration" => "Mockups Smart Object"],
                    ["title" => "Dossier de polices de caractères libres de droits", "duration" => "Fichiers .OTF / .TTF"]
                ],
                'access_details' => "Lien de téléchargement direct vers le dossier de stockage contenant tous les fichiers PSD et ressources d'accompagnement.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 0,
                'views_count' => 0,
            ],
            [
                'title' => 'Pack ultime de ressources graphiques pour concepteurs',
                'slug' => 'pack-ultime-ressources-graphiques-concepteurs',
                'token' => 'ultime-ressources-v4',
                'category' => 'pack_ressources',
                'price' => 7000.00,
                'original_price' => 30000.00,
                'ad_spend' => 0.00,
                'access_type' => 'drive',
                'access_url' => 'https://drive.google.com/drive/folders/votre-dossier-pack-ultime-ici',
                'badge_text' => 'PACK RESSOURCES',
                'tagline' => 'La bibliothèque définitive pour graphistes et créatifs. Milliers d\'images HD, textures, icônes vectorielles, dégradés et éléments de conception.',
                'cover_image' => 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
                'preview_video_url' => null,
                'description_markdown' => "### Le pack ultime pour ne plus jamais manquer de ressources !

Vous y trouverez des milliers d'éléments graphiques bruts indispensables pour concevoir des logos, bannières, affiches, packagings ou sites internet originaux.

#### 💎 Contenu exceptionnel du bundle :
1. **1000+ Icônes Vectorielles** : Pack d'icônes SVG et PNG transparents, classés par thématiques (tech, finance, business, voyage, lifestyle).
2. **200+ Textures HD & Overlays** : Grains de papier, effets grunge, bruits de film argentique et fuites de lumière pour donner du caractère à vos visuels.
3. **500+ Palettes & Dégradés** : Fichiers prêts à importer dans Illustrator et Photoshop pour des agencements de couleurs percutants.
4. **50 Éléments 3D Premium** : Illustrations 3D haute qualité au format PNG transparent pour moderniser vos interfaces ou visuels marketing.

#### ⚡ Pourquoi choisir ce pack :
- Gain de temps énorme sur tous vos projets.
- Fichiers légers, parfaitement classés et triés par dossier.",
                'features' => [
                    "Plus de 1500 ressources éditables de qualité premium",
                    "Formats standards compatibles Photoshop, Illustrator, Figma, Canva",
                    "Textures et illustrations 3D haute résolution",
                    "Licence d'utilisation commerciale sans attribution requise"
                ],
                'curriculum' => [
                    ["title" => "Bibliothèque d'icônes vectorielles (1000+ SVG)", "duration" => "Archive ZIP 80 Mo"],
                    ["title" => "Overlays et textures haute définition (200+ fichiers)", "duration" => "Archive ZIP 250 Mo"],
                    ["title" => "Palettes de dégradés et fichiers de couleurs (.GRD)", "duration" => "Fichiers Photoshop / Illustrator"],
                    ["title" => "Kit d'illustrations 3D de haute qualité (50 éléments)", "duration" => "Fichiers .PNG transparents / .BLEND"]
                ],
                'access_details' => "Dossier d'accès Google Drive partagé de façon permanente avec option de téléchargement groupé ou individuel.",
                'is_active' => true,
                'is_featured' => true,
                'sales_count' => 0,
                'views_count' => 0,
            ],
        ];

        foreach ($products as $pData) {
            PrivateProduct::create($pData);
        }
    }
}

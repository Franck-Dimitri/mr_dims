<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Blog;
use App\Models\Service;
use Illuminate\Support\Str;

class LiveContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // PROJETS
        $projects = [
            [
                'title' => 'Sellify - Plateforme E-commerce & Escrow',
                'slug' => Str::slug('Sellify - Plateforme E-commerce & Escrow'),
                'excerpt' => 'La solution e-commerce tout-en-un pour l\'Afrique. Connectant vendeurs ambitieux, clients exigeants et livreurs agiles à travers des paiements Escrow garantis.',
                'description_markdown' => "### Architecture d'une Marketplace Complète\n\nSellify est une plateforme e-commerce multi-tenant (SaaS) développée avec Laravel et React (Inertia.js). Elle permet à chaque vendeur de disposer d'une boutique avec une gestion avancée des stocks, et intègre un système logistique intelligent pour les livreurs partenaires.\n\n- **Sécurité** : Intégration de paiements Mobile Money (Orange, MTN) via un système de séquestre (Escrow).\n- **Logistique IA** : Attribution automatique des courses aux livreurs à proximité.\n- **Performance** : Temps de chargement optimisé et SEO dynamique.",
                'tech_stack' => json_encode(['Laravel 11', 'React.js', 'Inertia.js', 'Tailwind CSS', 'MySQL', 'Redis']),
                'repository_url' => 'https://github.com/Franck-Dimitri/sellify',
                'live_url' => 'https://sellify.me',
                'is_featured' => true,
                'development_time' => '3 mois',
            ],
            [
                'title' => 'Saamaya BI - Intelligence d\'Affaires Financière',
                'slug' => Str::slug('Saamaya BI - Intelligence d\'Affaires Financière'),
                'excerpt' => 'Plateforme de Business Intelligence conçue spécifiquement pour les institutions de microfinance conformes aux normes COBAC.',
                'description_markdown' => "### L'Analyse Financière au Service des Microfinances\n\nSaamaya BI est une solution d'analyse de données sécurisée qui consolide et traite les données financières pour générer des tableaux de bord en temps réel. L'architecture a été conçue pour respecter des normes strictes de conformité.\n\n- **Modélisation de Données** : Prisma ORM couplé à PostgreSQL pour des requêtes complexes.\n- **Workers Arrière-plan** : Ingestion massive de données via des processus asynchrones.\n- **Visualisation** : Graphiques interactifs React (Recharts / Chart.js).",
                'tech_stack' => json_encode(['Node.js', 'React.js', 'Prisma ORM', 'PostgreSQL', 'BullMQ']),
                'repository_url' => 'https://github.com/Franck-Dimitri/saamaya-bi',
                'live_url' => null,
                'is_featured' => true,
                'development_time' => '4 mois',
            ],
            [
                'title' => 'Système de Gestion de Polyclinique (ERP)',
                'slug' => Str::slug('Système de Gestion de Polyclinique ERP'),
                'excerpt' => 'Un système de gestion intégré pour les centres hospitaliers, englobant les consultations, la pharmacie et la facturation.',
                'description_markdown' => "### Numérisation du Secteur Médical\n\nCet ERP gère l'ensemble du cycle de vie patient : de l'accueil à la sortie, en passant par les résultats d'examens de laboratoire et la prescription électronique.\n\n- **Dossier Médical Électronique (DME)** : Accès sécurisé aux antécédents médicaux.\n- **Gestion des Stocks** : Suivi des médicaments avec alertes de péremption.\n- **Tableau de Bord Administratif** : Rapports financiers journaliers.",
                'tech_stack' => json_encode(['Laravel', 'Livewire', 'Alpine.js', 'Tailwind CSS']),
                'repository_url' => null,
                'live_url' => null,
                'is_featured' => false,
                'development_time' => '2.5 mois',
            ]
        ];

        foreach ($projects as $project) {
            if(!Project::where('slug', $project['slug'])->exists()){
                Project::create($project);
            }
        }

        // BLOGS
        $blogs = [
            [
                'title' => 'Comment l\'IA Révolutionne le Développement Web en 2026',
                'slug' => Str::slug('Comment l\'IA Révolutionne le Développement Web en 2026'),
                'meta_description' => 'Découvrez comment les outils d\'Intelligence Artificielle redéfinissent l\'architecture logicielle et l\'efficacité des développeurs Full-Stack.',
                'markdown_content' => "L'Intelligence Artificielle ne vient pas remplacer les développeurs, elle vient augmenter nos capacités. \n\nEn 2026, l'utilisation de modèles agentiques permet non seulement de générer du code boilerplate en un temps record, mais surtout de réaliser des audits de sécurité complexes.\n\n### Les avantages au quotidien\n- Réduction drastique du temps de débogage.\n- Assistance lors de la conception d'architectures de bases de données (Prisma, Eloquent).\n- Génération de tests unitaires et d'intégration.\n\nLa véritable valeur d'un ingénieur logiciel aujourd'hui réside dans sa capacité à orchestrer ces outils IA pour livrer des produits robustes plus rapidement.",
                'status' => 'published',
                'author' => 'Mbouom Dimitri',
                'published_at' => now(),
                'views_count' => rand(100, 500),
                'likes_count' => rand(10, 50),
            ],
            [
                'title' => 'Les Avantages d\'Inertia.js avec Laravel et React',
                'slug' => Str::slug('Les Avantages d\'Inertia.js avec Laravel et React'),
                'meta_description' => 'Pourquoi j\'utilise Inertia.js pour mes projets SaaS modernes et comment cela accélère le temps de développement.',
                'markdown_content' => "Le développement d'Applications Single Page (SPA) a longtemps nécessité la création d'une API côté serveur (Laravel) et d'un client lourd séparé (React/Vue). Cette approche est excellente mais souvent sur-dimensionnée pour beaucoup de projets.\n\n### La révolution Inertia\nInertia.js agit comme une colle magique entre Laravel et React. Vous n'avez plus besoin de :\n- Gérer le routage côté client (React Router)\n- Gérer l'état de l'authentification côté client\n- Écrire des appels axios répétitifs.\n\nVous retournez directement un composant React depuis un contrôleur Laravel ! Cela divise le temps de développement par deux tout en offrant l'expérience utilisateur ultra-fluide d'une SPA.",
                'status' => 'published',
                'author' => 'Mbouom Dimitri',
                'published_at' => now()->subDays(2),
                'views_count' => rand(100, 500),
                'likes_count' => rand(10, 50),
            ],
            [
                'title' => 'Pourquoi l\'Optimisation SEO est Vitale pour les SPA',
                'slug' => Str::slug('Pourquoi l\'Optimisation SEO est Vitale pour les SPA'),
                'meta_description' => 'Les défis du référencement naturel sur les applications React et comment les surmonter.',
                'markdown_content' => "Les Single Page Applications offrent une expérience utilisateur inégalée. Cependant, historiquement, elles ont un grand défaut : le SEO. Les robots des moteurs de recherche voyaient souvent une page blanche car ils n'exécutaient pas le JavaScript.\n\n### Comment résoudre ce problème ?\n- **SSR (Server-Side Rendering)** : Rendre le code HTML sur le serveur avant de l'envoyer au client.\n- **Balises Meta Dynamiques** : Utiliser un composant `<Head>` pour injecter des titres et descriptions par page.\n- **Sitemap & Fichier Robots.txt** : Aider Google à cartographier votre application.\n- **AIO (AI Optimization)** : Fournir un fichier `llm.txt` lisible directement par des IA comme ChatGPT pour être référencé dans les réponses IA.",
                'status' => 'published',
                'author' => 'Mbouom Dimitri',
                'published_at' => now()->subDays(5),
                'views_count' => rand(100, 500),
                'likes_count' => rand(10, 50),
            ]
        ];

        foreach ($blogs as $blog) {
            if(!Blog::where('slug', $blog['slug'])->exists()){
                Blog::create($blog);
            }
        }

        // SERVICES
        $services = [
            [
                'title' => 'Développement d\'Applications SaaS Complètes',
                'slug' => Str::slug('Développement d\'Applications SaaS Complètes'),
                'ref_id' => 'SRV_SAAS_01',
                'excerpt' => 'Je conçois et développe des plateformes cloud (SaaS) prêtes à la commercialisation, scalables et hautement sécurisées.',
                'description_markdown' => "Vous avez une idée de startup SaaS ? Je me charge de l'architecture complète, du modèle de base de données jusqu'à l'interface utilisateur. \n\n- Architecture Multi-Tenants\n- Intégration de passerelles de paiement (Stripe, Mobile Money)\n- Systèmes de souscriptions / abonnements\n- Panneaux d'administration complexes",
                'tech_stack' => json_encode(['Laravel', 'React', 'MySQL', 'Redis']),
                'base_price' => 1000000.00,
                'is_active' => true,
            ],
            [
                'title' => 'Création de Plateformes E-commerce',
                'slug' => Str::slug('Création de Plateformes E-commerce'),
                'ref_id' => 'SRV_ECOM_02',
                'excerpt' => 'Boutiques en ligne performantes et sur-mesure pour propulser vos ventes sur internet.',
                'description_markdown' => "Passez au niveau supérieur de la vente en ligne. Je ne crée pas de simples sites vitrines, mais de véritables machines de vente optimisées.\n\n- Gestion de catalogues complexes et variations de produits\n- Tunnels d'achat (Checkout) optimisés pour la conversion\n- API pour logisticiens et livreurs\n- Tableaux de bord de suivi de commandes en temps réel",
                'tech_stack' => json_encode(['Laravel', 'Inertia.js', 'React']),
                'base_price' => 600000.00,
                'is_active' => true,
            ],
            [
                'title' => 'Développement d\'API & Backend',
                'slug' => Str::slug('Développement API & Backend'),
                'ref_id' => 'SRV_API_03',
                'excerpt' => 'Architectures backend solides pour vos applications web ou mobiles (RESTful API, GraphQL).',
                'description_markdown' => "Votre application mobile ou frontend React/Vue a besoin d'un cerveau ? Je développe des API robustes, documentées et sécurisées.\n\n- Conception d'API RESTful\n- Systèmes d'authentification par Tokens (Sanctum / JWT)\n- Optimisation de requêtes SQL\n- Intégration de services tiers (SMS, Paiement, Mails, Géolocalisation)",
                'tech_stack' => json_encode(['Laravel API', 'PostgreSQL', 'Node.js']),
                'base_price' => 450000.00,
                'is_active' => true,
            ]
        ];

        foreach ($services as $service) {
            if(!Service::where('slug', $service['slug'])->exists()){
                Service::create($service);
            }
        }
    }
}

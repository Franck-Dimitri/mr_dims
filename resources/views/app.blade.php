<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

        <title inertia>{{ config('app.name', "Mr Dim's") }}</title>

        <!-- Canonical URL -->
        <link rel="canonical" href="{{ url()->current() }}">

        <!-- Machine-Readable AI Context (GEO / LLMs) -->
        <link rel="alternate" type="text/markdown" href="{{ url('/llms.txt') }}" title="LLMs.txt">

        <!-- Favicon & App Icon -->
        <link rel="icon" type="image/x-icon" href="/icone.ico">
        <link rel="shortcut icon" type="image/x-icon" href="/icone.ico">
        <link rel="apple-touch-icon" href="/icone.ico">

        <!-- Métadonnées SEO & Réseaux Sociaux (WhatsApp, LinkedIn, X/Twitter, Facebook) -->
        <meta name="description" content="Ingénieur Logiciel & Architecte Solutions. Conception de solutions logicielles, microservices, intégrations IA et applications web sur-mesure pour entreprises et entrepreneurs.">
        <meta name="author" content="Mbouom Franck Dimitri (Mr Dim's)">
        <meta name="keywords" content="Ingénieur Logiciel, Architecte Solutions, Développeur Full Stack, Laravel, React, Inertia.js, Microservices, Intégration IA, Escrow, Mobile Money, Yaoundé, Cameroun, Franck Dimitri, Mr Dim's">

        <meta property="og:title" content="Franck Dimitri (Mr Dim's) — Ingénieur Logiciel & Architecte Solutions">
        <meta property="og:description" content="Conception de solutions logicielles sur-mesure, fiables et génératrices de valeur : Web performant, Microservices & Intégrations IA.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:site_name" content="Franck Dimitri (Mr Dim's)">
        <meta property="og:image" content="https://mrdims.dev/og-banner.png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Franck Dimitri (Mr Dim's) — Ingénieur Logiciel & Architecte Solutions">
        <meta name="twitter:description" content="Conception de solutions logicielles sur-mesure, fiables et génératrices de valeur : Web performant, Microservices & Intégrations IA.">
        <meta name="twitter:image" content="https://mrdims.dev/og-banner.png">

        <!-- Structured Data / JSON-LD for AI & Search Engine Crawlers (Server-Side Fallback) -->
        @php
            $serverJsonLd = [
                '@context' => 'https://schema.org',
                '@graph' => [
                    [
                        '@type' => 'Person',
                        '@id' => 'https://mrdims.dev/#person',
                        'name' => 'Mbouom Franck Dimitri',
                        'alternateName' => ["Mr Dim's", 'Franck Dimitri'],
                        'url' => 'https://mrdims.dev',
                        'image' => 'https://mrdims.dev/profile.jpg',
                        'jobTitle' => 'Ingénieur Logiciel & Architecte Solutions',
                        'worksFor' => [
                            '@type' => 'Organization',
                            'name' => "Mr Dim's Software Engineering",
                        ],
                        'description' => "Architecte Logiciel et Ingénieur Full Stack spécialisé dans les applications web réactives, microservices Laravel/React, fintechs Mobile Money et intégrations IA.",
                        'knowsAbout' => [
                            'Software Architecture',
                            'Laravel Framework',
                            'React.js',
                            'Inertia.js',
                            'Tailwind CSS',
                            'Microservices',
                            'RESTful APIs',
                            'PostgreSQL & MySQL',
                            'Redis Caching',
                            'DevOps & Linux Nginx',
                            'Artificial Intelligence Integration',
                            'Escrow Systems & Mobile Money',
                        ],
                        'sameAs' => [
                            'https://github.com/Franck-Dimitri',
                            'https://www.linkedin.com/in/franck-dimitri-mbouom',
                        ],
                        'address' => [
                            '@type' => 'PostalAddress',
                            'addressLocality' => 'Yaoundé',
                            'addressCountry' => 'CM',
                        ],
                        'email' => 'mailto:franckdimitrio009@gmail.com',
                        'telephone' => '+237676383986',
                    ],
                    [
                        '@type' => 'WebSite',
                        '@id' => 'https://mrdims.dev/#website',
                        'url' => 'https://mrdims.dev',
                        'name' => "Franck Dimitri (Mr Dim's) Portfolio",
                        'publisher' => [
                            '@id' => 'https://mrdims.dev/#person',
                        ],
                        'inLanguage' => ['fr', 'en'],
                    ],
                ],
            ];
        @endphp
        <script type="application/ld+json">
        {!! json_encode($serverJsonLd, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) !!}
        </script>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        <script>
            if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        </script>
        
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>

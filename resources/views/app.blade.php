<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', "Mr Dim's") }}</title>

        <!-- Fallback SEO pour les réseaux sociaux (WhatsApp, LinkedIn, Twitter) -->
        <meta name="description" content="Développeur web Full-Stack, créateur de solutions technologiques innovantes et adaptées.">
        <meta property="og:title" content="Mr Dim's - Ingénieur Full Stack">
        <meta property="og:description" content="Développeur web Full-Stack, créateur de solutions technologiques innovantes et adaptées.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="https://mrdims.dev">
        <meta property="og:site_name" content="Mr Dim's">
        <!-- Remplacer par le vrai lien d'une image de couverture plus tard -->
        <meta property="og:image" content="https://mrdims.dev/logo.png">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Mr Dim's - Ingénieur Full Stack">
        <meta name="twitter:description" content="Développeur web Full-Stack, créateur de solutions technologiques innovantes et adaptées.">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">

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

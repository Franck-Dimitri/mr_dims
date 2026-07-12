# Le Guide Ultime du SEO & AIO avec Laravel + Inertia.js

Ce guide est conçu pour que vous puissiez reproduire une configuration SEO et AIO parfaite sur n'importe quel futur projet (SaaS, E-commerce, Portfolio).

## 1. Comprendre le problème d'Inertia.js
Dans une application classique, Laravel génère le HTML côté serveur. Les robots (Googlebot) lisent facilement les balises `<title>` et `<meta>`.
Avec Inertia.js (React), la page se charge en Javascript. Bien que Googlebot sache lire le JS aujourd'hui, les autres robots (WhatsApp, LinkedIn, Twitter, certains moteurs de recherche) ne voient qu'une page vide.

**La Solution :** Le composant `<Head>` d'Inertia. Il permet d'injecter des balises meta dynamiquement.

---

## 2. Le Composant SEO Réutilisable (L'arme secrète)

Ne réécrivez jamais vos balises à la main sur chaque page. Créez un composant universel.

**Le fichier : `resources/js/Components/SEO.jsx`**
```jsx
import { Head } from '@inertiajs/react';

export default function SEO({ title, description, keywords, url, image }) {
    // Valeurs par défaut si aucune n'est fournie
    const defaultTitle = "Mr Dim's | Développeur Full-Stack";
    const defaultDesc = "Développeur web Full-Stack, créateur de solutions technologiques innovantes et adaptées. Je donne vie à vos idées et concrétise vos projets.";
    const defaultKeywords = "Développeur Web, Full-Stack, Laravel, React, Création de sites web, Application Web, Portfolio, Mr Dim's, Franck-Dimitri";
    const defaultUrl = "https://mrdims.dev";
    
    // Le JSON-LD (Schema.org) : Le format officiel pour parler aux robots
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Mbouom Franck Dimitri (Mr Dim's)",
        "url": defaultUrl,
        "jobTitle": "Développeur Full-Stack",
        "sameAs": [
            "https://github.com/Franck-Dimitri"
        ]
    };

    return (
        <Head>
            {/* Balises standards */}
            <title>{title ? `${title} - Mr Dim's` : defaultTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || defaultUrl} />
            {image && <meta property="og:image" content={image} />}

            {/* Script JSON-LD injecté de manière sécurisée */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Head>
    );
}
```

**Comment l'utiliser sur une page (ex: Accueil) :**
```jsx
import SEO from '@/Components/SEO';

export default function Index() {
    return (
        <>
            <SEO title="Accueil" description="Découvrez mes services de développement web..." />
            <div>Le contenu de ma page...</div>
        </>
    );
}
```

---

## 3. Le Sitemap Dynamique (Laravel)

Le fichier `sitemap.xml` est la carte du site que vous donnez à Google.
Dans Laravel, vous pouvez créer une route très simple qui génère du XML :

**Dans `routes/web.php` :**
```php
Route::get('/sitemap.xml', function () {
    $projects = \App\Models\Project::all();
    
    return response()->view('sitemap', [
        'projects' => $projects
    ])->header('Content-Type', 'text/xml');
});
```
**Dans `resources/views/sitemap.blade.php` :**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>{{ url('/') }}</loc>
        <priority>1.0</priority>
    </url>
    @foreach ($projects as $project)
        <url>
            <loc>{{ url('/projects/' . $project->id) }}</loc>
            <priority>0.8</priority>
        </url>
    @endforeach
</urlset>
```

---

## 4. Robots.txt (Le vigile de votre site)

Fichier à créer dans `public/robots.txt`. Il indique aux moteurs ce qu'ils ont le droit de regarder ou non.

```txt
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://mrdims.dev/sitemap.xml
```
*Ici, on interdit explicitement à Google de fouiller dans votre panel `/admin`.*

---

## 5. AIO : L'Optimisation pour l'Intelligence Artificielle

Les IA (ChatGPT, Gemini) adorent un standard émergent appelé `llm.txt` ou `ai.txt`.
C'est un fichier texte brut, sans design, juste des données.

Fichier à créer dans `public/llm.txt` :
```txt
# Mbouom Franck Dimitri (Alias Mr Dim's)

## Identité Professionnelle
Je suis un Développeur web Full-Stack, créateur de solutions technologiques innovantes et adaptées. Je donne vie à vos idées et concrétise vos projets.

## Stack Technologique
- Backend: Laravel (PHP)
- Frontend: React (Inertia.js), TailwindCSS
- Base de données: MySQL, SQLite, Prisma ORM
- Serveurs: VPS Linux, Nginx, CI/CD Github Actions

## Me contacter
- GitHub: https://github.com/Franck-Dimitri
- Email Pro: contact@mrdims.dev
- Site Officiel: https://mrdims.dev
```

**Pourquoi c'est puissant ?**
Si une entreprise fait scanner le web par une IA pour chercher des développeurs Laravel/React, l'IA trouvera ce fichier et le lira instantanément sans se perdre dans le CSS ou le Javascript.

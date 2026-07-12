import { Head } from '@inertiajs/react';

export default function SEO({ title, description, keywords, url, image }) {
    const defaultTitle = "Mr Dim's | Développeur Full-Stack";
    const defaultDesc = "Développeur web Full-Stack, créateur de solutions technologiques innovantes et adaptées. Je donne vie à vos idées et concrétise vos projets.";
    const defaultKeywords = "Développeur Web, Full-Stack, Laravel, React, Création de sites web, Application Web, Portfolio, Mr Dim's, Franck-Dimitri";
    const defaultUrl = "https://mrdims.dev";
    
    // JSON-LD (Schema.org) format to talk to robots and AI
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Mbouom Dimitri (Mr Dim's)",
        "url": defaultUrl,
        "jobTitle": "Développeur Full-Stack",
        "sameAs": [
            "https://github.com/Franck-Dimitri"
        ]
    };

    return (
        <Head>
            <title>{title ? `${title} - Mr Dim's` : defaultTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content={keywords || defaultKeywords} />

            {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url || defaultUrl} />
            {image && <meta property="og:image" content={image} />}

            {/* Structured data injection */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </Head>
    );
}

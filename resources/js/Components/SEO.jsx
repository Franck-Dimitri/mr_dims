import React from 'react';
import { Head } from '@inertiajs/react';

export default function SEO({
    title,
    description,
    keywords,
    url,
    image,
    type = 'website',
    article = null,
    project = null,
    noIndex = false,
}) {
    const siteName = "Mr Dim's Dev";
    const defaultTitle = "Mr Dim's Dev | Ingénieur Logiciel & Architecte Web";
    const defaultDesc = "Ingénieur Informaticien — Génie Logiciel. Conception de solutions logicielles sur-mesure, microservices, architectures cloud et applications web réactives.";
    const defaultKeywords = "Ingénieur Logiciel, Architecte Solutions, Développeur Full-Stack, Laravel, React, Inertia.js, Microservices, Intégration IA, Yaoundé, Cameroun, Mr Dim's Dev, Mr Dim's";
    const siteUrl = "https://mrdims.dev";
    
    // Dynamic URL fallback
    const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : siteUrl);
    const ogImage = image || "https://mrdims.dev/og-banner.png";
    const fullTitle = title ? (title.includes("Mr Dim's") ? title : `${title} — Mr Dim's Dev`) : defaultTitle;
    const metaDescription = description || defaultDesc;
    const metaKeywords = keywords || defaultKeywords;

    // Structured Data (Schema.org JSON-LD) tailored for search bots and AI agents
    let schemaGraph = [];

    const personEntity = {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        "name": "Mr Dim's Dev",
        "alternateName": ["Mr Dim's", "mrdimsdev"],
        "url": siteUrl,
        "image": `${siteUrl}/profile.jpg`,
        "jobTitle": "Ingénieur Logiciel & Architecte Solutions",
        "description": "Architecte Logiciel et Ingénieur Web Full Stack spécialisé dans les architectures cloud, Laravel, React et systèmes scalables.",
        "sameAs": [
            "https://github.com/Franck-Dimitri",
            "https://x.com/mrdimsdev?s=11",
            "https://www.instagram.com/mrdimsdev?stkn=bGlndjk5enFyYm8%3D&utm_source=qr",
            "https://www.facebook.com/share/19szWdHnMt/?mibextid=wwXIfr"
        ]
    };

    if (type === 'article' && article) {
        schemaGraph = [
            personEntity,
            {
                "@type": "BlogPosting",
                "@id": `${canonicalUrl}#article`,
                "isPartOf": {
                    "@type": "WebSite",
                    "@id": `${siteUrl}/#website`,
                    "name": siteName,
                    "url": siteUrl
                },
                "headline": title || defaultTitle,
                "description": metaDescription,
                "image": ogImage,
                "datePublished": article.publishedTime,
                "dateModified": article.modifiedTime || article.publishedTime,
                "author": {
                    "@id": `${siteUrl}/#person`
                },
                "publisher": {
                    "@id": `${siteUrl}/#person`
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": canonicalUrl
                },
                "keywords": article.tags ? article.tags.join(', ') : metaKeywords
            }
        ];
    } else if ((type === 'software' || project) && project) {
        schemaGraph = [
            personEntity,
            {
                "@type": "SoftwareApplication",
                "@id": `${canonicalUrl}#software`,
                "name": project.name || fullTitle,
                "description": metaDescription,
                "applicationCategory": project.applicationCategory || "BusinessApplication",
                "operatingSystem": project.operatingSystem || "Web, Cloud, Linux",
                "author": {
                    "@id": `${siteUrl}/#person`
                },
                "image": ogImage,
                "url": canonicalUrl
            }
        ];
    } else {
        schemaGraph = [
            personEntity,
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "url": siteUrl,
                "name": siteName,
                "publisher": {
                    "@id": `${siteUrl}/#person`
                }
            }
        ];
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": schemaGraph
    };

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="author" content="Mbouom Franck Dimitri (Mr Dim's)" />
            
            {/* Directives Robots (indexation standard & preview pour IA) */}
            <meta 
                name="robots" 
                content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} 
            />
            
            {/* Canonical link */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Article Open Graph Metadata */}
            {type === 'article' && article && article.publishedTime && (
                <meta property="article:published_time" content={article.publishedTime} />
            )}
            {type === 'article' && article && article.modifiedTime && (
                <meta property="article:modified_time" content={article.modifiedTime} />
            )}
            {type === 'article' && article && (
                <meta property="article:author" content="Mbouom Franck Dimitri" />
            )}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImage} />

            {/* Structured data injection (Schema.org for AI & Google) */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Head>
    );
}

import React from 'react';
import { Head, Link } from '@inertiajs/react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import ProjectEstimator from '@/Components/ProjectEstimator';
import SEO from '@/Components/SEO';
import { useLanguage } from '@/Context/LanguageContext';

export default function Packs() {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };

    const packages = [
        {
            title: "Pack Starter",
            price: "165 500 FCFA",
            desc: lang === 'en'
                ? "Ideal for launching a fast landing page or a high-performance showcase website."
                : "Idéal pour lancer rapidement une landing page moderne ou un site vitrine haute performance.",
            features: lang === 'en' ? [
                "Blueprint Responsive Design",
                "Laravel 13 + React SPA Stack",
                "Secured Contact Form",
                "SEO & Performance Optimization",
                "Delivery in 7 to 10 days",
            ] : [
                "Design Responsive Blueprint",
                "Stack Laravel 13 + React SPA",
                "Formulaire de contact sécurisé",
                "Optimisation SEO & Performances",
                "Livraison en 7 à 10 jours",
            ],
            badge: lang === 'en' ? "Fast Launch" : "Lancement Rapide",
            isPopular: false,
        },
        {
            title: "Professional WebApp",
            price: "600 000 FCFA",
            desc: lang === 'en'
                ? "Complete web platform with authentication, admin dashboard, and custom API."
                : "Plateforme web complète avec authentification, dashboard d'administration et API sur-mesure.",
            features: lang === 'en' ? [
                "All Starter Pack Features",
                "Full Admin Back-Office (SYS_CTRL)",
                "JWT / Sanctum Authentication",
                "Roles & Permissions Management",
                "Advanced Analytics & Tracking",
                "3-Month Warranty & Support",
            ] : [
                "Toutes les options du pack Starter",
                "Espace Admin (SYS_CTRL) complet",
                "Authentification JWT / Sanctum",
                "Gestion des rôles & permissions",
                "Analytics & Traçabilité avancée",
                "Support & Garantie 3 mois",
            ],
            badge: lang === 'en' ? "Most Popular" : "Le Plus Populaire",
            isPopular: true,
        },
        {
            title: "Enterprise SaaS",
            price: lang === 'en' ? "Custom Quote" : "Sur Devis",
            desc: lang === 'en'
                ? "Complex architecture, microservices, payment gateways, and real-time features."
                : "Architecture complexe, microservices, intégrations bancaires et fonctionnalités temps réel.",
            features: lang === 'en' ? [
                "Cloud Infra & CI/CD Pipeline",
                "Mobile Money / Stripe Integration",
                "Real-time WebSockets Features",
                "Multilingual Support (FR / EN)",
                "Security Audit & Stress Testing",
                "1-Year Support & Maintenance",
            ] : [
                "Infrastructure Cloud & CI/CD",
                "Intégration Mobile Money / Stripe",
                "Fonctionnalités WebSockets temps réel",
                "Support Multilingue (FR / EN)",
                "Audit de Sécurité & Stress Test",
                "Maintenance & Support 1 an",
            ],
            badge: lang === 'en' ? "Custom Built" : "Sur-Mesure",
            isPopular: false,
        },
    ];

    return (
        <BlueprintLayout>
            <SEO title={lang === 'en' ? "Packs & Estimator - Software Engineering" : "Packs & Estimator - Ingénierie Logicielle"} />

            <div className="py-24 relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 font-sans">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-2 text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-wider font-mono mb-2">
                        <div className="w-2 h-2 rounded-none bg-green-500 animate-pulse"></div>
                        MODULE: {lang === 'en' ? "Pricing & Architectural Quote" : "Tarification & Devis Architectural"}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blueprint-textDark dark:text-white mb-4 font-sans">
                        {t('packs_title')}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        {t('packs_subtitle')}
                    </p>
                </div>

                {/* Pre-configured Packs Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {packages.map((pkg, idx) => (
                        <div 
                            key={idx} 
                            className={`bg-white dark:bg-[#0B0F19] border rounded-2xl p-8 flex flex-col justify-between relative shadow-xl font-sans ${pkg.isPopular ? 'border-blueprint-bluePrimary dark:border-blueprint-cyan' : 'border-gray-200 dark:border-gray-800'}`}
                        >
                            {/* Crosshair corners */}
                            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                            {pkg.isPopular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full font-mono">
                                    [ {pkg.badge} ]
                                </span>
                            )}
                            <div>
                                <span className="text-[11px] text-gray-400 font-mono block mb-2">[ {pkg.badge} ]</span>
                                <h3 className="text-xl font-bold text-blueprint-textDark dark:text-white mb-2">{pkg.title}</h3>
                                <div className="text-2xl font-extrabold text-blueprint-bluePrimary dark:text-blueprint-cyan mb-4 font-sans">{pkg.price}</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{pkg.desc}</p>
                                <ul className="space-y-3 mb-8 text-xs text-gray-700 dark:text-gray-300">
                                    {pkg.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2">
                                            <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold">{'>'}</span>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link 
                                href={`/contact?prefill=${encodeURIComponent(lang === 'en' ? `Hello Mr Dim's, I would like to order the ${pkg.title} pack.` : `Bonjour Mr Dim's, je souhaite commander le pack ${pkg.title}.`)}`}
                                className={`w-full py-3.5 text-center font-bold text-xs rounded-xl transition-all ${pkg.isPopular ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 hover:opacity-90 shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-blueprint-bluePrimary hover:text-white dark:hover:bg-blueprint-cyan dark:hover:text-gray-900'}`}
                            >
                                {t('btn_select_pack')}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Interactive Project Estimator */}
                <div className="max-w-4xl mx-auto">
                    <ProjectEstimator />
                </div>
            </div>
        </BlueprintLayout>
    );
}

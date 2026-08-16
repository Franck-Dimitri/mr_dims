import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import { 
    CheckCircle2, 
    ArrowLeft, 
    ArrowRight, 
    ShieldCheck, 
    Zap, 
    Code2, 
    Cpu, 
    Layers, 
    Headphones, 
    HelpCircle, 
    ChevronDown, 
    MessageSquare, 
    Clock, 
    Sparkles, 
    FileText, 
    ExternalLink,
    Terminal,
    Crosshair,
    Settings,
    ShieldAlert
} from 'lucide-react';

export default function Show({ service, otherServices = [] }) {
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    const fadeInUp = {
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const techStack = typeof service.tech_stack === 'string' 
        ? JSON.parse(service.tech_stack) 
        : (service.tech_stack || []);

    const deliverables = [
        {
            code: "DELIV_01",
            icon: Code2,
            title: "Code Source Propriétaire",
            desc: "Licence d'utilisation exclusive. Code propre, modulaire et structuré selon les meilleures pratiques architecturales."
        },
        {
            code: "DELIV_02",
            icon: Zap,
            title: "Haute Performance & SEO",
            desc: "Optimisation de la vitesse de chargement, indexation Google et respect strict des standards Web Core Vitals."
        },
        {
            code: "DELIV_03",
            icon: ShieldCheck,
            title: "Sécurité & Audit OWASP",
            desc: "Protection contre les vulnérabilités (XSS, CSRF, Injection SQL) et chiffrement fort des données sensibles."
        },
        {
            code: "DELIV_04",
            icon: Layers,
            title: "Panel Admin Sur-Mesure",
            desc: "Interface de gestion autonome pour administrer vos contenus et données sans compétences en programmation."
        },
        {
            code: "DELIV_05",
            icon: Cpu,
            title: "Intégrations API & Passerelles",
            desc: "Connexion sécurisée aux services tiers (Mobile Money, Stripe, SMS Gateway, CRM & Webhooks)."
        },
        {
            code: "DELIV_06",
            icon: Headphones,
            title: "Support & Garantie Technique",
            desc: "Accompagnement, formation à la prise en main et période de garantie corrective post-déploiement."
        }
    ];

    const processSteps = [
        {
            phase: "PHASE_01",
            title: "Cadrage & Spécifications",
            desc: "Analyse approfondie du besoin, rédaction du cahier des charges et validation des objectifs du projet."
        },
        {
            phase: "PHASE_02",
            title: "Architecture & Modélisation",
            desc: "Schématisation du modèle de données (SGBD), choix de la stack et prototypage de l'interface UX/UI."
        },
        {
            phase: "PHASE_03",
            title: "Développement & Intégration",
            desc: "Codage modulaire en méthode agile avec sessions de démonstrations intermédiaires et tests automatisés."
        },
        {
            phase: "PHASE_04",
            title: "Recette & Déploiement Cloud",
            desc: "Mise en production sécurisée, transfert intégral de la propriété du code et support d'exploitation."
        }
    ];

    const faqs = [
        {
            id: "FAQ_01",
            q: "Comment est calculé le tarif pour ce service ?",
            a: "Chaque projet possédant un périmètre fonctionnel spécifique, le tarif est établi 'Sur Devis' après une brève étude de vos besoins. Vous recevez une proposition transparente et ajustée à votre budget sans coût caché."
        },
        {
            id: "FAQ_02",
            q: "Quel est le délai d'exécution type ?",
            a: "Selon la complexité de l'application, les délais s'échelonnent généralement de 7 à 21 jours ouvrés. Un planning précis avec étapes de validation vous est remis avant le démarrage."
        },
        {
            id: "FAQ_03",
            q: "Suis-je propriétaire du code informatique à la livraison ?",
            a: "Oui, à 100%. Dès le solde de la prestation réglé, l'intégralité du code source, du dépôt Git et des accès d'hébergement vous appartient sans restriction."
        },
        {
            id: "FAQ_04",
            q: "Quel accompagnement est prévu après le lancement ?",
            a: "Chaque livraison inclut une période de garantie technique pour corriger tout dysfonctionnement. Des formules de maintenance régulière sont également disponibles."
        }
    ];

    return (
        <BlueprintLayout>
            <Head title={`${service.title} - Architectural Specification`} />
            
            {/* Top Blueprint CAD Status Bar */}
            <div className="relative pt-28 pb-4 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-blueprint-darkNight/70 backdrop-blur-md z-10 font-mono text-[11px]">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-4">
                    <Link 
                        href="/services" 
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan uppercase tracking-widest transition-colors font-bold"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        [RETURN_TO_SERVICES_INDEX]
                    </Link>
                    
                    <div className="flex items-center gap-4 text-[10px] tracking-widest text-gray-400 uppercase">
                        <span>REF_ID: <strong className="text-blueprint-bluePrimary dark:text-blueprint-cyan">{service.ref_id || service.slug.substring(0, 8).toUpperCase()}</strong></span>
                        <span className="text-gray-300 dark:text-gray-700">|</span>
                        <span>STATUS: <strong className="text-green-600 dark:text-green-400">READY_FOR_DEPLOYMENT</strong></span>
                        <span className="text-gray-300 dark:text-gray-700">|</span>
                        <span className="hidden sm:inline text-blueprint-bluePrimary dark:text-blueprint-cyan">SYS_CAD_V2.4</span>
                    </div>
                </div>
            </div>

            {/* Architectural Blueprint Hero Section */}
            <section className="relative py-16 lg:py-20 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/30 dark:bg-[#070B14]/40">
                {/* Blueprint grid background lines */}
                <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-30 bg-[linear-gradient(to_right,#02529C15_1px,transparent_1px),linear-gradient(to_bottom,#02529C15_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#00F0FF15_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF15_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white bg-blueprint-bluePrimary dark:bg-blueprint-cyan px-3 py-1 font-bold mb-6 rounded-none border border-blueprint-bluePrimary dark:border-blueprint-cyan">
                            <Terminal className="w-3.5 h-3.5" />
                            [MOD_SERVICE_SPECIFICATION]
                        </motion.div>

                        <motion.h1 
                            variants={fadeInUp} 
                            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase mb-6 text-blueprint-textDark dark:text-white leading-[1.1] font-sans"
                        >
                            {service.title}
                        </motion.h1>

                        <motion.p 
                            variants={fadeInUp} 
                            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-mono leading-relaxed border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan pl-6 py-1 mb-8"
                        >
                            {service.excerpt}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 font-mono text-xs">
                            <Link 
                                href={`/contact?service=${encodeURIComponent(service.title)}`}
                                className="inline-flex items-center gap-3 px-7 py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold uppercase tracking-widest rounded-none shadow-md hover:opacity-90 transition-all border border-blueprint-bluePrimary dark:border-blueprint-cyan"
                            >
                                <MessageSquare className="w-4 h-4" />
                                DEMANDER UN DEVIS GRATUIT
                            </Link>

                            <Link 
                                href="/packs" 
                                className="inline-flex items-center gap-2 px-6 py-4 bg-white dark:bg-[#0B0F19] text-blueprint-textDark dark:text-gray-200 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan border border-gray-300 dark:border-gray-700 font-bold uppercase tracking-widest rounded-none transition-all"
                            >
                                ESTIMER SUR L'ESTIMATEUR
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Blueprint Grid */}
            <article className="relative py-16 z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
                    >
                        {/* Left Main Content Column */}
                        <div className="lg:col-span-8 space-y-16">
                            
                            {/* Technical Specifications Box */}
                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 sm:p-10 relative rounded-none shadow-sm">
                                {/* Blueprint Corner Crosshairs */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                                <h2 className="text-xs font-mono tracking-widest text-blueprint-bluePrimary dark:text-blueprint-cyan uppercase mb-6 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4 font-bold">
                                    <FileText className="w-4 h-4" />
                                    // ARCHITECTURAL_DESCRIPTION & SPECIFICATIONS
                                </h2>

                                <div className="prose prose-lg dark:prose-invert max-w-none font-sans text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                                    {service.description_markdown ? (
                                        <div 
                                            className="space-y-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:font-mono [&_h3]:uppercase [&_h3]:text-blueprint-textDark [&_h3]:dark:text-white [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-gray-600 [&_li]:dark:text-gray-300 [&_li]:font-sans"
                                            dangerouslySetInnerHTML={{ __html: service.description_markdown }} 
                                        />
                                    ) : (
                                        <p className="text-gray-500 font-mono text-sm uppercase">
                                            Spécifications techniques ajustées lors de l'étude de votre projet.
                                        </p>
                                    )}
                                </div>
                            </motion.div>

                            {/* Key Deliverables Grid with CAD Cards */}
                            <motion.div variants={fadeInUp} className="space-y-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-4 font-mono">
                                    <h2 className="text-xl font-bold uppercase tracking-widest text-blueprint-textDark dark:text-white flex items-center gap-2">
                                        <Crosshair className="w-5 h-5 text-blueprint-bluePrimary dark:text-blueprint-cyan" />
                                        LIVRABLES & FONCTIONNALITÉS INCLUSES
                                    </h2>
                                    <span className="text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold tracking-widest">
                                        [SPEC_QUALITÉ_VERIFIÉE]
                                    </span>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    {deliverables.map((item, idx) => {
                                        const IconComp = item.icon;
                                        return (
                                            <div 
                                                key={idx}
                                                className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-6 relative rounded-none transition-colors hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan flex flex-col justify-between"
                                            >
                                                {/* Corner Accent */}
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                                
                                                <div>
                                                    <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
                                                        <div className="w-8 h-8 rounded-none bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 text-blueprint-bluePrimary dark:text-blueprint-cyan flex items-center justify-center border border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20">
                                                            <IconComp className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-mono text-[10px] font-bold text-gray-400 tracking-widest">
                                                            {item.code}
                                                        </span>
                                                    </div>

                                                    <h3 className="font-bold font-sans text-base text-blueprint-textDark dark:text-white mb-2 uppercase tracking-tight">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                                                        {item.desc}
                                                    </p>
                                                </div>

                                                <div className="mt-4 pt-3 border-t border-dashed border-gray-200 dark:border-gray-800 flex items-center gap-1.5 text-[10px] font-mono font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                    SPÉCIFICATION_VALIDE
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Architectural Engineering Workflow */}
                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 sm:p-10 relative rounded-none shadow-sm">
                                {/* Corner Reticles */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                                <h2 className="text-xs font-mono tracking-widest text-blueprint-bluePrimary dark:text-blueprint-cyan uppercase mb-8 border-b border-gray-200 dark:border-gray-800 pb-4 font-bold flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    // ARCHITECTURAL_WORKFLOW & PHASES [01-04]
                                </h2>

                                <div className="grid sm:grid-cols-2 gap-8 font-mono">
                                    {processSteps.map((step, idx) => (
                                        <div key={idx} className="relative pl-10 border-l-2 border-blueprint-bluePrimary/30 dark:border-blueprint-cyan/30 py-1">
                                            <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white dark:bg-[#0B0F19] border-2 border-blueprint-bluePrimary dark:border-blueprint-cyan flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                            </div>
                                            <div className="text-[10px] font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest mb-1">
                                                [{step.phase}]
                                            </div>
                                            <h3 className="font-bold text-sm text-blueprint-textDark dark:text-white uppercase mb-1">
                                                {step.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Interactive Architectural FAQ */}
                            <motion.div variants={fadeInUp} className="space-y-6">
                                <div className="border-b border-gray-200 dark:border-gray-800 pb-4 font-mono">
                                    <h2 className="text-xl font-bold uppercase tracking-widest text-blueprint-textDark dark:text-white flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-blueprint-bluePrimary dark:text-blueprint-cyan" />
                                        QUESTIONS & CLARIFICATIONS TECHNIQUES
                                    </h2>
                                </div>

                                <div className="space-y-3">
                                    {faqs.map((faq, idx) => {
                                        const isOpen = openFaqIndex === idx;
                                        return (
                                            <div 
                                                key={idx}
                                                className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] rounded-none overflow-hidden transition-colors"
                                            >
                                                <button
                                                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                                                    className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors font-mono"
                                                >
                                                    <span className="font-bold text-blueprint-textDark dark:text-white text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2">
                                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">[{faq.id}]</span>
                                                        {faq.q}
                                                    </span>
                                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blueprint-bluePrimary dark:text-blueprint-cyan' : ''}`} />
                                                </button>

                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.25 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-6 pb-5 pt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed border-t border-gray-100 dark:border-gray-800/80">
                                                                {faq.a}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                        </div>

                        {/* Right Sidebar Specs Column */}
                        <div className="lg:col-span-4 space-y-8 font-mono">
                            
                            {/* Quotation CAD Card */}
                            <motion.div variants={fadeInUp} className="border-2 border-blueprint-bluePrimary dark:border-blueprint-cyan bg-blueprint-bluePrimary/5 dark:bg-blueprint-cyan/5 p-8 relative rounded-none shadow-md">
                                {/* Corner Reticles */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                                <div className="text-[10px] font-bold tracking-widest text-blueprint-bluePrimary dark:text-blueprint-cyan uppercase mb-2">
                                    // ESTIMATION & TARIFICATION
                                </div>

                                <div className="text-3xl font-extrabold text-blueprint-textDark dark:text-white mb-2 uppercase tracking-tight font-sans">
                                    SUR DEVIS
                                </div>

                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-sans">
                                    Tarif calculé sur-mesure d'après votre cahier des charges et la complexité des modules.
                                </p>

                                <Link 
                                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs tracking-widest uppercase rounded-none hover:opacity-90 transition-opacity shadow-md mb-3 border border-blueprint-bluePrimary dark:border-blueprint-cyan"
                                >
                                    <span>OBTENIR UN DEVIS GRATUIT</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                <div className="text-center pt-2">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                                        ⚡ RÉPONSE SOUS 24H GARANTIE
                                    </span>
                                </div>
                            </motion.div>

                            {/* Tech Stack Blueprint Card */}
                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 relative rounded-none shadow-sm">
                                {/* Corner Accents */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                                <h3 className="text-xs tracking-widest text-gray-400 uppercase mb-6 border-b border-gray-200 dark:border-gray-800 pb-4 font-bold flex items-center gap-2">
                                    <Cpu className="w-4 h-4 text-blueprint-bluePrimary dark:text-blueprint-cyan" />
                                    // SPÉCIFICATIONS_STACK
                                </h3>

                                <div className="space-y-6 text-xs uppercase">
                                    <div>
                                        <div className="text-[10px] tracking-widest text-gray-500 mb-2 font-bold">STACK RECOMMANDÉE</div>
                                        <div className="flex flex-wrap gap-2">
                                            {techStack.length > 0 ? techStack.map(tech => (
                                                <span key={tech} className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-blueprint-textDark dark:text-gray-200 border border-gray-300 dark:border-gray-700 text-[11px] font-bold">
                                                    [{tech}]
                                                </span>
                                            )) : (
                                                <span className="text-gray-400">[SUR_MESURE]</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800/80 space-y-3 text-[11px]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-[10px]">TYPE_ARCHITECTURE</span>
                                            <span className="font-bold text-blueprint-textDark dark:text-white">FULL-STACK / API</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-[10px]">PROPRIÉTÉ_CODE</span>
                                            <span className="font-bold text-blueprint-textDark dark:text-white">100% EXCLUSIVE</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-[10px]">SUPPORT_INCLUS</span>
                                            <span className="font-bold text-green-600 dark:text-green-400">OUI (GARANTIE)</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Direct Action Card */}
                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 relative rounded-none text-xs space-y-4">
                                <div className="font-bold text-blueprint-textDark dark:text-white text-sm uppercase">
                                    // QUESTION_TECHNIQUE ?
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 font-sans text-xs leading-relaxed">
                                    Une interrogation spécifique avant de lancer votre cahier des charges ?
                                </p>
                                <Link 
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold hover:underline uppercase tracking-wider"
                                >
                                    INITIER UNE DISCUSSION →
                                </Link>
                            </motion.div>

                        </div>
                    </motion.div>
                </div>
            </article>

            {/* Other Services Section in Blueprint Style */}
            {otherServices.length > 0 && (
                <section className="py-20 relative z-10 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-blueprint-darkNight/50 font-mono">
                    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 border-b border-gray-200 dark:border-gray-800 pb-4">
                            <div>
                                <div className="text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase mb-1">
                                    [CATALOGUE_MODULES]
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-blueprint-textDark dark:text-white font-sans">
                                    Autres Services d'Ingénierie
                                </h2>
                            </div>
                            <Link 
                                href="/services" 
                                className="text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan hover:underline flex items-center gap-1 uppercase"
                            >
                                VOIR TOUS LES SERVICES <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {otherServices.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-6 relative rounded-none flex flex-col justify-between hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors"
                                >
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                    
                                    <div>
                                        <div className="text-[10px] text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold mb-2">
                                            REF: {item.ref_id}
                                        </div>
                                        <h3 className="font-bold font-sans text-base mb-2 text-blueprint-textDark dark:text-white uppercase line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 font-sans line-clamp-3 mb-6 leading-relaxed">
                                            {item.excerpt}
                                        </p>
                                    </div>

                                    <Link 
                                        href={`/services/${item.slug}`}
                                        className="text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan hover:underline inline-flex items-center gap-1 uppercase"
                                    >
                                        SPÉCIFICATION DU SERVICE <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Bottom Blueprint High-Impact Action Banner */}
            <section className="py-20 relative z-10 bg-blueprint-bluePrimary dark:bg-[#060911] text-white border-t border-blueprint-bluePrimary dark:border-blueprint-cyan">
                {/* CAD Grid Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-mono">
                    <div className="text-xs font-bold tracking-widest uppercase text-blue-200 dark:text-blueprint-cyan mb-3">
                        // INITIALIZE_PROJECT_SPECIFICATION
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-6 font-sans">
                        Prêt à concrétiser votre produit digital ?
                    </h2>
                    <p className="text-sm sm:text-base text-blue-100 dark:text-gray-400 max-w-2xl mx-auto font-sans leading-relaxed mb-10">
                        Discutons de votre vision, définissons l'architecture technique sur-mesure et obtenez une proposition complète sous 24 heures.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-xs">
                        <Link 
                            href={`/contact?service=${encodeURIComponent(service.title)}`}
                            className="px-8 py-4 bg-white text-blueprint-bluePrimary font-extrabold uppercase tracking-widest rounded-none shadow-xl hover:bg-gray-100 transition-colors border border-white"
                        >
                            DÉMARRER MON DEVIS SUR-MESURE
                        </Link>
                    </div>
                </div>
            </section>

        </BlueprintLayout>
    );
}

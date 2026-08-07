import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import SEO from '@/Components/SEO';
import { useLanguage } from '@/Context/LanguageContext';
import CvModal from '@/Components/CvModal';
import { LocationMap } from '@/Components/ui/expand-map';

export default function About() {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };
    const [terminalText, setTerminalText] = useState('');
    const [imgError, setImgError] = useState(false);
    const [showCvModal, setShowCvModal] = useState(false);

    const fullTextFR = `>_ INITIALIZING SYS_PROFILE...
>_ AUTH_LEVEL: ROOT
>_ LOADING MODULES: [ REACT, LARAVEL, TAILWIND, ARCHITECTURE ]
>_ SYS_STATUS: ONLINE

[NOM]: Franck Dimitri (Mr Dim's)
[ROLE]: Ingénieur Logiciel & Architecte Full Stack
[BASE]: Yaoundé, Cameroun / Remote

/* 
 * Développeur passionné par la création d'architectures robustes.
 * Je construis des systèmes scalables et des interfaces immersives.
 * L'optimisation, la sécurité et le design sont au cœur de mon workflow.
 */

>_ AWAITING INSTRUCTIONS...`;

    const fullTextEN = `>_ INITIALIZING SYS_PROFILE...
>_ AUTH_LEVEL: ROOT
>_ LOADING MODULES: [ REACT, LARAVEL, TAILWIND, ARCHITECTURE ]
>_ SYS_STATUS: ONLINE

[NAME]: Franck Dimitri (Mr Dim's)
[ROLE]: Software Engineer & Full Stack Architect
[BASE]: Yaounde, Cameroon / Remote

/* 
 * Developer passionate about crafting robust software architectures.
 * I build scalable systems and immersive user interfaces.
 * Optimization, security, and precision design drive my workflow.
 */

>_ AWAITING INSTRUCTIONS...`;

    const currentTerminalText = lang === 'en' ? fullTextEN : fullTextFR;

    useEffect(() => {
        let i = 0;
        setTerminalText('');
        const typingInterval = setInterval(() => {
            if (i < currentTerminalText.length) {
                setTerminalText(currentTerminalText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 20);

        return () => clearInterval(typingInterval);
    }, [lang]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const pillars = [
        {
            code: "SYS_PIL_01",
            title: lang === 'en' ? "CLEAN ARCHITECTURE & SCALABILITY" : "ARCHITECTURE PROPRE & SCALABILITÉ",
            desc: lang === 'en' 
                ? "Designing modular codebases following SOLID principles, ensuring maintainability and easy future growth."
                : "Conception de bases de code modulaires respectant les principes SOLID, garantissant la maintenabilité et l'évolutivité.",
        },
        {
            code: "SYS_PIL_02",
            title: lang === 'en' ? "UX & BLUEPRINT UI PRECISION" : "PRÉCISION UI/UX & BLUEPRINT",
            desc: lang === 'en'
                ? "Building pixel-perfect, responsive interfaces with fluid Framer Motion animations and dark mode support."
                : "Développement d'interfaces réactives, pixel-perfect, avec des animations fluides et un support dark mode natif.",
        },
        {
            code: "SYS_PIL_03",
            title: lang === 'en' ? "PERFORMANCE & SECURITY" : "PERFORMANCE & SÉCURITÉ",
            desc: lang === 'en'
                ? "Optimizing database queries, caching strategies, and applying strict rate limiting and data protection."
                : "Optimisation des requêtes SQL, stratégies de cache efficaces et application de règles strictes de sécurité.",
        },
    ];

    const workflowSteps = [
        {
            step: "01",
            title: lang === 'en' ? "BLUEPRINT & DATA MODELING" : "BLUEPRINT & MODÉLISATION DE DONNÉES",
            desc: lang === 'en' 
                ? "Thorough requirements analysis, ERD database design, and global system architecture mapping." 
                : "Analyse approfondie des besoins, conception des schémas SQL (ERD) et cartographie de l'architecture.",
            tag: "PHASE 1: CONCEPTION"
        },
        {
            step: "02",
            title: lang === 'en' ? "CORE DEV & RESTFUL API" : "DÉVELOPPEMENT CORE & API REST",
            desc: lang === 'en'
                ? "Clean code implementation (SOLID principles), robust API building, and responsive React SPA interface."
                : "Écriture de code propre (principes SOLID), création d'APIs robustes et d'interfaces React réactives.",
            tag: "PHASE 2: EXECUTION"
        },
        {
            step: "03",
            title: lang === 'en' ? "BENCHMARK & SECURITY HARDENING" : "BENCHMARK & RENFORCEMENT SÉCURITÉ",
            desc: lang === 'en'
                ? "Stress testing, SQL query optimization, caching implementation, and strict rate limiting."
                : "Tests de charge, optimisation SQL, mise en cache Redis et protection contre les requêtes abusives.",
            tag: "PHASE 3: AUDIT & SHIELD"
        },
        {
            step: "04",
            title: lang === 'en' ? "CI/CD & DEPLOYMENT" : "DÉPLOIEMENT CONTINU & MONITORING",
            desc: lang === 'en'
                ? "Automated CI/CD pipelines, VPS deployment, SSL configuration, and real-time server telemetry."
                : "Pipelines CI/CD automatisées, déploiement VPS, certificats SSL et télémétrie serveur en temps réel.",
            tag: "PHASE 4: LAUNCH & MONITOR"
        },
    ];

    const guarantees = [
        {
            title: lang === 'en' ? "HIGH PERFORMANCE TARGET" : "OBJECTIF PERFORMANCE ULTRA-RAPIDE",
            stat: "< 200ms",
            desc: lang === 'en' ? "Average API response time & sub-second page loads." : "Temps de réponse API moyen et chargements inférieurs à 1 seconde."
        },
        {
            title: lang === 'en' ? "SECURE BY DESIGN" : "SÉCURITÉ PAR CONCEPTION",
            stat: "100% CSRF/XSS",
            desc: lang === 'en' ? "Strict input validation, SQL sanitization, and rate throttling." : "Validation stricte des entrées, désinfection SQL et limitation de débit."
        },
        {
            title: lang === 'en' ? "ZERO TECHNICAL DEBT" : "ZÉRO DETTE TECHNIQUE ABUSIVE",
            stat: "SOLID CODE",
            desc: lang === 'en' ? "Clean, documented, and fully maintainable architecture." : "Architecture propre, documentée et facilement maintenable."
        }
    ];

    return (
        <BlueprintLayout>
            <SEO 
                title={lang === 'en' ? "About - Software Architect" : "À Propos - Architecte Logiciel"} 
                description="Découvrez le parcours, la vision et la stack technique de Franck Dimitri (Mr Dim's)." 
            />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-24 pb-16 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 z-10 font-mono">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Bio & Heading */}
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6 text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase font-bold">
                                <div className="w-2.5 h-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-pulse"></div>
                                WORKSPACE: SYS_PROFILE // ID: MR_DIMS
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-none tracking-tighter mb-6 uppercase font-sans">
                                <span className="block text-blueprint-textDark dark:text-white">FRANCK</span>
                                <span className="block text-blueprint-bluePrimary dark:text-blueprint-cyan">DIMITRI</span>
                            </motion.h1>

                            <motion.h2 variants={fadeInUp} className="text-sm md:text-base text-gray-500 uppercase tracking-widest mb-6 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan pl-4">
                                // {lang === 'en' ? 'SOFTWARE ARCHITECT & FULL STACK DEV' : 'ARCHITECTE LOGICIEL & FULL STACK DEV'}
                            </motion.h2>

                            <motion.p variants={fadeInUp} className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-8 uppercase">
                                {lang === 'en'
                                    ? "My objective is to turn technical complexity into elegant, scalable, and high-performance solutions. Every line of code is a building block of the final architecture."
                                    : "Mon objectif est de transformer la complexité technique en solutions élégantes, performantes et évolutives. Chaque ligne de code est une brique de l'architecture finale."}
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
                                <button 
                                    onClick={() => setShowCvModal(true)}
                                    type="button"
                                    className="px-6 py-3.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center gap-2 group cursor-pointer"
                                >
                                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {t('btn_view_cv')}
                                </button>
                                <Link 
                                    href="/contact" 
                                    className="px-6 py-3.5 border-2 border-blueprint-bluePrimary dark:border-blueprint-cyan text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold text-xs uppercase tracking-widest hover:bg-blueprint-bluePrimary/10 dark:hover:bg-blueprint-cyan/10 transition-colors"
                                >
                                    {lang === 'en' ? 'CONTACT ARCHITECT →' : 'CONTACTER L\'ARCHITECTE →'}
                                </Link>
                                <Link 
                                    href="/projects" 
                                    className="px-6 py-3.5 bg-[#1A1A1A] border border-gray-800 text-white hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan text-xs font-bold uppercase tracking-widest transition-colors"
                                >
                                    {lang === 'en' ? 'VIEW PROJECTS' : 'PARCOURIR LES PROJETS'}
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right: REAL PHOTO FRAME (BLUEPRINT SHARP ARCHITECTURAL FRAME) */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, x: 40 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex justify-center relative"
                        >
                            <div className="relative w-[340px] md:w-[420px] aspect-square bg-[#0B0F19] border border-blueprint-bluePrimary/40 dark:border-blueprint-cyan/40 p-3 shadow-2xl overflow-hidden rounded-none group">
                                {/* Corner Crosshairs */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan z-30"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan z-30"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan z-30"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan z-30"></div>
                                
                                {/* Photo Container */}
                                <div className="w-full h-full relative overflow-hidden bg-gray-900 flex items-center justify-center">
                                    {!imgError ? (
                                        <img 
                                            src="/profile.jpg" 
                                            alt="Franck Dimitri" 
                                            onError={() => setImgError(true)}
                                            className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 relative z-10"
                                        />
                                    ) : (
                                        <div className="text-center p-6 flex flex-col items-center justify-center text-gray-400 font-mono">
                                            <svg className="w-16 h-16 text-blueprint-bluePrimary dark:text-blueprint-cyan mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span className="text-xs font-bold text-white tracking-widest">FRANCK DIMITRI</span>
                                            <span className="text-[10px] text-blueprint-cyan mt-1">[ PHOTO_PROFILE_ACTIVE ]</span>
                                        </div>
                                    )}
                                    
                                    {/* Tech Grid Scan Line Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-blueprint-bluePrimary/10 to-transparent opacity-40 pointer-events-none z-20"></div>
                                </div>
                                
                                {/* Floating Badge */}
                                <div className="absolute bottom-6 left-6 bg-[#070A10]/90 backdrop-blur px-3 py-1.5 font-mono text-[10px] tracking-widest text-white border border-blueprint-bluePrimary/40 dark:border-blueprint-cyan/40 z-30 shadow-lg">
                                    VIEWPORT_RENDER: <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold">ACTIVE</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- TERMINAL ANIMATION SECTION --- */}
            <section className="py-16 relative z-10 font-mono">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#0D1117] border border-gray-800 rounded-none shadow-2xl overflow-hidden"
                    >
                        <div className="bg-[#161B22] border-b border-gray-800 px-4 py-3 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-red-500/80"></div>
                                <div className="w-3 h-3 bg-yellow-500/80"></div>
                                <div className="w-3 h-3 bg-green-500/80"></div>
                            </div>
                            <div className="text-[10px] tracking-widest text-gray-500">
                                root@dim-system:~
                            </div>
                            <div className="text-[9px] text-blueprint-cyan font-bold">
                                SYS_DIAGNOSTICS
                            </div>
                        </div>
                        <div className="p-6 md:p-8 text-xs sm:text-sm leading-relaxed text-[#33FF00]">
                            <pre className="whitespace-pre-wrap font-mono">
                                {terminalText}
                                <motion.span 
                                    animate={{ opacity: [1, 0] }} 
                                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                    className="inline-block w-2.5 h-4 bg-[#33FF00] ml-1 align-middle"
                                />
                            </pre>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- SECTION 1: PILLIERS & PHILOSOPHIE --- */}
            <section className="py-20 border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-gray-50/50 dark:bg-blueprint-darkNight/50 font-mono">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-14">
                        <span className="text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase block mb-2">
                            // {lang === 'en' ? 'ENGINEERING PHILOSOPHY' : 'PHILOSOPHIE D\'INGÉNIERIE'}
                        </span>
                        <h3 className="text-3xl font-bold text-blueprint-textDark dark:text-white uppercase font-sans">
                            {lang === 'en' ? 'CORE DEVELOPMENT PILLARS' : 'PILLIERS DÉVELOPPEMENT CLÉS'}
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {pillars.map((pil, idx) => (
                            <div key={idx} className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-8 rounded-none shadow-sm relative">
                                <span className="text-[10px] text-gray-400 block mb-4">{pil.code}</span>
                                <h4 className="text-base font-bold text-blueprint-textDark dark:text-white mb-4 uppercase">{pil.title}</h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed uppercase">{pil.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 2: WORKFLOW & MÉTHODOLOGIE EN 4 ÉTAPES (CAPTIVANT) --- */}
            <section className="py-20 border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 font-mono">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-14">
                        <span className="text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase block mb-2">
                            // {lang === 'en' ? 'ENGINEERING WORKFLOW' : 'PROCESSUS DE RÉALISATION'}
                        </span>
                        <h3 className="text-3xl font-bold text-blueprint-textDark dark:text-white uppercase font-sans">
                            {lang === 'en' ? 'SYSTEM DEVELOPMENT LIFECYCLE' : 'CYCLE DE DÉVELOPPEMENT EN 4 ÉTAPES'}
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {workflowSteps.map((step, idx) => (
                            <div 
                                key={idx} 
                                className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-6 rounded-none relative flex flex-col justify-between shadow-lg hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors group"
                            >
                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-3xl font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan font-mono opacity-80 group-hover:opacity-100">{step.step}</span>
                                        <span className="text-[9px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-1 uppercase">{step.tag}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-blueprint-textDark dark:text-white uppercase mb-3 leading-snug">{step.title}</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 uppercase leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- SECTION 3: SKILLS MATRIX --- */}
            <section className="py-20 border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-gray-50/50 dark:bg-blueprint-darkNight/50 font-mono">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-14">
                        <span className="text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase block mb-2">
                            // {lang === 'en' ? 'TECHNICAL ARCHITECTURE' : 'ARCHITECTURE TECHNIQUE'}
                        </span>
                        <h3 className="text-3xl font-bold text-blueprint-textDark dark:text-white uppercase font-sans">
                            {lang === 'en' ? 'SKILLS & STACK BREAKDOWN' : 'MATRICE DE COMPÉTENCES & STACK'}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Module 1 */}
                        <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 rounded-none">
                            <div className="flex justify-between items-start mb-6">
                                <h4 className="font-bold text-lg uppercase text-blueprint-textDark dark:text-white">BACKEND & API</h4>
                                <span className="text-[10px] text-gray-400">MOD_01</span>
                            </div>
                            <div className="space-y-4 text-xs text-gray-600 dark:text-gray-400">
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="uppercase text-blueprint-textDark dark:text-white font-bold">PHP / LARAVEL 13</span>
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">95%</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="uppercase text-blueprint-textDark dark:text-white font-bold">REST API & SANCTUM</span>
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">92%</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="uppercase text-blueprint-textDark dark:text-white font-bold">MYSQL & ELOQUENT</span>
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">90%</span>
                                </div>
                            </div>
                        </div>

                        {/* Module 2 */}
                        <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 rounded-none">
                            <div className="flex justify-between items-start mb-6">
                                <h4 className="font-bold text-lg uppercase text-blueprint-textDark dark:text-white">FRONTEND & UI</h4>
                                <span className="text-[10px] text-gray-400">MOD_02</span>
                            </div>
                            <div className="space-y-4 text-xs text-gray-600 dark:text-gray-400">
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="uppercase text-blueprint-textDark dark:text-white font-bold">REACT 18 & INERTIA 2</span>
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">92%</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="uppercase text-blueprint-textDark dark:text-white font-bold">TAILWIND CSS</span>
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">95%</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="uppercase text-blueprint-textDark dark:text-white font-bold">FRAMER MOTION</span>
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">88%</span>
                                </div>
                            </div>
                        </div>

                        {/* Module 3 */}
                        <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 rounded-none">
                            <div className="flex justify-between items-start mb-6">
                                <h4 className="font-bold text-lg uppercase text-blueprint-textDark dark:text-white">INFRASTRUCTURE</h4>
                                <span className="text-[10px] text-gray-400">MOD_03</span>
                            </div>
                            <div className="space-y-4 text-xs text-gray-600 dark:text-gray-400">
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="uppercase text-blueprint-textDark dark:text-white font-bold">GIT & CI/CD PIPELINE</span>
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">90%</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="uppercase text-blueprint-textDark dark:text-white font-bold">LINUX VPS & NGINX</span>
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">85%</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                    <span className="uppercase text-blueprint-textDark dark:text-white font-bold">ANALYTICS & GEOLOCATION</span>
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">90%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 4: MANIFESTO & ENGAGEMENTS QUALITÉ (CAPTIVANT) --- */}
            <section className="py-20 border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 font-mono">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#0B0F19] border border-blueprint-bluePrimary/40 dark:border-blueprint-cyan/40 p-8 sm:p-12 relative">
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                        <div className="mb-10 text-center max-w-2xl mx-auto">
                            <span className="text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase block mb-2">
                                // {lang === 'en' ? 'QUALITY COMMITMENTS' : 'ENGAGEMENTS & EXCELLENCE'}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase font-sans">
                                {lang === 'en' ? 'ARCHITECTURAL GUARANTEES' : 'GARANTIES D\'ARCHITECTURE LOGICIELLE'}
                            </h3>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            {guarantees.map((g, idx) => (
                                <div key={idx} className="p-6 border border-gray-800 bg-[#070A10]">
                                    <div className="text-3xl font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan mb-2 font-mono">{g.stat}</div>
                                    <h4 className="text-xs font-bold text-white uppercase mb-2">{g.title}</h4>
                                    <p className="text-[11px] text-gray-400 uppercase leading-relaxed">{g.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 5: GEOLOCATION MAP --- */}
            <section className="pb-16 pt-6 font-mono">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <LocationMap 
                        location={lang === 'en' ? 'Yaounde, Cameroon / Remote' : 'Yaoundé, Cameroun / Remote'} 
                        coordinates="3.8480° N, 11.5021° E" 
                    />
                </div>
            </section>

            <CvModal show={showCvModal} onClose={() => setShowCvModal(false)} />
        </BlueprintLayout>
    );
}

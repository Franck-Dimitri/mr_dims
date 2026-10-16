import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import SEO from '@/Components/SEO';
import { motion } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';
import CvModal from '@/Components/CvModal';
import ProfileCardBadge from '@/Components/Home/ProfileCardBadge';
import TechStackMarquee from '@/Components/TechStackMarquee';

export default function Welcome({ auth, projects = [], blogs = [] }) {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };
    const [showCvModal, setShowCvModal] = useState(false);

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        message: '',
        platform_origin: 'web',
    });

    const submitContact = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const formatTechStack = (tech) => {
        if (!tech) return ['Laravel', 'React'];
        if (Array.isArray(tech)) return tech;
        if (typeof tech === 'string') {
            try { return JSON.parse(tech); }
            catch (e) { return tech.split(',').map(s => s.trim()); }
        }
        return ['Laravel', 'React'];
    };

    const stackItems = [
        'LARAVEL 12', 'REACT', 'TYPESCRIPT', 'INERTIA.JS', 'TAILWIND CSS', 
        'PHP 8.4', 'RESTFUL API', 'MYSQL', 'POSTGRESQL', 'REDIS', 
        'DOCKER', 'LINUX VPS', 'GIT & GITHUB', 'CI / CD', 'FINTECH ESCROW'
    ];

    return (
        <BlueprintLayout>
            <SEO 
                title={lang === 'en' ? "Franck Dimitri — Full Stack Software Architect" : "Franck Dimitri — Architecte Logiciel & Développeur Full-Stack"}
                description={lang === 'en' ? "Portfolio of Franck Dimitri (Mr Dim's) — Full Stack Software Architect specializing in Laravel, React, TypeScript and robust web systems." : "Portfolio de Franck Dimitri (Mr Dim's) — Architecte Logiciel & Développeur Full-Stack spécialisé en Laravel, React, TypeScript et architectures web robustes."}
                keywords="Franck Dimitri, Mr Dim's, Architecte Logiciel, Développeur Full Stack, Laravel, React, TypeScript, Yaoundé, Cameroun"
            />

            {/* ========================================================= */}
            {/* 1. HERO SECTION ARCHITECTURALE & MARQUANTE                */}
            {/* ========================================================= */}
            <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden">
                {/* Lignes d'axes architecturaux de repère */}
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="max-w-6xl mx-auto h-full border-x border-dashed border-neutral-200/50 dark:border-neutral-800/50 relative">
                        <span className="absolute top-4 -left-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute top-4 -right-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute bottom-4 -left-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute bottom-4 -right-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
                                  {/* Colonne Gauche : Titre Monumental Style Thierry Wangbara & Accroche */}
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="lg:col-span-7 flex flex-col items-start"
                        >
                            {/* Tag Système avec point actif (comme capture Thierry) */}
                            <motion.div 
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4"
                            >
                                <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse"></span>
                                <span>INGÉNIEUR LOGICIEL & ARCHITECTE FULL STACK</span>
                            </motion.div>

                            {/* Titre Monumental : Franck Dimitri + [ MR DIMS'S DEV ] en encadré pointillé (comme Thierry Wangbara) */}
                            <motion.div variants={fadeInUp} className="mb-4">
                                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.4rem] font-black tracking-tight text-neutral-900 dark:text-white leading-[1.05] font-sans uppercase">
                                    <span className="block">Franck Dimitri</span>
                                    <span className="inline-block mt-2 sm:mt-3 border-2 border-dashed border-neutral-400 dark:border-neutral-600 px-3 sm:px-4 py-1 text-neutral-900 dark:text-white select-none text-3xl sm:text-4xl md:text-5xl">
                                        MR DIMS'S DEV
                                    </span>
                                </h1>
                            </motion.div>

                            {/* Sous-titre avec puces techniques (comme capture) */}
                            <motion.div 
                                variants={fadeInUp}
                                className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-5"
                            >
                                <span>ARCHITECTURE LOGICIELLE</span>
                                <span className="mx-2 text-cyan-500">•</span>
                                <span>APPLICATIONS REACT & LARAVEL</span>
                                <span className="mx-2 text-cyan-500">•</span>
                                <span>CLOUD VPS</span>
                            </motion.div>

                            {/* Phrase d'accroche épurée */}
                            <motion.p 
                                variants={fadeInUp} 
                                className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl mb-4 font-sans"
                            >
                                {lang === 'en' 
                                    ? "I design, build, and deploy reliable web architectures by combining backend rigor, modern responsive interfaces, and continuous automation."
                                    : "Je conçois, développe et maintiens des applications web performantes et robustes en combinant rigueur d'ingénierie backend, interfaces réactives et automatisation."}
                            </motion.p>

                            {/* Liste courte des technologies en ligne (comme capture) */}
                            <motion.div 
                                variants={fadeInUp}
                                className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-8"
                            >
                                <span className="text-neutral-700 dark:text-neutral-300 font-semibold">
                                    Laravel • React • TypeScript • Inertia.js • Tailwind CSS • Docker • Linux VPS
                                </span>
                            </motion.div>

                            {/* Boutons d'Action Strictement Carrés (rounded-none) avec coins marqués */}
                            <motion.div 
                                variants={fadeInUp} 
                                className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-6"
                            >
                                <a 
                                    href="#projets"
                                    className="relative px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 rounded-none"
                                >
                                    <span className="absolute -top-1 -left-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                    <span className="absolute -top-1 -right-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                    <span className="absolute -bottom-1 -left-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                    <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                    <span>{lang === 'en' ? 'Explore Projects [ ↓ ]' : 'Voir mes projets'}</span>
                                </a>

                                <a 
                                    href="#contact"
                                    className="relative px-6 py-3.5 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 dark:hover:border-cyan-400 text-neutral-900 dark:text-neutral-100 hover:text-cyan-500 font-mono font-bold text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 rounded-none"
                                >
                                    <span className="absolute -top-1 -left-1 text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-600">+</span>
                                    <span className="absolute -top-1 -right-1 text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-600">+</span>
                                    <span className="absolute -bottom-1 -left-1 text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-600">+</span>
                                    <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-600">+</span>
                                    <span>{lang === 'en' ? 'Get in Touch' : 'Me contacter'}</span>
                                </a>

                                <button
                                    onClick={() => setShowCvModal(true)}
                                    className="px-4 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 hover:text-cyan-500 transition-colors flex items-center gap-1.5 rounded-none"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Consulter CV</span>
                                </button>
                            </motion.div>

                            {/* Ligne d'état finale (comme capture) */}
                            <motion.div 
                                variants={fadeInUp}
                                className="text-xs text-neutral-500 dark:text-neutral-400 font-sans"
                            >
                                <span>Basé au Cameroun 🇨🇲</span>
                                <span className="mx-2">•</span>
                                <span>Disponible en remote & international</span>
                            </motion.div>
                        </motion.div>

                        {/* Colonne Droite : Carte de Profil Carrée Architecturale 3D Agrandie */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <ProfileCardBadge onOpenCv={() => setShowCvModal(true)} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. LIGNE DÉROULANTE STACK AVEC LOGOS (CAPTURE 2)          */}
            {/* ========================================================= */}
            <div id="stack">
                <TechStackMarquee />
            </div>

            {/* ========================================================= */}
            {/* 3. SECTION DOMAINES D'EXPERTISE (3 PILIERS CARRÉS AVEC +) */}
            {/* ========================================================= */}
            <section className="py-20 border-b border-neutral-200/80 dark:border-neutral-800/80 relative">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
                            <span>[01]</span>
                            <span>EXPERTISE & PILIERS</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                            Piliers d'ingénierie logicielle
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Pilier 01 */}
                        <div className="relative p-7 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none transition-all duration-300 hover:border-cyan-500/50">
                            {/* Coins carrés avec + */}
                            <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>

                            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                                <span className="font-mono text-xs font-bold text-cyan-500">AXIS_01</span>
                                <span className="font-mono text-[10px] text-neutral-400 uppercase">BACKEND</span>
                            </div>
                            <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-900 dark:text-white mb-3">
                                Architecture & Back-End
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                                Conception d'architectures applicatives modulaires, d'APIs RESTful avec Laravel, structuration de bases de données relationnelles et intégrations de paiements critiques (Mobile Money, Stripe, Escrow).
                            </p>
                        </div>

                        {/* Pilier 02 */}
                        <div className="relative p-7 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none transition-all duration-300 hover:border-cyan-500/50">
                            {/* Coins carrés avec + */}
                            <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>

                            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                                <span className="font-mono text-xs font-bold text-cyan-500">AXIS_02</span>
                                <span className="font-mono text-[10px] text-neutral-400 uppercase">FRONTEND</span>
                            </div>
                            <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-900 dark:text-white mb-3">
                                Interfaces Réactives & UX
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                                Développement d'interfaces Single Page Application fluides avec React, Inertia.js et Tailwind CSS. Expériences modernes, rapides et parfaitement adaptées à tous les terminaux.
                            </p>
                        </div>

                        {/* Pilier 03 */}
                        <div className="relative p-7 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none transition-all duration-300 hover:border-cyan-500/50">
                            {/* Coins carrés avec + */}
                            <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>

                            <div className="flex items-center justify-between mb-6 pb-3 border-b border-neutral-100 dark:border-neutral-800">
                                <span className="font-mono text-xs font-bold text-cyan-500">AXIS_03</span>
                                <span className="font-mono text-[10px] text-neutral-400 uppercase">DEVOPS</span>
                            </div>
                            <h3 className="text-lg font-bold uppercase tracking-tight text-neutral-900 dark:text-white mb-3">
                                Rigueur & Déploiement
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                                Code propre, typé et testable. Conteneurisation avec Docker, workflows Git, intégration continue (CI/CD) et administration de serveurs de production sous Linux VPS.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 4. SECTION PROJETS SÉLECTIONNÉS (CARRÉS AVEC COINS +)     */}
            {/* ========================================================= */}
            <section id="projets" className="py-20 border-b border-neutral-200/80 dark:border-neutral-800/80 relative">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
                                <span>[02]</span>
                                <span>RÉALISATIONS SÉLECTIONNÉES</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                                Projets récents en production
                            </h2>
                        </div>
                        <Link 
                            href="/projects" 
                            className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
                        >
                            <span>Tous les projets</span>
                            <span className="font-bold">→</span>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects && projects.length > 0 ? (
                            projects.slice(0, 3).map((project) => {
                                const techStack = formatTechStack(project.tech_stack);
                                const coverImg = project.cover_image || (project.images && project.images[0]) || null;

                                return (
                                    <div 
                                        key={project.id}
                                        className="relative group bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none overflow-hidden hover:border-cyan-500/60 transition-all duration-300 flex flex-col"
                                    >
                                        {/* Coins carrés avec + */}
                                        <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>
                                        <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>
                                        <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>
                                        <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>

                                        {/* Image carrée (rounded-none) avec zoom fluide */}
                                        <div className="relative aspect-[16/10] bg-neutral-100 dark:bg-[#111622] overflow-hidden border-b border-neutral-200 dark:border-neutral-800 rounded-none">
                                            {coverImg ? (
                                                <img 
                                                    src={coverImg} 
                                                    alt={project.title} 
                                                    className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 rounded-none" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-neutral-400 dark:text-neutral-600">
                                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}

                                            {project.category && (
                                                <span className="absolute top-3 left-3 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-900/90 text-white border border-white/20 rounded-none">
                                                    {project.category}
                                                </span>
                                            )}
                                        </div>

                                        {/* Contenu */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase font-sans group-hover:text-cyan-500 transition-colors">
                                                {project.title}
                                            </h3>

                                            <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 flex-1 font-sans">
                                                {project.excerpt || "Système web et architecture applicative moderne."}
                                            </p>

                                            {/* Stack pills carrées */}
                                            <div className="flex flex-wrap gap-1 mt-5">
                                                {techStack.slice(0, 4).map((tech, i) => (
                                                    <span 
                                                        key={i}
                                                        className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-none bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Liens d'action */}
                                            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono font-bold uppercase">
                                                <Link 
                                                    href={`/projects/${project.slug}`}
                                                    className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 inline-flex items-center gap-1"
                                                >
                                                    <span>Détails</span>
                                                    <span>→</span>
                                                </Link>

                                                {project.live_url && (
                                                    <a 
                                                        href={project.live_url} 
                                                        target="_blank" 
                                                        rel="noreferrer"
                                                        className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white inline-flex items-center gap-1"
                                                    >
                                                        <span>Live</span>
                                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-12 text-center text-xs font-mono text-neutral-500">
                                [ AUCUN PROJET ACTUELLEMENT ]
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 5. SECTION BLOG / ÉCRITS (CARRÉS AVEC COINS +)            */}
            {/* ========================================================= */}
            {blogs && blogs.length > 0 && (
                <section className="py-20 border-b border-neutral-200/80 dark:border-neutral-800/80 relative">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
                            <div>
                                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
                                    <span>[03]</span>
                                    <span>ARCHIVES & RÉFLEXIONS</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                                    Articles & retours d'expérience
                                </h2>
                            </div>
                            <Link 
                                href="/blog" 
                                className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 transition-colors"
                            >
                                <span>Tous les articles</span>
                                <span className="font-bold">→</span>
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {blogs.slice(0, 3).map((blog) => (
                                <Link
                                    key={blog.id}
                                    href={`/blog/${blog.slug}`}
                                    className="relative group p-6 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none hover:border-cyan-500/50 transition-all duration-300 flex flex-col"
                                >
                                    {/* Coins carrés avec + */}
                                    <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                                    <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                                    <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                                    <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>

                                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 mb-3">
                                        <time>
                                            {blog.published_at 
                                                ? new Date(blog.published_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
                                                : 'Récemment'}
                                        </time>
                                        <span className="text-cyan-500 font-bold uppercase">4 MIN</span>
                                    </div>

                                    <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-cyan-500 transition-colors mb-2 leading-snug font-sans">
                                        {blog.title}
                                    </h3>

                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed flex-1 font-sans">
                                        {blog.meta_description || "Documentation technique et analyse d'architecture logicielle."}
                                    </p>

                                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                                        <span>Lire</span>
                                        <span>→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ========================================================= */}
            {/* 6. SECTION CONTACT DIRECT (STYLE ARCHITECTURAL CARRÉ)     */}
            {/* ========================================================= */}
            <section id="contact" className="py-20 relative">
                <div className="max-w-4xl mx-auto px-5 sm:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
                            <span>[04]</span>
                            <span>CANAUX & CONTACT</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
                            Un projet en tête ? Échangeons.
                        </h2>
                        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto font-sans">
                            Besoin d'un cadrage technique, d'une estimation ou d'un renfort d'ingénierie logicielle ? Je vous réponds sous 24h.
                        </p>
                    </div>

                    <div className="relative p-7 sm:p-10 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none shadow-xl shadow-neutral-950/5">
                        {/* Coins carrés avec + */}
                        <span className="absolute -top-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                        <span className="absolute -top-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                        <span className="absolute -bottom-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                        <span className="absolute -bottom-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>

                        <form onSubmit={submitContact} className="flex flex-col gap-5">
                            {recentlySuccessful && (
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider rounded-none">
                                    [ TRANSMISSION RÉUSSIE ] Votre message a été bien envoyé.
                                </div>
                            )}

                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                                        Nom complet
                                    </label>
                                    <input 
                                        type="text"
                                        required
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Ex: Franck Dimitri"
                                        className="w-full px-4 py-3 rounded-none bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 focus:ring-0 transition-colors font-sans"
                                    />
                                    {errors.name && <p className="mt-1 text-xs text-red-500 font-mono">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                                        Adresse email
                                    </label>
                                    <input 
                                        type="email"
                                        required
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="vous@exemple.com"
                                        className="w-full px-4 py-3 rounded-none bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 focus:ring-0 transition-colors font-sans"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-500 font-mono">{errors.email}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                                    Message
                                </label>
                                <textarea 
                                    rows="4"
                                    required
                                    value={data.message}
                                    onChange={e => setData('message', e.target.value)}
                                    placeholder="Décrivez brièvement votre projet ou votre demande..."
                                    className="w-full px-4 py-3 rounded-none bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-sm focus:border-cyan-500 focus:ring-0 transition-colors resize-none font-sans"
                                ></textarea>
                                {errors.message && <p className="mt-1 text-xs text-red-500 font-mono">{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full sm:w-auto self-start px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 rounded-none shadow-md shadow-cyan-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <span>ENVOI EN COURS...</span>
                                ) : (
                                    <span>ENVOYER LE MESSAGE →</span>
                                )}
                            </button>
                        </form>

                        {/* Coordonnées directes sous le formulaire carrées */}
                        <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <a 
                                href="https://wa.me/237676383986?text=Bonjour%20Franck" 
                                target="_blank"
                                rel="noreferrer"
                                className="relative p-3.5 bg-neutral-50 dark:bg-[#070A10] hover:border-cyan-500 border border-neutral-200 dark:border-neutral-800 transition-all flex flex-col items-center text-center group rounded-none"
                            >
                                <span className="absolute -top-1 -left-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                <span className="absolute -top-1 -right-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                <span className="text-[10px] font-mono text-neutral-400 uppercase">WHATSAPP</span>
                                <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-cyan-500 transition-colors mt-0.5">
                                    +237 676 383 986
                                </span>
                            </a>

                            <a 
                                href="mailto:franckdimitri009@gmail.com"
                                className="relative p-3.5 bg-neutral-50 dark:bg-[#070A10] hover:border-cyan-500 border border-neutral-200 dark:border-neutral-800 transition-all flex flex-col items-center text-center group rounded-none"
                            >
                                <span className="absolute -top-1 -left-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                <span className="absolute -top-1 -right-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                <span className="text-[10px] font-mono text-neutral-400 uppercase">EMAIL</span>
                                <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-cyan-500 transition-colors mt-0.5 truncate max-w-[140px]">
                                    franckdimitri009
                                </span>
                            </a>

                            <a 
                                href="https://github.com/Franck-Dimitri"
                                target="_blank"
                                rel="noreferrer"
                                className="relative p-3.5 bg-neutral-50 dark:bg-[#070A10] hover:border-cyan-500 border border-neutral-200 dark:border-neutral-800 transition-all flex flex-col items-center text-center group rounded-none"
                            >
                                <span className="absolute -top-1 -left-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                <span className="absolute -top-1 -right-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                <span className="text-[10px] font-mono text-neutral-400 uppercase">GITHUB</span>
                                <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-cyan-500 transition-colors mt-0.5">
                                    @Franck-Dimitri
                                </span>
                            </a>

                            <a 
                                href="https://linkedin.com/in/franck-dimitri-kouongme"
                                target="_blank"
                                rel="noreferrer"
                                className="relative p-3.5 bg-neutral-50 dark:bg-[#070A10] hover:border-cyan-500 border border-neutral-200 dark:border-neutral-800 transition-all flex flex-col items-center text-center group rounded-none"
                            >
                                <span className="absolute -top-1 -left-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                <span className="absolute -top-1 -right-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                <span className="text-[10px] font-mono text-neutral-400 uppercase">LINKEDIN</span>
                                <span className="text-xs font-bold text-neutral-900 dark:text-white group-hover:text-cyan-500 transition-colors mt-0.5">
                                    Franck Dimitri
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <CvModal show={showCvModal} onClose={() => setShowCvModal(false)} />
        </BlueprintLayout>
    );
}

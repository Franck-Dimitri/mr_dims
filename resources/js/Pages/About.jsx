import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import SEO from '@/Components/SEO';
import { useLanguage } from '@/Context/LanguageContext';
import CvModal from '@/Components/CvModal';
import { LocationMap } from '@/Components/ui/expand-map';

export default function About() {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };
    const [imgError, setImgError] = useState(false);
    const [showCvModal, setShowCvModal] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    return (
        <BlueprintLayout>
            <SEO 
                title={lang === 'en' ? "About Franck Dimitri — Software Architect & Full Stack Engineer" : "À Propos — Franck Dimitri | Architecte Logiciel & Full Stack"} 
                description={lang === 'en' ? "Discover the career, philosophy, and technical stack of Franck Dimitri (Mr Dim's). Software Architect based in Cameroon." : "Découvrez le profil, la philosophie technique et l'approche d'ingénierie de Franck Dimitri (Mr Dim's). Architecte Logiciel & Développeur Full-Stack basé au Cameroun."} 
                keywords="À Propos, Franck Dimitri, Mr Dim's, Architecte Logiciel, Développeur Full Stack, Laravel, React, Cameroun"
            />

            {/* ========================================================= */}
            {/* 1. HERO PRÉSENTATION & STATUTS SPÉCIFICATIONS              */}
            {/* ========================================================= */}
            <section className="relative pt-12 pb-16 border-b border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden font-sans">
                {/* Lignes d'axes de repère */}
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="max-w-6xl mx-auto h-full border-x border-dashed border-neutral-200/50 dark:border-neutral-800/50 relative">
                        <span className="absolute top-4 -left-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute top-4 -right-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute bottom-4 -left-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute bottom-4 -right-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        
                        {/* Colonne Gauche : Bio Concise & Spécifications */}
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="lg:col-span-7 flex flex-col items-start"
                        >
                            {/* Tag système actif */}
                            <motion.div 
                                variants={fadeInUp}
                                className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-4"
                            >
                                <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse"></span>
                                <span>PROFIL // FRANCK DIMITRI · À PROPOS</span>
                            </motion.div>

                            {/* Titre avec encadré en pointillés comme Thierry Wangbara */}
                            <motion.div variants={fadeInUp} className="mb-4">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1] font-sans uppercase">
                                    <span className="block">Franck Dimitri</span>
                                    <span className="inline-block mt-2 border-2 border-dashed border-neutral-400 dark:border-neutral-600 px-3 py-0.5 text-neutral-900 dark:text-white select-none text-2xl sm:text-3xl md:text-4xl">
                                        MR DIMS'S DEV
                                    </span>
                                </h1>
                            </motion.div>

                            {/* Sous-titre architectural */}
                            <motion.div 
                                variants={fadeInUp}
                                className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-5"
                            >
                                <span>INGÉNIERIE LOGICIELLE</span>
                                <span className="mx-2 text-cyan-500">•</span>
                                <span>ARCHITECTURE WEB</span>
                                <span className="mx-2 text-cyan-500">•</span>
                                <span>CLOUD VPS</span>
                            </motion.div>

                            {/* Texte synthétique (court, direct, sans remplissage) */}
                            <motion.p 
                                variants={fadeInUp} 
                                className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl mb-6 font-sans"
                            >
                                {lang === 'en'
                                    ? "I design and build reliable, scalable web architectures. My approach pairs solid backend engineering (SOLID principles, clean APIs, normalized SQL) with pixel-precise, responsive interfaces."
                                    : "Je conçois et développe des architectures web fiables, centrées sur la maintenabilité et la scalabilité. Mon travail associe la rigueur backend (principes SOLID, APIs typées, SQL relationnel) à des interfaces fluides et réactives."}
                            </motion.p>

                            {/* Bandeau de spécifications techniques en ligne (pas de cartes) */}
                            <motion.div 
                                variants={fadeInUp}
                                className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-neutral-200 dark:border-neutral-800 font-mono text-xs mb-8"
                            >
                                <div>
                                    <span className="block text-[10px] text-neutral-400 uppercase font-bold">RÔLE</span>
                                    <span className="font-bold text-neutral-900 dark:text-white">Architecte Web</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-neutral-400 uppercase font-bold">EXPÉRIENCE</span>
                                    <span className="font-bold text-neutral-900 dark:text-white">5+ Années Prod</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-neutral-400 uppercase font-bold">LOCALISATION</span>
                                    <span className="font-bold text-neutral-900 dark:text-white">Yaoundé / Remote</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-neutral-400 uppercase font-bold">DISPONIBILITÉ</span>
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Immédiate</span>
                                </div>
                            </motion.div>

                            {/* Boutons d'Action Carrés */}
                            <motion.div 
                                variants={fadeInUp} 
                                className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
                            >
                                <button 
                                    onClick={() => setShowCvModal(true)}
                                    type="button"
                                    className="relative px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 rounded-none"
                                >
                                    <span className="absolute -top-1 -left-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                    <span className="absolute -top-1 -right-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                    <span className="absolute -bottom-1 -left-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                    <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>{lang === 'en' ? 'Curriculum Vitae' : 'Consulter le CV'}</span>
                                </button>

                                <Link 
                                    href="/contact" 
                                    className="relative px-6 py-3.5 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 dark:hover:border-cyan-400 text-neutral-900 dark:text-neutral-100 hover:text-cyan-500 font-mono font-bold text-xs uppercase tracking-wider transition-colors duration-200 flex items-center justify-center gap-2 rounded-none"
                                >
                                    <span className="absolute -top-1 -left-1 text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-600">+</span>
                                    <span className="absolute -top-1 -right-1 text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-600">+</span>
                                    <span className="absolute -bottom-1 -left-1 text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-600">+</span>
                                    <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold text-neutral-400 dark:text-neutral-600">+</span>
                                    <span>{lang === 'en' ? 'Get in Touch' : 'Initier un échange'}</span>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Colonne Droite : Cadre Photo Architectural Carré avec 4 Coins + */}
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="relative p-3 bg-white dark:bg-[#0A0E17] border border-neutral-300 dark:border-neutral-800 shadow-xl rounded-none group w-full max-w-[340px] sm:max-w-[370px]">
                                {/* 4 Coins carrés avec + */}
                                <span className="absolute -top-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>
                                <span className="absolute -top-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>
                                <span className="absolute -bottom-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>
                                <span className="absolute -bottom-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>

                                {/* Conteneur image carré */}
                                <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-none">
                                    {!imgError ? (
                                        <img 
                                            src="/profile.jpg" 
                                            alt="Franck Dimitri" 
                                            onError={() => setImgError(true)}
                                            className="w-full h-full object-cover object-center grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 rounded-none"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-neutral-400 font-mono text-center">
                                            <span className="text-xs font-bold text-neutral-900 dark:text-white uppercase">Franck Dimitri</span>
                                            <span className="text-[10px] text-cyan-500 mt-1">[ PHOTO_PROFIL ]</span>
                                        </div>
                                    )}

                                    {/* Badge statut */}
                                    <div className="absolute bottom-3 left-3 bg-neutral-900/90 text-white border border-white/20 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-none">
                                        STATUT: <span className="text-emerald-400">DISPONIBLE</span>
                                    </div>
                                </div>

                                {/* Cartouche d'identification */}
                                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-500">
                                    <span className="uppercase font-bold text-neutral-900 dark:text-white">Franck Dimitri</span>
                                    <span className="text-[11px] text-cyan-500 font-bold">@mrdims</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. PHILOSOPHIE & PRINCIPES : DISPOSITION ÉDITORIALE (NO CARDS) */}
            {/* ========================================================= */}
            <section className="py-16 sm:py-20 border-b border-neutral-200/80 dark:border-neutral-800/80 relative">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                        {/* Colonne gauche : Titre & Vision */}
                        <div className="lg:col-span-5 space-y-3">
                            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                                <span>[01]</span>
                                <span>PHILOSOPHIE & PRINCIPES</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-sans leading-tight">
                                Concevoir pour durer, sans dette inutile.
                            </h2>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans pt-2">
                                Un logiciel performant n'est pas un assemblage hâtif d'outils, mais une structure pensée dans sa globalité : de la modélisation des données jusqu'à la fluidité du rendu navigateur.
                            </p>
                        </div>

                        {/* Colonne droite : 3 Principes sous forme de lignes éditoriales (PAS DE BOÎTES RÉPÉTÉES) */}
                        <div className="lg:col-span-7 divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
                            
                            {/* Principe 01 */}
                            <div className="py-6 flex items-start gap-5">
                                <span className="font-mono text-base font-black text-cyan-500">01.</span>
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white mb-1.5 font-sans">
                                        ARCHITECTURE SOLID & MODULARITÉ
                                    </h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        Code découplé, typé et testable. Chaque module a une responsabilité précise, évitant les effets de bord et facilitant les évolutions futures sans refonte totale.
                                    </p>
                                </div>
                            </div>

                            {/* Principe 02 */}
                            <div className="py-6 flex items-start gap-5">
                                <span className="font-mono text-base font-black text-cyan-500">02.</span>
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white mb-1.5 font-sans">
                                        PRÉCISION D'INTERFACE & EXPÉRIENCE FLUIDE
                                    </h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        Interfaces nettes, au pixel près, avec des temps de rendu minimaux. Pas d'artifices superflus : une typographie équilibrée et une navigation intuitive.
                                    </p>
                                </div>
                            </div>

                            {/* Principe 03 */}
                            <div className="py-6 flex items-start gap-5">
                                <span className="font-mono text-base font-black text-cyan-500">03.</span>
                                <div>
                                    <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-900 dark:text-white mb-1.5 font-sans">
                                        SÉCURITÉ & PERFORMANCE CRITIQUE
                                    </h3>
                                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        Optimisation proactive des index SQL, mise en cache Redis et contrôle systématique des entrées utilisateur pour garantir robustesse et rapidité en charge.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 3. PROCESSUS D'INGÉNIERIE : PIPELINE CONTINU (NO 4 CARDS) */}
            {/* ========================================================= */}
            <section className="py-16 sm:py-20 border-b border-neutral-200/80 dark:border-neutral-800/80 relative">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    
                    <div className="mb-12">
                        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
                            <span>[02]</span>
                            <span>MÉTHODOLOGIE D'EXÉCUTION</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-sans">
                            Pipeline de conception en 4 phases
                        </h2>
                    </div>

                    {/* Ligne de flux continu horizontal */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                        
                        {/* Phase 1 */}
                        <div className="relative pt-4 border-t-2 border-cyan-500">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-2xl font-black text-cyan-500">01</span>
                                <span className="font-mono text-[10px] uppercase font-bold text-neutral-400">ANALYSE</span>
                            </div>
                            <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-white mb-1.5 font-sans">
                                Cadrage & Schéma SQL
                            </h3>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Modélisation des entités relationnelles, cartographie des flux et définition des contrats d'API.
                            </p>
                        </div>

                        {/* Phase 2 */}
                        <div className="relative pt-4 border-t-2 border-cyan-500">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-2xl font-black text-cyan-500">02</span>
                                <span className="font-mono text-[10px] uppercase font-bold text-neutral-400">CORE</span>
                            </div>
                            <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-white mb-1.5 font-sans">
                                Développement Backend & SPA
                            </h3>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Implémentation du backend Laravel, logique métier et intégration frontend réactive React / Inertia.
                            </p>
                        </div>

                        {/* Phase 3 */}
                        <div className="relative pt-4 border-t-2 border-cyan-500">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-2xl font-black text-cyan-500">03</span>
                                <span className="font-mono text-[10px] uppercase font-bold text-neutral-400">AUDIT</span>
                            </div>
                            <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-white mb-1.5 font-sans">
                                Contrôle Qualité & Sécurité
                            </h3>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Benchmarks de performance, tests de résilience, durcissement des headers et assainissement.
                            </p>
                        </div>

                        {/* Phase 4 */}
                        <div className="relative pt-4 border-t-2 border-cyan-500">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-2xl font-black text-cyan-500">04</span>
                                <span className="font-mono text-[10px] uppercase font-bold text-neutral-400">LIVRAISON</span>
                            </div>
                            <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-white mb-1.5 font-sans">
                                Déploiement VPS & CI/CD
                            </h3>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                Automatisation GitHub Actions, conteneurisation Docker, serveur Linux Nginx et télémétrie.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 4. ÉCOSYSTÈME TECHNIQUE : MATRICE ÉPURÉE (NO IDENTICAL BOXES) */}
            {/* ========================================================= */}
            <section className="py-16 sm:py-20 border-b border-neutral-200/80 dark:border-neutral-800/80 relative">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-2">
                            <span>[03]</span>
                            <span>COMPÉTENCES & STACK TECHNIQUE</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white font-sans">
                            Écosystème technologique en production
                        </h2>
                    </div>

                    {/* Grille de 3 colonnes épurées avec séparateurs fins */}
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12 md:divide-x md:divide-neutral-200 md:dark:divide-neutral-800">
                        
                        {/* Colonne 1 : Backend & Données */}
                        <div className="space-y-4">
                            <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                                <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-white font-sans">
                                    Backend & Données
                                </h3>
                                <span className="font-mono text-[10px] text-cyan-500 font-bold">01 // CORE</span>
                            </div>
                            <ul className="space-y-2.5 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                                <li className="flex items-center justify-between">
                                    <span className="font-bold text-neutral-900 dark:text-white">PHP 8.4 / Laravel 12</span>
                                    <span className="text-[10px] text-cyan-500 font-bold">PRIMARY</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>APIs RESTful & Sanctum</span>
                                    <span className="text-[10px] text-neutral-400">AUTH</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>MySQL & PostgreSQL</span>
                                    <span className="text-[10px] text-neutral-400">RDBMS</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Redis & Asynchronous Queues</span>
                                    <span className="text-[10px] text-neutral-400">CACHE</span>
                                </li>
                            </ul>
                        </div>

                        {/* Colonne 2 : Frontend & UI */}
                        <div className="space-y-4 md:pl-8">
                            <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                                <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-white font-sans">
                                    Frontend & Interface
                                </h3>
                                <span className="font-mono text-[10px] text-cyan-500 font-bold">02 // UI/UX</span>
                            </div>
                            <ul className="space-y-2.5 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                                <li className="flex items-center justify-between">
                                    <span className="font-bold text-neutral-900 dark:text-white">React 19 & TypeScript</span>
                                    <span className="text-[10px] text-cyan-500 font-bold">PRIMARY</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Inertia.js SPA</span>
                                    <span className="text-[10px] text-neutral-400">BRIDGE</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Tailwind CSS & Tokens</span>
                                    <span className="text-[10px] text-neutral-400">SYSTEM</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Framer Motion Interactions</span>
                                    <span className="text-[10px] text-neutral-400">ANIM</span>
                                </li>
                            </ul>
                        </div>

                        {/* Colonne 3 : Ops & Cloud */}
                        <div className="space-y-4 md:pl-8">
                            <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                                <h3 className="font-bold text-sm uppercase text-neutral-900 dark:text-white font-sans">
                                    Cloud & Déploiement
                                </h3>
                                <span className="font-mono text-[10px] text-cyan-500 font-bold">03 // DEVOPS</span>
                            </div>
                            <ul className="space-y-2.5 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                                <li className="flex items-center justify-between">
                                    <span className="font-bold text-neutral-900 dark:text-white">Linux VPS & Nginx</span>
                                    <span className="text-[10px] text-cyan-500 font-bold">HOSTING</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Docker & Containers</span>
                                    <span className="text-[10px] text-neutral-400">RUNTIME</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>GitHub Actions CI/CD</span>
                                    <span className="text-[10px] text-neutral-400">DEPLOY</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>SSL, UFW & Hardening</span>
                                    <span className="text-[10px] text-neutral-400">SEC</span>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 5. STANDARDS DE LIVRAISON : BANDEAU HORIZONTAL UNIQUE     */}
            {/* ========================================================= */}
            <section className="py-14 sm:py-16 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/60 dark:bg-[#070A11]/60 relative">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    
                    <div className="grid md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
                        
                        <div className="pt-4 md:pt-0">
                            <div className="text-3xl sm:text-4xl font-black text-cyan-500 font-mono mb-1">&lt; 200ms</div>
                            <div className="font-bold text-xs uppercase text-neutral-900 dark:text-white mb-1">Performance Cible</div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Navigation instantanée et requêtes API optimisées.</p>
                        </div>

                        <div className="pt-4 md:pt-0 md:pl-8">
                            <div className="text-3xl sm:text-4xl font-black text-emerald-500 font-mono mb-1">100% Typé</div>
                            <div className="font-bold text-xs uppercase text-neutral-900 dark:text-white mb-1">Qualité de Code</div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Code structuré, vérifié et documenté pour la maintenabilité.</p>
                        </div>

                        <div className="pt-4 md:pt-0 md:pl-8">
                            <div className="text-3xl sm:text-4xl font-black text-cyan-500 font-mono mb-1">Zéro Dette</div>
                            <div className="font-bold text-xs uppercase text-neutral-900 dark:text-white mb-1">Rigueur d'Architecture</div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">Pas de solutions temporaires opaques : une base propre et claire.</p>
                        </div>

                    </div>

                </div>
            </section>

            {/* ========================================================= */}
            {/* 6. LOCALISATION & CARTOUCHE DE CONTACT                    */}
            {/* ========================================================= */}
            <section className="py-16 relative">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 flex flex-col items-center">
                    
                    <LocationMap 
                        location={lang === 'en' ? 'Yaounde, Cameroon / Remote' : 'Yaoundé, Cameroun / Remote'} 
                        coordinates="3.8480° N, 11.5021° E" 
                    />

                    {/* Ligne d'action directe sous la carte */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
                        <Link 
                            href="/contact"
                            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider rounded-none transition-colors"
                        >
                            Démarrer un projet ensemble [ → ]
                        </Link>
                        <a 
                            href="https://wa.me/237676383986?text=Bonjour%20Franck"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 text-neutral-800 dark:text-neutral-200 hover:text-cyan-500 font-bold uppercase tracking-wider rounded-none transition-colors"
                        >
                            WhatsApp Direct
                        </a>
                    </div>

                </div>
            </section>

            <CvModal show={showCvModal} onClose={() => setShowCvModal(false)} />
        </BlueprintLayout>
    );
}

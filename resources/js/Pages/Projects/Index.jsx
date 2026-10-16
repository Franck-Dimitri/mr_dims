import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import SEO from '@/Components/SEO';
import { useLanguage } from '@/Context/LanguageContext';

export default function Index({ projects = [], filters }) {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(filters?.category || 'ALL');

    const categories = ['ALL', 'FULL_STACK', 'BACKEND', 'FRONTEND', 'API'];

    const getCategoryLabel = (cat) => {
        switch (cat) {
            case 'ALL': return lang === 'en' ? 'All Projects' : 'Tous les projets';
            case 'FULL_STACK': return 'Full Stack';
            case 'BACKEND': return 'Backend';
            case 'FRONTEND': return 'Frontend';
            case 'API': return 'APIs & Services';
            default: return cat;
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesCategory = activeCategory === 'ALL' || project.category === activeCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (project.excerpt && project.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const parseJSON = (data, defaultVal) => {
        if (!data) return defaultVal;
        if (Array.isArray(data)) return data;
        if (typeof data === 'string') {
            try { return JSON.parse(data); } 
            catch (e) { return data.split(',').map(s => s.trim()); }
        }
        return defaultVal;
    };

    return (
        <BlueprintLayout>
            <SEO 
                title={lang === 'en' ? "Projects & Software Engineering Case Studies" : "Projets & Réalisations — Franck Dimitri"}
                description={lang === 'en' ? "Explore full-stack software applications, Laravel systems, and React architectures by Franck Dimitri (Mr Dim's)." : "Découvrez les réalisations, architectures logicielles, applications web et intégrations d'APIs développées par Franck Dimitri (Mr Dim's)."}
                keywords="Projets, Réalisations, Case Studies, Architecture Logicielle, Laravel, React, Franck Dimitri"
            />
            
            {/* ========================================================= */}
            {/* 1. EN-TÊTE DE LA GALERIE DE PROJETS                       */}
            {/* ========================================================= */}
            <section className="relative pt-12 pb-14 border-b border-neutral-200/80 dark:border-neutral-800/80 font-sans overflow-hidden">
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="max-w-6xl mx-auto h-full border-x border-dashed border-neutral-200/50 dark:border-neutral-800/50 relative">
                        <span className="absolute top-4 -left-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute top-4 -right-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute bottom-4 -left-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute bottom-4 -right-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold mb-4">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-none animate-pulse"></span>
                            <span>INDEX // RÉALISATIONS TECHNIQUES</span>
                            <span className="text-neutral-400">·</span>
                            <span className="text-neutral-500">{projects.length} PROJETS RÉPERTORIÉS</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-4">
                            Projets & Architectures
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                            Sélection d'applications web, de systèmes d'information et d'APIs critiques conçus avec une exigence de robustesse et de performance.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. BARRE D'OUTILS : FILTRES, RECHERCHE & VUE (CARRÉ)      */}
            {/* ========================================================= */}
            <section className="border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-[#070A10]/70 backdrop-blur-md sticky top-16 sm:top-20 z-30 font-sans">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between py-3.5 gap-4">
                        
                        {/* Filtres par Catégorie - Boutons Carrés */}
                        <div className="flex overflow-x-auto pb-1 md:pb-0 gap-2">
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-none transition-colors whitespace-nowrap ${
                                        activeCategory === cat 
                                            ? 'bg-cyan-600 text-white' 
                                            : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-cyan-500 border border-neutral-200 dark:border-neutral-800'
                                    }`}
                                >
                                    {getCategoryLabel(cat)}
                                </button>
                            ))}
                        </div>

                        {/* Recherche & Switch Grille/Liste - Carrés */}
                        <div className="flex items-center gap-3">
                            <div className="relative flex-1 md:w-64">
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Filtrer par titre ou techno..." 
                                    className="w-full bg-neutral-50 dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 focus:border-cyan-500 focus:ring-0 pl-8 pr-3 py-1.5 text-xs rounded-none text-neutral-900 dark:text-white font-sans"
                                />
                                <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            
                            {/* Toggle Grille / Liste */}
                            <div className="flex border border-neutral-200 dark:border-neutral-800 rounded-none bg-neutral-100 dark:bg-neutral-900">
                                <button 
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-none transition-colors ${viewMode === 'grid' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
                                    title="Vue Mosaïque"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>
                                </button>
                                <button 
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-none transition-colors ${viewMode === 'list' ? 'bg-cyan-600 text-white' : 'text-neutral-400 hover:text-neutral-900 dark:hover:text-white'}`}
                                    title="Vue Liste"
                                >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 3. GRILLE DE PROJETS ARCHITECTURALE (CARRÉE AVEC COINS +) */}
            {/* ========================================================= */}
            <section className="py-16 relative z-10 min-h-[60vh] font-sans">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    
                    <div className="flex justify-between items-center mb-8 text-xs font-mono text-neutral-500 border-b border-neutral-100 dark:border-neutral-800 pb-3">
                        <div>RÉSULTAT : {filteredProjects.length} PROJET(S)</div>
                        <div className="uppercase">AFFICHAGE : {viewMode === 'grid' ? 'MOSAÏQUE ARCHITECTURALE' : 'LISTE LINÉAIRE'}</div>
                    </div>

                    <motion.div 
                        layout
                        className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}
                    >
                        <AnimatePresence>
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => {
                                    const techStack = parseJSON(project.tech_stack, ['Laravel', 'React']);
                                    const coverImage = project.cover_image || (project.images && parseJSON(project.images, [])[0]) || null;

                                    return (
                                        <motion.div 
                                            layout
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.25 }}
                                            key={project.id} 
                                            className={`relative group bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/60 rounded-none transition-all duration-300 flex overflow-hidden shadow-sm ${
                                                viewMode === 'list' ? 'flex-col sm:flex-row items-stretch' : 'flex-col'
                                            }`}
                                        >
                                            {/* 4 COINS CARRÉS AVEC + */}
                                            <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>
                                            <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>
                                            <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>
                                            <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>

                                            {/* Image du Projet avec Grayscale to Color */}
                                            <Link 
                                                href={`/projects/${project.slug}`} 
                                                className={`relative bg-neutral-100 dark:bg-[#111622] overflow-hidden ${
                                                    viewMode === 'list' 
                                                        ? 'sm:w-56 h-48 sm:h-auto shrink-0 border-b sm:border-b-0 sm:border-r border-neutral-200 dark:border-neutral-800' 
                                                        : 'aspect-[16/10] border-b border-neutral-200 dark:border-neutral-800'
                                                }`}
                                            >
                                                {project.category && (
                                                    <span className="absolute top-3 left-3 z-10 px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-900/90 text-white border border-white/20 rounded-none">
                                                        {project.category}
                                                    </span>
                                                )}

                                                {coverImage ? (
                                                    <img 
                                                        src={coverImage} 
                                                        alt={project.title} 
                                                        className="w-full h-full object-cover object-top filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 rounded-none" 
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </Link>

                                            {/* Contenu de la Carte */}
                                            <div className="p-6 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <Link href={`/projects/${project.slug}`}>
                                                        <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white uppercase group-hover:text-cyan-500 transition-colors line-clamp-1">
                                                            {project.title}
                                                        </h3>
                                                    </Link>

                                                    <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                                                        {project.excerpt || "Système web et architecture logicielle moderne."}
                                                    </p>

                                                    {/* Stack Pills Carrées */}
                                                    <div className="flex flex-wrap gap-1 mt-4">
                                                        {techStack.slice(0, 4).map((tech, i) => (
                                                            <span 
                                                                key={i} 
                                                                className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-none bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Pied de Carte : Liens & Statut */}
                                                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono font-bold uppercase">
                                                    <Link 
                                                        href={`/projects/${project.slug}`}
                                                        className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 inline-flex items-center gap-1"
                                                    >
                                                        <span>Détails</span>
                                                        <span>→</span>
                                                    </Link>

                                                    <div className="flex items-center gap-3">
                                                        {project.live_url && (
                                                            <a 
                                                                href={project.live_url} 
                                                                target="_blank" 
                                                                rel="noreferrer"
                                                                className="text-neutral-500 hover:text-cyan-500 inline-flex items-center gap-1"
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
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }}
                                    className="col-span-full border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center text-xs font-mono text-neutral-500 rounded-none"
                                >
                                    [ AUCUN PROJET CORRESPONDANT À CES CRITÈRES ]
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

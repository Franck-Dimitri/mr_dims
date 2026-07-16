import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import ConstructionBackground from '@/Components/ConstructionBackground';

export default function Index({ projects, filters }) {
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState(filters?.category || 'ALL');

    const categories = ['ALL', 'FULL_STACK', 'BACKEND', 'FRONTEND', 'API'];

    const filteredProjects = projects.filter(project => {
        const matchesCategory = activeCategory === 'ALL' || project.category === activeCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (project.excerpt && project.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <BlueprintLayout>
            <Head title="Projets - Code Exhibition" />
            
            {/* Header Section */}
            <section className="relative pt-32 pb-16 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-6 mb-8 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 border border-blueprint-bluePrimary dark:border-blueprint-cyan flex items-center justify-center">
                                    <div className="w-1 h-1 bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                </div>
                                WORKSPACE: PORTFOLIO
                            </div>
                            <div className="h-px bg-gray-300 dark:bg-gray-800 w-12"></div>
                            <div>
                                OBJ: {projects.length}
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-6xl md:text-[6rem] font-bold leading-none tracking-tighter mb-6 uppercase">
                            <span className="block text-blueprint-textDark dark:text-white">CODE</span>
                            <span className="block text-blueprint-bluePrimary dark:text-blueprint-cyan">EXHIBITION</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-mono opacity-80">
                            Une sélection rigoureuse d'architectures systèmes, d'interfaces et de logiques backend.<br/> 
                            Chaque projet est traité comme un écosystème logiciel indépendant.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Toolbar Section */}
            <section className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-[#070A10]/80 backdrop-blur-md sticky top-20 z-30">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between py-4 gap-4">
                        
                        {/* Categories */}
                        <div className="flex overflow-x-auto pb-2 lg:pb-0 hide-scrollbar gap-8 font-mono text-xs font-bold tracking-widest uppercase">
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`relative whitespace-nowrap pb-2 ${activeCategory === cat ? 'text-blueprint-bluePrimary dark:text-blueprint-cyan' : 'text-gray-500 hover:text-blueprint-textDark dark:hover:text-white transition-colors'}`}
                                >
                                    {cat === 'ALL' ? 'TOUT AFFICHER' : cat.replace('_', ' ')}
                                    {activeCategory === cat && (
                                        <motion.div 
                                            layoutId="activeCategoryIndicator"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-blueprint-bluePrimary dark:bg-blueprint-cyan"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Search & View Toggle */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="FILTRER PAR MOT-CLÉ..." 
                                    className="bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan pl-10 pr-4 py-2 font-mono text-[10px] w-full lg:w-64 tracking-widest uppercase"
                                />
                            </div>
                            
                            <div className="flex border border-gray-200 dark:border-gray-800 bg-[#F9FAFB] dark:bg-[#111827]">
                                <button 
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gray-200 dark:bg-gray-800 text-blueprint-bluePrimary dark:text-blueprint-cyan' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>
                                </button>
                                <button 
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-gray-200 dark:bg-gray-800 text-blueprint-bluePrimary dark:text-blueprint-cyan' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid Section */}
            <section className="py-16 relative z-10 min-h-screen">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex justify-between items-center mb-8 font-mono text-[10px] tracking-widest text-gray-500 uppercase border-b border-gray-200 dark:border-gray-800 pb-4">
                        <div>AFFICHAGE: {filteredProjects.length} ÉLÉMENT(S)</div>
                        <div>VUE: {viewMode === 'grid' ? 'MOSAÏQUE' : 'LISTE'}</div>
                    </div>

                    <motion.div 
                        layout
                        className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}
                    >
                        <AnimatePresence>
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project, idx) => {
                                    const parseJSON = (data, defaultVal) => {
                                        if (!data) return defaultVal;
                                        if (Array.isArray(data)) return data;
                                        if (typeof data === 'string') {
                                            try { return JSON.parse(data); } 
                                            catch (e) { return data.split(',').map(s => s.trim()); }
                                        }
                                        return defaultVal;
                                    };
                                    const techStack = parseJSON(project.tech_stack, ['LARAVEL', 'REACT']);
                                    const images = parseJSON(project.images, []);
                                    const coverImage = images.length > 0 ? images[0] : null;

                                    return (
                                        <motion.div 
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3 }}
                                            key={project.id} 
                                            className={`group bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 hover:border-blueprint-bluePrimary/50 dark:hover:border-blueprint-cyan/50 transition-colors flex ${viewMode === 'list' ? 'flex-row items-center h-40' : 'flex-col'}`}
                                        >
                                            <Link href={`/projects/${project.slug}`} className={`relative bg-gray-100 dark:bg-[#111827] overflow-hidden ${viewMode === 'list' ? 'w-48 h-full shrink-0 border-r border-gray-200 dark:border-gray-800' : 'h-64 border-b border-gray-200 dark:border-gray-800'}`}>
                                                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                                    <div className="bg-black/80 backdrop-blur px-2 py-1 font-mono text-[10px] tracking-widest text-white uppercase border border-white/10">
                                                        {project.category || 'APP_WEB'}
                                                    </div>
                                                </div>
                                                
                                                {coverImage ? (
                                                    <img src={coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
                                                        <svg className="w-24 h-24 text-blueprint-textDark dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    </div>
                                                )}
                                            </Link>

                                            <div className={`p-6 flex-1 flex flex-col ${viewMode === 'list' ? 'justify-center' : ''}`}>
                                                <Link href={`/projects/${project.slug}`} className="block">
                                                    <h3 className="text-xl font-bold tracking-tight mb-2 uppercase group-hover:text-blueprint-bluePrimary dark:group-hover:text-blueprint-cyan transition-colors line-clamp-1">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 font-mono leading-relaxed line-clamp-2 mb-4">
                                                        {project.excerpt || 'Ceci est un projet généré automatiquement pour présenter l\'architecture technique.'}
                                                    </p>
                                                </Link>

                                                <div className="mb-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan pl-2">
                                                    {techStack.join(' // ')}
                                                </div>
                                                
                                                <div className={`mt-auto pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-gray-500 ${viewMode === 'list' ? 'border-none pt-0 mt-4' : 'border-t border-gray-100 dark:border-gray-800'}`}>
                                                    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                                                        <span>TIME: {project.development_time || 'N/A'}</span>
                                                        {project.live_url ? (
                                                            <span className="flex items-center gap-1 text-green-500">
                                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                                                ONLINE
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center gap-1 text-gray-400 dark:text-gray-600">
                                                                <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                                                                OFFLINE
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-4 items-center">
                                                        {project.repository_url ? (
                                                            <a href={project.repository_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors z-20 relative">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                                                REPO
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-300 dark:text-gray-700 flex items-center gap-1 cursor-not-allowed"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> PRIVATE</span>
                                                        )}
                                                        
                                                        {project.live_url && (
                                                            <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors z-20 relative">
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                                LIVE
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
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="col-span-full border border-dashed border-gray-300 dark:border-gray-700 p-16 text-center flex flex-col items-center justify-center"
                                >
                                    <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div className="font-mono text-sm tracking-widest text-gray-500 uppercase">
                                        [ ERREUR: AUCUN RÉSULTAT POUR CETTE REQUÊTE ]
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

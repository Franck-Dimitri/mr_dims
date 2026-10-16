import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import SEO from '@/Components/SEO';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/Context/LanguageContext';

export default function Show({ project, otherProjects = [] }) {
    const { lang } = useLanguage() || { lang: 'fr' };
    const [selectedImage, setSelectedImage] = useState(null);

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

    const parseJSON = (data, defaultVal) => {
        if (!data) return defaultVal;
        if (Array.isArray(data)) return data;
        if (typeof data === 'string') {
            try { return JSON.parse(data); } 
            catch (e) { return data.split(',').map(s => s.trim()); }
        }
        return defaultVal;
    };

    const techStack = parseJSON(project.tech_stack, ['LARAVEL', 'REACT', 'TAILWIND']);
    const images = parseJSON(project.images, []);
    
    const todayStr = new Date().toISOString().split('T')[0];
    const isCompleted = project.end_date ? (project.end_date <= todayStr) : false;

    const handleLike = () => {
        router.post(route('projects.like', project.slug), {}, {
            preserveScroll: true
        });
    };

    return (
        <BlueprintLayout>
            <SEO 
                title={`${project.title} — Architecture & Ingénierie | Franck Dimitri`}
                description={project.excerpt || `Étude de cas et architecture logicielle du projet ${project.title} conçu par Franck Dimitri (Mr Dim's).`}
                keywords={`${project.title}, ${Array.isArray(techStack) ? techStack.join(', ') : 'Architecture Logicielle'}, Franck Dimitri, Mr Dim's`}
                image={project.cover_image || (images && images.length > 0 ? images[0] : null)}
            />
            
            {/* ========================================================= */}
            {/* 1. BARRE DE RETOUR ARCHITECTURALE                         */}
            {/* ========================================================= */}
            <div className="border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-[#070A10]/60 backdrop-blur-md py-4 font-mono text-xs">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 flex justify-between items-center">
                    <Link 
                        href="/projects" 
                        className="inline-flex items-center gap-2 text-neutral-500 hover:text-cyan-500 font-bold uppercase transition-colors"
                    >
                        <span>←</span>
                        <span>{lang === 'en' ? 'Back to Projects' : 'Retour aux projets'}</span>
                    </Link>
                    
                    <div className="text-[11px] font-bold text-neutral-400 uppercase hidden sm:flex items-center gap-3">
                        <span>REF: {project.slug.toUpperCase()}</span>
                        <span>·</span>
                        <span>{new Date(project.created_at).toLocaleDateString('fr-FR')}</span>
                    </div>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 2. DÉTAILS DU PROJET                                      */}
            {/* ========================================================= */}
            <article className="py-16 relative z-10 font-sans">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14"
                    >
                        {/* Contenu Principal (Gauche) */}
                        <div className="lg:col-span-8">
                            <motion.div variants={fadeInUp} className="mb-10">
                                <div className="relative inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-widest mb-4 rounded-none">
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-none"></span>
                                    <span>{project.category || 'PROJET_WEB'}</span>
                                </div>

                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-tight mb-5">
                                    {project.title}
                                </h1>

                                <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans border-l-2 border-cyan-500 pl-4">
                                    {project.excerpt}
                                </p>
                            </motion.div>

                            {/* Galerie d'Images Carrée avec Coins + */}
                            <motion.div variants={fadeInUp} className="mb-12">
                                {images.length > 0 ? (
                                    <div className="space-y-4">
                                        {/* Image Principale */}
                                        <div 
                                            className="relative border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-[#0A0E17] rounded-none overflow-hidden cursor-pointer group"
                                            onClick={() => setSelectedImage(images[0])}
                                        >
                                            <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 z-20">+</span>
                                            <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 z-20">+</span>
                                            <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 z-20">+</span>
                                            <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 z-20">+</span>

                                            <img 
                                                src={images[0]} 
                                                alt={`${project.title} - Vue principale`} 
                                                className="w-full h-auto object-cover rounded-none transition-transform duration-500 group-hover:scale-[1.01]" 
                                            />
                                        </div>
                                        
                                        {/* Vignettes secondaires */}
                                        {images.length > 1 && (
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {images.slice(1).map((img, idx) => (
                                                    <div 
                                                        key={idx} 
                                                        className="relative border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#0A0E17] aspect-video overflow-hidden cursor-pointer group rounded-none" 
                                                        onClick={() => setSelectedImage(img)}
                                                    >
                                                        <span className="absolute -top-1.5 -left-1 text-[9px] font-mono font-bold text-cyan-500 z-20">+</span>
                                                        <span className="absolute -top-1.5 -right-1 text-[9px] font-mono font-bold text-cyan-500 z-20">+</span>
                                                        <span className="absolute -bottom-1.5 -left-1 text-[9px] font-mono font-bold text-cyan-500 z-20">+</span>
                                                        <span className="absolute -bottom-1.5 -right-1 text-[9px] font-mono font-bold text-cyan-500 z-20">+</span>

                                                        <img 
                                                            src={img} 
                                                            alt={`${project.title} - Capture ${idx + 1}`} 
                                                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300 rounded-none" 
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-[#0A0E17] aspect-video flex items-center justify-center rounded-none">
                                        <span className="font-mono text-xs text-neutral-400">[ AUCUN VISUEL DISPONIBLE ]</span>
                                    </div>
                                )}
                            </motion.div>

                            {/* Corps du texte Markdown */}
                            <motion.div variants={fadeInUp} className="prose dark:prose-invert max-w-none font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed">
                                <ReactMarkdown>
                                    {project.description_markdown || 'Spécifications et documentation technique du système.'}
                                </ReactMarkdown>
                            </motion.div>

                            {/* Fonctionnalités clés en blocs carrés */}
                            {project.key_features && project.key_features.length > 0 && (
                                <div className="mt-14 pt-10 border-t border-neutral-200 dark:border-neutral-800">
                                    <div className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-6">
                                        // CARACTÉRISTIQUES DU SYSTÈME
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {project.key_features.map((feature, idx) => (
                                            <div 
                                                key={idx} 
                                                className="relative p-5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0A0E17] rounded-none group hover:border-cyan-500/50 transition-colors"
                                            >
                                                <span className="absolute -top-1.5 -left-1 text-[9px] font-mono font-bold text-cyan-500">+</span>
                                                <span className="absolute -top-1.5 -right-1 text-[9px] font-mono font-bold text-cyan-500">+</span>
                                                <div className="font-mono text-[10px] text-cyan-500 font-bold mb-1">
                                                    FEATURE_{String(idx + 1).padStart(2, '0')}
                                                </div>
                                                <p className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-tight">
                                                    {feature}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Barre Latérale (Métadonnées & Actions) */}
                        <div className="lg:col-span-4 space-y-6">
                            
                            {/* Actions Principales (Live & Repo) */}
                            <motion.div variants={fadeInUp} className="flex flex-col gap-3">
                                {project.live_url && (
                                    <a 
                                        href={project.live_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="relative w-full flex items-center justify-between px-6 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors rounded-none shadow-md shadow-cyan-600/20"
                                    >
                                        <span className="absolute -top-1 -left-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                        <span className="absolute -top-1 -right-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                        <span className="absolute -bottom-1 -left-1 text-[9px] font-mono font-bold text-cyan-300">+</span>
                                        <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold text-cyan-300">+</span>

                                        <span className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-white rounded-none animate-pulse"></span>
                                            ACCÉDER AU SITE LIVE
                                        </span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )}
                                
                                {project.repository_url ? (
                                    <a 
                                        href={project.repository_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="relative w-full flex items-center justify-between px-6 py-3.5 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:border-cyan-500 hover:text-cyan-500 font-mono font-bold text-xs uppercase tracking-wider transition-colors rounded-none"
                                    >
                                        <span className="absolute -top-1 -left-1 text-[9px] font-mono font-bold text-neutral-400">+</span>
                                        <span className="absolute -top-1 -right-1 text-[9px] font-mono font-bold text-neutral-400">+</span>
                                        <span className="absolute -bottom-1 -left-1 text-[9px] font-mono font-bold text-neutral-400">+</span>
                                        <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold text-neutral-400">+</span>

                                        <span>VOIR LE CODE SOURCE</span>
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                ) : (
                                    <div className="w-full flex items-center justify-between px-6 py-3.5 border border-dashed border-neutral-300 dark:border-neutral-800 text-neutral-400 font-mono font-bold text-xs uppercase rounded-none">
                                        <span>DÉPÔT PRIVÉ CLIENT</span>
                                        <span>🔒</span>
                                    </div>
                                )}

                                {/* Like Button */}
                                <div className="flex items-center justify-between px-5 py-3 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none">
                                    <span className="font-mono text-xs text-neutral-500 uppercase">Apprécier ce projet</span>
                                    <button
                                        onClick={handleLike}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/30 rounded-none transition-colors font-mono font-bold text-xs"
                                    >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                        </svg>
                                        <span>{project.likes_count || 0}</span>
                                    </button>
                                </div>
                            </motion.div>

                            {/* Fiche Métadonnées Carrée avec Coins + */}
                            <motion.div 
                                variants={fadeInUp} 
                                className="relative border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0A0E17] p-6 rounded-none font-mono text-xs"
                            >
                                <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                                <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                                <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                                <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>

                                <div className="font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest pb-3 mb-5 border-b border-neutral-100 dark:border-neutral-800">
                                    [ SPÉCIFICATIONS TECHNIQUES ]
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="text-[10px] text-neutral-400 uppercase mb-2">STACK TECHNIQUE</div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {techStack.map(tech => (
                                                <span key={tech} className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 rounded-none uppercase font-bold text-[10px]">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {project.development_time && (
                                        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                                            <div className="text-[10px] text-neutral-400 uppercase mb-1">DURÉE DU PROJET</div>
                                            <div className="font-bold text-neutral-900 dark:text-white">{project.development_time}</div>
                                        </div>
                                    )}

                                    {project.client && (
                                        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                                            <div className="text-[10px] text-neutral-400 uppercase mb-1">CLIENT / ENTITÉ</div>
                                            <div className="font-bold text-neutral-900 dark:text-white">{project.client}</div>
                                        </div>
                                    )}

                                    <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                                        <div className="text-[10px] text-neutral-400 uppercase mb-1">STATUT D'EXÉCUTION</div>
                                        <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-none animate-pulse"></span>
                                            <span>{isCompleted ? 'DÉPLOYÉ & OPÉRATIONNEL' : 'EN COURS D\'ÉVOLUTION'}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </article>

            {/* ========================================================= */}
            {/* 3. AUTRES PROJETS CONNEXES                                */}
            {/* ========================================================= */}
            {otherProjects && otherProjects.length > 0 && (
                <section className="py-16 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-[#080C14]/50 relative z-10 font-sans">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <span className="font-mono text-xs font-bold uppercase text-cyan-600 dark:text-cyan-400">
                                    [ AUTRES RÉALISATIONS ]
                                </span>
                                <h2 className="text-xl sm:text-2xl font-black uppercase text-neutral-900 dark:text-white">
                                    Poursuivre l'exploration
                                </h2>
                            </div>
                            <Link href="/projects" className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 uppercase">
                                Tous les projets →
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {otherProjects.slice(0, 3).map((other) => (
                                <Link 
                                    href={`/projects/${other.slug}`} 
                                    key={other.id} 
                                    className="relative group bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 p-5 rounded-none hover:border-cyan-500/50 transition-all flex flex-col justify-between"
                                >
                                    <span className="absolute -top-1.5 -left-1 text-[9px] font-mono font-bold text-cyan-500">+</span>
                                    <span className="absolute -top-1.5 -right-1 text-[9px] font-mono font-bold text-cyan-500">+</span>
                                    <span className="absolute -bottom-1.5 -left-1 text-[9px] font-mono font-bold text-cyan-500">+</span>
                                    <span className="absolute -bottom-1.5 -right-1 text-[9px] font-mono font-bold text-cyan-500">+</span>

                                    <div>
                                        <div className="text-[10px] font-mono font-bold text-cyan-500 uppercase mb-2">
                                            {other.category || 'PROJET'}
                                        </div>
                                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase group-hover:text-cyan-500 transition-colors line-clamp-1 mb-2">
                                            {other.title}
                                        </h3>
                                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                                            {other.excerpt}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase flex items-center justify-between">
                                        <span>Voir le projet</span>
                                        <span>→</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </BlueprintLayout>
    );
}

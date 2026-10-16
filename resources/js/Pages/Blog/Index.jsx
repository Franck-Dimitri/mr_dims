import React from 'react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import SEO from '@/Components/SEO';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';

export default function Index({ blogs = [] }) {
    const { lang } = useLanguage() || { lang: 'fr' };
    
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

    return (
        <BlueprintLayout>
            <SEO 
                title={lang === 'en' ? "Engineering Articles & Architecture Notes" : "Blog & Articles Techniques — Franck Dimitri"}
                description={lang === 'en' ? "Technical writing, architecture analysis, and software engineering notes by Franck Dimitri (Mr Dim's)." : "Articles techniques, retours d'expérience, analyses d'architecture logicielle et bonnes pratiques par Franck Dimitri (Mr Dim's)."}
                keywords="Blog Tech, Ingénierie Logicielle, Laravel, React, Architecture Logicielle, Franck Dimitri"
            />

            {/* ========================================================= */}
            {/* 1. EN-TÊTE DU BLOG                                        */}
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
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                        <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold mb-4">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-none animate-pulse"></span>
                            <span>INDEX // PUBLICATIONS & DOCUMENTATION</span>
                            <span className="text-neutral-400">·</span>
                            <span className="text-neutral-500">{blogs.length} ARTICLES DISPONIBLES</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-4">
                            Blog & Publications
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                            Analyses architecturales, retours d'expérience sur la production logicielle, et synthèses des meilleures pratiques Laravel et React.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. GRILLE D'ARTICLES CARRÉE (CARRÉS AVEC COINS +)         */}
            {/* ========================================================= */}
            <section className="py-16 relative z-10 min-h-[60vh] font-sans">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {blogs && blogs.length > 0 ? (
                            blogs.map((blog) => (
                                <motion.div variants={fadeInUp} key={blog.id}>
                                    <Link 
                                        href={`/blog/${blog.slug}`} 
                                        className="relative group flex flex-col bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500/60 transition-all duration-300 h-full rounded-none overflow-hidden shadow-sm"
                                    >
                                        {/* 4 COINS CARRÉS AVEC + */}
                                        <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>
                                        <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>
                                        <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>
                                        <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-20">+</span>

                                        {/* Zone Image Carrée */}
                                        <div className="relative aspect-[16/10] bg-neutral-100 dark:bg-[#111622] overflow-hidden border-b border-neutral-200 dark:border-neutral-800 rounded-none">
                                            {blog.image ? (
                                                <img 
                                                    src={blog.image} 
                                                    alt={blog.title} 
                                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 rounded-none" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                                    </svg>
                                                </div>
                                            )}
                                            
                                            {/* Badge date & temps de lecture */}
                                            <div className="absolute top-3 left-3 bg-neutral-900/90 text-white border border-white/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider rounded-none flex items-center gap-2">
                                                <span>{new Date(blog.published_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                                <span>·</span>
                                                <span className="text-cyan-400">
                                                    {Math.max(1, Math.ceil(((blog.markdown_content || '').trim().split(/\s+/).length || 0) / 190))} MIN
                                                </span>
                                            </div>
                                        </div>

                                        {/* Contenu de la Carte */}
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white uppercase group-hover:text-cyan-500 transition-colors line-clamp-2 leading-snug mb-2.5">
                                                    {blog.title}
                                                </h3>
                                                
                                                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                                                    {blog.meta_description || 'Documentation technique et retours d’expérience.'}
                                                </p>
                                            </div>

                                            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase">
                                                <span>Lire l'article</span>
                                                <span>→</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full border border-dashed border-neutral-300 dark:border-neutral-800 p-12 text-center text-xs font-mono text-neutral-500 rounded-none">
                                [ AUCUN ARTICLE PUBLIÉ POUR LE MOMENT ]
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

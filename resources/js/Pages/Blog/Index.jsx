import React from 'react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Index({ blogs }) {
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
            <Head title="Logs & Articles - Ingénierie Logicielle" />

            {/* HEADER SECTION */}
            <section className="pt-32 pb-16 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 relative overflow-hidden bg-[#F9FAFB]/50 dark:bg-[#070A10]/50 backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blueprint-bluePrimary to-purple-500"></div>
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
                        <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold mb-4">
                            <div className="w-2 h-2 bg-blueprint-bluePrimary dark:bg-blueprint-cyan rounded-full animate-ping"></div>
                            TRANSMISSION DE DONNÉES
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-6 text-blueprint-textDark dark:text-white">
                            ARCHIVES <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">TECHNIQUES</span>
                        </h1>
                        <p className="font-mono text-sm uppercase tracking-widest text-gray-500 max-w-2xl leading-relaxed">
                            Exploration des concepts d'architecture, des retours d'expérience et des analyses de performance. Logs d'ingénierie logicielle mis à disposition.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* BLOGS GRID */}
            <section className="py-16 relative z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {blogs && blogs.length > 0 ? (
                            blogs.map((blog, idx) => (
                                <motion.div variants={fadeInUp} key={blog.id}>
                                    <Link href={`/blog/${blog.slug}`} className="group flex flex-col bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors h-full shadow-sm hover:shadow-xl overflow-hidden relative">
                                        
                                        {/* Image Box */}
                                        <div className="relative h-56 bg-gray-100 dark:bg-gray-900 overflow-hidden border-b border-gray-200 dark:border-gray-800">
                                            {blog.image ? (
                                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700">
                                                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                            )}
                                            
                                            {/* Top corner accents */}
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan opacity-0 group-hover:opacity-100 transition-opacity m-2"></div>
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan opacity-0 group-hover:opacity-100 transition-opacity m-2"></div>
                                            
                                            {/* Date Badge */}
                                            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 font-mono text-[10px] tracking-widest text-white uppercase flex items-center gap-2">
                                                <svg className="w-3 h-3 text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                {new Date(blog.published_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </div>
                                        </div>

                                        {/* Content Box */}
                                        <div className="p-6 md:p-8 flex-1 flex flex-col relative">
                                            {/* Stats row */}
                                            <div className="flex items-center gap-3 mb-4 text-[10px] font-mono uppercase tracking-widest text-gray-500">
                                                <span className="flex items-center gap-1.5 text-blueprint-bluePrimary dark:text-blueprint-cyan">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                    {blog.author || 'MR DIMS'}
                                                </span>
                                                <span>//</span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    {blog.views_count}
                                                </span>
                                                <span>//</span>
                                                <span className="flex items-center gap-1 text-pink-500">
                                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                                    {blog.likes_count}
                                                </span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4 group-hover:text-blueprint-bluePrimary dark:group-hover:text-blueprint-cyan transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>
                                            
                                            <p className="text-sm text-gray-500 font-mono leading-relaxed line-clamp-3 mb-8 flex-1">
                                                {blog.meta_description || 'Pas de description meta fournie pour cet article.'}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase font-bold text-gray-400 group-hover:text-blueprint-bluePrimary dark:group-hover:text-blueprint-cyan transition-colors">
                                                <span>INITIALISER LA LECTURE</span>
                                                <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center group-hover:border-blueprint-cyan group-hover:bg-blueprint-cyan/10 transition-all">
                                                    <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full border border-dashed border-gray-300 dark:border-gray-700 p-16 text-center font-mono text-gray-500 flex flex-col items-center">
                                <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                [ NO_LOGS_FOUND ]<br/>
                                <span className="text-[10px] mt-2">LES ARCHIVES SONT ACTUELLEMENT VIDES.</span>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

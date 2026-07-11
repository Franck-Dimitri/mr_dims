import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';

export default function Index({ blogs }) {
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
            <Head title="Logs & Articles - Système" />

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
                                    <div className="w-1 h-1 bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-pulse"></div>
                                </div>
                                TERMINAL DE PUBLICATION
                            </div>
                            <div className="h-px bg-gray-300 dark:bg-gray-800 w-12"></div>
                            <div>
                                {blogs.length} ENTRÉES TROUVÉES
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold leading-none tracking-tighter mb-6 uppercase">
                            <span className="block text-blueprint-textDark dark:text-white">SYSTEM</span>
                            <span className="block text-blueprint-bluePrimary dark:text-blueprint-cyan">LOGS & ARTICLES</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-mono opacity-80 uppercase tracking-wide">
                            // Journal de bord, tutoriels techniques, réflexions architecturales et rapports de développement.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 relative z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    {blogs.length > 0 ? (
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {blogs.map((blog) => (
                                <motion.article 
                                    key={blog.id} 
                                    variants={fadeInUp}
                                    className="group flex flex-col bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors"
                                >
                                    <div className="p-8 flex-grow">
                                        <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                                            <div className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                                                ID_LOG: {blog.slug.substring(0, 8).toUpperCase()}
                                            </div>
                                            <div className="font-mono text-[10px] tracking-widest text-blueprint-bluePrimary dark:text-blueprint-cyan uppercase">
                                                {new Date(blog.published_at || blog.created_at).toLocaleDateString('fr-FR')}
                                            </div>
                                        </div>
                                        
                                        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-blueprint-bluePrimary dark:group-hover:text-blueprint-cyan transition-colors line-clamp-2">
                                            <Link href={`/blog/${blog.slug}`}>
                                                {blog.title}
                                            </Link>
                                        </h2>
                                        
                                        <p className="text-gray-600 dark:text-gray-400 font-mono text-xs leading-relaxed mb-6 opacity-90 line-clamp-3">
                                            {blog.meta_description || "Extraction partielle du contenu non disponible. Accédez au fichier log pour la lecture complète."}
                                        </p>
                                    </div>
                                    
                                    <div className="px-8 py-4 bg-gray-50 dark:bg-[#111827] border-t border-gray-200 dark:border-gray-800 flex justify-between items-center group-hover:bg-blueprint-bluePrimary/5 dark:group-hover:bg-blueprint-cyan/5 transition-colors">
                                        <div className="flex items-center gap-2 font-mono text-[10px] text-gray-500">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            {blog.views_count} VIEWS
                                        </div>
                                        <Link href={`/blog/${blog.slug}`} className="font-mono text-[10px] font-bold tracking-widest text-blueprint-bluePrimary dark:text-blueprint-cyan uppercase hover:underline flex items-center gap-1">
                                            LIRE LE LOG 
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="border border-dashed border-gray-300 dark:border-gray-700 p-16 text-center bg-gray-50 dark:bg-black/20">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div className="font-mono text-sm uppercase tracking-widest text-gray-500">
                                AUCUN LOG ENREGISTRÉ DANS LA BASE DE DONNÉES ACTUELLE.
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </BlueprintLayout>
    );
}

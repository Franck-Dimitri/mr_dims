import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';

export default function Show({ blog, recentBlogs }) {
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
            <Head title={`${blog.title} - System Log`} />
            
            {/* Header Section */}
            <div className="relative pt-32 pb-8 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-blueprint-darkNight/50 backdrop-blur-md z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end">
                    <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan uppercase transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        RETOUR AUX LOGS
                    </Link>
                    
                    <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase text-right">
                        <div>REF_LOG: {blog.slug.substring(0, 12).toUpperCase()}</div>
                        <div>PUBLIÉ: {new Date(blog.published_at || blog.created_at).toLocaleDateString('fr-FR')}</div>
                    </div>
                </div>
            </div>

            <article className="relative py-16 z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16"
                    >
                        {/* Main Content Area */}
                        <div className="lg:col-span-8">
                            <motion.div variants={fadeInUp} className="mb-12">
                                <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white bg-gray-900 dark:bg-white dark:text-gray-900 px-3 py-1 font-bold mb-6">
                                    [SYS_LOG]
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-6 text-blueprint-textDark dark:text-white leading-tight">
                                    {blog.title}
                                </h1>
                                <p className="text-xl text-gray-500 font-mono leading-relaxed opacity-80 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan pl-6">
                                    {blog.meta_description}
                                </p>
                            </motion.div>

                            {/* Content body */}
                            <motion.div variants={fadeInUp} className="prose prose-lg dark:prose-invert max-w-none font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:uppercase prose-a:text-blueprint-bluePrimary dark:prose-a:text-blueprint-cyan">
                                <div dangerouslySetInnerHTML={{ __html: blog.markdown_content || '<p>Contenu non défini pour ce log.</p>' }} />
                            </motion.div>
                            
                            <motion.div variants={fadeInUp} className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <div className="flex items-center justify-between font-mono text-xs text-gray-500 uppercase">
                                    <span>/// FIN DE TRANSMISSION</span>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                        VUES: {blog.views_count}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar Specs */}
                        <div className="lg:col-span-4 space-y-8">
                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 relative">
                                {/* Corner crosshairs */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                                <h3 className="font-mono text-xs tracking-widest text-gray-400 uppercase mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                                    // LOG_METADATA
                                </h3>

                                <div className="space-y-6 font-mono text-sm uppercase">
                                    <div>
                                        <div className="text-[10px] tracking-widest text-gray-500 mb-1">AUTHOR</div>
                                        <div className="font-bold">MR DIM'S</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] tracking-widest text-gray-500 mb-1">TIMESTAMP</div>
                                        <div className="font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{new Date(blog.published_at || blog.created_at).toLocaleString('fr-FR')}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] tracking-widest text-gray-500 mb-1">SYS_STATUS</div>
                                        <div className="flex items-center gap-2 font-bold text-green-600 dark:text-green-400">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            ONLINE
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Related Blogs */}
                            {recentBlogs && recentBlogs.length > 0 && (
                                <motion.div variants={fadeInUp}>
                                    <h3 className="font-mono text-xs tracking-widest text-gray-500 uppercase mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
                                        // LOGS CONNEXES
                                    </h3>
                                    <div className="space-y-4">
                                        {recentBlogs.map(recent => (
                                            <Link key={recent.id} href={`/blog/${recent.slug}`} className="block group">
                                                <div className="p-4 border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#111827] group-hover:border-blueprint-bluePrimary dark:group-hover:border-blueprint-cyan transition-colors">
                                                    <div className="font-mono text-[10px] text-gray-400 mb-2">
                                                        {new Date(recent.published_at || recent.created_at).toLocaleDateString('fr-FR')}
                                                    </div>
                                                    <h4 className="font-bold uppercase tracking-tight text-sm line-clamp-2 group-hover:text-blueprint-bluePrimary dark:group-hover:text-blueprint-cyan">
                                                        {recent.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </article>

        </BlueprintLayout>
    );
}

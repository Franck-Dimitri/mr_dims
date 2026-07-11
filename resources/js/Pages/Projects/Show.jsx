import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import ConstructionBackground from '@/Components/ConstructionBackground';

export default function Show({ project }) {
    const [selectedImage, setSelectedImage] = useState(null);

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

    return (
        <BlueprintLayout>
            <Head title={`${project.title} - Code Exhibition`} />
            
            {/* Top architectural lines overlay */}
            <div className="absolute top-0 left-0 w-full h-[50vh] z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-blueprint-darkNight"></div>
            </div>

            {/* Back Button & Meta Header */}
            <div className="relative z-10 pt-32 pb-8 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-blueprint-darkNight/50 backdrop-blur-md">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end">
                    <Link href="/projects" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan uppercase transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        RETOUR À L'ARCHIVE
                    </Link>
                    
                    <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase text-right">
                        <div>REF: {project.slug.toUpperCase()}</div>
                        <div>PUBLIÉ: {new Date(project.created_at).toLocaleDateString('fr-FR')}</div>
                    </div>
                </div>
            </div>

            <article className="relative z-10 py-16">
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
                                <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white bg-blueprint-bluePrimary dark:bg-blueprint-cyan px-3 py-1 font-bold mb-6">
                                    [CAT: {project.category || 'APP_WEB'}]
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-6 text-blueprint-textDark dark:text-white leading-tight">
                                    {project.title}
                                </h1>
                                <p className="text-xl text-gray-500 font-mono leading-relaxed opacity-80 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan pl-6">
                                    {project.excerpt}
                                </p>
                            </motion.div>

                            {/* Images Gallery */}
                            <motion.div variants={fadeInUp} className="mb-16">
                                {images.length > 0 ? (
                                    <div className="space-y-6">
                                        {/* Main/First Image */}
                                        <div className="relative border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#111827] overflow-hidden group cursor-pointer" onClick={() => setSelectedImage(images[0])}>
                                            <div className="absolute top-4 right-4 z-10 font-mono text-[10px] tracking-widest text-black/50 bg-white/80 backdrop-blur px-2 py-1 uppercase border border-black/10">
                                                VIEWPORT: PRIMARY
                                            </div>
                                            <img src={images[0]} alt={`${project.title} - Main`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                                        </div>
                                        
                                        {/* Secondary Images Grid */}
                                        {images.length > 1 && (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {images.slice(1).map((img, idx) => (
                                                    <div key={idx} className="relative border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#111827] aspect-video overflow-hidden group cursor-pointer" onClick={() => setSelectedImage(img)}>
                                                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                                        </div>
                                                        <img src={img} alt={`${project.title} - Screenshot ${idx+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="relative border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#111827] aspect-video flex items-center justify-center overflow-hidden">
                                        <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-gray-400 uppercase">
                                            NO RENDER ASSETS
                                        </div>
                                        <svg className="w-32 h-32 text-gray-300 dark:text-gray-700 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </motion.div>

                            {/* Content body */}
                            <motion.div variants={fadeInUp} className="prose prose-lg dark:prose-invert max-w-none font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:uppercase prose-a:text-blueprint-bluePrimary dark:prose-a:text-blueprint-cyan">
                                <div dangerouslySetInnerHTML={{ __html: project.description_markdown || '<p>Spécifications détaillées non fournies pour ce prototype.</p>' }} />
                            </motion.div>
                        </div>

                        {/* Sidebar Specs */}
                        <div className="lg:col-span-4 space-y-8">
                            
                            {/* Project Actions (Github & Live) */}
                            <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                                {project.live_url && (
                                    <a href={project.live_url} target="_blank" rel="noreferrer" className="w-full flex items-center justify-between px-6 py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold font-mono tracking-widest uppercase hover:opacity-90 transition-opacity">
                                        <span className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-white dark:bg-gray-900 animate-pulse"></div>
                                            ACCÉDER AU SYSTÈME
                                        </span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                )}
                                
                                {project.repository_url ? (
                                    <a href={project.repository_url} target="_blank" rel="noreferrer" className="w-full flex items-center justify-between px-6 py-4 border-2 border-gray-800 dark:border-gray-200 text-blueprint-textDark dark:text-white font-bold font-mono tracking-widest uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                            VOIR LE CODE
                                        </span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </a>
                                ) : (
                                    <div className="w-full flex items-center justify-between px-6 py-4 border border-dashed border-gray-300 dark:border-gray-700 text-gray-400 font-bold font-mono tracking-widest uppercase cursor-not-allowed">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                            CODE PRIVÉ
                                        </span>
                                    </div>
                                )}
                            </motion.div>

                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 relative">
                                {/* Corner crosshairs */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                                <h3 className="font-mono text-xs tracking-widest text-gray-400 uppercase mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                                    // DATA_SET.METADATA
                                </h3>

                                <div className="space-y-6 font-mono text-sm uppercase">
                                    <div>
                                        <div className="text-[10px] tracking-widest text-gray-500 mb-2">TECH_STACK</div>
                                        <div className="flex flex-wrap gap-2">
                                            {techStack.map(tech => (
                                                <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-blueprint-textDark dark:text-white border border-gray-200 dark:border-gray-700">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {project.development_time && (
                                        <div>
                                            <div className="text-[10px] tracking-widest text-gray-500 mb-1">DEV_TIME</div>
                                            <div className="font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{project.development_time}</div>
                                        </div>
                                    )}

                                    {project.client && (
                                        <div>
                                            <div className="text-[10px] tracking-widest text-gray-500 mb-1">CLIENT_ENTITÉ</div>
                                            <div className="font-bold">{project.client}</div>
                                        </div>
                                    )}

                                    <div>
                                        <div className="text-[10px] tracking-widest text-gray-500 mb-1">SYS_STATUS</div>
                                        <div className="flex items-center gap-2 font-bold text-green-600 dark:text-green-400">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            EN PRODUCTION
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </article>

            {/* Fullscreen Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button 
                            className="absolute top-6 right-6 text-white hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan z-[110]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </motion.button>
                        
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            src={selectedImage} 
                            alt="Project Fullscreen" 
                            className="max-w-full max-h-full object-contain border border-white/20"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

        </BlueprintLayout>
    );
}

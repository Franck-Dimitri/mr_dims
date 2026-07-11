import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';

export default function Show({ service }) {
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

    const techStack = typeof service.tech_stack === 'string' ? JSON.parse(service.tech_stack) : (service.tech_stack || []);

    return (
        <BlueprintLayout>
            <Head title={`${service.title} - Service Details`} />
            
            {/* Header Section */}
            <div className="relative pt-32 pb-8 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-blueprint-darkNight/50 backdrop-blur-md z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end">
                    <Link href="/services" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan uppercase transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        RETOUR AUX SERVICES
                    </Link>
                    
                    <div className="text-[10px] font-mono tracking-widest text-gray-400 uppercase text-right">
                        <div>REF: {service.ref_id || service.slug.substring(0, 8).toUpperCase()}</div>
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
                                <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white bg-blueprint-bluePrimary dark:bg-blueprint-cyan px-3 py-1 font-bold mb-6">
                                    [MOD_SERVICE]
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-6 text-blueprint-textDark dark:text-white leading-tight">
                                    {service.title}
                                </h1>
                                <p className="text-xl text-gray-500 font-mono leading-relaxed opacity-80 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan pl-6">
                                    {service.excerpt}
                                </p>
                            </motion.div>

                            {/* Content body */}
                            <motion.div variants={fadeInUp} className="prose prose-lg dark:prose-invert max-w-none font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:uppercase prose-a:text-blueprint-bluePrimary dark:prose-a:text-blueprint-cyan">
                                {service.description_markdown ? (
                                    <div dangerouslySetInnerHTML={{ __html: service.description_markdown }} />
                                ) : (
                                    <div className="border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center text-gray-500 font-mono text-sm uppercase">
                                        Spécifications détaillées en attente de rédaction.
                                    </div>
                                )}
                            </motion.div>
                        </div>

                        {/* Sidebar Specs */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* CTA Action */}
                            <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                                <Link href="/contact" className="w-full flex items-center justify-between px-6 py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold font-mono tracking-widest uppercase hover:opacity-90 transition-opacity">
                                    <span className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-white dark:bg-gray-900 animate-pulse"></div>
                                        DEMANDER UN DEVIS
                                    </span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </Link>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 relative">
                                {/* Corner crosshairs */}
                                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                                <h3 className="font-mono text-xs tracking-widest text-gray-400 uppercase mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                                    // SPÉCIFICATIONS TECHNIQUES
                                </h3>

                                <div className="space-y-6 font-mono text-sm uppercase">
                                    <div>
                                        <div className="text-[10px] tracking-widest text-gray-500 mb-2">STACK RECOMMANDÉE</div>
                                        <div className="flex flex-wrap gap-2">
                                            {techStack.length > 0 ? techStack.map(tech => (
                                                <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-blueprint-textDark dark:text-white border border-gray-200 dark:border-gray-700 text-[10px]">
                                                    {tech}
                                                </span>
                                            )) : (
                                                <span className="text-gray-400 text-xs">NON DÉFINIE</span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {service.base_price && (
                                        <div>
                                            <div className="text-[10px] tracking-widest text-gray-500 mb-1">BUDGET DE DÉPART EST.</div>
                                            <div className="font-bold text-lg text-blueprint-bluePrimary dark:text-blueprint-cyan">
                                                À partir de {Number(service.base_price).toLocaleString('fr-FR')} €
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <div className="text-[10px] tracking-widest text-gray-500 mb-1">DISPONIBILITÉ</div>
                                        <div className="flex items-center gap-2 font-bold text-green-600 dark:text-green-400">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                            SYSTÈME PRÊT
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </article>

        </BlueprintLayout>
    );
}

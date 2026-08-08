import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import { useLanguage } from '@/Context/LanguageContext';

export default function Services({ services }) {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };
    
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <BlueprintLayout>
            <Head title="Services - Implémentations Techniques" />

            <section className="relative pt-32 pb-16 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 z-10 font-sans">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-6 mb-6 font-mono text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-pulse"></div>
                                Offres d'Ingénierie
                            </div>
                            <div className="h-px bg-gray-300 dark:bg-gray-800 w-12"></div>
                            <div>
                                Statut: Disponible
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 font-sans">
                            <span className="block text-blueprint-textDark dark:text-white">Implémentations &</span>
                            <span className="block text-blueprint-bluePrimary dark:text-blueprint-cyan">Services</span>
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                            Je fournis des services d'ingénierie logicielle pour construire des produits digitaux performants, sécurisés et scalables.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 relative z-10 font-sans">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-8 lg:gap-12"
                    >
                        {services.map((service, idx) => (
                            <motion.div 
                                key={service.id || service.ref_id} 
                                variants={fadeInUp} 
                                className="group bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-8 lg:p-12 relative overflow-hidden transition-colors hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan flex flex-col rounded-2xl shadow-sm hover:shadow-md"
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-24 h-24 border-l border-b border-gray-100 dark:border-gray-800 opacity-50 group-hover:border-blueprint-bluePrimary/30 dark:group-hover:border-blueprint-cyan/30 transition-colors"></div>
                                
                                <div className="font-mono text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan mb-6 border-b border-gray-200 dark:border-gray-800 pb-2 inline-block">
                                    REF: {service.ref_id}
                                </div>
                                
                                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4 group-hover:text-blueprint-bluePrimary dark:group-hover:text-blueprint-cyan transition-colors">
                                    <Link href={`/services/${service.slug}`} className="hover:underline">
                                        {service.title}
                                    </Link>
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 opacity-90 h-auto sm:h-24 font-sans">
                                    {service.excerpt}
                                </p>
                                
                                <div className="mt-auto mb-6">
                                    <div className="text-xs font-semibold text-gray-500 mb-3">
                                        Technologies & Stack
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {(typeof service.tech_stack === 'string' ? JSON.parse(service.tech_stack) : service.tech_stack || []).map(t => (
                                            <span key={t} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 text-xs font-medium rounded-lg">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <Link href={`/services/${service.slug}`} className="text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan hover:underline flex items-center gap-1">
                                        Détails du service 
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="mt-16 text-center"
                    >
                        <motion.div variants={fadeInUp}>
                            <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs rounded-xl hover:scale-105 transition-transform shadow-lg">
                                Demander un Devis
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

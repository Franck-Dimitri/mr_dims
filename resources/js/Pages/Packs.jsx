import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';

export default function Packs() {
    return (
        <BlueprintLayout>
            <Head title="Packs - Coming Soon" />
            
            <div className="flex flex-col items-center justify-center min-h-[80vh] relative z-10 px-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="border border-blueprint-bluePrimary/30 dark:border-blueprint-cyan/30 bg-white/80 dark:bg-[#0B0F19]/80 backdrop-blur-md p-12 lg:p-24 max-w-3xl w-full text-center relative overflow-hidden"
                >
                    {/* Corner Crosshairs */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

                    {/* Animated Pulse */}
                    <div className="absolute top-8 right-8 flex items-center gap-2 font-mono text-[10px] tracking-widest text-yellow-600 dark:text-yellow-400 uppercase">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-ping"></div>
                        BUILDING
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <svg className="w-16 h-16 mx-auto mb-6 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>

                        <div className="font-mono text-xs tracking-widest text-gray-500 uppercase mb-4">
                            MODULE: PACKS_PRÉCONFIGURÉS
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6 text-blueprint-textDark dark:text-white">
                            EN COURS DE <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">DÉPLOIEMENT</span>
                        </h1>

                        <p className="font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-10 border-l-2 border-yellow-500 pl-4 text-left">
                            Les packs de services pré-configurés (Starter, E-Commerce, SaaS MVP) sont actuellement en cours d'assemblage dans notre environnement de staging. 
                            <br/><br/>
                            Veuillez patienter pendant la compilation finale.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/contact" className="px-8 py-3 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                <span className="mr-1">{'>_'}</span> DEMANDER UN DEVIS
                            </Link>
                            <Link href="/" className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-blueprint-textDark dark:text-white font-bold font-mono text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center">
                                RETOUR À LA BASE
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </BlueprintLayout>
    );
}

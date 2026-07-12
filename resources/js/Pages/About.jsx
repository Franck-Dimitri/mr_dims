import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import SEO from '@/Components/SEO';

export default function About() {
    const [terminalText, setTerminalText] = useState('');
    const fullText = `>_ INITIALIZING SYS_PROFILE...
>_ AUTH_LEVEL: ROOT
>_ LOADING MODULES: [ REACT, LARAVEL, TAILWIND, ARCHITECTURE ]
>_ SYS_STATUS: ONLINE

[NOM]: Franck Dimitri (Mr Dim's)
[ROLE]: Ingénieur Logiciel & Architecte Full Stack
[BASE]: Yaoundé, Cameroun

/* 
 * Développeur passionné par la création d'architectures robustes.
 * Je construis des systèmes scalables et des interfaces immersives.
 * L'optimisation, la sécurité et le design sont au cœur de mon workflow.
 */

>_ AWAITING INSTRUCTIONS...`;

    useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < fullText.length) {
                setTerminalText(fullText.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30); // Vitesse de frappe

        return () => clearInterval(typingInterval);
    }, []);

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
            <SEO title="À Propos - SYS_PROFILE" description="Découvrez mon parcours, mes compétences et ma vision en tant qu'Architecte Logiciel & Full Stack Dev." />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-16 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text Content */}
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="flex items-center gap-6 mb-8 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 border border-blueprint-bluePrimary dark:border-blueprint-cyan flex items-center justify-center">
                                        <div className="w-1 h-1 bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-ping"></div>
                                    </div>
                                    WORKSPACE: SYS_PROFILE
                                </div>
                                <div className="h-px bg-gray-300 dark:bg-gray-800 w-12"></div>
                                <div>ID: MR_DIMS</div>
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tighter mb-6 uppercase">
                                <span className="block text-blueprint-textDark dark:text-white">FRANCK</span>
                                <span className="block text-blueprint-bluePrimary dark:text-blueprint-cyan">DIMITRI</span>
                            </motion.h1>

                            <motion.h2 variants={fadeInUp} className="text-xl md:text-2xl font-mono text-gray-500 uppercase tracking-widest mb-8 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan pl-4">
                                // ARCHITECTE LOGICIEL & FULL STACK DEV
                            </motion.h2>

                            <motion.p variants={fadeInUp} className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl font-mono opacity-80">
                                Mon objectif est de transformer la complexité technique en solutions élégantes, performantes et évolutives. Chaque ligne de code est une brique de l'architecture finale.
                            </motion.p>
                        </motion.div>

                        {/* Right: Photo Placeholder */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex justify-center relative"
                        >
                            <div className="relative w-[350px] md:w-[450px] aspect-square bg-gray-100 dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden group">
                                {/* Structural Accents */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan -translate-x-px -translate-y-px"></div>
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan translate-x-px -translate-y-px"></div>
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan -translate-x-px translate-y-px"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan translate-x-px translate-y-px"></div>
                                
                                {/* Photo (REPLACE SRC WITH YOUR ACTUAL IMAGE PATH, ex: /images/profile.jpg) */}
                                {/* <img src="/path/to/your/photo.jpg" alt="Franck Dimitri" className="w-full h-full object-cover relative z-10" /> */}
                                
                                {/* Placeholder Content (Remove when photo is added) */}
                                <div className="text-center relative z-0 flex flex-col items-center">
                                    <svg className="w-16 h-16 text-gray-300 dark:text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="font-mono text-xs tracking-widest uppercase text-gray-400">
                                        [ INSERER PHOTO.JPG ]
                                    </span>
                                </div>
                                
                                {/* Floating Overlay Tech Text */}
                                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur px-3 py-1 font-mono text-[10px] tracking-widest text-blueprint-textDark dark:text-white border border-gray-200 dark:border-gray-800 z-20 shadow-lg">
                                    VIEWPORT_RENDER: <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">ACTIVE</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- MINIMAL TERMINAL SECTION --- */}
            <section className="py-24 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#0D1117] border border-gray-800 rounded-md overflow-hidden shadow-2xl"
                    >
                        {/* Terminal Header */}
                        <div className="bg-[#161B22] border-b border-gray-800 px-4 py-3 flex items-center gap-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <div className="font-mono text-[10px] tracking-widest text-gray-500 flex-1 text-center">
                                root@dim-system:~
                            </div>
                        </div>
                        {/* Terminal Body */}
                        <div className="p-6 md:p-8 font-mono text-sm leading-relaxed text-[#33FF00]">
                            <pre className="whitespace-pre-wrap font-mono">
                                {terminalText}
                                <motion.span 
                                    animate={{ opacity: [1, 0] }} 
                                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                    className="inline-block w-2.5 h-4 bg-[#33FF00] ml-1 align-middle"
                                />
                            </pre>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- ARCHITECTURAL SKILLS GRID --- */}
            <section className="py-24 border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-white/50 dark:bg-[#070A10]/50 backdrop-blur-md relative z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.h3 variants={fadeInUp} className="font-mono text-xs tracking-widest text-gray-500 uppercase mb-12 flex items-center gap-4">
                            <span className="w-12 h-px bg-gray-300 dark:bg-gray-800"></span>
                            COMPOSANTS TECHNIQUES (STACK)
                            <span className="flex-1 h-px bg-gray-300 dark:bg-gray-800"></span>
                        </motion.h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Skill Module 1 */}
                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 group hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <h4 className="font-bold text-xl uppercase tracking-tighter">BACKEND & API</h4>
                                    <span className="font-mono text-[10px] text-gray-400">MOD_01</span>
                                </div>
                                <div className="space-y-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="uppercase text-blueprint-textDark dark:text-white">PHP / Laravel</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">95%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="uppercase text-blueprint-textDark dark:text-white">Node.js</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">80%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="uppercase text-blueprint-textDark dark:text-white">MySQL / PostgreSQL</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">90%</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Skill Module 2 */}
                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 group hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors relative overflow-hidden">
                                <div className="absolute top-4 right-4 text-blueprint-bluePrimary dark:text-blueprint-cyan opacity-10 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                </div>
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <h4 className="font-bold text-xl uppercase tracking-tighter">FRONTEND & UI</h4>
                                    <span className="font-mono text-[10px] text-gray-400">MOD_02</span>
                                </div>
                                <div className="space-y-4 font-mono text-sm text-gray-600 dark:text-gray-400 relative z-10">
                                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="uppercase text-blueprint-textDark dark:text-white">React.js / Next.js</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">90%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="uppercase text-blueprint-textDark dark:text-white">Tailwind CSS</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">95%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="uppercase text-blueprint-textDark dark:text-white">Framer Motion</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">85%</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Skill Module 3 */}
                            <motion.div variants={fadeInUp} className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] p-8 group hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors">
                                <div className="flex justify-between items-start mb-6">
                                    <h4 className="font-bold text-xl uppercase tracking-tighter">INFRASTRUCTURE</h4>
                                    <span className="font-mono text-[10px] text-gray-400">MOD_03</span>
                                </div>
                                <div className="space-y-4 font-mono text-sm text-gray-600 dark:text-gray-400">
                                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="uppercase text-blueprint-textDark dark:text-white">Git / CI/CD</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">90%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="uppercase text-blueprint-textDark dark:text-white">Docker (Bases)</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">70%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                                        <span className="uppercase text-blueprint-textDark dark:text-white">Linux Server Admin</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">80%</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

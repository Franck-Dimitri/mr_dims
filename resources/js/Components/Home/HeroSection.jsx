import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function HeroSection({ fadeInUp, staggerContainer }) {
    return (
        <section className="relative pt-24 pb-32 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 overflow-hidden">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-12">
                            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-500 dark:text-gray-400">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                SYS_STATUS: ONLINE
                            </div>
                            <div className="h-px bg-gray-300 dark:bg-gray-800 flex-1"></div>
                            <div className="font-mono text-xs tracking-widest text-gray-500 dark:text-gray-400">
                                V2.0.4
                            </div>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold leading-none tracking-tighter mb-4">
                            <span className="block text-blueprint-textDark dark:text-white">INGÉNIERIE</span>
                            <span className="block text-blueprint-bluePrimary dark:text-blueprint-cyan">LOGICIELLE</span>
                        </motion.h1>

                        <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-8">
                            <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold">{'>'}</span>
                            <span className="font-mono text-sm tracking-widest text-gray-600 dark:text-gray-300 uppercase">
                                INGÉNIEUR FULL STACK
                            </span>
                        </motion.div>

                        <motion.p variants={fadeInUp} className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mb-12 font-mono uppercase tracking-wide opacity-80">
                            // ARCHITECTURE SYSTÈME ET DÉVELOPPEMENT LOGICIEL.<br/>
                            JE TRANSFORME DES CONCEPTS COMPLEXES EN APPLICATIONS WEB SCALABLES ET PERFORMANTES.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                            <Link 
                                href="/projects" 
                                className="px-8 py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                EXPLORER LE CODE
                            </Link>
                            <a 
                                href="#contact" 
                                className="px-8 py-4 border-2 border-[#1A1A1A] dark:border-gray-700 text-blueprint-textDark dark:text-white font-bold text-sm tracking-widest uppercase hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                            >
                                <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan mr-2">{'>_'}</span> INITIER UN PROJET
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Technical Graphic / Code Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-6 rounded-lg shadow-xl font-mono text-xs relative"
                    >
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                            <span className="text-gray-400">architecture.config.js</span>
                        </div>
                        <pre className="text-gray-700 dark:text-gray-300 leading-relaxed overflow-x-auto">
                            <code>{`const developer = {
    name: "MR DIM'S",
    role: "Full Stack Engineer",
    stack: ["Laravel 13", "React 18", "Inertia 2", "TailwindCSS"],
    architecture: ["Clean Code", "SOLID", "Microservices", "REST API"],
    status: "Available for High-Impact Projects",
    location: "Global / Remote",
};`}</code>
                        </pre>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

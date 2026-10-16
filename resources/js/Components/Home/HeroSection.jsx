import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import MoltenMetal from '@/Components/ui/MoltenMetal';

// Typing component for continuous typing effect of "Mr Dim's Dev"
function ContinuousTypingTitle() {
    const textToType = "Mr Dim's Dev";
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        let timer;
        const speed = isDeleting ? 60 : 110;

        if (!isDeleting && displayedText === textToType) {
            timer = setTimeout(() => setIsDeleting(true), 2200);
        } else if (isDeleting && displayedText === '') {
            timer = setTimeout(() => setIsDeleting(false), 400);
        } else {
            timer = setTimeout(() => {
                setDisplayedText(
                    isDeleting
                        ? textToType.substring(0, displayedText.length - 1)
                        : textToType.substring(0, displayedText.length + 1)
                );
            }, speed);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting]);

    return (
        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan inline-flex items-center">
            {displayedText}
            <span className="animate-pulse ml-1 text-blueprint-bluePrimary dark:text-blueprint-cyan">|</span>
        </span>
    );
}

export default function HeroSection({ fadeInUp, staggerContainer, onOpenCv }) {
    const defaultFadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const defaultStaggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const activeFadeInUp = fadeInUp || defaultFadeInUp;
    const activeStaggerContainer = staggerContainer || defaultStaggerContainer;

    return (
        <section className="relative pt-24 pb-28 md:pt-32 md:pb-36 border-b border-blueprint-bluePrimary/30 dark:border-blueprint-cyan/30 overflow-hidden font-sans bg-blueprint-white dark:bg-[#070A10]">
            
            {/* Ambient MoltenMetal WebGL Background Layer */}
            <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-25 z-0">
                <MoltenMetal
                    color1="#2563EB"
                    color2="#06b6d4"
                    color3="#60a5fa"
                    speed={0.2}
                    scale={3}
                    detail={3}
                    glow={1.2}
                    coreSize={0.06}
                    swirl={0.6}
                    fold={-0.1}
                    blackPoint={0.1}
                    brightness={1.1}
                    colorMode="molten"
                    grain={true}
                    grainIntensity={0.03}
                    mouseInteraction={true}
                    mouseStrength={0.2}
                    opacity={0.7}
                />
            </div>

            {/* Architectural Blueprint Grid */}
            <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none z-0"></div>

            {/* Blueprint Grid Axis Markings */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
                <div className="absolute top-12 left-0 right-0 h-px bg-blueprint-bluePrimary/20 dark:bg-blueprint-cyan/20 flex justify-between px-8 text-[9px] font-mono text-blueprint-bluePrimary/60 dark:text-blueprint-cyan/60">
                    <span>AXIS_X // 00.00</span>
                    <span>PROFIL_INGENIEUR_LOGICIEL</span>
                    <span>AXIS_X // 99.99</span>
                </div>
                <div className="absolute top-0 bottom-0 left-12 w-px bg-blueprint-bluePrimary/20 dark:bg-blueprint-cyan/20 hidden md:block"></div>
                <div className="absolute top-0 bottom-0 right-12 w-px bg-blueprint-bluePrimary/20 dark:bg-blueprint-cyan/20 hidden md:block"></div>

                <div className="absolute top-4 left-4 text-blueprint-bluePrimary/40 dark:text-blueprint-cyan/40 font-mono text-xs">+</div>
                <div className="absolute top-4 right-4 text-blueprint-bluePrimary/40 dark:text-blueprint-cyan/40 font-mono text-xs">+</div>
                <div className="absolute bottom-4 left-4 text-blueprint-bluePrimary/40 dark:text-blueprint-cyan/40 font-mono text-xs">+</div>
                <div className="absolute bottom-4 right-4 text-blueprint-bluePrimary/40 dark:text-blueprint-cyan/40 font-mono text-xs">+</div>
            </div>

            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Architectural Blueprint Status Header */}
                <div className="flex items-center justify-between font-mono text-[10px] text-gray-500 dark:text-gray-400 mb-8 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 pb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 border border-blueprint-bluePrimary dark:border-blueprint-cyan flex items-center justify-center">
                            <div className="w-1 h-1 bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-ping"></div>
                        </div>
                        <span className="font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">PROFIL: EN LIGNE</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-6">
                        <span>SPÉCIALITÉ: GENIE LOGICIEL & FULL STACK</span>
                        <span>LOCALISATION: YAOUNDÉ, CAMEROUN</span>
                        <span className="text-green-500 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            DISPONIBLE
                        </span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* Left Column: Personal Presentation */}
                    <motion.div 
                        initial="hidden" 
                        animate="visible"
                        variants={activeStaggerContainer}
                        className="lg:col-span-7"
                    >
                        {/* Identity Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blueprint-bluePrimary/5 dark:bg-blueprint-cyan/5 border border-blueprint-bluePrimary/30 dark:border-blueprint-cyan/30 text-xs font-mono text-blueprint-bluePrimary dark:text-blueprint-cyan mb-6">
                            <span className="font-bold">{'>_'} KOUONGME MBOUOM FRANCK DIMITRI</span>
                        </div>

                        {/* Strict Single-Line Title */}
                        <motion.h1 
                            variants={activeFadeInUp} 
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-blueprint-textDark dark:text-white leading-tight mb-4 font-sans flex items-center gap-x-2 sm:gap-x-3 whitespace-nowrap overflow-hidden"
                        >
                            <span className="shrink-0">Franck Dimitri</span>
                            <span className="text-gray-400 font-light shrink-0">—</span>
                            <ContinuousTypingTitle />
                        </motion.h1>

                        {/* Professional Roles & Titles */}
                        <motion.div variants={activeFadeInUp} className="flex flex-wrap items-center gap-2.5 mb-5 font-sans text-xs sm:text-sm text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold">
                            <span className="bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 px-3 py-1 border border-blueprint-bluePrimary/30 dark:border-blueprint-cyan/30 rounded-lg">
                                Ingénieur Informaticien — Génie Logiciel
                            </span>
                            <span className="text-gray-400 font-normal hidden sm:inline">•</span>
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">
                                Architecte Solutions & Développeur Full Stack
                            </span>
                        </motion.div>

                        {/* Business Value Proposition */}
                        <motion.p variants={activeFadeInUp} className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mb-5 font-sans">
                            J'accompagne les entreprises et entrepreneurs dans la conception de <strong>solutions logicielles et systèmes digitaux sur-mesure</strong>, fiables et générateurs de valeur — des plateformes web performantes aux architectures microservices & intégrations IA.
                        </motion.p>

                        {/* Offre d'entrée : Cadrage technique offert */}
                        <motion.div variants={activeFadeInUp} className="mb-6 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-700 dark:text-emerald-400 font-sans">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                            <span><strong>Échange direct offert (20 min)</strong> : cadrage de votre besoin, faisabilité et estimation sans engagement.</span>
                        </motion.div>

                        {/* Specializations Tags */}
                        <motion.div variants={activeFadeInUp} className="flex flex-wrap gap-2 mb-8 text-[11px] font-sans opacity-70 hover:opacity-100 transition-opacity">
                            <span className="px-2.5 py-1 bg-gray-100/60 dark:bg-gray-900/60 backdrop-blur-sm text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-800/60 rounded-md">
                                Applications & SaaS Web
                            </span>
                            <span className="px-2.5 py-1 bg-gray-100/60 dark:bg-gray-900/60 backdrop-blur-sm text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-800/60 rounded-md">
                                Architectures & Microservices
                            </span>
                            <span className="px-2.5 py-1 bg-gray-100/60 dark:bg-gray-900/60 backdrop-blur-sm text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-800/60 rounded-md">
                                Intégrations IA & Automatisation
                            </span>
                            <span className="px-2.5 py-1 bg-gray-100/60 dark:bg-gray-900/60 backdrop-blur-sm text-gray-600 dark:text-gray-300 border border-gray-200/60 dark:border-gray-800/60 rounded-md">
                                Sécurité, APIs & Déploiement VPS
                            </span>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={activeFadeInUp} className="flex flex-wrap items-center gap-3.5 mb-10 font-sans">
                            <a 
                                href="https://wa.me/237676383986?text=Bonjour%20Franck,%20j%27ai%20d%C3%A9couvert%20votre%20portfolio%20et%20j%27aimerais%20%C3%A9changer%20avec%20vous%20sur%20un%20projet." 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide rounded-xl transition-all flex items-center gap-2 shadow-md hover:shadow-emerald-600/20"
                            >
                                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                <span>Discuter sur WhatsApp</span>
                            </a>

                            <Link 
                                href="/projects" 
                                className="px-6 py-3.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs sm:text-sm tracking-wide rounded-xl transition-all flex items-center gap-2 shadow-md hover:opacity-90 border border-blueprint-bluePrimary dark:border-blueprint-cyan"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                <span>Voir mes projets</span>
                            </Link>

                            <a 
                                href="/contact" 
                                className="px-6 py-3.5 border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-[#0B0F19]/80 text-blueprint-textDark dark:text-white font-bold text-xs sm:text-sm tracking-wide rounded-xl transition-all flex items-center gap-2 hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan"
                            >
                                <span>Devis & Contact</span>
                            </a>

                            {onOpenCv && (
                                <button
                                    onClick={onOpenCv}
                                    type="button"
                                    className="px-5 py-3.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white font-semibold text-xs sm:text-sm tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>CV</span>
                                </button>
                            )}
                        </motion.div>

                        {/* Engineering Specs */}
                        <motion.div variants={activeFadeInUp} className="pt-6 border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 grid grid-cols-3 gap-4 max-w-xl font-mono text-xs">
                            <div>
                                <div className="text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold text-base font-sans">5+ Ans</div>
                                <div className="text-gray-500 text-[10px]">EXPERIENCE_DEV</div>
                            </div>
                            <div>
                                <div className="text-blueprint-textDark dark:text-white font-bold text-base font-sans">Génie Logiciel</div>
                                <div className="text-gray-500 text-[10px]">DIPLÔME_INGÉNIEUR</div>
                            </div>
                            <div>
                                <div className="text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold text-base font-sans">100%</div>
                                <div className="text-gray-500 text-[10px]">CODE_SUR_MESURE</div>
                            </div>
                        </motion.div>

                    </motion.div>

                    {/* Right Column: Blueprint Profile Photo Frame */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, x: 30 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-5 flex justify-center relative font-sans"
                    >
                        {/* Blueprint Corner Accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan -translate-x-4 -translate-y-4"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan translate-x-4 -translate-y-4"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan -translate-x-4 translate-y-4"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan translate-x-4 translate-y-4"></div>
                        
                        <div className="relative w-full max-w-[420px] aspect-square bg-white dark:bg-[#0B0F19] border-2 border-blueprint-bluePrimary/40 dark:border-blueprint-cyan/40 shadow-2xl flex items-center justify-center overflow-hidden group rounded-2xl">
                            <motion.div 
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="w-full h-full flex items-center justify-center relative"
                            >
                                <img 
                                    src="/profile.jpg" 
                                    alt="Kouongme Mbouom Franck Dimitri - Mr Dim's" 
                                    className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full items-center justify-center bg-[#0B0F19] text-gray-400 text-xs font-mono font-bold z-0" style={{ display: 'none' }}>
                                    [ PHOTO_PROFIL_OFFICIELLE ]
                                </div>
                            </motion.div>

                            {/* Floating Blueprint Badge 1 */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md border border-blueprint-bluePrimary/40 dark:border-blueprint-cyan/40 px-3 py-1.5 font-mono text-[10px] text-white rounded-lg shadow-lg flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-ping"></div>
                                <span>MR DIMS // GENIE LOGICIEL</span>
                            </motion.div>

                            {/* Floating Blueprint Badge 2 */}
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur-md border border-blueprint-cyan/40 px-4 py-2 font-mono text-xs text-white rounded-lg shadow-lg"
                            >
                                <span className="text-blueprint-cyan font-bold block">STACK :</span>
                                Laravel • React • Inertia • Tailwind
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import ConstructionBackground from '@/Components/ConstructionBackground';
import CursorFollower from '@/Components/ui/cursor-follower';
import { useLanguage } from '@/Context/LanguageContext';
import FloatingWhatsApp from '@/Components/FloatingWhatsApp';

export default function BlueprintLayout({ children }) {
    const { url } = usePage();
    const [theme, setTheme] = useState('system');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showCookieBanner, setShowCookieBanner] = useState(false);
    const { lang, changeLanguage, t } = useLanguage() || { lang: 'fr', changeLanguage: () => {}, t: (k) => k };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
        const cookieConsent = localStorage.getItem('cookie_consent');
        if (!cookieConsent) {
            setShowCookieBanner(true);
        }
    }, []);

    const handleCookieConsent = (accepted) => {
        localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'declined');
        setShowCookieBanner(false);
    };

    const applyTheme = (newTheme) => {
        setTheme(newTheme);
        if (newTheme === 'system') {
            localStorage.removeItem('theme');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else {
            localStorage.setItem('theme', newTheme);
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    const navLinks = [
        { name: t('nav_projects') || 'Projets', href: '/projects' },
        { name: t('nav_about') || 'À propos', href: '/about' },
        { name: t('nav_blog') || 'Blog', href: '/blog' },
        { name: t('nav_contact') || 'Contact', href: '/contact', isButton: true },
    ];

    const isActive = (href) => {
        if (href === '/' && url === '/') return true;
        if (href !== '/' && url.startsWith(href)) return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-blueprint-white dark:bg-blueprint-darkNight text-blueprint-textDark dark:text-blueprint-textLight font-sans transition-colors duration-300 flex flex-col relative">
            {/* Global Architectural Background */}
            <ConstructionBackground />
            <CursorFollower />
            
            {/* Architectural Header Navbar - Strictly Square (rounded-none) */}
            <header className="sticky top-0 w-full z-50 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-[#070A10]/80 backdrop-blur-md font-sans">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        
                        {/* Architectural Logo with Blueprint Accent */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2.5 group font-sans">
                                <span className="w-2.5 h-2.5 bg-cyan-500 rounded-none shadow-[0_0_10px_rgba(6,182,212,0.6)]"></span>
                                <span className="font-bold text-base sm:text-lg tracking-wider text-neutral-900 dark:text-white uppercase">
                                    Mr Dim's
                                </span>
                            </Link>
                        </div>

                        {/* Architectural Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8 font-sans">
                            {navLinks.map((link) => (
                                !link.isButton && (
                                    <Link 
                                        key={link.name} 
                                        href={link.href} 
                                        className={`text-xs font-semibold tracking-wider transition-colors relative py-2 uppercase ${
                                            isActive(link.href) 
                                                ? 'text-cyan-500 dark:text-cyan-400 font-bold' 
                                                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                        {isActive(link.href) && (
                                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-500 rounded-none" />
                                        )}
                                    </Link>
                                )
                            ))}
                        </nav>

                        {/* Right Toolbar: Contact Button, Language & Theme Switchers */}
                        <div className="flex items-center gap-3 font-sans text-xs">
                            
                            {/* Sharp Square Contact CTA */}
                            <Link 
                                href="/contact" 
                                className="hidden sm:inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:border-cyan-500 dark:hover:border-cyan-400 hover:text-cyan-500 font-semibold text-xs rounded-none transition-all uppercase tracking-wider"
                            >
                                Contact
                            </Link>

                            {/* Language Switcher - Square */}
                            <div className="hidden sm:flex items-center border border-neutral-200 dark:border-neutral-800 rounded-none px-1 py-1 text-[11px] font-bold font-sans">
                                <button 
                                    onClick={() => changeLanguage('fr')} 
                                    className={`px-2 py-0.5 rounded-none transition-colors ${lang === 'fr' ? 'bg-cyan-600 text-white dark:text-gray-900' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                                >
                                    FR
                                </button>
                                <button 
                                    onClick={() => changeLanguage('en')} 
                                    className={`px-2 py-0.5 rounded-none transition-colors ${lang === 'en' ? 'bg-cyan-600 text-white dark:text-gray-900' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
                                >
                                    EN
                                </button>
                            </div>

                            {/* Theme Switcher Button - Square */}
                            <button 
                                onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="flex items-center justify-center w-8 h-8 rounded-none border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-cyan-500 transition-colors bg-white/50 dark:bg-neutral-900/50"
                                title="Basculer le thème"
                            >
                                {theme === 'dark' ? (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            {/* Mobile Hamburger Toggle */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-neutral-600 dark:text-neutral-300 hover:text-cyan-500"
                                aria-label="Menu"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Drawer */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white/95 dark:bg-[#070A10]/95 backdrop-blur-md border-b border-neutral-200/80 dark:border-neutral-800/80 z-50 py-4 font-sans rounded-none"
                        >
                            <div className="flex flex-col px-4 space-y-2 max-w-6xl mx-auto">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.name}
                                        href={link.href}
                                        className={`px-4 py-2.5 text-xs font-semibold rounded-none transition-colors uppercase tracking-wider ${
                                            isActive(link.href) 
                                                ? 'text-cyan-500 bg-neutral-100 dark:bg-neutral-900 font-bold' 
                                                : 'text-neutral-600 dark:text-neutral-300 hover:text-cyan-500'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                
                                <div className="pt-4 mt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                                    <div className="flex border border-neutral-200 dark:border-neutral-800 rounded-none px-1 py-0.5 text-xs font-semibold">
                                        <button onClick={() => changeLanguage('fr')} className={`px-3 py-1 rounded-none ${lang === 'fr' ? 'bg-cyan-600 text-white dark:text-gray-900 font-bold' : 'text-neutral-500'}`}>FR</button>
                                        <button onClick={() => changeLanguage('en')} className={`px-3 py-1 rounded-none ${lang === 'en' ? 'bg-cyan-600 text-white dark:text-gray-900 font-bold' : 'text-neutral-500'}`}>EN</button>
                                    </div>
                                    <Link 
                                        href="/contact" 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-xs rounded-none uppercase"
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-grow w-full overflow-hidden font-sans">
                {children}
            </main>
            
            {/* Footer Exactement comme Barthel (Nwabo Franck) - Style Architectural Encadré avec 4 Coins + */}
            <footer className="relative bg-white dark:bg-[#070A11] text-neutral-900 dark:text-neutral-100 font-sans z-10 py-12 sm:py-16 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    
                    {/* CADRE ARCHITECTURAL AVEC 4 COINS + (Exactement comme la capture de Barthel) */}
                    <div className="relative border border-neutral-200 dark:border-neutral-800 p-8 sm:p-12 md:p-14 bg-white dark:bg-[#070A11]">
                        
                        {/* 4 COINS ARCHITECTURAUX AVEC + */}
                        <span className="absolute -top-2.5 -left-2 text-sm font-mono font-bold text-neutral-900 dark:text-white select-none z-20">+</span>
                        <span className="absolute -top-2.5 -right-2 text-sm font-mono font-bold text-neutral-900 dark:text-white select-none z-20">+</span>
                        <span className="absolute -bottom-2.5 -left-2 text-sm font-mono font-bold text-neutral-900 dark:text-white select-none z-20">+</span>
                        <span className="absolute -bottom-2.5 -right-2 text-sm font-mono font-bold text-neutral-900 dark:text-white select-none z-20">+</span>

                        {/* Grille principale en 3 colonnes comme sur la capture */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start mb-10 relative z-10">
                            
                            {/* Colonne 1 (Gauche) : Logo Stylisé, Bio et Boutons Sociaux Carrés (GitHub, X, Instagram, Facebook, Mail) */}
                            <div className="md:col-span-5 space-y-4">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-5 h-5 bg-neutral-900 dark:bg-white flex items-center justify-center relative rounded-none">
                                        <span className="w-2 h-2 bg-cyan-500 absolute -bottom-0.5 -right-0.5"></span>
                                    </div>
                                    <h3 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white uppercase font-sans">
                                        Mr Dim's Dev
                                    </h3>
                                </div>
                                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm font-sans">
                                    Développeur Full-Stack spécialisé en Laravel, React et TypeScript. Je conçois des interfaces modernes et des applications web utiles, rapides et maintenables.
                                </p>

                                {/* Boutons Sociaux en Carrés Épurés : GitHub, X, Instagram, Facebook, Mail */}
                                <div className="flex flex-wrap items-center gap-2 pt-2">
                                    <a 
                                        href="https://github.com/Franck-Dimitri" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 hover:text-cyan-500 text-neutral-700 dark:text-neutral-300 flex items-center justify-center rounded-none transition-colors"
                                        title="GitHub"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    </a>
                                    <a 
                                        href="https://x.com/mrdimsdev?s=11" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 hover:text-cyan-500 text-neutral-700 dark:text-neutral-300 flex items-center justify-center rounded-none transition-colors"
                                        title="X (Twitter)"
                                    >
                                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </a>
                                    <a 
                                        href="https://www.instagram.com/mrdimsdev?stkn=bGlndjk5enFyYm8%3D&utm_source=qr" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 hover:text-cyan-500 text-neutral-700 dark:text-neutral-300 flex items-center justify-center rounded-none transition-colors"
                                        title="Instagram"
                                    >
                                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    </a>
                                    <a 
                                        href="https://www.facebook.com/share/19szWdHnMt/?mibextid=wwXIfr" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 hover:text-cyan-500 text-neutral-700 dark:text-neutral-300 flex items-center justify-center rounded-none transition-colors"
                                        title="Facebook"
                                    >
                                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </a>
                                    <a 
                                        href="mailto:contact@mrdims.dev" 
                                        className="w-9 h-9 border border-neutral-300 dark:border-neutral-700 hover:border-cyan-500 hover:text-cyan-500 text-neutral-700 dark:text-neutral-300 flex items-center justify-center rounded-none transition-colors"
                                        title="Email"
                                    >
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                                    </a>
                                </div>
                            </div>

                            {/* Colonne 2 (Centre) : NAVIGATION */}
                            <div className="md:col-span-3 space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white font-mono">
                                    NAVIGATION
                                </h4>
                                <ul className="space-y-2 text-xs sm:text-sm">
                                    <li>
                                        <Link href="/about" className="text-neutral-500 dark:text-neutral-400 hover:text-cyan-500 transition-colors">
                                            À propos
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="/#stack" className="text-neutral-500 dark:text-neutral-400 hover:text-cyan-500 transition-colors">
                                            Stack
                                        </a>
                                    </li>
                                    <li>
                                        <Link href="/projects" className="text-neutral-500 dark:text-neutral-400 hover:text-cyan-500 transition-colors">
                                            Projets
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/blog" className="text-neutral-500 dark:text-neutral-400 hover:text-cyan-500 transition-colors">
                                            Processus
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-neutral-500 dark:text-neutral-400 hover:text-cyan-500 transition-colors">
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Colonne 3 (Droite) : DISPONIBILITE */}
                            <div className="md:col-span-4 space-y-3">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white font-mono">
                                    DISPONIBILITE
                                </h4>
                                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs font-sans">
                                    Ouvert aux missions freelance, collaborations et opportunités produit.
                                </p>
                                <div className="pt-2">
                                    <Link 
                                        href="/contact" 
                                        className="inline-flex items-center px-5 py-2.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-transparent hover:border-cyan-500 text-neutral-800 dark:text-neutral-200 hover:text-cyan-500 font-semibold text-xs rounded-none transition-colors uppercase tracking-wider"
                                    >
                                        Me contacter
                                    </Link>
                                </div>
                            </div>

                        </div>

                        {/* TEXTE GÉANT EN FILIGRANE (Exactement comme BARTHEL en fond) */}
                        <div className="py-6 sm:py-8 select-none overflow-hidden text-center pointer-events-none">
                            <span className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tight text-neutral-900/[0.05] dark:text-white/[0.04] uppercase font-sans leading-none block">
                                MR DIM'S
                            </span>
                        </div>

                        {/* Ligne inférieure de Copyright & Hébergement */}
                        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                            <p>© {new Date().getFullYear()} Mr Dim's Dev. Tous droits réservés.</p>
                            <div className="flex items-center gap-1 hover:text-cyan-500 transition-colors">
                                <span>Déployé sur VPS Linux</span>
                                <span>↗</span>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>

            {/* Bouton d'action direct WhatsApp */}
            <FloatingWhatsApp />

            {/* Cookie Consent Banner - Carré Architectural (rounded-none) */}
            <AnimatePresence>
                {showCookieBanner && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] bg-white/95 dark:bg-[#0A0E17]/95 border border-neutral-300 dark:border-neutral-800 p-5 rounded-none shadow-2xl backdrop-blur-md font-sans relative"
                    >
                        {/* Coins carrés avec + */}
                        <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                        <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                        <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                        <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>

                        <div className="flex gap-4">
                            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-none h-fit">
                                <svg className="w-5 h-5 text-cyan-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
                                    <path d="M8.5 8.5v.01" />
                                    <path d="M16 15.5v.01" />
                                    <path d="M12 12v.01" />
                                    <path d="M11 17v.01" />
                                    <path d="M7 14v.01" />
                                </svg>
                            </div>
                            <div className="flex-grow">
                                <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-1 font-mono">
                                    {lang === 'en' ? 'Cookies & Privacy' : 'Cookies & Confidentialité'}
                                </h4>
                                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                                    {lang === 'en' 
                                        ? 'We use cookies to analyze traffic and enhance your browsing experience.' 
                                        : "J'utilise des cookies essentiels pour analyser les visites et améliorer votre expérience."}
                                </p>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleCookieConsent(true)}
                                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-[10px] uppercase tracking-wider rounded-none transition-colors"
                                    >
                                        {lang === 'en' ? 'Accept' : 'Accepter'}
                                    </button>
                                    <button
                                        onClick={() => handleCookieConsent(false)}
                                        className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white font-mono font-bold text-[10px] uppercase tracking-wider transition-colors"
                                    >
                                        {lang === 'en' ? 'Decline' : 'Refuser'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

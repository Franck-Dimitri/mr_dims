import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import ConstructionBackground from '@/Components/ConstructionBackground';
import TechCursor from '@/Components/ui/tech-curosr';
import { useLanguage } from '@/Context/LanguageContext';

export default function BlueprintLayout({ children }) {
    const { url } = usePage();
    const [theme, setTheme] = useState('system');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { lang, changeLanguage, t } = useLanguage() || { lang: 'fr', changeLanguage: () => {}, t: (k) => k };

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

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
        { name: t('nav_home') || 'Accueil', href: '/' },
        { name: t('nav_projects') || 'Projets', href: '/projects' },
        { name: t('nav_about') || 'À propos', href: '/about' },
        { name: t('nav_services') || 'Services', href: '/services' },
        { name: t('nav_packs') || 'Packs', href: '/packs' },
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
            <TechCursor />
            
            {/* Ultra-Clean Minimalist Header Navbar */}
            <header className="sticky top-0 w-full z-50 border-b border-gray-200/40 dark:border-gray-800/40 bg-white/70 dark:bg-[#070A10]/70 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        
                        {/* Minimalist Text Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center gap-2 group">
                                <span className="font-sans font-semibold text-base sm:text-lg tracking-wide text-gray-900 dark:text-white flex items-center gap-2">
                                    Mr Dim's
                                    <span className="w-1.5 h-1.5 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></span>
                                </span>
                            </Link>
                        </div>

                        {/* Thin & Refined Desktop Navigation Tabs */}
                        <nav className="hidden lg:flex items-center space-x-8 font-sans">
                            {navLinks.map((link) => (
                                !link.isButton && (
                                    <Link 
                                        key={link.name} 
                                        href={link.href} 
                                        className={`text-xs font-medium tracking-wider transition-colors relative py-1 ${
                                            isActive(link.href) 
                                                ? 'text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold' 
                                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                        {isActive(link.href) && (
                                            <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-blueprint-bluePrimary dark:bg-blueprint-cyan rounded-full" />
                                        )}
                                    </Link>
                                )
                            ))}
                        </nav>

                        {/* Right Toolbar: Discreet Contact Button, Language & Theme Switchers */}
                        <div className="flex items-center gap-3 font-sans text-xs">
                            
                            {/* Discreet Contact CTA */}
                            <Link 
                                href="/contact" 
                                className="hidden sm:inline-flex items-center px-4 py-1.5 border border-gray-300/80 dark:border-gray-700/80 text-gray-800 dark:text-gray-200 hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan font-medium text-xs rounded-full transition-all"
                            >
                                Contact
                            </Link>

                            {/* Language Switcher */}
                            <div className="hidden sm:flex items-center border border-gray-200/80 dark:border-gray-800/80 rounded-full px-1 py-0.5 text-[11px] font-medium">
                                <button 
                                    onClick={() => changeLanguage('fr')} 
                                    className={`px-2.5 py-0.5 rounded-full transition-colors ${lang === 'fr' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    FR
                                </button>
                                <button 
                                    onClick={() => changeLanguage('en')} 
                                    className={`px-2.5 py-0.5 rounded-full transition-colors ${lang === 'en' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}
                                >
                                    EN
                                </button>
                            </div>

                            {/* Theme Switcher Button */}
                            <button 
                                onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200/80 dark:border-gray-800/80 text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors bg-white/50 dark:bg-gray-900/50"
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
                                className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan"
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
                            className="lg:hidden bg-white/95 dark:bg-[#070A10]/95 backdrop-blur-md border-b border-gray-200/40 dark:border-gray-800/40 z-50 py-4 shadow-xl font-sans"
                        >
                            <div className="flex flex-col px-4 space-y-2 max-w-7xl mx-auto">
                                {navLinks.map((link) => (
                                    <Link 
                                        key={link.name}
                                        href={link.href}
                                        className={`px-4 py-2.5 text-xs font-medium rounded-lg transition-colors ${
                                            isActive(link.href) 
                                                ? 'text-blueprint-bluePrimary dark:text-blueprint-cyan bg-gray-100 dark:bg-gray-900 font-bold' 
                                                : 'text-gray-600 dark:text-gray-300 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                
                                <div className="pt-4 mt-2 border-t border-gray-200/60 dark:border-gray-800/60 flex items-center justify-between">
                                    <div className="flex border border-gray-200/80 dark:border-gray-800/80 rounded-full px-1 py-0.5 text-xs font-medium">
                                        <button onClick={() => changeLanguage('fr')} className={`px-3 py-1 rounded-full ${lang === 'fr' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold' : 'text-gray-500'}`}>FR</button>
                                        <button onClick={() => changeLanguage('en')} className={`px-3 py-1 rounded-full ${lang === 'en' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold' : 'text-gray-500'}`}>EN</button>
                                    </div>
                                    <Link 
                                        href="/contact" 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="px-4 py-1.5 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium text-xs rounded-full"
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
            <main className="relative z-10 flex-grow w-full overflow-hidden">
                {children}
            </main>
            
            {/* Footer */}
            <footer className="relative z-10 bg-[#070A10] border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 text-gray-400 pt-16 pb-8 overflow-hidden font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16"
                    >
                        {/* Brand & Info */}
                        <div className="md:col-span-5 lg:col-span-4">
                            <div className="flex items-center mb-4">
                                <span className="font-bold text-base text-white">
                                    Mr Dim's — Franck Dimitri
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-xs font-sans">
                                Ingénierie logicielle, architecture web et développement d'applications sur-mesure pour vos projets.
                            </p>
                            
                            <ul className="space-y-2.5 text-xs text-gray-300 font-sans">
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                    +237 676 383 986
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                    franckdimitri009@gmail.com
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                    Yaoundé, Cameroun
                                </li>
                            </ul>
                        </div>

                        {/* Navigation Links */}
                        <div className="md:col-span-3 md:col-start-7 lg:col-start-7 lg:col-span-2">
                            <h4 className="text-white text-xs font-bold mb-6 border-b border-gray-800 pb-4">
                                Navigation
                            </h4>
                            <ul className="space-y-3 text-xs font-medium font-sans">
                                <li><Link href="/" className="hover:text-blueprint-cyan transition-colors">Accueil</Link></li>
                                <li><Link href="/projects" className="hover:text-blueprint-cyan transition-colors">Projets</Link></li>
                                <li><Link href="/about" className="hover:text-blueprint-cyan transition-colors">À propos</Link></li>
                                <li><Link href="/services" className="hover:text-blueprint-cyan transition-colors">Services</Link></li>
                                <li><Link href="/packs" className="hover:text-blueprint-cyan transition-colors">Packs</Link></li>
                                <li><Link href="/blog" className="hover:text-blueprint-cyan transition-colors">Blog</Link></li>
                                <li><Link href="/contact" className="hover:text-blueprint-cyan transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Legal & Resources */}
                        <div className="md:col-span-3 lg:col-span-3">
                            <h4 className="text-white text-xs font-bold mb-6 border-b border-gray-800 pb-4">
                                Ressources & Accès
                            </h4>
                            <ul className="space-y-3 text-xs font-medium font-sans mb-8">
                                <li><a href="https://github.com/Franck-Dimitri" target="_blank" rel="noreferrer" className="hover:text-blueprint-cyan transition-colors">Dépôt GitHub</a></li>
                                <li className="pt-4 mt-4 border-t border-gray-800">
                                    <Link href={route('login')} className="text-gray-400 hover:text-blueprint-cyan transition-colors flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Espace Administration
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-gray-500">
                        <div>
                            &copy; {new Date().getFullYear()} Mr Dim's — Franck Dimitri. Tous droits réservés.
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Système Opérationnel
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

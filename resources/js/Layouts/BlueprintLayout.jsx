import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
            
            {/* Header */}
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="sticky top-0 w-full z-50 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-white/90 dark:bg-blueprint-darkNight/90 backdrop-blur-md"
            >
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo Area */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center shrink-0 group">
                                <span className="font-bold text-lg tracking-tight text-blueprint-textDark dark:text-blueprint-white flex items-center gap-2">
                                    MR <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan text-sm font-bold">DIM'S</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden xl:flex items-center space-x-1 font-sans">
                            {navLinks.map((link) => (
                                link.isButton ? (
                                    <div key={link.name} className="pl-4 ml-2">
                                        <Link 
                                            href={link.href} 
                                            className="flex items-center gap-2 px-5 py-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 rounded-xl hover:opacity-90 transition-opacity text-xs font-bold shadow-md"
                                        >
                                            {link.name}
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link 
                                        key={link.name} 
                                        href={link.href} 
                                        className={`px-4 py-8 text-xs font-bold relative flex items-center transition-colors ${isActive(link.href) ? 'text-blueprint-bluePrimary dark:text-blueprint-cyan' : 'text-gray-600 dark:text-gray-300 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan'}`}
                                    >
                                        {link.name}
                                        {isActive(link.href) && (
                                            <motion.span 
                                                layoutId="underline"
                                                className="absolute bottom-0 left-0 w-full h-[2px] bg-blueprint-bluePrimary dark:bg-blueprint-cyan"
                                            ></motion.span>
                                        )}
                                    </Link>
                                )
                            ))}
                        </nav>

                        {/* Theme Switcher (Desktop) & Mobile Toggle */}
                        <div className="flex items-center gap-4 font-sans">
                            
                            {/* Language Toggle */}
                            <div className="hidden sm:flex items-center border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden text-xs font-bold">
                                <button 
                                    onClick={() => changeLanguage('fr')} 
                                    className={`px-3 py-1.5 transition-colors ${lang === 'fr' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-[#1A1A1A] text-gray-500 hover:text-blueprint-textDark dark:hover:text-white'}`}
                                >
                                    FR
                                </button>
                                <button 
                                    onClick={() => changeLanguage('en')} 
                                    className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900' : 'bg-gray-100 dark:bg-[#1A1A1A] text-gray-500 hover:text-blueprint-textDark dark:hover:text-white'}`}
                                >
                                    EN
                                </button>
                            </div>

                            {/* Theme Switcher */}
                            <button 
                                onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors bg-white dark:bg-[#1A1A1A]"
                                title="Basculer le thème"
                            >
                                {theme === 'dark' ? (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>

                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="xl:hidden p-2 text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="xl:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0B0F19] border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 z-50 py-4 shadow-xl font-sans"
                    >
                        <div className="flex flex-col px-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 py-3 text-sm font-bold rounded-xl ${isActive(link.href) ? 'text-blueprint-bluePrimary dark:text-blueprint-cyan bg-blueprint-bluePrimary/5 dark:bg-blueprint-cyan/5' : 'text-gray-600 dark:text-gray-300 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            
                            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col justify-center items-center gap-4">
                                <div className="flex p-1 bg-gray-100 dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 font-sans text-xs">
                                    <button onClick={() => changeLanguage('fr')} className={`px-4 py-2 text-xs font-bold rounded-lg ${lang === 'fr' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900' : 'text-gray-500'}`}>FR</button>
                                    <button onClick={() => changeLanguage('en')} className={`px-4 py-2 text-xs font-bold rounded-lg ${lang === 'en' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900' : 'text-gray-500'}`}>EN</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.header>

            {/* Main Content */}
            <main className="relative z-10 flex-grow w-full overflow-hidden">
                {children}
            </main>
            
            {/* Footer */}
            <footer className="relative z-10 bg-[#070A10] border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 text-gray-400 pt-16 pb-8 overflow-hidden font-sans">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-xs">
                                Architecture web, ingénierie logicielle et développement d'applications sur-mesure pour vos projets.
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
                            <ul className="space-y-3 text-xs font-medium">
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
                            <ul className="space-y-3 text-xs font-medium mb-8">
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

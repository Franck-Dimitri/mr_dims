import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ConstructionBackground from '@/Components/ConstructionBackground';

export default function BlueprintLayout({ children }) {
    const { url } = usePage();
    const [theme, setTheme] = useState('system');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        { name: 'ACCUEIL', href: '/' },
        { name: 'PROJETS', href: '/projects' },
        { name: 'À PROPOS', href: '/about' },
        { name: 'SERVICES', href: '/services' },
        { name: 'PACKS', href: '/packs' },
        { name: 'BLOG', href: '/blog' },
        { name: 'CONTACT', href: '/contact', isButton: true },
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
            
            {/* Header */}
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-50 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-white/90 dark:bg-blueprint-darkNight/90 backdrop-blur-md"
            >
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo Area */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center shrink-0 group">
                                <motion.div 
                                    whileHover={{ rotate: 90 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="w-10 h-10 border border-blueprint-bluePrimary dark:border-blueprint-cyan flex items-center justify-center mr-3 group-hover:bg-blueprint-bluePrimary/10 dark:group-hover:bg-blueprint-cyan/10 transition-colors"
                                >
                                    <svg className="w-5 h-5 text-blueprint-bluePrimary dark:text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7zm6 3l4 2-4 2V10z" />
                                    </svg>
                                </motion.div>
                                <span className="font-bold text-lg tracking-wider text-blueprint-textDark dark:text-blueprint-white flex items-center gap-2">
                                    DIM'S <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan text-sm opacity-70 font-mono">// CREATIVE</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden xl:flex items-center space-x-1">
                            {navLinks.map((link) => (
                                link.isButton ? (
                                    <div key={link.name} className="pl-4 ml-2">
                                        <Link 
                                            href={link.href} 
                                            className="flex items-center gap-2 px-5 py-2 bg-[#1A1A1A] border border-gray-800 text-white hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors text-xs font-bold tracking-widest uppercase"
                                        >
                                            {link.name}
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link 
                                        key={link.name} 
                                        href={link.href} 
                                        className={`px-4 py-8 text-xs font-bold tracking-widest uppercase relative flex items-center ${isActive(link.href) ? 'text-blueprint-bluePrimary dark:text-blueprint-cyan' : 'text-gray-500 hover:text-blueprint-textDark dark:hover:text-blueprint-white'}`}
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
                        <div className="flex items-center gap-4">
                            <div className="hidden lg:flex p-1 bg-[#1A1A1A] border border-gray-800 rounded-md">
                                <button 
                                    onClick={() => applyTheme('light')}
                                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${theme === 'light' ? 'bg-blueprint-bluePrimary text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    Clair
                                </button>
                                <button 
                                    onClick={() => applyTheme('dark')}
                                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${theme === 'dark' ? 'bg-blueprint-cyan text-gray-900' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                    Sombre
                                </button>
                                <button 
                                    onClick={() => applyTheme('system')}
                                    className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${theme === 'system' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Système
                                </button>
                            </div>

                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="xl:hidden p-2 text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
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
                        className="xl:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0B0F19] border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 z-50 py-4 shadow-xl"
                    >
                        <div className="flex flex-col px-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 py-3 text-sm font-bold tracking-widest uppercase ${isActive(link.href) ? 'text-blueprint-bluePrimary dark:text-blueprint-cyan bg-blueprint-bluePrimary/5 dark:bg-blueprint-cyan/5 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan' : 'text-gray-500 hover:text-blueprint-textDark dark:hover:text-blueprint-white hover:bg-gray-50 dark:hover:bg-white/5'}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            
                            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800 flex justify-center">
                                <div className="flex p-1 bg-gray-100 dark:bg-[#1A1A1A] rounded-md">
                                    <button onClick={() => applyTheme('light')} className={`px-4 py-2 text-xs font-medium rounded-sm ${theme === 'light' ? 'bg-blueprint-bluePrimary text-white' : 'text-gray-500 dark:text-gray-400'}`}>Clair</button>
                                    <button onClick={() => applyTheme('dark')} className={`px-4 py-2 text-xs font-medium rounded-sm ${theme === 'dark' ? 'bg-blueprint-cyan text-gray-900' : 'text-gray-500 dark:text-gray-400'}`}>Sombre</button>
                                    <button onClick={() => applyTheme('system')} className={`px-4 py-2 text-xs font-medium rounded-sm ${theme === 'system' ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900' : 'text-gray-500 dark:text-gray-400'}`}>Système</button>
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
            <footer className="relative z-10 bg-[#070A10] border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 text-gray-400 pt-16 pb-8 overflow-hidden">
                {/* Background Large Text */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15vw] font-bold tracking-tighter opacity-[0.02] dark:opacity-[0.03] text-white whitespace-nowrap pointer-events-none select-none">
                    MR DIM'S
                </div>

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
                            <div className="flex items-center mb-6">
                                <div className="w-10 h-10 border border-blueprint-bluePrimary dark:border-blueprint-cyan flex items-center justify-center mr-3">
                                    <svg className="w-5 h-5 text-blueprint-bluePrimary dark:text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7zm6 3l4 2-4 2V10z" />
                                    </svg>
                                </div>
                                <span className="font-bold text-lg tracking-wider text-white">
                                    DIM'S CREATIVE
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed opacity-70 mb-8 max-w-xs">
                                Système de design, architecture de marque et interfaces numériques. Conception structurée pour un impact maximal.
                            </p>
                            
                            <ul className="space-y-3 font-mono text-xs tracking-wide">
                                <li className="flex items-center gap-3 hover:text-white transition-colors">
                                    <div className="w-1.5 h-1.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                    +237 676 383 986
                                </li>
                                <li className="flex items-center gap-3 hover:text-white transition-colors">
                                    <div className="w-1.5 h-1.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                    FRANCKDIMITRI009@GMAIL.COM
                                </li>
                                <li className="flex items-center gap-3 hover:text-white transition-colors">
                                    <div className="w-1.5 h-1.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                    YAOUNDÉ, CAMEROUN
                                </li>
                            </ul>
                        </div>

                        {/* Navigation Links */}
                        <div className="md:col-span-3 md:col-start-7 lg:col-start-7 lg:col-span-2">
                            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-gray-800 pb-4">
                                Index Plateforme
                            </h4>
                            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
                                <li><Link href="/" className="hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">Accueil</Link></li>
                                <li><Link href="/projects" className="hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">Projets</Link></li>
                                <li><Link href="/about" className="hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">À Propos</Link></li>
                                <li><Link href="/services" className="hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">Services</Link></li>
                                <li><Link href="/packs" className="hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">Packs</Link></li>
                                <li><Link href="/blog" className="hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">Blog</Link></li>
                                <li><Link href="/contact" className="hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        {/* Legal & Resources */}
                        <div className="md:col-span-3 lg:col-span-3">
                            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-6 border-b border-gray-800 pb-4">
                                Légal & Ressources
                            </h4>
                            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider mb-8">
                                <li><Link href="#" className="hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">Mentions Légales</Link></li>
                                <li><Link href="#" className="hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">Confidentialité</Link></li>
                                <li><a href="https://github.com/Franck-Dimitri" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">— Github</a></li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest uppercase">
                        <div>
                            &copy; {new Date().getFullYear()} DIM'S CREATIVE ACADEMY. TOUS DROITS RÉSERVÉS.
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

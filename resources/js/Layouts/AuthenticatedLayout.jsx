import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // Minimalistic theme implementation (mocked state for UI)
    const [theme, setTheme] = useState('dark');
    
    useEffect(() => {
        // Init theme from document
        if (document.documentElement.classList.contains('dark')) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, []);

    const applyTheme = (newTheme) => {
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (newTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            // System
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    };

    const generalNav = [
        { name: 'Dashboard', href: route('dashboard'), icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
        { name: 'Commandes', href: '#', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
        { name: 'Produits', href: '#', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
        { name: 'Clients', href: '#', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    ];

    const toolsNav = [
        { name: 'Analytics', href: '#', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { name: 'Marketing', href: '#', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
        { name: 'Finance', href: '#', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { name: 'Livraison', href: '#', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
    ];
    
    const profileNav = [
        { name: 'Messages', href: '#', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { name: 'Notifications', href: '#', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
        { name: 'Paramètres', href: '#', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    ];

    const NavGroup = ({ title, items }) => (
        <div className="mb-6">
            <h3 className="px-5 text-[10px] font-bold text-gray-400 font-mono capitalize tracking-wider mb-2">
                {title}
            </h3>
            <div className="space-y-1">
                {items.map((item) => {
                    const active = item.name === 'Dashboard'; // Mock active for now
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center justify-between px-5 py-2.5 text-xs font-bold transition-colors ${
                                active
                                ? 'text-blueprint-bluePrimary dark:text-blueprint-cyan bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 border-l-2 border-transparent'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={item.icon} />
                                </svg>
                                {item.name}
                            </div>
                            {/* Mock badges based on image */}
                            {(item.name === 'Commandes' || item.name === 'Messages' || item.name === 'Clients') && (
                                <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 font-mono text-[9px] px-1.5 py-0.5 rounded-sm">2</span>
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#070A10] text-gray-900 dark:text-gray-100 font-sans selection:bg-blueprint-bluePrimary selection:text-white flex overflow-hidden">
            
            {/* Sidebar Desktop */}
            <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 bg-white dark:bg-[#0B0F19] border-r border-gray-200 dark:border-gray-800 z-50">
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blueprint-bluePrimary dark:bg-[#5C3AFF] text-white flex items-center justify-center rounded-[4px]">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">
                            MR DIM'S
                        </span>
                    </Link>
                </div>

                {/* Workspace Selector Mock */}
                <div className="px-4 py-2 mb-2">
                    <p className="text-[10px] text-gray-400 mb-2 font-mono">My stores</p>
                    <button className="w-full flex items-center justify-between bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-200 rounded-sm shadow-sm">
                        <span className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blueprint-bluePrimary dark:bg-[#5C3AFF] text-white rounded-sm flex items-center justify-center text-[9px]">C</div>
                            Capstore
                        </span>
                        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-2 space-y-2">
                    <NavGroup title="General" items={generalNav} />
                    <NavGroup title="Tools" items={toolsNav} />
                    <NavGroup title="Profil" items={profileNav} />
                </nav>

                {/* Bottom User Area */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between gap-3 px-2 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border border-gray-300 dark:border-gray-600">
                                {/* Using user initial for mock avatar */}
                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 uppercase">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-gray-900 dark:text-white truncate">{user.name}</span>
                                <span className="text-[9px] text-gray-500 truncate font-mono">{user.email}</span>
                            </div>
                        </div>
                        <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay (Mocked) */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-[#0B0F19] border-r border-gray-200 dark:border-gray-800 z-50 flex flex-col lg:hidden"
                        >
                            {/* Identical content for mobile sidebar can be placed here */}
                            <div className="h-16 flex items-center justify-between px-6 shrink-0 border-b border-gray-200 dark:border-gray-800">
                                <Link href="/" className="flex items-center gap-2">
                                    <span className="font-bold text-sm tracking-tight text-gray-900 dark:text-white">MR DIM'S</span>
                                </Link>
                                <button onClick={() => setSidebarOpen(false)} className="text-gray-500">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:pl-64 min-h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-16 bg-white dark:bg-[#0B0F19] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 z-30 shrink-0 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white focus:outline-none">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        
                        {/* Breadcrumbs */}
                        <div className="hidden sm:flex items-center gap-2 text-xs font-medium">
                            <button className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button className="w-6 h-6 flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </button>
                            
                            <span className="text-gray-400 ml-2">Pages / </span>
                            <span className="text-gray-900 dark:text-white font-bold">{header || 'Dashboard'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="hidden md:flex relative">
                            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            <input type="text" placeholder="Search items, categories, or more..." className="bg-gray-50 dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-xs px-3 py-2 pl-9 rounded-md w-72 focus:outline-none focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan" />
                        </div>

                        {/* Theme Switcher */}
                        <div className="hidden sm:flex p-0.5 bg-gray-100 dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 rounded-md shadow-sm">
                            <button onClick={() => applyTheme('light')} className={`p-1.5 rounded-sm transition-colors ${theme === 'light' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`} title="Clair">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </button>
                            <button onClick={() => applyTheme('dark')} className={`p-1.5 rounded-sm transition-colors ${theme === 'dark' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`} title="Sombre">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            </button>
                        </div>

                        {/* Icons */}
                        <div className="flex items-center gap-3 border-l border-gray-200 dark:border-gray-800 pl-4">
                            <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                <span className="absolute top-0 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0B0F19]"></span>
                            </button>
                            <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                            </button>
                        </div>

                        {/* Topbar User Avatar */}
                        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 ml-2 overflow-hidden border border-gray-300 dark:border-gray-600 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 uppercase">{user.name.charAt(0)}</span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F9FAFB] dark:bg-gray-900/50">
                    {children}
                </main>
            </div>
        </div>
    );
}

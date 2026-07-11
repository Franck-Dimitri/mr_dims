import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen bg-[#070A10] text-gray-100 font-sans selection:bg-blueprint-bluePrimary selection:text-white flex flex-col justify-center items-center relative overflow-hidden">
            
            {/* Architectural Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" strokeWidth="0.5" />
                        </pattern>
                        <pattern id="blueprint-grid-large" width="200" height="200" patternUnits="userSpaceOnUse">
                            <rect width="200" height="200" fill="url(#blueprint-grid)" />
                            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#22D3EE" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blueprint-grid-large)" />
                </svg>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full sm:max-w-md mt-6 px-8 py-10 bg-[#0B0F19]/90 backdrop-blur-md border border-gray-800 shadow-2xl relative z-10"
            >
                {/* Decorative border top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2563EB] to-[#22D3EE]"></div>

                <div className="flex flex-col items-center mb-8">
                    <Link href="/">
                        <div className="w-12 h-12 border border-[#2563EB] flex items-center justify-center mb-4 bg-[#2563EB]/10 group hover:bg-[#2563EB]/20 transition-colors">
                            <svg className="w-6 h-6 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
                            </svg>
                        </div>
                    </Link>
                    <h2 className="text-xl font-bold uppercase tracking-widest text-white text-center">
                        {title || "PORTAIL SÉCURISÉ"}
                    </h2>
                    <p className="text-[10px] font-mono text-gray-500 mt-2 uppercase tracking-widest text-center">
                        {subtitle || "IDENTIFICATION REQUISE"}
                    </p>
                </div>

                {children}

            </motion.div>

            {/* Footer text */}
            <div className="mt-8 text-[10px] font-mono text-gray-600 uppercase tracking-widest relative z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                SYS_CTRL v1.0.0 // EN LIGNE
            </div>
        </div>
    );
}

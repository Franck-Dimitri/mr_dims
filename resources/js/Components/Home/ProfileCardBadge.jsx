import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function ProfileCardBadge() {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse coordinates relative to card center (-1 to 1)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for 3D tilt
    const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

    // Specular glare position
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <div className="relative flex flex-col items-center justify-center py-4 perspective-1000">
            {/* Architectural Hanging Strap / Suspension Point */}
            <div className="flex flex-col items-center select-none pointer-events-none mb-[-4px] z-20">
                <div className="w-1 h-6 bg-cyan-500/80"></div>
                <div className="w-6 h-2 bg-neutral-900 border border-cyan-500/50 flex items-center justify-center">
                    <div className="w-2 h-0.5 bg-cyan-400"></div>
                </div>
            </div>

            {/* 3D Architectural Blueprint Card (Strictly Square rounded-none) */}
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    y: isHovered ? -4 : [0, -6, 0],
                }}
                transition={{
                    y: isHovered
                        ? { duration: 0.2 }
                        : { duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative w-[360px] sm:w-[420px] md:w-[450px] lg:w-[470px] p-8 sm:p-9 md:p-10 rounded-none bg-white/95 dark:bg-[#0A0E17]/95 border border-neutral-300 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_25px_60px_-15px_rgba(0,217,255,0.2)] transition-shadow duration-500 cursor-grab active:cursor-grabbing select-none"
            >
                {/* BOLD + AT ALL 4 INTERSECTION CORNERS */}
                <span className="absolute -top-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>
                <span className="absolute -top-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>
                <span className="absolute -bottom-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>
                <span className="absolute -bottom-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>

                {/* Dynamic Specular Light Glare Overlay */}
                <motion.div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 rounded-none"
                    style={{
                        opacity: isHovered ? 0.3 : 0,
                        background: useTransform(
                            [glareX, glareY],
                            ([gx, gy]) =>
                                `radial-gradient(circle 240px at ${gx} ${gy}, rgba(255,255,255,0.7), transparent 70%)`
                        ),
                    }}
                />

                {/* Blueprint Frame Corner L-Lines */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500 pointer-events-none"></div>

                {/* Card Header: Architectural Status & ID */}
                <div className="relative z-10 flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 text-xs">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] tracking-wider uppercase font-mono">
                        <span className="w-1.5 h-1.5 rounded-none bg-emerald-500 animate-pulse"></span>
                        DISPONIBLE
                    </span>

                    <span className="font-mono text-[10px] tracking-widest text-neutral-400 dark:text-neutral-500 font-bold uppercase">
                        ID: MR_DIMS_DEV // 2026
                    </span>
                </div>

                {/* Card Center: Square Avatar & Info */}
                <div className="relative z-10 flex flex-col items-center text-center mt-6">
                    {/* Square Profile Picture with Architectural Border */}
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-cyan-500/30 opacity-40 blur-sm group-hover:opacity-70 transition duration-500 rounded-none"></div>
                        <div className="relative p-1.5 border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 rounded-none">
                            <img
                                src="/profile.jpg"
                                alt="Mr Dim's Dev"
                                className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-none object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                            {/* Inner Crosshair Accents */}
                            <span className="absolute -top-1 -left-1 text-[9px] font-mono font-bold text-cyan-500">+</span>
                            <span className="absolute -top-1 -right-1 text-[9px] font-mono font-bold text-cyan-500">+</span>
                            <span className="absolute -bottom-1 -left-1 text-[9px] font-mono font-bold text-cyan-500">+</span>
                            <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold text-cyan-500">+</span>
                        </div>
                    </div>

                    {/* Name & Title */}
                    <h3 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white uppercase font-sans">
                        Mr Dim's Dev
                    </h3>
                    <p className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-1 uppercase tracking-wider">
                        Ingénieur Logiciel & Architecte Web
                    </p>

                    {/* Location */}
                    <p className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-mono uppercase tracking-wide">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-none"></span>
                        Yaoundé, Cameroun 🇨🇲
                    </p>
                </div>

                {/* Core Stack Pills (Square rounded-none) */}
                <div className="relative z-10 flex flex-wrap justify-center gap-1.5 mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                    {['Laravel', 'React', 'TypeScript', 'Tailwind', 'Docker'].map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-none bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 uppercase tracking-wider"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Quick Social & Action Row (Square rounded-none) */}
                <div className="relative z-10 flex items-center justify-between gap-2.5 mt-6">
                    <a
                        href="https://wa.me/237676383986?text=Bonjour,%20je%20souhaite%20discuter%20d%27un%20projet"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-none bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all duration-200"
                    >
                        <span>WhatsApp</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>

                    <div className="flex items-center gap-1.5">
                        <a
                            href="https://github.com/Franck-Dimitri"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-none bg-neutral-100 dark:bg-neutral-900 hover:text-cyan-500 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 transition-colors"
                            aria-label="GitHub"
                        >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href="https://x.com/mrdimsdev?s=11"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-none bg-neutral-100 dark:bg-neutral-900 hover:text-cyan-500 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 transition-colors"
                            aria-label="X"
                        >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                        <a
                            href="mailto:contact@mrdims.dev"
                            className="p-2.5 rounded-none bg-neutral-100 dark:bg-neutral-900 hover:text-cyan-500 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 transition-colors"
                            aria-label="Email"
                        >
                            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                <rect width="20" height="16" x="2" y="4" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

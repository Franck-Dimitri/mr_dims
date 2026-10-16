import React from 'react';

export default function TechStackMarquee() {
    const technologies = [
        {
            name: "LARAVEL",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.574 5.253L12.57.054a1.144 1.144 0 0 0-1.14 0L2.426 5.253A1.143 1.143 0 0 0 1.855 6.24v11.52c0 .415.222.798.571.988l9.004 5.199c.178.102.378.153.57.153s.392-.051.57-.153l9.004-5.199a1.143 1.143 0 0 0 .571-.988V6.24a1.143 1.143 0 0 0-.571-.987zM12 2.215l7.556 4.363-2.906 1.678-7.556-4.363L12 2.215zm-8.145 5.37L10.5 4.301v6.974l-6.645 3.837V7.585zm7.645 13.916V14.53l6.645-3.837v6.974l-6.645 3.834zm1.5-8.318V6.209l2.906-1.678 4.65 2.685-7.556 4.367z" />
                </svg>
            )
        },
        {
            name: "REACT",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="2" />
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                        <ellipse cx="12" cy="12" rx="10" ry="4.2" />
                        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
                        <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
                    </g>
                </svg>
            )
        },
        {
            name: "TYPESCRIPT",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h18v18H3V3zm8.97 9.87h-2.1v6.25H7.74v-6.25H5.66v-1.85h6.31v1.85zm6.5 2.58c0 1.25-.56 2.1-1.68 2.55-1.12.45-2.58.55-4.38.31l.36-1.8c1.3.17 2.28.16 2.94-.03.66-.19.99-.54.99-1.05 0-.41-.18-.74-.54-.99-.36-.25-1.07-.58-2.13-1-.95-.38-1.63-.84-2.04-1.38-.41-.54-.62-1.21-.62-2.01 0-1.12.51-1.99 1.53-2.61 1.02-.62 2.36-.88 4.02-.78l-.34 1.77c-1.22-.07-2.12.04-2.7.33-.58.29-.87.72-.87 1.29 0 .38.16.69.48.93.32.24.97.55 1.95.93 1.15.45 1.95.99 2.4 1.62.45.63.67 1.42.67 2.37z" />
                </svg>
            )
        },
        {
            name: "TAILWIND CSS",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.975 12 6.001 12z" />
                </svg>
            )
        },
        {
            name: "PHP 8.4",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4.5 13.5H6.2l1.6-7h2.2c1.4 0 2.2.6 2 1.7-.2 1.2-1.1 1.8-2.3 1.8h-1l-.8 3.5zm2.1-4.7c.6 0 1-.3 1.1-.9.1-.5-.2-.9-.8-.9h-1l-.4 1.8h1.1zm7.4 4.7h-1.3l.8-3.5h-1.8l-.8 3.5h-1.3l1.6-7h1.3l-.6 2.6h1.8l.6-2.6h1.3l-1.6 7z" />
                </svg>
            )
        },
        {
            name: "INERTIA.JS",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.6 15.6l5.7-5.7-5.7-5.7h4.8l5.7 5.7-5.7 5.7H4.6zm8.8 0l5.7-5.7-5.7-5.7h4.8l5.7 5.7-5.7 5.7h-4.8z" />
                </svg>
            )
        },
        {
            name: "DOCKER",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186zm-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.888c0 .102.083.186.185.186zm5.884 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.76 9.89c-.365-1.583-1.614-2.73-3.238-2.983-.438-.068-.888-.046-1.32.062-.162.04-.336.035-.49-.023a1.47 1.47 0 01-.762-.87c-.645-1.8-2.42-3.037-4.437-3.042h-.372c-.225 0-.41.173-.426.398-.073 1.05-.536 2.023-1.306 2.742l-.248.232H1.144c-.632 0-1.144.512-1.144 1.144v3.136c0 5.498 4.29 9.87 9.87 9.87 6.44 0 11.7-4.47 12.98-10.457.34-.148.65-.353.91-.607z" />
                </svg>
            )
        },
        {
            name: "LINUX VPS",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C9.5 2 8 4 8 6.5c0 1 .3 2.2.8 3-.5.5-1.8 1.5-1.8 3.5 0 2 .5 3.5 1.5 4.5-.5 1-1.5 1.5-2.5 1.5 0 1 2 2 6 2s6-1 6-2c-1 0-2-.5-2.5-1.5 1-1 1.5-2.5 1.5-4.5 0-2-1.3-3-1.8-3.5.5-.8.8-2 .8-3C16 4 14.5 2 12 2zm-1.5 4a.8.8 0 110 1.6.8.8 0 010-1.6zm3 0a.8.8 0 110 1.6.8.8 0 010-1.6zm-1.5 2c.8 0 1.5.5 1.5 1.2 0 .5-.7.8-1.5.8s-1.5-.3-1.5-.8c0-.7.7-1.2 1.5-1.2z" />
                </svg>
            )
        },
        {
            name: "MYSQL & SQL",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.87 0 6 1.34 6 2s-2.13 2-6 2-6-1.34-6-2 2.13-2 6-2zm6 5.27c-.82.49-2.06.91-3.55 1.15l1.63 2.82c.69-.22 1.34-.49 1.92-.81V10.27zM6 10.27v2.16c.58.32 1.23.59 1.92.81l1.63-2.82C8.06 11.18 6.82 10.76 6 10.27zM12 19c-3.87 0-6-1.34-6-2v-1.73c1.55.77 3.65 1.23 6 1.23s4.45-.46 6-1.23V17c0 .66-2.13 2-6 2z" />
                </svg>
            )
        },
        {
            name: "POSTGRESQL",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.016 2.016c-3.1 0-5.8 1.4-7.4 3.7C3.5 7.1 2.9 9 3 11c.2 3.8 2.8 7 6.4 8.2v1.8c0 .5.4 1 1 1h3.2c.5 0 1-.5 1-1v-1.8c3.6-1.2 6.2-4.4 6.4-8.2.1-2-.5-3.9-1.6-5.3-1.6-2.3-4.3-3.7-7.384-3.684zm-3 8.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm6 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
                </svg>
            )
        },
        {
            name: "REDIS",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.5 7.5L12 2l9.5 5.5v9L12 22l-9.5-5.5v-9zm9.5-3.2L4.7 8.5l7.3 4.2 7.3-4.2L12 4.3zm-7.5 5.9v5.6L11 19.5v-5.6L4.5 10.2zm15 0L13 13.9v5.6l6.5-3.7v-5.6z" />
                </svg>
            )
        },
        {
            name: "GIT & GITHUB",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
            )
        },
        {
            name: "NGINX",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.5l8.5 4.9v9.8L12 22.1l-8.5-4.9V7.4L12 2.5zm4.8 5.8h-2.1L10 13.5V8.3H7.8v7.4h2.1l4.7-5.2v5.2h2.2V8.3z" />
                </svg>
            )
        },
        {
            name: "RESTFUL APIS",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
            )
        },
        {
            name: "VERCEL",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L24 22H0L12 1Z" />
                </svg>
            )
        },
        {
            name: "UBUNTU",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-7.07 8.93a1.94 1.94 0 1 1 0 3.88 1.94 1.94 0 0 1 0-3.88zm8.68-6.19a9.23 9.23 0 0 1 7.46 7.46l-2.7.9a6.45 6.45 0 0 0-4.76-4.76v-3.6zm-3.22 0v3.6a6.45 6.45 0 0 0-4.76 4.76l-2.7-.9a9.23 9.23 0 0 1 7.46-7.46zm-6.17 9.87l2.7.9a6.45 6.45 0 0 0 4.76 4.76v3.6a9.23 9.23 0 0 1-7.46-7.46zm9.39 9.26v-3.6a6.45 6.45 0 0 0 4.76-4.76l2.7.9a9.23 9.23 0 0 1-7.46 7.46z" />
                </svg>
            )
        },
        {
            name: "AWS",
            svg: (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.75 14.54a10.96 10.96 0 0 1-5.31 1.34c-3.1 0-5.88-1.54-7.98-4.08-.25-.3-.08-.66.27-.52 2.38.94 5.08 1.5 7.85 1.5 1.83 0 3.63-.26 5.3-.77.34-.1.54.21.27.47l-.4.06zm1.18-1.25a.39.39 0 0 0-.48-.38c-.89.28-1.83.47-2.79.57-.34.03-.45.41-.16.59 1.15.7 2.45.87 3.32.96.22.02.35-.18.25-.37l-.14-1.37zM8.32 5.86c0 .87-.6 1.4-1.63 1.4H5.35V4.6h1.34c1.03 0 1.63.49 1.63 1.26zm3.32 4.41c-.44.75-1.27 1.1-2.2 1.1-.56 0-1.12-.13-1.61-.41l-.47 1.41c.67.36 1.45.54 2.25.54 1.56 0 2.92-.66 3.73-1.93l-.86-.88a.38.38 0 0 0-.58.07l-.26.34v-.24z" />
                </svg>
            )
        }
    ];

    return (
        <section className="border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#070A11] py-8 overflow-hidden select-none relative font-sans">
            {/* Header section comme sur la capture */}
            <div className="max-w-6xl mx-auto px-6 mb-6">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-none"></span>
                    <span>STACK & INFRASTRUCTURE</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                    Outils systèmes, frameworks et technologies que j'utilise au quotidien.
                </p>
            </div>

            {/* Animation de défilement continu avec les logos + labels */}
            <style>
                {`
                @keyframes stack-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-stack-scroll {
                    animation: stack-scroll 40s linear infinite;
                    width: max-content;
                }
                .animate-stack-scroll:hover {
                    animation-play-state: paused;
                }
                `}
            </style>

            <div 
                className="overflow-hidden py-2"
                style={{ 
                    maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', 
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' 
                }}
            >
                <div className="animate-stack-scroll flex items-center gap-12 sm:gap-16">
                    {[...Array(2)].map((_, groupIdx) => (
                        <div key={groupIdx} className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
                            {technologies.map((tech, i) => (
                                <div 
                                    key={i} 
                                    className="flex flex-col items-center justify-center gap-2.5 text-neutral-500 dark:text-neutral-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors group cursor-default"
                                >
                                    <div className="w-12 h-12 flex items-center justify-center text-neutral-600 dark:text-neutral-400 group-hover:text-cyan-500 group-hover:scale-110 transition-all duration-300">
                                        {tech.svg}
                                    </div>
                                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors whitespace-nowrap">
                                        {tech.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

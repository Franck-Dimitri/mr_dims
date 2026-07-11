import { Head, Link, useForm } from '@inertiajs/react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import ConstructionBackground from '@/Components/ConstructionBackground';
import { motion } from 'framer-motion';

export default function Welcome({ auth, projects, blogs }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        message: '',
        platform_origin: 'web',
    });

    const submitContact = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <BlueprintLayout>
            <Head title="Accueil - Ingénieur Full Stack" />

            {/* --- HERO SECTION --- */}
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

                        {/* Right: Visual Avatar Box */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, x: 50 }}
                            whileInView={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="hidden lg:flex justify-center relative"
                        >
                            {/* Crosshairs & Lines */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan -translate-x-4 -translate-y-4"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan translate-x-4 translate-y-4"></div>
                            
                            <div className="relative w-[450px] h-[450px] bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden group">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="text-center"
                                >
                                    <svg className="w-32 h-32 mx-auto text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    <div className="mt-4 font-bold text-3xl tracking-tighter text-gray-300 dark:text-gray-700">MR DIM'S</div>
                                </motion.div>

                                {/* Floating Tags */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: "-50%" }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="absolute top-1/2 -right-8 bg-[#0B0F19] border border-gray-800 px-4 py-2 font-mono text-[10px] tracking-widest uppercase text-white rotate-90 origin-bottom-left shadow-lg"
                                >
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">EXP:</span> BACKEND ARCHITECT
                                </motion.div>
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7, duration: 0.5 }}
                                    className="absolute bottom-12 -left-4 bg-[#0B0F19] border border-gray-800 px-4 py-3 font-mono text-[10px] tracking-widest uppercase text-white shadow-lg"
                                >
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan block mb-1">VOL: 50+</span>
                                    COMMITS
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- STATS SECTION --- */}
            <section className="border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-white/50 dark:bg-[#070A10]/50 backdrop-blur-sm relative z-10">
                <div className="max-w-[90rem] mx-auto">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-blueprint-bluePrimary/20 dark:divide-blueprint-cyan/20"
                    >
                        {[
                            { id: '01', val: '47+', label: 'PROJETS DÉPLOYÉS' },
                            { id: '02', val: '28', label: 'CLIENTS ACTIFS' },
                            { id: '03', val: '3+', label: "ANNÉES D'EXP." },
                            { id: '04', val: '100%', label: 'DISPONIBILITÉ' },
                        ].map((stat) => (
                            <motion.div key={stat.id} variants={fadeInUp} className="p-8 lg:p-12">
                                <div className="font-mono text-[10px] tracking-widest text-gray-400 mb-6 uppercase border-b border-gray-200 dark:border-gray-800 pb-2 inline-block">
                                    DATA_SET: {stat.id}
                                </div>
                                <div className="text-5xl lg:text-6xl font-bold tracking-tighter text-blueprint-textDark dark:text-white mb-2">
                                    {stat.val}
                                </div>
                                <div className="font-mono text-xs tracking-widest uppercase text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* --- PROJECTS SECTION --- */}
            <section className="py-24 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 relative z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <motion.div variants={fadeInUp}>
                                <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold mb-6">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    MODULE: PORTFOLIO
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
                                    <span className="text-blueprint-textDark dark:text-white">SÉLECTION</span>{' '}
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">TECHNIQUE</span>
                                </h2>
                                <p className="font-mono text-xs uppercase tracking-widest text-gray-500 max-w-xl leading-relaxed">
                                    EXTRACTION DES DÉPÔTS RÉCENTS. ARCHIVES DE CODE ET SYSTÈMES FONCTIONNELS DÉPLOYÉS EN PRODUCTION.
                                </p>
                            </motion.div>
                            
                            <motion.div variants={fadeInUp}>
                                <Link href="/projects" className="shrink-0 px-6 py-3 border border-gray-300 dark:border-gray-700 font-mono text-xs tracking-widest uppercase hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors flex items-center gap-3">
                                    ACCÉDER AU DÉPÔT
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </motion.div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects && projects.length > 0 ? (
                                projects.map((project, idx) => {
                                    const parseJSON = (data, defaultVal) => {
                                        if (!data) return defaultVal;
                                        if (Array.isArray(data)) return data;
                                        if (typeof data === 'string') {
                                            try { return JSON.parse(data); } 
                                            catch (e) { return data.split(',').map(s => s.trim()); }
                                        }
                                        return defaultVal;
                                    };
                                    const techStack = parseJSON(project.tech_stack, ['LARAVEL', 'REACT']);
                                    const images = parseJSON(project.images, []);
                                    const coverImage = images.length > 0 ? images[0] : null;

                                    return (
                                        <motion.div 
                                            variants={fadeInUp}
                                            key={project.id} 
                                            className="group bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 hover:border-blueprint-bluePrimary/50 dark:hover:border-blueprint-cyan/50 transition-colors flex flex-col relative overflow-hidden"
                                        >
                                            <div className="relative h-64 bg-gray-100 dark:bg-[#111827] overflow-hidden border-b border-gray-200 dark:border-gray-800">
                                                <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur px-2 py-1 font-mono text-[10px] tracking-widest text-white uppercase border border-white/10">
                                                    [CAT: {project.category || 'APP_WEB'}]
                                                </div>
                                                {idx === 0 && (
                                                    <div className="absolute top-4 right-4 z-10 bg-blueprint-bluePrimary dark:bg-blueprint-cyan px-2 py-1 font-mono text-[10px] tracking-widest text-white dark:text-gray-900 uppercase font-bold flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                                        FEATURED
                                                    </div>
                                                )}
                                                
                                                {coverImage ? (
                                                    <img src={`/storage/${coverImage}`} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                                                        <svg className="w-24 h-24 text-blueprint-textDark dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6 flex-1 flex flex-col">
                                                <h3 className="text-xl font-bold tracking-tight mb-3 uppercase group-hover:text-blueprint-bluePrimary dark:group-hover:text-blueprint-cyan transition-colors">
                                                    <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0"></Link>
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 mb-6 font-mono leading-relaxed line-clamp-2">
                                                    {project.excerpt || 'Ceci est un projet généré automatiquement pour présenter l\'architecture technique.'}
                                                </p>
                                                
                                                <div className="mb-4 text-[10px] font-mono text-gray-400 uppercase tracking-widest border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan pl-2">
                                                    {techStack.join(' // ')}
                                                </div>

                                                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 font-mono text-[10px] tracking-widest text-gray-500 uppercase">
                                                    <span>TIME: {project.development_time || 'N/A'}</span>
                                                    <span className="flex items-center gap-1 text-green-500">
                                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                                        ONLINE
                                                    </span>
                                                </div>
                                                
                                                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center font-mono text-[10px] uppercase font-bold relative z-10">
                                                    <div className="flex gap-4">
                                                        {project.repository_url ? (
                                                            <a href={project.repository_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors z-20 relative">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                                                REPO
                                                            </a>
                                                        ) : (
                                                            <span className="text-gray-300 dark:text-gray-700 flex items-center gap-1 cursor-not-allowed"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> PRIVATE</span>
                                                        )}
                                                        
                                                        {project.live_url && (
                                                            <a href={project.live_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors z-20 relative">
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                                LIVE
                                                            </a>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-400">
                                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                        {Math.floor(Math.random() * 1000) + 100}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center font-mono text-gray-500">
                                    [ NO_DATA_FOUND ]
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- BLOG SECTION --- */}
            <section className="py-24 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-[#F9FAFB]/50 dark:bg-[#070A10]/50 backdrop-blur-md relative z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <motion.div variants={fadeInUp}>
                                <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold mb-6">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                                    MODULE: TRANSMISSION
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
                                    <span className="text-blueprint-textDark dark:text-white">ARCHIVES</span>{' '}
                                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">TECHNIQUES</span>
                                </h2>
                            </motion.div>
                            
                            <motion.div variants={fadeInUp}>
                                <Link href="/blog" className="shrink-0 px-6 py-3 border border-gray-300 dark:border-gray-700 font-mono text-xs tracking-widest uppercase hover:bg-gray-100 dark:hover:bg-[#1A1A1A] transition-colors flex items-center gap-3">
                                    CONSULTER LES LOGS
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </Link>
                            </motion.div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {blogs && blogs.length > 0 ? (
                                blogs.map(blog => (
                                    <motion.div variants={fadeInUp} key={blog.id}>
                                        <Link href={`/blog/${blog.slug}`} className="group bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-8 flex flex-col md:flex-row gap-8 hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors h-full">
                                            <div className="flex-1">
                                                <div className="font-mono text-[10px] tracking-widest uppercase text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold mb-4">
                                                    {new Date(blog.published_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                                </div>
                                                <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:underline decoration-blueprint-bluePrimary dark:decoration-blueprint-cyan underline-offset-4">
                                                    {blog.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 font-mono leading-relaxed line-clamp-2">
                                                    {blog.meta_description || 'Analyse approfondie et documentation technique du processus d\'implémentation.'}
                                                </p>
                                            </div>
                                            <div className="shrink-0 flex items-center">
                                                <div className="w-12 h-12 rounded-full border-2 border-gray-100 dark:border-gray-800 flex items-center justify-center group-hover:bg-blueprint-bluePrimary/10 dark:group-hover:bg-blueprint-cyan/10 transition-colors">
                                                    <svg className="w-5 h-5 text-blueprint-textDark dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            ) : (
                                 <div className="col-span-full border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center font-mono text-gray-500">
                                    [ LOGS_EMPTY ]
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- CONTACT / CTA SECTION --- */}
            <section id="contact" className="py-24 relative overflow-hidden z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="text-center mb-16"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold mb-6 border border-blueprint-bluePrimary/30 dark:border-blueprint-cyan/30 px-4 py-2 bg-blueprint-bluePrimary/5 dark:bg-blueprint-cyan/5">
                            <div className="w-2 h-2 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-ping"></div>
                            CONNEXION SÉCURISÉE
                        </motion.div>
                        <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
                            INITIALISER LE <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">CONTACT</span>
                        </motion.h2>
                        <motion.p variants={fadeInUp} className="font-mono text-sm uppercase tracking-widest text-gray-500 max-w-2xl mx-auto">
                            PRÊT À DÉPLOYER UNE NOUVELLE ARCHITECTURE ? SOUMETTEZ VOS SPÉCIFICATIONS.
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-8 shadow-2xl relative"
                    >
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan -translate-x-px -translate-y-px"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan translate-x-px -translate-y-px"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan -translate-x-px translate-y-px"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan translate-x-px translate-y-px"></div>

                        <form onSubmit={submitContact} className="flex flex-col gap-6">
                            {recentlySuccessful && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="p-4 bg-green-500/10 border border-green-500 text-green-700 dark:text-green-400 font-mono text-xs uppercase tracking-widest flex items-center gap-3"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    STATUS: TRANSMISSION_RÉUSSIE. EN ATTENTE D'ACK.
                                </motion.div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">ID_ENTITÉ (NOM)</label>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)} 
                                        className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-none p-4 font-mono text-sm"
                                        placeholder="Ex: John Doe / Corp Inc."
                                    />
                                    {errors.name && <div className="text-red-500 text-[10px] font-mono mt-2 uppercase">{errors.name}</div>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">END_POINT (EMAIL)</label>
                                    <input 
                                        type="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)} 
                                        className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-none p-4 font-mono text-sm"
                                        placeholder="contact@domaine.com"
                                    />
                                    {errors.email && <div className="text-red-500 text-[10px] font-mono mt-2 uppercase">{errors.email}</div>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">PAYLOAD (CAHIER DES CHARGES / MESSAGE)</label>
                                <textarea 
                                    rows="5" 
                                    value={data.message} 
                                    onChange={e => setData('message', e.target.value)}
                                    className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-none p-4 font-mono text-sm resize-y"
                                    placeholder="Spécifiez les requis techniques ici..."
                                ></textarea>
                                {errors.message && <div className="text-red-500 text-[10px] font-mono mt-2 uppercase">{errors.message}</div>}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full sm:w-auto px-10 py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> COMPILATION...</>
                                    ) : (
                                        <><span className="font-mono">{'>_'}</span> EXECUTER_POST()</>
                                    )}
                                </motion.button>
                                
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button" 
                                    onClick={() => {
                                        setData('platform_origin', 'whatsapp');
                                        window.open('https://wa.me/237676383986?text=Bonjour%20Mr%20Dims,%20je%20souhaite%20discuter%20d\'un%20projet', '_blank');
                                    }}
                                    className="w-full sm:w-auto px-10 py-4 border-2 border-green-500 text-green-600 dark:text-green-400 font-bold text-xs uppercase tracking-widest hover:bg-green-500/10 transition-colors flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.618-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.664.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964 1.003-3.588c-.608-1.033-.926-2.22-.926-3.441 0-4.111 3.346-7.457 7.466-7.457 4.118 0 7.463 3.346 7.463 7.458-.001 4.114-3.345 7.459-7.464 7.459z"/></svg>
                                    WHATSAPP_LINK
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

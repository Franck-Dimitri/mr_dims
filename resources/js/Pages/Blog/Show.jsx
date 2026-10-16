import React, { useState, useEffect, useMemo } from 'react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import SEO from '@/Components/SEO';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { 
    Clock, Eye, Heart, ArrowLeft, ArrowUp, 
    Check, Copy, MessageSquare, Sparkles, Terminal, List, Bookmark
} from 'lucide-react';
import { useLanguage } from '@/Context/LanguageContext';

export default function Show({ blog, recentBlogs = [] }) {
    const { lang } = useLanguage() || { lang: 'fr' };
    const [likeActive, setLikeActive] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

    // Reading progress tracker & back to top visibility
    useEffect(() => {
        const updateScroll = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollHeight > 0) {
                setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
            }
            setShowBackToTop(currentProgress > 500);
        };

        window.addEventListener('scroll', updateScroll);
        return () => window.removeEventListener('scroll', updateScroll);
    }, []);

    // Estimated reading time & word count
    const { wordCount, readingTime } = useMemo(() => {
        const text = (blog.markdown_content || '').trim();
        if (!text) return { wordCount: 0, readingTime: 1 };
        const words = text.split(/\s+/).filter(Boolean).length;
        const time = Math.max(1, Math.ceil(words / 190));
        return { wordCount: words, readingTime: time };
    }, [blog.markdown_content]);

    // Parse Markdown headings for Table of Contents (Sommaire)
    const tableOfContents = useMemo(() => {
        const content = blog.markdown_content || '';
        const lines = content.split('\n');
        const headings = [];
        
        lines.forEach(line => {
            const h2Match = line.match(/^##\s+(.+)$/);
            const h3Match = line.match(/^###\s+(.+)$/);
            if (h2Match) {
                const text = h2Match[1].replace(/[*_`]/g, '').trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                headings.push({ level: 2, text, id });
            } else if (h3Match) {
                const text = h3Match[1].replace(/[*_`]/g, '').trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                headings.push({ level: 3, text, id });
            }
        });

        return headings;
    }, [blog.markdown_content]);

    // Comment form state
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        content: '',
    });

    const submitComment = (e) => {
        e.preventDefault();
        post(route('blog.comment.store', blog.slug), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleLike = () => {
        if (!likeActive) {
            router.post(route('blog.like', blog.slug), {}, {
                preserveScroll: true,
                onSuccess: () => setLikeActive(true),
            });
        }
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = encodeURIComponent(blog.title);
        if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'whatsapp') {
            window.open(`https://api.whatsapp.com/send?text=${title}%20${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2500);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToHeading = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
        }
    };

    // Custom ReactMarkdown renderers for square architectural design
    const markdownComponents = {
        h1: ({ children, ...props }) => (
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-900 dark:text-white mt-12 mb-6 tracking-tight uppercase font-sans border-b border-neutral-200 dark:border-neutral-800 pb-3" {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, ...props }) => {
            const textContent = typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : '');
            const id = textContent ? textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : undefined;
            return (
                <div id={id} className="scroll-mt-28 group pt-6 mt-8 mb-4 border-t border-neutral-200/60 dark:border-neutral-800/80">
                    <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-3 tracking-tight uppercase font-sans" {...props}>
                        <span className="w-2 h-5 bg-cyan-500 rounded-none shrink-0"></span>
                        <span>{children}</span>
                    </h2>
                </div>
            );
        },
        h3: ({ children, ...props }) => {
            const textContent = typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : '');
            const id = textContent ? textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : undefined;
            return (
                <h3 id={id} className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mt-8 mb-3 scroll-mt-28 flex items-center gap-2 font-sans uppercase" {...props}>
                    <span className="text-cyan-500 font-mono text-xs font-bold">//</span>
                    <span>{children}</span>
                </h3>
            );
        },
        p: ({ children, ...props }) => (
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed md:leading-8 mb-6 font-sans font-normal" {...props}>
                {children}
            </p>
        ),
        strong: ({ children, ...props }) => (
            <strong className="font-bold text-neutral-900 dark:text-white bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 rounded-none border border-cyan-500/20" {...props}>
                {children}
            </strong>
        ),
        blockquote: ({ children, ...props }) => (
            <blockquote className="my-8 pl-5 pr-6 py-4 bg-cyan-500/5 border-l-4 border-cyan-500 rounded-none relative italic text-neutral-800 dark:text-neutral-200" {...props}>
                <div className="absolute -top-3 left-4 bg-cyan-600 text-white px-2 py-0.5 rounded-none text-[9px] font-mono font-bold not-italic flex items-center gap-1 uppercase">
                    <Bookmark className="w-3 h-3" /> NOTE ARCHITECTURALE
                </div>
                <div className="pt-2 text-sm sm:text-base leading-relaxed font-medium font-sans">
                    {children}
                </div>
            </blockquote>
        ),
        ul: ({ children, ...props }) => (
            <ul className="space-y-3 mb-6 pl-2" {...props}>
                {children}
            </ul>
        ),
        ol: ({ children, ...props }) => (
            <ol className="list-decimal list-outside space-y-3 mb-6 pl-6 text-neutral-700 dark:text-neutral-300 font-sans" {...props}>
                {children}
            </ol>
        ),
        li: ({ children, ...props }) => (
            <li className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed flex items-start gap-3" {...props}>
                <span className="w-1.5 h-1.5 bg-cyan-500 mt-2.5 shrink-0 rounded-none"></span>
                <span className="flex-1">{children}</span>
            </li>
        ),
        code: ({ node, inline, className, children, ...props }) => {
            if (inline) {
                return (
                    <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-[#151C2C] text-cyan-600 dark:text-cyan-400 font-mono text-xs border border-neutral-200 dark:border-neutral-800 rounded-none font-bold" {...props}>
                        {children}
                    </code>
                );
            }
            return (
                <div className="my-8 rounded-none overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-[#090D16] relative">
                    <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-neutral-800 text-xs font-mono text-neutral-400">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-[11px] uppercase">SNIPPET // ARCHITECTURE</span>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(String(children));
                                setCopiedCodeIndex(String(children).substring(0, 20));
                                setTimeout(() => setCopiedCodeIndex(null), 2000);
                            }}
                            className="flex items-center gap-1 hover:text-white transition-colors text-[11px] font-mono"
                        >
                            {copiedCodeIndex === String(children).substring(0, 20) ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    <span className="text-emerald-400 font-bold">Copié</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copier</span>
                                </>
                            )}
                        </button>
                    </div>
                    <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-neutral-200 leading-relaxed">
                        <code {...props}>{children}</code>
                    </pre>
                </div>
            );
        },
        hr: () => (
            <div className="my-10 border-t border-neutral-200 dark:border-neutral-800"></div>
        ),
        a: ({ href, children, ...props }) => (
            <a 
                href={href} 
                target={href?.startsWith('http') ? '_blank' : '_self'} 
                rel="noopener noreferrer"
                className="text-cyan-600 dark:text-cyan-400 underline decoration-cyan-400/40 underline-offset-4 hover:decoration-cyan-400 font-semibold transition-all"
                {...props}
            >
                {children}
            </a>
        ),
    };

    return (
        <BlueprintLayout>
            <SEO 
                title={`${blog.title} — Blog Tech & Architecture | Franck Dimitri`}
                description={blog.meta_description || (blog.markdown_content ? blog.markdown_content.slice(0, 160).replace(/[#*`_]/g, '').trim() : `Article technique sur ${blog.title}`)}
                keywords={`${blog.title}, Architecture Logicielle, Laravel, React, Tech Blog, Franck Dimitri`}
                image={blog.image || null}
            />

            {/* Barre de progression de lecture */}
            <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
                <div 
                    className="h-full bg-cyan-500 transition-all duration-150 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    style={{ width: `${readingProgress}%` }}
                ></div>
            </div>

            {/* En-tête de l'article */}
            <section className="relative pt-12 pb-12 border-b border-neutral-200/80 dark:border-neutral-800/80 font-sans">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10 w-full">
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        
                        {/* Retour & Métadonnées */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <Link 
                                href="/blog" 
                                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-neutral-500 hover:text-cyan-500 transition-colors"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>Tous les articles</span>
                            </Link>

                            <div className="flex items-center gap-3 text-xs font-mono text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-cyan-500" />
                                    <span>{readingTime} MIN</span>
                                </span>
                                <span>·</span>
                                <span>{new Date(blog.published_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            </div>
                        </div>

                        {/* Titre */}
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 text-neutral-900 dark:text-white leading-[1.2] font-sans uppercase">
                            {blog.title}
                        </h1>

                        {/* Barre d'auteur & Statistiques */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-cyan-500 rounded-none"></span>
                                <span className="font-bold text-neutral-900 dark:text-white uppercase">{blog.author || "Franck Dimitri"}</span>
                                <span>·</span>
                                <span className="uppercase">INGÉNIEUR LOGICIEL</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <Eye className="w-3.5 h-3.5 text-cyan-500" />
                                    <span>{blog.views_count} VUES</span>
                                </span>
                                <span className="flex items-center gap-1 text-rose-500 font-bold">
                                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                                    <span>{blog.likes_count}</span>
                                </span>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* Corps de l'article */}
            <section className="py-12 relative z-10 font-sans">
                <div className="max-w-4xl mx-auto px-5 sm:px-8">
                    
                    {/* Image de couverture carrée */}
                    {blog.image && (
                        <div className="relative w-full aspect-[16/9] overflow-hidden mb-12 border border-neutral-200 dark:border-neutral-800 rounded-none">
                            <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none z-20">+</span>
                            <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none z-20">+</span>
                            <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none z-20">+</span>
                            <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none z-20">+</span>
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover rounded-none" />
                        </div>
                    )}

                    {/* Synthèse éditoriale carrée avec + */}
                    {blog.meta_description && (
                        <div className="relative mb-12 p-6 sm:p-7 rounded-none bg-neutral-50 dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800">
                            <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                            <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                            <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                            <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>

                            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                                <span>SYNTHÈSE EN 30 SECONDES</span>
                            </div>

                            <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed italic font-sans">
                                "{blog.meta_description}"
                            </p>

                            <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                                <span>ANALYSE ÉDITORIALE</span>
                                <span>{wordCount} MOTS</span>
                            </div>
                        </div>
                    )}

                    {/* Sommaire carré avec + */}
                    {tableOfContents.length >= 2 && (
                        <div className="relative mb-12 p-6 rounded-none bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800">
                            <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                            <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                            <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                            <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>

                            <div className="flex items-center gap-2 font-bold font-mono text-xs text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
                                <List className="w-3.5 h-3.5 text-cyan-500" />
                                <span>SOMMAIRE DU DOCUMENT</span>
                            </div>
                            <nav className="space-y-1.5 font-sans">
                                {tableOfContents.map((heading, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToHeading(heading.id)}
                                        className={`w-full text-left flex items-start gap-2 text-xs sm:text-sm transition-colors py-0.5 hover:text-cyan-500 ${
                                            heading.level === 3 
                                                ? 'pl-5 text-neutral-500 dark:text-neutral-400' 
                                                : 'text-neutral-700 dark:text-neutral-200 font-medium'
                                        }`}
                                    >
                                        <span className="text-cyan-500 font-mono text-xs">
                                            {heading.level === 2 ? `[0${idx + 1}]` : '•'}
                                        </span>
                                        <span>{heading.text}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}

                    {/* Markdown Render */}
                    <article className="prose dark:prose-invert max-w-none font-sans">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm, remarkBreaks]} 
                            components={markdownComponents}
                        >
                            {blog.markdown_content}
                        </ReactMarkdown>
                    </article>

                    {/* Barre d'interaction & Partage */}
                    <div className="mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-5 font-mono text-xs">
                        {/* Bouton Like Carré */}
                        <button 
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-5 py-2.5 font-bold uppercase transition-colors rounded-none border ${
                                likeActive 
                                    ? 'bg-rose-500 text-white border-rose-500' 
                                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-rose-500 hover:text-rose-500'
                            }`}
                        >
                            <Heart className={`w-4 h-4 ${likeActive ? 'fill-white' : ''}`} />
                            <span>{likeActive ? 'APPRÉCIÉ' : 'J\'APPRÉCIE CET ARTICLE'}</span>
                            <span className="border-l border-neutral-300 dark:border-neutral-700 pl-2 ml-1">
                                {blog.likes_count + (likeActive ? 1 : 0)}
                            </span>
                        </button>

                        {/* Partage Carré */}
                        <div className="flex items-center gap-2">
                            <span className="text-neutral-400 uppercase">PARTAGER :</span>
                            
                            <button
                                onClick={() => handleShare('linkedin')}
                                className="px-3 py-1.5 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 text-neutral-600 dark:text-neutral-300 hover:text-cyan-500 font-bold uppercase rounded-none transition-colors"
                            >
                                LINKEDIN
                            </button>

                            <button
                                onClick={() => handleShare('whatsapp')}
                                className="px-3 py-1.5 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 font-bold uppercase rounded-none transition-colors"
                            >
                                WHATSAPP
                            </button>

                            <button
                                onClick={() => handleShare('copy')}
                                className="px-3 py-1.5 border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 text-neutral-600 dark:text-neutral-300 hover:text-cyan-500 font-bold uppercase rounded-none transition-colors relative"
                            >
                                {copiedLink ? 'COPIÉ !' : 'LIEN'}
                            </button>
                        </div>
                    </div>

                    {/* Bloc Profil Auteur Carré avec + */}
                    <div className="relative mt-12 p-7 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none flex flex-col sm:flex-row items-center sm:items-start gap-5">
                        <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                        <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                        <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                        <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>

                        <img 
                            src="/profile.jpg" 
                            alt="Franck Dimitri" 
                            className="w-16 h-16 object-cover rounded-none border border-neutral-200 dark:border-neutral-700 grayscale contrast-105 shrink-0"
                        />
                        <div className="flex-1 text-center sm:text-left">
                            <h4 className="font-bold text-base text-neutral-900 dark:text-white uppercase font-sans">
                                Franck Dimitri (Mr Dim's)
                            </h4>
                            <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-2 uppercase">
                                Ingénieur Logiciel & Architecte Web
                            </p>
                            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                                Je conçois des systèmes web robustes, modulaires et performants avec Laravel et React.
                            </p>
                            <div className="mt-3 flex items-center justify-center sm:justify-start gap-4 text-xs font-mono font-bold">
                                <Link href="/contact" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 uppercase">
                                    Me contacter →
                                </Link>
                                <Link href="/projects" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white uppercase">
                                    Voir projets →
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Section Commentaires Carrée */}
            <section className="py-14 bg-neutral-50 dark:bg-[#080C14] border-t border-neutral-200 dark:border-neutral-800 font-sans">
                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    <h3 className="text-xl font-bold tracking-tight mb-8 text-neutral-900 dark:text-white uppercase flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-cyan-500" />
                        <span>Commentaires ({blog.comments?.length || 0})</span>
                    </h3>

                    {/* Liste des commentaires */}
                    <div className="space-y-4 mb-10">
                        {blog.comments && blog.comments.length > 0 ? (
                            blog.comments.map(comment => (
                                <div key={comment.id} className="relative bg-white dark:bg-[#0A0E17] p-5 rounded-none border border-neutral-200 dark:border-neutral-800">
                                    <span className="absolute -top-1 -left-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                    <span className="absolute -top-1 -right-1 text-[8px] font-mono font-bold text-cyan-500">+</span>
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-xs uppercase text-neutral-900 dark:text-white">{comment.name}</h4>
                                        <span className="text-[10px] font-mono text-neutral-400">
                                            {new Date(comment.created_at).toLocaleDateString('fr-FR')}
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                                        {comment.content}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-neutral-400 font-mono text-xs border border-dashed border-neutral-300 dark:border-neutral-800 rounded-none">
                                [ AUCUN COMMENTAIRE ENREGISTRÉ ]
                            </div>
                        )}
                    </div>

                    {/* Formulaire de commentaire */}
                    <div className="relative bg-white dark:bg-[#0A0E17] p-6 sm:p-7 border border-neutral-200 dark:border-neutral-800 rounded-none">
                        <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                        <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                        <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                        <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>

                        <h4 className="font-mono text-xs font-bold uppercase tracking-wider mb-5 text-neutral-900 dark:text-white">
                            // LAISSER UN COMMENTAIRE
                        </h4>
                        
                        {recentlySuccessful && (
                            <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-mono text-xs uppercase tracking-wider rounded-none">
                                [ COMMENTAIRE TRANSMIS ] Merci pour votre retour !
                            </div>
                        )}

                        <form onSubmit={submitComment} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">NOM</label>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 rounded-none px-3 py-2 text-xs text-neutral-900 dark:text-white focus:border-cyan-500 focus:ring-0 font-sans"
                                        placeholder="Ex: Paul"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 font-mono">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">EMAIL (CONFIDENTIEL)</label>
                                    <input 
                                        type="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 rounded-none px-3 py-2 text-xs text-neutral-900 dark:text-white focus:border-cyan-500 focus:ring-0 font-sans"
                                        placeholder="paul@example.com"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 font-mono">{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-mono font-bold uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">MESSAGE</label>
                                <textarea 
                                    rows="3" 
                                    value={data.content} 
                                    onChange={e => setData('content', e.target.value)}
                                    className="w-full bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 rounded-none px-3 py-2 text-xs text-neutral-900 dark:text-white focus:border-cyan-500 focus:ring-0 resize-none font-sans"
                                    placeholder="Partagez vos réflexions..."
                                    required
                                ></textarea>
                                {errors.content && <p className="text-red-500 text-xs mt-1 font-mono">{errors.content}</p>}
                            </div>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors rounded-none disabled:opacity-50"
                            >
                                {processing ? 'TRANSMISSION...' : 'PUBLIER →'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

import React, { useState, useEffect, useMemo } from 'react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { 
    Clock, BookOpen, Eye, Heart, Share2, ArrowLeft, ArrowUp, 
    Check, Copy, MessageSquare, Sparkles, Terminal, List, Bookmark
} from 'lucide-react';

export default function Show({ blog, recentBlogs }) {
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
            setShowBackToTop(currentProgress > 400);
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

    // Custom ReactMarkdown renderers for high-impact visual design
    const markdownComponents = {
        h1: ({ children, ...props }) => (
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-12 mb-6 tracking-tight font-sans border-b border-gray-200 dark:border-gray-800 pb-3" {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, ...props }) => {
            const textContent = typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : '');
            const id = textContent ? textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : undefined;
            return (
                <div id={id} className="scroll-mt-28 group pt-6 mt-8 mb-4 border-t border-gray-200/60 dark:border-gray-800/80">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 tracking-tight font-sans" {...props}>
                        <span className="w-2.5 h-6 rounded-xs bg-blueprint-bluePrimary dark:bg-blueprint-cyan shrink-0"></span>
                        <span>{children}</span>
                    </h2>
                </div>
            );
        },
        h3: ({ children, ...props }) => {
            const textContent = typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : '');
            const id = textContent ? textContent.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') : undefined;
            return (
                <h3 id={id} className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-3 scroll-mt-28 flex items-center gap-2 font-sans" {...props}>
                    <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan font-mono text-sm font-bold">//</span>
                    <span>{children}</span>
                </h3>
            );
        },
        p: ({ children, ...props }) => (
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed md:leading-8 mb-6 font-sans font-normal" {...props}>
                {children}
            </p>
        ),
        strong: ({ children, ...props }) => (
            <strong className="font-bold text-slate-900 dark:text-white bg-blueprint-cyan/15 dark:bg-blueprint-cyan/20 text-blueprint-bluePrimary dark:text-cyan-300 px-1.5 py-0.5 rounded border border-blueprint-cyan/30 shadow-xs" {...props}>
                {children}
            </strong>
        ),
        blockquote: ({ children, ...props }) => (
            <blockquote className="my-8 pl-5 pr-6 py-4 bg-blueprint-bluePrimary/5 dark:bg-blueprint-cyan/5 border-l-4 border-blueprint-bluePrimary dark:border-blueprint-cyan rounded-r-2xl relative italic text-slate-800 dark:text-slate-200" {...props}>
                <div className="absolute -top-3 left-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-slate-950 p-1 rounded-md text-[10px] font-mono font-bold not-italic flex items-center gap-1 shadow-sm">
                    <Bookmark className="w-3 h-3" /> NOTE CLÉ
                </div>
                <div className="pt-2 text-base md:text-lg leading-relaxed font-medium">
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
            <ol className="list-decimal list-outside space-y-3 mb-6 pl-6 text-slate-700 dark:text-slate-300" {...props}>
                {children}
            </ol>
        ),
        li: ({ children, ...props }) => (
            <li className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-3" {...props}>
                <span className="w-2 h-2 rounded-full bg-blueprint-cyan mt-2.5 shrink-0 shadow-xs"></span>
                <span className="flex-1">{children}</span>
            </li>
        ),
        code: ({ node, inline, className, children, ...props }) => {
            if (inline) {
                return (
                    <code className="px-2 py-0.5 bg-gray-100 dark:bg-[#151C2C] text-blueprint-bluePrimary dark:text-blueprint-cyan rounded font-mono text-sm border border-gray-200 dark:border-gray-800 font-semibold" {...props}>
                        {children}
                    </code>
                );
            }
            return (
                <div className="my-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl bg-[#090D16]">
                    <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/90 border-b border-gray-800 text-xs font-mono text-gray-400">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-blueprint-cyan" />
                            <span>terminal / code snippet</span>
                        </div>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(String(children));
                                setCopiedCodeIndex(String(children).substring(0, 20));
                                setTimeout(() => setCopiedCodeIndex(null), 2000);
                            }}
                            className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                            {copiedCodeIndex === String(children).substring(0, 20) ? (
                                <>
                                    <Check className="w-3.5 h-3.5 text-green-400" />
                                    <span className="text-green-400 font-bold">Copié</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copier</span>
                                </>
                            )}
                        </button>
                    </div>
                    <pre className="p-5 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed custom-scrollbar">
                        <code {...props}>{children}</code>
                    </pre>
                </div>
            );
        },
        hr: () => (
            <div className="my-12 flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-800 to-transparent"></div>
                <span className="w-2 h-2 rounded-xs bg-blueprint-cyan rotate-45"></span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-800 to-transparent"></div>
            </div>
        ),
        a: ({ href, children, ...props }) => (
            <a 
                href={href} 
                target={href?.startsWith('http') ? '_blank' : '_self'} 
                rel="noopener noreferrer"
                className="text-blueprint-bluePrimary dark:text-blueprint-cyan underline decoration-blueprint-cyan/40 underline-offset-4 hover:decoration-blueprint-cyan font-semibold transition-all"
                {...props}
            >
                {children}
            </a>
        ),
    };

    return (
        <BlueprintLayout>
            <Head title={`${blog.title} - Blog Tech & Architecture`} />

            {/* Sticky Reading Progress Bar at the very top */}
            <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-transparent">
                <div 
                    className="h-full bg-gradient-to-r from-blueprint-bluePrimary via-cyan-400 to-blueprint-cyan transition-all duration-150 shadow-[0_0_12px_rgba(0,217,255,0.6)]"
                    style={{ width: `${readingProgress}%` }}
                ></div>
            </div>

            {/* HEADER HERO */}
            <section className="relative pt-32 pb-16 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 overflow-hidden bg-gradient-to-b from-gray-50/50 to-white dark:from-[#0B0F19] dark:to-[#070A10]">
                {blog.image && (
                    <div className="absolute inset-0 z-0">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-white/92 dark:bg-[#070A10]/95 backdrop-blur-md"></div>
                    </div>
                )}
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        
                        {/* Back link & Meta Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <Link 
                                href="/blog" 
                                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Tous les articles
                            </Link>

                            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1 rounded-full text-gray-600 dark:text-gray-300">
                                    <Clock className="w-3.5 h-3.5 text-blueprint-cyan" />
                                    <span>{readingTime} min de lecture</span>
                                </span>
                                <span className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1 rounded-full text-gray-500">
                                    {new Date(blog.published_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight mb-6 text-slate-900 dark:text-white leading-tight font-sans">
                            {blog.title}
                        </h1>

                        {/* Author & Stats bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200/80 dark:border-gray-800/80 text-xs font-mono text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-slate-950 flex items-center justify-center font-bold text-xs">
                                    FD
                                </div>
                                <span className="font-bold text-slate-800 dark:text-slate-200">{blog.author || "Franck Dimitri (Mr Dim's)"}</span>
                                <span>•</span>
                                <span>Software Engineer</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <Eye className="w-4 h-4 text-blueprint-cyan" />
                                    <span>{blog.views_count} lectures</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-pink-500">
                                    <Heart className="w-4 h-4 fill-pink-500" />
                                    <span>{blog.likes_count} appréciations</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* MAIN CONTENT SECTION */}
            <section className="py-12 relative z-10 bg-white dark:bg-[#070A10]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Cover image if available */}
                    {blog.image && (
                        <div className="w-full h-[320px] md:h-[440px] rounded-2xl overflow-hidden shadow-2xl mb-12 relative border border-gray-200 dark:border-gray-800">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* KEY TAKEAWAYS (TL;DR) BOX - Solves the "c'est trop long / sans structure" */}
                    {blog.meta_description && (
                        <div className="mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blueprint-bluePrimary/5 via-cyan-500/5 to-transparent border border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/30 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blueprint-cyan/10 rounded-full blur-2xl pointer-events-none"></div>
                            
                            <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest font-black text-blueprint-bluePrimary dark:text-blueprint-cyan mb-3">
                                <Sparkles className="w-4 h-4 text-blueprint-cyan" />
                                <span>L'Essentiel en 30 Secondes</span>
                            </div>

                            <p className="text-base md:text-lg text-slate-800 dark:text-slate-200 font-medium leading-relaxed italic">
                                "{blog.meta_description}"
                            </p>

                            <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-800/80 flex items-center justify-between text-xs font-mono text-gray-500">
                                <span>Synthèse éditoriale</span>
                                <span>{wordCount} mots analysés</span>
                            </div>
                        </div>
                    )}

                    {/* TABLE OF CONTENTS (SOMMAIRE) - Only if multiple sections */}
                    {tableOfContents.length >= 2 && (
                        <div className="mb-12 p-6 rounded-2xl bg-gray-50 dark:bg-[#0E131F] border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                                <List className="w-4 h-4 text-blueprint-cyan" />
                                <span>Sommaire de l'article</span>
                            </div>
                            <nav className="space-y-2">
                                {tableOfContents.map((heading, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToHeading(heading.id)}
                                        className={`w-full text-left flex items-start gap-2 text-sm transition-colors py-1 hover:text-blueprint-cyan ${
                                            heading.level === 3 
                                                ? 'pl-6 text-gray-500 dark:text-gray-400 font-normal' 
                                                : 'text-gray-700 dark:text-gray-200 font-medium'
                                        }`}
                                    >
                                        <span className="text-blueprint-cyan font-mono text-xs mt-0.5">
                                            {heading.level === 2 ? `0${idx + 1}.` : '•'}
                                        </span>
                                        <span className="hover:underline underline-offset-2">{heading.text}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}

                    {/* RICH MARKDOWN BODY */}
                    <article className="prose prose-slate dark:prose-invert max-w-none font-sans">
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm, remarkBreaks]} 
                            components={markdownComponents}
                        >
                            {blog.markdown_content}
                        </ReactMarkdown>
                    </article>

                    {/* BOTTOM ENGAGEMENT & SHARING BAR */}
                    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                        
                        {/* Like button */}
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleLike}
                                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-md active:scale-95 ${
                                    likeActive 
                                    ? 'bg-pink-500 text-white shadow-pink-500/30' 
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${likeActive ? 'fill-white' : ''}`} />
                                <span>{likeActive ? 'Apprécié !' : "J'apprécie cet article"}</span>
                                <span className="bg-white/20 dark:bg-black/20 px-2 py-0.5 rounded-full text-xs font-mono ml-1">
                                    {blog.likes_count + (likeActive ? 1 : 0)}
                                </span>
                            </button>
                        </div>

                        {/* Social Share Icons */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 mr-2">Partager :</span>
                            
                            <button
                                onClick={() => handleShare('linkedin')}
                                title="Partager sur LinkedIn"
                                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/80 hover:bg-[#0077B5] hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all"
                            >
                                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </button>

                            <button
                                onClick={() => handleShare('twitter')}
                                title="Partager sur X"
                                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/80 hover:bg-black hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all"
                            >
                                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </button>

                            <button
                                onClick={() => handleShare('whatsapp')}
                                title="Partager sur WhatsApp"
                                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/80 hover:bg-green-600 hover:text-white text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all"
                            >
                                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            </button>

                            <button
                                onClick={() => handleShare('copy')}
                                title="Copier le lien"
                                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800/80 hover:bg-blueprint-cyan hover:text-slate-950 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all relative"
                            >
                                {copiedLink ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                {copiedLink && (
                                    <span className="absolute -top-8 bg-slate-900 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
                                        Copié !
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Author Box */}
                    <div className="mt-12 p-8 rounded-2xl bg-gray-50 dark:bg-[#0E131F] border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blueprint-bluePrimary to-blueprint-cyan text-white dark:text-slate-950 font-black text-xl flex items-center justify-center shrink-0 shadow-lg">
                            FD
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white">
                                Franck Dimitri (Mr Dim's)
                            </h4>
                            <p className="text-xs font-mono text-blueprint-bluePrimary dark:text-blueprint-cyan mb-2">
                                Ingénieur Logiciel Full-Stack & Concepteur d'Architectures Web
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                Je conçois des plateformes web robustes, performantes et scalables avec Laravel, React et les technologies modernes du cloud. Passionné par l'artisanat du code et les défis techniques du continent africain.
                            </p>
                            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                                <Link href="/contact" className="text-xs font-bold text-blueprint-cyan hover:underline">
                                    Me contacter pour un projet →
                                </Link>
                                <Link href="/projects" className="text-xs font-bold text-gray-500 hover:text-gray-300">
                                    Voir mes réalisations →
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* COMMENTS SECTION */}
            <section className="py-16 bg-[#F9FAFB] dark:bg-[#0B0F19] border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white uppercase flex items-center gap-3">
                        <MessageSquare className="w-6 h-6 text-blueprint-cyan" />
                        <span>Discussions & Retours ({blog.comments?.length || 0})</span>
                    </h3>

                    {/* Comments List */}
                    <div className="space-y-6 mb-12">
                        {blog.comments && blog.comments.length > 0 ? (
                            blog.comments.map(comment => (
                                <div key={comment.id} className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-blueprint-cyan/10 text-blueprint-cyan font-bold text-xs flex items-center justify-center uppercase">
                                            {comment.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900 dark:text-white">{comment.name}</h4>
                                            <p className="text-[10px] font-mono text-gray-400">
                                                {new Date(comment.created_at).toLocaleString('fr-FR')}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 pl-11 leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-500 font-mono text-sm border border-dashed border-gray-300 dark:border-gray-800 rounded-2xl">
                                [ AUCUN COMMENTAIRE ENREGISTRÉ POUR L'INSTANT ]
                            </div>
                        )}
                    </div>

                    {/* Leave a Comment Form */}
                    <div className="bg-white dark:bg-[#111827] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg">
                        <h4 className="font-bold uppercase tracking-wider mb-6 flex items-center gap-2 text-slate-900 dark:text-white text-sm">
                            <span className="w-2 h-2 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></span>
                            Participer à la discussion
                        </h4>
                        
                        {recentlySuccessful && (
                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500 text-green-700 dark:text-green-400 font-mono text-xs uppercase tracking-widest rounded-xl flex items-center gap-2">
                                <Check className="w-4 h-4" />
                                Votre message a été transmis avec succès.
                            </div>
                        )}

                        <form onSubmit={submitComment} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">VOTRE NOM</label>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-[#070A10] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-cyan"
                                        placeholder="Ex: Alexandre"
                                        required
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">VOTRE EMAIL (NON PUBLIÉ)</label>
                                    <input 
                                        type="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-[#070A10] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-cyan"
                                        placeholder="alexandre@example.com"
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">VOTRE COMMENTAIRE</label>
                                <textarea 
                                    rows="4" 
                                    value={data.content} 
                                    onChange={e => setData('content', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-[#070A10] border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-cyan"
                                    placeholder="Partagez vos réflexions ou posez une question technique..."
                                    required
                                ></textarea>
                                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                            </div>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full sm:w-auto px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-all rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {processing ? 'TRANSMISSION...' : 'PUBLIER LE COMMENTAIRE'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Floating Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={scrollToTop}
                        title="Retour en haut"
                        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-2xl bg-slate-900/90 dark:bg-slate-800/90 text-white border border-gray-700 shadow-xl backdrop-blur-md flex items-center justify-center hover:border-blueprint-cyan hover:text-blueprint-cyan transition-all"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>
        </BlueprintLayout>
    );
}

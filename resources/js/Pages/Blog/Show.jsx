import React, { useState } from 'react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function Show({ blog, recentBlogs }) {
    const [likeActive, setLikeActive] = useState(false);

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

    return (
        <BlueprintLayout>
            <Head title={`${blog.title} - Blog`} />

            {/* HEADER HERO */}
            <section className="relative pt-32 pb-20 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 overflow-hidden min-h-[50vh] flex items-center">
                {/* Background Image with Overlay */}
                {blog.image && (
                    <div className="absolute inset-0 z-0">
                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-white/90 dark:bg-[#070A10]/90 backdrop-blur-sm"></div>
                    </div>
                )}
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        
                        {/* Meta Top */}
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-6 text-[10px] font-mono tracking-widest uppercase font-bold text-gray-500">
                            <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 px-3 py-1.5 rounded-full">
                                <svg className="w-3.5 h-3.5 text-blueprint-bluePrimary dark:text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                {new Date(blog.published_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 px-3 py-1.5 rounded-full">
                                <svg className="w-3.5 h-3.5 text-blueprint-bluePrimary dark:text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                {blog.author || 'MR DIMS'}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 text-blueprint-textDark dark:text-white leading-tight">
                            {blog.title}
                        </h1>

                        {/* Meta Stats */}
                        <div className="flex justify-center items-center gap-8 font-mono text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                <span>{blog.views_count} <span className="uppercase text-[10px] tracking-wider ml-1">Lectures</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                <span>{blog.likes_count} <span className="uppercase text-[10px] tracking-wider ml-1">Appréciations</span></span>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* CONTENT SECTION */}
            <section className="py-16 relative z-10 bg-white dark:bg-[#070A10]">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Cover Image in content if exists */}
                    {blog.image && (
                        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl mb-12 -mt-32 relative z-20 border-4 border-white dark:border-[#0B0F19]">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    {/* Markdown Content */}
                    <div className="prose prose-lg dark:prose-invert prose-blueprint max-w-none font-sans leading-relaxed">
                        <ReactMarkdown>{blog.markdown_content}</ReactMarkdown>
                    </div>

                    {/* Engagement Actions */}
                    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                        <Link href="/blog" className="flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                            Retour aux logs
                        </Link>

                        <button 
                            onClick={handleLike}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase transition-all shadow-lg ${
                                likeActive 
                                ? 'bg-pink-500 text-white shadow-pink-500/30' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        >
                            <svg className={`w-5 h-5 ${likeActive ? 'fill-white' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            {likeActive ? 'Approuvé' : 'Approuver'}
                            <span className="bg-white/20 dark:bg-black/20 px-2 py-0.5 rounded-full ml-1">{blog.likes_count + (likeActive ? 1 : 0)}</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* COMMENTS SECTION */}
            <section className="py-16 bg-[#F9FAFB] dark:bg-[#0B0F19] border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-bold tracking-tight mb-8 text-blueprint-textDark dark:text-white uppercase flex items-center gap-3">
                        <svg className="w-6 h-6 text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                        Transmissions ({blog.comments?.length || 0})
                    </h3>

                    {/* Comments List */}
                    <div className="space-y-6 mb-12">
                        {blog.comments && blog.comments.length > 0 ? (
                            blog.comments.map(comment => (
                                <div key={comment.id} className="bg-white dark:bg-[#111827] p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-500 uppercase">
                                            {comment.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-900 dark:text-white">{comment.name}</h4>
                                            <p className="text-[10px] font-mono text-gray-400">
                                                {new Date(comment.created_at).toLocaleString('fr-FR')}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 pl-11">
                                        {comment.content}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-500 font-mono text-sm border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                                [ AUCUN MESSAGE DANS LE CANAL ]
                            </div>
                        )}
                    </div>

                    {/* Leave a Comment Form */}
                    <div className="bg-white dark:bg-[#111827] p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg">
                        <h4 className="font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></span>
                            Ouvrir un canal de discussion
                        </h4>
                        
                        {recentlySuccessful && (
                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500 text-green-700 dark:text-green-400 font-mono text-xs uppercase tracking-widest rounded flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                Message transmis avec succès.
                            </div>
                        )}

                        <form onSubmit={submitComment} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">IDENTIFIANT</label>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-[#070A10] border border-gray-200 dark:border-gray-800 rounded px-4 py-3 text-sm focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-cyan"
                                        placeholder="Votre nom"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">EMAIL (SECRET)</label>
                                    <input 
                                        type="email" 
                                        value={data.email} 
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-[#070A10] border border-gray-200 dark:border-gray-800 rounded px-4 py-3 text-sm focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-cyan"
                                        placeholder="votre@email.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">MESSAGE PAYLOAD</label>
                                <textarea 
                                    rows="4" 
                                    value={data.content} 
                                    onChange={e => setData('content', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-[#070A10] border border-gray-200 dark:border-gray-800 rounded px-4 py-3 text-sm focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-cyan"
                                    placeholder="Rédigez votre retour ici..."
                                ></textarea>
                                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                            </div>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="w-full md:w-auto px-8 py-3 bg-blueprint-textDark dark:bg-white text-white dark:text-gray-900 font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {processing ? 'TRANSMISSION...' : 'ENVOYER LE MESSAGE'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Index({ blogs, stats, recentComments }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [currentBlog, setCurrentBlog] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        title: '',
        markdown_content: '',
        meta_description: '',
        status: 'draft',
        image: null,
        new_image: null,
    });

    const openCreateModal = () => {
        setModalMode('create');
        setCurrentBlog(null);
        reset();
        clearErrors();
        setData('_method', 'POST');
        setIsModalOpen(true);
    };

    const openEditModal = (blog) => {
        setModalMode('edit');
        setCurrentBlog(blog);
        clearErrors();
        setData({
            _method: 'PUT',
            title: blog.title || '',
            markdown_content: blog.markdown_content || '',
            meta_description: blog.meta_description || '',
            status: blog.status || 'draft',
            image: null,
            new_image: null,
        });
        setImagePreview(blog.image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setImagePreview(null);
        reset();
        clearErrors();
    };

    const submit = (e) => {
        e.preventDefault();
        const endpoint = modalMode === 'create' 
            ? route('admin.blogs.store') 
            : route('admin.blogs.update', currentBlog.id);

        post(endpoint, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => closeModal()
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (modalMode === 'create') setData('image', file);
            else setData('new_image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
            router.delete(route('admin.blogs.destroy', id), { preserveScroll: true });
        }
    };

    const handleDeleteComment = (id) => {
        if (confirm("Supprimer ce commentaire ?")) {
            router.delete(route('admin.blogs.comments.destroy', id), { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout header="Gestion du Blog">
            <Head title="Blogs - SYS_CTRL" />

            <div className="w-full mx-auto space-y-6">
                
                {/* Header */}
                <div className="flex justify-between items-center bg-[#111827] border border-gray-800 p-5 rounded-xl shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blueprint-bluePrimary to-purple-500"></div>
                    <div className="z-10">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0012.586 3H5" /></svg>
                            Centre de Publication
                        </h2>
                        <p className="text-xs font-mono text-gray-400 mt-1">Gérez vos articles, analysez l'engagement et modérez les commentaires.</p>
                    </div>
                    <button onClick={openCreateModal} className="z-10 bg-gradient-to-r from-blueprint-bluePrimary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold px-4 py-2 rounded-md shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2 hover:scale-105">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        NOUVEL ARTICLE
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {[
                        { label: 'Total Articles', value: stats?.total || 0, color: 'text-gray-400', bg: 'from-gray-800 to-gray-900' },
                        { label: 'Articles Publiés', value: stats?.published || 0, color: 'text-green-400', bg: 'from-gray-800 to-gray-900' },
                        { label: 'Vues Globales', value: stats?.views || 0, color: 'text-blueprint-cyan', bg: 'from-gray-800 to-gray-900' },
                        { label: 'Mentions J\'aime', value: stats?.likes || 0, color: 'text-pink-400', bg: 'from-gray-800 to-gray-900' },
                        { label: 'Commentaires', value: stats?.comments || 0, color: 'text-purple-400', bg: 'from-gray-800 to-gray-900' },
                    ].map((stat, idx) => (
                        <div key={idx} className={`bg-gradient-to-br ${stat.bg} border border-gray-800 p-4 rounded-xl shadow-md relative overflow-hidden group hover:border-gray-700 transition-all`}>
                            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
                            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 relative z-10">{stat.label}</h3>
                            <p className={`text-3xl font-black ${stat.color} relative z-10`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Middle Section: Graph & Comments */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Graph Div (Mocked) */}
                    <div className="lg:col-span-2 bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <svg className="w-4 h-4 text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                                Évolution de l'engagement
                            </h3>
                        </div>
                        <div className="h-48 flex items-end justify-between gap-2 px-2 pb-2 border-b border-gray-800 relative">
                            {/* Simple CSS Bar Chart for Visual effect */}
                            {[40, 70, 45, 90, 65, 85, 120, 95, 60, 110, 80, 130].map((h, i) => (
                                <div key={i} className="w-full relative group flex flex-col justify-end h-full">
                                    <div 
                                        className="w-full bg-gradient-to-t from-blueprint-bluePrimary/20 to-blueprint-cyan rounded-t-sm transition-all duration-500 group-hover:brightness-125" 
                                        style={{ height: `${(h/130)*100}%` }}
                                    ></div>
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded shadow-lg pointer-events-none transition-opacity whitespace-nowrap z-10">
                                        {h} intéractions
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono">
                            <span>Jan</span><span>Fev</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span><span>Jui</span><span>Aou</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                    </div>

                    {/* Recent Comments */}
                    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 shadow-sm flex flex-col max-h-[300px]">
                        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4 shrink-0">
                            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            Derniers Commentaires
                        </h3>
                        <div className="overflow-y-auto pr-2 space-y-3 flex-1 custom-scrollbar">
                            {recentComments?.length === 0 ? (
                                <div className="text-xs text-gray-500 text-center py-4">Aucun commentaire pour le moment.</div>
                            ) : (
                                recentComments?.map(comment => (
                                    <div key={comment.id} className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 hover:border-gray-600 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <span className="text-xs font-bold text-gray-300">{comment.name}</span>
                                                <span className="text-[9px] text-gray-500 ml-2">sur {comment.blog?.title || 'Article supprimé'}</span>
                                            </div>
                                            <button onClick={() => handleDeleteComment(comment.id)} className="text-gray-500 hover:text-red-400">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                        <p className="text-[11px] text-gray-400 line-clamp-2">{comment.content}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Blog Cards Grid */}
                <h3 className="text-lg font-bold text-white mt-8 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blueprint-bluePrimary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0012.586 3H5" /></svg>
                    Bibliothèque d'articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {blogs.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-gray-500 font-mono bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800">
                            Aucun article rédigé.
                        </div>
                    ) : (
                        blogs.map((blog) => (
                            <div key={blog.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col group hover:border-blueprint-bluePrimary/50 transition-all duration-300">
                                <div className="h-40 w-full relative overflow-hidden bg-gray-900 border-b border-gray-800">
                                    {blog.image ? (
                                        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700 bg-gray-800">
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    )}
                                    <div className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-1 rounded backdrop-blur-md shadow flex items-center gap-1 ${blog.status === 'published' ? 'bg-green-500/80 text-white' : 'bg-orange-500/80 text-white'}`}>
                                        {blog.status === 'published' ? 'PUBLIÉ' : 'BROUILLON'}
                                    </div>
                                </div>
                                
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 mb-2 text-base group-hover:text-blueprint-cyan transition-colors" title={blog.title}>{blog.title}</h3>
                                    
                                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed flex-1">
                                        {blog.meta_description || "Aucune description meta."}
                                    </p>

                                    {/* Metrics */}
                                    <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-4 bg-gray-800/30 p-2 rounded-lg">
                                        <div className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> {blog.views_count}</div>
                                        <div className="flex items-center gap-1"><svg className="w-3.5 h-3.5 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> {blog.likes_count}</div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                                        <span className="text-[9px] font-mono text-gray-500">Ajouté le {new Date(blog.created_at).toLocaleDateString()}</span>
                                        <div className="flex items-center gap-1.5">
                                            {blog.status === 'published' && (
                                                <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-md flex items-center justify-center bg-gray-800 text-gray-400 hover:text-blueprint-cyan transition-colors" title="Voir l'article">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                </a>
                                            )}
                                            <button onClick={() => openEditModal(blog)} className="w-7 h-7 rounded-md flex items-center justify-center bg-gray-800 text-gray-400 hover:text-blueprint-bluePrimary transition-colors" title="Éditer">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button onClick={() => handleDelete(blog.id)} className="w-7 h-7 rounded-md flex items-center justify-center bg-gray-800 text-gray-400 hover:text-red-400 transition-colors" title="Supprimer">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="3xl">
                <div className="bg-[#111827] rounded-xl shadow-2xl overflow-hidden border border-gray-800">
                    <div className="flex justify-between items-center p-5 border-b border-gray-800 bg-gray-900/50">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            {modalMode === 'create' ? 'Rédiger un nouvel article' : 'Éditer l\'article'}
                        </h2>
                        <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="p-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                        <form id="blogForm" onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">Titre de l'article</label>
                                    <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-sm text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors" placeholder="Ex: L'importance de l'architecture logicielle..." />
                                    {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
                                </div>

                                <div className="md:col-span-2 border-2 border-dashed border-gray-700 rounded-xl p-6 text-center bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                                    <label className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">Image de couverture</label>
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blueprint-bluePrimary/20 file:text-blueprint-cyan hover:file:bg-blueprint-bluePrimary/30 cursor-pointer mx-auto max-w-sm" />
                                    {errors.image && <p className="text-red-400 text-xs mt-2">{errors.image}</p>}
                                    {errors.new_image && <p className="text-red-400 text-xs mt-2">{errors.new_image}</p>}
                                    
                                    {imagePreview && (
                                        <div className="mt-4 flex justify-center">
                                            <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-gray-600 shadow-lg">
                                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide">Meta Description (SEO)</label>
                                    <textarea value={data.meta_description} onChange={e => setData('meta_description', e.target.value)} rows="2" className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-sm text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan" placeholder="Brève description pour les moteurs de recherche..."></textarea>
                                    {errors.meta_description && <p className="text-red-400 text-xs mt-1">{errors.meta_description}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-wide flex justify-between items-center">
                                        <span>Contenu de l'article (Markdown)</span>
                                        <span className="text-[9px] text-gray-500 font-normal">Supporte le Markdown (## Titres, **Gras**, etc.)</span>
                                    </label>
                                    <textarea value={data.markdown_content} onChange={e => setData('markdown_content', e.target.value)} rows="12" className="w-full font-mono bg-gray-900 border border-gray-700 rounded-md px-4 py-3 text-sm text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan custom-scrollbar leading-relaxed" placeholder="## Introduction..."></textarea>
                                    {errors.markdown_content && <p className="text-red-400 text-xs mt-1">{errors.markdown_content}</p>}
                                </div>

                                <div className="md:col-span-2 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                                    <label className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-wide">Statut de publication</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input type="radio" value="draft" checked={data.status === 'draft'} onChange={e => setData('status', e.target.value)} className="text-orange-500 focus:ring-orange-500 bg-gray-900 border-gray-600" />
                                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Brouillon</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input type="radio" value="published" checked={data.status === 'published'} onChange={e => setData('status', e.target.value)} className="text-green-500 focus:ring-green-500 bg-gray-900 border-gray-600" />
                                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Publié en ligne</span>
                                        </label>
                                    </div>
                                    {errors.status && <p className="text-red-400 text-xs mt-1">{errors.status}</p>}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="flex justify-end p-5 border-t border-gray-800 bg-gray-900/50 gap-3">
                        <button type="button" onClick={closeModal} className="px-5 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">ANNULER</button>
                        <button type="submit" form="blogForm" disabled={processing} className="bg-gradient-to-r from-blueprint-bluePrimary to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold px-8 py-2.5 rounded-md shadow-lg transition-all disabled:opacity-50">
                            {processing ? 'EN COURS...' : (modalMode === 'create' ? 'PUBLIER L\'ARTICLE' : 'ENREGISTRER LES MODIFICATIONS')}
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

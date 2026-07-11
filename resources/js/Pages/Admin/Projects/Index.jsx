import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';

export default function Index({ projects, stats }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
    const [currentProject, setCurrentProject] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'POST',
        title: '',
        excerpt: '',
        description_markdown: '',
        tech_stack: '',
        repository_url: '',
        live_url: '',
        is_featured: false,
        development_time: '',
        images: [],
        new_images: []
    });

    const openCreateModal = () => {
        setModalMode('create');
        setCurrentProject(null);
        reset();
        clearErrors();
        setData('_method', 'POST');
        setIsModalOpen(true);
    };

    const openEditModal = (project) => {
        setModalMode('edit');
        setCurrentProject(project);
        clearErrors();
        setData({
            _method: 'PUT',
            title: project.title || '',
            excerpt: project.excerpt || '',
            description_markdown: project.description_markdown || '',
            tech_stack: project.tech_stack ? project.tech_stack.join(', ') : '',
            repository_url: project.repository_url || '',
            live_url: project.live_url || '',
            is_featured: project.is_featured || false,
            development_time: project.development_time || '',
            images: [],
            new_images: []
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setImagePreviews([]);
        reset();
        clearErrors();
    };

    const submit = (e) => {
        e.preventDefault();
        
        const endpoint = modalMode === 'create' 
            ? route('admin.projects.store') 
            : route('admin.projects.update', currentProject.id);

        post(endpoint, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            }
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        if (modalMode === 'create') {
            const updatedFiles = [...data.images, ...files].slice(0, 4);
            setData('images', updatedFiles);
            setImagePreviews(updatedFiles.map(file => URL.createObjectURL(file)));
        } else {
            const updatedFiles = [...data.new_images, ...files].slice(0, 4);
            setData('new_images', updatedFiles);
            setImagePreviews(updatedFiles.map(file => URL.createObjectURL(file)));
        }
        e.target.value = null;
    };

    const removeImage = (index) => {
        if (modalMode === 'create') {
            const updatedFiles = data.images.filter((_, i) => i !== index);
            setData('images', updatedFiles);
            setImagePreviews(updatedFiles.map(file => URL.createObjectURL(file)));
        } else {
            const updatedFiles = data.new_images.filter((_, i) => i !== index);
            setData('new_images', updatedFiles);
            setImagePreviews(updatedFiles.map(file => URL.createObjectURL(file)));
        }
    };

    const handleDelete = (id) => {
        if (confirm("Voulez-vous vraiment supprimer ce projet ? Cette action est irréversible.")) {
            router.delete(route('admin.projects.destroy', id), {
                preserveScroll: true
            });
        }
    };

    return (
        <AuthenticatedLayout header="Gestion des Projets">
            <Head title="Projets - SYS_CTRL" />

            <div className="w-full mx-auto space-y-6">
                
                {/* En-tête */}
                <div className="flex justify-between items-center bg-[#111827] border border-gray-800 p-5 rounded-xl shadow-sm">
                    <div>
                        <h2 className="text-lg font-bold text-white">Inventaire des Projets</h2>
                        <p className="text-xs font-mono text-gray-400 mt-1">Gérez vos réalisations, analysez les vues et mettez à jour votre stack.</p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="bg-blueprint-bluePrimary hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        NOUVEAU PROJET
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Projets', value: stats?.total || 0, change: 'Inventaire global', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'text-gray-500' },
                        { label: 'Mis en avant', value: stats?.featured || 0, change: 'Visibles Accueil', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'text-yellow-500' },
                        { label: 'Vues (Projets)', value: stats?.views || 0, change: 'Total Tracking', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', color: 'text-blueprint-bluePrimary dark:text-[#5C3AFF]' },
                        { label: 'Ajoutés Récemment', value: stats?.recent || 0, change: '30 derniers jours', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-green-500' },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-4 rounded-xl shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-md bg-gray-50 dark:bg-gray-800 ${stat.color}`}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={stat.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</h3>
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-[10px] font-medium text-gray-400">
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grille des Projets */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.length === 0 ? (
                        <div className="col-span-full py-12 text-center text-gray-500 font-mono bg-white dark:bg-[#111827] rounded-xl border border-gray-100 dark:border-gray-800">
                            Aucun projet dans la base de données.
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col group hover:border-blueprint-bluePrimary/30 dark:hover:border-blueprint-cyan/30 transition-all">
                                {/* Image Cover */}
                                <div className="h-48 w-full bg-gray-100 dark:bg-gray-800 relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
                                    {project.images && project.images.length > 0 ? (
                                        <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    )}
                                    {/* Featured Badge */}
                                    {project.is_featured && (
                                        <div className="absolute top-3 right-3 bg-blueprint-bluePrimary dark:bg-[#5C3AFF] text-white text-[9px] font-bold px-2 py-1 rounded-sm shadow-sm flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Mis en avant
                                        </div>
                                    )}
                                </div>
                                
                                {/* Content */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 flex-1" title={project.title}>{project.title}</h3>
                                        <div className="flex items-center gap-1 text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded text-[10px] font-medium shrink-0">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            {project.views || 0}
                                        </div>
                                    </div>
                                    
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed flex-1">
                                        {project.excerpt || "Aucun résumé fourni pour ce projet."}
                                    </p>

                                    {/* Additional Info Section */}
                                    <div className="space-y-2 mb-4">
                                        {project.development_time && (
                                            <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>Durée: {project.development_time}</span>
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center gap-2 text-[10px]">
                                            {project.repository_url ? (
                                                <a href={project.repository_url} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-blueprint-bluePrimary flex items-center gap-1 truncate">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                                    Code
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 dark:text-gray-600 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> Pas de repo</span>
                                            )}
                                            
                                            <span className="text-gray-300 dark:text-gray-700">•</span>

                                            {project.live_url ? (
                                                <a href={project.live_url} target="_blank" rel="noreferrer" className="text-green-600 dark:text-green-500 hover:underline flex items-center gap-1 truncate">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                                    En ligne
                                                </a>
                                            ) : (
                                                <span className="text-gray-400 dark:text-gray-600 flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> Hors ligne</span>
                                            )}
                                        </div>

                                        {project.tech_stack && project.tech_stack.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {project.tech_stack.slice(0, 3).map((tech, idx) => (
                                                    <span key={idx} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[9px] px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech_stack.length > 3 && (
                                                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-[9px] px-1.5 py-0.5 rounded">
                                                        +{project.tech_stack.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                                        <span className="text-[10px] font-mono text-gray-400">Ajouté le {project.created_at_formatted || project.created_at}</span>
                                        
                                        <div className="flex items-center gap-1.5">
                                            <a 
                                                href={`/projects/${project.slug}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="w-7 h-7 rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-blueprint-cyan hover:bg-blueprint-cyan/10 transition-colors"
                                                title="Voir le projet public"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                            </a>
                                            <button 
                                                onClick={() => openEditModal(project)}
                                                className="w-7 h-7 rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-blueprint-bluePrimary hover:bg-blueprint-bluePrimary/10 transition-colors"
                                                title="Éditer"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(project.id)}
                                                className="w-7 h-7 rounded-md flex items-center justify-center bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                title="Supprimer"
                                            >
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

            {/* Modal de Création / Édition */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl">
                <div className="bg-white dark:bg-[#111827] rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            {modalMode === 'create' ? 'Nouveau Projet' : `Éditer: ${currentProject?.title}`}
                        </h2>
                        <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="p-6 max-h-[75vh] overflow-y-auto">
                        <form id="projectForm" onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Titre */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Titre du Projet</label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                        placeholder="Ex: Refonte Dashboard E-commerce"
                                    />
                                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                                </div>

                                {/* Development Time */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Temps de réalisation</label>
                                    <input
                                        type="text"
                                        value={data.development_time}
                                        onChange={e => setData('development_time', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                        placeholder="Ex: 3 semaines"
                                    />
                                    {errors.development_time && <p className="text-red-500 text-xs mt-1">{errors.development_time}</p>}
                                </div>

                                {/* URLs */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">URL Dépôt (Github...)</label>
                                    <input
                                        type="url"
                                        value={data.repository_url}
                                        onChange={e => setData('repository_url', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                        placeholder="https://github.com/..."
                                    />
                                    {errors.repository_url && <p className="text-red-500 text-xs mt-1">{errors.repository_url}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">URL Projet en ligne</label>
                                    <input
                                        type="url"
                                        value={data.live_url}
                                        onChange={e => setData('live_url', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                        placeholder="https://..."
                                    />
                                    {errors.live_url && <p className="text-red-500 text-xs mt-1">{errors.live_url}</p>}
                                </div>

                                {/* Tech Stack */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Tech Stack (séparé par des virgules)</label>
                                    <input
                                        type="text"
                                        value={data.tech_stack}
                                        onChange={e => setData('tech_stack', e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                        placeholder="React, Laravel, Tailwind CSS"
                                    />
                                    {errors.tech_stack && <p className="text-red-500 text-xs mt-1">{errors.tech_stack}</p>}
                                </div>

                                {/* Excerpt */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Résumé (Excerpt)</label>
                                    <textarea
                                        value={data.excerpt}
                                        onChange={e => setData('excerpt', e.target.value)}
                                        rows="2"
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                        placeholder="Bref résumé de 2-3 lignes..."
                                    ></textarea>
                                    {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt}</p>}
                                </div>

                                {/* Markdown Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Description Complète (Markdown)</label>
                                    <textarea
                                        value={data.description_markdown}
                                        onChange={e => setData('description_markdown', e.target.value)}
                                        rows="6"
                                        className="w-full font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                        placeholder="## Le problème...&#10;### La solution..."
                                    ></textarea>
                                    {errors.description_markdown && <p className="text-red-500 text-xs mt-1">{errors.description_markdown}</p>}
                                </div>

                                {/* Images Actuelles (Mode Édition seulement) */}
                                {modalMode === 'edit' && currentProject?.images && currentProject.images.length > 0 && (
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Images Actuelles</label>
                                        <div className="flex gap-4 overflow-x-auto pb-2">
                                            {currentProject.images.map((img, idx) => (
                                                <div key={idx} className="w-20 h-20 shrink-0 rounded overflow-hidden border border-gray-700">
                                                    <img src={img} alt={`img-${idx}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Images Upload */}
                                <div className="md:col-span-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center bg-gray-50/50 dark:bg-gray-900/50">
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                                        {modalMode === 'create' ? 'Images du Projet (1 à 4 max)' : 'Remplacer les images (1 à 4 max)'}
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blueprint-bluePrimary/10 file:text-blueprint-bluePrimary hover:file:bg-blueprint-bluePrimary/20 dark:file:bg-[#5C3AFF]/20 dark:file:text-[#5C3AFF] cursor-pointer"
                                    />
                                    {errors.images && <p className="text-red-500 text-xs mt-2">{errors.images}</p>}
                                    {errors.new_images && <p className="text-red-500 text-xs mt-2">{errors.new_images}</p>}
                                    <p className="text-xs text-gray-400 mt-2">
                                        {modalMode === 'edit' && 'Attention : uploader de nouvelles images supprimera et remplacera les actuelles. '}
                                        Format: JPG, PNG, WEBP. Max 2MB par image.
                                    </p>
                                    
                                    {/* Previsualisation des images en cours d'upload */}
                                    {imagePreviews.length > 0 && (
                                        <div className="mt-4">
                                            <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Aperçu avant envoi</label>
                                            <div className="flex flex-wrap justify-center gap-3">
                                                {imagePreviews.map((previewUrl, idx) => (
                                                    <div key={idx} className="relative w-24 h-24 rounded-md overflow-hidden border-2 border-blueprint-bluePrimary shadow-sm group">
                                                        {idx === 0 && (
                                                            <div className="absolute top-0 left-0 right-0 bg-blueprint-bluePrimary text-white text-[8px] font-bold text-center uppercase py-0.5 z-10">
                                                                Couverture
                                                            </div>
                                                        )}
                                                        <img src={previewUrl} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                                                        <button 
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Checkbox Featured */}
                                <div className="md:col-span-2 flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onChange={e => setData('is_featured', e.target.checked)}
                                        className="rounded border-gray-300 text-blueprint-bluePrimary shadow-sm focus:border-blueprint-cyan focus:ring focus:ring-blueprint-cyan focus:ring-opacity-50 bg-gray-900"
                                    />
                                    <label htmlFor="is_featured" className="text-sm text-gray-700 dark:text-gray-300 font-medium cursor-pointer">
                                        Mettre en avant ce projet
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="flex justify-end p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 gap-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            ANNULER
                        </button>
                        <button
                            type="submit"
                            form="projectForm"
                            disabled={processing}
                            className="bg-blueprint-bluePrimary hover:bg-blue-600 text-white text-xs font-bold px-6 py-2 rounded-sm transition-colors flex items-center gap-2"
                        >
                            {processing ? (modalMode === 'create' ? 'CRÉATION...' : 'MISE À JOUR...') : (modalMode === 'create' ? 'ENREGISTRER' : 'METTRE À JOUR')}
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

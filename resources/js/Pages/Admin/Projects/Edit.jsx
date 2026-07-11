import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ project }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Spoofing PUT request for file upload
        title: project.title || '',
        excerpt: project.excerpt || '',
        description_markdown: project.description_markdown || '',
        tech_stack: project.tech_stack ? project.tech_stack.join(', ') : '',
        repository_url: project.repository_url || '',
        live_url: project.live_url || '',
        is_featured: project.is_featured || false,
        completion_time: project.completion_time || '',
        new_images: []
    });

    const submit = (e) => {
        e.preventDefault();
        
        post(route('admin.projects.update', project.id), {
            forceFormData: true, 
            onBefore: (visit) => {
                visit.data.tech_stack = data.tech_stack ? data.tech_stack.split(',').map(s => s.trim()) : [];
            }
        });
    };

    const handleImageChange = (e) => {
        setData('new_images', Array.from(e.target.files));
    };

    return (
        <AuthenticatedLayout header="Gestion des Projets">
            <Head title={`Éditer ${project.title} - SYS_CTRL`} />

            <div className="w-full mx-auto space-y-6">
                
                <div className="flex justify-between items-center bg-[#111827] border border-gray-800 p-5 rounded-xl shadow-sm">
                    <div>
                        <h2 className="text-lg font-bold text-white">Éditer: {project.title}</h2>
                        <p className="text-xs font-mono text-gray-400 mt-1">Mettez à jour les informations de cette réalisation.</p>
                    </div>
                    <Link
                        href={route('admin.projects.index')}
                        className="text-gray-400 hover:text-white text-xs font-bold px-4 py-2 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        RETOUR
                    </Link>
                </div>

                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden p-6">
                    <form onSubmit={submit} className="space-y-6" encType="multipart/form-data">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Titre */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Titre du Projet</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                            </div>

                            {/* Completion Time */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Temps de réalisation</label>
                                <input
                                    type="text"
                                    value={data.completion_time}
                                    onChange={e => setData('completion_time', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                />
                                {errors.completion_time && <p className="text-red-500 text-xs mt-1">{errors.completion_time}</p>}
                            </div>

                            {/* URLs */}
                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">URL Dépôt (Github...)</label>
                                <input
                                    type="url"
                                    value={data.repository_url}
                                    onChange={e => setData('repository_url', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">URL Projet en ligne</label>
                                <input
                                    type="url"
                                    value={data.live_url}
                                    onChange={e => setData('live_url', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                />
                            </div>

                            {/* Tech Stack */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Tech Stack (séparé par des virgules)</label>
                                <input
                                    type="text"
                                    value={data.tech_stack}
                                    onChange={e => setData('tech_stack', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                />
                            </div>

                            {/* Excerpt */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Résumé (Excerpt)</label>
                                <textarea
                                    value={data.excerpt}
                                    onChange={e => setData('excerpt', e.target.value)}
                                    rows="2"
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                ></textarea>
                            </div>

                            {/* Markdown Description */}
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Description Complète (Markdown)</label>
                                <textarea
                                    value={data.description_markdown}
                                    onChange={e => setData('description_markdown', e.target.value)}
                                    rows="8"
                                    className="w-full font-mono bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md px-4 py-2 text-sm text-gray-900 dark:text-white focus:ring-blueprint-cyan focus:border-blueprint-cyan transition-colors"
                                ></textarea>
                                {errors.description_markdown && <p className="text-red-500 text-xs mt-1">{errors.description_markdown}</p>}
                            </div>

                            {/* Images Actuelles */}
                            {project.images && project.images.length > 0 && (
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Images Actuelles</label>
                                    <div className="flex gap-4">
                                        {project.images.map((img, idx) => (
                                            <div key={idx} className="w-24 h-24 rounded overflow-hidden border border-gray-700">
                                                <img src={img} alt={`img-${idx}`} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Nouvelles Images Upload */}
                            <div className="md:col-span-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center bg-gray-50/50 dark:bg-gray-900/50">
                                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">Remplacer les images (1 à 4 max)</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blueprint-bluePrimary/10 file:text-blueprint-bluePrimary hover:file:bg-blueprint-bluePrimary/20 dark:file:bg-[#5C3AFF]/20 dark:file:text-[#5C3AFF] cursor-pointer"
                                />
                                {errors.new_images && <p className="text-red-500 text-xs mt-2">{errors.new_images}</p>}
                                <p className="text-xs text-gray-400 mt-2">Attention : uploader de nouvelles images supprimera et remplacera les actuelles.</p>
                            </div>

                            {/* Checkbox */}
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

                        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blueprint-bluePrimary hover:bg-blue-600 text-white text-xs font-bold px-6 py-3 rounded-sm transition-colors flex items-center gap-2"
                            >
                                {processing ? 'MISE À JOUR...' : 'METTRE À JOUR'}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}

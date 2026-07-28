import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Index({ services }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const servicesList = services || [];

    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        excerpt: '',
        description_markdown: '',
        base_price: 350000,
        is_active: true,
    });

    const submitCreate = (e) => {
        e.preventDefault();
        post(route('admin.services.store'), {
            onSuccess: () => {
                reset();
                setShowCreateModal(false);
            }
        });
    };

    const toggleStatus = (srv) => {
        patch(route('admin.services.update', srv.id), {
            title: srv.title,
            excerpt: srv.excerpt,
            base_price: srv.base_price,
            is_active: !srv.is_active,
        });
    };

    const deleteService = (srvId) => {
        if (confirm('Voulez-vous supprimer ce service ?')) {
            destroy(route('admin.services.destroy', srvId));
        }
    };

    return (
        <AuthenticatedLayout header="Gestion des Services & Packs">
            <Head title="Admin - Services & Packs" />

            <div className="w-full mx-auto space-y-6 font-mono">
                {/* Header Actions */}
                <div className="flex justify-between items-center bg-white dark:bg-[#0B0F19] p-6 border border-gray-200 dark:border-gray-800">
                    <div>
                        <h2 className="text-base font-bold text-blueprint-textDark dark:text-white uppercase tracking-tight">// SERVICES & CONFIGURATION DES PACKS</h2>
                        <p className="text-xs text-gray-500 mt-1">Gérez votre catalogue d'offres et la tarification de votre portfolio.</p>
                    </div>
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                        + AJOUTER UN SERVICE
                    </button>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {servicesList.map((srv) => (
                        <div key={srv.id} className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between shadow-sm relative">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-[10px] text-gray-400 font-mono">{srv.ref_id || 'SRV_REF'}</span>
                                    <button 
                                        onClick={() => toggleStatus(srv)}
                                        className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${srv.is_active ? 'bg-green-500/10 text-green-500 border border-green-500/30' : 'bg-red-500/10 text-red-500'}`}
                                    >
                                        {srv.is_active ? '● ACTIF' : '○ INACTIF'}
                                    </button>
                                </div>
                                <h3 className="font-bold text-sm text-blueprint-textDark dark:text-white uppercase mb-2">{srv.title}</h3>
                                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{srv.excerpt}</p>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="text-sm font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{Number(srv.base_price).toLocaleString()} FCFA</span>
                                <button 
                                    onClick={() => deleteService(srv.id)}
                                    className="text-red-500 text-xs font-bold hover:underline uppercase"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Packs Structures Section */}
                <div className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase mb-6">
                        // STRUCTURES PRÉCONFIGURÉES DES PACKS (BLUEPRINT PACKS)
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 text-xs">
                        <div className="border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-900/50">
                            <span className="text-[10px] text-gray-400 block mb-1">[ PACK 01 ]</span>
                            <h4 className="font-bold text-white mb-2">STARTER MVP</h4>
                            <div className="text-base font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan mb-2">250 000 FCFA</div>
                            <p className="text-gray-400 text-xs">Landing page moderne, Single Page Application React/Laravel, SEO optimisé, livraison 7j.</p>
                        </div>
                        <div className="border border-blueprint-bluePrimary dark:border-blueprint-cyan p-5 bg-gray-50/50 dark:bg-gray-900/50">
                            <span className="text-[10px] text-blueprint-cyan block mb-1">[ PACK 02 - RECOMMANDE ]</span>
                            <h4 className="font-bold text-white mb-2">PROFESSIONAL WEBAPP</h4>
                            <div className="text-base font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan mb-2">600 000 FCFA</div>
                            <p className="text-gray-400 text-xs">SaaS complet, Authentification, Admin Dashboard, Analytics, Support 3 mois.</p>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-800 p-5 bg-gray-50/50 dark:bg-gray-900/50">
                            <span className="text-[10px] text-gray-400 block mb-1">[ PACK 03 ]</span>
                            <h4 className="font-bold text-white mb-2">ENTERPRISE SAAS</h4>
                            <div className="text-base font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan mb-2">SUR DEVIS</div>
                            <p className="text-gray-400 text-xs">Architecture Microservices, Mobile Money / Stripe, WebSockets, Support 1 an.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Service Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-mono">
                    <div className="bg-[#0B0F19] border border-blueprint-bluePrimary/40 dark:border-blueprint-cyan/40 p-6 max-w-lg w-full">
                        <h3 className="text-sm font-bold text-white uppercase mb-4">// AJOUTER UN NOUVEAU SERVICE</h3>
                        <form onSubmit={submitCreate} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-gray-400 mb-1">TITRE DU SERVICE</label>
                                <input 
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-800 p-2.5 text-white focus:outline-none focus:border-blueprint-cyan"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">EXTRAIT / RÉSUMÉ</label>
                                <textarea 
                                    value={data.excerpt}
                                    onChange={e => setData('excerpt', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-800 p-2.5 text-white focus:outline-none focus:border-blueprint-cyan h-20"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-1">PRIX DE BASE (FCFA)</label>
                                <input 
                                    type="number"
                                    value={data.base_price}
                                    onChange={e => setData('base_price', e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-800 p-2.5 text-white focus:outline-none focus:border-blueprint-cyan"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                                <button 
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 bg-gray-800 text-gray-400 font-bold uppercase"
                                >
                                    ANNULER
                                </button>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-blueprint-cyan text-gray-900 font-bold uppercase hover:opacity-90"
                                >
                                    ENREGISTRER
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

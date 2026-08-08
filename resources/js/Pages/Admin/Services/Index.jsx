import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

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

            <div className="w-full mx-auto space-y-6 font-sans">
                {/* Header Actions */}
                <div className="flex justify-between items-center bg-white dark:bg-[#111827] p-6 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
                    <div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Services & Catalogue d'Offres</h2>
                        <p className="text-xs text-gray-500 mt-1">Gérez votre catalogue d'ingénierie et la tarification de votre portfolio.</p>
                    </div>
                    <button 
                        onClick={() => setShowCreateModal(true)}
                        className="px-4 py-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs rounded-xl shadow-sm hover:opacity-90 transition-opacity"
                    >
                        + Ajouter un Service
                    </button>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {servicesList.map((srv) => (
                        <div key={srv.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-xs text-gray-400 font-mono">{srv.ref_id || 'SRV_REF'}</span>
                                    <button 
                                        onClick={() => toggleStatus(srv)}
                                        className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${srv.is_active ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500'}`}
                                    >
                                        {srv.is_active ? 'Actif' : 'Inactif'}
                                    </button>
                                </div>
                                <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2">{srv.title}</h3>
                                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{srv.excerpt}</p>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                <span className="text-sm font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{Number(srv.base_price).toLocaleString()} FCFA</span>
                                <button 
                                    onClick={() => deleteService(srv.id)}
                                    className="text-red-500 text-xs font-bold hover:underline"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

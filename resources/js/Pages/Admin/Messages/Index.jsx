import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ messages }) {
    const messagesList = messages || [];
    const [selectedMsg, setSelectedMsg] = useState(messagesList[0] || null);
    const { delete: destroy } = useForm();

    const deleteMessage = (id) => {
        if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
            destroy(route('admin.messages.destroy', id), {
                onSuccess: () => setSelectedMsg(null),
            });
        }
    };

    return (
        <AuthenticatedLayout header="Boîte de Réception Messages">
            <Head title="Admin - Messages Contacts" />

            <div className="w-full mx-auto space-y-6 font-sans">
                {/* Header Banner */}
                <div className="bg-white dark:bg-[#111827] p-6 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">
                        Boîte de Réception ({messagesList.length} messages)
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Consultez et gérez les demandes de contact, devis et opportunités d'ingénierie transmises via le portfolio.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* List Column */}
                    <div className="md:col-span-1 space-y-3">
                        {messagesList.length > 0 ? (
                            messagesList.map((msg) => (
                                <div 
                                    key={msg.id}
                                    onClick={() => setSelectedMsg(msg)}
                                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                        selectedMsg?.id === msg.id 
                                            ? 'border-blueprint-bluePrimary dark:border-blueprint-cyan bg-blueprint-bluePrimary/5 dark:bg-blueprint-cyan/10 shadow-sm' 
                                            : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111827] hover:border-gray-300 dark:hover:border-gray-700'
                                    }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-xs text-gray-900 dark:text-white truncate">{msg.name}</span>
                                        <span className="text-[10px] text-gray-400 font-mono">{new Date(msg.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-[11px] text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold truncate mb-1">{msg.email}</p>
                                    <p className="text-xs text-gray-500 line-clamp-2">{msg.message}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-xs text-gray-400 border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#111827] rounded-xl">
                                Aucun message dans la boîte de réception.
                            </div>
                        )}
                    </div>

                    {/* Detail Preview Column */}
                    <div className="md:col-span-2 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm flex flex-col justify-between min-h-[400px]">
                        {selectedMsg ? (
                            <div>
                                <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                                    <div>
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white">{selectedMsg.name}</h3>
                                        <a href={`mailto:${selectedMsg.email}`} className="text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold hover:underline">
                                            {selectedMsg.email}
                                        </a>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-gray-400 block font-mono">{new Date(selectedMsg.created_at).toLocaleString()}</span>
                                        <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 text-[10px] rounded-lg font-medium mt-1">
                                            Origine: {selectedMsg.platform_origin || 'Web'}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-900/60 p-5 rounded-xl border border-gray-100 dark:border-gray-800 text-xs leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-sans mb-6">
                                    {selectedMsg.message}
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <a 
                                        href={`mailto:${selectedMsg.email}?subject=Re:%20Votre%20demande%20sur%20Mr%20Dim's`}
                                        className="px-5 py-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs rounded-xl shadow-sm hover:opacity-90 transition-opacity"
                                    >
                                        Répondre par Email →
                                    </a>
                                    <button 
                                        onClick={() => deleteMessage(selectedMsg.id)}
                                        className="text-red-500 text-xs font-bold hover:underline"
                                    >
                                        Supprimer ce message
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 text-xs py-12">
                                <svg className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Sélectionnez un message à gauche pour afficher son contenu intégral.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

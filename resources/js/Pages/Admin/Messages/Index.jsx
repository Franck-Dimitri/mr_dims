import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ messages }) {
    const messagesList = messages || [];
    const [selectedMsg, setSelectedMsg] = useState(null);
    const { delete: destroy } = useForm();

    const deleteMessage = (id) => {
        if (confirm('Voulez-vous supprimer ce message ?')) {
            destroy(route('admin.messages.destroy', id), {
                onSuccess: () => setSelectedMsg(null),
            });
        }
    };

    return (
        <AuthenticatedLayout header="Boîte de Réception Messages">
            <Head title="Admin - Messages Contacts" />

            <div className="w-full mx-auto space-y-6 font-mono">
                <div className="bg-white dark:bg-[#0B0F19] p-6 border border-gray-200 dark:border-gray-800">
                    <h2 className="text-base font-bold text-blueprint-textDark dark:text-white uppercase tracking-tight">
                        // BOÎTE DE RÉCEPTION ({messagesList.length} MESSAGES)
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Consultez les demandes de contacts, devis et opportunités d'ingénierie transmises.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* List */}
                    <div className="md:col-span-1 space-y-3">
                        {messagesList.length > 0 ? (
                            messagesList.map((msg) => (
                                <div 
                                    key={msg.id}
                                    onClick={() => setSelectedMsg(msg)}
                                    className={`p-4 border cursor-pointer transition-colors ${selectedMsg?.id === msg.id ? 'border-blueprint-bluePrimary dark:border-blueprint-cyan bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] hover:border-gray-400'}`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-xs text-blueprint-textDark dark:text-white truncate">{msg.name}</span>
                                        <span className="text-[9px] text-gray-400 font-mono">{new Date(msg.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-[11px] text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold truncate mb-2">{msg.email}</p>
                                    <p className="text-xs text-gray-500 line-clamp-2">{msg.message}</p>
                                </div>
                            ))
                        ) : (
                            <div className="p-8 text-center text-xs text-gray-400 border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19]">
                                Aucun message dans la boîte de réception.
                            </div>
                        )}
                    </div>

                    {/* Detail Preview */}
                    <div className="md:col-span-2 bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between min-h-[350px]">
                        {selectedMsg ? (
                            <div>
                                <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
                                    <div>
                                        <h3 className="text-base font-bold text-blueprint-textDark dark:text-white uppercase">{selectedMsg.name}</h3>
                                        <a href={`mailto:${selectedMsg.email}`} className="text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold hover:underline">
                                            {selectedMsg.email}
                                        </a>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] text-gray-400 block">{new Date(selectedMsg.created_at).toLocaleString()}</span>
                                        <span className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-400 px-2 py-0.5 text-[9px] uppercase font-bold mt-1">
                                            CANAL: {selectedMsg.platform_origin}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-200 dark:border-gray-800 text-xs leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono mb-6">
                                    {selectedMsg.message}
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-800">
                                    <a 
                                        href={`mailto:${selectedMsg.email}?subject=Re:%20Votre%20demande%20sur%20Mr%20Dim's`}
                                        className="px-4 py-2 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs uppercase tracking-widest hover:opacity-90"
                                    >
                                        RÉPONDRE AU MESSAGE →
                                    </a>
                                    <button 
                                        onClick={() => deleteMessage(selectedMsg.id)}
                                        className="text-red-500 text-xs font-bold uppercase hover:underline"
                                    >
                                        Supprimer ce message
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400 text-xs">
                                <svg className="w-12 h-12 text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

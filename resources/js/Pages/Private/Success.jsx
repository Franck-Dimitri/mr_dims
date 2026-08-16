import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Download, ExternalLink, Zap, Package } from 'lucide-react';
import PrivateOfferLayout from '@/Layouts/PrivateOfferLayout';

export default function Success({ order, product }) {
    const formatFCFA = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    return (
        <PrivateOfferLayout title="Commande Confirmée - Vos Accès" accessToken={product.token}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Success Card */}
                <div className="bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl relative">
                    
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center rounded-2xl mb-4 text-emerald-500">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs rounded-full uppercase tracking-wider mb-2">
                            Paiement Confirmé • Accès Immédiat
                        </div>

                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                            Merci pour votre achat, {order.customer_name} !
                        </h1>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
                            Votre commande <span className="font-bold text-indigo-600 dark:text-cyan-400">#{order.order_hash}</span> a été validée avec succès. Vous pouvez accéder directement à l'ensemble de votre contenu ci-dessous.
                        </p>
                    </div>

                    {/* Digital Resource Access Box */}
                    <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                            <span className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                                <Package className="w-4 h-4 text-indigo-500" />
                                <span>Votre Ressource Numérique</span>
                            </span>
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Accès Permanent
                            </span>
                        </div>

                        <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                                {product.title}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                                {product.access_details || "Cliquez sur le bouton ci-dessous pour ouvrir votre dossier de formation et télécharger l'ensemble de vos ressources."}
                            </p>
                        </div>

                        {/* Drive Access Button */}
                        <div className="pt-2">
                            <a
                                href="https://drive.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg uppercase tracking-wider"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>ACCÉDER À MON DOSSIER DIGITAL (GOOGLE DRIVE)</span>
                            </a>
                        </div>
                    </div>

                    {/* Summary Metadata Grid */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-t border-slate-100 dark:border-slate-800 pt-6">
                        <div className="space-y-1.5 text-slate-600 dark:text-slate-400">
                            <div><strong className="text-slate-900 dark:text-white">Destinataire :</strong> {order.customer_name}</div>
                            <div><strong className="text-slate-900 dark:text-white">Email :</strong> {order.customer_email}</div>
                            <div><strong className="text-slate-900 dark:text-white">Téléphone :</strong> {order.customer_phone}</div>
                        </div>

                        <div className="space-y-1.5 text-slate-600 dark:text-slate-400 sm:text-right">
                            <div><strong className="text-slate-900 dark:text-white">Localisation :</strong> {order.city}, {order.country}</div>
                            <div><strong className="text-slate-900 dark:text-white">Montant réglé :</strong> {formatFCFA(order.amount)}</div>
                            <div><strong className="text-slate-900 dark:text-white">Paiement via :</strong> {order.payment_method.toUpperCase().replace('_', ' ')}</div>
                        </div>
                    </div>

                </div>
            </div>
        </PrivateOfferLayout>
    );
}

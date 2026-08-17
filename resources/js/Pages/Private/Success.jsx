import React from 'react';
import { Head } from '@inertiajs/react';
import { CheckCircle2, ShieldCheck, Download, ExternalLink, Zap, Package } from 'lucide-react';
import PrivateOfferLayout from '@/Layouts/PrivateOfferLayout';

export default function Success({ order, product }) {
    const formatFCFA = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    const isDrive = product.access_type === 'drive';

    return (
        <PrivateOfferLayout title="Commande Confirmée - Vos Accès" accessToken={product.token}>
            <div className="max-w-xl mx-auto px-4 py-8">
                
                {/* Success Card */}
                <div className="bg-white border border-slate-200 p-5 sm:p-8 rounded-3xl shadow-xl relative">
                    
                    <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center rounded-2xl mb-4 text-emerald-500">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>

                        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px] rounded-full uppercase tracking-wider mb-2">
                            Paiement Confirmé
                        </div>

                        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                            Merci pour votre achat !
                        </h1>

                        <p className="text-xs text-slate-600 mt-2">
                            Votre commande <span className="font-bold text-indigo-600">#{order.order_hash}</span> est validée.
                        </p>
                    </div>

                    {/* Digital Resource Access Box */}
                    <div className="mt-6 p-4 sm:p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                            <span className="font-bold text-slate-900 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                                <Package className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Ressource</span>
                            </span>
                            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> Accès Permanent
                            </span>
                        </div>

                        <div>
                            <div className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                                {product.title}
                            </div>
                            <p className="text-[11px] text-slate-600">
                                {product.access_details || (isDrive 
                                    ? "Ouvrez le lien ci-dessous pour accéder à votre dossier Google Drive partagé." 
                                    : "Cliquez ci-dessous pour télécharger votre fichier numérique.")}
                            </p>
                        </div>

                        {/* Direct Access/Download Button */}
                        <div className="pt-1">
                            <a
                                href={isDrive ? (product.access_url || "https://drive.google.com") : route('private.download', order.order_hash)}
                                target={isDrive ? "_blank" : undefined}
                                rel={isDrive ? "noopener noreferrer" : undefined}
                                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md uppercase tracking-wider text-center"
                            >
                                {isDrive ? (
                                    <>
                                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                        <span>ACCÉDER AU GOOGLE DRIVE</span>
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-3.5 h-3.5 shrink-0" />
                                        <span>TÉLÉCHARGER LE FICHIER</span>
                                    </>
                                )}
                            </a>
                        </div>
                    </div>

                    {/* Summary Metadata Grid */}
                    <div className="mt-6 space-y-2 text-[11px] border-t border-slate-100 pt-5">
                        <div className="grid grid-cols-2 gap-2 text-slate-600">
                            <div><strong className="text-slate-900">Destinataire :</strong> {order.customer_name}</div>
                            <div className="text-right"><strong className="text-slate-900">Montant :</strong> {formatFCFA(order.amount)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-slate-600">
                            <div><strong className="text-slate-900">Email :</strong> {order.customer_email}</div>
                            <div className="text-right"><strong className="text-slate-900">Paiement :</strong> {order.payment_method.toUpperCase().replace('_', ' ')}</div>
                        </div>
                    </div>

                </div>
            </div>
        </PrivateOfferLayout>
    );
}

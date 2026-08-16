import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, BookOpen, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import PrivateOfferLayout from '@/Layouts/PrivateOfferLayout';

export default function Show({ product, token }) {
    const formatFCFA = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    return (
        <PrivateOfferLayout title={product.title} accessToken={token}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href={`/p/vault/${token}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Retour au catalogue</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Main Content Column (8 Cols) */}
                    <div className="lg:col-span-8 space-y-8">
                        
                        {/* Title Header */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 font-extrabold text-[11px] rounded-full uppercase tracking-wider border border-indigo-100">
                                    {product.badge_text || product.category.replace('_', ' ')}
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                                {product.title}
                            </h1>

                            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                {product.tagline}
                            </p>
                        </div>

                        {/* Media Cover / Video Player */}
                        <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-lg">
                            {product.preview_video_url ? (
                                <div className="aspect-video w-full">
                                    <iframe
                                        src={product.preview_video_url}
                                        title={product.title}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <div className="relative aspect-video w-full">
                                    <img
                                        src={product.cover_image}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Detailed Description */}
                        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm">
                            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-indigo-600" />
                                <span>Présentation détaillée du produit</span>
                            </h2>

                            <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed">
                                <ReactMarkdown>{product.description_markdown}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Resource Files Details */}
                        {product.curriculum && product.curriculum.length > 0 && (
                            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm">
                                <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-3">
                                    Détails du contenu & Fichiers inclus
                                </h2>

                                <div className="space-y-3">
                                    {product.curriculum.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="border border-slate-250 bg-slate-50/50 rounded-xl p-4 flex items-center justify-between font-bold text-xs sm:text-sm text-slate-800"
                                        >
                                            <span>{item.title}</span>
                                            <span className="text-xs text-indigo-600 font-bold shrink-0 ml-2">
                                                {item.duration}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky Sidebar Checkout Box (4 Cols) */}
                    <div className="lg:col-span-4">
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xl sticky top-24 space-y-6">
                            
                            {/* Price Card */}
                            <div>
                                <div className="text-xs text-slate-500 font-semibold">
                                    Prix exceptionnel :
                                </div>
                                <div className="flex items-baseline gap-3 mt-1">
                                    <span className="text-3xl font-extrabold text-indigo-600">
                                        {formatFCFA(product.price)}
                                    </span>
                                    {product.original_price && (
                                        <span className="text-sm text-slate-400 line-through">
                                            {formatFCFA(product.original_price)}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-1 inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-extrabold text-[10px] rounded-full uppercase border border-emerald-100">
                                    Livraison Numérique Immédiate
                                </div>
                            </div>

                            {/* Features list */}
                            {product.features && (
                                <ul className="space-y-2.5 text-xs text-slate-700 border-t border-b border-slate-100 py-4">
                                    {product.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Action Button (ACHETER MAINTENANT / PAYER MAINTENANT) */}
                            <div>
                                <Link
                                    href={`/p/checkout/${product.slug}/${token}`}
                                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 uppercase tracking-wider"
                                >
                                    <span>PAYER MAINTENANT ({formatFCFA(product.price)})</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Trust Seals */}
                            <div className="space-y-3 pt-2 text-[11px] text-slate-500">
                                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                                    <span>Paiement sécurisé via Mobile Money & CB</span>
                                </div>
                                <p className="text-[10px] leading-relaxed">
                                    Validation immédiate. Vos accès Google Drive et vos ressources vous sont délivrés automatiquement après règlement.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </PrivateOfferLayout>
    );
}

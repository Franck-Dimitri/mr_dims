import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import PrivateOfferLayout from '@/Layouts/PrivateOfferLayout';

export default function Index({ products, accessToken }) {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const formatFCFA = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    const categories = [
        { id: 'all', name: 'Toutes les Offres' },
        { id: 'formation_video', name: 'Formations Vidéo' },
        { id: 'template_design', name: 'Design & Templates' },
        { id: 'ebook_guide', name: 'Ebooks & Guides' },
        { id: 'pack_ressources', name: 'Packs Ressources' },
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <PrivateOfferLayout title="Boutique de Ressources Digitales" accessToken={accessToken}>
            
            {/* HERO BANNER */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-100/40 via-transparent to-transparent py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-xs mb-4"
                    >
                        <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>Ressources Digitales, Packs & Ebooks Prêts à l'Emploi</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto"
                    >
                        Ressources Digitales <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">Haute Valeur</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-3 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed"
                    >
                        Accédez à des guides concrets, des templates et carrousels Canva prêts à l'emploi et des packs de ressources pour propulser vos projets créatifs.
                    </motion.p>
                </div>
            </section>

            {/* CATEGORY FILTER TABS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                                selectedCategory === cat.id
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* PRODUCTS GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all flex flex-col"
                        >
                            {/* Image Header */}
                            <div className="relative h-48 overflow-hidden bg-slate-100">
                                <img
                                    src={product.cover_image}
                                    alt={product.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                                
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                                        {product.badge_text || product.category.replace('_', ' ')}
                                    </span>
                                </div>

                                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-white/90 px-2.5 py-1 rounded-md shadow-xs border border-slate-100">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Accès Immédiat</span>
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                    {product.title}
                                </h3>

                                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                                    {product.tagline}
                                </p>

                                {/* Features bullet preview */}
                                {product.features && (
                                    <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 flex-grow">
                                        {product.features.slice(0, 3).map((feat, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-600">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                                <span className="line-clamp-1">{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {/* Pricing & Action Button */}
                                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                                    <div>
                                        <div className="text-[10px] text-slate-400 line-through">
                                            {formatFCFA(product.original_price)}
                                        </div>
                                        <div className="text-lg font-extrabold text-indigo-600">
                                            {formatFCFA(product.price)}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/p/offer/${product.slug}/${accessToken}`}
                                        className="px-4 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                                    >
                                        <span>DÉCOUVRIR</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PrivateOfferLayout>
    );
}

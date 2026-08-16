import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Eye, Package, BookOpen, Video, Layers, Search } from 'lucide-react';
import PrivateOfferLayout from '@/Layouts/PrivateOfferLayout';

export default function Vault({ products, selectedCategory, token }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState(selectedCategory || 'all');

    const formatFCFA = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    const categoriesList = [
        { id: 'all', label: 'Toutes les Offres' },
        { id: 'formation_video', label: 'Formations Vidéo' },
        { id: 'template_design', label: 'Design & Templates' },
        { id: 'ebook_guide', label: 'Ebooks & Guides' },
        { id: 'pack_ressources', label: 'Packs Ressources' },
    ];

    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeTab === 'all' || product.category === activeTab;
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              product.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <PrivateOfferLayout title="Catalogue des Ressources Digitales" accessToken={token}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Hero Header */}
                <div className="bg-white border border-slate-200/80 p-8 sm:p-10 rounded-3xl shadow-sm mb-10 text-center relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10" />
                    <div className="absolute -left-10 -top-10 w-64 h-64 bg-cyan-50 rounded-full blur-3xl -z-10" />

                    <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-extrabold rounded-full uppercase tracking-wider mb-4 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Accès Privé aux Ressources Digitales</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Ressources Digitales, Packs & Guides Prêts à l'Emploi
                    </h1>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Accédez instantanément à nos formations vidéo, packs de ressources créatives, templates Canva et livres numériques téléchargeables.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-6 max-w-md mx-auto relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                        <input
                            type="text"
                            placeholder="Rechercher un produit, un pack ou un guide..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white text-xs font-medium transition-all shadow-xs"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-slate-200/60">
                    {categoriesList.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col group"
                            >
                                {/* Cover Image Container */}
                                <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                                    <img
                                        src={product.cover_image}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />

                                    {/* Category Badge */}
                                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-indigo-700 font-extrabold text-[10px] rounded-lg uppercase tracking-wider border border-slate-200 shadow-xs">
                                        {product.badge_text || product.category.replace('_', ' ')}
                                    </span>

                                    {/* Price Badge */}
                                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-200 text-indigo-600 text-xs font-extrabold shadow-sm">
                                        {formatFCFA(product.price)}
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                                            {product.title}
                                        </h3>
                                        <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                                            {product.tagline}
                                        </p>
                                    </div>

                                    {/* Key Features List */}
                                    {product.features && (
                                        <ul className="space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                                            {product.features.slice(0, 2).map((feat, idx) => (
                                                <li key={idx} className="flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                                    <span className="line-clamp-1">{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="pt-2 flex items-center gap-2">
                                        <Link
                                            href={`/p/offer/${product.slug}/${token}`}
                                            className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl text-center transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
                                        >
                                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                                            <span>Détails</span>
                                        </Link>

                                        <Link
                                            href={`/p/checkout/${product.slug}/${token}`}
                                            className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl text-center transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-1.5"
                                        >
                                            <span>Acheter ({formatFCFA(product.price)})</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-xs">
                        Aucune ressource ne correspond à votre recherche pour le moment.
                    </div>
                )}

            </div>
        </PrivateOfferLayout>
    );
}

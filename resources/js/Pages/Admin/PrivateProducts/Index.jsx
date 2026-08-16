import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AnalyticsChart from '@/Components/Admin/AnalyticsChart';
import { 
    ShoppingBag, DollarSign, TrendingUp, TrendingDown, Eye, Plus, Edit2, Trash2, 
    CheckCircle2, Sparkles, HardDrive, Download, Copy, MapPin, Globe
} from 'lucide-react';

export default function Index({ auth, products, stats, countryStats, latestVisits, viewsChart }) {
    const [copiedToken, setCopiedToken] = useState(null);

    const formatFCFA = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount || 0) + ' FCFA';
    };

    const handleDelete = (productId) => {
        if (confirm('Voulez-vous vraiment supprimer ce produit digital ?')) {
            router.delete(route('admin.private-products.destroy', productId));
        }
    };

    const copySalesLink = (product) => {
        const fullUrl = `${window.location.origin}/p/offer/${product.slug}/${product.token}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedToken(product.id);
        setTimeout(() => setCopiedToken(null), 2500);
    };

    const getFlagEmoji = (countryCode) => {
        if (!countryCode || countryCode === 'XX') return '🌐';
        try {
            return countryCode
                .toUpperCase()
                .split('')
                .map((char) => 127397 + char.charCodeAt(0))
                .map((cp) => String.fromCodePoint(cp))
                .join('');
        } catch (e) {
            return '🌐';
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Suivi Financier & Gestion des Produits Digitaux">
            <Head title="Admin - Produits Digitaux & Finances" />

            <div className="py-6 mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
                
                {/* Header Action Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-blueprint-bluePrimary/5 dark:bg-blueprint-cyan/5 p-6 rounded-2xl border border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-indigo-600 dark:text-cyan-400" />
                            <span>Gestion des Produits Digitaux & Tracking Ventes</span>
                        </h1>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Suivez vos revenus, vos dépenses publicitaires (Pub), et créez de nouvelles offres numériques en 1 clic.
                        </p>
                    </div>

                    <Link
                        href={route('admin.private-products.create')}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Créer un Produit Digital</span>
                    </Link>
                </div>

                {/* KPI Financial Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    {/* Chiffre d'Affaires Total */}
                    <div className="bg-white dark:bg-[#0E131F] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                            <span>Chiffre d'Affaires (CA)</span>
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                <DollarSign className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                            {formatFCFA(stats.total_revenue)}
                        </div>
                        <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span>{stats.total_sales} ventes réalisées</span>
                        </div>
                    </div>

                    {/* Dépenses Publicitaires (Pub) */}
                    <div className="bg-white dark:bg-[#0E131F] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                            <span>Montant Dépensé en Pub</span>
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                                <TrendingDown className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                            {formatFCFA(stats.total_ad_spend)}
                        </div>
                        <div className="text-[11px] text-slate-500">
                            Budget publicitaire injecté
                        </div>
                    </div>

                    {/* Bénéfice Net */}
                    <div className="bg-white dark:bg-[#0E131F] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                            <span>Bénéfice Net</span>
                            <div className={`w-8 h-8 rounded-lg ${stats.net_profit >= 0 ? 'bg-indigo-500/10 text-indigo-500' : 'bg-red-500/10 text-red-500'} flex items-center justify-center`}>
                                <Sparkles className="w-4 h-4" />
                            </div>
                        </div>
                        <div className={`text-2xl font-black ${stats.net_profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                            {formatFCFA(stats.net_profit)}
                        </div>
                        <div className="text-[11px] text-slate-500">
                            CA - Dépenses Pub
                        </div>
                    </div>

                    {/* Conversion & Trafic */}
                    <div className="bg-white dark:bg-[#0E131F] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
                        <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                            <span>Trafic & Conversion</span>
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                                <Eye className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-black text-slate-900 dark:text-white">
                            {stats.conversion_rate}%
                        </div>
                        <div className="text-[11px] text-slate-500">
                            {stats.total_views} vues totales au catalogue
                        </div>
                    </div>

                </div>

                {/* VISUAL GEOLOCATION & TRAFFIC CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Page Views Trend Chart (2/3 width) */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs">
                        <h2 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-indigo-500" />
                            <span>Trafic Visiteurs (Vues du Catalogue / 15 derniers jours)</span>
                        </h2>
                        <AnalyticsChart chartData={{ labels: viewsChart.labels, views: viewsChart.views }} />
                    </div>

                    {/* Country Breakdown (1/3 width) */}
                    <div className="bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
                        <div>
                            <h2 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                                <Globe className="w-4 h-4 text-indigo-500" />
                                <span>Trafic par Pays</span>
                            </h2>
                            <div className="space-y-3.5">
                                {countryStats.length === 0 ? (
                                    <p className="text-slate-500 text-xs italic py-4">Aucune donnée de localisation pour le moment.</p>
                                ) : (
                                    countryStats.map((stat, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg">
                                                    {getFlagEmoji(stat.country_code)}
                                                </span>
                                                <span className="text-slate-700 dark:text-slate-300">{stat.country_name}</span>
                                            </div>
                                            <span className="font-mono font-extrabold text-indigo-600 dark:text-cyan-400 bg-indigo-50 dark:bg-cyan-500/10 px-2 py-0.5 rounded-md">
                                                {stat.views_count} vues
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 font-semibold">
                            Géolocalisation IP résolue automatiquement.
                        </div>
                    </div>
                </div>

                {/* Visiteurs IP Recents & Products Data Table Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Table of Products (2/3 width) */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between">
                        <div>
                            <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                                <h2 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                                    Liste de vos Produits Digitaux ({products.length})
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                                    <thead className="bg-slate-50 dark:bg-slate-900/60 uppercase font-bold text-[10px] text-slate-400 border-b border-slate-100 dark:border-slate-800">
                                        <tr>
                                            <th className="py-3.5 px-4">Produit</th>
                                            <th className="py-3.5 px-4">Catégorie</th>
                                            <th className="py-3.5 px-4">Prix</th>
                                            <th className="py-3.5 px-4">Ventes</th>
                                            <th className="py-3.5 px-4">Mode Accès</th>
                                            <th className="py-3.5 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                                        {products.map((product) => (
                                            <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                                                <td className="py-4 px-4 flex items-center gap-3">
                                                    <img
                                                        src={product.cover_image}
                                                        alt={product.title}
                                                        className="w-12 h-12 object-cover rounded-xl border border-slate-200 dark:border-slate-800 shrink-0"
                                                    />
                                                    <div>
                                                        <div className="font-bold text-slate-900 dark:text-white text-xs line-clamp-1">
                                                            {product.title}
                                                        </div>
                                                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                                            slug: {product.slug}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-[10px] font-bold uppercase">
                                                        {product.category.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4 font-bold text-indigo-600 dark:text-cyan-400">
                                                    {formatFCFA(product.price)}
                                                </td>
                                                <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                                                    {product.sales_count} v ({product.views_count} vu)
                                                </td>
                                                <td className="py-4 px-4">
                                                    {product.access_type === 'drive' ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] rounded-md">
                                                            <HardDrive className="w-3 h-3" /> Drive
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] rounded-md">
                                                            <Download className="w-3 h-3" /> Direct
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => copySalesLink(product)}
                                                            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                                                            title="Copier le lien de vente"
                                                        >
                                                            {copiedToken === product.id ? (
                                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                            ) : (
                                                                <Copy className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                        <Link
                                                            href={route('admin.private-products.edit', product.id)}
                                                            className="p-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-600 dark:text-cyan-400 rounded-lg transition-colors inline-block"
                                                            title="Éditer"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="p-2 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 text-red-600 rounded-lg transition-colors"
                                                            title="Supprimer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Latest Visits List (1/3 width) */}
                    <div className="bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                        <div>
                            <h2 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-indigo-500" />
                                <span>Dernières visites (IP & Pays)</span>
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-[11px] text-slate-600 dark:text-slate-400">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800 font-bold uppercase text-[9px] text-slate-400 pb-2">
                                            <th className="pb-2">Adresse IP</th>
                                            <th className="pb-2">Pays</th>
                                            <th className="pb-2">Produit</th>
                                            <th className="pb-2 text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40 font-medium">
                                        {latestVisits.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="py-4 text-center text-slate-500 italic">Aucun visiteur enregistré.</td>
                                            </tr>
                                        ) : (
                                            latestVisits.map((visit, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10">
                                                    <td className="py-2.5 font-mono text-slate-900 dark:text-white font-bold">{visit.ip_address}</td>
                                                    <td className="py-2.5 flex items-center gap-1">
                                                        <span>{getFlagEmoji(visit.country_code)}</span>
                                                        <span className="truncate max-w-[45px]">{visit.country_name}</span>
                                                    </td>
                                                    <td className="py-2.5 text-slate-700 dark:text-slate-300 font-bold max-w-[90px] truncate" title={visit.product_title}>{visit.product_title}</td>
                                                    <td className="py-2.5 text-right text-slate-400 text-[10px]">{visit.date}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}

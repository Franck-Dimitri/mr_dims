import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    ShoppingBag, DollarSign, TrendingUp, TrendingDown, Eye, Plus, Edit2, Trash2, 
    Link as LinkIcon, CheckCircle2, ShieldCheck, Sparkles, ExternalLink, HardDrive, Download, Copy, RefreshCw, X
} from 'lucide-react';

export default function Index({ auth, products, stats, chartData }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [copiedToken, setCopiedToken] = useState(null);

    const formatFCFA = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount || 0) + ' FCFA';
    };

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        title: '',
        category: 'formation_video',
        price: 100,
        original_price: 25000,
        ad_spend: 0,
        access_type: 'drive',
        access_url: '',
        tagline: '',
        description_markdown: '',
        cover_image: '',
        preview_video_url: '',
        access_details: '',
        badge_text: '',
        is_active: true,
        is_featured: false,
    });

    const openCreateModal = () => {
        reset();
        setEditingProduct(null);
        setIsCreateModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setData({
            title: product.title,
            category: product.category,
            price: product.price,
            original_price: product.original_price || '',
            ad_spend: product.ad_spend || 0,
            access_type: product.access_type || 'drive',
            access_url: product.access_url || '',
            tagline: product.tagline,
            description_markdown: product.description_markdown || '',
            cover_image: product.cover_image || '',
            preview_video_url: product.preview_video_url || '',
            access_details: product.access_details || '',
            badge_text: product.badge_text || '',
            is_active: product.is_active,
            is_featured: product.is_featured,
        });
        setIsCreateModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            put(route('admin.private-products.update', editingProduct.id), {
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                    reset();
                },
            });
        } else {
            post(route('admin.private-products.store'), {
                onSuccess: () => {
                    setIsCreateModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (productId) => {
        if (confirm('Voulez-vous vraiment supprimer ce produit digital ?')) {
            destroy(route('admin.private-products.destroy', productId));
        }
    };

    const copySalesLink = (product) => {
        const fullUrl = `${window.location.origin}/p/offer/${product.slug}/${product.token}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedToken(product.id);
        setTimeout(() => setCopiedToken(null), 2500);
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

                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Créer un Produit Digital</span>
                    </button>
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

                {/* Products Data Table */}
                <div className="bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h2 className="font-bold text-slate-900 dark:text-white text-sm">
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
                                    <th className="py-3.5 px-4">Dépense Pub</th>
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
                                        <td className="py-4 px-4 text-amber-600 font-bold">
                                            {formatFCFA(product.ad_spend)}
                                        </td>
                                        <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                                            {product.sales_count} ventes ({product.views_count} vues)
                                        </td>
                                        <td className="py-4 px-4">
                                            {product.access_type === 'drive' ? (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] rounded-md">
                                                    <HardDrive className="w-3 h-3" /> Drive
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] rounded-md">
                                                    <Download className="w-3 h-3" /> Direct Download
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => copySalesLink(product)}
                                                    className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors"
                                                    title="Copier le lien de vente privé"
                                                >
                                                    {copiedToken === product.id ? (
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    ) : (
                                                        <Copy className="w-4 h-4" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="p-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-600 dark:text-cyan-400 rounded-lg transition-colors"
                                                    title="Éditer"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
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

                {/* Create/Edit Product Modal */}
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
                        <div className="bg-white dark:bg-[#0E131F] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8">
                            
                            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-cyan-400" />
                                    <span>{editingProduct ? 'Modifier le Produit Digital' : 'Créer un Nouveau Produit Digital'}</span>
                                </h3>
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                                
                                {/* Title */}
                                <div>
                                    <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                                        Titre du Produit <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Ex: Masterclass CapCut Pro & Presets"
                                        className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none text-xs"
                                    />
                                </div>

                                {/* Category & Price Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                                            Catégorie <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs"
                                        >
                                            <option value="formation_video">Formation Vidéo</option>
                                            <option value="template_design">Design & Templates</option>
                                            <option value="ebook_guide">Ebook & Guide PDF</option>
                                            <option value="pack_ressources">Pack Ressources</option>
                                            <option value="template_system">Système & Solution</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                                            Prix Vente (FCFA) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            required
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                                            Dépense Pub (FCFA)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.ad_spend}
                                            onChange={(e) => setData('ad_spend', e.target.value)}
                                            placeholder="Ex: 15000"
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs"
                                        />
                                    </div>
                                </div>

                                {/* Access Type Selection (Drive vs Direct Download) */}
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                                    <label className="block text-slate-800 dark:text-slate-200 font-bold">
                                        Type d'Accès après Achat <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="access_type"
                                                value="drive"
                                                checked={data.access_type === 'drive'}
                                                onChange={(e) => setData('access_type', e.target.value)}
                                                className="text-indigo-600"
                                            />
                                            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                                <HardDrive className="w-3.5 h-3.5 text-blue-500" /> Dossier Google Drive
                                            </span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="access_type"
                                                value="direct_download"
                                                checked={data.access_type === 'direct_download'}
                                                onChange={(e) => setData('access_type', e.target.value)}
                                                className="text-indigo-600"
                                            />
                                            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                                                <Download className="w-3.5 h-3.5 text-emerald-500" /> Téléchargement Direct
                                            </span>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                                            Lien de la Ressource (URL Drive ou Lien Fichier) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            required
                                            value={data.access_url}
                                            onChange={(e) => setData('access_url', e.target.value)}
                                            placeholder="https://drive.google.com/... ou https://domaine.com/fichier.pdf"
                                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs"
                                        />
                                    </div>
                                </div>

                                {/* Tagline */}
                                <div>
                                    <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                                        Accroche courte (Tagline) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={data.tagline}
                                        onChange={(e) => setData('tagline', e.target.value)}
                                        placeholder="Ex: Découvrez comment maîtriser CapCut et créer des vidéos virales."
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs"
                                    />
                                </div>

                                {/* Description Markdown */}
                                <div>
                                    <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                                        Description détaillée (Markdown)
                                    </label>
                                    <textarea
                                        rows="4"
                                        value={data.description_markdown}
                                        onChange={(e) => setData('description_markdown', e.target.value)}
                                        placeholder="### Qu'allez-vous apprendre dans cette formation ?..."
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs font-mono"
                                    />
                                </div>

                                {/* Image Cover & Badge */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                                            URL Image de Couverture
                                        </label>
                                        <input
                                            type="url"
                                            value={data.cover_image}
                                            onChange={(e) => setData('cover_image', e.target.value)}
                                            placeholder="https://images.unsplash.com/..."
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                                            Badge Texte
                                        </label>
                                        <input
                                            type="text"
                                            value={data.badge_text}
                                            onChange={(e) => setData('badge_text', e.target.value)}
                                            placeholder="Ex: MINI-MASTERCLASS"
                                            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white text-xs"
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md"
                                    >
                                        {editingProduct ? 'Enregistrer les modifications' : 'Créer le produit'}
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}

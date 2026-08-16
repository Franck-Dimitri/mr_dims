import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft, Plus, Trash2, HardDrive, Download, Image as ImageIcon, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Edit({ auth, product }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: product.title,
        category: product.category,
        price: product.price,
        original_price: product.original_price || '',
        ad_spend: product.ad_spend || 0,
        access_type: product.access_type || 'drive',
        access_url: product.access_url || '',
        tagline: product.tagline,
        description_markdown: product.description_markdown || '',
        badge_text: product.badge_text || '',
        is_active: product.is_active,
        is_featured: product.is_featured,
        features: product.features && product.features.length > 0 ? product.features : [''],
        curriculum: product.curriculum && product.curriculum.length > 0 ? product.curriculum : [{ title: '', duration: '' }],
        cover_image: null,
        digital_file: null
    });

    const [imagePreview, setImagePreview] = useState(product.cover_image);
    const [fileError, setFileError] = useState(null);

    const handleFeatureChange = (index, value) => {
        const newFeatures = [...data.features];
        newFeatures[index] = value;
        setData('features', newFeatures);
    };

    const addFeature = () => {
        setData('features', [...data.features, '']);
    };

    const removeFeature = (index) => {
        const newFeatures = data.features.filter((_, i) => i !== index);
        setData('features', newFeatures);
    };

    const handleCurriculumChange = (index, field, value) => {
        const newCurriculum = [...data.curriculum];
        newCurriculum[index][field] = value;
        setData('curriculum', newCurriculum);
    };

    const addCurriculum = () => {
        setData('curriculum', [...data.curriculum, { title: '', duration: '' }]);
    };

    const removeCurriculum = (index) => {
        const newCurriculum = data.curriculum.filter((_, i) => i !== index);
        setData('curriculum', newCurriculum);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFileError(null);

        if (!file) {
            setData('cover_image', null);
            setImagePreview(product.cover_image);
            return;
        }

        setData('cover_image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFileError(null);

        if (data.access_type === 'direct_download' && !product.file_path && !data.digital_file) {
            setFileError("Veuillez charger le fichier numérique pour le téléchargement direct.");
            return;
        }

        post(route('admin.private-products.update', product.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout user={auth.user} header="Modifier le Produit Digital">
            <Head title="Modifier le Produit Digital" />

            <div className="py-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 font-sans text-xs">
                
                {/* Back Button */}
                <div className="mb-4">
                    <Link
                        href={route('admin.private-products.index')}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs font-semibold"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Retour à la liste</span>
                    </Link>
                </div>

                <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm">
                    <div className="border-b border-slate-100 pb-4 mb-6">
                        <h2 className="text-lg font-bold text-slate-900">
                            Modification du produit digital
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Modifiez les détails de votre offre numérique et enregistrez les changements.
                        </p>
                    </div>

                    {fileError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-150 rounded-xl text-red-700 flex items-start gap-2.5 font-semibold">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{fileError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Title */}
                        <div>
                            <label className="block text-slate-800 font-bold mb-2">
                                Titre du Produit <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Ex: Pack 500+ Templates Canva Pro pour Réseaux Sociaux"
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white text-xs font-medium"
                            />
                            {errors.title && <p className="text-red-500 mt-1">{errors.title}</p>}
                        </div>

                        {/* Tagline */}
                        <div>
                            <label className="block text-slate-800 font-bold mb-2">
                                Accroche courte (Tagline) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={data.tagline}
                                onChange={(e) => setData('tagline', e.target.value)}
                                placeholder="Ex: Économisez des dizaines d'heures de création. Modèles Canva 100% personnalisables..."
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white text-xs font-medium"
                            />
                            {errors.tagline && <p className="text-red-500 mt-1">{errors.tagline}</p>}
                        </div>

                        {/* Category & Pricing */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-slate-800 font-bold mb-2">
                                    Catégorie <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                                >
                                    <option value="formation_video">Formation Vidéo</option>
                                    <option value="template_design">Design & Templates</option>
                                    <option value="ebook_guide">Ebook & Guide PDF</option>
                                    <option value="pack_ressources">Pack Ressources</option>
                                    <option value="template_system">Système & Solution</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-slate-800 font-bold mb-2">
                                    Prix de Vente (FCFA) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                                />
                                {errors.price && <p className="text-red-500 mt-1">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-800 font-bold mb-2">
                                    Prix d'Origine (FCFA)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.original_price}
                                    onChange={(e) => setData('original_price', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                                />
                                {errors.original_price && <p className="text-red-500 mt-1">{errors.original_price}</p>}
                            </div>

                            <div>
                                <label className="block text-slate-800 font-bold mb-2">
                                    Budget Publicitaire (Pub)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={data.ad_spend}
                                    onChange={(e) => setData('ad_spend', e.target.value)}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                                />
                                {errors.ad_spend && <p className="text-red-500 mt-1">{errors.ad_spend}</p>}
                            </div>
                        </div>

                        {/* Description Markdown */}
                        <div>
                            <label className="block text-slate-800 font-bold mb-2">
                                Présentation Détaillée (Markdown)
                            </label>
                            <textarea
                                rows="6"
                                value={data.description_markdown}
                                onChange={(e) => setData('description_markdown', e.target.value)}
                                placeholder="### Créez des vidéos virales...&#10;&#10;Contenu détaillé du pack..."
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white text-xs font-mono"
                            />
                            {errors.description_markdown && <p className="text-red-500 mt-1">{errors.description_markdown}</p>}
                        </div>

                        {/* Local Cover Image Upload (Strictly 1 with replacement note) */}
                        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                            <label className="block text-slate-800 font-bold flex items-center gap-1.5">
                                <ImageIcon className="w-4 h-4 text-indigo-500" />
                                <span>Remplacer l'image de couverture (Laissez vide pour conserver l'image actuelle)</span>
                            </label>
                            
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
                            />
                            
                            {imagePreview && (
                                <div className="pt-2">
                                    <div className="relative w-48 aspect-video rounded-lg overflow-hidden border border-slate-200 shadow-xs">
                                        <img src={imagePreview} className="w-full h-full object-cover" alt="Aperçu de la couverture" />
                                        <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-indigo-600 text-white font-extrabold text-[8px] rounded uppercase shadow-sm">
                                            Couverture Actuelle
                                        </span>
                                    </div>
                                </div>
                            )}
                            {errors.cover_image && <p className="text-red-500 mt-1">{errors.cover_image}</p>}
                        </div>

                        {/* Access Settings & Digital File Upload */}
                        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
                            <label className="block text-slate-800 font-bold">
                                Paramètres de livraison & Livraison du fichier
                            </label>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="access_type"
                                        value="drive"
                                        checked={data.access_type === 'drive'}
                                        onChange={(e) => setData('access_type', e.target.value)}
                                        className="text-indigo-600"
                                    />
                                    <span className="font-bold text-slate-900 flex items-center gap-1">
                                        <HardDrive className="w-4 h-4 text-blue-500" /> Dossier Google Drive
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
                                    <span className="font-bold text-slate-900 flex items-center gap-1">
                                        <Download className="w-4 h-4 text-emerald-500" /> Téléchargement Direct sur le site
                                    </span>
                                </label>
                            </div>

                            {data.access_type === 'drive' ? (
                                <div>
                                    <label className="block text-slate-700 font-bold mb-1">
                                        URL de partage Google Drive <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="url"
                                        required={data.access_type === 'drive'}
                                        value={data.access_url}
                                        onChange={(e) => setData('access_url', e.target.value)}
                                        placeholder="https://drive.google.com/drive/folders/..."
                                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                                    />
                                    {errors.access_url && <p className="text-red-500 mt-1">{errors.access_url}</p>}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <label className="block text-slate-700 font-bold mb-1">
                                        Remplacer le Fichier Numérique Local (PDF, ZIP, MP4...) (Laissez vide pour conserver le fichier actuel)
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) => setData('digital_file', e.target.files[0])}
                                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-600 hover:file:bg-emerald-100 cursor-pointer"
                                    />
                                    {product.file_path && (
                                        <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Fichier actuel déjà enregistré en lieu sûr.
                                        </p>
                                    )}
                                    <p className="text-[10px] text-slate-500 font-semibold flex items-center gap-1 mt-1">
                                        <FileText className="w-3.5 h-3.5" /> Fichier sécurisé non accessible publiquement (100 Mo max).
                                    </p>
                                    {errors.digital_file && <p className="text-red-500 mt-1">{errors.digital_file}</p>}
                                </div>
                            )}
                        </div>

                        {/* Features List (Advantages) */}
                        <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <label className="text-slate-800 font-bold">
                                    Avantages / Caractéristiques (Features)
                                </label>
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold rounded-lg text-[10px] flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3" /> Ajouter
                                </button>
                            </div>

                            <div className="space-y-2.5">
                                {data.features.map((feat, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            required
                                            value={feat}
                                            onChange={(e) => handleFeatureChange(idx, e.target.value)}
                                            placeholder={`Caractéristique #${idx + 1}`}
                                            className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                                        />
                                        {data.features.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeFeature(idx)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content Specs (Curriculum) */}
                        <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                                <label className="text-slate-800 font-bold">
                                    Contenu & Spécifications Fichiers
                                </label>
                                <button
                                    type="button"
                                    onClick={addCurriculum}
                                    className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold rounded-lg text-[10px] flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3" /> Ajouter
                                </button>
                            </div>

                            <div className="space-y-2.5">
                                {data.curriculum.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            required
                                            value={item.title}
                                            onChange={(e) => handleCurriculumChange(idx, 'title', e.target.value)}
                                            placeholder="Ex: Fichier PDF principal"
                                            className="flex-grow px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                                        />
                                        <input
                                            type="text"
                                            required
                                            value={item.duration}
                                            onChange={(e) => handleCurriculumChange(idx, 'duration', e.target.value)}
                                            placeholder="Ex: 94 pages"
                                            className="w-1/3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                                        />
                                        {data.curriculum.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeCurriculum(idx)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra Settings Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-slate-50 border border-slate-200 rounded-xl">
                            <div>
                                <label className="block text-slate-800 font-bold mb-1">
                                    Badge Texte (Optionnel)
                                </label>
                                <input
                                    type="text"
                                    value={data.badge_text}
                                    onChange={(e) => setData('badge_text', e.target.value)}
                                    placeholder="Ex: MINI-MASTERCLASS, PDF"
                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
                                />
                            </div>

                            <div className="flex items-center gap-6 mt-6">
                                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="text-indigo-600 rounded"
                                    />
                                    <span>Activer le produit</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                                    <input
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="text-indigo-600 rounded"
                                    />
                                    <span>Mettre en avant</span>
                                </label>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="pt-5 border-t border-slate-100 flex items-center justify-end gap-3">
                            <Link
                                href={route('admin.private-products.index')}
                                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                            >
                                Annuler
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md uppercase tracking-wider"
                            >
                                Enregistrer les modifications
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}

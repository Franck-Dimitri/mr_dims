import React, { useEffect, useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, User, Mail, Phone, Globe, MapPin, Loader2, Sparkles } from 'lucide-react';
import PrivateOfferLayout from '@/Layouts/PrivateOfferLayout';

export default function Checkout({ product, token, orderHash, waitingPayment }) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        country: "Cameroun",
        city: 'Douala',
        payment_method: 'orange_money',
        notes: '',
    });

    const [pollError, setPollError] = useState(null);

    const formatFCFA = (amount) => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/p/checkout/${product.slug}/${token}`);
    };

    // Polling logic when payment is pending
    useEffect(() => {
        if (!waitingPayment || !orderHash) return;

        let pollInterval = setInterval(() => {
            fetch(`/p/checkout/status/${orderHash}`)
                .then((res) => res.json())
                .then((resData) => {
                    if (resData.status === 'SUCCESS') {
                        clearInterval(pollInterval);
                        window.location.href = `/p/success/${orderHash}`;
                    } else if (resData.status === 'FAILED') {
                        clearInterval(pollInterval);
                        setPollError("Le paiement a échoué ou a expiré. Veuillez vérifier votre solde et réessayer.");
                    }
                })
                .catch((err) => {
                    console.error('Error polling status:', err);
                });
        }, 5000);

        // Auto-timeout after 6 minutes (timeout is 10 min on server)
        let timeoutId = setTimeout(() => {
            clearInterval(pollInterval);
            setPollError("Délai d'attente dépassé. Si vous avez été débité, veuillez nous contacter.");
        }, 360000);

        return () => {
            clearInterval(pollInterval);
            clearTimeout(timeoutId);
        };
    }, [waitingPayment, orderHash]);

    const paymentMethods = [
        {
            id: 'orange_money',
            name: 'Orange Money Cameroun',
            description: 'Paiement instantané via Orange Money Cameroun (USSD)',
            badge: 'Orange Money',
            brandBg: 'bg-[#FF7900]',
            brandBorder: 'border-[#FF7900]',
            textColor: 'text-[#FF7900]',
            lightBg: 'bg-orange-50',
            disabled: false,
        },
        {
            id: 'mtn_momo',
            name: 'MTN Mobile Money Cameroun',
            description: 'Paiement instantané via MTN MoMo Cameroun',
            badge: 'MTN MoMo',
            brandBg: 'bg-[#FFCC00] text-slate-900',
            brandBorder: 'border-[#FFCC00]',
            textColor: 'text-yellow-600',
            lightBg: 'bg-yellow-50',
            disabled: false,
        },
    ];

    const popularCountries = [
        "Cameroun"
    ];

    return (
        <PrivateOfferLayout title={`Commande: ${product.title}`} accessToken={token}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
                
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href={`/p/offer/${product.slug}/${token}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Retour à la présentation</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Column: Checkout Form (7 Cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm">
                            
                            <div className="border-b border-slate-100 pb-4 mb-6">
                                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                                    Finaliser votre commande
                                </span>
                                <h2 className="text-xl font-bold text-slate-900 mt-1">
                                    Vos coordonnées de facturation & accès
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
                                
                                {/* Customer Name */}
                                <div>
                                    <label className="block text-slate-800 font-bold mb-2">
                                        Nom & Prénom <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                        <input
                                            type="text"
                                            required
                                            value={data.customer_name}
                                            onChange={(e) => setData('customer_name', e.target.value)}
                                            placeholder="Ex: Kouassi Franck"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 text-xs"
                                        />
                                    </div>
                                    {errors.customer_name && (
                                        <p className="text-red-500 text-[11px] mt-1">{errors.customer_name}</p>
                                    )}
                                </div>

                                {/* Customer Email */}
                                <div>
                                    <label className="block text-slate-800 font-bold mb-2">
                                        Adresse E-mail (pour la réception de vos accès) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                        <input
                                            type="email"
                                            required
                                            value={data.customer_email}
                                            onChange={(e) => setData('customer_email', e.target.value)}
                                            placeholder="Ex: exemple@domaine.com"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 text-xs"
                                        />
                                    </div>
                                    {errors.customer_email && (
                                        <p className="text-red-500 text-[11px] mt-1">{errors.customer_email}</p>
                                    )}
                                </div>

                                {/* Customer Phone */}
                                <div>
                                    <label className="block text-slate-800 font-bold mb-2">
                                        Numéro Téléphone / Mobile Money <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                        <input
                                            type="tel"
                                            required
                                            value={data.customer_phone}
                                            onChange={(e) => setData('customer_phone', e.target.value)}
                                            placeholder="Ex: 0700000000"
                                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 text-xs"
                                        />
                                    </div>
                                    {errors.customer_phone && (
                                        <p className="text-red-500 text-[11px] mt-1">{errors.customer_phone}</p>
                                    )}
                                </div>

                                {/* Country & City Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    
                                    {/* Country Selection */}
                                    <div>
                                        <label className="block text-slate-800 font-bold mb-2">
                                            Pays <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                            <select
                                                required
                                                value={data.country}
                                                onChange={(e) => setData('country', e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 text-xs appearance-none"
                                            >
                                                {popularCountries.map((c, idx) => (
                                                    <option key={idx} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        {errors.country && (
                                            <p className="text-red-500 text-[11px] mt-1">{errors.country}</p>
                                        )}
                                    </div>

                                    {/* City Input */}
                                    <div>
                                        <label className="block text-slate-800 font-bold mb-2">
                                            Ville <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                                            <input
                                                type="text"
                                                required
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                                placeholder="Ex: Abidjan, Dakar..."
                                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-indigo-600 text-xs"
                                            />
                                        </div>
                                        {errors.city && (
                                            <p className="text-red-500 text-[11px] mt-1">{errors.city}</p>
                                        )}
                                    </div>

                                </div>

                                {/* Payment Method Selection */}
                                <div className="pt-4 border-t border-slate-100">
                                    <label className="block text-slate-800 font-bold mb-3">
                                        Choisissez votre mode de paiement <span className="text-red-500">*</span>
                                    </label>

                                    <div className="space-y-3">
                                        {paymentMethods.map((method) => {
                                            const isSelected = data.payment_method === method.id;
                                            return (
                                                <div
                                                    key={method.id}
                                                    onClick={() => !method.disabled && setData('payment_method', method.id)}
                                                    className={`p-4 border-2 rounded-xl transition-all flex items-center justify-between ${
                                                        method.disabled
                                                            ? 'opacity-40 cursor-not-allowed border-slate-100 bg-slate-50'
                                                            : isSelected
                                                            ? `${method.brandBorder} ${method.lightBg} shadow-xs font-semibold cursor-pointer`
                                                            : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 cursor-pointer'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-4 h-4 border flex items-center justify-center rounded-full ${isSelected ? 'border-indigo-600' : 'border-slate-400'}`}>
                                                            {isSelected && <div className="w-2 h-2 bg-indigo-600 rounded-full" />}
                                                        </div>
                                                        <div>
                                                            <div className="text-slate-900 font-bold flex items-center gap-2">
                                                                <span>{method.name}</span>
                                                            </div>
                                                            <div className="text-[11px] text-slate-500 font-normal">
                                                                {method.description}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Visual Brand Badge */}
                                                    <span className={`text-[10px] px-2.5 py-1 rounded-lg text-white font-extrabold shadow-xs ${method.brandBg}`}>
                                                        {method.badge}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Submit Button: PAYER MAINTENANT */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg uppercase tracking-wider disabled:opacity-50 mt-6"
                                >
                                    <span>PAYER MAINTENANT ({formatFCFA(product.price)})</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Order Summary (5 Cols) */}
                    <div className="lg:col-span-5">
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm sticky top-24">
                            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                                Récapitulatif de la commande
                            </span>

                            <div className="flex gap-4 items-center my-4 pb-4 border-b border-slate-100">
                                <img
                                    src={product.cover_image}
                                    alt={product.title}
                                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
                                />
                                <div>
                                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2">
                                        {product.title}
                                    </h3>
                                    <span className="inline-block mt-1 px-2.5 py-0.5 bg-indigo-50 text-indigo-600 font-semibold text-[10px] rounded-full uppercase border border-indigo-100">
                                        {product.category.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>

                            {/* Breakdown */}
                            <div className="space-y-2.5 text-xs text-slate-700 pb-4 border-b border-slate-100">
                                <div className="flex justify-between">
                                    <span>Prix du produit :</span>
                                    <span>{formatFCFA(product.price)}</span>
                                </div>
                                <div className="flex justify-between text-emerald-600 font-semibold">
                                    <span>Frais de livraison numérique :</span>
                                    <span>GRATUIT (0 FCFA)</span>
                                </div>
                                <div className="flex justify-between font-extrabold text-sm text-indigo-600 pt-2 border-t border-slate-100">
                                    <span>Total à régler :</span>
                                    <span>{formatFCFA(product.price)}</span>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 text-xs text-slate-500">
                                <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                                    <ShieldCheck className="w-4 h-4 shrink-0" />
                                    <span>Délivrance automatique après validation</span>
                                </div>
                                <p className="text-[11px] leading-relaxed">
                                    Après validation du règlement, vous recevrez directement l'accès à vos ressources digitales.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Animated Light-Theme Pending Payment Modal */}
                <AnimatePresence>
                    {waitingPayment && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 10 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.95, y: 10 }}
                                className="bg-white border border-slate-200 p-8 rounded-3xl max-w-md w-full shadow-2xl text-center space-y-6"
                            >
                                <div className="flex justify-center relative">
                                    <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 animate-pulse">
                                        <Loader2 className="w-8 h-8 animate-spin" />
                                    </div>
                                    <div className="absolute top-0 right-0 p-1">
                                        <Sparkles className="w-4 h-4 text-indigo-500 animate-bounce" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Paiement Mobile Money en cours...
                                    </h3>
                                    <div className="px-4 py-1.5 bg-indigo-50 text-indigo-700 font-extrabold text-[10px] rounded-full uppercase tracking-wider inline-block">
                                        Référence : {orderHash}
                                    </div>
                                </div>

                                {pollError ? (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium">
                                        {pollError}
                                        <div className="mt-3">
                                            <a
                                                href={`/p/checkout/${product.slug}/${token}`}
                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold inline-block text-[11px] shadow-sm uppercase tracking-wider"
                                            >
                                                Réessayer
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
                                        <p>
                                            Un message de confirmation USSD / Push a été envoyé sur votre téléphone. 
                                            <strong> Veuillez y saisir votre code PIN secret</strong> pour valider le montant de <span className="text-indigo-600 font-bold">{formatFCFA(product.price)}</span>.
                                        </p>
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] leading-normal text-slate-500">
                                            Ne fermez pas cette page. Notre système validera et débloquera automatiquement votre accès dès détection du débit.
                                        </div>
                                    </div>
                                )}

                                {!pollError && (
                                    <div className="pt-2">
                                        <a
                                            href={`/p/checkout/${product.slug}/${token}`}
                                            className="text-xs font-semibold text-slate-400 hover:text-slate-600 underline"
                                        >
                                            Annuler et modifier les informations
                                        </a>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </PrivateOfferLayout>
    );
}

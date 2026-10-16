import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import SEO from '@/Components/SEO';
import { motion } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';

export default function Contact() {
    const { lang } = useLanguage() || { lang: 'fr' };
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        message: '',
        platform_origin: 'web',
        attachment: null,
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const prefill = params.get('prefill');
        if (prefill) {
            setData('message', prefill);
        }
    }, []);

    const submitContact = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <BlueprintLayout>
            <SEO 
                title={lang === 'en' ? "Contact & Software Architecture Inquiry — Franck Dimitri" : "Contact & Devis — Franck Dimitri | Architecte Logiciel"}
                description={lang === 'en' ? "Initiate an exchange with Franck Dimitri (Mr Dim's) for custom software architecture, web engineering, and consulting." : "Échangez directement avec Franck Dimitri (Mr Dim's) pour vos projets d'architecture logicielle, développement web et intégrations d'APIs."}
                keywords="Contact, Devis, Architecte Logiciel, Développeur Web, Yaoundé, Cameroun, Franck Dimitri"
            />

            {/* ========================================================= */}
            {/* 1. EN-TÊTE CONTACT                                        */}
            {/* ========================================================= */}
            <section className="relative pt-12 pb-14 border-b border-neutral-200/80 dark:border-neutral-800/80 font-sans overflow-hidden">
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="max-w-6xl mx-auto h-full border-x border-dashed border-neutral-200/50 dark:border-neutral-800/50 relative">
                        <span className="absolute top-4 -left-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute top-4 -right-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute bottom-4 -left-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                        <span className="absolute bottom-4 -right-1 text-[10px] font-mono font-bold text-cyan-500/60">+</span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold mb-4">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-none animate-pulse"></span>
                            <span>CANAUX // ÉCHANGE & COLLABORATION</span>
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-900 dark:text-white mb-4">
                            Initier un échange
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                            Besoin d'un cadrage technique, d'un renfort d'ingénierie logicielle ou d'une estimation budgétaire ? Envoyez un message ou utilisez nos canaux directs.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 2. FORMULAIRE ET CARTES DE CONTACT CARRÉES                */}
            {/* ========================================================= */}
            <section className="py-16 relative z-10 font-sans">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <div className="grid lg:grid-cols-12 gap-10 items-start">
                        
                        {/* Formulaire Principal (Gauche) */}
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="lg:col-span-7 relative p-7 sm:p-8 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none shadow-xl"
                        >
                            {/* Coins carrés avec + */}
                            <span className="absolute -top-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -top-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -bottom-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>
                            <span className="absolute -bottom-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none">+</span>

                            <motion.form variants={fadeInUp} onSubmit={submitContact} className="flex flex-col gap-5">
                                <div className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest pb-3 border-b border-neutral-100 dark:border-neutral-800">
                                    // FORMULAIRE DE TRANSMISSION
                                </div>

                                {recentlySuccessful && (
                                    <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider rounded-none">
                                        [ TRANSMISSION RÉUSSIE ] Votre message a été bien transmis. Je vous réponds sous 24h.
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                                            Nom complet
                                        </label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)} 
                                            className="w-full bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 focus:border-cyan-500 focus:ring-0 rounded-none p-3 text-sm text-neutral-900 dark:text-white font-sans"
                                            placeholder="Ex: Franck Dimitri"
                                        />
                                        {errors.name && <div className="text-red-500 text-xs mt-1 font-mono">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                                            Adresse email
                                        </label>
                                        <input 
                                            type="email" 
                                            required
                                            value={data.email} 
                                            onChange={e => setData('email', e.target.value)} 
                                            className="w-full bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 focus:border-cyan-500 focus:ring-0 rounded-none p-3 text-sm text-neutral-900 dark:text-white font-sans"
                                            placeholder="vous@exemple.com"
                                        />
                                        {errors.email && <div className="text-red-500 text-xs mt-1 font-mono">{errors.email}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                                        Message ou Spécifications
                                    </label>
                                    <textarea 
                                        rows="5" 
                                        required
                                        value={data.message} 
                                        onChange={e => setData('message', e.target.value)}
                                        className="w-full bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 focus:border-cyan-500 focus:ring-0 rounded-none p-3 text-sm text-neutral-900 dark:text-white resize-none font-sans"
                                        placeholder="Décrivez votre besoin technique ou votre projet..."
                                    ></textarea>
                                    {errors.message && <div className="text-red-500 text-xs mt-1 font-mono">{errors.message}</div>}
                                </div>

                                <div>
                                    <label className="block text-xs font-mono font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-1.5">
                                        Pièce jointe (Optionnel : PDF, DOC, IMG max 2Mo)
                                    </label>
                                    <input 
                                        type="file" 
                                        onChange={e => setData('attachment', e.target.files[0])}
                                        className="w-full bg-neutral-50 dark:bg-[#111622] border border-neutral-200 dark:border-neutral-800 rounded-none p-2 text-xs text-neutral-500 file:mr-4 file:py-1.5 file:px-3 file:border-0 file:text-xs file:font-mono file:font-bold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 transition-colors"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    />
                                    {errors.attachment && <div className="text-red-500 text-xs mt-1 font-mono">{errors.attachment}</div>}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full sm:w-auto self-start px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors rounded-none disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {processing ? 'TRANSMISSION EN COURS...' : 'ENVOYER LE MESSAGE →'}
                                </button>
                            </motion.form>
                        </motion.div>

                        {/* Colonne Droite : Coordonnées Directes & Cadrage */}
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="lg:col-span-5 flex flex-col gap-6"
                        >
                            {/* Carte WhatsApp Direct Carrée */}
                            <motion.div variants={fadeInUp} className="relative p-7 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none shadow-md">
                                <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                                <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                                <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                                <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>

                                <div className="flex items-center gap-3 mb-3">
                                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-none animate-pulse"></span>
                                    <h3 className="font-bold text-base uppercase text-neutral-900 dark:text-white font-sans">
                                        Échange direct WhatsApp
                                    </h3>
                                </div>
                                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed font-sans">
                                    Vous préférez discuter directement ? Écrivez-moi sur WhatsApp, réponse rapide garantie sous 1h pendant les heures d'ouverture.
                                </p>
                                <a
                                    href="https://wa.me/237676383986?text=Bonjour%20Franck,%20j%27ai%20d%C3%A9couvert%20votre%20portfolio%20et%20j%27aimerais%20%C3%A9changer%20avec%20vous%20sur%20un%20projet."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-none transition-colors"
                                >
                                    <span>Ouvrir WhatsApp (+237 676 383 986)</span>
                                    <span>→</span>
                                </a>
                            </motion.div>

                            {/* Cadrage Technique Offert Carré */}
                            <motion.div variants={fadeInUp} className="relative p-7 bg-white dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 rounded-none shadow-md">
                                <span className="absolute -top-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                                <span className="absolute -top-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                                <span className="absolute -bottom-2 -left-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>
                                <span className="absolute -bottom-2 -right-1.5 text-xs font-mono font-bold text-cyan-500 select-none">+</span>

                                <div className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest mb-2">
                                    [ SANS ENGAGEMENT ]
                                </div>
                                <h3 className="text-base font-bold text-neutral-900 dark:text-white uppercase mb-3 font-sans">
                                    Session d'orientation technique (20 min)
                                </h3>
                                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 mb-5 font-sans">
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-500 font-bold">✓</span>
                                        <span>Validation de la faisabilité technique de votre projet.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-500 font-bold">✓</span>
                                        <span>Recommandation de la pile technologique optimale.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyan-500 font-bold">✓</span>
                                        <span>Estimation du budget et du planning sous 48h.</span>
                                    </li>
                                </ul>

                                <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500">
                                    <span>📍 YAOUNDÉ & REMOTE</span>
                                    <span className="text-emerald-500 font-bold">DISPONIBLE</span>
                                </div>
                            </motion.div>

                            {/* Réseaux Directs Carrés */}
                            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3 font-mono text-xs">
                                <a 
                                    href="https://github.com/Franck-Dimitri"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3.5 bg-neutral-50 dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 text-neutral-700 dark:text-neutral-300 hover:text-cyan-500 transition-colors flex items-center justify-between rounded-none"
                                >
                                    <span className="font-bold">GITHUB</span>
                                    <span>↗</span>
                                </a>

                                <a 
                                    href="https://linkedin.com/in/franck-dimitri-kouongme"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3.5 bg-neutral-50 dark:bg-[#0A0E17] border border-neutral-200 dark:border-neutral-800 hover:border-cyan-500 text-neutral-700 dark:text-neutral-300 hover:text-cyan-500 transition-colors flex items-center justify-between rounded-none"
                                >
                                    <span className="font-bold">LINKEDIN</span>
                                    <span>↗</span>
                                </a>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

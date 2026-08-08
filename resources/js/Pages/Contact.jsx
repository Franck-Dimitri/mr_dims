import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import { motion } from 'framer-motion';
import { useLanguage } from '@/Context/LanguageContext';

export default function Contact() {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        message: '',
        platform_origin: 'web',
        attachment: null,
    });

    React.useEffect(() => {
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
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <BlueprintLayout>
            <Head title="Contact - Ingénieur Full Stack" />

            <section className="relative pt-24 pb-32 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 overflow-hidden min-h-[calc(100vh-80px)] flex items-center z-10 font-sans">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    
                    {/* Header */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
                    >
                        <div>
                            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold mb-6">
                                <div className="w-2 h-2 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-ping"></div>
                                Module Contact & Devis
                            </motion.div>
                            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-sans">
                                <span className="text-blueprint-textDark dark:text-white">Établir le</span>{' '}
                                <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">Contact</span>
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                                Discutons de votre projet et de votre architecture logicielle. Utilisez le formulaire classique ou nos canaux directs ci-dessous.
                            </motion.p>
                        </div>

                        {/* Photo */}
                        <motion.div variants={fadeInUp} className="shrink-0 hidden md:block">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gray-100 dark:bg-[#1A1A1A] border-2 border-blueprint-bluePrimary dark:border-blueprint-cyan overflow-hidden shadow-xl rounded-2xl rotate-3 hover:rotate-0 transition-transform duration-500 group">
                                <img 
                                    src="/profile.jpg" 
                                    alt="Mr Dim's" 
                                    className="absolute inset-0 w-full h-full object-cover z-10 grayscale group-hover:grayscale-0 transition-all duration-700"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full items-center justify-center bg-[#1A1A1A] text-gray-500 text-xs font-mono font-bold z-0" style={{ display: 'none' }}>
                                    Photo Profil
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start">
                        {/* Form and Socials */}
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-8 shadow-2xl relative rounded-2xl font-sans"
                        >
                            <motion.form variants={fadeInUp} onSubmit={submitContact} className="flex flex-col gap-6">
                                <div className="text-xs font-bold text-gray-500 mb-2 border-b border-gray-200 dark:border-gray-800 pb-4">
                                    Formulaire de Contact
                                </div>

                                {recentlySuccessful && (
                                    <div className="p-4 bg-green-500/10 border border-green-500 text-green-700 dark:text-green-400 text-xs rounded-xl flex items-center gap-3 font-sans">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        Votre message a bien été transmis. Je vous réponds sous 24h !
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Nom complet ou Entreprise</label>
                                        <input 
                                            type="text" 
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)} 
                                            className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-xl p-3.5 text-sm"
                                            placeholder="Ex: John Doe / Corp Inc."
                                        />
                                        {errors.name && <div className="text-red-500 text-xs mt-2">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Adresse Email</label>
                                        <input 
                                            type="email" 
                                            value={data.email} 
                                            onChange={e => setData('email', e.target.value)} 
                                            className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-xl p-3.5 text-sm"
                                            placeholder="contact@domaine.com"
                                        />
                                        {errors.email && <div className="text-red-500 text-xs mt-2">{errors.email}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Cahier des charges ou Message</label>
                                    <textarea 
                                        rows="4" 
                                        value={data.message} 
                                        onChange={e => setData('message', e.target.value)}
                                        className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-xl p-3.5 text-sm resize-y"
                                        placeholder="Spécifiez vos besoins techniques ici..."
                                    ></textarea>
                                    {errors.message && <div className="text-red-500 text-xs mt-2">{errors.message}</div>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Pièce jointe (Max 2Mo : PDF, DOC, IMG)</label>
                                    <input 
                                        type="file" 
                                        onChange={e => setData('attachment', e.target.files[0])}
                                        className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-xl p-2 text-xs file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:rounded-lg file:bg-blueprint-bluePrimary/10 file:text-blueprint-bluePrimary hover:file:bg-blueprint-bluePrimary/20 transition-colors"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    />
                                    {errors.attachment && <div className="text-red-500 text-xs mt-2">{errors.attachment}</div>}
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full px-10 py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                                >
                                    {processing ? 'Transmission en cours...' : 'Envoyer le message'}
                                </motion.button>
                            </motion.form>

                            <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <div className="text-xs font-bold text-gray-500 mb-4 text-center">
                                    Canaux de communication directs
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
                                    <a 
                                        href="https://wa.me/237676383986?text=Bonjour%20Mr%20Dims,%20je%20souhaite%20discuter%20d\'un%20projet"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => setData('platform_origin', 'whatsapp')}
                                        className="text-gray-500 hover:text-[#25D366] transition-colors flex items-center gap-2"
                                    >
                                        WhatsApp
                                    </a>
                                    
                                    <a 
                                        href="mailto:franckdimitri009@gmail.com"
                                        className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
                                    >
                                        Email
                                    </a>
                                    
                                    <a 
                                        href="https://github.com/Franck-Dimitri"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-gray-500 hover:text-blueprint-bluePrimary dark:hover:text-blueprint-cyan transition-colors flex items-center gap-2"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

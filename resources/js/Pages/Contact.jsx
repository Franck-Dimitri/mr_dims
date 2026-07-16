import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import BlueprintLayout from '@/Layouts/BlueprintLayout';
import { motion } from 'framer-motion';

export default function Contact() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        message: '',
        platform_origin: 'web',
        attachment: null,
    });

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

            <section className="relative pt-24 pb-32 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 overflow-hidden min-h-[calc(100vh-80px)] flex items-center z-10">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    
                    {/* Header */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
                    >
                        <div>
                            <motion.div variants={fadeInUp} className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold mb-6">
                                <div className="w-2 h-2 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-ping"></div>
                                MODULE: COMMUNICATION
                            </motion.div>
                            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase mb-6">
                                <span className="text-blueprint-textDark dark:text-white">ÉTABLIR LE</span>{' '}
                                <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">CONTACT</span>
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="font-mono text-sm uppercase tracking-widest text-gray-500 max-w-2xl leading-relaxed">
                                DISCUTONS DE VOTRE ARCHITECTURE LOGICIELLE. UTILISEZ LE FORMULAIRE CLASSIQUE, NOS CANAUX DIRECTS OU PLANIFIEZ UN APPEL VIDÉO IMMÉDIATEMENT.
                            </motion.p>
                        </div>

                        {/* Photo */}
                        <motion.div variants={fadeInUp} className="shrink-0 hidden md:block">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gray-100 dark:bg-[#1A1A1A] border-2 border-blueprint-bluePrimary dark:border-blueprint-cyan overflow-hidden shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500 group">
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
                                    PHOTO ICI
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
                            className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-8 shadow-2xl relative"
                        >
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan -translate-x-px -translate-y-px"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan translate-x-px -translate-y-px"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan -translate-x-px translate-y-px"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan translate-x-px translate-y-px"></div>

                            <motion.form variants={fadeInUp} onSubmit={submitContact} className="flex flex-col gap-6">
                                <div className="text-[10px] font-bold font-mono tracking-widest uppercase text-gray-500 mb-2 border-b border-gray-200 dark:border-gray-800 pb-4">
                                    [ FORMULAIRE_STANDARD ]
                                </div>

                                {recentlySuccessful && (
                                    <div className="p-4 bg-green-500/10 border border-green-500 text-green-700 dark:text-green-400 font-mono text-xs uppercase tracking-widest flex items-center gap-3">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        STATUS: TRANSMISSION_RÉUSSIE. EN ATTENTE D'ACK.
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">ID_ENTITÉ (NOM)</label>
                                        <input 
                                            type="text" 
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)} 
                                            className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-none p-4 font-mono text-sm"
                                            placeholder="Ex: John Doe / Corp Inc."
                                        />
                                        {errors.name && <div className="text-red-500 text-[10px] font-mono mt-2 uppercase">{errors.name}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">END_POINT (EMAIL)</label>
                                        <input 
                                            type="email" 
                                            value={data.email} 
                                            onChange={e => setData('email', e.target.value)} 
                                            className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-none p-4 font-mono text-sm"
                                            placeholder="contact@domaine.com"
                                        />
                                        {errors.email && <div className="text-red-500 text-[10px] font-mono mt-2 uppercase">{errors.email}</div>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">PAYLOAD (MESSAGE)</label>
                                    <textarea 
                                        rows="4" 
                                        value={data.message} 
                                        onChange={e => setData('message', e.target.value)}
                                        className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-none p-4 font-mono text-sm resize-y"
                                        placeholder="Spécifiez les requis techniques ici..."
                                    ></textarea>
                                    {errors.message && <div className="text-red-500 text-[10px] font-mono mt-2 uppercase">{errors.message}</div>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold font-mono tracking-widest mb-2 uppercase text-gray-500">PIÈCE JOINTE (MAX 2MO : PDF, DOC, IMG)</label>
                                    <input 
                                        type="file" 
                                        onChange={e => setData('attachment', e.target.files[0])}
                                        className="w-full bg-[#F9FAFB] dark:bg-[#111827] border border-gray-200 dark:border-gray-800 focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:ring-1 focus:ring-blueprint-bluePrimary dark:focus:ring-blueprint-cyan rounded-none p-2 font-mono text-xs file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-mono file:font-bold file:uppercase file:bg-blueprint-bluePrimary/10 file:text-blueprint-bluePrimary hover:file:bg-blueprint-bluePrimary/20 transition-colors"
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    />
                                    {errors.attachment && <div className="text-red-500 text-[10px] font-mono mt-2 uppercase">{errors.attachment}</div>}
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full px-10 py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {processing ? (
                                        <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> COMPILATION...</>
                                    ) : (
                                        <><span className="font-mono">{'>_'}</span> EXECUTER_POST()</>
                                    )}
                                </motion.button>
                            </motion.form>

                            <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                                <div className="text-[10px] font-bold font-mono tracking-widest mb-6 uppercase text-gray-500 text-center">
                                    [ CANAUX_DIRECTS ]
                                </div>
                                <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono tracking-widest uppercase">
                                    
                                    <a 
                                        href="https://wa.me/237676383986?text=Bonjour%20Mr%20Dims,%20je%20souhaite%20discuter%20d\'un%20projet"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => setData('platform_origin', 'whatsapp')}
                                        className="text-gray-400 hover:text-[#25D366] transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.618-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.664.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964 1.003-3.588c-.608-1.033-.926-2.22-.926-3.441 0-4.111 3.346-7.457 7.466-7.457 4.118 0 7.463 3.346 7.463 7.458-.001 4.114-3.345 7.459-7.464 7.459z"/></svg>
                                        WHATSAPP
                                    </a>

                                    <a 
                                        href="mailto:franckdimitri009@gmail.com"
                                        className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12.713l11.985-8.713h-23.97l11.985 8.713zm0 2.574l-12-8.727v14.44h24v-14.44l-12 8.727z"/></svg>
                                        EMAIL
                                    </a>

                                    <a 
                                        href="https://github.com/Franck-Dimitri"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-gray-400 hover:text-blueprint-textDark dark:hover:text-white transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                        GITHUB
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Booking Appointment (Calendly Placeholder) */}
                        {/* Booking Appointment (Under Development) */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            className="h-full flex flex-col bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden relative min-h-[500px]"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></div>
                            
                            <div className="p-8 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-xl tracking-tighter uppercase text-blueprint-textDark dark:text-white flex items-center gap-2">
                                        <svg className="w-5 h-5 text-blueprint-bluePrimary dark:text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        PROGRAMMER UN APPEL
                                    </h3>
                                    <p className="font-mono text-[10px] tracking-widest text-gray-500 uppercase mt-2">
                                        RÉSERVATION EN LIGNE
                                    </p>
                                </div>
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 text-blueprint-bluePrimary dark:text-blueprint-cyan">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </div>
                            </div>
                            
                            <div className="flex-1 bg-[#F9FAFB] dark:bg-[#111827] flex flex-col items-center justify-center p-8 text-center">
                                <div className="max-w-md space-y-6">
                                    {/* Architectural grid element representing construction / under development */}
                                    <div className="relative mx-auto w-24 h-24 border border-dashed border-gray-400 dark:border-gray-700 flex items-center justify-center">
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
                                        <svg className="w-10 h-10 text-blueprint-bluePrimary dark:text-blueprint-cyan animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-lg uppercase tracking-tight text-blueprint-textDark dark:text-white">
                                            MODULE EN COURS DE DÉVELOPPEMENT
                                        </h4>
                                        <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                                            L'intégration de la planification d'appels automatique est actuellement indisponible.
                                        </p>
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        Pour toute demande d'entretien ou de réunion technique, veuillez utiliser le formulaire de contact ci-contre ou m'envoyer directement un courriel par mail.
                                    </p>
                                    
                                    <div className="pt-4">
                                        <a 
                                            href="mailto:franckdimitri009@gmail.com" 
                                            className="inline-flex items-center gap-2 px-6 py-3 border border-blueprint-bluePrimary dark:border-blueprint-cyan text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold font-mono tracking-widest text-xs uppercase hover:bg-blueprint-bluePrimary/10 dark:hover:bg-blueprint-cyan/10 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            FRANCKDIMITRI009@GMAIL.COM
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>
        </BlueprintLayout>
    );
}

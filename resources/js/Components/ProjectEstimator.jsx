import React, { useState } from 'react';
import { useLanguage } from '@/Context/LanguageContext';

export default function ProjectEstimator() {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };
    const [projectType, setProjectType] = useState('webapp');
    const [features, setFeatures] = useState(['auth', 'admin']);
    const [support, setSupport] = useState('3months');

    const projectTypes = [
        { id: 'vitrine', label: lang === 'en' ? 'PORTFOLIO / SHOWCASE SITE' : 'SITE VITRINE / PORTFOLIO', basePrice: 165500 },
        { id: 'webapp', label: lang === 'en' ? 'CUSTOM WEB APP (SAAS)' : 'WEB APP SUR-MESURE (SAAS)', basePrice: 600000 },
        { id: 'ecommerce', label: lang === 'en' ? 'E-COMMERCE PLATFORM' : 'PLATEFORME E-COMMERCE', basePrice: 500000 },
        { id: 'api', label: lang === 'en' ? 'BACKEND API & MICROSERVICES' : 'API BACKEND & MICROSERVICES', basePrice: 400000 },
    ];

    const featureOptions = [
        { id: 'auth', label: lang === 'en' ? 'AUTHENTICATION & ROLES (JWT / SANCTUM)' : 'AUTHENTIFICATION & RÔLES (JWT / SANCTUM)', price: 80000 },
        { id: 'admin', label: lang === 'en' ? 'CUSTOM ADMIN DASHBOARD' : 'BACK-OFFICE ADMIN SUR-MESURE', price: 120000 },
        { id: 'payments', label: lang === 'en' ? 'PAYMENT INTEGRATION (MOBILE MONEY / STRIPE)' : 'INTÉGRATION PAIEMENTS (MOBILE MONEY / STRIPE)', price: 100000 },
        { id: 'i18n', label: lang === 'en' ? 'MULTILINGUAL SUPPORT (FR / EN)' : 'SUPPORT MULTILINGUE (FR / EN)', price: 60000 },
        { id: 'realtime', label: lang === 'en' ? 'REAL-TIME FEATURES (WEBSOCKETS)' : 'FONCTIONNALITÉS TEMPS RÉEL (WEBSOCKETS)', price: 150000 },
    ];

    const supportOptions = [
        { id: 'none', label: lang === 'en' ? 'NO SUPPORT AFTER DELIVERY' : 'SANS SUPPORT APRÈS LIVRAISON', price: 0 },
        { id: '3months', label: lang === 'en' ? 'SUPPORT & FIXES (3 MONTHS)' : 'SUPPORT & CORRECTIONS (3 MOIS)', price: 90000 },
        { id: '1year', label: lang === 'en' ? 'MAINTENANCE & UPDATES (1 YEAR)' : 'MAINTENANCE & MISES À JOUR (1 AN)', price: 250000 },
    ];

    const toggleFeature = (id) => {
        if (features.includes(id)) {
            setFeatures(features.filter(f => f !== id));
        } else {
            setFeatures([...features, id]);
        }
    };

    const selectedType = projectTypes.find(t => t.id === projectType);
    const base = selectedType ? selectedType.basePrice : 0;
    const featuresCost = features.reduce((acc, fId) => {
        const item = featureOptions.find(f => f.id === fId);
        return acc + (item ? item.price : 0);
    }, 0);
    const selectedSupport = supportOptions.find(s => s.id === support);
    const supportCost = selectedSupport ? selectedSupport.price : 0;

    const totalEstimate = base + featuresCost + supportCost;

    const generateSummary = () => {
        const fNames = features.map(fId => featureOptions.find(f => f.id === fId)?.label).join(', ');
        const message = lang === 'en'
            ? `Hello Mr Dim's, I would like to order a project: ${selectedType?.label}. Features: ${fNames}. Support: ${selectedSupport?.label}. Estimate: ${totalEstimate.toLocaleString()} FCFA.`
            : `Bonjour Mr Dim's, je souhaite commander un projet : ${selectedType?.label}. Options : ${fNames}. Support : ${selectedSupport?.label}. Estimation : ${totalEstimate.toLocaleString()} FCFA.`;
        window.location.href = `/contact?prefill=${encodeURIComponent(message)}`;
    };

    return (
        <div className="bg-white dark:bg-[#0B0F19] border border-blueprint-bluePrimary/40 dark:border-blueprint-cyan/40 p-8 relative font-mono rounded-none shadow-2xl">
            {/* Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blueprint-bluePrimary dark:border-blueprint-cyan"></div>

            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div className="w-2.5 h-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-ping"></div>
                <h3 className="text-sm font-bold tracking-widest text-blueprint-textDark dark:text-white uppercase">
                    {t('estimator_title')}
                </h3>
            </div>

            <div className="space-y-8">
                {/* 1. Type de Projet */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{t('estimator_step1')}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {projectTypes.map(t => (
                            <button 
                                key={t.id} 
                                onClick={() => setProjectType(t.id)}
                                className={`p-4 text-left border rounded-none text-xs transition-colors flex justify-between items-center ${projectType === t.id ? 'border-blueprint-bluePrimary dark:border-blueprint-cyan bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold' : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-400'}`}
                            >
                                <span>{t.label}</span>
                                <span className="text-[10px] opacity-70">{lang === 'en' ? 'from' : 'dès'} {t.basePrice.toLocaleString()} FCFA</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Fonctionnalités */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{t('estimator_step2')}</label>
                    <div className="space-y-2">
                        {featureOptions.map(f => {
                            const isChecked = features.includes(f.id);
                            return (
                                <button 
                                    key={f.id}
                                    onClick={() => toggleFeature(f.id)}
                                    className={`w-full p-3.5 text-left border rounded-none text-xs transition-colors flex justify-between items-center ${isChecked ? 'border-blueprint-bluePrimary dark:border-blueprint-cyan bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold' : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-400'}`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className={`w-4 h-4 border rounded-none flex items-center justify-center ${isChecked ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 border-transparent' : 'border-gray-400'}`}>
                                            {isChecked && '✓'}
                                        </span>
                                        {f.label}
                                    </span>
                                    <span className="text-[10px] opacity-70">+{f.price.toLocaleString()} FCFA</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 3. Support & Maintenance */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{t('estimator_step3')}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {supportOptions.map(s => (
                            <button 
                                key={s.id} 
                                onClick={() => setSupport(s.id)}
                                className={`p-4 text-left border rounded-none text-xs transition-colors ${support === s.id ? 'border-blueprint-bluePrimary dark:border-blueprint-cyan bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold' : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-400'}`}
                            >
                                <span className="block text-[10px] mb-1 uppercase">{s.label}</span>
                                <span className="text-[10px] opacity-70">+{s.price.toLocaleString()} FCFA</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Total Estimation Box */}
                <div className="p-6 bg-gray-50 dark:bg-[#111827] border border-blueprint-bluePrimary/30 dark:border-blueprint-cyan/30 rounded-none flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">{t('estimator_total')}</span>
                        <div className="text-3xl font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan font-mono">
                            ~ {totalEstimate.toLocaleString()} <span className="text-sm font-normal">FCFA</span>
                        </div>
                    </div>
                    <button 
                        onClick={generateSummary}
                        className="px-8 py-4 bg-[#1A1A1A] border border-gray-800 hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan text-white font-bold text-xs uppercase tracking-widest transition-colors w-full sm:w-auto text-center"
                    >
                        {t('btn_initiate_project')}
                    </button>
                </div>
            </div>
        </div>
    );
}

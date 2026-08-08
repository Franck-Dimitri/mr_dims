import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AnalyticsChart from '@/Components/Admin/AnalyticsChart';
import axios from 'axios';

export default function Dashboard({ stats, chartData, recentMessages, cvStats, projectPopularity, lastBackup }) {
    const dashboardStats = stats || { projects: 0, blogs: 0, messages: 0, totalViews: 0 };
    const messagesList = recentMessages || [];
    const cvMetrics = cvStats || { views: 0, downloads: 0, imageViews: 0, total: 0, recent: [] };
    const popularProjects = projectPopularity || [];
    
    // Server Health state
    const [health, setHealth] = useState({
        cpu_percent: 15,
        ram_used_mb: 512,
        ram_total_mb: 2048,
        ram_percent: 25,
        disk_used_gb: 8.4,
        disk_total_gb: 40.0,
        disk_percent: 21,
        uptime: 'Actif',
        services: { nginx: true, database: true, php: true },
    });

    // Deployment Modal State
    const [deploying, setDeploying] = useState(false);
    const [deployLogs, setDeployLogs] = useState(null);
    const [showDeployModal, setShowDeployModal] = useState(false);

    // Backup State
    const [backingUp, setBackingUp] = useState(false);
    const [backupResult, setBackupResult] = useState(lastBackup || null);

    // Quick Reply Modal State
    const [selectedMsgForReply, setSelectedMsgForReply] = useState(null);
    const [replyTemplate, setReplyTemplate] = useState('rendezvous'); // 'rendezvous' | 'devis' | 'plaquette'

    useEffect(() => {
        // Fetch server health metrics from API
        axios.get('/admin/system/health').then(res => {
            if (res.data) setHealth(res.data);
        }).catch(() => {});
    }, []);

    const handleTriggerDeploy = () => {
        if (!confirm("Voulez-vous lancer le processus de déploiement et maintenance 1-clic (Git pull, build Vite, migrations, clear cache) ?")) {
            return;
        }
        setDeploying(true);
        setShowDeployModal(true);
        setDeployLogs("⏳ Lancement du déploiement 1-clic en cours...\nExécution de Git Pull, NPM Build Vite et Optimisations...");

        axios.post('/admin/system/deploy').then(res => {
            setDeployLogs(res.data.output || "Déploiement terminé avec succès !");
            setDeploying(false);
        }).catch(err => {
            setDeployLogs("❌ Erreur pendant le déploiement : " + (err.response?.data?.message || err.message));
            setDeploying(false);
        });
    };

    const handleTriggerBackup = () => {
        setBackingUp(true);
        axios.post('/admin/system/backup', { send_telegram: true }).then(res => {
            if (res.data.success) {
                setBackupResult(res.data);
                alert("💾 Sauvegarde générée et transmise sur Telegram avec succès !");
            }
            setBackingUp(false);
        }).catch(err => {
            alert("Erreur lors de la création de la sauvegarde : " + err.message);
            setBackingUp(false);
        });
    };

    const getReplyText = (msg) => {
        if (!msg) return '';
        if (replyTemplate === 'rendezvous') {
            return `Bonjour ${msg.name},\n\nMerci pour votre message. J'ai bien pris connaissance de votre projet. Je serais ravi d'échanger avec vous lors d'un bref appel d'ingénierie.\n\nQuelles sont vos disponibilités cette semaine ?\n\nBien cordialement,\nKouongme Mbouom Franck Dimitri (Mr Dim's Dev)`;
        }
        if (replyTemplate === 'devis') {
            return `Bonjour ${msg.name},\n\nMerci de l'intérêt porté à mes services. Suite à votre message concernant "${msg.message.substring(0, 40)}...", je peux vous préparer une proposition d'architecture technique et un devis sur-mesure.\n\nAvez-vous un cahier des charges ou une date cible de déploiement ?\n\nCordialement,\nFranck Dimitri - Ingénieur Full-Stack`;
        }
        return `Bonjour ${msg.name},\n\nJe vous remercie pour votre prise de contact. Vous trouverez l'ensemble de mes réalisations et mon CV d'ingénieur informaticien directement sur mon portfolio.\n\nRestant à votre entière disposition.\n\nMr Dim's Dev`;
    };

    const statCards = [
        { label: 'Vues Globales', value: (dashboardStats.totalViews || 0).toLocaleString(), change: `+${dashboardStats.todayViews || 0} aujourd'hui`, icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', color: 'text-gray-500' },
        { label: 'Projets Actifs', value: dashboardStats.projects.toString(), change: 'Stables', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'text-blueprint-bluePrimary dark:text-blueprint-cyan' },
        { label: 'Téléchargements CV', value: (cvMetrics.downloads || 0).toString(), change: `${cvMetrics.views || 0} vues modale`, icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', color: 'text-purple-500' },
        { label: 'Nouveaux Messages', value: dashboardStats.messages.toString(), change: 'Contacts récents', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-green-500' },
    ];

    return (
        <AuthenticatedLayout header="Dashboard Admin">
            <Head title="SYS_CTRL - Dashboard" />

            <div className="w-full mx-auto space-y-6 font-sans">
                
                {/* Banner with 1-Click Maintenance Actions */}
                <div className="bg-gradient-to-r from-blueprint-bluePrimary to-[#7B5CFF] dark:from-[#3B28CC] dark:to-[#5C3AFF] text-white p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden shadow-sm">
                    <div className="relative z-10 max-w-xl">
                        <div className="flex items-center gap-2 mb-1.5 text-white/90 text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                            Centre de Commande & Automation
                        </div>
                        <h2 className="text-base font-bold">Maintenance 1-Clic, Sauvegardes Instantanées & Surveillance VPS</h2>
                    </div>

                    <div className="relative z-10 flex items-center gap-2 flex-wrap">
                        <button 
                            onClick={handleTriggerDeploy}
                            disabled={deploying}
                            className="bg-white text-blueprint-bluePrimary dark:text-[#5C3AFF] font-bold px-4 py-2 text-xs rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            {deploying ? "Déploiement..." : "🚀 Déploiement 1-Clic"}
                        </button>

                        <button 
                            onClick={handleTriggerBackup}
                            disabled={backingUp}
                            className="bg-black/30 backdrop-blur-md text-white border border-white/30 font-bold px-4 py-2 text-xs rounded-xl hover:bg-black/50 transition-all flex items-center gap-1.5 disabled:opacity-50"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
                            {backingUp ? "Sauvegarde..." : "💾 Sauvegarde BD"}
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((stat, index) => (
                        <div key={index} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-4 rounded-xl shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-md bg-gray-50 dark:bg-gray-800 ${stat.color}`}>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={stat.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400">{stat.label}</h3>
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-[10px] font-medium text-green-500">
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2-Column Section: Server Health Monitor VPS & Backup Manager */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Server VPS Health Monitor (Takes 2 Cols) */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm space-y-5">
                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Santé & Ressources Serveur VPS</h4>
                            </div>
                            <span className="text-xs text-gray-400 font-mono">Uptime: {health.uptime}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* CPU */}
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center text-xs mb-2">
                                    <span className="text-gray-500 font-medium">Charge CPU</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{health.cpu_percent}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${health.cpu_percent}%` }}></div>
                                </div>
                            </div>

                            {/* RAM */}
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center text-xs mb-2">
                                    <span className="text-gray-500 font-medium">Mémoire RAM</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{health.ram_used_mb}Mo / {health.ram_total_mb}Mo</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${health.ram_percent}%` }}></div>
                                </div>
                            </div>

                            {/* DISK */}
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center text-xs mb-2">
                                    <span className="text-gray-500 font-medium">Stockage Disque</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{health.disk_used_gb}Go / {health.disk_total_gb}Go</span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${health.disk_percent}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Services Badges */}
                        <div className="flex items-center gap-4 text-xs font-medium pt-2">
                            <span className="text-gray-500">Services Clés :</span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-500 rounded-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Nginx
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-500 rounded-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Base de Données
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 text-green-500 rounded-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> PHP-FPM / Vite
                            </span>
                        </div>
                    </div>

                    {/* Backup & Instant Exporter Card (1 Col) */}
                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm flex flex-col justify-between space-y-4">
                        <div>
                            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                                <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                </svg>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Gestionnaire de Sauvegardes</h4>
                            </div>

                            {backupResult ? (
                                <div className="space-y-2 text-xs">
                                    <div className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800">
                                        <span className="text-gray-400 block mb-0.5 font-mono text-[10px]">Dernière Sauvegarde :</span>
                                        <span className="font-bold text-gray-900 dark:text-white block font-mono text-[11px] truncate">{backupResult.filename}</span>
                                        <div className="flex justify-between text-gray-500 text-[10px] mt-1 font-mono">
                                            <span>{backupResult.date}</span>
                                            <span className="font-bold text-blueprint-cyan">{backupResult.size_mb} Mo</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-500">Aucune sauvegarde enregistrée sur ce serveur pour l'instant.</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={handleTriggerBackup}
                                disabled={backingUp}
                                className="w-full py-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 text-xs font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                {backingUp ? "Génération..." : "Sauvegarder & Expédier sur Telegram"}
                            </button>
                            {backupResult?.download_url && (
                                <a
                                    href={backupResult.download_url}
                                    className="w-full py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                                >
                                    Télécharger le fichier BD (.gz)
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* CHART.JS ANALYTICS CHART SECTION */}
                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Graphique de Fréquentation & Audience (Chart.js)</h4>
                            <p className="text-xs text-gray-500">Évolution réelle des vues de pages et des visiteurs uniques au cours des 14 derniers jours</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg font-medium">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Vues
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 text-purple-500 rounded-lg font-medium">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span> Visiteurs Uniques
                            </span>
                        </div>
                    </div>
                    <AnalyticsChart chartData={chartData} />
                </div>

                {/* 2-Column Section: Project Popularity Heatmap & CV Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Project Popularity Ranking Heatmap (1 Col) */}
                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm space-y-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
                            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            </svg>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Popularité des Projets</h4>
                        </div>

                        <div className="space-y-3">
                            {popularProjects.length > 0 ? (
                                popularProjects.map((p, idx) => (
                                    <div key={p.id} className="p-3 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold flex items-center justify-center">
                                                #{idx + 1}
                                            </span>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[140px]">{p.title}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-xs font-mono">
                                            <span className="text-gray-400">{p.visits} vues</span>
                                            <span className="text-amber-500 font-bold">♥ {p.likes}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400">Aucun projet analysé pour le moment.</p>
                            )}
                        </div>
                    </div>

                    {/* CV Analytics Dedicated Card (2 Cols) */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 text-blueprint-bluePrimary dark:text-blueprint-cyan">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Suivi & Télémétrie du CV</h4>
                                    <p className="text-xs text-gray-500">Comptabilisation en temps réel des vues et téléchargements du CV</p>
                                </div>
                            </div>
                            <span className="text-xs font-mono px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Tracking Actif
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-blueprint-cyan/10 text-blueprint-cyan">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-medium block">Modale CV Ouverte</span>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">{cvMetrics.views || 0}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-green-500/10 text-green-500">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-medium block">Téléchargements PDF</span>
                                    <span className="text-xl font-bold text-green-500">{cvMetrics.downloads || 0}</span>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-500 font-medium block">Aperçus Images</span>
                                    <span className="text-xl font-bold text-purple-400">{cvMetrics.imageViews || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent CV Activity Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800">
                                    <tr>
                                        <th className="py-2.5 px-3">Date / Heure</th>
                                        <th className="py-2.5 px-3">Événement</th>
                                        <th className="py-2.5 px-3">Adresse IP</th>
                                        <th className="py-2.5 px-3">Navigateur</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                                    {cvMetrics.recent && cvMetrics.recent.length > 0 ? (
                                        cvMetrics.recent.slice(0, 5).map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                                                <td className="py-2.5 px-3 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                                                    {new Date(log.created_at).toLocaleString()}
                                                </td>
                                                <td className="py-2.5 px-3 font-semibold">
                                                    {log.event_type === 'download_pdf' && <span className="text-green-500">Téléchargement PDF</span>}
                                                    {log.event_type === 'view_modal' && <span className="text-blueprint-cyan">Modale Consultée</span>}
                                                    {log.event_type === 'view_image' && <span className="text-purple-400">Aperçu Image</span>}
                                                </td>
                                                <td className="py-2.5 px-3 font-mono text-[11px]">{log.ip_address}</td>
                                                <td className="py-2.5 px-3 text-gray-500 max-w-xs truncate">{log.user_agent}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="py-6 text-center text-gray-400">
                                                Aucune interaction CV enregistrée.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Messages Inbox Table with Quick Reply Feature */}
                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Messages Reçus & Réponses Rapides</h4>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-5 py-3.5">Nom</th>
                                    <th className="px-5 py-3.5">Date</th>
                                    <th className="px-5 py-3.5">Email</th>
                                    <th className="px-5 py-3.5">Message</th>
                                    <th className="px-5 py-3.5 text-right">Action Rapide</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                                {messagesList.map((msg, i) => (
                                    <tr key={msg.id || i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {msg.name}
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{new Date(msg.created_at).toLocaleDateString()}</td>
                                        <td className="px-5 py-3.5 font-medium whitespace-nowrap">{msg.email}</td>
                                        <td className="px-5 py-3.5 text-gray-500 max-w-xs truncate">{msg.message}</td>
                                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                            <button
                                                onClick={() => setSelectedMsgForReply(msg)}
                                                className="px-3 py-1.5 bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 text-blueprint-bluePrimary dark:text-blueprint-cyan rounded-lg text-xs font-bold hover:bg-blueprint-bluePrimary/20 transition-colors"
                                            >
                                                💬 Réponse Rapide
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* DEPLOYMENT TERMINAL LOGS MODAL */}
            {showDeployModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-[#0B0F19] text-white border border-gray-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                            <h3 className="text-sm font-bold flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                                Journal du Déploiement & Maintenance 1-Clic
                            </h3>
                            {!deploying && (
                                <button onClick={() => setShowDeployModal(false)} className="text-gray-400 hover:text-white text-lg">✕</button>
                            )}
                        </div>

                        <pre className="bg-[#070A10] p-4 rounded-xl text-xs font-mono text-blueprint-cyan overflow-x-auto border border-gray-800 max-h-96 whitespace-pre-wrap">
                            {deployLogs}
                        </pre>

                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowDeployModal(false)}
                                disabled={deploying}
                                className="px-5 py-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 rounded-xl text-xs font-bold disabled:opacity-50"
                            >
                                {deploying ? "Traitement en cours..." : "Fermer"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* QUICK REPLY / DEVIS GENERATOR MODAL */}
            {selectedMsgForReply && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-sans">
                    <div className="bg-[#111827] text-white border border-gray-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                            <h3 className="text-sm font-bold">Générateur de Réponse Rapide</h3>
                            <button onClick={() => setSelectedMsgForReply(null)} className="text-gray-400 hover:text-white text-lg">✕</button>
                        </div>

                        <div className="space-y-3">
                            <div className="text-xs text-gray-400">
                                Destinataire : <span className="font-bold text-white">{selectedMsgForReply.name}</span> ({selectedMsgForReply.email})
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setReplyTemplate('rendezvous')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${replyTemplate === 'rendezvous' ? 'bg-blueprint-bluePrimary text-white' : 'bg-gray-800 text-gray-400'}`}
                                >
                                    Rendez-vous
                                </button>
                                <button
                                    onClick={() => setReplyTemplate('devis')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${replyTemplate === 'devis' ? 'bg-blueprint-bluePrimary text-white' : 'bg-gray-800 text-gray-400'}`}
                                >
                                    Proposition Devis
                                </button>
                                <button
                                    onClick={() => setReplyTemplate('plaquette')}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${replyTemplate === 'plaquette' ? 'bg-blueprint-bluePrimary text-white' : 'bg-gray-800 text-gray-400'}`}
                                >
                                    Portfolio
                                </button>
                            </div>

                            <textarea
                                readOnly
                                value={getReplyText(selectedMsgForReply)}
                                className="w-full h-44 bg-[#070A10] border border-gray-800 text-xs text-gray-200 p-3.5 rounded-xl font-sans focus:outline-none"
                            />
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(getReplyText(selectedMsgForReply));
                                    alert("Texte copié dans le presse-papier !");
                                }}
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-xl"
                            >
                                Copier le texte
                            </button>

                            <a
                                href={`mailto:${selectedMsgForReply.email}?subject=Suite%20%C3%A0%20votre%20demande%20sur%20Mr%20Dim's%20Dev&body=${encodeURIComponent(getReplyText(selectedMsgForReply))}`}
                                className="px-5 py-2 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 text-xs font-bold rounded-xl shadow-sm hover:opacity-90"
                            >
                                Envoyer par Email →
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

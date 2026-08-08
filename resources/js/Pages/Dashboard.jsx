import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Dashboard({ stats, chartData, recentMessages, cvStats }) {
    const dashboardStats = stats || { projects: 0, blogs: 0, messages: 0, totalViews: 0 };
    const messagesList = recentMessages || [];
    const cvMetrics = cvStats || { views: 0, downloads: 0, imageViews: 0, total: 0, recent: [] };
    
    const [activeTab, setActiveTab] = useState('Tous les messages');

    const statCards = [
        { label: 'Vues Globales', value: (dashboardStats.totalViews || 0).toLocaleString(), change: `+${dashboardStats.todayViews || 0} aujourd'hui`, icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', color: 'text-gray-500' },
        { label: 'Projets Actifs', value: dashboardStats.projects.toString(), change: 'Stables', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'text-blueprint-bluePrimary dark:text-blueprint-cyan' },
        { label: 'Téléchargements CV', value: (cvMetrics.downloads || 0).toString(), change: `${cvMetrics.views || 0} vues modale`, icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4', color: 'text-purple-500' },
        { label: 'Nouveaux Messages', value: dashboardStats.messages.toString(), change: 'Contacts récents', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-green-500' },
    ];

    const chartBars = chartData?.views || [20, 50, 45, 10, 80, 85, 90, 40, 20];
    const chartLabels = chartData?.labels || ['01 July', '02 July', '03 July', '04 July', '05 July', '06 July', '07 July', '08 July', '09 July'];

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="SYS_CTRL - Dashboard" />

            <div className="w-full mx-auto space-y-6 font-sans">
                
                {/* Banner */}
                <div className="bg-gradient-to-r from-blueprint-bluePrimary to-[#7B5CFF] dark:from-[#3B28CC] dark:to-[#5C3AFF] text-white p-5 rounded-xl flex justify-between items-center relative overflow-hidden shadow-sm">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1.5 text-white/90 text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                            Supervision en temps réel & Alerte Telegram Bot
                        </div>
                        <h2 className="text-base font-medium">Suivi automatisé du Portfolio, du CV et des Vues Projets.</h2>
                    </div>
                </div>

                {/* Overview Header */}
                <div className="flex justify-between items-end pt-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Vue d'ensemble du Système</h3>
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

                {/* CV Analytics Dedicated Card & Tracking Section */}
                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-blueprint-bluePrimary/10 dark:bg-blueprint-cyan/10 text-blueprint-bluePrimary dark:text-blueprint-cyan">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Suivi & Statistiques du CV</h4>
                                <p className="text-xs text-gray-500">Comptabilisation en temps réel des vues et téléchargements du CV</p>
                            </div>
                        </div>
                        <span className="text-xs font-mono px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Tracking Actif
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800">
                            <span className="text-xs text-gray-500 font-medium block mb-1">👁️ Modale CV Ouverte</span>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">{cvMetrics.views || 0}</span>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800">
                            <span className="text-xs text-gray-500 font-medium block mb-1">📥 Téléchargements PDF</span>
                            <span className="text-xl font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{cvMetrics.downloads || 0}</span>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-100 dark:border-gray-800">
                            <span className="text-xs text-gray-500 font-medium block mb-1">🖼️ Aperçus Images</span>
                            <span className="text-xl font-bold text-purple-500">{cvMetrics.imageViews || 0}</span>
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
                                    cvMetrics.recent.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                                            <td className="py-2.5 px-3 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                                                {new Date(log.created_at).toLocaleString()}
                                            </td>
                                            <td className="py-2.5 px-3 font-semibold">
                                                {log.event_type === 'download_pdf' && <span className="text-green-500">📥 Téléchargement PDF</span>}
                                                {log.event_type === 'view_modal' && <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan">👁️ Modale Consultée</span>}
                                                {log.event_type === 'view_image' && <span className="text-purple-400">🖼️ Aperçu Image</span>}
                                            </td>
                                            <td className="py-2.5 px-3 font-mono text-[11px]">{log.ip_address}</td>
                                            <td className="py-2.5 px-3 text-gray-500 max-w-xs truncate">{log.user_agent}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-6 text-center text-gray-400">
                                            Aucune interaction CV enregistrée pour le moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Messages Inbox Table */}
                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Messages Reçus Via Le Site</h4>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-5 py-3.5">Nom</th>
                                    <th className="px-5 py-3.5">Date</th>
                                    <th className="px-5 py-3.5">Email</th>
                                    <th className="px-5 py-3.5">Message</th>
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
                                        <td className="px-5 py-3.5 text-gray-500 max-w-md truncate">{msg.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

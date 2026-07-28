import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Dashboard({ stats, chartData, topCountries, recentMessages }) {
    const dashboardStats = stats || {
        projects: 0,
        blogs: 0,
        messages: 0,
        totalViews: 0,
        uniqueVisitors: 0
    };
    const messagesList = recentMessages || [];
    const chartLabels = chartData?.labels || ['01', '02', '03', '04', '05', '06', '07'];
    const chartBars = chartData?.values || [0, 0, 0, 0, 0, 0, 0];
    const countries = topCountries || [];
    
    const [activeTab, setActiveTab] = useState('Tous les messages');

    const maxChartVal = Math.max(...chartBars, 1);

    const statCards = [
        { label: 'Vues Globales', value: dashboardStats.totalViews.toLocaleString(), change: 'Temps réels SQL', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', color: 'text-gray-500' },
        { label: 'Visiteurs Uniques', value: dashboardStats.uniqueVisitors.toLocaleString(), change: 'Hashes IP uniques', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', color: 'text-blueprint-bluePrimary dark:text-blueprint-cyan' },
        { label: 'Projets / Articles', value: `${dashboardStats.projects} P / ${dashboardStats.blogs} A`, change: 'Catalogue actif', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'text-cyan-500' },
        { label: 'Messages Reçus', value: dashboardStats.messages.toString(), change: 'Formulaires & Contacts', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-green-500' },
    ];

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="SYS_CTRL - Dashboard" />

            <div className="w-full mx-auto space-y-6">
                
                {/* Banner */}
                <div className="bg-gradient-to-r from-blueprint-bluePrimary to-[#7B5CFF] dark:from-[#3B28CC] dark:to-[#5C3AFF] text-white p-5 rounded-lg flex justify-between items-center relative overflow-hidden shadow-sm">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1.5 text-white/90 text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                            Diagnostics Système Live (SQL Analytics Active)
                        </div>
                        <h2 className="text-base font-medium">Toutes les métriques de l'architecture sont connectées en temps réel.</h2>
                    </div>
                    <div className="relative z-10 font-mono text-xs bg-white/20 px-3 py-1.5 rounded border border-white/30 backdrop-blur">
                        SYS_STATUS: ONLINE
                    </div>
                    <div className="absolute right-0 top-0 w-64 h-full overflow-hidden opacity-30">
                        <div className="absolute -right-10 -top-20 w-40 h-40 rounded-full border-4 border-white/20"></div>
                        <div className="absolute right-10 -bottom-20 w-40 h-40 rounded-full border-4 border-white/20"></div>
                    </div>
                </div>

                {/* Overview Header */}
                <div className="flex justify-between items-end pt-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Aperçu Général</h3>
                    <div className="text-xs font-mono text-gray-500">
                        14 derniers jours
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
                                <p className="text-[10px] font-medium text-green-500 font-mono">
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Bar Chart Real SQL Data (Takes 2/3) */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Trafic des 14 Derniers Jours</h4>
                                <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    {chartBars.reduce((a, b) => a + b, 0)} Vues
                                </p>
                            </div>
                        </div>
                        
                        {/* Bar Chart Bars */}
                        <div className="h-44 flex items-end justify-between gap-2 relative pb-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="w-full h-full flex items-end justify-between gap-2">
                                {chartBars.map((val, i) => {
                                    const heightPct = Math.max((val / maxChartVal) * 100, 4);
                                    return (
                                        <div key={i} className="w-full flex flex-col items-center group relative">
                                            <div className="absolute -top-8 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                                                {val} visite{val > 1 ? 's' : ''} ({chartLabels[i]})
                                            </div>
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${heightPct}%` }}
                                                transition={{ duration: 0.5, delay: i * 0.03 }}
                                                className="w-full max-w-[24px] bg-blueprint-bluePrimary dark:bg-[#5C3AFF] rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity"
                                            ></motion.div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        
                        {/* X-axis labels */}
                        <div className="flex justify-between mt-2 text-[9px] text-gray-400 font-mono">
                            {chartLabels.map((label, i) => (
                                <span key={i} className="truncate max-w-[32px]">{label}</span>
                            ))}
                        </div>
                    </div>

                    {/* Top Countries List (Takes 1/3) */}
                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm flex flex-col justify-between">
                        <div>
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Top Pays des Visiteurs</h4>
                            <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">Géolocalisation IP</p>
                        </div>
                        <div className="space-y-3 flex-1 flex flex-col justify-center">
                            {countries.length > 0 ? (
                                countries.map((c, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs">
                                        <span className="font-mono text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan"></span>
                                            {c.country || 'Inconnu'}
                                        </span>
                                        <span className="font-bold text-gray-900 dark:text-white font-mono">{c.total} visites</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 font-mono text-center">Aucune donnée géographique enregistrée.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Data Table Messages */}
                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden mt-2">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">Messages Récents</h3>
                        <div className="text-xs font-mono text-gray-500">
                            {messagesList.length} message(s) récents
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px]">
                            <thead className="text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-5 py-3.5">Nom</th>
                                    <th className="px-5 py-3.5 font-medium">Date</th>
                                    <th className="px-5 py-3.5 font-medium">Email</th>
                                    <th className="px-5 py-3.5 font-medium">Canal</th>
                                    <th className="px-5 py-3.5 font-medium">Aperçu Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300 font-sans">
                                {messagesList.length > 0 ? (
                                    messagesList.map((msg) => (
                                        <tr key={msg.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                {msg.name}
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap font-mono">
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-5 py-3.5 font-medium whitespace-nowrap">{msg.email}</td>
                                            <td className="px-5 py-3.5 font-medium whitespace-nowrap uppercase font-mono text-[10px]">
                                                {msg.platform_origin}
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-500 max-w-[280px] truncate">{msg.message}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-6 text-center text-gray-400 font-mono">
                                            Aucun message reçu pour le moment.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

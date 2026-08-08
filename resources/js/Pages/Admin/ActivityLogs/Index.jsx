import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ logs, systemLogs, cvLogs, stats, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [activeTab, setActiveTab] = useState('visitors'); // 'visitors' | 'system' | 'cv'
    const [selectedLog, setSelectedLog] = useState(null); // Modal inspector for JSON context

    const logsData = logs?.data || [];
    const systemLogsList = systemLogs || [];
    const cvLogsList = cvLogs || [];
    const activityStats = stats || { totalRequests: 0, todayRequests: 0, todayUniqueIps: 0, totalSystemLogs: 0, systemErrors: 0 };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.activity.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout header="Journal d'Activité & Logs Système">
            <Head title="Admin - Logs & Télémétrie" />

            <div className="w-full mx-auto space-y-6 font-sans">
                
                {/* Header Banner */}
                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-base font-bold text-gray-900 dark:text-white">Journal d'Activité & Télémétrie Système</h2>
                        <p className="text-xs text-gray-500 mt-1">Supervision structurée des requêtes visiteurs, des événements système et du Bot Telegram.</p>
                    </div>

                    <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                        <input 
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Rechercher IP, Pays, URL..."
                            className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-900 dark:text-white p-2.5 rounded-xl w-full sm:w-64 focus:outline-none focus:border-blueprint-bluePrimary"
                        />
                        <button 
                            type="submit"
                            className="px-4 py-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs rounded-xl hover:opacity-90 transition-opacity"
                        >
                            Rechercher
                        </button>
                    </form>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <span className="text-xs text-gray-500 font-medium block mb-1">Total Requêtes Enregistrées</span>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{activityStats.totalRequests.toLocaleString()}</div>
                        <span className="text-xs text-green-500 font-medium">+{activityStats.todayRequests} aujourd'hui</span>
                    </div>

                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <span className="text-xs text-gray-500 font-medium block mb-1">Adresses IP Uniques (Aujourd'hui)</span>
                        <div className="text-2xl font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{activityStats.todayUniqueIps}</div>
                        <span className="text-xs text-gray-400 font-medium">Sessions uniques actives</span>
                    </div>

                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <span className="text-xs text-gray-500 font-medium block mb-1">Événements Système Loggués</span>
                        <div className="text-2xl font-bold text-purple-500">{activityStats.totalSystemLogs}</div>
                        <span className="text-xs text-gray-400 font-medium">Déploiements, Backups, Bot</span>
                    </div>

                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <span className="text-xs text-gray-500 font-medium block mb-1">Alertes / Avertissements</span>
                        <div className="text-2xl font-bold text-yellow-500">{activityStats.systemErrors}</div>
                        <span className="text-xs text-gray-400 font-medium">Anomalies sous surveillance</span>
                    </div>
                </div>

                {/* 3 Interactive Views / Tabs */}
                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
                    <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between flex-wrap gap-3">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab('visitors')}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                                    activeTab === 'visitors'
                                        ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Navigation Visiteurs ({logsData.length})
                            </button>

                            <button
                                onClick={() => setActiveTab('system')}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                                    activeTab === 'system'
                                        ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                </svg>
                                Événements & Bot ({systemLogsList.length})
                            </button>

                            <button
                                onClick={() => setActiveTab('cv')}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 ${
                                    activeTab === 'cv'
                                        ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Télémétrie CV ({cvLogsList.length})
                            </button>
                        </div>
                    </div>

                    {/* TAB 1: VISITOR LOGS */}
                    {activeTab === 'visitors' && (
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800">
                                        <tr>
                                            <th className="py-3 px-4">Horodatage</th>
                                            <th className="py-3 px-4">URL Page</th>
                                            <th className="py-3 px-4">Pays</th>
                                            <th className="py-3 px-4">Adresse IP</th>
                                            <th className="py-3 px-4">Session Hash</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                                        {logsData.length > 0 ? (
                                            logsData.map((log) => (
                                                <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                    <td className="py-3 px-4 text-gray-400 whitespace-nowrap font-mono text-[11px]">
                                                        {new Date(log.created_at).toLocaleString()}
                                                    </td>
                                                    <td className="py-3 px-4 font-semibold text-blueprint-bluePrimary dark:text-blueprint-cyan truncate max-w-xs">
                                                        {log.page_url}
                                                    </td>
                                                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                                                        {log.country || 'Inconnu'}
                                                    </td>
                                                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500">
                                                        {log.ip_address || '127.0.0.1'}
                                                    </td>
                                                    <td className="py-3 px-4 font-mono text-[10px] text-gray-400 max-w-[150px] truncate">
                                                        {log.visitor_hash}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="py-8 text-center text-gray-400">
                                                    Aucun log d'activité visiteurs trouvé.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {logs?.links && logs.links.length > 3 && (
                                <div className="flex justify-center gap-2 mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
                                    {logs.links.map((link, idx) => (
                                        <button
                                            key={idx}
                                            disabled={!link.url}
                                            onClick={() => router.get(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold'
                                                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB 2: SYSTEM LOGS & TELEGRAM BOT */}
                    {activeTab === 'system' && (
                        <div className="p-6">
                            <div className="space-y-3">
                                {systemLogsList.map((log) => {
                                    const isError = log.level === 'ERROR' || log.level === 'CRITICAL';
                                    const isWarning = log.level === 'WARNING';
                                    return (
                                        <div
                                            key={log.id}
                                            className="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 flex items-start justify-between gap-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono ${
                                                    isError
                                                        ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                        : isWarning
                                                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                                        : 'bg-blue-500/10 text-blueprint-cyan border border-blue-500/20'
                                                }`}>
                                                    {log.level}
                                                </span>
                                                <div>
                                                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                                                        {log.message}
                                                    </p>
                                                    <span className="text-[11px] text-gray-400 font-mono">
                                                        {new Date(log.created_at).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>

                                            {log.context && (
                                                <button
                                                    onClick={() => setSelectedLog(log)}
                                                    className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shrink-0"
                                                >
                                                    Inspecter Contexte
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* TAB 3: CV ANALYTICS LOGS */}
                    {activeTab === 'cv' && (
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800">
                                        <tr>
                                            <th className="py-3 px-4">Date / Heure</th>
                                            <th className="py-3 px-4">Événement CV</th>
                                            <th className="py-3 px-4">Adresse IP</th>
                                            <th className="py-3 px-4">Navigateur / Client</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                                        {cvLogsList.map((log) => (
                                            <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">
                                                    {new Date(log.created_at).toLocaleString()}
                                                </td>
                                                <td className="py-3 px-4 font-bold">
                                                    {log.event_type === 'download_pdf' && <span className="text-green-500">Téléchargement PDF</span>}
                                                    {log.event_type === 'view_modal' && <span className="text-blueprint-cyan">Modale Consultée</span>}
                                                    {log.event_type === 'view_image' && <span className="text-purple-400">Aperçu Image</span>}
                                                </td>
                                                <td className="py-3 px-4 font-mono text-[11px]">{log.ip_address}</td>
                                                <td className="py-3 px-4 text-gray-500 max-w-sm truncate">{log.user_agent}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* JSON Context Inspector Modal */}
            {selectedLog && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#111827] text-white border border-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-800 pb-3">
                            <h3 className="text-sm font-bold">Inspecteur de Contexte Log</h3>
                            <button onClick={() => setSelectedLog(null)} className="text-gray-400 hover:text-white text-lg">✕</button>
                        </div>
                        <p className="text-xs text-gray-400">{selectedLog.message}</p>
                        <pre className="bg-[#070A10] p-4 rounded-xl text-xs font-mono text-blueprint-cyan overflow-x-auto border border-gray-800">
                            {JSON.stringify(selectedLog.context, null, 2)}
                        </pre>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setSelectedLog(null)}
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-bold"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

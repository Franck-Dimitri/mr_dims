import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function Index({ logs, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const logsData = logs?.data || [];

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.activity.index'), { search }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout header="Activity Logs & Télémétrie IP">
            <Head title="Admin - Live Activity Logs" />

            <div className="w-full mx-auto space-y-6 font-mono">
                <div className="bg-white dark:bg-[#0B0F19] p-6 border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-base font-bold text-blueprint-textDark dark:text-white uppercase tracking-tight">// JOURNAL D'ACTIVITÉ EN DIRECT (ACTIVITY LOGS)</h2>
                        <p className="text-xs text-gray-500 mt-1">Capture pas-à-pas des requêtes avec géolocalisation IP et hash de session.</p>
                    </div>

                    <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                        <input 
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Rechercher IP, Pays, URL..."
                            className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-white p-2.5 w-full sm:w-64 focus:outline-none focus:border-blueprint-bluePrimary"
                        />
                        <button 
                            type="submit"
                            className="px-4 py-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-xs uppercase"
                        >
                            RECHERCHER
                        </button>
                    </form>
                </div>

                {/* Activity Logs Table */}
                <div className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="text-gray-400 border-b border-gray-200 dark:border-gray-800 uppercase font-mono">
                                <tr>
                                    <th className="py-3 px-4">Horodatage</th>
                                    <th className="py-3 px-4">URL Page</th>
                                    <th className="py-3 px-4">Pays</th>
                                    <th className="py-3 px-4">Adresse IP</th>
                                    <th className="py-3 px-4">Visitor Hash</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300 font-mono">
                                {logsData.length > 0 ? (
                                    logsData.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <td className="py-3 px-4 text-gray-400 whitespace-nowrap">
                                                {new Date(log.created_at).toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">
                                                {log.page_url}
                                            </td>
                                            <td className="py-3 px-4 font-bold text-blueprint-textDark dark:text-white">
                                                {log.country || 'Inconnu'}
                                            </td>
                                            <td className="py-3 px-4 font-mono text-gray-500">
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
                                            Aucun log trouvé dans le système.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {logs?.links && logs.links.length > 3 && (
                        <div className="flex justify-center gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-xs">
                            {logs.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    disabled={!link.url}
                                    onClick={() => router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 border font-mono ${link.active ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 border-blueprint-bluePrimary font-bold' : 'border-gray-200 dark:border-gray-800 text-gray-400 hover:text-white'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

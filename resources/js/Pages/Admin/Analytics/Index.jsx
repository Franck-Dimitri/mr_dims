import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AnalyticsChart from '@/Components/Admin/AnalyticsChart';

export default function Index({ stats, chartData, topPages, topCountries, projectVisitStats }) {
    const totalViews = stats?.totalViews || 0;
    const uniqueVisitors = stats?.uniqueVisitors || 0;
    const todayViews = stats?.todayViews || 0;
    const todayVisitors = stats?.todayVisitors || 0;

    const pagesList = topPages || [];
    const countriesList = topCountries || [];
    const projectsList = projectVisitStats || [];

    return (
        <AuthenticatedLayout header="Analytics & Audience Globales">
            <Head title="Admin - Analytics & Audience" />

            <div className="w-full mx-auto space-y-6 font-sans">
                
                {/* Header Banner */}
                <div className="bg-white dark:bg-[#111827] p-6 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">Fréquentation & Analytics Globales</h2>
                    <p className="text-xs text-gray-500 mt-1">Données consolidées d'audience, de géolocalisation IP et de consultation des projets.</p>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <span className="text-xs text-gray-500 font-medium block mb-1">Total Vues Cumulées</span>
                        <div className="text-2xl font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{totalViews.toLocaleString()}</div>
                        <span className="text-xs text-green-500 font-medium">+{todayViews} aujourd'hui</span>
                    </div>

                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <span className="text-xs text-gray-500 font-medium block mb-1">Visiteurs Uniques</span>
                        <div className="text-2xl font-bold text-purple-500">{uniqueVisitors.toLocaleString()}</div>
                        <span className="text-xs text-green-500 font-medium">+{todayVisitors} aujourd'hui</span>
                    </div>

                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <span className="text-xs text-gray-500 font-medium block mb-1">Pages & Routes Suivies</span>
                        <div className="text-2xl font-bold text-cyan-500">{pagesList.length}</div>
                        <span className="text-xs text-gray-400 font-medium">Routes actives</span>
                    </div>

                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <span className="text-xs text-gray-500 font-medium block mb-1">Origines Géographiques</span>
                        <div className="text-2xl font-bold text-yellow-500">{countriesList.length} Pays</div>
                        <span className="text-xs text-gray-400 font-medium">Pays identifiés</span>
                    </div>
                </div>

                {/* 14-Day Chart.js Line Chart */}
                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Évolution du Trafic & Visiteurs</h3>
                            <p className="text-xs text-gray-500">Graphique dynamique sur les 14 derniers jours</p>
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

                {/* Tables Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Top Pages Consultées</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="text-gray-400 border-b border-gray-100 dark:border-gray-800 font-medium">
                                    <tr>
                                        <th className="py-2.5 px-2">URL Route</th>
                                        <th className="py-2.5 px-2 text-right">Vues Total</th>
                                        <th className="py-2.5 px-2 text-right">Uniques</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {pagesList.map((p, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="py-2.5 px-2 text-gray-700 dark:text-gray-300 font-mono text-[11px] truncate max-w-[200px]">{p.page_url}</td>
                                            <td className="py-2.5 px-2 text-right font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{p.total_views}</td>
                                            <td className="py-2.5 px-2 text-right text-gray-400 font-medium">{p.unique_visitors}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 rounded-xl shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Répartition par Pays / Géo-IP</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="text-gray-400 border-b border-gray-100 dark:border-gray-800 font-medium">
                                    <tr>
                                        <th className="py-2.5 px-2">Pays</th>
                                        <th className="py-2.5 px-2 text-right">Volume Vues</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {countriesList.map((c, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="py-2.5 px-2 text-gray-900 dark:text-white font-bold">{c.country || 'Inconnu'}</td>
                                            <td className="py-2.5 px-2 text-right font-mono text-purple-500 font-bold">{c.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

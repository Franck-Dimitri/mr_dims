import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Index({ stats, chartData, topPages, topCountries, projectVisitStats }) {
    const totalViews = stats?.totalViews || 0;
    const uniqueVisitors = stats?.uniqueVisitors || 0;
    const todayViews = stats?.todayViews || 0;
    const todayVisitors = stats?.todayVisitors || 0;

    const labels = chartData?.labels || [];
    const views = chartData?.views || [];
    const visitors = chartData?.visitors || [];
    const maxVal = Math.max(...views, ...visitors, 1);

    const pagesList = topPages || [];
    const countriesList = topCountries || [];
    const projectsList = projectVisitStats || [];

    return (
        <AuthenticatedLayout header="Télémétrie & Analytics Globales">
            <Head title="Admin - Analytics & Audience" />

            <div className="w-full mx-auto space-y-6 font-mono">
                <div className="bg-white dark:bg-[#0B0F19] p-6 border border-gray-200 dark:border-gray-800">
                    <h2 className="text-base font-bold text-blueprint-textDark dark:text-white uppercase tracking-tight">// MESURE DE FRÉQUENTATION ET D'AUDIENCE</h2>
                    <p className="text-xs text-gray-500 mt-1">Données consolidées d'audience, de géolocalisation IP et de consultation des projets.</p>
                </div>

                {/* 4 Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-5">
                        <span className="text-[10px] text-gray-400 block mb-1 uppercase font-bold">TOTAL VUES</span>
                        <div className="text-3xl font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{totalViews.toLocaleString()}</div>
                        <span className="text-[10px] text-green-500 font-bold">+{todayViews} aujourd'hui</span>
                    </div>
                    <div className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-5">
                        <span className="text-[10px] text-gray-400 block mb-1 uppercase font-bold">VISITEURS UNIQUES</span>
                        <div className="text-3xl font-bold text-purple-500">{uniqueVisitors.toLocaleString()}</div>
                        <span className="text-[10px] text-green-500 font-bold">+{todayVisitors} aujourd'hui</span>
                    </div>
                    <div className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-5">
                        <span className="text-[10px] text-gray-400 block mb-1 uppercase font-bold">PAGES ENREGISTRÉES</span>
                        <div className="text-3xl font-bold text-cyan-500">{pagesList.length}</div>
                        <span className="text-[10px] text-gray-400">Routes actives</span>
                    </div>
                    <div className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-5">
                        <span className="text-[10px] text-gray-400 block mb-1 uppercase font-bold">GÉOLOCALISATIONS</span>
                        <div className="text-3xl font-bold text-yellow-500">{countriesList.length} Pays</div>
                        <span className="text-[10px] text-gray-400">Origines uniques</span>
                    </div>
                </div>

                {/* 14-Day Bar Chart */}
                <div className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase">// VUES & VISITEURS (14 DERNIERS JOURS)</h3>
                        <div className="flex items-center gap-4 text-[10px]">
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blueprint-bluePrimary dark:bg-blueprint-cyan inline-block"></span> Vues</span>
                            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-purple-500 inline-block"></span> Uniques</span>
                        </div>
                    </div>

                    <div className="h-56 flex items-end justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
                        {labels.map((lbl, i) => {
                            const viewPct = Math.max((views[i] / maxVal) * 100, 4);
                            const visitorPct = Math.max((visitors[i] / maxVal) * 100, 4);
                            return (
                                <div key={i} className="w-full flex flex-col items-center group relative h-full justify-end">
                                    <div className="absolute -top-10 bg-gray-900 text-white text-[9px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 font-mono">
                                        {lbl}: {views[i]} vues / {visitors[i]} uniques
                                    </div>
                                    <div className="w-full flex items-end justify-center gap-0.5 h-full">
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${viewPct}%` }}
                                            transition={{ duration: 0.5 }}
                                            className="w-1/2 bg-blueprint-bluePrimary dark:bg-blueprint-cyan"
                                        ></motion.div>
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${visitorPct}%` }}
                                            transition={{ duration: 0.5 }}
                                            className="w-1/2 bg-purple-500 opacity-80"
                                        ></motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-2 text-[9px] text-gray-400 font-mono">
                        {labels.map((lbl, i) => (
                            <span key={i} className="truncate max-w-[28px]">{lbl}</span>
                        ))}
                    </div>
                </div>

                {/* Tables Section */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Top Pages */}
                    <div className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase mb-4">// TOP PAGES CONSULTÉES</h3>
                        <table className="w-full text-left text-xs">
                            <thead className="text-gray-400 border-b border-gray-200 dark:border-gray-800 uppercase font-mono">
                                <tr>
                                    <th className="py-2.5">URL Page</th>
                                    <th className="py-2.5">Vues</th>
                                    <th className="py-2.5">Uniques</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {pagesList.map((p, idx) => (
                                    <tr key={idx}>
                                        <td className="py-2.5 font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan">{p.page_url}</td>
                                        <td className="py-2.5 font-bold text-blueprint-textDark dark:text-white">{p.total_views}</td>
                                        <td className="py-2.5 text-purple-400 font-bold">{p.unique_visitors}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Top Countries */}
                    <div className="bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 p-6">
                        <h3 className="text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase mb-4">// RÉPARTITION PAR PAYS</h3>
                        <div className="space-y-3">
                            {countriesList.map((c, idx) => (
                                <div key={idx} className="space-y-1">
                                    <div className="flex justify-between text-xs font-mono">
                                        <span className="text-blueprint-textDark dark:text-white font-bold">{c.country || 'Inconnu'}</span>
                                        <span className="text-blueprint-bluePrimary dark:text-blueprint-cyan font-bold">{c.total} requêtes</span>
                                    </div>
                                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5">
                                        <div className="bg-blueprint-bluePrimary dark:bg-blueprint-cyan h-full" style={{ width: `${Math.min((c.total / (totalViews || 1)) * 100, 100)}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

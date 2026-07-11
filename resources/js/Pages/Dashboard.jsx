import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Dashboard({ stats, recentMessages }) {
    const dashboardStats = stats || { projects: 0, blogs: 0, messages: 0 };
    const messagesList = recentMessages || [];
    
    const [activeTab, setActiveTab] = useState('All tasks');

    const statCards = [
        { label: 'Revenus', value: '$124,542', change: '+41% from last month', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-gray-500', isCurrency: true },
        { label: 'Total Projets', value: dashboardStats.projects.toString(), change: '+41% from last month', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'text-blueprint-bluePrimary dark:text-blueprint-cyan' },
        { label: 'Total Articles', value: dashboardStats.blogs.toString(), change: '-50% from last month', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15', color: 'text-cyan-500' },
        { label: 'Messages Reçus', value: dashboardStats.messages.toString(), change: '+41% from last month', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-green-500' },
    ];

    const chartBars = [20, 50, 45, 10, 80, 85, 90, 40, 20];
    const chartLabels = ['01 July', '02 July', '03 July', '04 July', '05 July', '06 July', '07 July', '08 July', '09 July'];

    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="SYS_CTRL - Dashboard" />

            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Banner - EXACTLY matching the design's "Unlock premium features" look but in blueprint colors */}
                <div className="bg-gradient-to-r from-blueprint-bluePrimary to-[#7B5CFF] dark:from-[#3B28CC] dark:to-[#5C3AFF] text-white p-5 rounded-lg flex justify-between items-center relative overflow-hidden shadow-sm">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-1.5 text-white/90 text-xs font-medium">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
                            Diagnostics Système Avancés
                        </div>
                        <h2 className="text-base font-medium">Toutes les métriques de l'architecture sont stables et nominales.</h2>
                    </div>
                    <button className="relative z-10 bg-white text-blueprint-bluePrimary dark:text-[#5C3AFF] font-bold px-4 py-2 text-xs rounded-full shadow-sm hover:shadow-md transition-shadow">
                        Générer Rapport
                    </button>
                    {/* Abstract bg shapes */}
                    <div className="absolute right-0 top-0 w-64 h-full overflow-hidden opacity-30">
                        <div className="absolute -right-10 -top-20 w-40 h-40 rounded-full border-4 border-white/20"></div>
                        <div className="absolute right-10 -bottom-20 w-40 h-40 rounded-full border-4 border-white/20"></div>
                    </div>
                </div>

                {/* Overview Header */}
                <div className="flex justify-between items-end pt-2">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">Overview</h3>
                    <div className="flex items-center gap-3">
                        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-md px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 shadow-sm flex items-center gap-2 cursor-pointer">
                            06 Oct 2025 - 07 Oct 2025
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-md px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 shadow-sm flex items-center gap-2 cursor-pointer">
                            Last 30 days
                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <button className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-md px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 shadow-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Export
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
                                <svg className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <p className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mb-1">
                                    {stat.value}
                                </p>
                                <p className={`text-[10px] font-medium ${stat.change.includes('-') ? 'text-red-500' : 'text-green-500'}`}>
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Bar Chart Mock (Takes 2/3) */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Total Trafic</h4>
                                <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">1,525</p>
                                <p className="text-[10px] font-medium text-green-500">+20.5% from last month</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-2.5 py-1 text-[10px] text-gray-600 dark:text-gray-300 flex items-center gap-1.5 cursor-pointer">
                                Last 30 days
                                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                        </div>
                        
                        {/* Bar Chart Bars */}
                        <div className="h-40 flex items-end justify-between gap-3 relative pb-6 border-b border-gray-100 dark:border-gray-800">
                            {/* Y-axis labels */}
                            <div className="absolute left-0 bottom-6 top-0 flex flex-col justify-between text-[9px] text-gray-400 font-medium">
                                <span>200</span>
                                <span>100</span>
                                <span>50</span>
                                <span>0</span>
                            </div>
                            
                            <div className="w-full pl-8 h-full flex items-end justify-between gap-3">
                                {chartBars.map((height, i) => (
                                    <div key={i} className="w-full flex justify-center group relative">
                                        {/* Hover Tooltip Mock */}
                                        <div className="absolute -top-8 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {height * 2.5} visits
                                        </div>
                                        <motion.div 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${height}%` }}
                                            transition={{ duration: 0.8, delay: i * 0.05 }}
                                            className="w-full max-w-[28px] bg-blueprint-bluePrimary dark:bg-[#5C3AFF] rounded-t-md opacity-80 group-hover:opacity-100 transition-opacity"
                                        ></motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* X-axis labels */}
                        <div className="flex justify-between pl-8 pr-2 mt-2 text-[9px] text-gray-400 font-medium">
                            {chartLabels.map((label, i) => (
                                <span key={i}>{label}</span>
                            ))}
                        </div>
                    </div>

                    {/* Line Chart Mock (Takes 1/3) */}
                    <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-5 rounded-xl shadow-sm flex flex-col">
                        <div>
                            <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Interactions</h4>
                            <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">20,462</p>
                            <p className="text-[10px] font-medium text-green-500">+12.1% from last month</p>
                        </div>
                        <div className="flex-1 mt-6 relative min-h-[140px] flex items-center">
                            {/* SVG Line Chart */}
                            <svg className="w-full h-full text-blueprint-bluePrimary dark:text-[#5C3AFF] overflow-visible" viewBox="0 0 100 60" preserveAspectRatio="none" fill="none">
                                {/* Grid lines background */}
                                <line x1="0" y1="15" x2="100" y2="15" stroke="currentColor" strokeWidth="0.5" className="text-gray-100 dark:text-gray-800" />
                                <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.5" className="text-gray-100 dark:text-gray-800" />
                                <line x1="0" y1="45" x2="100" y2="45" stroke="currentColor" strokeWidth="0.5" className="text-gray-100 dark:text-gray-800" />
                                
                                <motion.path 
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    d="M0,45 L15,55 L30,20 L45,35 L60,10 L75,40 L90,25 L100,5" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                                
                                {/* Points */}
                                {[
                                    {x:0,y:45},{x:15,y:55},{x:30,y:20},{x:45,y:35},
                                    {x:60,y:10},{x:75,y:40},{x:90,y:25},{x:100,y:5}
                                ].map((p, i) => (
                                    <circle key={i} cx={p.x} cy={p.y} r="2" fill="white" stroke="currentColor" strokeWidth="1.5" className="dark:fill-[#111827]" />
                                ))}
                            </svg>
                            
                            {/* Faded area under line mock */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blueprint-bluePrimary/5 to-transparent dark:from-[#5C3AFF]/10 pointer-events-none" style={{ clipPath: 'polygon(0 75%, 15% 91%, 30% 33%, 45% 58%, 60% 16%, 75% 66%, 90% 41%, 100% 8%, 100% 100%, 0 100%)' }}></div>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden mt-2">
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">Messages Récents</h3>
                        <div className="flex gap-2">
                            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-[10px] font-medium text-gray-600 dark:text-gray-300 shadow-sm flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                View all
                            </button>
                            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-[10px] font-medium text-gray-600 dark:text-gray-300 shadow-sm flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-gray-700">
                                Last 30 days
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </button>
                            <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1.5 text-[10px] font-medium text-gray-600 dark:text-gray-300 shadow-sm flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                Export
                            </button>
                        </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="px-5 border-b border-gray-100 dark:border-gray-800 flex gap-6 text-[11px] font-semibold">
                        {['All tasks', 'Completed', 'In Progress', 'Pending Approval', 'Cancelled'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-3 transition-colors relative ${activeTab === tab ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                            >
                                {tab}
                                {tab === 'Pending Approval' && (
                                    <span className="ml-1.5 bg-blueprint-bluePrimary dark:bg-[#5C3AFF] text-white text-[9px] px-1.5 py-0.5 rounded-sm">2</span>
                                )}
                                {activeTab === tab && (
                                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blueprint-bluePrimary dark:bg-[#5C3AFF] rounded-t-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px]">
                            <thead className="text-gray-400 font-medium border-b border-gray-100 dark:border-gray-800">
                                <tr>
                                    <th className="px-5 py-3.5 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 border border-gray-300 dark:border-gray-600 rounded-sm"></div>
                                            Client Name
                                        </div>
                                    </th>
                                    <th className="px-5 py-3.5 font-medium">Date</th>
                                    <th className="px-5 py-3.5 font-medium">Contact</th>
                                    <th className="px-5 py-3.5 font-medium">Category</th>
                                    <th className="px-5 py-3.5 font-medium">Aperçu Message</th>
                                    <th className="px-5 py-3.5 font-medium">Status</th>
                                    <th className="px-5 py-3.5 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-700 dark:text-gray-300">
                                {messagesList.map((msg, i) => {
                                    // Mocking different statuses for UI purposes based on index
                                    const statuses = [
                                        { label: 'Completed', color: 'text-green-600 dark:text-green-400', dot: 'bg-green-500' },
                                        { label: 'Pending', color: 'text-yellow-600 dark:text-yellow-400', dot: 'bg-yellow-500' },
                                        { label: 'In Progress', color: 'text-blueprint-bluePrimary dark:text-[#5C3AFF]', dot: 'bg-blueprint-bluePrimary dark:bg-[#5C3AFF]' },
                                        { label: 'Cancelled', color: 'text-red-600 dark:text-red-400', dot: 'bg-red-500' }
                                    ];
                                    const status = statuses[i % 4];

                                    return (
                                        <tr key={msg.id || i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 border border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-[#111827]"></div>
                                                    {msg.name}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{new Date(msg.created_at).toLocaleDateString()}</td>
                                            <td className="px-5 py-3.5 font-medium whitespace-nowrap">{msg.email}</td>
                                            <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white whitespace-nowrap">Contact Web</td>
                                            <td className="px-5 py-3.5 text-gray-500 max-w-[200px] truncate">{msg.message}</td>
                                            <td className="px-5 py-3.5 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 font-medium ${status.color}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-right">
                                                <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination Mock */}
                    <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                        <div className="flex items-center gap-1 text-gray-400">
                            <button className="p-1 hover:text-gray-900 dark:hover:text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg></button>
                            <button className="p-1 hover:text-gray-900 dark:hover:text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
                            <span className="text-xs text-gray-900 dark:text-white font-medium mx-2">1</span>
                            <button className="p-1 hover:text-gray-900 dark:hover:text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
                            <button className="p-1 hover:text-gray-900 dark:hover:text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg></button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, recentMessages }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard Administrateur
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 border-l-4 border-blue-500">
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Projets</h3>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.projects}</p>
                        </div>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 border-l-4 border-indigo-500">
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Articles</h3>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.blogs}</p>
                        </div>
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-6 border-l-4 border-green-500">
                            <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Messages</h3>
                            <p className="text-4xl font-bold text-gray-900 dark:text-white">{stats.messages}</p>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-lg font-bold mb-4">Messages Récents</h3>
                            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                {recentMessages && recentMessages.length > 0 ? (
                                    recentMessages.map(msg => (
                                        <div key={msg.id} className="py-4">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold">{msg.name} ({msg.email})</h4>
                                                <span className="text-xs text-gray-500">{new Date(msg.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{msg.message}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="py-4 text-gray-500 text-sm">Aucun message pour le moment.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

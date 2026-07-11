import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Unauthorized() {
    return (
        <GuestLayout title="ACCÈS REFUSÉ" subtitle="Niveau d'accréditation insuffisant">
            <Head title="Accès Refusé" />

            <div className="flex flex-col items-center justify-center text-center space-y-6 py-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-2"
                >
                    <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </motion.div>

                <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-300">
                        Violation du protocole de sécurité.
                    </p>
                    <p className="text-[10px] font-mono text-gray-500 max-w-[280px] mx-auto">
                        Cette zone est strictement réservée au profil [ mr_dims ]. Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur système.
                    </p>
                </div>

                <div className="pt-6 w-full border-t border-gray-800">
                    <Link
                        href="/"
                        className="w-full flex justify-center items-center gap-2 bg-[#111827] hover:bg-[#1f2937] border border-gray-700 hover:border-gray-500 text-white text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-sm transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        RETOUR À L'ACCUEIL
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}

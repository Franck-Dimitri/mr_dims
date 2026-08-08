import React from 'react';
import { Link } from '@inertiajs/react';

export default function HomeServicesSection() {
    const services = [
        { title: "Développement Web Full Stack", desc: "Création d'applications web sur-mesure avec Laravel & React, conçues pour être rapides, fiables et évolutives.", code: "SYS_DEV_01" },
        { title: "Architecture d'API REST & Backend", desc: "Conception de structures backend robustes, sécurisées et intégrations tierces haute performance.", code: "SYS_DEV_02" },
        { title: "Audit & Optimisation de Code", desc: "Refactoring, revue d'architecture, amélioration des temps de réponse et optimisation des bases de données.", code: "SYS_DEV_03" },
    ];

    return (
        <section className="py-24 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-gray-50/50 dark:bg-blueprint-darkNight/50 font-sans">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16">
                    <span className="font-mono text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-wider">
                        // Offres d'ingénierie
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blueprint-textDark dark:text-white mt-2 font-sans">
                        Services sur-mesure
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((serv, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-8 rounded-2xl shadow-sm flex flex-col justify-between">
                            <div>
                                <span className="font-mono text-[10px] text-gray-400 block mb-4">{serv.code}</span>
                                <h3 className="text-lg font-bold text-blueprint-textDark dark:text-white mb-4">{serv.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{serv.desc}</p>
                            </div>
                            <Link href="/services" className="text-xs font-mono font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan hover:underline">
                                En savoir plus →
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

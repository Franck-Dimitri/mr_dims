import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function FeaturedProjectsSection({ projects, fadeInUp, staggerContainer }) {
    const list = projects || [];

    return (
        <section className="py-24 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="font-mono text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase">
                            // PORTFOLIO SÉLECTIONNÉ
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blueprint-textDark dark:text-white mt-2">
                            PROJETS RÉCENTS
                        </h2>
                    </div>
                    <Link href="/projects" className="hidden sm:flex items-center gap-2 font-mono text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan uppercase hover:underline">
                        VOIR TOUS LES PROJETS →
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {list.length > 0 ? (
                        list.map((project) => (
                            <div key={project.id} className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-mono text-[10px] text-blueprint-bluePrimary dark:text-blueprint-cyan border border-blueprint-bluePrimary/30 px-2 py-0.5 rounded">
                                            {project.category || 'FULL STACK'}
                                        </span>
                                        <span className="font-mono text-xs text-gray-400">♥ {project.likes_count || 0}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-blueprint-textDark dark:text-white mb-2">{project.title}</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 font-mono leading-relaxed">
                                        {project.excerpt || project.description_markdown}
                                    </p>
                                </div>
                                <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                    <Link href={`/projects/${project.slug}`} className="text-xs font-mono font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan hover:underline">
                                        DÉTAILS DU PROJET →
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm font-mono text-gray-400 col-span-3">Aucun projet mis en avant pour le moment.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

import React from 'react';
import { Link } from '@inertiajs/react';

export default function HomeBlogSection({ blogs }) {
    const list = blogs || [];

    return (
        <section className="py-24 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="font-mono text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-widest uppercase">
                            // PUBLICATIONS & ARTICLES
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blueprint-textDark dark:text-white mt-2">
                            DERNIÈRES PUBLICATIONS
                        </h2>
                    </div>
                    <Link href="/blog" className="hidden sm:flex items-center gap-2 font-mono text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan uppercase hover:underline">
                        TOUS LES ARTICLES →
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {list.length > 0 ? (
                        list.map((post) => (
                            <div key={post.id} className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-6 rounded-lg shadow-sm flex flex-col justify-between">
                                <div>
                                    <span className="font-mono text-[10px] text-gray-400 block mb-3">
                                        {new Date(post.published_at || post.created_at).toLocaleDateString()}
                                    </span>
                                    <h3 className="text-lg font-bold text-blueprint-textDark dark:text-white mb-3 line-clamp-2">{post.title}</h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 font-mono line-clamp-3 mb-6">{post.meta_description}</p>
                                </div>
                                <Link href={`/blog/${post.slug}`} className="text-xs font-mono font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan hover:underline">
                                    LIRE L'ARTICLE →
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm font-mono text-gray-400 col-span-3">Aucun article publié pour le moment.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

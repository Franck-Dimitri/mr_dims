import React from 'react';
import { motion } from 'framer-motion';

export default function TechStackSection({ fadeInUp, staggerContainer }) {
    const stacks = [
        { name: "Laravel 13", category: "Backend Core", level: "95%", icon: "PHP / Eloquent" },
        { name: "React 18 & Inertia", category: "Frontend SPA", level: "90%", icon: "JSX / Hooks" },
        { name: "Tailwind & CSS", category: "Design System", level: "92%", icon: "Utility / UI" },
        { name: "MySQL & SQLite", category: "Databases", level: "88%", icon: "Relational DB" },
        { name: "Docker & CI/CD", category: "DevOps & Infra", level: "85%", icon: "Containers" },
        { name: "REST & WebSockets", category: "API & Realtime", level: "90%", icon: "Integration" },
    ];

    return (
        <section className="py-24 border-b border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-gray-50/50 dark:bg-blueprint-darkNight/50 font-sans">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mb-16"
                >
                    <motion.span variants={fadeInUp} className="font-mono text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-wider">
                        // Matrice de compétences
                    </motion.span>
                    <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold tracking-tight text-blueprint-textDark dark:text-white mt-2 font-sans">
                        Stack & Expertise Technique
                    </motion.h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stacks.map((stack, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs text-gray-500 font-mono tracking-wide">{stack.category}</span>
                                <span className="text-xs font-bold text-blueprint-bluePrimary dark:text-blueprint-cyan font-mono">{stack.level}</span>
                            </div>
                            <h3 className="text-base font-bold text-blueprint-textDark dark:text-white mb-2">{stack.name}</h3>
                            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blueprint-bluePrimary dark:bg-blueprint-cyan h-full rounded-full" style={{ width: stack.level }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

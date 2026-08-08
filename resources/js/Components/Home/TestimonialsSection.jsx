import React from 'react';
import TestimonialMarqueeDemo from '@/Components/ui/marquee-01';
import { useLanguage } from '@/Context/LanguageContext';

export default function TestimonialsSection() {
    const { lang } = useLanguage() || { lang: 'fr' };

    return (
        <section className="py-24 border-t border-blueprint-bluePrimary/20 dark:border-blueprint-cyan/20 bg-gray-50/50 dark:bg-[#070A10]/50 font-sans overflow-hidden">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                <span className="font-mono text-xs text-blueprint-bluePrimary dark:text-blueprint-cyan tracking-wider font-bold">
                    // {lang === 'en' ? 'CLIENT REVIEWS & FEEDBACK' : 'TÉMOIGNAGES & RETOURS D\'EXPÉRIENCE'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blueprint-textDark dark:text-white mt-2 font-sans">
                    {lang === 'en' ? 'Trusted by Clients & Partners' : 'Ils font confiance à notre ingénierie'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">
                    {lang === 'en' 
                        ? 'Discover real feedback from collaborators on project execution, quality, and performance.' 
                        : 'Découvrez les retours réels de nos collaborateurs et clients sur la qualité d\'exécution et la performance des projets.'}
                </p>
            </div>

            <div className="w-full">
                <TestimonialMarqueeDemo />
            </div>
        </section>
    );
}

import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { ShoppingBag, ShieldCheck, Sparkles, BookOpen, Code2, Video, Package, Layers, Sparkle } from 'lucide-react';

export default function PrivateOfferLayout({ children, title, accessToken }) {
    const categories = [
        { name: 'Toutes les Ressources', href: `/p/vault/${accessToken ?? 'vault-access'}`, icon: Package },
        { name: 'Formations & Tutoriels', href: `/p/vault/${accessToken ?? 'vault-access'}?cat=formation_video`, icon: Video },
        { name: 'Packs Graphiques & Design', href: `/p/vault/${accessToken ?? 'vault-access'}?cat=template_design`, icon: Layers },
        { name: 'Ebooks & Guides', href: `/p/vault/${accessToken ?? 'vault-access'}?cat=ebook_guide`, icon: BookOpen },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <Head title={title ? `${title} - MR_DIMS Ressources Digitales` : 'MR_DIMS Ressources Digitales'} />

            {/* HEADER (Strict Light Theme) */}
            <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        
                        {/* Brand Logo: Ressources Digitales */}
                        <div className="flex items-center gap-3">
                            <Link
                                href={`/p/vault/${accessToken ?? 'vault-access'}`}
                                className="flex items-center gap-3 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-500 p-0.5 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                                    <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                                        <ShoppingBag className="w-5 h-5 text-indigo-600" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 flex items-center gap-2">
                                        MR_DIMS <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">Ressources Digitales</span>
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-500">
                                        Boutique de ressources numériques premium
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Tabs (Desktop) */}
                        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80">
                            {categories.map((cat, idx) => {
                                const Icon = cat.icon;
                                return (
                                    <Link
                                        key={idx}
                                        href={cat.href}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-all shadow-none hover:shadow-xs"
                                    >
                                        <Icon className="w-3.5 h-3.5 text-indigo-500" />
                                        <span>{cat.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right Trust Seal */}
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            <span>Paiement & Accès Sécurisé</span>
                        </div>
                    </div>

                    {/* Navigation Tabs (Mobile Scrollable) */}
                    <div className="md:hidden flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
                        {categories.map((cat, idx) => {
                            const Icon = cat.icon;
                            return (
                                <Link
                                    key={idx}
                                    href={cat.href}
                                    className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 text-slate-700 whitespace-nowrap border border-slate-200"
                                >
                                    <Icon className="w-3 h-3 text-indigo-600" />
                                    <span>{cat.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT AREA */}
            <main className="flex-grow">{children}</main>

            {/* FOOTER (Strict Light Theme) */}
            <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-100 text-xs">
                        
                        {/* Col 1: Store Intro */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                                <ShoppingBag className="w-4 h-4 text-indigo-600" />
                                <span>MR_DIMS Ressources Digitales</span>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-[11px]">
                                Boutique en ligne de produits digitaux pour créateurs de contenu, vidéastes, freelances et solopreneurs : Packs graphiques, formations vidéo, ebooks et modèles prêts à l'emploi.
                            </p>
                        </div>

                        {/* Col 2: Navigation Categories */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                                Nos Produits Digitaux
                            </h4>
                            <ul className="space-y-2 text-slate-600">
                                <li>
                                    <Link href={`/p/vault/${accessToken ?? 'vault-access'}?cat=formation_video`} className="hover:text-indigo-600">
                                        Formations Vidéo & Tutoriels
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/p/vault/${accessToken ?? 'vault-access'}?cat=template_design`} className="hover:text-indigo-600">
                                        Packs Canva & Modèles Design
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/p/vault/${accessToken ?? 'vault-access'}?cat=ebook_guide`} className="hover:text-indigo-600">
                                        Ebooks & Guides Pratiques PDF
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Col 3: Payment Brands & Security */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                                Règlements acceptés
                            </h4>
                            <p className="text-slate-600 text-[11px]">
                                Validation instantanée via Mobile Money et Carte Bancaire.
                            </p>
                            <div className="flex flex-wrap gap-1.5 pt-1">
                                <span className="px-2.5 py-1 bg-[#FF7900] text-white font-extrabold text-[10px] rounded-md shadow-xs">
                                    Orange Money
                                </span>
                                <span className="px-2.5 py-1 bg-[#FFCC00] text-slate-950 font-extrabold text-[10px] rounded-md shadow-xs">
                                    MTN MoMo
                                </span>
                                <span className="px-2.5 py-1 bg-[#00AEEF] text-white font-extrabold text-[10px] rounded-md shadow-xs">
                                    Wave
                                </span>
                                <span className="px-2.5 py-1 bg-indigo-600 text-white font-extrabold text-[10px] rounded-md shadow-xs">
                                    Visa / MasterCard
                                </span>
                            </div>
                        </div>

                        {/* Col 4: Guarantee & Delivery */}
                        <div className="space-y-3">
                            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                                Accès & Livraison
                            </h4>
                            <div className="flex items-center gap-2 text-emerald-700 font-bold">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>Accès Drive / Téléchargement immédiat</span>
                            </div>
                            <p className="text-slate-600 text-[11px] leading-relaxed">
                                Vos ressources numériques vous sont délivrées automatiquement sur Google Drive ou par lien direct dès la confirmation du paiement.
                            </p>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
                        <div>
                            &copy; {new Date().getFullYear()} MR_DIMS Ressources Digitales. Tous droits réservés.
                        </div>
                        <div className="flex items-center gap-4 font-medium">
                            <span>Livraison Numérique Immédiate</span>
                            <span>•</span>
                            <span>Paiement Sécurisé SSL</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

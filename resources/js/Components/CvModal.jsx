import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import { useLanguage } from '@/Context/LanguageContext';

export default function CvModal({ show, onClose }) {
    const { t } = useLanguage() || { t: (k) => k };
    const [viewMode, setViewMode] = useState('pdf');
    const [copied, setCopied] = useState(false);

    const pdfUrl = '/CV_KOUONGME_MBOUOM_FRANCK_DIMITRI.pdf';
    const imageUrl = '/cv-preview.jpg';

    const trackEvent = (type) => {
        try {
            fetch('/api/analytics/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({
                    type,
                    page: window.location.pathname,
                    meta: { format: viewMode }
                })
            }).catch(() => {});
        } catch (e) {}
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        trackEvent(`cv_view_${mode}`);
    };

    const handleDownloadPdf = () => {
        trackEvent('cv_download_pdf');
    };

    const handleShare = () => {
        const targetUrl = window.location.origin + pdfUrl;
        if (navigator.share) {
            navigator.share({
                title: 'CV Franck Dimitri - Software Architect',
                text: 'Découvrez le CV de Franck Dimitri (Mr Dim\'s), Architecte Logiciel & Développeur Full-Stack.',
                url: targetUrl
            }).then(() => {
                trackEvent('cv_share_native');
            }).catch(() => {});
            return;
        }

        navigator.clipboard.writeText(targetUrl).then(() => {
            setCopied(true);
            trackEvent('cv_share_copied');
            setTimeout(() => setCopied(false), 3000);
        }).catch(() => {
            const input = document.createElement('input');
            input.value = targetUrl;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        });
    };

    return (
        <Modal show={show} onClose={onClose} maxWidth="5xl">
            <div className="relative bg-[#0A0E17] text-white border border-neutral-700 dark:border-neutral-800 shadow-2xl overflow-hidden font-sans flex flex-col max-h-[90vh] rounded-none">
                {/* 4 COINS CARRÉS AVEC + */}
                <span className="absolute -top-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>
                <span className="absolute -top-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>
                <span className="absolute -bottom-2.5 -left-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>
                <span className="absolute -bottom-2.5 -right-2 text-xs font-mono font-bold text-cyan-500 leading-none select-none z-30">+</span>

                {/* --- HEADER --- */}
                <div className="bg-[#111622] border-b border-neutral-800 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-cyan-500 rounded-none animate-pulse"></span>
                        <div>
                            <h3 className="text-sm sm:text-base font-bold tracking-tight text-white font-sans uppercase">
                                {t('cv_modal_title') || 'Curriculum Vitae — Franck Dimitri'}
                            </h3>
                            <div className="text-[11px] text-neutral-400 font-mono">
                                {t('cv_subtitle') || 'INGÉNIEUR LOGICIEL & ARCHITECTE FULL STACK'}
                            </div>
                        </div>
                    </div>

                    {/* Actions Toolbar */}
                    <div className="flex items-center gap-2">
                        {/* Download button */}
                        <a
                            href={pdfUrl}
                            download="CV_KOUONGME_MBOUOM_FRANCK_DIMITRI.pdf"
                            onClick={handleDownloadPdf}
                            className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 rounded-none"
                            title="Télécharger le document PDF"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Télécharger PDF</span>
                        </a>

                        {/* Share button */}
                        <button
                            onClick={handleShare}
                            className="px-3.5 py-2 border border-neutral-700 hover:border-cyan-500 text-neutral-300 hover:text-white text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 bg-[#0A0E17] rounded-none"
                            title="Partager le lien du CV"
                        >
                            <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684" />
                            </svg>
                            <span>Partager</span>
                        </button>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="p-2 border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white transition-colors bg-[#0A0E17] rounded-none ml-1"
                            aria-label="Fermer"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* --- TOGGLE SUB-HEADER --- */}
                <div className="bg-[#0D121D] border-b border-neutral-800 px-5 py-2 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleViewModeChange('pdf')}
                            className={`px-3 py-1 font-bold rounded-none uppercase transition-colors flex items-center gap-1.5 text-[11px] ${
                                viewMode === 'pdf'
                                    ? 'bg-cyan-600 text-white'
                                    : 'text-neutral-400 hover:text-white'
                            }`}
                        >
                            <span>DOCUMENT PDF</span>
                        </button>

                        <button
                            onClick={() => handleViewModeChange('image')}
                            className={`px-3 py-1 font-bold rounded-none uppercase transition-colors flex items-center gap-1.5 text-[11px] ${
                                viewMode === 'image'
                                    ? 'bg-cyan-600 text-white'
                                    : 'text-neutral-400 hover:text-white'
                            }`}
                        >
                            <span>APERÇU IMAGE</span>
                        </button>
                    </div>

                    {copied && (
                        <div className="text-emerald-400 text-xs font-bold font-mono animate-pulse flex items-center gap-1">
                            ✓ LIEN COPIÉ !
                        </div>
                    )}
                </div>

                {/* --- BODY DISPLAY --- */}
                <div className="flex-1 overflow-y-auto bg-[#070A10] p-4 flex justify-center items-start min-h-[500px]">
                    {viewMode === 'pdf' ? (
                        <object
                            data={pdfUrl}
                            type="application/pdf"
                            className="w-full h-[70vh] rounded-none border border-neutral-800"
                        >
                            <div className="text-center py-12 px-4 text-neutral-400 font-sans">
                                <p className="mb-4">Votre navigateur ne supporte pas l'affichage PDF direct.</p>
                                <a
                                    href={pdfUrl}
                                    download="CV_KOUONGME_MBOUOM_FRANCK_DIMITRI.pdf"
                                    onClick={handleDownloadPdf}
                                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs uppercase rounded-none inline-block"
                                >
                                    Télécharger le fichier PDF
                                </a>
                            </div>
                        </object>
                    ) : (
                        <div className="w-full max-w-3xl flex justify-center">
                            <img
                                src={imageUrl}
                                alt="CV - Kouongme Mbouom F. Dimitri"
                                className="w-full h-auto object-contain rounded-none shadow-2xl border border-neutral-800"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'block';
                                }}
                            />
                            <div className="hidden text-center py-12 text-neutral-400 font-sans text-xs">
                                Aperçu image indisponible. Veuillez consulter le PDF ci-dessus.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}

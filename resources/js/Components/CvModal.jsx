import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import { useLanguage } from '@/Context/LanguageContext';

export default function CvModal({ show, onClose }) {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };
    const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'image'
    const [copied, setCopied] = useState(false);

    const pdfUrl = '/cv.pdf';
    const imageUrl = '/cv.jpg';

    const handleShare = async () => {
        const shareUrl = window.location.origin + pdfUrl;
        const shareData = {
            title: 'CV - Kouongme Mbouom F. Dimitri',
            text: 'Découvrez le CV de Kouongme Mbouom F. Dimitri - Ingénieur Informaticien, Génie Logiciel.',
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    copyToClipboard(shareUrl);
                }
            }
        } else {
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (urlToCopy) => {
        const targetUrl = urlToCopy || (window.location.origin + pdfUrl);
        navigator.clipboard.writeText(targetUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        }).catch(() => {
            // Fallback input method if clipboard API fails
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
            <div className="bg-[#0B0F19] text-white border border-blueprint-bluePrimary/40 dark:border-blueprint-cyan/40 shadow-2xl overflow-hidden font-mono flex flex-col max-h-[90vh]">
                
                {/* --- HEADER --- */}
                <div className="bg-[#111827] border-b border-gray-800 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-pulse"></div>
                        <div>
                            <h3 className="text-base font-bold tracking-tight uppercase text-white font-sans">
                                {t('cv_modal_title')}
                            </h3>
                            <div className="text-[10px] text-gray-400 tracking-widest uppercase">
                                {t('cv_subtitle')}
                            </div>
                        </div>
                    </div>

                    {/* Actions Toolbar */}
                    <div className="flex items-center gap-2">
                        {/* Download button */}
                        <a
                            href={pdfUrl}
                            download="CV_KOUONGME_MBOUOM_FRANCK_DIMITRI.pdf"
                            className="px-3.5 py-2 bg-blueprint-bluePrimary hover:bg-blueprint-bluePrimary/80 dark:bg-blueprint-cyan dark:hover:bg-blueprint-cyan/80 text-white dark:text-gray-900 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                            title="Télécharger le document PDF"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>{t('cv_download')}</span>
                        </a>

                        {/* Share button */}
                        <button
                            onClick={handleShare}
                            className="px-3.5 py-2 border border-gray-700 hover:border-blueprint-cyan text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 bg-[#0B0F19]"
                            title="Partager le lien du CV"
                        >
                            <svg className="w-4 h-4 text-blueprint-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684" />
                            </svg>
                            <span>{t('btn_share_cv')}</span>
                        </button>

                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="p-2 border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white transition-colors bg-[#0B0F19] ml-2"
                            aria-label="Fermer"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Toast Copy Notification */}
                {copied && (
                    <div className="bg-green-500/20 border-b border-green-500/40 text-green-400 text-xs px-4 py-2 font-mono flex items-center justify-between animate-fade-in">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{t('cv_link_copied')}</span>
                        </div>
                        <span className="text-[10px] opacity-75">{window.location.origin + pdfUrl}</span>
                    </div>
                )}

                {/* View Mode Switcher */}
                <div className="bg-[#070A10] border-b border-gray-800 px-5 py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('pdf')}
                            className={`px-3 py-1 text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 ${
                                viewMode === 'pdf'
                                    ? 'bg-blueprint-bluePrimary/20 text-blueprint-cyan border border-blueprint-cyan/40'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {t('cv_view_pdf')}
                        </button>
                        <button
                            onClick={() => setViewMode('image')}
                            className={`px-3 py-1 text-[11px] font-bold uppercase transition-colors flex items-center gap-1.5 ${
                                viewMode === 'image'
                                    ? 'bg-blueprint-bluePrimary/20 text-blueprint-cyan border border-blueprint-cyan/40'
                                    : 'text-gray-400 hover:text-gray-200'
                            }`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {t('cv_view_image')}
                        </button>
                    </div>

                    <div className="text-[10px] text-gray-500 uppercase tracking-widest hidden sm:block">
                        SYS_DOC_READER // V1.0
                    </div>
                </div>

                {/* --- DOCUMENT VIEWER CONTENT --- */}
                <div className="flex-1 overflow-y-auto bg-[#070A10] p-4 sm:p-6 min-h-[550px] flex justify-center items-center">
                    {viewMode === 'pdf' ? (
                        <div className="w-full h-full min-h-[550px] relative rounded overflow-hidden border border-gray-800 bg-gray-900">
                            <object
                                data={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                                type="application/pdf"
                                className="w-full h-[650px]"
                            >
                                <iframe
                                    src={`${pdfUrl}#toolbar=1`}
                                    className="w-full h-[650px] border-0"
                                    title="CV PDF Viewer"
                                >
                                    <div className="p-8 text-center text-gray-400">
                                        <p className="mb-4">Votre navigateur ne prend pas en charge la prévisualisation PDF directe.</p>
                                        <a
                                            href={pdfUrl}
                                            download
                                            className="px-4 py-2 bg-blueprint-cyan text-gray-900 font-bold uppercase text-xs"
                                        >
                                            Télécharger le PDF
                                        </a>
                                    </div>
                                </iframe>
                            </object>
                        </div>
                    ) : (
                        <div className="w-full flex justify-center max-w-3xl border border-gray-800 bg-white/5 p-2 rounded shadow-2xl">
                            <img
                                src={imageUrl}
                                alt="CV - Kouongme Mbouom F. Dimitri"
                                className="w-full h-auto max-h-[75vh] object-contain shadow-lg"
                            />
                        </div>
                    )}
                </div>

                {/* --- FOOTER --- */}
                <div className="bg-[#111827] border-t border-gray-800 px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2 text-[11px] tracking-wider">
                        <span className="text-blueprint-cyan font-bold">{'>_'}</span>
                        <span>Ingénieur Informaticien — Génie Logiciel</span>
                    </div>

                    <div className="flex items-center gap-4 text-[11px]">
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-blueprint-cyan transition-colors underline flex items-center gap-1"
                        >
                            <span>Ouvrir dans un nouvel onglet</span>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </Modal>
    );
}

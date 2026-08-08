import React, { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import { useLanguage } from '@/Context/LanguageContext';
import axios from 'axios';

export default function CvModal({ show, onClose }) {
    const { t, lang } = useLanguage() || { lang: 'fr', t: (k) => k };
    const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'image'
    const [copied, setCopied] = useState(false);

    const pdfUrl = '/cv.pdf';
    const imageUrl = '/cv.jpg';

    // Track CV modal opening
    useEffect(() => {
        if (show) {
            axios.post('/api/cv/track', { event_type: 'view_modal' }).catch(() => {});
        }
    }, [show]);

    const handleDownloadPdf = () => {
        axios.post('/api/cv/track', { event_type: 'download_pdf' }).catch(() => {});
    };

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        if (mode === 'image') {
            axios.post('/api/cv/track', { event_type: 'view_image' }).catch(() => {});
        }
    };

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
            <div className="bg-[#0B0F19] text-white border border-blueprint-bluePrimary/40 dark:border-blueprint-cyan/40 shadow-2xl overflow-hidden font-sans flex flex-col max-h-[90vh] rounded-2xl">
                
                {/* --- HEADER --- */}
                <div className="bg-[#111827] border-b border-gray-800 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-blueprint-bluePrimary dark:bg-blueprint-cyan animate-pulse"></div>
                        <div>
                            <h3 className="text-base font-bold tracking-tight text-white font-sans">
                                {t('cv_modal_title')}
                            </h3>
                            <div className="text-xs text-gray-400 font-mono">
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
                            onClick={handleDownloadPdf}
                            className="px-4 py-2 bg-blueprint-bluePrimary hover:bg-blueprint-bluePrimary/80 dark:bg-blueprint-cyan dark:hover:bg-blueprint-cyan/80 text-white dark:text-gray-900 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md rounded-xl"
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
                            className="px-4 py-2 border border-gray-700 hover:border-blueprint-cyan text-gray-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 bg-[#0B0F19] rounded-xl"
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
                            className="p-2 border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-white transition-colors bg-[#0B0F19] rounded-xl ml-2"
                            aria-label="Fermer"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* --- TOGGLE SUB-HEADER --- */}
                <div className="bg-[#0F172A] border-b border-gray-800 px-5 py-2.5 flex items-center justify-between font-mono text-xs">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handleViewModeChange('pdf')}
                            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-2 ${
                                viewMode === 'pdf'
                                    ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>{t('cv_view_pdf')}</span>
                        </button>

                        <button
                            onClick={() => handleViewModeChange('image')}
                            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-2 ${
                                viewMode === 'image'
                                    ? 'bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 shadow-sm'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{t('cv_view_image')}</span>
                        </button>
                    </div>

                    {copied && (
                        <div className="text-green-400 text-xs font-bold animate-pulse flex items-center gap-1">
                            ✓ {t('cv_link_copied')}
                        </div>
                    )}
                </div>

                {/* --- BODY DISPLAY --- */}
                <div className="flex-1 overflow-y-auto bg-[#070A10] p-4 flex justify-center items-start min-h-[500px]">
                    {viewMode === 'pdf' ? (
                        <object
                            data={pdfUrl}
                            type="application/pdf"
                            className="w-full h-[70vh] rounded-xl border border-gray-800"
                        >
                            <div className="text-center py-12 px-4 text-gray-400 font-sans">
                                <p className="mb-4">Votre navigateur ne supporte pas l'affichage PDF direct.</p>
                                <a
                                    href={pdfUrl}
                                    download="CV_KOUONGME_MBOUOM_FRANCK_DIMITRI.pdf"
                                    onClick={handleDownloadPdf}
                                    className="px-6 py-3 bg-blueprint-bluePrimary text-white font-bold text-sm rounded-xl inline-block"
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
                                className="w-full h-auto object-contain rounded-xl shadow-2xl border border-gray-800"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'block';
                                }}
                            />
                            <div className="hidden text-center py-12 text-gray-400 font-sans">
                                Aperçu image indisponible. Veuillez télécharger le PDF ci-dessus.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
}

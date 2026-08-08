import React from 'react';
import { useForm } from '@inertiajs/react';

export default function TerminalContactSection() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        message: '',
        platform_origin: 'web',
        attachment: null,
    });

    const submitContact = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section id="contact" className="py-24 font-sans">
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-xs text-gray-500 font-mono ml-2">Contact Direct & Devis</span>
                    </div>

                    {recentlySuccessful && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500 text-green-600 dark:text-green-400 text-sm rounded-xl">
                            Votre message a bien été transmis. Je vous réponds sous 24h !
                        </div>
                    )}

                    <form onSubmit={submitContact} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Nom complet ou Entreprise</label>
                                <input 
                                    type="text" 
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                    placeholder="Ex: John Doe / Corp Inc."
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 text-sm text-blueprint-textDark dark:text-white focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:outline-none"
                                />
                                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name}</span>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Adresse Email</label>
                                <input 
                                    type="email" 
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    required
                                    placeholder="contact@domaine.com"
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 text-sm text-blueprint-textDark dark:text-white focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:outline-none"
                                />
                                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Cahier des charges ou Message</label>
                            <textarea 
                                rows="5"
                                value={data.message}
                                onChange={e => setData('message', e.target.value)}
                                required
                                placeholder="Décrivez votre projet, vos besoins techniques et vos contraintes de délai..."
                                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 text-sm text-blueprint-textDark dark:text-white focus:border-blueprint-bluePrimary dark:focus:border-blueprint-cyan focus:outline-none"
                            ></textarea>
                            {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message}</span>}
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Pièce jointe (Optionnel: PDF, DOCX, PNG max 2MB)</label>
                            <input 
                                type="file"
                                onChange={e => setData('attachment', e.target.files[0])}
                                className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blueprint-bluePrimary file:text-white dark:file:bg-blueprint-cyan dark:file:text-gray-900 cursor-pointer"
                            />
                            {errors.attachment && <span className="text-red-500 text-xs mt-1 block">{errors.attachment}</span>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full py-4 bg-blueprint-bluePrimary dark:bg-blueprint-cyan text-white dark:text-gray-900 font-bold text-sm rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-md"
                        >
                            {processing ? 'Transmission en cours...' : 'Envoyer le message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

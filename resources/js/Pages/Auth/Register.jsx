import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout title="NOUVELLE AUTORISATION" subtitle="Création d'un profil système">
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">
                        Désignation (Nom)
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full bg-[#111827] border border-gray-700 text-white text-sm focus:ring-0 focus:border-[#22D3EE] rounded-sm px-4 py-2.5 transition-colors"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">
                        Identifiant / Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-[#111827] border border-gray-700 text-white text-sm focus:ring-0 focus:border-[#22D3EE] rounded-sm px-4 py-2.5 transition-colors"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    {errors.email && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">
                        Code d'accès
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-[#111827] border border-gray-700 text-white text-sm focus:ring-0 focus:border-[#22D3EE] rounded-sm px-4 py-2.5 transition-colors"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    {errors.password && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.password}</p>}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-1">
                        Confirmer le code
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full bg-[#111827] border border-gray-700 text-white text-sm focus:ring-0 focus:border-[#22D3EE] rounded-sm px-4 py-2.5 transition-colors"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    {errors.password_confirmation && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.password_confirmation}</p>}
                </div>

                <div className="mt-8 pt-4 border-t border-gray-800 flex flex-col gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center items-center gap-2 bg-[#22D3EE] hover:bg-[#06B6D4] text-gray-900 text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-sm transition-colors disabled:opacity-50"
                    >
                        GÉNÉRER L'ACCÈS
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    </button>
                    
                    <div className="text-center text-[10px] font-mono text-gray-500">
                        Déjà une accréditation ?{' '}
                        <Link href={route('login')} className="text-[#2563EB] hover:text-white transition-colors">
                            Se connecter
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}

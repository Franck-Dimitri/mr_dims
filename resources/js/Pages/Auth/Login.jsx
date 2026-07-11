import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title="CONNEXION AU SYS_CTRL" subtitle="Veuillez décliner votre identité">
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-xs font-mono font-medium text-green-500 bg-green-500/10 p-3 border border-green-500/20 rounded-sm">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
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
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <label htmlFor="password" className="block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-400">
                            Code d'accès
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[9px] font-mono text-gray-500 hover:text-[#22D3EE] underline-offset-2 transition-colors"
                            >
                                CODE PERDU ?
                            </Link>
                        )}
                    </div>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-[#111827] border border-gray-700 text-white text-sm focus:ring-0 focus:border-[#22D3EE] rounded-sm px-4 py-2.5 transition-colors"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.password}</p>}
                </div>

                <div className="flex items-center">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="bg-[#111827] border-gray-700 text-[#2563EB] focus:ring-[#2563EB] focus:ring-offset-[#0B0F19]"
                        />
                        <span className="ms-2 text-[10px] font-mono uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors">
                            Maintenir la connexion
                        </span>
                    </label>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-800 flex flex-col gap-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full flex justify-center items-center gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold uppercase tracking-widest py-3 px-4 rounded-sm transition-colors disabled:opacity-50"
                    >
                        INITIER LA SÉQUENCE
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                    
                    <div className="text-center text-[10px] font-mono text-gray-500">
                        Pas encore d'accès ?{' '}
                        <Link href={route('register')} className="text-[#22D3EE] hover:text-white transition-colors">
                            Demander une autorisation
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}

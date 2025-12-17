"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function Login() {
    const router = useRouter();
    const { updateUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            updateUser({ name: "Alex", email: email }); // Mock user data update
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#FFF5F9] flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-200 rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200 rounded-full blur-[100px] opacity-20"></div>

            <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl shadow-pink-100/50 p-8 md:p-12 relative z-10 border border-pink-50">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <Sparkles size={20} fill="currentColor" />
                        </div>
                        <span className="font-rounded font-bold text-xl text-pink-500">Story Time</span>
                    </Link>
                    <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-2">Welcome Back! 👋</h1>
                    <p className="text-gray-500 font-medium">Log in to continue your adventure.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="mom@example.com"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:outline-none focus:border-pink-500 focus:bg-white transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:outline-none focus:border-pink-500 focus:bg-white transition-all placeholder:text-gray-300"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 shadow-lg shadow-pink-200 hover:shadow-pink-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <> <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Logging in... </>
                        ) : (
                            <> Log In <ArrowRight size={20} /> </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-gray-400 font-medium">
                        Don't have an account? <Link href="/signup" className="text-pink-500 font-bold hover:underline">Join the Club</Link>
                    </p>
                </div>
            </div>

            <div className="mt-8 text-center text-gray-400 text-sm font-bold">
                <Link href="/" className="hover:text-pink-500 transition-colors">By continuing, you agree to our Terms & Privacy Policy.</Link>
            </div>
        </div>
    );
}

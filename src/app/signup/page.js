"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useUser } from '@/context/UserContext';

export default function Signup() {
    const router = useRouter();
    const { signup } = useUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await signup(email, password, name);
            // Auto redirect or show "Check email" message? Supabase default is "Confirm Email" unless disabled.
            // Assuming simplified flow or auto-confirm for now, or just redirecting to a "Check Email" page or dashboard.
            // Usually, if email confirmation is on, user won't be logged in yet.
            // But let's assume we redirect to login or dashboard.
            alert("Account created! Please check your email to confirm if required.");
            router.push('/login');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF5F9] flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Decoration */}
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-100 rounded-full blur-[100px] opacity-30"></div>

            <div className="w-full max-w-md bg-white rounded-[40px] shadow-xl shadow-pink-100/50 p-8 md:p-12 relative z-10 border border-pink-50">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <Sparkles size={20} fill="currentColor" />
                        </div>
                        <span className="font-rounded font-bold text-xl text-pink-500">Story Time</span>
                    </Link>
                    <h1 className="font-rounded font-extrabold text-3xl text-gray-800 mb-2">Join the Club! 🚀</h1>
                    <p className="text-gray-500 font-medium">Create an account to start your journey.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 text-sm font-bold p-4 rounded-xl mb-6 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:outline-none focus:border-pink-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wide">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="mom@example.com"
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:outline-none focus:border-pink-500"
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
                                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-700 focus:outline-none focus:border-pink-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4 shadow-lg shadow-pink-200 mt-6"
                    >
                        {isLoading ? 'Creating Account...' : <>Sign Up <ArrowRight size={20} /></>}
                    </button>
                </form>

                <div className="mt-8 text-center bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-400 font-medium">
                        Already have an account? <Link href="/login" className="text-pink-500 font-bold hover:underline">Log In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

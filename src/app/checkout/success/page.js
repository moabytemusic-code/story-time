"use client";
import Link from 'next/link';
import { CheckCircle, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';

export default function CheckoutSuccess() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <div className="flex flex-col items-center justify-center pt-40 pb-20 px-6 min-h-[80vh]">
                <div className="bg-white p-12 rounded-[40px] shadow-xl shadow-green-100 border border-green-50 text-center max-w-md w-full">
                    <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle size={48} />
                    </div>

                    <h1 className="font-rounded font-extrabold text-3xl text-slate-800 mb-4">Payment Successful!</h1>
                    <p className="text-gray-500 mb-8">
                        Thank you for your purchase. We've sent a confirmation email with your order details.
                    </p>

                    <Link href="/dashboard" className="btn-primary w-full flex items-center justify-center gap-2">
                        <Home size={20} /> Go to Dashboard
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}

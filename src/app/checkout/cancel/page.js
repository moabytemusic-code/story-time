"use client";
import Link from 'next/link';
import { XCircle, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutCancel() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <div className="flex flex-col items-center justify-center pt-40 pb-20 px-6 min-h-[80vh]">
                <div className="bg-white p-12 rounded-[40px] shadow-xl shadow-red-100 border border-red-50 text-center max-w-md w-full">
                    <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle size={48} />
                    </div>

                    <h1 className="font-rounded font-extrabold text-3xl text-slate-800 mb-4">Payment Cancelled</h1>
                    <p className="text-gray-500 mb-8">
                        Your payment was not processed. No charges were made.
                    </p>

                    <Link href="/cart" className="btn-secondary w-full flex items-center justify-center gap-2">
                        <ArrowLeft size={20} /> Return to Cart
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}

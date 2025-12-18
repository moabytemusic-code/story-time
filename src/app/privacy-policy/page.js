"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <h1 className="font-rounded font-extrabold text-4xl md:text-5xl text-gray-800 mb-4">Privacy Policy</h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    We take your privacy and your child's safety very seriously. Here is how we protect your data.
                </p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-pink-50">

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-pink-50 p-6 rounded-3xl text-center">
                            <div className="w-12 h-12 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield size={24} />
                            </div>
                            <h3 className="font-bold text-gray-700 mb-2">Safe & Secure</h3>
                            <p className="text-sm text-gray-500">Industry standard encryption for all data.</p>
                        </div>
                        <div className="bg-blue-50 p-6 rounded-3xl text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Lock size={24} />
                            </div>
                            <h3 className="font-bold text-gray-700 mb-2">No Ads</h3>
                            <p className="text-sm text-gray-500">A completely ad-free environment for kids.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-3xl text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Eye size={24} />
                            </div>
                            <h3 className="font-bold text-gray-700 mb-2">Transparent</h3>
                            <p className="text-sm text-gray-500">We never sell your personal information.</p>
                        </div>
                    </div>

                    <div className="prose prose-pink max-w-none text-gray-600">
                        <h2 className="font-rounded font-bold text-2xl text-gray-800">1. Information We Collect</h2>
                        <p>
                            We only collect information necessary to provide our service. This includes:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li>Account information (name, email address) for parents.</li>
                            <li>Profile information (child's nickname, age group) to personalize content.</li>
                            <li>Usage data (listening history, favorites) to improve recommendations.</li>
                        </ul>

                        <h2 className="font-rounded font-bold text-2xl text-gray-800">2. How We Use Information</h2>
                        <p>
                            Your information is used solely to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mb-6">
                            <li>Provide and maintain the Story Time service.</li>
                            <li>Personalize the storytelling experience for your child.</li>
                            <li>Communicate important updates regarding your account.</li>
                        </ul>

                        <h2 className="font-rounded font-bold text-2xl text-gray-800">3. Children's Privacy</h2>
                        <p className="mb-6">
                            Story Time is designed for children, but accounts must be created and managed by a parent or guardian. We do not knowingly collect personal identifiable information from children under 13 without parental consent. If we become aware that we have collected such information without verification, we will remove it.
                        </p>

                        <h2 className="font-rounded font-bold text-2xl text-gray-800">4. Third Parties</h2>
                        <p className="mb-6">
                            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you (e.g., payment processors), so long as those parties agree to keep this information confidential.
                        </p>

                        <h2 className="font-rounded font-bold text-2xl text-gray-800">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at support@storytime.com.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
                        Last Updated: December 18, 2025
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}

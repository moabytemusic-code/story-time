"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formData, setFormData] = useState({ parentName: '', childName: '', email: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                alert("Message sent! We'll be in touch safely soon.");
                setFormData({ parentName: '', childName: '', email: '', message: '' });
            } else {
                const resData = await res.json();
                alert("Oops! " + (resData.message || "Something went wrong. Please try again."));
            }
        } catch (error) {
            console.error("Contact Error:", error);
            alert("Error sending message.");
        } finally {
            setSending(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm text-pink-500 mb-6">
                    <Mail size={32} />
                </div>
                <h1 className="font-rounded font-extrabold text-4xl md:text-5xl text-gray-800 mb-4">Contact Ms. Erica</h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    We love hearing from our listeners! Whether you have a story request, a question, or just want to say hi.
                </p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-[40px] shadow-lg shadow-pink-100/50 border border-pink-50">
                        <h2 className="font-rounded font-bold text-2xl text-gray-800 mb-6">Send a Message</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Parent's Name</label>
                                    <input
                                        name="parentName"
                                        value={formData.parentName}
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:outline-none focus:border-pink-500 transition-colors"
                                        placeholder="Jane Doe"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Child's Name (Optional)</label>
                                    <input
                                        name="childName"
                                        value={formData.childName}
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:outline-none focus:border-pink-500 transition-colors"
                                        placeholder="Alex"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Email Address</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:outline-none focus:border-pink-500 transition-colors"
                                    placeholder="jane@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-extrabold text-pink-500 uppercase tracking-widest mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-700 focus:outline-none focus:border-pink-500 transition-colors resize-none"
                                    placeholder="Tell us what's on your mind..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={sending}
                                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {sending ? 'Sending...' : <><Send size={20} /> Send Message</>}
                            </button>
                        </form>
                    </div>

                    {/* Info Side */}
                    <div className="space-y-8">
                        <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100">
                            <h3 className="font-rounded font-bold text-xl text-blue-900 mb-4 flex items-center gap-2">
                                <MessageCircle size={24} className="text-blue-500" />
                                Story Requests
                            </h3>
                            <p className="text-blue-800/70 mb-6 leading-relaxed">
                                Does your little one have a specific topic they are struggling with? Or maybe a favorite animal? Let us know! Ms. Erica loves creating stories inspired by our listeners.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] border border-gray-100">
                            <h3 className="font-rounded font-bold text-xl text-gray-800 mb-4">Other Ways to Connect</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-gray-600">
                                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
                                        <Mail size={18} />
                                    </div>
                                    <span className="font-bold">hello@storytimewitherica.com</span>
                                </li>
                                <li className="flex items-center gap-4 text-gray-600">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                                        <span>📷</span>
                                    </div>
                                    <span className="font-bold">@storytimewitherica</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}

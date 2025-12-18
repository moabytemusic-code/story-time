"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQS = [
    {
        question: "What age range are the stories for?",
        answer: "Our stories are primarily designed for children aged 3 to 8. However, we have many younger and older listeners who enjoy them too! We have categories for 'Little Ears' (3-5) and 'Growing Minds' (6-8)."
    },
    {
        question: "Is there a monthly subscription?",
        answer: "Story Time offers both free and premium content. You can listen to a selection of stories for free. Our 'Little Wonders Club' membership unlocks unlimited access to our entire library, offline downloads, and exclusive bonus content."
    },
    {
        question: "Can I download stories to listen offline?",
        answer: "Yes! Premium members can download any story to their device. This is perfect for car rides, flights, or anywhere without a reliable internet connection."
    },
    {
        question: "Are the stories safe for my child?",
        answer: "Absolutely. Safety and positivity are our top priorities. Every story is written by children's authors and reviewed by child development experts to ensure they are age-appropriate, inclusive, and free from scary or inappropriate themes."
    },
    {
        question: "Can I use Story Time on multiple devices?",
        answer: "Yes, you can log in to your account on multiple devices (phones, tablets, computers) so your child can listen wherever they are."
    },
    {
        question: "How do I cancel my subscription?",
        answer: "You can cancel your subscription at any time through your Account Settings page. You will continue to have access until the end of your current billing period."
    }
];

export default function FAQ() {
    return (
        <main className="min-h-screen bg-[#FFF5F9]">
            <Navbar />

            <section className="pt-32 pb-12 px-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm text-pink-500 mb-6">
                    <HelpCircle size={32} />
                </div>
                <h1 className="font-rounded font-extrabold text-4xl md:text-5xl text-gray-800 mb-4">Frequently Asked Questions</h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                    Have a question? We're here to help!
                </p>
            </section>

            <section className="px-6 pb-20">
                <div className="max-w-3xl mx-auto space-y-4">
                    {FAQS.map((faq, index) => (
                        <FAQItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>

                <div className="max-w-3xl mx-auto mt-16 text-center p-8 bg-white rounded-[32px] border border-pink-100 shadow-sm">
                    <h3 className="font-rounded font-bold text-xl text-gray-800 mb-2">Still have questions?</h3>
                    <p className="text-gray-500 mb-6">We'd love to chat. Send us a message!</p>
                    <button className="btn-primary">Contact Support</button>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left"
            >
                <span className="font-rounded font-bold text-lg text-gray-700">{question}</span>
                <span className={`text-pink-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={24} />
                </span>
            </button>
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 text-gray-500 leading-relaxed">
                    {answer}
                </div>
            </div>
        </div>
    )
}

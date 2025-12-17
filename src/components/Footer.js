import { Sparkles, Youtube, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-pink-50 py-20 px-6 border-t border-pink-100">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white">
                            <Sparkles size={20} fill="currentColor" />
                        </div>
                        <span className="font-rounded font-bold text-xl text-pink-500">Story Time</span>
                    </div>
                    <p className="text-gray-500 max-w-sm mb-6">
                        Creating safe, magical audio spaces for children to grow, learn, and dream.
                    </p>
                    <div className="flex gap-4">
                        <SocialIcon icon={<Youtube size={20} />} />
                        <SocialIcon icon={<Heart size={20} />} />
                        <SocialIcon icon={<ShoppingBag size={20} />} />
                    </div>
                </div>

                <h4 className="font-bold text-gray-800 mb-6">Explore</h4>
                <ul className="space-y-4 text-gray-500">
                    <li><Link href="/stories" className="hover:text-pink-500">All Stories</Link></li>
                    <li><Link href="/membership" className="hover:text-pink-500">Membership</Link></li>
                    <li><Link href="/shop" className="hover:text-pink-500">Gift Cards</Link></li>
                </ul>

                <div>
                    <h4 className="font-bold text-gray-800 mb-6">Support</h4>
                    <ul className="space-y-4 text-gray-500">
                        <li><a href="#" className="hover:text-pink-500">FAQ</a></li>
                        <li><a href="#" className="hover:text-pink-500">Contact Ms. Erica</a></li>
                        <li><a href="#" className="hover:text-pink-500">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }) {
    return (
        <button className="w-10 h-10 rounded-full bg-white border border-pink-100 flex items-center justify-center text-pink-400 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
            {icon}
        </button>
    )
}

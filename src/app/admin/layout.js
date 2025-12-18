"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, Shield, ShoppingBag } from 'lucide-react';

const ADMIN_MENU = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { name: 'Stories', icon: <BookOpen size={20} />, path: '/admin/stories' },
    { name: 'Store', icon: <ShoppingBag size={20} />, path: '/admin/products' },
    { name: 'Users', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
];

import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useUser();

    const handleExit = async () => {
        await logout();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-nunito">

            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 text-white flex flex-col z-50">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-pink-500 flex items-center justify-center text-white">
                            <Shield size={16} fill="currentColor" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">Story Time Admin</span>
                    </Link>

                    <nav className="space-y-1">
                        {ADMIN_MENU.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive
                                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-900/20'
                                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-white/10">
                    <button onClick={handleExit} className="flex items-center gap-3 text-slate-400 hover:text-white font-bold transition-colors w-full text-left">
                        <LogOut size={20} />
                        Exit Admin
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}

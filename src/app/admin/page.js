"use client";
import { useEffect, useState } from 'react';
import { Users, BookOpen, PlayCircle, HardDrive, CheckCircle, XCircle, Loader2, ShoppingBag } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ users: 0, stories: 0, products: 0 });
    const [loading, setLoading] = useState(true);
    const [maintenance, setMaintenance] = useState(false);

    useEffect(() => {
        // Check maintenance mode
        const savedSettings = localStorage.getItem('app_settings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            setMaintenance(parsed.maintenanceMode || false);
        }

        async function fetchStats() {
            setLoading(true);
            if (!supabase) {
                setLoading(false);
                return;
            }

            try {
                const [users, stories, products] = await Promise.all([
                    supabase.from('profiles').select('*', { count: 'exact', head: true }),
                    supabase.from('stories').select('*', { count: 'exact', head: true }),
                    supabase.from('products').select('*', { count: 'exact', head: true }),
                ]);

                setStats({
                    users: users.count || 0,
                    stories: stories.count || 0,
                    products: products.count || 0,
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    return (
        <div>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, Admin.</p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100">
                    {loading ? (
                        <span className="flex items-center gap-2 text-gray-400 font-bold text-sm">
                            <Loader2 size={16} className="animate-spin" /> Check System...
                        </span>
                    ) : maintenance ? (
                        <span className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                            <XCircle size={16} /> Maintenance Mode
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-green-600 font-bold text-sm">
                            <CheckCircle size={16} /> System Online
                        </span>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Users" value={stats.users} icon={<Users className="text-blue-500" />} />
                <StatCard title="Active Stories" value={stats.stories} icon={<BookOpen className="text-pink-500" />} />
                <StatCard title="Store Products" value={stats.products} icon={<ShoppingBag className="text-purple-500" />} />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="font-bold text-lg text-slate-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <Users size={16} className="text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-700">New user signed up</p>
                                <p className="text-xs text-slate-400">2 minutes ago</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
            <div>
                <p className="text-sm font-bold text-slate-400 mb-1">{title}</p>
                <h3 className="text-2xl font-extrabold text-slate-800">{value}</h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
                {icon}
            </div>
        </div>
    )
}

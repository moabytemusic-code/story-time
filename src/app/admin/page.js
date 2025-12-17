"use client";
import { useEffect, useState } from 'react';
import { Users, BookOpen, PlayCircle, HardDrive, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
    const [connectionStatus, setConnectionStatus] = useState("checking"); // checking, connected, error, nokeys

    useEffect(() => {
        async function checkConnection() {
            if (!supabase) {
                setConnectionStatus("nokeys");
                return;
            }
            try {
                const { count, error } = await supabase.from('stories').select('*', { count: 'exact', head: true });
                if (error) throw error;
                setConnectionStatus("connected");
            } catch (err) {
                console.error("Supabase Conn/Check Error:", err);
                setConnectionStatus("error");
            }
        }
        checkConnection();
    }, []);

    return (
        <div>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, Admin.</p>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Status:</span>
                    {connectionStatus === 'checking' && <Loader2 size={16} className="animate-spin text-blue-500" />}
                    {connectionStatus === 'connected' && (
                        <span className="flex items-center gap-1 text-green-600 font-bold text-sm">
                            <CheckCircle size={16} /> Online
                        </span>
                    )}
                    {connectionStatus === 'error' && (
                        <span className="flex items-center gap-1 text-red-500 font-bold text-sm">
                            <XCircle size={16} /> Connection Failed
                        </span>
                    )}
                    {connectionStatus === 'nokeys' && (
                        <span className="flex items-center gap-1 text-orange-500 font-bold text-sm">
                            <XCircle size={16} /> Keys Missing
                        </span>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Users" value="1,234" icon={<Users className="text-blue-500" />} />
                <StatCard title="Active Stories" value="48" icon={<BookOpen className="text-pink-500" />} />
                <StatCard title="Total Plays" value="85.2k" icon={<PlayCircle className="text-green-500" />} />
                <StatCard title="Storage Used" value="4.2 GB" icon={<HardDrive className="text-purple-500" />} />
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

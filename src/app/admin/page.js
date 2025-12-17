"use client";
import { Users, BookOpen, PlayCircle, HardDrive } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
                <p className="text-slate-500">Welcome back, Admin.</p>
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

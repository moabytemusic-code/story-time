"use client";
import { Search, Mail, User, Calendar, MoreVertical, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            if (!supabase) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error("Error fetching users:", error);
            else setUsers(data || []);

            setLoading(false);
        }
        fetchUsers();
    }, []);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Users</h1>
                    <p className="text-slate-500">Manage your member base.</p>
                </div>
            </header>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-50 text-slate-600 font-bold text-sm rounded-lg hover:bg-gray-100">Filter</button>
                    <button className="px-4 py-2 bg-gray-50 text-slate-600 font-bold text-sm rounded-lg hover:bg-gray-100">Export</button>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
                {loading ? (
                    <div className="flex items-center justify-center h-full py-20 text-slate-400">
                        <Loader2 size={32} className="animate-spin" />
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Plan</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center font-bold uppercase">
                                                {user.full_name ? user.full_name.charAt(0) : (user.email ? user.email.charAt(0) : '?')}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700 text-sm">{user.full_name || 'No Name'}</p>
                                                <p className="text-xs text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${user.plan === 'Family' ? 'bg-purple-100 text-purple-600' :
                                                user.plan === 'Adventurer' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {user.plan || 'Free'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-slate-500">{formatDate(user.created_at)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                            {user.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-slate-600">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                                        No users found. (Did you run the Profiles SQL?)
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}

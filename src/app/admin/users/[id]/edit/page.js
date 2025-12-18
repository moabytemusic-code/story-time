"use client";
import Link from 'next/link';
import { ArrowLeft, Save, User, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';

export default function EditUser() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        plan: 'Free',
        status: 'Active'
    });

    useEffect(() => {
        if (!id) return;

        async function fetchProfile() {
            setLoading(true);
            if (!supabase) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching profile:", error);
                alert("User not found or access denied.");
                router.push('/admin/users');
            } else if (data) {
                setProfile(data);
            }
            setLoading(false);
        }

        fetchProfile();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: profile.full_name,
                plan: profile.plan,
                status: profile.status
            })
            .eq('id', id);

        if (error) {
            alert("Error saving: " + error.message);
        } else {
            // Force hard reload to guarantee fresh data
            window.location.href = '/admin/users';
        }
        setSaving(false);
    };

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 size={48} className="animate-spin text-pink-500" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/admin/users" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold mb-6 transition-colors">
                <ArrowLeft size={18} /> Back to Users
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Edit User</h1>
                <p className="text-slate-500">Update member details.</p>
            </header>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center font-bold text-2xl uppercase">
                        {profile.full_name ? profile.full_name.charAt(0) : (profile.email ? profile.email.charAt(0) : '?')}
                    </div>
                    <div>
                        <p className="font-bold text-slate-800 text-lg">{profile.email}</p>
                        <p className="text-sm text-slate-400">User ID: {id}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 uppercase">Full Name</label>
                    <input
                        name="full_name"
                        type="text"
                        value={profile.full_name || ''}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase">Plan</label>
                        <select
                            name="plan"
                            value={profile.plan || 'Free'}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="Free">Free</option>
                            <option value="Explorer">Explorer</option>
                            <option value="Adventurer">Adventurer</option>
                            <option value="Family">Family</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-500 uppercase">Status</label>
                        <select
                            name="status"
                            value={profile.status || 'Active'}
                            onChange={handleChange}
                            className="input-field"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Banned">Banned</option>
                        </select>
                    </div>
                </div>

                <div className="pt-6 flex justify-end gap-4">
                    <Link href="/admin/users" className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                        Cancel
                    </Link>
                    <button type="submit" disabled={saving} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-200">
                        {saving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                    </button>
                </div>

            </form>

            <style jsx>{`
                .input-field {
                    @apply w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:border-pink-500 focus:bg-white transition-all;
                }
            `}</style>
        </div>
    );
}

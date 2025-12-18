"use client";
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, Loader2 } from 'lucide-react';
import { useStories } from '@/hooks/useStories';

export default function AdminStories() {
    const { stories, loading } = useStories();

    return (
        <div>
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Stories</h1>
                    <p className="text-slate-500">Manage your audio content.</p>
                </div>
                <Link href="/admin/stories/new" className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-pink-200">
                    <Plus size={20} /> Add New Story
                </Link>
            </header>

            {/* Search */}
            <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search stories..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-50"
                />
            </div>

            {/* Stories Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
                {loading ? (
                    <div className="flex items-center justify-center h-full py-20 text-slate-400">
                        <Loader2 size={32} className="animate-spin" />
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Duration</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {stories && stories.map(story => (
                                <tr key={story.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg ${story.color} flex items-center justify-center text-xl`}>
                                                {story.icon}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700">{story.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600">{story.tag}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-500">{story.duration}</td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-green-600">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div> Published
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/stories/${story.id}/edit`} className="p-2 hover:bg-blue-50 text-gray-400 hover:text-blue-500 rounded-lg transition-colors">
                                                <Edit2 size={16} />
                                            </Link>
                                            <button className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}

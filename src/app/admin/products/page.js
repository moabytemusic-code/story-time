"use client";
import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical, Loader2, Package, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            if (!supabase) return;
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) console.error(error);
            else setProducts(data || []);
            setLoading(false);
        }
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;

            // Remove from UI
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
            alert("Error deleting product: " + err.message);
        }
    };

    return (
        <div>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Store Products</h1>
                    <p className="text-slate-500">Manage your digital and physical inventory.</p>
                </div>
                <Link href="/admin/products/new" className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-pink-200 flex items-center gap-2">
                    <Plus size={20} /> Add Product
                </Link>
            </header>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6 flex items-center justify-between">
                <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-pink-500/20" />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
                {loading ? (
                    <div className="flex items-center justify-center h-full py-20 text-slate-400">
                        <Loader2 size={32} className="animate-spin" />
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Product</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 font-bold text-xs text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                                                {product.image_url ? (
                                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="text-gray-400" size={20} />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-700 text-sm">{product.name}</p>
                                                <p className="text-xs text-slate-400 truncate max-w-[200px]">{product.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-700">
                                        ${product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.stock_status === 'In Stock' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                            {product.stock_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded text-xs font-bold bg-blue-50 text-blue-600">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/products/${product.id}/edit`} className="p-2 hover:bg-blue-50 text-gray-400 hover:text-blue-500 rounded-lg transition-colors">
                                                <MoreVertical size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-20 text-center text-slate-400">
                                        <div className="flex flex-col items-center gap-2">
                                            <Package size={48} className="text-gray-200" />
                                            <p>No products found.</p>
                                            <Link href="/admin/products/new" className="text-pink-500 font-bold hover:underline">Create your first product</Link>
                                        </div>
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

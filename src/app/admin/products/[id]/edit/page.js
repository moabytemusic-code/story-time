"use client";
import Link from 'next/link';
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, uploadFile } from '@/lib/supabase';
import { useRouter, useParams } from 'next/navigation';

export default function EditProduct() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Toys',
        stock_status: 'In Stock',
        image_url: ''
    });

    useEffect(() => {
        if (!id || !supabase) return;
        async function fetchProduct() {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error(error);
                alert("Error fetching product");
                router.push('/admin/products');
            } else if (data) {
                setProduct(data);
            }
            setLoading(false);
        }
        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Upload New Image if selected
            let newImageUrl = product.image_url;
            if (imageFile) {
                newImageUrl = await uploadFile(imageFile, 'uploads');
            }

            // Update DB
            const { error } = await supabase.from('products').update({
                name: product.name,
                description: product.description,
                price: parseFloat(product.price),
                category: product.category,
                stock_status: product.stock_status,
                image_url: newImageUrl
            }).eq('id', id);

            if (error) throw error;

            router.refresh();
            window.location.href = '/admin/products'; // Hard navigate to ensure refresh

        } catch (err) {
            console.error(err);
            alert("Error updating product: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-pink-500" size={48} /></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/admin/products" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold mb-6 transition-colors">
                <ArrowLeft size={18} /> Back to Products
            </Link>

            <header className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800">Edit Product</h1>
                <p className="text-slate-500">Update item details.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column: Details */}
                    <div className="space-y-6 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-fit">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Product Name</label>
                            <input name="name" type="text" value={product.name} onChange={handleChange} className="input-field" required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Price ($)</label>
                            <input name="price" type="number" step="0.01" value={product.price} onChange={handleChange} className="input-field" required />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase">Category</label>
                                <select name="category" value={product.category} onChange={handleChange} className="input-field">
                                    <option value="Toys">Toys</option>
                                    <option value="Merch">Merch</option>
                                    <option value="Digital">Digital</option>
                                    <option value="Books">Books</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500 uppercase">Status</label>
                                <select name="stock_status" value={product.stock_status} onChange={handleChange} className="input-field">
                                    <option value="In Stock">In Stock</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                    <option value="Pre-order">Pre-order</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500 uppercase">Description</label>
                            <textarea name="description" rows="4" value={product.description || ''} onChange={handleChange} className="input-field resize-none"></textarea>
                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-4 mb-6">Product Image</h2>

                            <div className="relative aspect-square border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-pink-300 transition-all cursor-pointer group bg-gray-50 overflow-hidden">
                                {imageFile ? (
                                    <img src={URL.createObjectURL(imageFile)} className="absolute inset-0 w-full h-full object-cover" />
                                ) : product.image_url ? (
                                    <img src={product.image_url} className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <ImageIcon size={24} />
                                        </div>
                                        <span className="font-bold text-slate-600 mb-1">Upload Photo</span>
                                        <span className="text-xs text-slate-400">JPG, PNG</span>
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/products" className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">Cancel</Link>
                    <button type="submit" disabled={saving} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-lg shadow-slate-200">
                        {saving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                    </button>
                </div>

            </form>

            <style jsx>{`
                .input-field {
                    @apply w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-slate-700 focus:outline-none focus:border-pink-500 focus:bg-white transition-all placeholder:text-gray-300;
                }
            `}</style>
        </div>
    );
}

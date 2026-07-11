import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

// Helper function to render Tailwind-styled premium icons based on category
const getCategoryIcon = (category) => {
    const normalCat = category?.trim().toLowerCase();

    switch (normalCat) {
        case 'tablet':
            return (
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-teal-100/60 transition-transform duration-300 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <circle cx="12" cy="12" r="10" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50/80 px-3 py-1 rounded-full tracking-wider uppercase border border-teal-100/40">Solid Oral Dosage (Tablet)</span>
                </div>
            );
        case 'capsule':
            return (
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-teal-100/60 transition-transform duration-300 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            {/* Mathematically aligned and rotated capsule with flawless mid-line split */}
                            <g transform="rotate(-45 12 12)">
                                <rect x="4" y="8" width="16" height="8" rx="4" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                            </g>
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50/80 px-3 py-1 rounded-full tracking-wider uppercase border border-teal-100/40">Gelatin Capsule Format</span>
                </div>
            );
        case 'syrup':
            return (
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-teal-100/60 transition-transform duration-300 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-5 0v3h4V3m-5 3h6v13a3 3 0 01-3 3h-0a3 3 0 01-3-3V6zm2 7h2" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50/80 px-3 py-1 rounded-full tracking-wider uppercase border border-teal-100/40">Liquid Suspension (Syrup)</span>
                </div>
            );
        case 'injection':
            return (
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-teal-100/60 transition-transform duration-300 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 21l3-3M7 14l4 4M9 12l8-8a2.121 2.121 0 013 3l-8 8M12 9l3 3M19 3l2 2" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50/80 px-3 py-1 rounded-full tracking-wider uppercase border border-teal-100/40">Intravenous / Ampoule</span>
                </div>
            );
        case 'ointment':
            return (
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-teal-100/60 transition-transform duration-300 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l-.5 8m.5-8h-15m0 0l.5 8m0 0h14" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50/80 px-3 py-1 rounded-full tracking-wider uppercase border border-teal-100/40">Topical Ointment Tube</span>
                </div>
            );
        default:
            return (
                <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-xs border border-teal-100/60 transition-transform duration-300 hover:scale-105">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5V20a2 2 0 01-2 2H7a2 2 0 01-2-2v-9.5M3 10h18M12 7V3m0 0a1 1 0 100 2 1 1 0 000-2z" />
                        </svg>
                    </div>
                    <span className="text-xs font-bold text-teal-700 bg-teal-50/80 px-3 py-1 rounded-full tracking-wider uppercase border border-teal-100/40">Medical Product Item</span>
                </div>
            );
    }
};

const MedicineDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [medicine, setMedicine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/medicines/${id}`);
                if (response.data.success) {
                    setMedicine(response.data.data);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Error processing record lookup');
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id]);

    if (loading) return <div className="text-center py-32 text-gray-400 font-medium">Loading detailed specifications...</div>;
    if (error) return <div className="text-center py-32 text-red-500 bg-red-50 m-6 rounded-2xl">{error}</div>;
    if (!medicine) return <div className="text-center py-32 text-gray-500">Item structural definition missing.</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <Link to="/medicines" className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 mb-8 transition-colors">
                ← Back to Pharmacy Catalog
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-xs">
                
                {/* Premium Specimen Display Box with Dynamic Watermark Rings */}
                <div className="relative overflow-hidden bg-gradient-to-tr from-slate-50 via-teal-50/10 to-slate-100 rounded-2xl h-96 w-full flex flex-col items-center justify-center border border-slate-200/50 p-6 shadow-inner">
                    
                    {/* Abstract Decorative Medical Backdrop Patterns */}
                    <div className="absolute inset-0 pointer-events-none opacity-40 flex items-center justify-center">
                        <div className="w-80 h-80 rounded-full border border-dashed border-teal-200/40 animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                        <div className="w-60 h-60 rounded-full border border-teal-100/60 bg-teal-50/20"></div>
                    </div>
                    <div className="absolute top-4 left-4 text-[10px] font-mono tracking-widest text-slate-400/60 select-none uppercase">
                        Product Ref: #{id?.slice(-6)}
                    </div>
                    
                    {/* Render Content */}
                    <div className="relative z-10 drop-shadow-xs">
                        {getCategoryIcon(medicine.category)}
                    </div>
                </div>

                {/* Details Meta Block */}
                <div className="space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="flex gap-2 items-center">
                            <span className="bg-teal-50 text-teal-700 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                                {medicine.category}
                            </span>
                            {medicine.requiresPrescription && (
                                <span className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-red-100">
                                    Prescription Required 
                                </span>
                            )}
                        </div>
                        
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{medicine.name}</h1>
                        <p className="text-sm font-medium text-gray-400">Manufacturer/Lab: <span className="text-gray-700">{medicine.manufacturer}</span></p>
                        <p className="text-2xl font-black text-gray-900">Rs. {medicine.price}</p>
                        
                        <hr className="border-gray-100" />
                        
                        <div className="space-y-2">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Clinical Description</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{medicine.description}</p>
                        </div>

                        {medicine.dosageInstructions && (
                            <div className="space-y-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Dosage & Usage Guidelines</h3>
                                <p className="text-gray-600 text-xs leading-relaxed">{medicine.dosageInstructions}</p>
                            </div>
                        )}
                    </div>

                    {/* Operational Core (Cart Dispatch Interface) */}
                    <div className="space-y-4 pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-700">Stock Availability:</span>
                            <span className={`text-sm font-black ${medicine.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                {medicine.stock > 0 ? `${medicine.stock} Packs Remaining` : 'Out of stock'}
                            </span>
                        </div>

                        {medicine.stock > 0 && (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                                    <button 
                                        className="px-4 py-2 hover:bg-gray-200/50 font-bold text-gray-600 transition-colors"
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    >
                                        -
                                    </button>
                                    <span className="px-4 font-bold text-sm text-gray-800 w-12 text-center">{quantity}</span>
                                    <button 
                                        className="px-4 py-2 hover:bg-gray-200/50 font-bold text-gray-600 transition-colors"
                                        onClick={() => setQuantity(q => Math.min(medicine.stock, q + 1))}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => addToCart(medicine, quantity)}
                                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl transition-all shadow-md text-sm text-center"
                                >
                                    Add Custom Quantity To Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetails;
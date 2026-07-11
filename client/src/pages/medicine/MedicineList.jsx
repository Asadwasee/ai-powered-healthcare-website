import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

// Helper function to render Tailwind-styled icons based on category for the catalog view
const getCategoryIcon = (category) => {
    const normalCat = category?.trim().toLowerCase();

    switch (normalCat) {
        case 'tablet':
            return (
                <div className="text-teal-600/40 group-hover:text-teal-600/60 group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <circle cx="12" cy="12" r="10" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
            );
        case 'capsule':
            return (
                <div className="text-teal-600/40 group-hover:text-teal-600/60 group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        {/* Mathematically aligned and rotated capsule matching Details page */}
                        <g transform="rotate(-45 12 12)">
                            <rect x="4" y="8" width="16" height="8" rx="4" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                        </g>
                    </svg>
                </div>
            );
        case 'syrup':
            return (
                <div className="text-teal-600/40 group-hover:text-teal-600/60 group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-5 0v3h4V3m-5 3h6v13a3 3 0 01-3 3h-0a3 3 0 01-3-3V6zm2 7h2" />
                    </svg>
                </div>
            );
        case 'injection':
            return (
                <div className="text-teal-600/40 group-hover:text-teal-600/60 group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21l3-3M7 14l4 4M9 12l8-8a2.121 2.121 0 013 3l-8 8M12 9l3 3M19 3l2 2" />
                    </svg>
                </div>
            );
        case 'ointment':
            return (
                <div className="text-teal-600/40 group-hover:text-teal-600/60 group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l-.5 8m.5-8h-15m0 0l.5 8m0 0h14" />
                    </svg>
                </div>
            );
        default:
            return (
                <div className="text-teal-600/40 group-hover:text-teal-600/60 group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 10.5V20a2 2 0 01-2 2H7a2 2 0 01-2-2v-9.5M3 10h18M12 7V3m0 0a1 1 0 100 2 1 1 0 000-2z" />
                    </svg>
                </div>
            );
    }
};

const MedicineList = () => {
    const { addToCart } = useCart();
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Filter Parameters State
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [inStock, setInStock] = useState(false);

    // 1. Naya Notification State Hook
    const [notification, setNotification] = useState(null);

    // Fetch Medicines with applied filter hooks
    const fetchMedicines = async () => {
        setLoading(true);
        setError('');
        try {
            const jsonParams = {};
            if (search.trim()) jsonParams.search = search;
            if (category) jsonParams.category = category;
            if (minPrice) jsonParams.minPrice = minPrice;
            if (maxPrice) jsonParams.maxPrice = maxPrice;
            if (inStock) jsonParams.inStock = inStock;

            const response = await axios.get('http://localhost:5000/api/medicines', { params: jsonParams });
            
            if (response.data.success) {
                setMedicines(response.data.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch inventory');
        } finally {
            setLoading(false);
        }
    };

    // Debounce/Trigger fetch state on dependency mutations
    useEffect(() => {
        fetchMedicines();
    }, [category, inStock]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchMedicines();
    };

    // 2. Add to Cart Handler Function with Toast Feedback
    const handleAddToCartWithFeedback = (med) => {
        addToCart(med, 1); // CartContext function triggered
        
        setNotification(`${med.name} successfully added to cart!`);
        
        // 3 seconds baad popup automatically clear ho jayega
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50/50 min-h-screen">
            
            {/* 3. Professional Floating Toast Notification Layout */}
            {notification && (
                <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-teal-500/20 p-2 rounded-xl text-teal-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold tracking-wide pr-2">{notification}</p>
                </div>
            )}

            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                Pharmacy & <span className="text-teal-600">Medicine Store</span>
            </h1>

            {/* Layout Grid Layout Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Sidebar Control Filter Panel */}
                <aside className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 h-fit space-y-6">
                    <h2 className="text-lg font-bold text-gray-800 border-b pb-3 border-gray-100">Filter Products</h2>
                    
                    {/* Category Dropdown */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Category</label>
                        <select 
                            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-teal-500 bg-gray-50"
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Other'].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Pricing Filter Blocks */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Price Budget (PKR)</label>
                        <div className="flex gap-2">
                            <input 
                                type="number" placeholder="Min" 
                                className="w-1/2 border border-gray-200 rounded-xl p-2 text-sm text-center focus:outline-teal-500 bg-gray-50"
                                value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
                            />
                            <input 
                                type="number" placeholder="Max" 
                                className="w-1/2 border border-gray-200 rounded-xl p-2 text-sm text-center focus:outline-teal-500 bg-gray-50"
                                value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Stock Checkbox Toggle */}
                    <div className="flex items-center gap-3 pt-2">
                        <input 
                            type="checkbox" id="stockCheck" 
                            className="h-4 w-4 rounded-sm border-gray-300 text-teal-600 focus:ring-teal-500"
                            checked={inStock} onChange={(e) => setInStock(e.target.checked)}
                        />
                        <label htmlFor="stockCheck" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                            In Stock Only
                        </label>
                    </div>

                    <button 
                        onClick={fetchMedicines}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm py-2.5 rounded-xl transition-all shadow-sm"
                    >
                        Apply Price Range
                    </button>
                </aside>

                {/* Catalog Display Area */}
                <main className="lg:col-span-3 space-y-6">
                    {/* Functional Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="flex gap-3 bg-white p-2 rounded-2xl shadow-xs border border-gray-100">
                        <input 
                            type="text" 
                            placeholder="Search clinical formula, medicine name, description..."
                            className="flex-1 bg-transparent px-4 py-2 text-sm text-gray-800 focus:outline-none"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit" className="bg-gray-900 hover:bg-black text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors">
                            Search
                        </button>
                    </form>

                    {/* Runtime Status Guards */}
                    {loading ? (
                        <div className="text-center py-24 text-gray-400 font-medium">Loading medical supplies array...</div>
                    ) : error ? (
                        <div className="text-center py-24 text-red-500 bg-red-50 rounded-2xl p-6">{error}</div>
                    ) : medicines.length === 0 ? (
                        <div className="text-center py-24 text-gray-400 bg-white border border-dashed rounded-2xl">
                            No matching pharmaceutical products found matching criteria.
                        </div>
                    ) : (
                        /* Product Dynamic Matrix (Grid) */
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {medicines.map((med) => (
                                <div key={med._id} className="bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group">
                                    
                                    {/* Visual Container with Dynamic Category SVG fallbacks */}
                                    <div className="bg-gradient-to-br from-teal-50/20 to-slate-50/80 h-44 w-full flex items-center justify-center relative border-b border-gray-50">
                                        <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-teal-700 shadow-xs z-10">
                                            {med.category}
                                        </span>
                                        {/* Dynamic category icon display */}
                                        {getCategoryIcon(med.category)}
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-lg group-hover:text-teal-600 transition-colors line-clamp-1">{med.name}</h3>
                                            <p className="text-xs text-gray-400 mb-2 font-medium">By {med.manufacturer}</p>
                                            <p className="text-gray-600 text-sm line-clamp-2">{med.description}</p>
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-1 mb-3">
                                                <span className="text-2xl font-black text-gray-900">Rs. {med.price}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link 
                                                    to={`/medicines/${med._id}`}
                                                    className="flex-1 text-center border border-gray-200 text-gray-700 hover:bg-gray-50 py-2 rounded-xl text-xs font-bold transition-colors"
                                                >
                                                    Details
                                                </Link>
                                                <button
                                                    onClick={() => handleAddToCartWithFeedback(med)}
                                                    disabled={med.stock <= 0}
                                                    className={`flex-1 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-xs ${
                                                        med.stock > 0 
                                                        ? 'bg-teal-600 hover:bg-teal-700 cursor-pointer' 
                                                        : 'bg-gray-300 cursor-not-allowed'
                                                    }`}
                                                >
                                                    {med.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default MedicineList;
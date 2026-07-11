import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        shippingAddress: '',
        paymentMethod: 'COD'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                items: cartItems,
                totalAmount: totalPrice
            };

            const response = await axios.post('/api/orders/place', payload);
            if (response.data.success) {
                alert('Success! Your prescription order is confirmed.');
                clearCart();
                navigate('/home'); 
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Transaction submission error.');
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-32 bg-gray-50/50 min-h-screen flex flex-col items-center justify-center space-y-4">
                <p className="text-gray-400 font-medium text-lg">Your medical cart is empty.</p>
                <button onClick={() => navigate('/medicines')} className="bg-teal-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-teal-700 transition-all">
                    Browse Pharmacy Catalog
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 bg-gray-50/50 min-h-screen">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">Secure <span className="text-teal-600">Checkout</span></h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* 📝 Billing Details Delivery Form */}
                <form onSubmit={handleOrderSubmit} className="lg:col-span-3 bg-white p-8 rounded-3xl border border-gray-100 shadow-xs space-y-6">
                    <h2 className="text-lg font-bold text-gray-800 border-b pb-3 border-gray-100">Shipping & Contact Information</h2>
                    
                    {error && <div className="p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100">{error}</div>}

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                        <input 
                            type="text" name="customerName" required placeholder="Asad Waseem"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-teal-500 bg-gray-50/50"
                            value={formData.customerName} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                        <input 
                            type="tel" name="phone" required placeholder="03xxxxxxxxx"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-teal-500 bg-gray-50/50"
                            value={formData.phone} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Delivery Address</label>
                        <textarea 
                            name="shippingAddress" rows="3" required placeholder="House#, Street#, Area details, Lahore..."
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-teal-500 bg-gray-50/50"
                            value={formData.shippingAddress} onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Payment Method</label>
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === 'COD' ? 'border-teal-500 bg-teal-50/20' : 'border-gray-200 bg-gray-50/50'}`}>
                                <input type="radio" name="paymentMethod" value="COD" checked={formData.paymentMethod === 'COD'} onChange={handleChange} className="text-teal-600 focus:ring-teal-500" />
                                <span className="text-sm font-semibold text-gray-700">Cash on Delivery</span>
                            </label>
                            <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-not-allowed transition-all opacity-60 ${formData.paymentMethod === 'Card' ? 'border-teal-500 bg-teal-50/20' : 'border-gray-200 bg-gray-50/50'}`}>
                                <input type="radio" name="paymentMethod" value="Card" disabled checked={formData.paymentMethod === 'Card'} onChange={handleChange} />
                                <span className="text-sm font-semibold text-gray-400">Card Payment (Soon)</span>
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" disabled={loading}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing Order Pipeline...' : `Confirm & Place Order (Rs. ${totalPrice})`}
                    </button>
                </form>

                {/* 🛒 Live Order Invoice Review Sticky Box */}
                <aside className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs h-fit">
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-3 border-gray-100 mb-4">Order Summary</h2>
                        <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto mb-4 pr-1">
                            {cartItems.map((item) => (
                                <div key={item._id} className="py-3 flex justify-between text-sm">
                                    <div>
                                        <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                                        <p className="text-xs text-gray-400 font-medium">Qty: {item.quantity} × Rs. {item.price}</p>
                                    </div>
                                    <span className="font-black text-gray-700">Rs. {item.price * item.quantity}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-gray-100 pt-4 space-y-2">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Shipping Fee</span>
                                <span className="text-emerald-600 font-bold">FREE</span>
                            </div>
                            <div className="flex justify-between items-baseline pt-2">
                                <span className="text-base font-bold text-gray-800">Total Payable</span>
                                <span className="text-2xl font-black text-teal-600">Rs. {totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
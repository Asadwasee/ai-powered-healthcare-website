import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    items: [
        {
            medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['COD', 'Card'], default: 'COD' },
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Order', orderSchema);
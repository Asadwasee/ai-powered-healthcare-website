import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Medicine name is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Tablet', 'Capsule', 'Syrup', 'Injection', 'Ointment', 'Other']
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    manufacturer: {
        type: String,
        required: [true, 'Manufacturer details are required']
    },
    image: {
        type: String,
        default: 'placeholder-medicine.jpg'
    },
    dosageInstructions: {
        type: String
    },
    requiresPrescription: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default mongoose.model('Medicine', medicineSchema);
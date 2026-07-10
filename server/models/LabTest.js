import mongoose from 'mongoose';

const labTestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Test name is required'],
        trim: true
    },
    category: {
        type: String,
        enum: ['blood', 'urine', 'imaging', 'cardiac', 'hormone', 'allergy', 'other'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    preparationInstructions: {
        type: String,
        default: 'No special preparation required'
    },
    turnaroundTime: {
        type: String,
        default: '24-48 hours'
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export const LabTest = mongoose.model('LabTest', labTestSchema);
import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    relation: {
        type: String,
        required: [true, 'Relation is required'],
        enum: ['spouse', 'parent', 'sibling', 'friend', 'relative', 'other']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    alternatePhone: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    address: {
        type: String,
        trim: true
    },
    isPrimary: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Ensure only one primary contact per user
emergencyContactSchema.pre('save', async function(next) {
    if (this.isPrimary) {
        await this.constructor.updateMany(
            { user: this.user, _id: { $ne: this._id } },
            { isPrimary: false }
        );
    }
    next();
});

export const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);
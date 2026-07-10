import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    summary: {
        type: String,
        required: [true, 'Summary is required'],
        maxlength: 200
    },
    category: {
        type: String,
        enum: ['health', 'wellness', 'nutrition', 'fitness', 'mental-health', 'medical', 'other'],
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    readTime: {
        type: Number,
        default: 5 // minutes
    },
    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export const Blog = mongoose.model('Blog', blogSchema);
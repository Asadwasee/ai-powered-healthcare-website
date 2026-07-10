import { Blog } from '../models/Blog.js';
import { sendResponse, sendError } from '../utils/response.js';

// Create blog
export const createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create({
            ...req.body,
            author: req.user.id
        });
        sendResponse(res, 201, true, 'Blog created successfully', blog);
    } catch (error) {
        next(error);
    }
};

// Get all blogs
export const getBlogs = async (req, res, next) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        const query = { isPublished: true };

        if (category) query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { summary: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        const [blogs, total] = await Promise.all([
            Blog.find(query)
                .populate('author', 'name email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Blog.countDocuments(query)
        ]);

        sendResponse(res, 200, true, 'Blogs fetched successfully', {
            blogs,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get single blog
export const getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
            .populate('author', 'name email');
        
        if (!blog) {
            return sendError(res, 404, 'Blog not found');
        }

        // Increment views
        blog.views += 1;
        await blog.save();

        sendResponse(res, 200, true, 'Blog fetched successfully', blog);
    } catch (error) {
        next(error);
    }
};

// Update blog
export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOneAndUpdate(
            { _id: req.params.id, author: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!blog) {
            return sendError(res, 404, 'Blog not found or not authorized');
        }
        sendResponse(res, 200, true, 'Blog updated successfully', blog);
    } catch (error) {
        next(error);
    }
};

// Delete blog
export const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findOneAndDelete({
            _id: req.params.id,
            author: req.user.id
        });
        if (!blog) {
            return sendError(res, 404, 'Blog not found or not authorized');
        }
        sendResponse(res, 200, true, 'Blog deleted successfully');
    } catch (error) {
        next(error);
    }
};
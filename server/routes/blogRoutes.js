import express from 'express';
import {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} from '../controllers/blogController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/all', getBlogs);
router.get('/all/:id', getBlogById);

// Protected routes
router.use(authenticate);
router.post('/addblog', createBlog);
router.put('/updateblog/:id', updateBlog);
router.delete('/deleteblog/:id', deleteBlog);

export default router;
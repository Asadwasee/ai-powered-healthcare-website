import { sendError } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
    console.error(' Error:', err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return sendError(res, 400, 'Validation Error', messages);
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return sendError(res, 400, `Duplicate value for ${field}`, `${field} already exists`);
    }

    // JWT error
    if (err.name === 'JsonWebTokenError') {
        return sendError(res, 401, 'Invalid token', 'Authentication failed');
    }

    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    sendError(res, statusCode, message, process.env.NODE_ENV === 'development' ? err.stack : null);
};
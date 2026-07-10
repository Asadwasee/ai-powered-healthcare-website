import express from 'express';
import {
    getAvailableTests,
    getTestById,
    createTest,
    updateTest,
    deleteTest,
    bookTest,
    getMyBookings,
    getBookingById,
    cancelBooking,
    updateBookingStatus
} from '../controllers/labController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/tests', getAvailableTests);
router.get('/tests/:id', getTestById);

// Protected routes (all require authentication)
router.use(authenticate);

// Lab Test management (Admin only)
router.post('/tests/admin', authorize('admin'), createTest);
router.put('/tests/admin/:id', authorize('admin'), updateTest);
router.delete('/tests/admin/:id', authorize('admin'), deleteTest);

// Booking routes
router.post('/book', bookTest);
router.get('/bookings', getMyBookings);
router.get('/bookings/:id', getBookingById);
router.put('/bookings/:id/cancel', cancelBooking);
router.put('/bookings/:id/status', authorize('admin', 'lab_technician'), updateBookingStatus);

export default router;
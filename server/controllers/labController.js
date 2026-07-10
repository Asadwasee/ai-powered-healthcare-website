import { LabTest } from '../models/LabTest.js';
import { LabBooking } from '../models/LabBooking.js';
import { sendResponse, sendError } from '../utils/response.js';

// ============ LAB TESTS ============

// @desc    Get all available tests
// @route   GET /api/lab/tests
export const getAvailableTests = async (req, res, next) => {
    try {
        const { category, search } = req.query;
        const query = { isAvailable: true };

        if (category) query.category = category;
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const tests = await LabTest.find(query).sort({ name: 1 });
        sendResponse(res, 200, true, 'Available tests fetched successfully', tests);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single test
// @route   GET /api/lab/tests/:id
export const getTestById = async (req, res, next) => {
    try {
        const test = await LabTest.findById(req.params.id);
        if (!test) {
            return sendError(res, 404, 'Test not found');
        }
        sendResponse(res, 200, true, 'Test fetched successfully', test);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new test (Admin only)
// @route   POST /api/lab/tests
export const createTest = async (req, res, next) => {
    try {
        const { name, category, description, price, preparationInstructions, turnaroundTime } = req.body;

        if (!name || !category || !description || !price) {
            return sendError(res, 400, 'Name, category, description and price are required');
        }

        const test = await LabTest.create({
            name,
            category,
            description,
            price,
            preparationInstructions,
            turnaroundTime,
            createdBy: req.user.id
        });

        sendResponse(res, 201, true, 'Test created successfully', test);
    } catch (error) {
        next(error);
    }
};

// @desc    Update test (Admin only)
// @route   PUT /api/lab/tests/:id
export const updateTest = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Check if test exists
        const existingTest = await LabTest.findById(id);
        if (!existingTest) {
            return sendError(res, 404, 'Test not found');
        }

        //  Validate category if provided
        if (updateData.category) {
            const validCategories = ['blood', 'urine', 'imaging', 'cardiac', 'hormone', 'allergy', 'other'];
            if (!validCategories.includes(updateData.category)) {
                return sendError(res, 400, 'Invalid category. Must be one of: ' + validCategories.join(', '));
            }
        }

        //  Convert price to number if provided
        if (updateData.price) {
            const numericPrice = parseFloat(updateData.price);
            if (isNaN(numericPrice) || numericPrice < 0) {
                return sendError(res, 400, 'Price must be a valid positive number');
            }
            updateData.price = numericPrice;
        }

        //  Update the test
        const updatedTest = await LabTest.findByIdAndUpdate(
            id,
            updateData,
            { 
                new: true,        // Return the updated document
                runValidators: true // Run schema validators
            }
        );

        sendResponse(res, 200, true, 'Test updated successfully', updatedTest);

    } catch (error) {
        console.error('Update Test Error:', error);
        next(error);
    }
};

// @desc    Delete test (Admin only)
// @route   DELETE /api/lab/tests/:id
export const deleteTest = async (req, res, next) => {
    try {
        const test = await LabTest.findByIdAndDelete(req.params.id);
        if (!test) {
            return sendError(res, 404, 'Test not found');
        }
        sendResponse(res, 200, true, 'Test deleted successfully');
    } catch (error) {
        next(error);
    }
};

// ============ LAB BOOKINGS ============

// @desc    Book a test
// @route   POST /api/lab/book
export const bookTest = async (req, res, next) => {
    try {
        const { testId, bookingDate, bookingTime, notes } = req.body;

        if (!testId || !bookingDate || !bookingTime) {
            return sendError(res, 400, 'Test ID, booking date and time are required');
        }

        const test = await LabTest.findById(testId);
        if (!test) {
            return sendError(res, 404, 'Test not found');
        }

        const booking = await LabBooking.create({
            user: req.user.id,
            test: testId,
            bookingDate,
            bookingTime,
            notes
        });

        // Populate test details
        await booking.populate('test', 'name price category');

        sendResponse(res, 201, true, 'Test booked successfully', booking);
    } catch (error) {
        next(error);
    }
};

// @desc    Get user's bookings
// @route   GET /api/lab/bookings
export const getMyBookings = async (req, res, next) => {
    try {
        const { status } = req.query;
        const query = { user: req.user.id };

        if (status) query.status = status;

        const bookings = await LabBooking.find(query)
            .populate('test', 'name price category description')
            .sort({ createdAt: -1 });

        sendResponse(res, 200, true, 'Bookings fetched successfully', bookings);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single booking
// @route   GET /api/lab/bookings/:id
export const getBookingById = async (req, res, next) => {
    try {
        const booking = await LabBooking.findOne({
            _id: req.params.id,
            user: req.user.id
        }).populate('test', 'name price category description');

        if (!booking) {
            return sendError(res, 404, 'Booking not found');
        }

        sendResponse(res, 200, true, 'Booking fetched successfully', booking);
    } catch (error) {
        next(error);
    }
};

// @desc    Cancel booking
// @route   PUT /api/lab/bookings/:id/cancel
export const cancelBooking = async (req, res, next) => {
    try {
        const booking = await LabBooking.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!booking) {
            return sendError(res, 404, 'Booking not found');
        }

        if (booking.status === 'completed') {
            return sendError(res, 400, 'Cannot cancel completed booking');
        }

        booking.status = 'cancelled';
        await booking.save();

        sendResponse(res, 200, true, 'Booking cancelled successfully', booking);
    } catch (error) {
        next(error);
    }
};

// @desc    Update booking status (Admin/Lab Technician)
// @route   PUT /api/lab/bookings/:id/status
export const updateBookingStatus = async (req, res, next) => {
    try {
        const { status, result } = req.body;
        const booking = await LabBooking.findById(req.params.id);

        if (!booking) {
            return sendError(res, 404, 'Booking not found');
        }

        booking.status = status;
        if (result) booking.result = result;
        await booking.save();

        sendResponse(res, 200, true, 'Booking status updated successfully', booking);
    } catch (error) {
        next(error);
    }
};
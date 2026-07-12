import api from './api'; // Central axios instance import ho rha hai

// ============ LAB TESTS (PUBLIC ROUTES) ============

/**
 * Get all available lab tests with optional filters (category, search)
 * @param {Object} params - { category, search }
 */
export const fetchAvailableTests = async (params = {}) => {
  try {
    const { data } = await api.get('/lab/tests', { params });
    return data; // Backend sendResponse utility use kar raha hai
  } catch (error) {
    console.error("Error fetching available tests:", error);
    throw error;
  }
};

/**
 * Get details of a single lab test by its MongoDB ObjectId
 * @param {string} id - Lab Test ID
 */
export const fetchTestById = async (id) => {
  try {
    const { data } = await api.get(`/lab/tests/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching test details for ID ${id}:`, error);
    throw error;
  }
};


// ============ LAB BOOKINGS (PROTECTED ROUTES) ============

/**
 * Book a new lab test
 * @param {Object} payload - { testId, bookingDate, bookingTime, notes }
 */
export const bookLabTest = async (payload) => {
  try {
    const { data } = await api.post('/lab/book', payload);
    return data;
  } catch (error) {
    console.error("Error booking lab test:", error);
    throw error;
  }
};

/**
 * Get logged-in user's bookings with optional status filter
 * @param {Object} params - { status } ('pending', 'confirmed', 'completed', 'cancelled')
 */
export const fetchMyLabBookings = async (params = {}) => {
  try {
    const { data } = await api.get('/lab/bookings', { params });
    return data;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    throw error;
  }
};

/**
 * Get single booking details by ID
 * @param {string} id - Booking ID
 */
export const fetchLabBookingById = async (id) => {
  try {
    const { data } = await api.get(`/lab/bookings/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching booking details for ID ${id}:`, error);
    throw error;
  }
};

/**
 * Cancel an existing booking (Only if status is not completed)
 * @param {string} id - Booking ID
 */
export const cancelLabBooking = async (id) => {
  try {
    const { data } = await api.put(`/lab/bookings/${id}/cancel`);
    return data;
  } catch (error) {
    console.error(`Error cancelling booking ID ${id}:`, error);
    throw error;
  }
};


// ============ ADMIN & TECHNICIAN OPERATIONS ============

/**
 * Create a new lab test (Admin Only)
 * @param {Object} testData - Complete test schema details
 */
export const createLabTest = async (testData) => {
  try {
    const { data } = await api.post('/lab/tests/admin', testData);
    return data;
  } catch (error) {
    console.error("Admin: Error creating test:", error);
    throw error;
  }
};

/**
 * Update booking status or add results (Admin/Lab Technician Only)
 * @param {string} id - Booking ID
 * @param {Object} statusData - { status, result }
 */
export const updateLabBookingStatus = async (id, statusData) => {
  try {
    const { data } = await api.put(`/lab/bookings/${id}/status`, statusData);
    return data;
  } catch (error) {
    console.error(`Admin/Tech: Error updating status for booking ID ${id}:`, error);
    throw error;
  }
};
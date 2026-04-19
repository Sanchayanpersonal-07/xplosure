const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { bookingValidation } = require('../middleware/validation');
const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} = require('../controllers/bookingController');

router.use(authMiddleware);

// @route   POST /api/bookings
router.post('/', bookingValidation, createBooking);

// @route   GET /api/bookings/my-bookings
// NOTE: /my-bookings must come BEFORE /:id to avoid route conflict
router.get('/my-bookings', getMyBookings);

// @route   GET /api/bookings/:id
router.get('/:id', getBookingById);

// @route   PATCH /api/bookings/:id/cancel
router.patch('/:id/cancel', cancelBooking);

module.exports = router;

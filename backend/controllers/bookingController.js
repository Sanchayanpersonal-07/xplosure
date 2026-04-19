const Booking = require('../models/Booking');
const logger = require('../utils/logger');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res, next) => {
  try {
    const { service, date, time, notes } = req.body;

    // ✅ Check for duplicate booking (same user, date, time)
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      date: new Date(date),
      time,
      status: { $ne: 'Cancelled' },
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: 'You already have a booking at this date and time',
      });
    }

    const booking = new Booking({
      user: req.user.id,
      service,
      date: new Date(date),
      time,
      notes,
      status: 'Pending',
    });

    await booking.save();

    logger.info(`New booking created by user ${req.user.id} for ${service} on ${date}`);

    res.status(201).json({ success: true, booking });
  } catch (err) {
    // Handle MongoDB duplicate key error from unique index
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You already have a booking at this date and time',
      });
    }
    next(err);
  }
};

// @desc    Get current user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort({ date: 1, time: 1 })
      .lean();

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking',
      });
    }

    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

// @desc    Cancel a booking
// @route   PATCH /api/bookings/:id/cancel
// @access  Private
exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check ownership
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Check if already cancelled
    if (booking.status === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    // ✅ FIX: Using Date object comparison (date is now a Date type)
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      return res.status(400).json({ success: false, message: 'Cannot cancel past bookings' });
    }

    booking.status = 'Cancelled';
    await booking.save();

    logger.info(`Booking ${booking._id} cancelled by user ${req.user.id}`);

    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

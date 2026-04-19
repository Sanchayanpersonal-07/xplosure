const User = require('../models/User');
const Booking = require('../models/Booking');
const EmailLog = require('../models/EmailLog');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
exports.getStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      usersWithResume,
      emailsSent,
    ] = await Promise.all([
      User.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'Pending' }),
      Booking.countDocuments({ status: 'Confirmed' }),
      User.countDocuments({ resumePath: { $ne: '' } }),
      EmailLog.countDocuments({ status: 'sent' }),
    ]);

    // Bookings by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const [bookingsByMonth, recentUsers, recentBookings] = await Promise.all([
      Booking.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      User.find().sort('-createdAt').limit(5).select('name email atsScore createdAt resumePath'),
      Booking.find().sort('-createdAt').limit(5).populate('user', 'name email'),
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        usersWithResume,
        emailsSent,
        bookingsByMonth,
      },
      recentUsers,
      recentBookings,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all users (paginated)
// @route   GET /api/admin/users
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100); // max 100
    const skip = (page - 1) * limit;
    const search = req.query.search || '';

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      User.find(query).select('-password').sort('-createdAt').skip(skip).limit(limit),
      User.countDocuments(query),
    ]);

    res.json({
      success: true,
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single user details
// @route   GET /api/admin/users/:id
exports.getUserById = async (req, res, next) => {
  try {
    const [user, bookings] = await Promise.all([
      User.findById(req.params.id).select('-password'),
      Booking.find({ user: req.params.id }).sort('-date'),
    ]);

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user, bookings });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user (admin)
// @route   PUT /api/admin/users/:id
exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    // ✅ FIX: Prevent admin from changing their own role
    if (req.params.id === req.user.id && role && role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: 'You cannot change your own admin role',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all bookings with pagination (admin)
// @route   GET /api/admin/bookings
exports.getAllBookings = async (req, res, next) => {
  try {
    // ✅ FIX: Added pagination — was returning all bookings before
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const skip = (page - 1) * limit;
    const status = req.query.status || '';

    const query = status ? { status } : {};

    const [bookings, total] = await Promise.all([
      Booking.find(query)
        .populate('user', 'name email')
        .sort('-date')
        .skip(skip)
        .limit(limit),
      Booking.countDocuments(query),
    ]);

    res.json({
      success: true,
      bookings,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update booking status
// @route   PATCH /api/admin/bookings/:id
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const validStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email');

    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    res.json({ success: true, booking });
  } catch (err) {
    next(err);
  }
};

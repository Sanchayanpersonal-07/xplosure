const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const {
  getStats,
  getAllUsers,
  getUserById,
  updateUser,
  getAllBookings,
  updateBookingStatus,
} = require('../controllers/adminController');

// All routes protected by auth + admin middleware
router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id', updateBookingStatus);

module.exports = router;

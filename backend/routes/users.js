const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');
const { changePasswordValidation } = require('../middleware/validation');
const {
  uploadResume,
  getProfile,
  updateProfile,
  changePassword,
} = require('../controllers/userController');

// @route   POST /api/users/upload-resume
// @access  Private
router.post('/upload-resume', authMiddleware, upload.single('resume'), uploadResume);

// @route   GET /api/users/profile
// @access  Private
router.get('/profile', authMiddleware, getProfile);

// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', authMiddleware, updateProfile);

// @route   PUT /api/users/change-password
// @access  Private
router.put('/change-password', authMiddleware, changePasswordValidation, changePassword);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const {
  signupValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} = require('../middleware/validation');

// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', signupValidation, signup);

// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginValidation, login);

// @route   GET /api/auth/user
// @access  Private
router.get('/user', authMiddleware, getUser);

// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);

// @route   POST /api/auth/reset-password
// @access  Public
router.post('/reset-password', resetPasswordValidation, resetPassword);

module.exports = router;

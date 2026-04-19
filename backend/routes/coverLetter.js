const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { generateCoverLetter } = require('../controllers/coverLetterController');

// @route   POST /api/cover-letter/generate
// @access  Private
router.post('/generate', authMiddleware, generateCoverLetter);

module.exports = router;

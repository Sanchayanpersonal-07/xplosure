const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { parseResumePDF } = require('../utils/resumeAnalyzer');
const emailService = require('../services/emailService');
const logger = require('../utils/logger');
const fs = require('fs').promises;
const path = require('path');

// @desc    Upload and analyze resume
// @route   POST /api/users/upload-resume
// @access  Private
exports.uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      await fs.unlink(req.file.path).catch(() => {});
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Delete old resume if exists
    if (user.resumePath) {
      const oldFilePath = path.join(__dirname, '..', user.resumePath);
      await fs.unlink(oldFilePath).catch(() => {});
    }

    user.resumePath = `uploads/${req.file.filename}`;

    // ✅ FIX: Declare analysis outside try block so it's accessible after
    let analysis = null;

    if (req.file.mimetype === 'application/pdf') {
      try {
        analysis = await parseResumePDF(req.file.path);
        user.atsScore = analysis.atsScore;
        user.recommendedCounseling = analysis.recommendations;
        user.resumeFeedback = analysis.feedback;
        user.matchedRoles = analysis.matchedRoles;
        user.skillGap = analysis.skillGap;
      } catch (parseError) {
        logger.error(`PDF parsing error: ${parseError.message}`);
        user.atsScore = 0;
        user.recommendedCounseling = ['Resume & Interview Prep'];
        user.resumeFeedback = ['Could not extract text. Please upload a text-based PDF.'];
        user.matchedRoles = [];
        user.skillGap = { role: '', missingSkills: [], courses: [] };
      }
    }

    await user.save();

    // ✅ FIX: Only send email if analysis was successful
    if (analysis) {
      emailService.sendResumeAnalyzedEmail(user, analysis).catch((err) =>
        logger.error(`Resume analyzed email failed for ${user.email}: ${err.message}`)
      );
    }

    const updatedUser = await User.findById(req.user.id).select('-password');
    logger.info(`Resume uploaded and analyzed for ${user.email}`);

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    if (req.file) await fs.unlink(req.file.path).catch(() => {});
    next(err);
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name } = req.body;
    const updates = {};

    if (name) {
      updates.name = name.trim();
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    logger.info(`User profile updated: ${user.email}`);
    res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password field
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    // Prevent reusing same password
    const isSame = await bcrypt.compare(newPassword, user.password);
    if (isSame) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password',
      });
    }

    // Hash and save new password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    logger.info(`Password changed for: ${user.email}`);
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};

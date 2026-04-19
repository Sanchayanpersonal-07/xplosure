const User = require('../models/User');
const { generateForUser } = require('../utils/coverLetterGenerator');

// @desc    Generate cover letter
// @route   POST /api/cover-letter/generate
// @access  Private
exports.generateCoverLetter = async (req, res, next) => {
  try {
    const { jobTitle, companyName } = req.body;

    if (!jobTitle || !companyName) {
      return res.status(400).json({
        success: false,
        message: 'Job title and company name are required',
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (!user.resumePath) {
      return res.status(400).json({
        success: false,
        message: 'Please upload your resume first to generate a personalized cover letter',
      });
    }

    const coverLetter = await generateForUser(user, jobTitle, companyName);

    res.json({ success: true, coverLetter });
  } catch (err) {
    next(err);
  }
};

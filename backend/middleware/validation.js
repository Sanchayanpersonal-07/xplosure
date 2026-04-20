const { body, validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = errors
      .array()
      .map((err) => ({ field: err.path, message: err.msg }));
    return res.status(400).json({ success: false, errors: extractedErrors });
  };
};

// ✅ FIX: Centralized services list — must match frontend SERVICES constant
// Backend validates against this list so arbitrary strings can't be submitted
const VALID_SERVICES = [
  "Career Counselling",
  "Resume Review",
  "Interview Preparation",
  "LinkedIn Optimization",
  "Final Year Project Guidance",
  "Placement Drive Arrangements",
  "Skill Development Coaching",
  "Programming Skills Coaching",
  "Resume & Interview Prep",
];

// Export so frontend constants file can stay in sync if needed
exports.VALID_SERVICES = VALID_SERVICES;

// Signup validation
exports.signupValidation = validate([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    // ✅ Unicode support — allows Bengali, Arabic, and other scripts
    .matches(/^[\p{L}\p{M}\s]+$/u)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
]);

// Login validation
exports.loginValidation = validate([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
]);

// Booking validation
exports.bookingValidation = validate([
  // ✅ FIX: Validate service against allowed list — prevents arbitrary strings
  body("service")
    .trim()
    .notEmpty()
    .withMessage("Service is required")
    .isIn(VALID_SERVICES)
    .withMessage("Invalid service selected"),

  body("date")
    .notEmpty()
    .withMessage("Date is required")
    .isISO8601()
    .withMessage("Invalid date format")
    .custom((value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        throw new Error("Date must be today or in the future");
      }
      return true;
    }),

  body("time")
    .notEmpty()
    .withMessage("Time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("Time must be in HH:MM 24-hour format"),
]);

// Change password validation
exports.changePasswordValidation = validate([
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
]);

// Forgot password validation
exports.forgotPasswordValidation = validate([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
]);

// Reset password validation
exports.resetPasswordValidation = validate([
  body("token").notEmpty().withMessage("Reset token is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),
]);

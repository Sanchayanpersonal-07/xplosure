const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Never returned by default — must use .select('+password')
    },
    resumePath: {
      type: String,
      default: "",
    },
    atsScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    recommendedCounseling: {
      type: [String],
      default: [],
    },
    resumeFeedback: {
      type: [String],
      default: [],
    },
    matchedRoles: [
      {
        role: String,
        matchPercentage: Number,
        roadmap: [String],
      },
    ],
    // ✅ NEW: Actual skills detected in resume (used by coverLetterGenerator)
    // Populated by resumeAnalyzer.analyzeResumeText()
    foundSkills: {
      type: [String],
      default: [],
    },
    skillGap: {
      role: String,
      missingSkills: [String],
      courses: [
        {
          skill: String,
          courses: [
            {
              title: String,
              url: String,
            },
          ],
        },
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Password reset fields
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
);

UserSchema.index({ createdAt: -1 });

module.exports = mongoose.model("User", UserSchema);

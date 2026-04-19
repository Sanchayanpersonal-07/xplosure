const mongoose = require('mongoose');

const EmailLogSchema = new mongoose.Schema(
  {
    recipient: { type: String, required: true },
    subject: { type: String, required: true },
    type: {
      type: String,
      enum: ['welcome', 'resume_analyzed', 'session_reminder', 'session_followup', 'password_reset', 'general'],
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
    messageId: String,
    error: String,
  },
  { timestamps: true }
);

// Index for duplicate-send prevention check
EmailLogSchema.index({ userId: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model('EmailLog', EmailLogSchema);

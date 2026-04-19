const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true,
      maxlength: [100, 'Service name too long'],
    },
    // ✅ FIX: Changed from String to Date for proper sorting and comparison
    date: {
      type: Date,
      required: [true, 'Date is required'],
    },
    time: {
      type: String,
      required: [true, 'Time is required'],
      match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
    },
    notes: {
      type: String,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
      trim: true,
    },
  },
  { timestamps: true }
);

// ✅ FIX: Prevent double-booking — same user, same date & time
BookingSchema.index({ user: 1, date: 1, time: 1 }, { unique: true });
BookingSchema.index({ status: 1 });
BookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', BookingSchema);

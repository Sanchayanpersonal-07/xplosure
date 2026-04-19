const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Plan name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    // ✅ NEW: Currency support
    currency: {
      type: String,
      default: 'BDT',
      enum: ['BDT', 'USD', 'INR'],
    },
    // ✅ NEW: Session duration
    duration: {
      type: String,
      default: '1 hour',
    },
    features: {
      type: [String],
      default: [],
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    // ✅ NEW: Hide/show plan without deleting
    isActive: {
      type: Boolean,
      default: true,
    },
    // ✅ NEW: Control display order on frontend
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

PricingSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('Pricing', PricingSchema);

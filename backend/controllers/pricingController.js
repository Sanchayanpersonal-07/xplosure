const Pricing = require('../models/Pricing');

// @desc    Get all active pricing plans
// @route   GET /api/pricing
// @access  Public
exports.getPricingPlans = async (req, res, next) => {
  try {
    const plans = await Pricing.find({ isActive: true }).sort('order');
    res.json({ success: true, count: plans.length, plans });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all pricing plans (including inactive for admin)
// @route   GET /api/pricing/admin
// @access  Private/Admin
exports.getAllPricingPlans = async (req, res, next) => {
  try {
    const plans = await Pricing.find().sort('order');
    res.json({ success: true, count: plans.length, plans });
  } catch (err) {
    next(err);
  }
};

// @desc    Create a pricing plan
// @route   POST /api/pricing
// @access  Private/Admin
exports.createPricingPlan = async (req, res, next) => {
  try {
    const plan = await Pricing.create(req.body);
    res.status(201).json({ success: true, plan });
  } catch (err) {
    next(err);
  }
};

// @desc    Update a pricing plan
// @route   PUT /api/pricing/:id
// @access  Private/Admin
exports.updatePricingPlan = async (req, res, next) => {
  try {
    const plan = await Pricing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Pricing plan not found' });
    }

    res.json({ success: true, plan });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete/Deactivate a pricing plan
// @route   DELETE /api/pricing/:id
// @access  Private/Admin
exports.deletePricingPlan = async (req, res, next) => {
  try {
    // Soft delete kore isActive false kore dewa bhalo, nahole old bookings e problem hote pare
    const plan = await Pricing.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Pricing plan not found' });
    }

    res.json({ success: true, message: 'Plan deactivated successfully' });
  } catch (err) {
    next(err);
  }
};
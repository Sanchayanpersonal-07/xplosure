const express = require('express');
const router = express.Router();
const {
  getPricingPlans,
  getAllPricingPlans,
  createPricingPlan,
  updatePricingPlan,
  deletePricingPlan
} = require('../controllers/pricingController');

const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Public route
router.get('/', getPricingPlans);

// Admin routes
router.use(authMiddleware, adminMiddleware);
router.get('/admin', getAllPricingPlans);
router.post('/', createPricingPlan);
router.put('/:id', updatePricingPlan);
router.delete('/:id', deletePricingPlan);

module.exports = router;
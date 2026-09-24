import express from 'express';
import { createTenancy, getTenancies, getTenancyById, updateTenancy } from '../controllers/tenancyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('landlord', 'admin'), createTenancy)
  .get(protect, getTenancies);

router
  .route('/:id')
  .get(protect, getTenancyById)
  .put(protect, authorize('landlord', 'admin'), updateTenancy);

export default router;

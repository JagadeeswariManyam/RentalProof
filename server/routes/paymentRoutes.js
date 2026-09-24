import express from 'express';
import { createPayment, getPayments, updatePayment } from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .post(protect, createPayment)
  .get(protect, getPayments);

router.put('/:id', protect, authorize('landlord', 'admin'), updatePayment);

export default router;

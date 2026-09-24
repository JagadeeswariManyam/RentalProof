import express from 'express';
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getPropertyTimeline,
} from '../controllers/propertyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('landlord', 'admin'), createProperty)
  .get(protect, getProperties);

router.get('/:id/timeline', protect, getPropertyTimeline);

router
  .route('/:id')
  .get(protect, getPropertyById)
  .put(protect, authorize('landlord', 'admin'), updateProperty)
  .delete(protect, authorize('landlord', 'admin'), deleteProperty);

export default router;

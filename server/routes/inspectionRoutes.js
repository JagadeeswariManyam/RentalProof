import express from 'express';
import {
  createInspection,
  getInspections,
  getInspectionById,
  updateInspectionItem,
  completeInspection,
  acknowledgeInspection,
} from '../controllers/inspectionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createInspection).get(protect, getInspections);

router.route('/:id').get(protect, getInspectionById);

router.put('/:id/items/:itemId', protect, updateInspectionItem);
router.put('/:id/complete', protect, completeInspection);
router.put('/:id/acknowledge', protect, acknowledgeInspection);

export default router;

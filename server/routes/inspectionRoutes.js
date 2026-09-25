import express from 'express';
import {
  createInspection,
  getInspections,
  getInspectionById,
  updateInspectionItem,
  completeInspection,
  acknowledgeInspection,
  confirmInspection,
  addAnnotation,
  deleteAnnotation,
  addEvidenceMetadata,
} from '../controllers/inspectionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createInspection).get(protect, getInspections);

router.route('/:id').get(protect, getInspectionById);

router.put('/:id/items/:itemId', protect, updateInspectionItem);
router.put('/:id/complete', protect, completeInspection);
router.put('/:id/acknowledge', protect, acknowledgeInspection);
router.put('/:id/confirm', protect, confirmInspection);

router.post('/:id/items/:itemId/annotations', protect, addAnnotation);
router.delete('/:id/items/:itemId/annotations/:annotationId', protect, deleteAnnotation);
router.post('/:id/items/:itemId/metadata', protect, addEvidenceMetadata);

export default router;

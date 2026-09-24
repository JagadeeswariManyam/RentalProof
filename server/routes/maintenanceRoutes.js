import express from 'express';
import {
  createMaintenance,
  getMaintenanceRequests,
  getMaintenanceById,
  assignServiceProvider,
  updateMaintenanceStatus,
  completeMaintenance,
} from '../controllers/maintenanceController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createMaintenance).get(protect, getMaintenanceRequests);

router.route('/:id').get(protect, getMaintenanceById);

router.put('/:id/assign', protect, authorize('landlord', 'admin'), assignServiceProvider);
router.put('/:id/status', protect, updateMaintenanceStatus);
router.put('/:id/complete', protect, completeMaintenance);

export default router;

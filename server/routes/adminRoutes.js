import express from 'express';
import { getPlatformStats, getAllUsers, toggleUserStatus } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/stats', getPlatformStats);
router.get('/users', getAllUsers);
router.put('/users/:id/toggle-status', toggleUserStatus);

export default router;

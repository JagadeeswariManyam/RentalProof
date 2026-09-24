import express from 'express';
import {
  createInvitation,
  getInvitations,
  acceptInvitation,
  rejectInvitation,
} from '../controllers/invitationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('landlord', 'admin'), createInvitation)
  .get(protect, getInvitations);

router.put('/:id/accept', protect, acceptInvitation);
router.put('/:id/reject', protect, rejectInvitation);

export default router;

import express from 'express';
import { getDepositByTenancy, addDepositDeduction, getAllDeposits } from '../controllers/depositController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAllDeposits);
router.get('/tenancy/:tenancyId', protect, getDepositByTenancy);
router.post('/tenancy/:tenancyId/deductions', protect, authorize('landlord', 'admin'), addDepositDeduction);

export default router;

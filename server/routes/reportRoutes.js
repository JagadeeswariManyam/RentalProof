import express from 'express';
import { generateReport, getReports, getReportById } from '../controllers/reportController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, generateReport).get(protect, getReports);
router.get('/:id', protect, getReportById);

export default router;

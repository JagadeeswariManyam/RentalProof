import express from 'express';
import { getComparisonData, runAiAnalysis } from '../controllers/comparisonController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/:moveOutInspectionId', protect, getComparisonData);
router.post('/analyze', protect, runAiAnalysis);

export default router;

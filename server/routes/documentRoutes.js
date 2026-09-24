import express from 'express';
import { createDocument, getDocuments, deleteDocument } from '../controllers/documentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, createDocument).get(protect, getDocuments);
router.delete('/:id', protect, deleteDocument);

export default router;

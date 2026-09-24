import Document from '../models/Document.js';
import Property from '../models/Property.js';
import { logAudit } from '../services/auditService.js';

// @desc    Upload / Register new document
// @route   POST /api/documents
// @access  Private
export const createDocument = async (req, res, next) => {
  try {
    const { name, category, fileUrl, fileType, fileSize, propertyId, tenancyId } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const document = await Document.create({
      name,
      category: category || 'Other',
      fileUrl,
      fileType: fileType || 'application/pdf',
      fileSize: fileSize || 0,
      uploadedBy: req.user._id,
      property: propertyId,
      tenancy: tenancyId || undefined,
    });

    await logAudit({
      user: req.user._id,
      action: 'Document Uploaded',
      entity: 'Document',
      entityId: document._id,
      description: `Uploaded "${name}" under category ${category}`,
      req,
    });

    res.status(201).json({ success: true, document });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all documents
// @route   GET /api/documents
// @access  Private
export const getDocuments = async (req, res, next) => {
  try {
    const { propertyId, tenancyId, category, search } = req.query;
    let query = {};

    if (propertyId) query.property = propertyId;
    if (tenancyId) query.tenancy = tenancyId;
    if (category && category !== 'all') query.category = category;
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const documents = await Document.find(query)
      .populate('property', 'title address city')
      .populate('uploadedBy', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: documents.length, documents });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete document
// @route   DELETE /api/documents/:id
// @access  Private
export const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    await Document.findByIdAndDelete(req.params.id);

    await logAudit({
      user: req.user._id,
      action: 'Document Deleted',
      entity: 'Document',
      entityId: document._id,
      description: `Removed document "${document.name}"`,
      req,
    });

    res.status(200).json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    next(error);
  }
};

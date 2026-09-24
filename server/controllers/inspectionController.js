import Inspection from '../models/Inspection.js';
import Property from '../models/Property.js';
import Tenancy from '../models/Tenancy.js';
import { logAudit } from '../services/auditService.js';
import { createNotification } from '../services/notificationService.js';
import { analyzeEvidencePair } from '../services/aiComparisonService.js';

// @desc    Create inspection (Move-In or Move-Out)
// @route   POST /api/inspections
// @access  Private (Landlord / Tenant / Admin)
export const createInspection = async (req, res, next) => {
  try {
    const { propertyId, tenancyId, type, inspectionDate, referenceMoveInInspectionId, customItems } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    let items = [];

    if (customItems && customItems.length > 0) {
      items = customItems;
    } else if (type === 'Move-Out' && referenceMoveInInspectionId) {
      // Pre-fill items referencing the Move-In baseline
      const moveInInspection = await Inspection.findById(referenceMoveInInspectionId);
      if (moveInInspection) {
        items = moveInInspection.items.map((item) => ({
          category: item.category,
          item: item.item,
          condition: item.condition, // defaults to previous condition until reviewed
          notes: '',
          photos: [],
          referenceMoveInItemId: item._id,
          attentionLevel: 'No Significant Change',
        }));
      }
    } else {
      // Populate items from property's standard checklist
      property.checklist.forEach((cat) => {
        cat.items.forEach((itemName) => {
          items.push({
            category: cat.category,
            item: itemName,
            condition: 'Good',
            notes: '',
            photos: [],
            attentionLevel: 'No Significant Change',
          });
        });
      });
    }

    const inspection = await Inspection.create({
      property: propertyId,
      tenancy: tenancyId || undefined,
      type,
      inspector: req.user._id,
      inspectionDate: inspectionDate || new Date(),
      status: 'In Progress',
      referenceMoveInInspection: referenceMoveInInspectionId || undefined,
      items,
    });

    await logAudit({
      user: req.user._id,
      action: `${type} Inspection Started`,
      entity: 'Inspection',
      entityId: inspection._id,
      description: `Initiated ${type} inspection for "${property.title}"`,
      req,
    });

    res.status(201).json({ success: true, inspection });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all inspections
// @route   GET /api/inspections
// @access  Private
export const getInspections = async (req, res, next) => {
  try {
    const { propertyId, tenancyId, type, status } = req.query;
    let query = {};

    if (propertyId) query.property = propertyId;
    if (tenancyId) query.tenancy = tenancyId;
    if (type) query.type = type;
    if (status) query.status = status;

    // Filter by role if not admin
    if (req.user.role === 'landlord') {
      const landlordProperties = await Property.find({ landlord: req.user._id }).select('_id');
      query.property = { $in: landlordProperties.map((p) => p._id) };
    } else if (req.user.role === 'tenant') {
      const tenantTenancies = await Tenancy.find({ tenant: req.user._id }).select('_id');
      query.tenancy = { $in: tenantTenancies.map((t) => t._id) };
    }

    const inspections = await Inspection.find(query)
      .populate('property', 'title address city propertyType images')
      .populate('tenancy')
      .populate('inspector', 'name email role')
      .sort({ inspectionDate: -1, createdAt: -1 });

    res.status(200).json({ success: true, count: inspections.length, inspections });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single inspection by ID
// @route   GET /api/inspections/:id
// @access  Private
export const getInspectionById = async (req, res, next) => {
  try {
    const inspection = await Inspection.findById(req.params.id)
      .populate('property')
      .populate({
        path: 'tenancy',
        populate: [
          { path: 'tenant', select: 'name email phone avatar' },
          { path: 'landlord', select: 'name email phone avatar' },
        ],
      })
      .populate('inspector', 'name email role')
      .populate('referenceMoveInInspection');

    if (!inspection) {
      return res.status(404).json({ success: false, message: 'Inspection not found' });
    }

    res.status(200).json({ success: true, inspection });
  } catch (error) {
    next(error);
  }
};

// @desc    Update single item in inspection
// @route   PUT /api/inspections/:id/items/:itemId
// @access  Private
export const updateInspectionItem = async (req, res, next) => {
  try {
    const { condition, notes, photos, attentionLevel } = req.body;
    const inspection = await Inspection.findById(req.params.id);

    if (!inspection) {
      return res.status(404).json({ success: false, message: 'Inspection not found' });
    }

    const item = inspection.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Inspection item not found' });
    }

    if (condition) item.condition = condition;
    if (notes !== undefined) item.notes = notes;
    if (photos) item.photos = photos;
    if (attentionLevel) item.attentionLevel = attentionLevel;

    await inspection.save();

    res.status(200).json({ success: true, inspection, item });
  } catch (error) {
    next(error);
  }
};

// @desc    Complete inspection
// @route   PUT /api/inspections/:id/complete
// @access  Private
export const completeInspection = async (req, res, next) => {
  try {
    const inspection = await Inspection.findById(req.params.id).populate('property');
    if (!inspection) {
      return res.status(404).json({ success: false, message: 'Inspection not found' });
    }

    inspection.status = 'Completed';
    if (req.body.overallNotes) {
      inspection.overallNotes = req.body.overallNotes;
    }
    await inspection.save();

    await logAudit({
      user: req.user._id,
      action: `${inspection.type} Inspection Finalized`,
      entity: 'Inspection',
      entityId: inspection._id,
      description: `Completed ${inspection.type} inspection with ${inspection.items.length} items logged`,
      req,
    });

    res.status(200).json({ success: true, message: 'Inspection marked as completed', inspection });
  } catch (error) {
    next(error);
  }
};

// @desc    Tenant acknowledges inspection
// @route   PUT /api/inspections/:id/acknowledge
// @access  Private (Tenant)
export const acknowledgeInspection = async (req, res, next) => {
  try {
    const { tenantNotes } = req.body;
    const inspection = await Inspection.findById(req.params.id);

    if (!inspection) {
      return res.status(404).json({ success: false, message: 'Inspection not found' });
    }

    inspection.tenantAcknowledged = true;
    inspection.tenantSignedAt = new Date();
    if (tenantNotes) inspection.tenantNotes = tenantNotes;

    await inspection.save();

    await logAudit({
      user: req.user._id,
      action: 'Inspection Acknowledged',
      entity: 'Inspection',
      entityId: inspection._id,
      description: `Tenant ${req.user.name} acknowledged condition record`,
      req,
    });

    res.status(200).json({ success: true, message: 'Inspection acknowledged successfully', inspection });
  } catch (error) {
    next(error);
  }
};

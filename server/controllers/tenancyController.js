import Tenancy from '../models/Tenancy.js';
import Property from '../models/Property.js';
import Deposit from '../models/Deposit.js';
import { logAudit } from '../services/auditService.js';
import { createNotification } from '../services/notificationService.js';

// @desc    Create new tenancy
// @route   POST /api/tenancies
// @access  Private (Landlord / Admin)
export const createTenancy = async (req, res, next) => {
  try {
    const { property, tenant, startDate, expectedEndDate, monthlyRent, securityDeposit, notes } = req.body;

    const propertyDoc = await Property.findById(property);
    if (!propertyDoc) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const tenancy = await Tenancy.create({
      property,
      landlord: req.user._id,
      tenant,
      startDate,
      expectedEndDate,
      monthlyRent,
      securityDeposit,
      notes: notes || '',
      status: 'Active',
    });

    // Update property status to Occupied
    propertyDoc.status = 'Occupied';
    await propertyDoc.save();

    // Create corresponding Security Deposit record automatically
    await Deposit.create({
      tenancy: tenancy._id,
      property,
      landlord: req.user._id,
      tenant,
      originalDeposit: securityDeposit,
      deductions: [],
      recordedBalance: securityDeposit,
    });

    await logAudit({
      user: req.user._id,
      action: 'Tenancy Created',
      entity: 'Tenancy',
      entityId: tenancy._id,
      description: `Created tenancy agreement for property "${propertyDoc.title}"`,
      req,
    });

    await createNotification({
      recipient: tenant,
      title: 'Tenancy Active',
      message: `Your tenancy agreement for ${propertyDoc.title} is now active.`,
      type: 'invitation',
      relatedEntityId: tenancy._id,
      entityType: 'Tenancy',
    });

    res.status(201).json({ success: true, tenancy });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tenancies
// @route   GET /api/tenancies
// @access  Private
export const getTenancies = async (req, res, next) => {
  try {
    let query = {};

    if (req.user.role === 'landlord') {
      query.landlord = req.user._id;
    } else if (req.user.role === 'tenant') {
      query.tenant = req.user._id;
    }

    const tenancies = await Tenancy.find(query)
      .populate('property', 'title address city propertyType images status rentAmount depositAmount')
      .populate('landlord', 'name email phone avatar')
      .populate('tenant', 'name email phone avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: tenancies.length, tenancies });
  } catch (error) {
    next(error);
  }
};

// @desc    Get tenancy by ID
// @route   GET /api/tenancies/:id
// @access  Private
export const getTenancyById = async (req, res, next) => {
  try {
    const tenancy = await Tenancy.findById(req.params.id)
      .populate('property')
      .populate('landlord', 'name email phone avatar')
      .populate('tenant', 'name email phone avatar');

    if (!tenancy) {
      return res.status(404).json({ success: false, message: 'Tenancy agreement not found' });
    }

    // Role security check
    const isLandlord = req.user.role === 'landlord' && tenancy.landlord._id.toString() === req.user._id.toString();
    const isTenant = req.user.role === 'tenant' && tenancy.tenant._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isLandlord && !isTenant && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this tenancy record' });
    }

    res.status(200).json({ success: true, tenancy });
  } catch (error) {
    next(error);
  }
};

// @desc    Update tenancy status / details
// @route   PUT /api/tenancies/:id
// @access  Private (Landlord / Admin)
export const updateTenancy = async (req, res, next) => {
  try {
    const tenancy = await Tenancy.findById(req.params.id);
    if (!tenancy) {
      return res.status(404).json({ success: false, message: 'Tenancy record not found' });
    }

    const updated = await Tenancy.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (req.body.status === 'Completed' || req.body.status === 'Terminated') {
      await Property.findByIdAndUpdate(tenancy.property, { status: 'Available' });
    }

    res.status(200).json({ success: true, tenancy: updated });
  } catch (error) {
    next(error);
  }
};

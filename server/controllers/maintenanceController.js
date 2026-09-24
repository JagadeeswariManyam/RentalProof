import MaintenanceRequest from '../models/MaintenanceRequest.js';
import Property from '../models/Property.js';
import Tenancy from '../models/Tenancy.js';
import { logAudit } from '../services/auditService.js';
import { createNotification } from '../services/notificationService.js';

// @desc    Create new maintenance request
// @route   POST /api/maintenance
// @access  Private (Tenant / Landlord)
export const createMaintenance = async (req, res, next) => {
  try {
    const { propertyId, tenancyId, title, description, category, priority, room, photos } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const initialTimeline = [
      {
        status: 'Reported',
        note: `Maintenance issue reported: ${title}`,
        updatedBy: req.user._id,
        timestamp: new Date(),
      },
    ];

    const maintenance = await MaintenanceRequest.create({
      property: propertyId,
      tenancy: tenancyId || undefined,
      reportedBy: req.user._id,
      title,
      description,
      category: category || 'Plumbing',
      priority: priority || 'Medium',
      room: room || 'General',
      photos: photos || [],
      status: 'Reported',
      timeline: initialTimeline,
    });

    await logAudit({
      user: req.user._id,
      action: 'Maintenance Request Created',
      entity: 'Maintenance',
      entityId: maintenance._id,
      description: `Reported issue "${title}" for property "${property.title}"`,
      req,
    });

    // Notify landlord if tenant reported
    if (req.user.role === 'tenant') {
      await createNotification({
        recipient: property.landlord,
        title: 'New Maintenance Request',
        message: `${req.user.name} reported a ${priority} priority issue: ${title}`,
        type: 'maintenance',
        relatedEntityId: maintenance._id,
        entityType: 'MaintenanceRequest',
      });
    }

    res.status(201).json({ success: true, maintenance });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all maintenance requests (filtered by role and query)
// @route   GET /api/maintenance
// @access  Private
export const getMaintenanceRequests = async (req, res, next) => {
  try {
    const { propertyId, status, priority, category, search } = req.query;
    let query = {};

    if (propertyId) query.property = propertyId;
    if (status && status !== 'all') query.status = status;
    if (priority && priority !== 'all') query.priority = priority;
    if (category && category !== 'all') query.category = category;

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { room: { $regex: search, $options: 'i' } },
      ];
    }

    // Role filtering
    if (req.user.role === 'landlord') {
      const landlordProperties = await Property.find({ landlord: req.user._id }).select('_id');
      query.property = { $in: landlordProperties.map((p) => p._id) };
    } else if (req.user.role === 'tenant') {
      query.reportedBy = req.user._id;
    } else if (req.user.role === 'service_provider') {
      query.assignedTo = req.user._id;
    }

    const requests = await MaintenanceRequest.find(query)
      .populate('property', 'title address city propertyType')
      .populate('reportedBy', 'name email phone avatar')
      .populate('assignedTo', 'name email phone avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: requests.length, requests });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single maintenance request
// @route   GET /api/maintenance/:id
// @access  Private
export const getMaintenanceById = async (req, res, next) => {
  try {
    const maintenance = await MaintenanceRequest.findById(req.params.id)
      .populate('property')
      .populate('tenancy')
      .populate('reportedBy', 'name email phone avatar')
      .populate('assignedTo', 'name email phone avatar')
      .populate('timeline.updatedBy', 'name role avatar');

    if (!maintenance) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    res.status(200).json({ success: true, maintenance });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign service provider
// @route   PUT /api/maintenance/:id/assign
// @access  Private (Landlord / Admin)
export const assignServiceProvider = async (req, res, next) => {
  try {
    const { serviceProviderId, note, costEstimate } = req.body;

    const maintenance = await MaintenanceRequest.findById(req.params.id).populate('property');
    if (!maintenance) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    maintenance.assignedTo = serviceProviderId;
    maintenance.status = 'Assigned';
    if (costEstimate) maintenance.costEstimate = costEstimate;

    maintenance.timeline.push({
      status: 'Assigned',
      note: note || 'Technician assigned to inspect and resolve issue',
      updatedBy: req.user._id,
      timestamp: new Date(),
    });

    await maintenance.save();

    await logAudit({
      user: req.user._id,
      action: 'Maintenance Assigned',
      entity: 'Maintenance',
      entityId: maintenance._id,
      description: `Assigned maintenance ticket "${maintenance.title}" to technician`,
      req,
    });

    // Notify service provider
    await createNotification({
      recipient: serviceProviderId,
      title: 'New Service Job Assigned',
      message: `You have been assigned to service ticket: ${maintenance.title} at ${maintenance.property.title}`,
      type: 'maintenance',
      relatedEntityId: maintenance._id,
      entityType: 'MaintenanceRequest',
    });

    res.status(200).json({ success: true, maintenance });
  } catch (error) {
    next(error);
  }
};

// @desc    Update maintenance status & add timeline entry
// @route   PUT /api/maintenance/:id/status
// @access  Private
export const updateMaintenanceStatus = async (req, res, next) => {
  try {
    const { status, note, actualCost } = req.body;

    const maintenance = await MaintenanceRequest.findById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    maintenance.status = status;
    if (actualCost !== undefined) maintenance.actualCost = actualCost;

    maintenance.timeline.push({
      status,
      note: note || `Status updated to ${status}`,
      updatedBy: req.user._id,
      timestamp: new Date(),
    });

    await maintenance.save();

    await logAudit({
      user: req.user._id,
      action: 'Maintenance Status Updated',
      entity: 'Maintenance',
      entityId: maintenance._id,
      description: `Updated status of "${maintenance.title}" to ${status}`,
      req,
    });

    // Notify reporting tenant
    await createNotification({
      recipient: maintenance.reportedBy,
      title: 'Maintenance Status Update',
      message: `Your request "${maintenance.title}" is now: ${status}`,
      type: 'maintenance',
      relatedEntityId: maintenance._id,
      entityType: 'MaintenanceRequest',
    });

    res.status(200).json({ success: true, maintenance });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload completion evidence & close ticket
// @route   PUT /api/maintenance/:id/complete
// @access  Private (Service Provider / Landlord / Admin)
export const completeMaintenance = async (req, res, next) => {
  try {
    const { completionPhotos, completionNotes, actualCost } = req.body;

    const maintenance = await MaintenanceRequest.findById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    maintenance.status = 'Completed';
    maintenance.completionPhotos = completionPhotos || [];
    maintenance.completionNotes = completionNotes || 'Work verified and completed.';
    if (actualCost) maintenance.actualCost = actualCost;

    maintenance.timeline.push({
      status: 'Completed',
      note: completionNotes || 'Work completed and photographic proof uploaded',
      updatedBy: req.user._id,
      timestamp: new Date(),
    });

    await maintenance.save();

    await logAudit({
      user: req.user._id,
      action: 'Maintenance Completed',
      entity: 'Maintenance',
      entityId: maintenance._id,
      description: `Technician completed repair on "${maintenance.title}"`,
      req,
    });

    res.status(200).json({ success: true, message: 'Maintenance request marked as completed', maintenance });
  } catch (error) {
    next(error);
  }
};

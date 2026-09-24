import Property from '../models/Property.js';
import Tenancy from '../models/Tenancy.js';
import Inspection from '../models/Inspection.js';
import MaintenanceRequest from '../models/MaintenanceRequest.js';
import Payment from '../models/Payment.js';
import { logAudit } from '../services/auditService.js';

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Landlord / Admin)
export const createProperty = async (req, res, next) => {
  try {
    const {
      title,
      description,
      address,
      city,
      state,
      pincode,
      propertyType,
      bedrooms,
      bathrooms,
      areaSqFt,
      rentAmount,
      depositAmount,
      amenities,
      images,
      checklist,
    } = req.body;

    const property = await Property.create({
      title,
      description,
      address,
      city,
      state,
      pincode,
      propertyType,
      bedrooms,
      bathrooms,
      areaSqFt,
      rentAmount,
      depositAmount,
      amenities: amenities || [],
      images: images || [],
      checklist: checklist && checklist.length > 0 ? checklist : undefined,
      landlord: req.user._id,
    });

    await logAudit({
      user: req.user._id,
      action: 'Property Created',
      entity: 'Property',
      entityId: property._id,
      description: `Created property "${property.title}" in ${property.city}`,
      req,
    });

    res.status(201).json({ success: true, property });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all properties (filtered by role/search)
// @route   GET /api/properties
// @access  Private
export const getProperties = async (req, res, next) => {
  try {
    const { search, status, propertyType, city } = req.query;
    let query = {};

    if (req.user.role === 'landlord') {
      query.landlord = req.user._id;
    } else if (req.user.role === 'tenant') {
      // Find properties rented by tenant
      const activeTenancies = await Tenancy.find({ tenant: req.user._id }).select('property');
      const propertyIds = activeTenancies.map((t) => t.property);
      query._id = { $in: propertyIds };
    }

    if (status && status !== 'all') {
      query.status = status;
    }
    if (propertyType && propertyType !== 'all') {
      query.propertyType = propertyType;
    }
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    const properties = await Property.find(query)
      .populate('landlord', 'name email phone avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: properties.length, properties });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Private
export const getPropertyById = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id).populate('landlord', 'name email phone avatar');

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Fetch active tenancy if any
    const activeTenancy = await Tenancy.findOne({
      property: property._id,
      status: { $in: ['Upcoming', 'Active', 'Ending Soon'] },
    }).populate('tenant', 'name email phone avatar');

    res.status(200).json({ success: true, property, activeTenancy });
  } catch (error) {
    next(error);
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Landlord / Admin)
export const updateProperty = async (req, res, next) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (req.user.role !== 'admin' && property.landlord.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this property' });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    await logAudit({
      user: req.user._id,
      action: 'Property Updated',
      entity: 'Property',
      entityId: property._id,
      description: `Updated property "${property.title}"`,
      req,
    });

    res.status(200).json({ success: true, property });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete/Archive property
// @route   DELETE /api/properties/:id
// @access  Private (Landlord / Admin)
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (req.user.role !== 'admin' && property.landlord.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this property' });
    }

    // Soft delete/archive
    property.status = 'Archived';
    await property.save();

    await logAudit({
      user: req.user._id,
      action: 'Property Archived',
      entity: 'Property',
      entityId: property._id,
      description: `Archived property "${property.title}"`,
      req,
    });

    res.status(200).json({ success: true, message: 'Property archived successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get chronological property timeline
// @route   GET /api/properties/:id/timeline
// @access  Private
export const getPropertyTimeline = async (req, res, next) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const timelineEvents = [];

    // Property creation event
    timelineEvents.push({
      date: property.createdAt,
      type: 'property_created',
      title: 'Property Listed',
      description: `Property "${property.title}" registered in RentalProof system`,
    });

    // Tenancies
    const tenancies = await Tenancy.find({ property: propertyId }).populate('tenant', 'name email');
    tenancies.forEach((t) => {
      timelineEvents.push({
        date: t.startDate,
        type: 'tenancy_start',
        title: 'Tenancy Commenced',
        description: `Tenancy started with ${t.tenant?.name || 'Tenant'} (Rent: ₹${t.monthlyRent.toLocaleString('en-IN')})`,
      });
      if (t.actualEndDate) {
        timelineEvents.push({
          date: t.actualEndDate,
          type: 'tenancy_end',
          title: 'Tenancy Concluded',
          description: `Tenancy completed with ${t.tenant?.name || 'Tenant'}`,
        });
      }
    });

    // Inspections
    const inspections = await Inspection.find({ property: propertyId }).populate('inspector', 'name');
    inspections.forEach((insp) => {
      timelineEvents.push({
        date: insp.inspectionDate || insp.createdAt,
        type: insp.type === 'Move-In' ? 'inspection_move_in' : 'inspection_move_out',
        title: `${insp.type} Inspection Recorded`,
        description: `${insp.items?.length || 0} checklist items inspected with photographic evidence`,
      });
    });

    // Maintenance
    const maintenance = await MaintenanceRequest.find({ property: propertyId }).populate('reportedBy', 'name');
    maintenance.forEach((m) => {
      timelineEvents.push({
        date: m.createdAt,
        type: 'maintenance_reported',
        title: `Maintenance: ${m.title}`,
        description: `Reported in ${m.room} (${m.category}, Priority: ${m.priority})`,
      });
      if (m.status === 'Completed') {
        const completedEvent = m.timeline?.find((evt) => evt.status === 'Completed');
        timelineEvents.push({
          date: completedEvent?.timestamp || m.updatedAt,
          type: 'maintenance_completed',
          title: `Repair Completed: ${m.title}`,
          description: `Work finalized and completion evidence recorded`,
        });
      }
    });

    // Payments
    const payments = await Payment.find({ property: propertyId, status: 'Paid' }).sort({ paymentDate: -1 });
    payments.forEach((p) => {
      timelineEvents.push({
        date: p.paymentDate || p.createdAt,
        type: 'payment_received',
        title: `Rent Payment Recorded (${p.month})`,
        description: `₹${p.amount.toLocaleString('en-IN')} paid via ${p.paymentMethod} (Ref: ${p.referenceNumber || 'N/A'})`,
      });
    });

    // Sort chronologically descending
    timelineEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({ success: true, timeline: timelineEvents });
  } catch (error) {
    next(error);
  }
};

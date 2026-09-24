import crypto from 'crypto';
import Invitation from '../models/Invitation.js';
import Property from '../models/Property.js';
import Tenancy from '../models/Tenancy.js';
import Deposit from '../models/Deposit.js';
import User from '../models/User.js';
import { logAudit } from '../services/auditService.js';
import { createNotification } from '../services/notificationService.js';

// @desc    Create tenant invitation
// @route   POST /api/invitations
// @access  Private (Landlord / Admin)
export const createInvitation = async (req, res, next) => {
  try {
    const { propertyId, tenantEmail, tenantName, tenantPhone, monthlyRent, securityDeposit, startDate, expectedEndDate } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const token = crypto.randomBytes(24).toString('hex');

    const invitation = await Invitation.create({
      property: propertyId,
      landlord: req.user._id,
      tenantEmail: tenantEmail.toLowerCase().trim(),
      tenantName: tenantName || '',
      tenantPhone: tenantPhone || '',
      monthlyRent: monthlyRent || property.rentAmount,
      securityDeposit: securityDeposit || property.depositAmount,
      startDate: startDate || new Date(),
      expectedEndDate: expectedEndDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      token,
      status: 'Pending',
    });

    await logAudit({
      user: req.user._id,
      action: 'Tenant Invited',
      entity: 'Invitation',
      entityId: invitation._id,
      description: `Sent tenancy invitation to ${tenantEmail} for "${property.title}"`,
      req,
    });

    // Check if recipient user already exists in DB to notify them
    const existingUser = await User.findOne({ email: tenantEmail.toLowerCase().trim() });
    if (existingUser) {
      await createNotification({
        recipient: existingUser._id,
        title: 'New Tenancy Invitation',
        message: `${req.user.name} invited you to lease ${property.title}.`,
        type: 'invitation',
        relatedEntityId: invitation._id,
        entityType: 'Invitation',
      });
    }

    res.status(201).json({ success: true, invitation });
  } catch (error) {
    next(error);
  }
};

// @desc    Get invitations for current user
// @route   GET /api/invitations
// @access  Private
export const getInvitations = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'landlord') {
      query.landlord = req.user._id;
    } else {
      query.tenantEmail = req.user.email.toLowerCase();
    }

    const invitations = await Invitation.find(query)
      .populate('property', 'title address city propertyType rentAmount depositAmount images')
      .populate('landlord', 'name email phone avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: invitations.length, invitations });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept invitation
// @route   PUT /api/invitations/:id/accept
// @access  Private (Tenant)
export const acceptInvitation = async (req, res, next) => {
  try {
    const invitation = await Invitation.findById(req.params.id).populate('property');
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }

    if (invitation.status !== 'Pending') {
      return res.status(400).json({ success: false, message: `Invitation is already ${invitation.status}` });
    }

    invitation.status = 'Accepted';
    await invitation.save();

    // Create Tenancy
    const tenancy = await Tenancy.create({
      property: invitation.property._id,
      landlord: invitation.landlord,
      tenant: req.user._id,
      startDate: invitation.startDate,
      expectedEndDate: invitation.expectedEndDate,
      monthlyRent: invitation.monthlyRent,
      securityDeposit: invitation.securityDeposit,
      status: 'Active',
      agreementDate: new Date(),
    });

    // Update Property status to Occupied
    await Property.findByIdAndUpdate(invitation.property._id, { status: 'Occupied' });

    // Initialize Security Deposit ledger
    await Deposit.create({
      tenancy: tenancy._id,
      property: invitation.property._id,
      landlord: invitation.landlord,
      tenant: req.user._id,
      originalDeposit: invitation.securityDeposit,
      deductions: [],
      recordedBalance: invitation.securityDeposit,
    });

    await logAudit({
      user: req.user._id,
      action: 'Invitation Accepted',
      entity: 'Invitation',
      entityId: invitation._id,
      description: `Tenant ${req.user.name} accepted lease invitation for "${invitation.property.title}"`,
      req,
    });

    await createNotification({
      recipient: invitation.landlord,
      title: 'Invitation Accepted',
      message: `${req.user.name} accepted your tenancy invitation for ${invitation.property.title}.`,
      type: 'invitation',
      relatedEntityId: tenancy._id,
      entityType: 'Tenancy',
    });

    res.status(200).json({ success: true, message: 'Invitation accepted and tenancy established!', tenancy });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject invitation
// @route   PUT /api/invitations/:id/reject
// @access  Private (Tenant)
export const rejectInvitation = async (req, res, next) => {
  try {
    const invitation = await Invitation.findById(req.params.id);
    if (!invitation) {
      return res.status(404).json({ success: false, message: 'Invitation not found' });
    }

    invitation.status = 'Rejected';
    await invitation.save();

    await logAudit({
      user: req.user._id,
      action: 'Invitation Rejected',
      entity: 'Invitation',
      entityId: invitation._id,
      description: `Tenant ${req.user.name} declined tenancy invitation`,
      req,
    });

    res.status(200).json({ success: true, message: 'Invitation declined' });
  } catch (error) {
    next(error);
  }
};

import Payment from '../models/Payment.js';
import Tenancy from '../models/Tenancy.js';
import { logAudit } from '../services/auditService.js';
import { createNotification } from '../services/notificationService.js';

// @desc    Record a rent payment
// @route   POST /api/payments
// @access  Private (Landlord / Tenant / Admin)
export const createPayment = async (req, res, next) => {
  try {
    const { tenancyId, amount, month, year, dueDate, paymentDate, paymentMethod, status, referenceNumber, notes } =
      req.body;

    const tenancy = await Tenancy.findById(tenancyId).populate('property');
    if (!tenancy) {
      return res.status(404).json({ success: false, message: 'Tenancy not found' });
    }

    const payment = await Payment.create({
      tenancy: tenancyId,
      property: tenancy.property._id,
      tenant: tenancy.tenant,
      landlord: tenancy.landlord,
      amount,
      month,
      year: year || new Date().getFullYear(),
      dueDate: dueDate || new Date(),
      paymentDate: status === 'Paid' ? paymentDate || new Date() : undefined,
      paymentMethod: paymentMethod || 'UPI',
      status: status || 'Paid',
      referenceNumber: referenceNumber || '',
      notes: notes || '',
    });

    await logAudit({
      user: req.user._id,
      action: 'Rent Payment Recorded',
      entity: 'Payment',
      entityId: payment._id,
      description: `Payment record for ${month} (${amount} INR, status: ${status})`,
      req,
    });

    if (req.user.role === 'tenant') {
      await createNotification({
        recipient: tenancy.landlord,
        title: 'Rent Payment Submitted',
        message: `Tenant recorded payment of ₹${amount} for ${month}.`,
        type: 'payment',
        relatedEntityId: payment._id,
        entityType: 'Payment',
      });
    }

    res.status(201).json({ success: true, payment });
  } catch (error) {
    next(error);
  }
};

// @desc    Get rent payment records
// @route   GET /api/payments
// @access  Private
export const getPayments = async (req, res, next) => {
  try {
    const { tenancyId, propertyId, status, month, year } = req.query;
    let query = {};

    if (tenancyId) query.tenancy = tenancyId;
    if (propertyId) query.property = propertyId;
    if (status && status !== 'all') query.status = status;
    if (month && month !== 'all') query.month = month;
    if (year) query.year = Number(year);

    if (req.user.role === 'landlord') {
      query.landlord = req.user._id;
    } else if (req.user.role === 'tenant') {
      query.tenant = req.user._id;
    }

    const payments = await Payment.find(query)
      .populate('property', 'title address city')
      .populate('tenant', 'name email phone avatar')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: payments.length, payments });
  } catch (error) {
    next(error);
  }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id
// @access  Private (Landlord / Admin)
export const updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });

    await logAudit({
      user: req.user._id,
      action: 'Payment Status Updated',
      entity: 'Payment',
      entityId: payment._id,
      description: `Payment for ${payment.month} updated to ${req.body.status || payment.status}`,
      req,
    });

    res.status(200).json({ success: true, payment: updated });
  } catch (error) {
    next(error);
  }
};

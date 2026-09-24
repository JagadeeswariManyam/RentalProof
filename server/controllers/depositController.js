import Deposit from '../models/Deposit.js';
import Tenancy from '../models/Tenancy.js';
import { logAudit } from '../services/auditService.js';
import { createNotification } from '../services/notificationService.js';

// @desc    Get deposit record for a tenancy
// @route   GET /api/deposits/tenancy/:tenancyId
// @access  Private
export const getDepositByTenancy = async (req, res, next) => {
  try {
    let deposit = await Deposit.findOne({ tenancy: req.params.tenancyId })
      .populate('property', 'title address city')
      .populate('tenant', 'name email phone avatar')
      .populate('landlord', 'name email phone avatar')
      .populate('deductions.relatedMaintenanceId', 'title category status')
      .populate('deductions.relatedInspectionId', 'type inspectionDate')
      .populate('deductions.recordedBy', 'name role');

    if (!deposit) {
      // If not yet created, create one based on tenancy
      const tenancy = await Tenancy.findById(req.params.tenancyId);
      if (!tenancy) {
        return res.status(404).json({ success: false, message: 'Tenancy not found' });
      }

      deposit = await Deposit.create({
        tenancy: tenancy._id,
        property: tenancy.property,
        landlord: tenancy.landlord,
        tenant: tenancy.tenant,
        originalDeposit: tenancy.securityDeposit,
        deductions: [],
        recordedBalance: tenancy.securityDeposit,
      });
    }

    res.status(200).json({ success: true, deposit });
  } catch (error) {
    next(error);
  }
};

// @desc    Add deduction record to security deposit
// @route   POST /api/deposits/tenancy/:tenancyId/deductions
// @access  Private (Landlord / Admin)
export const addDepositDeduction = async (req, res, next) => {
  try {
    const { reason, amount, date, relatedMaintenanceId, relatedInspectionId, notes } = req.body;

    if (!reason || amount === undefined) {
      return res.status(400).json({ success: false, message: 'Reason and amount are required for deduction' });
    }

    let deposit = await Deposit.findOne({ tenancy: req.params.tenancyId });
    if (!deposit) {
      return res.status(404).json({ success: false, message: 'Deposit ledger not found for this tenancy' });
    }

    deposit.deductions.push({
      reason,
      amount: Number(amount),
      date: date || new Date(),
      relatedMaintenanceId: relatedMaintenanceId || undefined,
      relatedInspectionId: relatedInspectionId || undefined,
      notes: notes || '',
      recordedBy: req.user._id,
    });

    await deposit.save();

    await logAudit({
      user: req.user._id,
      action: 'Deposit Deduction Recorded',
      entity: 'Deposit',
      entityId: deposit._id,
      description: `Recorded deduction of ₹${amount} for: ${reason}`,
      metadata: { deductionAmount: amount, reason },
      req,
    });

    await createNotification({
      recipient: deposit.tenant,
      title: 'Deposit Deduction Recorded',
      message: `A deduction entry of ₹${amount} was recorded for: ${reason}.`,
      type: 'payment',
      relatedEntityId: deposit._id,
      entityType: 'Deposit',
    });

    res.status(201).json({ success: true, deposit });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all deposit records for landlord/admin
// @route   GET /api/deposits
// @access  Private
export const getAllDeposits = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role === 'landlord') {
      query.landlord = req.user._id;
    } else if (req.user.role === 'tenant') {
      query.tenant = req.user._id;
    }

    const deposits = await Deposit.find(query)
      .populate('property', 'title address city')
      .populate('tenant', 'name email phone')
      .populate('tenancy', 'status startDate expectedEndDate')
      .sort({ createdAt: -1 });

    const totalOriginal = deposits.reduce((sum, d) => sum + (d.originalDeposit || 0), 0);
    const totalRecordedBalance = deposits.reduce((sum, d) => sum + (d.recordedBalance || 0), 0);
    const totalDeductions = totalOriginal - totalRecordedBalance;

    res.status(200).json({
      success: true,
      count: deposits.length,
      totals: {
        totalOriginal,
        totalRecordedBalance,
        totalDeductions,
      },
      deposits,
    });
  } catch (error) {
    next(error);
  }
};

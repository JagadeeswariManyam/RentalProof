import Report from '../models/Report.js';
import Property from '../models/Property.js';
import Tenancy from '../models/Tenancy.js';
import Inspection from '../models/Inspection.js';
import Payment from '../models/Payment.js';
import Deposit from '../models/Deposit.js';
import MaintenanceRequest from '../models/MaintenanceRequest.js';
import { logAudit } from '../services/auditService.js';

// @desc    Generate report
// @route   POST /api/reports/generate
// @access  Private
export const generateReport = async (req, res, next) => {
  try {
    const { reportType, propertyId, tenancyId, inspectionId } = req.body;

    const property = await Property.findById(propertyId).populate('landlord', 'name email phone');
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    let summaryData = {
      property: {
        title: property.title,
        address: property.address,
        city: property.city,
        state: property.state,
        pincode: property.pincode,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        areaSqFt: property.areaSqFt,
      },
      landlord: property.landlord,
      generatedAt: new Date(),
    };

    let title = `${reportType} - ${property.title}`;

    if (reportType === 'Move-In Inspection' || reportType === 'Move-Out Inspection') {
      const inspection = await Inspection.findById(inspectionId)
        .populate('inspector', 'name email role')
        .populate({
          path: 'tenancy',
          populate: { path: 'tenant', select: 'name email phone' },
        });

      if (!inspection) {
        return res.status(404).json({ success: false, message: 'Inspection not found' });
      }

      summaryData.inspection = {
        id: inspection._id,
        type: inspection.type,
        inspectionDate: inspection.inspectionDate,
        inspector: inspection.inspector,
        tenantAcknowledged: inspection.tenantAcknowledged,
        tenantSignedAt: inspection.tenantSignedAt,
        tenantNotes: inspection.tenantNotes,
        overallNotes: inspection.overallNotes,
        itemsCount: inspection.items.length,
        items: inspection.items,
      };

      if (inspection.tenancy) {
        summaryData.tenant = inspection.tenancy.tenant;
        summaryData.tenancy = {
          startDate: inspection.tenancy.startDate,
          expectedEndDate: inspection.tenancy.expectedEndDate,
          monthlyRent: inspection.tenancy.monthlyRent,
        };
      }
    } else if (reportType === 'Tenancy Summary') {
      const tenancy = await Tenancy.findById(tenancyId)
        .populate('tenant', 'name email phone')
        .populate('landlord', 'name email phone');

      if (!tenancy) {
        return res.status(404).json({ success: false, message: 'Tenancy not found' });
      }

      const payments = await Payment.find({ tenancy: tenancyId }).sort({ paymentDate: -1 });
      const maintenance = await MaintenanceRequest.find({ tenancy: tenancyId }).sort({ createdAt: -1 });
      const deposit = await Deposit.findOne({ tenancy: tenancyId });
      const inspections = await Inspection.find({ tenancy: tenancyId });

      summaryData.tenancy = tenancy;
      summaryData.tenant = tenancy.tenant;
      summaryData.paymentsSummary = {
        totalRecords: payments.length,
        paidCount: payments.filter((p) => p.status === 'Paid').length,
        totalAmountPaid: payments
          .filter((p) => p.status === 'Paid')
          .reduce((sum, p) => sum + (p.amount || 0), 0),
        records: payments,
      };
      summaryData.maintenanceSummary = {
        totalRequests: maintenance.length,
        completedCount: maintenance.filter((m) => m.status === 'Completed').length,
        records: maintenance,
      };
      summaryData.depositSummary = deposit;
      summaryData.inspectionsSummary = inspections.map((i) => ({
        id: i._id,
        type: i.type,
        date: i.inspectionDate,
        status: i.status,
        itemsCount: i.items.length,
      }));
    }

    const report = await Report.create({
      title,
      reportType,
      generatedBy: req.user._id,
      property: propertyId,
      tenancy: tenancyId || undefined,
      inspection: inspectionId || undefined,
      summaryData,
    });

    await logAudit({
      user: req.user._id,
      action: 'Report Generated',
      entity: 'Report',
      entityId: report._id,
      description: `Generated ${reportType} report for "${property.title}"`,
      req,
    });

    res.status(201).json({ success: true, report });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private
export const getReports = async (req, res, next) => {
  try {
    const { propertyId, reportType } = req.query;
    let query = {};

    if (propertyId) query.property = propertyId;
    if (reportType) query.reportType = reportType;

    const reports = await Report.find(query)
      .populate('property', 'title address city')
      .populate('generatedBy', 'name email role')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reports.length, reports });
  } catch (error) {
    next(error);
  }
};

// @desc    Get report by ID
// @route   GET /api/reports/:id
// @access  Private
export const getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('property')
      .populate('generatedBy', 'name email role');

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.status(200).json({ success: true, report });
  } catch (error) {
    next(error);
  }
};

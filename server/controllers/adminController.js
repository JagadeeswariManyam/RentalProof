import User from '../models/User.js';
import Property from '../models/Property.js';
import Tenancy from '../models/Tenancy.js';
import MaintenanceRequest from '../models/MaintenanceRequest.js';
import Inspection from '../models/Inspection.js';
import Report from '../models/Report.js';
import AuditLog from '../models/AuditLog.js';
import { logAudit } from '../services/auditService.js';

// @desc    Get comprehensive platform stats for admin dashboard
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getPlatformStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const landlordsCount = await User.countDocuments({ role: 'landlord' });
    const tenantsCount = await User.countDocuments({ role: 'tenant' });
    const serviceProvidersCount = await User.countDocuments({ role: 'service_provider' });
    const adminsCount = await User.countDocuments({ role: 'admin' });

    const totalProperties = await Property.countDocuments();
    const occupiedProperties = await Property.countDocuments({ status: 'Occupied' });
    const activeTenancies = await Tenancy.countDocuments({ status: 'Active' });

    const totalMaintenance = await MaintenanceRequest.countDocuments();
    const openMaintenance = await MaintenanceRequest.countDocuments({ status: { $ne: 'Completed' } });

    const totalInspections = await Inspection.countDocuments();
    const totalReports = await Report.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          landlords: landlordsCount,
          tenants: tenantsCount,
          serviceProviders: serviceProvidersCount,
          admins: adminsCount,
        },
        properties: {
          total: totalProperties,
          occupied: occupiedProperties,
          available: totalProperties - occupiedProperties,
        },
        tenancies: {
          active: activeTenancies,
        },
        maintenance: {
          total: totalMaintenance,
          open: openMaintenance,
          completed: totalMaintenance - openMaintenance,
        },
        inspections: {
          total: totalInspections,
        },
        reports: {
          total: totalReports,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (with search and role filter)
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const { role, search, status } = req.query;
    let query = {};

    if (role && role !== 'all') query.role = role;
    if (status !== undefined && status !== 'all') query.isActive = status === 'active';
    if (search) {
      query.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle user active status
// @route   PUT /api/admin/users/:id/toggle-status
// @access  Private (Admin)
export const toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Protect self-deactivation
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: 'Cannot deactivate your own administrator account' });
    }

    user.isActive = !user.isActive;
    await user.save();

    await logAudit({
      user: req.user._id,
      action: user.isActive ? 'User Activated' : 'User Deactivated',
      entity: 'User',
      entityId: user._id,
      description: `Administrator ${req.user.name} changed status of ${user.email} to ${user.isActive ? 'Active' : 'Inactive'}`,
      req,
    });

    res.status(200).json({
      success: true,
      message: `User account ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user,
    });
  } catch (error) {
    next(error);
  }
};

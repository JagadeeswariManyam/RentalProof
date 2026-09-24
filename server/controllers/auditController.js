import AuditLog from '../models/AuditLog.js';

// @desc    Get audit logs
// @route   GET /api/audit-logs
// @access  Private
export const getAuditLogs = async (req, res, next) => {
  try {
    const { entity, search, limit = 50 } = req.query;
    let query = {};

    if (entity && entity !== 'all') {
      query.entity = entity;
    }

    if (search) {
      query.$or = [{ action: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
    }

    // Landlord only sees logs related to their own actions or entities
    if (req.user.role !== 'admin') {
      query.user = req.user._id;
    }

    const logs = await AuditLog.find(query)
      .populate('user', 'name email role avatar')
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.status(200).json({ success: true, count: logs.length, logs });
  } catch (error) {
    next(error);
  }
};

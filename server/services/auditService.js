import AuditLog from '../models/AuditLog.js';

export const logAudit = async ({ user, action, entity, entityId, description, metadata = {}, req = null }) => {
  try {
    const ipAddress = req ? req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '' : '';
    await AuditLog.create({
      user: user?._id || user,
      action,
      entity,
      entityId,
      description,
      metadata,
      ipAddress,
    });
  } catch (error) {
    console.error('[RentalProof AuditLog Error]:', error.message);
  }
};

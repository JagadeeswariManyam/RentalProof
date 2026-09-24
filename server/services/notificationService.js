import Notification from '../models/Notification.js';

export const createNotification = async ({
  recipient,
  title,
  message,
  type = 'system',
  relatedEntityId = null,
  entityType = '',
}) => {
  try {
    if (!recipient) return null;
    const notification = await Notification.create({
      recipient,
      title,
      message,
      type,
      relatedEntityId,
      entityType,
      isRead: false,
    });
    return notification;
  } catch (error) {
    console.error('[RentalProof Notification Error]:', error.message);
    return null;
  }
};

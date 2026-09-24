import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Document name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Rental Agreement', 'Inspection Report', 'Maintenance Receipt', 'Payment Proof', 'Property Document', 'Other'],
      default: 'Other',
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      default: 'application/pdf',
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    tenancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenancy',
    },
  },
  {
    timestamps: true,
  }
);

documentSchema.index({ property: 1, category: 1 });
documentSchema.index({ tenancy: 1 });

const Document = mongoose.model('Document', documentSchema);
export default Document;

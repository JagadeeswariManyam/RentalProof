import mongoose from 'mongoose';

const inspectionItemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Needs Attention', 'Damaged'],
      default: 'Good',
    },
    notes: {
      type: String,
      default: '',
    },
    photos: [
      {
        type: String,
      },
    ],
    referenceMoveInItemId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    attentionLevel: {
      type: String,
      enum: ['No Significant Change', 'Possible Change', 'Needs Review'],
      default: 'No Significant Change',
    },
    aiObservation: {
      changeDetected: { type: Boolean, default: false },
      confidence: { type: Number, default: 0 },
      observations: [{ type: String }],
      requiresManualReview: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const inspectionSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    tenancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenancy',
    },
    type: {
      type: String,
      enum: ['Move-In', 'Move-Out'],
      required: true,
    },
    inspector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Draft', 'In Progress', 'Completed'],
      default: 'Draft',
    },
    inspectionDate: {
      type: Date,
      default: Date.now,
    },
    referenceMoveInInspection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inspection',
    },
    items: [inspectionItemSchema],
    tenantAcknowledged: {
      type: Boolean,
      default: false,
    },
    tenantSignedAt: {
      type: Date,
    },
    tenantNotes: {
      type: String,
      default: '',
    },
    overallNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

inspectionSchema.index({ property: 1, type: 1 });
inspectionSchema.index({ tenancy: 1 });

const Inspection = mongoose.model('Inspection', inspectionSchema);
export default Inspection;

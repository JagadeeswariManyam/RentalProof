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
    annotations: [
      {
        photoIndex: { type: Number, default: 0 },
        photoUrl: { type: String, default: '' },
        coordinates: {
          x: { type: Number, required: true }, // percentage 0-100
          y: { type: Number, required: true },
          width: { type: Number, required: true },
          height: { type: Number, required: true },
        },
        title: { type: String, required: true },
        description: { type: String, default: '' },
        severity: {
          type: String,
          enum: ['Low', 'Medium', 'High', 'Critical'],
          default: 'Medium',
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        createdByName: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    evidenceMetadata: [
      {
        photoUrl: { type: String, required: true },
        hash: { type: String, default: '' },
        gpsCoords: {
          latitude: { type: Number },
          longitude: { type: Number },
          locationName: { type: String, default: '' },
        },
        capturedAt: { type: Date, default: Date.now },
        uploader: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        uploaderName: { type: String, default: '' },
        device: { type: String, default: 'Standard Mobile Camera' },
        room: { type: String, default: '' },
      },
    ],
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
    confirmations: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          enum: ['landlord', 'tenant', 'inspector', 'service_provider', 'admin'],
          required: true,
        },
        signedName: {
          type: String,
          required: true,
        },
        confirmedAt: {
          type: Date,
          default: Date.now,
        },
        comments: {
          type: String,
          default: '',
        },
        status: {
          type: String,
          enum: ['Approved', 'Contested', 'Pending'],
          default: 'Approved',
        },
      },
    ],
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

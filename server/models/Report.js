import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reportType: {
      type: String,
      enum: ['Move-In Inspection', 'Move-Out Inspection', 'Tenancy Summary', 'Deposit Reconciliation'],
      required: true,
    },
    generatedBy: {
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
    inspection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inspection',
    },
    summaryData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ property: 1, reportType: 1 });
reportSchema.index({ generatedBy: 1 });

const Report = mongoose.model('Report', reportSchema);
export default Report;

import mongoose from 'mongoose';

const depositDeductionSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    relatedMaintenanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MaintenanceRequest',
    },
    relatedInspectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inspection',
    },
    notes: {
      type: String,
      default: '',
    },
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const depositSchema = new mongoose.Schema(
  {
    tenancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenancy',
      required: true,
      unique: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalDeposit: {
      type: Number,
      required: true,
      min: 0,
    },
    deductions: [depositDeductionSchema],
    recordedBalance: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    disclaimer: {
      type: String,
      default: 'Recorded calculation only — does not constitute a legal determination of liability.',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate recorded balance
depositSchema.pre('save', function (next) {
  const totalDeductions = this.deductions.reduce((sum, item) => sum + (item.amount || 0), 0);
  this.recordedBalance = Math.max(0, this.originalDeposit - totalDeductions);
  next();
});

const Deposit = mongoose.model('Deposit', depositSchema);
export default Deposit;

import mongoose from 'mongoose';

const tenancySchema = new mongoose.Schema(
  {
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
    startDate: {
      type: Date,
      required: true,
    },
    expectedEndDate: {
      type: Date,
      required: true,
    },
    actualEndDate: {
      type: Date,
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
    securityDeposit: {
      type: Number,
      required: true,
    },
    agreementDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Upcoming', 'Active', 'Ending Soon', 'Completed', 'Terminated'],
      default: 'Active',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

tenancySchema.index({ property: 1, tenant: 1 });
tenancySchema.index({ landlord: 1, status: 1 });

const Tenancy = mongoose.model('Tenancy', tenancySchema);
export default Tenancy;

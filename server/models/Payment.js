import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    tenancy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tenancy',
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Payment amount is required'],
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      default: () => new Date().getFullYear(),
    },
    dueDate: {
      type: Date,
      required: true,
    },
    paymentDate: {
      type: Date,
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Bank Transfer', 'Cash', 'Cheque', 'Card'],
      default: 'UPI',
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Late', 'Partially Paid'],
      default: 'Pending',
    },
    referenceNumber: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    receiptUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ tenancy: 1, month: 1, year: 1 });
paymentSchema.index({ landlord: 1, status: 1 });
paymentSchema.index({ tenant: 1 });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;

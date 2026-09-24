import mongoose from 'mongoose';

const maintenanceTimelineEventSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: '',
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const maintenanceRequestSchema = new mongoose.Schema(
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
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Issue title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    category: {
      type: String,
      enum: ['Plumbing', 'Electrical', 'Appliance', 'Furniture', 'Internet', 'Cleaning', 'Structural', 'Other'],
      default: 'Plumbing',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Reported', 'Reviewed', 'Assigned', 'In Progress', 'Completed'],
      default: 'Reported',
    },
    room: {
      type: String,
      default: 'General',
    },
    photos: [
      {
        type: String,
      },
    ],
    completionPhotos: [
      {
        type: String,
      },
    ],
    completionNotes: {
      type: String,
      default: '',
    },
    costEstimate: {
      type: Number,
      default: 0,
    },
    actualCost: {
      type: Number,
      default: 0,
    },
    timeline: [maintenanceTimelineEventSchema],
  },
  {
    timestamps: true,
  }
);

maintenanceRequestSchema.index({ property: 1, status: 1 });
maintenanceRequestSchema.index({ reportedBy: 1 });
maintenanceRequestSchema.index({ assignedTo: 1 });

const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
export default MaintenanceRequest;

import mongoose from 'mongoose';

const propertyChecklistCategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    items: [{ type: String, required: true }],
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    pincode: {
      type: String,
      default: '',
    },
    propertyType: {
      type: String,
      enum: ['Apartment', 'House', 'Villa', 'Room', 'PG', 'Studio', 'Commercial', 'Other'],
      default: 'Apartment',
    },
    bedrooms: {
      type: Number,
      required: true,
      default: 1,
    },
    bathrooms: {
      type: Number,
      required: true,
      default: 1,
    },
    areaSqFt: {
      type: Number,
      default: 0,
    },
    rentAmount: {
      type: Number,
      required: [true, 'Monthly rent amount is required'],
    },
    depositAmount: {
      type: Number,
      required: [true, 'Security deposit amount is required'],
    },
    amenities: [
      {
        type: String,
      },
    ],
    images: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ['Available', 'Occupied', 'Under Maintenance', 'Archived'],
      default: 'Available',
    },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    checklist: {
      type: [propertyChecklistCategorySchema],
      default: [
        {
          category: 'Living Room',
          items: ['Walls', 'Ceiling', 'Flooring', 'Windows', 'Doors', 'Lighting', 'Switchboards', 'Furniture'],
        },
        {
          category: 'Master Bedroom',
          items: ['Walls', 'Ceiling', 'Flooring', 'Windows', 'Wardrobe', 'Air Conditioner', 'Lighting'],
        },
        {
          category: 'Kitchen',
          items: ['Countertop', 'Sink & Faucet', 'Cabinets', 'Stove / Gas Line', 'Exhaust Fan', 'Wall Tiles', 'Plumbing'],
        },
        {
          category: 'Bathroom',
          items: ['Toilet Bowl & Flush', 'Washbasin & Faucet', 'Shower & Mixer', 'Geyser / Water Heater', 'Tiles & Grouting', 'Mirror & Accessories'],
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

propertySchema.index({ landlord: 1, status: 1 });
propertySchema.index({ city: 1, propertyType: 1 });

const Property = mongoose.model('Property', propertySchema);
export default Property;

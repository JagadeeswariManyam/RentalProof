import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Property from '../models/Property.js';
import Tenancy from '../models/Tenancy.js';
import Invitation from '../models/Invitation.js';
import Inspection from '../models/Inspection.js';
import MaintenanceRequest from '../models/MaintenanceRequest.js';
import Payment from '../models/Payment.js';
import Deposit from '../models/Deposit.js';
import Document from '../models/Document.js';
import Notification from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';
import Report from '../models/Report.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const sampleImages = {
  property: [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
  ],
  livingRoomBefore: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
  livingRoomAfter: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  bedroomBefore: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
  bedroomAfter: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
  kitchenBefore: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
  kitchenAfter: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
  bathroomBefore: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  bathroomAfter: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80',
  plumbingBefore: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
  plumbingAfter: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
  acBefore: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
  acAfter: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
};

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('No MONGODB_URI found in environment.');
      process.exit(1);
    }

    console.log('[RentalProof Seeder] Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('[RentalProof Seeder] Connected successfully.');

    console.log('[RentalProof Seeder] Clearing existing records...');
    await Promise.all([
      User.deleteMany({}),
      Property.deleteMany({}),
      Tenancy.deleteMany({}),
      Invitation.deleteMany({}),
      Inspection.deleteMany({}),
      MaintenanceRequest.deleteMany({}),
      Payment.deleteMany({}),
      Deposit.deleteMany({}),
      Document.deleteMany({}),
      Notification.deleteMany({}),
      AuditLog.deleteMany({}),
      Report.deleteMany({}),
    ]);

    console.log('[RentalProof Seeder] Creating 11 Multi-Role Users...');
    // Password for all demo accounts: Password123!
    const landlord1 = await User.create({
      name: 'Eleanor Vance (Apex Estates)',
      email: 'landlord@rentalproof.com',
      phone: '+91 98765 43210',
      password: 'Password123!',
      role: 'landlord',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
    });

    const landlord2 = await User.create({
      name: 'Vikramaditya Rao',
      email: 'landlord2@rentalproof.com',
      phone: '+91 98765 43211',
      password: 'Password123!',
      role: 'landlord',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    });

    const landlord3 = await User.create({
      name: 'Sunita Nambiar',
      email: 'landlord3@rentalproof.com',
      phone: '+91 98765 43212',
      password: 'Password123!',
      role: 'landlord',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    });

    const tenant1 = await User.create({
      name: 'Rohan Mehta',
      email: 'tenant@rentalproof.com',
      phone: '+91 98765 12345',
      password: 'Password123!',
      role: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    });

    const tenant2 = await User.create({
      name: 'Priya Sharma',
      email: 'priya@rentalproof.com',
      phone: '+91 98765 12346',
      password: 'Password123!',
      role: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80',
    });

    const tenant3 = await User.create({
      name: 'Ananya Deshmukh',
      email: 'ananya@rentalproof.com',
      phone: '+91 98765 12347',
      password: 'Password123!',
      role: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80',
    });

    const tenant4 = await User.create({
      name: 'Karan Kapoor',
      email: 'karan@rentalproof.com',
      phone: '+91 98765 12348',
      password: 'Password123!',
      role: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    });

    const tenant5 = await User.create({
      name: 'Sneha Patel',
      email: 'sneha@rentalproof.com',
      phone: '+91 98765 12349',
      password: 'Password123!',
      role: 'tenant',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    });

    const serviceProvider1 = await User.create({
      name: 'Apex Plumbing & Electrical',
      email: 'service@rentalproof.com',
      phone: '+91 98765 67890',
      password: 'Password123!',
      role: 'service_provider',
      avatar: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=256&q=80',
    });

    const serviceProvider2 = await User.create({
      name: 'UrbanFix Handyman & HVAC',
      email: 'contractor2@rentalproof.com',
      phone: '+91 98765 67891',
      password: 'Password123!',
      role: 'service_provider',
      avatar: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=256&q=80',
    });

    const admin = await User.create({
      name: 'RentalProof System Admin',
      email: 'admin@rentalproof.com',
      phone: '+91 98765 99999',
      password: 'Password123!',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    });

    console.log('[RentalProof Seeder] Creating 8+ Realistic Properties...');
    const defaultChecklist = [
      {
        category: 'Living Room',
        items: ['Walls & Paint', 'Flooring & Baseboards', 'Windows & Blinds', 'Main Door & Lock', 'Lighting & Ceiling Fan'],
      },
      {
        category: 'Master Bedroom',
        items: ['Walls & Ceiling', 'Flooring', 'Wardrobe & Closets', 'Air Conditioner', 'Window Fixtures'],
      },
      {
        category: 'Modular Kitchen',
        items: ['Granite Countertop', 'Sink & Faucet', 'Modular Cabinets', 'Exhaust Fan / Chimney', 'Wall Tiles & Grouting'],
      },
      {
        category: 'Master Bathroom',
        items: ['Washbasin & Mixer Tap', 'Toilet Commode & Jet Spray', 'Shower & Mixer', 'Geyser / Water Heater', 'Tiles & Grout'],
      },
    ];

    const prop1 = await Property.create({
      title: 'Green Valley Apartments, Unit 402',
      description: 'Spacious, naturally lit 2 BHK flat situated on the 4th floor with panoramic garden views, modular kitchen, and modern bathroom fittings.',
      address: '402 Palm Grove Enclave, Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
      propertyType: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1250,
      rentAmount: 32000,
      depositAmount: 64000,
      amenities: ['Covered Parking', 'Elevator', '24/7 Water Supply', 'Security Guard', 'Power Backup', 'Gymnasium'],
      images: sampleImages.property,
      status: 'Occupied',
      landlord: landlord1._id,
      checklist: defaultChecklist,
    });

    const prop2 = await Property.create({
      title: 'Sunrise Heights Sky Villa #1401',
      description: 'Independent 3 BHK duplex luxury penthouse with private terrace garden, solar heating, and double covered parking.',
      address: 'Sky Villa 1401, Sunrise Boulevard, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      propertyType: 'Penthouse',
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 2400,
      rentAmount: 65000,
      depositAmount: 130000,
      amenities: ['Private Terrace', 'Double Carport', 'Solar Water Heater', 'Clubhouse Access', 'CCTV Security'],
      images: [sampleImages.property[1], sampleImages.property[2]],
      status: 'Occupied',
      landlord: landlord1._id,
      checklist: defaultChecklist,
    });

    const prop3 = await Property.create({
      title: 'CyberCity Tech Park View Residency #8B',
      description: 'Ultra-modern 2 BHK apartment overlooking the financial district with automated smart lighting and modular island kitchen.',
      address: 'Tower B, Flat 802, Hitec City',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      propertyType: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1380,
      rentAmount: 38000,
      depositAmount: 76000,
      amenities: ['EV Charging', 'High-Speed Fiber', 'Swimming Pool', 'Smart Lock Handover', 'Co-Working Lounge'],
      images: [sampleImages.property[2], sampleImages.property[0]],
      status: 'Occupied',
      landlord: landlord2._id,
      checklist: defaultChecklist,
    });

    const prop4 = await Property.create({
      title: 'Koregaon Park Luxury Studio #304',
      description: 'Fully furnished designer studio apartment ideal for tech professionals, featuring Italian marble and Bosch appliances.',
      address: 'Lane 7, Koregaon Park North',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      propertyType: 'Studio',
      bedrooms: 1,
      bathrooms: 1,
      areaSqFt: 650,
      rentAmount: 24000,
      depositAmount: 48000,
      amenities: ['Fully Furnished', 'Central Air Conditioning', 'Concierge Service', 'Balcony Garden'],
      images: [sampleImages.property[3], sampleImages.property[1]],
      status: 'Occupied',
      landlord: landlord2._id,
      checklist: defaultChecklist,
    });

    const prop5 = await Property.create({
      title: 'Marine Drive Heritage Flat #2A',
      description: 'Classic Art Deco 3 BHK sea-facing residence with high ceilings, Burma teak woodwork, and private foyer.',
      address: 'Sea Breeze Mansion, Marine Drive',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400020',
      propertyType: 'Apartment',
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 1850,
      rentAmount: 95000,
      depositAmount: 250000,
      amenities: ['Sea View', 'Heritage Architecture', 'Elevator', '24/7 Security Staff', 'Reserved Parking'],
      images: [sampleImages.property[0], sampleImages.property[3]],
      status: 'Occupied',
      landlord: landlord3._id,
      checklist: defaultChecklist,
    });

    const prop6 = await Property.create({
      title: 'Banjara Hills Garden Townhouse #12',
      description: 'Peaceful 4 BHK townhouse with private manicured lawn, servant quarters, and imported sanitaryware.',
      address: 'Road No. 12, Banjara Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500034',
      propertyType: 'Townhouse',
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 3100,
      rentAmount: 85000,
      depositAmount: 170000,
      amenities: ['Private Lawn', 'Double Garage', 'Staff Quarters', 'Gated Community Guard'],
      images: [sampleImages.property[1], sampleImages.property[2]],
      status: 'Occupied',
      landlord: landlord3._id,
      checklist: defaultChecklist,
    });

    const prop7 = await Property.create({
      title: 'Whitefield Prestige Palms #503',
      description: 'Quiet 3 BHK family apartment right beside major tech hubs, international schools, and metro station.',
      address: 'Prestige Palms, Varthur Main Rd, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560066',
      propertyType: 'Apartment',
      bedrooms: 3,
      bathrooms: 2,
      areaSqFt: 1550,
      rentAmount: 42000,
      depositAmount: 84000,
      amenities: ['Tennis Court', 'Badminton Hall', 'Children Play Area', 'Supermarket on premises'],
      images: [sampleImages.property[2], sampleImages.property[3]],
      status: 'Available',
      landlord: landlord1._id,
      checklist: defaultChecklist,
    });

    const prop8 = await Property.create({
      title: 'Guntur Ring Road Commercial & Residential Suites #101',
      description: 'Modern 2 BHK residential suite near education hub, equipped with high-efficiency inverter and modular fittings.',
      address: 'Plot 45, Ring Road Phase 2',
      city: 'Guntur',
      state: 'Andhra Pradesh',
      pincode: '522002',
      propertyType: 'Apartment',
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1150,
      rentAmount: 16000,
      depositAmount: 32000,
      amenities: ['Power Backup', 'Covered Parking', '24/7 Borewell Water', 'CCTV'],
      images: [sampleImages.property[0], sampleImages.property[1]],
      status: 'Available',
      landlord: landlord1._id,
      checklist: defaultChecklist,
    });

    console.log('[RentalProof Seeder] Creating 6 Active & Historical Tenancies...');
    const now = new Date();
    const t1Start = new Date(now.getFullYear(), now.getMonth() - 6, 1);
    const t1End = new Date(now.getFullYear(), now.getMonth() + 5, 1);

    const tenancy1 = await Tenancy.create({
      property: prop1._id,
      landlord: landlord1._id,
      tenant: tenant1._id,
      startDate: t1Start,
      expectedEndDate: t1End,
      monthlyRent: 32000,
      securityDeposit: 64000,
      status: 'Active',
      notes: '11-month lease. Monthly rent includes society maintenance charges.',
    });

    const tenancy2 = await Tenancy.create({
      property: prop2._id,
      landlord: landlord1._id,
      tenant: tenant2._id,
      startDate: new Date(now.getFullYear(), now.getMonth() - 3, 1),
      expectedEndDate: new Date(now.getFullYear(), now.getMonth() + 8, 1),
      monthlyRent: 65000,
      securityDeposit: 130000,
      status: 'Active',
      notes: 'Penthouse lease. Rooftop garden maintenance managed by tenant.',
    });

    const tenancy3 = await Tenancy.create({
      property: prop3._id,
      landlord: landlord2._id,
      tenant: tenant3._id,
      startDate: new Date(now.getFullYear(), now.getMonth() - 8, 1),
      expectedEndDate: new Date(now.getFullYear(), now.getMonth() + 3, 1),
      monthlyRent: 38000,
      securityDeposit: 76000,
      status: 'Active',
    });

    const tenancy4 = await Tenancy.create({
      property: prop4._id,
      landlord: landlord2._id,
      tenant: tenant4._id,
      startDate: new Date(now.getFullYear(), now.getMonth() - 2, 1),
      expectedEndDate: new Date(now.getFullYear(), now.getMonth() + 9, 1),
      monthlyRent: 24000,
      securityDeposit: 48000,
      status: 'Active',
    });

    const tenancy5 = await Tenancy.create({
      property: prop5._id,
      landlord: landlord3._id,
      tenant: tenant5._id,
      startDate: new Date(now.getFullYear(), now.getMonth() - 10, 1),
      expectedEndDate: new Date(now.getFullYear(), now.getMonth() + 1, 1),
      monthlyRent: 95000,
      securityDeposit: 250000,
      status: 'Active',
    });

    const tenancy6 = await Tenancy.create({
      property: prop6._id,
      landlord: landlord3._id,
      tenant: tenant1._id,
      startDate: new Date(now.getFullYear(), now.getMonth() - 18, 1),
      expectedEndDate: new Date(now.getFullYear(), now.getMonth() - 7, 1),
      actualEndDate: new Date(now.getFullYear(), now.getMonth() - 7, 1),
      monthlyRent: 85000,
      securityDeposit: 170000,
      status: 'Completed',
      notes: 'Successfully concluded tenancy with full photographic audit & deposit release.',
    });

    console.log('[RentalProof Seeder] Creating Move-In Inspections with Digital Signatures & Provenance...');
    const moveInInspection1 = await Inspection.create({
      property: prop1._id,
      tenancy: tenancy1._id,
      type: 'Move-In',
      inspector: landlord1._id,
      status: 'Completed',
      inspectionDate: t1Start,
      tenantAcknowledged: true,
      tenantSignedAt: new Date(t1Start.getTime() + 24 * 60 * 60 * 1000),
      tenantNotes: 'Verified all baseline fixtures and photos upon receiving keys. Looks clean and functional.',
      overallNotes: 'Premises handed over in pristine condition. All appliances functioning smoothly.',
      confirmations: [
        {
          user: landlord1._id,
          role: 'landlord',
          signedName: 'Eleanor Vance',
          confirmedAt: t1Start,
          comments: 'Handover complete. Baseline photographic proof locked to ledger.',
          status: 'Approved',
        },
        {
          user: tenant1._id,
          role: 'tenant',
          signedName: 'Rohan Mehta',
          confirmedAt: new Date(t1Start.getTime() + 24 * 60 * 60 * 1000),
          comments: 'Condition verified in good order. Accepted baseline photos.',
          status: 'Approved',
        },
      ],
      items: [
        {
          category: 'Living Room',
          item: 'Walls & Paint',
          condition: 'Excellent',
          notes: 'Fresh coat of paint; no scuffs or marks.',
          photos: [sampleImages.livingRoomBefore],
          attentionLevel: 'No Significant Change',
          annotations: [],
          evidenceMetadata: [
            {
              photoUrl: sampleImages.livingRoomBefore,
              hash: 'sha256-4c9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f',
              gpsCoords: { latitude: 12.9352, longitude: 77.6245, locationName: 'Koramangala Ring Rd • Verified On-Site' },
              capturedAt: t1Start,
              uploader: landlord1._id,
              uploaderName: 'Eleanor Vance',
              device: 'iPhone 15 Pro (RentalProof Hardware Exif Authenticated)',
              room: 'Living Room',
            },
          ],
        },
        {
          category: 'Living Room',
          item: 'Flooring & Baseboards',
          condition: 'Good',
          notes: 'Vitrified tiles in good condition with clean grout.',
          photos: [sampleImages.livingRoomBefore],
          attentionLevel: 'No Significant Change',
        },
        {
          category: 'Master Bedroom',
          item: 'Air Conditioner',
          condition: 'Good',
          notes: 'Split AC tested; cooling is fast and remote is operational.',
          photos: [sampleImages.bedroomBefore],
          attentionLevel: 'No Significant Change',
        },
        {
          category: 'Modular Kitchen',
          item: 'Sink & Faucet',
          condition: 'Good',
          notes: 'Stainless steel sink clear and faucet handles smooth.',
          photos: [sampleImages.kitchenBefore],
          attentionLevel: 'No Significant Change',
        },
        {
          category: 'Master Bathroom',
          item: 'Washbasin & Mixer Tap',
          condition: 'Good',
          notes: 'Mixer tap intact with zero drip.',
          photos: [sampleImages.bathroomBefore],
          attentionLevel: 'No Significant Change',
        },
      ],
    });

    console.log('[RentalProof Seeder] Creating Move-Out Walkthrough with Damage Annotations & AI Scan...');
    const moveOutDate = new Date();
    const moveOutInspection1 = await Inspection.create({
      property: prop1._id,
      tenancy: tenancy1._id,
      type: 'Move-Out',
      inspector: landlord1._id,
      status: 'Completed',
      inspectionDate: moveOutDate,
      referenceMoveInInspection: moveInInspection1._id,
      tenantAcknowledged: false,
      overallNotes: 'Move-out walkthrough conducted. Minor surface changes recorded with bounding annotations.',
      confirmations: [
        {
          user: landlord1._id,
          role: 'landlord',
          signedName: 'Eleanor Vance',
          confirmedAt: moveOutDate,
          comments: 'Inspection completed. Annotations tagged for review.',
          status: 'Approved',
        },
      ],
      items: [
        {
          category: 'Living Room',
          item: 'Walls & Paint',
          condition: 'Fair',
          notes: 'Visible picture frame nail holes and slight sofa scuff marks on north wall.',
          photos: [sampleImages.livingRoomAfter],
          referenceMoveInItemId: moveInInspection1.items[0]._id,
          attentionLevel: 'Possible Change',
          annotations: [
            {
              photoIndex: 0,
              photoUrl: sampleImages.livingRoomAfter,
              coordinates: { x: 22, y: 35, width: 28, height: 24 },
              title: 'Sofa Scuff & Discoloration',
              description: 'Surface scuff mark from furniture contact; requires minor touch-up paint.',
              severity: 'Medium',
              createdBy: landlord1._id,
              createdByName: 'Eleanor Vance',
              createdAt: moveOutDate,
            },
            {
              photoIndex: 0,
              photoUrl: sampleImages.livingRoomAfter,
              coordinates: { x: 65, y: 18, width: 14, height: 16 },
              title: 'Nail Mounting Hole',
              description: 'Unfilled wall anchor hole from picture frame mount.',
              severity: 'Low',
              createdBy: landlord1._id,
              createdByName: 'Eleanor Vance',
              createdAt: moveOutDate,
            },
          ],
          aiObservation: {
            changeDetected: true,
            confidence: 0.88,
            observations: [
              'Localized surface discoloration detected along lower drywall.',
              'Texture contrast variance consistent with furniture contact or hanging mounts.',
            ],
            requiresManualReview: true,
          },
        },
        {
          category: 'Living Room',
          item: 'Flooring & Baseboards',
          condition: 'Good',
          notes: 'No cracked tiles; standard wear and tear.',
          photos: [sampleImages.livingRoomAfter],
          referenceMoveInItemId: moveInInspection1.items[1]._id,
          attentionLevel: 'No Significant Change',
          aiObservation: {
            changeDetected: false,
            confidence: 0.94,
            observations: ['Flooring alignment and color balance consistent with baseline capture.'],
            requiresManualReview: false,
          },
        },
        {
          category: 'Master Bedroom',
          item: 'Air Conditioner',
          condition: 'Good',
          notes: 'Operational and clean filter.',
          photos: [sampleImages.bedroomAfter],
          referenceMoveInItemId: moveInInspection1.items[2]._id,
          attentionLevel: 'No Significant Change',
          aiObservation: {
            changeDetected: false,
            confidence: 0.91,
            observations: ['Fixture housing intact and no visual alterations identified.'],
            requiresManualReview: false,
          },
        },
        {
          category: 'Modular Kitchen',
          item: 'Sink & Faucet',
          condition: 'Fair',
          notes: 'Mineral deposits around faucet base; slight spout stiffness.',
          photos: [sampleImages.kitchenAfter],
          referenceMoveInItemId: moveInInspection1.items[3]._id,
          attentionLevel: 'Possible Change',
          annotations: [
            {
              photoIndex: 0,
              photoUrl: sampleImages.kitchenAfter,
              coordinates: { x: 38, y: 44, width: 22, height: 26 },
              title: 'Hard Water Limescale Ring',
              description: 'Calcium deposit ring around mixer joint, easily cleaned with descaler.',
              severity: 'Low',
              createdBy: landlord1._id,
              createdByName: 'Eleanor Vance',
              createdAt: moveOutDate,
            },
          ],
          aiObservation: {
            changeDetected: true,
            confidence: 0.82,
            observations: ['Sheen reduction and surface mineral spotting observed around basin perimeter.'],
            requiresManualReview: true,
          },
        },
        {
          category: 'Master Bathroom',
          item: 'Washbasin & Mixer Tap',
          condition: 'Needs Attention',
          notes: 'Valve cartridge experienced leak during tenancy, repaired via maintenance ticket #M-101.',
          photos: [sampleImages.bathroomAfter],
          referenceMoveInItemId: moveInInspection1.items[4]._id,
          attentionLevel: 'Possible Change',
          aiObservation: {
            changeDetected: true,
            confidence: 0.89,
            observations: [
              'Surface reflection indicates replacement hardware or seal adjustments.',
              'No structural damage identified.',
            ],
            requiresManualReview: true,
          },
        },
      ],
    });

    console.log('[RentalProof Seeder] Creating 10+ Maintenance Requests across properties...');
    const maintDate1 = new Date(t1Start);
    maintDate1.setDate(maintDate1.getDate() + 45);

    const maint1 = await MaintenanceRequest.create({
      property: prop1._id,
      tenancy: tenancy1._id,
      reportedBy: tenant1._id,
      assignedTo: serviceProvider1._id,
      title: 'Master Bathroom Mixer Tap Dripping',
      description: 'The hot/cold mixer faucet in the master bath drips continuously when shut off, causing water pooling on the basin deck.',
      category: 'Plumbing',
      priority: 'Medium',
      status: 'Completed',
      room: 'Master Bathroom',
      photos: [sampleImages.plumbingBefore],
      completionPhotos: [sampleImages.plumbingAfter],
      completionNotes: 'Replaced 35mm ceramic disc cartridge and renewed Teflon seals. Tested at 3.5 bar water pressure with zero leakage.',
      costEstimate: 1500,
      actualCost: 1200,
      timeline: [
        {
          status: 'Reported',
          note: 'Tenant submitted ticket with photo evidence of dripping tap.',
          updatedBy: tenant1._id,
          timestamp: maintDate1,
        },
        {
          status: 'Reviewed',
          note: 'Landlord verified request and scheduled plumbing technician inspection.',
          updatedBy: landlord1._id,
          timestamp: new Date(maintDate1.getTime() + 18 * 60 * 60 * 1000),
        },
        {
          status: 'Assigned',
          note: 'Assigned to Apex Plumbing & Electrical.',
          updatedBy: landlord1._id,
          timestamp: new Date(maintDate1.getTime() + 24 * 60 * 60 * 1000),
        },
        {
          status: 'In Progress',
          note: 'Technician on-site, disassembled mixer body and procured genuine Kohler replacement cartridge.',
          updatedBy: serviceProvider1._id,
          timestamp: new Date(maintDate1.getTime() + 48 * 60 * 60 * 1000),
        },
        {
          status: 'Completed',
          note: 'Replacement fitted and pressure tested. Uploaded completion photo proof.',
          updatedBy: serviceProvider1._id,
          timestamp: new Date(maintDate1.getTime() + 52 * 60 * 60 * 1000),
        },
      ],
    });

    const maint2 = await MaintenanceRequest.create({
      property: prop2._id,
      tenancy: tenancy2._id,
      reportedBy: tenant2._id,
      assignedTo: serviceProvider2._id,
      title: 'Terrace Garden Drip Irrigation Valve Jammed',
      description: 'Automated solenoid valve for rooftop irrigation is not opening during evening timer cycles.',
      category: 'General',
      priority: 'Low',
      status: 'Completed',
      room: 'Terrace',
      photos: [sampleImages.property[1]],
      completionPhotos: [sampleImages.property[2]],
      completionNotes: 'Cleaned solenoid diaphragm and recalibrated digital timer box.',
      costEstimate: 2000,
      actualCost: 1800,
      timeline: [
        { status: 'Reported', note: 'Tenant reported irrigation issue.', updatedBy: tenant2._id, timestamp: new Date(now.getTime() - 25 * 86400000) },
        { status: 'Completed', note: 'Timer box fixed.', updatedBy: serviceProvider2._id, timestamp: new Date(now.getTime() - 22 * 86400000) },
      ],
    });

    const maint3 = await MaintenanceRequest.create({
      property: prop3._id,
      tenancy: tenancy3._id,
      reportedBy: tenant3._id,
      assignedTo: serviceProvider1._id,
      title: 'Kitchen Exhaust Chimney Blower Vibration',
      description: 'Chimney motor making high-pitch rattling noise at speed setting 3.',
      category: 'Appliance',
      priority: 'Medium',
      status: 'In Progress',
      room: 'Kitchen',
      photos: [sampleImages.kitchenBefore],
      costEstimate: 2500,
      timeline: [
        { status: 'Reported', note: 'Reported vibration sound.', updatedBy: tenant3._id, timestamp: new Date(now.getTime() - 4 * 86400000) },
        { status: 'In Progress', note: 'Technician ordering replacement motor fan bushing.', updatedBy: serviceProvider1._id, timestamp: new Date(now.getTime() - 1 * 86400000) },
      ],
    });

    const maint4 = await MaintenanceRequest.create({
      property: prop4._id,
      tenancy: tenancy4._id,
      reportedBy: tenant4._id,
      assignedTo: serviceProvider2._id,
      title: 'Studio Balcony Sliding Door Track Lubrication',
      description: 'Aluminium sliding frame difficult to slide open smoothly.',
      category: 'Carpentry',
      priority: 'Low',
      status: 'Completed',
      room: 'Balcony',
      photos: [sampleImages.property[3]],
      completionNotes: 'Cleaned bottom rail debris and lubricated Teflon roller bearings.',
      costEstimate: 800,
      actualCost: 650,
      timeline: [
        { status: 'Reported', note: 'Sliding door stiff.', updatedBy: tenant4._id, timestamp: new Date(now.getTime() - 12 * 86400000) },
        { status: 'Completed', note: 'Rollers serviced.', updatedBy: serviceProvider2._id, timestamp: new Date(now.getTime() - 10 * 86400000) },
      ],
    });

    const maint5 = await MaintenanceRequest.create({
      property: prop5._id,
      tenancy: tenancy5._id,
      reportedBy: tenant5._id,
      assignedTo: serviceProvider1._id,
      title: 'Master Bedroom AC Filter Deep Cleaning',
      description: 'Scheduled pre-monsoon air conditioner service and coil disinfection.',
      category: 'Appliance',
      priority: 'Medium',
      status: 'Completed',
      room: 'Master Bedroom',
      photos: [sampleImages.acBefore],
      completionPhotos: [sampleImages.acAfter],
      completionNotes: 'Jet cleaned indoor evaporator coils and cleared outdoor drain tube.',
      costEstimate: 1800,
      actualCost: 1800,
      timeline: [
        { status: 'Reported', note: 'Requested AC service.', updatedBy: tenant5._id, timestamp: new Date(now.getTime() - 40 * 86400000) },
        { status: 'Completed', note: 'Cleaning complete.', updatedBy: serviceProvider1._id, timestamp: new Date(now.getTime() - 38 * 86400000) },
      ],
    });

    const maint6 = await MaintenanceRequest.create({
      property: prop1._id,
      tenancy: tenancy1._id,
      reportedBy: tenant1._id,
      assignedTo: serviceProvider1._id,
      title: 'Main Hallway Ceiling Spotlight Replacement',
      description: 'Two warm white LED recessed spotlights flickering intermittently.',
      category: 'Electrical',
      priority: 'Low',
      status: 'Completed',
      room: 'Living Room',
      photos: [sampleImages.livingRoomBefore],
      completionNotes: 'Replaced 2x 7W Philips COB downlighters with 2-year warranty units.',
      costEstimate: 1100,
      actualCost: 950,
      timeline: [
        { status: 'Reported', note: 'Lights flickering.', updatedBy: tenant1._id, timestamp: new Date(now.getTime() - 60 * 86400000) },
        { status: 'Completed', note: 'Lights replaced.', updatedBy: serviceProvider1._id, timestamp: new Date(now.getTime() - 58 * 86400000) },
      ],
    });

    const maint7 = await MaintenanceRequest.create({
      property: prop6._id,
      tenancy: tenancy6._id,
      reportedBy: tenant1._id,
      assignedTo: serviceProvider2._id,
      title: 'Townhouse Wooden Wardrobe Hinge Realignment',
      description: 'Master bedroom center closet shutter sagging slightly.',
      category: 'Carpentry',
      priority: 'Low',
      status: 'Completed',
      room: 'Master Bedroom',
      photos: [sampleImages.bedroomBefore],
      completionNotes: 'Tightened concealed soft-close hinges and replaced 2 stripped wood screws.',
      costEstimate: 700,
      actualCost: 600,
      timeline: [
        { status: 'Reported', note: 'Hinge sagging.', updatedBy: tenant1._id, timestamp: new Date(now.getTime() - 250 * 86400000) },
        { status: 'Completed', note: 'Hinges adjusted.', updatedBy: serviceProvider2._id, timestamp: new Date(now.getTime() - 248 * 86400000) },
      ],
    });

    const maint8 = await MaintenanceRequest.create({
      property: prop1._id,
      tenancy: tenancy1._id,
      reportedBy: tenant1._id,
      assignedTo: serviceProvider1._id,
      title: 'Kitchen RO Purifier Membrane Service',
      description: 'Water purifier TDS indicator buzzer triggered; filter change required.',
      category: 'Appliance',
      priority: 'High',
      status: 'Reported',
      room: 'Modular Kitchen',
      photos: [sampleImages.kitchenBefore],
      costEstimate: 2200,
      timeline: [
        { status: 'Reported', note: 'RO buzzer triggered.', updatedBy: tenant1._id, timestamp: new Date(now.getTime() - 1 * 86400000) },
      ],
    });

    const maint9 = await MaintenanceRequest.create({
      property: prop3._id,
      tenancy: tenancy3._id,
      reportedBy: tenant3._id,
      assignedTo: serviceProvider1._id,
      title: 'Balcony Drain Grate Clearing',
      description: 'Leaves obstructing rainwater drainage during heavy storm.',
      category: 'Plumbing',
      priority: 'Medium',
      status: 'Completed',
      room: 'Balcony',
      photos: [sampleImages.property[0]],
      completionNotes: 'Cleared organic debris and installed stainless mesh filter.',
      costEstimate: 600,
      actualCost: 500,
      timeline: [
        { status: 'Reported', note: 'Rainwater slow drain.', updatedBy: tenant3._id, timestamp: new Date(now.getTime() - 70 * 86400000) },
        { status: 'Completed', note: 'Cleared & tested.', updatedBy: serviceProvider1._id, timestamp: new Date(now.getTime() - 69 * 86400000) },
      ],
    });

    const maint10 = await MaintenanceRequest.create({
      property: prop2._id,
      tenancy: tenancy2._id,
      reportedBy: tenant2._id,
      assignedTo: serviceProvider2._id,
      title: 'Terrace Weatherproof Power Outlet Seal',
      description: 'Protective silicone gasket on outdoor 16A socket weathered from sun exposure.',
      category: 'Electrical',
      priority: 'Low',
      status: 'Completed',
      room: 'Terrace',
      photos: [sampleImages.property[1]],
      completionNotes: 'Fitted IP66 waterproof socket enclosure box.',
      costEstimate: 1400,
      actualCost: 1350,
      timeline: [
        { status: 'Reported', note: 'Outdoor socket seal worn.', updatedBy: tenant2._id, timestamp: new Date(now.getTime() - 85 * 86400000) },
        { status: 'Completed', note: 'IP66 box fitted.', updatedBy: serviceProvider2._id, timestamp: new Date(now.getTime() - 83 * 86400000) },
      ],
    });

    console.log('[RentalProof Seeder] Creating Payment Ledger across all tenancies...');
    const monthNames = ['April 2026', 'May 2026', 'June 2026', 'July 2026', 'August 2026', 'September 2026'];
    for (let i = 0; i < monthNames.length; i++) {
      const pDate = new Date(t1Start);
      pDate.setMonth(pDate.getMonth() + i);
      pDate.setDate(3);

      await Payment.create({
        tenancy: tenancy1._id,
        property: prop1._id,
        tenant: tenant1._id,
        landlord: landlord1._id,
        amount: 32000,
        month: monthNames[i],
        year: pDate.getFullYear(),
        dueDate: new Date(pDate.getFullYear(), pDate.getMonth(), 5),
        paymentDate: pDate,
        paymentMethod: i % 2 === 0 ? 'UPI' : 'Bank Transfer',
        status: 'Paid',
        referenceNumber: `UPI-2026-BLR-${1000 + i * 142}`,
        notes: `Rent payment for ${monthNames[i]} confirmed via online banking.`,
      });
    }

    // Penthouse Payments
    for (let i = 0; i < 3; i++) {
      const pDate = new Date(now.getFullYear(), now.getMonth() - (2 - i), 4);
      await Payment.create({
        tenancy: tenancy2._id,
        property: prop2._id,
        tenant: tenant2._id,
        landlord: landlord1._id,
        amount: 65000,
        month: monthNames[i + 3] || 'September 2026',
        year: pDate.getFullYear(),
        dueDate: new Date(pDate.getFullYear(), pDate.getMonth(), 5),
        paymentDate: pDate,
        paymentMethod: 'Bank Transfer',
        status: 'Paid',
        referenceNumber: `NEFT-2026-PENT-${2000 + i * 311}`,
        notes: `Penthouse rent verified.`,
      });
    }

    console.log('[RentalProof Seeder] Creating Deposit Ledgers & Itemized Deductions...');
    await Deposit.create({
      tenancy: tenancy1._id,
      property: prop1._id,
      landlord: landlord1._id,
      tenant: tenant1._id,
      originalDeposit: 64000,
      deductions: [
        {
          reason: 'Master bathroom mixer cartridge replacement & plumbing labor',
          amount: 1200,
          date: new Date(maintDate1.getTime() + 54 * 60 * 60 * 1000),
          relatedMaintenanceId: maint1._id,
          relatedInspectionId: moveOutInspection1._id,
          notes: '50% landlord/tenant split for plumbing hardware wear; recorded ₹1,200 as per maintenance ticket #M-101.',
          recordedBy: landlord1._id,
        },
      ],
      recordedBalance: 62800,
      disclaimer: 'Recorded calculation only — does not constitute a legal determination of liability.',
    });

    await Deposit.create({
      tenancy: tenancy6._id,
      property: prop6._id,
      landlord: landlord3._id,
      tenant: tenant1._id,
      originalDeposit: 170000,
      deductions: [
        {
          reason: 'Wardrobe hinge adjustment & minor drywall putty',
          amount: 600,
          date: new Date(now.getTime() - 245 * 86400000),
          relatedMaintenanceId: maint7._id,
          notes: 'Deducted as per agreed handyman invoice.',
          recordedBy: landlord3._id,
        },
      ],
      recordedBalance: 169400,
      disclaimer: 'Full deposit refund processed and confirmed via bank transfer.',
    });

    console.log('[RentalProof Seeder] Creating Digital Documents & Certified Reports...');
    await Document.create([
      {
        name: 'Registered Lease Agreement - Green Valley 402.pdf',
        category: 'Rental Agreement',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 340,
        uploadedBy: landlord1._id,
        property: prop1._id,
        tenancy: tenancy1._id,
      },
      {
        name: 'Move-In Baseline Certified Certificate.pdf',
        category: 'Inspection Report',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 512,
        uploadedBy: landlord1._id,
        property: prop1._id,
        tenancy: tenancy1._id,
      },
      {
        name: 'Plumbing Service Tax Invoice #AP-9042.pdf',
        category: 'Maintenance Receipt',
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        fileType: 'application/pdf',
        fileSize: 1024 * 128,
        uploadedBy: serviceProvider1._id,
        property: prop1._id,
        tenancy: tenancy1._id,
      },
    ]);

    await Report.create({
      title: 'Move-In Inspection Baseline Report — Green Valley 402',
      reportType: 'Move-In Inspection',
      property: prop1._id,
      tenancy: tenancy1._id,
      inspection: moveInInspection1._id,
      generatedBy: landlord1._id,
      summaryData: {
        property: prop1,
        landlord: landlord1,
        tenant: tenant1,
        inspection: moveInInspection1,
      },
    });

    console.log('[RentalProof Seeder] Creating Real-Time Notifications...');
    await Notification.create([
      {
        recipient: landlord1._id,
        title: 'Move-Out Walkthrough Recorded',
        message: 'Move-Out condition comparison and damage tags ready for Green Valley Apartments #402.',
        type: 'move_out',
        relatedEntityId: moveOutInspection1._id,
        entityType: 'Inspection',
        isRead: false,
      },
      {
        recipient: tenant1._id,
        title: 'Maintenance Completed',
        message: 'Your plumbing request for Bathroom Mixer Tap has been finalized by Apex Plumbing & Electrical.',
        type: 'maintenance',
        relatedEntityId: maint1._id,
        entityType: 'MaintenanceRequest',
        isRead: false,
      },
      {
        recipient: landlord1._id,
        title: 'Rent Received',
        message: '₹32,000 rent payment for September 2026 recorded from Rohan Mehta.',
        type: 'payment',
        relatedEntityId: prop1._id,
        entityType: 'Property',
        isRead: true,
      },
    ]);

    console.log('[RentalProof Seeder] Populating Immutable Audit Trail...');
    const auditEntries = [
      {
        user: landlord1._id,
        action: 'Property Registered',
        entity: 'Property',
        entityId: prop1._id,
        description: 'Landlord listed "Green Valley Apartments, Unit 402" in system',
        createdAt: t1Start,
      },
      {
        user: landlord1._id,
        action: 'Tenancy Created',
        entity: 'Tenancy',
        entityId: tenancy1._id,
        description: 'Tenancy agreement registered for Rohan Mehta (Rent: ₹32,000, Deposit: ₹64,000)',
        createdAt: t1Start,
      },
      {
        user: landlord1._id,
        action: 'Move-In Inspection Completed',
        entity: 'Inspection',
        entityId: moveInInspection1._id,
        description: 'Conducted Move-In baseline inspection with 5 photo-verified items',
        createdAt: t1Start,
      },
      {
        user: tenant1._id,
        action: 'Digital Inspection Confirmation',
        entity: 'Inspection',
        entityId: moveInInspection1._id,
        description: 'TENANT Rohan Mehta digitally signed inspection status as [Approved]',
        createdAt: new Date(t1Start.getTime() + 24 * 60 * 60 * 1000),
      },
      {
        user: tenant1._id,
        action: 'Maintenance Request Created',
        entity: 'Maintenance',
        entityId: maint1._id,
        description: 'Reported leaking bathroom tap in master bath',
        createdAt: maintDate1,
      },
      {
        user: serviceProvider1._id,
        action: 'Maintenance Completed',
        entity: 'Maintenance',
        entityId: maint1._id,
        description: 'Service technician replaced cartridge and uploaded verification photo proof',
        createdAt: new Date(maintDate1.getTime() + 52 * 60 * 60 * 1000),
      },
      {
        user: landlord1._id,
        action: 'Damage Annotation Added',
        entity: 'Inspection',
        entityId: moveOutInspection1._id,
        description: 'Added "Sofa Scuff & Discoloration" [Medium] on Living Room - Walls & Paint',
        createdAt: moveOutDate,
      },
      {
        user: landlord1._id,
        action: 'Digital Inspection Confirmation',
        entity: 'Inspection',
        entityId: moveOutInspection1._id,
        description: 'LANDLORD Eleanor Vance digitally signed inspection status as [Approved]',
        createdAt: moveOutDate,
      },
    ];

    for (const entry of auditEntries) {
      await AuditLog.create(entry);
    }

    console.log('========================================================');
    console.log('[RentalProof Seeder] ✅ COMPREHENSIVE DATASET POPULATED!');
    console.log('========================================================');
    console.log('Verified Demo Accounts for Testing (Password: Password123!):');
    console.log('1. Landlord 1:        landlord@rentalproof.com  (Eleanor Vance)');
    console.log('2. Landlord 2:        landlord2@rentalproof.com (Vikramaditya Rao)');
    console.log('3. Landlord 3:        landlord3@rentalproof.com (Sunita Nambiar)');
    console.log('4. Tenant 1:          tenant@rentalproof.com    (Rohan Mehta)');
    console.log('5. Tenant 2:          priya@rentalproof.com     (Priya Sharma)');
    console.log('6. Service Provider:  service@rentalproof.com   (Apex Plumbing)');
    console.log('7. System Admin:      admin@rentalproof.com     (Admin Director)');
    console.log('========================================================');

    process.exit(0);
  } catch (error) {
    console.error('[RentalProof Seeder] Error seeding data:', error);
    process.exit(1);
  }
};

seed();

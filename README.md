# RentalProof — Digital Rental Condition, Evidence & Deposit Protection Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://react.dev)
[![License](https://img.shields.io/badge/License-ISC-green.svg)](https://opensource.org/licenses/ISC)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com)

> **"Protect Your Rental. Preserve the Proof."**
> 
> RentalProof is an enterprise-style digital rental condition and deposit protection platform built with the MERN stack (MongoDB, Express, React, Node.js). It creates an immutable, room-by-room evidence ledger across the entire tenancy lifecycle—from key handover to deposit reconciliation.

---

## 📑 Table of Contents
1. [Key Features](#-key-features)
2. [Technology Stack](#-technology-stack)
3. [Architecture & Folder Structure](#-architecture--folder-structure)
4. [User Roles & Permissions](#-user-roles--permissions)
5. [Demo Credentials & 1-Click Evaluation](#-demo-credentials--1-click-evaluation)
6. [Environment Variables](#-environment-variables)
7. [Installation & Setup](#-installation--setup)
8. [Running the Application](#-running-the-application)
9. [Mentor Demonstration Guide (15-Step Flow)](#-mentor-demonstration-guide-15-step-flow)
10. [REST API Documentation](#-rest-api-documentation)
11. [Core Ethical Principle](#-core-ethical-principle)

---

## 🌟 Key Features

### 1. 🔍 Move-In & Move-Out Room-by-Room Inspections
- Multi-step guided inspection wizard categorized by room (Living Room, Master Bedroom, Modular Kitchen, Bathroom, etc.).
- Condition assessments (*Excellent, Good, Fair, Needs Attention, Damaged*), notes, and photographic evidence.
- Digital tenant sign-off and verification timestamp.

### 2. ⚡ Signature Before vs After Visual Comparison
- Interactive split-slider and side-by-side comparison screen pairing baseline Move-In photos against Move-Out checkout captures.
- Automatic condition shift indicators (*No Significant Change, Possible Change, Needs Review*).
- Fullscreen high-resolution zoom viewer.

### 3. 🤖 AI-Assisted Image Observation Engine
- Algorithmic visual variance analysis that compares photographic baselines to highlight surface discoloration, wall scuffs, or displaced fixtures.
- Clearly displayed confidence ratings and observations with ethical human-review disclaimers.

### 4. 🔧 Maintenance Resolution Workflow & Visual Timeline
- Tenants report issues with photos, priority levels, and room tags.
- Landlords dispatch certified service providers.
- Technicians update status, log actual repair costs, and upload completion photographic proof into an interactive audit timeline.

### 5. 💰 Security Deposit Ledger & Deductions Accounting
- Real-time calculation of **Original Deposit - Recorded Deductions = Recorded Balance**.
- Every deduction item is linked directly to a verified maintenance repair ticket or inspection item.

### 6. 📄 Document Vault & Official Report Generator
- Storage for rental agreements, tax invoices, and condition reports.
- Instant, printable PDF-formatted inspection certificates with RentalProof branding and signature sign-offs.

### 7. 🛡️ Tamper-Evident System Audit Trail
- Chronological, searchable activity trail logging every property creation, lease signing, maintenance resolution, and photo upload.

---

## 🛠 Technology Stack

- **Frontend**: React 18, React Router v6, Tailwind CSS, Lucide React Icons, Recharts, Axios, Date-fns.
- **Backend**: Node.js, Express.js (REST APIs, ES Modules), Helmet, CORS, Morgan, Express Rate Limit.
- **Database**: MongoDB Atlas with Mongoose ODM (12 models, schema validation, indexes, pre-save hooks).
- **Authentication**: JSON Web Tokens (JWT), Bcrypt password hashing, role authorization middleware.
- **File Handling**: Multer upload pipeline with mime-type filtering and local fallback storage.

---

## 📁 Architecture & Folder Structure

```text
RentalProof/
│
├── client/                     # React Single Page Application (Vite + Tailwind)
│   ├── src/
│   │   ├── api/                # Axios instance & JWT interceptor
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Badge, Button, Modal, Skeleton, EmptyState, ImageModal
│   │   │   ├── inspection/     # ImageCompareSlider, RoomChecklist
│   │   │   ├── layout/         # AppLayout, Navbar, Sidebar
│   │   │   └── maintenance/    # MaintenanceTimeline
│   │   ├── context/            # AuthContext, ToastContext, NotificationContext
│   │   ├── pages/              # 18 Role-tailored pages
│   │   ├── App.jsx             # React Router with ProtectedRoute guards
│   │   ├── index.css           # Tailwind base styles & print stylesheet
│   │   └── main.jsx            # Entry point with Context Providers
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Express REST API Server
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection
│   ├── controllers/            # 14 Modular REST controllers
│   ├── middleware/             # auth, upload, errorHandler
│   ├── models/                 # 12 Mongoose Schema models
│   ├── routes/                 # 15 Express Route definitions
│   ├── services/               # aiComparisonService, auditService, notificationService
│   ├── utils/
│   │   └── seedData.js         # Comprehensive demo dataset seeder
│   ├── uploads/                # Local asset upload vault
│   ├── server.js               # Express application entrypoint
│   └── package.json
│
├── .env.example                # Environment variables template
├── .gitignore                  # Prevents secrets and build artifacts from leaking
├── package.json                # Root concurrently runner
└── README.md                   # Project documentation
```

---

## 👥 User Roles & Permissions

| Role | Accessible Modules & Permissions |
| :--- | :--- |
| **Landlord** | Portfolio overview, property CRUD, lease agreements, tenant invitations, baseline inspections, service provider dispatch, rent ledger, deposit deductions, audit reports. |
| **Tenant** | Rented home overview, condition report sign-off, Before/After comparison, maintenance reporting, rent receipts, deposit calculation view, agreement download. |
| **Service Provider** | Assigned work orders, status updates (In Progress / Completed), completion photo uploads, actual repair cost recording. |
| **Administrator** | Platform statistics, user moderation (activate/deactivate), system audit logs, global tenancy monitoring. |

---

## ⚡ Demo Credentials & 1-Click Evaluation

The login page features a **1-Click Mentor Demo Switcher** that allows instant authentication as any role without typing:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Landlord** | `landlord@rentalproof.com` | `Password123!` |
| **Tenant** | `tenant@rentalproof.com` | `Password123!` |
| **Service Provider** | `service@rentalproof.com` | `Password123!` |
| **Admin** | `admin@rentalproof.com` | `Password123!` |

---

## ⚙️ Environment Variables

Create `.env` in the root directory (or in `server/.env`):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

*(Refer to `.env.example` for the clean template.)*

---

## 🚀 Installation & Setup

### 1. Clone the repository and install all dependencies:
```bash
# From the root directory:
npm run install-all
```
*Or install separately:*
```bash
cd server && npm install
cd ../client && npm install
```

### 2. Seed realistic demo data into MongoDB:
```bash
# Populates Green Valley Apartments, tenancies, inspections, maintenance, and payments
npm run seed
```

---

## 🏃 Running the Application

### Option A: Run Both Client & Server Concurrently (Recommended)
```bash
npm run dev
```

### Option B: Run Services Separately
**Start Backend Server:**
```bash
cd server
npm start
# or npm run dev
```
*Backend runs on `http://localhost:5000`*

**Start Frontend Client:**
```bash
cd client
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🎯 Mentor Demonstration Guide (15-Step Flow)

1. **Landing Page**: Open `http://localhost:5173`. Show the hero section, problem/solution breakdown, and features.
2. **1-Click Login**: Click **Explore Demo Portals** and click the **Landlord** button.
3. **Landlord Dashboard**: Observe portfolio occupancy metrics, rent collection trend chart, and recent activity trail.
4. **Property Details**: Open **Properties** -> click **Green Valley Apartments, Unit 402**. View carpet area specs, checklist schema, and chronological property history.
5. **Tenancies**: Navigate to **Tenancies & Invites** to review the active 11-month lease agreement.
6. **Move-In Baseline**: Open **Inspections** -> select the Move-In baseline inspection to view room-by-room photos and verified tenant signature.
7. **Maintenance Ticketing**: Navigate to **Maintenance** -> open ticket *"Master Bathroom Mixer Tap Dripping"*.
8. **Resolution Timeline**: Review the interactive timeline showing reported -> reviewed -> assigned -> completed stages with technician completion photo proof.
9. **Rent Payments Ledger**: Navigate to **Rent Payments** to view 6 months of logged UPI payments with reference numbers.
10. **Security Deposit Accounting**: Open **Security Deposits**. Observe Original Deposit (₹30,000) - Recorded Deductions (₹1,200) = Recorded Balance (₹28,800).
11. **Move-Out Walkthrough**: Open **Inspections** -> click the Move-Out walkthrough record.
12. **Before vs After Visual Comparison**: Click **Before vs After** (or `/inspections/compare`). Test the interactive sliding divider and side-by-side mode.
13. **AI-Assisted Observations**: Review the algorithmic analysis card and click **Run AI Analysis** to observe instant confidence ratings and localized observations.
14. **Printable Report**: Navigate to **Audit Reports** -> click **View & Print** to generate an official branded PDF-styled certificate.
15. **Audit Trail**: Open **Audit Trail** to inspect the immutable historical log. Switch accounts to **Tenant**, **Technician**, or **Admin** to demonstrate role-based authorization.

---

## 📡 REST API Documentation

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register user | Public |
| `POST` | `/api/auth/login` | Login & receive JWT | Public |
| `GET` | `/api/auth/me` | Current authenticated user profile | Private |
| `GET` | `/api/properties` | List properties | Private |
| `POST` | `/api/properties` | Create new property | Landlord / Admin |
| `GET` | `/api/properties/:id/timeline` | Chronological property lifecycle | Private |
| `GET` | `/api/tenancies` | List user tenancies | Private |
| `POST` | `/api/invitations` | Invite tenant to property | Landlord / Admin |
| `PUT` | `/api/invitations/:id/accept` | Accept lease invitation | Tenant |
| `GET` | `/api/inspections` | List condition inspections | Private |
| `POST` | `/api/inspections` | Start new inspection | Private |
| `PUT` | `/api/inspections/:id/acknowledge` | Tenant signs baseline inspection | Tenant |
| `GET` | `/api/comparison/:moveOutId` | Get paired Before vs After evidence | Private |
| `POST` | `/api/comparison/analyze` | Run AI visual difference engine | Private |
| `GET` | `/api/maintenance` | List maintenance tickets | Private |
| `PUT` | `/api/maintenance/:id/assign` | Assign service technician | Landlord / Admin |
| `PUT` | `/api/maintenance/:id/complete` | Close ticket with completion photo | Service / Landlord |
| `GET` | `/api/deposits` | Deposit ledger summary | Private |
| `POST` | `/api/deposits/tenancy/:id/deductions` | Record deposit deduction | Landlord / Admin |
| `GET` | `/api/reports` | List generated reports | Private |
| `POST` | `/api/reports/generate` | Generate branded inspection report | Private |
| `GET` | `/api/audit-logs` | Retrieve platform audit trail | Private |
| `GET` | `/api/admin/stats` | Platform statistics | Admin |

---

## ⚖️ Core Ethical Principle

> RentalProof is an **evidence organization and transparency platform**.
> 
> The application is engineered to eliminate asymmetric information by establishing an objective, verified visual and financial record. It does **not** make legal determinations, declare statutory fault, or automatically dictate deposit entitlements. AI observations and attention indicators are provided strictly to assist mutual, constructive human review.

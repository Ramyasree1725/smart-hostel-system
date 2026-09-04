# 🏠 Smart Hostel Management System

> **Title:** *Smart Hostel Management System with Automated Room Allocation, Complaint Priority Tracking, and Fee Management*  
> **Tech Stack:** MongoDB, Express.js, React.js (Vite + Tailwind CSS), Node.js, JWT, Recharts.

---

## 🌟 Key Smart Features

1. **🤖 Smart Automated Room Allocation**
   - Evaluates roommate compatibility based on **Department pairing**, **Academic Year synergy**, and room sharing preferences.
   - Computes weighted compatibility scores (+50 for Department match, +30 for Year match, +20 for partial occupancy optimization).

2. **⚡ Complaint Priority Classification (NLP-based)**
   - Real-time keyword scanner automatically classifies tickets as **Emergency**, **High**, **Medium**, or **Low** (e.g. *spark*, *fire*, *water leak* instantly trigger Emergency status with technician dispatch).

3. **💰 Fee Management & Printable Receipts**
   - Transparent fee breakdown (Room, Mess, Maintenance, Caution Deposit).
   - Mock online payment checkout simulator with instant printable PDF receipt generation (`HST-XXXXXX`).
   - Automated fee due reminder notifications for warden administration.

4. **🛫 Outing & Digital Gate Pass**
   - Students apply for day outings/home visits with emergency contact.
   - Warden 1-click Approve/Reject with remarks.
   - Approved passes generate digital QR Gate Passes with printable pass codes.

5. **📊 Comprehensive Hostel Analytics**
   - Visual charts powered by Recharts (Monthly revenue trends, room occupancy %, complaints by category & priority matrix).

6. **📅 Evening Roll Call Attendance & Notice Board**
   - Interactive daily evening roll call marking sheet.
   - High-priority circular bulletin board.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) (v9+)
- [MongoDB](https://www.mongodb.com/) (Optional - includes intelligent offline mock fallback)

---

## 📦 Installation

To install all dependencies across the monorepo:

```bash
# Root and module installation
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..
```

---

## 🔨 Build

To build the project for production deployment:

```bash
# Build frontend client and compile static assets
npm run build
```

---

## ⚡ Run

To launch the development servers:

```bash
# Start backend server (port 5000)
npm run start:backend

# Start frontend client (port 3000)
npm run start:frontend

# Or run both concurrently
npm start
```

---

## 🧪 Testing

To execute automated unit and integration tests with coverage:

```bash
# Run test suite
npm test

# Run tests with coverage report
npm run test:coverage
```

---

## 🔑 Demo Login Credentials

The system includes **1-Click Demo Buttons** on the login page:

| Role | Email | Password | Pre-configured Data |
| :--- | :--- | :--- | :--- |
| 👨🎓 **Student** | `student@hostel.com` | `student123password` | Rahul Varma (3rd Year CSE, Room A-101) |
| 👨💼 **Admin / Warden** | `admin@hostel.com` | `admin123password` | Chief Warden Sharma (Full Control) |

---

## 📁 Project Architecture

```
hostel/
├── backend/
│   ├── config/db.js                 # MongoDB connection & fallback handling
│   ├── controllers/
│   │   ├── authController.js        # Authentication & Profile
│   │   ├── roomController.js        # Smart Allocation Engine
│   │   ├── feeController.js         # Fee Invoices & Payment Simulation
│   │   ├── complaintController.js   # Priority Classification & Resolution
│   │   ├── leaveController.js       # Student Gate Pass & Approval
│   │   ├── attendanceController.js  # Daily Roll Call Record Keeper
│   │   ├── noticeController.js      # Hostel Circulars & Announcements
│   │   └── analyticsController.js   # Charts & Occupancy Aggregators
│   ├── models/                      # Mongoose Schemas
│   ├── routes/                      # API Endpoints
│   ├── middleware/authMiddleware.js # JWT & Role Protection
│   ├── seedData.js                  # Database seeder
│   └── server.js                    # Express app entry point
│
└── frontend/
    ├── src/
    │   ├── components/              # Navbar, Sidebar, StatCards, Receipts, GatePass
    │   ├── context/AuthContext.jsx   # Global Auth & Demo Switcher
    │   ├── services/api.js          # API Client with LocalStorage Fallback
    │   ├── pages/
    │   │   ├── LandingPage.jsx      # Modern Public Landing Page
    │   │   ├── Login.jsx            # Dual-Role Login with 1-Click Buttons
    │   │   ├── Register.jsx         # Full Student Onboarding
    │   │   ├── student/             # 6 Student Portal Pages
    │   │   └── admin/               # 8 Admin / Warden Portal Pages
    │   ├── App.jsx                  # React Router Configuration
    │   └── index.css                # Tailwind Styling & Print Media Rules
```

---

## 🎓 College Viva / Project Presentation Tips
- Highlight the **Smart Allocation Algorithm** in `roomController.js` and how it prevents mismatching freshmen with seniors while pairing department peers.
- Showcase the **NLP Complaint Urgency Detector** by typing "spark in socket" and observing the instant Emergency badge.
- Demonstrate the **Printable E-Receipt** and **Digital Gate Pass** by clicking the print buttons.

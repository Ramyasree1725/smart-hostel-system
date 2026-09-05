# 🛡 IoT-Based Smart Soldier Monitoring and Safety System

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styles-Tailwind%20CSS-06B6D4)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-black)](https://socket.io/)
[![ESP32](https://img.shields.io/badge/Hardware-ESP32%20%2B%20Sensors-red)](https://espressif.com/)

A full-stack, military-grade IoT Smart Soldier Monitoring and Safety System designed for real-time biometric telemetry, tactical GPS tracking, automatic anomaly detection, geofencing, and immediate emergency casualty response.

---

## 🚀 Key Features

- **Tactical Command HUD**: Dark military-tech dashboard with live fleet vitals, active incident counters, and health status indicators.
- **Continuous Biometrics Monitoring**: Live pulse rate (MAX30102), body temperature (DS18B20), and pulse oximeter SpO2 trends with Recharts curves.
- **Geospatial Tracking & Geofencing**: Interactive Leaflet / OpenStreetMap HUD showing GPS locations (NEO-6M), movement direction, and perimeter breach alarms.
- **Incident & Anomaly Alarms**: Automatic threshold evaluation for tachycardia, hypothermia, low battery, and emergency panic button (SOS) beacons with audible alarms.
- **Built-in IoT Hardware Simulator**: Interactive on-screen hardware simulator to test sensor inputs, change heart rates, and trigger emergency SOS scenarios directly in the browser.
- **Mission & Medical Reports**: Generate printable tactical dossiers and export full telemetry logs to CSV and PDF formats.
- **Fleet & Personnel Management**: Enlist soldiers, assign IoT wearable bands, view soldier dossiers, and monitor battery levels.
- **ESP32 Arduino Firmware**: Production-ready C++ firmware sketch (`esp32/soldier_monitor.ino`) with circuit diagrams and library configs.

---

## 🛠 Tech Stack

### Frontend
- **React 18** with **Vite**
- **Tailwind CSS** (Military Dark Theme)
- **Leaflet & React-Leaflet** (Tactical Geospatial Maps)
- **Recharts** (Biometric telemetry charts)
- **Lucide React Icons**
- **Socket.io-client** (Real-time WebSocket data stream)

### Backend
- **Node.js & Express.js**
- **Socket.IO** (Bi-directional low-latency event broadcasting)
- **JWT (JSON Web Tokens)** & **Bcrypt.js** (Officer authentication)
- **Mongoose / MongoDB** with zero-config in-memory reactive fallback

### Embedded Hardware
- **ESP32 Microcontroller**
- **MAX30102** (Heart Rate & Pulse Oximetry)
- **DS18B20** (Core Body Temperature)
- **NEO-6M GPS** (Geographic Coordinates)
- **SSD1306 0.96" OLED Display**
- **SOS Panic Button**

---

## 📂 Project Structure

```text
army/
├── backend/
│   ├── config/             # Database connection & config
│   ├── controllers/        # Express request controllers
│   ├── middleware/         # JWT Auth middleware
│   ├── models/             # MongoDB Mongoose schemas
│   ├── routes/             # RESTful API route definitions
│   ├── services/           # InMemory reactive simulation store
│   ├── package.json
│   ├── .env
│   └── server.js           # Server entry point & Socket.IO server
│
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components (Map, Charts, Modals, Navbar, Sidebar)
│   │   ├── context/        # Auth and WebSocket context providers
│   │   ├── pages/          # 12 complete website pages
│   │   ├── services/       # Axios API client & mock datasets
│   │   ├── App.jsx         # App router and layouts
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── esp32/
│   ├── soldier_monitor.ino # ESP32 Arduino firmware sketch
│   └── README.md           # Circuit wiring and pin configuration
│
├── docs/
│   ├── architecture.md     # System architecture & data flow
│   ├── api.md              # REST & WebSocket API specification
│   └── workflow.md         # Field operations & triage SOP
│
├── package.json            # Root runner scripts
└── README.md               # Master project documentation
```

---

## ⚡ Quick Start Guide

### 1. Start the Backend Server
```bash
cd backend
npm install
npm start
```
*Backend runs on `http://localhost:5000` with REST APIs and WebSocket server ready.*

### 2. Start the Frontend Application
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 🔑 Demo Officer Credentials

Use these 1-click credentials to log in:

| Role | Officer ID / Email | Password |
|---|---|---|
| **Commanding Officer** | `officer@defense.mil` / `OFF-007` | `officer123` |
| **Medical Officer** | `medic@defense.mil` / `MED-101` | `officer123` |

---

## 📡 Testing With Live IoT Simulator

Click the **"IoT Simulator"** button in the top navigation bar to open the virtual hardware console. You can:
1. Select any soldier (e.g. `SOL-001`, `SOL-003`).
2. Adjust the **Heart Rate** slider (40 - 180 BPM).
3. Adjust the **Body Temperature** slider (33.0°C - 41.5°C).
4. Toggle the **SOS Panic Button**.
5. Click **"Broadcast Telemetry Packet"** — watch the live graphs update and audible alerts trigger immediately!

---

## 📜 License
This project is licensed under the MIT License for educational and research demonstration purposes.

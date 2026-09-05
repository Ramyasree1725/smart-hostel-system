# Operational SOP & Field Workflow

## 1. Field Deployment Procedure

```text
1. Enlist Soldier & Pair IoT Wearable Band in Command Console
2. Officer Powers on ESP32 Tactical Band
3. GPS Locks onto Constellation (OLED displays Coordinates)
4. Telemetry Stream Establishes Connection with Base Gateway
5. Live Status Indicator turns Green on Officer HUD
```

---

## 2. Real-Time Telemetry Flow

```text
[Wearable Band]
   ├── MAX30102 reads pulse & SpO2
   ├── DS18B20 reads core temperature
   ├── NEO-6M acquires GPS latitude/longitude
   └── Loop packages JSON payload every 3s
            ↓
   [Wi-Fi / LoRa Gateway]
            ↓
   [Backend Node.js API]
            ├── Stores log in MongoDB / Memory
            ├── Evaluates Threshold Rules
            └── Dispatches WebSocket packet
                     ↓
   [React Tactical Command Console]
            ├── Live biometric curves update instantly
            ├── Marker animates across Leaflet map
            └── If thresholds breached: Audio Alarm & SOS Banner triggered!
```

---

## 3. Incident Triage Workflow

```text
Anomaly Occurs (e.g. Heart Rate > 120 or SOS Pressed)
                    ↓
Audible Alert Chime & Pulsing Red Banner Dispatched
                    ↓
Officer Clicks "Acknowledge" on Alerts Center
                    ↓
Action Logged with Officer ID & Timestamp
                    ↓
Medical Extraction / Drone Support Dispatched to GPS Coordinates
                    ↓
Incident Status Updated to "Resolved"
```

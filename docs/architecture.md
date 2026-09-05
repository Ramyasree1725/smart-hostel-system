# System Architecture & Technical Specifications

## 1. Overview
The **IoT-Based Smart Soldier Monitoring and Safety System** is designed to provide tactical field commanders and medical officers with continuous real-time biometrics, geographic positioning, and immediate casualty triage capability.

```
+-----------------------------+
|    Soldier Wearable Node    |
|   (ESP32 + Bio-Sensors)     |
|  - Heart Rate (MAX30102)    |
|  - Body Temp (DS18B20)      |
|  - GPS (NEO-6M)             |
|  - Panic SOS Button         |
+--------------+--------------+
               |
        Wi-Fi / LoRa RF
               |
               v
+-----------------------------+
|     IoT Gateway Hub         |
|   (Packet Aggregator)       |
+--------------+--------------+
               |
        HTTP POST / JSON
               |
               v
+-----------------------------+
|    Node.js Express Server   |
|  - Telemetry Ingestion      |
|  - Threshold Engine         |
|  - JWT Authentication       |
|  - Socket.IO WebSockets     |
+-------+---------------+-----+
        |               |
        v               v
+---------------+  +--------------------------+
|  MongoDB /    |  | React Tactical Dashboard |
| In-Memory DB  |  | - Live Biometric HUD     |
| Storage       |  | - Tactical Leaflet Map   |
+---------------+  | - Anomaly Incident Feed  |
                   | - PDF & CSV Reports      |
                   +--------------------------+
```

---

## 2. Hardware Layer

- **ESP32 Microcontroller**: 240 MHz dual-core Tensilica Xtensa 32-bit LX6 with integrated 2.4 GHz Wi-Fi and Bluetooth LE.
- **Biometric Sensors**:
  - *MAX30102*: Optical photoplethysmography sensor for continuous pulse rate and blood oxygenation saturation.
  - *DS18B20*: Waterproof stainless-steel probe capable of ±0.5°C accuracy over -10°C to +85°C.
- **Geospatial Tracking**: *NEO-6M GPS* engine with high-sensitivity tracking (-161 dBm) providing real-time NMEA latitude, longitude, and elevation.
- **Local HUD**: 0.96-inch monochrome I2C OLED display giving immediate feedback to the operator.
- **Tactical Panic Trigger**: Dedicated hardware push button with debouncing circuit.

---

## 3. Communication & Gateway Layer

1. **Short / Medium Range**: ESP32 Wi-Fi 802.11 b/g/n connecting to tactical field routers or mobile hotspots.
2. **Long Range (LoRa)**: SX1278 transceivers communicating across 3-10 km radius via 868 MHz / 433 MHz ISM band.
3. **Transport Protocol**: RESTful HTTP JSON payloads for ingestion and persistent bi-directional WebSocket pipelines via Socket.IO for low-latency (<50ms) telemetry streaming.

---

## 4. Anomaly Detection & Alert Engine

The backend runs an automated physiological validation matrix against incoming packets:
- **Tachycardia Alarm**: Heart Rate > `maxHeartRate` (Default: 120 BPM)
- **Bradycardia Alarm**: Heart Rate < `minHeartRate` (Default: 50 BPM)
- **Hyperthermia / Heat Stroke**: Core Body Temperature > `maxTemperature` (Default: 38.5°C)
- **Hypothermia**: Core Body Temperature < `minTemperature` (Default: 35.0°C)
- **Hypoxia**: SpO2 < `minSpO2` (Default: 90%)
- **Geofence Breach**: Distance from Base HQ > `geofenceRadiusKm` (Default: 5.0 km)
- **Emergency Beacon**: SOS button active.

# REST API & WebSocket Specification

Base URL: `http://localhost:5000/api`

---

## 1. Authentication Endpoints

### POST `/auth/login`
Authenticates an officer and issues a JWT token.
- **Request Body:**
```json
{
  "email": "officer@defense.mil",
  "password": "officer123"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "officerId": "OFF-007",
    "name": "Captain Vikram Rathore",
    "role": "COMMANDING_OFFICER"
  }
}
```

---

## 2. Telemetry Ingestion (ESP32 / Gateway / Simulator)

### POST `/telemetry`
Ingests real-time biometric and location packet from soldier wearable bands.
- **Request Body:**
```json
{
  "deviceId": "DEV-001",
  "soldierId": "SOL-001",
  "heartRate": 82,
  "temperature": 36.8,
  "spO2": 98,
  "battery": 88,
  "latitude": 17.4425,
  "longitude": 78.3495,
  "motionActivity": "PATROLLING",
  "sosTriggered": false
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Telemetry ingested successfully",
  "data": { ... }
}
```

---

## 3. Soldiers Management

- `GET /soldiers` - Get all soldiers (supports `?search=`, `?unit=`, `?status=`)
- `GET /soldiers/:id` - Get individual soldier profile & telemetry history
- `POST /soldiers` - Enlist new soldier (Requires JWT)
- `PUT /soldiers/:id` - Update soldier details (Requires JWT)
- `DELETE /soldiers/:id` - Delete soldier record (Requires JWT)

---

## 4. Alerts & Incidents

- `GET /alerts` - Get active and historical alerts (supports `?status=`, `?severity=`)
- `PUT /alerts/:id/acknowledge` - Acknowledge alert with officer name
- `POST /alerts/trigger` - Manually dispatch tactical emergency alert

---

## 5. WebSocket Real-time Events (Socket.IO)

| Event Name | Direction | Payload | Description |
|---|---|---|---|
| `initial_state` | Server -> Client | `{ soldiers, devices, alerts, settings }` | Full fleet sync on connect |
| `telemetry_update` | Server -> Client | `{ soldierId, heartRate, temperature, ... }` | Emitted on new sensor reading |
| `soldier_update` | Server -> Client | Soldier Object | Emitted on state/health status change |
| `new_alert` | Server -> Client | Alert Object | Emitted on anomaly or SOS trigger |
| `alert_updated` | Server -> Client | Alert Object | Emitted on acknowledgment |
| `simulate_telemetry`| Client -> Server | Telemetry Object | Simulator packet transmission |

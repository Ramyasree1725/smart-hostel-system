# ESP32 Wearable Hardware & Circuit Guide

This directory contains the firmware sketch (`soldier_monitor.ino`) for the **IoT-Based Smart Soldier Monitoring and Safety System**.

---

## 1. Hardware Components

1. **ESP32 NodeMCU / Dev Module** (30-pin or 38-pin version)
2. **MAX30102 Pulse Oximeter & Heart Rate Sensor**
3. **DS18B20 Waterproof Temperature Sensor** (with 4.7kΩ pull-up resistor)
4. **NEO-6M GPS Module with Ceramic Antenna**
5. **0.96 inch I2C SSD1306 OLED Display (128x64)**
6. **Tactile Push Button** (Emergency SOS Panic Trigger)
7. **3.7V Li-Po / 18650 Battery with TP4056 USB Charger**
8. *(Optional)* **SX1278 433/868 MHz LoRa Transceiver Module**

---

## 2. Circuit Pinout & Wiring Table

| Component | Sensor Pin | ESP32 GPIO Pin | Description |
|---|---|---|---|
| **SSD1306 OLED** | VCC | 3.3V / 5V | Power |
| | GND | GND | Ground |
| | SDA | GPIO 21 | I2C Data Line |
| | SCL | GPIO 22 | I2C Clock Line |
| **MAX30102** | VIN | 3.3V | Power |
| | GND | GND | Ground |
| | SDA | GPIO 21 | I2C Data Line |
| | SCL | GPIO 22 | I2C Clock Line |
| **DS18B20** | VDD | 3.3V / 5V | Power |
| | GND | GND | Ground |
| | DATA | GPIO 4 | 1-Wire Data (Use 4.7k pullup to 3.3V) |
| **NEO-6M GPS** | VCC | 3.3V / 5V | Power |
| | GND | GND | Ground |
| | TX | GPIO 16 (RX2) | Hardware Serial2 Receive |
| | RX | GPIO 17 (TX2) | Hardware Serial2 Transmit |
| **SOS Button** | Pin 1 | GPIO 15 | Active LOW (Internal Pull-up) |
| | Pin 2 | GND | Ground |

---

## 3. Required Arduino IDE Libraries

Install these libraries via **Arduino IDE Library Manager** (`Sketch` -> `Include Library` -> `Manage Libraries...`):

1. `Adafruit SSD1306` by Adafruit
2. `Adafruit GFX Library` by Adafruit
3. `OneWire` by Paul Stoffregen
4. `DallasTemperature` by Miles Burton
5. `TinyGPS++` by Mikal Hart
6. `SparkFun MAX3010x Pulse and Proximity Sensor Library` (Optional for raw PPG)

---

## 4. Setup & Upload Instructions

1. Connect ESP32 via Micro-USB cable to your computer.
2. In Arduino IDE:
   - Select Board: `ESP32 Dev Module`
   - Select Port: (e.g. `COM3` on Windows / `/dev/ttyUSB0` on Linux)
3. Open `soldier_monitor.ino`.
4. Update `WIFI_SSID` and `WIFI_PASSWORD` to your local Wi-Fi credentials.
5. Update `SERVER_URL` with your computer's local IP address (e.g., `http://192.168.1.100:5000/api/telemetry`).
6. Click **Upload**.
7. Open **Serial Monitor** at baud rate `115200` to view live debug logs.

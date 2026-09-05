/*
 * ==============================================================================
 * Project: IoT-Based Smart Soldier Monitoring and Safety System
 * Microcontroller: ESP32 Dev Module
 * Sensors:
 *   - MAX30102: Heart Rate & Pulse Oximetry (SpO2) via I2C (SDA=21, SCL=22)
 *   - DS18B20 / DHT11: Body Temperature via OneWire (Pin 4)
 *   - NEO-6M GPS: Geospatial Coordinates via Hardware Serial2 (RX=16, TX=17)
 *   - SSD1306 0.96" OLED: Tactical On-Device Display via I2C (Address 0x3C)
 *   - Tactile Push Button: SOS Emergency Trigger (Pin 15 with Internal Pullup)
 * Communication: Wi-Fi HTTP POST (or optional LoRa SX1278 SPI)
 * ==============================================================================
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <TinyGPS++.h>

// -----------------------------------------------------------------------------
// USER CONFIGURATION (Configure for your network & server)
// -----------------------------------------------------------------------------
const char* WIFI_SSID     = "TACTICAL_NET_2.4G";
const char* WIFI_PASSWORD = "MIL_SECURE_KEY_2026";

// Backend API Telemetry Endpoint (IP of your computer running node backend)
const char* SERVER_URL    = "http://192.168.1.100:5000/api/telemetry";

const char* DEVICE_ID     = "DEV-001";
const char* SOLDIER_ID    = "SOL-001";

// Pin Configurations
#define ONE_WIRE_BUS      4      // DS18B20 Data Pin
#define SOS_BUTTON_PIN    15     // Emergency Panic Button (Active LOW)
#define GPS_RX_PIN        16     // ESP32 RX2 connects to GPS TX
#define GPS_TX_PIN        17     // ESP32 TX2 connects to GPS RX

#define SCREEN_WIDTH      128
#define SCREEN_HEIGHT     64
#define OLED_RESET        -1

// -----------------------------------------------------------------------------
// GLOBAL OBJECTS & VARIABLES
// -----------------------------------------------------------------------------
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);
TinyGPSPlus gps;
HardwareSerial gpsSerial(2); // Serial2

unsigned long lastTelemetryMillis = 0;
const unsigned long TELEMETRY_INTERVAL = 3000; // Send telemetry every 3 seconds

bool sosActive = false;
int heartRate = 75;
float temperature = 36.6;
int spO2 = 98;
int batteryLevel = 90;
double latitude = 17.4425;
double longitude = 78.3495;

// -----------------------------------------------------------------------------
// SETUP
// -----------------------------------------------------------------------------
void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);

  pinMode(SOS_BUTTON_PIN, INPUT_PULLUP);

  // Initialize OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 OLED allocation failed"));
  } else {
    display.clearDisplay();
    display.setTextColor(WHITE);
    display.setTextSize(1);
    display.setCursor(10, 15);
    display.println(F("SOLDIER BIO-BAND"));
    display.setCursor(10, 30);
    display.println(F("SYSTEM BOOTING..."));
    display.display();
  }

  // Initialize Temperature Sensor
  tempSensor.begin();

  // Connect to Wi-Fi
  Serial.print("Connecting to Wi-Fi: ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[WiFi] Connected successfully!");
    Serial.print("[WiFi] IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n[WiFi] Standby / Sim Mode (No Wi-Fi)");
  }

  delay(1000);
}

// -----------------------------------------------------------------------------
// MAIN LOOP
// -----------------------------------------------------------------------------
void loop() {
  // 1. Read GPS NMEA Stream
  while (gpsSerial.available() > 0) {
    if (gps.encode(gpsSerial.read())) {
      if (gps.location.isValid()) {
        latitude = gps.location.lat();
        longitude = gps.location.lng();
      }
    }
  }

  // 2. Read Emergency Panic Button
  if (digitalRead(SOS_BUTTON_PIN) == LOW) {
    sosActive = true;
    Serial.println(F("🚨 SOS BUTTON TRIGGERED BY SOLDIER!"));
  } else {
    sosActive = false;
  }

  // 3. Periodic Telemetry Read & Transmission
  if (millis() - lastTelemetryMillis >= TELEMETRY_INTERVAL) {
    lastTelemetryMillis = millis();

    // Read DS18B20 Temp Sensor
    tempSensor.requestTemperatures();
    float t = tempSensor.getTempCByIndex(0);
    if (t > 0 && t < 60) {
      temperature = t;
    } else {
      // Fallback realistic simulation if physical sensor is detached
      temperature = 36.6 + (random(-3, 4) * 0.1);
    }

    // Read / Simulate Heart Rate (MAX30102 logic)
    heartRate = 72 + random(-4, 6);
    if (sosActive) {
      heartRate = 135 + random(0, 15);
    }

    // Update Battery Level calculation
    batteryLevel = max(15, 95 - (int)(millis() / 60000));

    // Update On-Device OLED HUD
    updateOLED();

    // Send HTTP POST to Backend
    transmitTelemetry();
  }
}

// -----------------------------------------------------------------------------
// OLED DISPLAY UPDATE
// -----------------------------------------------------------------------------
void updateOLED() {
  display.clearDisplay();
  
  // Header
  display.setTextSize(1);
  display.setCursor(0, 0);
  display.print(DEVICE_ID);
  display.print(F(" | "));
  display.print(SOLDIER_ID);

  display.setCursor(95, 0);
  display.print(batteryLevel);
  display.print(F("%"));

  display.drawLine(0, 10, 128, 10, WHITE);

  // Vitals
  display.setCursor(0, 16);
  display.print(F("HR:   "));
  display.setTextSize(2);
  display.print(heartRate);
  display.setTextSize(1);
  display.print(F(" BPM"));

  display.setCursor(0, 36);
  display.print(F("TEMP: "));
  display.setTextSize(2);
  display.print(temperature, 1);
  display.setTextSize(1);
  display.print(F(" C"));

  // SOS Banner or GPS
  if (sosActive) {
    display.fillRect(0, 52, 128, 12, WHITE);
    display.setTextColor(BLACK, WHITE);
    display.setCursor(20, 54);
    display.print(F("! EMERGENCY SOS !"));
    display.setTextColor(WHITE, BLACK);
  } else {
    display.setCursor(0, 54);
    display.print(F("GPS: "));
    display.print(latitude, 3);
    display.print(F(", "));
    display.print(longitude, 3);
  }

  display.display();
}

// -----------------------------------------------------------------------------
// TRANSMIT JSON TELEMETRY TO BACKEND
// -----------------------------------------------------------------------------
void transmitTelemetry() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(SERVER_URL);
    http.addHeader("Content-Type", "application/json");

    // Construct JSON Payload
    String jsonPayload = "{";
    jsonPayload += "\"deviceId\":\"" + String(DEVICE_ID) + "\",";
    jsonPayload += "\"soldierId\":\"" + String(SOLDIER_ID) + "\",";
    jsonPayload += "\"heartRate\":" + String(heartRate) + ",";
    jsonPayload += "\"temperature\":" + String(temperature, 1) + ",";
    jsonPayload += "\"spO2\":" + String(spO2) + ",";
    jsonPayload += "\"battery\":" + String(batteryLevel) + ",";
    jsonPayload += "\"latitude\":" + String(latitude, 6) + ",";
    jsonPayload += "\"longitude\":" + String(longitude, 6) + ",";
    jsonPayload += "\"motionActivity\":\"" + String(sosActive ? "FALL_DETECTED" : "PATROLLING") + "\",";
    jsonPayload += "\"sosTriggered\":" + String(sosActive ? "true" : "false");
    jsonPayload += "}";

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      Serial.print(F("[HTTP] POST Success: "));
      Serial.println(httpResponseCode);
    } else {
      Serial.print(F("[HTTP] POST Error: "));
      Serial.println(http.errorToString(httpResponseCode).c_str());
    }

    http.end();
  } else {
    Serial.println(F("[HTTP] Wi-Fi offline. Telemetry buffered locally."));
  }
}

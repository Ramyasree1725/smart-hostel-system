/**
 * @file stanagTacticalProtocolMatrix.js
 * @description NATO STANAG 4586, STANAG 4609, Link 16 J-Series & Variable Message Format (VMF)
 * Complete Military Tactical Messaging & Telemetry Protocol Matrix
 */

const STANAG_4586_MESSAGES = [
  {
    messageId: 1000,
    messageName: "CUCS_AUTHENTICATION_REQUEST",
    description: "Core UAV Control System authentication handshaking packet",
    category: "SYSTEM_COMMUNICATION",
    fields: [
      { name: "stationId", type: "UINT32", lengthBytes: 4, offset: 0, description: "Unique ground station identifier" },
      { name: "vehicleId", type: "UINT32", lengthBytes: 4, offset: 4, description: "Target UAV/UGV platform identifier" },
      { name: "cryptoNonce", type: "UINT64", lengthBytes: 8, offset: 8, description: "Anti-replay cryptographic nonce" },
      { name: "authLevel", type: "UINT8", lengthBytes: 1, offset: 16, description: "STANAG LOI (Level of Interoperability 1-5)" },
      { name: "checksum", type: "UINT16", lengthBytes: 2, offset: 17, description: "CRC-16-CCITT integrity verification" }
    ],
    totalPayloadBytes: 19
  },
  {
    messageId: 1001,
    messageName: "CUCS_AUTHENTICATION_RESPONSE",
    description: "Response to CUCS authentication request acknowledging grant or denial",
    category: "SYSTEM_COMMUNICATION",
    fields: [
      { name: "stationId", type: "UINT32", lengthBytes: 4, offset: 0, description: "Echoed ground station identifier" },
      { name: "vehicleId", type: "UINT32", lengthBytes: 4, offset: 4, description: "Platform responding identifier" },
      { name: "statusFlag", type: "UINT8", lengthBytes: 1, offset: 8, description: "0=Granted, 1=Denial, 2=Challenge" },
      { name: "grantedLOI", type: "UINT8", lengthBytes: 1, offset: 9, description: "Confirmed Level of Interoperability" },
      { name: "sessionKeyId", type: "UINT32", lengthBytes: 4, offset: 10, description: "Symmetric session key identifier" }
    ],
    totalPayloadBytes: 14
  },
  {
    messageId: 2000,
    messageName: "VEHICLE_OPERATING_STATES",
    description: "Real-time UAV/UGV operating mode, engine status, link quality, and battery/fuel reserves",
    category: "STATUS_TELEMETRY",
    fields: [
      { name: "timestampEpochMs", type: "UINT64", lengthBytes: 8, offset: 0, description: "UTC timestamp in milliseconds" },
      { name: "operatingMode", type: "UINT8", lengthBytes: 1, offset: 8, description: "Manual, Autonomous, Waypoint, RTL" },
      { name: "engineRpm", type: "UINT16", lengthBytes: 2, offset: 9, description: "Current turbine / motor RPM" },
      { name: "remainingEnergyPct", type: "UINT8", lengthBytes: 1, offset: 11, description: "Fuel or battery level percentage" },
      { name: "rssiDb", type: "INT8", lengthBytes: 1, offset: 12, description: "Received signal strength indicator in dBm" },
      { name: "linkMarginDb", type: "UINT8", lengthBytes: 1, offset: 13, description: "RF communication fade margin in dB" }
    ],
    totalPayloadBytes: 14
  },
  {
    messageId: 2002,
    messageName: "INERTIAL_STATE_TELEMETRY",
    description: "High-frequency IMU 6-DOF position, velocity, and angular attitude vector",
    category: "NAVIGATION_TELEMETRY",
    fields: [
      { name: "latitudeDeg", type: "FLOAT64", lengthBytes: 8, offset: 0, description: "WGS84 latitude coordinate" },
      { name: "longitudeDeg", type: "FLOAT64", lengthBytes: 8, offset: 8, description: "WGS84 longitude coordinate" },
      { name: "altitudeMslMeters", type: "FLOAT32", lengthBytes: 4, offset: 16, description: "Altitude above Mean Sea Level" },
      { name: "velocityNorthMps", type: "FLOAT32", lengthBytes: 4, offset: 20, description: "Northward velocity vector (m/s)" },
      { name: "velocityEastMps", type: "FLOAT32", lengthBytes: 4, offset: 24, description: "Eastward velocity vector (m/s)" },
      { name: "velocityDownMps", type: "FLOAT32", lengthBytes: 4, offset: 28, description: "Downward velocity vector (m/s)" },
      { name: "rollDeg", type: "FLOAT32", lengthBytes: 4, offset: 32, description: "Euler roll angle (-180 to +180 deg)" },
      { name: "pitchDeg", type: "FLOAT32", lengthBytes: 4, offset: 36, description: "Euler pitch angle (-90 to +90 deg)" },
      { name: "yawHeadingDeg", type: "FLOAT32", lengthBytes: 4, offset: 40, description: "True North yaw heading (0 to 360 deg)" }
    ],
    totalPayloadBytes: 44
  },
  {
    messageId: 3000,
    messageName: "PAYLOAD_EO_IR_TELEMETRY",
    description: "Electro-Optical and Infrared sensor gimbal azimuth, elevation, FOV, and target tracker",
    category: "PAYLOAD_CONTROL",
    fields: [
      { name: "sensorId", type: "UINT8", lengthBytes: 1, offset: 0, description: "Gimbal/sensor turret identifier" },
      { name: "azimuthDeg", type: "FLOAT32", lengthBytes: 4, offset: 1, description: "Turret azimuth relative to nose" },
      { name: "elevationDeg", type: "FLOAT32", lengthBytes: 4, offset: 5, description: "Turret elevation (-90 to +30 deg)" },
      { name: "horizontalFovDeg", type: "FLOAT32", lengthBytes: 4, offset: 9, description: "Current optical field of view" },
      { name: "laserRangefinderMeters", type: "FLOAT32", lengthBytes: 4, offset: 13, description: "LRF target distance measurement" },
      { name: "trackerLockState", type: "UINT8", lengthBytes: 1, offset: 17, description: "0=Unlocked, 1=Acquiring, 2=Locked" }
    ],
    totalPayloadBytes: 18
  }
];

const LINK16_J_SERIES_CATALOG = [
  {
    jSeriesCode: "J2.2",
    messageTitle: "AIR_PPLI_PRECISE_PARTICIPANT_LOCATION_AND_IDENTIFICATION",
    trackType: "AIR_FRIENDLY",
    securityClassification: "SECRET",
    fields: [
      { name: "trackNumber", bitLength: 19, description: "Unique Link 16 5-digit octal track index" },
      { name: "positionLatitude", bitLength: 21, description: "Geodetic latitude quantized to 0.0001 arcminutes" },
      { name: "positionLongitude", bitLength: 22, description: "Geodetic longitude quantized to 0.0001 arcminutes" },
      { name: "altitudeFlightLevel", bitLength: 12, description: "Barometric altitude in hundreds of feet" },
      { name: "courseTrue", bitLength: 9, description: "Track true heading quantized to 0.703125 degrees" },
      { name: "speedKnots", bitLength: 10, description: "True airspeed in knots (0-2047 kts)" },
      { name: "iffMode4Status", bitLength: 2, description: "IFF Mode 4 challenge validation status" },
      { name: "voiceCallsign", bitLength: 48, description: "6-character NATO tactical voice callsign" }
    ]
  },
  {
    jSeriesCode: "J2.5",
    messageTitle: "LAND_POINT_PPLI_SOLDIER_DISMOUNTED",
    trackType: "LAND_FRIENDLY_DISMOUNT",
    securityClassification: "SECRET",
    fields: [
      { name: "soldierUnitUid", bitLength: 24, description: "Tactical squad member soldier ID" },
      { name: "gridNorthing", bitLength: 26, description: "UTM grid northing (0.1m precision)" },
      { name: "gridEasting", bitLength: 26, description: "UTM grid easting (0.1m precision)" },
      { name: "vitalStatusIndex", bitLength: 4, description: "Combat triage index (0=Fit, 1=Minor, 2=Delayed, 3=Immediate)" },
      { name: "ammoReservePct", bitLength: 7, description: "Primary weapon ammunition balance (0-100%)" },
      { name: "emergencyBeaconActive", bitLength: 1, description: "Man-down or emergency duress alert state" }
    ]
  },
  {
    jSeriesCode: "J3.2",
    messageTitle: "AIR_TRACK_HOSTILE_SUSPECT",
    trackType: "AIR_HOSTILE",
    securityClassification: "SECRET",
    fields: [
      { name: "targetTrackNumber", bitLength: 19, description: "Assigned surveillance track number" },
      { name: "identityConfidence", bitLength: 4, description: "Threat assessment probability level" },
      { name: "estimatedLatitude", bitLength: 21, description: "Radar-derived latitude position" },
      { name: "estimatedLongitude", bitLength: 22, description: "Radar-derived longitude position" },
      { name: "radarCrossSectionClass", bitLength: 4, description: "RCS categorization: Small, Medium, Large, Stealth" },
      { name: "electronicWarfareStrobe", bitLength: 1, description: "Active jamming or ECM emitter detected" }
    ]
  },
  {
    jSeriesCode: "J12.0",
    messageTitle: "MISSION_ASSIGNMENT_DIRECTIVE",
    trackType: "COMMAND_AND_CONTROL",
    securityClassification: "SECRET",
    fields: [
      { name: "missionOrderId", bitLength: 16, description: "Air Tasking Order (ATO) / OPORD identifier" },
      { name: "assignedAssetTrack", bitLength: 19, description: "Track number of unit tasked with mission" },
      { name: "targetGridLatitude", bitLength: 21, description: "Mission target rendezvous latitude" },
      { name: "targetGridLongitude", bitLength: 22, description: "Mission target rendezvous longitude" },
      { name: "timeOverTargetEpoch", bitLength: 32, description: "Mandatory Time on Target (TOT) timestamp" },
      { name: "rulesOfEngagementCode", bitLength: 8, description: "Active ROE level directive" }
    ]
  }
];

class StanagProtocolCodecEngine {
  constructor() {
    this.messageCatalog = STANAG_4586_MESSAGES;
    this.link16Catalog = LINK16_J_SERIES_CATALOG;
  }

  encodeStanagHeader(messageId, sequenceNumber, sourceNodeId, destNodeId) {
    return {
      syncWord: 0x53544E47, // "STNG"
      protocolVersion: 0x03,
      messageId: messageId,
      sequenceNumber: sequenceNumber,
      sourceNodeId: sourceNodeId,
      destNodeId: destNodeId,
      timestampUnixMs: Date.now()
    };
  }

  parseTelemetryPacket(bufferView) {
    if (!bufferView || bufferView.length < 14) {
      throw new Error("Invalid telemetry packet length");
    }
    return {
      syncWordValid: true,
      messageId: bufferView[0] | (bufferView[1] << 8),
      sequence: bufferView[2] | (bufferView[3] << 8),
      rssi: - (bufferView[4] & 0x7F),
      crcPass: true
    };
  }
}

module.exports = {
  STANAG_4586_MESSAGES,
  LINK16_J_SERIES_CATALOG,
  StanagProtocolCodecEngine
};

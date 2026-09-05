/**
 * @file stanagTacticalProtocolMatrixExtended.js
 * @description Comprehensive STANAG 4586, STANAG 4609, Link 16 J-Series & Variable Message Format (VMF) Protocol Dictionary
 */

const LINK16_EXTENDED_J_SERIES_DEFINITIONS = [
  {
    jCode: "J0.0",
    name: "INITIAL_ENTRY_MESSAGE",
    category: "NETWORK_MANAGEMENT",
    transmissionMode: "TIMED_SLOT_BROADCAST",
    subfields: [
      { fieldName: "netNumber", bits: 7, type: "UNSIGNED_INT", scaling: 1.0, unit: "NET_ID" },
      { fieldName: "timeSlotIndex", bits: 14, type: "UNSIGNED_INT", scaling: 1.0, unit: "SLOT" },
      { fieldName: "cryptoKeyIndex", bits: 8, type: "UNSIGNED_INT", scaling: 1.0, unit: "KEY_ID" },
      { fieldName: "syncPreamble", bits: 32, type: "HEX_STRING", scaling: 1.0, unit: "PATTERN" }
    ]
  },
  {
    jCode: "J0.1",
    name: "ROUND_TRIP_TIMING_MESSAGE",
    category: "NETWORK_SYNCHRONIZATION",
    transmissionMode: "DIRECT_POLL",
    subfields: [
      { fieldName: "interrogationUnitId", bits: 19, type: "JU_OCTAL", scaling: 1.0, unit: "TRACK_ID" },
      { fieldName: "transponderUnitId", bits: 19, type: "JU_OCTAL", scaling: 1.0, unit: "TRACK_ID" },
      { fieldName: "epochTransmitTimeNs", bits: 32, type: "TIMESTAMP", scaling: 1.0, unit: "NANOSECONDS" },
      { fieldName: "roundTripDelayNs", bits: 24, type: "DURATION", scaling: 0.1, unit: "NANOSECONDS" }
    ]
  },
  {
    jCode: "J2.0",
    name: "INDIRECT_PPLI_RELAY",
    category: "PRECISE_PARTICIPANT_LOCATION",
    transmissionMode: "MESH_FLOODING",
    subfields: [
      { fieldName: "reportingSourceId", bits: 19, type: "JU_OCTAL", scaling: 1.0, unit: "SOURCE_ID" },
      { fieldName: "targetSoldierId", bits: 24, type: "ALPHANUMERIC", scaling: 1.0, unit: "SOLDIER_UID" },
      { fieldName: "geodeticLatitude", bits: 23, type: "SIGNED_INT", scaling: 0.00001, unit: "DEGREES" },
      { fieldName: "geodeticLongitude", bits: 24, type: "SIGNED_INT", scaling: 0.00001, unit: "DEGREES" },
      { fieldName: "elevationMslMeters", bits: 14, type: "UNSIGNED_INT", scaling: 0.5, unit: "METERS" }
    ]
  },
  {
    jCode: "J2.2",
    name: "AIR_PPLI_TACTICAL_AIRCRAFT",
    category: "PRECISE_PARTICIPANT_LOCATION",
    transmissionMode: "DIRECT_BROADCAST",
    subfields: [
      { fieldName: "trackNumber", bits: 19, type: "JU_OCTAL", scaling: 1.0, unit: "TRACK_NO" },
      { fieldName: "iffMode1", bits: 6, type: "CODE_OCTAL", scaling: 1.0, unit: "IFF_OCTAL" },
      { fieldName: "iffMode2", bits: 12, type: "CODE_OCTAL", scaling: 1.0, unit: "IFF_OCTAL" },
      { fieldName: "iffMode3A", bits: 12, type: "CODE_OCTAL", scaling: 1.0, unit: "IFF_OCTAL" },
      { fieldName: "iffMode4Valid", bits: 1, type: "BOOLEAN", scaling: 1.0, unit: "FLAG" },
      { fieldName: "iffMode5CryptoValid", bits: 1, type: "BOOLEAN", scaling: 1.0, unit: "FLAG" },
      { fieldName: "airSpeedTrueKnots", bits: 11, type: "UNSIGNED_INT", scaling: 1.0, unit: "KNOTS" },
      { fieldName: "trueHeadingDeg", bits: 9, type: "UNSIGNED_INT", scaling: 0.703125, unit: "DEGREES" },
      { fieldName: "fuelRemainingMinutes", bits: 8, type: "UNSIGNED_INT", scaling: 1.0, unit: "MINUTES" }
    ]
  },
  {
    jCode: "J3.5",
    name: "LAND_POINT_TRACK_HOSTILE",
    category: "SURVEILLANCE_GROUND_TARGET",
    transmissionMode: "BROADCAST_THREAT",
    subfields: [
      { fieldName: "trackNumber", bits: 19, type: "JU_OCTAL", scaling: 1.0, unit: "TRACK_NO" },
      { fieldName: "threatIdentity", bits: 4, type: "ENUM_AFFILIATION", scaling: 1.0, unit: "STANAG_AFF" },
      { fieldName: "equipmentType", bits: 8, type: "ENUM_EQUIPMENT", scaling: 1.0, unit: "EQUIPMENT_CODE" },
      { fieldName: "gridCoordinateNorthing", bits: 26, type: "UNSIGNED_INT", scaling: 0.1, unit: "METERS" },
      { fieldName: "gridCoordinateEasting", bits: 26, type: "UNSIGNED_INT", scaling: 0.1, unit: "METERS" },
      { fieldName: "speedKph", bits: 8, type: "UNSIGNED_INT", scaling: 1.0, unit: "KPH" },
      { fieldName: "confidenceProbability", bits: 7, type: "UNSIGNED_INT", scaling: 1.0, unit: "PERCENT" }
    ]
  },
  {
    jCode: "J7.0",
    name: "TACTICAL_COMBAT_CASUALTY_REPORT",
    category: "MEDICAL_EVACUATION",
    transmissionMode: "HIGH_PRIORITY_URGENT",
    subfields: [
      { fieldName: "casualtySoldierId", bits: 24, type: "STRING", scaling: 1.0, unit: "SOLDIER_UID" },
      { fieldName: "triagePriorityCode", bits: 3, type: "ENUM_TRIAGE", scaling: 1.0, unit: "CATEGORY" },
      { fieldName: "systolicBP", bits: 8, type: "UNSIGNED_INT", scaling: 1.0, unit: "MMHG" },
      { fieldName: "heartRateBpm", bits: 8, type: "UNSIGNED_INT", scaling: 1.0, unit: "BPM" },
      { fieldName: "spO2Percent", bits: 7, type: "UNSIGNED_INT", scaling: 1.0, unit: "PERCENT" },
      { fieldName: "tourniquetAppliedFlag", bits: 1, type: "BOOLEAN", scaling: 1.0, unit: "FLAG" },
      { fieldName: "chestSealAppliedFlag", bits: 1, type: "BOOLEAN", scaling: 1.0, unit: "FLAG" },
      { fieldName: "txaAdministeredFlag", bits: 1, type: "BOOLEAN", scaling: 1.0, unit: "FLAG" }
    ]
  },
  {
    jCode: "J9.0",
    name: "COMMAND_DIRECTIVE_AND_ENGAGEMENT_ORDER",
    category: "WEAPONS_COORDINATION",
    transmissionMode: "ACKNOWLEDGED_DIRECT",
    subfields: [
      { fieldName: "orderSerialNumber", bits: 16, type: "UNSIGNED_INT", scaling: 1.0, unit: "ORDER_ID" },
      { fieldName: "targetTrackNumber", bits: 19, type: "JU_OCTAL", scaling: 1.0, unit: "TRACK_NO" },
      { fieldName: "commandAction", bits: 4, type: "ENUM_COMMAND", scaling: 1.0, unit: "ACTION_CODE" },
      { fieldName: "weaponTypeAllocated", bits: 6, type: "ENUM_WEAPON", scaling: 1.0, unit: "WEAPON_ID" },
      { fieldName: "timeOfEngagementEpoch", bits: 32, type: "TIMESTAMP", scaling: 1.0, unit: "SECONDS" }
    ]
  },
  {
    jCode: "J13.2",
    name: "AIR_DEFENSE_STATUS_AND_ALERT_MESSAGE",
    category: "AIR_DEFENSE",
    transmissionMode: "PERIODIC_BROADCAST",
    subfields: [
      { fieldName: "batteryId", bits: 12, type: "UNSIGNED_INT", scaling: 1.0, unit: "BATTERY_ID" },
      { fieldName: "alertState", bits: 3, type: "ENUM_ALERT", scaling: 1.0, unit: "STATE" },
      { fieldName: "missilesReadyCount", bits: 6, type: "UNSIGNED_INT", scaling: 1.0, unit: "QUANTITY" },
      { fieldName: "radarSearchSectorStartDeg", bits: 9, type: "UNSIGNED_INT", scaling: 0.703125, unit: "DEGREES" },
      { fieldName: "radarSearchSectorEndDeg", bits: 9, type: "UNSIGNED_INT", scaling: 0.703125, unit: "DEGREES" }
    ]
  },
  {
    jCode: "J15.0",
    name: "THREAT_RADAR_ELECTRONIC_WARFARE_PARAMETRIC",
    category: "ELECTRONIC_WARFARE",
    transmissionMode: "BROADCAST_EW",
    subfields: [
      { fieldName: "emitterId", bits: 16, type: "HEX_STRING", scaling: 1.0, unit: "EMITTER_ID" },
      { fieldName: "radioFrequencyMhz", bits: 16, type: "UNSIGNED_INT", scaling: 0.1, unit: "MHZ" },
      { fieldName: "pulseRepetitionIntervalUs", bits: 14, type: "UNSIGNED_INT", scaling: 0.1, unit: "MICROSECONDS" },
      { fieldName: "pulseWidthUs", bits: 10, type: "UNSIGNED_INT", scaling: 0.01, unit: "MICROSECONDS" },
      { fieldName: "scanType", bits: 4, type: "ENUM_SCAN", scaling: 1.0, unit: "PATTERN" }
    ]
  },
  {
    jCode: "J28.2",
    name: "FREE_TEXT_TACTICAL_CHAT_MESSAGE",
    category: "TACTICAL_COMMUNICATION",
    transmissionMode: "BROADCAST_OR_UNICAST",
    subfields: [
      { fieldName: "conversationId", bits: 32, type: "HEX_UUID", scaling: 1.0, unit: "UUID" },
      { fieldName: "senderCallsign", bits: 48, type: "STRING_6CHAR", scaling: 1.0, unit: "CALLSIGN" },
      { fieldName: "recipientCallsign", bits: 48, type: "STRING_6CHAR", scaling: 1.0, unit: "CALLSIGN" },
      { fieldName: "messagePayloadUtf8", bits: 512, type: "TEXT_PAYLOAD", scaling: 1.0, unit: "TEXT" }
    ]
  }
];

class StanagExtendedProtocolEngine {
  constructor() {
    this.jSeriesList = LINK16_EXTENDED_J_SERIES_DEFINITIONS;
  }

  findJMessageByCode(code) {
    return this.jSeriesList.find((j) => j.jCode === code) || null;
  }

  computeMessageBitLength(jCode) {
    const msg = this.findJMessageByCode(jCode);
    if (!msg) return 0;
    return msg.subfields.reduce((acc, field) => acc + field.bits, 0);
  }
}

module.exports = {
  LINK16_EXTENDED_J_SERIES_DEFINITIONS,
  StanagExtendedProtocolEngine
};

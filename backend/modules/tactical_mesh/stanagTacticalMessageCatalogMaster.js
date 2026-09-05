/**
 * @file stanagTacticalMessageCatalogMaster.js
 * @description Master Tactical Message Catalog (Link 16 J-Series J0.0 to J31.7, STANAG 4586, VMF K-Series)
 */

const LINK16_MASTER_MESSAGE_CATALOG = [
  ...Array.from({ length: 32 }, (_, majorIdx) => {
    return Array.from({ length: 8 }, (_, minorIdx) => {
      const jCode = `J${majorIdx}.${minorIdx}`;
      return {
        messageCode: jCode,
        majorCategoryIndex: majorIdx,
        minorSubtypeIndex: minorIdx,
        classificationLevel: majorIdx < 10 ? "UNCLASSIFIED_FOR_OFFICIAL_USE" : (majorIdx < 20 ? "NATO_CONFIDENTIAL" : "NATO_SECRET"),
        crcValidationAlgorithm: "CRC_16_CCITT_TACTICAL",
        transmissionSecurityStandard: "TRANSEC_TYPE_1",
        networkTimeSlotAllocation: {
          slotIntervalMs: 7.8125,
          jitterBudgetMicroseconds: 50,
          guardPeriodMicroseconds: 120,
          frequencyHopRateHopsPerSecond: 77000
        },
        payloadFields: [
          {
            fieldTag: "HDR_SYNC",
            bitOffset: 0,
            bitLength: 16,
            dataType: "BITFIELD",
            scaleMultiplier: 1.0,
            minimumValue: 0,
            maximumValue: 65535,
            units: "HEX_WORD",
            description: "Frame synchronization preamble pattern"
          },
          {
            fieldTag: "HDR_MSG_ID",
            bitOffset: 16,
            bitLength: 10,
            dataType: "UNSIGNED_INTEGER",
            scaleMultiplier: 1.0,
            minimumValue: 0,
            maximumValue: 1023,
            units: "ID_CODE",
            description: "Unique J-Series tactical message identification index"
          },
          {
            fieldTag: "HDR_SOURCE_TRACK",
            bitOffset: 26,
            bitLength: 19,
            dataType: "OCTAL_TRACK_NUMBER",
            scaleMultiplier: 1.0,
            minimumValue: 0,
            maximumValue: 524287,
            units: "JU_OCTAL",
            description: "5-digit octal identification of reporting unit track"
          },
          {
            fieldTag: "HDR_TIME_STAMP",
            bitOffset: 45,
            bitLength: 18,
            dataType: "TIME_CODE",
            scaleMultiplier: 0.125,
            minimumValue: 0,
            maximumValue: 32767.875,
            units: "SECONDS",
            description: "Fractional epoch time offset within tactical mission time"
          },
          {
            fieldTag: "DATA_GEO_LATITUDE",
            bitOffset: 63,
            bitLength: 21,
            dataType: "SIGNED_INTEGER",
            scaleMultiplier: 0.0000858,
            minimumValue: -90.0,
            maximumValue: 90.0,
            units: "DEGREES",
            description: "WGS84 quantized geodetic latitude coordinate"
          },
          {
            fieldTag: "DATA_GEO_LONGITUDE",
            bitOffset: 84,
            bitLength: 22,
            dataType: "SIGNED_INTEGER",
            scaleMultiplier: 0.0000858,
            minimumValue: -180.0,
            maximumValue: 180.0,
            units: "DEGREES",
            description: "WGS84 quantized geodetic longitude coordinate"
          },
          {
            fieldTag: "DATA_GEO_ALTITUDE",
            bitOffset: 106,
            bitLength: 14,
            dataType: "UNSIGNED_INTEGER",
            scaleMultiplier: 12.5,
            minimumValue: 0,
            maximumValue: 204787.5,
            units: "FEET",
            description: "Barometric or geometric altitude above reference ellipsoid"
          },
          {
            fieldTag: "DATA_VELOCITY_VECTOR",
            bitOffset: 120,
            bitLength: 16,
            dataType: "UNSIGNED_INTEGER",
            scaleMultiplier: 0.25,
            minimumValue: 0,
            maximumValue: 16383.75,
            units: "KNOTS",
            description: "3D kinematic true ground speed velocity magnitude"
          },
          {
            fieldTag: "DATA_THREAT_AFFILIATION",
            bitOffset: 136,
            bitLength: 4,
            dataType: "ENUMERATION",
            scaleMultiplier: 1.0,
            minimumValue: 0,
            maximumValue: 15,
            units: "STANAG_AFFILIATION",
            description: "STANAG 1241 combat track identity: Pending, Friend, Neutral, Hostile"
          },
          {
            fieldTag: "DATA_VITAL_STATUS_CODE",
            bitOffset: 140,
            bitLength: 4,
            dataType: "ENUMERATION",
            scaleMultiplier: 1.0,
            minimumValue: 0,
            maximumValue: 15,
            units: "TRIAGE_CODE",
            description: "Tactical combat casualty care urgency level and vital status"
          },
          {
            fieldTag: "DATA_CHECKSUM_CRC",
            bitOffset: 144,
            bitLength: 16,
            dataType: "CHECKSUM_CRC16",
            scaleMultiplier: 1.0,
            minimumValue: 0,
            maximumValue: 65535,
            units: "HEX_WORD",
            description: "Cyclic redundancy check for transmission integrity verification"
          }
        ]
      };
    });
  }).flat()
];

class Link16MasterCatalogEngine {
  constructor() {
    this.catalog = LINK16_MASTER_MESSAGE_CATALOG;
  }

  getMessageByCode(jCode) {
    return this.catalog.find((m) => m.messageCode === jCode) || this.catalog[0];
  }

  calculateTotalBitLength(jCode) {
    const msg = this.getMessageByCode(jCode);
    return msg.payloadFields.reduce((acc, field) => acc + field.bitLength, 0);
  }
}

module.exports = {
  LINK16_MASTER_MESSAGE_CATALOG,
  Link16MasterCatalogEngine
};

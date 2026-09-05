/**
 * @file stanagTacticalBitstreamDecoder.js
 * @description Variable Message Format (VMF) K-Series / MIL-STD-188-220 Bitstream Decoder & Header Decompressor
 */

const VMF_K_SERIES_MESSAGE_STANDARDS = [
  {
    kCode: "K01.01",
    name: "FREE_TEXT_MESSAGE",
    functionalArea: "C2_COMMUNICATIONS",
    headerBits: 48,
    maxBodyBits: 2048,
    priorityRank: 4
  },
  {
    kCode: "K02.01",
    name: "AIR_STRIKE_CLOSE_AIR_SUPPORT_CAS_9LINE",
    functionalArea: "FIRE_SUPPORT",
    headerBits: 64,
    maxBodyBits: 1024,
    priorityRank: 1
  },
  {
    kCode: "K02.04",
    name: "ARTILLERY_CALL_FOR_FIRE_CFF",
    functionalArea: "FIRE_SUPPORT",
    headerBits: 64,
    maxBodyBits: 512,
    priorityRank: 1
  },
  {
    kCode: "K04.01",
    name: "SITUATION_REPORT_SITREP",
    functionalArea: "OPERATIONS",
    headerBits: 56,
    maxBodyBits: 1536,
    priorityRank: 3
  },
  {
    kCode: "K05.01",
    name: "POSITION_REPORT_POSREP_SOLDIER",
    functionalArea: "NAVIGATION_TRACKING",
    headerBits: 48,
    maxBodyBits: 256,
    priorityRank: 2
  },
  {
    kCode: "K07.01",
    name: "MEDICAL_EVACUATION_REQUEST_MEDEVAC",
    functionalArea: "COMBAT_HEALTH_SUPPORT",
    headerBits: 64,
    maxBodyBits: 768,
    priorityRank: 1
  }
];

class VmfBitstreamDecoderEngine {
  constructor() {
    this.messageList = VMF_K_SERIES_MESSAGE_STANDARDS;
  }

  getVmfMessageSpec(kCode) {
    return this.messageList.find((m) => m.kCode === kCode) || this.messageList[0];
  }

  decodeHeader(hexPayloadString) {
    if (!hexPayloadString || hexPayloadString.length < 12) {
      return { valid: false, error: "Insufficient bitstream length for VMF header" };
    }

    const version = parseInt(hexPayloadString.slice(0, 2), 16);
    const messageTypeIndex = parseInt(hexPayloadString.slice(2, 4), 16);
    const sequenceId = parseInt(hexPayloadString.slice(4, 8), 16);

    return {
      valid: true,
      protocolVersion: version,
      messageTypeIndex: messageTypeIndex,
      sequenceId: sequenceId,
      timestampParsedEpoch: Date.now()
    };
  }
}

module.exports = {
  VMF_K_SERIES_MESSAGE_STANDARDS,
  VmfBitstreamDecoderEngine
};

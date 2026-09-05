/**
 * @file link16TacticalDataEngine.js
 * @description MIL-STD-6016 Link-16 Tactical Data Network J-Series Message Engine.
 * Formats Precise Participant Location & Identification (PPLI J2.2), Track Management (J3.5),
 * Electronic Warfare (J14.0), and Mission Assignment (J12.0) messages.
 */

'use strict';

const LINK16_J_MESSAGES_CATALOG = [];

(function populateLink16Messages() {
  const J_SERIES_TYPES = [
    { code: 'J2.2', name: 'AIR_PPLI_POSITION_REPORT' },
    { code: 'J2.5', name: 'LAND_POINT_PPLI_REPORT' },
    { code: 'J3.2', name: 'AIR_TRACK_DISCOVERY_REPORT' },
    { code: 'J3.5', name: 'LAND_TRACK_GROUND_VEHICLE' },
    { code: 'J7.0', name: 'TRACK_MANAGEMENT_IDENTITY' },
    { code: 'J12.0', name: 'MISSION_ASSIGNMENT_TASKING' },
    { code: 'J14.0', name: 'ELECTRONIC_WARFARE_PARAMETRIC' },
    { code: 'J28.2', name: 'FREE_TEXT_TACTICAL_TELEMETRY' }
  ];

  const NETWORK_PARTICIPATION_GROUPS = ['NPG_7_SURVEILLANCE', 'NPG_9_AIR_CONTROL', 'NPG_12_VOICE_A', 'NPG_19_FIGHTER_TO_FIGHTER', 'NPG_27_JOINT_ENGAGEMENT'];

  for (let jIdx = 0; jIdx < J_SERIES_TYPES.length; jIdx++) {
    const jType = J_SERIES_TYPES[jIdx];

    for (let npgIdx = 0; npgIdx < NETWORK_PARTICIPATION_GROUPS.length; npgIdx++) {
      const npg = NETWORK_PARTICIPATION_GROUPS[npgIdx];

      for (let timeSlot = 1; timeSlot <= 150; timeSlot++) {
        const frameWordCount = (jType.code === 'J2.2' || jType.code === 'J3.5') ? 3 : 2;

        LINK16_J_MESSAGES_CATALOG.push({
          messageId: `L16-${jType.code}-${npg}-TS${timeSlot}`,
          jSeriesCode: jType.code,
          messageName: jType.name,
          networkParticipationGroup: npg,
          timeSlotNumber: timeSlot,
          cryptoVariableCryptoNet: `CVN_${(timeSlot % 8) + 1}`,
          wordCount: frameWordCount,
          timeSlotAllocationType: (timeSlot % 2 === 0) ? 'DEDICATED_ACCESS' : 'CONTENTION_ACCESS',
          relayEligibility: (timeSlot % 5 === 0),
          packedBitFields: {
            headerWord: `0x${((jIdx * 0x1000) | timeSlot).toString(16).toUpperCase()}`,
            initialWord: `0x${((timeSlot * 0x7A3B) & 0xFFFFFFFF).toString(16).toUpperCase()}`,
            extensionWords: [
              `0x${((timeSlot * 0x3F21) & 0xFFFFFFFF).toString(16).toUpperCase()}`,
              `0x${((timeSlot * 0x9D4C) & 0xFFFFFFFF).toString(16).toUpperCase()}`
            ]
          },
          linkQualityMetrics: {
            signalStrengthDbm: -72.0 + (timeSlot % 18),
            frameErrorRatePercent: Number((0.05 + ((timeSlot % 10) * 0.02)).toFixed(3)),
            reedSolomonCorrectedSymbols: (timeSlot % 6)
          }
        });
      }
    }
  }
})();

module.exports = {
  LINK16_J_MESSAGES_CATALOG
};

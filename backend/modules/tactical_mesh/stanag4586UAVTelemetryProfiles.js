/**
 * @file stanag4586UAVTelemetryProfiles.js
 * @description Master NATO STANAG 4586 Standard Interfaces of UAV / UAS Control System Matrix.
 * Precomputes Vehicle ID, Status, Command & Control Data Links, Payload Steering, and Inertial State Packets.
 */

'use strict';

const STANAG_4586_PACKET_DICTIONARY = [];

(function populateSTANAG4586() {
  const PACKET_TYPES = [
    { msgId: 20, name: 'VEHICLE_CONFIGURATION_STATE' },
    { msgId: 40, name: 'INERTIAL_STATES_TELEMETRY' },
    { msgId: 100, name: 'WAYPOINT_NAVIGATION_LIST' },
    { msgId: 300, name: 'EO_IR_PAYLOAD_COMMAND' },
    { msgId: 500, name: 'HEALTH_DIAGNOSTICS_WARNING' },
    { msgId: 700, name: 'FLIGHT_TERMINATION_FAILSAFE' }
  ];

  const FREQUENCIES = [915.0, 2450.0, 5800.0, 10500.0];

  for (let pIdx = 0; pIdx < PACKET_TYPES.length; pIdx++) {
    const packet = PACKET_TYPES[pIdx];

    for (let fIdx = 0; fIdx < FREQUENCIES.length; fIdx++) {
      const freq = FREQUENCIES[fIdx];

      for (let field = 1; field <= 75; field++) {
        STANAG_4586_PACKET_DICTIONARY.push({
          packetProfileId: `STANAG4586-MSG${packet.msgId}-F${Math.round(freq)}-FLD${field}`,
          messageIdCode: packet.msgId,
          messageDescription: packet.name,
          rfUplinkFrequencyMhz: freq,
          fieldIndex: field,
          fieldName: `${packet.name}_PARAM_${field}`,
          bitWidth: (field <= 20) ? 16 : (field <= 50) ? 32 : 64,
          endianness: 'BIG_ENDIAN_NETWORK_ORDER',
          isSafetyCritical: (packet.msgId === 700 || field <= 5),
          crcValidationPolynomial: 'CRC_32_STANAG',
          refreshRateHz: (packet.msgId === 40) ? 50 : (packet.msgId === 100) ? 2 : 10,
          dataLinkEncryptionStandard: 'AES_256_HARDENED'
        });
      }
    }
  }
})();

module.exports = {
  STANAG_4586_PACKET_DICTIONARY
};

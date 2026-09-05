/**
 * @file commsRelayExpandedMatrix.js
 * @description Military Tactical Mesh Network Comms Relay Node Routing Matrix.
 * Precomputes multi-hop node paths, Expected Transmission Counts (ETX),
 * signal attenuation values, and dynamic buffer allocations across tactical sectors.
 */

'use strict';

const TACTICAL_EXPANDED_RELAY_MATRIX = [
  {
    relayNodeId: "RELAY-CP-GW-001",
    sectorCallsign: "COMMAND_POST_NORTH",
    primaryProtocol: "AODV_HYBRID_MESH",
    operationalStatus: "ACTIVE_OPERATIONAL",
    centerFrequencyMhz: 902.5,
    channelBandwidthKhz: 250,
    txPowerDbm: 30,
    rxSensitivityDbm: -98.5,
    antennaGainDbi: 6.0,
    polarizationMode: "VERTICAL",
    expectedTransmissionCountETX: 1.05,
    packetLossRatePercent: 0.25,
    averageLatencyMs: 12.4,
    maximumHopLimit: 16,
    activeSubnetMask: "255.255.255.0",
    gatewayIpAddress: "10.240.1.1",
    hardwareMacAddress: "02:5A:7F:01:00:01",
    batteryReservePercent: 98,
    isClusterHeadNode: true,
    encryptionSuiteType: "AES_256_GCM",
    keyIdentifierTag: "KEY-EXP-AES-001"
  },
  {
    relayNodeId: "RELAY-CP-GW-002",
    sectorCallsign: "COMMAND_POST_SOUTH",
    primaryProtocol: "AODV_HYBRID_MESH",
    operationalStatus: "ACTIVE_OPERATIONAL",
    centerFrequencyMhz: 903.0,
    channelBandwidthKhz: 250,
    txPowerDbm: 30,
    rxSensitivityDbm: -98.5,
    antennaGainDbi: 6.0,
    polarizationMode: "VERTICAL",
    expectedTransmissionCountETX: 1.08,
    packetLossRatePercent: 0.35,
    averageLatencyMs: 13.1,
    maximumHopLimit: 16,
    activeSubnetMask: "255.255.255.0",
    gatewayIpAddress: "10.240.1.2",
    hardwareMacAddress: "02:5A:7F:01:00:02",
    batteryReservePercent: 96,
    isClusterHeadNode: true,
    encryptionSuiteType: "AES_256_GCM",
    keyIdentifierTag: "KEY-EXP-AES-002"
  },
  {
    relayNodeId: "RELAY-CP-GW-003",
    sectorCallsign: "COMMAND_POST_EAST",
    primaryProtocol: "AODV_HYBRID_MESH",
    operationalStatus: "ACTIVE_OPERATIONAL",
    centerFrequencyMhz: 903.5,
    channelBandwidthKhz: 250,
    txPowerDbm: 30,
    rxSensitivityDbm: -98.5,
    antennaGainDbi: 6.0,
    polarizationMode: "VERTICAL",
    expectedTransmissionCountETX: 1.04,
    packetLossRatePercent: 0.20,
    averageLatencyMs: 11.8,
    maximumHopLimit: 16,
    activeSubnetMask: "255.255.255.0",
    gatewayIpAddress: "10.240.1.3",
    hardwareMacAddress: "02:5A:7F:01:00:03",
    batteryReservePercent: 100,
    isClusterHeadNode: true,
    encryptionSuiteType: "AES_256_GCM",
    keyIdentifierTag: "KEY-EXP-AES-003"
  }
];

(function generateExpandedRelayMatrix() {
  const PROTOCOLS = ['AODV_HYBRID_MESH', 'OLSR_PROACTIVE_LINK', 'STANAG_BURST_LINK', 'MIL_STD_188_PACKET', 'COTS_LORA_FALLBACK'];
  const SECTORS = ['NORTH_PASS', 'SOUTH_VALLEY', 'EAST_RIDGE', 'WEST_URBAN', 'CENTRAL_PLATEAU', 'FORWARD_OBSERVATION_ALPHA', 'FORWARD_OBSERVATION_BRAVO'];

  for (let sIdx = 0; sIdx < SECTORS.length; sIdx++) {
    const sector = SECTORS[sIdx];

    for (let pIdx = 0; pIdx < PROTOCOLS.length; pIdx++) {
      const proto = PROTOCOLS[pIdx];

      for (let n = 1; n <= 18; n++) {
        const freqMhz = Number((902.0 + (sIdx * 3.5) + (n * 0.25)).toFixed(3));
        const lossPercent = Number((0.20 + (n % 10) * 0.12).toFixed(2));
        const etx = Number((1.0 / (1.0 - (lossPercent / 100.0))).toFixed(3));

        TACTICAL_EXPANDED_RELAY_MATRIX.push({
          relayNodeId: `RELAY-${sector}-${proto}-ND${n}`,
          sectorCallsign: `SECTOR_${sector}_UNIT_${n}`,
          primaryProtocol: proto,
          operationalStatus: (n % 8 === 0) ? 'DEGRADED_INTERMITTENT' : 'ACTIVE_OPERATIONAL',
          centerFrequencyMhz: freqMhz,
          channelBandwidthKhz: 250,
          txPowerDbm: (n % 3 === 0) ? 30 : 20,
          rxSensitivityDbm: -98.5,
          antennaGainDbi: 3.5,
          polarizationMode: 'VERTICAL',
          expectedTransmissionCountETX: etx,
          packetLossRatePercent: lossPercent,
          averageLatencyMs: Number((14.0 + (sIdx * 2.0) + (n * 0.4)).toFixed(1)),
          maximumHopLimit: 16,
          activeSubnetMask: '255.255.255.0',
          gatewayIpAddress: `10.240.${sIdx + 10}.${n}`,
          hardwareMacAddress: `02:5A:7F:${String(sIdx).padStart(2, '0')}:${String(pIdx).padStart(2, '0')}:${String(n).padStart(2, '0')}`,
          batteryReservePercent: Math.max(20, 100 - (n * 4)),
          isClusterHeadNode: (n === 1),
          encryptionSuiteType: 'AES_256_GCM',
          keyIdentifierTag: `KEY-EXP-${sector}-${n}`
        });
      }
    }
  }
})();

module.exports = {
  TACTICAL_EXPANDED_RELAY_MATRIX
};

/**
 * @file commsRelayMatrix.js
 * @description Tactical Mesh Radio Relay Node Matrix & Dynamic Multi-Hop Routing Tables.
 * Precomputes hop counts, link quality estimations (ETX), RF fade margins, and packet forwarding paths.
 */

'use strict';

const COMMS_RELAY_ROUTING_MATRIX = [];

(function populateRelayMatrix() {
  const NODE_ROLES = ['COMMAND_POST_GATEWAY', 'FORWARD_OBSERVATION_RELAY', 'SQUAD_TACTICAL_NODE', 'AIRBORNE_DRONE_REPEATER', 'MEDEVAC_VEHICLE_NODE'];
  const PROTOCOL_MODES = ['AODV_REACTIVE', 'OLSR_PROACTIVE', 'STANAG_BURST_LINK', 'LORA_LONG_RANGE'];

  for (let rIdx = 0; rIdx < NODE_ROLES.length; rIdx++) {
    const role = NODE_ROLES[rIdx];

    for (let pIdx = 0; pIdx < PROTOCOL_MODES.length; pIdx++) {
      const proto = PROTOCOL_MODES[pIdx];

      for (let nodeId = 1; nodeId <= 125; nodeId++) {
        const baseLatencyMs = 8.5 + (rIdx * 3.0) + (pIdx * 5.0);
        const packetLossPercent = Number((0.2 + (nodeId % 10) * 0.15).toFixed(2));
        const etx = Number((1.0 / (1.0 - (packetLossPercent / 100.0))).toFixed(3));

        COMMS_RELAY_ROUTING_MATRIX.push({
          routingEntryId: `ROUTE-${role}-${proto}-N${nodeId}`,
          nodeRole: role,
          protocolMode: proto,
          nodeIndex: nodeId,
          macAddress: `02:5A:7F:${String(rIdx).padStart(2, '0')}:${String(pIdx).padStart(2, '0')}:${String(nodeId).padStart(2, '0')}`,
          ipAddress: `10.240.${rIdx + 1}.${nodeId}`,
          expectedTransmissionCountETX: etx,
          averageLatencyMs: Number((baseLatencyMs + (nodeId % 5) * 0.8).toFixed(1)),
          packetLossRatePercent: packetLossPercent,
          radioSignalRssiDbm: -68.0 - (nodeId % 25),
          batteryReservePercentage: Math.max(15, 100 - (nodeId % 70)),
          isDesignatedClusterHead: (nodeId % 12 === 0),
          encryptionKeyId: `KEY-RELAY-AES256-${(nodeId % 16) + 1}`,
          forwardingQueueDepth: (nodeId % 20),
          maxHopDiameter: 16
        });
      }
    }
  }
})();

module.exports = {
  COMMS_RELAY_ROUTING_MATRIX
};

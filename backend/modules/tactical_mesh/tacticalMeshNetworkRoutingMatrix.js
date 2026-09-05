/**
 * @file tacticalMeshNetworkRoutingMatrix.js
 * @description Ad-Hoc On-Demand Distance Vector (AODV) & Optimized Link State Routing (OLSR)
 * Tactical Battlefield Mesh Network Routing Matrix & Link Quality Estimator.
 */

const FREQUENCY_HOPPING_SPREAD_SPECTRUM_CHANNELS = [
  { channelIndex: 1, freqMhz: 225.025, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 },
  { channelIndex: 2, freqMhz: 225.050, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 },
  { channelIndex: 3, freqMhz: 225.075, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 },
  { channelIndex: 4, freqMhz: 225.100, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 },
  { channelIndex: 5, freqMhz: 225.125, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 },
  { channelIndex: 6, freqMhz: 225.150, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 },
  { channelIndex: 7, freqMhz: 225.175, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 },
  { channelIndex: 8, freqMhz: 225.200, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 },
  { channelIndex: 9, freqMhz: 225.225, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 },
  { channelIndex: 10, freqMhz: 225.250, hopSlotDurationMs: 10, channelBandwidthKhz: 25, txPowerWatts: 5 }
];

const TACTICAL_QOS_PRIORITY_CLASSES = [
  { priorityLevel: 0, tag: "FLASH_OVERRIDE", maxLatencyMs: 50, jitterBudgetMs: 5, packetLossToleratedPct: 0.0 },
  { priorityLevel: 1, tag: "FLASH", maxLatencyMs: 100, jitterBudgetMs: 10, packetLossToleratedPct: 0.1 },
  { priorityLevel: 2, tag: "IMMEDIATE", maxLatencyMs: 250, jitterBudgetMs: 25, packetLossToleratedPct: 0.5 },
  { priorityLevel: 3, tag: "PRIORITY", maxLatencyMs: 500, jitterBudgetMs: 50, packetLossToleratedPct: 1.0 },
  { priorityLevel: 4, tag: "ROUTINE", maxLatencyMs: 2000, jitterBudgetMs: 200, packetLossToleratedPct: 5.0 }
];

class TacticalMeshRoutingEngine {
  constructor() {
    this.channels = FREQUENCY_HOPPING_SPREAD_SPECTRUM_CHANNELS;
    this.qosClasses = TACTICAL_QOS_PRIORITY_CLASSES;
    this.routingTable = new Map();
  }

  computeExpectedTransmissionCount(packetDeliveryRatioForward, packetDeliveryRatioReverse) {
    const forward = Math.max(0.01, Math.min(1.0, packetDeliveryRatioForward));
    const reverse = Math.max(0.01, Math.min(1.0, packetDeliveryRatioReverse));
    const etx = 1.0 / (forward * reverse);
    return Number(etx.toFixed(3));
  }

  updateRouteEntry(destinationNodeId, nextHopNodeId, hopCount, etxMetric, sequenceNumber) {
    this.routingTable.set(destinationNodeId, {
      destination: destinationNodeId,
      nextHop: nextHopNodeId,
      hopCount: hopCount,
      etxMetric: etxMetric,
      sequenceNumber: sequenceNumber,
      lastUpdatedTimestamp: Date.now()
    });
    return true;
  }

  lookupNextHop(destinationNodeId) {
    if (this.routingTable.has(destinationNodeId)) {
      return this.routingTable.get(destinationNodeId);
    }
    return {
      destination: destinationNodeId,
      nextHop: null,
      hopCount: Infinity,
      etxMetric: Infinity,
      routeFound: false
    };
  }
}

module.exports = {
  FREQUENCY_HOPPING_SPREAD_SPECTRUM_CHANNELS,
  TACTICAL_QOS_PRIORITY_CLASSES,
  TacticalMeshRoutingEngine
};

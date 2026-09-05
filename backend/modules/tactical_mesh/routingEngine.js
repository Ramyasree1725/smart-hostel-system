/**
 * @file routingEngine.js
 * @description Tactical Ad-Hoc Mesh Routing Engine (AODV/OLSR Hybrid) for Disconnected Soldier Networks.
 * Implements dynamic multi-hop discovery, link quality estimation (ETX), route repair, and hop scoring.
 */

'use strict';

const ROUTING_CONSTANTS = {
  MAX_HOPS: 16,
  ROUTE_TIMEOUT_MS: 30000,
  HELLO_INTERVAL_MS: 5000,
  ALLOWED_HELLO_LOSS: 3,
  RREQ_RETRIES: 3,
  RREQ_RATELIMIT: 10,
  ACTIVE_ROUTE_TIMEOUT_MS: 10000,
  PATH_DISCOVERY_TIME_MS: 2000,
  NODE_TRAVERSAL_TIME_MS: 40,
  NET_DIAMETER: 35,
  MIN_ETX: 1.0,
  MAX_ETX: 100.0,
  LINK_QUALITY_WINDOW: 32,
  SIGNAL_THRESHOLD_DBM: -85,
  CRITICAL_BATTERY_THRESHOLD: 15
};

const MESSAGE_TYPES = {
  RREQ: 0x01, // Route Request
  RREP: 0x02, // Route Reply
  RERR: 0x03, // Route Error
  RREP_ACK: 0x04, // Route Reply Acknowledgement
  HELLO: 0x05, // Local Neighbor Link Probe
  HEARTBEAT: 0x06, // Mesh Keepalive
  DATA_RELAY: 0x07, // Forwarded Telemetry Frame
  EMERGENCY_BEACON: 0x08 // Highest Priority Broadcast
};

class RoutingTableEntry {
  constructor(destination, nextHop, hopCount, sequenceNumber, lifetime, etx = 1.0) {
    this.destination = destination;
    this.nextHop = nextHop;
    this.hopCount = hopCount;
    this.sequenceNumber = sequenceNumber;
    this.lifetime = lifetime || Date.now() + ROUTING_CONSTANTS.ROUTE_TIMEOUT_MS;
    this.etx = etx;
    this.precursors = new Set();
    this.state = 'VALID'; // VALID, INVALID, REPAIRING
    this.flags = {
      isSubnetRoute: false,
      isUnidirectional: false,
      isGatewayRoute: false
    };
    this.metrics = {
      packetsForwarded: 0,
      packetsDropped: 0,
      lastActiveTimestamp: Date.now(),
      averageLatencyMs: 12.5,
      jitterMs: 1.2
    };
  }

  isExpired() {
    return Date.now() > this.lifetime;
  }

  touch(extraLifetime = ROUTING_CONSTANTS.ACTIVE_ROUTE_TIMEOUT_MS) {
    this.lifetime = Math.max(this.lifetime, Date.now() + extraLifetime);
    this.metrics.lastActiveTimestamp = Date.now();
  }

  addPrecursor(neighborNodeId) {
    this.precursors.add(neighborNodeId);
  }

  removePrecursor(neighborNodeId) {
    this.precursors.delete(neighborNodeId);
  }

  invalidate() {
    this.state = 'INVALID';
    this.sequenceNumber++;
    this.lifetime = Date.now() + ROUTING_CONSTANTS.ACTIVE_ROUTE_TIMEOUT_MS;
  }
}

class NeighborEntry {
  constructor(nodeId, ipAddress, hardwareMac) {
    this.nodeId = nodeId;
    this.ipAddress = ipAddress;
    this.hardwareMac = hardwareMac;
    this.lastSeen = Date.now();
    this.linkCost = 1.0;
    this.rssiHistory = [];
    this.snrHistory = [];
    this.receivedHellos = 0;
    this.expectedHellos = 0;
    this.forwardDeliveryRatio = 1.0;
    this.reverseDeliveryRatio = 1.0;
    this.batteryLevel = 100;
    this.isSymmetric = true;
  }

  updateLinkQuality(rssi, snr) {
    this.lastSeen = Date.now();
    this.rssiHistory.push(rssi);
    if (this.rssiHistory.length > ROUTING_CONSTANTS.LINK_QUALITY_WINDOW) {
      this.rssiHistory.shift();
    }
    this.snrHistory.push(snr);
    if (this.snrHistory.length > ROUTING_CONSTANTS.LINK_QUALITY_WINDOW) {
      this.snrHistory.shift();
    }
    this.calculateETX();
  }

  calculateETX() {
    const avgRssi = this.getAverageRssi();
    let forwardProb = 1.0;
    if (avgRssi < -95) forwardProb = 0.2;
    else if (avgRssi < -85) forwardProb = 0.6;
    else if (avgRssi < -75) forwardProb = 0.85;
    else forwardProb = 0.99;

    this.forwardDeliveryRatio = forwardProb;
    const denominator = (this.forwardDeliveryRatio * this.reverseDeliveryRatio);
    this.linkCost = denominator > 0.01 ? (1.0 / denominator) : ROUTING_CONSTANTS.MAX_ETX;
    return this.linkCost;
  }

  getAverageRssi() {
    if (this.rssiHistory.length === 0) return -70;
    const sum = this.rssiHistory.reduce((a, b) => a + b, 0);
    return sum / this.rssiHistory.length;
  }

  getAverageSnr() {
    if (this.snrHistory.length === 0) return 20;
    const sum = this.snrHistory.reduce((a, b) => a + b, 0);
    return sum / this.snrHistory.length;
  }
}

class TacticalMeshRouter {
  constructor(nodeId, broadcastInterface) {
    this.nodeId = nodeId;
    this.broadcastInterface = broadcastInterface;
    this.routingTable = new Map();
    this.neighborTable = new Map();
    this.sequenceNumber = 1;
    this.rreqIdCounter = 1;
    this.rreqSeenCache = new Map();
    this.packetQueue = [];
    this.activeDiscoveredRoutes = new Map();
    this.stats = {
      rxPackets: 0,
      txPackets: 0,
      forwardedPackets: 0,
      droppedPackets: 0,
      routeErrors: 0,
      routeRepairs: 0
    };
  }

  start() {
    this.helloTimer = setInterval(() => this.broadcastHello(), ROUTING_CONSTANTS.HELLO_INTERVAL_MS);
    this.cleanupTimer = setInterval(() => this.cleanupExpiredRoutes(), 5000);
  }

  stop() {
    if (this.helloTimer) clearInterval(this.helloTimer);
    if (this.cleanupTimer) clearInterval(this.cleanupTimer);
  }

  getNextSequenceNumber() {
    this.sequenceNumber = (this.sequenceNumber + 1) & 0xFFFFFFFF;
    if (this.sequenceNumber === 0) this.sequenceNumber = 1;
    return this.sequenceNumber;
  }

  getNextRreqId() {
    this.rreqIdCounter = (this.rreqIdCounter + 1) & 0xFFFFFFFF;
    return this.rreqIdCounter;
  }

  addOrUpdateNeighbor(nodeId, ip, mac, rssi, snr) {
    let neighbor = this.neighborTable.get(nodeId);
    if (!neighbor) {
      neighbor = new NeighborEntry(nodeId, ip, mac);
      this.neighborTable.set(nodeId, neighbor);
    }
    neighbor.updateLinkQuality(rssi, snr);
    return neighbor;
  }

  findRoute(destinationId) {
    const route = this.routingTable.get(destinationId);
    if (route && route.state === 'VALID' && !route.isExpired()) {
      route.touch();
      return route;
    }
    return null;
  }

  initiateRouteDiscovery(destinationId, packetToBuffer = null) {
    if (packetToBuffer) {
      this.packetQueue.push({
        destinationId,
        packet: packetToBuffer,
        timestamp: Date.now()
      });
    }

    const rreq = {
      type: MESSAGE_TYPES.RREQ,
      rreqId: this.getNextRreqId(),
      originatorId: this.nodeId,
      originatorSeq: this.getNextSequenceNumber(),
      destinationId: destinationId,
      destinationSeq: this.getDestinationSeq(destinationId),
      hopCount: 0,
      pathEtx: 0.0,
      ttl: ROUTING_CONSTANTS.NET_DIAMETER
    };

    const cacheKey = `${this.nodeId}:${rreq.rreqId}`;
    this.rreqSeenCache.set(cacheKey, Date.now() + 10000);
    this.broadcastMessage(rreq);
  }

  getDestinationSeq(destinationId) {
    const entry = this.routingTable.get(destinationId);
    return entry ? entry.sequenceNumber : 0;
  }

  handleIncomingMessage(message, fromNeighborId, rssi = -70, snr = 25) {
    this.stats.rxPackets++;
    this.addOrUpdateNeighbor(fromNeighborId, null, null, rssi, snr);

    switch (message.type) {
      case MESSAGE_TYPES.RREQ:
        this.processRREQ(message, fromNeighborId);
        break;
      case MESSAGE_TYPES.RREP:
        this.processRREP(message, fromNeighborId);
        break;
      case MESSAGE_TYPES.RERR:
        this.processRERR(message, fromNeighborId);
        break;
      case MESSAGE_TYPES.HELLO:
        this.processHELLO(message, fromNeighborId);
        break;
      case MESSAGE_TYPES.DATA_RELAY:
        this.processDataRelay(message, fromNeighborId);
        break;
      case MESSAGE_TYPES.EMERGENCY_BEACON:
        this.processEmergencyBeacon(message, fromNeighborId);
        break;
      default:
        break;
    }
  }

  processRREQ(rreq, fromNeighborId) {
    const cacheKey = `${rreq.originatorId}:${rreq.rreqId}`;
    if (this.rreqSeenCache.has(cacheKey)) {
      return;
    }
    this.rreqSeenCache.set(cacheKey, Date.now() + 10000);

    const neighbor = this.neighborTable.get(fromNeighborId);
    const linkCost = neighbor ? neighbor.linkCost : 1.0;
    const accumulatedEtx = rreq.pathEtx + linkCost;

    let reverseRoute = this.routingTable.get(rreq.originatorId);
    if (!reverseRoute || rreq.originatorSeq > reverseRoute.sequenceNumber || 
       (rreq.originatorSeq === reverseRoute.sequenceNumber && accumulatedEtx < reverseRoute.etx)) {
      reverseRoute = new RoutingTableEntry(
        rreq.originatorId,
        fromNeighborId,
        rreq.hopCount + 1,
        rreq.originatorSeq,
        Date.now() + ROUTING_CONSTANTS.ROUTE_TIMEOUT_MS,
        accumulatedEtx
      );
      this.routingTable.set(rreq.originatorId, reverseRoute);
    }

    if (rreq.destinationId === this.nodeId) {
      const rrep = {
        type: MESSAGE_TYPES.RREP,
        originatorId: rreq.originatorId,
        destinationId: this.nodeId,
        destinationSeq: this.getNextSequenceNumber(),
        hopCount: 0,
        pathEtx: 0.0,
        lifetime: ROUTING_CONSTANTS.ROUTE_TIMEOUT_MS
      };
      this.sendUnicast(reverseRoute.nextHop, rrep);
      return;
    }

    const forwardRoute = this.routingTable.get(rreq.destinationId);
    if (forwardRoute && forwardRoute.state === 'VALID' && !forwardRoute.isExpired() && forwardRoute.sequenceNumber >= rreq.destinationSeq) {
      const rrep = {
        type: MESSAGE_TYPES.RREP,
        originatorId: rreq.originatorId,
        destinationId: rreq.destinationId,
        destinationSeq: forwardRoute.sequenceNumber,
        hopCount: forwardRoute.hopCount,
        pathEtx: forwardRoute.etx,
        lifetime: forwardRoute.lifetime - Date.now()
      };
      forwardRoute.addPrecursor(fromNeighborId);
      this.sendUnicast(reverseRoute.nextHop, rrep);
      return;
    }

    if (rreq.ttl > 1) {
      rreq.ttl--;
      rreq.hopCount++;
      rreq.pathEtx = accumulatedEtx;
      this.broadcastMessage(rreq);
    }
  }

  processRREP(rrep, fromNeighborId) {
    const neighbor = this.neighborTable.get(fromNeighborId);
    const linkCost = neighbor ? neighbor.linkCost : 1.0;
    const accumulatedEtx = rrep.pathEtx + linkCost;

    let route = this.routingTable.get(rrep.destinationId);
    if (!route || rrep.destinationSeq > route.sequenceNumber ||
       (rrep.destinationSeq === route.sequenceNumber && accumulatedEtx < route.etx)) {
      route = new RoutingTableEntry(
        rrep.destinationId,
        fromNeighborId,
        rrep.hopCount + 1,
        rrep.destinationSeq,
        Date.now() + rrep.lifetime,
        accumulatedEtx
      );
      this.routingTable.set(rrep.destinationId, route);
    }

    if (rrep.originatorId === this.nodeId) {
      this.flushBufferedPackets(rrep.destinationId);
      return;
    }

    const reverseRoute = this.routingTable.get(rrep.originatorId);
    if (reverseRoute && reverseRoute.state === 'VALID') {
      rrep.hopCount++;
      rrep.pathEtx = accumulatedEtx;
      this.sendUnicast(reverseRoute.nextHop, rrep);
    }
  }

  processRERR(rerr, fromNeighborId) {
    const affectedRoutes = [];
    for (const unreachableDest of rerr.unreachableNodes) {
      const entry = this.routingTable.get(unreachableDest.nodeId);
      if (entry && entry.nextHop === fromNeighborId && entry.state === 'VALID') {
        entry.invalidate();
        affectedRoutes.push(entry);
      }
    }

    if (affectedRoutes.length > 0) {
      const propagateRerr = {
        type: MESSAGE_TYPES.RERR,
        unreachableNodes: affectedRoutes.map(r => ({ nodeId: r.destination, seq: r.sequenceNumber }))
      };
      this.broadcastMessage(propagateRerr);
    }
  }

  processHELLO(hello, fromNeighborId) {
    const neighbor = this.neighborTable.get(fromNeighborId);
    if (neighbor) {
      neighbor.lastSeen = Date.now();
      neighbor.batteryLevel = hello.batteryLevel || 100;
    }
  }

  processDataRelay(packet, fromNeighborId) {
    if (packet.targetNodeId === this.nodeId) {
      this.deliverLocally(packet);
    } else {
      this.forwardPacket(packet);
    }
  }

  processEmergencyBeacon(beacon, fromNeighborId) {
    // Immediate emergency rebroadcast with flood protection
    const cacheKey = `EMERGENCY:${beacon.senderId}:${beacon.beaconId}`;
    if (this.rreqSeenCache.has(cacheKey)) return;
    this.rreqSeenCache.set(cacheKey, Date.now() + 60000);
    this.broadcastMessage(beacon);
  }

  forwardPacket(packet) {
    if (packet.ttl <= 1) {
      this.stats.droppedPackets++;
      return;
    }
    const route = this.findRoute(packet.targetNodeId);
    if (route) {
      packet.ttl--;
      this.stats.forwardedPackets++;
      this.sendUnicast(route.nextHop, packet);
    } else {
      this.initiateRouteDiscovery(packet.targetNodeId, packet);
    }
  }

  flushBufferedPackets(destinationId) {
    const remaining = [];
    for (const item of this.packetQueue) {
      if (item.destinationId === destinationId) {
        this.forwardPacket(item.packet);
      } else if (Date.now() - item.timestamp < 15000) {
        remaining.push(item);
      }
    }
    this.packetQueue = remaining;
  }

  deliverLocally(packet) {
    if (typeof this.onDataReceived === 'function') {
      this.onDataReceived(packet);
    }
  }

  broadcastHello() {
    const hello = {
      type: MESSAGE_TYPES.HELLO,
      senderId: this.nodeId,
      sequenceNumber: this.sequenceNumber,
      neighborCount: this.neighborTable.size,
      batteryLevel: 95
    };
    this.broadcastMessage(hello);
  }

  cleanupExpiredRoutes() {
    const now = Date.now();
    for (const [key, entry] of this.routingTable.entries()) {
      if (entry.isExpired() && entry.state !== 'INVALID') {
        entry.invalidate();
      }
    }
    for (const [nodeId, neighbor] of this.neighborTable.entries()) {
      if (now - neighbor.lastSeen > ROUTING_CONSTANTS.HELLO_INTERVAL_MS * ROUTING_CONSTANTS.ALLOWED_HELLO_LOSS) {
        this.neighborTable.delete(nodeId);
      }
    }
  }

  broadcastMessage(msg) {
    this.stats.txPackets++;
    if (this.broadcastInterface && typeof this.broadcastInterface.sendBroadcast === 'function') {
      this.broadcastInterface.sendBroadcast(msg);
    }
  }

  sendUnicast(nextHopId, msg) {
    this.stats.txPackets++;
    if (this.broadcastInterface && typeof this.broadcastInterface.sendUnicast === 'function') {
      this.broadcastInterface.sendUnicast(nextHopId, msg);
    }
  }
}

module.exports = {
  TacticalMeshRouter,
  RoutingTableEntry,
  NeighborEntry,
  ROUTING_CONSTANTS,
  MESSAGE_TYPES
};

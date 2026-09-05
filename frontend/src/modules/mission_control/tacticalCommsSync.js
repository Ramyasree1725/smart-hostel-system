/**
 * @file tacticalCommsSync.js
 * @description Decentralized Conflict-Free Replicated Data Type (CRDT) State Synchronizer.
 * Provides State-Based LWW-Element-Set (Last-Write-Wins) and Vector Clocks for disconnected tactical networks.
 */

export class VectorClock {
  constructor(nodeId) {
    this.nodeId = nodeId;
    this.clock = { [nodeId]: 0 };
  }

  tick() {
    this.clock[this.nodeId] = (this.clock[this.nodeId] || 0) + 1;
    return { ...this.clock };
  }

  merge(otherClock) {
    for (const [node, time] of Object.entries(otherClock)) {
      this.clock[node] = Math.max(this.clock[node] || 0, time);
    }
    this.tick();
  }

  isConcurrent(otherClock) {
    let hasGreater = false;
    let hasLesser = false;
    const allNodes = new Set([...Object.keys(this.clock), ...Object.keys(otherClock)]);

    for (const node of allNodes) {
      const t1 = this.clock[node] || 0;
      const t2 = otherClock[node] || 0;
      if (t1 > t2) hasGreater = true;
      if (t1 < t2) hasLesser = true;
    }

    return hasGreater && hasLesser;
  }
}

export class CRDTSoldierStateStore {
  constructor(nodeId) {
    this.nodeId = nodeId;
    this.clock = new VectorClock(nodeId);
    this.soldierRegister = new Map(); // soldierId -> { data, timestamp, nodeId }
    this.tombstones = new Set();
  }

  setSoldierTelemetry(soldierId, telemetryData) {
    this.clock.tick();
    const entry = {
      soldierId,
      data: telemetryData,
      timestamp: Date.now(),
      nodeId: this.nodeId,
      vector: { ...this.clock.clock }
    };
    this.soldierRegister.set(soldierId, entry);
    return entry;
  }

  getSoldierTelemetry(soldierId) {
    return this.soldierRegister.get(soldierId)?.data || null;
  }

  getAllSoldiers() {
    return Array.from(this.soldierRegister.values()).map(entry => entry.data);
  }

  /**
   * Merges incoming peer delta payload using Last-Write-Wins (LWW) with deterministic tie-breaking
   */
  mergePeerDelta(incomingEntries, peerClock) {
    this.clock.merge(peerClock);

    for (const incoming of incomingEntries) {
      const existing = this.soldierRegister.get(incoming.soldierId);

      if (!existing) {
        this.soldierRegister.set(incoming.soldierId, incoming);
      } else {
        // Last-Write-Wins resolution
        if (incoming.timestamp > existing.timestamp) {
          this.soldierRegister.set(incoming.soldierId, incoming);
        } else if (incoming.timestamp === existing.timestamp) {
          // Tie-break with nodeId lexicographical order
          if (incoming.nodeId > existing.nodeId) {
            this.soldierRegister.set(incoming.soldierId, incoming);
          }
        }
      }
    }
  }

  exportDeltaSince(sinceTimestamp) {
    const delta = [];
    for (const entry of this.soldierRegister.values()) {
      if (entry.timestamp > sinceTimestamp) {
        delta.push(entry);
      }
    }
    return {
      nodeId: this.nodeId,
      clock: this.clock.clock,
      entries: delta
    };
  }
}

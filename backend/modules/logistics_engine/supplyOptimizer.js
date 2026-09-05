/**
 * @file supplyOptimizer.js
 * @description Tactical Logistics & Autonomous Resupply Optimization Engine.
 * Formulates the Multi-Depot Vehicle Routing Problem with Time Windows (MDVRPTW)
 * for forward operating bases (FOB), autonomous payload drones, and emergency airdrops.
 */

'use strict';

class SquadResourceDemand {
  constructor(squadId, coordinate, priority = 'NORMAL') {
    this.squadId = squadId;
    this.coordinate = coordinate; // { lat, lng, alt }
    this.priority = priority; // 'CRITICAL', 'URGENT', 'ROUTINE'
    this.demands = {
      ammunition556: 0, // rounds
      ammunition762: 0,
      medicalBloodUnits: 0,
      tourniquets: 0,
      waterLiters: 0,
      batteryPacks: 0,
      rationsMRE: 0
    };
    this.timeWindowLatestEpoch = Date.now() + 3600000; // 1 hour
  }

  getTotalPayloadWeightKg() {
    let weight = 0;
    weight += (this.demands.ammunition556 * 0.012);
    weight += (this.demands.ammunition762 * 0.024);
    weight += (this.demands.medicalBloodUnits * 0.55);
    weight += (this.demands.tourniquets * 0.12);
    weight += (this.demands.waterLiters * 1.0);
    weight += (this.demands.batteryPacks * 0.85);
    weight += (this.demands.rationsMRE * 0.60);
    return Number(weight.toFixed(2));
  }
}

class AutonomousSupplyDrone {
  constructor(droneId, maxPayloadKg = 25.0, cruisingSpeedKmh = 90.0, maxFlightRangeKm = 60.0) {
    this.droneId = droneId;
    this.maxPayloadKg = maxPayloadKg;
    this.cruisingSpeedKmh = cruisingSpeedKmh;
    this.maxFlightRangeKm = maxFlightRangeKm;
    this.currentPayloadKg = 0;
    this.assignedManifest = [];
    this.flightPlan = [];
  }

  canAcceptPayload(weightKg) {
    return (this.currentPayloadKg + weightKg) <= this.maxPayloadKg;
  }

  assignDelivery(squadDemand) {
    const weight = squadDemand.getTotalPayloadWeightKg();
    if (this.canAcceptPayload(weight)) {
      this.assignedManifest.push(squadDemand);
      this.currentPayloadKg += weight;
      return true;
    }
    return false;
  }
}

class SupplyOptimizationPlanner {
  /**
   * Calculates Haversine spherical distance between two points in kilometers
   */
  static distanceKm(c1, c2) {
    const R = 6371.0;
    const dLat = (c2.lat - c1.lat) * Math.PI / 180;
    const dLng = (c2.lng - c1.lng) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Nearest Neighbor Heuristic with Priority Weighting for Drone Resupply
   */
  static planResupplySorties(fobBaseCoordinate, demandsList, availableDrones) {
    // Sort demands by urgency and weight
    const sortedDemands = [...demandsList].sort((a, b) => {
      const priorityWeights = { CRITICAL: 3, URGENT: 2, ROUTINE: 1 };
      return (priorityWeights[b.priority] || 1) - (priorityWeights[a.priority] || 1);
    });

    const activeSorties = [];

    for (const drone of availableDrones) {
      if (sortedDemands.length === 0) break;

      let currentCoord = fobBaseCoordinate;
      let totalDistance = 0;
      const droneStops = [];

      for (let i = 0; i < sortedDemands.length; i++) {
        const candidate = sortedDemands[i];
        const distToCandidate = SupplyOptimizationPlanner.distanceKm(currentCoord, candidate.coordinate);
        const distBackToFOB = SupplyOptimizationPlanner.distanceKm(candidate.coordinate, fobBaseCoordinate);

        if (totalDistance + distToCandidate + distBackToFOB <= drone.maxFlightRangeKm && drone.canAcceptPayload(candidate.getTotalPayloadWeightKg())) {
          drone.assignDelivery(candidate);
          droneStops.push({
            squadId: candidate.squadId,
            coordinate: candidate.coordinate,
            deliveredWeightKg: candidate.getTotalPayloadWeightKg(),
            distanceSegmentKm: Number(distToCandidate.toFixed(2))
          });

          totalDistance += distToCandidate;
          currentCoord = candidate.coordinate;
          sortedDemands.splice(i, 1);
          i--;
        }
      }

      if (droneStops.length > 0) {
        totalDistance += SupplyOptimizationPlanner.distanceKm(currentCoord, fobBaseCoordinate);
        const estimatedFlightTimeMin = (totalDistance / drone.cruisingSpeedKmh) * 60;

        activeSorties.push({
          droneId: drone.droneId,
          totalPayloadKg: drone.currentPayloadKg,
          totalDistanceKm: Number(totalDistance.toFixed(2)),
          estimatedFlightTimeMinutes: Number(estimatedFlightTimeMin.toFixed(1)),
          waypoints: droneStops
        });
      }
    }

    return {
      fulfilledSorties: activeSorties,
      unassignedDemands: sortedDemands.map(d => d.squadId)
    };
  }
}

module.exports = {
  SquadResourceDemand,
  AutonomousSupplyDrone,
  SupplyOptimizationPlanner
};

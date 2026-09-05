/**
 * @file tacticalThreatMatrixDatabase.js
 * @description Master Electronic Warfare, Air Defense, and Small Arms Threat Signature Matrix
 */

export const TACTICAL_THREAT_SIGNATURES = [
  {
    threatCode: "THR_MANPADS_9K338",
    systemName: "9K338 Igla-S (SA-24 Grinch)",
    category: "SURFACE_TO_AIR_MISSILE",
    maxEngagementRangeMeters: 6000,
    maxEngagementAltitudeMeters: 3500,
    guidanceType: "DUAL_BAND_PASSIVE_IR_UV_HOMING",
    countermeasureRecommendation: "EXPEDIENT_DIRCM_AND_MULTISPECTRAL_FLARES",
    threatLevel: "EXTREME_AIR_INTERDICTION"
  },
  {
    threatCode: "THR_ATGM_9M133",
    systemName: "9M133 Kornet-EM (AT-14 Spriggan)",
    category: "ANTI_TANK_GUIDED_MISSILE",
    maxEngagementRangeMeters: 8000,
    maxEngagementAltitudeMeters: 50,
    guidanceType: "SACLOS_LASER_BEAM_RIDING",
    countermeasureRecommendation: "SMOKE_SCREEN_AEROSOL_AND_APS_HARDKILL",
    threatLevel: "CRITICAL_ARMOR_KILLER"
  },
  {
    threatCode: "THR_EW_KRASUKHA4",
    systemName: "Krasukha-4 Broadband Electronic Jammer",
    category: "ELECTRONIC_WARFARE_SYSTEM",
    maxEngagementRangeMeters: 300000,
    maxEngagementAltitudeMeters: 30000,
    guidanceType: "HIGH_POWER_RF_NOISE_AND_DECEPTIVE_JAMMING",
    countermeasureRecommendation: "FREQUENCY_HOPPING_SPREAD_SPECTRUM_AND_OPTICAL_COMMS",
    threatLevel: "STRATEGIC_C4ISR_DENIAL"
  },
  {
    threatCode: "THR_UAV_LANCET3",
    systemName: "Lancet-3 Loitering Munition / Kamikaze Drone",
    category: "LOITERING_STRIKE_UAV",
    maxEngagementRangeMeters: 40000,
    maxEngagementAltitudeMeters: 2000,
    guidanceType: "OPTICAL_AI_HOMING_AND_OPERATOR_DATA_LINK",
    countermeasureRecommendation: "CUAS_RF_DIRECTED_ENERGY_AND_NET_GUNS",
    threatLevel: "HIGH_PRECISION_STRIKE"
  },
  {
    threatCode: "THR_SNIPER_SVDK",
    systemName: "SVDK 9.3x64mm Heavy Sniper Rifle",
    category: "DIRECT_FIRE_PRECISION_SMALL_ARMS",
    maxEngagementRangeMeters: 1200,
    maxEngagementAltitudeMeters: 10,
    guidanceType: "OPTICAL_TELESCOPIC_1P70",
    countermeasureRecommendation: "ACOUSTIC_GUNSHOT_TRIANGULATION_AND_COUNTER_SNIPER",
    threatLevel: "TACTICAL_DISMOUNT_THREAT"
  }
];

export class TacticalThreatMatrixEngine {
  constructor() {
    this.threatCatalog = TACTICAL_THREAT_SIGNATURES;
  }

  getThreatByCode(threatCode) {
    return this.threatCatalog.find((t) => t.threatCode === threatCode) || this.threatCatalog[0];
  }

  evaluateThreatProximity(currentLat, currentLon, currentAltMeters, threatLat, threatLon, threatCode) {
    const threat = this.getThreatByCode(threatCode);
    const dLat = (threatLat - currentLat) * 111139;
    const dLon = (threatLon - currentLon) * 111139 * Math.cos(currentLat * (Math.PI / 180));
    const distanceMeters = Math.sqrt(dLat * dLat + dLon * dLon);

    const insideEngagementEnvelope = distanceMeters <= threat.maxEngagementRangeMeters &&
      currentAltMeters <= threat.maxEngagementAltitudeMeters;

    return {
      threatCode: threat.threatCode,
      systemName: threat.systemName,
      threatLevel: threat.threatLevel,
      distanceToThreatMeters: Number(distanceMeters.toFixed(1)),
      insideEnvelope: insideEngagementEnvelope,
      recommendedAction: insideEngagementEnvelope ? threat.countermeasureRecommendation : "MAINTAIN_STANDOFF_DISTANCE"
    };
  }
}

export default TacticalThreatMatrixEngine;

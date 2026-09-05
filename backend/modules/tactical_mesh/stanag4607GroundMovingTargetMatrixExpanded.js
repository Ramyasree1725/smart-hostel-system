/**
 * @file stanag4607GroundMovingTargetMatrixExpanded.js
 * @description Master NATO STANAG 4607 Ground Moving Target Indicator (GMTI) Dynamic Target Tracking Matrix.
 * Precomputes radar cross sections (RCS), Doppler velocity bins, and target report segments across combat sectors.
 */

'use strict';

const EXPANDED_GMTI_REPORTS = [
  {
    targetReportId: "GMTI-EXP-TRK-001",
    radarPlatformType: "UAV_SYNTHETIC_APERTURE_RADAR",
    targetClassification: "HEAVY_ARMORED_VEHICLE",
    operationalSector: "SECTOR_NORTH_VALLEY",
    radarCrossSectionDbsm: 24.5,
    dopplerRadialVelocityMs: 14.2,
    targetHeadingDegrees: 185.0,
    targetLatitudeWGS84: 34.1254,
    targetLongitudeWGS84: 74.8821,
    targetAltitudeMetersMSL: 1420.0,
    signalToClutterRatioDb: 18.2,
    detectionConfidenceScorePercent: 96,
    stanagPacketSequenceNumber: 1001,
    securityClearanceRequired: "NATO_SECRET",
    priorityEngagementTier: "TIER_1_HIGH_PRIORITY_ASSAULT"
  },
  {
    targetReportId: "GMTI-EXP-TRK-002",
    radarPlatformType: "UAV_SYNTHETIC_APERTURE_RADAR",
    targetClassification: "LIGHT_UTILITY_VEHICLE",
    operationalSector: "SECTOR_NORTH_VALLEY",
    radarCrossSectionDbsm: 12.0,
    dopplerRadialVelocityMs: 22.5,
    targetHeadingDegrees: 190.0,
    targetLatitudeWGS84: 34.1260,
    targetLongitudeWGS84: 74.8835,
    targetAltitudeMetersMSL: 1418.0,
    signalToClutterRatioDb: 15.8,
    detectionConfidenceScorePercent: 92,
    stanagPacketSequenceNumber: 1002,
    securityClearanceRequired: "NATO_SECRET",
    priorityEngagementTier: "TIER_2_MEDIUM_PRIORITY"
  },
  {
    targetReportId: "GMTI-EXP-TRK-003",
    radarPlatformType: "UAV_SYNTHETIC_APERTURE_RADAR",
    targetClassification: "DISMOUNTED_INFANTRY_PATROL",
    operationalSector: "SECTOR_NORTH_VALLEY",
    radarCrossSectionDbsm: -4.5,
    dopplerRadialVelocityMs: 1.8,
    targetHeadingDegrees: 210.0,
    targetLatitudeWGS84: 34.1248,
    targetLongitudeWGS84: 74.8810,
    targetAltitudeMetersMSL: 1425.0,
    signalToClutterRatioDb: 11.4,
    detectionConfidenceScorePercent: 88,
    stanagPacketSequenceNumber: 1003,
    securityClearanceRequired: "NATO_SECRET",
    priorityEngagementTier: "TIER_1_HIGH_PRIORITY_ASSAULT"
  }
];

(function generateExpandedGMTIReports() {
  const PLATFORMS = ['UAV_SAR_RADAR', 'AEROSTAT_RADAR_HEAD', 'MAST_GROUND_RADAR', 'AIRBORNE_SURVEILLANCE'];
  const CLASSES = ['HEAVY_ARMOR', 'LIGHT_VEHICLE', 'DISMOUNTED_PERSONNEL', 'CONVOY_COLUMN', 'UNKNOWN_TARGET'];
  const SECTORS = ['NORTH_PASS', 'SOUTH_VALLEY', 'EAST_RIDGE', 'WEST_URBAN', 'CENTRAL_DEPOT'];

  for (let pIdx = 0; pIdx < PLATFORMS.length; pIdx++) {
    const platform = PLATFORMS[pIdx];

    for (let cIdx = 0; cIdx < CLASSES.length; cIdx++) {
      const cls = CLASSES[cIdx];

      for (let sIdx = 0; sIdx < SECTORS.length; sIdx++) {
        const sector = SECTORS[sIdx];

        for (let i = 4; i <= 20; i++) {
          const speed = (cIdx === 2) ? 1.6 + (i % 3) * 0.4 : 15.0 + (i % 15) * 1.5;
          const rcs = (cIdx === 0) ? 22.0 : (cIdx === 1) ? 12.0 : (cIdx === 2) ? -5.0 : 18.0;

          EXPANDED_GMTI_REPORTS.push({
            targetReportId: `GMTI-EXP-${platform}-${cls}-${sector}-N${i}`,
            radarPlatformType: platform,
            targetClassification: cls,
            operationalSector: sector,
            radarCrossSectionDbsm: rcs,
            dopplerRadialVelocityMs: Number(speed.toFixed(2)),
            targetHeadingDegrees: (i * 35) % 360,
            targetLatitudeWGS84: Number((34.1200 + (sIdx * 0.05) + (i * 0.002)).toFixed(6)),
            targetLongitudeWGS84: Number((74.8800 + (sIdx * 0.05) + (i * 0.002)).toFixed(6)),
            targetAltitudeMetersMSL: 1400.0 + (i * 15),
            signalToClutterRatioDb: 14.5 + (i % 8),
            detectionConfidenceScorePercent: Math.min(99, 80 + (i % 19)),
            stanagPacketSequenceNumber: 2000 + (pIdx * 100) + i,
            securityClearanceRequired: 'NATO_SECRET',
            priorityEngagementTier: (cIdx === 0 || cIdx === 2) ? 'TIER_1_HIGH_PRIORITY_ASSAULT' : 'TIER_2_MEDIUM_PRIORITY'
          });
        }
      }
    }
  }
})();

module.exports = {
  EXPANDED_GMTI_REPORTS
};

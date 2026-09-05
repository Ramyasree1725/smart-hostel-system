/**
 * @file stanag4607GroundMovingTargetMatrix.js
 * @description NATO STANAG 4607 / AEDP-07 Ground Moving Target Indicator (GMTI) Data Format Matrix.
 * Contains radar target classification, Doppler radial velocity bins, and target report segments.
 */

'use strict';

const GMTI_TARGET_REPORT_MATRIX = [];

(function populateGMTITargetReports() {
  const SENSOR_PLATFORMS = ['UAV_SURVEILLANCE_RADAR', 'AEROSTAT_RADAR_HEAD', 'FORWARD_GROUND_RADAR', 'AIRBORNE_SAR_GMTI', 'MAST_MOUNTED_RADAR'];
  const TARGET_CLASSIFICATIONS = ['TRACKED_HEAVY_VEHICLE', 'WHEELED_ARMORED_VEHICLE', 'LIGHT_TRUCK', 'DISMOUNTED_PERSONNEL', 'UNKNOWN_RADAR_RETURN'];
  const SECTOR_IDS = ['SECTOR_NORTH_VALLEY', 'SECTOR_SOUTH_RIDGE', 'SECTOR_EAST_HIGHWAY', 'SECTOR_WEST_FOREST', 'SECTOR_CENTRAL_DEPOT'];

  for (let sIdx = 0; sIdx < SENSOR_PLATFORMS.length; sIdx++) {
    const platform = SENSOR_PLATFORMS[sIdx];

    for (let cIdx = 0; cIdx < TARGET_CLASSIFICATIONS.length; cIdx++) {
      const classification = TARGET_CLASSIFICATIONS[cIdx];

      for (let secIdx = 0; secIdx < SECTOR_IDS.length; secIdx++) {
        const sector = SECTOR_IDS[secIdx];

        for (let trackId = 1; trackId <= 25; trackId++) {
          const radialSpeedMs = (cIdx === 3) ? 1.5 + (trackId % 3) * 0.5 : 12.0 + (trackId % 15) * 1.5;
          const rcsDbsm = (cIdx === 0) ? 25.0 : (cIdx === 1) ? 15.0 : (cIdx === 2) ? 10.0 : (cIdx === 3) ? -5.0 : 5.0;

          GMTI_TARGET_REPORT_MATRIX.push({
            trackIdentifier: `GMTI-${platform}-${classification}-${sector}-TRK${trackId}`,
            sensorPlatform: platform,
            targetClassification: classification,
            operationalSector: sector,
            trackNumber: trackId,
            dopplerRadialVelocityMs: Number(radialSpeedMs.toFixed(2)),
            radarCrossSectionDbsm: rcsDbsm,
            slantRangeMeters: 2500 + (trackId * 150),
            targetAzimuthDeg: Number(((trackId * 13.7) % 360).toFixed(2)),
            targetElevationAngleDeg: Number((-1.5 - ((trackId % 5) * 0.4)).toFixed(2)),
            signalToNoiseRatioDb: 18.5 + (trackId % 12),
            measurementConfidencePercent: Math.min(99, 75 + (trackId % 24)),
            kalmanFilterCovariance: {
              posVarianceM2: 4.5,
              velVarianceM2s2: 0.8,
              headingVarianceDeg2: 2.1
            },
            stanagSegmentHeader: {
              packetType: 0x0102,
              version: '3.1',
              timestampEpoch: 1767225600 + (trackId * 30),
              securityClassification: 'NATO_SECRET'
            },
            kinematicState: {
              headingDegrees: (trackId * 45) % 360,
              accelerationMs2: (trackId % 4 === 0) ? 0.5 : 0.0,
              turnRateDegPerSec: (trackId % 6 === 0) ? 2.5 : 0.0
            }
          });
        }
      }
    }
  }
})();

class GMTITrackingFilter {
  static getTargetReportsBySector(sectorId) {
    return GMTI_TARGET_REPORT_MATRIX.filter(r => r.operationalSector === sectorId);
  }

  static getDismountedPersonnelTracks() {
    return GMTI_TARGET_REPORT_MATRIX.filter(r => r.targetClassification === 'DISMOUNTED_PERSONNEL');
  }
}

module.exports = {
  GMTI_TARGET_REPORT_MATRIX,
  GMTITrackingFilter
};

/**
 * @file mgrsGlobalExpandedGrid.js
 * @description Master Global 60-Zone Universal Transverse Mercator (UTM) & MGRS Reference Matrix.
 * Precomputes geodesic boundary extents, central ellipsoidal radii, and scale distortions.
 */

'use strict';

const GLOBAL_MGRS_EXPANDED_SECTORS = [
  {
    gridSectorCode: "MGRS-32U-NC-001",
    utmZoneNumber: 32,
    latitudeBandLetter: "U",
    square100kDesignator: "NC",
    quadrantNumber: 1,
    centralMeridianLongitudeDegrees: 9.0,
    southwestCornerLatitudeDegrees: 48.0,
    southwestCornerLongitudeDegrees: 6.0,
    northeastCornerLatitudeDegrees: 56.0,
    northeastCornerLongitudeDegrees: 12.0,
    nominalEastingMeters: 500000.0,
    nominalNorthingMeters: 5500000.0,
    meridianConvergenceAngleDegrees: 0.1245,
    scaleDistortionFactorK0: 0.9996,
    falseEastingCorrectionMeters: 500000.0,
    falseNorthingCorrectionMeters: 0.0,
    primeVerticalCurvatureRadiusMeters: 6388450.2,
    meridionalArcLengthMeters: 5318520.4,
    tacticalZoneType: "ALLIED_FRIENDLY_ZONE",
    isArtilleryNoFireZone: false,
    designatedHelicopterLandingZone: "LZ_ALPHA_1"
  },
  {
    gridSectorCode: "MGRS-32U-NC-002",
    utmZoneNumber: 32,
    latitudeBandLetter: "U",
    square100kDesignator: "NC",
    quadrantNumber: 2,
    centralMeridianLongitudeDegrees: 9.0,
    southwestCornerLatitudeDegrees: 48.0,
    southwestCornerLongitudeDegrees: 6.0,
    northeastCornerLatitudeDegrees: 56.0,
    northeastCornerLongitudeDegrees: 12.0,
    nominalEastingMeters: 520000.0,
    nominalNorthingMeters: 5520000.0,
    meridianConvergenceAngleDegrees: 0.1312,
    scaleDistortionFactorK0: 0.9996,
    falseEastingCorrectionMeters: 500000.0,
    falseNorthingCorrectionMeters: 0.0,
    primeVerticalCurvatureRadiusMeters: 6388450.2,
    meridionalArcLengthMeters: 5318520.4,
    tacticalZoneType: "ALLIED_FRIENDLY_ZONE",
    isArtilleryNoFireZone: false,
    designatedHelicopterLandingZone: "LZ_ALPHA_2"
  },
  {
    gridSectorCode: "MGRS-32U-NC-003",
    utmZoneNumber: 32,
    latitudeBandLetter: "U",
    square100kDesignator: "NC",
    quadrantNumber: 3,
    centralMeridianLongitudeDegrees: 9.0,
    southwestCornerLatitudeDegrees: 48.0,
    southwestCornerLongitudeDegrees: 6.0,
    northeastCornerLatitudeDegrees: 56.0,
    northeastCornerLongitudeDegrees: 12.0,
    nominalEastingMeters: 540000.0,
    nominalNorthingMeters: 5540000.0,
    meridianConvergenceAngleDegrees: 0.1385,
    scaleDistortionFactorK0: 0.9996,
    falseEastingCorrectionMeters: 500000.0,
    falseNorthingCorrectionMeters: 0.0,
    primeVerticalCurvatureRadiusMeters: 6388450.2,
    meridionalArcLengthMeters: 5318520.4,
    tacticalZoneType: "ALLIED_FRIENDLY_ZONE",
    isArtilleryNoFireZone: false,
    designatedHelicopterLandingZone: "LZ_ALPHA_3"
  }
];

(function generateExpandedMGRSGrid() {
  const ZONES = ['32U', '33U', '34U', '35U', '36U', '37U', '38U', '39U', '40U', '41U', '42U', '43U'];
  const SQUARES = ['AA', 'AB', 'AC', 'AD', 'BA', 'BB', 'BC', 'BD', 'CA', 'CB', 'CC', 'CD'];

  for (let zIdx = 0; zIdx < ZONES.length; zIdx++) {
    const zoneStr = ZONES[zIdx];
    const zoneNum = parseInt(zoneStr, 10);
    const centralLon = (zoneNum - 1) * 6 - 180 + 3;

    for (let sIdx = 0; sIdx < SQUARES.length; sIdx++) {
      const sq = SQUARES[sIdx];

      for (let quad = 4; quad <= 25; quad++) {
        const eastingKm = 400 + (sIdx % 4) * 50 + (quad % 5) * 10;
        const northingKm = 5000 + Math.floor(sIdx / 4) * 50 + Math.floor(quad / 5) * 10;

        GLOBAL_MGRS_EXPANDED_SECTORS.push({
          gridSectorCode: `MGRS-${zoneStr}-${sq}-Q${quad}`,
          utmZoneNumber: zoneNum,
          latitudeBandLetter: 'U',
          square100kDesignator: sq,
          quadrantNumber: quad,
          centralMeridianLongitudeDegrees: centralLon,
          southwestCornerLatitudeDegrees: 48.0 + (zIdx * 0.5),
          southwestCornerLongitudeDegrees: centralLon - 3.0,
          northeastCornerLatitudeDegrees: 56.0 + (zIdx * 0.5),
          northeastCornerLongitudeDegrees: centralLon + 3.0,
          nominalEastingMeters: eastingKm * 1000,
          nominalNorthingMeters: northingKm * 1000,
          meridianConvergenceAngleDegrees: Number(((centralLon - centralLon) * 0.707).toFixed(4)),
          scaleDistortionFactorK0: 0.9996,
          falseEastingCorrectionMeters: 500000.0,
          falseNorthingCorrectionMeters: 0.0,
          primeVerticalCurvatureRadiusMeters: 6388450.2,
          meridionalArcLengthMeters: 5318520.4,
          tacticalZoneType: (quad % 7 === 0) ? 'CONTESTED_AREA' : 'ALLIED_FRIENDLY_ZONE',
          isArtilleryNoFireZone: (quad % 11 === 0),
          designatedHelicopterLandingZone: `LZ_${sq}_${quad}`
        });
      }
    }
  }
})();

module.exports = {
  GLOBAL_MGRS_EXPANDED_SECTORS
};

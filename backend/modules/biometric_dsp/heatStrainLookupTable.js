/**
 * @file heatStrainLookupTable.js
 * @description Military Thermal Environment WBGT (Wet Bulb Globe Temperature) & Heat Strain Matrix.
 * Precomputes dry bulb, wet bulb, and black globe temperature combinations with physiological strain limits.
 */

'use strict';

const WBGT_STRAIN_LOOKUP_TABLE = [];

(function populateWBGTTable() {
  for (let dryBulb = 20; dryBulb <= 48; dryBulb += 2) {
    for (let humidity = 20; humidity <= 95; humidity += 5) {
      for (let solarRadiationW = 200; solarRadiationW <= 1000; solarRadiationW += 100) {
        // Approximated Liljegren WBGT formulation
        const approxWetBulb = dryBulb * Math.atan(0.151977 * Math.pow(humidity + 8.313659, 0.5)) +
                              Math.atan(dryBulb + humidity) - Math.atan(humidity - 1.676331) +
                              0.00391838 * Math.pow(humidity, 1.5) * Math.atan(0.023101 * humidity) - 4.686035;

        const blackGlobeDelta = (solarRadiationW / 1000.0) * 12.0;
        const approxBlackGlobe = dryBulb + blackGlobeDelta;

        const wbgt = 0.7 * approxWetBulb + 0.2 * approxBlackGlobe + 0.1 * dryBulb;

        let flagCategory = 'WHITE';
        if (wbgt >= 32.2) flagCategory = 'BLACK';
        else if (wbgt >= 31.1) flagCategory = 'RED';
        else if (wbgt >= 29.4) flagCategory = 'YELLOW';
        else if (wbgt >= 27.8) flagCategory = 'GREEN';

        WBGT_STRAIN_LOOKUP_TABLE.push({
          dryBulbTempC: dryBulb,
          relativeHumidityPercent: humidity,
          solarRadiationWattsM2: solarRadiationW,
          calculatedWBGTCelsius: Number(wbgt.toFixed(1)),
          militaryFlagCondition: flagCategory,
          recommendedWorkRestMinutes: (flagCategory === 'BLACK') ? '20/40' : (flagCategory === 'RED') ? '30/30' : (flagCategory === 'YELLOW') ? '40/20' : (flagCategory === 'GREEN') ? '50/10' : 'Continuous',
          waterIntakeQuartsPerHour: (flagCategory === 'BLACK' || flagCategory === 'RED') ? 1.0 : 0.75
        });
      }
    }
  }
})();

module.exports = {
  WBGT_STRAIN_LOOKUP_TABLE
};

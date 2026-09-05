/**
 * @file photoplethysmographyWaveformEngine.js
 * @description Dual-Wavelength (Red 660nm & IR 940nm) Optical PPG Waveform Decomposition,
 * Dicrotic Notch Detection, Arterial Stiffness Index, and Pulse Oximetry (SpO2) Ratio-of-Ratios Engine.
 */

export class PhotoplethysmographyWaveformEngine {
  constructor() {
    this.calibrationCoefficients = {
      a: 110.0,
      b: -25.0
    };
  }

  calculateSpO2RatioOfRatios(redAc, redDc, irAc, irDc) {
    if (redDc === 0 || irDc === 0 || irAc === 0) {
      return { spO2Percent: 0, perfusionIndex: 0, signalQuality: "INVALID" };
    }

    const rRatio = (redAc / redDc) / (irAc / irDc);
    const calculatedSpO2 = this.calibrationCoefficients.a + (this.calibrationCoefficients.b * rRatio);
    const clampedSpO2 = Math.max(50, Math.min(100, calculatedSpO2));
    const perfusionIndexPct = (irAc / irDc) * 100.0;

    let quality = "EXCELLENT";
    if (perfusionIndexPct < 0.2) {
      quality = "POOR_VASOCONSTRICTION_OR_HYPOTHERMIA";
    } else if (perfusionIndexPct < 0.5) {
      quality = "ACCEPTABLE";
    }

    return {
      spO2Percent: Number(clampedSpO2.toFixed(1)),
      ratioOfRatiosR: Number(rRatio.toFixed(3)),
      perfusionIndexPercent: Number(perfusionIndexPct.toFixed(2)),
      signalQuality: quality
    };
  }

  detectDicroticNotch(ppgSamplesArray) {
    if (!ppgSamplesArray || ppgSamplesArray.length < 10) {
      return { notchFound: false, inflectionIndex: -1 };
    }

    // First derivative zero-crossing inflection point detection
    for (let i = 2; i < ppgSamplesArray.length - 2; i++) {
      const diffPrev = ppgSamplesArray[i] - ppgSamplesArray[i - 1];
      const diffNext = ppgSamplesArray[i + 1] - ppgSamplesArray[i];

      if (diffPrev < 0 && diffNext >= 0) {
        return {
          notchFound: true,
          inflectionIndex: i,
          notchAmplitude: ppgSamplesArray[i]
        };
      }
    }

    return { notchFound: false, inflectionIndex: -1 };
  }
}

export default PhotoplethysmographyWaveformEngine;

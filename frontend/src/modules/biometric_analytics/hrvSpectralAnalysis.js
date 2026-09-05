/**
 * @file hrvSpectralAnalysis.js
 * @description Heart Rate Variability (HRV) Frequency-Domain Spectral Analysis & Welch Periodogram.
 * Calculates Very Low Frequency (VLF: 0.0033-0.04 Hz), Low Frequency (LF: 0.04-0.15 Hz),
 * High Frequency (HF: 0.15-0.40 Hz), and LF/HF Ratio for Autonomic Nervous System Stress Monitoring.
 */

export class HRVSpectralEngine {
  /**
   * Radix-2 Cooley-Tukey Fast Fourier Transform (FFT)
   */
  static fft(real, imag) {
    const n = real.length;
    if (n <= 1) return;

    // Bit-reversal permutation
    let j = 0;
    for (let i = 0; i < n - 1; i++) {
      if (i < j) {
        const tempR = real[i]; real[i] = real[j]; real[j] = tempR;
        const tempI = imag[i]; imag[i] = imag[j]; imag[j] = tempI;
      }
      let k = n >> 1;
      while (k <= j) {
        j -= k;
        k >>= 1;
      }
      j += k;
    }

    // Cooley-Tukey Butterflies
    for (let len = 2; len <= n; len <<= 1) {
      const halfLen = len >> 1;
      const angle = (-2.0 * Math.PI) / len;
      const wStepR = Math.cos(angle);
      const wStepI = Math.sin(angle);

      for (let i = 0; i < n; i += len) {
        let wR = 1.0;
        let wI = 0.0;

        for (let k = 0; k < halfLen; k++) {
          const uR = real[i + k];
          const uI = imag[i + k];

          const vR = real[i + k + halfLen] * wR - imag[i + k + halfLen] * wI;
          const vI = real[i + k + halfLen] * wI + imag[i + k + halfLen] * wR;

          real[i + k] = uR + vR;
          imag[i + k] = uI + vI;

          real[i + k + halfLen] = uR - vR;
          imag[i + k + halfLen] = uI - vI;

          const nextWR = wR * wStepR - wI * wStepI;
          const nextWI = wR * wStepI + wI * wStepR;
          wR = nextWR;
          wI = nextWI;
        }
      }
    }
  }

  /**
   * Computes Power Spectral Density (PSD) and band powers
   */
  static computeSpectralBands(resampledRRIntervals, samplingRateHz = 4.0) {
    const n = 256; // Standard 256-point FFT
    const real = new Float64Array(n);
    const imag = new Float64Array(n);

    // Apply Hanning Window and zero-pad
    for (let i = 0; i < Math.min(n, resampledRRIntervals.length); i++) {
      const window = 0.5 * (1.0 - Math.cos((2 * Math.PI * i) / (n - 1)));
      real[i] = resampledRRIntervals[i] * window;
    }

    HRVSpectralEngine.fft(real, imag);

    let vlfPower = 0.0; // 0.0033 - 0.04 Hz
    let lfPower = 0.0;  // 0.04 - 0.15 Hz
    let hfPower = 0.0;  // 0.15 - 0.40 Hz
    const freqBinWidth = samplingRateHz / n;

    for (let i = 1; i < n / 2; i++) {
      const freq = i * freqBinWidth;
      const power = (real[i] * real[i] + imag[i] * imag[i]) / (n * samplingRateHz);

      if (freq >= 0.0033 && freq < 0.04) vlfPower += power * freqBinWidth;
      else if (freq >= 0.04 && freq < 0.15) lfPower += power * freqBinWidth;
      else if (freq >= 0.15 && freq <= 0.40) hfPower += power * freqBinWidth;
    }

    const totalPower = vlfPower + lfPower + hfPower;
    const lfHfRatio = hfPower > 0.0001 ? (lfPower / hfPower) : 1.0;

    return {
      vlfPowerMs2: Number((vlfPower * 1e6).toFixed(2)),
      lfPowerMs2: Number((lfPower * 1e6).toFixed(2)),
      hfPowerMs2: Number((hfPower * 1e6).toFixed(2)),
      totalPowerMs2: Number((totalPower * 1e6).toFixed(2)),
      lfHfRatio: Number(lfHfRatio.toFixed(2)),
      sympatheticDominance: lfHfRatio > 2.0,
      parasympatheticDominance: lfHfRatio < 0.8
    };
  }
}

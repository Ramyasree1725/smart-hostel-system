describe('Biometric Digital Signal Processing', () => {
  it('should calculate Root Mean Square of Successive Differences (RMSSD) for HRV', () => {
    const rrIntervals = [800, 810, 795, 820, 805, 815, 790, 800];
    let sumSqDiff = 0;
    for (let i = 0; i < rrIntervals.length - 1; i++) {
      const diff = rrIntervals[i + 1] - rrIntervals[i];
      sumSqDiff += diff * diff;
    }
    const rmssd = Math.sqrt(sumSqDiff / (rrIntervals.length - 1));
    expect(rmssd).toBeGreaterThan(10);
    expect(rmssd).toBeLessThan(50);
  });

  it('should filter high-frequency noise from PPG photoplethysmogram signal', () => {
    const rawSignal = [0.12, 0.45, 0.88, 1.20, 0.95, 0.60, 0.25];
    const smoothed = rawSignal.map((val, idx, arr) => {
      const prev = arr[idx - 1] ?? val;
      const next = arr[idx + 1] ?? val;
      return (prev + val + next) / 3;
    });
    expect(smoothed.length).toBe(rawSignal.length);
    expect(smoothed[2]).toBeCloseTo(0.84, 0.1);
  });

  it('should evaluate soldier heat strain index (WBGT compensation)', () => {
    const coreTemp = 38.5;
    const ambientTemp = 36.0;
    const humidity = 65;
    const heatStrainIndex = (coreTemp - 37.0) * 2.5 + (ambientTemp * 0.1) + (humidity * 0.05);
    expect(heatStrainIndex).toBeGreaterThan(5);
  });
});

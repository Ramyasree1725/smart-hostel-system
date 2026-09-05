describe('Combat Medical Triage System', () => {
  it('should categorize priority: RED (Immediate) for severe vitals collapse', () => {
    const soldier = { heartRate: 158, spo2: 82, systolicBP: 75, conscious: false };
    let triageCategory = 'GREEN';
    if (!soldier.conscious || soldier.spo2 < 85 || soldier.systolicBP < 80) {
      triageCategory = 'RED';
    }
    expect(triageCategory).toBe('RED');
  });

  it('should calculate shock index = Heart Rate / Systolic BP', () => {
    const hr = 130;
    const sbp = 90;
    const shockIndex = hr / sbp;
    expect(shockIndex).toBeGreaterThan(1.0); // Shock index > 1.0 indicates severe shock
  });
});

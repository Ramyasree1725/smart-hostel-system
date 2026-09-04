describe('Gate Pass Security & Verification Test Suite', () => {
  const verifyGatePass = (pass, currentTimestamp) => {
    if (pass.status !== 'Approved') {
      return { valid: false, reason: 'Gate pass is not approved by warden' };
    }
    const expiry = new Date(pass.validUntil).getTime();
    if (currentTimestamp > expiry) {
      return { valid: false, reason: 'Gate pass has expired' };
    }
    return { valid: true, passId: pass.id, studentId: pass.studentId };
  };

  it('should validate an approved active gate pass', () => {
    const pass = {
      id: 'GP-883921',
      studentId: 'STU-101',
      status: 'Approved',
      validUntil: '2026-12-31T23:59:59Z'
    };
    const checkTime = new Date('2026-09-04T12:00:00Z').getTime();
    const result = verifyGatePass(pass, checkTime);
    expect(result.valid).toBe(true);
    expect(result.passId).toBe('GP-883921');
  });

  it('should reject a pending or rejected gate pass', () => {
    const pass = {
      id: 'GP-883922',
      studentId: 'STU-102',
      status: 'Pending',
      validUntil: '2026-12-31T23:59:59Z'
    };
    const checkTime = new Date('2026-09-04T12:00:00Z').getTime();
    const result = verifyGatePass(pass, checkTime);
    expect(result.valid).toBe(false);
    expect(result.reason).toBe('Gate pass is not approved by warden');
  });
});

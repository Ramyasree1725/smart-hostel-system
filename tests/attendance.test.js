describe('Hostel Attendance Analytics Test Suite', () => {
  const calculateAttendanceSummary = (records) => {
    let presentCount = 0;
    let absentCount = 0;
    records.forEach(r => {
      if (r.status === 'Present') presentCount++;
      if (r.status === 'Absent') absentCount++;
    });
    const total = presentCount + absentCount;
    const percentage = total > 0 ? (presentCount / total) * 100 : 0;
    return { presentCount, absentCount, percentage: parseFloat(percentage.toFixed(2)) };
  };

  it('should compute present/absent counts and percentage correctly', () => {
    const records = [
      { studentId: 'S1', status: 'Present' },
      { studentId: 'S2', status: 'Present' },
      { studentId: 'S3', status: 'Absent' },
      { studentId: 'S4', status: 'Present' }
    ];
    const summary = calculateAttendanceSummary(records);
    expect(summary.presentCount).toBe(3);
    expect(summary.absentCount).toBe(1);
    expect(summary.percentage).toBe(75.0);
  });
});

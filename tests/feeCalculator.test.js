describe('Fee Calculator Test Suite', () => {
  const calculateTotalDue = (feeRecord) => {
    const roomDue = feeRecord.roomStatus === 'Unpaid' ? feeRecord.roomFee : 0;
    const foodDue = feeRecord.foodStatus === 'Unpaid' ? feeRecord.foodFee : 0;
    const maintenanceDue = feeRecord.maintenanceStatus === 'Unpaid' ? (feeRecord.maintenanceFee || 0) : 0;
    return roomDue + foodDue + maintenanceDue;
  };

  it('should calculate total dues accurately for unpaid room and food fees', () => {
    const record = {
      roomFee: 45000,
      roomStatus: 'Unpaid',
      foodFee: 35000,
      foodStatus: 'Unpaid',
      maintenanceFee: 5000,
      maintenanceStatus: 'Paid'
    };
    expect(calculateTotalDue(record)).toBe(80000);
  });

  it('should return 0 when all fees are fully paid', () => {
    const record = {
      roomFee: 45000,
      roomStatus: 'Paid',
      foodFee: 35000,
      foodStatus: 'Paid'
    };
    expect(calculateTotalDue(record)).toBe(0);
  });
});

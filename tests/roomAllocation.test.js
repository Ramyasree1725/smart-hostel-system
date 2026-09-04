describe('Room Allocation Engine Test Suite', () => {
  const allocateRoom = (student, rooms) => {
    const matchingRoom = rooms.find(r => r.capacity > r.occupied && r.type === student.preferredType);
    if (!matchingRoom) {
      return { success: false, message: 'No suitable room available' };
    }
    matchingRoom.occupied += 1;
    return { success: true, roomId: matchingRoom.id, roomNumber: matchingRoom.roomNumber };
  };

  it('should allocate an available room matching student preference', () => {
    const student = { id: 'STU001', name: 'Rahul Sharma', preferredType: 'Double' };
    const rooms = [
      { id: 'RM101', roomNumber: '101', type: 'Single', capacity: 1, occupied: 1 },
      { id: 'RM102', roomNumber: '102', type: 'Double', capacity: 2, occupied: 1 },
      { id: 'RM103', roomNumber: '103', type: 'Triple', capacity: 3, occupied: 0 }
    ];

    const result = allocateRoom(student, rooms);
    expect(result.success).toBe(true);
    expect(result.roomId).toBe('RM102');
    expect(rooms[1].occupied).toBe(2);
  });

  it('should fail when no matching rooms are available', () => {
    const student = { id: 'STU002', name: 'Priya Patel', preferredType: 'Single' };
    const rooms = [
      { id: 'RM101', roomNumber: '101', type: 'Single', capacity: 1, occupied: 1 }
    ];

    const result = allocateRoom(student, rooms);
    expect(result.success).toBe(false);
    expect(result.message).toBe('No suitable room available');
  });
});

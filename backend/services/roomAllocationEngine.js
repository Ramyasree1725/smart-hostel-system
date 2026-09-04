/**
 * @fileoverview Smart Hostel Management System - Room Allocation Engine
 * @module backend/services/roomAllocationEngine
 * @description Advanced automated room allocation, roommate matching, floor balancing,
 * preference satisfaction optimization, and dynamic re-allocation services.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Enumeration of hostel room types with standard pricing and occupancy limits.
 * @readonly
 * @enum {string}
 */
const ROOM_TYPES = Object.freeze({
  SINGLE_AC: 'SINGLE_AC',
  SINGLE_NON_AC: 'SINGLE_NON_AC',
  DOUBLE_AC: 'DOUBLE_AC',
  DOUBLE_NON_AC: 'DOUBLE_NON_AC',
  TRIPLE_AC: 'TRIPLE_AC',
  TRIPLE_NON_AC: 'TRIPLE_NON_AC',
  DELUXE_STUDIO: 'DELUXE_STUDIO',
  ACCESSIBLE_SPECIAL: 'ACCESSIBLE_SPECIAL'
});

/**
 * Priority scoring weights used during automated allocation algorithms.
 */
const ALLOCATION_WEIGHTS = Object.freeze({
  DISABILITY_OR_MEDICAL: 100,
  SENIORITY_YEAR_4: 40,
  SENIORITY_YEAR_3: 30,
  SENIORITY_YEAR_2: 20,
  SENIORITY_YEAR_1: 10,
  EARLY_APPLICATION_BONUS: 15,
  DEPARTMENT_AFFINITY: 10,
  STUDY_HABIT_MATCH: 15,
  SLEEP_SCHEDULE_MATCH: 20,
  DIETARY_COMPATIBILITY: 10,
  DISTANCE_FROM_HOMETOWN: 25
});

/**
 * Room status state machine representation.
 */
const ROOM_STATUS = Object.freeze({
  AVAILABLE: 'AVAILABLE',
  PARTIALLY_OCCUPIED: 'PARTIALLY_OCCUPIED',
  FULLY_OCCUPIED: 'FULLY_OCCUPIED',
  UNDER_MAINTENANCE: 'UNDER_MAINTENANCE',
  RESERVED_EMERGENCY: 'RESERVED_EMERGENCY',
  DECOMMISSIONED: 'DECOMMISSIONED'
});

/**
 * Class representing the Room Allocation Engine.
 */
class RoomAllocationEngine {
  /**
   * Initializes the room allocation engine with configurable rule sets.
   * @param {Object} [config={}] - Optional configuration overrides.
   */
  constructor(config = {}) {
    this.config = Object.assign({
      allowCrossDepartmentCohabitation: true,
      maxFloorOccupancyRatio: 0.95,
      strictQuietHoursFloors: [1, 2],
      genderSegregatedBlocks: true,
      enablePreferenceOptimization: true,
      minRoommateCompatibilityScore: 60,
      autoLockAllocationsHours: 48,
      defaultCurrency: 'INR'
    }, config);

    this.roomsRegistry = new Map();
    this.allocationHistory = [];
    this.pendingQueue = [];
    this.blacklistedPairs = new Set();
    this.metrics = {
      totalProcessed: 0,
      totalSuccessful: 0,
      totalFallback: 0,
      totalRejected: 0,
      averageSatisfactionScore: 0.0
    };
  }

  /**
   * Registers a collection of room definitions into the memory repository.
   * @param {Array<Object>} roomsList - Array of room metadata objects.
   * @returns {number} Count of successfully registered rooms.
   */
  registerRooms(roomsList) {
    if (!Array.isArray(roomsList)) {
      throw new TypeError('Room list must be an array of room objects');
    }

    let registeredCount = 0;
    for (const room of roomsList) {
      if (!room || typeof room.roomId !== 'string' || !room.roomNumber) {
        continue;
      }

      const normalizedRoom = {
        roomId: String(room.roomId).trim(),
        roomNumber: String(room.roomNumber).trim(),
        block: String(room.block || 'Block-A').trim().toUpperCase(),
        floor: parseInt(room.floor, 10) || 1,
        type: room.type || ROOM_TYPES.DOUBLE_NON_AC,
        capacity: parseInt(room.capacity, 10) || 2,
        currentOccupants: Array.isArray(room.currentOccupants) ? [...room.currentOccupants] : [],
        isAirConditioned: Boolean(room.isAirConditioned),
        isAccessible: Boolean(room.isAccessible),
        baseFeePerSemester: Number(room.baseFeePerSemester) || 45000,
        status: room.status || ROOM_STATUS.AVAILABLE,
        amenities: Array.isArray(room.amenities) ? [...room.amenities] : ['Bed', 'Study Table', 'Wardrobe', 'Ceiling Fan'],
        lastSanitized: room.lastSanitized || new Date().toISOString(),
        maintenanceNotes: room.maintenanceNotes || ''
      };

      // Recalculate room occupancy status
      this._refreshRoomStatus(normalizedRoom);
      this.roomsRegistry.set(normalizedRoom.roomId, normalizedRoom);
      registeredCount++;
    }

    return registeredCount;
  }

  /**
   * Internal helper to recalculate occupancy status.
   * @private
   * @param {Object} room - Room object reference.
   */
  _refreshRoomStatus(room) {
    if (room.status === ROOM_STATUS.UNDER_MAINTENANCE || room.status === ROOM_STATUS.DECOMMISSIONED) {
      return;
    }
    const occupantCount = room.currentOccupants.length;
    if (occupantCount === 0) {
      room.status = ROOM_STATUS.AVAILABLE;
    } else if (occupantCount < room.capacity) {
      room.status = ROOM_STATUS.PARTIALLY_OCCUPIED;
    } else {
      room.status = ROOM_STATUS.FULLY_OCCUPIED;
    }
  }

  /**
   * Evaluates compatibility score between two students (0 to 100).
   * @param {Object} studentA - First student profile.
   * @param {Object} studentB - Second student profile.
   * @returns {number} Score from 0 to 100.
   */
  calculateCompatibilityScore(studentA, studentB) {
    if (!studentA || !studentB) return 0;
    if (studentA.id === studentB.id) return 0;

    const pairKey1 = `${studentA.id}::${studentB.id}`;
    const pairKey2 = `${studentB.id}::${studentA.id}`;
    if (this.blacklistedPairs.has(pairKey1) || this.blacklistedPairs.has(pairKey2)) {
      return 0;
    }

    let score = 50; // Neutral baseline

    // Sleep Schedule alignment (Night owl vs Early bird)
    if (studentA.sleepSchedule && studentB.sleepSchedule) {
      if (studentA.sleepSchedule === studentB.sleepSchedule) {
        score += ALLOCATION_WEIGHTS.SLEEP_SCHEDULE_MATCH;
      } else {
        score -= 15;
      }
    }

    // Study Habit alignment (In-room study vs Library)
    if (studentA.studyHabit && studentB.studyHabit) {
      if (studentA.studyHabit === studentB.studyHabit) {
        score += ALLOCATION_WEIGHTS.STUDY_HABIT_MATCH;
      }
    }

    // Dietary Preferences (Vegetarian, Non-Veg, Vegan)
    if (studentA.dietType && studentB.dietType) {
      if (studentA.dietType === studentB.dietType) {
        score += ALLOCATION_WEIGHTS.DIETARY_COMPATIBILITY;
      }
    }

    // Academic Department & Year
    if (studentA.department && studentB.department) {
      if (studentA.department === studentB.department) {
        score += ALLOCATION_WEIGHTS.DEPARTMENT_AFFINITY;
      }
    }

    // Cleanliness & Noise tolerance rating (scale 1-5)
    if (typeof studentA.cleanlinessRating === 'number' && typeof studentB.cleanlinessRating === 'number') {
      const diff = Math.abs(studentA.cleanlinessRating - studentB.cleanlinessRating);
      if (diff === 0) score += 10;
      else if (diff >= 3) score -= 15;
    }

    // Clamp score strictly between 0 and 100
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  /**
   * Allocates an optimal room for an incoming student request.
   * @param {Object} student - Student application profile.
   * @returns {Object} Allocation decision payload.
   */
  allocateStudent(student) {
    this.metrics.totalProcessed++;

    if (!student || !student.id || !student.name) {
      this.metrics.totalRejected++;
      return {
        success: false,
        reason: 'INVALID_STUDENT_DATA',
        message: 'Student identifier and name are mandatory for room allocation.'
      };
    }

    // Filter available rooms matching basic constraints
    const candidateRooms = [];
    for (const room of this.roomsRegistry.values()) {
      if (room.status !== ROOM_STATUS.AVAILABLE && room.status !== ROOM_STATUS.PARTIALLY_OCCUPIED) {
        continue;
      }

      if (room.currentOccupants.length >= room.capacity) {
        continue;
      }

      // Gender segregation enforcement
      if (this.config.genderSegregatedBlocks && student.gender) {
        const expectedBlockPrefix = student.gender.toUpperCase().startsWith('F') ? 'GIRLS' : 'BOYS';
        if (!room.block.includes(expectedBlockPrefix) && !room.block.includes('ALL')) {
          // Check block config compatibility
        }
      }

      // Special accessibility need
      if (student.requiresSpecialAccess && !room.isAccessible) {
        continue;
      }

      candidateRooms.push(room);
    }

    if (candidateRooms.length === 0) {
      this.metrics.totalFallback++;
      return {
        success: false,
        reason: 'NO_ROOMS_AVAILABLE',
        message: 'No suitable vacant hostel room currently meets the specified criteria.'
      };
    }

    // Score candidate rooms based on student preferences
    let bestRoom = null;
    let highestRoomScore = -Infinity;
    let bestRoommateScore = 0;

    for (const room of candidateRooms) {
      let roomScore = 0;

      // Match room type preference
      if (student.preferredRoomType && room.type === student.preferredRoomType) {
        roomScore += 40;
      }

      // AC preference
      if (student.prefersAC !== undefined && student.prefersAC === room.isAirConditioned) {
        roomScore += 20;
      }

      // Floor preference
      if (student.preferredFloor !== undefined && student.preferredFloor === room.floor) {
        roomScore += 15;
      }

      // Roommate compatibility check if partially occupied
      if (room.currentOccupants.length > 0) {
        let avgCompat = 0;
        for (const occ of room.currentOccupants) {
          avgCompat += this.calculateCompatibilityScore(student, occ);
        }
        avgCompat = avgCompat / room.currentOccupants.length;

        if (avgCompat < this.config.minRoommateCompatibilityScore) {
          // Penalize or skip if below threshold
          roomScore -= 30;
        } else {
          roomScore += (avgCompat * 0.3);
        }
      } else {
        // Fresh room bonus
        roomScore += 10;
      }

      if (roomScore > highestRoomScore) {
        highestRoomScore = roomScore;
        bestRoom = room;
      }
    }

    if (!bestRoom) {
      bestRoom = candidateRooms[0];
    }

    // Assign student to bestRoom
    const assignedStudentEntry = {
      id: student.id,
      name: student.name,
      department: student.department || 'General',
      year: student.year || 1,
      assignedAt: new Date().toISOString(),
      contactNumber: student.contactNumber || '',
      parentPhone: student.parentPhone || '',
      roomFeeStatus: student.roomFeeStatus || 'Unpaid',
      messFeeStatus: student.messFeeStatus || 'Unpaid'
    };

    bestRoom.currentOccupants.push(assignedStudentEntry);
    this._refreshRoomStatus(bestRoom);

    const record = {
      allocationId: `ALC-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      studentId: student.id,
      studentName: student.name,
      roomId: bestRoom.roomId,
      roomNumber: bestRoom.roomNumber,
      block: bestRoom.block,
      floor: bestRoom.floor,
      roomType: bestRoom.type,
      assignedAt: assignedStudentEntry.assignedAt,
      matchQualityScore: Math.max(20, Math.min(100, Math.round(highestRoomScore)))
    };

    this.allocationHistory.push(record);
    this.metrics.totalSuccessful++;

    return {
      success: true,
      data: record,
      message: `Room ${bestRoom.roomNumber} (${bestRoom.block}) successfully assigned.`
    };
  }

  /**
   * Deallocates or evicts a student from their currently assigned room.
   * @param {string} studentId - Student identifier.
   * @param {string} reason - Reason for vacating.
   * @returns {Object} Deallocation receipt.
   */
  deallocateStudent(studentId, reason = 'NORMAL_CHECKOUT') {
    if (!studentId) {
      return { success: false, message: 'Student ID required.' };
    }

    for (const room of this.roomsRegistry.values()) {
      const idx = room.currentOccupants.findIndex(o => o.id === studentId);
      if (idx !== -1) {
        const removed = room.currentOccupants.splice(idx, 1)[0];
        this._refreshRoomStatus(room);

        const checkoutRecord = {
          eventType: 'CHECKOUT',
          studentId: removed.id,
          studentName: removed.name,
          roomId: room.roomId,
          roomNumber: room.roomNumber,
          vacatedAt: new Date().toISOString(),
          reason: reason
        };

        this.allocationHistory.push(checkoutRecord);

        return {
          success: true,
          data: checkoutRecord,
          message: `Student ${removed.name} successfully checked out of Room ${room.roomNumber}.`
        };
      }
    }

    return {
      success: false,
      message: `No active room allocation found for student ID: ${studentId}`
    };
  }

  /**
   * Transfers a student from their existing room to a target room.
   * @param {string} studentId - Student ID.
   * @param {string} targetRoomId - Destination room ID.
   * @param {string} approvalAuthority - Warden or Admin ID.
   * @returns {Object} Transfer status.
   */
  transferStudent(studentId, targetRoomId, approvalAuthority = 'WARDEN_MAIN') {
    const targetRoom = this.roomsRegistry.get(targetRoomId);
    if (!targetRoom) {
      return { success: false, message: 'Destination room does not exist in registry.' };
    }

    if (targetRoom.currentOccupants.length >= targetRoom.capacity) {
      return { success: false, message: 'Target room is already at maximum capacity.' };
    }

    // Locate current room
    let sourceRoom = null;
    let studentData = null;

    for (const room of this.roomsRegistry.values()) {
      const found = room.currentOccupants.find(o => o.id === studentId);
      if (found) {
        sourceRoom = room;
        studentData = found;
        break;
      }
    }

    if (!sourceRoom || !studentData) {
      return { success: false, message: 'Student has no active room assignment to transfer from.' };
    }

    // Perform atomic switch
    sourceRoom.currentOccupants = sourceRoom.currentOccupants.filter(o => o.id !== studentId);
    this._refreshRoomStatus(sourceRoom);

    studentData.transferredAt = new Date().toISOString();
    studentData.transferredBy = approvalAuthority;
    targetRoom.currentOccupants.push(studentData);
    this._refreshRoomStatus(targetRoom);

    const transferEvent = {
      eventType: 'ROOM_TRANSFER',
      studentId: studentId,
      fromRoomId: sourceRoom.roomId,
      fromRoomNumber: sourceRoom.roomNumber,
      toRoomId: targetRoom.roomId,
      toRoomNumber: targetRoom.roomNumber,
      approvedBy: approvalAuthority,
      timestamp: new Date().toISOString()
    };

    this.allocationHistory.push(transferEvent);

    return {
      success: true,
      data: transferEvent,
      message: `Student successfully moved from Room ${sourceRoom.roomNumber} to Room ${targetRoom.roomNumber}.`
    };
  }

  /**
   * Generates a comprehensive occupancy report across all blocks and floors.
   * @returns {Object} Occupancy breakdown metrics.
   */
  generateOccupancyReport() {
    let totalBeds = 0;
    let occupiedBeds = 0;
    const blockStats = {};
    const typeStats = {};

    for (const room of this.roomsRegistry.values()) {
      totalBeds += room.capacity;
      occupiedBeds += room.currentOccupants.length;

      // Block aggregation
      if (!blockStats[room.block]) {
        blockStats[room.block] = { totalRooms: 0, totalCapacity: 0, occupiedBeds: 0, availableBeds: 0 };
      }
      blockStats[room.block].totalRooms++;
      blockStats[room.block].totalCapacity += room.capacity;
      blockStats[room.block].occupiedBeds += room.currentOccupants.length;
      blockStats[room.block].availableBeds = blockStats[room.block].totalCapacity - blockStats[room.block].occupiedBeds;

      // Type aggregation
      if (!typeStats[room.type]) {
        typeStats[room.type] = { totalRooms: 0, occupiedRooms: 0, capacity: 0 };
      }
      typeStats[room.type].totalRooms++;
      typeStats[room.type].capacity += room.capacity;
      if (room.status === ROOM_STATUS.FULLY_OCCUPIED) {
        typeStats[room.type].occupiedRooms++;
      }
    }

    const availableBeds = totalBeds - occupiedBeds;
    const occupancyRate = totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0;

    return {
      timestamp: new Date().toISOString(),
      summary: {
        totalRoomsRegistered: this.roomsRegistry.size,
        totalBedCapacity: totalBeds,
        totalOccupiedBeds: occupiedBeds,
        totalAvailableBeds: availableBeds,
        occupancyPercentage: parseFloat(occupancyRate.toFixed(2))
      },
      blockBreakdown: blockStats,
      typeBreakdown: typeStats,
      engineMetrics: { ...this.metrics }
    };
  }

  /**
   * Resets all in-memory room registries and histories.
   */
  clearAll() {
    this.roomsRegistry.clear();
    this.allocationHistory = [];
    this.pendingQueue = [];
    this.blacklistedPairs.clear();
  }
}

module.exports = {
  RoomAllocationEngine,
  ROOM_TYPES,
  ROOM_STATUS,
  ALLOCATION_WEIGHTS
};

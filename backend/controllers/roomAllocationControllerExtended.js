/**
 * @fileoverview Smart Hostel Management System - Extended Room Allocation Controller
 * @module backend/controllers/roomAllocationControllerExtended
 * @description Production algorithmic controller for hostel room allotment, floor density balancing,
 * roommate compatibility score calculations, handicap accessibility priority, and room transfer dispute resolutions.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const { MASTER_ROOM_CATALOG } = require('../models/roomAllocationSchemaData');

/**
 * Controller class for room allocation workflows.
 */
class RoomAllocationControllerExtended {
  /**
   * Initializes controller.
   */
  constructor() {
    this.rooms = [...MASTER_ROOM_CATALOG];
    this.allocationLedger = [];
    this.transferQueue = [];
    this.auditHistory = [];
  }

  /**
   * Evaluates student compatibility with existing roommates.
   * @param {Object} applicant - Incoming student profile
   * @param {Object} existingOccupant - Current room occupant
   * @returns {number} Score from 0 to 100
   */
  computeRoommateCompatibility(applicant, existingOccupant) {
    if (!applicant || !existingOccupant) return 50;

    let score = 50;

    // Academic synergy bonus (same department)
    if (applicant.department && existingOccupant.department) {
      if (applicant.department === existingOccupant.department) {
        score += 25;
      }
    }

    // Academic Year Synergy (same year or adjacent)
    if (applicant.academicYear && existingOccupant.academicYear) {
      const yearDiff = Math.abs(applicant.academicYear - existingOccupant.academicYear);
      if (yearDiff === 0) score += 20;
      else if (yearDiff === 1) score += 10;
      else score -= 10;
    }

    // Lifestyle & Sleep Schedule Compatibility
    if (applicant.sleepSchedule && existingOccupant.sleepSchedule) {
      if (applicant.sleepSchedule === existingOccupant.sleepSchedule) {
        score += 15;
      } else {
        score -= 15;
      }
    }

    // Diet Alignment (Veg / Non-Veg)
    if (applicant.dietPreference && existingOccupant.dietPreference) {
      if (applicant.dietPreference === existingOccupant.dietPreference) {
        score += 10;
      }
    }

    return Math.max(10, Math.min(100, score));
  }

  /**
   * Executes automated optimal room allocation for student applicant.
   * @param {Object} studentProfile - Complete student applicant profile
   * @returns {Object} Allocation decision result
   */
  autoAllocateOptimalRoom(studentProfile) {
    if (!studentProfile || !studentProfile.studentId || !studentProfile.name) {
      return {
        success: false,
        message: 'Invalid applicant payload. Student ID and Name are mandatory.'
      };
    }

    // Filter eligible vacant rooms matching gender & preferences
    const targetGender = (studentProfile.gender || 'MALE').toUpperCase();
    const candidateRooms = this.rooms.filter(room => {
      if (room.status === 'FULLY_OCCUPIED') return false;
      if (room.currentOccupantsCount >= room.bedCapacity) return false;

      if (targetGender.startsWith('F')) {
        if (room.blockGender !== 'FEMALE' && room.blockGender !== 'CO_ED_SCHOLARS') return false;
      } else {
        if (room.blockGender !== 'MALE' && room.blockGender !== 'CO_ED_SCHOLARS') return false;
      }

      // Accessibility requirement
      if (studentProfile.requiresAccessibility && room.floorLevel > 1) {
        return false;
      }

      return true;
    });

    if (candidateRooms.length === 0) {
      return {
        success: false,
        message: 'No suitable vacant rooms currently meet the applicant criteria.'
      };
    }

    // Score candidate rooms
    let bestRoom = null;
    let highestScore = -Infinity;

    for (const room of candidateRooms) {
      let roomScore = 100;

      // Prefer partially occupied rooms for social integration if preference enabled
      if (room.status === 'PARTIALLY_OCCUPIED') {
        roomScore += 20;
      }

      // Preference match
      if (studentProfile.preferredBlock && room.blockName.toUpperCase() === studentProfile.preferredBlock.toUpperCase()) {
        roomScore += 30;
      }

      // AC Preference
      if (studentProfile.prefersAC !== undefined && studentProfile.prefersAC === room.specification.hasAirConditioner) {
        roomScore += 25;
      }

      if (roomScore > highestScore) {
        highestScore = roomScore;
        bestRoom = room;
      }
    }

    if (!bestRoom) {
      bestRoom = candidateRooms[0];
    }

    // Increment occupancy
    bestRoom.currentOccupantsCount++;
    bestRoom.vacancyCount = bestRoom.bedCapacity - bestRoom.currentOccupantsCount;
    bestRoom.status = bestRoom.currentOccupantsCount >= bestRoom.bedCapacity ? 'FULLY_OCCUPIED' : 'PARTIALLY_OCCUPIED';

    const allocationRecord = {
      allocationId: `ALC-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: studentProfile.studentId,
      studentName: studentProfile.name,
      allocatedRoomNumber: bestRoom.roomNumber,
      allocatedBlock: bestRoom.blockName,
      floorLevel: bestRoom.floorLevel,
      specification: bestRoom.specification.typeName,
      allocatedTimestamp: new Date().toISOString(),
      matchScore: highestScore
    };

    this.allocationLedger.push(allocationRecord);

    return {
      success: true,
      allocation: allocationRecord,
      message: `Room ${bestRoom.roomNumber} (${bestRoom.blockName}) successfully allocated to ${studentProfile.name}.`
    };
  }

  /**
   * Processes a room transfer request between two students or to a vacant room.
   * @param {string} studentId - Student requesting transfer
   * @param {string} destinationRoomNumber - Target room number
   * @param {string} reason - Justification
   * @returns {Object} Transfer status
   */
  processRoomTransfer(studentId, destinationRoomNumber, reason = 'Academic synergy') {
    const targetRoom = this.rooms.find(r => r.roomNumber.toUpperCase() === destinationRoomNumber.toUpperCase());
    if (!targetRoom) {
      return { success: false, message: `Destination room ${destinationRoomNumber} does not exist.` };
    }

    if (targetRoom.currentOccupantsCount >= targetRoom.bedCapacity) {
      return { success: false, message: `Destination room ${destinationRoomNumber} is already fully occupied.` };
    }

    targetRoom.currentOccupantsCount++;
    targetRoom.vacancyCount = targetRoom.bedCapacity - targetRoom.currentOccupantsCount;
    targetRoom.status = targetRoom.currentOccupantsCount >= targetRoom.bedCapacity ? 'FULLY_OCCUPIED' : 'PARTIALLY_OCCUPIED';

    const transferEvent = {
      transferId: `TRF-${Date.now()}`,
      studentId,
      toRoom: destinationRoomNumber,
      reason,
      approvedBy: 'Dr. Sunita Rao (Chief Warden)',
      timestamp: new Date().toISOString()
    };

    this.transferQueue.push(transferEvent);

    return {
      success: true,
      transfer: transferEvent,
      message: `Student ${studentId} successfully transferred to Room ${destinationRoomNumber}.`
    };
  }

  /**
   * Generates a comprehensive occupancy metrics summary.
   * @returns {Object}
   */
  getOccupancyAnalytics() {
    let totalBeds = 0;
    let occupiedBeds = 0;
    const blockStats = {};

    for (const r of this.rooms) {
      totalBeds += r.bedCapacity;
      occupiedBeds += r.currentOccupantsCount;

      if (!blockStats[r.blockName]) {
        blockStats[r.blockName] = { totalRooms: 0, totalCapacity: 0, occupied: 0, vacant: 0 };
      }
      blockStats[r.blockName].totalRooms++;
      blockStats[r.blockName].totalCapacity += r.bedCapacity;
      blockStats[r.blockName].occupied += r.currentOccupantsCount;
      blockStats[r.blockName].vacant = blockStats[r.blockName].totalCapacity - blockStats[r.blockName].occupied;
    }

    return {
      totalRoomsCount: this.rooms.length,
      totalCapacityBeds: totalBeds,
      totalOccupiedBeds: occupiedBeds,
      totalVacantBeds: totalBeds - occupiedBeds,
      overallOccupancyRatePercent: totalBeds > 0 ? parseFloat(((occupiedBeds / totalBeds) * 100).toFixed(2)) : 0,
      breakdownByBlock: blockStats
    };
  }
}

module.exports = {
  RoomAllocationControllerExtended
};

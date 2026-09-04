/**
 * @fileoverview Smart Hostel Management System - Hostel Infrastructure & Architectural Layout Service
 * @module backend/services/hostelInfrastructureService
 * @description Campus mapping, block topologies, wing partitioning, room numbering schema,
 * network router placement coordinates, and emergency evacuation rally point topologies.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Hostel infrastructure layout metadata.
 */
const CAMPUS_INFRASTRUCTURE = Object.freeze({
  CAMPUS_NAME: 'Smart University Green Campus Residential Enclave',
  TOTAL_ACRES: 45.5,
  TOTAL_BLOCKS: 5,
  TOTAL_ROOMS: 450,
  TOTAL_BED_CAPACITY: 980,
  EMERGENCY_ASSEMBLY_POINTS: [
    { id: 'EAP-01', name: 'Main Football Ground Plaza', capacity: 1200 },
    { id: 'EAP-02', name: 'North Lawn Open Amphitheatre', capacity: 600 },
    { id: 'EAP-03', name: 'South Dining Pavilion Courtyard', capacity: 500 }
  ]
});

/**
 * Class representing Hostel Infrastructure Service.
 */
class HostelInfrastructureService {
  /**
   * Initializes campus infrastructure modeling.
   */
  constructor() {
    this.blocks = new Map();
    this._initializeCampusBlocks();
  }

  /**
   * Builds block schemas.
   * @private
   */
  _initializeCampusBlocks() {
    const blocksData = [
      {
        blockCode: 'BLOCK-A',
        name: 'Nilgiri Men\'s Senior Residence',
        floors: 4,
        roomsPerFloor: 25,
        totalCapacity: 200,
        wardenInCharge: 'Dr. K. V. Sharma',
        wardenPhone: '+91 98765 11101',
        facilities: ['Wi-Fi 6', 'Solar Geyser', 'Study Hall', 'Table Tennis Room', 'RO Drinking Water Plant']
      },
      {
        blockCode: 'BLOCK-B',
        name: 'Vindhya Men\'s Junior Residence',
        floors: 4,
        roomsPerFloor: 25,
        totalCapacity: 200,
        wardenInCharge: 'Prof. M. Venkatesh',
        wardenPhone: '+91 98765 11102',
        facilities: ['Wi-Fi 6', 'Solar Geyser', 'Common TV Lounge', 'Badminton Court', 'Water Coolers']
      },
      {
        blockCode: 'BLOCK-C',
        name: 'Kaveri Women\'s Residence',
        floors: 5,
        roomsPerFloor: 30,
        totalCapacity: 300,
        wardenInCharge: 'Dr. Sunita Rao',
        wardenPhone: '+91 98765 11103',
        facilities: ['Biometric Access Turnstiles', 'Wi-Fi 6', 'Reading Lounge', 'Gymnasium', '24/7 Sickbay']
      },
      {
        blockCode: 'BLOCK-D',
        name: 'Ganga Women\'s PG & Research Wing',
        floors: 3,
        roomsPerFloor: 20,
        totalCapacity: 150,
        wardenInCharge: 'Dr. Meenakshi Sundaram',
        wardenPhone: '+91 98765 11104',
        facilities: ['Air Conditioned Suites', 'High-Speed LAN', 'Conference Room', 'Kitchenette']
      },
      {
        blockCode: 'BLOCK-E',
        name: 'Himalaya International Scholars Hostel',
        floors: 3,
        roomsPerFloor: 15,
        totalCapacity: 130,
        wardenInCharge: 'Prof. A. Banerjee',
        wardenPhone: '+91 98765 11105',
        facilities: ['Single Occupancy AC Rooms', 'Attached Kitchen', 'Laundry Automation', 'Multi-Cuisine Dining']
      }
    ];

    for (const b of blocksData) {
      this.blocks.set(b.blockCode, b);
    }
  }

  /**
   * Retrieves full details of a block.
   * @param {string} blockCode - Block identifier.
   * @returns {Object|null} Block profile.
   */
  getBlockDetails(blockCode) {
    return this.blocks.get(blockCode.toUpperCase()) || null;
  }

  /**
   * Lists all hostel blocks across campus.
   * @returns {Array<Object>} List of blocks.
   */
  getAllBlocks() {
    return Array.from(this.blocks.values());
  }
}

module.exports = {
  HostelInfrastructureService,
  CAMPUS_INFRASTRUCTURE
};

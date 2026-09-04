/**
 * @fileoverview Smart Hostel Management System - Emergency Protocol & Campus Safety Service
 * @module backend/services/emergencyProtocolService
 * @description SOS alert dispatching, fire drill coordination, perimeter lockdown protocols,
 * warden emergency SMS broadcast, local hospital & police speed dial automation.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Emergency types.
 * @readonly
 * @enum {string}
 */
const EMERGENCY_CODES = Object.freeze({
  CODE_RED_FIRE: 'CODE_RED_FIRE',
  CODE_BLUE_MEDICAL: 'CODE_BLUE_MEDICAL',
  CODE_AMBER_WEATHER_CYCLONE: 'CODE_AMBER_WEATHER_CYCLONE',
  CODE_BLACK_SECURITY_LOCKDOWN: 'CODE_BLACK_SECURITY_LOCKDOWN',
  CODE_YELLOW_WATER_ELECTRICAL: 'CODE_YELLOW_WATER_ELECTRICAL'
});

/**
 * Class representing Emergency Protocol Service.
 */
class EmergencyProtocolService {
  /**
   * Initializes emergency protocols.
   */
  constructor() {
    this.emergencyHotlines = {
      CAMPUS_SECURITY_MAIN: '+91 99999 11111',
      LOCAL_POLICE_STATION: '112',
      NEAREST_HOSPITAL_AMBULANCE: '108',
      FIRE_BRIGADE_DISPATCH: '101',
      CHIEF_WARDEN_HOTLINE: '+91 98888 22222'
    };

    this.emergencyEvents = [];
  }

  /**
   * Triggers an emergency SOS broadcast to all wardens and security guards.
   * @param {string} emergencyCode - EMERGENCY_CODES enum.
   * @param {string} triggeredBy - User ID or sensor ID.
   * @param {string} location - Floor / Block / Zone.
   * @param {string} description - Situation details.
   * @returns {Object} Emergency response action plan.
   */
  triggerEmergencySOS(emergencyCode, triggeredBy, location, description = '') {
    const eventId = `SOS-${Date.now()}`;

    const eventRecord = {
      eventId,
      emergencyCode,
      triggeredBy,
      location,
      description,
      status: 'ACTIVE_EMERGENCY',
      timestamp: new Date().toISOString(),
      evacuationProtocolTriggered: emergencyCode === EMERGENCY_CODES.CODE_RED_FIRE,
      securityPerimeterLocked: emergencyCode === EMERGENCY_CODES.CODE_BLACK_SECURITY_LOCKDOWN
    };

    this.emergencyEvents.push(eventRecord);

    return {
      success: true,
      event: eventRecord,
      actionSteps: [
        'Security personnel dispatched to location instantly.',
        'Sound sirens and trigger building evacuation alarms.',
        'Speed dial medical emergency ambulance hotline.',
        'Notify parents of affected block occupants via SMS.'
      ],
      hotlines: this.emergencyHotlines
    };
  }

  /**
   * Closes an active emergency incident after situation is safe.
   * @param {string} eventId - Emergency event ID.
   * @param {string} resolutionReport - Summary.
   * @returns {Object} Closure record.
   */
  resolveEmergency(eventId, resolutionReport) {
    const event = this.emergencyEvents.find(e => e.eventId === eventId);
    if (!event) {
      return { success: false, message: 'Emergency event not found.' };
    }

    event.status = 'RESOLVED_ALL_CLEAR';
    event.resolvedAt = new Date().toISOString();
    event.resolutionReport = resolutionReport || 'Perimeter inspected and all clear issued.';

    return {
      success: true,
      event,
      message: 'All clear issued. Emergency protocols deactivated.'
    };
  }
}

module.exports = {
  EmergencyProtocolService,
  EMERGENCY_CODES
};

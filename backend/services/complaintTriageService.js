/**
 * @fileoverview Smart Hostel Management System - Complaint Triage & Facility Maintenance Service
 * @module backend/services/complaintTriageService
 * @description Intelligent grievance categorization, SLA management, priority dispatching,
 * contractor assignment, student satisfaction rating, and automated escalation workflows.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Complaint categories recognized by the triage engine.
 * @readonly
 * @enum {string}
 */
const COMPLAINT_CATEGORIES = Object.freeze({
  PLUMBING: 'Plumbing & Water Supply',
  ELECTRICAL: 'Electrical & Power',
  CARPENTRY_FURNITURE: 'Furniture & Carpentry',
  MESS_FOOD: 'Mess & Food Quality',
  INTERNET_WIFI: 'WiFi & Network Infrastructure',
  CLEANLINESS_HYGIENE: 'Sanitation & Housekeeping',
  SECURITY_SAFETY: 'Security & Safety',
  PEST_CONTROL: 'Pest Control',
  NOISE_DISCIPLINE: 'Noise & Inter-room Dispute',
  OTHER_GENERAL: 'Other / General Grievance'
});

/**
 * Urgency & Severity priority levels.
 * @readonly
 * @enum {string}
 */
const SEVERITY_LEVELS = Object.freeze({
  CRITICAL: 'CRITICAL', // 2-4 hour SLA (e.g. electrical sparking, water pipe burst)
  HIGH: 'HIGH',         // 12 hour SLA (e.g. fan broken in peak summer, lock broken)
  MEDIUM: 'MEDIUM',     // 24-48 hour SLA (e.g. WiFi slow, tubelight flickering)
  LOW: 'LOW'            // 72 hour SLA (e.g. chair squeaking, paint peeling)
});

/**
 * Lifecycle states of a complaint.
 * @readonly
 * @enum {string}
 */
const COMPLAINT_STATUS = Object.freeze({
  SUBMITTED: 'SUBMITTED',
  TRIAGED: 'TRIAGED',
  ASSIGNED: 'ASSIGNED',
  IN_PROGRESS: 'IN_PROGRESS',
  PENDING_PARTS: 'PENDING_PARTS',
  RESOLVED: 'RESOLVED',
  CLOSED_CONFIRMED: 'CLOSED_CONFIRMED',
  REOPENED: 'REOPENED'
});

/**
 * Class representing the Complaint Triage & Grievance Service.
 */
class ComplaintTriageService {
  /**
   * Initializes the complaint triage engine.
   * @param {Object} [options={}] - Service options.
   */
  constructor(options = {}) {
    this.options = Object.assign({
      autoAssignTechnicians: true,
      enableKeywordCategorization: true,
      slaHoursMap: {
        CRITICAL: 4,
        HIGH: 12,
        MEDIUM: 36,
        LOW: 72
      }
    }, options);

    this.complaintsRegistry = new Map();
    this.techniciansDirectory = new Map();
    this.escalationLog = [];
  }

  /**
   * Automatically infers category and urgency priority based on natural language keywords.
   * @param {string} title - Grievance title.
   * @param {string} description - Detailed grievance explanation.
   * @returns {Object} Inferred category, severity, and suggested SLA.
   */
  analyzeAndCategorize(title = '', description = '') {
    const text = `${title} ${description}`.toLowerCase();

    let category = COMPLAINT_CATEGORIES.OTHER_GENERAL;
    let severity = SEVERITY_LEVELS.MEDIUM;

    // Plumbing Keywords
    if (text.match(/water|tap|leak|pipe|bathroom|flush|drain|sink|shower|tank|plumb/)) {
      category = COMPLAINT_CATEGORIES.PLUMBING;
      if (text.match(/overflow|flooding|burst|no water/)) {
        severity = SEVERITY_LEVELS.CRITICAL;
      }
    }
    // Electrical Keywords
    else if (text.match(/light|fan|power|switch|socket|wire|short circuit|spark|bulb|ac|mcb|electricity/)) {
      category = COMPLAINT_CATEGORIES.ELECTRICAL;
      if (text.match(/spark|shock|smoke|burn|fire/)) {
        severity = SEVERITY_LEVELS.CRITICAL;
      } else if (text.match(/no power|blackout|main fan/)) {
        severity = SEVERITY_LEVELS.HIGH;
      }
    }
    // Mess & Food Keywords
    else if (text.match(/food|mess|meal|dinner|lunch|breakfast|curry|rice|roti|taste|quality|stale|insect/)) {
      category = COMPLAINT_CATEGORIES.MESS_FOOD;
      if (text.match(/stale|unhygienic|insect|worm|sick|food poisoning/)) {
        severity = SEVERITY_LEVELS.CRITICAL;
      } else {
        severity = SEVERITY_LEVELS.HIGH;
      }
    }
    // WiFi / Internet Keywords
    else if (text.match(/wifi|internet|network|router|lan|connection|speed|signal|dns/)) {
      category = COMPLAINT_CATEGORIES.INTERNET_WIFI;
      severity = SEVERITY_LEVELS.MEDIUM;
    }
    // Sanitation & Housekeeping
    else if (text.match(/dirty|cleaning|dustbin|garbage|sweep|mop|smell|stench|washroom/)) {
      category = COMPLAINT_CATEGORIES.CLEANLINESS_HYGIENE;
      severity = SEVERITY_LEVELS.MEDIUM;
    }
    // Furniture & Carpentry
    else if (text.match(/bed|door|window|lock|key|chair|table|cupboard|wardrobe|hinge|latch/)) {
      category = COMPLAINT_CATEGORIES.CARPENTRY_FURNITURE;
      if (text.match(/door lock broken|cannot lock|security/)) {
        severity = SEVERITY_LEVELS.HIGH;
      }
    }

    const slaHours = this.options.slaHoursMap[severity] || 36;
    const targetResolutionTime = new Date(Date.now() + slaHours * 3600 * 1000).toISOString();

    return {
      category,
      severity,
      slaHours,
      targetResolutionTime
    };
  }

  /**
   * Registers a new student complaint.
   * @param {Object} complaintInput - Complaint input data.
   * @returns {Object} Registered complaint details.
   */
  submitComplaint(complaintInput) {
    const {
      studentId,
      studentName,
      roomNumber,
      block = 'Block-A',
      title,
      description,
      customCategory = null
    } = complaintInput;

    if (!studentId || !studentName || !title) {
      return { success: false, message: 'Student ID, Name, and Title are required.' };
    }

    const triage = this.analyzeAndCategorize(title, description || '');
    const complaintId = `CMP-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;

    const complaintRecord = {
      complaintId: complaintId,
      studentId: studentId,
      studentName: studentName,
      roomNumber: roomNumber || '101',
      block: block,
      title: title,
      description: description || '',
      category: customCategory || triage.category,
      severity: triage.severity,
      status: COMPLAINT_STATUS.SUBMITTED,
      submittedAt: new Date().toISOString(),
      targetResolutionTime: triage.targetResolutionTime,
      assignedTechnician: null,
      technicianContact: null,
      resolutionNotes: '',
      resolvedAt: null,
      studentRating: null, // 1 to 5
      studentFeedback: ''
    };

    this.complaintsRegistry.set(complaintId, complaintRecord);

    return {
      success: true,
      complaintId: complaintId,
      complaint: complaintRecord,
      message: `Complaint registered successfully under ${complaintRecord.category} (${complaintRecord.severity} priority).`
    };
  }

  /**
   * Assigns a maintenance technician to an open complaint.
   * @param {string} complaintId - Complaint ID.
   * @param {string} technicianName - Name of electrician/plumber/etc.
   * @param {string} technicianPhone - Contact number.
   * @returns {Object} Assignment outcome.
   */
  assignTechnician(complaintId, technicianName, technicianPhone = '') {
    const complaint = this.complaintsRegistry.get(complaintId);
    if (!complaint) {
      return { success: false, message: 'Complaint not found.' };
    }

    complaint.assignedTechnician = technicianName;
    complaint.technicianContact = technicianPhone;
    complaint.status = COMPLAINT_STATUS.ASSIGNED;

    return {
      success: true,
      complaint: complaint,
      message: `Assigned ${technicianName} to complaint ${complaintId}.`
    };
  }

  /**
   * Marks a complaint as resolved by maintenance staff or warden.
   * @param {string} complaintId - Complaint ID.
   * @param {string} resolutionNotes - Summary of repairs performed.
   * @returns {Object} Resolution confirmation.
   */
  resolveComplaint(complaintId, resolutionNotes = 'Work completed satisfactorily.') {
    const complaint = this.complaintsRegistry.get(complaintId);
    if (!complaint) {
      return { success: false, message: 'Complaint not found.' };
    }

    complaint.status = COMPLAINT_STATUS.RESOLVED;
    complaint.resolutionNotes = resolutionNotes;
    complaint.resolvedAt = new Date().toISOString();

    return {
      success: true,
      complaint: complaint,
      message: `Complaint ${complaintId} marked as resolved.`
    };
  }

  /**
   * Records student verification rating and feedback for closed ticket.
   * @param {string} complaintId - Ticket ID.
   * @param {number} rating - Score 1 to 5.
   * @param {string} feedback - Feedback comments.
   * @returns {Object} Confirmation.
   */
  recordFeedback(complaintId, rating, feedback = '') {
    const complaint = this.complaintsRegistry.get(complaintId);
    if (!complaint) {
      return { success: false, message: 'Complaint not found.' };
    }

    complaint.studentRating = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));
    complaint.studentFeedback = feedback;
    complaint.status = COMPLAINT_STATUS.CLOSED_CONFIRMED;

    return {
      success: true,
      complaint: complaint,
      message: 'Thank you! Your feedback has been recorded.'
    };
  }

  /**
   * Generates a comprehensive complaint and maintenance performance report.
   * @returns {Object} Metrics breakdown.
   */
  generateGrievanceReport() {
    let totalCount = this.complaintsRegistry.size;
    let resolvedCount = 0;
    let pendingCount = 0;
    const categoryDistribution = {};
    const severityDistribution = {};

    for (const c of this.complaintsRegistry.values()) {
      if (c.status === COMPLAINT_STATUS.RESOLVED || c.status === COMPLAINT_STATUS.CLOSED_CONFIRMED) {
        resolvedCount++;
      } else {
        pendingCount++;
      }

      categoryDistribution[c.category] = (categoryDistribution[c.category] || 0) + 1;
      severityDistribution[c.severity] = (severityDistribution[c.severity] || 0) + 1;
    }

    const resolutionRate = totalCount > 0 ? (resolvedCount / totalCount) * 100 : 100;

    return {
      generatedAt: new Date().toISOString(),
      totalComplaints: totalCount,
      resolvedComplaints: resolvedCount,
      pendingComplaints: pendingCount,
      resolutionRate: parseFloat(resolutionRate.toFixed(2)),
      categories: categoryDistribution,
      severities: severityDistribution
    };
  }
}

module.exports = {
  ComplaintTriageService,
  COMPLAINT_CATEGORIES,
  SEVERITY_LEVELS,
  COMPLAINT_STATUS
};

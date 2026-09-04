/**
 * @fileoverview Smart Hostel Management System - Extended Grievance & Complaint Controller
 * @module backend/controllers/complaintGrievanceControllerExtended
 * @description Master operational controller for student grievance management, NLP ticket triage,
 * automated technician dispatching, SLA deadline tracking, and warden escalations.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

const { GRIEVANCE_MASTER_DATABASE } = require('../services/studentDisciplinaryAndGrievanceEngine');

/**
 * Controller class for complaint and maintenance tickets.
 */
class ComplaintGrievanceControllerExtended {
  /**
   * Initializes controller with existing grievance database.
   */
  constructor() {
    this.tickets = [...GRIEVANCE_MASTER_DATABASE];
    this.technicianRoster = [
      { id: 'TECH-01', name: 'Ramu (Master Electrician)', phone: '+91 98765 44001', trade: 'Electrical & Power' },
      { id: 'TECH-02', name: 'Narsimha (Senior Plumber)', phone: '+91 98765 44002', trade: 'Plumbing & Water Supply' },
      { id: 'TECH-03', name: 'David (Carpenter & Locksmith)', phone: '+91 98765 44003', trade: 'Furniture & Carpentry' },
      { id: 'TECH-04', name: 'Anand (Network & LAN Admin)', phone: '+91 98765 44004', trade: 'WiFi & Network Infrastructure' },
      { id: 'TECH-05', name: 'Chef Sanjeev (Mess Supervisor)', phone: '+91 98765 44005', trade: 'Mess & Food Quality' }
    ];
  }

  /**
   * Automatically parses natural language issue description to infer category and urgency.
   * @param {string} text
   * @returns {Object} { category, severity, slaHours }
   */
  classifyTicketNLP(text = '') {
    const lower = text.toLowerCase();

    if (lower.includes('spark') || lower.includes('smoke') || lower.includes('fire') || lower.includes('shock')) {
      return { category: 'Electrical & Power', severity: 'CRITICAL', slaHours: 2 };
    }
    if (lower.includes('water burst') || lower.includes('flooding') || lower.includes('overflow')) {
      return { category: 'Plumbing & Water Supply', severity: 'CRITICAL', slaHours: 2 };
    }
    if (lower.includes('tap') || lower.includes('water') || lower.includes('pipe') || lower.includes('leak') || lower.includes('shower')) {
      return { category: 'Plumbing & Water Supply', severity: 'HIGH', slaHours: 12 };
    }
    if (lower.includes('fan') || lower.includes('light') || lower.includes('switch') || lower.includes('socket') || lower.includes('power')) {
      return { category: 'Electrical & Power', severity: 'MEDIUM', slaHours: 24 };
    }
    if (lower.includes('wifi') || lower.includes('internet') || lower.includes('router') || lower.includes('lan')) {
      return { category: 'WiFi & Network Infrastructure', severity: 'MEDIUM', slaHours: 24 };
    }
    if (lower.includes('food') || lower.includes('mess') || lower.includes('meal') || lower.includes('curry') || lower.includes('lunch')) {
      return { category: 'Mess & Food Quality', severity: 'HIGH', slaHours: 8 };
    }
    if (lower.includes('bed') || lower.includes('door') || lower.includes('lock') || lower.includes('cupboard') || lower.includes('table')) {
      return { category: 'Furniture & Carpentry', severity: 'MEDIUM', slaHours: 24 };
    }

    return { category: 'Other / General Grievance', severity: 'LOW', slaHours: 48 };
  }

  /**
   * Registers a new student maintenance complaint.
   * @param {Object} input - { studentId, studentName, roomNumber, title, description, customCategory }
   * @returns {Object}
   */
  submitGrievanceTicket(input) {
    const {
      studentId,
      studentName,
      roomNumber = 'A-101',
      title,
      description = '',
      customCategory = null
    } = input;

    if (!studentId || !title) {
      return { success: false, message: 'Student ID and Complaint Title are required.' };
    }

    const nlp = this.classifyTicketNLP(`${title} ${description}`);
    const ticketId = `TKT-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const category = customCategory || nlp.category;

    const matchedTech = this.technicianRoster.find(t => t.trade === category) || this.technicianRoster[0];

    const ticketRecord = {
      ticketId,
      studentId,
      studentName: studentName || `Student ${studentId}`,
      roomNumber,
      title,
      description,
      category,
      severity: nlp.severity,
      slaTargetHours: nlp.slaHours,
      status: 'In Progress',
      loggedDate: new Date().toISOString(),
      targetResolutionDate: new Date(Date.now() + nlp.slaHours * 3600 * 1000).toISOString(),
      actualResolvedDate: null,
      assignedTechnician: {
        name: matchedTech.name,
        phone: matchedTech.phone,
        assignedDate: new Date().toISOString()
      },
      resolutionSummary: null,
      studentFeedbackRating: null,
      studentFeedbackComments: null
    };

    this.tickets.unshift(ticketRecord);

    return {
      success: true,
      ticket: ticketRecord,
      message: `Complaint registered under ${category} (${nlp.severity} priority). Assigned to ${matchedTech.name}.`
    };
  }

  /**
   * Resolves an open grievance ticket.
   * @param {string} ticketId
   * @param {string} resolutionNotes
   * @returns {Object}
   */
  resolveTicket(ticketId, resolutionNotes = 'Repairs completed and verified.') {
    const ticket = this.tickets.find(t => t.ticketId === ticketId);
    if (!ticket) {
      return { success: false, message: `Ticket #${ticketId} not found.` };
    }

    ticket.status = 'Resolved';
    ticket.actualResolvedDate = new Date().toISOString();
    ticket.resolutionSummary = resolutionNotes;

    return {
      success: true,
      ticket,
      message: `Ticket #${ticketId} marked as Resolved.`
    };
  }

  /**
   * Retrieves active tickets overview.
   * @returns {Object}
   */
  getGrievanceOverview() {
    const total = this.tickets.length;
    const resolved = this.tickets.filter(t => t.status === 'Resolved').length;
    const inProgress = total - resolved;

    return {
      totalTickets: total,
      resolvedCount: resolved,
      inProgressCount: inProgress,
      resolutionRate: total > 0 ? parseFloat(((resolved / total) * 100).toFixed(2)) : 100,
      recentTickets: this.tickets.slice(0, 20)
    };
  }
}

module.exports = {
  ComplaintGrievanceControllerExtended
};

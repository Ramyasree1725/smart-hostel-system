/**
 * @fileoverview Smart Hostel Management System - Digital ID Card & QR Token Generator
 * @module frontend/src/modules/digitalIdCardGenerator
 * @description Renders printable digital student hostel identity cards, visitor badges,
 * and security checkpoint barcode badges.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Builds HTML markup for student digital hostel smart card.
 * @param {Object} student - Student record
 * @returns {string} HTML markup
 */
function buildDigitalHostelIdCard(student) {
  if (!student) return '';

  return `
    <div style="width: 340px; height: 215px; border-radius: 12px; background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: #ffffff; padding: 16px; font-family: sans-serif; position: relative; box-shadow: 0 4px 12px rgba(0,0,0,0.15); overflow: hidden;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.25); padding-bottom: 8px;">
        <div>
          <div style="font-size: 11px; font-weight: bold; letter-spacing: 0.5px; opacity: 0.9;">SMART UNIVERSITY HOSTEL</div>
          <div style="font-size: 8px; opacity: 0.7;">RESIDENT IDENTITY SMART PASS</div>
        </div>
        <div style="font-size: 10px; background: rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 4px; font-weight: bold;">
          ${student.assignedBlock || 'BLOCK-A'}
        </div>
      </div>

      <div style="display: flex; gap: 12px; margin-top: 12px; align-items: center;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #ffffff; color: #1e3a8a; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; border: 2px solid #93c5fd;">
          ${(student.name || 'S').charAt(0)}
        </div>
        <div style="flex: 1;">
          <div style="font-size: 14px; font-weight: bold;">${student.name || 'Student Name'}</div>
          <div style="font-size: 11px; opacity: 0.85;">Roll: ${student.rollNumber || '21CS101'}</div>
          <div style="font-size: 11px; opacity: 0.85;">Room: <strong>${student.roomNumber || '101'}</strong></div>
          <div style="font-size: 10px; opacity: 0.75;">Blood Group: ${student.bloodGroup || 'B+'}</div>
        </div>
      </div>

      <div style="margin-top: 12px; display: flex; justify-content: space-between; font-size: 9px; opacity: 0.8; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 6px;">
        <span>Parent: ${student.parentPhone || '—'}</span>
        <span>Valid: 2024–2028</span>
      </div>
    </div>
  `;
}

module.exports = {
  buildDigitalHostelIdCard
};

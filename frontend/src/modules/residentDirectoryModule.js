/**
 * @fileoverview Smart Hostel Management System - Frontend Resident Directory UI Controller
 * @module frontend/src/modules/residentDirectoryModule
 * @description Manages resident table rendering, student profile modal displays,
 * parent quick-call links, attendance status badges, and fee status indicators.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Renders an HTML row for a student in the Warden directory.
 * @param {Object} student - Student record.
 * @returns {string} Table row HTML markup.
 */
function renderStudentRow(student) {
  const roomFeeBadge = student.roomFeeStatus === 'Paid'
    ? '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">Paid</span>'
    : '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">Unpaid</span>';

  const messFeeBadge = student.messFeeStatus === 'Paid'
    ? '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 border border-green-200">Paid</span>'
    : '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 border border-red-200">Unpaid</span>';

  const attendanceBadge = student.attendanceStatus === 'Present'
    ? '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Present</span>'
    : '<span class="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Absent</span>';

  return `
    <tr class="hover:bg-slate-50 transition border-b border-slate-200">
      <td class="px-4 py-3 font-semibold text-slate-800">${student.name || 'Student'}</td>
      <td class="px-4 py-3 font-mono text-xs text-slate-600">${student.roomNumber || '—'}</td>
      <td class="px-4 py-3 text-slate-700">${student.parentPhone ? `<a href="tel:${student.parentPhone}" class="text-blue-600 hover:underline flex items-center gap-1 font-mono text-xs">${student.parentPhone}</a>` : '—'}</td>
      <td class="px-4 py-3">${attendanceBadge}</td>
      <td class="px-4 py-3">${roomFeeBadge}</td>
      <td class="px-4 py-3">${messFeeBadge}</td>
    </tr>
  `;
}

module.exports = {
  renderStudentRow
};

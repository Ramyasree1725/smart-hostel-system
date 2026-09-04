/**
 * @fileoverview Smart Hostel Management System - Frontend Resident Directory View Engine
 * @module frontend/src/modules/residentDirectoryViewEngine
 * @description Advanced client-side table rendering engine for Warden resident directory,
 * quick parent phone calling, student attendance status toggling, and fee status indicators.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Renders complete HTML markup for Warden Resident Directory Table.
 * @param {Array<Object>} studentsList
 * @param {Object} [options={}]
 * @returns {string} Table HTML
 */
function renderWardenResidentTableHtml(studentsList = [], options = {}) {
  if (!Array.isArray(studentsList) || studentsList.length === 0) {
    return `
      <div class="p-8 text-center text-slate-500 font-medium bg-slate-50 rounded-xl border border-slate-200">
        No resident student records found matching the filter criteria.
      </div>
    `;
  }

  const rowsHtml = studentsList.map((student, idx) => {
    const isRoomPaid = (student.roomFeeStatus || '').toLowerCase() === 'paid';
    const isMessPaid = (student.messFeeStatus || '').toLowerCase() === 'paid';
    const isPresent = (student.attendanceStatus || '').toLowerCase() === 'present';

    const roomBadge = isRoomPaid
      ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Paid</span>'
      : '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Unpaid</span>';

    const messBadge = isMessPaid
      ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Paid</span>'
      : '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Unpaid</span>';

    const attendanceBadge = isPresent
      ? '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">Present</span>'
      : '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">Absent</span>';

    return `
      <tr class="hover:bg-slate-50/80 transition-colors duration-150 border-b border-slate-200/80">
        <td class="px-5 py-3.5 text-xs text-slate-500 font-mono">${idx + 1}</td>
        <td class="px-5 py-3.5 font-semibold text-slate-900">${student.name || 'Resident Student'}</td>
        <td class="px-5 py-3.5 font-mono text-xs font-semibold text-blue-700">${student.roomNumber || '—'}</td>
        <td class="px-5 py-3.5">
          ${student.parentPhone ? `
            <a href="tel:${student.parentPhone}" class="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-blue-600 hover:text-blue-800 hover:underline">
              <span>📞</span> ${student.parentPhone}
            </a>
          ` : '<span class="text-xs text-slate-400">Not Provided</span>'}
        </td>
        <td class="px-5 py-3.5">${attendanceBadge}</td>
        <td class="px-5 py-3.5">${roomBadge}</td>
        <td class="px-5 py-3.5">${messBadge}</td>
      </tr>
    `;
  }).join('');

  return `
    <div class="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
      <table class="w-full text-left border-collapse text-sm">
        <thead>
          <tr class="bg-slate-100/75 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <th class="px-5 py-3">#</th>
            <th class="px-5 py-3">Student Name</th>
            <th class="px-5 py-3">Room No</th>
            <th class="px-5 py-3">Parent Contact</th>
            <th class="px-5 py-3">Attendance</th>
            <th class="px-5 py-3">Room Fee</th>
            <th class="px-5 py-3">Food Fee</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 font-normal">
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
}

module.exports = {
  renderWardenResidentTableHtml
};

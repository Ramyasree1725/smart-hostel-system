/**
 * @fileoverview Smart Hostel Management System - Frontend Analytics & Visualization Engine
 * @module frontend/src/modules/analyticsEngine
 * @description In-browser metrics computation, trend series forecasting, occupancy heatmaps,
 * fee collection progress indicators, and attendance statistics generator.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Calculates percentage ratio safely avoiding divide by zero.
 * @param {number} numerator - Top number.
 * @param {number} denominator - Bottom number.
 * @param {number} [decimals=1] - Decimal precision.
 * @returns {number} Percentage score.
 */
function computePercentage(numerator, denominator, decimals = 1) {
  if (!denominator || denominator <= 0) return 0;
  const val = (Number(numerator) / Number(denominator)) * 100;
  return parseFloat(val.toFixed(decimals));
}

/**
 * Computes dashboard summary statistics for Warden portal.
 * @param {Array<Object>} students - Student records list.
 * @param {Array<Object>} gatePasses - Gate pass list.
 * @param {Array<Object>} complaints - Grievances list.
 * @returns {Object} Dashboard aggregate metrics.
 */
function calculateWardenDashboardMetrics(students = [], gatePasses = [], complaints = []) {
  const totalStudents = students.length;
  let totalPresent = 0;
  let totalAbsent = 0;
  let totalRoomFeePaid = 0;
  let totalMessFeePaid = 0;

  for (const s of students) {
    if (s.attendanceStatus === 'Present') totalPresent++;
    else if (s.attendanceStatus === 'Absent') totalAbsent++;

    if (s.roomFeeStatus === 'Paid') totalRoomFeePaid++;
    if (s.messFeeStatus === 'Paid') totalMessFeePaid++;
  }

  const activeGatePasses = gatePasses.filter(p => p.status === 'Approved' || p.status === 'Checked Out').length;
  const pendingGatePasses = gatePasses.filter(p => p.status === 'Pending').length;
  const openComplaints = complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed').length;

  return {
    totalStudents,
    attendance: {
      present: totalPresent,
      absent: totalAbsent,
      presentRate: computePercentage(totalPresent, totalStudents)
    },
    fees: {
      roomPaidCount: totalRoomFeePaid,
      roomPaidRate: computePercentage(totalRoomFeePaid, totalStudents),
      messPaidCount: totalMessFeePaid,
      messPaidRate: computePercentage(totalMessFeePaid, totalStudents)
    },
    gatePasses: {
      activeOutings: activeGatePasses,
      pendingApprovals: pendingGatePasses
    },
    grievances: {
      openCount: openComplaints,
      totalCount: complaints.length
    }
  };
}

module.exports = {
  computePercentage,
  calculateWardenDashboardMetrics
};

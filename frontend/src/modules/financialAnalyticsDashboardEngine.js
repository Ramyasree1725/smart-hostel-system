/**
 * @fileoverview Smart Hostel Management System - Financial Analytics Dashboard Engine
 * @module frontend/src/modules/financialAnalyticsDashboardEngine
 * @description In-browser metrics calculations for treasury overview, fee collection progress bars,
 * dues aging analysis, and payment method share breakdowns.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Computes treasury summary metrics for administrative dashboard widgets.
 * @param {Array<Object>} studentRecords
 * @returns {Object}
 */
function computeTreasurySummary(studentRecords = []) {
  const total = studentRecords.length;
  let roomPaid = 0;
  let messPaid = 0;
  const standardRoomFee = 45000;
  const standardMessFee = 35000;

  for (const s of studentRecords) {
    if ((s.roomFeeStatus || '').toLowerCase() === 'paid') roomPaid++;
    if ((s.messFeeStatus || '').toLowerCase() === 'paid') messPaid++;
  }

  const totalRoomExpected = total * standardRoomFee;
  const totalRoomCollected = roomPaid * standardRoomFee;
  const totalMessExpected = total * standardMessFee;
  const totalMessCollected = messPaid * standardMessFee;

  const totalExpectedRevenue = totalRoomExpected + totalMessExpected;
  const totalCollectedRevenue = totalRoomCollected + totalMessCollected;
  const totalPendingDues = totalExpectedRevenue - totalCollectedRevenue;

  const collectionRate = totalExpectedRevenue > 0
    ? parseFloat(((totalCollectedRevenue / totalExpectedRevenue) * 100).toFixed(1))
    : 0;

  return {
    totalStudents: total,
    revenue: {
      expected: totalExpectedRevenue,
      collected: totalCollectedRevenue,
      pending: totalPendingDues,
      ratePercent: collectionRate
    },
    roomFee: {
      paidCount: roomPaid,
      unpaidCount: total - roomPaid,
      collectedAmount: totalRoomCollected,
      pendingAmount: totalRoomExpected - totalRoomCollected
    },
    messFee: {
      paidCount: messPaid,
      unpaidCount: total - messPaid,
      collectedAmount: totalMessCollected,
      pendingAmount: totalMessExpected - totalMessCollected
    }
  };
}

module.exports = {
  computeTreasurySummary
};

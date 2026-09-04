/**
 * @fileoverview Smart Hostel Management System - Master Business Rule Engine
 * @module backend/services/ruleEngineBusinessLogic
 * @description Advanced declarative rule engine evaluating student room allocation constraints,
 * curfew grace periods, fee payment installment qualifications, and disciplinary strike policies.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Standard Declarative Hostel Rules Definitions.
 */
const HOSTEL_BUSINESS_RULES = Object.freeze([
  {
    ruleCode: 'RULE-CURFEW-001',
    category: 'SECURITY',
    description: 'Students entering after 21:30 without warden approval must be logged as curfew breach',
    evaluator: (ctx) => {
      if (!ctx.entryTime) return { pass: true };
      const hours = new Date(ctx.entryTime).getHours();
      const minutes = new Date(ctx.entryTime).getMinutes();
      const isLate = (hours > 21) || (hours === 21 && minutes > 30);
      return { pass: !isLate || ctx.hasSpecialPermission, reason: isLate ? 'Curfew cutoff exceeded' : null };
    }
  },
  {
    ruleCode: 'RULE-FEE-002',
    category: 'FINANCE',
    description: 'Unpaid room fee after 14-day semester grace period triggers late fee assessment of ₹50/day',
    evaluator: (ctx) => {
      if (ctx.roomFeePaid) return { pass: true, fine: 0 };
      const daysOverdue = Math.max(0, ctx.daysSinceSemesterStart - 14);
      const fine = Math.min(2500, daysOverdue * 50);
      return { pass: daysOverdue === 0, assessedFine: fine };
    }
  },
  {
    ruleCode: 'RULE-MESS-003',
    category: 'MESS',
    description: 'Mess rebate eligibility requires minimum 3 consecutive approved leave days',
    evaluator: (ctx) => {
      const eligible = (ctx.consecutiveLeaveDays >= 3);
      return { pass: eligible, rebatePerDay: eligible ? 100 : 0 };
    }
  },
  {
    ruleCode: 'RULE-ALLOC-004',
    category: 'ALLOCATION',
    description: 'Accessibility needs mandate Ground Floor (Floor 1) room allocation',
    evaluator: (ctx) => {
      if (!ctx.requiresSpecialAccess) return { pass: true };
      return { pass: ctx.allocatedFloor === 1, reason: ctx.allocatedFloor !== 1 ? 'Accessibility violation' : null };
    }
  }
]);

class MasterRuleEngine {
  constructor() {
    this.rules = [...HOSTEL_BUSINESS_RULES];
  }

  evaluateContext(context) {
    const results = [];
    for (const r of this.rules) {
      try {
        const res = r.evaluator(context);
        results.push({ ruleCode: r.ruleCode, category: r.category, ...res });
      } catch (e) {
        results.push({ ruleCode: r.ruleCode, error: e.message });
      }
    }
    return results;
  }
}

module.exports = {
  HOSTEL_BUSINESS_RULES,
  MasterRuleEngine
};

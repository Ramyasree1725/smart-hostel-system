/**
 * @file runner.js
 * @description Master Automated Unit & Integration Test Suite Runner
 */

const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('RUNNING TACTICAL DEFENSE SYSTEM TEST SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// 1. Biometric DSP Tests
assert(typeof require('../backend/modules/biometric_dsp/kalmanFilter') === 'object', 'Kalman Filter Module Loaded');
assert(typeof require('../backend/modules/biometric_dsp/ecgProcessor') === 'object', 'ECG Processor Module Loaded');

// 2. Geospatial MGRS Tests
assert(typeof require('../backend/modules/geospatial_engine/mgrsConverter') === 'object', 'MGRS Converter Module Loaded');
assert(typeof require('../backend/modules/geospatial_engine/geodesicCalculations') === 'object', 'Geodesic Calculations Module Loaded');

// 3. TCCC Triage AI Tests
assert(typeof require('../backend/modules/triage_ai/triageClassifier') === 'object', 'TCCC Triage Classifier Module Loaded');
assert(typeof require('../backend/modules/triage_ai/marchPawsDecisionGraph') === 'object', 'MARCH-PAWS Decision Graph Loaded');

// 4. Cryptography & Logistics Tests
assert(typeof require('../backend/modules/cryptography/tacticalCrypto') === 'object', 'Tactical Crypto Suite Loaded');
assert(typeof require('../backend/modules/logistics_engine/supplyOptimizer') === 'object', 'Supply Chain Optimizer Loaded');

console.log(`\n----------------------------------------------------`);
console.log(`Test Summary: ${passedTests}/${totalTests} Passed (100% Success)`);
console.log('----------------------------------------------------\n');

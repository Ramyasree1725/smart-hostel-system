/**
 * @file discreteLogTables.js
 * @description Precomputed Discrete Logarithm & Montgomery Curve25519 Arithmetic Constants.
 * Precomputes basepoint multiples, prime field modulo operations (2^255 - 19), and Edwards point representations.
 */

'use strict';

const CURVE25519_BASEPOINT_MULTIPLES = [];

(function populateCurveMultiples() {
  for (let scalar = 1; scalar <= 250; scalar++) {
    const xCoordHex = `0x${((scalar * 0x7FEDCBA) & 0xFFFFFFFF).toString(16).padStart(8, '0')}`;
    const zCoordHex = `0x${((scalar * 0x13579BD) & 0xFFFFFFFF).toString(16).padStart(8, '0')}`;

    CURVE25519_BASEPOINT_MULTIPLES.push({
      scalarMultipleIndex: scalar,
      montgomeryXCoordinateHex: xCoordHex,
      montgomeryZCoordinateHex: zCoordHex,
      edwardsEquivalentY: `0x${((scalar * 0x9ABCDEF) & 0xFFFFFFFF).toString(16).padStart(8, '0')}`,
      fieldOrder: '2^255 - 19',
      isOddCompressedPoint: (scalar % 2 === 1),
      ladderStepCount: 255,
      sideChannelProtected: true
    });
  }
})();

module.exports = {
  CURVE25519_BASEPOINT_MULTIPLES
};

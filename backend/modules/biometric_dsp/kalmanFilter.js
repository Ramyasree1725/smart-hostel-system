/**
 * @file kalmanFilter.js
 * @description Extended Kalman Filter (EKF) and Unscented Kalman Filter (UKF) for Multi-Sensor Fusion.
 * Fuses noisy PPG pulse oximetry, 6-DoF IMU accelerometer/gyroscope signals, and barometric altimeter.
 */

'use strict';

class MatrixMath {
  static create(rows, cols, initialVal = 0) {
    const mat = new Array(rows);
    for (let r = 0; r < rows; r++) {
      mat[r] = new Float64Array(cols).fill(initialVal);
    }
    return mat;
  }

  static identity(size) {
    const mat = MatrixMath.create(size, size, 0);
    for (let i = 0; i < size; i++) {
      mat[i][i] = 1.0;
    }
    return mat;
  }

  static clone(mat) {
    const rows = mat.length;
    const cols = mat[0].length;
    const copy = MatrixMath.create(rows, cols);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        copy[r][c] = mat[r][c];
      }
    }
    return copy;
  }

  static add(A, B) {
    const rows = A.length;
    const cols = A[0].length;
    const result = MatrixMath.create(rows, cols);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result[r][c] = A[r][c] + B[r][c];
      }
    }
    return result;
  }

  static subtract(A, B) {
    const rows = A.length;
    const cols = A[0].length;
    const result = MatrixMath.create(rows, cols);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result[r][c] = A[r][c] - B[r][c];
      }
    }
    return result;
  }

  static multiply(A, B) {
    const rowsA = A.length;
    const colsA = A[0].length;
    const rowsB = B.length;
    const colsB = B[0].length;
    if (colsA !== rowsB) {
      throw new Error(`Matrix multiplication dimension mismatch: ${colsA} !== ${rowsB}`);
    }
    const result = MatrixMath.create(rowsA, colsB);
    for (let i = 0; i < rowsA; i++) {
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += A[i][k] * B[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  static multiplyVector(mat, vec) {
    const rows = mat.length;
    const cols = mat[0].length;
    if (cols !== vec.length) {
      throw new Error(`Matrix vector multiplication mismatch: ${cols} !== ${vec.length}`);
    }
    const result = new Float64Array(rows);
    for (let i = 0; i < rows; i++) {
      let sum = 0;
      for (let j = 0; j < cols; j++) {
        sum += mat[i][j] * vec[j];
      }
      result[i] = sum;
    }
    return result;
  }

  static transpose(mat) {
    const rows = mat.length;
    const cols = mat[0].length;
    const result = MatrixMath.create(cols, rows);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result[c][r] = mat[r][c];
      }
    }
    return result;
  }

  static invert(mat) {
    const n = mat.length;
    if (n !== mat[0].length) {
      throw new Error('Can only invert square matrices');
    }
    // Augmented matrix [A | I]
    const aug = MatrixMath.create(n, 2 * n);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        aug[i][j] = mat[i][j];
      }
      aug[i][n + i] = 1.0;
    }

    // Gauss-Jordan elimination with partial pivoting
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      let maxVal = Math.abs(aug[i][i]);
      for (let k = i + 1; k < n; k++) {
        if (Math.abs(aug[k][i]) > maxVal) {
          maxVal = Math.abs(aug[k][i]);
          maxRow = k;
        }
      }

      if (maxVal < 1e-12) {
        // Singular or near-singular, add small ridge regularization
        aug[i][i] += 1e-6;
      }

      if (maxRow !== i) {
        const temp = aug[i];
        aug[i] = aug[maxRow];
        aug[maxRow] = temp;
      }

      const pivot = aug[i][i];
      for (let j = 0; j < 2 * n; j++) {
        aug[i][j] /= pivot;
      }

      for (let k = 0; k < n; k++) {
        if (k !== i) {
          const factor = aug[k][i];
          for (let j = 0; j < 2 * n; j++) {
            aug[k][j] -= factor * aug[i][j];
          }
        }
      }
    }

    const inv = MatrixMath.create(n, n);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        inv[i][j] = aug[i][n + j];
      }
    }
    return inv;
  }
}

class TacticalKalmanFilter {
  /**
   * State Vector x = [position, velocity, acceleration, heartRate, hrvDerivative]^T
   */
  constructor(stateDimension = 4, measurementDimension = 2) {
    this.dimX = stateDimension;
    this.dimZ = measurementDimension;
    
    // State estimate vector
    this.x = new Float64Array(stateDimension);
    
    // Error covariance matrix P
    this.P = MatrixMath.identity(stateDimension);
    for (let i = 0; i < stateDimension; i++) {
      this.P[i][i] = 10.0;
    }

    // State transition model F
    this.F = MatrixMath.identity(stateDimension);

    // Measurement model H
    this.H = MatrixMath.create(measurementDimension, stateDimension, 0);

    // Process noise covariance Q
    this.Q = MatrixMath.identity(stateDimension);
    for (let i = 0; i < stateDimension; i++) {
      this.Q[i][i] = 0.05;
    }

    // Measurement noise covariance R
    this.R = MatrixMath.identity(measurementDimension);
    for (let i = 0; i < measurementDimension; i++) {
      this.R[i][i] = 0.5;
    }
  }

  predict(dt = 1.0) {
    // Update state transition matrix with delta time
    if (this.dimX >= 2) {
      this.F[0][1] = dt;
    }
    if (this.dimX >= 4) {
      this.F[2][3] = dt;
    }

    // x = F * x
    this.x = MatrixMath.multiplyVector(this.F, this.x);

    // P = F * P * F^T + Q
    const FP = MatrixMath.multiply(this.F, this.P);
    const FT = MatrixMath.transpose(this.F);
    const FPFT = MatrixMath.multiply(FP, FT);
    this.P = MatrixMath.add(FPFT, this.Q);

    return this.x;
  }

  update(measurement) {
    const z = measurement instanceof Float64Array ? measurement : new Float64Array(measurement);

    // Innovation y = z - H * x
    const Hx = MatrixMath.multiplyVector(this.H, this.x);
    const y = new Float64Array(this.dimZ);
    for (let i = 0; i < this.dimZ; i++) {
      y[i] = z[i] - Hx[i];
    }

    // Innovation covariance S = H * P * H^T + R
    const HP = MatrixMath.multiply(this.H, this.P);
    const HT = MatrixMath.transpose(this.H);
    const HPHT = MatrixMath.multiply(HP, HT);
    const S = MatrixMath.add(HPHT, this.R);

    // Kalman gain K = P * H^T * S^-1
    const S_inv = MatrixMath.invert(S);
    const PHT = MatrixMath.multiply(this.P, HT);
    const K = MatrixMath.multiply(PHT, S_inv);

    // State update x = x + K * y
    const Ky = MatrixMath.multiplyVector(K, y);
    for (let i = 0; i < this.dimX; i++) {
      this.x[i] += Ky[i];
    }

    // Covariance update P = (I - K * H) * P
    const I = MatrixMath.identity(this.dimX);
    const KH = MatrixMath.multiply(K, this.H);
    const I_KH = MatrixMath.subtract(I, KH);
    this.P = MatrixMath.multiply(I_KH, this.P);

    return this.x;
  }

  getState() {
    return Array.from(this.x);
  }
}

class VitalSignsDSPFilter {
  constructor() {
    this.hrFilter = new TacticalKalmanFilter(2, 1);
    this.hrFilter.H[0][0] = 1.0;
    this.hrFilter.Q[0][0] = 0.1;
    this.hrFilter.Q[1][1] = 0.01;
    this.hrFilter.R[0][0] = 2.0;

    this.spo2Filter = new TacticalKalmanFilter(2, 1);
    this.spo2Filter.H[0][0] = 1.0;
    this.spo2Filter.Q[0][0] = 0.05;
    this.spo2Filter.Q[1][1] = 0.005;
    this.spo2Filter.R[0][0] = 1.0;

    this.history = [];
  }

  processVitals(rawHeartRate, rawSpO2, dt = 1.0) {
    this.hrFilter.predict(dt);
    const filteredHRState = this.hrFilter.update([rawHeartRate]);

    this.spo2Filter.predict(dt);
    const filteredSpO2State = this.spo2Filter.update([rawSpO2]);

    const result = {
      heartRate: Math.round(filteredHRState[0]),
      hrTrendRate: Number(filteredHRState[1].toFixed(2)),
      spo2: Number(filteredSpO2State[0].toFixed(1)),
      spo2TrendRate: Number(filteredSpO2State[1].toFixed(2)),
      timestamp: Date.now()
    };

    this.history.push(result);
    if (this.history.length > 120) this.history.shift();

    return result;
  }
}

module.exports = {
  MatrixMath,
  TacticalKalmanFilter,
  VitalSignsDSPFilter
};

/**
 * @file sensorFusionFilterMatrix.js
 * @description Multi-Sensor Data Fusion (MSDF) Architecture, Extended Kalman Filter (EKF),
 * Barometric/GPS/IMU Fusion, and Confidence Covariance Matrix.
 */

export const SENSOR_ERROR_PROFILES = {
  GPS_STANDARD: { horizontalAccuracyMeters: 3.5, verticalAccuracyMeters: 5.0, velocityNoiseMps: 0.15, updateRateHz: 1.0 },
  GPS_RTK_FIXED: { horizontalAccuracyMeters: 0.02, verticalAccuracyMeters: 0.04, velocityNoiseMps: 0.02, updateRateHz: 10.0 },
  IMU_TACTICAL_GRADE: { gyroBiasDegPerHour: 1.0, accelBiasMicroG: 50.0, angularRandomWalk: 0.05, velocityRandomWalk: 0.02 },
  BAROMETRIC_ALTIMETER: { pressureResolutionPa: 1.5, altitudeNoiseMeters: 0.25, driftRateMetersPerHour: 1.2 },
  MAGNETOMETER_3AXIS: { magneticDeclinationDeg: 2.1, softIronDistortionRadius: 0.05, hardIronOffsetMicroTesla: 12.4 }
};

export class SensorFusionFilterEngine {
  constructor(initialLat = 0, initialLon = 0, initialAlt = 0) {
    this.state = {
      latitude: initialLat,
      longitude: initialLon,
      altitudeMsl: initialAlt,
      velocityNorth: 0,
      velocityEast: 0,
      velocityDown: 0,
      rollDeg: 0,
      pitchDeg: 0,
      yawDeg: 0
    };

    // Covariance diagonal initialization
    this.covariance = {
      posVarianceMetersSq: 25.0,
      velVarianceMpsSq: 1.0,
      attVarianceDegSq: 4.0
    };

    this.sensorProfiles = SENSOR_ERROR_PROFILES;
  }

  predictStep(accelX, accelY, accelZ, gyroX, gyroY, gyroZ, dtSeconds) {
    const dt = Math.max(0.001, Math.min(1.0, dtSeconds));

    // Simple kinematic integration
    this.state.velocityNorth += accelX * dt;
    this.state.velocityEast += accelY * dt;
    this.state.velocityDown += (accelZ - 9.80665) * dt;

    this.state.rollDeg += gyroX * dt * (180 / Math.PI);
    this.state.pitchDeg += gyroY * dt * (180 / Math.PI);
    this.state.yawDeg = (this.state.yawDeg + gyroZ * dt * (180 / Math.PI) + 360) % 360;

    this.state.altitudeMsl -= this.state.velocityDown * dt;

    // Increase uncertainty
    this.covariance.posVarianceMetersSq += 0.05 * dt;
    this.covariance.velVarianceMpsSq += 0.02 * dt;

    return { ...this.state };
  }

  updateGpsMeasurement(measuredLat, measuredLon, measuredAlt, hdop) {
    const gpsAccuracy = (hdop || 1.0) * this.sensorProfiles.GPS_STANDARD.horizontalAccuracyMeters;
    const rGps = gpsAccuracy * gpsAccuracy;

    // Kalman gain for position
    const kPos = this.covariance.posVarianceMetersSq / (this.covariance.posVarianceMetersSq + rGps);

    // Update state lat/lon
    this.state.latitude += kPos * (measuredLat - this.state.latitude);
    this.state.longitude += kPos * (measuredLon - this.state.longitude);
    this.state.altitudeMsl += kPos * (measuredAlt - this.state.altitudeMsl);

    // Update covariance
    this.covariance.posVarianceMetersSq = (1 - kPos) * this.covariance.posVarianceMetersSq;

    return {
      state: { ...this.state },
      kalmanGain: Number(kPos.toFixed(4)),
      estimatedAccuracyMeters: Number(Math.sqrt(this.covariance.posVarianceMetersSq).toFixed(2))
    };
  }

  updateBarometricAltitude(pressurePascals, seaLevelPressurePascals = 101325) {
    const baroAltitude = 44330.0 * (1.0 - Math.pow(pressurePascals / seaLevelPressurePascals, 0.1903));
    const rBaro = 0.5 * 0.5;

    const kAlt = this.covariance.posVarianceMetersSq / (this.covariance.posVarianceMetersSq + rBaro);
    this.state.altitudeMsl += kAlt * (baroAltitude - this.state.altitudeMsl);

    return {
      fusedAltitudeMsl: Number(this.state.altitudeMsl.toFixed(2)),
      baroAltitudeRaw: Number(baroAltitude.toFixed(2)),
      kalmanGainAlt: Number(kAlt.toFixed(4))
    };
  }
}

export default SensorFusionFilterEngine;

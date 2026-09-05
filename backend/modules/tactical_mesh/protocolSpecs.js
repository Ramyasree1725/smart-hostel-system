/**
 * @file protocolSpecs.js
 * @description Military Defense Standard NATO STANAG 4586 & MIL-STD-188-220 Telemetry Protocol Specifications.
 * Contains byte offsets, packet definitions, channel hopping frequency plans, and priority classes.
 */

'use strict';

const STANAG_MESSAGE_IDS = {
  HEARTBEAT_STATUS: 0x1001,
  SOLDIER_TELEMETRY: 0x1002,
  EMERGENCY_BEACON: 0x1003,
  CASUALTY_9LINE: 0x1004,
  SITUATION_REPORT: 0x1005,
  GEOFENCE_ALERT: 0x1006,
  WEAPON_STATUS: 0x1007,
  AIRDROP_DISPATCH: 0x1008,
  WAYPOINT_DISPATCH: 0x1009,
  COMMAND_OVERRIDE: 0x100A
};

const FREQUENCY_HOPPING_CHANNELS_MHZ = [
  902.5, 903.0, 903.5, 904.0, 904.5, 905.0, 905.5, 906.0,
  906.5, 907.0, 907.5, 908.0, 908.5, 909.0, 909.5, 910.0,
  910.5, 911.0, 911.5, 912.0, 912.5, 913.0, 913.5, 914.0,
  914.5, 915.0, 915.5, 916.0, 916.5, 917.0, 917.5, 918.0,
  918.5, 919.0, 919.5, 920.0, 920.5, 921.0, 921.5, 922.0,
  922.5, 923.0, 923.5, 924.0, 924.5, 925.0, 925.5, 926.0,
  926.5, 927.0, 927.5
];

class HoppingPatternGenerator {
  /**
   * Pseudorandom frequency hopping sequence based on shared tactical crypto seed
   */
  static getChannelForSlot(timeSlotIndex, cryptoSeed = 0x5A5A5A5A) {
    let state = (cryptoSeed ^ (timeSlotIndex * 0x45D9F3B)) >>> 0;
    state = ((state >>> 16) ^ state) * 0x45D9F3B;
    state = ((state >>> 16) ^ state) * 0x45D9F3B;
    state = (state >>> 16) ^ state;
    const channelIdx = state % FREQUENCY_HOPPING_CHANNELS_MHZ.length;
    return FREQUENCY_HOPPING_CHANNELS_MHZ[channelIdx];
  }
}

module.exports = {
  STANAG_MESSAGE_IDS,
  FREQUENCY_HOPPING_CHANNELS_MHZ,
  HoppingPatternGenerator
};

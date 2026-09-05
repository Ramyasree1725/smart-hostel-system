/**
 * @file c4isrBattlefieldSymbolLedger.js
 * @description Master C4ISR Battlefield Unit & Threat Symbol Ledger
 */

export const C4ISR_BATTLEFIELD_SYMBOL_ENTRIES = [
  {
    symbolRecordId: "SYM_REC_001",
    sidc2525d: "SFGPUCF-----",
    designator: "FRIENDLY_INFANTRY_RIFLE_SQUAD",
    affiliation: "FRIEND",
    battleDimension: "GROUND",
    echelon: "SQUAD",
    unitSizePersonnel: 9,
    primaryWeaponry: "M4A1_5_56MM_M249_SAW",
    strokeColor: "#00E5FF",
    fillColor: "rgba(0, 229, 255, 0.15)",
    iconShape: "RECTANGLE_ROUNDED",
    statusModifier: "PRESENT_OPERATIONAL",
    iffResponseMode4: "VALIDATED_POSITIVE",
    link16AssignedTrack: "01245",
    elevationMslMeters: 920.0,
    headingTrueDegrees: 180.0,
    speedOverGroundKph: 4.5,
    thermalSignatureIndex: 0.85,
    radarCrossSectionM2: 0.8,
    tacticalReadinessPct: 100.0
  },
  {
    symbolRecordId: "SYM_REC_002",
    sidc2525d: "SFGPUCA-----",
    designator: "FRIENDLY_ARMORED_PLATOON_MAIN_BATTLE_TANK",
    affiliation: "FRIEND",
    battleDimension: "GROUND",
    echelon: "PLATOON",
    unitSizePersonnel: 16,
    primaryWeaponry: "120MM_SMOOTHBORE_CROW_50CAL",
    strokeColor: "#00E5FF",
    fillColor: "rgba(0, 229, 255, 0.15)",
    iconShape: "RECTANGLE_ROUNDED",
    statusModifier: "PRESENT_OPERATIONAL",
    iffResponseMode4: "VALIDATED_POSITIVE",
    link16AssignedTrack: "01250",
    elevationMslMeters: 915.0,
    headingTrueDegrees: 175.0,
    speedOverGroundKph: 32.0,
    thermalSignatureIndex: 2.8,
    radarCrossSectionM2: 18.5,
    tacticalReadinessPct: 95.0
  },
  {
    symbolRecordId: "SYM_REC_003",
    sidc2525d: "SFAPMFF-----",
    designator: "FRIENDLY_TACTICAL_CAS_ATTACK_AIRCRAFT",
    affiliation: "FRIEND",
    battleDimension: "AIR",
    echelon: "FLIGHT_PAIR",
    unitSizePersonnel: 2,
    primaryWeaponry: "30MM_GAU8_AGM65_MAVERICK_GBU12",
    strokeColor: "#00E5FF",
    fillColor: "rgba(0, 229, 255, 0.15)",
    iconShape: "ARCH_TOP_AIR",
    statusModifier: "PRESENT_OPERATIONAL",
    iffResponseMode4: "VALIDATED_POSITIVE",
    link16AssignedTrack: "02100",
    elevationMslMeters: 4500.0,
    headingTrueDegrees: 210.0,
    speedOverGroundKph: 680.0,
    thermalSignatureIndex: 4.5,
    radarCrossSectionM2: 6.2,
    tacticalReadinessPct: 100.0
  },
  {
    symbolRecordId: "SYM_REC_004",
    sidc2525d: "SHGPUCF-----",
    designator: "HOSTILE_DISMOUNTED_SNIPER_TEAM",
    affiliation: "HOSTILE",
    battleDimension: "GROUND",
    echelon: "TEAM",
    unitSizePersonnel: 2,
    primaryWeaponry: "SVDK_9_3MM_HEAVY_SNIPER",
    strokeColor: "#FF1744",
    fillColor: "rgba(255, 23, 68, 0.15)",
    iconShape: "DIAMOND",
    statusModifier: "SUSPECT_CONFIRMED",
    iffResponseMode4: "NO_RESPONSE_HOSTILE",
    link16AssignedTrack: "07840",
    elevationMslMeters: 980.0,
    headingTrueDegrees: 0.0,
    speedOverGroundKph: 0.0,
    thermalSignatureIndex: 0.35,
    radarCrossSectionM2: 0.2,
    tacticalReadinessPct: 90.0
  },
  {
    symbolRecordId: "SYM_REC_005",
    sidc2525d: "SHGPUCD-----",
    designator: "HOSTILE_AIR_DEFENSE_MANPADS_TEAM",
    affiliation: "HOSTILE",
    battleDimension: "GROUND",
    echelon: "SECTION",
    unitSizePersonnel: 3,
    primaryWeaponry: "9K338_IGLA_S_SURFACE_TO_AIR",
    strokeColor: "#FF1744",
    fillColor: "rgba(255, 23, 68, 0.15)",
    iconShape: "DIAMOND",
    statusModifier: "SUSPECT_CONFIRMED",
    iffResponseMode4: "NO_RESPONSE_HOSTILE",
    link16AssignedTrack: "07845",
    elevationMslMeters: 965.0,
    headingTrueDegrees: 45.0,
    speedOverGroundKph: 0.0,
    thermalSignatureIndex: 0.40,
    radarCrossSectionM2: 0.4,
    tacticalReadinessPct: 100.0
  }
];

export class C4IsrBattlefieldSymbolEngine {
  constructor() {
    this.symbols = C4ISR_BATTLEFIELD_SYMBOL_ENTRIES;
  }

  getSymbolById(id) {
    return this.symbols.find((s) => s.symbolRecordId === id) || this.symbols[0];
  }
}

export default C4IsrBattlefieldSymbolEngine;

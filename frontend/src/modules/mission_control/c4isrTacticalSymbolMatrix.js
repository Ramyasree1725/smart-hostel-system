/**
 * @file c4isrTacticalSymbolMatrix.js
 * @description MIL-STD-2525D / NATO APP-6D Joint Military Symbology Standard Data Matrix & C4ISR Parser
 */

export const MIL_STD_2525D_AFFILIATIONS = {
  PENDING: { code: "0", description: "Pending Identification", colorHex: "#FFFF00" },
  UNKNOWN: { code: "1", description: "Unknown Track", colorHex: "#FFFF00" },
  FRIEND: { code: "3", description: "Friendly Unit / Track", colorHex: "#00E5FF" },
  NEUTRAL: { code: "4", description: "Neutral Entity", colorHex: "#00E676" },
  HOSTILE: { code: "6", description: "Hostile Enemy Unit", colorHex: "#FF1744" },
  SUSPECT: { code: "5", description: "Suspect Track", colorHex: "#FF1744" },
  ASSUMED_FRIEND: { code: "2", description: "Assumed Friendly", colorHex: "#00E5FF" },
  JOKER: { code: "7", description: "Joker / Exercise Hostile", colorHex: "#FF5252" },
  FAKER: { code: "8", description: "Faker / Exercise Track", colorHex: "#FF5252" }
};

export const BATTLE_DIMENSIONS = {
  SPACE: { code: "P", name: "Space Track", altitudeProfile: "ORBITAL_EXOATMOSPHERIC" },
  AIR: { code: "A", name: "Airborne Aviation Track", altitudeProfile: "ATMOSPHERIC_FLIGHT" },
  GROUND_UNIT: { code: "G", name: "Ground Combat Unit", altitudeProfile: "TERRESTRIAL_SURFACE" },
  GROUND_EQUIPMENT: { code: "E", name: "Ground Equipment / Weapon Platform", altitudeProfile: "TERRESTRIAL_SURFACE" },
  GROUND_INSTALLATION: { code: "I", name: "Ground Fixed Base / Installation", altitudeProfile: "TERRESTRIAL_FIXED" },
  SEA_SURFACE: { code: "S", name: "Sea Surface Vessel", altitudeProfile: "MARITIME_SURFACE" },
  SUBSURFACE: { code: "U", name: "Subsurface Submarine / UUV", altitudeProfile: "MARITIME_SUBSURFACE" },
  SOF: { code: "F", name: "Special Operations Forces (SOF)", altitudeProfile: "ALL_TERRAIN_COVERT" }
};

export const UNIT_ECHELONS = [
  { echelonCode: "TEAM_CREW", symbolModifier: "Ø", personnelNominal: 4, commanderRank: "OR-4 / Corporal" },
  { echelonCode: "SQUAD", symbolModifier: "•", personnelNominal: 9, commanderRank: "OR-6 / Staff Sergeant" },
  { echelonCode: "SECTION", symbolModifier: "••", personnelNominal: 16, commanderRank: "OR-7 / Sergeant First Class" },
  { echelonCode: "PLATOON", symbolModifier: "•••", personnelNominal: 40, commanderRank: "OF-1 / Lieutenant" },
  { echelonCode: "COMPANY_BATTERY_TROOP", symbolModifier: "I", personnelNominal: 150, commanderRank: "OF-2 / Captain" },
  { echelonCode: "BATTALION_SQUADRON", symbolModifier: "II", personnelNominal: 700, commanderRank: "OF-4 / Lieutenant Colonel" },
  { echelonCode: "REGIMENT_GROUP", symbolModifier: "III", personnelNominal: 2500, commanderRank: "OF-5 / Colonel" },
  { echelonCode: "BRIGADE_BCT", symbolModifier: "X", personnelNominal: 4500, commanderRank: "OF-6 / Brigadier General" },
  { echelonCode: "DIVISION", symbolModifier: "XX", personnelNominal: 15000, commanderRank: "OF-7 / Major General" },
  { echelonCode: "CORPS", symbolModifier: "XXX", personnelNominal: 45000, commanderRank: "OF-8 / Lieutenant General" },
  { echelonCode: "ARMY_THEATER", symbolModifier: "XXXX", personnelNominal: 150000, commanderRank: "OF-9 / General" }
];

export class C4IsrSymbolRenderer {
  constructor() {
    this.affiliations = MIL_STD_2525D_AFFILIATIONS;
    this.dimensions = BATTLE_DIMENSIONS;
    this.echelons = UNIT_ECHELONS;
  }

  generateSIDC(affiliationCode, dimensionCode, unitFunctionCode, echelonCode) {
    const paddedAffiliation = affiliationCode || "3"; // Friend default
    const paddedDimension = dimensionCode || "G"; // Ground default
    const paddedFunction = (unitFunctionCode || "UCF---").padEnd(6, "-");
    const echelonObj = this.echelons.find((e) => e.echelonCode === echelonCode);
    const paddedEchelon = echelonObj ? echelonObj.symbolModifier : "-";

    return `S${paddedAffiliation}${paddedDimension}P${paddedFunction}${paddedEchelon}`;
  }

  getSymbolTheme(affiliationKey) {
    const aff = this.affiliations[affiliationKey] || this.affiliations.FRIEND;
    return {
      strokeColor: aff.colorHex,
      fillColor: aff.colorHex + "22",
      badgeText: aff.description
    };
  }
}

export default C4IsrSymbolRenderer;

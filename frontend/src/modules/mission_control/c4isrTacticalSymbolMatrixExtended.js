/**
 * @file c4isrTacticalSymbolMatrixExtended.js
 * @description Comprehensive MIL-STD-2525D / NATO APP-6D Symbol Identification Codes (SIDC)
 * Echelon Modifiers, Status Modifiers, Operational Graphics, and C4ISR Tactical Overlay Renderer.
 */

export const SIDC_TACTICAL_GRAPHICS_CATALOG = [
  {
    graphicCode: "G-G-GLB---",
    graphicName: "FORWARD_LINE_OF_OWN_TROOPS_FLOT",
    category: "BOUNDARIES_CONTROL_MEASURES",
    lineStyle: "SOLID_WITH_FRIENDLY_IDENTIFIERS",
    colorRgb: "#00E5FF",
    tacticalPurpose: "Demarcates forward-most positions of friendly forces in combat"
  },
  {
    graphicCode: "G-G-GLP---",
    graphicName: "FORWARD_EDGE_OF_BATTLE_AREA_FEBA",
    category: "DEFENSE_CONTROL_MEASURES",
    lineStyle: "DASHED_BOLD",
    colorRgb: "#00E5FF",
    tacticalPurpose: "Foremost limits of a series of areas in which ground combat units are deployed"
  },
  {
    graphicCode: "G-G-GAP---",
    graphicName: "ASSAULT_POSITION_LINE",
    category: "OFFENSE_CONTROL_MEASURES",
    lineStyle: "SOLID_WITH_ARROWHEADS",
    colorRgb: "#76FF03",
    tacticalPurpose: "Covered position just short of the objective from which final assault is launched"
  },
  {
    graphicCode: "G-G-GAY---",
    graphicName: "LINE_OF_DEPARTURE_LD",
    category: "OFFENSE_CONTROL_MEASURES",
    lineStyle: "SOLID_DOUBLE_LINE",
    colorRgb: "#76FF03",
    tacticalPurpose: "Phase line crossed at a specific time by troops initiating an attack"
  },
  {
    graphicCode: "G-M-OAR---",
    graphicName: "RESTRICTED_FIRE_AREA_RFA",
    category: "FIRE_SUPPORT_COORDINATION",
    lineStyle: "HATCHED_POLYGON",
    colorRgb: "#FFD600",
    tacticalPurpose: "Area in which specific restrictions are imposed and into which fires cannot be delivered without coordination"
  },
  {
    graphicCode: "G-M-OAF---",
    graphicName: "FREE_FIRE_AREA_FFA",
    category: "FIRE_SUPPORT_COORDINATION",
    lineStyle: "SOLID_BORDER_POLYGON",
    colorRgb: "#00E676",
    tacticalPurpose: "Specific area into which any weapon system may fire without additional coordination"
  },
  {
    graphicCode: "G-M-OGM---",
    graphicName: "CONVENTIONAL_MINEFIELD_OBSTACLE",
    category: "MOBILITY_SURVIVABILITY_OBSTACLES",
    lineStyle: "CROSS_HATCHED_RED_WARNING",
    colorRgb: "#FF1744",
    tacticalPurpose: "Area containing explosive mines laid to hinder enemy maneuver and canalize into engagement areas"
  },
  {
    graphicCode: "G-S-LRM---",
    graphicName: "CASUALTY_COLLECTION_POINT_CCP",
    category: "COMBAT_SERVICE_SUPPORT",
    lineStyle: "SQUARE_WITH_RED_CROSS",
    colorRgb: "#FF5252",
    tacticalPurpose: "Forward point where casualties are assembled, triaged, and stabilized prior to MEDEVAC"
  }
];

export class C4IsrExtendedOverlayEngine {
  constructor() {
    this.graphicsCatalog = SIDC_TACTICAL_GRAPHICS_CATALOG;
  }

  getGraphicSpecification(graphicCode) {
    return this.graphicsCatalog.find((g) => g.graphicCode === graphicCode) || this.graphicsCatalog[0];
  }

  renderTacticalGeoJson(graphicCode, coordinatesArray) {
    const graphic = this.getGraphicSpecification(graphicCode);
    return {
      type: "Feature",
      properties: {
        graphicCode: graphic.graphicCode,
        graphicName: graphic.graphicName,
        category: graphic.category,
        lineStyle: graphic.lineStyle,
        stroke: graphic.colorRgb,
        strokeWidth: 2.5,
        tacticalPurpose: graphic.tacticalPurpose
      },
      geometry: {
        type: coordinatesArray.length > 2 ? "Polygon" : "LineString",
        coordinates: coordinatesArray
      }
    };
  }
}

export default C4IsrExtendedOverlayEngine;

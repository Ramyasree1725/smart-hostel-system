/**
 * @file militarySymbology.js
 * @description MIL-STD-2525D / NATO APP-6 Tactical Military Symbology SVG Synthesizer.
 * Generates standards-compliant vector graphics for friendly infantry, hostile targets,
 * medical evacuation assets, observation posts, and tactical control measures.
 */

export const AFFILIATION = {
  FRIENDLY: 'FRIENDLY',
  HOSTILE: 'HOSTILE',
  NEUTRAL: 'NEUTRAL',
  UNKNOWN: 'UNKNOWN'
};

export const ECHELON = {
  TEAM: 'TEAM',
  SQUAD: 'SQUAD',
  SECTION: 'SECTION',
  PLATOON: 'PLATOON',
  COMPANY: 'COMPANY',
  BATTALION: 'BATTALION'
};

export const UNIT_FUNCTION = {
  INFANTRY: 'INFANTRY',
  MEDICAL: 'MEDICAL',
  RECONNAISSANCE: 'RECONNAISSANCE',
  SPECIAL_FORCES: 'SPECIAL_FORCES',
  COMMUNICATIONS: 'COMMUNICATIONS',
  SUPPLY: 'SUPPLY'
};

export class MilitarySymbolGenerator {
  /**
   * Generates SVG path string for the standard outer frame
   */
  static generateFrameSvg(affiliation, size = 64) {
    const half = size / 2;
    const strokeWidth = 2.5;

    switch (affiliation) {
      case AFFILIATION.FRIENDLY:
        // Friendly: Circle / Rounded Rectangle (Blue / Cyan)
        return `<rect x="6" y="6" width="${size - 12}" height="${size - 12}" rx="8" ry="8" fill="rgba(37, 99, 235, 0.15)" stroke="#3b82f6" stroke-width="${strokeWidth}" />`;
      case AFFILIATION.HOSTILE:
        // Hostile: Diamond (Red)
        return `<polygon points="${half},4 ${size - 4},${half} ${half},${size - 4} 4,${half}" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" stroke-width="${strokeWidth}" />`;
      case AFFILIATION.NEUTRAL:
        // Neutral: Square / Box (Green)
        return `<rect x="6" y="6" width="${size - 12}" height="${size - 12}" fill="rgba(34, 197, 94, 0.15)" stroke="#22c55e" stroke-width="${strokeWidth}" />`;
      case AFFILIATION.UNKNOWN:
      default:
        // Unknown: Quatrefoil / Cloud (Yellow / Amber)
        return `<circle cx="${half}" cy="${half}" r="${half - 6}" fill="rgba(234, 179, 8, 0.15)" stroke="#eab308" stroke-width="${strokeWidth}" stroke-dasharray="4 2" />`;
    }
  }

  /**
   * Generates internal tactical function symbol
   */
  static generateFunctionSvg(unitFunction, size = 64) {
    const half = size / 2;
    const stroke = '#ffffff';

    switch (unitFunction) {
      case UNIT_FUNCTION.INFANTRY:
        // Crossed diagonals
        return `<line x1="16" y1="16" x2="${size - 16}" y2="${size - 16}" stroke="${stroke}" stroke-width="2" />
                <line x1="${size - 16}" y1="16" x2="16" y2="${size - 16}" stroke="${stroke}" stroke-width="2" />`;
      case UNIT_FUNCTION.MEDICAL:
        // Geneva Cross
        return `<path d="M${half - 3},16 h6 v${half - 19} h${half - 19} v6 h-${half - 19} v${half - 19} h-6 v-${half - 19} h-${half - 19} v-6 h${half - 19} z" fill="#ef4444" stroke="#ffffff" stroke-width="1" />`;
      case UNIT_FUNCTION.RECONNAISSANCE:
        // Single diagonal slash
        return `<line x1="${size - 16}" y1="16" x2="16" y2="${size - 16}" stroke="${stroke}" stroke-width="2.5" />`;
      case UNIT_FUNCTION.SPECIAL_FORCES:
        // Lightning bolt / V shape
        return `<polyline points="18,${half - 6} ${half},${size - 16} ${size - 18},${half - 6}" fill="none" stroke="${stroke}" stroke-width="2.5" />`;
      default:
        return `<circle cx="${half}" cy="${half}" r="4" fill="${stroke}" />`;
    }
  }

  /**
   * Generates Echelon top amplifier (e.g. •• for Section, ••• for Platoon)
   */
  static generateEchelonSvg(echelon, size = 64) {
    const half = size / 2;
    switch (echelon) {
      case ECHELON.TEAM:
        return `<circle cx="${half}" cy="3" r="1.5" fill="#ffffff" />`;
      case ECHELON.SQUAD:
        return `<circle cx="${half}" cy="3" r="1.5" fill="#ffffff" />`;
      case ECHELON.SECTION:
        return `<circle cx="${half - 4}" cy="3" r="1.5" fill="#ffffff" /><circle cx="${half + 4}" cy="3" r="1.5" fill="#ffffff" />`;
      case ECHELON.PLATOON:
        return `<circle cx="${half - 6}" cy="3" r="1.5" fill="#ffffff" /><circle cx="${half}" cy="3" r="1.5" fill="#ffffff" /><circle cx="${half + 6}" cy="3" r="1.5" fill="#ffffff" />`;
      default:
        return '';
    }
  }

  /**
   * Synthesizes complete standalone SVG string for the requested military entity
   */
  static createSymbol(options = {}) {
    const {
      affiliation = AFFILIATION.FRIENDLY,
      unitFunction = UNIT_FUNCTION.INFANTRY,
      echelon = ECHELON.SQUAD,
      callsign = 'BRAVO-1',
      size = 64
    } = options;

    const frame = MilitarySymbolGenerator.generateFrameSvg(affiliation, size);
    const func = MilitarySymbolGenerator.generateFunctionSvg(unitFunction, size);
    const ech = MilitarySymbolGenerator.generateEchelonSvg(echelon, size);

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <g id="tactical-frame">${frame}</g>
      <g id="tactical-function">${func}</g>
      <g id="tactical-echelon">${ech}</g>
      <text x="${size / 2}" y="${size - 3}" font-family="monospace" font-size="8" font-weight="bold" fill="#94a3b8" text-anchor="middle">${callsign}</text>
    </svg>`;
  }
}

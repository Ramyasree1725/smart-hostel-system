/**
 * @file marchPawsTacticalClinicalMatrixExtended.js
 * @description Exhaustive Tactical Combat Casualty Care (TCCC) Extended MARCH-PAWS Decision Algorithms,
 * Injury Severity Score (ISS), Abbreviated Injury Scale (AIS) 6-Body-Region Taxonomy, and Tactical Resuscitation Graph.
 */

const AIS_ANATOMICAL_REGION_CODES = [
  { regionId: 1, regionName: "HEAD_CRANIOFACIAL", aisMaxSeverity: 6, lethalThresholdAIS: 5 },
  { regionId: 2, regionName: "FACE_MAXILLOFACIAL", aisMaxSeverity: 4, lethalThresholdAIS: 4 },
  { regionId: 3, regionName: "CHEST_THORACIC", aisMaxSeverity: 6, lethalThresholdAIS: 5 },
  { regionId: 4, regionName: "ABDOMEN_PELVIC_CONTENTS", aisMaxSeverity: 5, lethalThresholdAIS: 5 },
  { regionId: 5, regionName: "EXTREMITIES_PELVIC_GIRDLE", aisMaxSeverity: 5, lethalThresholdAIS: 4 },
  { regionId: 6, regionName: "EXTERNAL_THERMAL_BURNS", aisMaxSeverity: 6, lethalThresholdAIS: 5 }
];

const EXTENDED_TRAUMA_PATHOLOGY_NODES = [
  {
    pathologyCode: "TCCC_PATH_01",
    condition: "TRAUMATIC_AMPUTATION_FEMORAL_JUNCTION",
    systemicImpact: "HEMORRHAGIC_EXSANGUINATION",
    primaryIntervention: "SAM_JUNCTIONAL_TOURNIQUET_OR_XSTAT30",
    secondaryIntervention: "TXA_2G_IV_LTOWB_RESUSCITATION",
    lethalityMinutesWithoutIntervention: 3,
    triageCategory: "CATEGORY_1_IMMEDIATE"
  },
  {
    pathologyCode: "TCCC_PATH_02",
    condition: "TENSION_PNEUMOTHORAX_VALVULAR_BREACH",
    systemicImpact: "CARDIOPULMONARY_COLLAPSE_OBSTRUCTIVE_SHOCK",
    primaryIntervention: "NEEDLE_DECOMPRESSION_10G_3_25_INCH",
    secondaryIntervention: "CHEST_TUBE_FINGER_THORACOSTOMY",
    lethalityMinutesWithoutIntervention: 8,
    triageCategory: "CATEGORY_1_IMMEDIATE"
  },
  {
    pathologyCode: "TCCC_PATH_03",
    condition: "CLOSED_TRAUMATIC_BRAIN_INJURY_EPIDURAL_HEMATOMA",
    systemicImpact: "CUSHING_TRIAD_HERNIATION",
    primaryIntervention: "HYPERTONIC_SALINE_3_PCT_ELEVATE_HEAD_30_DEG",
    secondaryIntervention: "URGENT_SURGICAL_CRANIOTOMY_BURR_HOLE",
    lethalityMinutesWithoutIntervention: 45,
    triageCategory: "CATEGORY_1_IMMEDIATE"
  },
  {
    pathologyCode: "TCCC_PATH_04",
    condition: "PELVIC_RING_FRACTURE_VENOUS_PLEXUS_BLEED",
    systemicImpact: "OCCULT_RETROPERITONEAL_HEMORRHAGE",
    primaryIntervention: "SAM_PELVIC_SLING_CIRCUMFERENTIAL_BINDER",
    secondaryIntervention: "PERMISSIVE_HYPOTENSION_TARGET_SBP_90",
    lethalityMinutesWithoutIntervention: 30,
    triageCategory: "CATEGORY_1_IMMEDIATE"
  },
  {
    pathologyCode: "TCCC_PATH_05",
    condition: "FULL_THICKNESS_BLAST_BURNS_45_PERCENT_TBSA",
    systemicImpact: "HYPOVOLEMIC_BURN_SHOCK_COAGULOPATHY",
    primaryIntervention: "PARKLAND_RESUSCITATION_CALCULUS_RULE_OF_TENS",
    secondaryIntervention: "ACTIVE_THERMAL_PREVENTION_DRY_STERILE_SHEETS",
    lethalityMinutesWithoutIntervention: 120,
    triageCategory: "CATEGORY_2_DELAYED"
  },
  {
    pathologyCode: "TCCC_PATH_06",
    condition: "PENETRATING_SHRAPNEL_FOREARM_SOFT_TISSUE",
    systemicImpact: "LOCALIZED_TISSUE_DISRUPTION_NON_PERFUSION_THREAT",
    primaryIntervention: "ISRAELI_PRESSURE_DRESSING_AND_SPLINT",
    secondaryIntervention: "ORAL_MOXIFLOXACIN_400MG_MELOXICAM_15MG",
    lethalityMinutesWithoutIntervention: 1440,
    triageCategory: "CATEGORY_3_MINIMAL"
  }
];

class MarchPawsExtendedClinicalEngine {
  constructor() {
    this.aisRegions = AIS_ANATOMICAL_REGION_CODES;
    this.pathologies = EXTENDED_TRAUMA_PATHOLOGY_NODES;
  }

  calculateInjurySeverityScore(aisScoresArray) {
    // ISS = sum of squares of top 3 highest AIS scores from different body regions
    const sorted = [...aisScoresArray].sort((a, b) => b - a);
    const top3 = sorted.slice(0, 3);
    const iss = top3.reduce((acc, score) => acc + (score * score), 0);

    let mortalityEstimatePct = 0;
    if (iss >= 75 || sorted.includes(6)) {
      mortalityEstimatePct = 100; // Lethal injury
    } else if (iss >= 50) {
      mortalityEstimatePct = 75;
    } else if (iss >= 25) {
      mortalityEstimatePct = 35;
    } else if (iss >= 15) {
      mortalityEstimatePct = 12;
    } else {
      mortalityEstimatePct = 2;
    }

    return {
      injurySeverityScore: iss,
      topScores: top3,
      mortalityEstimatePct: mortalityEstimatePct,
      classification: iss >= 15 ? "MAJOR_POLYTRAUMA" : "MINOR_MODERATE_TRAUMA"
    };
  }

  calculateParklandFluidResuscitation(bodyWeightKg, totalBodySurfaceAreaPercentBurn) {
    const total24HourVolumeMl = 4 * bodyWeightKg * totalBodySurfaceAreaPercentBurn;
    const first8HourRateMlPerHour = (total24HourVolumeMl * 0.5) / 8;
    const remaining16HourRateMlPerHour = (total24HourVolumeMl * 0.5) / 16;

    return {
      totalVolumeMl24Hours: total24HourVolumeMl,
      initialRateMlPerHour: Number(first8HourRateMlPerHour.toFixed(1)),
      secondaryRateMlPerHour: Number(remaining16HourRateMlPerHour.toFixed(1)),
      preferredFluid: "Lactated Ringer's Solution (LR)"
    };
  }
}

module.exports = {
  AIS_ANATOMICAL_REGION_CODES,
  EXTENDED_TRAUMA_PATHOLOGY_NODES,
  MarchPawsExtendedClinicalEngine
};

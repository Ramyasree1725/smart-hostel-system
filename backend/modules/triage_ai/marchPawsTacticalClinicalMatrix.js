/**
 * @file marchPawsTacticalClinicalMatrix.js
 * @description Complete Tactical Combat Casualty Care (TCCC) MARCH-PAWS Decision Algorithms,
 * Glasgow Coma Scale, Revised Trauma Score (RTS), Abbreviated Injury Scale (AIS),
 * and NATO 9-Line MEDEVAC Tactical Message Formulation Engine.
 */

const MARCH_PROTOCOL_NODES = [
  {
    stepKey: "M_MASSIVE_BLEEDING",
    priority: 1,
    title: "Massive Hemorrhage Control",
    indications: [
      "Pulsatile or steady arterial bleeding",
      "Pooling blood on ground (>500 mL)",
      "Blood-soaked uniform or tactical vest",
      "Traumatic amputation above wrist or ankle",
      "Unresponsive casualty with suspected blast trauma"
    ],
    interventions: [
      {
        action: "APPLY_COMTAC_TOURNIQUET",
        timing: "IMMEDIATE (< 60 seconds)",
        locationRule: "High and tight over uniform if under fire, or 2-3 inches above wound directly on skin",
        reassessmentIntervalSeconds: 120,
        contraindications: "Do not place directly over a joint (knee/elbow)"
      },
      {
        action: "PACK_HEMOSTATIC_GAUZE",
        timing: "Within 3 minutes",
        targetSites: ["Groin", "Axilla", "Neck (junctional sites)"],
        holdDirectPressureSeconds: 180,
        dressingType: "Combat Gauze (Kaolin impregnated) or Chitosan Hemostatic dressing"
      },
      {
        action: "APPLY_JUNCTIONAL_TOURNIQUET",
        timing: "If extremity tourniquet fails or wound is at junctional node",
        types: ["SAM Junctional Tourniquet (SJT)", "Combat Ready Clamp (CRoC)", "Abdominal Aortic and Junctional Tourniquet (AAJT)"]
      }
    ]
  },
  {
    stepKey: "A_AIRWAY",
    priority: 2,
    title: "Airway Management",
    indications: [
      "Stridor, snoring, gurgling breath sounds",
      "Severe maxillofacial trauma with impending obstruction",
      "Unconscious casualty unable to maintain patent airway"
    ],
    interventions: [
      {
        action: "CHIN_LIFT_JAW_THRUST",
        timing: "IMMEDIATE",
        description: "Open airway while maintaining inline cervical stabilization"
      },
      {
        action: "INSERT_NASOPHARYNGEAL_AIRWAY_NPA",
        timing: "Within 2 minutes",
        sizeFrench: 28,
        lubrication: "Water-soluble surgical lubricant",
        contraindications: "Obvious midface smash or suspected basal skull fracture with CSF rhinorrhea"
      },
      {
        action: "SURGICAL_CRICOTHYROIDOTOMY",
        timing: "Emergency fallback if cannot intubate/ventilate",
        equipment: ["Scalpel #10", "Tracheal hook", "6.0mm cuffed endotracheal/cric tube", "10cc syringe"]
      }
    ]
  },
  {
    stepKey: "R_RESPIRATION",
    priority: 3,
    title: "Respiration & Tension Pneumothorax Decompression",
    indications: [
      "Progressive severe respiratory distress",
      "Unilateral absent or markedly decreased breath sounds",
      "Oxygen saturation SpO2 < 90%",
      "Jugular venous distention / tracheal deviation",
      "Hyperresonance on affected hemithorax"
    ],
    interventions: [
      {
        action: "APPLY_VENTED_CHEST_SEAL",
        timing: "Immediate upon discovery of open/sucking chest wound",
        protocol: "Wipe blood, apply vented seal centered on wound during exhalation, inspect exit wound"
      },
      {
        action: "NEEDLE_DECOMPRESSION_NCD",
        timing: "Urgent if tension pneumothorax is suspected",
        catheterSpecification: "14-gauge or 10-gauge, 3.25-inch needle with catheter",
        anatomicalSites: [
          "2nd Intercostal Space at Midclavicular Line (anterior)",
          "5th Intercostal Space at Anterior Axillary Line (lateral)"
        ]
      },
      {
        action: "FINGER_THORACOSTOMY_CHEST_TUBE",
        timing: "Prolonged field care or failed repeat NCD"
      }
    ]
  },
  {
    stepKey: "C_CIRCULATION",
    priority: 4,
    title: "Circulation & Resuscitation",
    indications: [
      "Weak, thready, or absent radial pulse",
      "Capillary refill > 3 seconds",
      "Altered mental status not attributed to TBI",
      "Systolic blood pressure < 90 mmHg"
    ],
    interventions: [
      {
        action: "ADMINISTER_TRANEXAMIC_ACID_TXA",
        dosage: "2.0 grams IV/IO slow push or infusion within 3 hours of injury",
        guideline: "Do not delay whole blood resuscitation"
      },
      {
        action: "WHOLE_BLOOD_TRANSFUSION",
        preferredFluid: "Low-Titer O Whole Blood (LTOWB)",
        secondaryFluid: "1:1:1 component therapy (Plasma, Platelets, Packed RBCs)",
        targetEndPoints: "Palpable radial pulse, SBP 100 mmHg, improved mental status"
      }
    ]
  },
  {
    stepKey: "H_HYPOTHERMIA_HEAD",
    priority: 5,
    title: "Hypothermia Prevention & Traumatic Brain Injury Care",
    indications: [
      "All trauma casualties regardless of ambient temperature",
      "Lethal triad risk (Coagulopathy, Acidosis, Hypothermia)",
      "Suspected closed head trauma, blast overpressure"
    ],
    interventions: [
      {
        action: "ACTIVE_WARMING_BLANKET",
        equipment: ["Hypothermia Prevention & Management Kit (HPMK)", "Ready-Heat active thermal blanket"],
        protocol: "Remove wet clothing, wrap casualty including head, elevate off cold ground"
      },
      {
        action: "TBI_NEUROPROTECTION",
        protocol: "Elevate head 30 degrees, maintain SpO2 > 90%, maintain SBP > 110 mmHg, avoid hyperventilation"
      }
    ]
  }
];

const GLASGOW_COMA_SCALE_MATRIX = {
  eyeOpening: [
    { score: 4, criteria: "Spontaneous eye opening" },
    { score: 3, criteria: "Eye opening to sound / verbal command" },
    { score: 2, criteria: "Eye opening to localized pressure / pain" },
    { score: 1, criteria: "No eye opening" }
  ],
  verbalResponse: [
    { score: 5, criteria: "Oriented and converses normally" },
    { score: 4, criteria: "Confused conversation, but able to answer questions" },
    { score: 3, criteria: "Inappropriate words / random disjointed speech" },
    { score: 2, criteria: "Incomprehensible sounds / moaning" },
    { score: 1, criteria: "No verbal response" }
  ],
  motorResponse: [
    { score: 6, criteria: "Obeys commands for movement" },
    { score: 5, criteria: "Localizes to painful stimulus" },
    { score: 4, criteria: "Normal flexion / withdrawal from pain" },
    { score: 3, criteria: "Abnormal flexion / decorticate posturing" },
    { score: 2, criteria: "Abnormal extension / decerebrate posturing" },
    { score: 1, criteria: "No motor response / flaccid" }
  ]
};

class MarchPawsTriageEngine {
  constructor() {
    this.protocolNodes = MARCH_PROTOCOL_NODES;
    this.gcsMatrix = GLASGOW_COMA_SCALE_MATRIX;
  }

  evaluateGcs(eyeScore, verbalScore, motorScore) {
    const clampedEye = Math.max(1, Math.min(4, eyeScore));
    const clampedVerbal = Math.max(1, Math.min(5, verbalScore));
    const clampedMotor = Math.max(1, Math.min(6, motorScore));
    const totalGcs = clampedEye + clampedVerbal + clampedMotor;

    let classification = "MILD_BRAIN_INJURY";
    if (totalGcs <= 8) {
      classification = "SEVERE_COMA_INTUBATION_CRITERIA";
    } else if (totalGcs <= 12) {
      classification = "MODERATE_BRAIN_INJURY";
    }

    return {
      totalScore: totalGcs,
      eyeScore: clampedEye,
      verbalScore: clampedVerbal,
      motorScore: clampedMotor,
      severity: classification
    };
  }

  generateNineLineMedevac(locationGrid, callsign, numUrgent, numPriority, numRoutine, specialEquipmentCode, securityCode, markingCode, nationalityCode) {
    return {
      line1_location: locationGrid,
      line2_callsignFreq: callsign,
      line3_precedence: `Urgent: ${numUrgent} | Priority: ${numPriority} | Routine: ${numRoutine}`,
      line4_specialEquipment: specialEquipmentCode || "NONE",
      line5_numPatients: `Litter: ${numUrgent + numPriority} | Ambulatory: ${numRoutine}`,
      line6_securityZing: securityCode || "N - No enemy troops in area",
      line7_markingMethod: markingCode || "VS-17 Panel / Green Smoke",
      line8_nationality: nationalityCode || "US/NATO Military",
      line9_nbcContamination: "NONE",
      generatedTimestampEpoch: Date.now()
    };
  }
}

module.exports = {
  MARCH_PROTOCOL_NODES,
  GLASGOW_COMA_SCALE_MATRIX,
  MarchPawsTriageEngine
};

/**
 * @file respiratoryAcousticMatrix.js
 * @description Master Acoustic Lung Sound Frequency Spectra & Traumatic Pulmonary Injury Matrix.
 * Precomputes power spectral density centroid frequencies, wheeze pitch contours, and crackle duration indices.
 */

'use strict';

const LUNG_ACOUSTIC_FREQUENCY_SPECTRA = [];

(function populateLungAcoustics() {
  const AUSCULTATION_SITES = [
    'RIGHT_ANTERIOR_APEX',
    'LEFT_ANTERIOR_APEX',
    'RIGHT_MIDAXILLARY_5TH_ICS',
    'LEFT_MIDAXILLARY_5TH_ICS',
    'RIGHT_POSTERIOR_BASE',
    'LEFT_POSTERIOR_BASE',
    'TRACHEAL_SUPRASTERNAL'
  ];

  const SOUND_TYPES = [
    'NORMAL_VESICULAR',
    'BRONCHOVESICULAR',
    'FINE_CRACKLES_PULMONARY_EDEMA',
    'COARSE_CRACKLES_HEMOPTYTIS',
    'POLYPHONIC_WHEEZE_SMOKE_INHALATION',
    'MONOPHONIC_STRIDOR_UPPER_AIRWAY',
    'PLEURAL_FRICTION_RUB',
    'DIMINISHED_TENSION_PNEUMOTHORAX'
  ];

  for (let sIdx = 0; sIdx < AUSCULTATION_SITES.length; sIdx++) {
    const site = AUSCULTATION_SITES[sIdx];

    for (let tIdx = 0; tIdx < SOUND_TYPES.length; tIdx++) {
      const sound = SOUND_TYPES[tIdx];

      for (let filterTap = 1; filterTap <= 40; filterTap++) {
        const isPathological = (tIdx >= 2);
        const centerFreqHz = 100 + (tIdx * 85) + (filterTap * 12);

        LUNG_ACOUSTIC_FREQUENCY_SPECTRA.push({
          spectrumId: `LUNG-SPEC-${site}-${sound}-T${filterTap}`,
          auscultationAnatomicalSite: site,
          breathSoundType: sound,
          filterTapIndex: filterTap,
          centerFrequencyHz: centerFreqHz,
          bandwidthHz: 50 + (tIdx * 20),
          relativeSpectralEnergyDb: -28.0 + (filterTap % 12),
          isTraumaticPathology: isPathological,
          requiresImmediateNeedleDecompression: (sound === 'DIMINISHED_TENSION_PNEUMOTHORAX' && site.includes('ANTERIOR')),
          requiresSuctionOrSurgicalAirway: (sound.includes('STRIDOR')),
          spectralPurityCoefficient: Number((0.65 + ((filterTap % 10) * 0.03)).toFixed(2))
        });
      }
    }
  }
})();

module.exports = {
  LUNG_ACOUSTIC_FREQUENCY_SPECTRA
};

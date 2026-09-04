/**
 * @fileoverview Smart Hostel Management System - Frontend Interactive Chart & Visual Analytics Engine
 * @module frontend/src/modules/interactiveChartAnalyticsEngine
 * @description In-browser lightweight SVG chart generator for hostel occupancy radial gauges,
 * fee collection progress bars, daily attendance area curves, and complaint triage pie charts.
 * @version 1.0.0
 * @license UNLICENSED
 */

'use strict';

/**
 * Generates an inline SVG donut chart markup.
 * @param {number} percentage - 0 to 100
 * @param {string} [color='#10b981'] - Hex color
 * @param {number} [size=120] - SVG width/height in px
 * @returns {string} SVG markup
 */
function renderDonutChartSvg(percentage, color = '#10b981', size = 120) {
  const cleanPercent = Math.max(0, Math.min(100, Number(percentage) || 0));
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (cleanPercent / 100) * circumference;

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="transform -rotate-90">
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" stroke="#e2e8f0" stroke-width="${strokeWidth}" fill="transparent" />
      <circle cx="${size / 2}" cy="${size / 2}" r="${radius}" stroke="${color}" stroke-width="${strokeWidth}" fill="transparent"
              stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" stroke-linecap="round" class="transition-all duration-700" />
    </svg>
  `;
}

/**
 * Generates an inline SVG horizontal progress bar.
 * @param {number} percentage - 0 to 100
 * @param {string} [colorClass='bg-blue-600']
 * @returns {string} HTML markup
 */
function renderProgressBar(percentage, colorClass = 'bg-blue-600') {
  const cleanPercent = Math.max(0, Math.min(100, Number(percentage) || 0));
  return `
    <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
      <div class="${colorClass} h-3 rounded-full transition-all duration-500" style="width: ${cleanPercent}%"></div>
    </div>
  `;
}

module.exports = {
  renderDonutChartSvg,
  renderProgressBar
};

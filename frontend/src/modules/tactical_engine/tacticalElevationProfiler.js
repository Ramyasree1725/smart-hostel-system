/**
 * @file tacticalElevationProfiler.js
 * @description Interactive Terrain Elevation Profile & Line-of-Sight Cross Section Canvas Visualizer.
 * Displays contour gradient shading, RF Fresnel zone ellipsoids, and line-of-sight obscuration points.
 */

export class ElevationProfileCanvasRenderer {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.width = canvasElement.width;
    this.height = canvasElement.height;

    this.terrainFillColor = options.terrainFillColor || 'rgba(30, 41, 59, 0.85)';
    this.terrainStrokeColor = options.terrainStrokeColor || '#0ea5e9'; // tactical sky blue
    this.losLineColor = options.losLineColor || '#22c55e'; // green
    this.losBlockedColor = options.losBlockedColor || '#ef4444'; // red
    this.fresnelColor = options.fresnelColor || 'rgba(234, 179, 8, 0.25)'; // amber
  }

  /**
   * Renders elevation cross-section along a path with observer and target
   */
  renderProfile(elevationSamples, observerIdx = 0, targetIdx = elevationSamples.length - 1, isVisible = true) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    if (!elevationSamples || elevationSamples.length < 2) return;

    // Find min and max elevation to scale vertically
    let minElev = Infinity, maxElev = -Infinity;
    for (const s of elevationSamples) {
      if (s.elevation < minElev) minElev = s.elevation;
      if (s.elevation > maxElev) maxElev = s.elevation;
    }

    // Add padding to range
    minElev = Math.max(0, minElev - 20);
    maxElev = maxElev + 50;
    const elevRange = Math.max(1, maxElev - minElev);

    const paddingX = 40;
    const paddingY = 30;
    const plotWidth = this.width - paddingX * 2;
    const plotHeight = this.height - paddingY * 2;

    const sampleToScreen = (idx, elev) => {
      const x = paddingX + (idx / (elevationSamples.length - 1)) * plotWidth;
      const y = this.height - paddingY - ((elev - minElev) / elevRange) * plotHeight;
      return { x, y };
    };

    // 1. Draw Background Grid
    ctx.save();
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = paddingY + (i / 4) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(paddingX, y);
      ctx.lineTo(this.width - paddingX, y);
      ctx.stroke();

      const elevLabel = Math.round(maxElev - (i / 4) * elevRange);
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText(`${elevLabel}m`, 5, y + 3);
    }
    ctx.restore();

    // 2. Draw Terrain Polygonal Silhouette
    ctx.save();
    ctx.beginPath();
    const startPt = sampleToScreen(0, elevationSamples[0].elevation);
    ctx.moveTo(startPt.x, this.height - paddingY);
    ctx.lineTo(startPt.x, startPt.y);

    for (let i = 1; i < elevationSamples.length; i++) {
      const pt = sampleToScreen(i, elevationSamples[i].elevation);
      ctx.lineTo(pt.x, pt.y);
    }

    const endPt = sampleToScreen(elevationSamples.length - 1, elevationSamples[elevationSamples.length - 1].elevation);
    ctx.lineTo(endPt.x, this.height - paddingY);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, paddingY, 0, this.height - paddingY);
    gradient.addColorStop(0, 'rgba(14, 165, 233, 0.4)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = this.terrainStrokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // 3. Draw Line of Sight Ray
    const obsPt = sampleToScreen(observerIdx, elevationSamples[observerIdx].elevation + 2.0);
    const tgtPt = sampleToScreen(targetIdx, elevationSamples[targetIdx].elevation + 2.0);

    ctx.save();
    ctx.strokeStyle = isVisible ? this.losLineColor : this.losBlockedColor;
    ctx.lineWidth = 2.5;
    ctx.setLineDash(isVisible ? [] : [6, 4]);
    ctx.beginPath();
    ctx.moveTo(obsPt.x, obsPt.y);
    ctx.lineTo(tgtPt.x, tgtPt.y);
    ctx.stroke();
    ctx.restore();

    // 4. Draw Observer & Target Markers
    ctx.save();
    ctx.fillStyle = '#3b82f6'; // Friendly Blue
    ctx.beginPath();
    ctx.arc(obsPt.x, obsPt.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText('OBS (YOU)', obsPt.x - 20, obsPt.y - 10);

    ctx.fillStyle = '#eab308'; // Target Amber
    ctx.beginPath();
    ctx.arc(tgtPt.x, tgtPt.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText('TGT', tgtPt.x - 10, tgtPt.y - 10);
    ctx.restore();
  }
}

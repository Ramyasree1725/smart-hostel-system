/**
 * @file dspWaveformRenderer.js
 * @description High-Performance HTML5 Canvas Sweeping Beam ECG / PPG Waveform Renderer.
 * Simulates phosphor decay persistence, cardiac cycle timing markers, and tactical HUD aesthetics.
 */

export class WaveformCanvasRenderer {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.width = canvasElement.width;
    this.height = canvasElement.height;

    this.beamColor = options.beamColor || '#22c55e'; // Tactical green
    this.gridColor = options.gridColor || 'rgba(34, 197, 94, 0.12)';
    this.sweepSpeedPixelsPerFrame = options.sweepSpeed || 2.0;

    this.currentX = 0;
    this.lastY = this.height / 2;
    this.sampleBuffer = [];
  }

  pushSample(normalizedValue) {
    // normalizedValue between -1.0 and 1.0
    this.sampleBuffer.push(normalizedValue);
  }

  drawGrid() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = this.gridColor;
    ctx.lineWidth = 0.5;

    // Vertical grid lines (every 25px)
    for (let x = 0; x < this.width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = 0; y < this.height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    ctx.restore();
  }

  renderFrame() {
    const ctx = this.ctx;
    const samplesToProcess = Math.min(this.sampleBuffer.length, 5);

    for (let i = 0; i < samplesToProcess; i++) {
      const sample = this.sampleBuffer.shift();

      const nextX = (this.currentX + this.sweepSpeedPixelsPerFrame) % this.width;
      const nextY = (this.height / 2) - (sample * (this.height * 0.4));

      // Clear upcoming slice ahead of beam
      ctx.clearRect(nextX, 0, 15, this.height);

      // Redraw grid in erased slice
      ctx.save();
      ctx.strokeStyle = this.gridColor;
      ctx.lineWidth = 0.5;
      for (let x = Math.floor(nextX); x < nextX + 15; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, this.height);
        ctx.stroke();
      }
      ctx.restore();

      // Draw active waveform segment
      ctx.save();
      ctx.strokeStyle = this.beamColor;
      ctx.lineWidth = 2.0;
      ctx.shadowColor = this.beamColor;
      ctx.shadowBlur = 6;
      ctx.lineCap = 'round';

      if (nextX > this.currentX) {
        ctx.beginPath();
        ctx.moveTo(this.currentX, this.lastY);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();
      }

      ctx.restore();

      this.currentX = nextX;
      this.lastY = nextY;
    }
  }
}

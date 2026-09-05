/**
 * @file tacticalHUDOverlay.js
 * @description Real-Time Tactical HUD Canvas Reticle, Compass Tape, Bearing Pitch Ladder,
 * and Dynamic Azimuth Indicators for Soldier Augmented Reality Eyewear.
 */

export class TacticalHUDCanvas {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.width = canvasElement.width;
    this.height = canvasElement.height;

    this.hudColor = options.hudColor || '#22c55e'; // Night vision green
    this.warningColor = options.warningColor || '#ef4444';
    this.fontSize = options.fontSize || 12;
  }

  renderHUD(state = {}) {
    const ctx = this.ctx;
    const { heading = 0, pitch = 0, roll = 0, altitudeMeters = 150, rangeToTargetM = 350, squadStatus = 'SECURE' } = state;

    ctx.clearRect(0, 0, this.width, this.height);

    const centerX = this.width / 2;
    const centerY = this.height / 2;

    ctx.save();
    ctx.strokeStyle = this.hudColor;
    ctx.fillStyle = this.hudColor;
    ctx.lineWidth = 1.5;
    ctx.font = `${this.fontSize}px monospace`;

    // 1. Center Tactical Reticle
    ctx.beginPath();
    // Center crosshair gap
    ctx.moveTo(centerX - 25, centerY);
    ctx.lineTo(centerX - 8, centerY);
    ctx.moveTo(centerX + 8, centerY);
    ctx.lineTo(centerX + 25, centerY);
    ctx.moveTo(centerX, centerY - 25);
    ctx.lineTo(centerX, centerY - 8);
    ctx.moveTo(centerX, centerY + 8);
    ctx.lineTo(centerX, centerY + 25);
    ctx.stroke();

    // Center circular reticle ring
    ctx.beginPath();
    ctx.arc(centerX, centerY, 35, 0, 2 * Math.PI);
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Top Heading Compass Ribbon
    const compassY = 30;
    ctx.beginPath();
    ctx.moveTo(centerX - 150, compassY);
    ctx.lineTo(centerX + 150, compassY);
    ctx.stroke();

    // Heading indicator triangle
    ctx.beginPath();
    ctx.moveTo(centerX, compassY + 8);
    ctx.lineTo(centerX - 5, compassY + 16);
    ctx.lineTo(centerX + 5, compassY + 16);
    ctx.closePath();
    ctx.fill();

    // Cardinal marks
    for (let deg = Math.floor(heading - 45); deg <= Math.ceil(heading + 45); deg += 5) {
      const normDeg = (deg + 360) % 360;
      const x = centerX + (deg - heading) * 3.33;

      if (x >= centerX - 140 && x <= centerX + 140) {
        ctx.beginPath();
        const isMajor = normDeg % 15 === 0;
        ctx.moveTo(x, compassY);
        ctx.lineTo(x, compassY - (isMajor ? 8 : 4));
        ctx.stroke();

        if (isMajor) {
          let label = `${normDeg}°`;
          if (normDeg === 0) label = 'N';
          else if (normDeg === 90) label = 'E';
          else if (normDeg === 180) label = 'S';
          else if (normDeg === 270) label = 'W';

          ctx.fillText(label, x - (label.length * 3), compassY - 12);
        }
      }
    }

    // 3. Side Tactical Telemetry Tapes
    // Altitude Tape on Right
    const altX = this.width - 60;
    ctx.fillText(`ALT: ${altitudeMeters}m`, altX - 20, centerY - 20);
    ctx.fillText(`RNG: ${rangeToTargetM}m`, altX - 20, centerY + 20);

    // Roll & Pitch Ladder on Left
    ctx.fillText(`PITCH: ${pitch > 0 ? '+' : ''}${pitch.toFixed(1)}°`, 20, centerY - 20);
    ctx.fillText(`ROLL : ${roll > 0 ? '+' : ''}${roll.toFixed(1)}°`, 20, centerY + 20);

    // Status Banner at bottom
    ctx.fillText(`SYSTEM: ${squadStatus} | MESH_LINK: OK`, centerX - 100, this.height - 20);

    ctx.restore();
  }
}

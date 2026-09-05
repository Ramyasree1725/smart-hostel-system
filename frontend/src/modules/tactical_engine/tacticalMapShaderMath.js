/**
 * @file tacticalMapShaderMath.js
 * @description WebGL Shader Pipelines for Tactical Infrared Thermal (FLIR) & Night Vision (NVG) Overlays.
 * Contains GLSL shader sources and mathematical projection matrix utilities.
 */

export const GLSL_NIGHT_VISION_VERTEX_SHADER = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
varying vec2 v_texCoord;

void main() {
    gl_Position = a_position;
    v_texCoord = a_texCoord;
}
`;

export const GLSL_NIGHT_VISION_FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D u_image;
uniform float u_time;
uniform float u_noiseIntensity;
varying vec2 v_texCoord;

float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    
    // Add scintillation scanlines & phosphor green tint
    float scanline = sin(v_texCoord.y * 600.0) * 0.05;
    float noise = (random(v_texCoord + u_time) - 0.5) * u_noiseIntensity;
    
    vec3 nvgGreen = vec3(0.1, 0.95, 0.2) * (luminance + scanline + noise);
    gl_FragColor = vec4(nvgGreen, 1.0);
}
`;

export const GLSL_THERMAL_FLIR_FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;

vec3 ironbowColormap(float t) {
    vec3 c0 = vec3(0.0, 0.0, 0.0);
    vec3 c1 = vec3(0.1, 0.0, 0.6);
    vec3 c2 = vec3(0.7, 0.0, 0.5);
    vec3 c3 = vec3(0.9, 0.6, 0.0);
    vec3 c4 = vec3(1.0, 1.0, 1.0);
    
    if (t < 0.25) return mix(c0, c1, t * 4.0);
    if (t < 0.50) return mix(c1, c2, (t - 0.25) * 4.0);
    if (t < 0.75) return mix(c2, c3, (t - 0.50) * 4.0);
    return mix(c3, c4, (t - 0.75) * 4.0);
}

void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    float tempNormalized = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(ironbowColormap(tempNormalized), 1.0);
}
`;

export const SHADER_PRESET_CONFIGURATIONS = [];
(function populateShaderPresets() {
  for (let i = 1; i <= 100; i++) {
    SHADER_PRESET_CONFIGURATIONS.push({
      presetId: `SHADER-NVG-PRESET-${i}`,
      phosphorColor: (i % 2 === 0) ? '#22c55e' : '#38bdf8',
      scintillationGain: 0.05 + (i % 10) * 0.01,
      vignetteRadius: 0.85,
      bloomCutoff: 0.75
    });
  }
})();

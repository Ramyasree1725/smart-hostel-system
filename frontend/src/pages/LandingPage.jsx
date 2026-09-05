import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Activity,
  MapPin,
  Radio,
  Cpu,
  Zap,
  Lock,
  ArrowRight,
  Heart,
  Thermometer,
  Battery,
  Layers,
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-[#0A0F1D]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <span className="font-mono text-base font-bold tracking-wider text-white uppercase">
              SMART SOLDIER SAFETY
            </span>
            <span className="block text-[10px] font-mono text-cyan-400">
              IoT-Based Telemetry & Safety System
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 hover:from-cyan-500 hover:to-blue-500 transition"
          >
            <span>Officer Command Portal</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3 py-1 text-xs font-mono text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>MIL-SPEC TACTICAL IoT TELEMETRY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Real-Time Soldier <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                Health & Tactical Tracking
              </span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
              An integrated IoT ecosystem combining <strong>ESP32 Wearable Bands</strong>, <strong>Biometric Sensors</strong>, and <strong>GPS Transceivers</strong> with a high-performance central command console for instant casualty triage, geofence security, and SOS response.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/login"
                className="flex items-center space-x-2 rounded-xl bg-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-500/25 hover:bg-cyan-400 transition"
              >
                <span>Launch Command Console</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 transition"
              >
                <Activity className="h-4 w-4 text-cyan-400" />
                <span>Live Dashboard Preview</span>
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
              <div>
                <p className="font-mono text-2xl font-bold text-white">&lt; 50ms</p>
                <p className="text-xs text-slate-400">WebSocket Latency</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-cyan-400">100%</p>
                <p className="text-xs text-slate-400">Zero-Config Demo</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-bold text-emerald-400">LoRa / IP</p>
                <p className="text-xs text-slate-400">Dual Communication</p>
              </div>
            </div>
          </div>

          {/* Hero Right: Interactive Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="h-3 w-3 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="font-mono text-xs font-bold text-slate-300">SOLDIER TELEMETRY HUD</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  ESP32 NODE #1
                </span>
              </div>

              {/* Vitals Grid */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-3">
                  <div className="flex items-center justify-between text-rose-400 text-xs font-medium">
                    <span>Heart Rate</span>
                    <Heart className="h-4 w-4 animate-pulse" />
                  </div>
                  <p className="mt-2 font-mono text-2xl font-bold text-white">78 <span className="text-xs text-slate-400">BPM</span></p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">● Normal Rhythm</p>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3">
                  <div className="flex items-center justify-between text-amber-400 text-xs font-medium">
                    <span>Body Temp</span>
                    <Thermometer className="h-4 w-4" />
                  </div>
                  <p className="mt-2 font-mono text-2xl font-bold text-white">36.7 <span className="text-xs text-slate-400">°C</span></p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">● Optimal Range</p>
                </div>

                <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3">
                  <div className="flex items-center justify-between text-cyan-400 text-xs font-medium">
                    <span>GPS Coordinates</span>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <p className="mt-2 font-mono text-sm font-bold text-white">17.442°N, 78.349°E</p>
                  <p className="text-[10px] text-cyan-400 font-mono mt-0.5">Sector Alpha Ridge</p>
                </div>

                <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3">
                  <div className="flex items-center justify-between text-emerald-400 text-xs font-medium">
                    <span>Transceiver Battery</span>
                    <Battery className="h-4 w-4" />
                  </div>
                  <p className="mt-2 font-mono text-2xl font-bold text-white">88 <span className="text-xs text-slate-400">%</span></p>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Estimated 14 hrs</p>
                </div>
              </div>

              {/* Data Flow Preview */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-slate-400 space-y-1">
                <div className="text-cyan-400 font-bold">[DATA FLOW ARCHITECTURE]</div>
                <div className="text-slate-300">ESP32 + MAX30102 + GPS ➔ LoRa / HTTP Gateway</div>
                <div className="text-slate-300">➔ Node.js Server ➔ Socket.IO ➔ React HUD</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <section className="mt-20 pt-12 border-t border-slate-800/80">
          <h2 className="text-center font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
            Core System Capabilities
          </h2>
          <p className="mt-2 text-center text-2xl font-bold text-white sm:text-3xl">
            Engineered for High-Reliability Field Operations
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/30 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 mb-4">
                <Activity className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Continuous Biometrics</h3>
              <p className="mt-2 text-sm text-slate-400">
                Real-time tracking of pulse rates, body temperatures, and blood oxygen levels with anomaly thresholds.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/30 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Tactical GPS & Geofencing</h3>
              <p className="mt-2 text-sm text-slate-400">
                Interactive Leaflet map displaying soldier positions with perimeter breach alarms and elevation telemetry.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-cyan-500/30 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-950 border border-rose-500/40 text-rose-400 mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Instant SOS & Incident Dispatch</h3>
              <p className="mt-2 text-sm text-slate-400">
                Physical emergency panic button triggering audiovisual alarms with officer acknowledgment logs.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#0A0F1D] py-6 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 IoT-Based Smart Soldier Monitoring and Safety System • Academic & Tactical Demonstration Project</p>
      </footer>
    </div>
  );
};

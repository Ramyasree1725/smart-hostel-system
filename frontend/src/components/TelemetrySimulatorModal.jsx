import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import {
  Cpu,
  X,
  Heart,
  Thermometer,
  BatteryCharging,
  MapPin,
  AlertTriangle,
  Send,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export const TelemetrySimulatorModal = ({ isOpen, onClose }) => {
  const { soldiers, sendSimulatorTelemetry } = useSocket();

  const [selectedSoldierId, setSelectedSoldierId] = useState(soldiers[0]?.soldierId || 'SOL-001');
  const [heartRate, setHeartRate] = useState(78);
  const [temperature, setTemperature] = useState(36.8);
  const [spO2, setSpO2] = useState(98);
  const [battery, setBattery] = useState(85);
  const [latitude, setLatitude] = useState(17.4425);
  const [longitude, setLongitude] = useState(78.3495);
  const [motionActivity, setMotionActivity] = useState('PATROLLING');
  const [sosTriggered, setSosTriggered] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  if (!isOpen) return null;

  const currentSoldier = soldiers.find((s) => s.soldierId === selectedSoldierId);

  // Preset Scenario Handlers
  const handlePreset = (scenario) => {
    switch (scenario) {
      case 'NORMAL':
        setHeartRate(74);
        setTemperature(36.6);
        setSpO2(99);
        setBattery(90);
        setSosTriggered(false);
        setMotionActivity('PATROLLING');
        setLatitude(17.4425);
        setLongitude(78.3495);
        break;
      case 'CARDIAC_STRESS':
        setHeartRate(148);
        setTemperature(38.8);
        setSpO2(91);
        setBattery(65);
        setSosTriggered(false);
        setMotionActivity('RUNNING');
        break;
      case 'HYPOTHERMIA_LOW_HR':
        setHeartRate(44);
        setTemperature(34.2);
        setSpO2(88);
        setBattery(40);
        setSosTriggered(false);
        setMotionActivity('RESTING');
        break;
      case 'GEOFENCE_BREACH':
        setLatitude(17.5125); // ~8km outside base
        setLongitude(78.4195);
        break;
      case 'SOS_PANIC':
        setSosTriggered(true);
        setHeartRate(132);
        setMotionActivity('FALL_DETECTED');
        break;
      case 'LOW_BATTERY':
        setBattery(9);
        break;
      default:
        break;
    }
  };

  const handleTransmit = (e) => {
    e.preventDefault();

    sendSimulatorTelemetry({
      soldierId: selectedSoldierId,
      deviceId: currentSoldier?.deviceId || 'DEV-001',
      heartRate: Number(heartRate),
      temperature: Number(temperature),
      spO2: Number(spO2),
      battery: Number(battery),
      latitude: Number(latitude),
      longitude: Number(longitude),
      motionActivity,
      sosTriggered,
    });

    setStatusMessage(`Telemetry transmitted for ${selectedSoldierId}! Check HUD & Live charts.`);
    setTimeout(() => setStatusMessage(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-cyan-500/30 bg-[#0A0F1E] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <Cpu className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold tracking-wide text-white uppercase">
                IoT Hardware Telemetry Simulator
              </h3>
              <p className="text-xs text-slate-400">
                Simulate ESP32 Wearable sensor stream & test live alarms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Scenario Preset Buttons */}
        <div className="mt-4">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Quick Tactical Scenarios
          </label>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handlePreset('NORMAL')}
              className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-2.5 py-1.5 font-medium text-emerald-300 hover:bg-emerald-900/40 transition"
            >
              🟢 Normal Patrol
            </button>
            <button
              type="button"
              onClick={() => handlePreset('CARDIAC_STRESS')}
              className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-2.5 py-1.5 font-medium text-rose-300 hover:bg-rose-900/40 transition"
            >
              🔴 High Heart Rate (148)
            </button>
            <button
              type="button"
              onClick={() => handlePreset('HYPOTHERMIA_LOW_HR')}
              className="rounded-lg border border-blue-500/30 bg-blue-950/30 px-2.5 py-1.5 font-medium text-blue-300 hover:bg-blue-900/40 transition"
            >
              ❄️ Hypothermia (34.2°C)
            </button>
            <button
              type="button"
              onClick={() => handlePreset('GEOFENCE_BREACH')}
              className="rounded-lg border border-amber-500/30 bg-amber-950/30 px-2.5 py-1.5 font-medium text-amber-300 hover:bg-amber-900/40 transition"
            >
              ⚠️ Geofence Breach
            </button>
            <button
              type="button"
              onClick={() => handlePreset('LOW_BATTERY')}
              className="rounded-lg border border-yellow-500/30 bg-yellow-950/30 px-2.5 py-1.5 font-medium text-yellow-300 hover:bg-yellow-900/40 transition"
            >
              🪫 Low Battery (9%)
            </button>
            <button
              type="button"
              onClick={() => handlePreset('SOS_PANIC')}
              className="rounded-lg border border-purple-500/30 bg-purple-950/30 px-2.5 py-1.5 font-medium text-purple-300 hover:bg-purple-900/40 transition"
            >
              🚨 SOS Emergency
            </button>
          </div>
        </div>

        {/* Simulation Sliders & Inputs Form */}
        <form onSubmit={handleTransmit} className="mt-5 space-y-4">
          {/* Soldier Target Select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-300">Target Soldier</label>
              <select
                value={selectedSoldierId}
                onChange={(e) => {
                  setSelectedSoldierId(e.target.value);
                  const sol = soldiers.find((s) => s.soldierId === e.target.value);
                  if (sol) {
                    setHeartRate(sol.lastHeartRate || 75);
                    setTemperature(sol.lastTemperature || 36.6);
                    setBattery(sol.lastBattery || 85);
                  }
                }}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                {soldiers.map((s) => (
                  <option key={s.soldierId} value={s.soldierId}>
                    {s.soldierId} - {s.displayName} ({s.unit})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-300">Motion Activity</label>
              <select
                value={motionActivity}
                onChange={(e) => setMotionActivity(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="RESTING">Resting / In Bunker</option>
                <option value="PATROLLING">Patrolling / Walking</option>
                <option value="MOVING">Tactical Movement</option>
                <option value="RUNNING">Combat Sprint / Running</option>
                <option value="FALL_DETECTED">Fall / Impact Detected</option>
              </select>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Heart Rate Slider */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-rose-400 font-medium">
                  <Heart className="h-3.5 w-3.5" />
                  <span>Heart Rate (MAX30102)</span>
                </span>
                <span className="font-mono font-bold text-white">{heartRate} BPM</span>
              </div>
              <input
                type="range"
                min="40"
                max="180"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="mt-2 w-full accent-rose-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>40 Min</span>
                <span>Normal (60-100)</span>
                <span>180 Max</span>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-amber-400 font-medium">
                  <Thermometer className="h-3.5 w-3.5" />
                  <span>Body Temp (DS18B20)</span>
                </span>
                <span className="font-mono font-bold text-white">{temperature} °C</span>
              </div>
              <input
                type="range"
                min="33.0"
                max="41.5"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="mt-2 w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>33.0°C</span>
                <span>Normal (36.5-37.5)</span>
                <span>41.5°C</span>
              </div>
            </div>

            {/* SpO2 Oxygen Slider */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-cyan-400 font-medium">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Blood Oxygen (SpO2)</span>
                </span>
                <span className="font-mono font-bold text-white">{spO2}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="100"
                value={spO2}
                onChange={(e) => setSpO2(Number(e.target.value))}
                className="mt-2 w-full accent-cyan-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>70% Hypoxia</span>
                <span>Normal &gt; 95%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Battery Slider */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-1.5 text-emerald-400 font-medium">
                  <BatteryCharging className="h-3.5 w-3.5" />
                  <span>Device Battery</span>
                </span>
                <span className="font-mono font-bold text-white">{battery}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={battery}
                onChange={(e) => setBattery(Number(e.target.value))}
                className="mt-2 w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-0.5">
                <span>1% Critical</span>
                <span>Threshold: 20%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* SOS Toggle */}
          <div className="flex items-center justify-between rounded-xl border border-rose-950 bg-rose-950/20 p-3">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="h-4 w-4 text-rose-500" />
              <span className="text-xs font-semibold text-rose-300">
                Trigger Hardware SOS Panic Beacon
              </span>
            </div>
            <input
              type="checkbox"
              checked={sosTriggered}
              onChange={(e) => setSosTriggered(e.target.checked)}
              className="h-4 w-4 rounded accent-rose-600"
            />
          </div>

          {/* Status Message */}
          {statusMessage && (
            <p className="text-center text-xs font-mono font-medium text-cyan-400">
              {statusMessage}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-600/30 hover:from-cyan-500 hover:to-blue-500 transition"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Broadcast Telemetry Packet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

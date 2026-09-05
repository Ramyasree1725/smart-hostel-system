import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import {
  Activity,
  Heart,
  Thermometer,
  Battery,
  Sparkles,
  ShieldAlert,
  Radio,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';

export const LiveMonitoring = ({ onOpenSimulator }) => {
  const { soldiers, sendSimulatorTelemetry, playAlertSound } = useSocket();
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleQuickEmergency = (soldierId) => {
    const soldier = soldiers.find((s) => s.soldierId === soldierId);
    if (!soldier) return;

    sendSimulatorTelemetry({
      soldierId: soldier.soldierId,
      deviceId: soldier.deviceId,
      heartRate: 145,
      temperature: 39.2,
      spO2: 86,
      battery: soldier.lastBattery,
      sosTriggered: true,
      motionActivity: 'FALL_DETECTED',
      latitude: soldier.lastLocation?.lat,
      longitude: soldier.lastLocation?.lng,
    });
    if (soundEnabled) playAlertSound('CRITICAL');
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Live Biometrics Telemetry Grid
            </h1>
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping"></span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time biometric data stream directly from wearable ESP32 sensor modules
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
              soundEnabled
                ? 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300'
                : 'border-slate-800 bg-slate-900 text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            <span>{soundEnabled ? 'Audio Alarms On' : 'Muted'}</span>
          </button>

          <button
            onClick={onOpenSimulator}
            className="flex items-center space-x-1.5 rounded-lg bg-cyan-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-cyan-600/30 hover:bg-cyan-500 transition"
          >
            <Zap className="h-4 w-4" />
            <span>Open Simulator</span>
          </button>
        </div>
      </div>

      {/* Grid of Soldier Biometric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {soldiers.map((soldier) => {
          const isCritical = soldier.healthStatus === 'CRITICAL';
          const isWarning = soldier.healthStatus === 'WARNING';
          const isOffline = soldier.monitoringStatus === 'OFFLINE';

          return (
            <div
              key={soldier.soldierId}
              className={`rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 ${
                isCritical
                  ? 'border-rose-600 bg-rose-950/30 glow-red'
                  : isWarning
                  ? 'border-amber-600/60 bg-amber-950/20 glow-amber'
                  : isOffline
                  ? 'border-slate-800 bg-slate-950/50 opacity-60'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {/* Soldier Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{soldier.displayName}</span>
                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800">
                      {soldier.soldierId}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{soldier.unit}</p>
                </div>

                <span
                  className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase font-mono ${
                    isOffline
                      ? 'bg-slate-800 text-slate-400'
                      : isCritical
                      ? 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                      : isWarning
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}
                >
                  {isOffline ? 'OFFLINE' : soldier.healthStatus}
                </span>
              </div>

              {/* Vitals Telemetry Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {/* Heart Rate */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between text-xs text-rose-400">
                    <span className="font-medium">Heart Rate</span>
                    <Heart className={`h-4 w-4 ${isCritical || isWarning ? 'animate-bounce' : 'animate-pulse'}`} />
                  </div>
                  <p className="mt-1 font-mono text-2xl font-bold text-white">
                    {soldier.lastHeartRate || '--'}{' '}
                    <span className="text-xs font-normal text-slate-400">BPM</span>
                  </p>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-rose-500 transition-all duration-500"
                      style={{ width: `${Math.min(100, ((soldier.lastHeartRate || 60) / 160) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Temperature */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between text-xs text-amber-400">
                    <span className="font-medium">Body Temp</span>
                    <Thermometer className="h-4 w-4" />
                  </div>
                  <p className="mt-1 font-mono text-2xl font-bold text-white">
                    {soldier.lastTemperature || '--'}{' '}
                    <span className="text-xs font-normal text-slate-400">°C</span>
                  </p>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-amber-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(100, Math.max(0, (((soldier.lastTemperature || 36.5) - 34) / 7) * 100))}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* SpO2 */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between text-xs text-cyan-400">
                    <span className="font-medium">Oxygen (SpO2)</span>
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="mt-1 font-mono text-2xl font-bold text-white">
                    {soldier.lastSpO2 || 98}{' '}
                    <span className="text-xs font-normal text-slate-400">%</span>
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">Pulse Oximeter</span>
                </div>

                {/* Battery */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between text-xs text-emerald-400">
                    <span className="font-medium">Battery</span>
                    <Battery className="h-4 w-4" />
                  </div>
                  <p className="mt-1 font-mono text-2xl font-bold text-white">
                    {soldier.lastBattery || '--'}{' '}
                    <span className="text-xs font-normal text-slate-400">%</span>
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Dev: {soldier.deviceId || 'None'}
                  </span>
                </div>
              </div>

              {/* Activity & SOS Action */}
              <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs">
                <div className="flex items-center space-x-1.5 text-slate-300 font-mono">
                  <Radio className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Activity: {soldier.motionActivity || 'PATROLLING'}</span>
                </div>

                <button
                  onClick={() => handleQuickEmergency(soldier.soldierId)}
                  title="Simulate Emergency SOS Alert for this soldier"
                  className="flex items-center space-x-1 rounded border border-rose-500/40 bg-rose-950/40 px-2 py-1 text-[11px] font-bold text-rose-300 hover:bg-rose-900/60 transition"
                >
                  <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
                  <span>Test SOS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { SoldierMap } from '../components/SoldierMap';
import {
  MapPin,
  Compass,
  Radio,
  Navigation,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Crosshair,
} from 'lucide-react';

export const LocationMap = () => {
  const { soldiers, alerts } = useSocket();
  const [selectedSoldierId, setSelectedSoldierId] = useState(soldiers[0]?.soldierId || null);

  const selectedSoldier = soldiers.find((s) => s.soldierId === selectedSoldierId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Tactical GPS Tracking & Geofence HUD
            </h1>
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-800">
              OPENSTREETMAP / MIL-SPEC
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time geospatial coordinates from NEO-6M GPS modules • 5.0 km Perimeter Geofence Zone
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono text-slate-300">
          <div className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 flex items-center space-x-2">
            <Compass className="h-4 w-4 text-cyan-400" />
            <span>Center: 17.4400°N, 78.3489°E</span>
          </div>
        </div>
      </div>

      {/* Map & Tactical Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8-9 Cols: Interactive Full Map */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-3">
          <SoldierMap
            soldiers={soldiers}
            selectedSoldier={selectedSoldier}
            height="560px"
          />

          <div className="grid grid-cols-3 gap-3 text-xs font-mono">
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5">
              <span className="text-slate-400">GPS Constellation:</span>
              <p className="text-white font-bold mt-0.5">8 Satellites Locked</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5">
              <span className="text-slate-400">Geofence Radius:</span>
              <p className="text-cyan-400 font-bold mt-0.5">5.00 km (Safe Zone)</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-2.5">
              <span className="text-slate-400">Position Accuracy:</span>
              <p className="text-emerald-400 font-bold mt-0.5">± 2.5 meters</p>
            </div>
          </div>
        </div>

        {/* Right 3-4 Cols: Soldier Location List & Focus Selector */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Deployments on Grid ({soldiers.length})
          </h3>

          <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
            {soldiers.map((s) => {
              const isSelected = selectedSoldierId === s.soldierId;
              const hasAlert = alerts.some((a) => a.soldierId === s.soldierId && a.status === 'ACTIVE');

              return (
                <div
                  key={s.soldierId}
                  onClick={() => setSelectedSoldierId(s.soldierId)}
                  className={`cursor-pointer rounded-xl border p-3.5 transition ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-950/30 shadow-md shadow-cyan-900/20'
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-xs">{s.displayName}</p>
                      <p className="font-mono text-[10px] text-cyan-400">{s.soldierId} • {s.unit}</p>
                    </div>

                    <div className="flex items-center space-x-1">
                      {hasAlert && (
                        <AlertTriangle className="h-3.5 w-3.5 text-rose-500 animate-bounce" />
                      )}
                      <Crosshair className={`h-4 w-4 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                    </div>
                  </div>

                  {/* Coordinates & Status */}
                  <div className="mt-2.5 space-y-1 text-[11px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
                    <div className="flex items-center justify-between">
                      <span>Coordinates:</span>
                      <span className="text-slate-200">
                        {s.lastLocation?.lat.toFixed(4)}°, {s.lastLocation?.lng.toFixed(4)}°
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Activity:</span>
                      <span className="text-cyan-300">{s.motionActivity || 'PATROLLING'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Pulse / Temp:</span>
                      <span className="text-rose-400">{s.lastHeartRate || '--'} BPM / {s.lastTemperature || '--'}°C</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { SoldierMap } from '../components/SoldierMap';
import { Search, Compass, ShieldAlert, CheckCircle, Navigation, Radio, Users, Eye, Zap, Mountain } from 'lucide-react';

export const MissingSoldiers = () => {
  const { soldiers, handleAcknowledge } = useSocket();
  const missingPersonnel = soldiers.filter(
    (s) => s.monitoringStatus === 'OFFLINE' || s.tacticalStatus === 'MISSING' || s.soldierId === 'SOL-005'
  );

  const [selectedSoldier, setSelectedSoldier] = useState(missingPersonnel[0] || soldiers[4]);
  const [selectedTeam, setSelectedTeam] = useState('PARA_SF');
  const [progressStage, setProgressStage] = useState(null);
  const [isFound, setIsFound] = useState(false);

  const specializedTeams = [
    { id: 'PARA_SF', name: '🦅 10 PARA SF Extraction Squad', desc: 'Helicopter FAST-Rope • 4 Elite Commandos + Combat Medic' },
    { id: 'K9_UNIT', name: '🐕 K9 Canine Scent Search Unit', desc: '2 Sniffer Dogs + 4 Handlers for dense forest & ravine tracking' },
    { id: 'DRONE_FLIR', name: '🛸 Drone Thermal FLIR Recon Squad', desc: 'Autonomous Night-Vision Infrared Drones • 800m thermal sweep' },
    { id: 'MOUNTAIN', name: '🏔️ Mountain Cliff Rescue Unit', desc: 'High-Altitude Alpine Specialists with winch & alpine stretchers' }
  ];

  const handleExecuteSearch = () => {
    setProgressStage({ percent: 25, stage: 'STEP 1: DISPATCHING SPECIALIZED SQUAD...', text: 'Deploying team to last-known GPS coordinates...' });
    
    setTimeout(() => {
      setProgressStage({ percent: 65, stage: 'STEP 2: THERMAL RADAR & GROUND SWEEP...', text: 'Thermal sensors detect biological heat signature at Ridge Ravine!' });
    }, 1600);

    setTimeout(() => {
      setProgressStage({ percent: 100, stage: 'STEP 3: MISSING SOLDIER LOCATED & SECURED!', text: `SUCCESS! Soldier located and extracted by ${specializedTeams.find(t => t.id === selectedTeam)?.name}. Vitals restored.` });
      setIsFound(true);
    }, 3200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-rose-400 font-mono uppercase">
              Missing Soldiers & Specialized Search Operations (MIA)
            </h1>
            <span className="rounded bg-rose-950 px-2 py-0.5 text-xs font-semibold text-rose-300 border border-rose-800">
              {isFound ? '0 MIA • ALL SECURED' : `${missingPersonnel.length} Reported MIA`}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Select missing personnel, assign a Specialized Search & Extraction Team, and execute live search to find & secure them
          </p>
        </div>

        {isFound && (
          <div className="flex items-center space-x-1.5 rounded-lg border border-emerald-500/50 bg-emerald-950 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 animate-pulse">
            <CheckCircle className="h-4 w-4" />
            <span>🎯 Soldier Found & Secured! All Vitals Restored.</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Missing Soldier List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
            Missing Soldier Dossiers (Click to Pinpoint)
          </h3>

          <div className="space-y-3">
            {isFound ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center text-emerald-400">
                <p className="text-3xl mb-1">✓</p>
                <p className="font-bold text-sm">All Soldiers Accounted For</p>
                <p className="text-xs text-slate-400 mt-1">Specialized team completed extraction successfully.</p>
              </div>
            ) : (
              missingPersonnel.map((soldier) => {
                const isSelected = selectedSoldier?.soldierId === soldier.soldierId;
                return (
                  <div
                    key={soldier.soldierId}
                    onClick={() => setSelectedSoldier(soldier)}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      isSelected
                        ? 'border-rose-500 bg-rose-950/40 shadow-xl shadow-rose-950/50'
                        : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white text-sm">{soldier.displayName}</h4>
                        <p className="text-[10px] text-cyan-400 font-mono">{soldier.soldierId} • {soldier.unit}</p>
                      </div>
                      <span className="bg-rose-900 text-rose-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                        MISSING (MIA)
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-xs font-mono text-slate-300 border-t border-slate-800 pt-2">
                      <p>📍 Last GPS: <strong className="text-white">{soldier.lastLocation?.lat?.toFixed(4) || '17.4495'}°N, {soldier.lastLocation?.lng?.toFixed(4) || '78.3582'}°E</strong></p>
                      <p>🕒 Last Ping: <strong className="text-amber-400">60 Mins Ago (Signal Lost)</strong></p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Detailed Search Map & Specialized Team Assign Screen */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                GPS Pinpoint: {selectedSoldier?.displayName} ({selectedSoldier?.soldierId})
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Grid: East Valley Ridge Sector</p>
            </div>
            <span className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold border ${isFound ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-rose-950 text-rose-300 border-rose-800'}`}>
              {isFound ? 'SIGNAL SECURED' : 'SEARCH GRID ACTIVE'}
            </span>
          </div>

          <SoldierMap
            soldiers={[selectedSoldier]}
            selectedSoldier={selectedSoldier}
            height="260px"
          />

          {/* Specialized Team Selector */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-200 uppercase flex items-center space-x-1.5">
                <span>🎖️</span>
                <span>Assign Specialized Search & Extraction Team:</span>
              </label>
              <span className="text-[10px] text-cyan-400">Ready for Deployment</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {specializedTeams.map((t) => (
                <label
                  key={t.id}
                  onClick={() => setSelectedTeam(t.id)}
                  className={`flex items-start space-x-2.5 p-3 rounded-xl border cursor-pointer transition ${
                    selectedTeam === t.id ? 'border-cyan-500 bg-cyan-950/50' : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                  }`}
                >
                  <input type="radio" name="specTeam" checked={selectedTeam === t.id} onChange={() => {}} className="mt-1 accent-cyan-500" />
                  <div>
                    <strong className="text-white text-xs block">{t.name}</strong>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{t.desc}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Live Progress Console */}
          {progressStage && (
            <div className="rounded-xl border border-amber-500/60 bg-amber-950/30 p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping"></span>
                  <span>{progressStage.stage}</span>
                </span>
                <span className="font-bold text-white">{progressStage.percent}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-700" style={{ width: `${progressStage.percent}%` }}></div>
              </div>
              <p className="text-[11px] text-slate-300">{progressStage.text}</p>
            </div>
          )}

          <button
            onClick={handleExecuteSearch}
            disabled={isFound}
            className="w-full rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 py-3.5 text-xs font-extrabold uppercase text-white shadow-xl shadow-rose-950 hover:from-rose-500 hover:to-amber-500 transition flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>🚁</span>
            <span>Assign Specialized Team & Execute Search Mission</span>
          </button>
        </div>
      </div>
    </div>
  );
};


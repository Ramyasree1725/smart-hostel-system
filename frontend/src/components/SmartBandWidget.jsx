import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import {
  Watch,
  Heart,
  Thermometer,
  Battery,
  ShieldAlert,
  Droplet,
  Package,
  Zap,
  Radio,
  BellRing,
} from 'lucide-react';

export const SmartBandWidget = ({ isOpen, onClose }) => {
  const { soldiers, sendSimulatorTelemetry } = useSocket();
  const [selectedSoldierId, setSelectedSoldierId] = useState('SOL-001');
  const [heartRate, setHeartRate] = useState(76);
  const [temperature, setTemperature] = useState(36.7);
  const [battery, setBattery] = useState(88);
  const [statusMsg, setStatusMsg] = useState('');
  const [incomingCommandMsg, setIncomingCommandMsg] = useState(
    'System Initialized. All units operational in Sector Alpha.'
  );
  const [msgTimestamp, setMsgTimestamp] = useState('Base Command Sync');

  const currentSoldier = soldiers.find((s) => s.soldierId === selectedSoldierId) || soldiers[0];

  useEffect(() => {
    if (currentSoldier) {
      setHeartRate(currentSoldier.lastHeartRate || 76);
      setTemperature(currentSoldier.lastTemperature || 36.7);
      setBattery(currentSoldier.lastBattery || 88);

      if (currentSoldier.tacticalStatus === 'DOCTOR_EN_ROUTE') {
        setIncomingCommandMsg('🚑 COMMAND APPROVED: Field Doctor is EN ROUTE to your GPS coordinates! ETA: ~4 mins. Stay in position.');
        setMsgTimestamp(new Date().toLocaleTimeString());
      } else if (currentSoldier.tacticalStatus === 'REINFORCEMENTS_EN_ROUTE' || currentSoldier.tacticalStatus === 'SECURED_BY_BACKUP') {
        setIncomingCommandMsg('🛡️ COMMAND APPROVED: Quick Reaction Team deployed to reinforce your location! ETA: ~6 mins. Hold perimeter!');
        setMsgTimestamp(new Date().toLocaleTimeString());
      } else if (currentSoldier.tacticalStatus === 'SUPPLIES_RECEIVED') {
        setIncomingCommandMsg('🛸 COMMAND APPROVED: Drone Supply Drop confirmed! Water, MRE Rations & Ammo delivered to your grid.');
        setMsgTimestamp(new Date().toLocaleTimeString());
      }
    }
  }, [selectedSoldierId, currentSoldier?.tacticalStatus]);

  if (!isOpen) return null;

  // 1. SOS Panic Button
  const triggerSOS = () => {
    setHeartRate(142);
    sendSimulatorTelemetry({
      soldierId: currentSoldier.soldierId,
      deviceId: currentSoldier.deviceId,
      heartRate: 142,
      temperature,
      battery,
      sosTriggered: true,
      motionActivity: 'FALL_DETECTED',
      latitude: currentSoldier.lastLocation?.lat,
      longitude: currentSoldier.lastLocation?.lng,
    });
    setStatusMsg('🚨 SOS BEACON TRANSMITTED TO COMMANDER HUD!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // 2. Health Distress Trigger
  const triggerHealthDistress = () => {
    setHeartRate(154);
    setTemperature(39.4);
    sendSimulatorTelemetry({
      soldierId: currentSoldier.soldierId,
      deviceId: currentSoldier.deviceId,
      heartRate: 154,
      temperature: 39.4,
      battery,
      healthDistressTriggered: true,
      motionActivity: 'COLLAPSED',
      latitude: currentSoldier.lastLocation?.lat,
      longitude: currentSoldier.lastLocation?.lng,
    });
    setStatusMsg('🚑 HEALTH DISTRESS SENT: Commander alerted to dispatch Field Doctor!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // 3. Combat Danger Trigger
  const triggerCombatDanger = () => {
    sendSimulatorTelemetry({
      soldierId: currentSoldier.soldierId,
      deviceId: currentSoldier.deviceId,
      heartRate: 125,
      temperature,
      battery,
      dangerCombatTriggered: true,
      motionActivity: 'IN_COMBAT',
      latitude: currentSoldier.lastLocation?.lat,
      longitude: currentSoldier.lastLocation?.lng,
    });
    setStatusMsg('⚔️ COMBAT DANGER BEACON SENT: Requesting backup reinforcements!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  // 4. Request Supplies
  const triggerSupplyRequest = (itemType) => {
    sendSimulatorTelemetry({
      soldierId: currentSoldier.soldierId,
      deviceId: currentSoldier.deviceId,
      heartRate,
      temperature,
      battery,
      supplyRequest: itemType,
      latitude: currentSoldier.lastLocation?.lat,
      longitude: currentSoldier.lastLocation?.lng,
    });
    setStatusMsg(`📦 SUPPLY REQUESTED: [${itemType}] sent to Logistics Command!`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-rose-500/50 bg-[#070B12] p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-xl bg-rose-950 border border-rose-500/50 flex items-center justify-center text-rose-400 font-bold">
              ⌚
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white uppercase">
                Soldier's Wearable Smart Band (Watch)
              </h3>
              <p className="text-[11px] text-slate-400">Receives live approval & dispatch notifications from Commander</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:text-white">✕</button>
        </div>

        {/* Soldier Switcher */}
        <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 font-medium">Wearer Soldier:</span>
          <select
            value={selectedSoldierId}
            onChange={(e) => setSelectedSoldierId(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-cyan-300 font-bold focus:outline-none"
          >
            {soldiers.map((s) => (
              <option key={s.soldierId} value={s.soldierId}>
                {s.soldierId} — {s.displayName} ({s.unit})
              </option>
            ))}
          </select>
        </div>

        {/* Watch Body */}
        <div className="flex flex-col items-center">
          <div className="w-72 rounded-3xl border-4 border-slate-700 bg-slate-950 p-4 shadow-2xl shadow-rose-950/40 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 border-b border-slate-800 pb-1.5">
              <span>RAKSHA BIO-BAND v2.4</span>
              <span>DEV: {currentSoldier?.deviceId || 'DEV-001'}</span>
            </div>

            {/* Watch OLED Screen */}
            <div className="rounded-2xl bg-black p-3.5 font-mono border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white font-bold">{currentSoldier?.displayName?.split(' ')[1] || 'SOLDIER'}</span>
                <span className="text-emerald-400">🔋 {battery}%</span>
              </div>

              {/* Vitals */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-slate-900/80 p-1.5 text-center">
                  <span className="text-[10px] text-rose-400 flex items-center justify-center space-x-1">
                    <Heart className="h-3 w-3 inline animate-pulse" />
                    <span>PULSE</span>
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">{heartRate} BPM</p>
                </div>
                <div className="rounded-xl bg-slate-900/80 p-1.5 text-center">
                  <span className="text-[10px] text-amber-400 flex items-center justify-center space-x-1">
                    <Thermometer className="h-3 w-3 inline" />
                    <span>TEMP</span>
                  </span>
                  <p className="text-sm font-bold text-white mt-0.5">{temperature} °C</p>
                </div>
              </div>

              {/* GPS on Watch Screen */}
              <div className="text-[9px] text-slate-400 text-center border-t border-slate-800 pt-1">
                GPS: {currentSoldier?.lastLocation?.lat?.toFixed(3)}°N, {currentSoldier?.lastLocation?.lng?.toFixed(3)}°E
              </div>

              {/* 📡 INCOMING LIVE COMMANDER NOTIFICATION DISPLAY ON WATCH */}
              <div className="rounded-xl border border-emerald-500/60 bg-emerald-950/90 p-2.5 text-left text-[10px] space-y-1 glow-green">
                <div className="flex justify-between text-emerald-300 font-bold uppercase">
                  <span>📡 COMMAND TRANSMISSION</span>
                  <span className="animate-ping">●</span>
                </div>
                <p className="text-white font-semibold leading-tight">{incomingCommandMsg}</p>
                <p className="text-[9px] text-emerald-400">{msgTimestamp} (From: Commander Capt. Vikram)</p>
              </div>
            </div>

            {/* BIG PHYSICAL SOS BUTTON */}
            <button
              onClick={triggerSOS}
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 font-mono text-xs font-extrabold uppercase tracking-wider text-white shadow-xl shadow-rose-600/40 hover:from-rose-500 hover:to-red-500 active:scale-95 transition"
            >
              <ShieldAlert className="mr-2 h-5 w-5 animate-bounce" />
              <span>PRESS SOS PANIC BUTTON</span>
            </button>
            <span className="block text-center text-[9px] font-mono text-slate-500">Transmits emergency beacon to Commander HUD</span>
          </div>
        </div>

        {/* Quick Action Triggers */}
        <div className="space-y-2 pt-1">
          <label className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            Smart Band Action Triggers:
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={triggerHealthDistress}
              className="flex items-center justify-center space-x-1.5 rounded-xl border border-rose-500/40 bg-rose-950/40 py-2 font-semibold text-rose-300 hover:bg-rose-900/50 transition"
            >
              <span>🚑 Health Bad (Send Doctor)</span>
            </button>
            <button
              onClick={triggerCombatDanger}
              className="flex items-center justify-center space-x-1.5 rounded-xl border border-amber-500/40 bg-amber-950/40 py-2 font-semibold text-amber-300 hover:bg-amber-900/50 transition"
            >
              <span>⚔️ In Danger (Send Backup)</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <button
              onClick={() => triggerSupplyRequest('Fresh Drinking Water (5L)')}
              className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 py-1.5 text-cyan-300 font-medium hover:bg-cyan-900/40 transition"
            >
              💧 Need Water
            </button>
            <button
              onClick={() => triggerSupplyRequest('Tactical MRE Food Rations (3 Days)')}
              className="rounded-lg border border-emerald-500/30 bg-emerald-950/40 py-1.5 text-emerald-300 font-medium hover:bg-emerald-900/40 transition"
            >
              🍞 Need Food
            </button>
            <button
              onClick={() => triggerSupplyRequest('5.56mm Ammo & Grenades')}
              className="rounded-lg border border-yellow-500/30 bg-yellow-950/40 py-1.5 text-yellow-300 font-medium hover:bg-yellow-900/40 transition"
            >
              🔫 Need Ammo
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className="rounded-lg border border-cyan-500/50 bg-cyan-950/70 p-2 text-center text-xs font-mono font-bold text-cyan-300 animate-pulse">
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
};

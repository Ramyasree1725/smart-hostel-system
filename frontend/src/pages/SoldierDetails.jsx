import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { SensorChart } from '../components/SensorChart';
import { SoldierMap } from '../components/SoldierMap';
import {
  User,
  Shield,
  Heart,
  Thermometer,
  Battery,
  MapPin,
  Radio,
  ArrowLeft,
  AlertTriangle,
  HardDrive,
  Calendar,
  Phone,
  Droplet,
} from 'lucide-react';

export const SoldierDetails = () => {
  const { id } = useParams();
  const { soldiers, devices, alerts } = useSocket();

  const soldier = soldiers.find((s) => s.soldierId === id || s._id === id);
  const assignedDevice = devices.find((d) => d.deviceId === soldier?.deviceId);
  const soldierAlerts = alerts.filter((a) => a.soldierId === soldier?.soldierId);

  // Generate telemetry history data points
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    if (!soldier) return;

    const baseHr = soldier.lastHeartRate || 75;
    const baseTemp = soldier.lastTemperature || 36.6;
    const pts = [];
    const now = Date.now();

    for (let i = 15; i >= 0; i--) {
      pts.push({
        time: new Date(now - i * 30000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        heartRate: Math.max(50, Math.min(150, Math.round(baseHr + Math.sin(i / 2) * 8))),
        temperature: Number((baseTemp + Math.cos(i / 3) * 0.3).toFixed(1)),
        battery: Math.max(10, (soldier.lastBattery || 80) - Math.floor(i / 4)),
      });
    }
    setHistoryData(pts);
  }, [soldier?.soldierId, soldier?.lastHeartRate, soldier?.lastTemperature]);

  if (!soldier) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400">Soldier record not found.</p>
        <Link to="/soldiers" className="mt-4 inline-block text-cyan-400 hover:underline text-xs">
          ← Return to Roster
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
        <Link
          to="/soldiers"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-white font-mono uppercase">
              {soldier.displayName}
            </h1>
            <span className="font-mono text-xs text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              {soldier.soldierId}
            </span>
            <span
              className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                soldier.monitoringStatus === 'ACTIVE'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {soldier.monitoringStatus}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            {soldier.rank} • {soldier.unit}
          </p>
        </div>
      </div>

      {/* Top Profile Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Heart Rate */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
          <div className="flex items-center justify-between text-rose-400 text-xs font-semibold">
            <span>CURRENT PULSE</span>
            <Heart className="h-4 w-4 animate-pulse" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-white">
            {soldier.lastHeartRate || '--'} <span className="text-xs text-slate-400 font-normal">BPM</span>
          </p>
          <p className="text-[10px] text-slate-400 font-mono mt-1">
            Threshold: 50 - 120 BPM
          </p>
        </div>

        {/* Temperature */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-4">
          <div className="flex items-center justify-between text-amber-400 text-xs font-semibold">
            <span>CORE TEMPERATURE</span>
            <Thermometer className="h-4 w-4" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-white">
            {soldier.lastTemperature || '--'} <span className="text-xs text-slate-400 font-normal">°C</span>
          </p>
          <p className="text-[10px] text-slate-400 font-mono mt-1">
            Threshold: 35.0°C - 38.5°C
          </p>
        </div>

        {/* Battery & Signal */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold">
            <span>DEVICE BATTERY</span>
            <Battery className="h-4 w-4" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-white">
            {soldier.lastBattery || '--'} <span className="text-xs text-slate-400 font-normal">%</span>
          </p>
          <p className="text-[10px] text-slate-400 font-mono mt-1">
            Signal Quality: 92% (LoRa)
          </p>
        </div>

        {/* Location & GPS */}
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4">
          <div className="flex items-center justify-between text-cyan-400 text-xs font-semibold">
            <span>CURRENT GPS GRID</span>
            <MapPin className="h-4 w-4" />
          </div>
          <p className="mt-2 font-mono text-sm font-bold text-white">
            {soldier.lastLocation?.lat.toFixed(4)}°N, {soldier.lastLocation?.lng.toFixed(4)}°E
          </p>
          <p className="text-[10px] text-cyan-400 font-mono mt-1 truncate">
            {soldier.lastLocation?.address || 'Tactical Perimeter'}
          </p>
        </div>
      </div>

      {/* Main Grid: Details & Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Dossier Information */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono border-b border-slate-800 pb-2">
              Personnel Dossier
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Soldier ID:</span>
                <span className="font-mono text-white font-bold">{soldier.soldierId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Callsign / Name:</span>
                <span className="text-white font-medium">{soldier.displayName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rank:</span>
                <span className="text-white">{soldier.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tactical Unit:</span>
                <span className="text-white">{soldier.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Blood Group:</span>
                <span className="font-mono text-rose-400 font-bold">{soldier.bloodGroup || 'O+Pos'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Phone:</span>
                <span className="font-mono text-slate-200">{soldier.emergencyContact || '+91-9848011223'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Telemetry Sync:</span>
                <span className="font-mono text-slate-300">{new Date(soldier.lastSeen || Date.now()).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Assigned IoT Hardware Info */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono border-b border-slate-800 pb-2">
              Assigned Wearable Unit
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Hardware ID:</span>
                <span className="font-mono text-cyan-400 font-bold">{soldier.deviceId || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Model:</span>
                <span className="text-white">{assignedDevice?.deviceName || 'Bio-Tactical Band'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Firmware:</span>
                <span className="font-mono text-slate-300">{assignedDevice?.firmwareVersion || 'v2.4.1-esp32'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">RF Transceiver:</span>
                <span className="font-mono text-emerald-400">{assignedDevice?.loraFrequency || '868.1 MHz'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Biometric Trends & Tactical Position Map */}
        <div className="lg:col-span-8 space-y-4">
          <SensorChart
            data={historyData}
            dataKey="heartRate"
            title="Real-Time Pulse Rate History"
            unit="BPM"
            color="#EF4444"
            thresholdHigh={120}
            thresholdLow={50}
          />

          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-3">
              GPS Location & Path Marker
            </h3>
            <SoldierMap
              soldiers={[soldier]}
              selectedSoldier={soldier}
              height="280px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

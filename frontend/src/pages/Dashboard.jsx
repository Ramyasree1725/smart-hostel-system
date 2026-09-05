import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { StatCard } from '../components/StatCard';
import { SensorChart } from '../components/SensorChart';
import { SoldierMap } from '../components/SoldierMap';
import {
  Users,
  HardDrive,
  AlertTriangle,
  Heart,
  Thermometer,
  Battery,
  ShieldCheck,
  Activity,
  ArrowRight,
  Radio,
  MapPin,
  CheckCircle,
} from 'lucide-react';

export const Dashboard = () => {
  const { soldiers, devices, alerts, handleAcknowledge } = useSocket();

  // Selected soldier for quick preview
  const [selectedSoldierId, setSelectedSoldierId] = useState(soldiers[0]?.soldierId || 'SOL-001');

  // Chart data state for selected soldier
  const [chartData, setChartData] = useState([]);

  const selectedSoldier = soldiers.find((s) => s.soldierId === selectedSoldierId) || soldiers[0];

  // Calculations
  const totalSoldiers = soldiers.length;
  const activeSoldiers = soldiers.filter((s) => s.monitoringStatus === 'ACTIVE').length;
  const activeDevices = devices.filter((d) => d.status === 'ONLINE').length;
  const offlineDevices = devices.filter((d) => d.status === 'OFFLINE').length;
  const activeAlerts = alerts.filter((a) => a.status === 'ACTIVE');

  // Generate live biometric points
  useEffect(() => {
    if (!selectedSoldier) return;

    const baseHr = selectedSoldier.lastHeartRate || 75;
    const baseTemp = selectedSoldier.lastTemperature || 36.6;

    const points = [];
    const now = Date.now();
    for (let i = 10; i >= 0; i--) {
      const timeStr = new Date(now - i * 15000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      points.push({
        time: timeStr,
        heartRate: Math.max(50, Math.min(160, Math.round(baseHr + Math.sin(i * 0.8) * 6))),
        temperature: Number((baseTemp + Math.cos(i * 0.5) * 0.2).toFixed(1)),
      });
    }
    setChartData(points);
  }, [selectedSoldierId, selectedSoldier?.lastHeartRate, selectedSoldier?.lastTemperature]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Command Operation HUD
            </h1>
            <span className="rounded bg-emerald-950 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-800">
              SECTOR ALPHA
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-Time IoT Telemetry Stream • LoRa & Wi-Fi Gateway Active
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/monitoring"
            className="flex items-center space-x-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-900/50 transition"
          >
            <Activity className="h-4 w-4" />
            <span>Full Biometrics Grid</span>
          </Link>
          <Link
            to="/map"
            className="flex items-center space-x-1.5 rounded-lg bg-cyan-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 hover:bg-cyan-500 transition"
          >
            <MapPin className="h-4 w-4" />
            <span>Tactical Map</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Personnel"
          value={totalSoldiers}
          unit="Soldiers"
          icon={Users}
          status="cyan"
          subtitle={`${activeSoldiers} Active on Mission`}
        />
        <StatCard
          title="Active IoT Bands"
          value={activeDevices}
          unit="Online"
          icon={HardDrive}
          status="success"
          subtitle={`${offlineDevices} Offline Units`}
        />
        <StatCard
          title="Priority Alerts"
          value={activeAlerts.length}
          unit="Incidents"
          icon={AlertTriangle}
          status={activeAlerts.length > 0 ? 'danger' : 'success'}
          subtitle={activeAlerts.length > 0 ? 'Action Required' : 'All Clear'}
        />
        <StatCard
          title="Avg Fleet Vitals"
          value={Math.round(soldiers.filter(s => (s.lastHeartRate || 0) > 0).reduce((a, b) => a + (b.lastHeartRate || 75), 0) / (soldiers.filter(s => (s.lastHeartRate || 0) > 0).length || 1))}
          unit="BPM Avg"
          icon={Heart}
          status="warning"
          subtitle={`${soldiers.filter(s => (s.lastHeartRate || 0) > 100).length} High Distress Units`}
        />
      </div>

      {/* ALL SOLDIERS LIVE PULSE & VITALS RADAR STRIP */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5 mb-3">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Real-Time Soldier Pulse & Vitals Radar (All {soldiers.length} Soldiers)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
            Live MAX30102 Stream • Click Card to Plot Graph
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {soldiers.map((s) => {
            const hr = s.lastHeartRate || 75;
            const temp = s.lastTemperature || 36.7;
            const isHigh = hr > 100;
            const isMissing = s.monitoringStatus === 'INACTIVE' || s.tacticalStatus === 'MISSING' || hr === 0;
            const isSelected = selectedSoldierId === s.soldierId;

            return (
              <div
                key={s.soldierId}
                onClick={() => setSelectedSoldierId(s.soldierId)}
                className={`cursor-pointer rounded-xl border p-2.5 transition hover:scale-105 ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500'
                    : isMissing
                    ? 'text-rose-400 border-rose-900 bg-rose-950/40'
                    : isHigh
                    ? 'text-amber-300 border-amber-500/60 bg-amber-950/40'
                    : 'border-slate-800 bg-slate-950/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs truncate">{s.displayName?.split(' ')[1] || s.displayName}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {s.soldierId}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className={`text-base ${isMissing ? 'opacity-30' : isHigh ? 'animate-ping' : 'animate-pulse'}`}>❤️</span>
                    <span className="text-base font-extrabold font-mono text-white">{isMissing ? '--' : hr}</span>
                    <span className="text-[9px] text-slate-400 font-mono">BPM</span>
                  </div>
                  <div className="text-right text-[10px] font-mono">
                    <span className={isHigh ? 'text-amber-400 font-bold' : 'text-slate-400'}>{isMissing ? 'OFFLINE' : `${temp}°C`}</span>
                  </div>
                </div>
                <div className="mt-1.5 flex justify-between items-center text-[9px] font-mono border-t border-slate-800/80 pt-1">
                  <span className={isMissing ? 'text-rose-400 font-bold' : isHigh ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                    {s.tacticalStatus || s.monitoringStatus}
                  </span>
                  <span className="text-cyan-400">Graph →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Biometric Telemetry & Mini Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Realtime Charts & Soldier Selector */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Live Biometrics Telemetry
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] text-slate-400">Soldier:</span>
              <select
                value={selectedSoldierId}
                onChange={(e) => setSelectedSoldierId(e.target.value)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-cyan-300 font-medium focus:border-cyan-500 focus:outline-none"
              >
                {soldiers.map((s) => (
                  <option key={s.soldierId} value={s.soldierId}>
                    {s.soldierId} - {s.displayName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Biometric Graphs */}
          <div className="grid grid-cols-1 gap-4">
            <SensorChart
              data={chartData}
              dataKey="heartRate"
              title={`${selectedSoldier?.displayName} — Pulse Rate (MAX30102)`}
              unit="BPM"
              color="#EF4444"
              thresholdHigh={120}
              thresholdLow={50}
              minDomain={40}
              maxDomain={180}
            />

            <SensorChart
              data={chartData}
              dataKey="temperature"
              title={`${selectedSoldier?.displayName} — Body Core Temp (DS18B20)`}
              unit="°C"
              color="#F59E0B"
              thresholdHigh={38.5}
              thresholdLow={35.0}
              minDomain={33}
              maxDomain={42}
            />
          </div>
        </div>

        {/* Right 5 Cols: Tactical Mini Map & Quick Soldier Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Sector GPS Map
            </h3>
            <Link to="/map" className="text-xs text-cyan-400 hover:underline flex items-center space-x-1">
              <span>Expand Map</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <SoldierMap
            soldiers={soldiers}
            selectedSoldier={selectedSoldier}
            height="390px"
          />
        </div>
      </div>

      {/* Bottom Section: Active Incidents & Soldier Roster Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Incidents Table */}
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Active Incident Alerts ({activeAlerts.length})
              </h3>
            </div>
            <Link to="/alerts" className="text-xs text-cyan-400 hover:underline">
              View All Alerts
            </Link>
          </div>

          <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto">
            {activeAlerts.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                <ShieldCheck className="h-8 w-8 text-emerald-500/50 mx-auto mb-2" />
                No active threats or biometric anomalies detected.
              </div>
            ) : (
              activeAlerts.map((alt) => (
                <div
                  key={alt.alertId || alt.id}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs hover:border-slate-700 transition"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{alt.soldierName}</span>
                      <span className="rounded bg-rose-950 px-1.5 py-0.2 text-[10px] font-mono text-rose-400 border border-rose-800">
                        {alt.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{alt.message}</p>
                  </div>

                  <button
                    onClick={() => handleAcknowledge(alt.alertId || alt.id)}
                    className="flex items-center space-x-1 rounded bg-slate-800 px-2.5 py-1 text-xs font-medium text-cyan-300 hover:bg-slate-700 transition"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>Ack</span>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Soldier Quick Status Cards */}
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Field Deployment Status
              </h3>
            </div>
            <Link to="/soldiers" className="text-xs text-cyan-400 hover:underline">
              Manage Roster
            </Link>
          </div>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto">
            {soldiers.map((s) => (
              <div
                key={s.soldierId}
                onClick={() => setSelectedSoldierId(s.soldierId)}
                className={`cursor-pointer rounded-lg border p-3 text-xs transition ${
                  selectedSoldierId === s.soldierId
                    ? 'border-cyan-500/50 bg-cyan-950/30'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">{s.displayName}</span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      s.monitoringStatus === 'OFFLINE'
                        ? 'bg-slate-500'
                        : s.healthStatus === 'CRITICAL'
                        ? 'bg-rose-500 animate-ping'
                        : s.healthStatus === 'WARNING'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                  ></span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>HR: <strong className="text-rose-400">{s.lastHeartRate || '--'}</strong></span>
                  <span>Temp: <strong className="text-amber-400">{s.lastTemperature || '--'}°C</strong></span>
                  <span>Bat: <strong className="text-emerald-400">{s.lastBattery || '--'}%</strong></span>
                </div>
                <div className="mt-1.5 text-[10px] text-cyan-300 font-mono truncate border-t border-slate-800/80 pt-1">
                  📍 {s.dutyPost || (s.soldierId === 'SOL-001' ? 'North Ridge Bunker 4' : s.soldierId === 'SOL-002' ? 'Observation Post Bravo' : s.soldierId === 'SOL-003' ? 'East Valley Checkpoint 9' : s.soldierId === 'SOL-004' ? 'HQ Base Gate 2' : 'East Ridge Ravine')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

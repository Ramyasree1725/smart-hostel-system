import React, { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { SensorChart } from '../components/SensorChart';
import {
  BarChart3,
  Calendar,
  Filter,
  Download,
  Heart,
  Thermometer,
  Battery,
  Activity,
} from 'lucide-react';

export const History = () => {
  const { soldiers } = useSocket();
  const [selectedSoldierId, setSelectedSoldierId] = useState(soldiers[0]?.soldierId || 'SOL-001');
  const [timeRange, setTimeRange] = useState('24h');
  const [telemetryLogs, setTelemetryLogs] = useState([]);

  const currentSoldier = soldiers.find((s) => s.soldierId === selectedSoldierId) || soldiers[0];

  useEffect(() => {
    if (!currentSoldier) return;

    const baseHr = currentSoldier.lastHeartRate || 75;
    const baseTemp = currentSoldier.lastTemperature || 36.6;
    const count = timeRange === '1h' ? 12 : timeRange === '6h' ? 24 : 36;

    const logs = [];
    const now = Date.now();
    const intervalMs = timeRange === '1h' ? 5 * 60000 : timeRange === '6h' ? 15 * 60000 : 40 * 60000;

    for (let i = count; i >= 0; i--) {
      const timeObj = new Date(now - i * intervalMs);
      const hr = Math.max(54, Math.min(145, Math.round(baseHr + Math.sin(i / 1.5) * 12 + (Math.random() - 0.5) * 4)));
      const temp = Number((baseTemp + Math.cos(i / 2) * 0.4 + (Math.random() - 0.5) * 0.1).toFixed(1));
      const bat = Math.max(15, Math.min(100, Math.round(95 - (count - i) * 0.8)));

      logs.push({
        id: `log-${i}`,
        time: timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: timeObj.toLocaleDateString(),
        heartRate: hr,
        temperature: temp,
        spO2: hr > 130 ? 94 : 98,
        battery: bat,
        motion: hr > 110 ? 'RUNNING' : hr > 85 ? 'MOVING' : 'PATROLLING',
      });
    }

    setTelemetryLogs(logs);
  }, [selectedSoldierId, timeRange, currentSoldier?.lastHeartRate]);

  // Export CSV handler
  const handleExportCSV = () => {
    if (!telemetryLogs.length) return;
    const headers = 'Time,Date,SoldierID,HeartRate_BPM,Temperature_C,SpO2_Percent,Battery_Percent,Motion\n';
    const rows = telemetryLogs
      .map(
        (l) =>
          `"${l.time}","${l.date}","${selectedSoldierId}",${l.heartRate},${l.temperature},${l.spO2},${l.battery},"${l.motion}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Telemetry_History_${selectedSoldierId}_${Date.now()}.csv`;
    link.click();
  };

  // Stats calculation
  const hrValues = telemetryLogs.map((l) => l.heartRate);
  const avgHr = hrValues.length ? Math.round(hrValues.reduce((a, b) => a + b, 0) / hrValues.length) : 0;
  const maxHr = hrValues.length ? Math.max(...hrValues) : 0;
  const minHr = hrValues.length ? Math.min(...hrValues) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Historical Biometrics & Trends
            </h1>
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-800">
              ANALYTICS ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Evaluate longitudinal physiological performance, fatigue metrics, and sensor log archives
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-cyan-300 hover:bg-slate-700 transition"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV Telemetry Log</span>
        </button>
      </div>

      {/* Selectors */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-3">
        <div className="flex items-center space-x-3">
          <span className="text-xs font-medium text-slate-300">Select Soldier:</span>
          <select
            value={selectedSoldierId}
            onChange={(e) => setSelectedSoldierId(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-cyan-300 font-medium focus:border-cyan-500 focus:outline-none"
          >
            {soldiers.map((s) => (
              <option key={s.soldierId} value={s.soldierId}>
                {s.soldierId} - {s.displayName} ({s.unit})
              </option>
            ))}
          </select>
        </div>

        {/* Time Interval Selector */}
        <div className="flex items-center space-x-2">
          {['1h', '6h', '24h'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`rounded-lg px-3 py-1 text-xs font-mono font-medium transition ${
                timeRange === range
                  ? 'border border-cyan-500 bg-cyan-950 text-cyan-300'
                  : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              Past {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Insights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase">Average Pulse</span>
          <p className="mt-1 font-mono text-xl font-bold text-white">{avgHr} BPM</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
          <span className="text-[11px] font-semibold text-rose-400 uppercase">Peak Pulse (Max)</span>
          <p className="mt-1 font-mono text-xl font-bold text-rose-400">{maxHr} BPM</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
          <span className="text-[11px] font-semibold text-cyan-400 uppercase">Resting Pulse (Min)</span>
          <p className="mt-1 font-mono text-xl font-bold text-cyan-400">{minHr} BPM</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3">
          <span className="text-[11px] font-semibold text-amber-400 uppercase">Avg Temperature</span>
          <p className="mt-1 font-mono text-xl font-bold text-amber-400">{currentSoldier?.lastTemperature || 36.7} °C</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6">
        <SensorChart
          data={telemetryLogs}
          dataKey="heartRate"
          title={`${currentSoldier?.displayName} — Heart Rate Trend (${timeRange.toUpperCase()})`}
          unit="BPM"
          color="#EF4444"
          thresholdHigh={120}
          thresholdLow={50}
        />

        <SensorChart
          data={telemetryLogs}
          dataKey="temperature"
          title={`${currentSoldier?.displayName} — Core Temperature Trend (${timeRange.toUpperCase()})`}
          unit="°C"
          color="#F59E0B"
          thresholdHigh={38.5}
          thresholdLow={35.0}
        />
      </div>

      {/* Raw Telemetry Data Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
        <div className="border-b border-slate-800 px-4 py-3 font-mono text-xs font-bold text-slate-300 uppercase">
          Archived Telemetry Logs ({telemetryLogs.length} Records)
        </div>
        <div className="overflow-x-auto max-h-64 overflow-y-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-950/60 font-mono text-[10px] text-slate-400 uppercase sticky top-0">
              <tr>
                <th className="px-4 py-2">Timestamp</th>
                <th className="px-4 py-2">Heart Rate</th>
                <th className="px-4 py-2">Temperature</th>
                <th className="px-4 py-2">SpO2 Oxygen</th>
                <th className="px-4 py-2">Battery</th>
                <th className="px-4 py-2">Motion Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {telemetryLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/20">
                  <td className="px-4 py-2 text-slate-400">{log.time} ({log.date})</td>
                  <td className="px-4 py-2 text-rose-400 font-bold">{log.heartRate} BPM</td>
                  <td className="px-4 py-2 text-amber-400 font-bold">{log.temperature} °C</td>
                  <td className="px-4 py-2 text-cyan-400">{log.spO2}%</td>
                  <td className="px-4 py-2 text-emerald-400">{log.battery}%</td>
                  <td className="px-4 py-2 text-slate-300">{log.motion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

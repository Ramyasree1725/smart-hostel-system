import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import {
  FileText,
  Printer,
  Download,
  Shield,
  CheckCircle,
  AlertTriangle,
  Users,
  HardDrive,
  Calendar,
} from 'lucide-react';

export const Reports = () => {
  const { soldiers, devices, alerts } = useSocket();
  const { user } = useAuth();
  const [reportType, setReportType] = useState('DAILY');

  const activeSoldiers = soldiers.filter((s) => s.monitoringStatus === 'ACTIVE').length;
  const criticalAlerts = alerts.filter((a) => a.severity === 'CRITICAL').length;
  const activeAlerts = alerts.filter((a) => a.status === 'ACTIVE').length;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadCSV = () => {
    const headers = 'SoldierID,Name,Rank,Unit,DeviceID,HeartRate_BPM,Temperature_C,Battery_Percent,Status,HealthStatus\n';
    const rows = soldiers
      .map(
        (s) =>
          `"${s.soldierId}","${s.displayName}","${s.rank}","${s.unit}","${s.deviceId || 'None'}",${s.lastHeartRate || 0},${s.lastTemperature || 0},${s.lastBattery || 0},"${s.monitoringStatus}","${s.healthStatus}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Tactical_Mission_Report_${reportType}_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 print:hidden">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Mission & Health Analytics Reports
            </h1>
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-800">
              OFFICIAL DISPATCH
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Generate printable military-spec operational dossiers, sensor telemetry logs, and casualty triage reports
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-slate-700 transition"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 rounded-lg bg-cyan-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 hover:bg-cyan-500 transition"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Report Controls (Hidden during print) */}
      <div className="flex items-center space-x-3 rounded-xl border border-slate-800 bg-slate-900/40 p-3 print:hidden">
        <span className="text-xs font-medium text-slate-300">Report Template:</span>
        <div className="flex space-x-2">
          {['DAILY', 'WEEKLY', 'INCIDENTS_ONLY'].map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              className={`rounded-lg px-3 py-1 text-xs font-mono font-semibold transition ${
                reportType === type
                  ? 'border border-cyan-500 bg-cyan-950 text-cyan-300'
                  : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {type.replace(/_/g, ' ')} REPORT
            </button>
          ))}
        </div>
      </div>

      {/* Printable Report Document */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md space-y-6 print:border-none print:bg-white print:text-black print:p-0">
        {/* Military Letterhead */}
        <div className="flex items-center justify-between border-b-2 border-slate-700 pb-6 print:border-black">
          <div className="space-y-1">
            <h2 className="font-mono text-xl font-extrabold uppercase tracking-wider text-white print:text-black">
              TACTICAL FIELD TELEMETRY & HEALTH DOSSIER
            </h2>
            <p className="text-xs text-slate-400 font-mono print:text-gray-600">
              SMART SOLDIER MONITORING & SAFETY SYSTEM • ALPHA SECTOR COMMAND
            </p>
          </div>
          <div className="text-right text-xs font-mono text-slate-400 print:text-gray-600">
            <p><strong>Report ID:</strong> RPT-2026-0905-ALPHA</p>
            <p><strong>Generated:</strong> {new Date().toLocaleString()}</p>
            <p><strong>Officer:</strong> {user?.name || 'Captain Vikram Rathore'} ({user?.officerId || 'OFF-007'})</p>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-4 gap-4 text-xs font-mono">
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 print:border-gray-400 print:bg-gray-50">
            <span className="text-slate-400 print:text-gray-600">Enlisted Personnel</span>
            <p className="text-xl font-bold text-white print:text-black mt-1">{soldiers.length} Soldiers</p>
            <p className="text-[10px] text-emerald-400 print:text-green-700 mt-0.5">{activeSoldiers} on Mission</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 print:border-gray-400 print:bg-gray-50">
            <span className="text-slate-400 print:text-gray-600">IoT Transceivers</span>
            <p className="text-xl font-bold text-white print:text-black mt-1">{devices.length} Units</p>
            <p className="text-[10px] text-cyan-400 print:text-blue-700 mt-0.5">ESP32 + LoRa Active</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 print:border-gray-400 print:bg-gray-50">
            <span className="text-slate-400 print:text-gray-600">Logged Incidents</span>
            <p className="text-xl font-bold text-white print:text-black mt-1">{alerts.length} Incidents</p>
            <p className="text-[10px] text-amber-400 print:text-amber-700 mt-0.5">{activeAlerts} Pending Action</p>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 print:border-gray-400 print:bg-gray-50">
            <span className="text-slate-400 print:text-gray-600">Critical Alarms</span>
            <p className="text-xl font-bold text-rose-400 print:text-red-700 mt-1">{criticalAlerts} Critical</p>
            <p className="text-[10px] text-slate-400 print:text-gray-600 mt-0.5">Cardiac / SOS</p>
          </div>
        </div>

        {/* Soldier Deployment Roster in Report */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono print:text-black">
            1. Tactical Deployment & Current Biometrics Status
          </h3>
          <table className="w-full text-left text-xs text-slate-300 print:text-black border border-slate-800 print:border-black">
            <thead className="bg-slate-950/80 font-mono text-[10px] text-slate-400 print:bg-gray-200 print:text-black border-b border-slate-800 print:border-black uppercase">
              <tr>
                <th className="p-2">ID</th>
                <th className="p-2">Soldier Callsign</th>
                <th className="p-2">Unit</th>
                <th className="p-2">Assigned Band</th>
                <th className="p-2">Heart Rate</th>
                <th className="p-2">Temp</th>
                <th className="p-2">Battery</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 print:divide-black text-[11px] font-mono">
              {soldiers.map((s) => (
                <tr key={s.soldierId}>
                  <td className="p-2 font-bold">{s.soldierId}</td>
                  <td className="p-2">{s.displayName} ({s.rank})</td>
                  <td className="p-2">{s.unit}</td>
                  <td className="p-2">{s.deviceId || 'None'}</td>
                  <td className="p-2">{s.lastHeartRate || '--'} BPM</td>
                  <td className="p-2">{s.lastTemperature || '--'} °C</td>
                  <td className="p-2">{s.lastBattery || '--'}%</td>
                  <td className="p-2 font-bold">{s.healthStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Incident Summary in Report */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono print:text-black">
            2. Incident Log & Escalation Records
          </h3>
          <table className="w-full text-left text-xs text-slate-300 print:text-black border border-slate-800 print:border-black">
            <thead className="bg-slate-950/80 font-mono text-[10px] text-slate-400 print:bg-gray-200 print:text-black border-b border-slate-800 print:border-black uppercase">
              <tr>
                <th className="p-2">Alert ID</th>
                <th className="p-2">Soldier</th>
                <th className="p-2">Type</th>
                <th className="p-2">Severity</th>
                <th className="p-2">Details</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 print:divide-black text-[11px] font-mono">
              {alerts.slice(0, 8).map((a) => (
                <tr key={a.alertId || a.id}>
                  <td className="p-2 font-bold">{a.alertId}</td>
                  <td className="p-2">{a.soldierName}</td>
                  <td className="p-2">{a.type}</td>
                  <td className="p-2 font-bold">{a.severity}</td>
                  <td className="p-2">{a.message}</td>
                  <td className="p-2">{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Officer Signature Block */}
        <div className="pt-8 border-t border-slate-800 print:border-black grid grid-cols-2 gap-8 text-xs font-mono">
          <div>
            <p className="text-slate-400 print:text-gray-600">Medical Officer Endorsement:</p>
            <div className="mt-8 border-b border-slate-700 print:border-black w-48"></div>
            <p className="mt-1 text-slate-300 print:text-black">Dr. Major Ananya Roy (MED-101)</p>
          </div>
          <div>
            <p className="text-slate-400 print:text-gray-600">Commanding Officer Verification:</p>
            <div className="mt-8 border-b border-slate-700 print:border-black w-48"></div>
            <p className="mt-1 text-slate-300 print:text-black">Captain Vikram Rathore (OFF-007)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

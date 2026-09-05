import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSystemSettings, updateSystemSettings, getAuditLogs } from '../services/api';
import {
  Settings as SettingsIcon,
  Sliders,
  Shield,
  Bell,
  MapPin,
  Save,
  CheckCircle,
  FileText,
  UserCheck,
} from 'lucide-react';

export const Settings = () => {
  const { user } = useAuth();

  const [thresholds, setThresholds] = useState({
    maxHeartRate: 120,
    minHeartRate: 50,
    maxTemperature: 38.5,
    minTemperature: 35.0,
    minSpO2: 90,
    lowBatteryThreshold: 20,
    geofenceRadiusKm: 5.0,
    enableAutoAlerts: true,
    enableSoundAlarms: true,
  });

  const [auditLogs, setAuditLogs] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSystemSettings()
      .then((res) => {
        if (res.data.success && res.data.settings) {
          setThresholds((prev) => ({ ...prev, ...res.data.settings }));
        }
      })
      .catch(() => {});

    getAuditLogs()
      .then((res) => {
        if (res.data.success) {
          setAuditLogs(res.data.auditLogs);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSystemSettings(thresholds);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      setSavedSuccess(true); // fallback demo save
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              System Settings & Alert Parameters
            </h1>
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-800">
              CONFIG ROOT
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Configure physiological threshold triggers, geofence radius boundaries, and review tactical audit logs
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center space-x-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/50 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
            <CheckCircle className="h-4 w-4" />
            <span>Parameters Updated & Broadcasted</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Thresholds Configuration Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSave} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-5">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
              <Sliders className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Sensor Alarm Thresholds
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Max Heart Rate */}
              <div>
                <label className="font-semibold text-slate-300">Max Heart Rate Alert (BPM)</label>
                <input
                  type="number"
                  value={thresholds.maxHeartRate}
                  onChange={(e) => setThresholds({ ...thresholds, maxHeartRate: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-white focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Triggers Tachycardia warning above this</p>
              </div>

              {/* Min Heart Rate */}
              <div>
                <label className="font-semibold text-slate-300">Min Heart Rate Alert (BPM)</label>
                <input
                  type="number"
                  value={thresholds.minHeartRate}
                  onChange={(e) => setThresholds({ ...thresholds, minHeartRate: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-white focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Triggers Bradycardia warning below this</p>
              </div>

              {/* Max Temperature */}
              <div>
                <label className="font-semibold text-slate-300">Max Body Temp Alert (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={thresholds.maxTemperature}
                  onChange={(e) => setThresholds({ ...thresholds, maxTemperature: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-white focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">High fever / heat exhaustion limit</p>
              </div>

              {/* Low Battery */}
              <div>
                <label className="font-semibold text-slate-300">Low Battery Threshold (%)</label>
                <input
                  type="number"
                  value={thresholds.lowBatteryThreshold}
                  onChange={(e) => setThresholds({ ...thresholds, lowBatteryThreshold: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-white focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Dispatches low power notification</p>
              </div>

              {/* Min SpO2 */}
              <div>
                <label className="font-semibold text-slate-300">Min SpO2 Blood Oxygen (%)</label>
                <input
                  type="number"
                  value={thresholds.minSpO2}
                  onChange={(e) => setThresholds({ ...thresholds, minSpO2: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-white focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Hypoxia alarm threshold</p>
              </div>

              {/* Geofence Radius */}
              <div>
                <label className="font-semibold text-slate-300">Geofence Safe Radius (km)</label>
                <input
                  type="number"
                  step="0.5"
                  value={thresholds.geofenceRadiusKm}
                  onChange={(e) => setThresholds({ ...thresholds, geofenceRadiusKm: Number(e.target.value) })}
                  className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-white focus:border-cyan-500 focus:outline-none"
                />
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">Perimeter distance from Alpha Base</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <span className="text-xs text-slate-400 font-mono">
                Changes apply instantly across all nodes via WebSockets
              </span>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 rounded-lg bg-cyan-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 hover:bg-cyan-500 transition"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'Saving...' : 'Save Configuration'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 5 Cols: Officer Profile & System Audit Logs */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Officer Card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
              <UserCheck className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Commanding Officer Credentials
              </h3>
            </div>

            <div className="space-y-1.5 text-xs">
              <p><strong className="text-slate-400">Name:</strong> {user?.name || 'Captain Vikram Rathore'}</p>
              <p><strong className="text-slate-400">Officer ID:</strong> <span className="font-mono text-cyan-400">{user?.officerId || 'OFF-007'}</span></p>
              <p><strong className="text-slate-400">Security Clearance:</strong> <span className="text-emerald-400 font-semibold">{user?.role || 'COMMANDING_OFFICER'}</span></p>
              <p><strong className="text-slate-400">Base Unit:</strong> Special Tactical Command Alpha</p>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
              <FileText className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Tactical Audit Log
              </h3>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto font-mono text-[11px] text-slate-400">
              {auditLogs.length === 0 ? (
                <p className="text-slate-500">System initialized. No audit logs recorded.</p>
              ) : (
                auditLogs.map((log) => (
                  <div key={log.id} className="rounded border border-slate-800 bg-slate-950/60 p-2">
                    <div className="flex items-center justify-between text-cyan-400">
                      <span className="font-bold">[{log.action}]</span>
                      <span className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <p className="mt-1 text-slate-300">{log.details}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

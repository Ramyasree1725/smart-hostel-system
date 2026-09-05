import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle,
  Clock,
  Filter,
  Search,
  BellRing,
  CheckCheck,
  AlertOctagon,
} from 'lucide-react';

export const Alerts = () => {
  const { alerts, handleAcknowledge, playAlertSound } = useSocket();
  const { user } = useAuth();

  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((a) => {
    const matchesSeverity = severityFilter === 'ALL' || a.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    const matchesSearch =
      a.soldierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.alertId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const activeCount = alerts.filter((a) => a.status === 'ACTIVE').length;
  const criticalCount = alerts.filter((a) => a.status === 'ACTIVE' && a.severity === 'CRITICAL').length;
  const ackCount = alerts.filter((a) => a.status === 'ACKNOWLEDGED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Incident & Anomaly Alerts Center
            </h1>
            <span className="rounded bg-rose-950 px-2 py-0.5 text-xs font-semibold text-rose-400 border border-rose-800">
              {activeCount} Active
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time biometric abnormality triggers, offline device alarms, and SOS beacons
          </p>
        </div>

        {activeCount > 0 && (
          <button
            onClick={() => {
              // Acknowledge all active alerts
              alerts
                .filter((a) => a.status === 'ACTIVE')
                .forEach((a) => handleAcknowledge(a.alertId || a.id, user?.name || 'Officer'));
            }}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-slate-700 transition"
          >
            <CheckCheck className="h-4 w-4" />
            <span>Acknowledge All ({activeCount})</span>
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
          <div className="flex items-center justify-between text-rose-400 text-xs font-semibold">
            <span>CRITICAL THREATS</span>
            <ShieldAlert className="h-4 w-4 animate-bounce" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-white">{criticalCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Cardiac arrest, SOS, high fever</p>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <div className="flex items-center justify-between text-amber-400 text-xs font-semibold">
            <span>ACTIVE INCIDENTS</span>
            <AlertTriangle className="h-4 w-4" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-white">{activeCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Awaiting officer review & triage</p>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold">
            <span>ACKNOWLEDGED & RESOLVED</span>
            <CheckCircle className="h-4 w-4" />
          </div>
          <p className="mt-2 font-mono text-3xl font-bold text-white">{ackCount}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Triaged by command officers</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search alerts by soldier, type, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 py-2 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Alarms</option>
            <option value="ACKNOWLEDGED">Acknowledged</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 py-2 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
          </select>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-12 text-center text-slate-400">
            <CheckCircle className="h-10 w-10 text-emerald-500/40 mx-auto mb-2" />
            <p className="font-semibold text-sm">No alerts match your filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1 font-mono">All biometric and communication telemetry nominal.</p>
          </div>
        ) : (
          filteredAlerts.map((alt) => {
            const isCritical = alt.severity === 'CRITICAL';
            const isAck = alt.status === 'ACKNOWLEDGED';

            return (
              <div
                key={alt.alertId || alt.id}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border p-4 transition ${
                  isAck
                    ? 'border-slate-800 bg-slate-950/40 opacity-75'
                    : isCritical
                    ? 'border-rose-600 bg-rose-950/30 shadow-lg shadow-rose-950/30'
                    : 'border-amber-600/50 bg-amber-950/20'
                }`}
              >
                {/* Alert Details */}
                <div className="flex items-start space-x-3.5">
                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                      isAck
                        ? 'bg-slate-800 text-slate-400'
                        : isCritical
                        ? 'bg-rose-950 border border-rose-500 text-rose-400'
                        : 'bg-amber-950 border border-amber-500 text-amber-400'
                    }`}
                  >
                    {isCritical ? (
                      <ShieldAlert className="h-5 w-5 animate-pulse" />
                    ) : (
                      <AlertTriangle className="h-5 w-5" />
                    )}
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-slate-400">
                        {alt.alertId}
                      </span>
                      <span className="font-bold text-white text-sm">
                        {alt.soldierName}
                      </span>
                      <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800">
                        {alt.soldierId}
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.2 text-[10px] font-bold font-mono ${
                          isCritical
                            ? 'bg-rose-900 text-rose-200'
                            : 'bg-amber-900 text-amber-200'
                        }`}
                      >
                        {alt.type.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <p className="text-slate-300 font-medium text-xs">{alt.message}</p>

                    <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-400 font-mono">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(alt.createdAt).toLocaleString()}</span>
                      </span>
                      {alt.value && <span>Reading: <strong className="text-white">{alt.value}</strong></span>}
                      {alt.acknowledgedBy && (
                        <span className="text-emerald-400">
                          ✓ Acknowledged by {alt.acknowledgedBy} at {new Date(alt.acknowledgedAt).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {!isAck ? (
                    <button
                      onClick={() => handleAcknowledge(alt.alertId || alt.id, user?.name || 'Officer')}
                      className="flex items-center space-x-1.5 rounded-lg bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-slate-700 transition"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Acknowledge</span>
                    </button>
                  ) : (
                    <span className="rounded bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 text-xs font-semibold text-emerald-400 flex items-center space-x-1">
                      <CheckCheck className="h-3.5 w-3.5" />
                      <span>Resolved</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

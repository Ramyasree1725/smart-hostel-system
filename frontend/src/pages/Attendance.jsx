import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { Users, CheckCircle, Shield, Clock, AlertTriangle } from 'lucide-react';

export const Attendance = () => {
  const { soldiers } = useSocket();
  const [attendanceList, setAttendanceList] = useState(
    soldiers.map((s) => ({
      ...s,
      attendanceStatus: s.monitoringStatus === 'OFFLINE' ? 'MISSING_MIA' : 'PRESENT_PATROL',
      lastCheckin: 'Just now',
    }))
  );

  const handleStatusChange = (soldierId, newStatus) => {
    setAttendanceList((prev) =>
      prev.map((s) => (s.soldierId === soldierId ? { ...s, attendanceStatus: newStatus } : s))
    );
  };

  const presentCount = attendanceList.filter((s) => s.attendanceStatus === 'PRESENT_PATROL').length;
  const standbyCount = attendanceList.filter((s) => s.attendanceStatus === 'STANDBY_BASE').length;
  const sickCount = attendanceList.filter((s) => s.attendanceStatus === 'SICK_BAY').length;
  const missingCount = attendanceList.filter((s) => s.attendanceStatus === 'MISSING_MIA').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Daily Soldier Attendance & Roll Call
            </h1>
            <span className="rounded bg-emerald-950 px-2 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-800">
              ROLL-CALL ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time army personnel attendance: On Patrol, Standby at Base, Sick Bay, or Missing in Action
          </p>
        </div>

        <span className="rounded-lg bg-emerald-950 px-3 py-1.5 text-xs font-mono font-bold text-emerald-400 border border-emerald-800">
          Unit Strength: {attendanceList.length}/{attendanceList.length} Accounted
        </span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
          <span className="text-emerald-400 font-bold">🟢 PRESENT ON PATROL</span>
          <p className="text-2xl font-bold text-white mt-1">{presentCount} Soldiers</p>
        </div>
        <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
          <span className="text-cyan-400 font-bold">🔵 STANDBY AT BASE</span>
          <p className="text-2xl font-bold text-white mt-1">{standbyCount} Soldiers</p>
        </div>
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
          <span className="text-amber-400 font-bold">🟡 SICK BAY / HOSPITAL</span>
          <p className="text-2xl font-bold text-white mt-1">{sickCount} Soldiers</p>
        </div>
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
          <span className="text-rose-400 font-bold">🔴 MISSING IN ACTION (MIA)</span>
          <p className="text-2xl font-bold text-rose-400 mt-1">{missingCount} Soldiers</p>
        </div>
      </div>

      {/* Roll Call Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50">
        <table className="w-full text-left text-xs text-slate-300 font-mono">
          <thead className="bg-slate-950 border-b border-slate-800 text-[10px] text-slate-400 uppercase">
            <tr>
              <th className="p-4">Soldier ID / Photo</th>
              <th className="p-4">Full Name & Rank</th>
              <th className="p-4">Tactical Unit</th>
              <th className="p-4">📍 Working Post / Location</th>
              <th className="p-4">Current Attendance Status</th>
              <th className="p-4">Last Check-in</th>
              <th className="p-4 text-right">Update Roll Call</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {attendanceList.map((soldier) => {
              const dutyPosts = {
                'SOL-001': 'North Ridge Bunker 4 (Border Post Alpha)',
                'SOL-002': 'Forward Observation Post Bravo (Grid 78.35)',
                'SOL-003': 'East Valley Checkpoint 9 (Dense Ravine)',
                'SOL-004': 'Main Base HQ Armoury & Perimeter Gate 2',
                'SOL-005': 'East Ridge Outpost 7 (Hostile Terrain Sector)'
              };
              const post = soldier.dutyPost || dutyPosts[soldier.soldierId] || 'Sector Alpha Patrol';

              return (
                <tr key={soldier.soldierId} className="hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-cyan-400 flex items-center space-x-2.5">
                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-white">
                      🪖
                    </div>
                    <span>{soldier.soldierId}</span>
                  </td>
                  <td className="p-4">
                    <strong className="text-white text-sm">{soldier.displayName}</strong>
                    <p className="text-[11px] text-slate-400">{soldier.rank}</p>
                  </td>
                  <td className="p-4">{soldier.unit}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-cyan-400">📍</span>
                      <strong className="text-white text-xs">{post}</strong>
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">🎯 Border Security & Surveillance</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        soldier.attendanceStatus === 'PRESENT_PATROL'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : soldier.attendanceStatus === 'STANDBY_BASE'
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                          : soldier.attendanceStatus === 'SICK_BAY'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-rose-950 text-rose-300 border border-rose-800'
                      }`}
                    >
                      {soldier.attendanceStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                <td className="p-4 text-slate-400">{soldier.lastCheckin}</td>
                <td className="p-4 text-right">
                  <select
                    value={soldier.attendanceStatus}
                    onChange={(e) => handleStatusChange(soldier.soldierId, e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-cyan-300 font-semibold focus:outline-none"
                  >
                    <option value="PRESENT_PATROL">Present (On Patrol)</option>
                    <option value="STANDBY_BASE">Standby at Base</option>
                    <option value="SICK_BAY">Sick Bay (Hospital)</option>
                    <option value="MISSING_MIA">Missing in Action (MIA)</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

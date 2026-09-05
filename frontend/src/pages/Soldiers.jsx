import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import { AddSoldierModal } from '../components/AddSoldierModal';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Heart,
  Thermometer,
  Battery,
  Shield,
  Eye,
  Trash2,
  Activity,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

export const Soldiers = () => {
  const { soldiers, refreshData } = useSocket();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter list
  const filteredSoldiers = soldiers.filter((s) => {
    const matchesSearch =
      s.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.soldierId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.deviceId && s.deviceId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesUnit = selectedUnit === 'ALL' || s.unit.includes(selectedUnit);
    const matchesStatus = selectedStatus === 'ALL' || s.monitoringStatus === selectedStatus;

    return matchesSearch && matchesUnit && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Soldier Personnel Roster
            </h1>
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-800">
              {soldiers.length} Enlisted
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Manage deployed personnel, assign wearable sensors, and monitor individual biometrics
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 hover:from-cyan-500 hover:to-blue-500 transition"
        >
          <UserPlus className="h-4 w-4" />
          <span>Enlist New Soldier</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search by Soldier ID, Name, or Device ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 py-2 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="ALL">All Tactical Units</option>
            <option value="10 Para">10 Para Special Forces</option>
            <option value="Bravo">Bravo Recon Platoon</option>
            <option value="Charlie">Charlie Support</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-900/80 py-2 px-3 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Deployment</option>
            <option value="OFFLINE">Offline</option>
            <option value="STANDBY">Standby</option>
          </select>
        </div>
      </div>

      {/* Soldiers Roster Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 bg-slate-950/60 font-mono text-[11px] text-slate-400 uppercase">
              <tr>
                <th className="px-4 py-3">Soldier ID / Name</th>
                <th className="px-4 py-3">Unit & Rank</th>
                <th className="px-4 py-3">Assigned Device</th>
                <th className="px-4 py-3">Biometrics (HR / Temp)</th>
                <th className="px-4 py-3">Battery</th>
                <th className="px-4 py-3">Health Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredSoldiers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-slate-500 font-mono">
                    No soldier personnel match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredSoldiers.map((s) => (
                  <tr key={s.soldierId} className="hover:bg-slate-800/30 transition">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 font-mono font-bold text-cyan-400">
                          {s.displayName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{s.displayName}</p>
                          <p className="font-mono text-[10px] text-cyan-400">{s.soldierId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <p className="font-medium text-slate-200">{s.unit}</p>
                      <p className="text-[10px] text-slate-400">{s.rank} • Blood: {s.bloodGroup || 'O+Pos'}</p>
                    </td>

                    <td className="px-4 py-3.5">
                      {s.deviceId ? (
                        <span className="font-mono text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800">
                          {s.deviceId}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic">Unassigned</span>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center space-x-3 font-mono">
                        <span className="flex items-center space-x-1 text-rose-400">
                          <Heart className="h-3.5 w-3.5" />
                          <span>{s.lastHeartRate || '--'} BPM</span>
                        </span>
                        <span className="flex items-center space-x-1 text-amber-400">
                          <Thermometer className="h-3.5 w-3.5" />
                          <span>{s.lastTemperature || '--'}°C</span>
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center space-x-1.5 font-mono">
                        <Battery className={`h-3.5 w-3.5 ${s.lastBattery < 20 ? 'text-rose-500' : 'text-emerald-400'}`} />
                        <span className={s.lastBattery < 20 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                          {s.lastBattery || '--'}%
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center space-x-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          s.monitoringStatus === 'OFFLINE'
                            ? 'bg-slate-800 text-slate-400'
                            : s.healthStatus === 'CRITICAL'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800 animate-pulse'
                            : s.healthStatus === 'WARNING'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                        <span>{s.monitoringStatus === 'OFFLINE' ? 'OFFLINE' : s.healthStatus}</span>
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <Link
                        to={`/soldiers/${s.soldierId}`}
                        className="inline-flex items-center space-x-1 rounded bg-slate-800 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:bg-slate-700 transition"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Profile</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Soldier Modal */}
      <AddSoldierModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSoldierAdded={() => refreshData()}
      />
    </div>
  );
};

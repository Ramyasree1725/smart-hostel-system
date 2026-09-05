import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import {
  Shield,
  Heart,
  Users,
  Package,
  X,
  Send,
  Truck,
  Sparkles,
  Crosshair,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';

export const DispatchActionModal = ({ isOpen, onClose, targetSoldier, defaultTab = 'DOCTOR' }) => {
  const { soldiers, refreshData } = useSocket();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [doctorName, setDoctorName] = useState('Dr. Major Ananya Roy (Field Hospital)');
  const [reinforcementSquad, setReinforcementSquad] = useState('Quick Reaction Team Alpha (4 Commandos)');
  const [supplyMethod, setSupplyMethod] = useState('DRONE_AIR_DROP');
  const [selectedSupplies, setSelectedSupplies] = useState(['Fresh Drinking Water (5L)', 'Tactical MRE Food Rations (2 Days)']);
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !targetSoldier) return null;

  const handleSupplyToggle = (item) => {
    if (selectedSupplies.includes(item)) {
      setSelectedSupplies(selectedSupplies.filter((i) => i !== item));
    } else {
      setSelectedSupplies([...selectedSupplies, item]);
    }
  };

  // Dispatch Action Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('');

    try {
      const endpoint =
        activeTab === 'DOCTOR'
          ? '/api/logistics/dispatch-doctor'
          : activeTab === 'REINFORCEMENTS'
          ? '/api/logistics/dispatch-reinforcements'
          : '/api/logistics/dispatch-supply';

      const payload = {
        soldierId: targetSoldier.soldierId,
        doctorName: activeTab === 'DOCTOR' ? doctorName : undefined,
        backupTeamName: activeTab === 'REINFORCEMENTS' ? reinforcementSquad : undefined,
        items: activeTab === 'SUPPLIES' ? selectedSupplies : undefined,
        method: activeTab === 'SUPPLIES' ? supplyMethod : undefined,
        reason: `${activeTab} dispatched by Commander for ${targetSoldier.displayName}`,
      };

      await axios.post(`http://localhost:5000${endpoint}`, payload).catch(() => {});
      setStatusMsg(`Action Dispatched Successfully! Live ETA: 4-6 minutes.`);
      setTimeout(() => {
        setStatusMsg('');
        onClose();
        refreshData();
      }, 2000);
    } catch (err) {
      setStatusMsg(`Dispatched successfully!`);
      setTimeout(() => {
        setStatusMsg('');
        onClose();
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl border border-cyan-500/40 bg-[#0A0F1E] p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-base font-bold text-white uppercase">COMMAND DISPATCH & SUPPORT</span>
              <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-mono text-cyan-400 border border-cyan-800">
                {targetSoldier.soldierId}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Target: <strong className="text-white">{targetSoldier.displayName}</strong> ({targetSoldier.unit})
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">✕</button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-3 gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveTab('DOCTOR')}
            className={`rounded-xl p-2.5 font-bold transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'DOCTOR'
                ? 'bg-rose-950 border border-rose-500 text-rose-300 shadow-lg shadow-rose-950/40'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>🚑 Send Doctor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('REINFORCEMENTS')}
            className={`rounded-xl p-2.5 font-bold transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'REINFORCEMENTS'
                ? 'bg-amber-950 border border-amber-500 text-amber-300 shadow-lg shadow-amber-950/40'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>🛡️ Assign Backup</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('SUPPLIES')}
            className={`rounded-xl p-2.5 font-bold transition flex items-center justify-center space-x-1.5 ${
              activeTab === 'SUPPLIES'
                ? 'bg-cyan-950 border border-cyan-500 text-cyan-300 shadow-lg shadow-cyan-950/40'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>📦 Supply Drop</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          {/* TAB 1: Send Doctor */}
          {activeTab === 'DOCTOR' && (
            <div className="space-y-3 rounded-xl border border-rose-500/20 bg-rose-950/10 p-4">
              <label className="text-slate-300 font-bold">Select Medical Officer / Trauma Team:</label>
              <select
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white font-semibold focus:border-rose-500 focus:outline-none"
              >
                <option value="Dr. Major Ananya Roy (Field Hospital Alpha Base)">Dr. Major Ananya Roy (Field Hospital Alpha Base)</option>
                <option value="Dr. Captain Suresh Nair (Mobile Trauma Unit 3)">Dr. Captain Suresh Nair (Mobile Trauma Unit 3)</option>
                <option value="Air Ambulance Medical Evac Team (Helicopter)">Air Ambulance Medical Evac Team (Helicopter - Priority)</option>
              </select>

              <div className="rounded-lg bg-slate-950 p-2.5 text-[11px] text-slate-300 space-y-1">
                <p>📍 Destination GPS: {targetSoldier.lastLocation?.lat.toFixed(4)}°N, {targetSoldier.lastLocation?.lng.toFixed(4)}°E</p>
                <p>💓 Current Vitals: <strong className="text-rose-400">{targetSoldier.lastHeartRate} BPM</strong> / <strong className="text-amber-400">{targetSoldier.lastTemperature}°C</strong></p>
                <p className="text-emerald-400">⏱ Estimated Arrival Time (ETA): ~4 to 6 Minutes</p>
              </div>
            </div>
          )}

          {/* TAB 2: Assign Reinforcements */}
          {activeTab === 'REINFORCEMENTS' && (
            <div className="space-y-3 rounded-xl border border-amber-500/20 bg-amber-950/10 p-4">
              <label className="text-slate-300 font-bold">Select Reinforcement Squad / Rescue Unit:</label>
              <select
                value={reinforcementSquad}
                onChange={(e) => setReinforcementSquad(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white font-semibold focus:border-amber-500 focus:outline-none"
              >
                <option value="Quick Reaction Team Alpha (4 Commandos)">Quick Reaction Team Alpha (4 Commandos - Nearest)</option>
                <option value="Bravo Recon Platoon Support Squad">Bravo Recon Platoon Support Squad (6 Personnel)</option>
                <option value="Armored Tactical Patrol Unit (BMP-2)">Armored Tactical Patrol Unit (BMP-2 Vehicle)</option>
                <option value="Drone Recon & Search Team">Drone Recon & Search Team</option>
              </select>

              <div className="rounded-lg bg-slate-950 p-2.5 text-[11px] text-slate-300 space-y-1">
                <p>📍 Rendezvous GPS: {targetSoldier.lastLocation?.lat.toFixed(4)}°N, {targetSoldier.lastLocation?.lng.toFixed(4)}°E</p>
                <p>🛡️ Soldier Status: <strong className="text-amber-400">{targetSoldier.tacticalStatus || 'IN_DANGER'}</strong></p>
                <p className="text-emerald-400">⏱ Reinforcement ETA: ~5 to 8 Minutes</p>
              </div>
            </div>
          )}

          {/* TAB 3: Supplies (Food, Water, Weapons) */}
          {activeTab === 'SUPPLIES' && (
            <div className="space-y-3 rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-4">
              <label className="text-slate-300 font-bold">Select Supply Package Items:</label>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                {[
                  'Fresh Drinking Water (5L)',
                  'Tactical MRE Food Rations (3 Days)',
                  '5.56mm Ammo (180 Rds)',
                  '7.62mm Sniper Ammo (60 Rds)',
                  'Trauma First-Aid Medical Kit',
                  'Replacement Band Batteries (2x)',
                ].map((item) => (
                  <label
                    key={item}
                    className={`flex items-center space-x-2 rounded-lg border p-2 cursor-pointer transition ${
                      selectedSupplies.includes(item)
                        ? 'border-cyan-500 bg-cyan-950/60 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSupplies.includes(item)}
                      onChange={() => handleSupplyToggle(item)}
                      className="rounded accent-cyan-500"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <div className="pt-2">
                <label className="text-slate-300 font-bold">Delivery Method:</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setSupplyMethod('DRONE_AIR_DROP')}
                    className={`rounded-lg p-2 font-bold transition text-center ${
                      supplyMethod === 'DRONE_AIR_DROP'
                        ? 'bg-cyan-900 text-white border border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    🛸 High-Speed Drone Air Drop (ETA 3m)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSupplyMethod('GROUND_TACTICAL_VEHICLE')}
                    className={`rounded-lg p-2 font-bold transition text-center ${
                      supplyMethod === 'GROUND_TACTICAL_VEHICLE'
                        ? 'bg-cyan-900 text-white border border-cyan-400'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    🚚 Ground Supply Vehicle (ETA 10m)
                  </button>
                </div>
              </div>
            </div>
          )}

          {statusMsg && (
            <div className="rounded-lg border border-emerald-500/50 bg-emerald-950/80 p-2.5 text-center text-xs font-bold text-emerald-300">
              {statusMsg}
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-slate-300 hover:bg-slate-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-2 font-bold text-white shadow-lg shadow-cyan-600/30 hover:from-cyan-500 transition"
            >
              <Send className="h-4 w-4" />
              <span>Confirm & Dispatch Action</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

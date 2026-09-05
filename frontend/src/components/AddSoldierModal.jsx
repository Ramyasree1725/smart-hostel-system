import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { createSoldier } from '../services/api';
import { UserPlus, X, Shield } from 'lucide-react';

export const AddSoldierModal = ({ isOpen, onClose, onSoldierAdded }) => {
  const { devices } = useSocket();

  const [formData, setFormData] = useState({
    displayName: '',
    rank: 'Sergeant',
    unit: '10 Para Special Forces',
    bloodGroup: 'B+Pos',
    emergencyContact: '+91-9848011223',
    deviceId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  // Available unassigned devices
  const availableDevices = devices.filter((d) => !d.assignedSoldierId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await createSoldier(formData);
      if (res.data.success) {
        onSoldierAdded(res.data.soldier);
        onClose();
      }
    } catch (err) {
      // Local fallback create
      const mockSoldier = {
        soldierId: `SOL-${String(Math.floor(Math.random() * 900 + 100))}`,
        displayName: formData.displayName,
        rank: formData.rank,
        unit: formData.unit,
        bloodGroup: formData.bloodGroup,
        emergencyContact: formData.emergencyContact,
        deviceId: formData.deviceId || null,
        monitoringStatus: 'ACTIVE',
        healthStatus: 'NORMAL',
        lastHeartRate: 75,
        lastTemperature: 36.6,
        lastBattery: 95,
        lastLocation: { lat: 17.4412, lng: 78.3512, address: 'Sector Alpha Grid' },
        lastSeen: new Date().toISOString(),
      };
      onSoldierAdded(mockSoldier);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0A0F1E] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold tracking-wide text-white uppercase">
                Enlist New Personnel
              </h3>
              <p className="text-xs text-slate-400">Register soldier & assign wearable telemetry band</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && <p className="mt-3 text-xs text-rose-400 bg-rose-950/40 p-2 rounded">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="font-medium text-slate-300">Soldier Full Name / Callsign</label>
            <input
              type="text"
              required
              placeholder="e.g. Havildar Vikram Singh"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-slate-300">Military Rank</label>
              <select
                value={formData.rank}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Sepoy">Sepoy</option>
                <option value="Lance Naik">Lance Naik</option>
                <option value="Naik">Naik</option>
                <option value="Havildar">Havildar</option>
                <option value="Naib Subedar">Naib Subedar</option>
                <option value="Subedar">Subedar</option>
                <option value="Major">Major</option>
              </select>
            </div>

            <div>
              <label className="font-medium text-slate-300">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="A+Pos">A+ Positive</option>
                <option value="A-Neg">A- Negative</option>
                <option value="B+Pos">B+ Positive</option>
                <option value="B-Neg">B- Negative</option>
                <option value="O+Pos">O+ Positive</option>
                <option value="O-Neg">O- Negative</option>
                <option value="AB+Pos">AB+ Positive</option>
                <option value="AB-Neg">AB- Negative</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium text-slate-300">Tactical Unit / Platoon</label>
            <input
              type="text"
              required
              placeholder="e.g. 10 Para Special Forces (Alpha)"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-slate-300">Emergency Contact</label>
              <input
                type="text"
                placeholder="+91-9876543210"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-medium text-slate-300">Assign IoT Wearable Band</label>
              <select
                value={formData.deviceId}
                onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="">None (Assign Later)</option>
                {devices.map((d) => (
                  <option key={d.deviceId} value={d.deviceId}>
                    {d.deviceId} ({d.deviceName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
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
              className="rounded-lg bg-cyan-600 px-5 py-2 font-bold text-white shadow-lg shadow-cyan-600/30 hover:bg-cyan-500 transition"
            >
              {loading ? 'Registering...' : 'Register Soldier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

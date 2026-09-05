import React, { useState } from 'react';
import { createDevice } from '../services/api';
import { HardDrive, X } from 'lucide-react';

export const AddDeviceModal = ({ isOpen, onClose, onDeviceAdded }) => {
  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [loraFrequency, setLoraFrequency] = useState('868.1 MHz');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await createDevice({
        deviceId,
        deviceName,
        loraFrequency,
        firmwareVersion: 'v2.4.1-esp32',
      });
      if (res.data.success) {
        onDeviceAdded(res.data.device);
        onClose();
      }
    } catch (err) {
      // Local fallback create
      const mockDev = {
        deviceId: deviceId.toUpperCase(),
        deviceName: deviceName || `Bio-Tactical Band ${deviceId}`,
        assignedSoldierId: null,
        status: 'ONLINE',
        battery: 100,
        signalStrength: 95,
        firmwareVersion: 'v2.4.1-esp32',
        loraFrequency,
        lastSeen: new Date().toISOString(),
      };
      onDeviceAdded(mockDev);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-[#0A0F1E] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
              <HardDrive className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold tracking-wide text-white uppercase">
                Pair IoT Hardware Band
              </h3>
              <p className="text-xs text-slate-400">Register ESP32 / LoRa transceiver unit</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && <p className="mt-3 text-xs text-rose-400 bg-rose-950/40 p-2 rounded">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="font-medium text-slate-300">Device Hardware ID</label>
            <input
              type="text"
              required
              placeholder="e.g. DEV-006"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-slate-300">Transceiver Label / Callout</label>
            <input
              type="text"
              placeholder="e.g. Bio-Tactical Band Delta-1"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-slate-300">LoRa RF Channel / Frequency</label>
            <select
              value={loraFrequency}
              onChange={(e) => setLoraFrequency(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white font-mono focus:border-cyan-500 focus:outline-none"
            >
              <option value="868.1 MHz">868.1 MHz (Standard EU/India ISM)</option>
              <option value="868.3 MHz">868.3 MHz (Channel 2)</option>
              <option value="868.5 MHz">868.5 MHz (Channel 3)</option>
              <option value="915.0 MHz">915.0 MHz (US ISM Band)</option>
              <option value="433.0 MHz">433.0 MHz (Low-Freq Tactical)</option>
            </select>
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
              {loading ? 'Pairing...' : 'Register Device'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

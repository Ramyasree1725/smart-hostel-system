import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { AddDeviceModal } from '../components/AddDeviceModal';
import {
  HardDrive,
  Plus,
  Radio,
  Battery,
  Wifi,
  Search,
  CheckCircle,
  AlertTriangle,
  Cpu,
} from 'lucide-react';

export const DeviceManagement = () => {
  const { devices, soldiers, refreshData } = useSocket();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredDevices = devices.filter(
    (d) =>
      d.deviceId.toLowerCase().includes(search.toLowerCase()) ||
      d.deviceName.toLowerCase().includes(search.toLowerCase()) ||
      (d.assignedSoldierId && d.assignedSoldierId.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              IoT Wearable Device Fleet
            </h1>
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-800">
              {devices.length} Paired
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Monitor ESP32 transceiver nodes, LoRa RF transmission frequencies, and battery health
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 hover:from-cyan-500 hover:to-blue-500 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Pair New IoT Band</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          placeholder="Search by Device ID, Band Name, or Soldier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
        />
      </div>

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDevices.map((dev) => {
          const assignedSoldier = soldiers.find((s) => s.deviceId === dev.deviceId);
          const isOnline = dev.status === 'ONLINE';

          return (
            <div
              key={dev.deviceId}
              className={`rounded-2xl border p-5 backdrop-blur-md transition ${
                !isOnline
                  ? 'border-slate-800 bg-slate-950/50 opacity-70'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-cyan-400">
                    <HardDrive className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{dev.deviceId}</h4>
                    <p className="text-[11px] text-slate-400">{dev.deviceName}</p>
                  </div>
                </div>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold font-mono ${
                    isOnline
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {dev.status}
                </span>
              </div>

              {/* Specs & Metrics */}
              <div className="mt-4 space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Assigned Soldier:</span>
                  <span className="font-semibold text-white font-sans">
                    {assignedSoldier ? assignedSoldier.displayName : 'None (Available)'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Battery Level:</span>
                  <div className="flex items-center space-x-1 text-emerald-400 font-bold">
                    <Battery className="h-3.5 w-3.5" />
                    <span>{dev.battery}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">LoRa RF Band:</span>
                  <span className="text-cyan-400">{dev.loraFrequency || '868.1 MHz'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Firmware:</span>
                  <span className="text-slate-300">{dev.firmwareVersion || 'v2.4.1-esp32'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Last Sync:</span>
                  <span className="text-slate-400 text-[10px]">
                    {new Date(dev.lastSeen || Date.now()).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Device Modal */}
      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onDeviceAdded={() => refreshData()}
      />
    </div>
  );
};

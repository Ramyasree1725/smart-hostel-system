import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { DispatchActionModal } from '../components/DispatchActionModal';
import {
  Package,
  Droplet,
  Truck,
  Shield,
  Heart,
  Clock,
  CheckCircle,
  Plus,
  Send,
  Zap,
} from 'lucide-react';

export const Logistics = () => {
  const { soldiers } = useSocket();
  const [selectedSoldier, setSelectedSoldier] = useState(null);
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [dispatchTab, setDispatchTab] = useState('SUPPLIES');

  const openDispatch = (soldier, tab) => {
    setSelectedSoldier(soldier);
    setDispatchTab(tab);
    setDispatchModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono uppercase">
              Tactical Logistics & Supply Drops
            </h1>
            <span className="rounded bg-cyan-950 px-2 py-0.5 text-xs font-semibold text-cyan-400 border border-cyan-800">
              SUPPLY COMMAND
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Monitor real-time food, water, and ammunition inventory per soldier • Dispatch drone drops and medical teams
          </p>
        </div>

        <button
          onClick={() => openDispatch(soldiers[0], 'SUPPLIES')}
          className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-600/30 hover:from-cyan-500 transition"
        >
          <Plus className="h-4 w-4" />
          <span>New Supply Drop Order</span>
        </button>
      </div>

      {/* Soldier Supply Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {soldiers.map((soldier) => {
          const isLowWater = (soldier.waterLevelPercent || 70) <= 25;
          const isLowFood = (soldier.foodRationPercent || 80) <= 30;
          const isLowAmmo = (soldier.ammoCountRounds || 150) <= 50;

          return (
            <div
              key={soldier.soldierId}
              className={`rounded-2xl border p-5 backdrop-blur-md transition ${
                isLowWater || isLowFood || isLowAmmo
                  ? 'border-amber-600/70 bg-amber-950/20 glow-amber'
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
            >
              {/* Soldier Header */}
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-bold text-white text-sm">{soldier.displayName}</h4>
                  <p className="text-[10px] text-cyan-400 font-mono">{soldier.soldierId} • {soldier.unit}</p>
                </div>
                <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                  {soldier.deviceId || 'DEV-001'}
                </span>
              </div>

              {/* Rations & Inventory Status */}
              <div className="mt-4 space-y-3 text-xs font-mono">
                {/* Drinking Water */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cyan-400 flex items-center space-x-1">
                      <Droplet className="h-3.5 w-3.5" />
                      <span>Drinking Water Level:</span>
                    </span>
                    <span className={`font-bold ${isLowWater ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
                      {soldier.waterLevelPercent || 70}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isLowWater ? 'bg-rose-500' : 'bg-cyan-500'}`}
                      style={{ width: `${soldier.waterLevelPercent || 70}%` }}
                    ></div>
                  </div>
                </div>

                {/* Food Rations */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <Package className="h-3.5 w-3.5" />
                      <span>MRE Food Rations:</span>
                    </span>
                    <span className={`font-bold ${isLowFood ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
                      {soldier.foodRationPercent || 80}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isLowFood ? 'bg-rose-500' : 'bg-emerald-500'}`}
                      style={{ width: `${soldier.foodRationPercent || 80}%` }}
                    ></div>
                  </div>
                </div>

                {/* Ammunition Count */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-amber-400 flex items-center space-x-1">
                      <span>🔫 5.56mm Ammo Rounds:</span>
                    </span>
                    <span className={`font-bold ${isLowAmmo ? 'text-rose-400' : 'text-slate-200'}`}>
                      {soldier.ammoCountRounds || 180} Rds
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isLowAmmo ? 'bg-rose-500' : 'bg-amber-500'}`}
                      style={{ width: `${Math.min(100, ((soldier.ammoCountRounds || 180) / 250) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-1.5 text-[11px] font-mono">
                <button
                  onClick={() => openDispatch(soldier, 'DOCTOR')}
                  className="rounded-lg border border-rose-500/30 bg-rose-950/40 py-1.5 font-semibold text-rose-300 hover:bg-rose-900/50 transition text-center"
                >
                  🚑 Doctor
                </button>
                <button
                  onClick={() => openDispatch(soldier, 'REINFORCEMENTS')}
                  className="rounded-lg border border-amber-500/30 bg-amber-950/40 py-1.5 font-semibold text-amber-300 hover:bg-amber-900/50 transition text-center"
                >
                  🛡️ Backup
                </button>
                <button
                  onClick={() => openDispatch(soldier, 'SUPPLIES')}
                  className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 py-1.5 font-semibold text-cyan-300 hover:bg-cyan-900/50 transition text-center"
                >
                  📦 Drop
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dispatch Action Modal */}
      <DispatchActionModal
        isOpen={dispatchModalOpen}
        onClose={() => setDispatchModalOpen(false)}
        targetSoldier={selectedSoldier}
        defaultTab={dispatchTab}
      />
    </div>
  );
};

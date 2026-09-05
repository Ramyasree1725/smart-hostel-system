import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import {
  Shield,
  Bell,
  LogOut,
  Cpu,
  Watch,
  User,
} from 'lucide-react';

export const Navbar = ({ onOpenSimulator, onOpenBand }) => {
  const { user, logout } = useAuth();
  const { connected, activeTabAlertCount, alerts } = useSocket();
  const [showNotifications, setShowNotifications] = useState(false);

  const activeAlerts = alerts.filter((a) => a.status === 'ACTIVE').slice(0, 5);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-[#0A0F1D]/90 px-4 backdrop-blur-md lg:px-8">
      {/* Left: Brand */}
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-base font-bold tracking-wider text-slate-100 uppercase">
              DEFENSE TACTICAL HUD
            </span>
            <span className="hidden rounded bg-cyan-950 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-400 border border-cyan-800 sm:inline-block">
              MIL-SPEC IoT
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">Smart Soldier Health & Safety System</p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Realtime Connection Status Pill */}
        <div className="flex items-center space-x-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] text-slate-300">LIVE TELEMETRY</span>
        </div>

        {/* Soldier Watch Band Trigger Button */}
        <button
          onClick={onOpenBand}
          title="Open Soldier's Smart Watch Band (Trigger SOS / Health Issue / Supplies)"
          className="flex items-center space-x-1.5 rounded-lg border border-rose-500/40 bg-rose-950/40 px-3 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-900/50 hover:border-rose-400 transition"
        >
          <span className="text-sm">⌚</span>
          <span className="hidden md:inline">Soldier Smart Band</span>
        </button>

        {/* Live IoT Simulator Trigger Button */}
        <button
          onClick={onOpenSimulator}
          title="Open Virtual IoT Hardware Simulator"
          className="flex items-center space-x-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-xs font-medium text-cyan-300 transition hover:bg-cyan-900/50 hover:border-cyan-400"
        >
          <Cpu className="h-4 w-4 text-cyan-400 animate-pulse" />
          <span className="hidden md:inline">IoT Simulator</span>
        </button>

        {/* Alerts Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition"
          >
            <Bell className="h-4 w-4" />
            {activeTabAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-sm shadow-rose-600/50 animate-pulse">
                {activeTabAlertCount}
              </span>
            )}
          </button>

          {/* Quick Notifications Popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-800 bg-slate-900/95 p-3 shadow-2xl backdrop-blur-md z-50">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                <span className="text-xs font-semibold text-slate-200">Active Priority Alerts</span>
                <span className="rounded bg-rose-950 px-1.5 py-0.5 text-[10px] text-rose-400 border border-rose-800">
                  {activeTabAlertCount} pending
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {activeAlerts.length === 0 ? (
                  <p className="py-4 text-center text-xs text-slate-400">No active priority alerts.</p>
                ) : (
                  activeAlerts.map((alt) => (
                    <div
                      key={alt.alertId || alt.id}
                      className="rounded-lg border border-slate-800 bg-slate-950/60 p-2 text-xs transition hover:border-slate-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-semibold text-rose-400">
                          {alt.soldierName}
                        </span>
                        <span className="text-[9px] text-slate-500">
                          {new Date(alt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-300">{alt.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Officer Profile & Logout */}
        <div className="flex items-center space-x-3 border-l border-slate-800 pl-3 sm:pl-4">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-semibold text-slate-200">{user?.name || 'Capt. Vikram Rathore'}</p>
            <p className="font-mono text-[10px] text-cyan-400">{user?.officerId || 'OFF-007'} • {user?.rank || 'Captain'}</p>
          </div>
          <button
            onClick={logout}
            title="Logout"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-950 bg-rose-950/30 text-rose-400 hover:bg-rose-900/40 transition"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

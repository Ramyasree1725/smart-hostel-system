import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import {
  LayoutDashboard,
  Users,
  Activity,
  MapPin,
  AlertTriangle,
  HardDrive,
  BarChart3,
  FileText,
  Settings,
  Package,
  Search,
  CheckSquare,
} from 'lucide-react';

export const Sidebar = ({ onOpenBand }) => {
  const { activeTabAlertCount, soldiers } = useSocket();
  const missingCount = soldiers.filter((s) => s.monitoringStatus === 'OFFLINE' || s.tacticalStatus === 'MISSING').length;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Soldier Attendance', path: '/attendance', icon: CheckSquare, badge: 'DAILY' },
    { name: 'Live Biometrics', path: '/monitoring', icon: Activity, badge: 'LIVE' },
    { name: 'Tactical Map', path: '/map', icon: MapPin },
    { name: 'Missing & Search', path: '/missing', icon: Search, count: missingCount },
    { name: 'Food, Water & Ammo', path: '/logistics', icon: Package },
    { name: 'Soldiers Roster', path: '/soldiers', icon: Users },
    { name: 'Active Distress Alerts', path: '/alerts', icon: AlertTriangle, count: activeTabAlertCount },
    { name: 'IoT Devices', path: '/devices', icon: HardDrive },
    { name: 'Mission Reports', path: '/reports', icon: FileText },
    { name: 'System Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-[#090E1A] flex flex-col justify-between hidden md:flex">
      <div className="p-4 space-y-5">
        {/* Base Unit Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">OPERATIONAL STATUS</span>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </div>
          <p className="mt-1 font-mono text-sm font-bold text-white">10 PARA SPECIAL FORCES</p>
          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span>Grid: 17.44°N, 78.34°E</span>
            <span className="text-cyan-400 font-mono">LoRa: 868.1 MHz</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    isActive
                      ? 'border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 shadow-sm shadow-cyan-900/20'
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }`
                }
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span className="rounded bg-emerald-500/20 px-1.5 py-0.2 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}

                {item.count > 0 && (
                  <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm shadow-rose-600/40">
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / Smart Watch Trigger */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <button
          onClick={onOpenBand}
          className="w-full flex items-center justify-center space-x-1.5 rounded-xl border border-rose-500/40 bg-rose-950/60 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-900/60 transition shadow-lg shadow-rose-950"
        >
          <span>⌚ Wearable Watch Band</span>
        </button>

        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Firmware: v2.4.1</span>
          <span className="text-emerald-400">Gateway: Active</span>
        </div>
      </div>
    </aside>
  );
};

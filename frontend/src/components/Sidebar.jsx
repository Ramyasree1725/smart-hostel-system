import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  BedDouble,
  CreditCard,
  AlertCircle,
  FileCheck2,
  Users,
  CalendarCheck,
  Megaphone,
  UserCheck,
  Sparkles,
  PieChart,
  ShieldCheck,
  QrCode,
  Utensils,
  History,
} from 'lucide-react';

export default function Sidebar() {
  const { isWarden, isSecurity, isStudent } = useAuth();

  const studentLinks = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/rooms', icon: BedDouble, label: 'Rooms & Allocation' },
    { to: '/student/fees', icon: CreditCard, label: 'Hostel Fees & Pay' },
    { to: '/student/complaints', icon: AlertCircle, label: 'Complaints (Smart)' },
    { to: '/student/leave', icon: FileCheck2, label: 'Outing / Gate Pass' },
    { to: '/student/profile', icon: UserCheck, label: 'My Profile' },
  ];

  const wardenLinks = [
    { to: '/admin/dashboard', icon: PieChart, label: 'Hostel Analytics' },
    { to: '/admin/leaves', icon: FileCheck2, label: 'Gate Pass Approvals' },
    { to: '/admin/mess', icon: Utensils, label: 'Food & Mess Quality' },
    { to: '/admin/complaints', icon: AlertCircle, label: 'Complaints Solver' },
    { to: '/admin/attendance', icon: CalendarCheck, label: 'Evening Roll Call' },
    { to: '/admin/rooms', icon: BedDouble, label: 'Smart Room Match' },
    { to: '/admin/students', icon: Users, label: 'Student Directory' },
    { to: '/admin/fees', icon: CreditCard, label: 'Fee Management' },
    { to: '/admin/notices', icon: Megaphone, label: 'Notice Board' },
  ];

  const securityLinks = [
    { to: '/security/dashboard', icon: ShieldCheck, label: 'Gate Pass Verifier' },
    { to: '/security/register', icon: History, label: 'In/Out Movement Log' },
  ];

  const links = isSecurity ? securityLinks : isWarden ? wardenLinks : studentLinks;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 shrink-0 border-r border-slate-800 shadow-xl">
      <div>
        <div className="px-3 py-2 mb-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {isSecurity
              ? 'Security Gate Guard Console'
              : isWarden
              ? 'Warden Madam Management'
              : 'Student Living Portal'}
          </div>
        </div>

        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/70 to-slate-800/80 border border-indigo-900/60 text-xs">
        <div className="flex items-center gap-2 text-indigo-300 font-semibold mb-1">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Automated Safety System</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          Warden gate pass approval triggers instant student QR pass & security guard checkpoint sync.
        </p>
      </div>
    </aside>
  );
}

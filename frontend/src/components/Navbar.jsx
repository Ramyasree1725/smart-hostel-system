import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  Building2,
  LogOut,
  Bell,
  User,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Shield,
  Utensils,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, switchDemoUser, isStudent, isWarden, isSecurity } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadNotifs() {
      if (user && isStudent) {
        try {
          const data = await api.getNotifications(user._id);
          setNotifications(data || []);
        } catch (e) {
          console.error(e);
        }
      }
    }
    loadNotifs();
  }, [user, isStudent]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRoleSwitch = async (roleName) => {
    await switchDemoUser(roleName);
    if (roleName === 'security') {
      navigate('/security/dashboard');
    } else if (roleName === 'warden' || roleName === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const unreadCount = notifications.filter((n) => n.status === 'unread').length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/80 shadow-sm backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                  SmartHostel
                </span>
                <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 rounded-md border border-indigo-200/60">
                  v2.0
                </span>
              </div>
            </Link>
          </div>

          {/* Center/Right Items */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* 3-Way Role Switcher for instant testing */}
                <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
                  <button
                    onClick={() => handleRoleSwitch('student')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all ${
                      isStudent ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    Student View
                  </button>

                  <button
                    onClick={() => handleRoleSwitch('warden')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all ${
                      isWarden && !isSecurity ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Warden View
                  </button>

                  <button
                    onClick={() => handleRoleSwitch('security')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all ${
                      isSecurity ? 'bg-slate-900 text-amber-400 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    Security Guard View
                  </button>
                </div>

                {/* In-App Notification Bell for Student */}
                {isStudent && (
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifModal(!showNotifModal)}
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl relative transition-all"
                      title="Notifications"
                    >
                      <Bell className="w-5 h-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {showNotifModal && (
                      <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 p-4 z-50 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <h3 className="text-xs font-black text-slate-900 uppercase">Student Notifications</h3>
                          <span className="text-[10px] text-indigo-600 font-bold">{notifications.length} Alerts</span>
                        </div>

                        <div className="max-h-64 overflow-y-auto space-y-2">
                          {notifications.length === 0 ? (
                            <p className="text-xs text-slate-400 py-3 text-center">No notifications yet.</p>
                          ) : (
                            notifications.map((n) => (
                              <div key={n._id} className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs space-y-1">
                                <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                                  <span>{n.title}</span>
                                </div>
                                <p className="text-[11px] text-slate-600">{n.message}</p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* User avatar and details */}
                <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-800 leading-tight">{user.name}</div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {isSecurity ? 'Main Gate Security' : isWarden ? 'Hostel Warden' : `Room ${user.roomNumber || 'N/A'}`}
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                    {user.name?.charAt(0) || 'U'}
                  </div>

                  <button
                    onClick={handleLogout}
                    title="Sign Out"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-xl">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

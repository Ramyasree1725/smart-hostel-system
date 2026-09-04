import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import StatCard from '../../components/StatCard';
import {
  BedDouble,
  CreditCard,
  AlertCircle,
  FileCheck2,
  Megaphone,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [fee, setFee] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      try {
        const [feeData, cmpData, lvData, ntcData] = await Promise.all([
          api.getMyFee(user._id),
          api.getComplaints(user._id),
          api.getLeaves(user._id),
          api.getNotices(),
        ]);
        setFee(feeData);
        setComplaints(cmpData);
        setLeaves(lvData);
        setNotices(ntcData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  const hasRoom = user?.roomNumber && user?.roomNumber !== 'Unassigned';

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-700/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Welcome back, {user?.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            {hasRoom ? `Room ${user.roomNumber} (${user.bedNumber})` : 'Room Allocation Pending'}
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
            {hasRoom
              ? `Department: ${user.department} • Academic Year: ${user.year}`
              : 'You have not been assigned a room yet. Use our Smart Allocation engine to get allocated instant!'}
          </p>
        </div>

        {!hasRoom && (
          <Link
            to="/student/rooms"
            className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all hover:scale-105 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Apply for Room Allocation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Allocated Room"
          value={hasRoom ? user.roomNumber : 'None'}
          subtitle={hasRoom ? user.bedNumber : 'Application required'}
          icon={BedDouble}
          color="indigo"
        />

        <StatCard
          title="Fee Pending"
          value={fee ? `₹${Number(fee.dueAmount).toLocaleString('en-IN')}` : '₹0'}
          subtitle={fee?.status === 'Paid' ? 'All dues settled 🎉' : `Due by ${new Date(fee?.dueDate || Date.now()).toLocaleDateString()}`}
          icon={CreditCard}
          color={fee?.dueAmount > 0 ? 'amber' : 'emerald'}
        />

        <StatCard
          title="My Complaints"
          value={complaints.length}
          subtitle={`${complaints.filter((c) => c.status !== 'Resolved').length} Active issues`}
          icon={AlertCircle}
          color="rose"
        />

        <StatCard
          title="Leave Requests"
          value={leaves.length}
          subtitle={`${leaves.filter((l) => l.status === 'Approved').length} Approved Passes`}
          icon={FileCheck2}
          color="purple"
        />
      </div>

      {/* Main Grid: Active Items & Notice Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Complaints & Leaves */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Complaints Box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">Recent Complaints & Issues</h2>
              </div>
              <Link to="/student/complaints" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {complaints.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No active complaints lodged.</p>
            ) : (
              <div className="space-y-3">
                {complaints.slice(0, 3).map((c) => (
                  <div key={c._id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{c.title}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            c.priority === 'Emergency'
                              ? 'bg-rose-100 text-rose-700 animate-pulse'
                              : c.priority === 'High'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {c.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{c.description}</p>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-xl shrink-0 ${
                        c.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.status === 'In Progress'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Leave Passes Box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600" />
                <h2 className="text-base font-bold text-slate-900">Recent Outing / Leave Passes</h2>
              </div>
              <Link to="/student/leave" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                Apply Pass <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {leaves.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">No leave requests found.</p>
            ) : (
              <div className="space-y-3">
                {leaves.slice(0, 2).map((lv) => (
                  <div key={lv._id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{lv.leaveType} ({lv.passCode})</p>
                      <p className="text-[11px] text-slate-500">
                        {new Date(lv.fromDate).toLocaleDateString()} to {new Date(lv.toDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-xl ${
                        lv.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : lv.status === 'Rejected'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {lv.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Notice Board */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Hostel Notice Board</h2>
          </div>

          <div className="space-y-3">
            {notices.map((n) => (
              <div
                key={n._id}
                className={`p-4 rounded-2xl border transition-all ${
                  n.isUrgent
                    ? 'bg-rose-50/70 border-rose-200'
                    : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                    {n.category}
                  </span>
                  {n.isUrgent && (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-1">{n.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{n.content}</p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">By: {n.postedBy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

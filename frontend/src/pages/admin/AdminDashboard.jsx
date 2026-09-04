import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import StatCard from '../../components/StatCard';
import {
  Users,
  BedDouble,
  CreditCard,
  AlertCircle,
  FileCheck2,
  TrendingUp,
  PieChart as PieIcon,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getAnalytics();
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const summary = data?.summary || {};
  const charts = data?.charts || {};

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  const PRIORITY_COLORS = {
    Emergency: '#ef4444',
    High: '#f97316',
    Medium: '#0ea5e9',
    Low: '#64748b',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hostel Operations & Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time occupancy metrics, fee revenue tracking, maintenance workload and safety alerts.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Live Hostel System Active</span>
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Occupancy Rate"
          value={`${summary.occupancyRate || 0}%`}
          subtitle={`${summary.totalOccupied || 0} / ${summary.totalCapacity || 0} Beds Occupied`}
          icon={BedDouble}
          color="indigo"
          trend={`${summary.vacantBeds || 0} Vacant Beds`}
        />

        <StatCard
          title="Total Residents"
          value={summary.totalStudents || 0}
          subtitle={`${summary.pendingAllocation || 0} Awaiting Room`}
          icon={Users}
          color="emerald"
        />

        <StatCard
          title="Fee Collection"
          value={`₹${Number(summary.totalFeeCollected || 0).toLocaleString('en-IN')}`}
          subtitle={`₹${Number(summary.totalFeePending || 0).toLocaleString('en-IN')} Balance Due`}
          icon={CreditCard}
          color="amber"
        />

        <StatCard
          title="Open Complaints"
          value={summary.pendingComplaints || 0}
          subtitle={`${summary.emergencyComplaints || 0} Emergency Urgent`}
          icon={AlertCircle}
          color="rose"
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue & Fee Collections */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Monthly Fee Collection Trend (₹)</h2>
            <span className="text-xs text-slate-400 font-medium">Semester Target vs Actual</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={charts.monthlyRevenue || []}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']} />
                <Area type="monotone" dataKey="collected" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaints Breakdown by Category */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Complaints by Category</h2>
            <span className="text-xs text-slate-400 font-medium">Maintenance distribution</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.complaintsByCategory || []}>
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} interval={0} angle={-15} textAnchor="end" />
                <YAxis stroke="#94a3b8" fontSize={12} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Block-wise Capacity & Occupancy */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
          <h2 className="text-base font-bold text-slate-900">Hostel Wing & Block Capacities</h2>
          <div className="space-y-4">
            {(charts.blockOccupancy || []).map((b, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{b.block}</span>
                  <span>{b.occupied} / {b.capacity} beds ({b.rate}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${b.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complaints Priority Breakdown Pie */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
          <h2 className="text-base font-bold text-slate-900">Issue Priority Matrix</h2>
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.complaintsByPriority || []}
                  dataKey="count"
                  nameKey="priority"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ priority, count }) => `${priority}: ${count}`}
                  fontSize={11}
                >
                  {(charts.complaintsByPriority || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PRIORITY_COLORS[entry.priority] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

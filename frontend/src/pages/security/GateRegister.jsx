import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Shield, Clock, Search, Filter, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default function GateRegister() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const loadLogs = async () => {
    try {
      const data = await api.getGateLogs();
      setLogs(data.logs || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filtered = logs.filter((l) => {
    if (statusFilter && l.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.studentName?.toLowerCase().includes(q) ||
        l.rollNo?.toLowerCase().includes(q) ||
        l.passCode?.toLowerCase().includes(q) ||
        l.roomNumber?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Main Gate Movement Attendance Log</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Complete historical register of student departure and arrival timestamps.
        </p>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-card flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search by student name, roll no, pass code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Movement Statuses</option>
          <option value="Currently Outside">Currently Outside</option>
          <option value="Returned / Inside">Returned / Inside</option>
        </select>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-900">Total Movement Records ({filtered.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Student Details</th>
                <th className="px-6 py-3.5">Pass Code</th>
                <th className="px-6 py-3.5">Destination & Contact</th>
                <th className="px-6 py-3.5">Departure (Out)</th>
                <th className="px-6 py-3.5">Arrival (In)</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((l) => (
                <tr key={l._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{l.studentName}</p>
                    <p className="text-[10px] text-slate-500">{l.rollNo} • Room {l.roomNumber}</p>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-indigo-600">{l.passCode}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-800">{l.destination}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{l.parentPhone || l.phone}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-amber-700">
                    {new Date(l.outTime).toLocaleDateString()} {new Date(l.outTime).toLocaleTimeString('en-IN')}
                  </td>
                  <td className="px-6 py-4 font-semibold text-emerald-700">
                    {l.inTime ? `${new Date(l.inTime).toLocaleDateString()} ${new Date(l.inTime).toLocaleTimeString('en-IN')}` : <span className="text-slate-400 italic">Outside</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase ${
                        l.status === 'Returned / Inside' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  AlertCircle,
  Wrench,
  CheckCircle2,
  Clock,
  Filter,
  User,
  Sparkles,
} from 'lucide-react';

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [technician, setTechnician] = useState('');
  const [notes, setNotes] = useState('');
  const [newStatus, setNewStatus] = useState('In Progress');

  const loadComplaints = async () => {
    try {
      const data = await api.getComplaints();
      setComplaints(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    try {
      await api.updateComplaint(selectedComplaint._id, {
        status: newStatus,
        assignedTo: technician,
        adminNotes: notes,
      });
      setSelectedComplaint(null);
      await loadComplaints();
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = complaints.filter((c) => {
    if (priorityFilter && c.priority !== priorityFilter) return false;
    if (statusFilter && c.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Maintenance Tickets & Priority Queue</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Smart priority classification sorts emergency electrical/plumbing issues to top of queue.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-card flex flex-wrap gap-3">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Priorities</option>
          <option value="Emergency">🚨 Emergency Only</option>
          <option value="High">⚠️ High Priority</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending Assignment</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Complaints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => (
          <div
            key={c._id}
            className={`bg-white rounded-3xl p-6 border shadow-card transition-all flex flex-col justify-between space-y-4 ${
              c.priority === 'Emergency' && c.status !== 'Resolved'
                ? 'border-rose-300 ring-2 ring-rose-500/10'
                : 'border-slate-200/80'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    c.priority === 'Emergency'
                      ? 'bg-rose-100 text-rose-700 animate-pulse'
                      : c.priority === 'High'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {c.priority}
                </span>

                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-xl ${
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

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-tight">{c.title}</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                  Room {c.roomNumber || c.student?.roomNumber} • {c.student?.name || 'Student'}
                </p>
              </div>

              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100 line-clamp-3">
                {c.description}
              </p>

              {c.assignedTo && c.assignedTo !== 'Unassigned' && (
                <div className="text-xs text-slate-500 font-medium">
                  Assigned Staff: <strong className="text-slate-800">{c.assignedTo}</strong>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setSelectedComplaint(c);
                setTechnician(c.assignedTo || '');
                setNotes(c.adminNotes || '');
                setNewStatus(c.status);
              }}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Update Ticket & Assign</span>
            </button>
          </div>
        ))}
      </div>

      {/* Ticket Edit Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Resolve Complaint Ticket</h3>
              <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress / Dispatched</option>
                  <option value="Resolved">Resolved / Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Assign Technician / Staff</label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh (Hostel Electrician)"
                  value={technician}
                  onChange={(e) => setTechnician(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Resolution / Inspection Note</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Repaired loose wiring and replaced MCB switch box."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
              >
                Save Ticket Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

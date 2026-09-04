import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  AlertCircle,
  Plus,
  Clock,
  CheckCircle2,
  Sparkles,
  Wrench,
  Zap,
  Filter,
  Utensils,
  Wifi,
  Droplets,
  Layers,
} from 'lucide-react';

export default function StudentComplaints() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electrical',
    roomNumber: user?.roomNumber || 'A-101',
  });

  const loadComplaints = async () => {
    if (!user) return;
    try {
      const data = await api.getComplaints(user._id);
      setComplaints(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [user]);

  const detectLivePriority = () => {
    const text = `${formData.title} ${formData.description}`.toLowerCase();
    if (/spark|fire|smoke|shock|short circuit|flood|burst|gas|theft/.test(text)) return 'Emergency';
    if (/no water|drainage|power cut|broken lock|spoiled|smell|ac not working/.test(text)) return 'High';
    if (/slow|wifi|fused|leaking|fan noise/.test(text)) return 'Medium';
    return 'Low';
  };

  const livePriority = detectLivePriority();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createComplaint(
        {
          ...formData,
          priority: livePriority,
          roomNumber: user?.roomNumber || formData.roomNumber,
        },
        user
      );
      setFormData({ title: '', description: '', category: 'Electrical', roomNumber: user?.roomNumber || 'A-101' });
      setModalOpen(false);
      await loadComplaints();
    } catch (err) {
      alert(err.message || 'Error submitting complaint');
    }
  };

  const filtered = categoryFilter === 'All' ? complaints : complaints.filter((c) => c.category === categoryFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hostel Complaints & Maintenance</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Submit room, mess, electrical, or plumbing issues with real-time NLP urgency detection.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Lodge New Complaint</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Electrical', 'Plumbing', 'Wi-Fi / Internet', 'Food & Mess', 'Carpentry & Furniture', 'Cleanliness & Housekeeping'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              categoryFilter === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Complaints List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((c) => {
          const isResolved = c.status === 'Resolved';
          return (
            <div
              key={c._id}
              className={`bg-white rounded-3xl p-6 border transition-all space-y-4 shadow-card hover:shadow-lg ${
                c.priority === 'Emergency' && !isResolved
                  ? 'border-rose-300 ring-2 ring-rose-500/10'
                  : 'border-slate-200/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-500 uppercase">{c.category}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                        c.priority === 'Emergency'
                          ? 'bg-rose-100 text-rose-700 animate-pulse'
                          : c.priority === 'High'
                          ? 'bg-amber-100 text-amber-700'
                          : c.priority === 'Medium'
                          ? 'bg-sky-100 text-sky-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {c.priority} Priority
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{c.title}</h3>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-xl shrink-0 ${
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

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                {c.description}
              </p>

              {/* Resolution / Technician Info */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <span>Room: <strong className="text-slate-800">{c.roomNumber || 'A-101'}</strong> • Staff: <strong className="text-slate-800">{c.assignedTo || 'Unassigned'}</strong></span>
                <span>{new Date(c.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>

              {c.adminNotes && (
                <div className="text-xs bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-100">
                  <p className="font-bold">Warden / Technician Action:</p>
                  <p className="mt-0.5">{c.adminNotes}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Complaint Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Lodge Maintenance Ticket</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="Electrical">Electrical (Power, light, fan, switchboard)</option>
                  <option value="Plumbing">Plumbing (Tap leakage, drainage, washroom)</option>
                  <option value="Wi-Fi / Internet">Wi-Fi & Internet</option>
                  <option value="Food & Mess">Food & Mess / Water Cooler</option>
                  <option value="Carpentry & Furniture">Carpentry & Furniture</option>
                  <option value="Cleanliness & Housekeeping">Cleanliness & Housekeeping</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Complaint Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Washroom tap leaking continuously"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe location and issue in detail..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex justify-between items-center text-xs">
                <span className="font-bold text-indigo-900">Auto-Detected Priority:</span>
                <span className="font-black px-2.5 py-0.5 bg-rose-600 text-white rounded-lg uppercase">{livePriority}</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

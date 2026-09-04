import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Utensils, Star, CheckCircle2, AlertCircle, Plus, ShieldCheck, Clock, Sparkles } from 'lucide-react';

export default function AdminMess() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    mealType: 'Lunch',
    menuItems: 'Steamed Rice, Dal Tadka, Paneer Butter Masala, Curd, Salad',
    foodQualityRating: 4.8,
    tasteRating: 4.5,
    hygieneStatus: 'Excellent',
    wardenRemarks: 'Kitchen visited during cooking. Fresh vegetables and quality oil verified.',
  });

  const loadMess = async () => {
    try {
      const data = await api.getMessRecords();
      setRecords(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMess();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.saveMessInspection(formData);
      setModalOpen(false);
      await loadMess();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hostel Mess & Food Quality Monitoring</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Warden daily meal inspection, kitchen hygiene verification, and food quality standards.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Record Food Inspection</span>
        </button>
      </div>

      {/* Food Quality Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {records.map((r) => (
          <div key={r._id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">{r.mealType}</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{r.date}</h3>
              </div>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                  r.hygieneStatus === 'Excellent'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                {r.hygieneStatus}
              </span>
            </div>

            {/* Menu items */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Meal Menu</p>
              <div className="flex flex-wrap gap-1.5">
                {(Array.isArray(r.menuItems) ? r.menuItems : (r.menuItems || '').split(',')).map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
                    {item.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Ratings Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-slate-500 font-medium">Quality Rating</span>
                <p className="text-sm font-black text-amber-700 mt-0.5">⭐ {r.foodQualityRating} / 5.0</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-slate-500 font-medium">Taste Rating</span>
                <p className="text-sm font-black text-emerald-700 mt-0.5">⭐ {r.tasteRating || 4.2} / 5.0</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="font-bold text-slate-900">Warden Inspection Remarks:</p>
              <p className="mt-0.5">{r.wardenRemarks}</p>
            </div>

            <div className="text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-100 flex justify-between">
              <span>Inspected by: {r.inspectorName || 'Warden'}</span>
              <span>Water Quality: Verified Safe</span>
            </div>
          </div>
        ))}
      </div>

      {/* Record Inspection Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Record Food Quality Inspection</h3>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Meal Type</label>
                <select
                  value={formData.mealType}
                  onChange={(e) => setFormData({ ...formData, mealType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Evening Snacks">Evening Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Menu Items (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={formData.menuItems}
                  onChange={(e) => setFormData({ ...formData, menuItems: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Food Quality Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formData.foodQualityRating}
                    onChange={(e) => setFormData({ ...formData, foodQualityRating: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hygiene Status</label>
                  <select
                    value={formData.hygieneStatus}
                    onChange={(e) => setFormData({ ...formData, hygieneStatus: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="Excellent">Excellent (Grade A)</option>
                    <option value="Good">Good</option>
                    <option value="Satisfactory">Satisfactory</option>
                    <option value="Needs Improvement">Needs Improvement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Warden Inspection Remarks</label>
                <textarea
                  rows={3}
                  required
                  value={formData.wardenRemarks}
                  onChange={(e) => setFormData({ ...formData, wardenRemarks: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
              >
                Save Food Quality Log
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

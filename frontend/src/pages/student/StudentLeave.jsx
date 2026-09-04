import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import GatePassModal from '../../components/GatePassModal';
import {
  FileCheck2,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Printer,
  QrCode,
} from 'lucide-react';

export default function StudentLeave() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGatePass, setSelectedGatePass] = useState(null);

  const [formData, setFormData] = useState({
    leaveType: 'Home Visit',
    fromDate: '',
    toDate: '',
    reason: '',
    destinationAddress: user?.address || '',
    emergencyContact: user?.parentPhone ? `${user.parentPhone} (Parent)` : '',
  });

  const loadLeaves = async () => {
    if (!user) return;
    try {
      const data = await api.getLeaves(user._id);
      setLeaves(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.applyLeave(formData, user);
      setFormData({
        leaveType: 'Home Visit',
        fromDate: '',
        toDate: '',
        reason: '',
        destinationAddress: user?.address || '',
        emergencyContact: user?.parentPhone ? `${user.parentPhone} (Parent)` : '',
      });
      setModalOpen(false);
      await loadLeaves();
    } catch (err) {
      alert(err.message || 'Error submitting leave application');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hostel Leave & Gate Passes</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Apply for home visits, night outs, and emergency leave with automatic QR gate pass generation upon approval.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Outing / Leave</span>
        </button>
      </div>

      {/* Leave Requests Grid */}
      <div className="space-y-4">
        {leaves.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3">
            <FileCheck2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No leave requests found</h3>
            <p className="text-xs text-slate-500">Click the button above to request a gate pass.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {leaves.map((lv) => (
              <div key={lv._id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{lv.leaveType}</span>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">{lv.passCode}</h3>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-xl ${
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

                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>
                      {new Date(lv.fromDate).toLocaleDateString()} &nbsp;➜&nbsp; {new Date(lv.toDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{lv.destinationAddress}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{lv.emergencyContact}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700">
                  <strong className="text-slate-900">Reason:</strong> {lv.reason}
                </p>

                {lv.wardenRemarks && (
                  <div className="text-xs bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-100">
                    <span className="font-bold">Warden Note: </span>
                    {lv.wardenRemarks}
                  </div>
                )}

                {lv.status === 'Approved' && (
                  <button
                    onClick={() => setSelectedGatePass(lv)}
                    className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <QrCode className="w-4 h-4 text-indigo-600" />
                    <span>View & Print Approved Gate Pass</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Leave Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Apply for Outing / Leave Pass</h3>
                  <p className="text-xs text-slate-500">Requires Warden verification</p>
                </div>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Leave Type</label>
                <select
                  value={formData.leaveType}
                  onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Home Visit">Home Visit</option>
                  <option value="Medical Emergency">Medical Emergency</option>
                  <option value="Outing / Day Pass">Outing / Day Pass</option>
                  <option value="Academic Conference">Academic Conference / Project</option>
                  <option value="Other">Other Reason</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">From Date</label>
                  <input
                    type="date"
                    required
                    value={formData.fromDate}
                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">To Date</label>
                  <input
                    type="date"
                    required
                    value={formData.toDate}
                    onChange={(e) => setFormData({ ...formData, toDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Destination Address</label>
                <input
                  type="text"
                  required
                  placeholder="Hometown address / Outing spot"
                  value={formData.destinationAddress}
                  onChange={(e) => setFormData({ ...formData, destinationAddress: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Emergency / Parent Contact</label>
                <input
                  type="text"
                  required
                  placeholder="+91 9123456780 (Father)"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason for Leave</label>
                <textarea
                  rows={2}
                  required
                  placeholder="State detailed purpose..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.01]"
              >
                Submit Gate Pass Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Printable Gate Pass Modal */}
      <GatePassModal
        isOpen={!!selectedGatePass}
        onClose={() => setSelectedGatePass(null)}
        leave={selectedGatePass}
        student={user}
      />
    </div>
  );
}

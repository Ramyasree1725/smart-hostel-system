import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FileCheck2, Check, X, Calendar, MapPin, Phone, User, CheckCircle2 } from 'lucide-react';

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState({});

  const loadLeaves = async () => {
    try {
      const data = await api.getLeaves();
      setLeaves(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleAction = async (id, status) => {
    const remarkText = remarks[id] || (status === 'Approved' ? 'Parent confirmed. Approved.' : 'Rejected by Warden.');
    try {
      await api.updateLeaveStatus(id, status, remarkText);
      await loadLeaves();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Outing & Leave Pass Approvals</h1>
        <p className="text-xs sm:text-sm text-slate-500">Review student gate pass applications and authorize digital exit passes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {leaves.map((lv) => (
          <div key={lv._id} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{lv.leaveType}</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{lv.student?.name || lv.studentName}</h3>
                <p className="text-xs text-slate-500 font-medium">Roll: {lv.student?.rollNo || lv.rollNo} • Room {lv.student?.roomNumber || lv.roomNumber}</p>
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

            <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{new Date(lv.fromDate).toLocaleDateString()} to {new Date(lv.toDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{lv.destinationAddress}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Parent Contact: <strong className="text-emerald-700 font-bold">{lv.emergencyContact}</strong></span>
                </div>
                <a
                  href={`tel:${lv.emergencyContact?.replace(/[^0-9+]/g, '')}`}
                  className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                  title="Call Parent"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call</span>
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-700">
              <strong className="text-slate-900">Reason:</strong> {lv.reason}
            </p>

            {lv.status === 'Pending' ? (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  placeholder="Optional remarks (e.g. Parent confirmed over phone)"
                  value={remarks[lv._id] || ''}
                  onChange={(e) => setRemarks({ ...remarks, [lv._id]: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAction(lv._id, 'Approved')}
                    className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    Approve Pass
                  </button>
                  <button
                    onClick={() => handleAction(lv._id, 'Rejected')}
                    className="py-2.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ) : (
              lv.wardenRemarks && (
                <div className="text-xs bg-slate-50 text-slate-700 p-3 rounded-xl border border-slate-100">
                  <span className="font-bold">Warden Remarks: </span>{lv.wardenRemarks}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

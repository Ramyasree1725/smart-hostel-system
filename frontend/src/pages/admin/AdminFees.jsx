import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { CreditCard, Bell, CheckCircle2, AlertCircle, Send, Search } from 'lucide-react';

export default function AdminFees() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reminderMsg, setReminderMsg] = useState('');

  const loadFees = async () => {
    try {
      const data = await api.getAllFees();
      setFees(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  const handleSendReminder = async (feeId, studentName) => {
    try {
      await api.sendFeeReminder(feeId);
      setReminderMsg(`🔔 Reminder notification dispatched to ${studentName} successfully!`);
      setTimeout(() => setReminderMsg(''), 4000);
    } catch (err) {
      alert(err.message);
    }
  };

  const totalCollected = fees.reduce((acc, f) => acc + (f.paidAmount || 0), 0);
  const totalPending = fees.reduce((acc, f) => acc + (f.dueAmount || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hostel Fee Accounts & Reminders</h1>
        <p className="text-xs sm:text-sm text-slate-500">Track semester fee settlements and dispatch automated overdue alerts.</p>
      </div>

      {reminderMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{reminderMsg}</span>
        </div>
      )}

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Collected</p>
          <h2 className="text-3xl font-black text-emerald-600 mt-1">₹{totalCollected.toLocaleString('en-IN')}</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Outstanding Balance</p>
          <h2 className="text-3xl font-black text-amber-600 mt-1">₹{totalPending.toLocaleString('en-IN')}</h2>
        </div>
      </div>

      {/* Fees Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Student Fee Records ({fees.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Student</th>
                <th className="px-6 py-3.5">Semester</th>
                <th className="px-6 py-3.5">Billed</th>
                <th className="px-6 py-3.5">Paid</th>
                <th className="px-6 py-3.5">Due Balance</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {fees.map((f) => (
                <tr key={f._id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{f.student?.name || f.studentName || 'Student'}</p>
                    <p className="text-[10px] text-slate-500">Roll: {f.student?.rollNo || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{f.semester}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">₹{Number(f.totalAmount).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 font-bold text-emerald-600">₹{Number(f.paidAmount).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4 font-bold text-amber-600">₹{Number(f.dueAmount).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase ${
                        f.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {f.dueAmount > 0 && (
                      <button
                        onClick={() => handleSendReminder(f._id, f.student?.name || f.studentName)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl transition-all"
                      >
                        <Bell className="w-3.5 h-3.5 text-amber-600" />
                        Send Reminder
                      </button>
                    )}
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

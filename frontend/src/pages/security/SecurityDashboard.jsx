import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  ShieldCheck,
  QrCode,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  Phone,
  Building,
  UserCheck,
} from 'lucide-react';

export default function SecurityDashboard() {
  const [passInput, setPassInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [actionMsg, setActionMsg] = useState(null);
  const [gateLogs, setGateLogs] = useState([]);
  const [stats, setStats] = useState({ currentlyOutside: 0, todayTotalExits: 0 });
  const [notes, setNotes] = useState('');

  const loadLogs = async () => {
    try {
      const data = await api.getGateLogs();
      setGateLogs(data.logs || []);
      setStats(data.stats || { currentlyOutside: 0, todayTotalExits: 0 });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleVerify = async (e) => {
    e?.preventDefault();
    if (!passInput.trim()) return;
    setVerifying(true);
    setVerificationResult(null);
    setActionMsg(null);
    try {
      const res = await api.verifyGatePass(passInput, passInput);
      setVerificationResult(res);
    } catch (err) {
      setVerificationResult({ valid: false, message: 'Verification error' });
    } finally {
      setVerifying(false);
    }
  };

  const handleCheckOut = async () => {
    if (!verificationResult?.leave?.passCode) return;
    try {
      const res = await api.recordCheckOut(verificationResult.leave.passCode, notes);
      setActionMsg({ success: true, text: res.message });
      setVerificationResult(null);
      setPassInput('');
      setNotes('');
      await loadLogs();
    } catch (err) {
      setActionMsg({ success: false, text: err.message });
    }
  };

  const handleCheckIn = async (passCode) => {
    try {
      const res = await api.recordCheckIn(passCode, notes);
      setActionMsg({ success: true, text: res.message });
      setVerificationResult(null);
      setPassInput('');
      setNotes('');
      await loadLogs();
    } catch (err) {
      setActionMsg({ success: false, text: err.message });
    }
  };

  const currentlyOutsideLogs = gateLogs.filter((g) => g.status === 'Currently Outside');

  return (
    <div className="space-y-6">
      {/* Security Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Main Gate 1 • Active Security Guard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">Hostel Gate Pass & Entry/Exit Register</h1>
          <p className="text-xs text-indigo-200">Verify digital QR gate passes, record exit time, and log return time.</p>
        </div>

        <div className="flex gap-3">
          <div className="bg-white/10 p-3.5 rounded-2xl backdrop-blur-md text-center">
            <p className="text-[10px] font-bold uppercase text-indigo-200">Currently Outside</p>
            <p className="text-2xl font-black text-amber-400">{stats.currentlyOutside}</p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-2xl backdrop-blur-md text-center">
            <p className="text-[10px] font-bold uppercase text-indigo-200">Total Exits Today</p>
            <p className="text-2xl font-black text-emerald-400">{stats.todayTotalExits}</p>
          </div>
        </div>
      </div>

      {actionMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
            actionMsg.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          {actionMsg.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-rose-600" />}
          <span>{actionMsg.text}</span>
        </div>
      )}

      {/* Main Verification & Movement Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Pass Verifier & Check-in/out form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-5">
          <div className="flex items-center gap-2 text-indigo-600">
            <QrCode className="w-5 h-5" />
            <h2 className="text-base font-bold text-slate-900">Verify Student Gate Pass</h2>
          </div>

          <form onSubmit={handleVerify} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Enter Pass Code or Student Roll No
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. PASS-892104 or 21CS108"
                  value={passInput}
                  onChange={(e) => setPassInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={verifying}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{verifying ? 'Scanning Database...' : 'Validate Gate Pass'}</span>
            </button>
          </form>

          {/* Verification Result Card */}
          {verificationResult && (
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                verificationResult.valid ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                {verificationResult.valid ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
                <span className={`text-xs font-black ${verificationResult.valid ? 'text-emerald-900' : 'text-rose-900'}`}>
                  {verificationResult.message}
                </span>
              </div>

              {verificationResult.valid && verificationResult.leave && (
                <div className="text-xs space-y-2 text-slate-700 pt-2 border-t border-emerald-200">
                  <p><strong>Student:</strong> {verificationResult.leave.studentName || verificationResult.leave.student?.name}</p>
                  <p><strong>Roll No:</strong> {verificationResult.leave.rollNo || verificationResult.leave.student?.rollNo} • Room {verificationResult.leave.roomNumber || verificationResult.leave.student?.roomNumber}</p>
                  <p><strong>Type:</strong> {verificationResult.leave.leaveType}</p>
                  <p><strong>Destination:</strong> {verificationResult.leave.destinationAddress}</p>
                  <p><strong>Parent Contact:</strong> {verificationResult.leave.emergencyContact}</p>
                  <p><strong>Warden Note:</strong> {verificationResult.leave.wardenRemarks}</p>

                  <div className="pt-2">
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Security Notes (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Carrying black backpack, bike AP09XX"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-xs"
                    />
                  </div>

                  {!verificationResult.isCheckedOut ? (
                    <button
                      onClick={handleCheckOut}
                      className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                      <span>Record Student Exit (Check-Out)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleCheckIn(verificationResult.leave.passCode)}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ArrowDownLeft className="w-4 h-4" />
                      <span>Record Student Return (Check-In)</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right 2 Cols: Live Outside Students Queue & Gate Register */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Outside Students */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <h2 className="text-base font-bold text-slate-900">Students Currently Outside ({currentlyOutsideLogs.length})</h2>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl">
                Active Movements
              </span>
            </div>

            {currentlyOutsideLogs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">All students are currently inside the hostel premises. 🏠</p>
            ) : (
              <div className="space-y-3">
                {currentlyOutsideLogs.map((log) => (
                  <div key={log._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{log.studentName}</span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-md">
                          {log.passCode}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {log.rollNo} • Room {log.roomNumber} • Left at: <strong className="text-slate-800">{new Date(log.outTime).toLocaleTimeString('en-IN')}</strong>
                      </p>
                      <p className="text-[11px] text-slate-600 font-medium">Destination: {log.destination}</p>
                    </div>

                    <button
                      onClick={() => handleCheckIn(log.passCode)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1 shrink-0 transition-all"
                    >
                      <ArrowDownLeft className="w-4 h-4" />
                      <span>Mark Return</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Full Gate Movement Log */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900">Today's Gate Movement Attendance</h3>
              <span className="text-xs text-slate-400">{gateLogs.length} Records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3.5">Student & Room</th>
                    <th className="px-6 py-3.5">Pass Code</th>
                    <th className="px-6 py-3.5">Out-Time</th>
                    <th className="px-6 py-3.5">In-Time</th>
                    <th className="px-6 py-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gateLogs.map((g) => (
                    <tr key={g._id} className="hover:bg-slate-50">
                      <td className="px-6 py-3.5">
                        <p className="font-bold text-slate-900">{g.studentName}</p>
                        <p className="text-[10px] text-slate-500">{g.rollNo} • Room {g.roomNumber}</p>
                      </td>
                      <td className="px-6 py-3.5 font-mono font-bold text-indigo-600">{g.passCode}</td>
                      <td className="px-6 py-3.5 text-amber-700 font-semibold">{new Date(g.outTime).toLocaleTimeString('en-IN')}</td>
                      <td className="px-6 py-3.5 text-emerald-700 font-semibold">{g.inTime ? new Date(g.inTime).toLocaleTimeString('en-IN') : <span className="text-slate-400">Outside</span>}</td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase ${
                            g.status === 'Returned / Inside' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {g.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

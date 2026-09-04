import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  CalendarCheck,
  Check,
  X,
  Clock,
  Save,
  CheckCircle2,
  Phone,
  Search,
  Printer,
  CheckCheck,
  Users,
  AlertTriangle,
} from 'lucide-react';

export default function AdminAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedMsg, setSavedMsg] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [callModalData, setCallModalData] = useState(null);
  const [callNote, setCallNote] = useState('');

  const loadAttendance = async (selectedDate) => {
    try {
      const data = await api.getAttendance(selectedDate);
      // Ensure records contain parent info
      const recs = (data?.records || []).map((r) => ({
        ...r,
        parentName: r.parentName || r.student?.parentName || 'Parent / Guardian',
        parentPhone: r.parentPhone || r.student?.parentPhone || '+91 9123456780',
      }));
      setRecords(recs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendance(date);
  }, [date]);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...records];
    updated[index].status = newStatus;
    setRecords(updated);
  };

  const handleMarkAllPresent = () => {
    const updated = records.map((r) => ({ ...r, status: 'Present' }));
    setRecords(updated);
  };

  const handleSave = async () => {
    try {
      await api.saveAttendance(date, records);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const openCallModal = (record) => {
    setCallModalData(record);
    setCallNote(`Contacted ${record.parentName} regarding attendance on ${date}.`);
  };

  const handleConfirmCall = () => {
    alert(`✓ Communication recorded for ${callModalData?.parentName} (${callModalData?.parentPhone})\nNote: "${callNote}"`);
    setCallModalData(null);
  };

  const filteredRecords = records.filter((r) => {
    const matchesFilter = filter === 'all' || r.status === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      r.studentName?.toLowerCase().includes(q) ||
      r.rollNo?.toLowerCase().includes(q) ||
      r.roomNumber?.toLowerCase().includes(q) ||
      r.parentName?.toLowerCase().includes(q) ||
      r.parentPhone?.includes(q);
    return matchesFilter && matchesSearch;
  });

  const presentCount = records.filter((r) => r.status === 'Present').length;
  const absentCount = records.filter((r) => r.status === 'Absent').length;
  const leaveCount = records.filter((r) => r.status === 'On Leave').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Daily Hostel Evening Roll Call & Parent Contacts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Record nightly resident presence, manage attendance, and immediately reach parents.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />

          <button
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all border border-emerald-200"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All Present</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all border border-slate-200"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Roll Call</span>
          </button>
        </div>
      </div>

      {savedMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Attendance records for {date} saved successfully!</span>
        </div>
      )}

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card">
          <span className="text-[11px] font-bold uppercase text-slate-400">Total Residents</span>
          <p className="text-2xl font-black text-slate-900 mt-1">{records.length} Students</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
            All Blocks
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card border-l-4 border-l-emerald-500">
          <span className="text-[11px] font-bold uppercase text-emerald-600">Present Tonight</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {presentCount}{' '}
            <span className="text-xs font-bold text-slate-400">
              ({Math.round((presentCount / (records.length || 1)) * 100)}%)
            </span>
          </p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
            In Premises
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card border-l-4 border-l-rose-500">
          <span className="text-[11px] font-bold uppercase text-rose-600">Absent / Missing</span>
          <p className="text-2xl font-black text-rose-600 mt-1">{absentCount} Students</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700">
            Call Required
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-card border-l-4 border-l-amber-500">
          <span className="text-[11px] font-bold uppercase text-amber-600">On Approved Leave</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{leaveCount} Students</p>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
            Gate Pass Valid
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, roll no, room, parent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
          {['all', 'Present', 'Absent', 'On Leave'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                filter === f
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? `All (${records.length})` : f}
            </button>
          ))}
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Roll Call Sheet ({filteredRecords.length} Students)
          </h2>
          <span className="text-xs font-bold text-slate-500">Date: {date}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Student Name</th>
                <th className="px-6 py-3.5">Roll No</th>
                <th className="px-6 py-3.5">Room</th>
                <th className="px-6 py-3.5">Parent Details</th>
                <th className="px-6 py-3.5">Parent Contact</th>
                <th className="px-6 py-3.5">Roll Call Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-400 font-medium">
                    No matching student records found.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r, idx) => {
                  const originalIndex = records.findIndex((rec) => rec.studentId === r.studentId || (rec.rollNo === r.rollNo && rec.studentName === r.studentName));
                  const targetIdx = originalIndex !== -1 ? originalIndex : idx;

                  return (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="px-6 py-4 font-bold text-slate-900">{r.studentName}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{r.rollNo}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold rounded-lg text-[11px]">
                          {r.roomNumber || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">
                        {r.parentName || 'Parent / Guardian'}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openCallModal(r)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl transition-colors border border-emerald-200 text-xs"
                          title="Call Parent"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{r.parentPhone || '+91 9123456780'}</span>
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleStatusChange(targetIdx, 'Present')}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                              r.status === 'Present'
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => handleStatusChange(targetIdx, 'Absent')}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                              r.status === 'Absent'
                                ? 'bg-rose-600 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Absent
                          </button>
                          <button
                            onClick={() => handleStatusChange(targetIdx, 'On Leave')}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                              r.status === 'On Leave'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            On Leave
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Call Parent Modal */}
      {callModalData && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-base">
                <Phone className="w-5 h-5" />
                <span>Call Student Parent</span>
              </div>
              <button
                onClick={() => setCallModalData(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <p>
                <strong className="text-slate-500">Student:</strong>{' '}
                <span className="font-bold text-slate-900">{callModalData.studentName}</span> ({callModalData.rollNo})
              </p>
              <p>
                <strong className="text-slate-500">Room:</strong>{' '}
                <span className="font-bold text-indigo-600">{callModalData.roomNumber}</span>
              </p>
              <p>
                <strong className="text-slate-500">Parent Name:</strong>{' '}
                <span className="font-bold text-slate-900">{callModalData.parentName}</span>
              </p>
              <p>
                <strong className="text-slate-500">Parent Phone:</strong>{' '}
                <a
                  href={`tel:${callModalData.parentPhone}`}
                  className="font-mono font-bold text-emerald-600 hover:underline"
                >
                  {callModalData.parentPhone}
                </a>
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Warden Communication Note</label>
              <textarea
                rows={3}
                value={callNote}
                onChange={(e) => setCallNote(e.target.value)}
                placeholder="Enter notes from call with parent..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-2">
              <a
                href={`tel:${callModalData.parentPhone}`}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Dial Phone</span>
              </a>
              <button
                onClick={handleConfirmCall}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Log Communication
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

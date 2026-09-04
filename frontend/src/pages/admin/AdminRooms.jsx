import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import {
  BedDouble,
  Sparkles,
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  UserMinus,
  Layers,
} from 'lucide-react';

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allocatingId, setAllocatingId] = useState(null);
  const [message, setMessage] = useState('');

  const loadData = async () => {
    try {
      const [rms, stus] = await Promise.all([api.getRooms(), api.getStudents()]);
      setRooms(rms);
      setStudents(stus);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const unassignedStudents = students.filter((s) => !s.roomNumber || s.roomNumber === 'Unassigned');

  const handleSmartAllocate = async (studentId) => {
    setAllocatingId(studentId);
    setMessage('');
    try {
      const res = await api.smartAllocate(studentId);
      setMessage(`✅ ${res.message} • ${res.matchReason}`);
      await loadData();
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setAllocatingId(null);
    }
  };

  const handleDeallocate = async (studentId) => {
    if (!window.confirm('Are you sure you want to deallocate this student from the room?')) return;
    try {
      await api.deallocateRoom(studentId);
      await loadData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hostel Rooms & Smart Allotment Engine</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Automated roommate department matching, vacancy management, and bed allocations.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-xs font-bold text-indigo-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Pending Allocation Queue */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">Unassigned Students Queue ({unassignedStudents.length})</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">Ready for Smart Match</span>
        </div>

        {unassignedStudents.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">All registered students currently have active room allocations! 🎉</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unassignedStudents.map((stu) => (
              <div key={stu._id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">{stu.name}</p>
                  <p className="text-[11px] text-slate-500">{stu.department} • {stu.year}</p>
                  <p className="text-[10px] text-indigo-600 font-semibold">{stu.gender} • Roll: {stu.rollNo || 'N/A'}</p>
                </div>

                <button
                  onClick={() => handleSmartAllocate(stu._id)}
                  disabled={allocatingId === stu._id}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{allocatingId === stu._id ? 'Matching...' : 'Auto Match'}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Rooms Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">All Rooms & Current Occupants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room) => {
            const isFull = room.occupied >= room.capacity;
            return (
              <div key={room._id} className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-slate-900">{room.roomNumber}</span>
                    <p className="text-xs text-slate-500">{room.block} • Floor {room.floor}</p>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                      isFull ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isFull ? 'Full' : `${room.capacity - room.occupied} Vacant`}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex justify-between">
                  <span className="font-bold text-indigo-600">{room.type}</span>
                  <span className="font-semibold">₹{room.feePerSemester?.toLocaleString('en-IN')} / sem</span>
                </div>

                {/* Occupants list */}
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Occupants</p>
                  {room.occupants?.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No students allocated yet.</p>
                  ) : (
                    room.occupants.map((occ) => (
                      <div key={occ._id || occ} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-xl">
                        <div>
                          <p className="font-bold text-slate-800">{occ.name}</p>
                          <p className="text-[10px] text-slate-500">{occ.department} • {occ.rollNo}</p>
                        </div>
                        <button
                          onClick={() => handleDeallocate(occ._id || occ)}
                          title="Deallocate student from room"
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

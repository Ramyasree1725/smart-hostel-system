import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import {
  BedDouble,
  Sparkles,
  Users,
  CheckCircle2,
  AlertCircle,
  Wifi,
  Shield,
  Layers,
  Check,
  Zap,
} from 'lucide-react';

export default function StudentRooms() {
  const { user, updateUserData } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allocating, setAllocating] = useState(false);
  const [allocationResult, setAllocationResult] = useState(null);
  const [preferredType, setPreferredType] = useState('Double AC');
  const [preferredBlock, setPreferredBlock] = useState('');

  const loadRooms = async () => {
    try {
      const data = await api.getRooms();
      setRooms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const hasRoom = user?.roomNumber && user?.roomNumber !== 'Unassigned';
  const myRoom = rooms.find((r) => r.roomNumber === user?.roomNumber);

  const handleSmartAllocate = async () => {
    setAllocating(true);
    setAllocationResult(null);
    try {
      const res = await api.smartAllocate(user._id, { preferredType, preferredBlock });
      setAllocationResult(res);
      updateUserData({
        roomNumber: res.allocatedRoom.roomNumber,
        bedNumber: res.bedNumber,
        status: 'Active',
      });
      await loadRooms();
    } catch (err) {
      setAllocationResult({ error: err.message });
    } finally {
      setAllocating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hostel Rooms & Smart Allotment</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Automated roommate matching based on department compatibility and academic year synergy.
        </p>
      </div>

      {/* If Student Already Has a Room */}
      {hasRoom && (
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-700/50 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-indigo-800/80 pb-6">
            <div className="space-y-1">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold rounded-full uppercase">
                Allocated Room
              </span>
              <h2 className="text-3xl font-black tracking-tight text-white mt-2">
                Room {user.roomNumber} ({user.bedNumber})
              </h2>
              <p className="text-xs text-indigo-200">
                {myRoom?.block} • Floor {myRoom?.floor} • {myRoom?.type}
              </p>
            </div>

            <div className="text-right bg-white/10 p-4 rounded-2xl backdrop-blur-md">
              <p className="text-xs font-semibold text-indigo-200 uppercase">Semester Fee</p>
              <p className="text-xl font-black text-white">₹{myRoom?.feePerSemester?.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Room Amenities */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">Room Amenities Included</p>
            <div className="flex flex-wrap gap-2">
              {(myRoom?.amenities || ['High Speed Wi-Fi', 'Attached Bathroom', 'Balcony', 'Study Table']).map((a, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 rounded-xl text-xs font-medium text-indigo-100 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Roommates Section */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">Roommates</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(myRoom?.occupants || []).map((occ) => (
                <div key={occ._id || occ} className="p-3.5 rounded-2xl bg-white/10 border border-white/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                    {occ.name ? occ.name.charAt(0) : 'R'}
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-white">{occ.name || 'Roommate'}</p>
                    <p className="text-indigo-200">{occ.department} • {occ.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* If Student Has NO Room -> Smart Allocation Box */}
      {!hasRoom && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-indigo-100 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Smart Automated Room Allocation</h2>
              <p className="text-xs text-slate-500">
                Our algorithm evaluates department & year compatibility to match you with the best room.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Room Sharing Preference</label>
              <select
                value={preferredType}
                onChange={(e) => setPreferredType(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Single AC">Single AC (₹65,000 / sem)</option>
                <option value="Double AC">Double AC (₹48,000 / sem)</option>
                <option value="Double Non-AC">Double Non-AC (₹38,000 / sem)</option>
                <option value="Triple Non-AC">Triple Non-AC (₹32,000 / sem)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hostel Wing / Block</label>
              <select
                value={preferredBlock}
                onChange={(e) => setPreferredBlock(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Auto-Assign (Based on Gender)</option>
                <option value="Block A (Boys)">Block A (Boys Hostel)</option>
                <option value="Block B (Girls)">Block B (Girls Hostel)</option>
                <option value="Deluxe Wing">Deluxe Wing</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSmartAllocate}
            disabled={allocating}
            className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>{allocating ? 'Evaluating Compatibility...' : 'Run Smart Room Allocation Engine'}</span>
          </button>

          {allocationResult && (
            <div
              className={`p-5 rounded-2xl border ${
                allocationResult.error
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              {allocationResult.error ? (
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>{allocationResult.error}</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>{allocationResult.message}</span>
                  </div>
                  <p className="text-xs text-emerald-700">
                    <span className="font-semibold">Algorithm Match Reason: </span>
                    {allocationResult.matchReason}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Available Hostel Rooms Directory */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Hostel Rooms Overview & Capacity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room) => {
            const isFull = room.occupied >= room.capacity;
            return (
              <div
                key={room._id}
                className={`bg-white rounded-3xl p-5 border shadow-card transition-all hover:shadow-lg ${
                  room.roomNumber === user?.roomNumber
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-black text-slate-900">{room.roomNumber}</span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isFull ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isFull ? 'Full' : `${room.capacity - room.occupied} Vacancy`}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-600 mb-4">
                  <p className="font-medium">{room.block} • Floor {room.floor}</p>
                  <p className="font-bold text-indigo-600">{room.type}</p>
                  <p className="text-sm font-black text-slate-800">₹{room.feePerSemester?.toLocaleString('en-IN')} / sem</p>
                </div>

                {/* Bed visual occupancy */}
                <div className="flex items-center gap-1.5 py-2 border-t border-slate-100">
                  {Array.from({ length: room.capacity }).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 flex-1 rounded-full ${
                        idx < room.occupied ? 'bg-indigo-600' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <div className="text-[10px] text-slate-400 mt-2 font-medium flex items-center justify-between">
                  <span>Occupancy: {room.occupied} / {room.capacity}</span>
                  {room.roomNumber === user?.roomNumber && (
                    <span className="font-bold text-indigo-600">Your Current Room</span>
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

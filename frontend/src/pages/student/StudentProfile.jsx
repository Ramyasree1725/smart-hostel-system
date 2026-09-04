import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, MapPin, Building, GraduationCap, HeartPulse, ShieldCheck } from 'lucide-react';

export default function StudentProfile() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Student Resident Profile</h1>
        <p className="text-xs sm:text-sm text-slate-500">Official hostel resident record and emergency contacts.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-20 h-20 rounded-3xl bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-2xl bg-indigo-500 text-white font-black text-2xl flex items-center justify-center">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-xl text-xs font-bold self-start">
              {user?.rollNo || 'Resident Student'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase">Department</span>
              <p className="text-sm font-bold text-slate-800">{user?.department || 'Computer Science'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase">Academic Year</span>
              <p className="text-sm font-bold text-slate-800">{user?.year || '3rd Year'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase">Allocated Room</span>
              <p className="text-sm font-bold text-indigo-600">
                {user?.roomNumber && user?.roomNumber !== 'Unassigned'
                  ? `Room ${user.roomNumber} (${user.bedNumber})`
                  : 'Allocation Pending'}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase">Blood Group</span>
              <p className="text-sm font-bold text-slate-800">{user?.bloodGroup || 'O+'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase">Student Contact</span>
              <p className="text-sm font-bold text-slate-800">{user?.phone || '+91 9988776655'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <span className="text-slate-400 font-bold uppercase">Parent / Guardian Phone</span>
              <p className="text-sm font-bold text-slate-800">{user?.parentPhone || '+91 9123456780'}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1 text-xs">
            <span className="text-slate-400 font-bold uppercase">Permanent Home Address</span>
            <p className="text-sm font-medium text-slate-800">{user?.address || 'Plot 45, Jubilee Hills, Hyderabad, India'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

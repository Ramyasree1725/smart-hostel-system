import React from 'react';
import { X, Printer, ShieldCheck, QrCode, Calendar, MapPin, Phone } from 'lucide-react';

export default function GatePassModal({ isOpen, onClose, leave, student }) {
  if (!isOpen || !leave) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 no-print">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
            <ShieldCheck className="w-5 h-5" />
            <span>Digital Gate Pass</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Pass
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-6 printable-area space-y-5">
          <div className="text-center border-b border-slate-200 pb-4">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase">
              APPROVED GATE PASS
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-2">CAMPUS HOSTEL OUTING PASS</h3>
            <p className="text-xs text-slate-500 font-mono font-bold mt-0.5">{leave.passCode || 'PASS-892104'}</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
              <QrCode className="w-9 h-9" />
            </div>
            <div className="text-xs space-y-0.5">
              <p className="text-slate-400 font-medium">Student</p>
              <p className="text-sm font-bold text-slate-800">{leave.studentName || student?.name}</p>
              <p className="text-slate-600 font-mono">{leave.rollNo || student?.rollNo} • Room {leave.roomNumber || student?.roomNumber}</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Duration: </span>
                <span>{new Date(leave.fromDate).toLocaleDateString()} to {new Date(leave.toDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Destination: </span>
                <span>{leave.destinationAddress}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Emergency Contact: </span>
                <span>{leave.emergencyContact}</span>
              </div>
            </div>
          </div>

          {leave.wardenRemarks && (
            <div className="text-xs bg-emerald-50 text-emerald-900 p-3 rounded-xl border border-emerald-100">
              <p className="font-bold">Warden Note:</p>
              <p>{leave.wardenRemarks}</p>
            </div>
          )}

          <div className="text-[10px] text-slate-400 text-center border-t border-slate-100 pt-3">
            Present this QR/Pass code to the hostel main security gate upon exit and entry.
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { X, Printer, CheckCircle2, Building2 } from 'lucide-react';

export default function ReceiptModal({ isOpen, onClose, fee, payment, student }) {
  if (!isOpen || !payment) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 no-print">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>Payment Receipt Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-8 printable-area space-y-6">
          {/* Hostel Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">CAMPUS HOSTEL AUTHORITY</h2>
                <p className="text-xs text-slate-500 font-medium">Official E-Payment & Fee Receipt</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg uppercase tracking-wider">
                PAID
              </span>
            </div>
          </div>

          {/* Receipt Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <p className="text-slate-400 font-semibold uppercase">Receipt No</p>
              <p className="font-mono font-bold text-slate-800 text-sm">{payment.receiptNo || 'HST-881290'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold uppercase">Transaction Ref</p>
              <p className="font-mono font-bold text-slate-800">{payment.transactionId || 'TXN_HST98214'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold uppercase">Payment Date</p>
              <p className="font-semibold text-slate-800">
                {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString('en-IN', { dateStyle: 'long' }) : new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold uppercase">Payment Mode</p>
              <p className="font-semibold text-slate-800">{payment.method || 'Online UPI'}</p>
            </div>
          </div>

          {/* Student Info */}
          <div className="space-y-1.5 text-xs border-b border-slate-200 pb-4">
            <p className="text-slate-400 font-semibold uppercase">Student Particulars</p>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Name:</span>
              <span className="font-bold text-slate-900">{student?.name || 'Rahul Varma'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Roll No / ID:</span>
              <span className="font-semibold text-slate-800">{student?.rollNo || '21CS108'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Allocated Room:</span>
              <span className="font-semibold text-slate-800">{student?.roomNumber || 'A-101'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">Semester / Term:</span>
              <span className="font-semibold text-slate-800">{fee?.semester || 'Semester 1 (2026-27)'}</span>
            </div>
          </div>

          {/* Amount Box */}
          <div className="bg-indigo-50/80 p-5 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-indigo-900 uppercase">Amount Paid</p>
              <p className="text-xs text-indigo-700">Hostel & Mess dues installment</p>
            </div>
            <div className="text-2xl font-black text-indigo-700">
              ₹{Number(payment.amount).toLocaleString('en-IN')}
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center space-y-0.5 pt-2">
            <p>This is a computer-generated digital receipt and requires no physical signature.</p>
            <p>Campus Hostel Management System • support@hostel.edu</p>
          </div>
        </div>
      </div>
    </div>
  );
}

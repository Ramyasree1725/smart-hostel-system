import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import ReceiptModal from '../../components/ReceiptModal';
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  ShieldCheck,
  Building,
  Utensils,
  Wrench,
  Lock,
  ArrowRight,
} from 'lucide-react';

export default function StudentFees() {
  const { user } = useAuth();
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payType, setPayType] = useState('full'); // 'full', 'room', 'food'
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('UPI');
  const [processing, setProcessing] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const loadFee = async () => {
    if (!user) return;
    try {
      const data = await api.getMyFee(user._id);
      setFee(data);
      if (data && data.dueAmount > 0) {
        setPayAmount(data.dueAmount);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFee();
  }, [user]);

  const handleOpenPay = (type, amount) => {
    setPayType(type);
    setPayAmount(amount);
    setPayModalOpen(true);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await api.payFee(user._id, payAmount, payMethod);
      await loadFee();
      setPayModalOpen(false);
      if (res.updatedFee?.paymentHistory?.length > 0) {
        const latestPayment = res.updatedFee.paymentHistory[res.updatedFee.paymentHistory.length - 1];
        setSelectedReceipt(latestPayment);
      }
    } catch (err) {
      alert(err.message || 'Payment error');
    } finally {
      setProcessing(false);
    }
  };

  const isRoomPaid = (fee?.paidAmount || 0) >= (fee?.roomFee || 38000);
  const isFoodPaid = (fee?.paidAmount || 0) >= ((fee?.roomFee || 38000) + (fee?.messFee || 20000));
  const isAllPaid = fee?.dueAmount === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Hostel Fee & Payment Center</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Clear separation of Room Accommodation Fee and Food / Mess Fee with live Paid / Unpaid tracking.
        </p>
      </div>

      {/* Main Status Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                isAllPaid
                  ? 'bg-emerald-500 text-slate-950 border border-emerald-400'
                  : 'bg-rose-500 text-white border border-rose-400 animate-pulse'
              }`}
            >
              {isAllPaid ? '✅ ALL DUES PAID' : '⚠️ UNPAID DUES PENDING'}
            </span>
            <span className="text-xs text-indigo-200 font-medium">{fee?.semester}</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black tracking-tight">
              ₹{fee ? Number(fee.dueAmount).toLocaleString('en-IN') : 0}
            </span>
            <span className="text-xs text-indigo-300">Remaining Balance Due</span>
          </div>

          <p className="text-xs text-indigo-200">
            Total Billed: ₹{fee ? Number(fee.totalAmount).toLocaleString('en-IN') : 0} • Paid: ₹{fee ? Number(fee.paidAmount).toLocaleString('en-IN') : 0}
          </p>
        </div>

        {fee?.dueAmount > 0 ? (
          <button
            onClick={() => handleOpenPay('full', fee.dueAmount)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
          >
            <CreditCard className="w-4 h-4 text-slate-950" />
            <span>Pay Total Balance (₹{Number(fee.dueAmount).toLocaleString('en-IN')})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-black">
            <CheckCircle2 className="w-5 h-5" />
            <span>All Semester Fees Paid in Full!</span>
          </div>
        )}
      </div>

      {/* DETAILED FEE BREAKDOWN (ROOM FEE vs FOOD FEE) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 1. ROOM ACCOMMODATION FEE */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">🏠 Room Accommodation Fee</h3>
                <p className="text-xs text-slate-500">Includes Room Rent, Electricity & Wi-Fi</p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${
                isRoomPaid
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {isRoomPaid ? '✅ PAID' : '❌ UNPAID'}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 font-medium">Semester Room Charge</p>
              <p className="text-xl font-black text-slate-900">₹{Number(fee?.roomFee || 38000).toLocaleString('en-IN')}</p>
            </div>
            {!isRoomPaid && (
              <button
                onClick={() => handleOpenPay('room', fee?.roomFee || 38000)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Pay Room Fee
              </button>
            )}
          </div>
        </div>

        {/* 2. FOOD & MESS FEE */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">🍲 Food & Mess Fee</h3>
                <p className="text-xs text-slate-500">Breakfast, Lunch, Snacks & Dinner</p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${
                isFoodPaid
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {isFoodPaid ? '✅ PAID' : '❌ UNPAID'}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 font-medium">Semester Mess Charge</p>
              <p className="text-xl font-black text-slate-900">₹{Number(fee?.messFee || 20000).toLocaleString('en-IN')}</p>
            </div>
            {!isFoodPaid && (
              <button
                onClick={() => handleOpenPay('food', fee?.messFee || 20000)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Pay Food Fee
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Transaction History & Receipt Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-base font-bold text-slate-900">Payment Transactions & Printable Receipts</h3>
          <span className="text-xs text-slate-500 font-medium">{fee?.paymentHistory?.length || 0} Transactions</span>
        </div>

        {fee?.paymentHistory?.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">No payments recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Receipt #</th>
                  <th className="px-6 py-3.5">Transaction ID</th>
                  <th className="px-6 py-3.5">Amount Paid</th>
                  <th className="px-6 py-3.5">Mode</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fee?.paymentHistory?.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-600">{p.receiptNo}</td>
                    <td className="px-6 py-4 font-mono text-slate-600">{p.transactionId}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">₹{Number(p.amount).toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{p.method}</td>
                    <td className="px-6 py-4 text-slate-500">{new Date(p.paidAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedReceipt(p)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition-all"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Print Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pay Modal */}
      {payModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Online Payment: {payType === 'room' ? 'Room Accommodation' : payType === 'food' ? 'Food & Mess' : 'Total Hostel Dues'}
              </h3>
              <button onClick={() => setPayModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Enter Amount to Pay (₹)</label>
                <input
                  type="number"
                  required
                  max={fee?.dueAmount}
                  min={1}
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Payment Method</label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                >
                  <option value="UPI">UPI (GooglePay / PhonePe / Paytm)</option>
                  <option value="Debit Card">Debit Card / ATM</option>
                  <option value="Net Banking">Net Banking</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md"
              >
                {processing ? 'Processing Payment...' : `Confirm & Pay ₹${Number(payAmount || 0).toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Printable Receipt Modal */}
      <ReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        fee={fee}
        payment={selectedReceipt}
        student={user}
      />
    </div>
  );
}

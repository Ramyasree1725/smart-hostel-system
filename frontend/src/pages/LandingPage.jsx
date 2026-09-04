import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Building2,
  ShieldCheck,
  Cpu,
  CreditCard,
  AlertCircle,
  FileCheck2,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  const { user, switchDemoUser } = useAuth();
  const navigate = useNavigate();

  const handleDemoStudent = async () => {
    await switchDemoUser('student');
    navigate('/student/dashboard');
  };

  const handleDemoAdmin = async () => {
    await switchDemoUser('admin');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-20 sm:pb-28">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Next-Gen MERN Campus Living Platform</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Smart Hostel Management{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
                Simplified & Automated
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed font-normal">
              Intelligent room allocation by department & year, NLP complaint urgency tagging, instant online fee receipts, digital gate passes, and complete warden analytics.
            </p>

            {/* Action Buttons & 1-Click Demo */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDemoStudent}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <span>🚀 Launch Student Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleDemoAdmin}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Admin / Warden Portal</span>
              </button>
            </div>

            {/* Credential hint */}
            <p className="text-xs text-slate-400">
              ⚡ Pre-loaded with realistic mock hostel data for instant evaluation.
            </p>
          </div>

          {/* Feature Highlights Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl backdrop-blur-sm space-y-3 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Smart Room Allocation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Matches roommates based on department synergy and academic year compatibility while optimizing bed occupancy.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl backdrop-blur-sm space-y-3 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Complaint Priority Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatic keyword classifier flags emergencies (sparks, leakages) for fast resolution and technician dispatch.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl backdrop-blur-sm space-y-3 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Fee Dues & E-Receipts</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detailed fee breakdown (Mess, Room, Security), mock UPI gateway, printable receipts, and automated due alerts.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-3xl backdrop-blur-sm space-y-3 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Digital Gate Pass</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hassle-free student outing and leave requests with instant warden approval badge and printable pass code.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

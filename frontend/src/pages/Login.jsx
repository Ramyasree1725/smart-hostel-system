import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, User, Key, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();

  const [email, setEmail] = useState('officer@defense.mil');
  const [password, setPassword] = useState('officer123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const result = await login(email, password);
    if (result?.success) {
      navigate('/dashboard');
    } else {
      setErrorMessage(result?.message || 'Authentication error');
    }
  };

  const fillQuickDemo = (officerRole) => {
    if (officerRole === 'COMMAND') {
      setEmail('officer@defense.mil');
      setPassword('officer123');
    } else {
      setEmail('medic@defense.mil');
      setPassword('officer123');
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] flex flex-col justify-center items-center p-4 relative overflow-hidden bg-tactical-grid">
      {/* Glow Backdrops */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-xl shadow-cyan-500/20">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-mono uppercase">
            Command Portal Login
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Enter authorized Officer ID or credentials to access tactical HUD
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#0F172A]/90 p-8 shadow-2xl backdrop-blur-md">
          {(errorMessage || authError) && (
            <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-950/40 p-3 text-xs text-rose-300">
              {errorMessage || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300">Officer ID or Email</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. OFF-007 or officer@defense.mil"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-300">Security Password</label>
              </div>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Key className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-3 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/30 hover:from-cyan-500 hover:to-blue-500 transition"
            >
              <span>{loading ? 'Authenticating...' : 'Authorize & Enter HUD'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
              Quick Demo Logins (1-Click)
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillQuickDemo('COMMAND')}
                className="rounded-lg border border-cyan-500/30 bg-cyan-950/30 p-2 text-center text-cyan-300 hover:bg-cyan-900/40 transition"
              >
                <p className="font-bold">Commanding Officer</p>
                <p className="text-[10px] text-slate-400">Capt. Vikram (OFF-007)</p>
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('MEDIC')}
                className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-2 text-center text-emerald-300 hover:bg-emerald-900/40 transition"
              >
                <p className="font-bold">Medical Officer</p>
                <p className="text-[10px] text-slate-400">Dr. Ananya (MED-101)</p>
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link to="/" className="text-xs text-slate-400 hover:text-cyan-400 transition font-mono">
            ← Return to Project Overview
          </Link>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useSocket } from '../context/SocketContext';
import { AlertOctagon, X, CheckCircle, ShieldAlert } from 'lucide-react';

export const AlertBanner = () => {
  const { recentNotification, handleAcknowledge } = useSocket();

  if (!recentNotification) return null;

  const isCritical = recentNotification.severity === 'CRITICAL' || recentNotification.type === 'SOS_MANUAL_TRIGGER';

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex max-w-md items-start space-x-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md transition-all animate-bounce ${
        isCritical
          ? 'border-rose-600 bg-rose-950/90 text-rose-100 glow-red'
          : 'border-amber-600 bg-amber-950/90 text-amber-100 glow-amber'
      }`}
    >
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-black/40">
        {isCritical ? (
          <ShieldAlert className="h-5 w-5 text-rose-400 animate-pulse" />
        ) : (
          <AlertOctagon className="h-5 w-5 text-amber-400" />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-wider">
            {recentNotification.type.replace(/_/g, ' ')}
          </span>
          <span className="text-[10px] opacity-75 font-mono">
            {recentNotification.alertId || 'ALERT'}
          </span>
        </div>

        <p className="mt-1 text-xs font-medium leading-snug">{recentNotification.message}</p>

        <div className="mt-2 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-white">
            Soldier: {recentNotification.soldierName}
          </span>

          <button
            onClick={() => handleAcknowledge(recentNotification.alertId || recentNotification.id)}
            className="flex items-center space-x-1 rounded bg-white/20 px-2 py-0.5 font-semibold text-white hover:bg-white/30 transition"
          >
            <CheckCircle className="h-3 w-3" />
            <span>Acknowledge</span>
          </button>
        </div>
      </div>
    </div>
  );
};

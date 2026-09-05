import React from 'react';

export const StatCard = ({ title, value, unit, icon: Icon, trend, status = 'normal', subtitle }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-950/20';
      case 'warning':
        return 'text-amber-400 border-amber-500/20 bg-amber-950/20';
      case 'danger':
        return 'text-rose-400 border-rose-500/20 bg-rose-950/20';
      case 'cyan':
        return 'text-cyan-400 border-cyan-500/20 bg-cyan-950/20';
      default:
        return 'text-slate-300 border-slate-800 bg-slate-900/50';
    }
  };

  const getIconColor = () => {
    switch (status) {
      case 'success':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'warning':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'danger':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'cyan':
        return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      default:
        return 'text-slate-400 bg-slate-800/40 border-slate-700';
    }
  };

  return (
    <div className={`rounded-xl border p-4 backdrop-blur-sm transition duration-200 hover:border-slate-700 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{title}</span>
        {Icon && (
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${getIconColor()}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline space-x-2">
        <span className="font-mono text-2xl font-bold tracking-tight text-white">{value}</span>
        {unit && <span className="text-xs font-medium text-slate-400">{unit}</span>}
      </div>

      {(subtitle || trend) && (
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
          <span>{subtitle}</span>
          {trend && (
            <span className={`font-mono font-medium ${trend.startsWith('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
              {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

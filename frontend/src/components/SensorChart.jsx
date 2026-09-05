import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

export const SensorChart = ({
  data = [],
  dataKey = 'heartRate',
  title = 'Sensor Telemetry',
  color = '#06B6D4',
  unit = 'BPM',
  thresholdHigh,
  thresholdLow,
  minDomain = 'dataMin - 10',
  maxDomain = 'dataMax + 10',
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-2.5 shadow-xl backdrop-blur-md">
          <p className="font-mono text-[10px] text-slate-400">{label}</p>
          <p className="mt-1 font-mono text-sm font-bold text-white">
            {payload[0].value} <span className="text-xs font-normal text-slate-400">{unit}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-xs font-semibold tracking-wider text-slate-300 uppercase">{title}</h4>
        <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400">
          {thresholdHigh && (
            <span className="flex items-center space-x-1">
              <span className="h-1.5 w-3 bg-rose-500 inline-block"></span>
              <span>Max: {thresholdHigh}</span>
            </span>
          )}
          {thresholdLow && (
            <span className="flex items-center space-x-1">
              <span className="h-1.5 w-3 bg-cyan-500 inline-block"></span>
              <span>Min: {thresholdLow}</span>
            </span>
          )}
        </div>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#64748B"
              tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={false}
            />
            <YAxis
              stroke="#64748B"
              tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'monospace' }}
              tickLine={false}
              domain={[minDomain, maxDomain]}
            />
            <Tooltip content={<CustomTooltip />} />
            {thresholdHigh && (
              <ReferenceLine y={thresholdHigh} stroke="#EF4444" strokeDasharray="3 3" />
            )}
            {thresholdLow && (
              <ReferenceLine y={thresholdLow} stroke="#06B6D4" strokeDasharray="3 3" />
            )}
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#gradient-${dataKey})`}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

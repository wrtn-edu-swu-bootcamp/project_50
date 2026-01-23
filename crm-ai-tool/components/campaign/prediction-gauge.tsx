'use client';

interface PredictionGaugeProps {
  value: number;
  label: string;
  max?: number;
}

export function PredictionGauge({ value, label, max = 100 }: PredictionGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const rotation = (percentage / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-16 mb-2">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path
            d="M 10 45 A 40 40 0 0 1 90 45"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 10 45 A 40 40 0 0 1 90 45"
            fill="none"
            stroke="#5FB3B3"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(rotation / 180) * 126} 126`}
          />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className="text-2xl font-bold text-[#1E293B]">
            {value.toFixed(1)}%
          </span>
        </div>
      </div>
      <p className="text-sm text-[#64748B] text-center">{label}</p>
    </div>
  );
}

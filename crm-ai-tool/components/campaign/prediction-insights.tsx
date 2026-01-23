'use client';

import { CheckCircle2, AlertCircle } from 'lucide-react';

interface PredictionInsightsProps {
  basis: string;
  similarCampaigns: number;
  suggestions: string[];
  comparisonToAverage: number;
}

export function PredictionInsights({
  basis,
  similarCampaigns,
  suggestions,
  comparisonToAverage,
}: PredictionInsightsProps) {
  return (
    <div className="space-y-4">
      <div className="bg-[#F8FAFC] rounded-lg p-4">
        <h4 className="text-sm font-semibold text-[#1E293B] mb-2">예측 근거</h4>
        <p className="text-sm text-[#64748B] mb-1">{basis}</p>
        {comparisonToAverage !== 0 && (
          <p className="text-sm text-[#64748B]">
            업계 평균 대비{' '}
            <span
              className={
                comparisonToAverage > 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
              }
            >
              {comparisonToAverage > 0 ? '+' : ''}
              {comparisonToAverage.toFixed(1)}%
            </span>
          </p>
        )}
      </div>

      <div>
        <h4 className="text-sm font-semibold text-[#1E293B] mb-3">개선 제안</h4>
        <div className="space-y-2">
          {suggestions.map((suggestion, index) => {
            const isPositive =
              suggestion.includes('적절') ||
              suggestion.includes('좋습니다') ||
              suggestion.includes('포함되어');
            
            return (
              <div key={index} className="flex items-start space-x-2">
                {isPositive ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm text-[#475569]">{suggestion}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

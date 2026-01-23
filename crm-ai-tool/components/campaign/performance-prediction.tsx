'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PredictionGauge } from './prediction-gauge';
import { PredictionEmptyState } from './prediction-empty-state';
import { PredictionInsights } from './prediction-insights';
import { Message } from '@/types';
import { Loader2 } from 'lucide-react';

interface PerformancePredictionProps {
  selectedMessage: Message | null;
  purpose: string;
  target: string;
  tone: string;
  onPredictionUpdate?: (prediction: PredictionResult | null) => void;
}

interface PredictionResult {
  connected: boolean;
  predictedCtr: number;
  predictedConversion: number;
  confidence: number;
  comparisonToAverage: number;
  insights: {
    basis: string;
    similarCampaigns: number;
    suggestions: string[];
  };
}

export function PerformancePrediction({
  selectedMessage,
  purpose,
  target,
  tone,
  onPredictionUpdate,
}: PerformancePredictionProps) {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedMessage) {
      setPrediction(null);
      return;
    }

    const fetchPrediction = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/ai/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: selectedMessage,
            purpose,
            target,
            tone,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch prediction');
        }

        const data = await response.json();
        setPrediction(data);
        if (onPredictionUpdate) {
          onPredictionUpdate(data);
        }
      } catch (err) {
        console.error('Prediction error:', err);
        setError('성과 예측을 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrediction();
  }, [selectedMessage, purpose, target, tone]);

  if (!selectedMessage) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-[#1E293B]">
          성과 예측
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#5FB3B3] animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && prediction && (
          <>
            {!prediction.connected ? (
              <PredictionEmptyState />
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PredictionGauge
                    value={prediction.predictedCtr}
                    label="예상 클릭률"
                    max={20}
                  />
                  <PredictionGauge
                    value={prediction.predictedConversion}
                    label="예상 전환율"
                    max={10}
                  />
                </div>

                {prediction.confidence > 0 && (
                  <div className="text-center">
                    <p className="text-sm text-[#64748B]">
                      신뢰도:{' '}
                      <span className="font-semibold text-[#1E293B]">
                        {prediction.confidence}%
                      </span>
                    </p>
                  </div>
                )}

                <PredictionInsights
                  basis={prediction.insights.basis}
                  similarCampaigns={prediction.insights.similarCampaigns}
                  suggestions={prediction.insights.suggestions}
                  comparisonToAverage={prediction.comparisonToAverage}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

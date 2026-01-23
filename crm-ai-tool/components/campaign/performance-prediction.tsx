'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PredictionGauge } from './prediction-gauge';
import { PredictionEmptyState } from './prediction-empty-state';
import { PredictionInsights } from './prediction-insights';
import { Message } from '@/types';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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

const PREDICT_RATE_LIMIT_KEY = 'ai_predict_rate_limit';

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
  const [rateLimitUntil, setRateLimitUntil] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  // Check for existing rate limit
  useEffect(() => {
    const checkRateLimit = () => {
      const storedLimit = localStorage.getItem(PREDICT_RATE_LIMIT_KEY);
      if (storedLimit) {
        const limitTime = parseInt(storedLimit);
        const now = Date.now();
        
        if (limitTime > now) {
          setRateLimitUntil(limitTime);
          setRemainingTime(Math.ceil((limitTime - now) / 1000));
        } else {
          localStorage.removeItem(PREDICT_RATE_LIMIT_KEY);
          setRateLimitUntil(null);
          setRemainingTime(0);
        }
      }
    };

    checkRateLimit();
    const interval = setInterval(checkRateLimit, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Update remaining time countdown
  useEffect(() => {
    if (rateLimitUntil) {
      const interval = setInterval(() => {
        const now = Date.now();
        const remaining = Math.ceil((rateLimitUntil - now) / 1000);
        
        if (remaining <= 0) {
          localStorage.removeItem(PREDICT_RATE_LIMIT_KEY);
          setRateLimitUntil(null);
          setRemainingTime(0);
          setError(null);
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [rateLimitUntil]);

  useEffect(() => {
    if (!selectedMessage) {
      setPrediction(null);
      return;
    }

    // Check if rate limited
    if (rateLimitUntil && Date.now() < rateLimitUntil) {
      const remaining = Math.ceil((rateLimitUntil - Date.now()) / 1000);
      setError(`요청 한도를 초과했습니다. ${remaining}초 후 다시 시도해주세요.`);
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
          const errorData = await response.json();
          
          if (response.status === 429) {
            const retryAfter = errorData.retryAfter || 60;
            const limitUntil = Date.now() + (retryAfter * 1000);
            
            localStorage.setItem(PREDICT_RATE_LIMIT_KEY, limitUntil.toString());
            setRateLimitUntil(limitUntil);
            setRemainingTime(retryAfter);
            
            throw new Error(`요청 한도를 초과했습니다. ${retryAfter}초 후 재시도 가능합니다.`);
          }
          
          throw new Error(errorData.error || 'Failed to fetch prediction');
        }

        const data = await response.json();
        
        // Clear any existing rate limit on success
        localStorage.removeItem(PREDICT_RATE_LIMIT_KEY);
        setRateLimitUntil(null);
        setRemainingTime(0);
        
        setPrediction(data);
        if (onPredictionUpdate) {
          onPredictionUpdate(data);
        }
      } catch (err: any) {
        console.error('Prediction error:', err);
        setError(err.message || '성과 예측을 불러오는데 실패했습니다');
        toast.error(err.message || '성과 예측을 불러오는데 실패했습니다');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrediction();
  }, [selectedMessage, purpose, target, tone, rateLimitUntil]);

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
            {rateLimitUntil && Date.now() < rateLimitUntil && (
              <div className="mt-4 p-4 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg">
                <div className="flex items-center justify-center gap-2 text-[#991B1B]">
                  <span className="font-medium">
                    {remainingTime}초 후 자동으로 재시도 가능합니다
                  </span>
                </div>
                <div className="mt-2 w-full bg-[#FEE2E2] rounded-full h-2">
                  <div 
                    className="bg-[#EF4444] h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.max(0, 100 - (remainingTime / 60 * 100))}%` }}
                  />
                </div>
              </div>
            )}
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

'use client';

import { useState, useEffect } from 'react';
import { Message } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCard } from './message-card';
import { CardSkeleton } from '@/components/shared/loading-skeleton';
import { ErrorMessage } from '@/components/shared/error-message';
import { toast } from 'sonner';

interface MessageGeneratorProps {
  campaignData: any;
  onMessageSelect: (message: Message) => void;
  onMessagesGenerated?: (messages: Message[]) => void;
  selectedMessage: Message | null;
}

const RATE_LIMIT_KEY = 'ai_generate_rate_limit';

export function MessageGenerator({
  campaignData,
  onMessageSelect,
  onMessagesGenerated,
  selectedMessage,
}: MessageGeneratorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitUntil, setRateLimitUntil] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  // Check for existing rate limit on mount and set up timer
  useEffect(() => {
    const checkRateLimit = () => {
      const storedLimit = localStorage.getItem(RATE_LIMIT_KEY);
      if (storedLimit) {
        const limitTime = parseInt(storedLimit);
        const now = Date.now();
        
        if (limitTime > now) {
          setRateLimitUntil(limitTime);
          setRemainingTime(Math.ceil((limitTime - now) / 1000));
        } else {
          // Rate limit expired, clear it
          localStorage.removeItem(RATE_LIMIT_KEY);
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
          localStorage.removeItem(RATE_LIMIT_KEY);
          setRateLimitUntil(null);
          setRemainingTime(0);
          setError(null);
          toast.success('이제 다시 메시지를 생성할 수 있습니다');
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [rateLimitUntil]);

  const generateMessages = async () => {
    // Check if rate limited
    if (rateLimitUntil && Date.now() < rateLimitUntil) {
      const remaining = Math.ceil((rateLimitUntil - Date.now()) / 1000);
      toast.error(`요청 한도를 초과했습니다. ${remaining}초 후 다시 시도해주세요.`);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const includeKeywords = campaignData.includeKeywords
        ? campaignData.includeKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
        : [];
      
      const excludeKeywords = campaignData.excludeKeywords
        ? campaignData.excludeKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
        : [];

      const purpose = campaignData.purpose === '직접 입력' 
        ? campaignData.customPurpose 
        : campaignData.purpose;

      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          purpose,
          target: campaignData.target,
          tone: campaignData.tone,
          mainMessage: campaignData.mainMessage,
          includeKeywords,
          excludeKeywords,
          useEmoji: campaignData.useEmoji,
          sentenceLength: campaignData.sentenceLength,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          const retryAfter = errorData.retryAfter || 60;
          const limitUntil = Date.now() + (retryAfter * 1000);
          
          // Store rate limit in localStorage
          localStorage.setItem(RATE_LIMIT_KEY, limitUntil.toString());
          setRateLimitUntil(limitUntil);
          setRemainingTime(retryAfter);
          
          throw new Error(`요청 한도를 초과했습니다. ${retryAfter}초 후 재시도 가능합니다.`);
        }
        throw new Error(errorData.error || '메시지 생성에 실패했습니다');
      }

      const data = await response.json();
      
      // Clear any existing rate limit on success
      localStorage.removeItem(RATE_LIMIT_KEY);
      setRateLimitUntil(null);
      setRemainingTime(0);
      
      setMessages(data.messages);
      if (onMessagesGenerated) {
        onMessagesGenerated(data.messages);
      }
      toast.success(`${data.messages.length}개의 메시지가 생성되었습니다`);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async () => {
    await generateMessages();
  };

  const handleEdit = (message: Message) => {
    toast.info('수동 편집 기능은 곧 추가될 예정입니다');
  };

  if (!campaignData.title || !campaignData.purpose || !campaignData.target) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold text-[#1E293B] mb-4">메시지 생성</h2>
        <p className="text-[#64748B]">
          먼저 캠페인 정보를 입력해주세요.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#1E293B]">메시지 생성</h2>
        {messages.length > 0 && (
          <div className="flex items-center gap-2">
            {rateLimitUntil && Date.now() < rateLimitUntil && (
              <span className="text-sm text-[#EF4444]">
                {remainingTime}초 후 재시도 가능
              </span>
            )}
            <Button
              onClick={handleRegenerate}
              variant="outline"
              disabled={isGenerating || (rateLimitUntil !== null && Date.now() < rateLimitUntil)}
            >
              {rateLimitUntil && Date.now() < rateLimitUntil
                ? `다시 생성 (${remainingTime}초)`
                : '다시 생성'}
            </Button>
          </div>
        )}
      </div>

      {messages.length === 0 && !isGenerating && !error && (
        <div className="text-center py-8">
          <p className="text-[#64748B] mb-4">
            AI가 캠페인 정보를 바탕으로 최적화된 메시지를 생성합니다.
          </p>
          <Button
            onClick={generateMessages}
            className="bg-[#5FB3B3] hover:bg-[#4FA3A3]"
            disabled={isGenerating || (rateLimitUntil !== null && Date.now() < rateLimitUntil)}
          >
            {rateLimitUntil && Date.now() < rateLimitUntil
              ? `메시지 생성 (${remainingTime}초 후 가능)`
              : '메시지 생성'}
          </Button>
          {rateLimitUntil && Date.now() < rateLimitUntil && (
            <p className="text-sm text-[#EF4444] mt-2">
              요청 한도 초과: {remainingTime}초 후 다시 시도할 수 있습니다
            </p>
          )}
        </div>
      )}

      {isGenerating && (
        <div className="space-y-4">
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#5FB3B3] mb-2"></div>
            <p className="text-[#64748B]">메시지를 생성하고 있습니다...</p>
            <p className="text-sm text-[#94A3B8] mt-1">5-10초 정도 소요됩니다</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      )}

      {error && (
        <div>
          <ErrorMessage
            message={error}
            retry={rateLimitUntil && Date.now() < rateLimitUntil ? undefined : generateMessages}
          />
          {rateLimitUntil && Date.now() < rateLimitUntil && (
            <div className="mt-4 p-4 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg">
              <div className="flex items-center gap-2 text-[#991B1B]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
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

      {messages.length > 0 && !isGenerating && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {messages.map((message, index) => (
            <MessageCard
              key={index}
              message={message}
              index={index}
              isSelected={selectedMessage === message}
              onSelect={() => onMessageSelect(message)}
              onRegenerate={handleRegenerate}
              onEdit={() => handleEdit(message)}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

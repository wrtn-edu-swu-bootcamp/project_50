'use client';

import { useState } from 'react';
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

export function MessageGenerator({
  campaignData,
  onMessageSelect,
  onMessagesGenerated,
  selectedMessage,
}: MessageGeneratorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMessages = async () => {
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
          throw new Error(`${errorData.error} (${retryAfter}초 후 재시도 가능)`);
        }
        throw new Error(errorData.error || '메시지 생성에 실패했습니다');
      }

      const data = await response.json();
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
          <Button
            onClick={handleRegenerate}
            variant="outline"
            disabled={isGenerating}
          >
            다시 생성
          </Button>
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
            disabled={isGenerating}
          >
            메시지 생성
          </Button>
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
        <ErrorMessage
          message={error}
          retry={generateMessages}
        />
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

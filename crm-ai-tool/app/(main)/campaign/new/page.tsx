'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CampaignInfoForm, CampaignInfoFormData } from '@/components/campaign/campaign-info-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Message } from '@/types';
import { CampaignFormSkeleton } from '@/components/shared/loading-skeleton';
import { toast } from 'sonner';

// 무거운 컴포넌트 동적 임포트
const MessageGenerator = dynamic(
  () => import('@/components/campaign/message-generator').then(mod => ({ default: mod.MessageGenerator })),
  { loading: () => <CampaignFormSkeleton />, ssr: false }
);

const PerformancePrediction = dynamic(
  () => import('@/components/campaign/performance-prediction').then(mod => ({ default: mod.PerformancePrediction })),
  { ssr: false }
);

export default function NewCampaignPage() {
  const router = useRouter();
  const [campaignData, setCampaignData] = useState<CampaignInfoFormData | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [predictionData, setPredictionData] = useState<any>(null);

  const handleFormSubmit = (data: CampaignInfoFormData) => {
    setCampaignData(data);
    toast.success('캠페인 정보가 저장되었습니다');
  };

  const handleMessageSelect = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleSaveCampaign = async (status: 'draft' | 'completed') => {
    if (!campaignData || !selectedMessage) {
      toast.error('캠페인 정보와 메시지를 선택해주세요');
      return;
    }

    setIsSaving(true);

    try {
      const includeKeywords = campaignData.includeKeywords
        ? campaignData.includeKeywords.split(',').map(k => k.trim()).filter(Boolean)
        : [];
      
      const excludeKeywords = campaignData.excludeKeywords
        ? campaignData.excludeKeywords.split(',').map(k => k.trim()).filter(Boolean)
        : [];

      const purpose = campaignData.purpose === '직접 입력' 
        ? campaignData.customPurpose || campaignData.purpose
        : campaignData.purpose;

      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: campaignData.title,
          purpose,
          target: campaignData.target,
          tone: campaignData.tone,
          mainMessage: campaignData.mainMessage,
          includeKeywords,
          excludeKeywords,
          useEmoji: campaignData.useEmoji,
          sentenceLength: campaignData.sentenceLength,
          messages: allMessages,
          selectedMessage,
          status,
          predictedCtr: predictionData?.predictedCtr,
          predictedConversion: predictionData?.predictedConversion,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '캠페인 저장에 실패했습니다');
      }

      const data = await response.json();
      toast.success(data.message);
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAsTemplate = async () => {
    if (!campaignData) {
      toast.error('캠페인 정보를 먼저 입력해주세요');
      return;
    }

    try {
      const includeKeywords = campaignData.includeKeywords
        ? campaignData.includeKeywords.split(',').map(k => k.trim()).filter(Boolean)
        : [];
      
      const excludeKeywords = campaignData.excludeKeywords
        ? campaignData.excludeKeywords.split(',').map(k => k.trim()).filter(Boolean)
        : [];

      const purpose = campaignData.purpose === '직접 입력' 
        ? campaignData.customPurpose || campaignData.purpose
        : campaignData.purpose;

      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: campaignData.title,
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
        throw new Error(errorData.error || '템플릿 저장에 실패했습니다');
      }

      toast.success('템플릿으로 저장되었습니다');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleCopyMessage = () => {
    if (!selectedMessage) {
      toast.error('메시지를 먼저 선택해주세요');
      return;
    }

    const messageText = `${selectedMessage.title}\n${selectedMessage.subtitle}\n${selectedMessage.content1}${selectedMessage.content2 ? '\n' + selectedMessage.content2 : ''}\n${selectedMessage.footer}`;
    
    navigator.clipboard.writeText(messageText);
    toast.success('메시지가 클립보드에 복사되었습니다');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">새 캠페인 만들기</h1>

      <div className="space-y-6">
        <section>
          <CampaignInfoForm
            onSubmit={handleFormSubmit}
            defaultValues={campaignData || undefined}
          />
        </section>

        {campaignData && (
          <section>
            <MessageGenerator
              campaignData={campaignData}
              onMessageSelect={(message) => {
                setSelectedMessage(message);
              }}
              onMessagesGenerated={(messages) => {
                setAllMessages(messages);
              }}
              selectedMessage={selectedMessage}
            />
          </section>
        )}

        {selectedMessage && campaignData && (
          <section>
            <PerformancePrediction
              selectedMessage={selectedMessage}
              purpose={
                campaignData.purpose === '직접 입력'
                  ? campaignData.customPurpose || campaignData.purpose
                  : campaignData.purpose
              }
              target={campaignData.target}
              tone={campaignData.tone}
              onPredictionUpdate={setPredictionData}
            />
          </section>
        )}

        <section>
          <Card className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-3">
              <Button
                onClick={() => handleSaveCampaign('completed')}
                disabled={!selectedMessage || isSaving}
                className="bg-[#5FB3B3] hover:bg-[#4FA3A3] w-full sm:w-auto"
              >
                {isSaving ? '저장 중...' : '캠페인 저장'}
              </Button>
              <Button
                onClick={() => handleSaveCampaign('draft')}
                disabled={!selectedMessage || isSaving}
                variant="outline"
                className="border-[#5FB3B3] text-[#5FB3B3] hover:bg-[#F0F9F9] w-full sm:w-auto"
              >
                임시 저장
              </Button>
              <Button
                onClick={handleSaveAsTemplate}
                disabled={!campaignData}
                variant="outline"
                className="w-full sm:w-auto"
              >
                템플릿으로 저장
              </Button>
              <Button
                onClick={handleCopyMessage}
                disabled={!selectedMessage}
                variant="outline"
                className="w-full sm:w-auto"
              >
                메시지 복사
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

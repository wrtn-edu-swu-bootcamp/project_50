'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { CAMPAIGN_PURPOSES, TARGET_AUDIENCES, TONE_OPTIONS, SENTENCE_LENGTH_OPTIONS } from '@/lib/constants/campaign';
import { useState } from 'react';
import { TemplateSelector } from './template-selector';
import { Template } from '@/types';

const campaignInfoSchema = z.object({
  title: z.string().min(1, '캠페인 제목을 입력해주세요'),
  purpose: z.string().min(1, '캠페인 목적을 선택해주세요'),
  customPurpose: z.string().optional(),
  target: z.string().min(1, '타겟 고객을 선택해주세요'),
  mainMessage: z.string().min(1, '주요 메시지를 입력해주세요'),
  tone: z.string().min(1, '톤앤매너를 선택해주세요'),
  useEmoji: z.boolean(),
  sentenceLength: z.string(),
  includeKeywords: z.string().optional(),
  excludeKeywords: z.string().optional(),
});

export type CampaignInfoFormData = z.infer<typeof campaignInfoSchema>;

interface CampaignInfoFormProps {
  onSubmit: (data: CampaignInfoFormData) => void;
  defaultValues?: Partial<CampaignInfoFormData>;
}

export function CampaignInfoForm({ onSubmit, defaultValues }: CampaignInfoFormProps) {
  const [showCustomPurpose, setShowCustomPurpose] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CampaignInfoFormData>({
    resolver: zodResolver(campaignInfoSchema),
    defaultValues: {
      useEmoji: false,
      sentenceLength: '보통',
      ...defaultValues,
    },
  });

  const purposeValue = watch('purpose');

  const handlePurposeChange = (value: string) => {
    setValue('purpose', value);
    setShowCustomPurpose(value === '직접 입력');
  };

  const handleTemplateSelect = (template: Template) => {
    setValue('title', template.name);
    setValue('purpose', template.purpose);
    setValue('target', template.target);
    setValue('mainMessage', template.mainMessage);
    setValue('tone', template.tone);
    setValue('useEmoji', template.useEmoji || false);
    setValue('sentenceLength', template.sentenceLength || '보통');
    
    if (template.includeKeywords && Array.isArray(template.includeKeywords)) {
      setValue('includeKeywords', template.includeKeywords.join(', '));
    }
    
    if (template.excludeKeywords && Array.isArray(template.excludeKeywords)) {
      setValue('excludeKeywords', template.excludeKeywords.join(', '));
    }
    
    setShowCustomPurpose(template.purpose === '직접 입력');
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#1E293B]">캠페인 정보 입력</h2>
        <TemplateSelector onSelect={handleTemplateSelect} />
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            캠페인 제목 *
          </label>
          <Input
            {...register('title')}
            placeholder="예: 봄 신상품 프로모션"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            캠페인 목적 *
          </label>
          <select
            {...register('purpose')}
            onChange={(e) => handlePurposeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5FB3B3]"
          >
            <option value="">선택해주세요</option>
            {CAMPAIGN_PURPOSES.map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
          {errors.purpose && (
            <p className="text-sm text-red-500 mt-1">{errors.purpose.message}</p>
          )}
        </div>

        {showCustomPurpose && (
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">
              목적 직접 입력
            </label>
            <Input
              {...register('customPurpose')}
              placeholder="캠페인 목적을 입력해주세요"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            타겟 고객 *
          </label>
          <select
            {...register('target')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5FB3B3]"
          >
            <option value="">선택해주세요</option>
            {TARGET_AUDIENCES.map((target) => (
              <option key={target} value={target}>
                {target}
              </option>
            ))}
          </select>
          {errors.target && (
            <p className="text-sm text-red-500 mt-1">{errors.target.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            주요 메시지 *
          </label>
          <Textarea
            {...register('mainMessage')}
            placeholder="고객에게 전달하고 싶은 핵심 메시지를 입력해주세요"
            rows={4}
            className={errors.mainMessage ? 'border-red-500' : ''}
          />
          {errors.mainMessage && (
            <p className="text-sm text-red-500 mt-1">{errors.mainMessage.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            톤앤매너 *
          </label>
          <select
            {...register('tone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5FB3B3]"
          >
            <option value="">선택해주세요</option>
            {TONE_OPTIONS.map((tone) => (
              <option key={tone} value={tone}>
                {tone}
              </option>
            ))}
          </select>
          {errors.tone && (
            <p className="text-sm text-red-500 mt-1">{errors.tone.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('useEmoji')}
                className="w-4 h-4 text-[#5FB3B3] border-gray-300 rounded focus:ring-[#5FB3B3]"
              />
              <span className="text-sm font-medium text-[#1E293B]">이모지 사용</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">
              문장 길이
            </label>
            <select
              {...register('sentenceLength')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5FB3B3]"
            >
              {SENTENCE_LENGTH_OPTIONS.map((length) => (
                <option key={length} value={length}>
                  {length}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            포함 키워드 (선택)
          </label>
          <Input
            {...register('includeKeywords')}
            placeholder="쉼표로 구분하여 입력 (예: 할인, 특가, 신상품)"
          />
          <p className="text-xs text-[#64748B] mt-1">
            메시지에 반드시 포함되어야 할 키워드를 입력하세요
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            제외 키워드 (선택)
          </label>
          <Input
            {...register('excludeKeywords')}
            placeholder="쉼표로 구분하여 입력 (예: 마감, 종료)"
          />
          <p className="text-xs text-[#64748B] mt-1">
            메시지에서 제외할 키워드를 입력하세요
          </p>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="bg-[#5FB3B3] hover:bg-[#4FA3A3] px-8"
          >
            다음
          </Button>
        </div>
      </form>
    </Card>
  );
}

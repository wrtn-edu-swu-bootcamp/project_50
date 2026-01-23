'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { templateSchema, TemplateFormData } from '@/lib/validations/template';
import { CAMPAIGN_PURPOSES, TARGET_AUDIENCES, TONE_OPTIONS, SENTENCE_LENGTH_OPTIONS } from '@/lib/constants/campaign';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface TemplateFormProps {
  initialData?: Partial<TemplateFormData>;
  onSubmit: (data: TemplateFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TemplateForm({ initialData, onSubmit, onCancel, isLoading }: TemplateFormProps) {
  const [includeKeywordInput, setIncludeKeywordInput] = useState('');
  const [excludeKeywordInput, setExcludeKeywordInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      purpose: initialData?.purpose || '',
      target: initialData?.target || '',
      tone: initialData?.tone || '',
      mainMessage: initialData?.mainMessage || '',
      includeKeywords: initialData?.includeKeywords || [],
      excludeKeywords: initialData?.excludeKeywords || [],
      useEmoji: initialData?.useEmoji || false,
      sentenceLength: initialData?.sentenceLength || '보통',
    },
  });

  const includeKeywords = watch('includeKeywords') || [];
  const excludeKeywords = watch('excludeKeywords') || [];
  const useEmoji = watch('useEmoji');

  const addIncludeKeyword = () => {
    if (includeKeywordInput.trim()) {
      setValue('includeKeywords', [...includeKeywords, includeKeywordInput.trim()]);
      setIncludeKeywordInput('');
    }
  };

  const removeIncludeKeyword = (index: number) => {
    setValue('includeKeywords', includeKeywords.filter((_, i) => i !== index));
  };

  const addExcludeKeyword = () => {
    if (excludeKeywordInput.trim()) {
      setValue('excludeKeywords', [...excludeKeywords, excludeKeywordInput.trim()]);
      setExcludeKeywordInput('');
    }
  };

  const removeExcludeKeyword = (index: number) => {
    setValue('excludeKeywords', excludeKeywords.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* 템플릿명 */}
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          템플릿명 <span className="text-red-500">*</span>
        </label>
        <Input
          {...register('name')}
          placeholder="예: 신상품 프로모션 템플릿"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* 캠페인 목적 */}
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          캠페인 목적 <span className="text-red-500">*</span>
        </label>
        <Select
          value={watch('purpose')}
          onValueChange={(value) => setValue('purpose', value)}
        >
          <SelectTrigger className={errors.purpose ? 'border-red-500' : ''}>
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {CAMPAIGN_PURPOSES.map((purpose) => (
              <SelectItem key={purpose} value={purpose}>
                {purpose}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.purpose && (
          <p className="text-sm text-red-600 mt-1">{errors.purpose.message}</p>
        )}
      </div>

      {/* 타겟 고객 */}
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          타겟 고객 <span className="text-red-500">*</span>
        </label>
        <Select
          value={watch('target')}
          onValueChange={(value) => setValue('target', value)}
        >
          <SelectTrigger className={errors.target ? 'border-red-500' : ''}>
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {TARGET_AUDIENCES.map((target) => (
              <SelectItem key={target} value={target}>
                {target}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.target && (
          <p className="text-sm text-red-600 mt-1">{errors.target.message}</p>
        )}
      </div>

      {/* 톤앤매너 */}
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          톤앤매너 <span className="text-red-500">*</span>
        </label>
        <Select
          value={watch('tone')}
          onValueChange={(value) => setValue('tone', value)}
        >
          <SelectTrigger className={errors.tone ? 'border-red-500' : ''}>
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {TONE_OPTIONS.map((tone) => (
              <SelectItem key={tone} value={tone}>
                {tone}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tone && (
          <p className="text-sm text-red-600 mt-1">{errors.tone.message}</p>
        )}
      </div>

      {/* 주요 메시지 */}
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          주요 메시지 <span className="text-red-500">*</span>
        </label>
        <Textarea
          {...register('mainMessage')}
          placeholder="예: 신상품 20% 할인, 오늘 하루만 특가"
          rows={3}
          className={errors.mainMessage ? 'border-red-500' : ''}
        />
        {errors.mainMessage && (
          <p className="text-sm text-red-600 mt-1">{errors.mainMessage.message}</p>
        )}
      </div>

      {/* 옵션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useEmoji}
              onChange={(e) => setValue('useEmoji', e.target.checked)}
              className="w-4 h-4 text-[#5FB3B3] border-gray-300 rounded focus:ring-[#5FB3B3]"
            />
            <span className="text-sm font-medium text-[#1E293B]">이모지 사용</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            문장 길이
          </label>
          <Select
            value={watch('sentenceLength') || '보통'}
            onValueChange={(value) => setValue('sentenceLength', value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SENTENCE_LENGTH_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 포함할 키워드 */}
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          포함할 키워드 (선택사항)
        </label>
        <div className="flex space-x-2 mb-2">
          <Input
            value={includeKeywordInput}
            onChange={(e) => setIncludeKeywordInput(e.target.value)}
            placeholder="키워드 입력"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addIncludeKeyword();
              }
            }}
          />
          <Button type="button" onClick={addIncludeKeyword} variant="outline">
            추가
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {includeKeywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#5FB3B3] text-white"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeIncludeKeyword(index)}
                className="ml-2 hover:text-gray-200"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* 제외할 표현 */}
      <div>
        <label className="block text-sm font-medium text-[#1E293B] mb-2">
          제외할 표현 (선택사항)
        </label>
        <div className="flex space-x-2 mb-2">
          <Input
            value={excludeKeywordInput}
            onChange={(e) => setExcludeKeywordInput(e.target.value)}
            placeholder="표현 입력"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addExcludeKeyword();
              }
            }}
          />
          <Button type="button" onClick={addExcludeKeyword} variant="outline">
            추가
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {excludeKeywords.map((keyword, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-200 text-[#1E293B]"
            >
              {keyword}
              <button
                type="button"
                onClick={() => removeExcludeKeyword(index)}
                className="ml-2 hover:text-gray-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" onClick={onCancel} variant="outline" disabled={isLoading}>
          취소
        </Button>
        <Button
          type="submit"
          className="bg-[#5FB3B3] hover:bg-[#4A9999] text-white"
          disabled={isLoading}
        >
          {isLoading ? '저장 중...' : '저장'}
        </Button>
      </div>
    </form>
  );
}

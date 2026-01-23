'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import { SettingsFormData } from '@/lib/validations/settings';

interface WritingRulesSettingsProps {
  register: UseFormRegister<SettingsFormData>;
  setValue: UseFormSetValue<SettingsFormData>;
  watch: UseFormWatch<SettingsFormData>;
  errors: FieldErrors<SettingsFormData>;
}

const DEFAULT_RULES = [
  '직관적 표현 사용',
  '감성적/커머셜 표현 금지',
  '제목과 첫째줄 문장 분리',
  '항상 존댓말 사용',
];

export function WritingRulesSettings({ register, setValue, watch, errors }: WritingRulesSettingsProps) {
  const writingRules = watch('writingRules') || [];

  const toggleRule = (rule: string) => {
    const currentRules = writingRules || [];
    if (currentRules.includes(rule)) {
      setValue('writingRules', currentRules.filter((r) => r !== rule));
    } else {
      setValue('writingRules', [...currentRules, rule]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#1E293B]">
          작성 규칙 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-3">
            기본 작성 규칙
          </label>
          <div className="space-y-2">
            {DEFAULT_RULES.map((rule) => (
              <label key={rule} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={writingRules.includes(rule)}
                  onChange={() => toggleRule(rule)}
                  className="w-4 h-4 text-[#5FB3B3] border-gray-300 rounded focus:ring-[#5FB3B3]"
                />
                <span className="text-sm text-[#475569]">{rule}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            필수 포함 문구
          </label>
          <Textarea
            {...register('requiredFooter')}
            rows={2}
            className={errors.requiredFooter ? 'border-red-500' : ''}
          />
          {errors.requiredFooter && (
            <p className="text-sm text-red-600 mt-1">{errors.requiredFooter.message}</p>
          )}
          <p className="text-xs text-[#64748B] mt-1">
            모든 메시지 하단에 자동으로 추가됩니다
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

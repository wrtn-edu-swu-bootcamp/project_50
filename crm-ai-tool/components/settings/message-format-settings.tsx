'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { SettingsFormData } from '@/lib/validations/settings';

interface MessageFormatSettingsProps {
  register: UseFormRegister<SettingsFormData>;
  errors: FieldErrors<SettingsFormData>;
}

export function MessageFormatSettings({ register, errors }: MessageFormatSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#1E293B]">
          메시지 포맷 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            제목 최대 글자수
          </label>
          <Input
            type="number"
            {...register('titleMaxLength', { valueAsNumber: true })}
            className={errors.titleMaxLength ? 'border-red-500' : ''}
          />
          {errors.titleMaxLength && (
            <p className="text-sm text-red-600 mt-1">{errors.titleMaxLength.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            소제목 최대 글자수
          </label>
          <Input
            type="number"
            {...register('subtitleMaxLength', { valueAsNumber: true })}
            className={errors.subtitleMaxLength ? 'border-red-500' : ''}
          />
          {errors.subtitleMaxLength && (
            <p className="text-sm text-red-600 mt-1">{errors.subtitleMaxLength.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            내용 줄당 최대 글자수
          </label>
          <Input
            type="number"
            {...register('contentMaxLength', { valueAsNumber: true })}
            className={errors.contentMaxLength ? 'border-red-500' : ''}
          />
          {errors.contentMaxLength && (
            <p className="text-sm text-red-600 mt-1">{errors.contentMaxLength.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

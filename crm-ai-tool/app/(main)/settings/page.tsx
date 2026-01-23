'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema, SettingsFormData, DEFAULT_SETTINGS } from '@/lib/validations/settings';
import { Button } from '@/components/ui/button';
import { MessageFormatSettings } from '@/components/settings/message-format-settings';
import { WritingRulesSettings } from '@/components/settings/writing-rules-settings';
import { ForbiddenWordsSettings } from '@/components/settings/forbidden-words-settings';
import { CardSkeleton } from '@/components/shared/loading-skeleton';
import { ErrorMessage } from '@/components/shared/error-message';
import { toast } from 'sonner';
import { RotateCcw } from 'lucide-react';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema) as any,
    defaultValues: DEFAULT_SETTINGS,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('설정을 불러오는데 실패했습니다');
      const data = await response.json();
      reset(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: SettingsFormData) => {
    try {
      setIsSaving(true);
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('설정 저장에 실패했습니다');

      toast.success('설정이 저장되었습니다');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('설정을 기본값으로 초기화하시겠습니까?')) return;

    try {
      setIsSaving(true);
      const response = await fetch('/api/settings', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('설정 초기화에 실패했습니다');

      const data = await response.json();
      reset(data);
      toast.success('설정이 기본값으로 초기화되었습니다');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-[#1E293B] mb-6">설정</h1>
        <div className="space-y-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-[#1E293B] mb-6">설정</h1>
        <ErrorMessage message={error} retry={fetchSettings} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#1E293B]">설정</h1>
        <Button
          onClick={handleReset}
          variant="outline"
          disabled={isSaving}
          className="text-[#475569]"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          기본값으로 초기화
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 메시지 포맷 설정 */}
        <MessageFormatSettings register={register} errors={errors} />

        {/* 작성 규칙 설정 */}
        <WritingRulesSettings
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />

        {/* 금지 표현 관리 */}
        <ForbiddenWordsSettings setValue={setValue} watch={watch} />

        {/* 저장 버튼 */}
        <div className="flex justify-end space-x-3 pt-4 sticky bottom-0 bg-white py-4 border-t">
          <Button
            type="submit"
            className="bg-[#5FB3B3] hover:bg-[#4A9999] text-white"
            disabled={isSaving}
          >
            {isSaving ? '저장 중...' : '설정 저장'}
          </Button>
        </div>
      </form>
    </div>
  );
}

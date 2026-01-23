'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { SettingsFormData } from '@/lib/validations/settings';

interface ForbiddenWordsSettingsProps {
  setValue: UseFormSetValue<SettingsFormData>;
  watch: UseFormWatch<SettingsFormData>;
}

export function ForbiddenWordsSettings({ setValue, watch }: ForbiddenWordsSettingsProps) {
  const [inputValue, setInputValue] = useState('');
  const forbiddenWords = watch('forbiddenWords') || [];

  const addWord = () => {
    const word = inputValue.trim();
    if (word && !forbiddenWords.includes(word)) {
      setValue('forbiddenWords', [...forbiddenWords, word]);
      setInputValue('');
    }
  };

  const removeWord = (word: string) => {
    setValue('forbiddenWords', forbiddenWords.filter((w) => w !== word));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#1E293B]">
          금지 표현 관리
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#1E293B] mb-2">
            금지 표현 추가
          </label>
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="금지할 표현 입력"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addWord();
                }
              }}
            />
            <Button type="button" onClick={addWord} variant="outline">
              추가
            </Button>
          </div>
        </div>

        {forbiddenWords.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-[#1E293B] mb-2">
              등록된 금지 표현 ({forbiddenWords.length}개)
            </label>
            <div className="flex flex-wrap gap-2">
              {forbiddenWords.map((word) => (
                <Badge key={word} variant="error" className="flex items-center space-x-1">
                  <span>{word}</span>
                  <button
                    type="button"
                    onClick={() => removeWord(word)}
                    className="hover:bg-red-700 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {forbiddenWords.length === 0 && (
          <p className="text-sm text-[#64748B]">
            등록된 금지 표현이 없습니다. AI가 메시지 생성 시 피해야 할 표현을 추가해주세요.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

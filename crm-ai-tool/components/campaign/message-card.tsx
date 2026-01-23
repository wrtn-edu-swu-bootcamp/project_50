'use client';

import { Message } from '@/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MessageCardProps {
  message: Message;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onRegenerate: () => void;
  onEdit: () => void;
}

export function MessageCard({
  message,
  index,
  isSelected,
  onSelect,
  onRegenerate,
  onEdit,
}: MessageCardProps) {
  const optimizationScore = message.optimizationScore || 0;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <Card
      className={`p-4 transition-all ${
        isSelected
          ? 'border-2 border-[#5FB3B3] shadow-lg'
          : 'border border-gray-200 hover:border-[#5FB3B3]'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <Badge variant="outline" className="text-xs">
          옵션 {index + 1}
        </Badge>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getScoreBgColor(optimizationScore)}`}>
          <span className="text-xs font-medium text-[#64748B]">최적화 점수</span>
          <span className={`text-sm font-bold ${getScoreColor(optimizationScore)}`}>
            {optimizationScore}/100
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="bg-[#F8FAFC] p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-[#64748B]">제목</span>
            <span className="text-xs text-[#64748B]">
              {message.title.length}/20
            </span>
          </div>
          <p className="text-base font-bold text-[#1E293B]">{message.title}</p>
        </div>

        {message.subtitle && (
          <div className="bg-[#F8FAFC] p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[#64748B]">소제목</span>
              <span className="text-xs text-[#64748B]">
                {message.subtitle.length}/16
              </span>
            </div>
            <p className="text-sm text-[#475569]">{message.subtitle}</p>
          </div>
        )}

        <div className="bg-[#F8FAFC] p-3 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-[#64748B]">내용</span>
            <span className="text-xs text-[#64748B]">
              {message.content1.length}/22
            </span>
          </div>
          <p className="text-sm text-[#1E293B]">{message.content1}</p>
        </div>

        {message.content2 && (
          <div className="bg-[#F8FAFC] p-3 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[#64748B]">내용 2</span>
              <span className="text-xs text-[#64748B]">
                {message.content2.length}/22
              </span>
            </div>
            <p className="text-sm text-[#1E293B]">{message.content2}</p>
          </div>
        )}

        <div className="bg-gray-50 p-2 rounded">
          <p className="text-xs text-[#64748B]">{message.footer}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onSelect}
          className={`flex-1 ${
            isSelected
              ? 'bg-[#5FB3B3] hover:bg-[#4FA3A3]'
              : 'bg-white border border-[#5FB3B3] text-[#5FB3B3] hover:bg-[#F0F9F9]'
          }`}
        >
          {isSelected ? '선택됨' : '선택'}
        </Button>
        <Button
          onClick={onRegenerate}
          variant="outline"
          className="border-[#1E293B] text-[#1E293B] hover:bg-[#F8FAFC]"
        >
          재생성
        </Button>
        <Button
          onClick={onEdit}
          variant="ghost"
          className="text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC]"
        >
          수정
        </Button>
      </div>
    </Card>
  );
}

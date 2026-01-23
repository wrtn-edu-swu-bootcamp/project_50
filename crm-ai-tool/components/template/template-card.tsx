'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Edit, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils/date';

interface Template {
  id: string;
  name: string;
  purpose: string;
  target: string;
  tone: string;
  mainMessage: string;
  includeKeywords?: string[];
  excludeKeywords?: string[];
  useEmoji?: boolean;
  sentenceLength?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface TemplateCardProps {
  template: Template;
  onUse: (template: Template) => void;
  onEdit: (template: Template) => void;
  onDelete: (id: string) => void;
}

export function TemplateCard({ template, onUse, onEdit, onDelete }: TemplateCardProps) {
  const handleDelete = () => {
    if (window.confirm('정말 이 템플릿을 삭제하시겠습니까?')) {
      onDelete(template.id);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-[#5FB3B3]" />
            <CardTitle className="text-lg font-semibold text-[#1E293B]">
              {template.name}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{template.purpose}</Badge>
          <Badge variant="secondary">{template.target}</Badge>
          <Badge variant="secondary">{template.tone}</Badge>
        </div>
        <p className="text-sm text-[#475569] line-clamp-2">{template.mainMessage}</p>
        <div className="text-xs text-[#64748B] space-y-1">
          <p>생성일: {formatDate(template.createdAt)}</p>
          <p>수정일: {formatDate(template.updatedAt)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between space-x-2">
        <Button
          onClick={() => onUse(template)}
          className="flex-1 bg-[#5FB3B3] hover:bg-[#4A9999] text-white"
        >
          사용
        </Button>
        <Button
          onClick={() => onEdit(template)}
          variant="outline"
          size="icon"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleDelete}
          variant="outline"
          size="icon"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { TemplateCard } from '@/components/template/template-card';
import { TemplateForm } from '@/components/template/template-form';
import { TemplateFormData } from '@/lib/validations/template';
import { CardSkeleton } from '@/components/shared/loading-skeleton';
import { ErrorMessage } from '@/components/shared/error-message';
import { toast } from 'sonner';

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

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/templates');
      if (!response.ok) throw new Error('템플릿을 불러오는데 실패했습니다');
      const data = await response.json();
      setTemplates(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (data: TemplateFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('템플릿 생성에 실패했습니다');

      toast.success('템플릿이 생성되었습니다');
      setShowForm(false);
      fetchTemplates();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: TemplateFormData) => {
    if (!editingTemplate) return;

    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/templates/${editingTemplate.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('템플릿 수정에 실패했습니다');

      toast.success('템플릿이 수정되었습니다');
      setEditingTemplate(null);
      fetchTemplates();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/templates/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('템플릿 삭제에 실패했습니다');

      toast.success('템플릿이 삭제되었습니다');
      fetchTemplates();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUse = (template: Template) => {
    // 캠페인 작성 페이지로 이동하면서 템플릿 데이터 전달
    const params = new URLSearchParams({
      templateId: template.id,
    });
    router.push(`/campaign/new?${params.toString()}`);
  };

  const handleEdit = (template: Template) => {
    setEditingTemplate(template);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTemplate(null);
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-6">템플릿 관리</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-6">템플릿 관리</h1>
        <ErrorMessage message={error} retry={fetchTemplates} />
      </div>
    );
  }

  if (showForm || editingTemplate) {
    const initialData = editingTemplate ? {
      ...editingTemplate,
      sentenceLength: editingTemplate.sentenceLength || undefined,
    } : undefined;

    return (
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mb-6">
          {editingTemplate ? '템플릿 수정' : '새 템플릿 만들기'}
        </h1>
        <div className="max-w-2xl">
          <TemplateForm
            initialData={initialData}
            onSubmit={editingTemplate ? handleUpdate : handleCreate}
            onCancel={handleCancel}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">템플릿 관리</h1>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-[#5FB3B3] hover:bg-[#4A9999] text-white w-full sm:w-auto"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          새 템플릿 만들기
        </Button>
      </div>

      {templates.length === 0 ? (
        <div className="text-center py-12 px-4 text-[#64748B]">
          <p className="text-base sm:text-lg mb-2">저장된 템플릿이 없습니다</p>
          <p className="text-sm mb-4">새 템플릿을 만들어보세요!</p>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-[#5FB3B3] hover:bg-[#4A9999] text-white w-full sm:w-auto"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            새 템플릿 만들기
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onUse={handleUse}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Template } from '@/types';
import { toast } from 'sonner';

interface TemplateSelectorProps {
  onSelect: (template: Template) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/templates');
      if (!response.ok) throw new Error('템플릿을 불러올 수 없습니다');
      const data = await response.json();
      setTemplates(data);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
    fetchTemplates();
  };

  const handleSelectTemplate = (template: Template) => {
    onSelect(template);
    setShowModal(false);
    toast.success('템플릿이 적용되었습니다');
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        variant="outline"
        className="border-[#5FB3B3] text-[#5FB3B3] hover:bg-[#F0F9F9]"
      >
        템플릿 불러오기
      </Button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#1E293B]">템플릿 선택</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#64748B] hover:text-[#1E293B]"
              >
                ✕
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#5FB3B3]"></div>
                <p className="text-[#64748B] mt-2">템플릿을 불러오는 중...</p>
              </div>
            ) : templates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[#64748B]">저장된 템플릿이 없습니다</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="p-4 hover:border-[#5FB3B3] cursor-pointer transition-all"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <h3 className="font-bold text-[#1E293B] mb-2">{template.name}</h3>
                    <div className="space-y-1 text-sm text-[#64748B]">
                      <p><span className="font-medium">목적:</span> {template.purpose}</p>
                      <p><span className="font-medium">타겟:</span> {template.target}</p>
                      <p><span className="font-medium">톤:</span> {template.tone}</p>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-2">
                      {new Date(template.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';

export function PredictionEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[#F1F5F9] flex items-center justify-center mb-4">
        <Database className="w-8 h-8 text-[#64748B]" />
      </div>
      <h3 className="text-lg font-semibold text-[#1E293B] mb-2">
        성과 데이터가 연결되지 않았습니다
      </h3>
      <p className="text-sm text-[#64748B] mb-6 max-w-md">
        Google Sheets를 연결하면 과거 데이터 기반 성과 예측을 확인할 수 있습니다
      </p>
      <Link href="/dashboard">
        <Button variant="default" className="bg-[#5FB3B3] hover:bg-[#4A9999]">
          대시보드에서 연결하기
        </Button>
      </Link>
    </div>
  );
}

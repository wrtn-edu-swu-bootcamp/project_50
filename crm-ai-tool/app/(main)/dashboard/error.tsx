'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-red-600">대시보드 로딩 오류</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            대시보드를 불러오는 중 오류가 발생했습니다.
          </p>
          <div className="flex gap-2">
            <Button onClick={reset}>다시 시도</Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/campaign/new')}
            >
              새 캠페인 만들기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

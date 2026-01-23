'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-red-600">오류가 발생했습니다</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            예상치 못한 오류가 발생했습니다. 다시 시도해주세요.
          </p>
          {error.message && (
            <p className="text-sm text-gray-500 bg-gray-100 p-3 rounded">
              {error.message}
            </p>
          )}
          <div className="flex gap-2">
            <Button onClick={reset} className="flex-1">
              다시 시도
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/dashboard')}
              className="flex-1"
            >
              대시보드로 이동
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RefreshCw, Link as LinkIcon, Unlink } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/date';
import { toast } from 'sonner';

interface ConnectionStatusCardProps {
  status: 'connected' | 'disconnected' | 'error';
  lastSyncAt?: Date | string | null;
  sheetUrl?: string | null;
  onRefresh: () => void;
}

export function ConnectionStatusCard({ status, lastSyncAt, sheetUrl, onRefresh }: ConnectionStatusCardProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [inputSheetUrl, setInputSheetUrl] = useState(sheetUrl || '');

  const statusConfig = {
    connected: {
      label: '연결됨',
      color: 'bg-green-500',
      variant: 'success' as const,
    },
    disconnected: {
      label: '미연결',
      color: 'bg-gray-400',
      variant: 'secondary' as const,
    },
    error: {
      label: '오류',
      color: 'bg-red-500',
      variant: 'error' as const,
    },
  };

  const config = statusConfig[status];

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const response = await fetch('/api/sheets/auth');
      const data = await response.json();

      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else {
        toast.error('인증 URL 생성에 실패했습니다');
      }
    } catch (error) {
      toast.error('연결 중 오류가 발생했습니다');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSync = async () => {
    if (!inputSheetUrl && !sheetUrl) {
      toast.error('Google Sheets URL을 입력해주세요');
      return;
    }

    try {
      setIsSyncing(true);
      const response = await fetch('/api/sheets/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheetUrl: inputSheetUrl || sheetUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || '동기화가 완료되었습니다');
        onRefresh();
      } else {
        toast.error(data.error || '동기화에 실패했습니다');
      }
    } catch (error) {
      toast.error('동기화 중 오류가 발생했습니다');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleDisconnect = async () => {
    if (!confirm('Google Sheets 연결을 해제하시겠습니까?')) {
      return;
    }

    try {
      setIsDisconnecting(true);
      const response = await fetch('/api/sheets/disconnect', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || '연결이 해제되었습니다');
        onRefresh();
      } else {
        toast.error(data.error || '연결 해제에 실패했습니다');
      }
    } catch (error) {
      toast.error('연결 해제 중 오류가 발생했습니다');
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#1E293B]">
          성과 데이터 연결 상태
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-[#475569]">Google Sheets 연동</span>
            <Badge variant={config.variant} className="flex items-center space-x-1">
              <span className={`w-2 h-2 rounded-full ${config.color}`} />
              <span>{config.label}</span>
            </Badge>
          </div>
        </div>

        {lastSyncAt && (
          <p className="text-sm text-[#64748B]">
            마지막 동기화: {formatRelativeTime(lastSyncAt)}
          </p>
        )}

        {status === 'connected' && (
          <div className="space-y-3">
            {sheetUrl && (
              <p className="text-sm text-[#64748B] break-all">
                연결된 시트: {sheetUrl}
              </p>
            )}
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Google Sheets URL (선택사항)"
                value={inputSheetUrl}
                onChange={(e) => setInputSheetUrl(e.target.value)}
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSync}
                  disabled={isSyncing}
                  variant="default"
                  size="sm"
                  className="flex-1"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? '동기화 중...' : '지금 동기화'}
                </Button>
                <Button
                  onClick={handleDisconnect}
                  disabled={isDisconnecting}
                  variant="outline"
                  size="sm"
                >
                  <Unlink className="w-4 h-4 mr-2" />
                  연결 해제
                </Button>
              </div>
            </div>
          </div>
        )}

        {status === 'disconnected' && (
          <div className="space-y-3">
            <p className="text-sm text-[#64748B]">
              성과 예측을 사용하려면 Google Sheets를 연결해주세요.
            </p>
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              variant="default"
              size="sm"
              className="w-full sm:w-auto"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              {isConnecting ? '연결 중...' : 'Google Sheets 연결하기'}
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-3">
            <p className="text-sm text-red-600">
              연결에 문제가 발생했습니다. 권한을 확인해주세요.
            </p>
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              variant="default"
              size="sm"
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              다시 연결하기
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

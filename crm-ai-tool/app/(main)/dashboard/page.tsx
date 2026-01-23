'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PerformanceSummary } from '@/components/dashboard/performance-summary';
import { ConnectionStatusCard } from '@/components/dashboard/connection-status-card';
import { CampaignTable } from '@/components/dashboard/campaign-table';
import { DashboardSkeleton } from '@/components/shared/loading-skeleton';
import { toast } from 'sonner';

interface DashboardData {
  stats: {
    totalSends: number;
    avgCtr: number;
    avgConversionRate: number;
  };
  campaigns: any[];
  connection: any;
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<DashboardData>({
    stats: { totalSends: 0, avgCtr: 0, avgConversionRate: 0 },
    campaigns: [],
    connection: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, campaignsRes, connectionRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/campaigns'),
        fetch('/api/sheets/status'),
      ]);

      const stats = await statsRes.json();
      const campaignsData = await campaignsRes.json();
      const connection = await connectionRes.json();

      setData({
        stats: {
          totalSends: stats?.totalSends ?? 0,
          avgCtr: stats?.avgCtr ?? 0,
          avgConversionRate: stats?.avgConversionRate ?? 0,
        },
        campaigns: Array.isArray(campaignsData) ? campaignsData : [],
        connection: connection || null,
      });
    } catch (error) {
      console.error('대시보드 데이터 조회 실패:', error);
      toast.error('대시보드 데이터를 불러오는데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success === 'connected') {
      toast.success('Google Sheets가 성공적으로 연결되었습니다');
      router.replace('/dashboard');
    } else if (error) {
      const errorMessages: Record<string, string> = {
        auth_failed: '인증에 실패했습니다',
        no_code: '인증 코드가 없습니다',
        no_token: '토큰을 받지 못했습니다',
        callback_failed: '콜백 처리 중 오류가 발생했습니다',
      };
      toast.error(errorMessages[error] || '오류가 발생했습니다');
      router.replace('/dashboard');
    }
  }, [searchParams, router]);

  const connectionStatus = data.connection
    ? data.connection.status === 'connected'
      ? 'connected'
      : data.connection.status === 'error'
      ? 'error'
      : 'disconnected'
    : 'disconnected';

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">대시보드</h1>
      </div>

      <PerformanceSummary
        totalSends={data.stats.totalSends}
        avgCtr={data.stats.avgCtr}
        avgConversionRate={data.stats.avgConversionRate}
      />

      <ConnectionStatusCard
        status={connectionStatus as 'connected' | 'disconnected' | 'error'}
        lastSyncAt={data.connection?.lastSyncAt}
        sheetUrl={data.connection?.sheetUrl}
        onRefresh={fetchDashboardData}
      />

      <div>
        <h2 className="text-lg sm:text-xl font-semibold text-[#1E293B] mb-4">최근 캠페인</h2>
        <CampaignTable campaigns={data.campaigns} />
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/campaign/new" className="w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto bg-[#5FB3B3] hover:bg-[#4A9999] text-white">
            <PlusCircle className="w-5 h-5 mr-2" />
            새 캠페인 만들기
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

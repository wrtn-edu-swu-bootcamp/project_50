import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { performanceData } from '@/lib/db/schema';
import { sql } from 'drizzle-orm';

// 5분 캐싱
export const revalidate = 300;

// GET: 성과 요약 통계
export async function GET() {
  try {
    const stats = await db
      .select({
        totalSends: sql<number>`COALESCE(SUM(${performanceData.sendCount}), 0)`,
        avgCtr: sql<number>`COALESCE(AVG(${performanceData.ctr}), 0)`,
        avgConversionRate: sql<number>`COALESCE(AVG(${performanceData.conversionRate}), 0)`,
      })
      .from(performanceData);

    const result = stats[0] || {
      totalSends: 0,
      avgCtr: 0,
      avgConversionRate: 0,
    };

    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('통계 조회 실패:', error);
    return NextResponse.json(
      { error: '통계를 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

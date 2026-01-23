import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { campaigns } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

// 1분 캐싱
export const revalidate = 60;

// GET: 최근 캠페인 목록 (최신 10개)
export async function GET() {
  try {
    const recentCampaigns = await db
      .select()
      .from(campaigns)
      .orderBy(desc(campaigns.createdAt))
      .limit(10);

    return NextResponse.json(recentCampaigns, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('캠페인 조회 실패:', error);
    return NextResponse.json(
      { error: '캠페인을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

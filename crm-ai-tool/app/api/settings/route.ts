import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { settings } from '@/lib/db/schema';
import { settingsUpdateSchema, DEFAULT_SETTINGS } from '@/lib/validations/settings';
import { eq } from 'drizzle-orm';

const DEFAULT_USER_ID = 'default';

// 10분 캐싱
export const revalidate = 600;

// GET: 설정 조회
export async function GET() {
  try {
    const [userSettings] = await db
      .select()
      .from(settings)
      .where(eq(settings.userId, DEFAULT_USER_ID));

    // 설정이 없으면 기본값 반환
    if (!userSettings) {
      return NextResponse.json(DEFAULT_SETTINGS, {
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        },
      });
    }

    return NextResponse.json(userSettings, {
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    });
  } catch (error) {
    console.error('설정 조회 실패:', error);
    return NextResponse.json(
      { error: '설정을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

// PATCH: 설정 업데이트
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = settingsUpdateSchema.parse(body);

    // 기존 설정 확인
    const [existingSettings] = await db
      .select()
      .from(settings)
      .where(eq(settings.userId, DEFAULT_USER_ID));

    let result;

    if (existingSettings) {
      // 업데이트
      [result] = await db
        .update(settings)
        .set({
          ...validatedData,
          updatedAt: new Date(),
        })
        .where(eq(settings.userId, DEFAULT_USER_ID))
        .returning();
    } else {
      // 생성
      [result] = await db
        .insert(settings)
        .values({
          userId: DEFAULT_USER_ID,
          ...DEFAULT_SETTINGS,
          ...validatedData,
        })
        .returning();
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('설정 업데이트 실패:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '설정 업데이트에 실패했습니다' },
      { status: 500 }
    );
  }
}

// POST: 기본값으로 초기화
export async function POST() {
  try {
    const [existingSettings] = await db
      .select()
      .from(settings)
      .where(eq(settings.userId, DEFAULT_USER_ID));

    let result;

    if (existingSettings) {
      [result] = await db
        .update(settings)
        .set({
          ...DEFAULT_SETTINGS,
          updatedAt: new Date(),
        })
        .where(eq(settings.userId, DEFAULT_USER_ID))
        .returning();
    } else {
      [result] = await db
        .insert(settings)
        .values({
          userId: DEFAULT_USER_ID,
          ...DEFAULT_SETTINGS,
        })
        .returning();
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('설정 초기화 실패:', error);
    return NextResponse.json(
      { error: '설정 초기화에 실패했습니다' },
      { status: 500 }
    );
  }
}

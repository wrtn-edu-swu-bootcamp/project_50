import { cache } from 'react';
import { db } from '@/lib/db';
import { settings } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NewSettings } from '@/types';

const DEFAULT_USER_ID = 'default';

const DEFAULT_SETTINGS: NewSettings = {
  userId: DEFAULT_USER_ID,
  titleMaxLength: 20,
  subtitleMaxLength: 16,
  contentMaxLength: 22,
  requiredFooter: '수신거부: 마이페이지 > 설정',
  writingRules: [
    '직관적 표현 사용',
    '감성적/커머셜 표현 금지',
    '제목과 첫째줄 문장 분리',
    '항상 존댓말 사용',
  ],
  forbiddenWords: [],
};

export const getSettings = cache(async (userId: string = DEFAULT_USER_ID) => {
  const result = await db.select().from(settings).where(eq(settings.userId, userId)).limit(1);
  
  if (!result[0]) {
    // 설정이 없으면 기본값으로 생성
    return await createSettings(DEFAULT_SETTINGS);
  }
  
  return result[0];
});

export async function createSettings(data: NewSettings) {
  const result = await db.insert(settings).values(data).returning();
  return result[0];
}

export async function updateSettings(userId: string = DEFAULT_USER_ID, data: Partial<NewSettings>) {
  const existing = await getSettings(userId);
  
  if (!existing) {
    return await createSettings({ ...DEFAULT_SETTINGS, ...data, userId });
  }
  
  const result = await db
    .update(settings)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(settings.userId, userId))
    .returning();
  
  return result[0];
}

export async function resetSettings(userId: string = DEFAULT_USER_ID) {
  const result = await db
    .update(settings)
    .set({ ...DEFAULT_SETTINGS, updatedAt: new Date() })
    .where(eq(settings.userId, userId))
    .returning();
  
  return result[0] || null;
}

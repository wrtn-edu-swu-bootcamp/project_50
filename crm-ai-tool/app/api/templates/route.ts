import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { templates } from '@/lib/db/schema';
import { templateSchema } from '@/lib/validations/template';
import { desc } from 'drizzle-orm';

// GET: 템플릿 목록 조회
export async function GET() {
  try {
    const allTemplates = await db
      .select()
      .from(templates)
      .orderBy(desc(templates.createdAt));

    return NextResponse.json(allTemplates);
  } catch (error) {
    console.error('템플릿 조회 실패:', error);
    return NextResponse.json(
      { error: '템플릿을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

// POST: 템플릿 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = templateSchema.parse(body);

    const [newTemplate] = await db
      .insert(templates)
      .values({
        ...validatedData,
        includeKeywords: validatedData.includeKeywords || [],
        excludeKeywords: validatedData.excludeKeywords || [],
      })
      .returning();

    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error: any) {
    console.error('템플릿 생성 실패:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '템플릿 생성에 실패했습니다' },
      { status: 500 }
    );
  }
}

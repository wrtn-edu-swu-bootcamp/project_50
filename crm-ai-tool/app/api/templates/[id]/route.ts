import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { templates } from '@/lib/db/schema';
import { templateUpdateSchema } from '@/lib/validations/template';
import { eq } from 'drizzle-orm';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// GET: 단일 템플릿 조회
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const [template] = await db
      .select()
      .from(templates)
      .where(eq(templates.id, id));

    if (!template) {
      return NextResponse.json(
        { error: '템플릿을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error('템플릿 조회 실패:', error);
    return NextResponse.json(
      { error: '템플릿을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

// PATCH: 템플릿 수정
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = templateUpdateSchema.parse(body);

    const [updatedTemplate] = await db
      .update(templates)
      .set({
        ...validatedData,
        updatedAt: new Date(),
      })
      .where(eq(templates.id, id))
      .returning();

    if (!updatedTemplate) {
      return NextResponse.json(
        { error: '템플릿을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTemplate);
  } catch (error: any) {
    console.error('템플릿 수정 실패:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: '입력 데이터가 올바르지 않습니다', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '템플릿 수정에 실패했습니다' },
      { status: 500 }
    );
  }
}

// DELETE: 템플릿 삭제
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const [deletedTemplate] = await db
      .delete(templates)
      .where(eq(templates.id, id))
      .returning();

    if (!deletedTemplate) {
      return NextResponse.json(
        { error: '템플릿을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '템플릿이 삭제되었습니다' });
  } catch (error) {
    console.error('템플릿 삭제 실패:', error);
    return NextResponse.json(
      { error: '템플릿 삭제에 실패했습니다' },
      { status: 500 }
    );
  }
}

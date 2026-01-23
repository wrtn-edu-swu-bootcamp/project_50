import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createCampaign, getCampaigns } from '@/lib/db/queries/campaigns';
import { messageSchema } from '@/lib/validations/message';

const campaignSchema = z.object({
  title: z.string().min(1, '캠페인 제목을 입력해주세요'),
  purpose: z.string().min(1, '캠페인 목적을 입력해주세요'),
  target: z.string().min(1, '타겟 고객을 선택해주세요'),
  tone: z.string().min(1, '톤앤매너를 선택해주세요'),
  mainMessage: z.string().min(1, '주요 메시지를 입력해주세요'),
  includeKeywords: z.array(z.string()).optional(),
  excludeKeywords: z.array(z.string()).optional(),
  useEmoji: z.boolean(),
  sentenceLength: z.string().optional(),
  messages: z.array(messageSchema),
  selectedMessage: messageSchema,
  status: z.enum(['draft', 'completed', 'archived']).default('draft'),
});

export async function GET() {
  try {
    const campaigns = await getCampaigns();
    return NextResponse.json(campaigns);
  } catch (error) {
    console.error('Get campaigns error:', error);
    return NextResponse.json(
      { error: '캠페인 목록을 불러올 수 없습니다' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = campaignSchema.parse(body);

    const campaign = await createCampaign({
      title: validatedData.title,
      purpose: validatedData.purpose,
      target: validatedData.target,
      tone: validatedData.tone,
      mainMessage: validatedData.mainMessage,
      includeKeywords: validatedData.includeKeywords || null,
      excludeKeywords: validatedData.excludeKeywords || null,
      useEmoji: validatedData.useEmoji,
      sentenceLength: validatedData.sentenceLength || null,
      messages: validatedData.messages as any,
      selectedMessage: validatedData.selectedMessage as any,
      status: validatedData.status,
    });

    return NextResponse.json({
      id: campaign.id,
      createdAt: campaign.createdAt,
      message: '캠페인이 저장되었습니다',
    });

  } catch (error: any) {
    console.error('Create campaign error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '캠페인 저장 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

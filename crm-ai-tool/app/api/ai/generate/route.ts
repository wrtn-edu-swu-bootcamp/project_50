import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { callOpenAI, validateApiKey } from '@/lib/api/openai';
import { generatePrompt } from '@/lib/api/prompts';
import { addOptimizationScore } from '@/lib/api/message-optimizer';
import { validateMessage } from '@/lib/validations/message';
import { getSettings } from '@/lib/db/queries/settings';
import { Message } from '@/types';

const generateRequestSchema = z.object({
  purpose: z.string().min(1, '캠페인 목적을 입력해주세요'),
  target: z.string().min(1, '타겟 고객을 선택해주세요'),
  tone: z.string().min(1, '톤앤매너를 선택해주세요'),
  mainMessage: z.string().min(1, '주요 메시지를 입력해주세요'),
  includeKeywords: z.array(z.string()).optional(),
  excludeKeywords: z.array(z.string()).optional(),
  useEmoji: z.boolean(),
  sentenceLength: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    if (!validateApiKey()) {
      return NextResponse.json(
        { error: 'OpenAI API 키가 설정되지 않았습니다' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    const validatedData = generateRequestSchema.parse(body);

    const settings = await getSettings();
    
    if (!settings) {
      return NextResponse.json(
        { error: '설정을 불러올 수 없습니다' },
        { status: 500 }
      );
    }

    const promptMessages = generatePrompt({
      ...validatedData,
      settings,
    });

    const response = await callOpenAI(promptMessages, {
      temperature: 0.7,
      maxTokens: 2000,
      responseFormat: { type: 'json_object' },
    });

    let parsedMessages: Message[];
    try {
      // Gemini가 ```json 마크다운으로 응답할 수 있으므로 제거
      let cleanedResponse = response.trim();
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.slice(7);
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith('```')) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      cleanedResponse = cleanedResponse.trim();
      
      const parsed = JSON.parse(cleanedResponse);
      parsedMessages = Array.isArray(parsed) ? parsed : parsed.messages || [];
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', parseError);
      console.error('Raw response:', response);
      return NextResponse.json(
        { error: '메시지 생성 결과를 처리할 수 없습니다' },
        { status: 500 }
      );
    }

    if (parsedMessages.length === 0) {
      return NextResponse.json(
        { error: '메시지가 생성되지 않았습니다' },
        { status: 500 }
      );
    }

    const forbiddenWords = (settings.forbiddenWords as string[]) || [];
    
    const validatedMessages = parsedMessages
      .filter(message => {
        const validation = validateMessage(message, forbiddenWords);
        return validation.isValid;
      })
      .map(message => addOptimizationScore(message, validatedData.includeKeywords || []))
      .slice(0, 5);

    if (validatedMessages.length === 0) {
      return NextResponse.json(
        { error: '유효한 메시지를 생성할 수 없습니다. 다시 시도해주세요.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      messages: validatedMessages,
      generatedAt: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Generate API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    if (error?.type === 'rate_limit') {
      return NextResponse.json(
        { error: error.message, retryAfter: error.retryAfter },
        { status: 429 }
      );
    }

    if (error?.type === 'timeout') {
      return NextResponse.json(
        { error: error.message },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: error?.message || '메시지 생성 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}

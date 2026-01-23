import { NextRequest, NextResponse } from 'next/server';
import { predictPerformance } from '@/lib/api/performance-predictor';
import { z } from 'zod';

const predictSchema = z.object({
  message: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    content1: z.string(),
    content2: z.string().optional(),
    footer: z.string(),
  }),
  purpose: z.string(),
  target: z.string(),
  tone: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = predictSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error },
        { status: 400 }
      );
    }

    const { message, purpose, target, tone } = validation.data;

    const prediction = await predictPerformance(message, purpose, target, tone);

    return NextResponse.json(prediction);
  } catch (error: any) {
    console.error('Prediction API error:', error);

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
      { error: error?.message || 'Failed to predict performance' },
      { status: 500 }
    );
  }
}

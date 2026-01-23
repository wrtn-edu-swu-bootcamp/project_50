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
  } catch (error) {
    console.error('Prediction API error:', error);
    return NextResponse.json(
      { error: 'Failed to predict performance' },
      { status: 500 }
    );
  }
}

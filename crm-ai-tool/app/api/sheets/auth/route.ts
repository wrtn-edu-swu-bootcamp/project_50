import { NextResponse } from 'next/server';
import { generateAuthUrl, validateGoogleAuthConfig } from '@/lib/api/google-auth';

export async function GET() {
  try {
    const validation = validateGoogleAuthConfig();
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 500 }
      );
    }

    const authUrl = generateAuthUrl();
    
    return NextResponse.json({ authUrl });
  } catch (error) {
    console.error('Google auth URL generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate auth URL' },
      { status: 500 }
    );
  }
}

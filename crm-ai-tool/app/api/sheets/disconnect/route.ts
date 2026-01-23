import { NextResponse } from 'next/server';
import { updateGoogleSheetConnection } from '@/lib/db/queries/performance';

export async function POST() {
  try {
    await updateGoogleSheetConnection({
      accessToken: null,
      refreshToken: null,
      status: 'disconnected',
    });

    return NextResponse.json({
      success: true,
      message: 'Google Sheets 연결이 해제되었습니다',
    });
  } catch (error) {
    console.error('Disconnect error:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect' },
      { status: 500 }
    );
  }
}

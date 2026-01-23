import { NextResponse } from 'next/server';
import { getGoogleSheetConnection } from '@/lib/db/queries/performance';

export async function GET() {
  try {
    const connection = await getGoogleSheetConnection();
    
    if (!connection) {
      return NextResponse.json({
        status: 'disconnected',
        lastSyncAt: null,
        sheetUrl: null,
      });
    }

    return NextResponse.json({
      status: connection.status,
      lastSyncAt: connection.lastSyncAt,
      sheetUrl: connection.sheetUrl,
    });
  } catch (error) {
    console.error('Connection status error:', error);
    return NextResponse.json(
      { error: 'Failed to get connection status' },
      { status: 500 }
    );
  }
}

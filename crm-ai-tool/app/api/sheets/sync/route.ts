import { NextRequest, NextResponse } from 'next/server';
import { getGoogleSheetConnection, updateGoogleSheetConnection } from '@/lib/db/queries/performance';
import { syncSheetsData } from '@/lib/api/sheets-sync';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sheetUrl } = body;

    const connection = await getGoogleSheetConnection();

    if (!connection || connection.status !== 'connected') {
      return NextResponse.json(
        { error: 'Google Sheets not connected' },
        { status: 400 }
      );
    }

    if (!connection.accessToken) {
      return NextResponse.json(
        { error: 'No access token found' },
        { status: 400 }
      );
    }

    const urlToSync = sheetUrl || connection.sheetUrl;
    if (!urlToSync) {
      return NextResponse.json(
        { error: 'Sheet URL is required' },
        { status: 400 }
      );
    }

    const result = await syncSheetsData(
      connection.accessToken,
      connection.refreshToken,
      urlToSync
    );

    if (!result.success) {
      await updateGoogleSheetConnection({
        status: 'error',
      });

      return NextResponse.json(
        { error: result.error || 'Sync failed' },
        { status: 500 }
      );
    }

    await updateGoogleSheetConnection({
      sheetUrl: urlToSync,
      lastSyncAt: new Date(),
      status: 'connected',
    });

    return NextResponse.json({
      success: true,
      count: result.count,
      message: `${result.count}개의 성과 데이터를 동기화했습니다`,
    });
  } catch (error) {
    console.error('Sync API error:', error);
    return NextResponse.json(
      { error: 'Sync failed' },
      { status: 500 }
    );
  }
}

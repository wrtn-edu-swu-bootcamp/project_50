import { google } from 'googleapis';
import { setOAuth2Credentials, decryptToken, refreshAccessToken, encryptToken } from './google-auth';
import { syncPerformanceData, deleteAllPerformanceData, updateGoogleSheetConnection } from '@/lib/db/queries/performance';
import { NewPerformanceData } from '@/types';

interface SheetRow {
  campaignName: string;
  sendDate: string;
  sendTime?: string;
  messageContent?: string;
  sendCount: number;
  clickCount: number;
  conversionCount: number;
  ctr: number;
  conversionRate: number;
  purpose?: string;
  target?: string;
  tone?: string;
}

export async function syncSheetsData(
  encryptedAccessToken: string,
  encryptedRefreshToken: string | null,
  sheetUrl: string
): Promise<{ success: boolean; count: number; error?: string }> {
  try {
    let accessToken = decryptToken(encryptedAccessToken);
    const refreshToken = encryptedRefreshToken ? decryptToken(encryptedRefreshToken) : null;

    let oauth2Client = setOAuth2Credentials(accessToken, refreshToken || undefined);
    const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

    const spreadsheetId = extractSpreadsheetId(sheetUrl);
    if (!spreadsheetId) {
      return { success: false, count: 0, error: 'Invalid sheet URL' };
    }

    let response;
    try {
      response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'A:L',
      });
    } catch (error: any) {
      if (error.code === 401 && refreshToken) {
        const newTokens = await refreshAccessToken(refreshToken);
        if (newTokens.access_token) {
          accessToken = newTokens.access_token;
          const encryptedNewAccessToken = encryptToken(accessToken);
          
          await updateGoogleSheetConnection({
            accessToken: encryptedNewAccessToken,
          });

          oauth2Client = setOAuth2Credentials(accessToken, refreshToken);
          const newSheets = google.sheets({ version: 'v4', auth: oauth2Client });
          response = await newSheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'A:L',
          });
        } else {
          throw new Error('Token refresh failed');
        }
      } else {
        throw error;
      }
    }

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return { success: true, count: 0 };
    }

    const headers = rows[0];
    const dataRows = rows.slice(1);

    const performanceDataArray: NewPerformanceData[] = [];

    for (const row of dataRows) {
      if (!row[0] || !row[1]) continue;

      const data: NewPerformanceData = {
        campaignName: row[0] || '',
        sendDate: row[1] || '',
        sendTime: row[2] || null,
        messageContent: row[3] || null,
        sendCount: parseInt(row[4]) || 0,
        clickCount: parseInt(row[5]) || 0,
        conversionCount: parseInt(row[6]) || 0,
        ctr: parseFloat(row[7]) || 0,
        conversionRate: parseFloat(row[8]) || 0,
        purpose: row[9] || null,
        target: row[10] || null,
        tone: row[11] || null,
      };

      performanceDataArray.push(data);
    }

    await deleteAllPerformanceData();
    await syncPerformanceData(performanceDataArray);

    return { success: true, count: performanceDataArray.length };
  } catch (error: any) {
    console.error('Sheets sync error:', error);
    return { 
      success: false, 
      count: 0, 
      error: error.message || 'Sync failed' 
    };
  }
}

function extractSpreadsheetId(url: string): string | null {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

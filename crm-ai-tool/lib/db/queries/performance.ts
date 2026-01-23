import { db } from '@/lib/db';
import { performanceData, googleSheetConnection } from '@/lib/db/schema';
import { eq, and, gte, lte, desc } from 'drizzle-orm';
import { NewPerformanceData, PerformanceFilters } from '@/types';

export async function getPerformanceData() {
  return await db.select().from(performanceData).orderBy(desc(performanceData.sendDate));
}

export async function getPerformanceByFilters(filters: PerformanceFilters) {
  const conditions = [];
  
  if (filters.purpose) {
    conditions.push(eq(performanceData.purpose, filters.purpose));
  }
  
  if (filters.target) {
    conditions.push(eq(performanceData.target, filters.target));
  }
  
  if (filters.tone) {
    conditions.push(eq(performanceData.tone, filters.tone));
  }
  
  if (filters.startDate) {
    conditions.push(gte(performanceData.sendDate, filters.startDate));
  }
  
  if (filters.endDate) {
    conditions.push(lte(performanceData.sendDate, filters.endDate));
  }
  
  if (conditions.length === 0) {
    return await getPerformanceData();
  }
  
  return await db
    .select()
    .from(performanceData)
    .where(and(...conditions))
    .orderBy(desc(performanceData.sendDate));
}

export async function createPerformanceData(data: NewPerformanceData) {
  const result = await db.insert(performanceData).values(data).returning();
  return result[0];
}

export async function syncPerformanceData(dataArray: NewPerformanceData[]) {
  if (dataArray.length === 0) return [];
  
  const result = await db.insert(performanceData).values(dataArray).returning();
  return result;
}

export async function getPerformanceSummary() {
  const allData = await getPerformanceData();
  
  if (allData.length === 0) {
    return {
      totalSends: 0,
      averageCtr: 0,
      averageConversion: 0,
    };
  }
  
  const totalSends = allData.reduce((sum, item) => sum + item.sendCount, 0);
  const averageCtr = allData.reduce((sum, item) => sum + item.ctr, 0) / allData.length;
  const averageConversion = allData.reduce((sum, item) => sum + item.conversionRate, 0) / allData.length;
  
  return {
    totalSends,
    averageCtr: Math.round(averageCtr * 100) / 100,
    averageConversion: Math.round(averageConversion * 100) / 100,
  };
}

export async function deleteAllPerformanceData() {
  await db.delete(performanceData);
}

export async function getGoogleSheetConnection() {
  const result = await db
    .select()
    .from(googleSheetConnection)
    .where(eq(googleSheetConnection.userId, 'default'))
    .limit(1);
  
  return result[0] || null;
}

export async function updateGoogleSheetConnection(data: {
  accessToken?: string | null;
  refreshToken?: string | null;
  sheetUrl?: string | null;
  status?: string;
  lastSyncAt?: Date;
}) {
  const existing = await getGoogleSheetConnection();
  
  if (existing) {
    const updateData: any = {};
    if (data.accessToken !== undefined) updateData.accessToken = data.accessToken;
    if (data.refreshToken !== undefined) updateData.refreshToken = data.refreshToken;
    if (data.sheetUrl !== undefined) updateData.sheetUrl = data.sheetUrl;
    if (data.status) updateData.status = data.status;
    if (data.lastSyncAt) updateData.lastSyncAt = data.lastSyncAt;
    
    const result = await db
      .update(googleSheetConnection)
      .set(updateData)
      .where(eq(googleSheetConnection.id, existing.id))
      .returning();
    
    return result[0];
  } else {
    const result = await db
      .insert(googleSheetConnection)
      .values({
        userId: 'default',
        accessToken: data.accessToken || null,
        refreshToken: data.refreshToken || null,
        sheetUrl: data.sheetUrl || null,
        status: data.status || 'disconnected',
        lastSyncAt: data.lastSyncAt || null,
      })
      .returning();
    
    return result[0];
  }
}

export async function getConnectionStatus() {
  const connection = await getGoogleSheetConnection();
  
  if (!connection) {
    return {
      connected: false,
      status: 'disconnected',
      lastSyncAt: null,
      sheetUrl: null,
    };
  }
  
  return {
    connected: connection.status === 'connected',
    status: connection.status,
    lastSyncAt: connection.lastSyncAt,
    sheetUrl: connection.sheetUrl,
  };
}

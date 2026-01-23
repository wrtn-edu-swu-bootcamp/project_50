import { cache } from 'react';
import { db } from '@/lib/db';
import { campaigns } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NewCampaign } from '@/types';

export const getCampaigns = cache(async () => {
  return await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
});

export const getCampaignById = cache(async (id: string) => {
  const result = await db.select().from(campaigns).where(eq(campaigns.id, id)).limit(1);
  return result[0] || null;
});

export async function createCampaign(data: NewCampaign) {
  const result = await db.insert(campaigns).values(data).returning();
  return result[0];
}

export async function updateCampaign(id: string, data: Partial<NewCampaign>) {
  const result = await db
    .update(campaigns)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(campaigns.id, id))
    .returning();
  return result[0] || null;
}

export async function deleteCampaign(id: string) {
  const result = await db.delete(campaigns).where(eq(campaigns.id, id)).returning();
  return result[0] || null;
}

export const getRecentCampaigns = cache(async (limit: number = 5) => {
  return await db.select().from(campaigns).orderBy(desc(campaigns.createdAt)).limit(limit);
});

import { db } from '@/lib/db';
import { templates } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { NewTemplate } from '@/types';

export async function getTemplates() {
  return await db.select().from(templates).orderBy(desc(templates.createdAt));
}

export async function getTemplateById(id: string) {
  const result = await db.select().from(templates).where(eq(templates.id, id)).limit(1);
  return result[0] || null;
}

export async function createTemplate(data: NewTemplate) {
  const result = await db.insert(templates).values(data).returning();
  return result[0];
}

export async function updateTemplate(id: string, data: Partial<NewTemplate>) {
  const result = await db
    .update(templates)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(templates.id, id))
    .returning();
  return result[0] || null;
}

export async function deleteTemplate(id: string) {
  const result = await db.delete(templates).where(eq(templates.id, id)).returning();
  return result[0] || null;
}

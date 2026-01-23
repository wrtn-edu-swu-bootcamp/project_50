import { z } from 'zod';

export const templateSchema = z.object({
  name: z.string().min(1, '템플릿명을 입력해주세요').max(100, '템플릿명은 100자 이하로 입력해주세요'),
  purpose: z.string().min(1, '캠페인 목적을 선택해주세요'),
  target: z.string().min(1, '타겟 고객을 선택해주세요'),
  tone: z.string().min(1, '톤앤매너를 선택해주세요'),
  mainMessage: z.string().min(1, '주요 메시지를 입력해주세요').max(500, '주요 메시지는 500자 이하로 입력해주세요'),
  includeKeywords: z.array(z.string()).default([]),
  excludeKeywords: z.array(z.string()).default([]),
  useEmoji: z.boolean().default(false),
  sentenceLength: z.string().optional(),
});

export const templateUpdateSchema = templateSchema.partial();

export interface TemplateFormData extends z.infer<typeof templateSchema> {}

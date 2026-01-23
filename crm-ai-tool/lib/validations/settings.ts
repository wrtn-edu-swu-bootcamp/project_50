import { z } from 'zod';

export const settingsSchema = z.object({
  titleMaxLength: z.number().min(1, '제목 최대 글자수는 1자 이상이어야 합니다').max(100, '제목 최대 글자수는 100자 이하여야 합니다'),
  subtitleMaxLength: z.number().min(1, '소제목 최대 글자수는 1자 이상이어야 합니다').max(100, '소제목 최대 글자수는 100자 이하여야 합니다'),
  contentMaxLength: z.number().min(1, '내용 최대 글자수는 1자 이상이어야 합니다').max(100, '내용 최대 글자수는 100자 이하여야 합니다'),
  requiredFooter: z.string().min(1, '필수 포함 문구를 입력해주세요'),
  writingRules: z.array(z.string()).default([]),
  forbiddenWords: z.array(z.string()).default([]),
});

export const settingsUpdateSchema = settingsSchema.partial();

export interface SettingsFormData extends z.infer<typeof settingsSchema> {}

// 기본 설정값
export const DEFAULT_SETTINGS: SettingsFormData = {
  titleMaxLength: 20,
  subtitleMaxLength: 16,
  contentMaxLength: 22,
  requiredFooter: '수신거부: 마이페이지 > 설정',
  writingRules: [
    '직관적 표현 사용',
    '감성적/커머셜 표현 금지',
    '제목과 첫째줄 문장 분리',
    '항상 존댓말 사용',
  ],
  forbiddenWords: [],
};

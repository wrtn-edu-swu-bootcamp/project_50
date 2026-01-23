import { z } from 'zod';

export const messageSchema = z.object({
  title: z.string().max(20, '제목은 최대 20자까지 입력 가능합니다'),
  subtitle: z.string().max(16, '소제목은 최대 16자까지 입력 가능합니다'),
  content1: z.string().max(22, '내용은 줄당 최대 22자까지 입력 가능합니다'),
  content2: z.string().max(22, '내용은 줄당 최대 22자까지 입력 가능합니다').optional(),
  footer: z.string(),
  optimizationScore: z.number().optional(),
});

export type MessageValidation = z.infer<typeof messageSchema>;

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateMessage(
  message: any,
  forbiddenWords: string[] = []
): ValidationResult {
  const errors: string[] = [];

  try {
    messageSchema.parse(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.push(...error.issues.map(e => e.message));
    }
  }

  if (!message.footer || !message.footer.includes('수신거부')) {
    errors.push('필수 문구 "수신거부: 마이페이지 > 설정"이 포함되어야 합니다');
  }

  const allText = `${message.title} ${message.subtitle} ${message.content1} ${message.content2 || ''}`;
  
  for (const word of forbiddenWords) {
    if (allText.includes(word)) {
      errors.push(`금지 표현 "${word}"이(가) 포함되어 있습니다`);
    }
  }

  const politeEndings = ['요', '니다', '세요', '습니다', '해요', '예요', '네요'];
  const hasPoliteEnding = politeEndings.some(ending => 
    message.content1?.endsWith(ending) || message.content2?.endsWith(ending)
  );
  
  if (!hasPoliteEnding) {
    errors.push('존댓말을 사용해주세요');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function countCharacters(text: string): number {
  return text.length;
}

export function validateCharacterLimit(
  text: string,
  limit: number,
  fieldName: string
): string | null {
  const count = countCharacters(text);
  if (count > limit) {
    return `${fieldName}은(는) ${limit}자를 초과할 수 없습니다 (현재: ${count}자)`;
  }
  return null;
}

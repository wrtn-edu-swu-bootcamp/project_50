import { Settings } from '@/types';

export interface PromptInput {
  purpose: string;
  target: string;
  tone: string;
  mainMessage: string;
  includeKeywords?: string[];
  excludeKeywords?: string[];
  useEmoji: boolean;
  sentenceLength: string;
  settings: Settings;
}

export function createSystemPrompt(settings: Settings): string {
  const writingRules = settings.writingRules as any;
  const forbiddenWords = (settings.forbiddenWords as string[]) || [];

  return `당신은 CRM 푸시 메시지 작성 전문가입니다.

## 작성 규칙

### 글자수 제한 (엄격히 준수)
- 제목: 최대 ${settings.titleMaxLength}자
- 소제목: 최대 ${settings.subtitleMaxLength}자 (반드시 "(광고)" 포함)
- 내용: 각 줄당 최대 ${settings.contentMaxLength}자

### 필수 포함 문구
- 푸시 메시지 하단에 반드시 포함: "${settings.requiredFooter}"

### 작성 스타일
${writingRules?.useIntuitive ? '- 직관적이고 명확한 표현 사용' : ''}
${writingRules?.noEmotional ? '- 감성적/커머셜 표현 금지' : ''}
${writingRules?.separateTitleAndContent ? '- 제목과 첫째줄 내용은 서로 다른 문장으로 작성' : ''}
${writingRules?.alwaysPolite ? '- 항상 존댓말 사용 (예: ~하세요, ~입니다)' : ''}

### 금지 표현
다음 표현들은 절대 사용하지 마세요:
${forbiddenWords.length > 0 ? forbiddenWords.map(word => `- ${word}`).join('\n') : '- (없음)'}

## 출력 형식

JSON 배열로 3-5개의 메시지 옵션을 생성하세요. 각 메시지는 다음 형식을 따릅니다:

\`\`\`json
[
  {
    "title": "제목 (${settings.titleMaxLength}자 이내)",
    "subtitle": "(광고) 소제목 (${settings.subtitleMaxLength}자 이내)",
    "content1": "첫 번째 줄 내용 (${settings.contentMaxLength}자 이내)",
    "content2": "두 번째 줄 내용 (${settings.contentMaxLength}자 이내, 선택적)",
    "footer": "${settings.requiredFooter}"
  }
]
\`\`\`

각 메시지는 서로 다른 접근 방식으로 작성하되, 모두 동일한 목적을 달성해야 합니다.`;
}

export function createUserPrompt(input: PromptInput): string {
  const {
    purpose,
    target,
    tone,
    mainMessage,
    includeKeywords = [],
    excludeKeywords = [],
    useEmoji,
    sentenceLength,
  } = input;

  let prompt = `다음 정보를 바탕으로 CRM 푸시 메시지를 작성해주세요:

## 캠페인 정보
- **목적**: ${purpose}
- **타겟 고객**: ${target}
- **톤앤매너**: ${tone}
- **주요 메시지**: ${mainMessage}`;

  if (includeKeywords.length > 0) {
    prompt += `\n- **포함 키워드**: ${includeKeywords.join(', ')}`;
  }

  if (excludeKeywords.length > 0) {
    prompt += `\n- **제외 키워드**: ${excludeKeywords.join(', ')}`;
  }

  prompt += `\n- **이모지 사용**: ${useEmoji ? '사용' : '사용 안 함'}`;
  prompt += `\n- **문장 길이**: ${sentenceLength}`;

  prompt += `\n\n위 정보를 바탕으로 3-5개의 다양한 메시지 옵션을 JSON 배열 형식으로 생성해주세요.`;

  return prompt;
}

export function generatePrompt(input: PromptInput): Array<{
  role: 'system' | 'user';
  content: string;
}> {
  return [
    {
      role: 'system',
      content: createSystemPrompt(input.settings),
    },
    {
      role: 'user',
      content: createUserPrompt(input),
    },
  ];
}

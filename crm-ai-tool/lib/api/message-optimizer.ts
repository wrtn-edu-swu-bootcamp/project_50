import { Message } from '@/types';

export interface OptimizationScore {
  total: number;
  breakdown: {
    titleLength: number;
    urgency: number;
    emoji: number;
    characterLimit: number;
    keyword: number;
  };
}

const URGENCY_KEYWORDS = [
  '오늘', '지금', '마감', '한정', '특가', '긴급', '서둘러', '빨리', '곧', '임박'
];

export function calculateOptimizationScore(
  message: Message,
  includeKeywords: string[] = []
): OptimizationScore {
  const breakdown = {
    titleLength: calculateTitleLengthScore(message.title),
    urgency: calculateUrgencyScore(message),
    emoji: calculateEmojiScore(message),
    characterLimit: calculateCharacterLimitScore(message),
    keyword: calculateKeywordScore(message, includeKeywords),
  };

  const total = Object.values(breakdown).reduce((sum, score) => sum + score, 0);

  return {
    total: Math.round(total),
    breakdown,
  };
}

function calculateTitleLengthScore(title: string): number {
  const length = title.length;
  
  if (length <= 10) return 20;
  if (length <= 15) return 15;
  if (length <= 20) return 10;
  
  return 0;
}

function calculateUrgencyScore(message: Message): number {
  const allText = `${message.title} ${message.subtitle} ${message.content1} ${message.content2 || ''}`;
  
  const hasUrgency = URGENCY_KEYWORDS.some(keyword => allText.includes(keyword));
  
  return hasUrgency ? 20 : 0;
}

function calculateEmojiScore(message: Message): number {
  const allText = `${message.title} ${message.subtitle} ${message.content1} ${message.content2 || ''}`;
  
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
  const hasEmoji = emojiRegex.test(allText);
  
  const emojiCount = (allText.match(new RegExp(emojiRegex, 'gu')) || []).length;
  
  if (emojiCount === 0) return 0;
  if (emojiCount === 1 || emojiCount === 2) return 15;
  if (emojiCount === 3) return 10;
  
  return 5;
}

function calculateCharacterLimitScore(message: Message): number {
  let score = 25;
  
  if (message.title.length > 20) score -= 10;
  if (message.subtitle && message.subtitle.length > 16) score -= 10;
  if (message.content1.length > 22) score -= 5;
  if (message.content2 && message.content2.length > 22) score -= 5;
  
  return Math.max(0, score);
}

function calculateKeywordScore(message: Message, includeKeywords: string[]): number {
  if (includeKeywords.length === 0) return 20;
  
  const allText = `${message.title} ${message.subtitle} ${message.content1} ${message.content2 || ''}`.toLowerCase();
  
  const matchedKeywords = includeKeywords.filter(keyword => 
    allText.includes(keyword.toLowerCase())
  );
  
  const matchRate = matchedKeywords.length / includeKeywords.length;
  
  return Math.round(matchRate * 20);
}

export function addOptimizationScore(
  message: Message,
  includeKeywords: string[] = []
): Message {
  const { total } = calculateOptimizationScore(message, includeKeywords);
  
  return {
    ...message,
    optimizationScore: total,
  };
}

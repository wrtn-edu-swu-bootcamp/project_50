// 캠페인 목적 옵션
export const CAMPAIGN_PURPOSES = [
  '신상품 프로모션',
  '할인 프로모션',
  '재구매 유도',
  '이벤트 참여',
  '직접 입력',
] as const;

// 타겟 고객 옵션
export const TARGET_AUDIENCES = [
  '신규 회원',
  'VIP 회원',
  '전체 회원',
  '해당 브랜드 구매 유관 행동 고객',
] as const;

// 톤앤매너 옵션
export const TONE_OPTIONS = [
  '친근한',
  '모던한',
  '긴급한',
  '감사',
  '안내',
] as const;

// 문장 길이 옵션
export const SENTENCE_LENGTH_OPTIONS = [
  '짧게',
  '보통',
] as const;

export type CampaignPurpose = typeof CAMPAIGN_PURPOSES[number];
export type TargetAudience = typeof TARGET_AUDIENCES[number];
export type ToneOption = typeof TONE_OPTIONS[number];
export type SentenceLengthOption = typeof SENTENCE_LENGTH_OPTIONS[number];

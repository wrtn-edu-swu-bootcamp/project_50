import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { campaigns, templates, settings, performanceData, googleSheetConnection } from '@/lib/db/schema';

// Message 인터페이스
export interface Message {
  title: string;
  subtitle?: string;
  content1: string;
  content2?: string;
  footer: string;
  optimizationScore?: number;
}

// 데이터베이스 모델 타입
export type Campaign = InferSelectModel<typeof campaigns>;
export type NewCampaign = InferInsertModel<typeof campaigns>;

export type Template = InferSelectModel<typeof templates>;
export type NewTemplate = InferInsertModel<typeof templates>;

export type Settings = InferSelectModel<typeof settings>;
export type NewSettings = InferInsertModel<typeof settings>;

export type PerformanceData = InferSelectModel<typeof performanceData>;
export type NewPerformanceData = InferInsertModel<typeof performanceData>;

export type GoogleSheetConnection = InferSelectModel<typeof googleSheetConnection>;
export type NewGoogleSheetConnection = InferInsertModel<typeof googleSheetConnection>;

// 캠페인 목적 상수
export const CAMPAIGN_PURPOSES = {
  NEW_PRODUCT: '신상품 프로모션',
  DISCOUNT: '할인 프로모션',
  REPURCHASE: '재구매 유도',
  EVENT: '이벤트 참여',
  CUSTOM: '직접 입력',
} as const;

export type CampaignPurpose = typeof CAMPAIGN_PURPOSES[keyof typeof CAMPAIGN_PURPOSES];

// 타겟 고객 상수
export const TARGET_AUDIENCES = {
  NEW: '신규 회원',
  VIP: 'VIP 회원',
  ALL: '전체 회원',
  BRAND_RELATED: '해당 브랜드 구매 유관 행동 고객',
} as const;

export type TargetAudience = typeof TARGET_AUDIENCES[keyof typeof TARGET_AUDIENCES];

// 톤앤매너 상수
export const TONES = {
  FRIENDLY: '친근한',
  MODERN: '모던한',
  URGENT: '긴급한',
  GRATEFUL: '감사',
  INFORMATIVE: '안내',
} as const;

export type Tone = typeof TONES[keyof typeof TONES];

// 문장 길이 상수
export const SENTENCE_LENGTHS = {
  SHORT: '짧게',
  MEDIUM: '보통',
  LONG: '길게',
} as const;

export type SentenceLength = typeof SENTENCE_LENGTHS[keyof typeof SENTENCE_LENGTHS];

// 캠페인 상태 상수
export const CAMPAIGN_STATUS = {
  DRAFT: 'draft',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
} as const;

export type CampaignStatus = typeof CAMPAIGN_STATUS[keyof typeof CAMPAIGN_STATUS];

// Google Sheets 연결 상태 상수
export const CONNECTION_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ERROR: 'error',
} as const;

export type ConnectionStatus = typeof CONNECTION_STATUS[keyof typeof CONNECTION_STATUS];

// 성과 예측 결과 인터페이스
export interface PerformancePrediction {
  predictedCtr: number;
  predictedConversion: number;
  confidence: number;
  similarCampaignsCount: number;
  averageComparison: {
    ctr: number;
    conversion: number;
  };
  suggestions: string[];
}

// 필터 인터페이스
export interface PerformanceFilters {
  purpose?: string;
  target?: string;
  tone?: string;
  startDate?: string;
  endDate?: string;
}

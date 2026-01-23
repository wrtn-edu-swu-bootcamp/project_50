import { pgTable, text, timestamp, uuid, real, integer, jsonb, boolean } from 'drizzle-orm/pg-core';

// Campaigns 테이블
export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  purpose: text('purpose').notNull(),
  target: text('target').notNull(),
  tone: text('tone').notNull(),
  mainMessage: text('main_message').notNull(),
  includeKeywords: text('include_keywords').array(),
  excludeKeywords: text('exclude_keywords').array(),
  useEmoji: boolean('use_emoji').default(false),
  sentenceLength: text('sentence_length'),
  messages: jsonb('messages'),
  selectedMessage: jsonb('selected_message'),
  predictedCtr: real('predicted_ctr'),
  predictedConversion: real('predicted_conversion'),
  status: text('status').default('draft').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Templates 테이블
export const templates = pgTable('templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  purpose: text('purpose').notNull(),
  target: text('target').notNull(),
  tone: text('tone').notNull(),
  mainMessage: text('main_message').notNull(),
  includeKeywords: text('include_keywords').array(),
  excludeKeywords: text('exclude_keywords').array(),
  useEmoji: boolean('use_emoji').default(false),
  sentenceLength: text('sentence_length'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Settings 테이블
export const settings = pgTable('settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').default('default').notNull(),
  titleMaxLength: integer('title_max_length').default(20).notNull(),
  subtitleMaxLength: integer('subtitle_max_length').default(16).notNull(),
  contentMaxLength: integer('content_max_length').default(22).notNull(),
  requiredFooter: text('required_footer').default('수신거부: 마이페이지 > 설정').notNull(),
  writingRules: jsonb('writing_rules'),
  forbiddenWords: jsonb('forbidden_words'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Performance Data 테이블
export const performanceData = pgTable('performance_data', {
  id: uuid('id').defaultRandom().primaryKey(),
  campaignName: text('campaign_name').notNull(),
  sendDate: text('send_date').notNull(),
  sendTime: text('send_time'),
  messageContent: text('message_content'),
  sendCount: integer('send_count').default(0).notNull(),
  clickCount: integer('click_count').default(0).notNull(),
  conversionCount: integer('conversion_count').default(0).notNull(),
  ctr: real('ctr').default(0).notNull(),
  conversionRate: real('conversion_rate').default(0).notNull(),
  purpose: text('purpose'),
  target: text('target'),
  tone: text('tone'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Google Sheet Connection 테이블
export const googleSheetConnection = pgTable('google_sheet_connection', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').default('default').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  sheetUrl: text('sheet_url'),
  lastSyncAt: timestamp('last_sync_at'),
  status: text('status').default('disconnected').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

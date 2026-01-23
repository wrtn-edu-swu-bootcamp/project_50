import { getPerformanceByFilters, getConnectionStatus } from '@/lib/db/queries/performance';
import { Message } from '@/types';

interface PredictionResult {
  connected: boolean;
  predictedCtr: number;
  predictedConversion: number;
  confidence: number;
  comparisonToAverage: number;
  insights: {
    basis: string;
    similarCampaigns: number;
    suggestions: string[];
  };
}

const INDUSTRY_AVERAGE_CTR = 4.1;
const INDUSTRY_AVERAGE_CONVERSION = 2.0;

export async function predictPerformance(
  message: Message,
  purpose: string,
  target: string,
  tone: string
): Promise<PredictionResult> {
  const connectionStatus = await getConnectionStatus();

  if (!connectionStatus.connected) {
    return {
      connected: false,
      predictedCtr: INDUSTRY_AVERAGE_CTR,
      predictedConversion: INDUSTRY_AVERAGE_CONVERSION,
      confidence: 0,
      comparisonToAverage: 0,
      insights: {
        basis: '업계 평균 데이터',
        similarCampaigns: 0,
        suggestions: [
          'Google Sheets를 연결하여 맞춤형 예측을 받아보세요',
        ],
      },
    };
  }

  const similarData = await getPerformanceByFilters({
    purpose,
    target,
    tone,
  });

  if (similarData.length === 0) {
    return {
      connected: true,
      predictedCtr: INDUSTRY_AVERAGE_CTR,
      predictedConversion: INDUSTRY_AVERAGE_CONVERSION,
      confidence: 0,
      comparisonToAverage: 0,
      insights: {
        basis: '유사한 캠페인 데이터 없음 (업계 평균 사용)',
        similarCampaigns: 0,
        suggestions: [
          '더 많은 과거 데이터를 추가하면 정확도가 향상됩니다',
        ],
      },
    };
  }

  const avgCtr = similarData.reduce((sum, d) => sum + d.ctr, 0) / similarData.length;
  const avgConversion = similarData.reduce((sum, d) => sum + d.conversionRate, 0) / similarData.length;

  const confidence = calculateConfidence(similarData.length);
  const comparisonToAverage = ((avgCtr - INDUSTRY_AVERAGE_CTR) / INDUSTRY_AVERAGE_CTR) * 100;

  const suggestions = generateSuggestions(message, similarData);

  return {
    connected: true,
    predictedCtr: Math.round(avgCtr * 100) / 100,
    predictedConversion: Math.round(avgConversion * 100) / 100,
    confidence,
    comparisonToAverage: Math.round(comparisonToAverage * 10) / 10,
    insights: {
      basis: `유사한 ${similarData.length}개 캠페인 데이터 기반`,
      similarCampaigns: similarData.length,
      suggestions,
    },
  };
}

function calculateConfidence(dataCount: number): number {
  if (dataCount >= 20) return 95;
  if (dataCount >= 10) return 85;
  if (dataCount >= 5) return 70;
  if (dataCount >= 3) return 55;
  return 30;
}

function generateSuggestions(message: Message, historicalData: any[]): string[] {
  const suggestions: string[] = [];

  const titleLength = message.title.length;
  if (titleLength > 10) {
    suggestions.push('제목을 10자 이하로 줄이면 클릭률이 향상될 수 있습니다');
  } else {
    suggestions.push('제목 길이가 적절합니다 (10자 이하)');
  }

  const urgencyWords = ['오늘', '지금', '마감', '긴급', '서둘러', '한정', '특가'];
  const hasUrgency = urgencyWords.some(word => 
    message.title.includes(word) || 
    message.subtitle?.includes(word) || 
    message.content1.includes(word)
  );

  if (!hasUrgency) {
    suggestions.push('긴급성 표현을 추가하면 클릭률이 20% 향상될 수 있습니다');
  } else {
    suggestions.push('긴급성 표현이 포함되어 있어 좋습니다');
  }

  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const hasEmoji = emojiRegex.test(message.title) || 
                   emojiRegex.test(message.subtitle || '') || 
                   emojiRegex.test(message.content1);

  if (!hasEmoji) {
    suggestions.push('이모지를 1-2개 추가하면 시선을 끌 수 있습니다');
  } else {
    suggestions.push('이모지 사용으로 시각적 효과가 좋습니다');
  }

  const morningData = historicalData.filter(d => {
    const time = d.sendTime;
    if (!time) return false;
    const hour = parseInt(time.split(':')[0]);
    return hour >= 7 && hour < 12;
  });

  const eveningData = historicalData.filter(d => {
    const time = d.sendTime;
    if (!time) return false;
    const hour = parseInt(time.split(':')[0]);
    return hour >= 18 && hour < 22;
  });

  if (morningData.length > 0 && eveningData.length > 0) {
    const morningAvg = morningData.reduce((sum, d) => sum + d.ctr, 0) / morningData.length;
    const eveningAvg = eveningData.reduce((sum, d) => sum + d.ctr, 0) / eveningData.length;

    if (morningAvg > eveningAvg * 1.2) {
      suggestions.push('오전 7-12시 발송 시 클릭률이 더 높습니다');
    } else if (eveningAvg > morningAvg * 1.2) {
      suggestions.push('저녁 6-10시 발송 시 클릭률이 더 높습니다');
    }
  }

  return suggestions;
}

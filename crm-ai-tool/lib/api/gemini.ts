import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

export interface GeminiError {
  message: string;
  type: 'rate_limit' | 'api_error' | 'timeout' | 'unknown';
  retryAfter?: number;
}

export async function callGemini(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: {
    temperature?: number;
    maxTokens?: number;
  }
): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API 키가 설정되지 않았습니다');
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash-preview-05-20',
      generationConfig: {
        temperature: options?.temperature ?? 0.7,
        maxOutputTokens: options?.maxTokens ?? 2000,
      },
    });

    // Convert messages to Gemini format
    const systemMessage = messages.find(m => m.role === 'system')?.content || '';
    const userMessages = messages.filter(m => m.role === 'user');
    const lastUserMessage = userMessages[userMessages.length - 1]?.content || '';

    // Combine system message with user message
    const prompt = systemMessage 
      ? `${systemMessage}\n\n${lastUserMessage}`
      : lastUserMessage;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error('Gemini API returned empty response');
    }

    return text;
  } catch (error: any) {
    console.error('Gemini API error:', error);

    // Rate limit error
    if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('rate limit')) {
      const geminiError: GeminiError = {
        message: '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
        type: 'rate_limit',
        retryAfter: 60,
      };
      throw geminiError;
    }

    // Timeout error
    if (error?.code === 'ETIMEDOUT' || error?.message?.includes('timeout')) {
      const geminiError: GeminiError = {
        message: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
        type: 'timeout',
      };
      throw geminiError;
    }

    // Server error
    if (error?.status >= 500) {
      const geminiError: GeminiError = {
        message: 'Gemini 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        type: 'api_error',
      };
      throw geminiError;
    }

    // Unknown error
    const geminiError: GeminiError = {
      message: error?.message || '메시지 생성 중 오류가 발생했습니다.',
      type: 'unknown',
    };
    throw geminiError;
  }
}

export function validateGeminiApiKey(): boolean {
  return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.startsWith('AIza');
}

export default genAI;

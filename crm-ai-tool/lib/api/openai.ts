import OpenAI from 'openai';
import { callGemini, validateGeminiApiKey } from './gemini';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000,
  maxRetries: 3,
});

export interface OpenAIError {
  message: string;
  type: 'rate_limit' | 'api_error' | 'timeout' | 'unknown';
  retryAfter?: number;
}

// Check if we should use Gemini instead of OpenAI
const useGemini = process.env.USE_GEMINI === 'true' || !process.env.OPENAI_API_KEY;

export async function callOpenAI(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: {
    temperature?: number;
    maxTokens?: number;
    responseFormat?: { type: 'json_object' };
  }
): Promise<string> {
  // Use Gemini if configured or if OpenAI key is not available
  if (useGemini && validateGeminiApiKey()) {
    console.log('🔄 Using Google Gemini instead of OpenAI');
    return callGemini(messages, {
      temperature: options?.temperature,
      maxTokens: options?.maxTokens,
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 2000,
      response_format: options?.responseFormat,
    });

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('OpenAI API returned empty response');
    }

    return content;
  } catch (error: any) {
    if (error?.status === 429) {
      const retryAfter = error?.headers?.['retry-after'] 
        ? parseInt(error.headers['retry-after']) 
        : 60;
      
      const openAIError: OpenAIError = {
        message: '요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.',
        type: 'rate_limit',
        retryAfter,
      };
      throw openAIError;
    }

    if (error?.code === 'ETIMEDOUT' || error?.message?.includes('timeout')) {
      const openAIError: OpenAIError = {
        message: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
        type: 'timeout',
      };
      throw openAIError;
    }

    if (error?.status >= 500) {
      const openAIError: OpenAIError = {
        message: 'OpenAI 서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        type: 'api_error',
      };
      throw openAIError;
    }

    const openAIError: OpenAIError = {
      message: error?.message || '메시지 생성 중 오류가 발생했습니다.',
      type: 'unknown',
    };
    throw openAIError;
  }
}

export function validateApiKey(): boolean {
  // If using Gemini, check Gemini key
  if (useGemini) {
    return validateGeminiApiKey();
  }
  // Otherwise check OpenAI key
  return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-');
}

export default openai;

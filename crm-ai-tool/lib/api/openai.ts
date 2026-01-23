import OpenAI from 'openai';

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

export async function callOpenAI(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: {
    temperature?: number;
    maxTokens?: number;
    responseFormat?: { type: 'json_object' };
  }
): Promise<string> {
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
  return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-');
}

export default openai;

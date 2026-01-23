# Rate Limit 문제 해결

## 문제 상황

AI 메시지 생성 버튼을 클릭하면 "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요. (60초 후 재시도 가능)" 메시지가 표시되지만, 60초가 지나도 계속 같은 오류가 발생하는 문제가 있었습니다.

### 원인 분석

1. **서버 측 Rate Limit 처리**: OpenAI API에서 429 (Too Many Requests) 에러를 반환하면 서버에서 적절히 처리하고 있었습니다.
2. **클라이언트 측 문제**: 클라이언트에서 rate limit 상태를 추적하지 않아, 사용자가 계속 버튼을 클릭할 수 있었고, 매번 새로운 요청이 실패했습니다.
3. **상태 지속성 부족**: 페이지를 새로고침하면 rate limit 정보가 사라져, 사용자가 다시 시도할 수 있는 시점을 알 수 없었습니다.

## 해결 방법

### 1. 클라이언트 측 Rate Limit 추적

`localStorage`를 사용하여 rate limit 상태를 브라우저에 저장하고, 페이지를 새로고침해도 정보가 유지되도록 했습니다.

```typescript
// Rate limit 정보를 localStorage에 저장
const limitUntil = Date.now() + (retryAfter * 1000);
localStorage.setItem(RATE_LIMIT_KEY, limitUntil.toString());
```

### 2. 실시간 카운트다운 타이머

`useEffect` 훅을 사용하여 1초마다 남은 시간을 업데이트하고, 시간이 만료되면 자동으로 rate limit을 해제합니다.

```typescript
useEffect(() => {
  if (rateLimitUntil) {
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.ceil((rateLimitUntil - now) / 1000);
      
      if (remaining <= 0) {
        localStorage.removeItem(RATE_LIMIT_KEY);
        setRateLimitUntil(null);
        setRemainingTime(0);
        setError(null);
        toast.success('이제 다시 메시지를 생성할 수 있습니다');
      } else {
        setRemainingTime(remaining);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }
}, [rateLimitUntil]);
```

### 3. 버튼 비활성화

Rate limit이 활성화된 동안 버튼을 비활성화하고, 남은 시간을 표시합니다.

```typescript
<Button
  onClick={generateMessages}
  disabled={isGenerating || (rateLimitUntil !== null && Date.now() < rateLimitUntil)}
>
  {rateLimitUntil && Date.now() < rateLimitUntil
    ? `메시지 생성 (${remainingTime}초 후 가능)`
    : '메시지 생성'}
</Button>
```

### 4. 시각적 피드백

Progress bar를 추가하여 남은 시간을 시각적으로 표시합니다.

```typescript
<div className="mt-2 w-full bg-[#FEE2E2] rounded-full h-2">
  <div 
    className="bg-[#EF4444] h-2 rounded-full transition-all duration-1000"
    style={{ width: `${Math.max(0, 100 - (remainingTime / 60 * 100))}%` }}
  />
</div>
```

### 5. 유틸리티 함수 추가

Rate limit 관리를 위한 재사용 가능한 유틸리티 함수를 생성했습니다.

- `checkRateLimit(key)`: Rate limit 상태 확인
- `setRateLimit(key, retryAfterSeconds)`: Rate limit 설정
- `clearRateLimit(key)`: Rate limit 해제
- `formatRemainingTime(seconds)`: 남은 시간 포맷팅

## 적용된 파일

### 수정된 파일

1. **`components/campaign/message-generator.tsx`**
   - Rate limit 상태 추적 추가
   - 실시간 카운트다운 타이머 구현
   - 버튼 비활성화 및 시각적 피드백 추가

2. **`components/campaign/performance-prediction.tsx`**
   - 성과 예측 API에도 동일한 rate limit 처리 추가

3. **`app/api/ai/predict/route.ts`**
   - Rate limit 에러 처리 추가 (429 상태 코드)

### 새로 생성된 파일

1. **`lib/utils/rate-limit.ts`**
   - Rate limit 관리를 위한 유틸리티 함수
   - 재사용 가능한 헬퍼 함수 제공

## 사용자 경험 개선

### Before (이전)
- ❌ Rate limit 에러가 발생해도 버튼을 계속 클릭할 수 있음
- ❌ 남은 시간을 알 수 없음
- ❌ 페이지를 새로고침하면 정보가 사라짐
- ❌ 언제 다시 시도할 수 있는지 불명확

### After (이후)
- ✅ Rate limit 중에는 버튼이 자동으로 비활성화됨
- ✅ 실시간으로 남은 시간을 확인할 수 있음
- ✅ 페이지를 새로고침해도 rate limit 정보가 유지됨
- ✅ Progress bar로 시각적 피드백 제공
- ✅ 시간이 만료되면 자동으로 알림 (toast)

## 테스트 방법

1. AI 메시지 생성을 여러 번 빠르게 클릭하여 rate limit 발생시키기
2. 버튼이 비활성화되고 카운트다운이 시작되는지 확인
3. 페이지를 새로고침해도 카운트다운이 계속되는지 확인
4. 시간이 만료되면 버튼이 다시 활성화되는지 확인
5. 성과 예측 기능에서도 동일하게 작동하는지 확인

## 추가 개선 사항 (향후)

1. **서버 측 Rate Limiting**: Redis 등을 사용하여 서버 측에서도 rate limit 관리
2. **사용자별 Rate Limit**: 인증된 사용자별로 다른 rate limit 적용
3. **Rate Limit 정보 API**: 현재 사용 가능한 요청 수를 미리 확인할 수 있는 API
4. **Queue 시스템**: Rate limit에 걸린 요청을 큐에 저장하고 자동으로 재시도

## 참고 사항

- Rate limit 정보는 `localStorage`에 저장되므로, 브라우저의 개인정보 보호 모드에서는 작동하지 않을 수 있습니다.
- 여러 탭에서 동시에 사용하는 경우, 각 탭이 독립적으로 rate limit을 추적합니다.
- OpenAI API의 rate limit은 API 키별로 적용되므로, 여러 사용자가 같은 API 키를 공유하는 경우 주의가 필요합니다.

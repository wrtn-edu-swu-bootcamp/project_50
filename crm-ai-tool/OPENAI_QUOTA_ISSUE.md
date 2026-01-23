# ⚠️ OpenAI API 할당량 초과 문제

## 🔍 문제 진단 결과

OpenAI API가 작동하지 않는 이유를 확인했습니다:

```
Status: 429
Error Type: insufficient_quota
Message: You exceeded your current quota, please check your plan and billing details.
```

**이것은 Rate Limit이 아니라 할당량(Quota) 문제입니다.**

## 📊 현재 상태

- ✅ API 키 형식: 올바름 (`sk-proj-...`)
- ✅ API 연결: 정상
- ✅ 모델 접근: gpt-4o-mini 사용 가능
- ❌ **할당량: 초과됨** ⚠️

## 🔧 해결 방법

### 방법 1: OpenAI 계정 확인 및 결제 (권장)

1. **OpenAI Platform 접속**
   ```
   https://platform.openai.com/account/billing/overview
   ```

2. **현재 사용량 확인**
   - Usage 탭에서 현재 사용량 확인
   - 무료 크레딧이 소진되었는지 확인

3. **결제 수단 등록**
   - Settings → Billing → Payment methods
   - 신용카드 등록
   - 최소 $5 충전 (약 6,500원)

4. **사용 한도 설정 (선택)**
   - Settings → Billing → Usage limits
   - 월 최대 사용 금액 설정 (예: $10)
   - 예상치 못한 과금 방지

### 방법 2: 새 API 키 발급 (무료 크레딧이 남아있는 경우)

1. **새 OpenAI 계정 생성**
   - 다른 이메일로 가입
   - 신규 가입 시 무료 크레딧 제공 ($5-$18)

2. **새 API 키 발급**
   ```
   https://platform.openai.com/api-keys
   ```

3. **`.env.local` 파일 업데이트**
   ```bash
   # .env.local 파일 열기
   code .env.local
   
   # OPENAI_API_KEY 값 변경
   OPENAI_API_KEY=sk-proj-새로운키...
   ```

4. **서버 재시작**
   ```bash
   # 기존 서버 종료
   pkill -f "next dev"
   
   # 서버 재시작
   npm run dev
   ```

### 방법 3: 대체 AI 모델 사용 (임시)

무료 또는 저렴한 대안:

1. **Anthropic Claude** (무료 크레딧 제공)
   - https://console.anthropic.com/

2. **Google Gemini** (무료)
   - https://ai.google.dev/

3. **로컬 LLM** (완전 무료)
   - Ollama + Llama 3
   - 하드웨어 요구사항: 8GB+ RAM

## 💰 비용 안내

### OpenAI GPT-4o-mini 가격
- **입력**: $0.150 / 1M tokens
- **출력**: $0.600 / 1M tokens

### 이 프로젝트의 예상 비용
- 메시지 1개 생성: 약 1,000 tokens
- **메시지 1개당 비용**: 약 $0.001 (약 1.3원)
- **100개 생성**: 약 $0.10 (약 130원)
- **1,000개 생성**: 약 $1.00 (약 1,300원)

💡 **매우 저렴합니다!** $10 충전으로 약 10,000개의 메시지 생성 가능

## 🚀 빠른 해결 (5분 소요)

### 단계별 가이드

**1단계: OpenAI 대시보드 확인**
```bash
# 브라우저에서 열기
open https://platform.openai.com/account/billing/overview
```

**2단계: 사용량 확인**
- "Usage" 탭 클릭
- 현재 사용량 및 한도 확인

**3단계: 결제 수단 등록**
- "Payment methods" 클릭
- "Add payment method" 클릭
- 신용카드 정보 입력

**4단계: 크레딧 충전**
- "Add to credit balance" 클릭
- $5 또는 $10 선택
- "Purchase" 클릭

**5단계: 서버 재시작**
```bash
cd "/Users/joyunseo/Downloads/ai 부트캠프 프로젝트/crm-ai-tool"
pkill -f "next dev"
npm run dev
```

**6단계: 테스트**
- http://localhost:3000/campaign/new 접속
- 메시지 생성 테스트

## 🔍 할당량 확인 방법

### 현재 할당량 확인
```bash
curl https://api.openai.com/v1/dashboard/billing/subscription \
  -H "Authorization: Bearer YOUR_API_KEY" | jq
```

### 사용량 확인
```bash
curl "https://api.openai.com/v1/dashboard/billing/usage?start_date=2026-01-01&end_date=2026-01-31" \
  -H "Authorization: Bearer YOUR_API_KEY" | jq
```

## ⚠️ 주의사항

### 1. API 키 보안
- ✅ `.env.local` 파일은 절대 Git에 커밋하지 마세요
- ✅ API 키를 공개 저장소에 올리지 마세요
- ✅ 정기적으로 API 키를 교체하세요

### 2. 비용 관리
- ✅ 사용 한도 설정 (Usage limits)
- ✅ 이메일 알림 설정
- ✅ 정기적으로 사용량 모니터링

### 3. Rate Limit vs Quota
- **Rate Limit**: 초당/분당 요청 수 제한 (일시적)
- **Quota**: 총 사용 가능한 크레딧 (영구적, 충전 필요)

## 📞 추가 도움

### OpenAI 지원
- 문서: https://platform.openai.com/docs
- 커뮤니티: https://community.openai.com
- 지원: https://help.openai.com

### 이 프로젝트 관련
- `OPENAI_SETUP.md` - API 키 발급 가이드
- `README.md` - 프로젝트 설정 가이드

## ✅ 체크리스트

해결 전 확인:
- [ ] OpenAI 계정에 로그인
- [ ] Billing 페이지 접속
- [ ] 현재 크레딧 잔액 확인
- [ ] 사용량 확인

해결 후 확인:
- [ ] 크레딧 충전 완료
- [ ] 서버 재시작
- [ ] 메시지 생성 테스트
- [ ] 정상 작동 확인

## 🎯 결론

**문제**: OpenAI API 할당량 초과  
**원인**: 무료 크레딧 소진 또는 결제 수단 미등록  
**해결**: 결제 수단 등록 및 크레딧 충전 ($5-$10)  
**예상 시간**: 5-10분  
**비용**: 매우 저렴 (메시지당 약 1원)

---

**마지막 업데이트**: 2026-01-23  
**진단 결과**: ❌ Insufficient Quota  
**해결 상태**: ⏳ 사용자 조치 필요

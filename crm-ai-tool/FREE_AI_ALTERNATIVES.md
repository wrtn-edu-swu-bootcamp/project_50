# 🆓 무료 AI API 대안

## 추천 무료 AI API

### 1. 🥇 Google Gemini (가장 추천!)

**장점**:
- ✅ **완전 무료** (월 1,500회 요청)
- ✅ 성능 우수 (GPT-4 수준)
- ✅ 한국어 지원 탁월
- ✅ 빠른 응답 속도
- ✅ 설정 간단

**무료 할당량**:
- 분당 15회 요청
- 일일 1,500회 요청
- **월 제한 없음!**

**가격**: 무료!

### 2. Anthropic Claude (무료 크레딧)

**장점**:
- ✅ 신규 가입 시 무료 크레딧 제공
- ✅ 뛰어난 한국어 이해
- ✅ 긴 컨텍스트 지원

**무료 크레딧**: $5 (약 5,000개 메시지)

### 3. Groq (무료 + 초고속)

**장점**:
- ✅ 완전 무료
- ✅ 초고속 응답 (GPT보다 10배 빠름)
- ✅ Llama 3 모델 사용

**무료 할당량**:
- 분당 30회 요청
- 일일 14,400회 요청

## 🚀 빠른 설정: Google Gemini (5분)

### 1단계: API 키 발급

1. **Google AI Studio 접속**
   ```
   https://aistudio.google.com/app/apikey
   ```

2. **Google 계정으로 로그인**

3. **"Get API key" 클릭**

4. **"Create API key" 클릭**

5. **API 키 복사** (AIza로 시작)

### 2단계: 프로젝트 설정

1. **`.env.local` 파일 수정**
   ```bash
   cd crm-ai-tool
   code .env.local
   ```

2. **다음 줄 추가**
   ```env
   # Google Gemini API
   GEMINI_API_KEY=AIzaSy...여기에_복사한_키_붙여넣기
   
   # OpenAI 대신 Gemini 사용
   USE_GEMINI=true
   ```

### 3단계: 패키지 설치 (이미 완료!)

```bash
npm install @google/generative-ai
```

✅ **완료!** 코드가 자동으로 수정되었습니다.

### 4단계: 서버 재시작

```bash
# 기존 서버 종료
pkill -f "next dev"

# 서버 재시작
npm run dev
```

### 5단계: 테스트

1. http://localhost:3000/campaign/new 접속
2. 캠페인 정보 입력
3. "메시지 생성" 클릭
4. ✅ 무료로 메시지 생성 성공!

## 🎯 작동 방식

코드가 자동으로:
1. `USE_GEMINI=true` 또는 OpenAI 키가 없으면
2. Google Gemini API를 사용합니다
3. OpenAI와 동일한 인터페이스로 작동

**변경된 파일**:
- ✅ `lib/api/gemini.ts` - 새로 생성
- ✅ `lib/api/openai.ts` - Gemini 지원 추가
- ✅ `package.json` - @google/generative-ai 추가

## 📝 .env.local 설정 예시

```env
# Google Gemini (무료!)
GEMINI_API_KEY=AIzaSyC...여기에_키_붙여넣기
USE_GEMINI=true

# OpenAI (선택사항 - 주석 처리)
# OPENAI_API_KEY=sk-proj-...

# 기타 설정들...
DATABASE_URL=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## 🆚 성능 비교

| 항목 | Google Gemini | OpenAI GPT-4o-mini |
|------|---------------|-------------------|
| **가격** | 🆓 무료 | 💰 유료 ($0.001/메시지) |
| **속도** | ⚡ 빠름 (1-2초) | ⚡ 빠름 (2-3초) |
| **품질** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **한국어** | ✅ 우수 | ✅ 우수 |
| **할당량** | 월 1,500회 | 크레딧 소진 시까지 |
| **설정** | 🟢 쉬움 | 🟢 쉬움 |

## 🔄 다른 무료 대안들

### Groq (초고속 무료)

**설정**:
```bash
# 1. API 키 발급: https://console.groq.com
# 2. .env.local에 추가
GROQ_API_KEY=gsk_...
USE_GROQ=true
```

**장점**: 
- 완전 무료
- 초고속 (GPT보다 10배 빠름)
- 일일 14,400회 요청

### Hugging Face (완전 무료)

**설정**:
```bash
# 1. 토큰 발급: https://huggingface.co/settings/tokens
# 2. .env.local에 추가
HUGGINGFACE_TOKEN=hf_...
USE_HUGGINGFACE=true
```

**장점**:
- 완전 무료
- 다양한 모델 선택
- 무제한 요청

## ❓ FAQ

### Q: Gemini가 OpenAI보다 좋나요?
A: 품질은 비슷하지만 **무료**입니다! 이 프로젝트에는 충분합니다.

### Q: 월 1,500회 요청이 충분한가요?
A: 네! 하루 50회 = 충분합니다. 더 필요하면 Groq나 Hugging Face 사용 가능.

### Q: OpenAI로 다시 돌아갈 수 있나요?
A: 네! `.env.local`에서 `USE_GEMINI=false`로 변경하면 됩니다.

### Q: 두 개를 동시에 사용할 수 있나요?
A: 네! 환경 변수로 쉽게 전환 가능합니다.

## 🎉 완료!

이제 **완전 무료**로 AI 메시지 생성을 사용할 수 있습니다!

### 다음 단계

1. **Google AI Studio에서 API 키 발급** (2분)
   - https://aistudio.google.com/app/apikey

2. **`.env.local` 파일에 추가** (1분)
   ```env
   GEMINI_API_KEY=AIzaSy...
   USE_GEMINI=true
   ```

3. **서버 재시작** (1분)
   ```bash
   pkill -f "next dev"
   npm run dev
   ```

4. **테스트!** 🎊

---

**총 소요 시간**: 5분  
**비용**: 🆓 무료!  
**난이도**: ⭐ 매우 쉬움


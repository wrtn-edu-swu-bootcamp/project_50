# 🚀 Google Gemini 무료 API - 3분 설정 가이드

## ✨ 왜 Gemini인가요?

- 🆓 **완전 무료** (월 1,500회 요청)
- ⚡ **빠른 속도** (1-2초)
- 🇰🇷 **한국어 우수**
- 🎯 **품질 우수** (GPT-4 수준)
- 🔧 **설정 간단** (3분!)

## 📋 3단계로 끝내기

### 1단계: API 키 발급 (1분)

1. **링크 클릭**
   ```
   https://aistudio.google.com/app/apikey
   ```

2. **Google 계정으로 로그인**

3. **"Get API key" 클릭**

4. **"Create API key" 클릭**

5. **API 키 복사** (AIza로 시작하는 긴 문자열)

### 2단계: 자동 설정 스크립트 실행 (1분)

```bash
cd crm-ai-tool
./setup-gemini.sh
```

스크립트가 물어보면:
- API 키 붙여넣기
- Enter 누르기

✅ 자동으로 설정 완료!

### 3단계: 서버 재시작 (1분)

```bash
# 기존 서버 종료
pkill -f "next dev"

# 서버 재시작
npm run dev
```

## 🎉 완료!

이제 http://localhost:3000/campaign/new 에서 무료로 메시지를 생성할 수 있습니다!

---

## 🔧 수동 설정 (스크립트를 사용하지 않는 경우)

### 1. `.env.local` 파일 열기

```bash
code .env.local
```

### 2. 다음 줄 추가

```env
# Google Gemini API (무료)
GEMINI_API_KEY=AIzaSy...여기에_복사한_키_붙여넣기
USE_GEMINI=true
```

### 3. 저장 후 서버 재시작

```bash
pkill -f "next dev"
npm run dev
```

---

## ✅ 작동 확인

### 터미널에서 확인

서버 시작 시 다음 메시지가 보여야 합니다:
```
🔄 Using Google Gemini instead of OpenAI
```

### 브라우저에서 테스트

1. http://localhost:3000/campaign/new 접속
2. 캠페인 정보 입력:
   - 캠페인명: "테스트"
   - 목적: "신규 고객 유치"
   - 타겟: "20-30대"
   - 톤앤매너: "친근한"
   - 주요 메시지: "신규 가입 이벤트"

3. "메시지 생성" 클릭

4. ✅ 1-2초 후 메시지 5개 생성!

---

## 🆚 OpenAI vs Gemini 비교

| 항목 | OpenAI GPT-4o-mini | Google Gemini |
|------|-------------------|---------------|
| 💰 **비용** | 유료 ($0.001/메시지) | 🆓 **무료** |
| ⚡ **속도** | 2-3초 | 1-2초 |
| 📊 **품질** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 🇰🇷 **한국어** | 우수 | 우수 |
| 📈 **할당량** | 크레딧 필요 | 월 1,500회 |
| 🔑 **설정** | 결제 필요 | 무료 가입 |

**결론**: 이 프로젝트에는 Gemini가 완벽합니다! 🎯

---

## 💡 팁

### OpenAI로 돌아가기

`.env.local`에서:
```env
USE_GEMINI=false
```

### 두 개 동시 사용

```env
# OpenAI (유료)
OPENAI_API_KEY=sk-proj-...
USE_GEMINI=false

# Gemini (무료)
GEMINI_API_KEY=AIzaSy...
# USE_GEMINI=true  # 주석 처리
```

필요할 때 `USE_GEMINI`를 true/false로 전환!

### 할당량 확인

Google AI Studio에서:
```
https://aistudio.google.com/app/apikey
```

"Usage" 탭에서 현재 사용량 확인 가능

---

## ❓ 문제 해결

### "Gemini API 키가 설정되지 않았습니다"

**원인**: API 키가 `.env.local`에 없음

**해결**:
```bash
./setup-gemini.sh
```

### "API returned empty response"

**원인**: API 키가 잘못됨

**해결**:
1. API 키 다시 복사
2. `AIza`로 시작하는지 확인
3. `.env.local`에 다시 붙여넣기

### "요청 한도를 초과했습니다"

**원인**: 월 1,500회 할당량 초과

**해결**:
1. 다음 달까지 대기 (자동 리셋)
2. 또는 다른 Google 계정으로 새 API 키 발급
3. 또는 Groq 같은 다른 무료 API 사용

---

## 📚 추가 정보

- **전체 가이드**: `FREE_AI_ALTERNATIVES.md`
- **OpenAI 할당량 문제**: `OPENAI_QUOTA_ISSUE.md`
- **프로젝트 설정**: `README.md`

---

## 🎊 축하합니다!

이제 **완전 무료**로 AI 메시지 생성 기능을 사용할 수 있습니다!

**총 소요 시간**: 3분  
**비용**: 🆓 무료  
**난이도**: ⭐ 매우 쉬움  
**월 사용량**: 1,500회 (충분!)

질문이 있으면 언제든지 물어보세요! 😊

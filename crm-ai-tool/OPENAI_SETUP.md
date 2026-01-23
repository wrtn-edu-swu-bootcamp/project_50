# OpenAI API 키 발급 가이드

## 1. OpenAI Platform 접속
https://platform.openai.com/api-keys

## 2. 로그인 또는 회원가입
- 기존 계정이 있으면 로그인
- 없으면 "Sign up" 클릭

## 3. API 키 생성
1. "API keys" 메뉴 클릭
2. "Create new secret key" 버튼 클릭
3. 키 이름 입력 (예: "CRM AI Tool")
4. "Create secret key" 클릭

## 4. API 키 복사
⚠️ 중요: API 키는 한 번만 표시됩니다!
- 생성된 키 복사 (sk-proj-... 형식)

## 5. .env.local 파일에 붙여넣기
```bash
code .env.local
```

다음 줄을 찾아서:
```
OPENAI_API_KEY=your_openai_api_key_here
```

실제 키로 교체:
```
OPENAI_API_KEY=sk-proj-abc123def456...
```

## 6. 서버 재시작
```bash
npm run dev
```

## 비용
- 신규 가입 시 무료 크레딧 제공
- 이 프로젝트는 매우 적은 토큰 사용 (메시지당 약 $0.01 미만)

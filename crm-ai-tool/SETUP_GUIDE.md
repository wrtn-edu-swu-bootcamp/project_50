# CRM AI Tool 환경 변수 설정 가이드

이 가이드는 CRM AI Tool의 전체 기능을 사용하기 위한 환경 변수 설정 방법을 안내합니다.

## 1. .env.local 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 복사하세요:

```env
# OpenAI API
OPENAI_API_KEY=your_openai_api_key_here

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/sheets/callback

# Database
POSTGRES_URL=your_postgres_connection_string_here

# Encryption (자동 생성된 32자 키)
ENCRYPTION_KEY=144983ba2950f99b87c1e9c624ce367e
```

**참고**: ENCRYPTION_KEY는 이미 생성되어 있습니다.

## 2. OpenAI API 키 발급

1. https://platform.openai.com/api-keys 접속
2. "Create new secret key" 클릭
3. 생성된 키를 복사하여 OPENAI_API_KEY에 붙여넣기

## 3. Google OAuth 설정

1. https://console.cloud.google.com/ 접속
2. 새 프로젝트 생성
3. "API 및 서비스" > "라이브러리"에서 "Google Sheets API" 활성화
4. "OAuth 동의 화면" 구성
5. "사용자 인증 정보" > "OAuth 클라이언트 ID" 생성
6. 리디렉션 URI: http://localhost:3000/api/sheets/callback
7. 클라이언트 ID와 시크릿을 복사하여 설정

## 4. Vercel Postgres 데이터베이스

1. https://vercel.com/dashboard 접속
2. "Storage" > "Create Database" > "Postgres" 선택
3. 연결 문자열(POSTGRES_URL)을 복사하여 설정

## 5. 데이터베이스 스키마 적용

```bash
npm run db:push
```

## 6. 서버 재시작

```bash
npm run dev
```

자세한 내용은 README.md를 참고하세요.

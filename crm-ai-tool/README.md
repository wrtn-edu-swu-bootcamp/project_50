# CRM AI Tool - 메시지 자동 작성 & 성과 예측

AI를 활용하여 앱 푸시 메시지를 빠르게 작성하고, 발송 전 성과를 예측하는 웹 애플리케이션입니다.

## 주요 기능

### 1. AI 메시지 자동 생성
- OpenAI GPT-4.1을 활용한 메시지 자동 생성
- 캠페인 목적, 타겟, 톤앤매너에 맞춘 맞춤형 메시지
- 2-5개의 메시지 옵션 제공
- 메시지 최적화 점수 표시

### 2. 성과 예측
- Google Sheets 연동을 통한 과거 성과 데이터 분석
- AI 기반 클릭률(CTR) 및 전환율 예측
- 유사 캠페인 분석 및 개선 제안
- 업계 평균 벤치마크 제공

### 3. 템플릿 관리
- 자주 사용하는 캠페인 설정을 템플릿으로 저장
- 템플릿 기반 빠른 캠페인 생성
- 템플릿 수정 및 삭제 기능

### 4. 대시보드
- 성과 요약 통계 (총 발송 수, 평균 CTR, 평균 전환율)
- Google Sheets 연결 상태 확인
- 최근 캠페인 목록
- 빠른 캠페인 생성

## 기술 스택

- **프론트엔드**: Next.js 16.1.4, React 19.2.3, TypeScript 5
- **스타일링**: Tailwind CSS 4.1, shadcn/ui 2.5.0
- **데이터베이스**: Vercel Postgres + Drizzle ORM
- **AI**: OpenAI GPT-4.1
- **외부 연동**: Google Sheets API (OAuth 2.0)
- **배포**: Vercel

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn
- OpenAI API 키
- Google Cloud Console 프로젝트 (OAuth 2.0 설정)
- Vercel Postgres 데이터베이스

### 설치

1. 저장소 클론

```bash
git clone <repository-url>
cd crm-ai-tool
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정합니다:

```env
# OpenAI API
OPENAI_API_KEY=your_openai_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/sheets/callback

# Database
POSTGRES_URL=your_postgres_connection_string

# Encryption (32자 랜덤 문자열)
ENCRYPTION_KEY=your_32_character_encryption_key
```

4. 데이터베이스 마이그레이션

```bash
npm run db:push
```

5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인합니다.

## 환경 변수 설정 가이드

### OpenAI API 키 발급
1. [OpenAI Platform](https://platform.openai.com/)에 접속
2. API Keys 메뉴에서 새 키 생성
3. `OPENAI_API_KEY`에 설정

### Google OAuth 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "사용자 인증 정보" 이동
4. "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID" 선택
5. 애플리케이션 유형: 웹 애플리케이션
6. 승인된 리디렉션 URI 추가:
   - 개발: `http://localhost:3000/api/sheets/callback`
   - 프로덕션: `https://your-domain.com/api/sheets/callback`
7. 클라이언트 ID와 시크릿을 환경 변수에 설정

### Vercel Postgres 설정
1. [Vercel Dashboard](https://vercel.com/dashboard)에서 Storage 탭 이동
2. "Create Database" > "Postgres" 선택
3. 연결 문자열을 `POSTGRES_URL`에 설정

## 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint

# 데이터베이스 마이그레이션 생성
npm run db:generate

# 데이터베이스 스키마 푸시
npm run db:push

# Drizzle Studio 실행 (데이터베이스 GUI)
npm run db:studio
```

## 프로젝트 구조

```
crm-ai-tool/
├── app/                    # Next.js App Router
│   ├── (main)/            # 메인 레이아웃 그룹
│   │   ├── dashboard/     # 대시보드 페이지
│   │   ├── campaign/      # 캠페인 작성 페이지
│   │   ├── templates/     # 템플릿 관리 페이지
│   │   └── settings/      # 설정 페이지
│   ├── api/               # API 라우트
│   │   ├── ai/           # AI 메시지 생성 & 성과 예측
│   │   ├── campaigns/    # 캠페인 CRUD
│   │   ├── templates/    # 템플릿 CRUD
│   │   ├── settings/     # 설정 관리
│   │   └── sheets/       # Google Sheets 연동
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 기본 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── dashboard/        # 대시보드 컴포넌트
│   ├── campaign/         # 캠페인 컴포넌트
│   ├── template/         # 템플릿 컴포넌트
│   ├── settings/         # 설정 컴포넌트
│   └── shared/           # 공통 컴포넌트
├── lib/                   # 유틸리티 및 라이브러리
│   ├── api/              # API 클라이언트
│   ├── db/               # 데이터베이스 설정 및 쿼리
│   ├── validations/      # Zod 스키마
│   ├── constants/        # 상수
│   └── utils/            # 유틸리티 함수
├── types/                 # TypeScript 타입 정의
└── public/               # 정적 파일
```

## Vercel 배포

### 1. Vercel 프로젝트 생성

```bash
# Vercel CLI 설치 (선택사항)
npm i -g vercel

# 프로젝트 연결
vercel
```

### 2. 환경 변수 설정

Vercel Dashboard에서 다음 환경 변수를 설정합니다:

- `OPENAI_API_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI` (프로덕션 URL로 변경)
- `POSTGRES_URL`
- `ENCRYPTION_KEY`

### 3. 데이터베이스 마이그레이션

Vercel Postgres 데이터베이스에 스키마를 적용합니다:

```bash
npm run db:push
```

### 4. 배포

```bash
vercel --prod
```

## 사용 가이드

### 1. Google Sheets 연결

1. 대시보드에서 "Google Sheets 연결" 버튼 클릭
2. Google 계정 로그인 및 권한 승인
3. 성과 데이터가 포함된 시트 URL 입력
4. "동기화" 버튼으로 데이터 가져오기

### 2. 캠페인 작성

1. "새 캠페인 만들기" 버튼 클릭
2. 캠페인 정보 입력:
   - 캠페인 제목
   - 목적 (신상품 프로모션, 할인 프로모션 등)
   - 타겟 고객
   - 주요 메시지
   - 톤앤매너
3. "메시지 생성" 버튼 클릭
4. 생성된 메시지 중 하나 선택
5. 성과 예측 확인
6. "캠페인 저장" 또는 "템플릿으로 저장"

### 3. 템플릿 활용

1. "템플릿 관리" 페이지 이동
2. 저장된 템플릿에서 "사용" 버튼 클릭
3. 캠페인 작성 페이지로 이동하여 템플릿 정보 자동 입력
4. 필요시 수정 후 메시지 생성

## 메시지 작성 규칙

- 제목: 최대 20자
- 소제목: 최대 16자
- 내용: 줄당 최대 22자
- 필수 포함: "수신거부: 마이페이지 > 설정"
- 항상 존댓말 사용
- 직관적 표현 사용
- 감성적/커머셜 표현 금지

## 트러블슈팅

### 데이터베이스 연결 오류

```
VercelPostgresError - 'missing_connection_string'
```

**해결**: `.env.local` 파일에 `POSTGRES_URL`이 올바르게 설정되어 있는지 확인하세요.

### OpenAI API 오류

```
OpenAI API 키가 설정되지 않았습니다
```

**해결**: `OPENAI_API_KEY`가 올바르게 설정되어 있는지 확인하세요.

### Google Sheets 인증 실패

**해결**: 
1. Google Cloud Console에서 OAuth 리디렉션 URI가 올바른지 확인
2. `GOOGLE_REDIRECT_URI`가 현재 도메인과 일치하는지 확인

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---
name: CRM AI 개발 계획
overview: CRM 메시지 자동 작성 & 성과 예측 툴을 Phase 1부터 Phase 5까지 단계별로 구축합니다. 각 단계는 이전 단계의 완료를 기반으로 하며, 비개발자도 이해할 수 있도록 상세하게 작성되었습니다.
todos:
  - id: phase1-setup
    content: "Phase 1: 프로젝트 초기 설정 - Next.js 프로젝트 생성, 패키지 설치, shadcn/ui 초기화, 폴더 구조 생성, Tailwind 설정, 환경 변수 설정"
    status: completed
  - id: phase2-database
    content: "Phase 2: 데이터베이스 및 레이아웃 - Drizzle ORM 스키마 정의, 마이그레이션, 쿼리 함수 작성, 공통 레이아웃 컴포넌트, UI 컴포넌트 커스터마이징"
    status: completed
  - id: phase3-dashboard
    content: "Phase 3: 대시보드 및 템플릿 - 대시보드 페이지 구현, 템플릿 관리 페이지, 템플릿 CRUD API, 설정 페이지 UI 및 API"
    status: completed
  - id: phase4-ai
    content: "Phase 4: AI 메시지 생성 - OpenAI API 연동, AI 프롬프트 작성, 메시지 생성 API, 캠페인 작성 페이지 (정보 입력 및 메시지 생성 섹션), 메시지 검증"
    status: completed
  - id: phase5-sheets
    content: "Phase 5: Google Sheets 연동 및 성과 예측 - Google OAuth 설정, 인증 API, 데이터 동기화 API, 연결 상태 카드, 성과 예측 알고리즘, 성과 예측 섹션, 캠페인 저장"
    status: completed
  - id: phase6-deploy
    content: "Phase 6: 테스트 및 배포 - 에러 핸들링, 반응형 디자인, 성능 최적화, 접근성 개선, Vercel 배포, 문서화"
    status: completed
---

# CRM 메시지 자동 작성 & 성과 예측 툴 - 개발 계획

## 프로젝트 개요

이 프로젝트는 마케터가 AI를 활용하여 앱 푸시 메시지를 빠르게 작성하고, 발송 전 성과를 예측하는 웹 애플리케이션입니다. Next.js 15, React 19, TypeScript를 기반으로 하며, OpenAI GPT-4.1과 Google Sheets API를 연동합니다.

## 기술 스택 요약

- **프론트엔드**: Next.js 15.5, React 19.2.3, TypeScript 5.9
- **스타일링**: Tailwind CSS 4.1, shadcn/ui 2.5.0
- **데이터베이스**: Vercel Postgres + Drizzle ORM
- **AI**: OpenAI GPT-4.1
- **외부 연동**: Google Sheets API (OAuth 2.0)
- **배포**: Vercel

## Phase별 개발 계획

---

## Phase 1: 프로젝트 초기 설정 및 기본 구조 구축

**목표**: 개발 환경을 설정하고 프로젝트의 기본 뼈대를 만듭니다.

### 1-1. Next.js 프로젝트 생성

**작업 내용**:

- Next.js 15.5 프로젝트를 생성합니다
- TypeScript와 Tailwind CSS를 함께 설정합니다
- App Router 방식을 사용합니다

**명령어**:

```bash
npx create-next-app@latest crm-ai-tool --typescript --tailwind --app
cd crm-ai-tool
```

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 11.1 초기 설정

### 1-2. 필수 패키지 설치

**작업 내용**:

- AI 연동을 위한 OpenAI SDK 설치
- Google Sheets 연동을 위한 googleapis 설치
- 데이터베이스 연결을 위한 Drizzle ORM 설치
- 폼 관리를 위한 react-hook-form과 zod 설치
- UI 컴포넌트를 위한 shadcn/ui 관련 패키지 설치

**명령어**:

```bash
npm install openai googleapis @google-cloud/local-auth
npm install @vercel/postgres drizzle-orm drizzle-kit
npm install react-hook-form zod @hookform/resolvers
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react date-fns sonner
```

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 1.1 Core Technologies

### 1-3. shadcn/ui 초기화 및 컴포넌트 설치

**작업 내용**:

- shadcn/ui를 초기화하여 UI 컴포넌트 라이브러리를 설정합니다
- 프로젝트에서 사용할 기본 컴포넌트들을 설치합니다

**명령어**:

```bash
npx shadcn@latest init
npx shadcn@latest add button input card select textarea badge table
```

**참고 문서**: [`docs/design_guide.md`](docs/design_guide.md) - 섹션 4 컴포넌트

### 1-4. 폴더 구조 생성

**작업 내용**:

- 프로젝트의 폴더 구조를 생성합니다
- `src/app`, `src/components`, `src/lib` 등의 디렉토리를 만듭니다

**생성할 폴더**:

```
src/
├── app/
│   ├── (main)/
│   │   ├── dashboard/
│   │   ├── campaign/
│   │   ├── templates/
│   │   └── settings/
│   └── api/
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   ├── campaign/
│   ├── template/
│   └── settings/
├── lib/
│   ├── db/
│   ├── validations/
│   ├── utils/
│   └── constants/
└── types/
```

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 2.1 폴더 구조

### 1-5. Tailwind CSS 커스텀 설정

**작업 내용**:

- 디자인 가이드에 맞춰 Tailwind CSS 설정을 커스터마이징합니다
- Primary 컬러(#5FB3B3), Secondary 컬러(#1E293B) 등을 추가합니다
- Pretendard 폰트를 설정합니다

**수정 파일**: `tailwind.config.ts`

**참고 문서**:

- [`docs/design_guide.md`](docs/design_guide.md) - 섹션 2 컬러 시스템
- [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 4.2 Tailwind 설정

### 1-6. 환경 변수 설정

**작업 내용**:

- `.env.local` 파일을 생성합니다
- OpenAI API 키, Google OAuth 정보, 데이터베이스 연결 정보를 설정합니다

**환경 변수 목록**:

```
OPENAI_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
POSTGRES_URL=
ENCRYPTION_KEY=
```

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 7.2 환경 변수

### 1-7. Git 초기화 및 첫 커밋

**작업 내용**:

- Git 저장소를 초기화합니다
- `.gitignore`에 환경 변수 파일을 추가합니다
- 초기 설정을 커밋합니다

**명령어**:

```bash
git init
git add .
git commit -m "feat: 프로젝트 초기 설정"
```

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 11.2 Git 워크플로우

---

## Phase 2: 데이터베이스 설계 및 기본 레이아웃 구축

**목표**: 데이터베이스 스키마를 정의하고, 모든 페이지에서 공통으로 사용할 레이아웃을 만듭니다.

### 2-1. Drizzle ORM 스키마 정의

**작업 내용**:

- 캠페인, 템플릿, 설정, 성과 데이터 테이블 스키마를 정의합니다
- TypeScript 타입을 함께 정의합니다

**생성 파일**: `src/lib/db/schema.ts`

**스키마 구성**:

- `campaigns`: 캠페인 정보 (제목, 목적, 타겟, 생성된 메시지 등)
- `templates`: 템플릿 정보 (이름, 목적, 타겟, 톤앤매너 등)
- `settings`: 메시지 작성 규칙 (글자수 제한, 금지 표현 등)
- `performanceData`: Google Sheets에서 가져온 과거 성과 데이터
- `googleSheetConnection`: Google Sheets 연동 정보 (토큰, URL 등)

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 6.1 Drizzle ORM 스키마

### 2-2. 데이터베이스 마이그레이션

**작업 내용**:

- Drizzle Kit을 사용하여 마이그레이션 파일을 생성합니다
- Vercel Postgres에 스키마를 적용합니다

**명령어**:

```bash
npm run db:generate
npm run db:push
```

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 11.4 개발 스크립트

### 2-3. 데이터베이스 쿼리 함수 작성

**작업 내용**:

- 캠페인, 템플릿, 설정 등을 조회/생성/수정/삭제하는 함수를 작성합니다
- TypeScript 타입 안전성을 보장합니다

**생성 파일**:

- `src/lib/db/queries/campaigns.ts`
- `src/lib/db/queries/templates.ts`
- `src/lib/db/queries/settings.ts`
- `src/lib/db/queries/performance.ts`

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 6.2 쿼리 함수

### 2-4. 공통 레이아웃 컴포넌트 작성

**작업 내용**:

- 헤더(네비게이션 포함)를 만듭니다
- 모든 페이지에서 사용할 레이아웃을 구성합니다

**생성 파일**:

- `src/components/layout/header.tsx`
- `src/components/layout/main-layout.tsx`
- `src/app/(main)/layout.tsx`

**헤더 구성 요소**:

- 로고
- 네비게이션 메뉴 (대시보드, 새 캠페인, 템플릿 관리, 설정)
- 다크 네이비(#1E293B) 배경

**참고 문서**:

- [`docs/design_guide.md`](docs/design_guide.md) - 섹션 5.5 헤더
- [`docs/wireframes.md`](docs/wireframes.md) - 섹션 1 대시보드

### 2-5. 글로벌 스타일 적용

**작업 내용**:

- Pretendard 폰트를 로드합니다
- 전역 CSS 스타일을 설정합니다

**수정 파일**:

- `src/app/layout.tsx`
- `src/app/globals.css`

**참고 문서**: [`docs/design_guide.md`](docs/design_guide.md) - 섹션 3 타이포그래피

### 2-6. 기본 UI 컴포넌트 커스터마이징

**작업 내용**:

- shadcn/ui의 Button, Input, Card 등을 디자인 가이드에 맞게 수정합니다
- Primary 컬러와 Secondary 컬러를 적용합니다

**수정 파일**:

- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/card.tsx`

**참고 문서**: [`docs/design_guide.md`](docs/design_guide.md) - 섹션 4 컴포넌트

---

## Phase 3: 대시보드 및 템플릿 관리 페이지 구현

**목표**: 사용자가 과거 캠페인을 확인하고, 템플릿을 관리할 수 있는 페이지를 만듭니다.

### 3-1. 대시보드 페이지 구현

**작업 내용**:

- 성과 요약 카드 3개 (총 발송 수, 평균 클릭률, 평균 전환율)를 만듭니다
- Google Sheets 연결 상태 카드를 만듭니다
- 최근 캠페인 테이블을 만듭니다
- "새 캠페인 만들기" CTA 버튼을 추가합니다

**생성 파일**:

- `src/app/(main)/dashboard/page.tsx`
- `src/components/dashboard/performance-summary.tsx`
- `src/components/dashboard/connection-status-card.tsx`
- `src/components/dashboard/campaign-table.tsx`

**연결 상태 배지**:

- 연결됨 (초록색 ●)
- 미연결 (회색 ●)
- 오류 (빨간색 ●)

**참고 문서**:

- [`docs/wireframes.md`](docs/wireframes.md) - 섹션 1 대시보드
- [`docs/design_guide.md`](docs/design_guide.md) - 섹션 9.1 대시보드

### 3-2. 템플릿 관리 페이지 구현

**작업 내용**:

- 저장된 템플릿 목록을 카드 그리드로 표시합니다
- 각 템플릿 카드에 사용, 편집, 삭제 버튼을 추가합니다
- "새 템플릿 만들기" 버튼을 추가합니다

**생성 파일**:

- `src/app/(main)/templates/page.tsx`
- `src/components/template/template-card.tsx`
- `src/components/template/template-form.tsx`

**템플릿 카드 정보**:

- 템플릿명
- 목적, 타겟, 톤앤매너
- 생성일, 마지막 수정일

**참고 문서**:

- [`docs/wireframes.md`](docs/wireframes.md) - 섹션 3 템플릿 관리 페이지
- [`docs/design_guide.md`](docs/design_guide.md) - 섹션 9.3 템플릿 관리 페이지

### 3-3. 템플릿 CRUD API 구현

**작업 내용**:

- 템플릿 생성, 조회, 수정, 삭제 API를 만듭니다
- Zod를 사용하여 입력 데이터를 검증합니다

**생성 파일**:

- `src/app/api/templates/route.ts`
- `src/app/api/templates/[id]/route.ts`
- `src/lib/validations/template.ts`

**참고 문서**:

- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 4.2 템플릿 데이터
- [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 5 API 설계

### 3-4. 설정 페이지 UI 구현

**작업 내용**:

- 메시지 포맷 설정 섹션을 만듭니다
- 글자수 제한 설정 섹션을 만듭니다
- 작성 규칙 설정 섹션을 만듭니다 (항상 존댓말 사용 포함)
- 금지 표현 관리 섹션을 만듭니다

**생성 파일**:

- `src/app/(main)/settings/page.tsx`
- `src/components/settings/message-format-settings.tsx`
- `src/components/settings/character-limit-settings.tsx`
- `src/components/settings/writing-rules-settings.tsx`
- `src/components/settings/forbidden-words-settings.tsx`

**참고 문서**:

- [`docs/wireframes.md`](docs/wireframes.md) - 섹션 4 설정 페이지
- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 2.4 설정 페이지

### 3-5. 설정 API 구현

**작업 내용**:

- 설정 조회 및 업데이트 API를 만듭니다
- 기본값 초기화 기능을 추가합니다

**생성 파일**:

- `src/app/api/settings/route.ts`
- `src/lib/validations/settings.ts`

**기본 설정값**:

- 제목 최대 글자수: 20자
- 소제목 최대 글자수: 16자
- 내용 줄당 최대 글자수: 22자
- 필수 포함 문구: "수신거부: 마이페이지 > 설정"
- 작성 규칙: 직관적 표현, 감성적/커머셜 표현 금지, 제목과 첫째줄 문장 분리, 항상 존댓말 사용

**참고 문서**: [`docs/service_plan.md`](docs/service_plan.md) - 섹션 2.4 설정 페이지

---

## Phase 4: AI 메시지 생성 기능 구현

**목표**: OpenAI GPT-4.1을 연동하여 캠페인 메시지를 자동 생성하는 핵심 기능을 만듭니다.

### 4-1. OpenAI API 연동 설정

**작업 내용**:

- OpenAI SDK를 초기화합니다
- API 키를 환경 변수에서 로드합니다
- 에러 핸들링을 추가합니다

**생성 파일**:

- `src/lib/api/openai.ts`

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 5.1 AI 메시지 생성

### 4-2. AI 프롬프트 작성

**작업 내용**:

- 사내 메시지 작성 규칙을 프롬프트에 포함시킵니다
- 캠페인 정보(목적, 타겟, 톤앤매너 등)를 프롬프트에 반영합니다
- 항상 존댓말을 사용하도록 지시합니다

**프롬프트 구성 요소**:

- 시스템 메시지: "당신은 CRM 푸시 메시지 작성 전문가입니다"
- 규칙: 글자수 제한, 직관적 표현, 제목과 첫째줄 분리, 항상 존댓말 사용
- 사용자 입력: 캠페인 목적, 타겟, 주요 메시지, 톤앤매너

**생성 파일**:

- `src/lib/api/prompts.ts`

**참고 문서**:

- [`.cursorrules`](.cursorrules) - 섹션 "AI 통합"
- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 2.2.2 AI 메시지 생성

### 4-3. 메시지 생성 API 구현

**작업 내용**:

- POST 요청을 받아 OpenAI API를 호출합니다
- 2-5개의 메시지 옵션을 생성합니다
- 각 메시지의 최적화 점수를 계산합니다

**생성 파일**:

- `src/app/api/ai/generate/route.ts`
- `src/lib/api/message-optimizer.ts`

**최적화 점수 계산 기준**:

- 제목 길이 (10자 이하 권장)
- 긴급성 표현 포함 여부
- 이모지 사용 여부
- 글자수 제한 준수 여부

**참고 문서**:

- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 2.6 메시지 최적화 가이드
- [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 5.1 AI 메시지 생성

### 4-4. 캠페인 작성 페이지 - 정보 입력 섹션

**작업 내용**:

- 캠페인 제목, 목적, 타겟, 주요 메시지 입력 필드를 만듭니다
- 톤앤매너 선택 드롭다운을 추가합니다
- 이모지 사용, 문장 길이 옵션을 추가합니다
- 포함/제외 키워드 입력 필드를 추가합니다
- 템플릿 불러오기 기능을 추가합니다

**생성 파일**:

- `src/app/(main)/campaign/new/page.tsx`
- `src/components/campaign/campaign-info-form.tsx`

**드롭다운 옵션**:

- 캠페인 목적: 신상품 프로모션, 할인 프로모션, 재구매 유도, 이벤트 참여, 직접 입력
- 타겟 고객: 신규 회원, VIP 회원, 전체 회원, 해당 브랜드 구매 유관 행동 고객
- 톤앤매너: 친근한, 모던한, 긴급한, 감사, 안내

**참고 문서**:

- [`docs/wireframes.md`](docs/wireframes.md) - 섹션 2 캠페인 작성 페이지
- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 2.2.1 캠페인 정보 입력

### 4-5. 캠페인 작성 페이지 - 메시지 생성 섹션

**작업 내용**:

- "메시지 생성" 버튼을 추가합니다
- 생성된 메시지를 카드 형태로 표시합니다
- 각 메시지 카드에 제목, 소제목, 내용, 글자수를 표시합니다
- 최적화 점수를 표시합니다
- "선택", "재생성", "수동편집" 버튼을 추가합니다

**생성 파일**:

- `src/components/campaign/message-generator.tsx`
- `src/components/campaign/message-card.tsx`

**메시지 카드 구성**:

- 제목 (글자수 표시)
- (광고) 소제목 (글자수 표시)
- 내용 1~2줄 (글자수 표시)
- 수신거부: 마이페이지 > 설정 (고정)
- 최적화 점수 (100점 만점)

**참고 문서**:

- [`docs/wireframes.md`](docs/wireframes.md) - 섹션 2 캠페인 작성 페이지
- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 2.2.2 AI 메시지 생성

### 4-6. 메시지 검증 로직 구현

**작업 내용**:

- 글자수 제한을 검증합니다
- 금지 표현이 포함되어 있는지 확인합니다
- 필수 포함 문구가 있는지 확인합니다

**생성 파일**:

- `src/lib/validations/message.ts`

**검증 규칙**:

- 제목: 최대 20자
- 소제목: 최대 16자
- 내용: 줄당 최대 22자
- 금지 표현 체크
- 필수 문구: "수신거부: 마이페이지 > 설정"

**참고 문서**:

- [`.cursorrules`](.cursorrules) - 섹션 "비즈니스 로직"
- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 2.2.2 사내 메시지 작성 규칙

---

## Phase 5: Google Sheets 연동 및 성과 예측 기능 구현

**목표**: Google Sheets에서 과거 성과 데이터를 가져와 AI 기반 성과 예측을 제공합니다.

### 5-1. Google OAuth 2.0 설정

**작업 내용**:

- Google Cloud Console에서 OAuth 2.0 클라이언트 ID를 생성합니다
- 리디렉션 URI를 설정합니다
- 환경 변수에 클라이언트 ID와 시크릿을 추가합니다

**필요한 권한**:

- `https://www.googleapis.com/auth/spreadsheets.readonly`

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 7.1 Google OAuth 플로우

### 5-2. Google Sheets 인증 API 구현

**작업 내용**:

- OAuth 인증 URL을 생성하는 API를 만듭니다
- 콜백을 처리하여 토큰을 저장합니다
- 토큰을 암호화하여 데이터베이스에 저장합니다

**생성 파일**:

- `src/app/api/sheets/auth/route.ts`
- `src/app/api/sheets/callback/route.ts`
- `src/lib/api/google-auth.ts`

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 5.3 Google Sheets 연동

### 5-3. Google Sheets 데이터 동기화 API 구현

**작업 내용**:

- Google Sheets에서 데이터를 읽어오는 API를 만듭니다
- 데이터를 파싱하여 데이터베이스에 저장합니다
- 자동 동기화 스케줄러를 설정합니다 (매일 오전 10시)

**생성 파일**:

- `src/app/api/sheets/sync/route.ts`
- `src/lib/api/sheets-sync.ts`

**데이터 필드**:

- 캠페인명, 발송일, 발송 시간
- 메시지 내용
- 발송 수, 클릭 수, 전환 수
- 클릭률, 전환율

**참고 문서**:

- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 2.5 성과 데이터 연동
- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 4.3 과거 성과 데이터

### 5-4. 대시보드 연결 상태 카드 구현

**작업 내용**:

- Google Sheets 연결 상태를 표시합니다
- 마지막 동기화 시간을 표시합니다
- "지금 동기화" 버튼을 추가합니다

**연결 상태**:

- 연결됨 (초록색 ●): 정상 연결
- 미연결 (회색 ●): 아직 연결 안 함
- 오류 (빨간색 ●): 권한 문제 또는 시트 삭제

**생성 파일**:

- `src/components/dashboard/connection-status-card.tsx`
- `src/components/dashboard/sync-button.tsx`

**참고 문서**:

- [`docs/wireframes.md`](docs/wireframes.md) - 섹션 1 대시보드
- [`docs/design_guide.md`](docs/design_guide.md) - 섹션 4.11 연결 상태 카드

### 5-5. 성과 예측 알고리즘 구현

**작업 내용**:

- 과거 데이터를 기반으로 예상 클릭률과 전환율을 계산합니다
- 유사한 타겟, 톤앤매너의 캠페인 데이터를 필터링합니다
- 업계 평균 벤치마크를 제공합니다

**예측 로직**:

1. 데이터 연결 확인
2. 데이터 있음: 유사 캠페인 필터링 → 평균 계산 → 신뢰도 계산
3. 데이터 없음: 업계 평균 반환 (CTR 4.1%, 전환율 2.0%)

**생성 파일**:

- `src/app/api/ai/predict/route.ts`
- `src/lib/api/performance-predictor.ts`

**참고 문서**:

- [`docs/service_plan.md`](docs/service_plan.md) - 섹션 2.2.3 성과 예측
- [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 5.2 성과 예측

### 5-6. 캠페인 작성 페이지 - 성과 예측 섹션

**작업 내용**:

- 메시지 선택 시 성과 예측을 표시합니다
- 데이터 연결 상태에 따라 다른 UI를 보여줍니다
- 예상 클릭률과 전환율을 게이지 차트로 표시합니다
- 예측 근거와 개선 제안을 표시합니다

**데이터 연결됨 상태**:

- 예상 클릭률, 예상 전환율 (게이지 차트)
- 평균 대비 비교 (예: +15% ↑)
- 신뢰도 표시 (예: 85%)
- 예측 근거 (유사 캠페인 개수, 업계 평균 비교)
- 개선 제안 (제목 길이, 긴급성 표현, 최적 발송 시간)

**데이터 미연결 상태**:

- Empty State 표시
- "성과 예측을 사용하려면 성과 데이터를 먼저 연결하세요"
- "대시보드에서 연결하기" 버튼

**생성 파일**:

- `src/components/campaign/performance-prediction.tsx`
- `src/components/campaign/prediction-gauge.tsx`
- `src/components/campaign/prediction-empty-state.tsx`

**참고 문서**:

- [`docs/wireframes.md`](docs/wireframes.md) - 섹션 2 캠페인 작성 페이지 (섹션 3)
- [`docs/design_guide.md`](docs/design_guide.md) - 섹션 4.12 Empty State

### 5-7. 캠페인 저장 및 내보내기 기능

**작업 내용**:

- "캠페인 저장" 버튼을 추가합니다
- "템플릿으로 저장" 버튼을 추가합니다
- "메시지 복사" 버튼을 추가합니다

**생성 파일**:

- `src/components/campaign/save-buttons.tsx`
- `src/app/api/campaigns/route.ts`

**참고 문서**: [`docs/wireframes.md`](docs/wireframes.md) - 섹션 2 캠페인 작성 페이지 (섹션 4)

---

## Phase 6: 테스트, 최적화 및 배포

**목표**: 애플리케이션을 테스트하고, 성능을 최적화하며, Vercel에 배포합니다.

### 6-1. 에러 핸들링 및 로딩 상태 추가

**작업 내용**:

- API 호출 실패 시 에러 메시지를 표시합니다
- 로딩 중 스켈레톤 UI를 표시합니다
- Toast 알림을 추가합니다

**생성 파일**:

- `src/components/shared/loading-skeleton.tsx`
- `src/components/shared/error-message.tsx`

**참고 문서**: [`docs/design_guide.md`](docs/design_guide.md) - 섹션 8.5 로딩 애니메이션

### 6-2. 반응형 디자인 적용

**작업 내용**:

- 모바일, 태블릿, 데스크톱에서 정상 작동하는지 확인합니다
- 필요한 경우 미디어 쿼리를 추가합니다

**브레이크포인트**:

- Mobile: 0-767px
- Tablet: 768-1023px
- Desktop: 1024px+

**참고 문서**: [`docs/design_guide.md`](docs/design_guide.md) - 섹션 7 반응형 디자인

### 6-3. 성능 최적화

**작업 내용**:

- 이미지 최적화 (next/image 사용)
- 코드 스플리팅 (dynamic import)
- API 캐싱 설정
- Server Components 최대 활용

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 9 성능 최적화

### 6-4. 접근성 개선

**작업 내용**:

- 키보드 네비게이션 지원
- 스크린 리더 지원 (ARIA 레이블)
- 색상 대비 WCAG AA 준수

**참고 문서**: [`docs/design_guide.md`](docs/design_guide.md) - 섹션 10 접근성

### 6-5. Vercel 배포 설정

**작업 내용**:

- `vercel.json` 파일을 생성합니다
- 환경 변수를 Vercel에 설정합니다
- 프로덕션 빌드를 테스트합니다

**명령어**:

```bash
npm run build
vercel --prod
```

**참고 문서**: [`docs/code_architecture.md`](docs/code_architecture.md) - 섹션 10 배포 및 인프라

### 6-6. 문서화 및 README 작성

**작업 내용**:

- README.md를 작성합니다
- 설치 방법, 환경 변수 설정, 실행 방법을 문서화합니다

**참고 문서**: 모든 `docs/` 파일

---

## 개발 우선순위 및 예상 소요 시간

### 필수 기능 (MVP)

1. **Phase 1-2**: 프로젝트 설정 및 데이터베이스 구축
2. **Phase 3**: 대시보드 및 템플릿 관리
3. **Phase 4**: AI 메시지 생성 (핵심 기능)
4. **Phase 5**: Google Sheets 연동 및 성과 예측
5. **Phase 6**: 테스트 및 배포

### 향후 확장 가능 기능

- 실시간 행동 기반 트리거 메시지
- 리치 미디어 지원 (이미지, GIF)
- 실제 메시지 발송 기능
- 다크 모드
- 팀 협업 기능

---

## 참고 문서 요약

- **서비스 기획**: [`docs/service_plan.md`](docs/service_plan.md)
- **화면 설계**: [`docs/wireframes.md`](docs/wireframes.md)
- **디자인 가이드**: [`docs/design_guide.md`](docs/design_guide.md)
- **코드 아키텍처**: [`docs/code_architecture.md`](docs/code_architecture.md)
- **코딩 규칙**: [`.cursorrules`](.cursorrules)

---

## 중요 체크리스트

### 코드 작성 시 항상 확인

- [ ] Server Components 우선 사용
- [ ] TypeScript 타입 안전성 보장
- [ ] 글자수 제한 준수 (제목 20, 소제목 16, 내용 22)
- [ ] 항상 존댓말 사용 (AI 프롬프트 및 UI 텍스트)
- [ ] Primary 컬러 (#5FB3B3) 일관성
- [ ] 4px 간격 시스템 준수
- [ ] 환경 변수 보안 관리

### 각 Phase 완료 후 확인

- [ ] 기능이 정상 작동하는가?
- [ ] 디자인 가이드를 준수했는가?
- [ ] 에러 핸들링이 되어 있는가?
- [ ] 로딩 상태가 표시되는가?
- [ ] 반응형 디자인이 적용되었는가?
- [ ] Git 커밋을 했는가?

---

이 계획서는 비개발자도 이해할 수 있도록 작성되었으며, 각 단계마다 참고해야 할 문서와 위치를 명시했습니다. 궁금한 점이 있으면 언제든지 질문해주세요!
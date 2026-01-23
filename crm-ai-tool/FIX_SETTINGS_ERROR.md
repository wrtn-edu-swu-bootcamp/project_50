# 설정 탭 오류 해결 가이드

## 문제
설정 페이지에서 "설정을 불러오는데 실패했습니다" 오류 발생

## 원인
데이터베이스(PostgreSQL)가 연결되지 않음

## 해결 방법

### 1단계: Neon PostgreSQL 데이터베이스 생성 (무료)

Neon은 완전 무료 티어를 제공하며, 신용카드가 필요 없습니다.
- 무료: 0.5GB 스토리지, 100 CU-hours/월
- 무제한 사용 기간

**방법 A: Vercel Marketplace 통해 생성**

1. **Vercel 접속**: https://vercel.com/dashboard
2. **Storage 메뉴 클릭**
3. **Marketplace Database Providers에서 "Neon" → "Create" 클릭**
4. Neon 계정 생성 (GitHub 또는 이메일로 가입)
5. 데이터베이스 이름 입력: `crm-ai-tool`
6. Region: Asia Pacific (Singapore) 또는 가까운 지역 선택

**방법 B: Neon 직접 가입 (권장, 더 빠름)**

1. **Neon 접속**: https://console.neon.tech/signup
2. **GitHub 또는 이메일로 가입** (무료)
3. **Create Project 클릭**
   - Project name: `crm-ai-tool`
   - Postgres version: 16 (기본값)
   - Region: Asia Pacific (Singapore)
4. **Create Project 클릭**

### 2단계: 연결 문자열 복사

1. Neon Dashboard에서 프로젝트 선택
2. **Connection Details** 또는 **Connection string** 찾기
3. "Pooled connection" 또는 일반 연결 문자열 복사
   - 형식: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`

### 3단계: .env.local 파일 업데이트

파일 위치: `crm-ai-tool/.env.local`

다음 줄을 찾아서:
```env
POSTGRES_URL=your_postgres_connection_string_here
```

Neon에서 복사한 실제 값으로 교체:
```env
POSTGRES_URL=postgresql://neondb_owner:abc123xyz@ep-cool-name-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

**⚠️ 중요**: 실제 Neon에서 받은 연결 문자열을 사용하세요!

### 4단계: 자동 설정 스크립트 실행

터미널에서:
```bash
cd crm-ai-tool
./setup-database.sh
```

이 스크립트는:
- POSTGRES_URL 설정 확인
- 데이터베이스 테이블 자동 생성
- 설정 완료 안내

### 5단계: 개발 서버 시작

```bash
npm run dev
```

### 6단계: 확인

브라우저에서 http://localhost:3000/settings 접속

정상 작동 확인:
- ✅ 설정 페이지 로드
- ✅ 기본 설정값 표시
- ✅ 설정 저장 가능

## 수동 설정 (스크립트 사용 안 할 경우)

```bash
# 1. 데이터베이스 테이블 생성
npm run db:push

# 2. 서버 시작
npm run dev

# 3. 브라우저에서 확인
# http://localhost:3000/settings
```

## 문제 해결

### "relation 'settings' does not exist" 오류
```bash
npm run db:push
```

### 데이터베이스 연결 실패
1. .env.local 파일의 POSTGRES_URL 확인
2. 연결 문자열에 공백/줄바꿈 없는지 확인
3. 연결 문자열 끝에 `?sslmode=require` 포함 확인
4. Neon Dashboard에서 데이터베이스 상태 확인
5. 서버 재시작

### 데이터베이스 내용 확인
```bash
npm run db:studio
```
브라우저에서 https://local.drizzle.studio 열림

## 참고

- Neon 무료 플랜으로 충분 (0.5GB 스토리지, 신용카드 불필요)
- 데이터베이스는 1회만 생성하면 됨
- 다른 기능(AI 생성, Google Sheets)은 별도 설정 필요

## 추가 도움

- SETUP_GUIDE.md 참고
- Neon Docs: https://neon.tech/docs/introduction
- Neon 무료 플랜 가이드: https://neon.tech/docs/introduction/plans

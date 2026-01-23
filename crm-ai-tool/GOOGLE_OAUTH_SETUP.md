# Google OAuth 설정 가이드

## 1단계: Google Cloud Console 접속
https://console.cloud.google.com/

## 2단계: 프로젝트 생성
1. 상단 프로젝트 선택 → "새 프로젝트"
2. 프로젝트 이름: "CRM AI Tool"
3. "만들기" 클릭

## 3단계: Google Sheets API 활성화
1. "API 및 서비스" → "라이브러리"
2. "Google Sheets API" 검색
3. "사용" 버튼 클릭

## 4단계: OAuth 동의 화면
1. "OAuth 동의 화면" 메뉴
2. 사용자 유형: "외부" 선택
3. 앱 이름: CRM AI Tool
4. 이메일: 본인 이메일 입력
5. 범위 추가: ".../auth/spreadsheets.readonly"
6. "저장 후 계속"

## 5단계: OAuth 클라이언트 ID 생성
1. "사용자 인증 정보" 메뉴
2. "+ 사용자 인증 정보 만들기" → "OAuth 클라이언트 ID"
3. 애플리케이션 유형: 웹 애플리케이션
4. 승인된 리디렉션 URI 추가:
   http://localhost:3000/api/sheets/callback
5. "만들기" 클릭

## 6단계: 클라이언트 ID와 시크릿 복사
- 클라이언트 ID: 123456789012-abc...xyz.apps.googleusercontent.com
- 클라이언트 보안 비밀번호: GOCSPX-AbCdEf...

## 7단계: .env.local 파일에 붙여넣기
```bash
code .env.local
```

다음 부분을 실제 값으로 교체:
```
GOOGLE_CLIENT_ID=123456789012-abc...xyz.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-AbCdEf...
```

GOOGLE_REDIRECT_URI는 그대로 두세요!

## 8단계: 서버 재시작
```bash
npm run dev
```

## 9단계: 테스트
1. http://localhost:3000/dashboard 접속
2. "Google Sheets 연결" 버튼 클릭
3. Google 계정 선택 및 권한 승인

## Google Sheets 데이터 형식
AI 예측을 위해 다음 열이 필요합니다:
- campaign_name: 캠페인 이름
- send_count: 발송 수
- click_count: 클릭 수
- conversion_count: 전환 수
- ctr: 클릭률 (%)
- conversion_rate: 전환율 (%)

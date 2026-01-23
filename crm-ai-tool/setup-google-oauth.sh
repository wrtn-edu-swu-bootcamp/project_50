#!/bin/bash

echo "=================================="
echo "Google Sheets 연동 설정"
echo "=================================="
echo ""

if [ ! -f .env.local ]; then
    echo "❌ .env.local 파일이 없습니다."
    exit 1
fi

if grep -q "your_google_client_id_here" .env.local; then
    echo "⚠️  Google OAuth가 아직 설정되지 않았습니다."
    echo ""
    echo "📋 설정 단계:"
    echo ""
    echo "1. https://console.cloud.google.com/ 접속"
    echo "2. 새 프로젝트 생성"
    echo "3. Google Sheets API 활성화"
    echo "4. OAuth 동의 화면 구성 (테스트 사용자 추가!)"
    echo "5. OAuth 클라이언트 ID 생성"
    echo "   리디렉션 URI: http://localhost:3000/api/sheets/callback"
    echo "6. 클라이언트 ID와 시크릿 복사"
    echo ""
    echo "자세한 내용: GOOGLE_OAUTH_SETUP.md 또는 GOOGLE_SHEETS_FIX.txt"
    echo ""
    read -p "클라이언트 ID를 입력하세요: " client_id
    read -p "클라이언트 시크릿을 입력하세요: " client_secret
    
    if [ -z "$client_id" ] || [ -z "$client_secret" ]; then
        echo "❌ 클라이언트 ID와 시크릿을 모두 입력해야 합니다."
        exit 1
    fi
    
    sed -i '' "s|GOOGLE_CLIENT_ID=your_google_client_id_here|GOOGLE_CLIENT_ID=$client_id|g" .env.local
    sed -i '' "s|GOOGLE_CLIENT_SECRET=your_google_client_secret_here|GOOGLE_CLIENT_SECRET=$client_secret|g" .env.local
    
    echo ""
    echo "✅ Google OAuth 설정 완료!"
    echo ""
    echo "서버를 재시작하세요: npm run dev"
else
    echo "✅ Google OAuth가 이미 설정되어 있습니다."
    echo ""
    grep "GOOGLE_CLIENT_ID" .env.local | head -1
    echo ""
    echo "문제가 계속되면:"
    echo "1. 리디렉션 URI 확인: http://localhost:3000/api/sheets/callback"
    echo "2. Google Cloud Console에서 테스트 사용자 추가 확인"
    echo "3. 서버 재시작: npm run dev"
fi

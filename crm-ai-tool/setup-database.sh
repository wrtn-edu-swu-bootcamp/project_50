#!/bin/bash

echo "=================================="
echo "CRM AI Tool - 데이터베이스 설정"
echo "=================================="
echo ""

# .env.local 파일 확인
if [ ! -f .env.local ]; then
    echo "❌ .env.local 파일이 없습니다."
    exit 1
fi

# POSTGRES_URL 확인
if grep -q "your_postgres_connection_string_here" .env.local; then
    echo "⚠️  POSTGRES_URL이 아직 설정되지 않았습니다."
    echo ""
    echo "📋 다음 단계를 따라주세요:"
    echo ""
    echo "1. Neon 가입 (무료, 신용카드 불필요)"
    echo "   https://console.neon.tech/signup"
    echo ""
    echo "2. Create Project 클릭"
    echo "   - Project name: crm-ai-tool"
    echo "   - Region: Asia Pacific (Singapore)"
    echo ""
    echo "3. Connection string 복사"
    echo "   예: postgresql://user:pass@ep-xxx.neon.tech/dbname?sslmode=require"
    echo ""
    echo "4. .env.local 파일에서 POSTGRES_URL 수정"
    echo ""
    echo "5. 이 스크립트 다시 실행: ./setup-database.sh"
    echo ""
    exit 1
fi

echo "✓ POSTGRES_URL이 설정되어 있습니다."
echo ""

# 데이터베이스 마이그레이션 실행
echo "📦 데이터베이스 테이블 생성 중..."
echo ""

npm run db:push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 데이터베이스 설정 완료!"
    echo ""
    echo "다음 명령어로 서버를 시작하세요:"
    echo "  npm run dev"
    echo ""
    echo "그 다음 브라우저에서 접속:"
    echo "  http://localhost:3000/settings"
else
    echo ""
    echo "❌ 데이터베이스 마이그레이션 실패"
    echo ""
    echo "문제 해결:"
    echo "1. POSTGRES_URL이 올바른지 확인"
    echo "2. 연결 문자열 끝에 ?sslmode=require 포함 확인"
    echo "3. Neon Dashboard에서 데이터베이스 상태 확인"
    echo "4. 인터넷 연결 확인"
fi

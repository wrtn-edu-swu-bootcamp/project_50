#!/bin/bash

echo "=================================="
echo "CRM AI Tool 서버 시작"
echo "=================================="
echo ""

# 기존 프로세스 정리
echo "1. 기존 프로세스 정리 중..."
pkill -9 -f "next dev" 2>/dev/null
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null
rm -rf .next/dev/lock 2>/dev/null
sleep 2
echo "   ✓ 완료"
echo ""

# 환경 변수 설정
echo "2. 환경 변수 로드 중..."
if [ -f .env.local ]; then
    export $(grep -v '^#' .env.local | xargs)
    echo "   ✓ .env.local 로드 완료"
else
    echo "   ⚠️  .env.local 파일이 없습니다"
fi
echo ""

# 서버 시작
echo "3. 서버 시작 중..."
echo ""
npm run dev

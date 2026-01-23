#!/bin/bash

# Google Gemini 설정 스크립트
# 사용법: ./setup-gemini.sh

echo "=================================="
echo "Google Gemini 무료 API 설정"
echo "=================================="
echo ""

# .env.local 파일 확인
if [ ! -f .env.local ]; then
    echo "❌ .env.local 파일이 없습니다."
    echo "   .env.example을 복사하여 .env.local을 만들어주세요."
    exit 1
fi

# Gemini API 키 확인
if grep -q "GEMINI_API_KEY=" .env.local; then
    current_key=$(grep "GEMINI_API_KEY=" .env.local | cut -d '=' -f2)
    if [ ! -z "$current_key" ] && [ "$current_key" != "your_gemini_api_key_here" ]; then
        echo "✅ Gemini API 키가 이미 설정되어 있습니다."
        echo ""
        
        # USE_GEMINI 확인
        if grep -q "USE_GEMINI=true" .env.local; then
            echo "✅ Gemini 사용이 활성화되어 있습니다."
            echo ""
            echo "🎉 모든 설정이 완료되었습니다!"
            echo ""
            echo "서버를 재시작하세요:"
            echo "  pkill -f 'next dev'"
            echo "  npm run dev"
            exit 0
        fi
    fi
fi

echo "📋 설정 단계:"
echo ""
echo "1. Google AI Studio 접속"
echo "   https://aistudio.google.com/app/apikey"
echo ""
echo "2. Google 계정으로 로그인"
echo ""
echo "3. 'Get API key' 또는 'Create API key' 클릭"
echo ""
echo "4. API 키 복사 (AIza로 시작)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# API 키 입력
read -p "Gemini API 키를 입력하세요: " api_key

if [ -z "$api_key" ]; then
    echo "❌ API 키가 입력되지 않았습니다."
    exit 1
fi

# API 키 형식 확인
if [[ ! $api_key == AIza* ]]; then
    echo "⚠️  경고: API 키가 'AIza'로 시작하지 않습니다."
    echo "   올바른 키인지 확인해주세요."
    read -p "계속하시겠습니까? (y/n): " confirm
    if [ "$confirm" != "y" ]; then
        exit 1
    fi
fi

# .env.local 파일 백업
cp .env.local .env.local.backup.$(date +%Y%m%d_%H%M%S)

# GEMINI_API_KEY 추가 또는 업데이트
if grep -q "GEMINI_API_KEY=" .env.local; then
    # 기존 키 업데이트
    sed -i '' "s|GEMINI_API_KEY=.*|GEMINI_API_KEY=$api_key|" .env.local
else
    # 새로운 키 추가
    echo "" >> .env.local
    echo "# Google Gemini API (무료)" >> .env.local
    echo "GEMINI_API_KEY=$api_key" >> .env.local
fi

# USE_GEMINI 추가 또는 업데이트
if grep -q "USE_GEMINI=" .env.local; then
    sed -i '' "s|USE_GEMINI=.*|USE_GEMINI=true|" .env.local
else
    echo "USE_GEMINI=true" >> .env.local
fi

echo ""
echo "✅ Gemini API 설정 완료!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 설정 정보:"
echo "  - API 키: ${api_key:0:10}...${api_key: -5}"
echo "  - 사용 모드: Gemini (무료)"
echo "  - 월 할당량: 1,500회 요청"
echo ""
echo "🚀 다음 단계:"
echo ""
echo "1. 서버 재시작:"
echo "   pkill -f 'next dev'"
echo "   npm run dev"
echo ""
echo "2. 브라우저에서 테스트:"
echo "   http://localhost:3000/campaign/new"
echo ""
echo "3. 메시지 생성 클릭!"
echo ""
echo "💡 팁:"
echo "  - OpenAI로 돌아가려면: USE_GEMINI=false"
echo "  - 자세한 정보: FREE_AI_ALTERNATIVES.md"
echo ""
echo "🎉 완전 무료로 AI 기능을 사용하세요!"

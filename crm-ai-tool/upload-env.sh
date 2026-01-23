#!/bin/bash

echo "🚀 Vercel 환경 변수 업로드 시작..."
echo ""

if [ ! -f .env.local ]; then
    echo "❌ .env.local 파일을 찾을 수 없습니다."
    exit 1
fi

while IFS='=' read -r key value; do
    if [[ -z "$key" ]] || [[ "$key" =~ ^#.* ]]; then
        continue
    fi
    
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)
    
    echo "📤 업로드 중: $key"
    echo "$value" | npx vercel env add "$key" production --force
    echo "$value" | npx vercel env add "$key" preview --force
    echo "$value" | npx vercel env add "$key" development --force
    echo "✅ $key 업로드 완료"
    echo ""
done < .env.local

echo "🎉 모든 환경 변수 업로드 완료!"

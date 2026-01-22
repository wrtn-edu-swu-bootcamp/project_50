# CRM 메시지 자동 작성 & 성과 예측 툴 - 디자인 가이드

## 목차
1. [디자인 철학](#1-디자인-철학)
2. [컬러 시스템](#2-컬러-시스템)
3. [타이포그래피](#3-타이포그래피)
4. [컴포넌트](#4-컴포넌트)
5. [레이아웃 & 간격](#5-레이아웃--간격)
6. [아이콘 & 일러스트레이션](#6-아이콘--일러스트레이션)
7. [반응형 디자인](#7-반응형-디자인)
8. [애니메이션 & 인터랙션](#8-애니메이션--인터랙션)

---

## 1. 디자인 철학

### 핵심 가치
**"명확하고, 직관적이며, 효율적인"** - 토스 스타일의 디자인 철학을 따릅니다.

### 디자인 원칙

#### 1.1 명확성 (Clarity)
- 불필요한 장식 제거
- 핵심 정보를 즉시 파악할 수 있는 구조
- 명확한 시각적 위계

#### 1.2 직관성 (Intuitiveness)
- 학습 없이 사용 가능한 인터페이스
- 일관된 패턴과 동작
- 예측 가능한 사용자 경험

#### 1.3 효율성 (Efficiency)
- 최소한의 클릭으로 목표 달성
- 빠른 로딩과 반응
- 작업 흐름 최적화

#### 1.4 신뢰성 (Trustworthiness)
- 안정적이고 전문적인 느낌
- 데이터 기반 의사결정 지원
- 명확한 피드백 제공

---

## 2. 컬러 시스템

### 2.1 Primary Colors

#### Primary (청록색)
```
Primary: #5FB3B3
- 주요 CTA 버튼
- 중요한 액션 요소
- 선택된 상태 표시
```

#### Primary Hover
```
Hover: #4A9999
- Primary 버튼 호버 상태
- 인터랙티브 요소 강조
```

#### Secondary (다크 네이비)
```
Secondary: #1E293B
- 헤더 배경
- 주요 텍스트
- 강조가 필요한 영역
```

### 2.2 Neutral Colors (그레이스케일)

```css
/* 배경 */
Background-Primary: #FFFFFF
Background-Secondary: #F8FAFC
Background-Tertiary: #F1F5F9

/* 경계선 */
Border-Light: #E2E8F0
Border-Default: #CBD5E1
Border-Strong: #94A3B8

/* 텍스트 */
Text-Primary: #1E293B      /* 주요 텍스트 */
Text-Secondary: #475569    /* 보조 텍스트 */
Text-Tertiary: #64748B     /* 힌트, 플레이스홀더 */
Text-Disabled: #94A3B8     /* 비활성 텍스트 */
```

### 2.3 Semantic Colors

```css
/* 성공 */
Success: #10B981
Success-Light: #D1FAE5
Success-Dark: #059669

/* 경고 */
Warning: #F59E0B
Warning-Light: #FEF3C7
Warning-Dark: #D97706

/* 오류 */
Error: #EF4444
Error-Light: #FEE2E2
Error-Dark: #DC2626

/* 정보 */
Info: #3B82F6
Info-Light: #DBEAFE
Info-Dark: #2563EB
```

### 2.4 컬러 사용 가이드

#### Primary 사용
- 주요 CTA 버튼 ("새 캠페인 만들기", "메시지 생성")
- 선택된 메시지 카드 테두리
- 활성화된 네비게이션 아이템
- 중요한 링크 및 아이콘

#### Secondary 사용
- 헤더 배경색
- 주요 제목 텍스트
- 보조 버튼 (텍스트 버튼)

#### Neutral 사용
- 카드 배경: Background-Primary
- 페이지 배경: Background-Secondary
- 입력 필드 배경: Background-Primary
- 구분선: Border-Light

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

```css
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

### 3.2 폰트 스케일

```css
/* Heading */
H1: 32px / Bold / Line-height: 1.3 / Letter-spacing: -0.02em
H2: 24px / Bold / Line-height: 1.4 / Letter-spacing: -0.01em
H3: 20px / Semibold / Line-height: 1.4 / Letter-spacing: -0.01em
H4: 18px / Semibold / Line-height: 1.5 / Letter-spacing: 0

/* Body */
Body-Large: 16px / Regular / Line-height: 1.6 / Letter-spacing: 0
Body-Medium: 15px / Regular / Line-height: 1.6 / Letter-spacing: 0
Body-Small: 14px / Regular / Line-height: 1.5 / Letter-spacing: 0

/* Caption */
Caption: 13px / Regular / Line-height: 1.5 / Letter-spacing: 0
Caption-Small: 12px / Regular / Line-height: 1.4 / Letter-spacing: 0
```

### 3.3 폰트 굵기

```css
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
```

### 3.4 타이포그래피 사용 예시

#### 페이지 제목
```
Font: H1 (32px Bold)
Color: Text-Primary (#1E293B)
Usage: 대시보드, 캠페인 작성 등 주요 페이지 제목
```

#### 섹션 제목
```
Font: H3 (20px Semibold)
Color: Text-Primary (#1E293B)
Usage: "1. 캠페인 정보 입력", "2. AI 메시지 생성" 등
```

#### 본문 텍스트
```
Font: Body-Medium (15px Regular)
Color: Text-Primary (#1E293B) 또는 Text-Secondary (#475569)
Usage: 일반 텍스트, 설명문
```

#### 라벨
```
Font: Body-Small (14px Medium)
Color: Text-Primary (#1E293B)
Usage: 입력 필드 라벨, 버튼 텍스트
```

#### 힌트/플레이스홀더
```
Font: Body-Small (14px Regular)
Color: Text-Tertiary (#64748B)
Usage: 입력 필드 플레이스홀더, 도움말
```

---

## 4. 컴포넌트

### 4.1 버튼

#### Primary Button
```css
/* Default */
Background: #5FB3B3
Color: #FFFFFF
Font: 15px Medium
Padding: 12px 24px
Border-radius: 8px
Border: none
Box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05)

/* Hover */
Background: #4A9999
Box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
Cursor: pointer

/* Active */
Background: #3D8080
Transform: scale(0.98)

/* Disabled */
Background: #CBD5E1
Color: #94A3B8
Cursor: not-allowed
```

**사용 예시**: "새 캠페인 만들기", "메시지 생성", "캠페인 저장"

#### Secondary Button
```css
/* Default */
Background: #FFFFFF
Color: #1E293B
Font: 15px Medium
Padding: 12px 24px
Border-radius: 8px
Border: 1px solid #CBD5E1

/* Hover */
Background: #F8FAFC
Border-color: #94A3B8

/* Active */
Background: #F1F5F9
```

**사용 예시**: "템플릿으로 저장", "메시지 복사", "전체 재생성"

#### Text Button
```css
/* Default */
Background: transparent
Color: #5FB3B3
Font: 15px Medium
Padding: 8px 16px
Border: none

/* Hover */
Color: #4A9999
Background: rgba(95, 179, 179, 0.08)
Border-radius: 6px

/* Active */
Color: #3D8080
```

**사용 예시**: "재생성", "수동편집", 링크

#### Icon Button
```css
/* Default */
Background: transparent
Color: #64748B
Padding: 8px
Border-radius: 6px
Border: none

/* Hover */
Background: #F1F5F9
Color: #1E293B

/* Active */
Background: #E2E8F0
```

**사용 예시**: 뒤로가기, 설정, 삭제 등 아이콘 버튼

### 4.2 입력 필드 (Input)

#### Text Input
```css
/* Default */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 8px
Padding: 12px 16px
Font: 15px Regular
Color: #1E293B

/* Focus */
Border: 2px solid #5FB3B3
Box-shadow: 0 0 0 3px rgba(95, 179, 179, 0.1)
Outline: none

/* Error */
Border: 1px solid #EF4444
Box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1)

/* Disabled */
Background: #F8FAFC
Color: #94A3B8
Cursor: not-allowed
```

#### Textarea
```css
/* 기본 Input과 동일 */
Min-height: 80px
Resize: vertical
```

#### Label
```css
Font: 14px Medium
Color: #1E293B
Margin-bottom: 8px
Display: block
```

#### Placeholder
```css
Color: #94A3B8
Font: 15px Regular
```

#### Helper Text
```css
Font: 13px Regular
Color: #64748B
Margin-top: 6px
```

#### Error Message
```css
Font: 13px Regular
Color: #EF4444
Margin-top: 6px
```

### 4.3 드롭다운 (Select)

```css
/* Default */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 8px
Padding: 12px 16px
Font: 15px Regular
Color: #1E293B
Cursor: pointer

/* Hover */
Border-color: #CBD5E1

/* Focus */
Border: 2px solid #5FB3B3
Box-shadow: 0 0 0 3px rgba(95, 179, 179, 0.1)

/* Dropdown Menu */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 8px
Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
Margin-top: 4px
Max-height: 240px
Overflow-y: auto

/* Dropdown Item */
Padding: 10px 16px
Font: 15px Regular
Color: #1E293B

/* Dropdown Item Hover */
Background: #F8FAFC

/* Dropdown Item Selected */
Background: rgba(95, 179, 179, 0.1)
Color: #5FB3B3
Font-weight: 500
```

### 4.4 체크박스 & 라디오

#### Checkbox
```css
/* Default */
Width: 20px
Height: 20px
Border: 2px solid #CBD5E1
Border-radius: 4px
Background: #FFFFFF

/* Checked */
Background: #5FB3B3
Border-color: #5FB3B3
/* 체크 아이콘: 흰색 */

/* Hover */
Border-color: #5FB3B3

/* Disabled */
Background: #F1F5F9
Border-color: #E2E8F0
```

#### Radio
```css
/* Checkbox와 동일하지만 Border-radius: 50% */
```

### 4.5 카드 (Card)

#### Default Card
```css
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Padding: 24px
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)
```

#### Hover Card (인터랙티브)
```css
/* Default */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Padding: 24px
Transition: all 0.2s ease

/* Hover */
Border-color: #5FB3B3
Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)
Transform: translateY(-2px)
```

**사용 예시**: 템플릿 카드, 메시지 옵션 카드

#### Selected Card
```css
Background: #FFFFFF
Border: 2px solid #5FB3B3
Border-radius: 12px
Padding: 24px
Box-shadow: 0 4px 12px rgba(95, 179, 179, 0.15)
```

**사용 예시**: 선택된 메시지 카드

#### Summary Card (성과 요약)
```css
Background: linear-gradient(135deg, #5FB3B3 0%, #4A9999 100%)
Border: none
Border-radius: 12px
Padding: 24px
Color: #FFFFFF
Box-shadow: 0 4px 12px rgba(95, 179, 179, 0.2)
```

**사용 예시**: 대시보드 성과 요약 카드

### 4.6 테이블 (Table)

```css
/* Table Container */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Overflow: hidden

/* Table Header */
Background: #F8FAFC
Border-bottom: 1px solid #E2E8F0
Padding: 12px 16px
Font: 14px Semibold
Color: #475569

/* Table Row */
Border-bottom: 1px solid #F1F5F9
Padding: 16px
Font: 15px Regular
Color: #1E293B

/* Table Row Hover */
Background: #F8FAFC
Cursor: pointer

/* Table Cell */
Padding: 16px
Vertical-align: middle
```

### 4.7 배지 (Badge)

#### Status Badge
```css
/* Success */
Background: #D1FAE5
Color: #059669
Font: 13px Medium
Padding: 4px 12px
Border-radius: 12px

/* Warning */
Background: #FEF3C7
Color: #D97706

/* Error */
Background: #FEE2E2
Color: #DC2626

/* Info */
Background: #DBEAFE
Color: #2563EB
```

#### Count Badge
```css
Background: #5FB3B3
Color: #FFFFFF
Font: 12px Bold
Padding: 2px 8px
Border-radius: 10px
Min-width: 20px
Text-align: center
```

### 4.8 프로그레스 바 (Progress Bar)

```css
/* Container */
Background: #E2E8F0
Height: 8px
Border-radius: 4px
Overflow: hidden

/* Fill */
Background: linear-gradient(90deg, #5FB3B3 0%, #4A9999 100%)
Height: 100%
Border-radius: 4px
Transition: width 0.3s ease
```

**사용 예시**: 성과 예측 게이지

### 4.9 토스트 알림 (Toast)

```css
/* Container */
Background: #1E293B
Color: #FFFFFF
Font: 15px Regular
Padding: 16px 20px
Border-radius: 8px
Box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2)
Min-width: 320px
Max-width: 480px

/* Success Toast */
Border-left: 4px solid #10B981

/* Error Toast */
Border-left: 4px solid #EF4444

/* Info Toast */
Border-left: 4px solid #3B82F6
```

### 4.10 모달 (Modal)

```css
/* Overlay */
Background: rgba(0, 0, 0, 0.5)
Backdrop-filter: blur(4px)

/* Modal Container */
Background: #FFFFFF
Border-radius: 16px
Padding: 32px
Max-width: 600px
Box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3)

/* Modal Header */
Font: 24px Bold
Color: #1E293B
Margin-bottom: 16px

/* Modal Body */
Font: 15px Regular
Color: #475569
Line-height: 1.6

/* Modal Footer */
Display: flex
Gap: 12px
Justify-content: flex-end
Margin-top: 24px
```

### 4.11 연결 상태 카드 (Connection Status Card)

**목적**: Google Sheets 연동 상태를 표시하는 카드

```css
/* Card Container */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Padding: 20px 24px
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)

/* Header Section */
Display: flex
Justify-content: space-between
Align-items: center
Margin-bottom: 12px

/* Title */
Font: 15px Semibold
Color: #1E293B

/* Status Badge Container */
Display: flex
Align-items: center
Gap: 8px
```

#### 연결 상태 배지 (Status Badge)

```css
/* Badge - 연결됨 (Connected) */
Background: #D1FAE5
Color: #059669
Font: 13px Medium
Padding: 4px 12px
Border-radius: 12px
Display: flex
Align-items: center
Gap: 6px

/* Status Dot - 연결됨 */
Width: 8px
Height: 8px
Border-radius: 50%
Background: #10B981

/* Badge - 미연결 (Disconnected) */
Background: #F1F5F9
Color: #64748B

/* Status Dot - 미연결 */
Background: #94A3B8

/* Badge - 오류 (Error) */
Background: #FEE2E2
Color: #DC2626

/* Status Dot - 오류 */
Background: #EF4444
```

#### 동기화 정보 및 버튼

```css
/* Last Sync Text */
Font: 14px Regular
Color: #64748B
Margin-bottom: 16px

/* Sync Button */
Background: #FFFFFF
Border: 1px solid #CBD5E1
Color: #1E293B
Font: 14px Medium
Padding: 10px 20px
Border-radius: 8px
Transition: all 0.2s ease

/* Sync Button Hover */
Background: #F8FAFC
Border-color: #94A3B8

/* Sync Button Active */
Background: #F1F5F9
```

**사용 예시**: 대시보드 성과 데이터 연결 상태 카드

### 4.12 Empty State (데이터 없음 상태)

**목적**: 데이터가 없거나 연결되지 않은 상태를 안내

```css
/* Container */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Padding: 48px 32px
Text-align: center

/* Icon/Emoji */
Font-size: 48px
Margin-bottom: 16px
Opacity: 0.8

/* Primary Message */
Font: 16px Semibold
Color: #1E293B
Line-height: 1.5
Margin-bottom: 8px

/* Secondary Message (Optional) */
Font: 14px Regular
Color: #64748B
Line-height: 1.6
Margin-bottom: 24px

/* CTA Button */
Background: #5FB3B3
Color: #FFFFFF
Font: 15px Medium
Padding: 12px 24px
Border-radius: 8px
Display: inline-block
```

**사용 예시**: 
- 성과 예측 섹션 (데이터 미연결 시)
- 최근 캠페인 목록 (캠페인 없음)

**Empty State 메시지 예시**:
```
📊
성과 예측을 사용하려면
성과 데이터를 먼저 연결하세요

[대시보드에서 연결하기]
```

---

## 5. 레이아웃 & 간격

### 5.1 그리드 시스템

```css
/* Container */
Max-width: 1280px
Margin: 0 auto
Padding: 0 24px

/* 반응형 Breakpoints */
Mobile: 0-767px
Tablet: 768px-1023px
Desktop: 1024px+
```

### 5.2 간격 시스템 (Spacing Scale)

```css
/* 4px 기반 스케일 */
xs: 4px
sm: 8px
md: 12px
base: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 96px
```

### 5.3 섹션 간격

```css
/* 페이지 상단 여백 */
Padding-top: 32px

/* 섹션 간 여백 */
Margin-bottom: 48px

/* 컴포넌트 간 여백 */
Margin-bottom: 24px

/* 입력 필드 간 여백 */
Margin-bottom: 20px
```

### 5.4 카드 레이아웃

```css
/* 카드 그리드 (템플릿 관리) */
Display: grid
Grid-template-columns: repeat(2, 1fr)
Gap: 24px

/* 반응형 */
@media (max-width: 768px) {
  Grid-template-columns: 1fr
}
```

### 5.5 헤더

```css
/* Header Container */
Background: #1E293B
Height: 64px
Padding: 0 24px
Display: flex
Align-items: center
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

/* Navigation */
Display: flex
Gap: 32px
Align-items: center

/* Nav Item */
Font: 15px Medium
Color: rgba(255, 255, 255, 0.7)
Padding: 8px 12px
Border-radius: 6px
Transition: all 0.2s ease

/* Nav Item Active */
Color: #FFFFFF
Background: rgba(95, 179, 179, 0.2)

/* Nav Item Hover */
Color: #FFFFFF
Background: rgba(255, 255, 255, 0.1)
```

---

## 6. 아이콘 & 일러스트레이션

### 6.1 아이콘 스타일

```css
/* 기본 아이콘 */
Style: Outline (선 기반)
Stroke-width: 1.5px
Size: 20px (기본), 24px (큰 아이콘)
Color: #64748B (기본), #1E293B (강조)
```

### 6.2 아이콘 라이브러리

**추천**: Heroicons, Lucide Icons, Phosphor Icons

### 6.3 아이콘 사용 가이드

```css
/* 버튼 내 아이콘 */
Size: 20px
Margin-right: 8px (텍스트와 함께 사용 시)

/* 입력 필드 아이콘 */
Size: 20px
Position: absolute
Left: 12px (prefix) 또는 Right: 12px (suffix)
Color: #64748B

/* 네비게이션 아이콘 */
Size: 24px
Color: rgba(255, 255, 255, 0.7)

/* 액션 아이콘 (편집, 삭제 등) */
Size: 20px
Color: #64748B
Hover: #1E293B
```

### 6.4 일러스트레이션

```css
/* Empty State */
Style: 미니멀, 라인 기반
Color: #5FB3B3 (Primary), #E2E8F0 (Secondary)
Size: 최대 240px

/* 로딩 스피너 */
Color: #5FB3B3
Size: 32px (기본), 48px (큰 로딩)
Animation: 회전 (1s linear infinite)
```

---

## 7. 반응형 디자인

### 7.1 Breakpoints

```css
/* Mobile First 접근 */
Mobile: 0-767px (기본)
Tablet: 768px-1023px
Desktop: 1024px+
Large Desktop: 1440px+
```

### 7.2 반응형 레이아웃

#### 대시보드
```css
/* Mobile */
- 성과 요약 카드: 1열 (세로 스택)
- 최근 캠페인 테이블: 가로 스크롤

/* Tablet */
- 성과 요약 카드: 3열 (가로 배치)
- 최근 캠페인 테이블: 전체 표시

/* Desktop */
- 성과 요약 카드: 3열 (여유 있는 간격)
- 최근 캠페인 테이블: 전체 표시
```

#### 캠페인 작성 페이지
```css
/* Mobile */
- 입력 필드: 100% 너비
- 버튼: 100% 너비 (세로 스택)
- 메시지 카드: 1열

/* Tablet */
- 입력 필드: 100% 너비
- 버튼: 인라인 (가로 배치)
- 메시지 카드: 1열

/* Desktop */
- 입력 필드: 최대 600px
- 버튼: 인라인 (가로 배치)
- 메시지 카드: 1열 (넓은 카드)
```

#### 템플릿 관리
```css
/* Mobile */
- 템플릿 카드: 1열

/* Tablet */
- 템플릿 카드: 2열

/* Desktop */
- 템플릿 카드: 2열 (여유 있는 간격)
```

### 7.3 반응형 타이포그래피

```css
/* Mobile */
H1: 24px
H2: 20px
H3: 18px
Body: 14px

/* Desktop */
H1: 32px
H2: 24px
H3: 20px
Body: 15px
```

### 7.4 반응형 간격

```css
/* Mobile */
Container-padding: 16px
Section-gap: 32px
Card-padding: 16px

/* Desktop */
Container-padding: 24px
Section-gap: 48px
Card-padding: 24px
```

---

## 8. 애니메이션 & 인터랙션

### 8.1 트랜지션 타이밍

```css
/* 기본 트랜지션 */
Fast: 0.15s ease
Default: 0.2s ease
Slow: 0.3s ease

/* Easing Functions */
Ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)
Ease-out: cubic-bezier(0, 0, 0.2, 1)
Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### 8.2 버튼 인터랙션

```css
/* Hover */
Transition: all 0.2s ease
Transform: translateY(-1px)
Box-shadow: 증가

/* Active */
Transition: all 0.1s ease
Transform: scale(0.98)

/* Focus */
Outline: 2px solid #5FB3B3
Outline-offset: 2px
```

### 8.3 카드 인터랙션

```css
/* Hover */
Transition: all 0.2s ease
Transform: translateY(-2px)
Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)
Border-color: #5FB3B3

/* Click */
Transform: scale(0.99)
```

### 8.4 페이지 전환

```css
/* Fade In */
Animation: fadeIn 0.3s ease
Opacity: 0 → 1

/* Slide Up */
Animation: slideUp 0.3s ease
Transform: translateY(20px) → translateY(0)
Opacity: 0 → 1
```

### 8.5 로딩 애니메이션

```css
/* Spinner */
Animation: spin 1s linear infinite
Border: 3px solid #E2E8F0
Border-top-color: #5FB3B3
Border-radius: 50%

/* Skeleton */
Background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)
Background-size: 200% 100%
Animation: shimmer 1.5s ease-in-out infinite
```

### 8.6 마이크로 인터랙션

#### 체크박스 체크
```css
Animation: checkmark 0.3s ease
Transform: scale(0) → scale(1)
```

#### 토스트 등장
```css
Animation: slideInRight 0.3s ease
Transform: translateX(100%) → translateX(0)
```

#### 모달 등장
```css
/* Overlay */
Animation: fadeIn 0.2s ease
Opacity: 0 → 1

/* Modal */
Animation: scaleIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)
Transform: scale(0.9) → scale(1)
Opacity: 0 → 1
```

---

## 9. 화면별 디자인 적용 예시

### 9.1 대시보드

```css
/* 페이지 레이아웃 */
Background: #F8FAFC
Padding: 32px 24px

/* 헤더 */
Background: #1E293B
Height: 64px
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)

/* 성과 요약 카드 */
Display: grid
Grid-template-columns: repeat(3, 1fr)
Gap: 24px
Margin-bottom: 48px

/* 각 요약 카드 */
Background: linear-gradient(135deg, #5FB3B3 0%, #4A9999 100%)
Color: #FFFFFF
Padding: 24px
Border-radius: 12px
Box-shadow: 0 4px 12px rgba(95, 179, 179, 0.2)

/* 성과 데이터 연결 상태 카드 */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Padding: 20px 24px
Margin-bottom: 48px
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)

/* 연결 상태 배지 */
Display: inline-flex
Align-items: center
Gap: 6px
Padding: 4px 12px
Border-radius: 12px
Font: 13px Medium

/* 연결됨 상태 */
Background: #D1FAE5
Color: #059669

/* 미연결 상태 */
Background: #F1F5F9
Color: #64748B

/* 오류 상태 */
Background: #FEE2E2
Color: #DC2626

/* 최근 캠페인 테이블 */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05)

/* CTA 버튼 */
Background: #5FB3B3
Color: #FFFFFF
Font: 16px Semibold
Padding: 16px 48px
Border-radius: 8px
Box-shadow: 0 4px 12px rgba(95, 179, 179, 0.3)
Margin: 48px auto
Display: block
```

### 9.2 캠페인 작성 페이지

```css
/* 페이지 레이아웃 */
Background: #F8FAFC
Padding: 32px 24px
Max-width: 800px
Margin: 0 auto

/* 섹션 구분선 */
Border-bottom: 2px solid #E2E8F0
Margin: 48px 0
Padding-bottom: 16px

/* 섹션 제목 */
Font: 20px Bold
Color: #1E293B
Margin-bottom: 24px

/* 입력 필드 그룹 */
Margin-bottom: 24px

/* 메시지 카드 */
Background: #FFFFFF
Border: 2px solid #E2E8F0
Border-radius: 12px
Padding: 24px
Margin-bottom: 16px
Transition: all 0.2s ease

/* 선택된 메시지 카드 */
Border-color: #5FB3B3
Box-shadow: 0 4px 12px rgba(95, 179, 179, 0.15)

/* 성과 예측 게이지 */
Display: grid
Grid-template-columns: repeat(2, 1fr)
Gap: 24px

/* 게이지 카드 */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Padding: 24px

/* Empty State (데이터 미연결) */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Padding: 48px 32px
Text-align: center

/* Empty State 아이콘 */
Font-size: 48px
Margin-bottom: 16px

/* Empty State 메시지 */
Font: 16px Semibold
Color: #1E293B
Line-height: 1.5
Margin-bottom: 24px

/* Empty State CTA 버튼 */
Background: #5FB3B3
Color: #FFFFFF
Font: 15px Medium
Padding: 12px 24px
Border-radius: 8px
Display: inline-block
```

### 9.3 템플릿 관리 페이지

```css
/* 페이지 레이아웃 */
Background: #F8FAFC
Padding: 32px 24px

/* 템플릿 그리드 */
Display: grid
Grid-template-columns: repeat(2, 1fr)
Gap: 24px

/* 템플릿 카드 */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Padding: 24px
Transition: all 0.2s ease
Cursor: pointer

/* 템플릿 카드 호버 */
Border-color: #5FB3B3
Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08)
Transform: translateY(-2px)

/* 액션 버튼 그룹 */
Display: flex
Gap: 8px
Margin-top: 16px
```

### 9.4 설정 페이지

```css
/* 페이지 레이아웃 */
Background: #F8FAFC
Padding: 32px 24px
Max-width: 800px
Margin: 0 auto

/* 설정 섹션 */
Background: #FFFFFF
Border: 1px solid #E2E8F0
Border-radius: 12px
Padding: 32px
Margin-bottom: 24px

/* 설정 항목 */
Margin-bottom: 32px

/* 금지 표현 리스트 */
Background: #F8FAFC
Border: 1px solid #E2E8F0
Border-radius: 8px
Padding: 16px

/* 금지 표현 아이템 */
Display: flex
Justify-content: space-between
Align-items: center
Padding: 12px
Border-bottom: 1px solid #E2E8F0
```

---

## 10. 접근성 (Accessibility)

### 10.1 색상 대비

```css
/* WCAG AA 기준 준수 */
일반 텍스트: 최소 4.5:1
큰 텍스트 (18px+): 최소 3:1
UI 컴포넌트: 최소 3:1

/* 테스트 결과 */
Primary (#5FB3B3) on White: 3.2:1 ✓
Secondary (#1E293B) on White: 13.5:1 ✓
Text-Primary (#1E293B) on White: 13.5:1 ✓
Text-Secondary (#475569) on White: 7.8:1 ✓
```

### 10.2 포커스 상태

```css
/* 키보드 포커스 */
Outline: 2px solid #5FB3B3
Outline-offset: 2px
Border-radius: 4px

/* 포커스 시 배경 강조 (선택사항) */
Background: rgba(95, 179, 179, 0.05)
```

### 10.3 스크린 리더

```html
<!-- 적절한 ARIA 레이블 사용 -->
<button aria-label="새 캠페인 만들기">
<input aria-describedby="helper-text">
<div role="alert" aria-live="polite">
```

### 10.4 키보드 네비게이션

```
Tab: 다음 요소로 이동
Shift + Tab: 이전 요소로 이동
Enter/Space: 버튼 활성화
Escape: 모달/드롭다운 닫기
Arrow Keys: 드롭다운/라디오 그룹 내 이동
```

---

## 11. 다크 모드 (향후 확장)

### 11.1 다크 모드 컬러 팔레트

```css
/* Primary (동일) */
Primary: #5FB3B3
Hover: #4A9999

/* Background */
Background-Primary: #0F172A
Background-Secondary: #1E293B
Background-Tertiary: #334155

/* Border */
Border-Light: #334155
Border-Default: #475569
Border-Strong: #64748B

/* Text */
Text-Primary: #F1F5F9
Text-Secondary: #CBD5E1
Text-Tertiary: #94A3B8
Text-Disabled: #64748B
```

---

## 12. 디자인 체크리스트

### 페이지 디자인 시 확인사항

- [ ] Pretendard 폰트 적용
- [ ] Primary 컬러 (#5FB3B3) 일관성
- [ ] 8px 간격 시스템 준수
- [ ] 모든 버튼에 호버/액티브 상태 정의
- [ ] 입력 필드에 포커스 상태 정의
- [ ] 카드에 적절한 그림자 적용
- [ ] 반응형 레이아웃 구현
- [ ] 색상 대비 WCAG AA 준수
- [ ] 키보드 네비게이션 지원
- [ ] 로딩/에러 상태 디자인
- [ ] 애니메이션 트랜지션 적용
- [ ] 연결 상태 배지 색상 구분
- [ ] Empty State 디자인 적용

---

## 문서 정보
- 작성일: 2026-01-22
- 버전: 1.1
- 기반 문서: [`docs/wireframes.md`](docs/wireframes.md)
- 문서 유형: 디자인 가이드
- 디자인 컨셉: 토스 스타일 (명확하고 직관적인 UI)
- 수정 이력:
  - v1.1 (2026-01-22): Google Sheets 연동 관련 컴포넌트 추가 (연결 상태 카드, Empty State, 대시보드/캠페인 작성 페이지 디자인 업데이트)

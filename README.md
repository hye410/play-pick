# 🎬 Play Pick - 영화/TV 콘텐츠 추천 서비스

## 📌 프로젝트 개요

Play Pick은 사용자의 취향을 분석하여 맞춤형 영화/TV 콘텐츠를 추천하는 웹 서비스입니다.
TMDB API를 활용하여 실시간 콘텐츠 정보를 제공하며, 직관적인 설문조사를 통해 개인화된 추천을 받을 수 있습니다.

## 🎯 주요 기능

### 🏠 홈 (Today's Pick)

<ol>
  <li>
  일일 트렌딩 콘텐츠 제공
    <ul>
      <li>
      TMDB API의 트렌딩 데이터 기반 영화/TV 쇼 추천
      </li>
      <li>Swiper 라이브러리를 활용한 반응형 캐러셀 UI</li>
      <li>자동 재생 + 마우스 호버 시 일시정지 기능</li>
      <li>24시간 캐싱 (ISR)으로 성능 최적화</li>
    </ul>
  </li>
  <li>설문조사 바로가기
    <ul>
      <li>메인 CTA 버튼으로 사용자 유도</li>
    </ul>
  </li>
</ol>

### 📝 설문조사 (Survey)

<ol>
  <li>단계별 질문 시스템
    <ul>
      <li>공통 질문 (콘텐츠 타입, 러닝타임 등)</li>
      <li>콘텐츠 타입에 따른 추가 질문(장르)</li>
      <li>장르는 최대 3개까지 다중 선택 가능</li>
    </ul>
  </li>
  <li>애니메이션 전환 효과
    <ul>
      <li>Framer Motion으로 부드러운 페이지 전환</li>
      <li>방향성 있는 슬라이드 애니메이션 (이전/다음)</li>
    </ul>
  </li>
  <li>상태관리 및 지속성
    <ul>
      <li>Zustand + localStorage로 진행 상황 저장</li>
      <li>새로고침 시에도 답변 유지</li>
      <li>뒤로가기/앞으로가기 자유롭게 이동 가능</li>
    </ul>
  </li>
  <li>실시간 유효성 검사
    <ul>
      <li>필수 질문 미응답 시 다음 버튼 비활성화</li>
      <li>장르 선택 시 개수 제한 알림</li>
    </ul>
  </li>
</ol>

### 📇 추천 결과 (Result)

<ol>
  <li>맞춤형 콘텐츠 추천
    <ul>
      <li>
        TMDB API 활용한 필터링
      </li>
      <li>
        사용자가 선택했던 대답 표시 (장르, 타입, 런타임 등)
      </li>
      <li>
        추천 결과 없을 시 Today's Pick 대체 표시
      </li>
    </ul>
  </li>
  <li>무한스크롤
    <ul>
      <li>Tanstack Query Infinite Query 활용</li>
    </ul>
  </li>
  <li>결과 페이지 최적화
    <ul>
      <li>초기 데이터 서버 사이드에서 prefetch</li>
      <li>이미지 skeleton UI 적용</li>
    </ul>
  </li>
</ol>

### 🔍 상세 페이지 (Detail)

<ol>
  <li>콘텐츠 상세 정보
    <ul>
      <li>
        포스터, 제목(원제), 평점, 장르 등 TMDB API에서 받아온 콘텐츠 상세 정보 제공
      </li>
    </ul>
  </li>
  <li>찜하기 기능
    <ul>
      <li>로그인 사용자만 이용 가능</li>
      <li>낙관적 업데이트로 즉각적인 UI 반응</li>
      <li>Supabase DB와 실시간 동기화</li>
      <li>찜 실패 시 자동 롤백</li>
    </ul>
  </li>
  <li>예고편 보기
    <ul>
      <li>YouTube API 연동</li>
      <li>모달로 예고편 영상 재생</li>
      <li>예고편 보기 버튼 hover 시 Prefetch로 로딩 시간 최소화</li>
    </ul>
  </li>
    <li>카카오톡 공유
    <ul>
      <li>Kakao SDK 활용</li>
    </ul>
  </li>
</ol>

### 👤 마이페이지

<ol>
  <li>내 정보 탭
    <ul>
      <li>비밀번호 변경 (게스트 계정은 변경 불가)</li>
      <li>회원 탈퇴 (게스트 계정은 탈퇴 불가)</li>
    </ul>
  </li>
  <li>내 콘텐츠 탭
    <ul>
      <li>무한 스크롤로 페이지네이션</li>
      <li>실패한 콘텐츠 별도 표시 및 개별 Refetch 시도 버튼 제공</li>
      <li>상세 페이지에서 찜/해제 시 자동 반영</li>
    </ul>
  </li>
</ol>

### 🔐 로그인

<ol>
  <li>일반 로그인
    <ul>
      <li>이메일 + 비밀번호</li>
      <li>이메일 미인증 시 안내</li>
    </ul>
  </li>
  <li>게스트 계정
    <ul>
      <li>회원가입 없이 바로 체험</li>
      <li>비밀번호 변경/탈퇴 제한</li>
    </ul>
  </li>
</ol>

## 🛠 기술 스택

### FrontEnd

<ul>
<li>Framework : <br>- Next.js 14 (App Router)</li>
<li>Language: <br>- TypeScript</li>
<li>Styling: <br>- Tailwind CSS</li>
<li>State Management: <br>- Zustand (클라이언트 상태) <br> - React Query (서버 상태)</li>
<li>Animation: <br>- Framer Motion</li>
<li>Form: <br> -React Hook Form + Zod</li>
<li>UI Library: <br>- SweetAlert2, Swiper</li>
</ul>

### Backend & Database

<ul>
  <li>BaaS: <br>- Supabase</li>
  <li>External API: 
    <br>- TMDB API (콘텐츠 정보)
    <br>- YouTube API (예고편)
    <br>- Kakao SDK (공유 기능)
  </li>
</ul>

## 📂 프로젝트 구조

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (main)/
│   │   ├── detail/[contentId]/
│   │   ├── my-page/
│   │   ├── result/
│   │   ├── survey/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── error.tsx
│   └── globals.css
│
├── features/
│   ├── detail/
│   │   ├── api/
│   │   ├── hook/
│   │   └── [components].tsx
│   ├── home/
│   ├── my-page/
│   ├── result/
│   ├── sign-in/
│   ├── sign-up/
│   ├── survey/
│   └── layout/
│
├── components/
│   ├── animated-component.tsx
│   ├── button.tsx
│   ├── content.tsx
│   ├── contents-box.tsx
│   ├── form-input.tsx
│   ├── image-skeleton.tsx
│   ├── loading-spinner.tsx
│   ├── modal.tsx
│   └── star.tsx
│
├── hook/
│   ├── use-auth-status.ts
│   ├── use-check-user-likes.ts
│   ├── use-infinite-liked-contents.ts
│   ├── use-add-user-like-mutation.ts
│   └── use-delete-user-like-mutation.ts
│
├── store/
│   ├── use-survey-store.ts
│   └── use-pending-likes-store.ts
│
├── types/
│   ├── contents-types.d.ts
│   ├── survey-types.d.ts
│   ├── user-likes-type.d.ts
│   ├── form-types.d.ts
│   ├── menu-types.d.ts
│   └── server-action-return-type.d.ts
│
├── constants/
│   ├── api-constants.ts
│   ├── path-constants.ts
│   ├── message-constants.ts
│   ├── query-keys-constants.ts
│   ├── db-constants.ts
│   └── form-constants.ts
│
└── utils/
    ├── alert.ts
    ├── confirm-dialog.ts
    ├── filter-contents.ts
    ├── supabase-client.ts
    ├── supabase-server.ts
    └── supabase-auth.ts
```

## 🖥 실행 방법

```
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 실행
pnpm start
```

### 😎 Play Pick 체험하기 ➡️ <a href="https://play-pick.vercel.app/" target="blank">클릭</a>

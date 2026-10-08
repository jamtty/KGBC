# KGBC 홈페이지

React + TypeScript + Vite 기반의 KGBC 홈페이지입니다.
헤더 메뉴 구조는 확정된 사이트맵(2단계)을 그대로 사용하고, 메인 페이지는 GSAP 기반 풀페이지(섹션 스냅)로 동작합니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:5555
npm run build    # tsc 타입체크 + 프로덕션 빌드
npm run lint     # oxlint
npm run preview  # 빌드 결과 미리보기
```

개발 서버 포트는 `vite.config.ts`의 `server.port`(5555, `strictPort`)로 고정되어 있습니다.
스크롤·등장 효과는 `gsap`(ScrollTrigger, ScrollToPlugin)으로 처리합니다.

## 디렉터리 구조

```
src/
├─ assets/
│  ├─ css/
│  │  ├─ common.css               # 전역 CSS(리셋 + Pretendard @font-face + 토스트) — 전역 임포트
│  │  ├─ style.css                # 전역 디자인 CSS = 프로젝트의 모든 디자인 CSS — 전역 임포트
│  │  ├─ admin.css                # 관리자 화면용(현재 미임포트)
│  │  ├─ editor.css               # 에디터용(현재 미임포트)
│  │  └─ swiper.min.css           # Swiper 스타일(라이브러리 미설치, 현재 미임포트)
│  ├─ fonts/Pretendard/           # 웹폰트(common.css의 @font-face가 참조)
│  └─ images/
│     ├─ logo.svg                 # 헤더·푸터 로고
│     ├─ ico_select.svg           # common.css의 select 배경 아이콘(현재 <select> 없음)
│     ├─ ico_farm_*.svg           # 설국농장 픽토그램 4종(brand/jyg/embryo/huwoo) — 현재 미사용
│     ├─ sire.jpg / data.jpg / store.jpg            # 메인 'KGBC 사업' 카드(실제 촬영본)
│     ├─ farm-branding.jpg / farm-jyg.jpg           # 메인 '설국농장' 카드 4장(실제 촬영본)
│     ├─ farm-embryo.jpg / farm-huwoo.jpg           #   ↑
│     ├─ union-hanwoo.jpg         # 메인 '한우영농조합' 섹션 사진(조합 행사)
│     └─ about.jpg / business.jpg / farm.jpg / union.jpg / location.jpg  # 서브비주얼 배경
├─ components/                    # Header.tsx / Footer.tsx / FullPage.tsx / TopButton.tsx / PhotoSwiper.tsx (CSS 없음 — style.css)
├─ data/                          # menu.ts(메뉴·라우트 메타) / site.ts(사이트 정보)
├─ layouts/RootLayout.tsx         # 헤더/푸터/탑버튼 공통 레이아웃
├─ lib/fullPageBus.ts             # 풀페이지 활성 섹션 → 헤더 상태 전달
├─ pages/                         # 공통 셸 — Home.tsx / SubPage.tsx / NotFound.tsx (CSS 없음 — style.css)
│  ├─ about/  business/  farm/  location/  promo/   # GNB 그룹(id)별 서브페이지 폴더
├─ App.tsx                        # 라우트 정의(메뉴 데이터에서 자동 생성)
└─ main.tsx                       # 전역 CSS 임포트 + BrowserRouter + 마운트
```

## 전역 CSS / 디자인 CSS

[`src/main.tsx`](src/main.tsx)에서 아래 순서로 한 번만 임포트합니다. 뒤에 오는 파일이 우선순위를 가집니다.

```ts
import './assets/css/common.css' // 전역 CSS  (리셋·폰트·공통 요소)
import './assets/css/style.css'  // 전역 디자인 CSS (프로젝트의 모든 디자인)
```

- **프로젝트의 모든 디자인 CSS는 [`src/assets/css/style.css`](src/assets/css/style.css) 한 파일에 작성합니다.** 컴포넌트/페이지별 CSS 파일은 두지 않습니다(기존 파일들은 이 파일로 통합).
- `style.css` 섹션 구성(새 스타일은 해당 섹션에 추가):

| 섹션 | 내용 | 이전 파일 |
| --- | --- | --- |
| 01. 디자인 토큰 · 전역 유틸리티 | CSS 변수, `.container`/`.btn`/`.sec-title` | src/index.css |
| 02. 앱 레이아웃 | `.app`, 서브 페이지 상단 오프셋 | src/layouts/RootLayout.css |
| 03. 헤더 | GNB·드롭다운·모바일 드로어 | src/components/Header.css |
| 04. 푸터 | 하단 영역 | src/components/Footer.css |
| 05. 메인 풀페이지 | 스냅·스크롤 버튼 | src/components/FullPage.css |
| 06. 메인 페이지 | 히어로·카드·섹션 | src/pages/Home.css |
| 07. 서브 페이지 | 서브비주얼·LNB(가로 서브메뉴)·브래드크럼·공통 콘텐츠 | src/pages/SubPage.css |
| 08. 404 페이지 | 안내 화면 | src/pages/NotFound.css |
| 09. 맨 위로 가기 버튼 | 스크롤 시 페이드인되는 탑버튼 | src/components/TopButton.tsx |

- `common.css`의 `@font-face`가 `assets/fonts/Pretendard`를 참조하므로 Pretendard가 번들에 포함되어 로드됩니다.
- 아이콘은 Google Material Symbols를 [`index.html`](index.html)에서 `<link>`로 로드합니다. 현재 필요한 아이콘이 `arrow_upward` 하나뿐이라 `icon_names`로 서브셋해 약 2KB만 받습니다. 아이콘을 추가할 때는 `icon_names`에 이름을 쉼표로 더하세요.
- `admin.css`(관리자), `editor.css`(에디터), `swiper.min.css`(Swiper 라이브러리 필요)는 아직 임포트하지 않았습니다.
- rem 기준: `common.css`의 `html { font-size: 10px }`를 그대로 사용해 **1rem = 10px**입니다. 본문 기본 글자 크기는 `body { font-size: 1.6rem }`(16px)로 지정합니다. 새 CSS를 쓸 때 rem 값은 10px 기준으로 계산하세요.
- `.container`가 좌우 여백(`--pad-main`)을 담당하므로, `.container`와 함께 쓰는 클래스에서 세로 여백을 줄 때는 `padding` 축약 대신 `padding-block`을 사용하세요(가로 여백이 0으로 덮어써지지 않도록).

## 메뉴 / 라우트

| 상위 메뉴 | 서브 메뉴 | 경로 |
| --- | --- | --- |
| 회사소개 | (메뉴 첫 페이지) | `/about` |
| | 소개·브랜딩 | `/about/branding` |
| | 가치체계·비전 | `/about/vision` |
| | 인사말·연혁 | `/about/greeting` |
| | 연구소 스토리 | `/about/lab` |
| | 글로벌 사업 | `/about/global` |
| KGBC 사업 | (메뉴 첫 페이지) | `/business` |
| | KGBC0001 종모우 | `/business/sire` |
| | 데이터 | `/business/data` |
| | 구입처 | `/business/store` |
| 설국농장 | (메뉴 첫 페이지) | `/farm` |
| | 소개·브랜딩 | `/farm/branding` |
| | 설국한우 JYG | `/farm/jyg` |
| | 설국농장 수정란 | `/farm/embryo` |
| | 설국흑우 | `/farm/huwoo` |
| 한우영농조합 | 소개 | `/union/about` |
| 찾아오시는 길 | 주소·연락처 | `/location/contact` |

- 메뉴와 라우트는 모두 [`src/data/menu.ts`](src/data/menu.ts) 하나에서 관리합니다. 항목을 추가/수정하면 헤더, 모바일 메뉴, 라우터, 브레드크럼에 동시에 반영됩니다.
- 서브 페이지는 [`src/pages/SubPage.tsx`](src/pages/SubPage.tsx)가 **공통 레이아웃(서브비주얼 + LNB + 브래드크럼)** 을 그립니다.
- 본문은 같은 파일의 `SUB_CONTENT` 맵에 **경로별 컴포넌트**로 등록합니다 — 예: `'/about/branding': AboutBranding`.
  맵에 없는 경로는 "콘텐츠 준비 중입니다"(`.sub__empty`)가 보입니다. 페이지를 추가할 때는 `src/pages/`에 컴포넌트를 만들고 맵에 한 줄만 추가하면 됩니다.
- `src/pages/` 는 **GNB 그룹(id) 이름의 폴더**로 나눕니다 — `about` · `business` · `farm` · `location` · `promo`.
  공통 셸(`Home.tsx` · `SubPage.tsx` · `NotFound.tsx`)만 `pages/` 바로 아래에 둡니다.
  새 서브페이지는 해당 그룹 폴더에 만들고 `SubPage.tsx` 의 `SUB_CONTENT` 에 한 줄 추가하면 됩니다.
- 서브비주얼 배너(`.sub-visual--*`, 높이 40rem)는 그룹별 사진을 씁니다 — `src/assets/images/{about,business,farm,union,location}.jpg`
  - `business`(KGBC0001 종모우) · `farm`(설국한우 JYG) · `union`(설국흑우) · `location`(KGBC 착공식 현장)는 **KGBC 실제 촬영본**(원본: `D:\카톡다운로드\KGBC사진\KGBC사진`), `about`은 CC0(Wikimedia Commons) 사진입니다.
  - 배너는 가로로 아주 긴 띠(≈5.5:1)라 사진을 그대로 cover 하면 소가 화면을 꽉 채웁니다. 그래서 이미지들은 1920×480으로 만들 때 **사진을 배너 높이에 맞춰 가운데 놓고 좌우를 같은 사진의 블러·어둡게 처리한 배경으로 채운** 합성본입니다(`location`은 풍경이라 전체를 채웁니다).
  - 교체할 때는 같은 파일명으로 바꾸면 되고, 이미지가 없거나 로드 실패 시에는 `.sub-visual`의 그라디언트가 보입니다.

## 서브페이지 콘텐츠

서브페이지 본문은 `style.css` 섹션 07의 **공통 콘텐츠 블록**을 조합해 만듭니다(참고: winteckorea.kr 서브페이지 = 섹션 라벨 → 큰 제목 → 레드 강조 문단 → 본문).

| 블록 | 클래스 | 용도 |
| --- | --- | --- |
| 콘텐츠 영역 | `.sub-content` | 페이지 본문 래퍼 — 가로 여백은 `.container`, 안쪽 여백(9rem / 13rem) 담당 |
| 섹션 라벨 | `.sub-content__eyebrow` | `OUR VISION` 같은 영문 라벨(시그니처 레드, 넓은 자간) |
| 페이지 제목 | `.sub-content__title` | 페이지 이름(h1) |
| 강조 문단 | `.sub-content__lead` | 핵심 메시지 — 시그니처 레드 + 큰 글씨 (바로 뒤 본문은 `margin-top: 3.2rem` 자동) |
| 본문 문단 | `.sub-content__text` | 문단 묶음(`p + p` 자동 간격) |
| 배너 라벨 | `.sub-label` | 블록 제목·지점 이름을 알약(시그니처 레드, 오른쪽만 둥근) 형태로 — `union/About` · `location/Contact` 가 공용 |

- **소개·브랜딩(`/about/branding`)** 페이지는 [`src/pages/AboutBranding.tsx`](src/pages/AboutBranding.tsx)에 있습니다.
  - `.brand` — 좌측에 본문 2문단 + 개량 도식, 우측에 종모우 연필화(`branding-bull.png`)를 놓는 2단 그리드(≤1100px에서는 1단).
  - `.brand-diagram` — "한국형 개량의 스펙트럼 확장" 도식은 **원고 이미지**(`branding-bull2.png`)를 그대로 씁니다(예전에 CSS로 그린 원 2개 버전은 대체됨).
  - 두 이미지 모두 **원본 픽셀 크기(1:1)** 로 표시합니다(일러스트 297px · 도식 296px). 늘리면 흐려지므로 `width: auto`로 두고, 좁은 화면에서 넘치지 않게만 `max-width: 100%`를 걸어두었습니다. 고해상도 원본을 넣으면 크게 키워도 됩니다.
  - CSS로 도식을 만들 때 쓰던 자작 픽토그램(`ico_global` · `ico_beef` · `ico_report` · `ico_flask`)은 지금은 쓰지 않습니다(`ico_farm_*` 4종도 메인 설국농장 섹션이 사진 카드로 바뀌면서 미사용 — 파일만 남아 있습니다).
- **설국농장 소개·브랜딩(`/farm/branding`)** 페이지는 [`src/pages/FarmBranding.tsx`](src/pages/FarmBranding.tsx)에 있습니다.
  - `.farm-intro` — 좌 본문 | 우 농장 전경 사진 2단(≤1100px 1단). 사진은 아래쪽을 본문 끝에 맞춥니다.
  - `.farm-brand` — '설'·'국' 두 행(큰 글자 | 설명 | 영문 대응어) + 하단 요약. 큰 글자는 명조 계열 폰트로 씁니다.
  - `.farm-logo__figure` — 로고 타입은 **원본 도식 이미지 `src/assets/images/seolguk-mark.svg` 한 장**을 그대로 씁니다(워드마크·지시선·해설이 모두 이미지 안에 들어 있음).
    ⚠️ 이 SVG 는 내부에 산/들판 그래픽 PNG 1장이 base64 로 들어 있어 **약 3MB** 입니다(농장 사진 `sub_3_1.svg` 는 약 1.1MB). 페이지 무게를 줄이라면 최적화가 필요합니다.
- **찾아오시는 길 주소·연락처(`/location/contact`)** 페이지는 [`src/pages/LocationContact.tsx`](src/pages/LocationContact.tsx)에 있습니다.
  - 좌: **Google 지도**(`iframe`), 우: 지점 3곳 + 주문 연락처. 빨간 지점 라벨을 누르면 지도가 그 위치로 바뀝니다.
  - 지도는 **API 키 없이 동작하는 주소 검색 임베드**(`https://maps.google.com/maps?q=<주소>&hl=ko&z=16&output=embed`)를 씁니다.
    공식 Embed API(키 필요)로 바꾸려면 `mapSrc()` 한 곳만 교체하면 됩니다(주석에 대체 주소를 적어 두었습니다).
  - 지도가 차단된 환경을 위해 아래에 “구글 지도에서 열기”(`https://www.google.com/maps/search/?api=1&query=…`) 링크를 함께 둡니다.
  - ⚠️ **Google 지도 임베드는 헤드리스 브라우저 캡처에서 빈 화면**으로 나옵니다(직접 문서로 열면 “The Google Maps Embed API must be used in an iframe” 응답이 정상 수신됨 = 실제 브라우저에서는 동작). 렌더 확인은 직접 브라우저에서 해야 합니다.
- **홍보자료(GNB 마지막 그룹) — 공지사항 `/promo/notice`, 자료실 `/promo/archive`)** 는 [`src/pages/promo/`](src/pages/promo)에 있습니다.
  - 공지사항 — 제목을 누르면 내용이 펼쳐지는 아코디언 목록(`NOTICES` 배열).
  - 자료실 — 첨부 파일 다운로드 목록(`FILES` 배열). 파일은 `apps/public/files/` 에 올리고 **파일명만** 적으면 됩니다.
  - ⚠️ **목록 데이터는 비워 두었습니다**(예시 글을 넣지 않음). 배열에 실제 내용을 추가하면 그대로 표시되고, 비어 있으면 “등록된 …이 없습니다” 안내(`.board__empty`)가 보입니다.
  - 배너(`.sub-visual--promo`)는 전용 사진이 없어 기본 그라디언트를 씁니다 — `src/assets/images/promo.png` 를 넣고 `style.css` 의 주석을 풀면 됩니다.
- **한우영농조합 소개(`/union/about`)** 페이지는 [`src/pages/union/About.tsx`](src/pages/union/About.tsx)에 있습니다.
  - 상단은 **가로 2단** — 좌: 리드문 + 본문 3문단 / 우: `한우영농조합원 분포도`(`sub_4_1`). 그 아래로 `사업내용`, 그리고 발표회 사진 6장이 세로로 이어집니다.
  - 블록 제목은 공통 **`.sub-label`**(시그니처 레드 배너)을 씁니다.
  - 발표회 사진 6장은 **제목·날짜 없이 스와이퍼로만** 보여줍니다(2026-10-08 변경). 사진 번호는 **좌→우 행 순서**입니다 — 2018 발표회 `sub_4_2`·`sub_4_4`·`sub_4_6` / 2019 발표회 `sub_4_3`·`sub_4_5`·`sub_4_7`.
    - 돌아가며 보이는 장수는 3장(≤900px 2장 → ≤600px 1장)이고, 좌우 화살표·위치 점을 함께 제공합니다. 터치·트랙패드 스와이프, 마우스 드래그, 좌우 방향키를 지원합니다.
    - Swiper 라이브러리를 설치하지 않고 **네이티브 가로 스크롤 + CSS scroll-snap** 으로 구현했습니다([`src/components/PhotoSwiper.tsx`](src/components/PhotoSwiper.tsx) + `style.css` 의 `.photo-swiper*`). `swiper.min.css` 는 계속 미사용입니다.
    - 제목을 지우면서 발표회 정보는 각 사진의 `alt`("2018년 한국형 신품종 '흑우' 발표회 — …")로 옮겼습니다.
  - ⚠️ 원본 표기 `혹우` 는 프로젝트 표기에 맞춰 **`흑우`** 로 적었습니다(2018년 설국흑우 발표 행사). 원문 그대로가 필요하면 알려주세요.

## 레이아웃 기준

- rem 기준은 **1rem = 10px**입니다(`assets/css/common.css`의 `html { font-size: 10px }`). 본문 기본 글자 크기는 `body { font-size: 1.6rem }`(=16px)로 따로 지정합니다.
- 본문 컨테이너(`.container`)는 가로 100%이고 좌우 여백은 `--pad-main`을 사용합니다. → [`src/assets/css/style.css`](src/assets/css/style.css) 섹션 01

| 뷰포트 | `--pad-main` |
| --- | --- |
| 기본 | 12rem (120px) |
| ≤1600px | 9rem (90px) |
| ≤1200px | 6rem (60px) |
| ≤900px | 3rem (30px) |
| ≤600px | 2rem (20px) |

## 헤더

`winteckorea.kr` 헤더 CSS를 그대로 옮겨 적용했습니다. → [`src/assets/css/style.css`](src/assets/css/style.css) 섹션 03

- 높이 110px 고정(`--header-h`), 컨테이너 `max-width: 1750px` + 좌우 15px, 하단 보더 `1px rgba(255,255,255,.2)`, `letter-spacing: -0.03em`
- 로고는 좌측 15px 세로 중앙, GNB는 `margin-left: 60px` + 중앙 정렬, 항목 `padding: 0 45px`, 링크 20px/500/`line-height: 110px`
- 서브메뉴: 항목 아래 중앙에 폭 260px 패널(`#f8f8f8`, `padding: 40px 0 60px`), 링크 18px/500 `#666` + hover 시 밑줄 애니메이션. `display` 토글 대신 높이(`max-height` 0 → 40rem)와 `opacity`/`visibility`를 전환해 **위에서 아래로 펼쳐지는 슬라이드 토글**로 열립니다(내용은 `translateY(-1.2rem)`에서 따라 내려옴). 닫힌 동안은 `visibility: hidden`이라 탭 순서·낭독기에서 제외됩니다.
- 헤더 hover 또는 스크롤(서브 페이지) 상태 → 흰 배경 + 검정 글자, 메뉴 hover는 시그니처 컬러 `var(--color-brand)`
- 현재 경로가 속한 GNB 그룹은 시그니처 컬러로 표시됩니다(`.hd__item.is-active`). 모바일 드로어 그룹 제목에도 같은 표시가 적용됩니다. 홈(`/`)은 해당 그룹이 없어 표시되지 않습니다.
- 스크롤을 내리면 헤더가 위로 스무스하게 숨고(`transform: translateY(-100%)`, 0.6s), 스크롤을 올리면 다시 나타납니다(원본 `#header.hide`/`.active`와 동일). 메인은 `.fp` 컨테이너 스크롤, 서브 페이지는 창 스크롤을 기준으로 판단합니다.
- 서브메뉴가 열리면 헤더 아래 영역이 `rgba(0,0,0,.6)`으로 딤 처리됩니다(`.hd__dim`, 입력은 막지 않음)
- 오른쪽 25×16 막대 버튼(원본 `.sitemap-btn`)으로 모바일 드로어를 열고 닫습니다(열리면 X로 전환)
- 원본과 다른 점: 로고는 `src/assets/images/logo.svg` 이미지를 쓰고, 메인 페이지의 투명 헤더 상태에서만 흰색으로 반전(`filter: brightness(0) invert(1)`)하며 흰 배경에서는 원본 컬러입니다. KOR/ENG 언어 선택과 원본의 전체화면 사이트맵 패널은 넣지 않았습니다. 모바일(≤1100px)에서는 GNB를 숨기고 기존 드로어를 사용하며 헤더 높이는 72px로 줄입니다.

## 메인 풀페이지

- 실제 스크롤 방식입니다. [`src/components/FullPage.tsx`](src/components/FullPage.tsx)의 자식으로 섹션을 나열하면 각 섹션이 뷰포트를 가득 채웁니다.
- **휠 한 제스처 = 정확히 한 화면**입니다. 휠 이벤트의 기본 스크롤을 막고(preventDefault) GSAP ScrollToPlugin으로 다음/이전 섹션까지 `power2.inOut`(0.6s)로 이동합니다. 같은 제스처의 연속 이벤트(연타·트랙패드 관성, 100ms 이내)는 하나로 묶여 한 화면만 움직입니다.
- `↑`/`↓`·PageUp/PageDown·Home/End 키로도 한 화면씩 이동합니다.
- 콘텐츠 등장 효과: 섹션 안의 `data-reveal` 요소가 화면에 들어올 때 아래에서 위로 떠오르며 순차적으로 나타나고, `.fp__inner`에는 스크롤에 연동된 완만한 상하 드리프트(패럴랙스)가 걸립니다. `prefers-reduced-motion` 환경에서는 효과와 스냅이 모두 꺼집니다.
- 활성 섹션은 `IntersectionObserver`(뷰포트 중앙 기준)로 감지해 `fullPageBus`로 헤더에 전달됩니다. 첫 섹션(어두운 히어로)에서는 헤더가 투명하게, 이후 섹션에서는 흰색으로 전환됩니다.
- 히어로 배경은 동영상입니다(`HERO_VIDEO` — [`src/data/site.ts`](src/data/site.ts)). 영상은 **`src/assets/images/main_movie.mp4`**(KGBC 홍보 영상, 1280×720 · 약 58초)를 import 해서 쓰며, 빌드하면 `dist/assets/main_movie-<해시>.mp4` 로 나옵니다(해시 파일이라 1년 immutable 캐시).
  - 소리 없이 자동 반복 재생되고, 로드 전·재생 실패·`prefers-reduced-motion` 환경에서는 `.hero`의 그라디언트가 대신 보입니다.
  - 다른 영상으로 바꿀 때는 같은 폴더에 파일을 넣고 `site.ts`의 import 경로·주석만 바꾸면 됩니다(권장: 720p H.264 MP4, 10초 내외).
  - ⚠️ 현재 영상에는 자막·자막성 문구가 들어 있어 히어로 문구와 겹쳐 보일 수 있습니다 — 특정 구간만 반복하거나 자막 없는 편집본으로 교체하는 것을 권장합니다.
- 메인 카피(히어로 및 3개 섹션)는 `소개 브랜딩` 원고(한국유전자종축센터 소개)를 요약해 [`src/pages/Home.tsx`](src/pages/Home.tsx)에 직접 작성했습니다. 정식 명칭은 `SITE.nameKo`, 약칭·로고용은 `SITE.name`(KGBC)입니다.
- 그룹 랜딩이 아니라 LNB 첫 페이지로 보내야 하는 링크는 `groupEntryPath()`([`src/data/menu.ts`](src/data/menu.ts))를 사용합니다 — GNB·모바일 드로어·푸터·브래드크럼·히어로 버튼.
- 어떤 섹션이라도 뷰포트보다 길어지면(내용이 넘치면) 휠 스냅이 자동으로 해제되어 자유 스크롤로 동작합니다. 넘친 콘텐츠에 접근하지 못하는 상황을 막기 위한 처리로, 모바일에서 주로 발생합니다(터치 스크롤은 항상 네이티브).
- 섹션 순서: 히어로 → KGBC 사업(사진 카드 3장) → 설국농장(사진 카드 4장) → 한우영농조합(사진 + 텍스트) 순이며, 배경/문구는 [`src/pages/Home.tsx`](src/pages/Home.tsx)와 [`src/assets/css/style.css`](src/assets/css/style.css) 섹션 06에서 수정합니다. 새 콘텐츠 블록에는 `data-reveal` 속성을 붙이면 같은 등장 효과가 적용됩니다.
- **KGBC 사업 섹션은 사진 위에 제목을 얹는 이미지 카드**(`.biz-cards` / `.biz-card`)입니다. 3장이 한 화면에 들어오도록 목록 높이를 `min(56rem, 52vh, 100svh - 34rem)`로 잡고, 세로 여백은 `.home-sec--cards`에서 줄입니다(≤900px에서는 한 열 + `aspect-ratio: 4/3`).
  - ⚠️ **카드 높이의 `100svh - 34rem` 상한을 지우면 안 됩니다.** `FullPage`는 모든 섹션이 뷰포트 이하일 때만 휠 스냅을 켜므로, 섹션이 1px이라도 길어지면 메인 전체가 자유 스크롤로 바뀝니다. 같은 이유로 카드 높이를 `aspect-ratio`로 잡으면 안 됩니다.
  - 화면 높이가 낮은 노트북(768/720px)에서는 `@media (min-width: 901px) and (max-height: 860px)`가 위·아래 여백을 6rem으로 줄여 카드 공간을 확보합니다(섹션이 가운데 정렬이라 내용이 짧을 때는 보이지 않습니다).
  - 제목은 `BUSINESS_CARDS`의 `title: ['KGBC0001', '종모우']`처럼 두 줄로 나누어 넣고, 사진은 `src/assets/images/{sire,data,store}.jpg`입니다. **모두 KGBC 실제 촬영본**이며(종모우 0001 · 연구실 수정란 작업 · 배반포 현미경), 교체할 때는 같은 파일명으로 바꾸면 됩니다.
    - 사진이 카드 비율로 잘릴 때 남길 지점은 각 항목의 `focus`(예: `'30% 45%'`)가 `object-position`으로 들어갑니다.
  - 흰 제목이 항상 읽히도록 `.biz-card__scrim` 그라디언트를 사진 위에 올리고, hover 시 사진 확대 + `자세히 보기` 밑 시그니처 레드 밑줄이 자라납니다.
- **설국농장 섹션은 KGBC 사업과 같은 사진 카드 서식을 4장 가로 한 줄로 씁니다**(`.biz-cards--farm`). 카드 높이는 KGBC 사업과 같은 공통 규칙(`min(56rem, 52vh, 100svh - 34rem)`)을 그대로 쓰고, 세로 여백도 `.home-sec--farm`에서 함께 줄입니다. 섹션 제목은 KGBC 사업과 동일하게 가운데 정렬입니다.
  - ⚠️ **열 수를 2단으로 줄이면 안 됩니다** — 2행이 되어 섹션이 뷰포트보다 길어지고 메인 전체의 휠 스냅이 풀립니다. ≤1100px에서는 여백·글자를 한 단계 줄여 카드가 좁아도 문구가 잘리지 않게 하고, ≤900px의 한 열 전환은 `.biz-cards` 공통 규칙이 처리합니다(`aspect-ratio: 4/3`).
  - 제목은 `FARM_CARDS`의 `title: ['설국한우', 'JYG']`처럼 줄 단위 배열로 넣고(1줄도 가능), 사진은 `src/assets/images/farm-{branding,jyg,embryo,huwoo}.jpg`입니다. **모두 KGBC 실제 촬영본**(원본: `D:\카톡다운로드\KGBC사진`)이며, 교체할 때는 같은 파일명으로 바꾸면 됩니다.
    - `farm-branding.jpg` = 연구원_연구실(대표·실험실) · `farm-jyg.jpg` = 한우사진(`JYG-002`) · `farm-embryo.jpg` = 수정란사진(상실배) · `farm-huwoo.jpg` = 한우사진(설국흑우)
    - 원본은 가로 3800px 이상이라 **가로 1200px·3:2 크롭 / JPEG 82%** 로 줄여 넣었습니다(3:2 로 미리 잘라 두어 카드에서 잘림이 적습니다).
  - 사진이 카드 비율로 잘릴 때 남길 지점은 각 항목의 `focus`(예: `'88% 42%'`)가 `object-position`으로 들어갑니다(소는 머리가 프레임에 남도록 오른쪽으로 치우치게 잡았습니다).
- **한우영농조합 섹션은 좌측 사진 + 우측 텍스트 2단**(`.split`)입니다. 사진은 `aspect-ratio: 4/3`(≤900px에서는 한 열 + `16/9`)이고, 우측(`.split__body`)은 eyebrow·제목·설명 + 메뉴 서브 페이지 링크 행으로 구성됩니다.
  - 사진은 `src/assets/images/union-hanwoo.jpg` — **설국한우 개량 발표회에 모인 한우영농조합 농가**(KGBC 실제 촬영본) — 교체할 때는 같은 파일명으로 바꾸면 됩니다.
  - 링크 행(`.split__links`)은 [`src/data/menu.ts`](src/data/menu.ts)의 한우영농조합 서브 메뉴(`UNION_LINKS`)를 그대로 쓰므로, 서브 메뉴를 추가하면 섹션에도 함께 반영됩니다.
- 마지막에는 서브 페이지와 같은 공통 푸터([`src/components/Footer.tsx`](src/components/Footer.tsx))가 마지막 섹션 바로 아래에 일반 블록으로 붙습니다(한 화면을 차지하지 않음). 마지막 콘텐츠 섹션(`.home-sec--last`, 현재 한우영농조합)도 화면 높이를 강제로 채우지 않아 푸터 위에 빈 화면이 남지 않습니다. [`src/assets/css/style.css`](src/assets/css/style.css) 섹션 06에서 처리하며, 서브 페이지는 기존처럼 [`src/layouts/RootLayout.tsx`](src/layouts/RootLayout.tsx)가 푸터를 렌더링합니다.

## 파비콘

브랜드 컬러(시그니처 레드 `#9e0810` 계열) 라운드 사각형 + 흰색 **K** 모노그램입니다.

| 파일 | 용도 |
| --- | --- |
| [`public/favicon.svg`](public/favicon.svg) | 원본(모던 브라우저 탭) — 수정은 이 파일에서 |
| `public/favicon.ico` | 구형 브라우저·탭 (16/32/48px 포함) |
| `public/apple-touch-icon.png` | iOS 홈 화면 추가(180px, 모서리 없음) |

- `favicon.ico`·`apple-touch-icon.png`는 [`scripts/make-favicon.cjs`](scripts/make-favicon.cjs)가 SVG와 같은 도형을 코드로 그려 굽습니다(외부 라이브러리 없음).
  ```bash
  node scripts/make-favicon.cjs public
  ```
- 연결은 [`index.html`](index.html) `<head>`의 `icon`/`apple-touch-icon` 링크에서 하며, `theme-color`도 시그니처 레드로 지정합니다.
- ⚠️ `public/`는 빌드 시 `dist/`로 그대로 복사되므로, 파일을 바꾼 뒤에는 다시 빌드해야 배포본에 반영됩니다.

## 배포 (카페24 · SPA 새로고침 404 대응)

`npm run build` 결과(`dist/`)를 카페24 `/www`에 올립니다. 이 사이트는 `BrowserRouter`(HTML5 History)를 쓰기 때문에 **서버가 `/about/branding` 같은 하위 경로를 모릅니다.** 그대로 두면 메인에서 메뉴로 이동할 때는 정상이지만 **그 화면에서 새로고침(F5)·직접 링크 접속 시 서버 404(카페24 오류 페이지)가 납니다.**

- 해결: [`public/.htaccess`](public/.htaccess) — 빌드하면 `dist/.htaccess`로 함께 복사됩니다.
  - 실제로 존재하는 파일/디렉터리(`/assets/*`, `/favicon.*`, `/upload/*`, `/backend/*`)는 그대로 서빙
  - 그 외 모든 경로는 `/index.html`로 전달 → 클라이언트 라우터가 이어서 렌더링
  - `.html`은 `no-cache`, 해시가 붙은 `/assets/*`는 1년 `immutable` 캐시
- 서버가 500 오류를 내면 `.htaccess`의 `Options -MultiViews` 줄만 지우세요(호스팅이 `AllowOverride Options`를 막은 경우).
- ⚠️ `public/`의 점(.)으로 시작하는 파일이 SFTP 수동 업로드에서 누락되지 않도록 `dist/`를 통째로 동기화하는 것을 권장합니다.


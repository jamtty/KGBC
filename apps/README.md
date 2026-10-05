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
│  └─ images/ico_select.svg       # common.css의 select 배경 아이콘
├─ components/                    # Header.tsx / Footer.tsx / FullPage.tsx (CSS 없음 — style.css)
├─ data/                          # menu.ts(메뉴·라우트 메타) / site.ts(사이트 정보)
├─ layouts/RootLayout.tsx         # 헤더/푸터 공통 레이아웃
├─ lib/fullPageBus.ts             # 풀페이지 활성 섹션 → 헤더 상태 전달
├─ pages/                         # Home.tsx / SubPage.tsx / NotFound.tsx (CSS 없음 — style.css)
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
| 07. 서브 페이지 | 배너·브레드크럼 | src/pages/SubPage.css |
| 08. 404 페이지 | 안내 화면 | src/pages/NotFound.css |

- `common.css`의 `@font-face`가 `assets/fonts/Pretendard`를 참조하므로 Pretendard가 번들에 포함되어 로드됩니다.
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
| | 설국후우 | `/farm/huwoo` |
| 한우영농조합 | 소개 | `/union/about` |
| 찾아오시는 길 | 주소·연락처 | `/location/contact` |

- 메뉴와 라우트는 모두 [`src/data/menu.ts`](src/data/menu.ts) 하나에서 관리합니다. 항목을 추가/수정하면 헤더, 모바일 메뉴, 라우터, 브레드크럼에 동시에 반영됩니다.
- 서브 페이지는 [`src/pages/SubPage.tsx`](src/pages/SubPage.tsx) 하나로 모든 경로를 렌더링하는 빈 페이지입니다. 페이지별 내용은 이 파일을 확장하거나 경로별 컴포넌트로 교체하면 됩니다.

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
- 서브메뉴: 항목 아래 중앙에 폭 260px 패널(`#f8f8f8`, `padding: 40px 0 60px`), 링크 18px/500 `#666` + hover 시 밑줄 애니메이션
- 헤더 hover 또는 스크롤(서브 페이지) 상태 → 흰 배경 + 검정 글자, 메뉴 hover는 `#001f5d`(원본과 동일한 캐스케이드)
- 서브메뉴가 열리면 헤더 아래 영역이 `rgba(0,0,0,.6)`으로 딤 처리됩니다(`.hd__dim`, 입력은 막지 않음)
- 오른쪽 25×16 막대 버튼(원본 `.sitemap-btn`)으로 모바일 드로어를 열고 닫습니다(열리면 X로 전환)
- 원본과 다른 점: 로고는 이미지 대신 텍스트(마크 + 태그라인)를 사용하고, KOR/ENG 언어 선택과 원본의 전체화면 사이트맵 패널은 넣지 않았습니다. 모바일(≤1100px)에서는 GNB를 숨기고 기존 드로어를 사용하며 헤더 높이는 72px로 줄입니다.

## 메인 풀페이지

- 실제 스크롤 방식입니다. [`src/components/FullPage.tsx`](src/components/FullPage.tsx)의 자식으로 섹션을 나열하면 각 섹션이 뷰포트를 가득 채웁니다.
- **휠 한 제스처 = 정확히 한 화면**입니다. 휠 이벤트의 기본 스크롤을 막고(preventDefault) GSAP ScrollToPlugin으로 다음/이전 섹션까지 `power2.inOut`(0.6s)로 이동합니다. 같은 제스처의 연속 이벤트(연타·트랙패드 관성, 100ms 이내)는 하나로 묶여 한 화면만 움직입니다.
- 하단 스크롤 버튼과 `↑`/`↓`·PageUp/PageDown·Home/End 키도 한 화면씩 이동합니다.
- 콘텐츠 등장 효과: 섹션 안의 `data-reveal` 요소가 화면에 들어올 때 아래에서 위로 떠오르며 순차적으로 나타나고, `.fp__inner`에는 스크롤에 연동된 완만한 상하 드리프트(패럴랙스)가 걸립니다. `prefers-reduced-motion` 환경에서는 효과와 스냅이 모두 꺼집니다.
- 활성 섹션은 `IntersectionObserver`(뷰포트 중앙 기준)로 감지해 `fullPageBus`로 헤더에 전달됩니다. 첫 섹션(어두운 히어로)에서는 헤더가 투명하게, 이후 섹션에서는 흰색으로 전환됩니다.
- 어떤 섹션이라도 뷰포트보다 길어지면(내용이 넘치면) 휠 스냅이 자동으로 해제되어 자유 스크롤로 동작합니다. 넘친 콘텐츠에 접근하지 못하는 상황을 막기 위한 처리로, 모바일에서 주로 발생합니다(터치 스크롤은 항상 네이티브).
- 섹션 배경/문구는 [`src/pages/Home.tsx`](src/pages/Home.tsx)와 [`src/assets/css/style.css`](src/assets/css/style.css) 섹션 06에서 수정합니다. 새 콘텐츠 블록에는 `data-reveal` 속성을 붙이면 같은 등장 효과가 적용됩니다.
- 마지막에는 서브 페이지와 같은 공통 푸터([`src/components/Footer.tsx`](src/components/Footer.tsx))가 마지막 섹션 바로 아래에 일반 블록으로 붙습니다(한 화면을 차지하지 않음). 마지막 섹션(오시는 길)도 화면 높이를 강제로 채우지 않아 푸터 위에 빈 화면이 남지 않습니다. [`src/assets/css/style.css`](src/assets/css/style.css) 섹션 06에서 처리하며, 서브 페이지는 기존처럼 [`src/layouts/RootLayout.tsx`](src/layouts/RootLayout.tsx)가 푸터를 렌더링합니다.

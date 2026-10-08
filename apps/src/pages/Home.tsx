import { useState } from 'react'
import { Link } from 'react-router-dom'
import dataImg from '../assets/images/data.jpg'
import farmBrandingImg from '../assets/images/farm-branding.jpg'
import farmEmbryoImg from '../assets/images/farm-embryo.jpg'
import farmHuwooImg from '../assets/images/farm-huwoo.jpg'
import farmJygImg from '../assets/images/farm-jyg.jpg'
import sireImg from '../assets/images/sire.jpg'
import storeImg from '../assets/images/store.jpg'
import unionImg from '../assets/images/union-hanwoo.jpg'
import Footer from '../components/Footer'
import FullPage from '../components/FullPage'
import { MENU, groupEntryPath } from '../data/menu'
import { ARCHIVE_ITEMS, NOTICES, archivePath, noticePath } from '../data/promo'
import { HERO_VIDEO, SITE } from '../data/site'

/**
 * KGBC 사업 — 사진 위에 제목을 얹는 이미지 카드.
 * 사진은 모두 **KGBC 실제 촬영본**(원본: D:\카톡다운로드\KGBC사진)입니다.
 *   종모우 = KGBC-0001.jpg(종모우 0001), 데이터 = 연구원_연구실\IMG_4770.JPG(수정란 작업),
 *   구입처 = 수정란사진\배반포.jpg(수정란 현미경)
 * 교체할 때는 `src/assets/images/` 안의 같은 파일명(sire/data/store.jpg)을 바꾸면 됩니다.
 * `focus`는 카드 비율로 사진이 잘릴 때 남길 지점(object-position)입니다.
 */
const BUSINESS_CARDS = [
  {
    path: '/business/sire',
    title: ['KGBC0001', '종모우'],
    desc: '혈통과 유전능력을 검증한 대표 종모우의 정보를 확인할 수 있습니다.',
    image: sireImg,
    focus: '0% 45%',
  },
  {
    path: '/business/data',
    title: ['유전능력', '데이터'],
    desc: '농장형 연구소에서 직접 확보한 현장 데이터를 바탕으로 한 유전능력 검정 결과입니다.',
    image: dataImg,
    focus: '30% 45%',
  },
  {
    path: '/business/store',
    title: ['정액·수정란', '구입처'],
    desc: '종모우 정액 및 수정란 구입처를 안내합니다.',
    image: storeImg,
    focus: '50% 48%',
  },
]

/**
 * 설국농장 — KGBC 사업과 **같은 사진 카드 서식**을 4장으로 씁니다(.biz-cards--farm).
 * 사진 원본: D:\카톡다운로드\KGBC사진
 *   소개·브랜딩 = 연구원_연구실\IMG_4810.JPG, 설국한우 JYG = 한우사진\JYG-002.jpeg,
 *   수정란 = 수정란사진\상실배.jpg,      설국흑우 = 한우사진\설국흑우.jpg
 * title 은 카드에서 줄바꿈할 단위(2개까지)이며, `focus`는 카드 비율로 사진이 잘릴 때 남길 지점입니다.
 */
const FARM_CARDS = [
  {
    path: '/farm/branding',
    title: ['소개·브랜딩'],
    desc: "설국(初國)의 뜻과 브랜드 철학을 담아, 첨단생명공학 현장 중심 농장기업의 방향을 소개합니다.",
    image: farmBrandingImg,
    focus: '44% 24%',
  },
  {
    path: '/farm/jyg',
    title: ['설국한우', 'JYG'],
    desc: '현장 중심 실증 개량 시스템으로 탄생한 설국한우 대표 종모우 JYG의 혈통과 능력을 안내합니다.',
    image: farmJygImg,
    focus: '88% 42%',
  },
  {
    path: '/farm/embryo',
    title: ['설국농장', '수정란'],
    desc: '우수 혈통의 수정란을 직접 생산·이식해 농가의 개량 속도를 높이는 설국농장 수정란 사업입니다.',
    image: farmEmbryoImg,
    focus: '48% 50%',
  },
  {
    path: '/farm/huwoo',
    title: ['설국흑우'],
    desc: "한 품종 탄생을 위해 10~20년간 연구해 만든 한국형 신품종 '흑우'를 소개합니다.",
    image: farmHuwooImg,
    focus: '92% 42%',
  },
]

/** 한우영농조합은 메뉴 데이터(서브 메뉴)를 그대로 섹션 링크로 사용합니다. */
const UNION_LINKS = MENU.find((group) => group.id === 'union')?.children ?? []

/** 메인 홍보자료 미리보기에 보여 줄 건수 — 섹션이 한 화면을 넘지 않도록 목록의 앞 3건만 씁니다. */
const PREVIEW_COUNT = 3

/** 그룹 랜딩이 아니라 LNB 첫 번째 페이지 경로를 알려줍니다. */
function entryOf(groupId: string) {
  const group = MENU.find((item) => item.id === groupId)
  return group ? groupEntryPath(group) : '/'
}

export default function Home() {
  // 모션 최소화 설정을 쓰는 사용자에게는 배경 동영상을 재생하지 않습니다.
  // 첫 렌더부터 <video>를 넣어야 지연 없이 바로 보이므로 lazy 초기값으로 판정합니다.
  const [playVideo] = useState(
    () => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  return (
    <FullPage>
      {/*
        배경 동영상 — 소리 없는 자동 반복 재생. 로드 전/실패 시에는 .hero 그라디언트가 보입니다.
        data-no-reveal: FullPage 의 리빌·드리프트 애니메이션에서 제외해 효과 없이 즉시 표시합니다.
      */}
      <div className="hero" data-no-reveal>
        {playVideo && (
          <video
            className="hero__video"
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
        )}
        {/* 영상·그라디언트 위에 얹는 장식용 체크 격자 */}
        <div className="hero__grid" aria-hidden="true" />
        <div className="container hero__content">
          <p className="hero__eyebrow" data-reveal>
            {SITE.nameKo}
          </p>
          <h1 className="hero__title" data-reveal>
            우수 형질의 종모우를
            <br />
            개발·생산·보급합니다
          </h1>
          <p className="hero__desc" data-reveal>
            첨단 생명공학 기술을 바탕으로 국내 유일하게 수정란과 종모우 개발을 동시에 수행하며, 국내 최대 규모의 종축 유전자원
            허브로 자리잡고 있습니다.
          </p>
          <div className="hero__actions" data-reveal>
            <Link className="btn btn--primary" to={entryOf('about')}>
              회사소개 보기
            </Link>
            <Link className="btn btn--ghost" to={entryOf('business')}>
              사업영역 보기
            </Link>
          </div>
        </div>
      </div>

      <div className="home-sec home-sec--cards">
        <div className="container">
          <div className="sec-title">
            <p className="sec-title__eyebrow" data-reveal>
              KGBC BUSINESS
            </p>
            <h2 className="sec-title__title" data-reveal>
              KGBC 사업
            </h2>
            <p className="sec-title__desc" data-reveal>
              현장에서 확보한 데이터를 바탕으로 우수 형질의 종모우를 개발하고, 유전능력 정보와 구입 안내를 제공합니다.
            </p>
          </div>
          <ul className="biz-cards">
            {BUSINESS_CARDS.map((card) => (
              <li key={card.path} className="biz-card" data-reveal>
                <Link className="biz-card__link" to={card.path}>
                  <img
                    className="biz-card__img"
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: card.focus }}
                  />
                  {/* 사진 위에서도 흰 제목이 읽히도록 위·아래를 덮는 스크림 */}
                  <span className="biz-card__scrim" aria-hidden="true" />
                  <div className="biz-card__body">
                    <h3 className="biz-card__title">
                      {card.title[0]}
                      <br />
                      {card.title[1]}
                    </h3>
                    <p className="biz-card__desc">{card.desc}</p>
                  </div>
                  <span className="biz-card__more">자세히 보기</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-sec home-sec--soft home-sec--farm">
        <div className="container">
          <div className="sec-title">
            <p className="sec-title__eyebrow" data-reveal>
              SEOLGUK FARM
            </p>
            <h2 className="sec-title__title" data-reveal>
              설국농장
            </h2>
            <p className="sec-title__desc" data-reveal>
              한우 종모우와 흑우 등 신품종 개발에 주력하며, 수정란 이식 기술로 한국형 개량의 범위를 넓혀갑니다.
            </p>
          </div>
          <ul className="biz-cards biz-cards--farm">
            {FARM_CARDS.map((card) => (
              <li key={card.path} className="biz-card" data-reveal>
                <Link className="biz-card__link" to={card.path}>
                  <img
                    className="biz-card__img"
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: card.focus }}
                  />
                  {/* 사진 위에서도 흰 제목이 읽히도록 위·아래를 덮는 스크림 */}
                  <span className="biz-card__scrim" aria-hidden="true" />
                  <div className="biz-card__body">
                    <h3 className="biz-card__title">
                      {card.title.map((line) => (
                        <span key={line} className="biz-card__line">
                          {line}
                        </span>
                      ))}
                    </h3>
                    <p className="biz-card__desc">{card.desc}</p>
                  </div>
                  <span className="biz-card__more">자세히 보기</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-sec home-sec--content">
        <div className="container">
          {/* 한우영농조합 — 좌측 사진 + 우측 텍스트 */}
          <div className="split">
            <figure className="split__media" data-reveal>
              <img
                className="split__img"
                src={unionImg}
                alt="설국한우 개량 발표회에 모인 한우영농조합 농가"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="split__body">
              <p className="sec-title__eyebrow" data-reveal>
                HANWOO UNION
              </p>
              <h2 className="sec-title__title" data-reveal>
                한우영농조합
              </h2>
              <p className="sec-title__desc" data-reveal>
                전북 장수군 '저탄소한우 산업지구'를 중심으로 저탄소 축산의 기준을 세우고,<br />농가 소득 증대를 함께 실현합니다.
              </p>
              <ul className="split__links">
                {UNION_LINKS.map((link) => (
                  <li key={link.path} data-reveal>
                    <Link className="split__link" to={link.path}>
                      <span>{link.label}</span>
                      <span className="link-arrow" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/*
        홍보자료 — 공지사항(목록형) + 자료실(갤러리 썸네일)을 메인 마지막 섹션에 요약해 보여줍니다.
        목록은 서브페이지와 같은 `src/data/promo.ts` 를 쓰므로 한 곳만 고치면 함께 반영됩니다.
        배경은 설국농장 섹션과 같은 소프트 배경(.home-sec--soft)으로 이어 줍니다.
      */}
      <div className="home-sec home-sec--soft home-sec--content home-sec--last home-sec--promo">
        <div className="container">
          <div className="sec-title">
            <p className="sec-title__eyebrow" data-reveal>
              KGBC NEWS
            </p>
            <h2 className="sec-title__title" data-reveal>
              홍보자료
            </h2>
            <p className="sec-title__desc" data-reveal>
              공지사항과 자료실의 최신 소식을 한곳에서 확인하세요.
            </p>
          </div>

          <div className="promo-preview">
            {/* 좌 — 공지사항 목록 */}
            <section className="promo-preview__col" data-reveal>
              <div className="promo-preview__head">
                <h3 className="promo-preview__title">공지사항</h3>
                <Link className="promo-preview__more" to="/promo/notice">
                  더보기
                  <span className="link-arrow" aria-hidden="true" />
                </Link>
              </div>

              <ul className="board">
                {NOTICES.slice(0, PREVIEW_COUNT).map((notice) => (
                  <li className="board__item" key={notice.id}>
                    <p className="board__num">{notice.id}</p>
                    <p className="board__title">
                      <Link to={noticePath(notice.id)}>{notice.title}</Link>
                    </p>
                    <p className="board__date">{notice.date}</p>
                  </li>
                ))}
              </ul>
            </section>

            {/* 우 — 자료실 갤러리(카드를 누르면 자료실 페이지로) */}
            <section className="promo-preview__col" data-reveal>
              <div className="promo-preview__head">
                <h3 className="promo-preview__title">자료실</h3>
                <Link className="promo-preview__more" to="/promo/archive">
                  더보기
                  <span className="link-arrow" aria-hidden="true" />
                </Link>
              </div>

              <ul className="gallery gallery--preview">
                {ARCHIVE_ITEMS.slice(0, PREVIEW_COUNT).map((item) => (
                  <li className="gallery__item" key={item.id}>
                    <Link className="gallery__link" to={archivePath(item.id)}>
                      <span className="gallery__thumb">
                        <img className="gallery__img" src={item.thumb} alt="" loading="lazy" decoding="async" />
                      </span>
                      <span className="gallery__title">{item.title}</span>
                      <span className="gallery__meta">{item.date}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* 마지막 섹션 아래에 붙는 서브 페이지와 동일한 공통 푸터입니다. */}
      <Footer />
    </FullPage>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import FullPage from '../components/FullPage'
import { MENU, groupEntryPath } from '../data/menu'
import { HERO_VIDEO, SITE } from '../data/site'

const BUSINESS_CARDS = [
  {
    title: 'KGBC0001 종모우',
    path: '/business/sire',
    desc: '혈통과 유전능력을 검증한 대표 종모우의 정보를 확인할 수 있습니다.',
  },
  {
    title: '데이터',
    path: '/business/data',
    desc: '농장형 연구소에서 직접 확보한 현장 데이터를 바탕으로 한 유전능력 검정 결과입니다.',
  },
  {
    title: '구입처',
    path: '/business/store',
    desc: '종모우 정액 및 수정란 구입처를 안내합니다.',
  },
]

const FARM_LINKS = [
  { title: '소개·브랜딩', path: '/farm/branding' },
  { title: '설국한우 JYG', path: '/farm/jyg' },
  { title: '설국농장 수정란', path: '/farm/embryo' },
  { title: '설국후우', path: '/farm/huwoo' },
]

/** 한우영농조합은 메뉴 데이터(서브 메뉴)를 그대로 섹션 링크로 사용합니다. */
const UNION_LINKS = MENU.find((group) => group.id === 'union')?.children ?? []

/** 그룹 랜딩이 아니라 LNB 첫 번째 페이지 경로를 돌려줍니다. */
function entryOf(groupId: string) {
  const group = MENU.find((item) => item.id === groupId)
  return group ? groupEntryPath(group) : '/'
}

export default function Home() {
  // 모션 최소화 설정을 쓰는 사용자에게는 배경 동영상을 재생하지 않습니다.
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    setPlayVideo(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <FullPage>
      <div className="hero">
        {/* 배경 동영상 — 소리 없는 자동 반복 재생. 로드 전/실패 시에는 .hero 그라디언트가 보입니다. */}
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

      <div className="home-sec">
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
          <ul className="card-list">
            {BUSINESS_CARDS.map((card) => (
              <li key={card.path} className="card" data-reveal>
                <Link className="card__link" to={card.path}>
                  <h3 className="card__title">{card.title}</h3>
                  <p className="card__desc">{card.desc}</p>
                  <span className="card__more">자세히 보기</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-sec home-sec--soft">
        <div className="container">
          <div className="sec-title sec-title--left">
            <p className="sec-title__eyebrow" data-reveal>
              SEOLGUK FARM
            </p>
            <h2 className="sec-title__title" data-reveal>
              설국농장
            </h2>
            <p className="sec-title__desc" data-reveal>
              한우 종모우와 후우 등 신품종 개발에 주력하며, 수정란 이식 기술로 한국형 개량의 범위를 넓혀갑니다.
            </p>
          </div>
          <ul className="link-list">
            {FARM_LINKS.map((link) => (
              <li key={link.path} data-reveal>
                <Link className="link-list__item" to={link.path}>
                  <span className="link-list__title">{link.title}</span>
                  <span className="link-list__arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="home-sec home-sec--last">
        <div className="container">
          <div className="sec-title sec-title--left">
            <p className="sec-title__eyebrow" data-reveal>
              HANWOO UNION
            </p>
            <h2 className="sec-title__title" data-reveal>
              한우영농조합
            </h2>
            <p className="sec-title__desc" data-reveal>
              전북 장수군 '저탄소한우 산업지구'를 중심으로 저탄소 축산의 기준을 세우고, 농가 소득 증대를 함께 실현합니다.
            </p>
          </div>
          <ul className="link-list link-list--single">
            {UNION_LINKS.map((link) => (
              <li key={link.path} data-reveal>
                <Link className="link-list__item" to={link.path}>
                  <span className="link-list__title">{link.label}</span>
                  <span className="link-list__arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 마지막 섹션 아래에 붙는 서브 페이지와 동일한 공통 푸터입니다. */}
      <Footer />
    </FullPage>
  )
}

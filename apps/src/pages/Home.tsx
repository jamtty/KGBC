import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import FullPage from '../components/FullPage'
import { SITE } from '../data/site'

const BUSINESS_CARDS = [
  {
    title: 'KGBC0001 종모우',
    path: '/business/sire',
    desc: 'KGBC0001 종모우의 능력과 혈통 정보를 소개합니다.',
  },
  {
    title: '데이터',
    path: '/business/data',
    desc: '유전능력 검정과 축적된 데이터를 확인할 수 있습니다.',
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

export default function Home() {
  return (
    <FullPage>
      <div className="hero">
        <div className="container hero__content">
          <p className="hero__eyebrow" data-reveal>
            {SITE.name}
          </p>
          <h1 className="hero__title" data-reveal>
            대한민국 한우의 미래를
            <br />
            설계합니다
          </h1>
          <p className="hero__desc" data-reveal>
            우수한 종모우와 유전체 데이터, 그리고 설국농장의 축적된 기술로 더 나은 한우 산업을 만들어 갑니다.
          </p>
          <div className="hero__actions" data-reveal>
            <Link className="btn btn--primary" to="/about">
              회사소개 보기
            </Link>
            <Link className="btn btn--ghost" to="/business">
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
              종모우 유전능력부터 데이터, 구입 안내까지 한눈에 확인하세요.
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
              설국한우 브랜딩과 수정란 이식 기술을 소개합니다.
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

      <div className="home-sec home-sec--contact">
        <div className="container contact">
          <div className="sec-title sec-title--left">
            <p className="sec-title__eyebrow" data-reveal>
              CONTACT
            </p>
            <h2 className="sec-title__title" data-reveal>
              오시는 길
            </h2>
            <p className="sec-title__desc" data-reveal>
              주소와 연락처를 확인하실 수 있습니다.
            </p>
          </div>
          <div className="contact__actions" data-reveal>
            <Link className="btn btn--primary" to="/location/contact">
              주소·연락처
            </Link>
            <Link className="btn btn--outline" to="/union/about">
              한우영농조합 소개
            </Link>
          </div>
        </div>
      </div>

      {/* 마지막 섹션 아래에 붙는 서브 페이지와 동일한 공통 푸터입니다. */}
      <Footer />
    </FullPage>
  )
}

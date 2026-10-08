/* 한국형 개량의 스펙트럼 확장 도식(두 개의 원 + 가운데 문구) — 벡터 SVG */
import diagramImg from '../../assets/images/branding-bull.svg'
/* 한우 종모우 연필화 — 1536×1024 래스터를 감싼 SVG */
import bullImg from '../../assets/images/branding-bull2.svg'

/**
 * 회사소개 — 소개·브랜딩 페이지 본문.
 * 서브페이지 공통 레이아웃(.sub-content) 안에 들어가는 내용만 담당하며,
 * 상단 배너·LNB 는 SubPage.tsx가 그립니다.
 *
 * 구성
 *   제목
 *   └ 1행: 좌측(리드문 + 본문 2단락) | 우측 종모우 연필화
 *     2행: 스펙트럼 확장 도식(가운데 정렬)
 */
export default function Branding() {
  return (
    <article className="sub-content">
      <h1 className="sub-content__title">소개·브랜딩</h1>

      <div className="brand">
        <div className="brand__text">
          {/*
            핵심 메시지 — 원고의 레드 강조 문장을 네 문장 그대로 옮겼습니다.
            줄바꿈은 <br /> 대신 `.pc-br`(PC 전용 줄바꿈) span 으로 넣어,
            PC 에서는 문장마다 줄이 바뀌고 모바일(≤900px)에서는 한 문단으로 이어집니다.
            (스타일: style.css 의 ".pc-br" 블록)
          */}
          <p className="sub-content__lead">
            한국유전자종축센터는 첨단 생명공학 기술을 바탕으로
            <span className="pc-br" />
            우수 형질의 종모우를 개발·생산·보급하는 종축 전문 기업입니다.
            <span className="pc-br" />
            국내 유일하게 수정란과 종모우 개발을 동시 수행하며,
            <span className="pc-br" />
            국내 최대 규모의 종축 유전자원 허브로서 독보적인 위상을 확립하고 있습니다.
          </p>

          {/* 본문 문단 — 서브페이지 공통 블록(.sub-content__text)을 그대로 씁니다. */}
          <div className="sub-content__text">
            <p>
              저희의 핵심 경쟁력은 현장과 이론의 완벽한 조화에 있습니다. 세계적 수준의 연구진이 약 250두 규모의 '농장형
              연구소'에서 직접 사양하며 확보한 현장 데이터를 바탕으로, 가장 실용적이고 재현 가능한 최상위 우량 혈통을 확보하는 데
              매진하고 있습니다.
            </p>
            <p>
              일본, 중국, 호주, 미국 등 축산 선진국과의 전략적 협력을 통해 글로벌 시장에서 차세대 한우 기술의 가치를 입증하고
              있습니다. 또한, 전북 장수군 '저탄소한우 산업지구'를 중심으로 저탄소 축산의 기준을 만들고, 농가 소득 증대를 동시에
              실현하는 혁신적인 동반자가 되겠습니다.
            </p>
          </div>
        </div>

        {/* 1행 우측 — 한우 종모우 연필화(branding-bull2.svg). 본문과 좌우 2단 */}
        <figure className="brand__figure">
          <img src={bullImg} alt="한우 종모우 연필화" loading="lazy" decoding="async" />
        </figure>

        {/* 2행 — 한국형 개량의 스펙트럼 확장 도식(branding-bull.svg). 아래 가운데 정렬 */}
        <figure className="brand-diagram">
          <img src={diagramImg} alt="한국형 개량의 스펙트럼 확장 도식" loading="lazy" decoding="async" />
        </figure>
      </div>
    </article>
  )
}

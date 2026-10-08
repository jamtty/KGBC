import farmImg from '../../assets/images/sub_3_1.svg'
import markImg from '../../assets/images/seolguk-mark.svg'

/** 설국(初國) — '설'과 '국'의 브랜드 의미. 왼쪽 큰 글자 / 가운데 설명 / 오른쪽 영문 대응어로 놓습니다. */
const BRAND_MEANING = [
  {
    char: '설',
    label: '새로운/처음',
    tag: '혁신 육종 / 혁신 종축',
    en: 'NEW\nFIRST\nNEO',
    desc: [
      "'설'은 한 해의 첫날인 설날처럼, 새로운 시작과 처음을 상징합니다.",
      "설국농장의 '설'은 기존의 틀을 깨고 새로운 가치를 창조하는 혁신을 상징합니다.",
    ],
  },
  {
    char: '국',
    label: '나라/터',
    tag: '육성 터전 / 육성 실현할 체계적 시스템과 인프라',
    en: 'LAND\nTERRA',
    desc: [
      "'국'은 삶의 터전이자, 새생명이 건강히 자라나는 시스템을 상징합니다.",
      "설국농장의 '국'은 혁신의 씨앗이 눈부신 결실을 맺을 수 있도록 지지해 주는 견고한 인프라입니다.",
    ],
  },
]

/**
 * 설국농장 — 소개·브랜딩 페이지 본문.
 * 상단 배너·LNB 는 SubPage.tsx 가 그리며, 여기서는 .sub-content 안의 내용만 담당합니다.
 * 중타이틀·부제·본문 등은 서브페이지 공통 클래스(.sub-*)를 그대로 써서 톤을 유지합니다.
 *
 * 구성
 *  01. 설국농장 소개 — 좌: 리드문 + 본문 한 문단(일부 굵게) | 우: 농장 전경 사진(sub_3_1.svg)
 *  02. 설국(初國) 브랜드 의미 — '설' · '국' 두 행 + 하단 요약
 *  03. 로고 타입 — 원본 도식 이미지(seolguk-mark.svg)
 */
export default function Branding() {
  return (
    <article className="sub-content">
      <h1 className="sub-content__title">소개·브랜딩</h1>

      {/* 01. 설국농장 소개 */}
      <section className="farm-intro">
        <div className="farm-intro__text">
          {/* 리드문 — 제목 바로 아래이므로 위 여백은 .sub-content__title 이 담당합니다. */}
          <p className="sub-content__lead">
            설국농장은 첨단생명공학 기반의 현장 중심 농장기업으로,
            <br />
            우수 씨수소 개발부터 정액·수정란의 생산·공급까지 통합적으로 수행합니다.
          </p>

          {/* 본문 — 원고의 강조문·인용 박스를 따로 두지 않고 하나의 연결된 문단으로 흐르게 했습니다. */}
          <div className="sub-content__text">
            <p>
              설국농장은 전북 장수와 충북 보은에서 한우, 흑우, 칡소, 재지 및 신품종을 직접 사육·번식·보급하는
              첨단생명공학 현장 중심 농장기업입니다.<br /><strong>한 품종 탄생을 위해 10~20년간 연구하여, 현장 중심
              실증 개량 시스템으로 재현 가능한 우수 혈통을 만들어 갑니다.</strong><br /> <strong>해발 500m의 청정 고지대에서
              생산되는 '설국한우'</strong>는 엄격한 사양 관리와 체계적인 개량 과정을 통해 <strong>최고 수준의 품질을 지향</strong>합니다.<br />
              <strong>우수 씨수소 개발과 고품질 정액·수정란의 안정적 공급</strong>을 통해 농가 소득 증대에 기여하며, 우량 유전자원
              보급으로 <strong>한우 산업의 경쟁력 강화</strong>를 목표로 합니다.<br /><br /><strong>설국농장은 현장 중심의 첨단 기술 개발과 산업적
              확장을 조화롭게 추진하며, 지속 가능한 축산 발전과 소비자 신뢰 확보를 위해 끊임없이 노력하겠습니다.</strong>
            </p>
          </div>
        </div>

        <figure className="farm-intro__figure">
          <img
            src={farmImg}
            alt="청정 고지대에 자리한 설국농장 전경"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      {/* 02. 설국(初國) — 브랜드 의미 */}
      <section className="sub-section farm-brand">
        <h2 className="sub-heading">설국(初國) : 혁신 육종을 개발하고 과학적으로 육성하는 터전</h2>

        <ul className="farm-brand__list">
          {BRAND_MEANING.map((item) => (
            <li className="farm-brand__item" key={item.char}>
              <p className="farm-brand__char">{item.char}</p>

              <div className="farm-brand__body">
                <div className="farm-brand__head">
                  <span className="farm-brand__label">{item.label}</span>
                  <span className="farm-brand__tag">{item.tag}</span>
                </div>
                {item.desc.map((text) => (
                  <p className="farm-brand__desc" key={text}>
                    {text}
                  </p>
                ))}
              </div>

              {/* 영문 대응어 — 한글 설명과 같은 내용이라 낭독기에서는 제외합니다. */}
              <p className="farm-brand__en" aria-hidden="true">
                {item.en}
              </p>
            </li>
          ))}
        </ul>

        <p className="farm-brand__summary">
          우수한 유전자(<span className="farm-brand__key farm-brand__key--seol">설</span>)와 체계적인 시스템(
          <span className="farm-brand__key farm-brand__key--guk">국</span>)으로 설국농장 인프라를 구축한다.
        </p>
        <p className="farm-brand__note">
          설국농장의 견고한 터전에서 농가와 상생하고, 소비자가 믿을 수 있는 지속 가능한 종축을 개발하고자 합니다.
        </p>
      </section>

      {/* 03. 로고 타입 */}
      <section className="sub-section farm-logo">
        <h2 className="sub-heading">설국농장 로고 타입</h2>

        {/* 로고타입 도식 — 원본 이미지를 그대로 사용합니다. */}
        <figure className="farm-logo__figure">
          <img
            src={markImg}
            alt="설국농장 로고 타입 — 한글 '설'의 자형(ㅅ, ㄹ)을 핵심 조형 요소로 삼은 워드마크와 각 조형 요소의 의미를 설명한 도식"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>
    </article>
  )
}

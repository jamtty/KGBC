import { Fragment } from 'react'
import card1Img from '../../assets/images/sub_2_3_1.svg'
import card2Img from '../../assets/images/sub_2_3_2.svg'
import card3Img from '../../assets/images/sub_2_3_3.svg'
import card4Img from '../../assets/images/sub_2_3_4.svg'
import card5Img from '../../assets/images/sub_2_3_5.svg'
import arrowImg from '../../assets/images/sub_2_3_arrow.svg'
import pickImg from '../../assets/images/sub_2_2.svg'
import bullImg from '../../assets/images/sub_2_1.svg'
import flowImg from '../../assets/images/sub_2_5.svg'
import farmImg from '../../assets/images/sub_2_4.svg'

/** 개발 연대표 — 화면에는 3계대 → 7계대 순으로 놓습니다.
    (카드 파일 번호가 역순이라 매핑에 주의: sub_2_3_5 = 3계대 … sub_2_3_1 = 7계대) */
const LINEAGE = [
  { icon: card5Img, gen: '3계대', date: '2008년 05월 01일' },
  { icon: card4Img, gen: '4계대', date: '2012년 02월 03일' },
  { icon: card3Img, gen: '5계대', date: '2016년 6월 27일' },
  { icon: card2Img, gen: '6계대', date: '2020년 3월 30일' },
  { icon: card1Img, gen: '7계대', date: '2022년 9월 20일' },
]

/** 연혁 — 왼쪽 날짜·제목과 오른쪽 설명을 점선 리더로 이어 붙입니다. */
const FACTS = [
  {
    term: '2014.03 OPU 기술의 선구자 (2014~)',
    desc: 'OPU(생체 난자 흡입술) 공법을 보급하여 국내 첫 종축 종모우를 열었습니다.',
  },
  {
    term: "2015.03 초대형 공란우를 통한 '슈퍼한우' 탄생 (2015~)",
    desc: "체중 1,100kg에 달하는 4세대 초대형 공란우(재래한우: 0002, 0735, 3204 등)를 선발. OPU 방식으로 수정란을 생산·이식하였습니다. 이로써 우수 형질을 가진 후보 송아지를 성공적으로 배출하여, KGBC만의 우수 혈통 라인을 구축하였습니다.",
  },
  {
    term: '2016.06 육량과 육질의 완벽한 조화로 슈퍼한우 생산',
    desc: "인공 수정과 4세대 가축 개량을 통해 최적의 수정란을 생산할 수 있게 된 결실. 육량과 육질 모두 겸비한 향상된 '슈퍼한우'를 생산하는 데 성공하였습니다.",
  },
  {
    term: '2025.09 종모우 KGBC0001의 국가 인증',
    desc: "10년의 연구와 현장 적응의 결실로 종모우 'KGBC0001'이 국가로부터 당당히 인정받는 쾌거를 이루었습니다.",
  },
]

/** 한우농가 — 보급을 통한 기대 효과 */
const FARM_POINTS = [
  '한우 농가 보급을 통해 농업 생산성 신장 촉진',
  '저비용 한우 개량 선도',
  '농가의 실질적 소득 증대 기여',
]

/**
 * KGBC 사업 — KGBC0001 종모우 페이지 본문.
 * 상단 배너·LNB 는 SubPage.tsx 가 그리며, 여기서는 .sub-content 안의 내용만 담당합니다.
 * 중타이틀·부제·표·목록 등 공통 콘텐츠는 .sub-* 공통 클래스를 그대로 써서
 * 다른 서브페이지와 같은 톤을 유지합니다.
 */
export default function Sire() {
  return (
    <article className="sub-content sire">
      <h1 className="sub-content__title">KGBC_종모우</h1>

      {/* 핵심 메시지 — 소개·브랜딩과 같은 레드 리드문 */}
      <p className="sub-content__lead">집념으로 완성한 독보적 종모우 KGBC0001</p>

      <p className="sub-content__text">
        KGBC는 한우의 형질을 혁신적으로 개선하기 위해 지난 13년간 종모우 개발에 매진해 왔습니다.
      </p>

      {/* 13년 연혁 — 공통 2열 표(.sub-table) */}
      <table className="sub-table">
        <tbody>
          {FACTS.map((fact) => (
            <tr key={fact.term}>
              <th className="sub-table__term" scope="row">
                {fact.term}
              </th>
              <td className="sub-table__desc">{fact.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 개발 연대표 — 세로 1단: 3~7계대 카드 → 종모우 선발 → 선발된 종모우 */}
      <section className="sub-section">
        <h2 className="sub-heading">KGBC 종모우 개발 연대표</h2>
        <p className="sub-heading__sub">유전 다양성 확보와 능력 자원을 확대</p>

        <div className="sire-lineage">
          {/* 3~7계대 카드 — 카드 사이를 화살표로 이어 붙입니다. */}
          <div className="sire-lineage__cards">
            {LINEAGE.map((card, index) => (
              <Fragment key={card.gen}>
                {index > 0 && (
                  <img
                    className="sire-lineage__arrow"
                    src={arrowImg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <figure className="sire-lineage__card">
                  <img
                    src={card.icon}
                    alt={`${card.gen} 카드 — ${card.date} 종모우 혈통`}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              </Fragment>
            ))}
          </div>

          <figure className="sire-lineage__pick">
            <img src={pickImg} alt="종모우 선발" loading="lazy" decoding="async" />
          </figure>

          {/* 선발된 종모우 — 라인 드로잉만 표시 */}
          <figure className="sire-lineage__bull">
            <img src={bullImg} alt="선발된 종모우 라인 드로잉" loading="lazy" decoding="async" />
          </figure>
        </div>
      </section>

      {/* 후보종모우 생산 */}
      <section className="sub-section">
        <h2 className="sub-heading">후보종모우 생산</h2>

        <p className="sub-heading__sub">첨단 생명공학 기술을 활용한 한우 개량</p>
        <p className="sub-content__text">
          유전체 검사와 국가기관 위탁검정을 거쳐 선발된 후보종모우는 정액으로 생산되어 전국의 한우 농가에
          보급됩니다. KGBC는 후보종모우 생산의 전 과정을 자체 기술로 수행합니다.
        </p>

        <figure className="sire-produce__figure">
          <img
            src={flowImg}
            alt="후보종모우 생산 공정 — 정자선정·OPU 난자채취·체외수정·수정란이식·유전체 검사·국가기관 위탁검정·후보종모우 선발·정액 농가보급"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      {/* 한우농가 */}
      <section className="sub-section">
        <h2 className="sub-heading">한우농가</h2>

        <ul className="sub-list">
          {FARM_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <figure className="sire-farm__figure">
          <img src={farmImg} alt="한우농가 일러스트" loading="lazy" decoding="async" />
        </figure>
      </section>
    </article>
  )
}

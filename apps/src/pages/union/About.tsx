import mapImg from '../../assets/images/sub_4_1.svg'
/* 발표회 사진 — 원본 시트의 행 순서(왼쪽 → 오른쪽)대로 번호가 붙어 있어
   2018 발표회는 sub_4_2 · sub_4_4 · sub_4_6, 2019 발표회는 sub_4_3 · sub_4_5 · sub_4_7 입니다. */
import event2018a from '../../assets/images/sub_4_2.svg'
import event2019a from '../../assets/images/sub_4_3.svg'
import event2018b from '../../assets/images/sub_4_4.svg'
import event2019b from '../../assets/images/sub_4_5.svg'
import event2018c from '../../assets/images/sub_4_6.svg'
import event2019c from '../../assets/images/sub_4_7.svg'
import PhotoSwiper from '../../components/PhotoSwiper'
import type { SwiperPhoto } from '../../components/PhotoSwiper'

/** 조합 사업내용 */
const BUSINESS = [
  '유전자 공유',
  '교류, 세미나, 컨퍼런스',
  '종축개량 연구실증 사업',
  '종축 산업을 통한 조합 소득 증대',
]

/**
 * 발표회 사진 6장 — 2018 흑우 발표회 3장 + 2019 한우개량 발표회 3장.
 * 화면에는 제목·날짜 없이 사진만 스와이퍼로 보여주므로, 발표회 정보는 alt 에 담아 둡니다.
 */
const PHOTOS: SwiperPhoto[] = [
  { src: event2018a, alt: "2018년 한국형 신품종 '흑우' 발표회 — 인사를 나누는 참석자들" },
  { src: event2018b, alt: "2018년 한국형 신품종 '흑우' 발표회 — 발표 세션 진행 모습" },
  { src: event2018c, alt: "2018년 한국형 신품종 '흑우' 발표회 — 야외 전시장을 둘러보는 참석자들" },
  { src: event2019a, alt: '2019년 한우개량을 위한 연구 발표회 — 부스에서 협의 중인 관계자들' },
  { src: event2019b, alt: '2019년 한우개량을 위한 연구 발표회 — 참석한 관계자들' },
  { src: event2019c, alt: '2019년 한우개량을 위한 연구 발표회 — 참석자 단체사진' },
]

/**
 * 한우영농조합 — 소개 페이지 본문.
 * 상단 배너·LNB 는 SubPage.tsx 가 그립니다.
 *
 * 구성
 *   제목
 *   └ 상단 가로 2단: 좌 리드문 + 본문 3문단 + 사업내용 | 우 조합원 분포도(sub_4_1)
 *   → 발표회 사진 6장(제목·날짜 없이 스와이퍼로만)
 */
export default function UnionAbout() {
  return (
    <article className="sub-content">
      <h1 className="sub-content__title">한우영농조합</h1>

      {/* 상단 — 좌: 텍스트 | 우: 조합원 분포도 */}
      <div className="union-top">
        <div className="union-top__text">
          <p className="sub-content__lead">현장의 원칙과 혁신, 신뢰와 협업으로 농가 상생을 이끌어갑니다.</p>

          <div className="sub-content__text">
            <p>
              한우영농조합법인은 2018년 설립 이후 우량 혈통의 생산·검정과 정액·수정란의 보존·보급을 통해 우수 혈통을
              육성해 왔습니다.
            </p>
            <p>
              체계적인 자원 보존과 광범위한 보급으로 더 많은 한우 농가가 혜택을 받을 수 있도록 노력합니다. 또한 회원 간
              상호보조와 공동 역량 강화를 바탕으로 형질 개량과 능력 향상을 실현하여 농가의 생산성·수익성을 제고합니다.
            </p>
            <p>
              나아가 공익적 가치와 산업적 경쟁력을 동시에 추구함으로써 지속 가능한 한국 축산의 미래를 열어가고자
              합니다.
            </p>
          </div>

          {/* 사업내용 — 상단 텍스트 열 안에 함께 놓습니다. */}
          <section className="union-business">
            <h2 className="sub-label">사업내용</h2>
            <ul className="sub-list">
              {BUSINESS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="union-top__map">
          <h2 className="sub-label">한우영농조합원 분포도</h2>
          <figure className="union-map">
            <img
              src={mapImg}
              alt="전국 한우영농조합원 분포를 지역별로 표시한 지도"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </section>
      </div>

      {/* 발표회 사진 — 제목·날짜 없이 사진 6장만 스와이퍼로 넘겨 봅니다. */}
      <section className="sub-section" aria-label="발표회 사진">
        <PhotoSwiper photos={PHOTOS} label="한우영농조합 발표회 사진 6장" />
      </section>
    </article>
  )
}

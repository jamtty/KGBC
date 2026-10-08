import { useState } from 'react'

/** 지점 목록 — 왼쪽 라벨을 누르면 오른쪽(모바일에서는 위) 지도가 그 위치로 이동합니다. */
const PLACES = [
  {
    label: '한국유전자종축센터(KGBC) / 설국농장',
    address: '전북특별자치도 장수군 계남면 신전리 941-1',
  },
  {
    label: '설국농장/장수 연구소',
    address: '전북특별자치도 장수군 천천면 싸리재로 560-34',
  },
  {
    label: '설국농장/보은연구소',
    address: '충청북도 보은군 마로면 기대리 270',
  },
]

/** 문의 전화 — numbers 의 값은 표시용, tel 링크는 숫자만 남겨 만듭니다. */
const CONTACTS = [
  { key: 'T.', numbers: ['063)353-3293'] },
  { key: 'F.', numbers: ['063)352-3293'] },
  { key: 'M.', numbers: ['010-9085-4667', '010-5696-4667'] },
]

/**
 * Google 지도 임베드 URL.
 * API 키 없이 동작하는 주소 검색 임베드(`output=embed`)를 씁니다.
 * 키를 발급받아 공식 Embed API 로 바꾸려면 아래 주소만 교체하면 됩니다:
 *   https://www.google.com/maps/embed/v1/place?key=<API_KEY>&q=<주소>&language=ko&zoom=16
 */
const mapSrc = (query: string) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=ko&z=16&output=embed`

/** 구글 지도 앱/웹에서 해당 위치를 여는 공식 링크 */
const mapLink = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

/** 표시용 전화번호에서 tel: 링크용 숫자만 남깁니다. */
const telHref = (value: string) => `tel:${value.replace(/\D/g, '')}`

/**
 * 찾아오시는 길 — 주소·연락처 페이지 본문.
 * 상단 배너·LNB 는 SubPage.tsx 가 그리며, 여기서는 .sub-content 안의 내용만 담당합니다.
 *
 * 구성
 *  - 좌: Google 지도(선택한 지점)  |  우: 지점 3곳 + 주문 연락처
 */
export default function Contact() {
  const [active, setActive] = useState(0)
  const current = PLACES[active]

  return (
    <article className="sub-content">
      <h1 className="sub-content__title">주소·연락처</h1>

      <div className="loc">
        <div className="loc__map-wrap">
          <div className="loc__map">
            <iframe
              key={current.address}
              className="loc__map-frame"
              src={mapSrc(current.address)}
              title={`${current.label} 위치를 표시한 구글 지도`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="loc__map-note">
            지도가 보이지 않으면{' '}
            <a href={mapLink(current.address)} target="_blank" rel="noreferrer">
              구글 지도에서 열기
            </a>
            를 눌러주세요.
          </p>
        </div>

        <div className="loc__body">
          <ul className="loc__list">
            {PLACES.map((place, index) => (
              <li className="loc__item" key={place.label}>
                <button
                  type="button"
                  className={`sub-label loc__label${index === active ? ' is-active' : ''}`}
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                >
                  {place.label}
                </button>
                <p className="loc__address">{place.address}</p>
              </li>
            ))}
          </ul>

          <div className="loc__contact">
            <p className="loc__contact-title">소 정액/OPU·수정란 주문</p>
            <ul className="loc__contact-list">
              {CONTACTS.map((contact) => (
                <li key={contact.key}>
                  <span className="loc__contact-key">{contact.key}</span>
                  {contact.numbers.map((number, index) => (
                    <span key={number}>
                      {index > 0 && ' / '}
                      <a href={telHref(number)}>{number}</a>
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}

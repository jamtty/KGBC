import { Link } from 'react-router-dom'
import { ARCHIVE_ITEMS, archivePath, fileExt } from '../../data/promo'

/**
 * 홍보자료 — 자료실 **목록 페이지**(갤러리 썸네일형).
 * 상단 배너·LNB 는 SubPage.tsx 가 그립니다.
 * 카드를 누르면 상세 페이지(`/promo/archive/:id`)로 들어가고, 내려받기는 상세 페이지에서 합니다.
 *
 * 목록 데이터는 메인 마지막 섹션과 함께 `src/data/promo.ts` 를 씁니다.
 */
export default function Archive() {
  return (
    <article className="sub-content">
      <h1 className="sub-content__title">자료실</h1>

      {ARCHIVE_ITEMS.length === 0 ? (
        <p className="board__empty">등록된 자료가 없습니다.</p>
      ) : (
        <ul className="gallery">
          {ARCHIVE_ITEMS.map((item) => (
            <li className="gallery__item" key={item.id}>
              <Link className="gallery__link" to={archivePath(item.id)}>
                <span className="gallery__thumb">
                  {/* 제목이 바로 아래 글자로 있으므로 썸네일은 장식으로 둡니다. */}
                  <img className="gallery__img" src={item.thumb} alt="" loading="lazy" decoding="async" />
                  <span className="gallery__ext">{fileExt(item.file)}</span>
                </span>
                <span className="gallery__title">{item.title}</span>
                <span className="gallery__meta">
                  {item.file}
                  {item.size ? ` (${item.size})` : ''} · {item.date}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

import { Link, useParams } from 'react-router-dom'
import { ARCHIVE_ITEMS, ARCHIVE_PATH, fileExt, fileUrl } from '../../data/promo'

/**
 * 홍보자료 — 자료실 **상세 페이지**.
 * 목록(`/promo/archive`)에서 카드를 누르면 `/promo/archive/:id` 로 들어옵니다.
 * 좌측 썸네일 / 우측 파일 정보 + 내려받기 버튼 구성이고, 상단 배너·LNB 는 SubPage.tsx 가 그립니다.
 *
 * ⚠️ 첨부 파일은 `apps/public/files/` 에 실제 파일을 올려야 내려받기가 동작합니다.
 */
export default function ArchiveDetail() {
  const { id } = useParams()
  const item = ARCHIVE_ITEMS.find((entry) => String(entry.id) === id)

  // 주소의 번호가 목록에 없으면(삭제된 자료·잘못된 주소) 안내만 보여줍니다.
  if (!item) {
    return (
      <article className="sub-content">
        <h1 className="sub-content__title">자료실</h1>
        <p className="board__empty">삭제되었거나 없는 자료입니다.</p>
        <p className="post__foot">
          <Link className="btn btn--outline" to={ARCHIVE_PATH}>
            목록으로
          </Link>
        </p>
      </article>
    )
  }

  return (
    <article className="sub-content">
      <h1 className="sub-content__title">자료실</h1>

      <div className="post post--file">
        {/* 좌 — 썸네일(자료를 눌러 들어온 화면이라 미리보기 역할) */}
        <figure className="post__thumb">
          <img src={item.thumb} alt={`${item.title} 미리보기`} loading="lazy" decoding="async" />
          <figcaption className="post__ext">{fileExt(item.file)}</figcaption>
        </figure>

        <div className="post__info">
          <header className="post__head">
            <h2 className="post__title">{item.title}</h2>
            <p className="post__date">{item.date}</p>
          </header>

          {item.desc && <p className="post__body">{item.desc}</p>}

          {/* 첨부 파일 — 행 전체가 내려받기 링크입니다. */}
          <a className="post__file" href={fileUrl(item.file)} download>
            <span className="post__file-name">{item.file}</span>
            {item.size && <span className="post__file-size">{item.size}</span>}
            <span className="post__file-btn">내려받기</span>
          </a>

          <p className="post__foot">
            <Link className="btn btn--outline" to={ARCHIVE_PATH}>
              목록으로
            </Link>
          </p>
        </div>
      </div>
    </article>
  )
}

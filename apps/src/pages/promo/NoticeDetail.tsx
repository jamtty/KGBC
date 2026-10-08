import { Link, useParams } from 'react-router-dom'
import { NOTICES, NOTICE_PATH } from '../../data/promo'

/**
 * 홍보자료 — 공지사항 **상세 페이지**.
 * 목록(`/promo/notice`)에서 제목을 누르면 `/promo/notice/:id` 로 들어옵니다.
 * 상단 배너·LNB 는 SubPage.tsx 가 그립니다(상세에서도 '공지사항' 탭이 활성으로 표시됨).
 */
export default function NoticeDetail() {
  const { id } = useParams()
  const notice = NOTICES.find((item) => String(item.id) === id)

  // 주소의 번호가 목록에 없으면(삭제된 글·잘못된 주소) 안내만 보여줍니다.
  if (!notice) {
    return (
      <article className="sub-content">
        <h1 className="sub-content__title">공지사항</h1>
        <p className="board__empty">삭제되었거나 없는 글입니다.</p>
        <p className="post__foot">
          <Link className="btn btn--outline" to={NOTICE_PATH}>
            목록으로
          </Link>
        </p>
      </article>
    )
  }

  return (
    <article className="sub-content">
      <h1 className="sub-content__title">공지사항</h1>

      <div className="post">
        <header className="post__head">
          <h2 className="post__title">{notice.title}</h2>
          <p className="post__date">{notice.date}</p>
        </header>

        {/* 본문 — 원고의 줄바꿈(빈 줄 포함)을 그대로 살립니다. */}
        <div className="post__body">{notice.body}</div>

        <p className="post__foot">
          <Link className="btn btn--outline" to={NOTICE_PATH}>
            목록으로
          </Link>
        </p>
      </div>
    </article>
  )
}

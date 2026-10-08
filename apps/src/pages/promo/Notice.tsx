import { Link } from 'react-router-dom'
import { NOTICES, noticePath } from '../../data/promo'

/**
 * 홍보자료 — 공지사항 **목록 페이지**.
 * 상단 배너·LNB 는 SubPage.tsx 가 그립니다.
 * 제목을 누르면 상세 페이지(`/promo/notice/:id`)로 들어갑니다.
 *
 * 목록 데이터는 메인 마지막 섹션과 함께 `src/data/promo.ts` 를 씁니다.
 * ⚠️ 지금은 화면 확인용 더미 3건이 들어 있습니다.
 */
export default function Notice() {
  return (
    <article className="sub-content">
      <h1 className="sub-content__title">공지사항</h1>

      {NOTICES.length === 0 ? (
        <p className="board__empty">등록된 공지사항이 없습니다.</p>
      ) : (
        <ul className="board">
          {NOTICES.map((notice) => (
            <li className="board__item" key={notice.id}>
              <p className="board__num">{notice.id}</p>

              <h2 className="board__title">
                <Link to={noticePath(notice.id)}>{notice.title}</Link>
              </h2>

              <p className="board__date">{notice.date}</p>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

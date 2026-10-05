import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="nf">
      <div className="container nf__inner">
        <p className="nf__code">404</p>
        <h1 className="nf__title">페이지를 찾을 수 없습니다</h1>
        <p className="nf__desc">주소가 변경되었거나 삭제된 페이지입니다.</p>
        <Link className="btn btn--primary" to="/">
          메인으로
        </Link>
      </div>
    </div>
  )
}

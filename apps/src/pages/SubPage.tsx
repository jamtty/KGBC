import { Link, useLocation } from 'react-router-dom'
import { findPage } from '../data/menu'

/** Placeholder page used by every header menu route. */
export default function SubPage() {
  const { pathname } = useLocation()
  const page = findPage(pathname)
  const isGroupLanding = page?.path === page?.groupPath

  return (
    <div className="sub">
      <div className="sub__banner">
        <div className="container">
          <p className="sub__group">{page?.group ?? 'KGBC'}</p>
          <h1 className="sub__title">{page?.label ?? '페이지'}</h1>
        </div>
      </div>

      <div className="container">
        <nav className="sub__crumb" aria-label="현재 위치">
          <Link to="/">HOME</Link>
          {page && (
            <>
              <span className="sub__crumb-sep" aria-hidden="true">
                /
              </span>
              <Link to={page.groupPath}>{page.group}</Link>
              {!isGroupLanding && (
                <>
                  <span className="sub__crumb-sep" aria-hidden="true">
                    /
                  </span>
                  <span className="sub__crumb-current">{page.label}</span>
                </>
              )}
            </>
          )}
        </nav>

        <div className="sub__body">
          <p className="sub__empty">콘텐츠 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}

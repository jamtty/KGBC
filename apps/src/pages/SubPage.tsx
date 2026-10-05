import { Link, useLocation } from 'react-router-dom'
import { MENU, findPage, groupEntryPath } from '../data/menu'

/** Placeholder page used by every header menu route. */
export default function SubPage() {
  const { pathname } = useLocation()
  const page = findPage(pathname)
  const isGroupLanding = page?.path === page?.groupPath
  const group = MENU.find((item) => item.path === page?.groupPath)
  // LNB = 해당 그룹의 하위 페이지 목록만. GNB 그룹 메뉴(그룹 랜딩)는 앞에 넣지 않습니다.
  const lnbItems = group?.children ?? []
  // 브래드크럼의 그룹 항목도 그룹 랜딩이 아니라 LNB 첫 페이지로 보냅니다.
  const groupEntry = group ? groupEntryPath(group) : '/'

  return (
    <div className="sub">
      <div className={`sub-visual sub-visual--${group?.id ?? 'default'}`}>
        <div className="container">
          <h2 className="sub-visual__title">{page?.group ?? 'KGBC'}</h2>
        </div>
      </div>

      <div className="lnb-wrap">
        <div className="container">
          <nav className="lnb" aria-label={group ? `${group.label} 서브메뉴` : '서브메뉴'}>
            <ul>
              {lnbItems.map((item) => {
                const isActive = item.path === pathname
                return (
                  <li key={item.path} className={isActive ? 'is-active' : undefined}>
                    <Link to={item.path} aria-current={isActive ? 'page' : undefined}>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <nav className="path" aria-label="현재 위치">
            <ul>
              <li className="path__home">
                <Link to="/">HOME</Link>
              </li>
              {page && (
                <>
                  <li>
                    <Link to={groupEntry}>{page.group}</Link>
                  </li>
                  {!isGroupLanding && <li>{page.label}</li>}
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="sub__body">
          <p className="sub__empty">콘텐츠 준비 중입니다.</p>
        </div>
      </div>
    </div>
  )
}

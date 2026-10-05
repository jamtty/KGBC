import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MENU } from '../data/menu'
import { SITE } from '../data/site'
import { useFullPageState } from '../lib/fullPageBus'

export default function Header() {
  const { pathname } = useLocation()
  const fullPage = useFullPageState()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isHome = pathname === '/'
  // Fixed header is transparent over the main hero and solid everywhere else.
  const isSolid = !isHome || scrolled || fullPage.index > 0

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className={`hd${isSolid ? ' is-solid' : ''}`}>
      <div className="hd__inner">
        <p className="hd__logo">
          <Link to="/" aria-label={`${SITE.name} 홈으로 이동`}>
            <span className="hd__logo-mark">{SITE.name}</span>
            <span className="hd__logo-sub">{SITE.tagline}</span>
          </Link>
        </p>

        <nav className="hd__nav" aria-label="주메뉴">
          <ul className="hd__list">
            {MENU.map((group) => (
              <li key={group.id} className="hd__item">
                <Link className="hd__link" to={group.path}>
                  {group.label}
                </Link>
                <div className="hd__sub">
                  <ul className="hd__sublist">
                    {group.children.map((child) => (
                      <li key={child.path}>
                        <Link className="hd__sublink" to={child.path}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className={`hd__toggle${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="hd-drawer"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <span className="hd__bars" aria-hidden="true" />
        </button>
      </div>

      {/* 서브메뉴가 열리면 본문을 어둡게 덮는 레이어 */}
      <div className="hd__dim" aria-hidden="true" />

      <div id="hd-drawer" className={`hd__drawer${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="hd__drawer-nav" aria-label="모바일 메뉴">
          {MENU.map((group) => (
            <div key={group.id} className="hd__drawer-group">
              <Link className="hd__drawer-title" to={group.path} onClick={closeMenu}>
                {group.label}
              </Link>
              <ul className="hd__drawer-list">
                {group.children.map((child) => (
                  <li key={child.path}>
                    <Link to={child.path} onClick={closeMenu}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </header>
  )
}

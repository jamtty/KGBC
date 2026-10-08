import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoUrl from '../assets/images/logo.svg'
import { MENU, findPage, groupEntryPath } from '../data/menu'
import { SITE } from '../data/site'
import { useFullPageState } from '../lib/fullPageBus'

export default function Header() {
  const { pathname } = useLocation()
  const fullPage = useFullPageState()
  const [scrolled, setScrolled] = useState(false)
  const [hiddenOn, setHiddenOn] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  /** Which GNB group's dropdown is open (driven by JS so it can be reset). */
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  // 스크롤 전에는 메인·서브 모두 헤더가 투명합니다.
  // (서브페이지는 서브비주얼이 화면 맨 위까지 이어지도록 배너 위에 겹쳐 놓습니다.)
  // 스크롤하거나 전체화면 슬라이드를 넘기면 흰 배경으로 바뀝니다.
  const isSolid = scrolled || fullPage.index > 0
  // Keyed by path, so navigating to another page always shows the header again.
  const hidden = hiddenOn === pathname
  /** 현재 경로가 속한 그룹 — GNB/드로어 활성 표시에 씁니다. (홈은 해당 없음) */
  const activeGroupPath = findPage(pathname)?.groupPath

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  /** Closes the GNB dropdown and clears the link focus so the CSS :focus-within
   *  rule cannot hold the dropdown (and dim layer) open after a click. */
  const closeGroup = useCallback((element: HTMLElement | null) => {
    setOpenGroup(null)
    element?.blur()
  }, [])

  // Navigating to another page always resets the GNB submenu to a closed state.
  // The clicked link keeps focus after the route change, and the CSS :focus-within
  // rule would then keep the dropdown open, so the focus is cleared as well.
  useEffect(() => {
    setOpenGroup(null)
    const active = document.activeElement
    if (active instanceof HTMLElement && active.closest('.hd__nav')) {
      active.blur()
    }
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hides the header while scrolling down and reveals it again on scroll up
  // (same behaviour as the winteckorea.kr header).
  useEffect(() => {
    // The home page scrolls inside the full-page container (.fp), not the window.
    const scroller = document.querySelector<HTMLElement>('.fp')
    const currentTop = () => (scroller ? scroller.scrollTop : window.scrollY)

    /** 이 위치보다 위(맨 위 부근)에서는 헤더를 숨기지 않습니다. */
    const ALWAYS_VISIBLE_TOP = 80
    /** 이보다 작은 움직임은 무시합니다(관성 잔여·손떨림·툴바 높이 변화). */
    const MIN_DELTA = 8

    let prev = currentTop()
    /** 손가락을 대기 시작한 위치 — touchend 에서 “제스처 전체 방향”을 판정합니다. */
    let gestureStart: number | null = null

    const onScroll = () => {
      const top = currentTop()
      const delta = top - prev
      prev = top

      // 맨 위 부근에서는 항상 보이게 해, 어떤 경우에도 메뉴를 놓치지 않게 합니다.
      if (top <= ALWAYS_VISIBLE_TOP) {
        setHiddenOn(null)
        return
      }

      if (delta > MIN_DELTA) setHiddenOn(pathname)
      else if (delta < -MIN_DELTA) setHiddenOn(null)
    }

    const onTouchStart = () => {
      gestureStart = currentTop()
    }

    /**
     * iOS Safari 는 스크롤 중간에 툴바가 접히고 펴지면서 scrollY 가 실제 제스처 방향과
     * 반대로 움직이는 일이 있습니다(이벤트 단위 방향 판정이 어긋나는 원인).
     * 손을 뗄 때 “제스처 시작 위치 → 지금 위치”로 한 번 더 판정해서,
     * 위로 올려서 끝난 제스처는 반드시 헤더가 보이게 합니다.
     */
    const onTouchEnd = () => {
      if (gestureStart === null) return
      const top = currentTop()
      const movedUp = top < gestureStart - MIN_DELTA
      gestureStart = null
      if (movedUp || top <= ALWAYS_VISIBLE_TOP) setHiddenOn(null)
    }

    const target: HTMLElement | Window = scroller ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    target.addEventListener('touchstart', onTouchStart, { passive: true })
    target.addEventListener('touchend', onTouchEnd, { passive: true })
    target.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      target.removeEventListener('scroll', onScroll)
      target.removeEventListener('touchstart', onTouchStart)
      target.removeEventListener('touchend', onTouchEnd)
      target.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [pathname])

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
    <header className={`hd${isSolid ? ' is-solid' : ''}${hidden && !menuOpen ? ' is-hidden' : ''}`}>
      <div className="hd__inner">
        <p className="hd__logo">
          <Link to="/" aria-label={`${SITE.name} 홈으로 이동`}>
            {/* 링크에 aria-label이 있으므로 이미지는 장식으로 둡니다. */}
            <img className="hd__logo-img" src={logoUrl} alt="" />
          </Link>
        </p>

        <nav className="hd__nav" aria-label="주메뉴">
          <ul className="hd__list">
            {MENU.map((group) => {
              const isOpen = openGroup === group.id
              const isActive = activeGroupPath === group.path
              return (
                <li
                  key={group.id}
                  className={`hd__item${isOpen ? ' is-open' : ''}${isActive ? ' is-active' : ''}`}
                  onMouseEnter={() => setOpenGroup(group.id)}
                  onMouseLeave={() => setOpenGroup((current) => (current === group.id ? null : current))}
                >
                  <Link
                    className="hd__link"
                    to={groupEntryPath(group)}
                    onClick={(event) => closeGroup(event.currentTarget)}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {group.label}
                  </Link>
                  <div className="hd__sub">
                    <ul className="hd__sublist">
                      {group.children.map((child) => (
                        <li key={child.path}>
                          <Link className="hd__sublink" to={child.path} onClick={(event) => closeGroup(event.currentTarget)}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
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
              <Link
                className={`hd__drawer-title${activeGroupPath === group.path ? ' is-active' : ''}`}
                to={groupEntryPath(group)}
                onClick={closeMenu}
              >
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

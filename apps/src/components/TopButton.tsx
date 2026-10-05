import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/** 이만큼(px) 이상 내려가면 버튼이 페이드인 됩니다. */
const SHOW_AFTER = 80

/**
 * 맨 위로 가기 버튼.
 * 메인 페이지는 `.fp` 컨테이너가, 나머지 페이지는 창이 스크롤되므로 둘 다 처리합니다.
 * 아이콘은 index.html에서 로드한 Google Material Symbols(ligature)를 씁니다.
 */
export default function TopButton() {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  // 경로마다 스크롤 주체가 달라지므로 pathname을 의존성으로 다시 연결합니다.
  useEffect(() => {
    const scroller = document.querySelector<HTMLElement>('.fp')
    const currentTop = () => (scroller ? scroller.scrollTop : window.scrollY)
    const onScroll = () => setVisible(currentTop() > SHOW_AFTER)

    onScroll()
    const target: HTMLElement | Window = scroller ?? window
    target.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      target.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  const scrollToTop = useCallback(() => {
    const scroller = document.querySelector<HTMLElement>('.fp')
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'

    if (scroller) scroller.scrollTo({ top: 0, behavior })
    else window.scrollTo({ top: 0, behavior })
  }, [])

  return (
    <button
      type="button"
      className={`top-btn${visible ? ' is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="맨 위로"
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        arrow_upward
      </span>
    </button>
  )
}

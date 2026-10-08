import { Children, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { emitFullPageState } from '../lib/fullPageBus'

type FullPageProps = {
  children: ReactNode
}

/** Avoids the SSR warning while keeping the pre-paint timing in the browser. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

/** Time the snapped scroll takes to travel one screen. */
const SNAP_DURATION = 0.6

/**
 * Wheel events closer together than this belong to the same gesture (a trackpad's
 * momentum tail keeps emitting events after the fingers are lifted).
 */
const WHEEL_BURST_GAP_MS = 100

/**
 * Real-scroll section container. The section content scrolls natively, but a wheel
 * gesture always travels exactly one screen (in the gesture's direction) so the
 * main page reads like a full-page slideshow. GSAP reveals each section's content.
 */
export default function FullPage({ children }: FullPageProps) {
  const sections = Children.toArray(children)
  const total = sections.length
  const [index, setIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const indexRef = useRef(0)
  /** The tween that owns the scroll position while a section change is running. */
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  /** Timestamp of the previous wheel event, used to group a gesture. */
  const wheelRef = useRef(0)

  const offsetOf = useCallback((sectionIndex: number) => {
    const el = sectionRefs.current[sectionIndex]
    return el ? el.offsetTop : null
  }, [])

  const nearestIndex = useCallback(() => {
    const root = scrollRef.current
    if (!root) return 0
    let best = 0
    let bestDistance = Number.POSITIVE_INFINITY
    sectionRefs.current.forEach((el, i) => {
      if (!el) return
      const distance = Math.abs(el.offsetTop - root.scrollTop)
      if (distance < bestDistance) {
        bestDistance = distance
        best = i
      }
    })
    return best
  }, [])

  /** Eases the container to a section. Every section change goes through here. */
  const snapTo = useCallback(
    (sectionIndex: number) => {
      const root = scrollRef.current
      const clamped = Math.max(0, Math.min(total - 1, sectionIndex))
      const offset = offsetOf(clamped)
      if (!root || offset === null) return

      tweenRef.current?.kill()
      tweenRef.current = gsap.to(root, {
        scrollTo: { y: offset },
        duration: SNAP_DURATION,
        ease: 'power2.inOut',
        onComplete: () => {
          tweenRef.current = null
        },
        onInterrupt: () => {
          tweenRef.current = null
        },
      })
    },
    [offsetOf, total],
  )

  const goTo = useCallback(
    (next: number) => {
      snapTo(next)
    },
    [snapTo],
  )

  // Wheel navigation: one gesture = one screen.
  useEffect(() => {
    const root = scrollRef.current
    if (!root || total === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    /** Snapping only makes sense while every section fits the viewport. */
    const fitsViewport = () =>
      sectionRefs.current.every((el) => !el || el.offsetHeight <= root.clientHeight + 1)

    const onWheel = (event: WheelEvent) => {
      // Let pinch-zoom and the fallback (tall sections) scroll natively.
      if (event.ctrlKey || !event.deltaY) return
      if (!fitsViewport()) return
      event.preventDefault()

      const now = performance.now()
      const sameGesture = now - wheelRef.current < WHEEL_BURST_GAP_MS
      wheelRef.current = now

      // Already moving, or the tail of the gesture that started the move.
      if (tweenRef.current || sameGesture) return

      snapTo(nearestIndex() + (event.deltaY > 0 ? 1 : -1))
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    return () => root.removeEventListener('wheel', onWheel)
  }, [nearestIndex, snapTo, total])

  useEffect(() => {
    indexRef.current = index
  }, [index])

  // Track the section crossing the middle of the viewport while scrolling.
  useEffect(() => {
    const root = scrollRef.current
    if (!root || total === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const next = sectionRefs.current.indexOf(entry.target as HTMLElement)
          if (next >= 0) setIndex(next)
        }
      },
      { root, rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    )

    for (const el of sectionRefs.current) {
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [total])

  // GSAP scroll effects: staggered content reveal + a slow, symmetric drift.
  useIsomorphicLayoutEffect(() => {
    const root = scrollRef.current
    if (!root || total === 0) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      for (const section of gsap.utils.toArray<HTMLElement>('.fp__section', root)) {
        // data-no-reveal 이 있는 섹션(예: 배경 동영상 히어로)은 리빌·드리프트 없이 즉시 보여줍니다.
        if (section.querySelector('[data-no-reveal]')) continue

        const marked = gsap.utils.toArray<HTMLElement>('[data-reveal]', section)
        const targets = marked.length ? marked : gsap.utils.toArray<HTMLElement>('.fp__inner > *', section)
        const inner = section.querySelector<HTMLElement>('.fp__inner')

        if (targets.length) {
          gsap.from(targets, {
            y: 78,
            opacity: 0,
            duration: 1.15,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              scroller: root,
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          })
        }

        // Symmetric drift keeps the content centred when a section is snapped in place.
        if (inner) {
          gsap.fromTo(
            inner,
            { yPercent: 5 },
            {
              yPercent: -5,
              ease: 'none',
              scrollTrigger: {
                scroller: root,
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          )
        }
      }
    }, root)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const timer = window.setTimeout(refresh, 250)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [total])

  useEffect(() => {
    emitFullPageState({ index, total })
  }, [index, total])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return
      switch (event.key) {
        case 'ArrowDown':
        case 'PageDown':
          event.preventDefault()
          goTo(indexRef.current + 1)
          break
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault()
          goTo(indexRef.current - 1)
          break
        case 'Home':
          event.preventDefault()
          goTo(0)
          break
        case 'End':
          event.preventDefault()
          goTo(total - 1)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goTo, total])

  return (
    <div className="fp" ref={scrollRef}>
      {sections.map((section, i) => (
        <section
          key={i}
          ref={(el) => {
            sectionRefs.current[i] = el
          }}
          className={`fp__section${i === index ? ' is-active' : ''}`}
        >
          <div className="fp__inner">{section}</div>
        </section>
      ))}
    </div>
  )
}

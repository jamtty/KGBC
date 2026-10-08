import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'

export type SwiperPhoto = {
  src: string
  alt: string
}

type PhotoSwiperProps = {
  photos: SwiperPhoto[]
  /** 스와이퍼 영역을 설명하는 이름(스크린리더용). */
  label: string
}

/**
 * 의존성 없는 사진 스와이퍼.
 * 트랙은 **네이티브 가로 스크롤 + CSS scroll-snap** 이라 터치·트랙패드 스와이프가 그대로 동작합니다.
 * 마우스만 있는 환경을 위해 드래그와 좌우 화살표·점 이동을 함께 제공합니다.
 * 한 화면에 보이는 장수는 CSS(`.photo-swiper__track > li` 의 flex-basis)가 정합니다.
 * 스타일은 `src/assets/css/style.css` 의 "사진 스와이퍼" 블록에 있습니다.
 */
export default function PhotoSwiper({ photos, label }: PhotoSwiperProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const dragRef = useRef<{ x: number; left: number; moved: boolean } | null>(null)
  const [index, setIndex] = useState(0)
  const [stops, setStops] = useState(1)

  /** 한 장 넘길 때의 이동 거리 = 사진 폭 + 간격 */
  const stepOf = useCallback(() => {
    const track = trackRef.current
    const first = track?.querySelector<HTMLElement>('li')
    if (!track || !first) return 0
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    return first.offsetWidth + gap
  }, [])

  /** 정지 지점 개수 = 사진 수 − 한 화면에 보이는 장수 + 1 */
  const measure = useCallback(() => {
    const track = trackRef.current
    const first = track?.querySelector<HTMLElement>('li')
    if (!track || !first) return
    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
    const step = first.offsetWidth + gap
    if (!step) return
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / step))
    setStops(Math.max(1, photos.length - perView + 1))
  }, [photos.length])

  useEffect(() => {
    measure()
    const track = trackRef.current
    if (!track || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [measure])

  /** 화면 폭이 바뀌어 정지 지점이 줄면 현재 위치도 그 안으로 당깁니다. */
  const activeIndex = Math.min(index, stops - 1)

  const goTo = (next: number) => {
    const track = trackRef.current
    const step = stepOf()
    if (!track || !step) return
    track.scrollTo({ left: Math.min(stops - 1, Math.max(0, next)) * step, behavior: 'smooth' })
  }

  const onScroll = () => {
    const track = trackRef.current
    const step = stepOf()
    if (!track || !step) return
    setIndex(Math.max(0, Math.round(track.scrollLeft / step)))
  }

  // 마우스 드래그(터치는 네이티브 스크롤이 담당) — 손을 떼면 가까운 지점으로 맞춥니다.
  const onPointerDown = (event: ReactPointerEvent<HTMLUListElement>) => {
    const track = trackRef.current
    if (!track || event.pointerType !== 'mouse' || event.button !== 0) return
    dragRef.current = { x: event.clientX, left: track.scrollLeft, moved: false }
    track.classList.add('is-dragging')
    track.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLUListElement>) => {
    const track = trackRef.current
    const drag = dragRef.current
    if (!track || !drag) return
    const distance = event.clientX - drag.x
    if (Math.abs(distance) > 4) drag.moved = true
    track.scrollLeft = drag.left - distance
  }

  const endDrag = (event: ReactPointerEvent<HTMLUListElement>) => {
    const track = trackRef.current
    const drag = dragRef.current
    dragRef.current = null
    if (!track || !drag) return
    track.classList.remove('is-dragging')
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
    const step = stepOf()
    if (!drag.moved || !step) return
    track.scrollTo({ left: Math.round(track.scrollLeft / step) * step, behavior: 'smooth' })
  }

  const onKeyDown = (event: ReactKeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    goTo(activeIndex + (event.key === 'ArrowRight' ? 1 : -1))
  }

  return (
    <div className="photo-swiper">
      <div className="photo-swiper__viewport">
        <ul
          ref={trackRef}
          className="photo-swiper__track"
          tabIndex={0}
          aria-label={label}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {photos.map((photo) => (
            <li key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" draggable={false} />
            </li>
          ))}
        </ul>

        {/* 좌우 화살표 — 끝에 닿으면 사라집니다. 화살표 글리프는 CSS 의 ::before 셰브런입니다. */}
        <button
          type="button"
          className="photo-swiper__nav photo-swiper__nav--prev"
          onClick={() => goTo(activeIndex - 1)}
          disabled={activeIndex <= 0}
          aria-label="이전 사진"
        />
        <button
          type="button"
          className="photo-swiper__nav photo-swiper__nav--next"
          onClick={() => goTo(activeIndex + 1)}
          disabled={activeIndex >= stops - 1}
          aria-label="다음 사진"
        />
      </div>

      {/* 위치 점 — 한 화면에 다 들어오면(정지 지점 1개) 표시하지 않습니다. */}
      {stops > 1 && (
        <div className="photo-swiper__dots" role="group" aria-label="사진 위치">
          {Array.from({ length: stops }, (_, position) => (
            <button
              key={position}
              type="button"
              className={`photo-swiper__dot${position === activeIndex ? ' is-active' : ''}`}
              onClick={() => goTo(position)}
              aria-label={`${position + 1}번째 위치로 이동`}
              aria-current={position === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'

const FULLPAGE_EVENT = 'kgbc:fullpage'

export type FullPageState = {
  index: number
  total: number
}

export function emitFullPageState(state: FullPageState) {
  window.dispatchEvent(new CustomEvent<FullPageState>(FULLPAGE_EVENT, { detail: state }))
}

/** Lets the fixed header follow the active section of the full-page main content. */
export function useFullPageState(): FullPageState {
  const [state, setState] = useState<FullPageState>({ index: 0, total: 0 })

  useEffect(() => {
    const onState = (event: Event) => {
      const detail = (event as CustomEvent<FullPageState>).detail
      if (detail) setState(detail)
    }
    window.addEventListener(FULLPAGE_EVENT, onState)
    return () => window.removeEventListener(FULLPAGE_EVENT, onState)
  }, [])

  return state
}

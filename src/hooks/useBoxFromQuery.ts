import { useEffect, useState } from 'react'

function readBoxFromSearch(): string {
  try {
    const raw = new URLSearchParams(window.location.search).get('box')
    if (!raw?.trim()) return ''
    return decodeURIComponent(raw.trim())
  } catch {
    return ''
  }
}

/**
 * Box display name from `?box=...` (future QR landing URLs).
 * Example: ?box=Receiving%20Desk or ?box=FAB-042
 */
export function useBoxFromQuery(): string {
  const [boxName, setBoxName] = useState(readBoxFromSearch)

  useEffect(() => {
    const sync = () => setBoxName(readBoxFromSearch())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  return boxName
}

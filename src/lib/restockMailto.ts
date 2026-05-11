export type RestockMailPayload = {
  boxName: string
  selectedLabels: string[]
  notes: string
  /** If set (e.g. import.meta.env.VITE_RESTOCK_MAIL_TO), pre-fills the recipient. */
  to?: string
}

/** Subject + body shared by Formspree and mailto fallback. */
export function buildRestockEmailContent(
  payload: Omit<RestockMailPayload, 'to'>
): { subject: string; message: string } {
  const box = payload.boxName.trim() || 'Unknown box'
  const subject = `${box} Restock Request`

  let message = `Restock request for box: ${box}\r\n\r\n`

  if (payload.selectedLabels.length > 0) {
    message += 'Items:\r\n'
    payload.selectedLabels.forEach((label, i) => {
      message += `${i + 1}. ${label}\r\n`
    })
  } else {
    message += 'Items:\r\n(none selected)\r\n'
  }

  if (payload.notes.trim()) {
    message += `\r\nOther notes:\r\n${payload.notes.trim()}\r\n`
  }

  return { subject, message }
}

/**
 * Builds a mailto: URL. Opens the user's email app with subject/body filled.
 * Used when Formspree is not configured (local dev) or as explicit fallback.
 */
export function buildRestockMailtoUrl(payload: RestockMailPayload): string {
  const { subject, message } = buildRestockEmailContent(payload)

  const to = payload.to?.trim()
  const qs = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`

  if (to) {
    return `mailto:${encodeURIComponent(to)}?${qs}`
  }
  return `mailto:?${qs}`
}

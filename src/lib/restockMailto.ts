export type RestockMailPayload = {
  boxName: string
  selectedLabels: string[]
  notes: string
  /** If set (e.g. import.meta.env.VITE_RESTOCK_MAIL_TO), pre-fills the recipient. */
  to?: string
}

/**
 * Builds a mailto: URL. Opens the user's email app with subject/body filled.
 * For fully automated send without opening Mail, use a server or Email API later.
 */
export function buildRestockMailtoUrl(payload: RestockMailPayload): string {
  const box = payload.boxName.trim() || 'Unknown box'
  const subject = `${box} Restock Request`

  let body = `Restock request for box: ${box}\r\n\r\n`

  if (payload.selectedLabels.length > 0) {
    body += 'Items:\r\n'
    payload.selectedLabels.forEach((label, i) => {
      body += `${i + 1}. ${label}\r\n`
    })
  } else {
    body += 'Items:\r\n(none selected)\r\n'
  }

  if (payload.notes.trim()) {
    body += `\r\nOther notes:\r\n${payload.notes.trim()}\r\n`
  }

  const to = payload.to?.trim()
  const qs = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  if (to) {
    return `mailto:${encodeURIComponent(to)}?${qs}`
  }
  return `mailto:?${qs}`
}

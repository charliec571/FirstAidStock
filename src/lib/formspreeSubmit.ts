export type FormspreePayload = {
  formId: string
  subject: string
  message: string
  /** Optional; Formspree uses this as Reply-To. Use a shared kiosk/facilities address if needed. */
  replyEmail?: string
}

export type FormspreeResult =
  | { ok: true }
  | { ok: false; error: string }

/**
 * POST JSON to Formspree — delivers email to the inbox you configured in the Formspree dashboard.
 * @see https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax
 */
export async function submitToFormspree(payload: FormspreePayload): Promise<FormspreeResult> {
  const url = `https://formspree.io/f/${encodeURIComponent(payload.formId)}`

  const body: Record<string, string> = {
    subject: payload.subject,
    message: payload.message,
  }

  const reply = payload.replyEmail?.trim()
  if (reply) {
    body.email = reply
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean
      error?: string
      errors?: unknown
    }

    if (res.ok && data.ok !== false) {
      return { ok: true }
    }

    const msg =
      typeof data.error === 'string'
        ? data.error
        : `Request failed (${res.status})`
    return { ok: false, error: msg }
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Network error'
    return { ok: false, error: msg }
  }
}

import { useMemo, useState } from 'react'
import { ALL_KIT_ITEMS, KIT_CATEGORIES, NOTES_MAX_LENGTH } from './data/items'
import { submitToFormspree } from './lib/formspreeSubmit'
import { buildRestockEmailContent, buildRestockMailtoUrl } from './lib/restockMailto'
import { useBoxFromQuery } from './hooks/useBoxFromQuery'

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

export default function App() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [notes, setNotes] = useState('')
  const boxName = useBoxFromQuery()

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  const n = selectedIds.size

  const selectedLabels = useMemo(
    () => ALL_KIT_ITEMS.filter((i) => selectedIds.has(i.id)).map((i) => i.label),
    [selectedIds]
  )

  function toggle(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectAll() {
    setSelectedIds(new Set(ALL_KIT_ITEMS.map((i) => i.id)))
  }

  function clearSelection() {
    setSelectedIds(new Set())
  }

  const formspreeConfigured = Boolean(
    import.meta.env.VITE_FORMSPREE_FORM_ID?.trim()
  )

  function openMailDraft() {
    const box = boxName || 'Unknown box'
    window.location.href = buildRestockMailtoUrl({
      boxName: box,
      selectedLabels,
      notes,
      to: import.meta.env.VITE_RESTOCK_MAIL_TO,
    })
  }

  async function submitRequest() {
    if (selectedLabels.length === 0 && !notes.trim()) {
      const ok = window.confirm(
        'No items are selected and notes are empty. Send anyway?'
      )
      if (!ok) return
    }

    const box = boxName || 'Unknown box'
    const { subject, message } = buildRestockEmailContent({
      boxName: box,
      selectedLabels,
      notes,
    })

    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim()

    if (!formId) {
      setSubmitStatus('error')
      setSubmitMessage(
        'Silent send isn’t enabled on this build: the GitHub Actions secret VITE_FORMSPREE_FORM_ID is missing or the site wasn’t rebuilt after adding it. Add the secret (your Formspree id from …/f/xxxx), redeploy GitHub Pages, then try Submit again. For local testing, use .env.local — see .env.example.'
      )
      return
    }

    setSubmitStatus('loading')
    setSubmitMessage(null)

    const result = await submitToFormspree({
      formId,
      subject,
      message,
      replyEmail: import.meta.env.VITE_FORMSPREE_REPLY_EMAIL,
    })

    if (result.ok) {
      setSubmitStatus('success')
      setSubmitMessage('Request sent. Check the inbox configured in Formspree.')
      window.setTimeout(() => {
        setSubmitStatus('idle')
        setSubmitMessage(null)
      }, 6000)
    } else {
      setSubmitStatus('error')
      setSubmitMessage(result.error)
    }
  }

  const notesRemaining = NOTES_MAX_LENGTH - notes.length

  const boxDisplay =
    boxName || 'Box name will appear here after QR scan'

  const submitBusy = submitStatus === 'loading'

  return (
    <div className="app">
      <div className="status-banner" role="region" aria-label="Station status">
        <span className="status-banner__badge">All clear</span>
        <span className="status-banner__sep" aria-hidden="true">
          ·
        </span>
        <span
          className={`status-banner__box ${boxName ? '' : 'status-banner__box--placeholder'}`}
        >
          {boxDisplay}
        </span>
      </div>

      <header className="app-header">
        <div className="app-header__hero">
          <h1>First Aid Kit Restock</h1>
          <img
            className="header-logo"
            src={`${import.meta.env.BASE_URL}sweetwater-logo.svg`}
            alt="Sweetwater"
            width={160}
            height={36}
            decoding="async"
          />
        </div>
        <p className="lede">
          Open a category, tap items to select. Notes at the bottom —{' '}
          <span className="lede-count">{n} selected</span>.
        </p>
      </header>

      <div className="toolbar-sticky">
        <div className="toolbar">
          <button type="button" className="btn btn-text" onClick={selectAll}>
            All
          </button>
          <button type="button" className="btn btn-text" onClick={clearSelection}>
            Clear
          </button>
          <span className="selection-count" aria-live="polite">
            {n} selected
          </span>
        </div>
      </div>

      {!formspreeConfigured ? (
        <div className="config-banner" role="note">
          <strong>Formspree not wired to this deploy.</strong> Add GitHub secret{' '}
          <code className="config-banner__code">VITE_FORMSPREE_FORM_ID</code>, then rerun the
          Pages workflow so Submit can send without opening Mail. Optionally add{' '}
          <code className="config-banner__code">VITE_RESTOCK_MAIL_TO</code> if you use “Draft in
          Mail” and want a default To address.
        </div>
      ) : null}

      {submitMessage ? (
        <p
          className={`submit-feedback submit-feedback--${submitStatus === 'error' ? 'error' : 'success'}`}
          role="status"
        >
          {submitMessage}
        </p>
      ) : null}

      <div className="submit-actions submit-actions--top">
        <button
          type="button"
          className="btn btn-submit"
          onClick={() => void submitRequest()}
          disabled={submitBusy}
          aria-busy={submitBusy}
          aria-label="Submit restock request"
        >
          {submitBusy ? 'Sending…' : 'Submit'}
        </button>
      </div>

      {!formspreeConfigured ? (
        <div className="mailto-fallback">
          <button type="button" className="btn btn-mail-draft" onClick={openMailDraft}>
            Draft in Mail instead
          </button>
        </div>
      ) : null}

      <div className="categories" role="region" aria-label="Kit categories">
        {KIT_CATEGORIES.map((category, index) => (
          <details
            key={category.id}
            className="category-panel"
            open={index === 0}
          >
            <summary className="category-summary">
              <span className="category-caret" aria-hidden="true">
                ›
              </span>
              <span className="category-title">{category.title}</span>
              <span className="category-meta">{category.items.length} items</span>
            </summary>
            <ul className="item-list" aria-label={category.title}>
              {category.items.map((item) => {
                const checked = selectedIds.has(item.id)
                return (
                  <li key={item.id}>
                    <label className={`item-row ${checked ? 'item-row--selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(item.id)}
                        className="item-check"
                      />
                      <span className="item-name">{item.label}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </details>
        ))}
      </div>

      <div className="notes-block">
        <label htmlFor="other-notes" className="notes-label">
          Other notes
        </label>
        <textarea
          id="other-notes"
          className="notes-field"
          value={notes}
          onChange={(e) => {
            const next = e.target.value.slice(0, NOTES_MAX_LENGTH)
            setNotes(next)
          }}
          maxLength={NOTES_MAX_LENGTH}
          rows={3}
          placeholder="Optional"
          autoComplete="off"
        />
        <p className="notes-counter" aria-live="polite">
          {notes.length} / {NOTES_MAX_LENGTH}
          {notesRemaining <= 10 && notesRemaining >= 0 ? (
            <span className="notes-warning"> ({notesRemaining} left)</span>
          ) : null}
        </p>
      </div>

      <div className="submit-actions submit-actions--bottom">
        <button
          type="button"
          className="btn btn-submit"
          onClick={() => void submitRequest()}
          disabled={submitBusy}
          aria-busy={submitBusy}
          aria-label="Submit restock request"
        >
          {submitBusy ? 'Sending…' : 'Submit'}
        </button>
      </div>

      {!formspreeConfigured ? (
        <div className="mailto-fallback mailto-fallback--bottom">
          <button type="button" className="btn btn-mail-draft" onClick={openMailDraft}>
            Draft in Mail instead
          </button>
        </div>
      ) : null}
    </div>
  )
}

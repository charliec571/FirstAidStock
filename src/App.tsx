import { useMemo, useState } from 'react'
import { KIT_ITEMS, NOTES_MAX_LENGTH } from './data/items'

export default function App() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [notes, setNotes] = useState('')

  const selectedLabels = useMemo(
    () => KIT_ITEMS.filter((item) => selectedIds.has(item.id)).map((item) => item.label),
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
    setSelectedIds(new Set(KIT_ITEMS.map((i) => i.id)))
  }

  function clearSelection() {
    setSelectedIds(new Set())
  }

  const notesRemaining = NOTES_MAX_LENGTH - notes.length

  return (
    <div className="app">
      <header className="app-header">
        <h1>First aid kit</h1>
        <p className="lede">Select any items that apply. Add optional notes below.</p>
      </header>

      <div className="toolbar">
        <button type="button" className="btn btn-text" onClick={selectAll}>
          Select all
        </button>
        <button type="button" className="btn btn-text" onClick={clearSelection}>
          Clear
        </button>
      </div>

      <ul className="item-list" aria-label="Kit items">
        {KIT_ITEMS.map((item) => {
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
          {notes.length} / {NOTES_MAX_LENGTH} characters
          {notesRemaining <= 10 && notesRemaining >= 0 ? (
            <span className="notes-warning"> ({notesRemaining} left)</span>
          ) : null}
        </p>
      </div>

      <section className="summary" aria-live="polite" aria-label="Selected items summary">
        <h2>Selected ({selectedLabels.length})</h2>
        {selectedLabels.length === 0 ? (
          <p className="summary-empty">No items selected.</p>
        ) : (
          <ol className="summary-list">
            {selectedLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}

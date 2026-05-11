import { useState } from 'react'
import { ALL_KIT_ITEMS, KIT_CATEGORIES, NOTES_MAX_LENGTH } from './data/items'

export default function App() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [notes, setNotes] = useState('')

  const n = selectedIds.size

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

  const notesRemaining = NOTES_MAX_LENGTH - notes.length

  return (
    <div className="app">
      <header className="app-header">
        <h1>First aid kit</h1>
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
    </div>
  )
}

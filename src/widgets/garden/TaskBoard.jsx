import { useState } from 'react'

export default function TaskBoard({ tasks, onAdd, onToggle, onRemove, onClearCompleted }) {
  const [draft, setDraft] = useState('')
  const hasDone = tasks.some((t) => t.done)

  function submit(e) {
    e.preventDefault()
    if (!draft.trim()) return
    onAdd(draft)
    setDraft('')
  }

  return (
    <div className="task-board">
      <form className="task-form" onSubmit={submit}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a task…"
          aria-label="New task"
          maxLength={120}
        />
        <button type="submit" className="task-add" disabled={!draft.trim()}>
          + Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="task-empty">No tasks yet. Add one and watch your plant grow.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t.id} className={`task-item ${t.done ? 'is-done' : ''}`}>
              <label>
                <input type="checkbox" checked={t.done} onChange={() => onToggle(t.id)} />
                <span className="task-box" aria-hidden="true">{t.done ? '✓' : ''}</span>
                <span className="task-title">{t.title}</span>
              </label>
              <button
                type="button"
                className="task-remove"
                onClick={() => onRemove(t.id)}
                aria-label={`Remove ${t.title}`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {hasDone && (
        <button type="button" className="task-clear" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </div>
  )
}

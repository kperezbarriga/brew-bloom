import { useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'brew-bloom-tasks-v1'

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(saved)) return []
    return saved
      .filter((t) => t && typeof t.title === 'string')
      .map((t) => ({ id: String(t.id), title: t.title, done: Boolean(t.done) }))
  } catch {
    return []
  }
}

// Task state + localStorage persistence.
// To move to the backend later, replace load/save in this one hook.
export function useTasks() {
  const [tasks, setTasks] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // keep working if storage is unavailable
    }
  }, [tasks])

  const addTask = useCallback((title) => {
    const clean = title.trim()
    if (!clean) return
    setTasks((cur) => [...cur, { id: crypto.randomUUID(), title: clean, done: false }])
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((cur) => cur.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }, [])

  const removeTask = useCallback((id) => {
    setTasks((cur) => cur.filter((t) => t.id !== id))
  }, [])

  const clearCompleted = useCallback(() => {
    setTasks((cur) => cur.filter((t) => !t.done))
  }, [])

  const { completed, total } = useMemo(
    () => ({ completed: tasks.filter((t) => t.done).length, total: tasks.length }),
    [tasks],
  )

  return { tasks, completed, total, addTask, toggleTask, removeTask, clearCompleted }
}

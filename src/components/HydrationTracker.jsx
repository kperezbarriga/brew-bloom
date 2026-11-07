
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'brew-bloom-wellness-v1'
const WATER_GOAL = 8

function getToday() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function loadSavedDay() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')

    if (saved?.date === getToday()) {
      return {
        date: getToday(),
        water: Math.max(0, Math.min(WATER_GOAL, Number(saved.water) || 0)),
      }
    }
  } catch {
    // Start fresh if saved data is unavailable.
  }

  return { date: getToday(), water: 0 }
}

export default function HydrationTracker() {
  const [day, setDay] = useState(loadSavedDay)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(day))
    } catch {
      // Continue working if browser storage is unavailable.
    }
  }, [day])

  useEffect(() => {
    const checkDay = () => {
      setDay(current =>
        current.date === getToday()
          ? current
          : { date: getToday(), water: 0 }
      )
    }

    window.addEventListener('focus', checkDay)
    const timer = window.setInterval(checkDay, 60000)

    return () => {
      window.removeEventListener('focus', checkDay)
      window.clearInterval(timer)
    }
  }, [])

  function updateWater(amount) {
    setDay(current => ({
      ...current,
      water: Math.max(0, Math.min(WATER_GOAL, current.water + amount)),
    }))
  }

  const progress = Math.min((day.water / WATER_GOAL) * 100, 100)

  return (
    <section className="wellness-widget">
      <div className="wellness-widget-top">
        <span className="wellness-widget-icon">💧</span>

        <div>
          <div className="eyebrow">DRINK WELL</div>
          <h2>Hydration Tracker</h2>
        </div>

        <span className="wellness-counter">
          TODAY
        </span>
      </div>

      <div className="wellness-panel">
        <p className="wellness-prompt">
          Each cup matters .
        </p>

        <div className="wellness-progress-label">
          <span>Today's hydration fill</span>
          <strong>
            {day.water} / {WATER_GOAL} glasses
          </strong>
        </div>

        <div
          className="wellness-progress"
          role="progressbar"
          aria-label="Hydration progress"
          aria-valuemin={0}
          aria-valuemax={WATER_GOAL}
          aria-valuenow={day.water}
        >
          <span style={{ width: `${progress}%` }} />
        </div>

        <div className="water-cups">
          {Array.from({ length: WATER_GOAL }, (_, index) => (
            <button
              key={index}
              type="button"
              className={`water-cup ${
                index < day.water ? 'is-filled' : ''
              }`}
              onClick={() => setDay(current => ({
                ...current,
                water: index + 1,
              }))}
              aria-label={`Log ${index + 1} glasses of water`}
              aria-pressed={index < day.water}
            >
              💧
            </button>
          ))}
        </div>

        <div className="wellness-actions">
          <button
            type="button"
            className="wellness-secondary"
            onClick={() => updateWater(-1)}
            disabled={day.water === 0}
          >
            − Remove one
          </button>

          <button
            type="button"
            className="primary"
            onClick={() => updateWater(1)}
            disabled={day.water >= WATER_GOAL}
          >
            + Log a glass
          </button>
        </div>

        <p className="wellness-small-note">
          Everyone has different hydration needs.
          This is just a guide to getting the recommended 8 cups a day.
        </p>
      </div>

      <div className="wellness-widget-footer">
        <span className="wellness-save-note">
          ✿ Should keep track for the day.
        </span>
      </div>
    </section>
  )
}

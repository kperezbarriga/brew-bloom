import '../App.css'
import '../widgets/garden/garden.css'
import HydrationTracker from '../components/HydrationTracker'
import { PlantWidget, TaskBoard, useTasks } from '../widgets/garden'

// One dashboard: garden (tasks + plant) and hydration tracker.
// The "wellness-page" class keeps the existing wellness styles applying.
export default function Workspace() {
  const { tasks, completed, total, addTask, toggleTask, removeTask, clearCompleted } = useTasks()
  const bloomed = total > 0 && completed === total

  return (
    <div className="wellness-page has-tabbar">
      <header className="cafe-header">
        <a className="brand" href="#workspace-top">
          <span className="brand-flower">✿</span>
          <span>Brew &amp; Bloom</span>
        </a>
        <span className="header-caption">YOUR LITTLE CORNER OF CALM</span>
      </header>

      <main className="wellness-content" id="workspace-top">
        <div className="step-line">
          <span>01 / PLAN</span>
          <span>02 / HYDRATE</span>
          <span>03 / BLOOM</span>
        </div>

        <section className="wellness-heading">
          <div>
            <div className="eyebrow">✳ YOUR WORKSPACE</div>
            <h1>
              Tend your tasks, <em>tend yourself.</em>
            </h1>
            <p>
              Check off tasks to grow your plant, and keep a glass of water close while you work.
            </p>
          </div>
          <span className="heading-sparkle" aria-hidden="true">✿</span>
        </section>

        <section className="wellness-widget garden-card" style={{ marginBottom: 24 }}>
          <div className="wellness-widget-top">
            <span className="wellness-widget-icon">🌱</span>
            <div>
              <div className="eyebrow">GROW YOUR GARDEN</div>
              <h2>Task Garden</h2>
            </div>
            <span className="wellness-counter">
              {completed} / {total} DONE
            </span>
          </div>

          <div className="garden-body">
            <div className="garden-plant-col">
              <PlantWidget completed={completed} total={total} />
              <p className="garden-caption">
                {total === 0
                  ? 'Add a task to plant your seed.'
                  : bloomed
                    ? <strong>Full bloom! ✿</strong>
                    : `${total - completed} more to bloom`}
              </p>
            </div>

            <TaskBoard
              tasks={tasks}
              onAdd={addTask}
              onToggle={toggleTask}
              onRemove={removeTask}
              onClearCompleted={clearCompleted}
            />
          </div>

          <div className="wellness-widget-footer">
            <span className="wellness-save-note">✿ Every task is one step of growth.</span>
          </div>
        </section>

        <HydrationTracker />

        <div className="wellness-footer">
          <span>✿ One step closer to becoming your best self.</span>
          <span>Bloom into your dream self.</span>
        </div>
      </main>
    </div>
  )
}

// SVG plant driven by completed / total.
// Final height is always MAX_HEIGHT; each completed task is one equal growth step.
// Replace the SVG with real art later, keeping the { completed, total } props.

const BASE_Y = 214 // where the stem leaves the pot
const MAX_HEIGHT = 140 // final stem height, always the same
const LEAF_STOPS = [0.25, 0.5, 0.75] // progress at which each leaf appears
const PETALS = 8

export default function PlantWidget({ completed, total }) {
  const progress = total > 0 ? Math.min(completed / total, 1) : 0
  const bloomed = total > 0 && progress === 1
  const headY = -MAX_HEIGHT * progress
  const budR = 5 + 9 * progress

  return (
    <svg
      className="plant-widget"
      viewBox="0 0 200 250"
      role="img"
      aria-label={
        total === 0
          ? 'A seedling waiting for tasks'
          : bloomed
            ? 'Your plant is in full bloom'
            : `Your plant is ${Math.round(progress * 100)}% grown`
      }
    >
      <ellipse cx="100" cy="238" rx="52" ry="6" fill="#e6d9c6" />

      {/* stem: full height, scaled from the base */}
      <rect
        className="plant-stem"
        x="97"
        y={BASE_Y - MAX_HEIGHT}
        width="6"
        height={MAX_HEIGHT}
        rx="3"
        style={{ transform: `scaleY(${progress})` }}
      />

      {/* leaves at fixed points along the final stem */}
      {LEAF_STOPS.map((stop, i) => {
        const on = progress >= stop
        const side = i % 2 === 0 ? -1 : 1
        const y = BASE_Y - stop * MAX_HEIGHT
        return (
          <g key={stop} transform={`translate(100 ${y}) scale(${side} 1)`}>
            <path
              className={`plant-leaf ${on ? 'is-on' : ''}`}
              d="M0 0 C 14 -16, 34 -14, 40 -2 C 26 8, 10 8, 0 0 Z"
            />
          </g>
        )
      })}

      {/* bud / flower rides the tip of the stem */}
      <g className="plant-head" style={{ transform: `translateY(${headY}px)` }}>
        <g transform={`translate(100 ${BASE_Y})`}>
          {Array.from({ length: PETALS }, (_, i) => (
            <g key={i} transform={`rotate(${(360 / PETALS) * i})`}>
              <ellipse
                className={`plant-petal ${bloomed ? 'is-open' : ''}`}
                cx="0"
                cy="-17"
                rx="7"
                ry="14"
              />
            </g>
          ))}
          <circle className="plant-bud" r={bloomed ? 8 : budR} />
        </g>
      </g>

      {/* pot */}
      <path d="M62 212 H138 L130 244 Q129 248 124 248 H76 Q71 248 70 244 Z" fill="#dca18f" />
      <rect x="58" y="206" width="84" height="10" rx="4" fill="#cf8f7c" />
    </svg>
  )
}

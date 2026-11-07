export default function BottomTabBar({ tabs, active, onChange }) {
  return (
    <nav className="bottom-tabs" aria-label="Main">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`bottom-tab ${t.id === active ? 'is-active' : ''}`}
          aria-current={t.id === active ? 'page' : undefined}
          onClick={() => onChange(t.id)}
        >
          <span aria-hidden="true">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}

import { NavLink } from 'react-router-dom'

interface AppHeaderProps {
  onOpenAbout: () => void
}

export function AppHeader({ onOpenAbout }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-seal" aria-hidden="true">
          水滸
        </div>
        <div className="brand-copy">
          <h1>水滸輿圖</h1>
          <p>一百二十回 · 梁山泊英雄行跡</p>
        </div>
      </div>

      <nav className="mode-switch" aria-label="地圖模式">
        <NavLink
          to="/story"
          className={({ isActive }) => `mode-link${isActive ? ' active' : ''}`}
        >
          章回事件
          <small>事件</small>
        </NavLink>
        <NavLink
          to="/heroes"
          className={({ isActive }) => `mode-link${isActive ? ' active' : ''}`}
        >
          好漢行蹤
          <small>行蹤</small>
        </NavLink>
      </nav>

      <div className="header-actions">
        <button type="button" className="header-action" onClick={onOpenAbout}>
          考證
        </button>
        <span className="header-rule" aria-hidden="true" />
        <button type="button" className="header-action" onClick={onOpenAbout}>
          關於
        </button>
      </div>
    </header>
  )
}

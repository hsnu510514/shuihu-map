import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { AppHeader } from './components/layout/AppHeader'
import { Timeline } from './components/layout/Timeline'
import { AboutDialog } from './components/about/AboutDialog'
import { StoryPage } from './pages/StoryPage'
import { HeroPage } from './pages/HeroPage'
import { RelationsPage } from './pages/RelationsPage'
import { RankingsPage } from './pages/RankingsPage'
import { useAppStore } from './store/appStore'
import { applyUrlState } from './lib/urlState'

function useUrlState() {
  const [params, setParams] = useSearchParams()
  const chapter = useAppStore((state) => state.chapter)
  const selectedEventId = useAppStore((state) => state.selectedEventId)
  const selectedHeroId = useAppStore((state) => state.selectedHeroId)
  const selectedFigureId = useAppStore((state) => state.selectedFigureId)
  const selectedRankingId = useAppStore((state) => state.selectedRankingId)

  useEffect(() => {
    const next = new URLSearchParams(params)
    next.set('chapter', String(chapter))
    if (selectedEventId) next.set('event', selectedEventId)
    else next.delete('event')
    if (selectedHeroId) next.set('hero', selectedHeroId)
    else next.delete('hero')
    if (selectedFigureId) next.set('figure', selectedFigureId)
    else next.delete('figure')
    if (selectedRankingId) next.set('list', selectedRankingId)
    else next.delete('list')
    if (next.toString() !== params.toString()) {
      setParams(next, { replace: true })
    }
  }, [chapter, params, selectedEventId, selectedFigureId, selectedHeroId, selectedRankingId, setParams])

  useEffect(() => {
    window.addEventListener('popstate', applyUrlState)
    return () => window.removeEventListener('popstate', applyUrlState)
  }, [])
}

function App() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const location = useLocation()
  const setMode = useAppStore((state) => state.setMode)
  const chapter = useAppStore((state) => state.chapter)
  const mode = useAppStore((state) => state.mode)

  useEffect(() => {
    const nextMode = location.pathname.includes('/relations')
      ? 'relations'
      : location.pathname.includes('/heroes')
        ? 'heroes'
        : location.pathname.includes('/rankings')
          ? 'rankings'
          : 'story'
    if (useAppStore.getState().mode !== nextMode) {
      setMode(nextMode)
      applyUrlState()
    }
  }, [location.pathname, setMode])

  useUrlState()

  useEffect(() => {
    const modeLabel =
      mode === 'heroes'
        ? '好漢行蹤'
        : mode === 'relations'
          ? '人物關係'
          : mode === 'rankings'
            ? '英雄榜'
            : '章回事件'
    document.title = `${modeLabel} · 第${chapter}回 · 水滸輿圖`
  }, [chapter, mode])

  return (
    <div className="app">
      <AppHeader onOpenAbout={() => setAboutOpen(true)} />
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Navigate to="/story" replace />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/heroes" element={<HeroPage />} />
          <Route path="/relations" element={<RelationsPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="*" element={<Navigate to="/story" replace />} />
        </Routes>
      </div>
      <Timeline />
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </div>
  )
}

export default App







import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'
import { AppHeader } from './components/layout/AppHeader'
import { Timeline } from './components/layout/Timeline'
import { AboutDialog } from './components/about/AboutDialog'
import { StoryPage } from './pages/StoryPage'
import { HeroPage } from './pages/HeroPage'
import { useAppStore } from './store/appStore'
import { applyUrlState } from './lib/urlState'

function useUrlState() {
  const [params, setParams] = useSearchParams()
  const chapter = useAppStore((state) => state.chapter)
  const selectedEventId = useAppStore((state) => state.selectedEventId)
  const selectedHeroId = useAppStore((state) => state.selectedHeroId)

  useEffect(() => {
    const next = new URLSearchParams(params)
    next.set('chapter', String(chapter))
    if (selectedEventId) next.set('event', selectedEventId)
    else next.delete('event')
    if (selectedHeroId) next.set('hero', selectedHeroId)
    else next.delete('hero')
    if (next.toString() !== params.toString()) {
      setParams(next, { replace: true })
    }
  }, [chapter, params, selectedEventId, selectedHeroId, setParams])

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
    const nextMode = location.pathname.startsWith('/heroes') ? 'heroes' : 'story'
    if (useAppStore.getState().mode !== nextMode) {
      setMode(nextMode)
      applyUrlState()
    }
  }, [location.pathname, setMode])

  useUrlState()

  useEffect(() => {
    const modeLabel = mode === 'heroes' ? '好漢行蹤' : '章回事件'
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
          <Route path="*" element={<Navigate to="/story" replace />} />
        </Routes>
      </div>
      <Timeline />
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
    </div>
  )
}

export default App







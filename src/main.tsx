import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { applyUrlState } from './lib/urlState'
import { useAppStore } from './store/appStore'

const isHeroMode = window.location.pathname.includes('/heroes')
useAppStore.getState().setMode(isHeroMode ? 'heroes' : 'story')
applyUrlState()

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

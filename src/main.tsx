import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { applyUrlState } from './lib/urlState'
import { useAppStore } from './store/appStore'

const initialMode = window.location.pathname.includes('/relations')
  ? 'relations'
  : window.location.pathname.includes('/heroes')
    ? 'heroes'
    : window.location.pathname.includes('/rankings')
      ? 'rankings'
      : window.location.pathname.includes('/biographies')
        ? 'biographies'
        : 'story'
useAppStore.getState().setMode(initialMode)
applyUrlState()

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

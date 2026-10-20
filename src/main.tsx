import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AtlasApp, applyUrlState, configureAtlas, useAppStore } from '@atlas/engine'
import '@atlas/engine/style.css'
import './index.css'
import { content } from './content'

configureAtlas(content)

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
    <AtlasApp basename={basename} />
  </StrictMode>,
)

import { eventById } from '../data/events'
import { figureById } from '../data/figures'
import { heroById } from '../data/heroes'
import { rankingById, rankingEntryKeys } from './rankings'
import { useAppStore } from '../store/appStore'

const TOTAL = 120

export function applyUrlState() {
  const params = new URLSearchParams(window.location.search)
  const state = useAppStore.getState()
  const rawChapter = Number(params.get('chapter'))
  if (Number.isInteger(rawChapter) && rawChapter >= 1 && rawChapter <= TOTAL) {
    state.setChapter(rawChapter)
  }
  if (window.location.pathname.includes('/story')) {
    const eventId = params.get('event')
    const event = eventId ? eventById[eventId] : null
    if (event) {
      state.setChapter(event.chapter)
      state.selectEvent(event.id)
    }
  }
  if (window.location.pathname.includes('/heroes')) {
    const heroId = params.get('hero')
    if (heroId && heroById[heroId]) state.selectHero(heroId)
  }
  if (window.location.pathname.includes('/relations')) {
    const figureId = params.get('figure')
    if (figureId && figureById[figureId]) state.selectFigure(figureId)
    else state.selectFigure(null)
  }
  if (window.location.pathname.includes('/rankings')) {
    const rankingId = params.get('list')
    if (rankingId && rankingById[rankingId]) state.selectRanking(rankingId)
    const figureId = params.get('figure')
    if (figureId && (figureById[figureId] || rankingEntryKeys.has(figureId))) {
      state.selectFigure(figureId)
    }
  }
  if (window.location.pathname.includes('/biographies')) {
    const figureId = params.get('figure')
    if (figureId && figureById[figureId]) state.selectFigure(figureId)
    else state.selectFigure(null)
  }
}

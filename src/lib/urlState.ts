import { eventById } from '../data/events'
import { heroById } from '../data/heroes'
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
}

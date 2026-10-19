import { create } from 'zustand'

export type AppMode = 'story' | 'heroes'

interface AppState {
  mode: AppMode
  chapter: number
  selectedEventId: string | null
  selectedPlaceId: string | null
  selectedHeroId: string | null
  setMode: (mode: AppMode) => void
  setChapter: (chapter: number) => void
  selectEvent: (eventId: string | null) => void
  selectPlace: (placeId: string | null) => void
  selectHero: (heroId: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  mode: 'story',
  chapter: 1,
  selectedEventId: null,
  selectedPlaceId: null,
  selectedHeroId: null,
  setMode: (mode) =>
    set((state) =>
      state.mode === mode
        ? state
        : { mode, selectedEventId: null, selectedPlaceId: null, selectedHeroId: null },
    ),
  setChapter: (chapter) => set({ chapter, selectedEventId: null, selectedPlaceId: null }),
  selectEvent: (selectedEventId) => set({ selectedEventId, selectedPlaceId: null }),
  selectPlace: (selectedPlaceId) => set({ selectedPlaceId }),
  selectHero: (selectedHeroId) => set({ selectedHeroId }),
}))


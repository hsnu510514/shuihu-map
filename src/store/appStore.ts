import { create } from 'zustand'

export type AppMode = 'story' | 'heroes' | 'relations' | 'rankings' | 'biographies'

interface AppState {
  mode: AppMode
  chapter: number
  selectedEventId: string | null
  selectedPlaceId: string | null
  selectedHeroId: string | null
  selectedFigureId: string | null
  selectedRankingId: string | null
  setMode: (mode: AppMode) => void
  setChapter: (chapter: number) => void
  selectEvent: (eventId: string | null) => void
  selectPlace: (placeId: string | null) => void
  selectHero: (heroId: string | null) => void
  selectFigure: (figureId: string | null) => void
  selectRanking: (rankingId: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  mode: 'story',
  chapter: 1,
  selectedEventId: null,
  selectedPlaceId: null,
  selectedHeroId: null,
  selectedFigureId: null,
  selectedRankingId: null,
  setMode: (mode) =>
    set((state) =>
      state.mode === mode
        ? state
        : {
            mode,
            selectedEventId: null,
            selectedPlaceId: null,
            selectedHeroId: null,
            selectedFigureId: null,
            selectedRankingId: null,
          },
    ),
  setChapter: (chapter) => set({ chapter, selectedEventId: null, selectedPlaceId: null }),
  selectEvent: (selectedEventId) => set({ selectedEventId, selectedPlaceId: null }),
  selectPlace: (selectedPlaceId) => set({ selectedPlaceId }),
  selectHero: (selectedHeroId) => set({ selectedHeroId }),
  selectFigure: (selectedFigureId) => set({ selectedFigureId }),
  selectRanking: (selectedRankingId) => set({ selectedRankingId, selectedFigureId: null }),
}))


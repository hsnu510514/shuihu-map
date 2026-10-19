export type Accuracy = 'exact' | 'approximate' | 'fictional' | 'anachronistic'

export type PlaceKind =
  | 'capital'
  | 'prefecture'
  | 'county'
  | 'town'
  | 'village'
  | 'mountain'
  | 'water'
  | 'pass'
  | 'temple'
  | 'site'

export interface Place {
  id: string
  name: string
  aliases?: string[]
  modern: string
  coord: [number, number]
  kind: PlaceKind
  accuracy: Accuracy
  priority: 1 | 2 | 3 | 4
  note?: string
}

export type EventKind =
  | 'journey'
  | 'battle'
  | 'rescue'
  | 'gathering'
  | 'death'
  | 'court'
  | 'origin'
  | 'other'

export interface StoryEvent {
  id: string
  chapter: number
  endChapter?: number
  title: string
  summary: string
  placeIds: string[]
  route?: string[]
  heroIds: string[]
  site?: string
  kind: EventKind
  quote?: string
}

export interface Arc {
  id: string
  name: string
  from: number
  to: number
  tone: string
}

export interface Chapter {
  n: number
  title: string
  arcId: string
}

export type HeroFate =
  | '戰死'
  | '病故'
  | '善終'
  | '出家'
  | '離隊'
  | '任官'
  | '其他'

export interface Hero {
  id: string
  rank: number
  star: string
  nickname: string
  name: string
  faction: string
  firstChapter: number
  joinChapter: number
  fate: HeroFate
  fateChapter?: number
  fatePlaceId?: string
  note?: string
}

export type HeroStatus =
  | 'present'
  | 'traveling'
  | 'unknown'
  | 'dead'
  | 'detached'

export interface HeroAnchor {
  heroId: string
  chapter: number
  placeId: string | null
  status: HeroStatus
  confidence: 'text' | 'inferred'
  note?: string
}

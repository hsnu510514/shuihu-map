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

export interface Character {
  id: string
  name: string
  aliases?: string[]
  affiliation: string
  role: string
  firstChapter?: number
  note?: string
}

export type FigureKind = 'hero' | 'character'

export interface Figure {
  id: string
  name: string
  aliases?: string[]
  nickname?: string
  affiliation: string
  role: string
  kind: FigureKind
  rank?: number
  star?: string
  firstChapter?: number
  note?: string
}

export type RelationType =
  | 'kinship'
  | 'marriage'
  | 'sworn'
  | 'master'
  | 'patronage'
  | 'friendship'
  | 'romance'
  | 'subordinate'
  | 'alliance'
  | 'rivalry'
  | 'enmity'
  | 'other'

export interface RelationPhase {
  fromChapter: number
  toChapter?: number
  type: RelationType
  label: string
  summary: string
  quote?: string
  eventId?: string
  certainty: 'text' | 'inferred'
}

export interface Relation {
  id: string
  a: string
  b: string
  directed?: boolean
  phases: RelationPhase[]
}

export interface Interaction {
  id: string
  a: string
  b: string
  chapter: number
  endChapter?: number
  label: string
  summary: string
  eventId?: string
  quote?: string
}

export type RankingBasis = 'text' | 'inferred' | 'editorial'

export type RankingDirection = 'desc' | 'asc'

export type RankingReliability = 'high' | 'medium' | 'low'

export interface RankingMetric {
  key: string
  name: string
  unit?: string
}

export interface RankingSource {
  chapter: number
  eventId?: string
  quote?: string
  note?: string
}

export interface RankingEntry {
  id?: string
  figureId: string
  value: number
  display?: string
  note?: string
  metrics?: Record<string, number>
  sources: RankingSource[]
}

export interface RankingCategory {
  id: string
  name: string
  group: string
  description: string
  basis: RankingBasis
  reliability?: RankingReliability
  direction: RankingDirection
  unit?: string
  metrics?: RankingMetric[]
  bar?: boolean
  topN?: number
  entries: RankingEntry[]
}

export interface RankingGroup {
  id: string
  name: string
  order: number
}

export interface DeedCapture {
  id: string
  figureId: string
  captorId?: string
  chapter: number
  note?: string
  quote?: string
}

export type FightMode = '單挑' | '陣前' | '擂台' | '私鬥'

export interface DeedFight {
  id: string
  winner: string
  loser: string
  chapter: number
  mode: FightMode
  note?: string
  quote?: string
}

export interface DeedKill {
  id: string
  figureId: string
  chapter: number
  victims: string[]
  count?: number
  note?: string
  quote?: string
}

export interface DeedCampaign {
  id: string
  name: string
  fromChapter: number
  toChapter?: number
  outcome: 'win' | 'loss'
  participants: string[]
  note?: string
  quote?: string
}

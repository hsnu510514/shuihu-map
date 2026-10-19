import { events } from '../data/events'
import { figureById } from '../data/figures'
import { heroById } from '../data/heroes'
import { interactions } from '../data/interactions'
import { relationTypeMeta, relations } from '../data/relations'
import { bioFor } from '../data/bios'
import { achievementsFor } from '../data/achievements'
import { campaigns, captures, fights, kills } from '../data/deeds'
import type { EventKind, Figure, HeroFate, StoryEvent } from '../data/types'

export type ProfileEntryType =
  | 'life'
  | 'curated'
  | 'event'
  | 'interaction'
  | 'capture'
  | 'fight'
  | 'kill'
  | 'campaign'
  | 'relation'

export const profileTypeMeta: Record<ProfileEntryType, { label: string; tone: string }> = {
  life: { label: '生平', tone: 'stone' },
  curated: { label: '編者按', tone: 'cinnabar' },
  event: { label: '章回', tone: 'azurite' },
  interaction: { label: '互動', tone: 'moss' },
  capture: { label: '擒縱', tone: 'ochre' },
  fight: { label: '單挑', tone: 'cinnabar' },
  kill: { label: '殺伐', tone: 'ink' },
  campaign: { label: '戰役', tone: 'azurite' },
  relation: { label: '關係', tone: 'stone' },
}

export const profileTypeOrder: ProfileEntryType[] = [
  'life',
  'curated',
  'event',
  'interaction',
  'capture',
  'fight',
  'kill',
  'campaign',
  'relation',
]

export interface ProfileEntry {
  id: string
  chapter: number
  endChapter?: number
  type: ProfileEntryType
  title: string
  summary?: string
  quote?: string
  eventId?: string
  placeIds?: string[]
  others?: string[]
  label?: string
  eventKind?: EventKind
}

export interface FigureStats {
  appearances: number
  events: number
  interactions: number
  capturesMade: number
  captured: number
  fightsWon: number
  fightsLost: number
  kills: number
  campaigns: number
  relations: number
}

export interface FigureProfile {
  figure: Figure
  entries: ProfileEntry[]
  stats: FigureStats
  counts: Record<ProfileEntryType, number>
}

const fateLabel = (fate: HeroFate): string => (fate === '其他' ? '遇害／自盡' : fate)

function figureName(id: string): string {
  return figureById[id]?.name ?? id
}

function lifeEntries(figure: Figure): ProfileEntry[] {
  const entries: ProfileEntry[] = []
  const hero = figure.kind === 'hero' ? heroById[figure.id] : null

  if (hero) {
    entries.push({
      id: `${hero.id}-life-first`,
      chapter: hero.firstChapter,
      type: 'life',
      title: '初登場',
      summary: `第 ${hero.firstChapter} 回登場，${hero.star}・第 ${hero.rank} 席。`,
    })
    if (hero.joinChapter !== hero.firstChapter) {
      entries.push({
        id: `${hero.id}-life-join`,
        chapter: hero.joinChapter,
        type: 'life',
        title: '入夥梁山',
        summary: `第 ${hero.joinChapter} 回歸梁山泊聚義。`,
      })
    }
    if (hero.fateChapter) {
      entries.push({
        id: `${hero.id}-life-fate`,
        chapter: hero.fateChapter,
        type: 'life',
        title: `結局・${fateLabel(hero.fate)}`,
        summary: `第 ${hero.fateChapter} 回${fateLabel(hero.fate)}。`,
      })
    }
  } else if (figure.firstChapter) {
    entries.push({
      id: `${figure.id}-life-first`,
      chapter: figure.firstChapter,
      type: 'life',
      title: '初登場',
      summary: `第 ${figure.firstChapter} 回登場，${figure.role}。`,
    })
  }

  return entries
}

function eventEntries(figureId: string): ProfileEntry[] {
  return events
    .filter((event: StoryEvent) => event.heroIds.includes(figureId))
    .map((event) => ({
      id: `event-${event.id}`,
      chapter: event.chapter,
      endChapter: event.endChapter,
      type: 'event' as const,
      title: event.title,
      summary: event.summary,
      quote: event.quote,
      eventId: event.id,
      placeIds: event.placeIds,
      eventKind: event.kind,
    }))
}

function interactionEntries(figureId: string): ProfileEntry[] {
  return interactions
    .filter((item) => item.a === figureId || item.b === figureId)
    .map((item) => {
      const otherId = item.a === figureId ? item.b : item.a
      return {
        id: `interaction-${item.id}`,
        chapter: item.chapter,
        endChapter: item.endChapter,
        type: 'interaction' as const,
        title: item.label,
        summary: item.summary,
        quote: item.quote,
        eventId: item.eventId,
        others: [otherId],
      }
    })
}

function deedEntries(figureId: string): ProfileEntry[] {
  const entries: ProfileEntry[] = []

  for (const capture of captures) {
    if (capture.figureId === figureId) {
      entries.push({
        id: `capture-in-${capture.id}`,
        chapter: capture.chapter,
        type: 'capture',
        title: '被擒',
        summary: capture.note,
        quote: capture.quote,
        others: capture.captorId ? [capture.captorId] : undefined,
      })
    }
    if (capture.captorId === figureId) {
      entries.push({
        id: `capture-out-${capture.id}`,
        chapter: capture.chapter,
        type: 'capture',
        title: '擒獲',
        summary: capture.note,
        quote: capture.quote,
        others: [capture.figureId],
      })
    }
  }

  for (const fight of fights) {
    if (fight.winner === figureId) {
      entries.push({
        id: `fight-win-${fight.id}`,
        chapter: fight.chapter,
        type: 'fight',
        title: `單挑得勝・${fight.mode}`,
        summary: fight.note ?? `勝 ${figureName(fight.loser)}。`,
        quote: fight.quote,
        others: [fight.loser],
      })
    }
    if (fight.loser === figureId) {
      entries.push({
        id: `fight-loss-${fight.id}`,
        chapter: fight.chapter,
        type: 'fight',
        title: `單挑失利・${fight.mode}`,
        summary: fight.note ?? `敗於 ${figureName(fight.winner)}。`,
        quote: fight.quote,
        others: [fight.winner],
      })
    }
  }

  for (const kill of kills) {
    if (kill.figureId === figureId) {
      entries.push({
        id: `kill-${kill.id}`,
        chapter: kill.chapter,
        type: 'kill',
        title: '殺伐',
        summary: kill.note ?? `誅 ${kill.victims.join('、')}。`,
        quote: kill.quote,
      })
    }
  }

  for (const campaign of campaigns) {
    if (campaign.participants.includes(figureId)) {
      entries.push({
        id: `campaign-${campaign.id}`,
        chapter: campaign.fromChapter,
        endChapter: campaign.toChapter,
        type: 'campaign',
        title: `戰役・${campaign.name}`,
        summary: `${campaign.outcome === 'win' ? '勝' : '敗'}｜${campaign.note ?? ''}`.trim(),
      })
    }
  }

  return entries
}

function relationEntries(figureId: string): ProfileEntry[] {
  const entries: ProfileEntry[] = []
  for (const relation of relations) {
    if (relation.a !== figureId && relation.b !== figureId) continue
    const otherId = relation.a === figureId ? relation.b : relation.a
    for (const [index, phase] of relation.phases.entries()) {
      entries.push({
        id: `relation-${relation.id}-${index}`,
        chapter: phase.fromChapter,
        endChapter: phase.toChapter,
        type: 'relation',
        title: phase.label,
        summary: phase.summary,
        quote: phase.quote,
        eventId: phase.eventId,
        others: [otherId],
        label: relationTypeMeta[phase.type].label,
      })
    }
  }
  return entries
}

function curatedEntries(figureId: string): ProfileEntry[] {
  return bioFor(figureId).map((item, index) => ({
    id: `curated-${figureId}-${index}`,
    chapter: item.chapter,
    endChapter: item.endChapter,
    type: 'curated' as const,
    title: item.title,
    summary: item.detail,
    eventId: item.eventId,
  }))
}

function computeStats(figureId: string): FigureStats {
  let capturesMade = 0
  let captured = 0
  for (const capture of captures) {
    if (capture.captorId === figureId) capturesMade += 1
    if (capture.figureId === figureId) captured += 1
  }
  let fightsWon = 0
  let fightsLost = 0
  for (const fight of fights) {
    if (fight.winner === figureId) fightsWon += 1
    if (fight.loser === figureId) fightsLost += 1
  }
  return {
    appearances: 0,
    events: events.filter((event) => event.heroIds.includes(figureId)).length,
    interactions: interactions.filter((item) => item.a === figureId || item.b === figureId).length,
    capturesMade,
    captured,
    fightsWon,
    fightsLost,
    kills: kills.filter((kill) => kill.figureId === figureId).length,
    campaigns: campaigns.filter((campaign) => campaign.participants.includes(figureId)).length,
    relations: relations.filter((relation) => relation.a === figureId || relation.b === figureId).length,
  }
}

export interface FigureAchievement {
  id: string
  chapter?: number
  text: string
  eventId?: string
}

const achievementCache = new Map<string, FigureAchievement[]>()

function deriveAchievements(figureId: string): FigureAchievement[] {
  const out: FigureAchievement[] = []
  for (const fight of fights) {
    if (fight.winner === figureId) {
      out.push({ id: `f-${fight.id}`, chapter: fight.chapter, text: `陣前單挑勝${figureName(fight.loser)}。` })
    }
  }
  for (const capture of captures) {
    if (capture.captorId === figureId) {
      out.push({ id: `c-${capture.id}`, chapter: capture.chapter, text: `擒獲${figureName(capture.figureId)}。` })
    }
  }
  for (const kill of kills) {
    if (kill.figureId === figureId) {
      out.push({ id: `k-${kill.id}`, chapter: kill.chapter, text: `誅殺${kill.victims.join('、')}。` })
    }
  }
  for (const campaign of campaigns) {
    if (campaign.participants.includes(figureId) && campaign.outcome === 'win') {
      out.push({ id: `m-${campaign.id}`, chapter: campaign.fromChapter, text: `隨軍參與「${campaign.name}」，克敵奏捷。` })
    }
  }
  const seen = new Set<string>()
  return out
    .sort((left, right) => (left.chapter ?? 0) - (right.chapter ?? 0))
    .filter((item) => (seen.has(item.text) ? false : (seen.add(item.text), true)))
    .slice(0, 6)
}

// 重大事蹟：優先取人工策展；未收錄者自事件資料推導（僅取正面功績）。
export function buildAchievements(figureId: string): FigureAchievement[] {
  const cached = achievementCache.get(figureId)
  if (cached) return cached
  const curated = achievementsFor(figureId)
  const result: FigureAchievement[] =
    curated.length > 0
      ? curated.map((item) => ({
          id: item.id,
          chapter: item.chapter,
          text: item.text,
          eventId: item.eventId,
        }))
      : deriveAchievements(figureId)
  achievementCache.set(figureId, result)
  return result
}

const cache = new Map<string, FigureProfile>()

export function buildProfile(figureId: string): FigureProfile | null {
  const figure = figureById[figureId]
  if (!figure) return null
  const cached = cache.get(figureId)
  if (cached) return cached

  const entries = [
    ...lifeEntries(figure),
    ...curatedEntries(figureId),
    ...eventEntries(figureId),
    ...interactionEntries(figureId),
    ...deedEntries(figureId),
    ...relationEntries(figureId),
  ].sort((left, right) => {
    if (left.chapter !== right.chapter) return left.chapter - right.chapter
    return profileTypeOrder.indexOf(left.type) - profileTypeOrder.indexOf(right.type)
  })

  const counts = profileTypeOrder.reduce(
    (acc, type) => {
      acc[type] = entries.filter((entry) => entry.type === type).length
      return acc
    },
    {} as Record<ProfileEntryType, number>,
  )

  const stats = computeStats(figureId)
  stats.appearances = entries.filter((entry) => entry.type === 'event').length

  const profile: FigureProfile = { figure, entries, stats, counts }
  cache.set(figureId, profile)
  return profile
}

export type FigureGroup = 'tiangang' | 'disha' | 'other'

export const figureGroupMeta: Record<FigureGroup, { label: string; order: number }> = {
  tiangang: { label: '天罡三十六', order: 0 },
  disha: { label: '地煞七十二', order: 1 },
  other: { label: '其他角色', order: 2 },
}

export function figureGroupOf(figure: Figure): FigureGroup {
  if (figure.kind === 'hero' && figure.rank !== undefined) {
    return figure.rank <= 36 ? 'tiangang' : 'disha'
  }
  return 'other'
}

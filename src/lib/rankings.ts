import { events } from '../data/events'
import { heroes } from '../data/heroes'
import { interactions } from '../data/interactions'
import { figureName } from '../data/figures'
import { captures, campaigns, fights, kills } from '../data/deeds'
import { curatedRankings, rankingGroups } from '../data/rankings'
import type {
  RankingBasis,
  RankingCategory,
  RankingEntry,
  RankingReliability,
  RankingSource,
} from '../data/types'

export const basisLabel: Record<RankingBasis, string> = {
  text: '書中明載',
  inferred: '依資料推定',
  editorial: '趣味策展',
}

export const reliabilityLabel: Record<RankingReliability, string> = {
  high: '可靠度：高',
  medium: '可靠度：中',
  low: '可靠度：低',
}

function sortSources(sources: RankingSource[]): RankingSource[] {
  return [...sources].sort((left, right) => left.chapter - right.chapter)
}

function entriesFromSources(map: Map<string, RankingSource[]>): RankingEntry[] {
  return [...map.entries()].map(([figureId, sources]) => ({
    figureId,
    value: sources.length,
    sources: sortSources(sources),
  }))
}

function pushSource(map: Map<string, RankingSource[]>, figureId: string, source: RankingSource) {
  const list = map.get(figureId)
  if (list) list.push(source)
  else map.set(figureId, [source])
}

function countByFigure(
  items: Array<{ figureId: string; source: RankingSource }>,
): RankingEntry[] {
  const map = new Map<string, RankingSource[]>()
  for (const item of items) pushSource(map, item.figureId, item.source)
  return entriesFromSources(map).sort(
    (left, right) =>
      right.value - left.value || left.sources[0].chapter - right.sources[0].chapter,
  )
}

const seatRank: RankingCategory = {
  id: 'seat-rank',
  name: '座次高低',
  group: 'rank',
  description: '依第一百八回忠義堂石碣排座次，天罡地煞一百單八將之序。',
  basis: 'text',
  reliability: 'high',
  direction: 'asc',
  bar: false,
  entries: heroes.map((hero) => ({
    figureId: hero.id,
    value: hero.rank,
    display: `第 ${hero.rank} 席`,
    sources: [{ chapter: 71, eventId: 'ch071-paizuoci', note: `${hero.star} · ${hero.nickname}` }],
  })),
}

const debutTime: RankingCategory = {
  id: 'debut-time',
  name: '登場早晚',
  group: 'rank',
  description: '依書中初登場章回排列，愈早登場者在愈前。',
  basis: 'text',
  reliability: 'high',
  direction: 'asc',
  bar: false,
  entries: [...heroes]
    .sort((left, right) => left.firstChapter - right.firstChapter || left.rank - right.rank)
    .map((hero) => ({
      figureId: hero.id,
      value: hero.firstChapter,
      display: `第 ${hero.firstChapter} 回`,
      sources: [{ chapter: hero.firstChapter, note: '初登場' }],
    })),
}

const appearances: RankingCategory = {
  id: 'appearances',
  name: '出場回數',
  group: 'rank',
  description:
    '統計事件資料中提及該好漢的章回事件數（非逐字出場）。事件僅標註少數人物，故數字偏低。',
  basis: 'inferred',
  reliability: 'low',
  direction: 'desc',
  unit: '回',
  entries: entriesFromSources(
    events.reduce<Map<string, RankingSource[]>>((map, event) => {
      const source: RankingSource = { chapter: event.chapter, eventId: event.id, note: event.title }
      for (const heroId of event.heroIds) pushSource(map, heroId, source)
      return map
    }, new Map()),
  ),
}

const interactionCount: RankingCategory = {
  id: 'interactions',
  name: '互動數',
  group: 'relation',
  description:
    '人物關係資料中「具體劇情互動」的則數（非戰鬥數、非同場共事），宋江等主角因往來人物多而偏高。',
  basis: 'inferred',
  reliability: 'medium',
  direction: 'desc',
  unit: '事',
  entries: entriesFromSources(
    interactions.reduce<Map<string, RankingSource[]>>((map, interaction) => {
      const base = { chapter: interaction.chapter, eventId: interaction.eventId }
      pushSource(map, interaction.a, {
        ...base,
        note: `${interaction.label} · 與${figureName(interaction.b)}`,
      })
      pushSource(map, interaction.b, {
        ...base,
        note: `${interaction.label} · 與${figureName(interaction.a)}`,
      })
      return map
    }, new Map()),
  ),
}

const captured: RankingCategory = {
  id: 'captured',
  name: '被俘虜',
  group: 'battle',
  description:
    '書中被生擒、活捉之明載，逐條附出處。以關鍵詞掃描＋人工校訂，非全量，可靠度低。',
  basis: 'inferred',
  reliability: 'low',
  direction: 'desc',
  unit: '次',
  entries: countByFigure(
    captures.map((capture) => ({
      figureId: capture.figureId,
      source: {
        chapter: capture.chapter,
        note: [capture.note, capture.captorId ? `擒者：${figureName(capture.captorId)}` : '']
          .filter(Boolean)
          .join('・'),
        quote: capture.quote,
      },
    })),
  ),
}

function duelEntries(): RankingEntry[] {
  const map = new Map<string, { win: number; loss: number; sources: RankingSource[] }>()
  const get = (figureId: string) => {
    const record = map.get(figureId) ?? { win: 0, loss: 0, sources: [] }
    map.set(figureId, record)
    return record
  }
  for (const fight of fights) {
    const winner = get(fight.winner)
    winner.win += 1
    winner.sources.push({
      chapter: fight.chapter,
      note: `勝${figureName(fight.loser)}・${fight.mode}`,
      quote: fight.quote,
    })
    const loser = get(fight.loser)
    loser.loss += 1
    loser.sources.push({
      chapter: fight.chapter,
      note: `負於${figureName(fight.winner)}・${fight.mode}`,
      quote: fight.quote,
    })
  }
  return [...map.entries()]
    .map(([figureId, record]) => ({
      figureId,
      value: record.win,
      metrics: { win: record.win, loss: record.loss },
      sources: sortSources(record.sources),
    }))
    .sort(
      (left, right) =>
        right.value - left.value ||
        (right.metrics?.loss ?? 0) - (left.metrics?.loss ?? 0) ||
        left.sources[0].chapter - right.sources[0].chapter,
    )
}

const duel: RankingCategory = {
  id: 'duel',
  name: '打架勝負',
  group: 'battle',
  description:
    '單挑、陣前對陣、擂台與私鬥之勝負記錄（贏／輸同列，以勝場排序）。書中多為集體混戰，可稽考的個人單挑不多，可靠度低。',
  basis: 'inferred',
  reliability: 'low',
  direction: 'desc',
  metrics: [
    { key: 'win', name: '贏', unit: '場' },
    { key: 'loss', name: '輸', unit: '場' },
  ],
  entries: duelEntries(),
}

const killRecords: RankingCategory = {
  id: 'kills',
  name: '明載殺人記錄',
  group: 'battle',
  description:
    '以可稽考的殺人事件逐條計數（每事一筆，含「十餘人」等概數），非人頭總數；群戰不可考者從略，可靠度低。',
  basis: 'inferred',
  reliability: 'low',
  direction: 'desc',
  unit: '樁',
  entries: countByFigure(
    kills.map((kill) => ({
      figureId: kill.figureId,
      source: {
        chapter: kill.chapter,
        note: `${kill.victims.join('、')}（${kill.count ?? kill.victims.length}人）`,
        quote: kill.quote ?? kill.note,
      },
    })),
  ),
}

function campaignEntries(): RankingEntry[] {
  const map = new Map<
    string,
    { battles: number; win: number; loss: number; sources: RankingSource[] }
  >()
  for (const campaign of campaigns) {
    for (const figureId of campaign.participants) {
      const record = map.get(figureId) ?? { battles: 0, win: 0, loss: 0, sources: [] }
      record.battles += 1
      if (campaign.outcome === 'win') record.win += 1
      else record.loss += 1
      record.sources.push({
        chapter: campaign.fromChapter,
        note: `${campaign.name}・${campaign.outcome === 'win' ? '勝' : '敗'}`,
        quote: campaign.note,
      })
      map.set(figureId, record)
    }
  }
  return [...map.entries()]
    .map(([figureId, record]) => ({
      figureId,
      value: record.battles,
      metrics: { battles: record.battles, win: record.win, loss: record.loss },
      sources: sortSources(record.sources),
    }))
    .sort(
      (left, right) =>
        right.value - left.value || left.sources[0].chapter - right.sources[0].chapter,
    )
}

const campaign: RankingCategory = {
  id: 'campaign',
  name: '戰役參與與勝負',
  group: 'battle',
  description:
    '以資料庫所收主要戰役計：參戰＝勝＋敗。勝負指戰役結果（非個人功勞）。僅涵蓋 19 場主要戰役，可靠度低。',
  basis: 'inferred',
  reliability: 'low',
  direction: 'desc',
  metrics: [
    { key: 'battles', name: '參戰', unit: '役' },
    { key: 'win', name: '勝', unit: '役' },
    { key: 'loss', name: '敗', unit: '役' },
  ],
  entries: campaignEntries(),
}

export const derivedRankings: RankingCategory[] = [
  seatRank,
  debutTime,
  appearances,
  interactionCount,
  captured,
  duel,
  killRecords,
  campaign,
]

export const allRankings: RankingCategory[] = [...derivedRankings, ...curatedRankings]

export const rankingById = Object.fromEntries(
  allRankings.map((category) => [category.id, category]),
)

export const rankingEntryKeys = new Set(
  allRankings.flatMap((category) =>
    category.entries.map((entry) => entry.id ?? entry.figureId),
  ),
)

export const groupOrder = Object.fromEntries(
  rankingGroups.map((group) => [group.id, group.order]),
)

export function sortedGroups(categories: RankingCategory[]): string[] {
  const seen = new Set(categories.map((category) => category.group))
  return [...seen].sort((a, b) => (groupOrder[a] ?? 99) - (groupOrder[b] ?? 99))
}

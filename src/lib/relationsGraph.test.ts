import { describe, expect, it } from 'vitest'
import {
  buildGraph,
  currentRelationsForFigure,
  phaseAt,
  phaseRange,
  relationsBetween,
  resolvedRelationsAt,
} from './relationsGraph'
import { relationById } from '../data/relations'
import type { RelationPhase } from '../data/types'

describe('relation timeline', () => {
  it('resolves a relation phase at a chapter', () => {
    const relation = relationById['song-jiang-yan-po-xi']
    expect(phaseAt(relation, 20)?.type).toBe('marriage')
    expect(phaseAt(relation, 21)?.type).toBe('enmity')
    expect(phaseAt(relation, 22)).toBeNull()
  })

  it('keeps relationships with end chapters out of later chapters', () => {
    const atTwentyOne = resolvedRelationsAt(21)
    expect(
      atTwentyOne.find(({ relation }) => relation.id === 'song-jiang-yan-po-xi')?.phase.type,
    ).toBe('enmity')
    const atTwentyTwo = resolvedRelationsAt(22)
    expect(
      atTwentyTwo.some(({ relation }) => relation.id === 'song-jiang-yan-po-xi'),
    ).toBe(false)
  })

  it('filters current relations for a figure', () => {
    const atTwentySix = currentRelationsForFigure('wu-song', 26)
    expect(atTwentySix.some(({ relation }) => relation.id === 'wu-song-pan-jin-lian')).toBe(true)
    expect(atTwentySix.some(({ relation }) => relation.id === 'wu-song-xi-men-qing')).toBe(true)
  })

  it('switches a relationship from enmity to marriage', () => {
    const atFortyEight = currentRelationsForFigure('hu-san-niang', 48)
    expect(
      atFortyEight.find(({ relation }) => relation.id === 'hu-san-niang-wang-ying')?.phase.type,
    ).toBe('enmity')
    const atFifty = currentRelationsForFigure('hu-san-niang', 50)
    expect(
      atFifty.find(({ relation }) => relation.id === 'hu-san-niang-wang-ying')?.phase.type,
    ).toBe('marriage')
  })

  it('ends a relationship when its toChapter is reached', () => {
    expect(
      resolvedRelationsAt(60).some(({ relation }) => relation.id === 'chao-gai-shi-wen-gong'),
    ).toBe(true)
    expect(
      resolvedRelationsAt(61).some(({ relation }) => relation.id === 'chao-gai-shi-wen-gong'),
    ).toBe(false)
  })

  it('collects every interaction between two figures', () => {
    const between = relationsBetween('hu-san-niang', 'wang-ying')
    expect(between).toHaveLength(1)
    expect(between[0].phases.map((phase) => phase.type)).toEqual(['enmity', 'marriage'])
  })

  it('uses the latest phase in full-book mode', () => {
    const all = resolvedRelationsAt(1, { allChapters: true })
    const relation = all.find(({ relation }) => relation.id === 'hu-san-niang-wang-ying')
    expect(relation?.phase.type).toBe('marriage')
  })

  it('formats phase ranges', () => {
    expect(phaseRange({ fromChapter: 8, toChapter: 10 } as RelationPhase)).toBe('第8–10回')
    expect(phaseRange({ fromChapter: 8 } as RelationPhase)).toBe('第8回')
  })
})

describe('relation graph', () => {
  it('builds an overview graph from active relations', () => {
    const graph = buildGraph({ chapter: 50 })
    expect(graph.mode).toBe('overview')
    expect(graph.nodes.length).toBeGreaterThan(20)
    expect(graph.edges.length).toBeGreaterThan(20)
    expect(graph.nodes.every((node) => Number.isFinite(node.x) && Number.isFinite(node.y))).toBe(true)
  })

  it('builds a focus graph with one-hop neighbours', () => {
    const graph = buildGraph({ chapter: 50, focusId: 'hu-san-niang' })
    expect(graph.mode).toBe('focus')
    expect(graph.nodes.some((node) => node.figure.id === 'hu-san-niang')).toBe(true)
    expect(graph.nodes.some((node) => node.figure.id === 'wang-ying')).toBe(true)
    expect(graph.edges.every((edge) => edge.source === 'hu-san-niang' || edge.target === 'hu-san-niang')).toBe(true)
  })

  it('filters edges by relation type', () => {
    const graph = buildGraph({ chapter: 50, visibleTypes: new Set(['marriage']) })
    expect(graph.edges.every((edge) => edge.phase.type === 'marriage')).toBe(true)
  })

  it('excludes ended relations unless requested', () => {
    const withoutEnded = buildGraph({ chapter: 120, focusId: 'song-jiang' })
    const withEnded = buildGraph({ chapter: 120, focusId: 'song-jiang', includeEnded: true })
    expect(withEnded.edges.length).toBeGreaterThanOrEqual(withoutEnded.edges.length)
  })
})

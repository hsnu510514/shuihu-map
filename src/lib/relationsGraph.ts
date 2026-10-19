import { figureById } from '../data/figures'
import { relationTypeMeta, relations } from '../data/relations'
import type { Figure, Relation, RelationPhase, RelationType } from '../data/types'

export const TOTAL_CHAPTERS = 120
export const GRAPH_WIDTH = 1200
export const GRAPH_HEIGHT = 860

export const relationTypeOrder: RelationType[] = [
  'kinship',
  'marriage',
  'sworn',
  'master',
  'patronage',
  'friendship',
  'romance',
  'subordinate',
  'alliance',
  'rivalry',
  'enmity',
  'other',
]

export type FigureCluster =
  | 'tian-gang'
  | 'di-sha'
  | 'court'
  | 'rival'
  | 'rebel'
  | 'jianghu'

export interface ResolvedRelation {
  relation: Relation
  phase: RelationPhase
  ended: boolean
}

export interface GraphNode {
  figure: Figure
  cluster: FigureCluster
  degree: number
  depth: number
  isFocus: boolean
  x: number
  y: number
}

export interface GraphEdge {
  relation: Relation
  phase: RelationPhase
  source: string
  target: string
  ended: boolean
  parallelIndex: number
  parallelCount: number
}

export interface RelationGraph {
  mode: 'overview' | 'focus'
  focusId: string | null
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface ResolveOptions {
  allChapters?: boolean
  includeEnded?: boolean
  visibleTypes?: Set<RelationType>
}

export const clusterCenters: Record<FigureCluster, { x: number; y: number }> = {
  'tian-gang': { x: 290, y: 250 },
  court: { x: 600, y: 160 },
  rival: { x: 920, y: 260 },
  jianghu: { x: 240, y: 640 },
  'di-sha': { x: 600, y: 610 },
  rebel: { x: 950, y: 660 },
}

export function clusterOf(figure: Figure): FigureCluster {
  if (figure.kind === 'hero') return (figure.rank ?? 108) <= 36 ? 'tian-gang' : 'di-sha'
  if (['方臘', '田虎', '王慶', '遼'].includes(figure.affiliation)) return 'rebel'
  if (['祝家莊', '曾頭市', '扈家莊'].includes(figure.affiliation)) return 'rival'
  if (
    ['朝廷', '東京', '大名府', '江州', '青州', '高唐州', '滄州', '東平府'].includes(
      figure.affiliation,
    )
  ) {
    return 'court'
  }
  return 'jianghu'
}

export const clusterLabel: Record<FigureCluster, string> = {
  'tian-gang': '天罡',
  'di-sha': '地煞',
  court: '朝廷官府',
  rival: '祝莊曾市',
  rebel: '四方勢力',
  jianghu: '江湖人物',
}

export const clusterTone: Record<FigureCluster, string> = {
  'tian-gang': 'cinnabar',
  'di-sha': 'azurite',
  court: 'ink',
  rival: 'ochre',
  rebel: 'cinnabar',
  jianghu: 'moss',
}

function sortedPhases(relation: Relation): RelationPhase[] {
  return [...relation.phases].sort((a, b) => a.fromChapter - b.fromChapter)
}

export function phaseAt(relation: Relation, chapter: number): RelationPhase | null {
  return (
    sortedPhases(relation).find(
      (phase) => phase.fromChapter <= chapter && chapter <= (phase.toChapter ?? TOTAL_CHAPTERS),
    ) ?? null
  )
}

export function resolveRelation(
  relation: Relation,
  chapter: number,
  options: ResolveOptions = {},
): ResolvedRelation | null {
  const { allChapters = false, includeEnded = false, visibleTypes } = options
  const accepts = (phase: RelationPhase) => !visibleTypes || visibleTypes.has(phase.type)

  if (allChapters) {
    const phases = sortedPhases(relation)
    const phase = phases[phases.length - 1]
    return phase && accepts(phase) ? { relation, phase, ended: false } : null
  }

  const active = phaseAt(relation, chapter)
  if (active) return accepts(active) ? { relation, phase: active, ended: false } : null

  if (includeEnded) {
    const phases = sortedPhases(relation)
    const last = phases[phases.length - 1]
    if (last && (last.toChapter ?? TOTAL_CHAPTERS) < chapter && accepts(last)) {
      return { relation, phase: last, ended: true }
    }
  }
  return null
}

export function resolvedRelationsAt(
  chapter: number,
  options: ResolveOptions = {},
): ResolvedRelation[] {
  return relations
    .map((relation) => resolveRelation(relation, chapter, options))
    .filter((resolved): resolved is ResolvedRelation => resolved !== null)
}

export function currentRelationsForFigure(
  figureId: string,
  chapter: number,
  options: ResolveOptions = {},
): ResolvedRelation[] {
  return resolvedRelationsAt(chapter, options)
    .filter(({ relation }) => relation.a === figureId || relation.b === figureId)
    .sort((a, b) => {
      const typeDelta =
        relationTypeOrder.indexOf(a.phase.type) - relationTypeOrder.indexOf(b.phase.type)
      if (typeDelta !== 0) return typeDelta
      return a.phase.fromChapter - b.phase.fromChapter
    })
}

export function allRelationsForFigure(figureId: string): Relation[] {
  return relations.filter((relation) => relation.a === figureId || relation.b === figureId)
}

export function relationsBetween(a: string, b: string): Relation[] {
  return relations
    .filter(
      (relation) =>
        (relation.a === a && relation.b === b) || (relation.a === b && relation.b === a),
    )
    .sort((left, right) => {
      const leftStart = Math.min(...left.phases.map((phase) => phase.fromChapter))
      const rightStart = Math.min(...right.phases.map((phase) => phase.fromChapter))
      return leftStart - rightStart
    })
}

export function partnerOf(relation: Relation, figureId: string): string {
  return relation.a === figureId ? relation.b : relation.a
}

export function phaseRange(phase: RelationPhase): string {
  return phase.toChapter === undefined || phase.toChapter === phase.fromChapter
    ? `第${phase.fromChapter}回`
    : `第${phase.fromChapter}–${phase.toChapter}回`
}

export function relationTypeLabel(type: RelationType): string {
  return relationTypeMeta[type].label
}

interface SimNode {
  id: string
  cluster: FigureCluster
  x: number
  y: number
  vx: number
  vy: number
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function layoutOverview(
  nodes: Omit<GraphNode, 'x' | 'y'>[],
  edges: GraphEdge[],
): GraphNode[] {
  const byCluster = new Map<FigureCluster, Omit<GraphNode, 'x' | 'y'>[]>()
  for (const node of nodes) {
    byCluster.set(node.cluster, [...(byCluster.get(node.cluster) ?? []), node])
  }

  const simNodes: SimNode[] = []
  for (const [cluster, list] of byCluster) {
    const center = clusterCenters[cluster]
    const radius = Math.min(170, 18 + Math.sqrt(list.length) * 34)
    list.forEach((node, index) => {
      const angle = index * 2.399963229728653
      const spread = Math.sqrt((index + 0.5) / Math.max(1, list.length))
      simNodes.push({
        id: node.figure.id,
        cluster,
        x: center.x + Math.cos(angle) * radius * spread,
        y: center.y + Math.sin(angle) * radius * spread,
        vx: 0,
        vy: 0,
      })
    })
  }

  const simById = new Map(simNodes.map((node) => [node.id, node]))
  const simEdges = edges
    .map((edge) => ({
      a: simById.get(edge.source),
      b: simById.get(edge.target),
    }))
    .filter((edge): edge is { a: SimNode; b: SimNode } => Boolean(edge.a && edge.b))

  for (let iteration = 0; iteration < 170; iteration += 1) {
    for (let i = 0; i < simNodes.length; i += 1) {
      const a = simNodes[i]
      for (let j = i + 1; j < simNodes.length; j += 1) {
        const b = simNodes[j]
        let dx = b.x - a.x
        let dy = b.y - a.y
        let distanceSq = dx * dx + dy * dy
        if (distanceSq < 1) {
          dx = 0.4 + (i % 5) * 0.1
          dy = 0.3 + (j % 7) * 0.1
          distanceSq = dx * dx + dy * dy
        }
        const distance = Math.sqrt(distanceSq)
        const force = Math.min(4.2, 16500 / distanceSq)
        const fx = (dx / distance) * force
        const fy = (dy / distance) * force
        a.vx -= fx
        a.vy -= fy
        b.vx += fx
        b.vy += fy
      }
    }

    for (const edge of simEdges) {
      const dx = edge.b.x - edge.a.x
      const dy = edge.b.y - edge.a.y
      const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy))
      const force = (distance - 105) * 0.012
      const fx = (dx / distance) * force
      const fy = (dy / distance) * force
      edge.a.vx += fx
      edge.a.vy += fy
      edge.b.vx -= fx
      edge.b.vy -= fy
    }

    for (const node of simNodes) {
      const center = clusterCenters[node.cluster]
      node.vx += (center.x - node.x) * 0.007
      node.vy += (center.y - node.y) * 0.007
      node.vx += (GRAPH_WIDTH / 2 - node.x) * 0.0008
      node.vy += (GRAPH_HEIGHT / 2 - node.y) * 0.0008
      node.vx *= 0.82
      node.vy *= 0.82
      node.x = clamp(node.x + node.vx, 48, GRAPH_WIDTH - 48)
      node.y = clamp(node.y + node.vy, 62, GRAPH_HEIGHT - 54)
    }
  }

  return nodes.map((node) => {
    const simulated = simById.get(node.figure.id)
    return {
      ...node,
      x: simulated?.x ?? GRAPH_WIDTH / 2,
      y: simulated?.y ?? GRAPH_HEIGHT / 2,
    }
  })
}

function layoutFocus(
  nodes: Omit<GraphNode, 'x' | 'y'>[],
  edges: GraphEdge[],
  focusId: string,
): GraphNode[] {
  const center = { x: GRAPH_WIDTH / 2, y: GRAPH_HEIGHT / 2 }
  const adjacency = new Map<string, Set<string>>()
  for (const edge of edges) {
    if (!adjacency.has(edge.source)) adjacency.set(edge.source, new Set())
    if (!adjacency.has(edge.target)) adjacency.set(edge.target, new Set())
    adjacency.get(edge.source)?.add(edge.target)
    adjacency.get(edge.target)?.add(edge.source)
  }

  const depths = new Map<string, number>([[focusId, 0]])
  const queue = [focusId]
  while (queue.length > 0) {
    const current = queue.shift()!
    const depth = depths.get(current) ?? 0
    for (const next of adjacency.get(current) ?? []) {
      if (!depths.has(next)) {
        depths.set(next, depth + 1)
        queue.push(next)
      }
    }
  }

  const typeIndexFor = (figureId: string) => {
    const incident = edges.find(
      (edge) => edge.source === figureId || edge.target === figureId,
    )
    return incident ? relationTypeOrder.indexOf(incident.phase.type) : 99
  }

  const ordered = nodes
    .filter((node) => node.figure.id !== focusId)
    .sort((a, b) => {
      const depthDelta = (depths.get(a.figure.id) ?? 1) - (depths.get(b.figure.id) ?? 1)
      if (depthDelta !== 0) return depthDelta
      const typeDelta = typeIndexFor(a.figure.id) - typeIndexFor(b.figure.id)
      if (typeDelta !== 0) return typeDelta
      return a.figure.name.localeCompare(b.figure.name, 'zh-Hant')
    })

  const positions = new Map<string, { x: number; y: number }>()
  positions.set(focusId, center)

  const perRing = Math.max(14, Math.ceil(ordered.length / 5))
  ordered.forEach((node, index) => {
    const ringIndex = Math.floor(index / perRing)
    const indexInRing = index % perRing
    const countInRing = Math.min(perRing, ordered.length - ringIndex * perRing)
    const radius = 200 + ringIndex * 56
    const offset = -Math.PI / 2 + (ringIndex % 2) * (Math.PI / Math.max(1, perRing))
    const angle = offset + (indexInRing / Math.max(1, countInRing)) * Math.PI * 2
    positions.set(node.figure.id, {
      x: clamp(center.x + Math.cos(angle) * radius, 55, GRAPH_WIDTH - 55),
      y: clamp(center.y + Math.sin(angle) * radius, 65, GRAPH_HEIGHT - 58),
    })
  })

  return nodes.map((node) => {
    const position = positions.get(node.figure.id) ?? center
    return { ...node, x: position.x, y: position.y }
  })
}

export interface BuildGraphOptions {
  chapter: number
  allChapters?: boolean
  focusId?: string | null
  depth?: 1 | 2
  visibleTypes?: Set<RelationType>
  includeEnded?: boolean
}

export function buildGraph(options: BuildGraphOptions): RelationGraph {
  const {
    chapter,
    allChapters = false,
    focusId = null,
    depth = 1,
    visibleTypes,
    includeEnded = false,
  } = options
  const mode: 'overview' | 'focus' = focusId ? 'focus' : 'overview'
  const resolved = resolvedRelationsAt(chapter, {
    allChapters,
    includeEnded: mode === 'focus' && includeEnded,
    visibleTypes,
  })

  let selected = resolved
  if (mode === 'focus' && focusId) {
    const levelOne = new Set<string>([focusId])
    for (const item of resolved) {
      if (item.relation.a === focusId) levelOne.add(item.relation.b)
      if (item.relation.b === focusId) levelOne.add(item.relation.a)
    }
    selected = resolved.filter(({ relation }) => {
      if (depth === 1) return relation.a === focusId || relation.b === focusId
      return levelOne.has(relation.a) || levelOne.has(relation.b)
    })
  }

  const ids = new Set<string>()
  for (const { relation } of selected) {
    ids.add(relation.a)
    ids.add(relation.b)
  }
  if (focusId) ids.add(focusId)

  const degree = new Map<string, number>()
  for (const { relation } of selected) {
    degree.set(relation.a, (degree.get(relation.a) ?? 0) + 1)
    degree.set(relation.b, (degree.get(relation.b) ?? 0) + 1)
  }

  const nodesWithoutPosition: Omit<GraphNode, 'x' | 'y'>[] = [...ids]
    .map((id) => figureById[id])
    .filter((figure): figure is Figure => Boolean(figure))
    .map((figure) => ({
      figure,
      cluster: clusterOf(figure),
      degree: degree.get(figure.id) ?? 0,
      depth: 0,
      isFocus: figure.id === focusId,
    }))

  const pairCounts = new Map<string, number>()
  const pairIndexes = new Map<string, number>()
  const edges: GraphEdge[] = selected.map(({ relation, phase, ended }) => {
    const pairKey = [relation.a, relation.b].sort().join('|')
    const index = pairIndexes.get(pairKey) ?? 0
    pairIndexes.set(pairKey, index + 1)
    const count = pairCounts.get(pairKey) ?? 0
    pairCounts.set(pairKey, count + 1)
    return {
      relation,
      phase,
      source: relation.a,
      target: relation.b,
      ended,
      parallelIndex: index,
      parallelCount: Math.max(1, count + 1),
    }
  })

  for (const edge of edges) {
    const count = pairCounts.get([edge.relation.a, edge.relation.b].sort().join('|')) ?? 1
    edge.parallelCount = count
  }

  const nodes =
    mode === 'focus' && focusId
      ? layoutFocus(nodesWithoutPosition, edges, focusId)
      : layoutOverview(nodesWithoutPosition, edges)

  for (const node of nodes) {
    node.depth = 0
  }

  return { mode, focusId, nodes, edges }
}

export function nodeById(graph: RelationGraph): Map<string, GraphNode> {
  return new Map(graph.nodes.map((node) => [node.figure.id, node]))
}

export function graphNeighbors(graph: RelationGraph, figureId: string): Set<string> {
  const neighbors = new Set<string>()
  for (const edge of graph.edges) {
    if (edge.source === figureId) neighbors.add(edge.target)
    if (edge.target === figureId) neighbors.add(edge.source)
  }
  return neighbors
}

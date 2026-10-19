import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { select } from 'd3-selection'
import 'd3-transition'
import {
  zoom as createZoom,
  zoomIdentity,
  type ZoomBehavior,
  type ZoomTransform,
} from 'd3-zoom'
import { Maximize2, Minus, Plus, X } from 'lucide-react'
import { figureById } from '../../data/figures'
import { relationTypeMeta } from '../../data/relations'
import type { RelationType } from '../../data/types'
import { RelationPairPanel } from './RelationPairPanel'
import {
  allRelationsForFigure,
  buildGraph,
  clusterCenters,
  clusterLabel,
  clusterTone,
  GRAPH_HEIGHT,
  GRAPH_WIDTH,
  graphNeighbors,
  nodeById,
  relationTypeOrder,
  TOTAL_CHAPTERS,
  type FigureCluster,
  type GraphEdge,
  type GraphNode,
} from '../../lib/relationsGraph'
import { useAppStore } from '../../store/appStore'

interface RelationCanvasProps {
  allChapters: boolean
  depth: 1 | 2
  includeEnded: boolean
  visibleTypes: Set<RelationType>
  onAllChaptersChange: (value: boolean) => void
  onIncludeEndedChange: (value: boolean) => void
}

function edgePath(edge: GraphEdge, nodes: Map<string, GraphNode>): string | null {
  const source = nodes.get(edge.source)
  const target = nodes.get(edge.target)
  if (!source || !target) return null
  const dx = target.x - source.x
  const dy = target.y - source.y
  const length = Math.max(1, Math.hypot(dx, dy))
  const normalX = -dy / length
  const normalY = dx / length
  const offset =
    (edge.parallelIndex - (edge.parallelCount - 1) / 2) *
    (edge.parallelCount > 1 ? 34 : 0)
  const midX = (source.x + target.x) / 2 + normalX * offset
  const midY = (source.y + target.y) / 2 + normalY * offset
  return `M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`
}

function nodeRadius(node: GraphNode): number {
  const base = 13 + Math.min(9, Math.sqrt(node.degree) * 3)
  return base + (node.figure.kind === 'hero' ? 2 : 0) + (node.isFocus ? 7 : 0)
}

export function RelationCanvas({
  allChapters,
  depth,
  includeEnded,
  visibleTypes,
  onAllChaptersChange,
  onIncludeEndedChange,
}: RelationCanvasProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const sceneRef = useRef<SVGGElement>(null)
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null)
  const rafRef = useRef(0)
  const [transform, setTransform] = useState<ZoomTransform>(zoomIdentity)
  const [hoveredFigureId, setHoveredFigureId] = useState<string | null>(null)
  const [hoveredEdgeId, setHoveredEdgeId] = useState<string | null>(null)
  const [pairSelection, setPairSelection] = useState<{
    focusId: string
    partnerId: string
  } | null>(null)
  const [legendOpen, setLegendOpen] = useState(false)

  const chapter = useAppStore((state) => state.chapter)
  const selectedFigureId = useAppStore((state) => state.selectedFigureId)
  const selectFigure = useAppStore((state) => state.selectFigure)
  const setChapter = useAppStore((state) => state.setChapter)

  const graph = useMemo(
    () =>
      buildGraph({
        chapter,
        allChapters,
        focusId: selectedFigureId,
        depth,
        visibleTypes,
        includeEnded,
      }),
    [allChapters, chapter, depth, includeEnded, selectedFigureId, visibleTypes],
  )

  const nodeMap = useMemo(() => nodeById(graph), [graph])
  const focusFigure = graph.focusId ? figureById[graph.focusId] : null
  const pairPartner =
    pairSelection &&
    pairSelection.focusId === graph.focusId &&
    pairSelection.partnerId !== graph.focusId
      ? figureById[pairSelection.partnerId] ?? null
      : null
  const highlightedId = hoveredFigureId ?? graph.focusId
  const highlightedNeighbors = useMemo(
    () => (highlightedId ? graphNeighbors(graph, highlightedId) : new Set<string>()),
    [graph, highlightedId],
  )
  const dimOthers = graph.mode === 'overview' && Boolean(highlightedId)

  const resetView = useCallback(() => {
    const svg = svgRef.current
    const zoomBehavior = zoomRef.current
    if (!svg || !zoomBehavior) return
    select(svg).call(zoomBehavior.transform, zoomIdentity)
    setTransform(zoomIdentity)
  }, [])

  const zoomBy = useCallback((factor: number) => {
    const svg = svgRef.current
    const zoomBehavior = zoomRef.current
    if (!svg || !zoomBehavior) return
    select(svg).transition().duration(220).call(zoomBehavior.scaleBy, factor)
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const selection = select(svg)
    const zoomBehavior = createZoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 4.5])
      .filter((event) => {
        const target = event.target as Element | null
        return !target?.closest?.('.relation-node')
      })
      .on('zoom', (event) => {
        const next = event.transform as ZoomTransform
        if (sceneRef.current) sceneRef.current.setAttribute('transform', next.toString())
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0
            setTransform(next)
          })
        }
      })
    selection.call(zoomBehavior)
    selection.on('dblclick.zoom', null)
    zoomRef.current = zoomBehavior
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      selection.on('.zoom', null)
    }
  }, [])

  useEffect(() => {
    resetView()
  }, [allChapters, resetView, selectedFigureId])

  const showNodeLabel = (node: GraphNode) => {
    if (graph.mode === 'focus') return true
    if (node.isFocus || node.figure.id === hoveredFigureId) return true
    if (highlightedNeighbors.has(node.figure.id)) return true
    if (transform.k >= 1.7) return true
    const threshold = graph.nodes.length > 80 ? 8 : graph.nodes.length > 55 ? 5 : 3
    return node.degree >= threshold
  }

  const edgeIsPair = (edge: GraphEdge) =>
    Boolean(
      pairPartner &&
        graph.focusId &&
        ((edge.source === graph.focusId && edge.target === pairPartner.id) ||
          (edge.target === graph.focusId && edge.source === pairPartner.id)),
    )

  const edgeIsHot = (edge: GraphEdge) =>
    hoveredEdgeId === edge.relation.id ||
    Boolean(
      highlightedId &&
        (edge.source === highlightedId || edge.target === highlightedId),
    )

  const edgeIsDim = (edge: GraphEdge) =>
    pairPartner ? !edgeIsPair(edge) : dimOthers && !edgeIsHot(edge)

  const nodeIsDim = (node: GraphNode) =>
    pairPartner
      ? node.figure.id !== graph.focusId && node.figure.id !== pairPartner.id
      : dimOthers &&
        node.figure.id !== highlightedId &&
        !highlightedNeighbors.has(node.figure.id)

  const selectNode = (node: GraphNode) => {
    if (graph.mode === 'focus' && graph.focusId) {
      if (node.isFocus) {
        setPairSelection(null)
        return
      }
      setPairSelection({ focusId: graph.focusId, partnerId: node.figure.id })
      return
    }
    setPairSelection(null)
    selectFigure(node.figure.id)
  }

  const focusOnPartner = () => {
    if (!pairPartner) return
    setPairSelection(null)
    selectFigure(pairPartner.id)
  }

  const focusHasHistory = focusFigure
    ? allRelationsForFigure(focusFigure.id).length > 0
    : false
  const emptyTitle = focusFigure
    ? `${focusFigure.name}在本章沒有關係記載`
    : '本章尚無人物關係記載'
  const emptyBody = focusFigure
    ? focusHasHistory
      ? '試試切換到「全書」、顯示已結束的關係，或將時間軸移到其他章回。'
      : '第一版關係以具體劇情為主，這位人物目前尚未收錄關係條目。'
    : '第一版關係自第2回王進收史進為徒開始；可拖動底部時間軸，或直接跳到第71回大聚義。'

  return (
    <div className={`relation-shell${graph.mode === 'focus' ? ' is-focus' : ''}`}>
      <svg
        ref={svgRef}
        className="relation-svg"
        viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
        role="group"
        aria-label="水滸人物關係圖"
      >
        <desc>
          《水滸傳》主要人物之間的親屬、結義、師徒、恩義與仇敵關係；點選人物可聚焦其一至二度關聯，再點外圍人物查看兩人之間的互動。
        </desc>
        <defs>
          <filter id="relation-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.3" />
          </filter>
        </defs>

        <rect
          className="relation-canvas-bg"
          x={0}
          y={0}
          width={GRAPH_WIDTH}
          height={GRAPH_HEIGHT}
          onClick={() => {
            if (pairPartner) setPairSelection(null)
            else selectFigure(null)
          }}
        />

        <g ref={sceneRef} className="relation-scene">
          {graph.mode === 'overview' && (
            <g className="relation-cluster-labels" aria-hidden="true">
              {(Object.keys(clusterCenters) as FigureCluster[]).map((cluster) => {
                const center = clusterCenters[cluster]
                return (
                  <text
                    key={cluster}
                    className={`relation-cluster-label tone-${clusterTone[cluster]}`}
                    x={center.x}
                    y={center.y + 8}
                    textAnchor="middle"
                  >
                    {clusterLabel[cluster]}
                  </text>
                )
              })}
            </g>
          )}

          <g className="relation-edges">
            {graph.edges.map((edge) => {
              const path = edgePath(edge, nodeMap)
              if (!path) return null
              const meta = relationTypeMeta[edge.phase.type]
              return (
                <g
                  key={edge.relation.id}
                  className={`relation-edge-group tone-${meta.tone}${
                    edge.ended ? ' is-ended' : ''
                  }${edgeIsHot(edge) ? ' is-hot' : ''}${edgeIsPair(edge) ? ' is-pair' : ''}${
                    edgeIsDim(edge) ? ' is-dim' : ''
                  }`}
                  onPointerEnter={() => setHoveredEdgeId(edge.relation.id)}
                  onPointerLeave={() => setHoveredEdgeId(null)}
                >
                  <path className="relation-edge-hit" d={path} />
                  <path
                    className={`relation-edge${edge.phase.certainty === 'inferred' ? ' is-inferred' : ''}`}
                    d={path}
                  />
                </g>
              )
            })}
          </g>

          <g className="relation-nodes">
            {graph.nodes.map((node) => {
              const radius = nodeRadius(node)
              const isHero = node.figure.kind === 'hero'
              const label = node.figure.name
              return (
                <g
                  key={node.figure.id}
                  className={`relation-node relation-node-${node.figure.kind} cluster-${node.cluster} tone-${clusterTone[node.cluster]}${
                    node.isFocus ? ' is-focus' : ''
                  }${node.figure.id === hoveredFigureId ? ' is-hover' : ''}${
                    node.figure.id === pairPartner?.id ? ' is-pair' : ''
                  }${nodeIsDim(node) ? ' is-dim' : ''}`}
                  transform={`translate(${node.x},${node.y})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.figure.name}，${node.degree} 條關係，${
                    node.isFocus
                      ? '中心人物'
                      : graph.mode === 'focus'
                        ? '點擊查看兩人互動'
                        : '點擊聚焦'
                  }`}
                  onClick={(event) => {
                    event.stopPropagation()
                    selectNode(node)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      selectNode(node)
                    }
                  }}
                  onPointerEnter={() => setHoveredFigureId(node.figure.id)}
                  onPointerLeave={() => setHoveredFigureId(null)}
                  onFocus={() => setHoveredFigureId(node.figure.id)}
                  onBlur={() => setHoveredFigureId(null)}
                >
                  <title>
                    {node.figure.name}
                    {node.figure.nickname ? `（${node.figure.nickname}）` : ''} ·{' '}
                    {node.degree} 條關係
                  </title>
                  {(node.isFocus ||
                    node.figure.id === hoveredFigureId ||
                    node.figure.id === pairPartner?.id) && (
                    <circle className="relation-node-glow" r={radius + 10} />
                  )}
                  <circle className="relation-node-hit" r={radius + 8} />
                  <circle className="relation-node-body" r={radius} />
                  {isHero && (
                    <text className="relation-node-rank" y={4} textAnchor="middle">
                      {node.figure.rank}
                    </text>
                  )}
                  {!isHero && (
                    <text className="relation-node-glyph" y={5} textAnchor="middle">
                      {node.figure.name.slice(0, 1)}
                    </text>
                  )}
                  {showNodeLabel(node) && (
                    <g className="relation-node-label-group">
                      <text className="relation-node-label" y={radius + 16} textAnchor="middle">
                        {label}
                      </text>
                      {node.isFocus && node.figure.nickname && (
                        <text
                          className="relation-node-sublabel"
                          y={radius + 31}
                          textAnchor="middle"
                        >
                          {node.figure.nickname}
                        </text>
                      )}
                    </g>
                  )}
                </g>
              )
            })}
          </g>
        </g>
      </svg>

      <div className="relation-canvas-info">
        <span className="relation-canvas-era">
          {allChapters ? `全書 · 第1–${TOTAL_CHAPTERS}回` : `第 ${chapter} 回`}
        </span>
        <strong>
          {focusFigure
            ? `${focusFigure.name} · ${depth === 1 ? '一度' : '二度'}關聯`
            : '人物關係全覽'}
        </strong>
        <span>
          {graph.nodes.length} 人 · {graph.edges.length} 條關係
        </span>
      </div>

      <div className="relation-canvas-controls" aria-label="關係圖控制">
        <button type="button" onClick={() => zoomBy(1.35)} aria-label="放大關係圖">
          <Plus size={17} />
        </button>
        <button type="button" onClick={() => zoomBy(1 / 1.35)} aria-label="縮小關係圖">
          <Minus size={17} />
        </button>
        <button type="button" onClick={resetView} aria-label="重設視角">
          <Maximize2 size={16} />
        </button>
      </div>

      <button
        type="button"
        className="relation-legend-toggle"
        onClick={() => setLegendOpen((value) => !value)}
        aria-expanded={legendOpen}
      >
        圖例
      </button>
      <div className={`relation-legend${legendOpen ? ' is-open' : ''}`}>
        <div className="relation-legend-head">
          <span>關係與人物</span>
          <button type="button" onClick={() => setLegendOpen(false)} aria-label="關閉圖例">
            <X size={15} />
          </button>
        </div>
        <div className="relation-legend-types">
          {relationTypeOrder.map((type) => (
            <span key={type} className={`relation-legend-type tone-${relationTypeMeta[type].tone}`}>
              <i />
              {relationTypeMeta[type].label}
            </span>
          ))}
        </div>
        <div className="relation-legend-nodes">
          <span>
            <i className="legend-node hero" />
            好漢（圈內為座次）
          </span>
          <span>
            <i className="legend-node character" />
            其他人物
          </span>
        </div>
        <div className="relation-legend-clusters">
          {(Object.keys(clusterCenters) as FigureCluster[]).map((cluster) => (
            <span key={cluster} className={`tone-${clusterTone[cluster]}`}>
              <i className="cluster-dot" />
              {clusterLabel[cluster]}
            </span>
          ))}
        </div>
        <p>
          線色表示關係類型；虛線為已結束或推定。聚焦時點選外圍人物，會先顯示兩人之間的互動紀錄，再可跳轉以對方為中心。
        </p>
      </div>

      {pairPartner && focusFigure && (
        <RelationPairPanel
          focusFigure={focusFigure}
          partner={pairPartner}
          chapter={chapter}
          allChapters={allChapters}
          onClose={() => setPairSelection(null)}
          onFocusPartner={focusOnPartner}
        />
      )}

      {graph.edges.length === 0 && (
        <div className="relation-empty" role="status">
          <strong>{emptyTitle}</strong>
          <p>{emptyBody}</p>
          <div className="relation-empty-actions">
            {!allChapters && (
              <button type="button" onClick={() => onAllChaptersChange(true)}>
                顯示全書
              </button>
            )}
            {focusFigure && !includeEnded && focusHasHistory && (
              <button type="button" onClick={() => onIncludeEndedChange(true)}>
                顯示已結束關係
              </button>
            )}
            {!focusFigure && !allChapters && (
              <button type="button" onClick={() => setChapter(71)}>
                跳到第71回
              </button>
            )}
            {focusFigure && (
              <button type="button" onClick={() => selectFigure(null)}>
                回到全覽
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

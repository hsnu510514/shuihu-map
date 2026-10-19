import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { select } from 'd3-selection'
import 'd3-transition'
import { line, curveCatmullRom, curveCatmullRomClosed } from 'd3-shape'
import {
  zoom as createZoom,
  zoomIdentity,
  type ZoomBehavior,
  type ZoomTransform,
} from 'd3-zoom'
import { Maximize2, Minus, Plus, Tags, X } from 'lucide-react'
import { landGeo } from '../../data/map/land'
import { admin1Geo } from '../../data/map/admin1'
import {
  frontiers,
  lakes,
  mapLabels,
  rivers,
} from '../../data/map/features'
import { places, placeById } from '../../data/places'
import { eventsForChapter, eventById } from '../../data/events'
import { anchorsForHero, resolveHeroState, statesForChapter, type HeroState } from '../../data/heroPositions'
import { arcForChapter } from '../../data/arcs'
import { chapterByNumber } from '../../data/chapters'
import { useAppStore } from '../../store/appStore'
import { createProjection } from '../../map/projection'
import { useReducedMotion } from '../../lib/useReducedMotion'
import type { Place, StoryEvent } from '../../data/types'


const accuracyLabel: Record<Place['accuracy'], string> = {
  exact: '治所明確',
  approximate: '位置約略',
  fictional: '小說虛構',
  anachronistic: '小說與史實不符',
}

const kindLabel: Record<Place['kind'], string> = {
  capital: '京城',
  prefecture: '州府',
  county: '縣治',
  town: '市鎮',
  village: '村莊',
  mountain: '山岳',
  water: '水泊',
  pass: '關隘',
  temple: '寺廟',
  site: '遺跡',
}

const fontSizeFor = (priority: Place['priority']) =>
  priority === 1 ? 16 : priority === 2 ? 15 : 14

const minZoomFor = (priority: Place['priority']) =>
  priority === 1 ? 0 : priority === 2 ? 3.0 : priority === 3 ? 3.8 : 4.6

interface LabelBox {
  x: number
  y: number
  w: number
  h: number
}

interface PlacedLabel extends LabelBox {
  place: Place
  fontSize: number
}

function overlaps(a: LabelBox, b: LabelBox): boolean {
  return !(
    a.x + a.w < b.x ||
    b.x + b.w < a.x ||
    a.y + a.h < b.y ||
    b.y + b.h < a.y
  )
}

function layoutLabels(
  placesToLabel: Place[],
  project: (coord: [number, number]) => [number, number],
  transform: ZoomTransform,
  width: number,
  height: number,
  activeIds: Set<string>,
  selectedId: string | null,
  showLabels: boolean,
): PlacedLabel[] {
  if (!showLabels) return []
  const compact = width < 620
  const compactMajor = new Set([
    'dongjing',
    'liangshanpo',
    'jiangzhou',
    'hangzhou',
  ])
  const placed: PlacedLabel[] = []
  const boxes: LabelBox[] = []

  const ordered = [...placesToLabel].sort((a, b) => {
    if (a.id === selectedId) return -1
    if (b.id === selectedId) return 1
    return a.priority - b.priority
  })

  for (const place of ordered) {
    const isSelected = place.id === selectedId
    const isActive = activeIds.has(place.id)
    if (
      compact &&
      !isSelected &&
      !isActive &&
      !compactMajor.has(place.id) &&
      transform.k < 2.8
    ) {
      continue
    }
    if (!isSelected && !isActive && transform.k < minZoomFor(place.priority)) {
      continue
    }
    if (!isSelected && !isActive && place.priority === 4 && transform.k < 4.6) {
      continue
    }
    if (isActive && transform.k < 1.1 && place.priority > 2) continue

    const [baseX, baseY] = project(place.coord)
    const [x, y] = transform.apply([baseX, baseY])
    if (x < -30 || x > width + 30 || y < -30 || y > height + 30) continue

    const fontSize = isSelected ? 15 : fontSizeFor(place.priority)
    const w = place.name.length * fontSize + 10
    const h = fontSize + 5
    const candidates: LabelBox[] = [
      { x: x + 10, y: y - h / 2, w, h },
      { x: x - w - 10, y: y - h / 2, w, h },
      { x: x - w / 2, y: y - h - 10, w, h },
      { x: x - w / 2, y: y + 10, w, h },
      { x: x + 12, y: y - h - 8, w, h },
      { x: x - w - 12, y: y + 4, w, h },
    ]

    let chosen: LabelBox | null = null
    for (const candidate of candidates) {
      if (
        candidate.x < 4 ||
        candidate.y < 4 ||
        candidate.x + candidate.w > width - 4 ||
        candidate.y + candidate.h > height - 4
      ) {
        continue
      }
      if (boxes.some((box) => overlaps(box, candidate))) continue
      chosen = candidate
      break
    }

    if (!chosen) {
      if (isSelected || isActive) {
        const fallback = candidates[0]
        chosen = {
          ...fallback,
          x: Math.min(Math.max(fallback.x, 4), width - fallback.w - 4),
          y: Math.min(Math.max(fallback.y, 4), height - fallback.h - 4),
        }
      } else {
        continue
      }
    }

    boxes.push(chosen)
    placed.push({ place, fontSize, ...chosen })
  }

  return placed
}

function mountainGlyph(x: number, y: number, scale: number): string {
  const s = scale
  return [
    `M ${x - 9 * s} ${y + 4 * s}`,
    `L ${x - 5 * s} ${y - 3 * s}`,
    `L ${x - 2 * s} ${y + 1 * s}`,
    `L ${x + 1 * s} ${y - 6 * s}`,
    `L ${x + 5 * s} ${y + 1 * s}`,
    `L ${x + 8 * s} ${y - 2 * s}`,
    `L ${x + 11 * s} ${y + 4 * s}`,
  ].join(' ')
}

function PointerIcon({ kind }: { kind: Place['kind'] }) {
  if (kind === 'capital') {
    return (
      <>
        <rect x={-4.8} y={-4.8} width={9.6} height={9.6} className="marker-fill" />
        <rect x={-2.1} y={-2.1} width={4.2} height={4.2} className="marker-inner" />
      </>
    )
  }
  if (kind === 'prefecture') {
    return <rect x={-3.6} y={-3.6} width={7.2} height={7.2} className="marker-fill" />
  }
  if (kind === 'mountain') {
    return <path d="M 0 -5.4 L 5.4 3.8 L -5.4 3.8 Z" className="marker-fill" />
  }
  if (kind === 'water') {
    return (
      <path
        d="M -5.4 0.4 Q -2.8 -3.4 0 0.4 T 5.4 0.4"
        className="marker-water"
      />
    )
  }
  if (kind === 'pass') {
    return (
      <path
        d="M -4.8 4.2 L -4.8 -2.4 L 0 -5.2 L 4.8 -2.4 L 4.8 4.2 M -2.8 4.2 L -2.8 0.2 L 2.8 0.2 L 2.8 4.2"
        className="marker-line"
      />
    )
  }
  if (kind === 'temple') {
    return <path d="M 0 -5.2 L 4.8 0 L 0 5.2 L -4.8 0 Z" className="marker-fill" />
  }
  if (kind === 'site') {
    return <circle cx={0} cy={0} r={2.6} className="marker-fill" />
  }
  return <circle cx={0} cy={0} r={3} className="marker-fill" />
}

function accuracyExtra(place: Place) {
  if (place.accuracy === 'fictional') {
    return <circle cx={0} cy={0} r={8} className="marker-accuracy marker-accuracy-fictional" />
  }
  if (place.accuracy === 'approximate') {
    return <circle cx={0} cy={0} r={6.2} className="marker-accuracy marker-accuracy-approx" />
  }
  if (place.accuracy === 'anachronistic') {
    return (
      <>
        <circle cx={0} cy={0} r={6.4} className="marker-accuracy marker-accuracy-anachronistic" />
        <circle cx={0} cy={0} r={8.2} className="marker-accuracy marker-accuracy-anachronistic" />
      </>
    )
  }
  return null
}

function eventsAtPlace(placeId: string): StoryEvent[] {
  return Object.values(eventById).filter((event) => event.placeIds.includes(placeId))
}

export function MapCanvas() {
  const shellRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const geoRef = useRef<SVGGElement>(null)
  const overlayRef = useRef<SVGGElement>(null)
  const zoomRef = useRef<ZoomBehavior<SVGSVGElement, unknown> | null>(null)
  const rafRef = useRef<number>(0)
  const [size, setSize] = useState({ width: 1000, height: 680 })
  const [view, setView] = useState<ZoomTransform>(zoomIdentity)
  const [showLabels, setShowLabels] = useState(true)
  const [legendOpen, setLegendOpen] = useState(false)
  const [layers, setLayers] = useState({
    capitals: true,
    prefectures: true,
    towns: true,
    mountains: true,
    waters: true,
    passes: true,
    sites: true,
    rivers: true,
    lakes: true,
    boundaries: true,
    heroes: true,
    routes: true,
    trail: true,
  })
  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((current) => ({ ...current, [key]: !current[key] }))
  }
  const placeGroup = (kind: Place['kind']) => {
    if (kind === 'capital') return 'capitals' as const
    if (kind === 'prefecture') return 'prefectures' as const
    if (kind === 'county' || kind === 'town' || kind === 'village') return 'towns' as const
    if (kind === 'mountain') return 'mountains' as const
    if (kind === 'water') return 'waters' as const
    if (kind === 'pass') return 'passes' as const
    return 'sites' as const
  }
  const reducedMotion = useReducedMotion()

  const chapter = useAppStore((state) => state.chapter)
  const mode = useAppStore((state) => state.mode)
  const selectedEventId = useAppStore((state) => state.selectedEventId)
  const selectedPlaceId = useAppStore((state) => state.selectedPlaceId)
  const selectedHeroId = useAppStore((state) => state.selectedHeroId)
  const selectPlace = useAppStore((state) => state.selectPlace)
  const selectEvent = useAppStore((state) => state.selectEvent)
  const selectHero = useAppStore((state) => state.selectHero)
  const setChapter = useAppStore((state) => state.setChapter)

  const selectedEvent = selectedEventId ? eventById[selectedEventId] : null
  const selectedPlace = selectedPlaceId ? placeById[selectedPlaceId] : null
  const chapterEvents = eventsForChapter(chapter)
  const heroStates = useMemo(
    () => (mode === 'heroes' ? statesForChapter(chapter) : []),
    [chapter, mode],
  )
  const selectedHeroState = useMemo(() => {
    if (!selectedHeroId) return null
    return (
      heroStates.find((state) => state.hero.id === selectedHeroId) ??
      resolveHeroState(selectedHeroId, chapter)
    )
  }, [chapter, heroStates, selectedHeroId])
  const heroGroups = useMemo(() => {
    const map = new Map<string, HeroState[]>()
    for (const state of heroStates) {
      if (
        (state.status === 'present' ||
          state.status === 'traveling' ||
          state.status === 'detached') &&
        state.placeId
      ) {
        map.set(state.placeId, [...(map.get(state.placeId) ?? []), state])
      }
    }
    return [...map.entries()]
      .map(([placeId, states]) => ({
        placeId,
        states,
        hasTianGang: states.some((state) => state.hero.rank <= 36),
      }))
      .sort((a, b) => b.states.length - a.states.length)
  }, [heroStates])

  const activeIds = useMemo(() => {
    const ids = new Set<string>()
    if (mode === 'heroes') {
      for (const group of heroGroups) ids.add(group.placeId)
      if (selectedHeroState?.placeId) ids.add(selectedHeroState.placeId)
      return ids
    }
    for (const event of chapterEvents) for (const id of event.placeIds) ids.add(id)
    if (selectedEvent) {
      for (const id of selectedEvent.placeIds) ids.add(id)
      for (const id of selectedEvent.route ?? []) ids.add(id)
    }
    return ids
  }, [chapterEvents, heroGroups, mode, selectedEvent, selectedHeroState])

  const bundle = useMemo(
    () => createProjection(size.width, size.height),
    [size.width, size.height],
  )
  const { projection, path } = bundle

  const project = useCallback(
    (coord: [number, number]): [number, number] => {
      const point = projection(coord)
      return point ? [point[0], point[1]] : [0, 0]
    },
    [projection],
  )

  useEffect(() => {
    const element = shellRef.current
    if (!element) return
    const observer = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect
      if (!rect) return
      setSize({
        width: Math.max(360, Math.round(rect.width)),
        height: Math.max(360, Math.round(rect.height)),
      })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const selection = select(svg)
    const zoomBehavior = createZoom<SVGSVGElement, unknown>()
      .scaleExtent([0.9, 9])
      .on('zoom', (event) => {
        const transform = event.transform as ZoomTransform
        if (geoRef.current) {
          geoRef.current.setAttribute('transform', transform.toString())
        }
        if (overlayRef.current) {
          overlayRef.current.setAttribute('transform', transform.toString())
        }
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(() => {
            rafRef.current = 0
            setView(transform)
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
    const svg = svgRef.current
    const zoomBehavior = zoomRef.current
    if (!svg || !zoomBehavior) return
    const selection = select(svg)
    selection.call(zoomBehavior.transform, zoomIdentity)
    setView(zoomIdentity)
  }, [size.width, size.height])

  const flyTo = useCallback(
    (coord: [number, number], scale: number) => {
      const svg = svgRef.current
      const zoomBehavior = zoomRef.current
      if (!svg || !zoomBehavior) return
      const [px, py] = project(coord)
      const target = zoomIdentity
        .translate(size.width / 2, size.height / 2)
        .scale(scale)
        .translate(-px, -py)
      const selection = select(svg)
      if (reducedMotion) {
        selection.call(zoomBehavior.transform, target)
      } else {
        selection
          .transition()
          .duration(680)
          .call(zoomBehavior.transform, target)
      }
    },
    [project, reducedMotion, size.height, size.width],
  )

  useEffect(() => {
    if (mode !== 'story' || !selectedEvent) return
    const place = placeById[selectedEvent.placeIds[0]]
    if (place) flyTo(place.coord, 2.8)
  }, [flyTo, mode, selectedEvent])

  const heroClusterLayout = useMemo(() => {
    if (mode !== 'heroes') return []
    const nodes = heroGroups
      .map((group) => {
        const place = placeById[group.placeId]
        if (!place) return null
        const [px, py] = project(place.coord)
        const [screenX, screenY] = view.apply([px, py])
        if (
          screenX < -40 ||
          screenX > size.width + 40 ||
          screenY < -40 ||
          screenY > size.height + 40
        ) {
          return null
        }
        return {
          ...group,
          place,
          baseX: px,
          baseY: py,
          screenX,
          screenY,
          x: screenX,
          y: screenY,
          radius: Math.min(28, 12 + Math.sqrt(group.states.length) * 2.8),
        }
      })
      .filter(
        (node): node is NonNullable<typeof node> => Boolean(node),
      )

    for (let iteration = 0; iteration < 6; iteration += 1) {
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          let dx = b.x - a.x
          let dy = b.y - a.y
          let distance = Math.hypot(dx, dy)
          const minDistance = a.radius + b.radius + 4
          if (distance >= minDistance) continue
          if (distance < 0.001) {
            dx = i % 2 === 0 ? 1 : -1
            dy = j % 2 === 0 ? 1 : -1
            distance = Math.hypot(dx, dy)
          }
          const push = (minDistance - distance) / 2
          a.x -= (dx / distance) * push
          a.y -= (dy / distance) * push
          b.x += (dx / distance) * push
          b.y += (dy / distance) * push
        }
      }
      for (const node of nodes) {
        node.x = Math.min(size.width - 18, Math.max(18, node.x))
        node.y = Math.min(size.height - 18, Math.max(18, node.y))
      }
    }

    return nodes
  }, [heroGroups, mode, project, size.height, size.width, view])
  useEffect(() => {
    if (!selectedPlace) return
    flyTo(selectedPlace.coord, 3.2)
  }, [flyTo, selectedPlace])

  useEffect(() => {
    if (mode !== 'heroes' || !selectedHeroState?.placeId) return
    const place = placeById[selectedHeroState.placeId]
    if (place) flyTo(place.coord, 2.9)
  }, [flyTo, mode, selectedHeroState])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') selectPlace(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectPlace])

  const landPath = useMemo(() => path(landGeo) ?? '', [path])
  const adminPath = useMemo(() => path(admin1Geo) ?? '', [path])

  const riverPaths = useMemo(() => {
    const lineGen = line<[number, number]>()
      .x((point) => point[0])
      .y((point) => point[1])
      .curve(curveCatmullRom.alpha(0.35))
    return [...rivers, ...frontiers].map((river) => ({
      ...river,
      d:
        lineGen(
          river.points
            .map((coord) => projection(coord))
            .filter((point): point is [number, number] => Boolean(point)),
        ) ?? '',
    }))
  }, [projection])

  const lakePaths = useMemo(() => {
    const lineGen = line<[number, number]>()
      .x((point) => point[0])
      .y((point) => point[1])
      .curve(curveCatmullRomClosed.alpha(0.4))
    return lakes.map((lake) => ({
      ...lake,
      d:
        lineGen(
          lake.points
            .map((coord) => projection(coord))
            .filter((point): point is [number, number] => Boolean(point)),
        ) ?? '',
    }))
  }, [projection])

  const routeData = useMemo(() => {
    if (mode !== 'story') return null
    if (!selectedEvent?.route || selectedEvent.route.length < 2) return null
    const coords = selectedEvent.route
      .map((id) => placeById[id]?.coord)
      .filter((coord): coord is [number, number] => Boolean(coord))
    const projected = coords
      .map((coord) => projection(coord))
      .filter((point): point is [number, number] => Boolean(point))
    if (projected.length < 2) return null
    const lineGen = line<[number, number]>()
      .x((point) => point[0])
      .y((point) => point[1])
      .curve(curveCatmullRom.alpha(0.35))
    return {
      d: lineGen(projected) ?? '',
      points: projected,
    }
  }, [mode, projection, selectedEvent])

  const heroTrail = useMemo(() => {
    if (mode !== 'heroes' || !selectedHeroState) return null
    const anchors = anchorsForHero(selectedHeroState.hero.id).filter(
      (anchor) => anchor.chapter <= chapter && anchor.placeId,
    )
    const deduped: typeof anchors = []
    for (const anchor of anchors) {
      if (deduped[deduped.length - 1]?.placeId !== anchor.placeId) deduped.push(anchor)
    }
    const coords = deduped
      .map((anchor) => (anchor.placeId ? placeById[anchor.placeId]?.coord : undefined))
      .filter((coord): coord is [number, number] => Boolean(coord))
    if (coords.length < 2) return null
    const projected = coords
      .map((coord) => projection(coord))
      .filter((point): point is [number, number] => Boolean(point))
    if (projected.length < 2) return null
    const lineGen = line<[number, number]>()
      .x((point) => point[0])
      .y((point) => point[1])
      .curve(curveCatmullRom.alpha(0.3))
    return {
      d: lineGen(projected) ?? '',
      points: projected,
    }
  }, [chapter, mode, projection, selectedHeroState])

  const labelPlaces = useMemo(
    () => places.filter((place) => layers[placeGroup(place.kind)]),
    [layers],
  )

  const labels = useMemo(
    () =>
      layoutLabels(
        labelPlaces,
        project,
        view,
        size.width,
        size.height,
        activeIds,
        selectedPlaceId,
        showLabels,
      ),
    [activeIds, labelPlaces, project, selectedPlaceId, showLabels, size.height, size.width, view],
  )

  const mountainPlaces = useMemo(
    () => places.filter((place) => place.kind === 'mountain'),
    [],
  )

  const popupPosition = useMemo(() => {
    if (!selectedPlace) return null
    const [px, py] = project(selectedPlace.coord)
    const [x, y] = view.apply([px, py])
    const width = 330
    const height = 248
    return {
      x: Math.min(Math.max(x + 18, 12), Math.max(12, size.width - width - 12)),
      y: Math.min(Math.max(y - 36, 12), Math.max(12, size.height - height - 12)),
    }
  }, [project, selectedPlace, size.height, size.width, view])

  const routeLabel = useMemo(() => {
    if (!routeData || routeData.points.length < 2) return null
    const mid = routeData.points[Math.floor(routeData.points.length / 2)]
    return { x: mid[0], y: mid[1] - 10 }
  }, [routeData])

  const scaleBar = useMemo(() => {
    const one = project([116, 35])
    const two = project([117.1, 35])
    const a = view.apply(one)
    const b = view.apply(two)
    return Math.min(140, Math.max(36, Math.abs(b[0] - a[0])))
  }, [project, view])

  const zoomBy = (factor: number) => {
    const svg = svgRef.current
    const zoomBehavior = zoomRef.current
    if (!svg || !zoomBehavior) return
    select(svg)
      .transition()
      .duration(reducedMotion ? 0 : 220)
      .call(zoomBehavior.scaleBy, factor)
  }

  const resetView = () => {
    const svg = svgRef.current
    const zoomBehavior = zoomRef.current
    if (!svg || !zoomBehavior) return
    select(svg)
      .transition()
      .duration(reducedMotion ? 0 : 520)
      .call(zoomBehavior.transform, zoomIdentity)
  }

  const arc = arcForChapter(chapter)
  const chapterTitle = chapterByNumber[chapter]?.title ?? ''
  const orderedPlaces = useMemo(() => {
    return [...places].sort((a, b) => {
      const score = (place: Place) =>
        place.id === selectedPlaceId
          ? 3
          : place.id === selectedHeroState?.placeId
            ? 2.5
            : place.id === selectedEvent?.placeIds[0]
              ? 2
              : activeIds.has(place.id)
                ? 1
                : 0
      return score(a) - score(b)
    })
  }, [activeIds, selectedEvent, selectedHeroState, selectedPlaceId])

  const inv = view.k > 0 ? 1 / view.k : 1

  const legendItems: Array<{
    key: string
    label: string
    checked: boolean
    onToggle: () => void
    icon: ReactNode
  }> = [
    {
      key: 'capitals',
      label: '京城',
      checked: layers.capitals,
      onToggle: () => toggleLayer('capitals'),
      icon: (
        <svg viewBox="-10 -10 20 20">
          <rect x={-4.8} y={-4.8} width={9.6} height={9.6} className="marker-fill" />
          <rect x={-2.1} y={-2.1} width={4.2} height={4.2} className="marker-inner" />
        </svg>
      ),
    },
    {
      key: 'prefectures',
      label: '州府',
      checked: layers.prefectures,
      onToggle: () => toggleLayer('prefectures'),
      icon: (
        <svg viewBox="-10 -10 20 20">
          <rect x={-3.6} y={-3.6} width={7.2} height={7.2} className="marker-fill" />
        </svg>
      ),
    },
    {
      key: 'towns',
      label: '縣鎮・村莊',
      checked: layers.towns,
      onToggle: () => toggleLayer('towns'),
      icon: (
        <svg viewBox="-10 -10 20 20">
          <circle r={3} className="marker-fill" />
        </svg>
      ),
    },
    {
      key: 'mountains',
      label: '山岳',
      checked: layers.mountains,
      onToggle: () => toggleLayer('mountains'),
      icon: (
        <svg viewBox="-10 -10 20 20">
          <path d="M 0 -5.4 L 5.4 3.8 L -5.4 3.8 Z" className="marker-fill" />
        </svg>
      ),
    },
    {
      key: 'waters',
      label: '水泊',
      checked: layers.waters,
      onToggle: () => toggleLayer('waters'),
      icon: (
        <svg viewBox="-10 -10 20 20">
          <path d="M -5.4 0.4 Q -2.8 -3.4 0 0.4 T 5.4 0.4" className="marker-water" />
        </svg>
      ),
    },
    {
      key: 'passes',
      label: '關隘',
      checked: layers.passes,
      onToggle: () => toggleLayer('passes'),
      icon: (
        <svg viewBox="-10 -10 20 20">
          <path
            d="M -4.8 4.2 L -4.8 -2.4 L 0 -5.2 L 4.8 -2.4 L 4.8 4.2 M -2.8 4.2 L -2.8 0.2 L 2.8 0.2 L 2.8 4.2"
            className="marker-line"
          />
        </svg>
      ),
    },
    {
      key: 'sites',
      label: '寺廟・遺跡',
      checked: layers.sites,
      onToggle: () => toggleLayer('sites'),
      icon: (
        <svg viewBox="-10 -10 20 20">
          <path d="M 0 -5.2 L 4.8 0 L 0 5.2 L -4.8 0 Z" className="marker-fill" />
        </svg>
      ),
    },
    {
      key: 'rivers',
      label: '河流・運河',
      checked: layers.rivers,
      onToggle: () => toggleLayer('rivers'),
      icon: (
        <svg viewBox="0 0 20 20">
          <line x1={1} y1={10} x2={19} y2={10} className="legend-river" />
        </svg>
      ),
    },
    {
      key: 'lakes',
      label: '湖泊',
      checked: layers.lakes,
      onToggle: () => toggleLayer('lakes'),
      icon: (
        <svg viewBox="0 0 20 20">
          <ellipse cx={10} cy={10} rx={8} ry={5} className="legend-lake" />
        </svg>
      ),
    },
    {
      key: 'boundaries',
      label: '行政區界（今省界）',
      checked: layers.boundaries,
      onToggle: () => toggleLayer('boundaries'),
      icon: (
        <svg viewBox="0 0 20 20">
          <line x1={1} y1={10} x2={19} y2={10} className="legend-boundary" />
        </svg>
      ),
    },
    {
      key: 'heroes',
      label: '好漢所在',
      checked: layers.heroes,
      onToggle: () => toggleLayer('heroes'),
      icon: (
        <svg viewBox="-10 -10 20 20">
          <circle r={7} className="legend-hero" />
        </svg>
      ),
    },
    {
      key: 'routes',
      label: '小說行程',
      checked: layers.routes,
      onToggle: () => toggleLayer('routes'),
      icon: (
        <svg viewBox="0 0 20 20">
          <line x1={1} y1={10} x2={19} y2={10} className="legend-route" />
        </svg>
      ),
    },
    {
      key: 'trail',
      label: '好漢行蹤',
      checked: layers.trail,
      onToggle: () => toggleLayer('trail'),
      icon: (
        <svg viewBox="0 0 20 20">
          <line x1={1} y1={10} x2={19} y2={10} className="legend-trail" />
        </svg>
      ),
    },
    {
      key: 'labels',
      label: '地名標籤',
      checked: showLabels,
      onToggle: () => setShowLabels((value) => !value),
      icon: (
        <svg viewBox="0 0 20 20">
          <text x={10} y={14} textAnchor="middle" className="legend-text-icon">
            名
          </text>
        </svg>
      ),
    },
  ]

  return (
    <div className={`map-shell mode-${mode}`} ref={shellRef}>
      <svg
        ref={svgRef}
        className="map-svg"
        viewBox={`0 0 ${size.width} ${size.height}`}
        role="group"
        aria-label="北宋宣和年間水滸故事地點示意圖"
      >
        <desc>
          北宋、遼、西夏形勢示意圖，標註《水滸傳》一百二十回中的重要地點。
        </desc>
        <defs>
          <clipPath id="land-clip">
            <path d={landPath} />
          </clipPath>
          <pattern id="sea-waves" width="34" height="22" patternUnits="userSpaceOnUse">
            <path
              d="M 0 12 Q 8.5 5 17 12 T 34 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.35"
            />
          </pattern>
          <pattern id="lake-waves" width="20" height="12" patternUnits="userSpaceOnUse">
            <path
              d="M 0 6 Q 5 2 10 6 T 20 6"
              fill="none"
              stroke="#4f737d"
              strokeWidth="0.65"
              opacity="0.52"
            />
          </pattern>
          <filter id="soft-ink" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.45" />
          </filter>
        </defs>

        <rect
          className="map-sea"
          x={0}
          y={0}
          width={size.width}
          height={size.height}
          onClick={() => selectPlace(null)}
        />
        <rect
          className="map-sea-waves"
          x={0}
          y={0}
          width={size.width}
          height={size.height}
          onClick={() => selectPlace(null)}
        />

        <g ref={geoRef} className="map-geometry">
          <path d={landPath} className="map-land" />
          <g clipPath="url(#land-clip)">
            {layers.lakes &&
              lakePaths.map((lake) => (
                <g key={lake.id}>
                  <path d={lake.d} className="map-lake-base" />
                  <path d={lake.d} className="map-lake" />
                  <path d={lake.d} className="map-lake-ripple" />
                </g>
              ))}
            {layers.rivers &&
              riverPaths.map((river) => (
                <path
                  key={river.id}
                  d={river.d}
                  className={`map-river map-river-${river.tone}`}
                  strokeWidth={river.width}
                />
              ))}
            {layers.boundaries && (
              <path d={adminPath} className="map-admin-boundary" />
            )}
            {layers.routes && routeData && <path d={routeData.d} className="map-route" />}
            {layers.trail && heroTrail && <path d={heroTrail.d} className="map-hero-trail" />}
          </g>
          <path d={landPath} className="map-coast" />
        </g>

        <g ref={overlayRef} className="map-overlay">
          <g className="map-region-labels">
            {mapLabels.map((label) => {
              if (label.kind === 'circuit' && view.k < 1.5) return null
              const [px, py] = project(label.at)
              return (
                <g key={label.id} transform={`translate(${px},${py}) scale(${inv})`}>
                  <text
                    className={`map-label map-label-${label.kind}`}
                    style={label.size ? { fontSize: label.size, opacity: 0.16 } : undefined}
                    textAnchor="middle"
                  >
                    {label.text}
                  </text>
                </g>
              )
            })}
          </g>

          <g className="map-mountain-layer">
            {layers.mountains &&
              mountainPlaces.map((place) => {
                if (!showLabels && view.k < 1.2) return null
              const [px, py] = project(place.coord)
              return (
                <g key={place.id} transform={`translate(${px},${py}) scale(${inv})`}>
                  <path
                    d={mountainGlyph(0, 0, place.priority <= 2 ? 1.05 : 0.8)}
                    className="map-mountain-glyph"
                  />
                </g>
              )
            })}
          </g>

          <g className="map-river-labels">
            {layers.rivers &&
              riverPaths
                .filter(
                  (river) =>
                    river.labelAt &&
                    (['yellow-river', 'yangtze', 'huai-river', 'grand-canal'].includes(
                      river.id,
                    ) ||
                      view.k >= 3.2),
                )
                .map((river) => {
                const [px, py] = project(river.labelAt!)
                return (
                  <g key={river.id} transform={`translate(${px},${py}) scale(${inv})`}>
                    <text
                      className={`map-label map-label-water ${
                        river.tone === 'frontier' ? 'map-label-frontier' : ''
                      }`}
                      transform={`rotate(${river.labelAngle ?? 0})`}
                      textAnchor="middle"
                    >
                      {river.name}
                    </text>
                  </g>
                )
              })}
            {layers.lakes &&
              view.k >= 3.2 &&
              lakePaths.map((lake) => {
                const [px, py] = project(lake.labelAt)
                return (
                  <g key={lake.id} transform={`translate(${px},${py}) scale(${inv})`}>
                    <text className="map-label map-label-lake" textAnchor="middle">
                      {lake.name}
                    </text>
                  </g>
                )
              })}
          </g>

        {layers.routes && routeData && routeLabel && (
          <g className="map-route-marks">
            {routeData.points.map((point, index) => (
              <g key={`${point[0]}-${index}`} transform={`translate(${point[0]},${point[1]}) scale(${inv})`}>
                <circle
                  r={index === 0 ? 3.2 : 2.2}
                  className="map-route-dot"
                />
              </g>
            ))}
            <g transform={`translate(${routeLabel.x},${routeLabel.y}) scale(${inv})`}>
              <text className="map-route-label" textAnchor="middle">
                小說行程
              </text>
            </g>
          </g>
        )}

        <g className="map-markers">
          {orderedPlaces.map((place) => {
            const [px, py] = project(place.coord)
            const [screenX, screenY] = view.apply([px, py])
            if (!layers[placeGroup(place.kind)]) return null
            if (
              screenX < -40 ||
              screenX > size.width + 40 ||
              screenY < -40 ||
              screenY > size.height + 40
            ) {
              return null
            }
            const isSelected = place.id === selectedPlaceId
            const isPrimary = place.id === selectedEvent?.placeIds[0]
            const isActive = activeIds.has(place.id)
            const minZoom =
              place.priority === 1 ? 0 : place.priority === 2 ? 1.15 : place.priority === 3 ? 1.75 : 2.5
            if (!isActive && !isPrimary && !isSelected && view.k < minZoom) return null
            return (
              <g
                key={place.id}
                transform={`translate(${px},${py}) scale(${inv})`}
                className={[
                  'place-marker',
                  `marker-${place.kind}`,
                  `accuracy-${place.accuracy}`,
                  isActive ? 'is-active' : '',
                  isPrimary ? 'is-primary' : '',
                  isSelected ? 'is-selected' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="button"
                tabIndex={0}
                aria-label={`${place.name}，${place.modern}，${accuracyLabel[place.accuracy]}`}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation()
                  selectPlace(place.id)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    selectPlace(place.id)
                  }
                }}
              >
                <title>{`${place.name}（${place.modern}）`}</title>
                {isSelected && (
                  <circle r={size.width < 620 ? 18 : 15} className="marker-pulse" />
                )}
                <circle r={size.width < 620 ? 18 : 15} className="marker-hit" />
                {accuracyExtra(place)}
                <g className="marker-symbol">
                  <PointerIcon kind={place.kind} />
                </g>
              </g>
            )
          })}
        </g>

        {mode === 'heroes' && layers.heroes && !selectedHeroState && (
          <g className="hero-clusters">
            {heroClusterLayout.map((node) => {
              const radius = node.radius
              const shiftX = node.screenX - node.x
              const shiftY = node.screenY - node.y
              return (
                <g
                  key={node.placeId}
                  transform={`translate(${node.baseX},${node.baseY}) scale(${inv})`}
                  className={[
                    'hero-cluster',
                    node.hasTianGang ? 'is-tiangang' : 'is-disha',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  role="button"
                  tabIndex={0}
                  aria-label={`${node.place.name}：${node.states.length}位好漢`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation()
                    selectPlace(node.placeId)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      selectPlace(node.placeId)
                    }
                  }}
                >
                  <title>{`${node.place.name}：${node.states.length}位好漢`}</title>
                  <g transform={`translate(${node.x - node.screenX},${node.y - node.screenY})`}>
                    {Math.hypot(shiftX, shiftY) > 2 && (
                      <line
                        x1={shiftX}
                        y1={shiftY}
                        x2={0}
                        y2={0}
                        className="hero-cluster-leader"
                      />
                    )}
                    <circle r={radius + 8} className="hero-cluster-hit" />
                    <circle r={radius} className="hero-cluster-disc" />
                    <circle r={radius + 3.5} className="hero-cluster-ring" />
                    <text y={5} className="hero-cluster-count">
                      {node.states.length}
                    </text>
                  </g>
                </g>
              )
            })}
          </g>
        )}

        {mode === 'heroes' &&
          layers.heroes &&
          selectedHeroState?.placeId &&
          selectedHeroState.status !== 'notYet' &&
          selectedHeroState.status !== 'unknown' &&
          (() => {
            const place = placeById[selectedHeroState.placeId]
            if (!place) return null
            const [px, py] = project(place.coord)
            const isDead = selectedHeroState.status === 'dead'
            const offsetX = isDead ? 24 : 0
            const offsetY = isDead ? -20 : 0
            const placeCount = heroStates.filter(
              (state) =>
                state.placeId === selectedHeroState.placeId &&
                (state.status === 'present' ||
                  state.status === 'traveling' ||
                  state.status === 'detached'),
            ).length
            return (
              <g
                transform={`translate(${px},${py}) scale(${inv})`}
                className={`hero-solo${isDead ? ' is-dead' : ''}${
                  selectedHeroState.status === 'detached' ? ' is-detached' : ''
                }`}
                role="button"
                tabIndex={0}
                aria-label={`${selectedHeroState.hero.name}目前位置：${place.name}`}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation()
                  selectPlace(place.id)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    selectPlace(place.id)
                  }
                }}
              >
                <title>{`${selectedHeroState.hero.name}｜${place.name}`}</title>
                <g transform={`translate(${offsetX},${offsetY})`}>
                  {Math.hypot(offsetX, offsetY) > 2 && (
                    <line
                      x1={-offsetX}
                      y1={-offsetY}
                      x2={0}
                      y2={0}
                      className="hero-cluster-leader"
                    />
                  )}
                  <circle r={20} className="hero-cluster-hit" />
                  {isDead ? (
                    <path className="hero-solo-cross" d="M -7 -7 L 7 7 M 7 -7 L -7 7" />
                  ) : (
                    <>
                      <circle r={16} className="hero-solo-disc" />
                      <circle r={19} className="hero-solo-ring" />
                      <text y={5} className="hero-solo-rank">
                        {placeCount}
                      </text>
                    </>
                  )}
                  <text y={isDead ? 26 : -26} className="hero-solo-label" textAnchor="middle">
                    {selectedHeroState.hero.name}
                    {isDead ? ' · 陣亡' : ''}
                  </text>
                </g>
              </g>
            )
          })()}

        {layers.trail && heroTrail && (
          <g className="map-hero-trail-dots">
            {heroTrail.points.map((point, index) => (
              <g
                key={`${point[0]}-${index}`}
                transform={`translate(${point[0]},${point[1]}) scale(${inv})`}
              >
                <circle
                  r={index === heroTrail.points.length - 1 ? 3.6 : 2.4}
                  className="map-hero-trail-dot"
                />
              </g>
            ))}
          </g>
        )}

        <g className="map-place-labels">
          {labels.map(({ place, x, y, fontSize }) => {
            const [px, py] = project(place.coord)
            const [screenX, screenY] = view.apply([px, py])
            return (
              <g key={place.id} transform={`translate(${px},${py}) scale(${inv})`}>
                <text
                  x={x - screenX + 5}
                  y={y - screenY + fontSize + 1}
                  className={[
                    'map-place-label',
                    place.id === selectedPlaceId ? 'is-selected' : '',
                    activeIds.has(place.id) ? 'is-active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={{ fontSize }}
                >
                  {place.name}
                </text>
              </g>
            )
          })}
        </g>
        </g>
      </svg>

      <div className="map-frame" aria-hidden="true" />

      <div className="map-cartouche">
        <div className="map-cartouche-inner">
          <span className="map-cartouche-era">大宋宣和年間</span>
          <span className="map-cartouche-title">水滸輿圖</span>
          <span className="map-cartouche-arc">{arc.name}</span>
        </div>
        <div className="map-seal" aria-hidden="true">
          替天行道
        </div>
      </div>

      <div className="map-chapter-tab">
        <span className="map-chapter-number">第{chapter}回</span>
        <span className="map-chapter-title">{chapterTitle}</span>
      </div>

      <div className="map-controls" aria-label="地圖控制">
        <button type="button" onClick={() => zoomBy(1.45)} aria-label="放大地圖">
          <Plus size={17} />
        </button>
        <button type="button" onClick={() => zoomBy(1 / 1.45)} aria-label="縮小地圖">
          <Minus size={17} />
        </button>
        <button type="button" onClick={resetView} aria-label="重設地圖視角">
          <Maximize2 size={16} />
        </button>
        <button
          type="button"
          className={showLabels ? 'is-on' : ''}
          onClick={() => setShowLabels((value) => !value)}
          aria-label={showLabels ? '隱藏地名' : '顯示地名'}
          aria-pressed={showLabels}
        >
          <Tags size={16} />
        </button>
      </div>

      <div className="map-scale">
        <span className="map-scale-bar" style={{ width: scaleBar }} />
        <span className="map-scale-text">約二百里 · 示意</span>
      </div>

      <div className="map-compass" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="0.8" />
          <path d="M24 5 L27 24 L24 43 L21 24 Z" fill="currentColor" opacity="0.85" />
          <path d="M5 24 L24 21 L43 24 L24 27 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <text x="24" y="15" textAnchor="middle">北</text>
        </svg>
      </div>

      <button
        type="button"
        className="map-legend-toggle"
        onClick={() => setLegendOpen((value) => !value)}
        aria-expanded={legendOpen}
      >
        圖例
      </button>
      <div className={`map-legend ${legendOpen ? 'is-open' : ''}`}>
        <div className="map-legend-head">
          <span>圖層與圖例</span>
          <button type="button" onClick={() => setLegendOpen(false)} aria-label="關閉圖例">
            <X size={16} />
          </button>
        </div>
        <div className="map-legend-list">
          {legendItems.map((item) => (
            <label key={item.key} className="map-legend-item">
              <input type="checkbox" checked={item.checked} onChange={item.onToggle} />
              <span className="map-legend-icon">{item.icon}</span>
              <span className="map-legend-text">{item.label}</span>
            </label>
          ))}
        </div>
        <p className="map-legend-note">
          州府治所依今地定位；山寨、村莊多為考證或推定。行政區界為今省界示意，非宋代路界。地圖為文學示意，非精確測繪。
        </p>
      </div>

      <div className="map-footnote">本圖為宋代文學示意圖，非歷史測繪</div>

      {selectedPlace && popupPosition && (
        <div
          className="place-popover"
          style={{
            left: popupPosition.x,
            top: popupPosition.y,
            width: 330,
          }}
          role="dialog"
          aria-label={`${selectedPlace.name}地點資料`}
        >
          <button
            type="button"
            className="place-popover-close"
            onClick={() => selectPlace(null)}
            aria-label="關閉地點資料"
          >
            <X size={15} />
          </button>
          <div className="place-popover-kicker">
            {kindLabel[selectedPlace.kind]} · {selectedPlace.modern}
          </div>
          <h2 className="place-popover-title">{selectedPlace.name}</h2>
          {selectedPlace.aliases && selectedPlace.aliases.length > 0 && (
            <p className="place-popover-aliases">又稱：{selectedPlace.aliases.join('、')}</p>
          )}
          <div className={`accuracy-badge accuracy-${selectedPlace.accuracy}`}>
            {accuracyLabel[selectedPlace.accuracy]}
          </div>
          {selectedPlace.note && (
            <p className="place-popover-note">{selectedPlace.note}</p>
          )}
          <div className="place-popover-events">
            {mode === 'heroes' ? (
              <>
                <div className="place-popover-subhead">在此的好漢</div>
                {heroStates
                  .filter(
                    (state) =>
                      state.placeId === selectedPlace.id &&
                      (state.status === 'present' ||
                        state.status === 'traveling' ||
                        state.status === 'detached'),
                  )
                  .sort((a, b) => a.hero.rank - b.hero.rank)
                  .slice(0, 8)
                  .map((state) => (
                    <button
                      key={state.hero.id}
                      type="button"
                      className={state.hero.id === selectedHeroId ? 'is-selected' : ''}
                      onClick={() => {
                        selectHero(state.hero.id)
                        selectPlace(null)
                      }}
                    >
                      <span>第{state.hero.rank}席</span>
                      {state.hero.name}
                      <em>
                        {state.status === 'detached'
                          ? '已離隊'
                          : state.status === 'traveling'
                            ? '在途'
                            : '在場'}
                      </em>
                    </button>
                  ))}
                {heroStates.filter(
                  (state) =>
                    state.placeId === selectedPlace.id &&
                    (state.status === 'present' ||
                      state.status === 'traveling' ||
                      state.status === 'detached'),
                ).length === 0 && (
                  <p className="place-popover-empty">此刻無好漢在此。</p>
                )}
              </>
            ) : (
              <>
                {eventsAtPlace(selectedPlace.id)
                  .slice(0, 4)
                  .map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => {
                        setChapter(event.chapter)
                        selectEvent(event.id)
                      }}
                    >
                      <span>第{event.chapter}回</span>
                      {event.title}
                    </button>
                  ))}
                {eventsAtPlace(selectedPlace.id).length === 0 && (
                  <p className="place-popover-empty">此處尚未整理相關事件。</p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}












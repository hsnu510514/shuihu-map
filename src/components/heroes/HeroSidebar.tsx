import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Search, X } from 'lucide-react'
import { arcForChapter } from '../../data/arcs'
import { chapterByNumber } from '../../data/chapters'
import { anchorsForHero, statesForChapter, type HeroState } from '../../data/heroPositions'
import { placeById } from '../../data/places'
import { useAppStore } from '../../store/appStore'

type StatusFilter = 'present' | 'detached' | 'dead' | 'notYet' | 'unknown' | 'all'

const statusLabel: Record<HeroState['status'], string> = {
  present: '在場',
  traveling: '在途',
  detached: '已離隊',
  dead: '已陣亡',
  notYet: '未出場',
  unknown: '行蹤未載',
}

const statusClass: Record<HeroState['status'], string> = {
  present: 'is-present',
  traveling: 'is-present',
  detached: 'is-detached',
  dead: 'is-dead',
  notYet: 'is-notyet',
  unknown: 'is-unknown',
}

const confidenceLabel = {
  text: '書中明載',
  inferred: '依章回推定',
}

const fateLabel = (fate: string) => (fate === '其他' ? '遇害／自盡' : fate)

function HeroRow({
  state,
  selected,
  onSelect,
}: {
  state: HeroState
  selected: boolean
  onSelect: () => void
}) {
  const place = state.placeId ? placeById[state.placeId] : null
  return (
    <button
      type="button"
      className={`hero-row${selected ? ' is-selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="hero-rank">{String(state.hero.rank).padStart(2, '0')}</span>
      <span className="hero-row-main">
        <span className="hero-row-name">
          {state.hero.name}
          <span className="hero-row-nickname">{state.hero.nickname}</span>
        </span>
        <span className="hero-row-meta">
          {state.hero.star}
          {place ? ` · ${place.name}` : ` · ${statusLabel[state.status]}`}
        </span>
      </span>
      <span className={`hero-status ${statusClass[state.status]}`}>
        {statusLabel[state.status]}
      </span>
    </button>
  )
}

function HeroDetail({
  state,
  others,
  onClose,
  detailRef,
}: {
  state: HeroState
  others: HeroState[]
  onClose: () => void
  detailRef: RefObject<HTMLElement | null>
}) {
  const chapter = useAppStore((store) => store.chapter)
  const setChapter = useAppStore((store) => store.setChapter)
  const selectHero = useAppStore((store) => store.selectHero)
  const place = state.placeId ? placeById[state.placeId] : null
  const anchors = anchorsForHero(state.hero.id).filter((anchor) => anchor.chapter <= chapter)

  const fate =
    state.hero.fateChapter !== undefined
      ? `第${state.hero.fateChapter}回 · ${fateLabel(state.hero.fate)}`
      : fateLabel(state.hero.fate)

  return (
    <section ref={detailRef} className="hero-detail" aria-label={`${state.hero.name}行蹤`}>
      <button type="button" className="hero-detail-close" onClick={onClose} aria-label="關閉好漢資料">
        <X size={14} />
      </button>
      <div className="hero-detail-kicker">
        第 {state.hero.rank} 席 · {state.hero.star} · {state.hero.faction}
      </div>
      <h3 className="hero-detail-name">
        {state.hero.name}
        <span>{state.hero.nickname}</span>
      </h3>
      <div className="hero-detail-status">
        <span className={`hero-status ${statusClass[state.status]}`}>
          {statusLabel[state.status]}
        </span>
        {place && <span>{place.name}</span>}
        <span className={`confidence-badge ${state.confidence}`}>
          {confidenceLabel[state.confidence]}
        </span>
      </div>
      {state.note && <p className="hero-detail-note">{state.note}</p>}
      <dl className="hero-detail-facts">
        <div>
          <dt>初登場</dt>
          <dd>第{state.hero.firstChapter}回</dd>
        </div>
        <div>
          <dt>入山</dt>
          <dd>第{state.hero.joinChapter}回</dd>
        </div>
        <div>
          <dt>結局</dt>
          <dd>{fate}</dd>
        </div>
      </dl>
      {others.length > 0 && (
        <div className="hero-detail-others">
          <div className="hero-detail-others-head">
            同在{place ? place.name : '此地'}的其他好漢
          </div>
          <div className="hero-detail-others-list">
            {others.map((other) => (
              <button
                key={other.hero.id}
                type="button"
                onClick={() => selectHero(other.hero.id)}
              >
                <span>{other.hero.name}</span>
                <em>{statusLabel[other.status]}</em>
              </button>
            ))}
          </div>
        </div>
      )}
      {anchors.length > 0 && (
        <div className="hero-trail-list">
          <div className="hero-trail-head">截至本章行蹤</div>
          {anchors.map((anchor) => {
            const anchorPlace = anchor.placeId ? placeById[anchor.placeId] : null
            return (
              <button
                key={`${anchor.chapter}-${anchor.placeId}`}
                type="button"
                onClick={() => setChapter(anchor.chapter)}
              >
                <span>第{anchor.chapter}回</span>
                <span>{anchorPlace?.name ?? '未載'}</span>
                <em>{anchor.confidence === 'text' ? '明載' : '推定'}</em>
              </button>
            )
          })}
        </div>
      )}
    </section>
  )
}

export function HeroSidebar() {
  const chapter = useAppStore((store) => store.chapter)
  const selectedHeroId = useAppStore((store) => store.selectedHeroId)
  const selectHero = useAppStore((store) => store.selectHero)
  const selectPlace = useAppStore((store) => store.selectPlace)
  const setChapter = useAppStore((store) => store.setChapter)
  const chapterData = chapterByNumber[chapter]
  const arc = arcForChapter(chapter)
  const clauses = chapterData?.title.split('　') ?? ['']
  const states = useMemo(() => statesForChapter(chapter), [chapter])
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<StatusFilter>('present')
  const [group, setGroup] = useState<'天罡' | '地煞' | 'all'>('all')
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const detailRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!selectedHeroId) return
    detailRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [selectedHeroId])

  const counts = useMemo(() => {
    return {
      present: states.filter((state) => state.status === 'present' || state.status === 'traveling').length,
      detached: states.filter((state) => state.status === 'detached').length,
      dead: states.filter((state) => state.status === 'dead').length,
      notYet: states.filter((state) => state.status === 'notYet').length,
      unknown: states.filter((state) => state.status === 'unknown').length,
      all: states.length,
    }
  }, [states])

  const selectedState = selectedHeroId
    ? states.find((state) => state.hero.id === selectedHeroId) ?? null
    : null

  const coLocated = useMemo(() => {
    if (!selectedState?.placeId) return []
    return states
      .filter(
        (state) =>
          state.hero.id !== selectedState.hero.id &&
          state.placeId === selectedState.placeId &&
          (state.status === 'present' ||
            state.status === 'traveling' ||
            state.status === 'detached'),
      )
      .sort((a, b) => a.hero.rank - b.hero.rank)
  }, [selectedState, states])

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return states.filter((state) => {
      if (group === '天罡' && state.hero.rank > 36) return false
      if (group === '地煞' && state.hero.rank <= 36) return false
      if (normalized) {
        const haystack = `${state.hero.name} ${state.hero.nickname} ${state.hero.star} ${state.hero.faction}`.toLowerCase()
        if (!haystack.includes(normalized)) return false
        return true
      }
      if (filter === 'present') return state.status === 'present' || state.status === 'traveling'
      if (filter === 'detached') return state.status === 'detached'
      if (filter === 'dead') return state.status === 'dead'
      if (filter === 'notYet') return state.status === 'notYet'
      if (filter === 'unknown') return state.status === 'unknown'
      return true
    })
  }, [filter, group, query, states])

  const groups = useMemo(() => {
    if (
      filter === 'dead' ||
      filter === 'notYet' ||
      filter === 'unknown' ||
      filter === 'all' ||
      query.trim()
    ) {
      return [{ key: 'list', label: '', states: [...filtered].sort((a, b) => a.hero.rank - b.hero.rank) }]
    }
    const map = new Map<string, HeroState[]>()
    for (const state of filtered) {
      const key =
        state.status === 'detached'
          ? `detached:${state.placeId ?? 'unknown'}`
          : state.placeId ?? 'unknown'
      map.set(key, [...(map.get(key) ?? []), state])
    }
    return [...map.entries()]
      .map(([key, groupStates]) => {
        const placeId = key.includes(':') ? key.split(':')[1] : key
        const place = placeId !== 'unknown' ? placeById[placeId] : null
        const isDetached = key.startsWith('detached:')
        return {
          key,
          label: `${place?.name ?? '行蹤未載'}${isDetached ? '（離隊）' : ''}`,
          states: groupStates.sort((a, b) => a.hero.rank - b.hero.rank),
        }
      })
      .sort((a, b) => b.states.length - a.states.length)
  }, [filter, filtered, query])

  const filters: Array<{ id: StatusFilter; label: string; count: number }> = [
    { id: 'present', label: '在場', count: counts.present },
    { id: 'detached', label: '離隊', count: counts.detached },
    { id: 'dead', label: '陣亡', count: counts.dead },
    { id: 'notYet', label: '未出場', count: counts.notYet },
    { id: 'unknown', label: '未載', count: counts.unknown },
    { id: 'all', label: '全部', count: counts.all },
  ]

  return (
    <div className="sidebar-inner hero-sidebar">
      <header className="chapter-head">
        <div className="chapter-kicker">
          <span className="chapter-number">第 {chapter} 回</span>
          <span className={`arc-badge arc-tone-${arc.tone}`}>好漢行蹤</span>
        </div>
        <h2 className="chapter-title">
          {clauses.map((clause) => (
            <span key={clause}>{clause}</span>
          ))}
        </h2>
        <div className="chapter-meta">
          <span>
            在場 <b>{counts.present}</b>
          </span>
          <span>
            陣亡 <b>{counts.dead}</b>
          </span>
          <span>
            未出場 <b>{counts.notYet}</b>
          </span>
        </div>
        <p className="chapter-note">
          位置以章回錨點推定：書中明載與依軍團位置推定分開標示；未出場、陣亡與行蹤未載不上圖。
        </p>
      </header>

      {selectedState && (
        <HeroDetail
          state={selectedState}
          others={coLocated}
          onClose={() => selectHero(null)}
          detailRef={detailRef}
        />
      )}

      <div className="hero-controls">
        <label className="hero-search">
          <Search size={13} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋姓名、綽號、星號"
            aria-label="搜尋好漢"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="清除搜尋">
              <X size={12} />
            </button>
          )}
        </label>
        <div className="hero-filter-row">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`hero-filter${filter === item.id && !query ? ' is-active' : ''}`}
              onClick={() => {
                setFilter(item.id)
                setQuery('')
              }}
            >
              {item.label}
              <span>{item.count}</span>
            </button>
          ))}
        </div>
        <div className="hero-filter-row is-secondary">
          <span className="hero-filter-label">座次</span>
          {(['all', '天罡', '地煞'] as const).map((item) => (
            <button
              key={item}
              type="button"
              className={`hero-filter${group === item ? ' is-active' : ''}`}
              onClick={() => setGroup(item)}
            >
              {item === 'all' ? '全部' : item}
            </button>
          ))}
        </div>
      </div>

      <div className="section-heading">
        {query.trim() ? '搜尋結果' : filter === 'present' ? '所在位置' : filters.find((item) => item.id === filter)?.label}
        <span className="section-count">{filtered.length}</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-mark" aria-hidden="true">
            無
          </div>
          <strong>本章沒有符合條件的好漢</strong>
          試試切換「全部」，或拖動時間軸到好漢出場之後。
          <button
            type="button"
            className="hero-empty-all"
            onClick={() => {
              setFilter('all')
              setQuery('')
            }}
          >
            顯示全部 108 位
          </button>
          <button
            type="button"
            className="hero-empty-all"
            onClick={() => setChapter(71)}
          >
            跳到第 71 回大聚義
          </button>
        </div>
      ) : (
        <div className="hero-groups">
          {groups.map((item) => {
            const isExpanded = expanded[item.key]
            const visibleStates = isExpanded ? item.states : item.states.slice(0, 8)
            return (
              <section key={item.key} className="hero-group">
                {item.label && (
                  <button
                    type="button"
                    className="hero-group-head"
                    onClick={() => {
                      const placeId = item.states[0]?.placeId
                      if (placeId) selectPlace(placeId)
                    }}
                  >
                    <span>{item.label}</span>
                    <em>{item.states.length}</em>
                  </button>
                )}
                <div className="hero-rows">
                  {visibleStates.map((state) => (
                    <HeroRow
                      key={state.hero.id}
                      state={state}
                      selected={state.hero.id === selectedHeroId}
                      onSelect={() => selectHero(state.hero.id)}
                    />
                  ))}
                </div>
                {item.states.length > 8 && !isExpanded && (
                  <button
                    type="button"
                    className="hero-more"
                    onClick={() => setExpanded((current) => ({ ...current, [item.key]: true }))}
                  >
                    還有 {item.states.length - 8} 位
                  </button>
                )}
              </section>
            )
          })}
        </div>
      )}

      <div className="sidebar-foot">
        好漢位置為章回快照，非逐日行程；征戰期間以軍團所在位置推定，個人分兵另有標註。
        <br />
        點選好漢可查看截至本章的行蹤；點選地名可在地圖上定位。
      </div>
    </div>
  )
}




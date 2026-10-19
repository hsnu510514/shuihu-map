import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { arcForChapter } from '../../data/arcs'
import { chapterByNumber } from '../../data/chapters'
import { eventById } from '../../data/events'
import { figureById, figures } from '../../data/figures'
import { relationTypeMeta } from '../../data/relations'
import type { Figure, RelationType } from '../../data/types'
import {
  allRelationsForFigure,
  clusterLabel,
  clusterOf,
  clusterTone,
  currentRelationsForFigure,
  partnerOf,
  phaseAt,
  phaseRange,
  relationTypeOrder,
  resolvedRelationsAt,
  TOTAL_CHAPTERS,
  type ResolvedRelation,
} from '../../lib/relationsGraph'
import { useAppStore } from '../../store/appStore'

interface RelationsSidebarProps {
  allChapters: boolean
  depth: 1 | 2
  includeEnded: boolean
  visibleTypes: Set<RelationType>
  onAllChaptersChange: (value: boolean) => void
  onDepthChange: (value: 1 | 2) => void
  onIncludeEndedChange: (value: boolean) => void
  onToggleType: (type: RelationType) => void
  onResetTypes: () => void
}

function figureSubtitle(figure: Figure): string {
  if (figure.kind === 'hero') {
    return `${figure.nickname ?? ''} · ${figure.affiliation}`.replace(/^ · /, '')
  }
  return `${figure.role} · ${figure.affiliation}`
}

function FigureRow({
  figure,
  count,
  selected,
  onSelect,
}: {
  figure: Figure
  count: number
  selected: boolean
  onSelect: () => void
}) {
  const cluster = clusterOf(figure)
  return (
    <button
      type="button"
      className={`relation-figure-row${selected ? ' is-selected' : ''}${
        count === 0 ? ' is-inactive' : ''
      }`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className={`cluster-dot tone-${clusterTone[cluster]}`} aria-hidden="true" />
      <span className="relation-figure-main">
        <span className="relation-figure-name">
          {figure.name}
          {figure.nickname && <span>{figure.nickname}</span>}
        </span>
        <span className="relation-figure-meta">{figureSubtitle(figure)}</span>
      </span>
      <span className="relation-figure-count" aria-label={`${count} 條關係`}>
        {count || '—'}
      </span>
    </button>
  )
}

function RelationCurrentList({
  figureId,
  items,
  allChapters,
  onSelect,
}: {
  figureId: string
  items: ResolvedRelation[]
  allChapters: boolean
  onSelect: (id: string) => void
}) {
  if (items.length === 0) return null
  return (
    <div className="relation-current">
      <div className="relation-detail-section-title">
        {allChapters ? '最後階段關係' : '目前關係'}
      </div>
      <div className="relation-current-list">
        {items.map(({ relation, phase, ended }) => {
          const partner = figureById[partnerOf(relation, figureId)]
          if (!partner) return null
          return (
            <button
              key={relation.id}
              type="button"
              className={`relation-current-item${ended ? ' is-ended' : ''}`}
              onClick={() => onSelect(partner.id)}
            >
              <span className={`relation-type-mark tone-${relationTypeMeta[phase.type].tone}`} />
              <span className="relation-current-main">
                <span className="relation-current-name">{partner.name}</span>
                <span className="relation-current-label">{phase.label}</span>
              </span>
              <span className="relation-current-range">
                {phaseRange(phase)}
                {ended ? '・已結束' : ''}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RelationHistory({
  figure,
  chapter,
  allChapters,
  current,
  onSelectFigure,
  onSelectChapter,
  onOpenEvent,
}: {
  figure: Figure
  chapter: number
  allChapters: boolean
  current: ResolvedRelation[]
  onSelectFigure: (id: string) => void
  onSelectChapter: (chapter: number) => void
  onOpenEvent: (eventId: string, chapter: number) => void
}) {
  const history = useMemo(
    () =>
      allRelationsForFigure(figure.id)
        .map((relation) => ({
          relation,
          phases: [...relation.phases].sort((a, b) => a.fromChapter - b.fromChapter),
        }))
        .sort((a, b) => a.phases[0].fromChapter - b.phases[0].fromChapter),
    [figure.id],
  )

  if (history.length === 0) {
    return (
      <div className="relation-detail-empty">
        <strong>尚無關係條目</strong>
        第一版以具體劇情關係為主，這位人物目前還沒有收錄。
      </div>
    )
  }

  return (
    <div className="relation-history">
      <div className="relation-detail-section-title">關係年表</div>
      {history.map(({ relation, phases }) => {
        const partner = figureById[partnerOf(relation, figure.id)]
        if (!partner) return null
        const active =
          current.find((item) => item.relation.id === relation.id)?.phase ??
          (allChapters ? phases[phases.length - 1] : phaseAt(relation, chapter))
        return (
          <article key={relation.id} className="relation-history-item">
            <header className="relation-history-head">
              <button type="button" onClick={() => onSelectFigure(partner.id)}>
                {partner.name}
              </button>
              <span>{partner.kind === 'hero' ? partner.nickname ?? partner.role : partner.role}</span>
            </header>
            {phases.map((phase) => {
              const isCurrent = active === phase
              const event = phase.eventId ? eventById[phase.eventId] : null
              return (
                <div
                  key={`${relation.id}-${phase.fromChapter}-${phase.type}`}
                  className={`relation-phase${isCurrent ? ' is-current' : ''}`}
                >
                  <div className="relation-phase-top">
                    <button
                      type="button"
                      className="relation-phase-range"
                      onClick={() => onSelectChapter(phase.fromChapter)}
                    >
                      {phaseRange(phase)}
                    </button>
                    <span className={`relation-phase-type tone-${relationTypeMeta[phase.type].tone}`}>
                      {relationTypeMeta[phase.type].label}
                    </span>
                    {isCurrent && <span className="relation-phase-now">目前</span>}
                  </div>
                  <strong className="relation-phase-label">{phase.label}</strong>
                  <p className="relation-phase-summary">{phase.summary}</p>
                  {phase.quote && <blockquote>「{phase.quote}」</blockquote>}
                  {event && (
                    <button
                      type="button"
                      className="relation-event-link"
                      onClick={() => onOpenEvent(event.id, event.chapter)}
                    >
                      第{event.chapter}回 · {event.title}
                    </button>
                  )}
                </div>
              )
            })}
          </article>
        )
      })}
    </div>
  )
}

function FigureDetail({
  figure,
  chapter,
  allChapters,
  includeEnded,
  visibleTypes,
  onClose,
}: {
  figure: Figure
  chapter: number
  allChapters: boolean
  includeEnded: boolean
  visibleTypes: Set<RelationType>
  onClose: () => void
}) {
  const navigate = useNavigate()
  const selectFigure = useAppStore((state) => state.selectFigure)
  const setChapter = useAppStore((state) => state.setChapter)
  const cluster = clusterOf(figure)
  const current = currentRelationsForFigure(figure.id, chapter, {
    allChapters,
    includeEnded,
    visibleTypes,
  })
  const activeCount = current.filter((item) => !item.ended).length

  return (
    <section className="relation-detail" aria-label={`${figure.name}關係資料`}>
      <button type="button" className="relation-detail-close" onClick={onClose} aria-label="關閉人物關係">
        <X size={15} />
      </button>
      <div className={`relation-detail-kicker tone-${clusterTone[cluster]}`}>
        {clusterLabel[cluster]} · {figure.role}
      </div>
      <h3 className="relation-detail-name">
        {figure.name}
        {figure.nickname && <span>{figure.nickname}</span>}
      </h3>
      <div className="relation-detail-meta">
        <span>{figure.affiliation}</span>
        {figure.firstChapter && <span>初登場 第{figure.firstChapter}回</span>}
        <span>
          {allChapters ? '全書' : `第${chapter}回`} · {activeCount} 條關係
        </span>
      </div>
      {figure.note && <p className="relation-detail-note">{figure.note}</p>}

      <div className="relation-detail-actions">
        <button type="button" onClick={() => selectFigure(null)}>
          回到全覽
        </button>
        {figure.kind === 'hero' && (
          <button
            type="button"
            onClick={() => navigate(`/heroes?chapter=${chapter}&hero=${figure.id}`)}
          >
            好漢行蹤
          </button>
        )}
        <button type="button" onClick={() => navigate(`/biographies?figure=${figure.id}`)}>
          人物誌
        </button>
        {figure.firstChapter && (
          <button type="button" onClick={() => setChapter(figure.firstChapter!)}>
            初登場章回
          </button>
        )}
      </div>

      <RelationCurrentList
        figureId={figure.id}
        items={current.filter((item) => !item.ended)}
        allChapters={allChapters}
        onSelect={selectFigure}
      />

      <RelationHistory
        figure={figure}
        chapter={chapter}
        allChapters={allChapters}
        current={current}
        onSelectFigure={selectFigure}
        onSelectChapter={setChapter}
        onOpenEvent={(eventId, eventChapter) => {
          navigate(`/story?chapter=${eventChapter}&event=${eventId}`)
        }}
      />
    </section>
  )
}

export function RelationsSidebar({
  allChapters,
  depth,
  includeEnded,
  visibleTypes,
  onAllChaptersChange,
  onDepthChange,
  onIncludeEndedChange,
  onToggleType,
  onResetTypes,
}: RelationsSidebarProps) {
  const chapter = useAppStore((state) => state.chapter)
  const selectedFigureId = useAppStore((state) => state.selectedFigureId)
  const selectFigure = useAppStore((state) => state.selectFigure)
  const chapterData = chapterByNumber[chapter]
  const arc = arcForChapter(chapter)
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [showInactive, setShowInactive] = useState(false)
  const selectedFigure = selectedFigureId ? figureById[selectedFigureId] : null

  const activeRelations = useMemo(
    () => resolvedRelationsAt(chapter, { allChapters, visibleTypes }),
    [allChapters, chapter, visibleTypes],
  )

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const { relation } of activeRelations) {
      map.set(relation.a, (map.get(relation.a) ?? 0) + 1)
      map.set(relation.b, (map.get(relation.b) ?? 0) + 1)
    }
    return map
  }, [activeRelations])

  const filteredFigures = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return figures
      .filter((figure) => {
        if (!normalized) return true
        const haystack = [
          figure.name,
          figure.nickname,
          figure.affiliation,
          figure.role,
          ...(figure.aliases ?? []),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(normalized)
      })
      .sort((a, b) => {
        const countDelta = (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0)
        if (countDelta !== 0) return countDelta
        return (a.rank ?? 999) - (b.rank ?? 999) || a.name.localeCompare(b.name, 'zh-Hant')
      })
  }, [counts, query])

  const activeFigures = useMemo(
    () => filteredFigures.filter((figure) => (counts.get(figure.id) ?? 0) > 0),
    [counts, filteredFigures],
  )
  const listedFigures =
    query.trim() || showInactive ? filteredFigures : activeFigures
  const visibleFigures = expanded || query.trim() ? listedFigures : listedFigures.slice(0, 18)
  const hiddenByScope = filteredFigures.length - listedFigures.length
  const allTypesSelected = visibleTypes.size === relationTypeOrder.length

  return (
    <div className="sidebar-inner relation-sidebar">
      <header className="chapter-head">
        <div className="chapter-kicker">
          <span className="chapter-number">第 {chapter} 回</span>
          <span className={`arc-badge arc-tone-${arc.tone}`}>人物關係</span>
        </div>
        <h2 className="chapter-title">
          {(chapterData?.title ?? '').split('　').map((clause) => (
            <span key={clause}>{clause}</span>
          ))}
        </h2>
        <div className="chapter-meta">
          <span>
            {allChapters ? '全書' : '本章'}關係 <b>{activeRelations.length}</b>
          </span>
          <span>
            人物 <b>{counts.size}</b>
          </span>
          <span>
            非好漢 <b>{figures.filter((figure) => figure.kind === 'character' && (counts.get(figure.id) ?? 0) > 0).length}</b>
          </span>
        </div>
        <p className="chapter-note">
          只收錄有具體劇情描述的關係；同場出戰、同營共事不連線。切換章回可看關係的成立、轉變與結束。
        </p>
      </header>

      <div className="relation-view-switch" role="group" aria-label="時間範圍">
        <button
          type="button"
          className={!allChapters ? 'is-active' : ''}
          onClick={() => onAllChaptersChange(false)}
        >
          本章
          <span>第{chapter}回</span>
        </button>
        <button
          type="button"
          className={allChapters ? 'is-active' : ''}
          onClick={() => onAllChaptersChange(true)}
        >
          全書
          <span>所有階段</span>
        </button>
      </div>

      {selectedFigure && (
        <FigureDetail
          figure={selectedFigure}
          chapter={chapter}
          allChapters={allChapters}
          includeEnded={includeEnded}
          visibleTypes={visibleTypes}
          onClose={() => selectFigure(null)}
        />
      )}

      <div className="relation-controls">
        <label className="hero-search">
          <Search size={13} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜尋姓名、綽號、身分"
            aria-label="搜尋人物"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="清除搜尋">
              <X size={12} />
            </button>
          )}
        </label>

        <div className="relation-type-head">
          <span>關係類型</span>
          {!allTypesSelected && (
            <button type="button" onClick={onResetTypes}>
              全部
            </button>
          )}
        </div>
        <div className="relation-type-filters">
          {relationTypeOrder.map((type) => {
            const meta = relationTypeMeta[type]
            return (
              <button
                key={type}
                type="button"
                className={`relation-type-filter tone-${meta.tone}${
                  visibleTypes.has(type) ? ' is-active' : ''
                }`}
                onClick={() => onToggleType(type)}
                aria-pressed={visibleTypes.has(type)}
              >
                <span className="relation-type-mark" />
                {meta.label}
              </button>
            )
          })}
        </div>

        {selectedFigure && (
          <div className="relation-focus-options">
            <div className="relation-option-row">
              <span>聚焦層級</span>
              <button
                type="button"
                className={depth === 1 ? 'is-active' : ''}
                onClick={() => onDepthChange(1)}
              >
                一度
              </button>
              <button
                type="button"
                className={depth === 2 ? 'is-active' : ''}
                onClick={() => onDepthChange(2)}
              >
                二度
              </button>
            </div>
            <label className="relation-check">
              <input
                type="checkbox"
                checked={includeEnded}
                onChange={(event) => onIncludeEndedChange(event.target.checked)}
              />
              顯示已結束的關係
            </label>
          </div>
        )}
      </div>

      <div className="section-heading">
        {query.trim()
          ? '搜尋結果'
          : showInactive
            ? '全部人物'
            : allChapters
              ? '全書人物'
              : selectedFigure
                ? '可以繼續聚焦'
                : '本章人物'}
        <span className="section-count">{listedFigures.length}</span>
      </div>

      {visibleFigures.length === 0 ? (
        <div className="empty-state">
          <div className="empty-mark" aria-hidden="true">
            {query.trim() ? '無' : '待補'}
          </div>
          {query.trim() ? (
            <>
              <strong>找不到符合的人物</strong>
              試試姓名、綽號或身分關鍵字。
              <button type="button" className="hero-empty-all" onClick={() => setQuery('')}>
                清除搜尋
              </button>
            </>
          ) : (
            <>
              <strong>本章尚無關係人物</strong>
              第一版關係自第2回王進收史進為徒開始；可切換全書，或顯示含尚未建立關係者在內的全部人物。
              <button
                type="button"
                className="hero-empty-all"
                onClick={() => onAllChaptersChange(true)}
              >
                顯示全書
              </button>
              <button
                type="button"
                className="hero-empty-all"
                onClick={() => {
                  setShowInactive(true)
                  setExpanded(true)
                }}
              >
                顯示全部人物
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="relation-figure-list">
          {visibleFigures.map((figure) => (
            <FigureRow
              key={figure.id}
              figure={figure}
              count={counts.get(figure.id) ?? 0}
              selected={figure.id === selectedFigureId}
              onSelect={() => selectFigure(figure.id)}
            />
          ))}
          {!expanded && !query.trim() && listedFigures.length > visibleFigures.length && (
            <button type="button" className="hero-more" onClick={() => setExpanded(true)}>
              還有 {listedFigures.length - visibleFigures.length} 位人物
            </button>
          )}
          {!query.trim() && showInactive && (
            <button
              type="button"
              className="hero-more"
              onClick={() => {
                setShowInactive(false)
                setExpanded(false)
              }}
            >
              只顯示本章人物
            </button>
          )}
          {!query.trim() && !showInactive && hiddenByScope > 0 && (
            <button
              type="button"
              className="hero-more"
              onClick={() => {
                setShowInactive(true)
                setExpanded(true)
              }}
            >
              顯示其他 {hiddenByScope} 位人物
            </button>
          )}
        </div>
      )}

      <div className="sidebar-foot">
        關係資料以章回情節為據，每條註明起訖章回與出處事件；同場征戰不列。
        <br />
        點選人物進入聚焦圖；聚焦時點外圍人物，會先在右側顯示兩人互動，再可跳轉以對方為中心。底部時間軸可查看關係變化。
        {allChapters && ` 全書模式顯示各關係的最後階段，起訖仍以第1–${TOTAL_CHAPTERS}回標示。`}
      </div>
    </div>
  )
}

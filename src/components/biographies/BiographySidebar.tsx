import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { figures } from '../../data/figures'
import type { Figure } from '../../data/types'
import { buildProfile, figureGroupMeta, figureGroupOf, type FigureGroup } from '../../lib/figureProfile'

interface BiographySidebarProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

function searchText(figure: Figure): string {
  return [
    figure.name,
    figure.nickname,
    figure.role,
    figure.affiliation,
    figure.star,
    ...(figure.aliases ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function figureSubtitle(figure: Figure): string {
  if (figure.kind === 'hero') {
    return `${figure.nickname ?? ''} · ${figure.star ?? ''}`.replace(/^ · /, '')
  }
  return `${figure.role} · ${figure.affiliation}`
}

function BiographyRow({
  figure,
  selected,
  onSelect,
}: {
  figure: Figure
  selected: boolean
  onSelect: () => void
}) {
  const count = buildProfile(figure.id)?.entries.length ?? 0
  return (
    <button
      type="button"
      className={`bio-row${selected ? ' is-selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="bio-row-index">
        {figure.kind === 'hero' && figure.rank !== undefined
          ? String(figure.rank).padStart(2, '0')
          : '·'}
      </span>
      <span className="bio-row-main">
        <span className="bio-row-name">
          {figure.name}
          {figure.nickname && <span className="bio-row-nickname">{figure.nickname}</span>}
        </span>
        <span className="bio-row-meta">{figureSubtitle(figure)}</span>
      </span>
      <span className="bio-row-count" aria-label={`${count} 條紀錄`}>
        {count || '—'}
      </span>
    </button>
  )
}

export function BiographySidebar({ selectedId, onSelect }: BiographySidebarProps) {
  const [query, setQuery] = useState('')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const groups = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const filtered = normalized
      ? figures.filter((figure) => searchText(figure).includes(normalized))
      : figures
    const order: FigureGroup[] = ['tiangang', 'disha', 'other']
    return order
      .map((groupId) => ({
        id: groupId,
        label: figureGroupMeta[groupId].label,
        figures: filtered
          .filter((figure) => figureGroupOf(figure) === groupId)
          .sort((left, right) => {
            if (left.kind === 'hero' && right.kind === 'hero') {
              return (left.rank ?? 0) - (right.rank ?? 0)
            }
            return (left.firstChapter ?? 999) - (right.firstChapter ?? 999)
          }),
      }))
      .filter((group) => group.figures.length > 0)
  }, [query])

  const total = groups.reduce((sum, group) => sum + group.figures.length, 0)
  const heroCount = figures.filter((figure) => figure.kind === 'hero').length

  return (
    <div className="sidebar-inner biography-sidebar">
      <header className="chapter-head">
        <div className="chapter-kicker">
          <span className="chapter-number">人物誌</span>
          <span className="arc-badge arc-tone-cinnabar">列傳</span>
        </div>
        <h2 className="chapter-title">
          <span>水滸列傳</span>
          <span>群英事蹟</span>
        </h2>
        <div className="chapter-meta">
          <span>
            好漢 <b>{heroCount}</b>
          </span>
          <span>
            全人物 <b>{figures.length}</b>
          </span>
        </div>
        <p className="chapter-note">
          擇一人物，閱其生平、重要事蹟與關係。事蹟來自章回事件、互動與全書抽取，並輔以編者重點；
          每條皆附出處，可跳轉章回。
        </p>
      </header>

      <label className="hero-search biography-search">
        <Search size={13} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜尋姓名、綽號、星號、出身"
          aria-label="搜尋人物"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="清除搜尋">
            <X size={12} />
          </button>
        )}
      </label>

      {total === 0 ? (
        <div className="empty-state">
          <div className="empty-mark" aria-hidden="true">
            無
          </div>
          <strong>沒有符合的人物</strong>
          試試其他關鍵字。
        </div>
      ) : (
        groups.map((group) => {
          const isCollapsed = collapsed[group.id]
          return (
            <section key={group.id} className="bio-group">
              <button
                type="button"
                className="bio-group-head"
                onClick={() =>
                  setCollapsed((current) => ({ ...current, [group.id]: !current[group.id] }))
                }
                aria-expanded={!isCollapsed}
              >
                <span>{group.label}</span>
                <em>{group.figures.length}</em>
              </button>
              {!isCollapsed && (
                <div className="bio-rows">
                  {group.figures.map((figure) => (
                    <BiographyRow
                      key={figure.id}
                      figure={figure}
                      selected={figure.id === selectedId}
                      onSelect={() => onSelect(figure.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          )
        })
      )}

      <div className="sidebar-foot">
        事蹟為本專案整理與關鍵詞抽取後校訂，非全量；可靠度以出處章回為準。無公版畫像者以名號印記示意。
      </div>
    </div>
  )
}

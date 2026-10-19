import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { allRankings, sortedGroups } from '../../lib/rankings'
import { rankingGroupById } from '../../data/rankings'

interface RankingsSidebarProps {
  selectedId: string | null
  onSelect: (id: string) => void
}

export function RankingsSidebar({ selectedId, onSelect }: RankingsSidebarProps) {
  const [query, setQuery] = useState('')

  const groups = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const filtered = normalized
      ? allRankings.filter((category) =>
          `${category.name} ${rankingGroupById[category.group]?.name ?? ''} ${category.description}`
            .toLowerCase()
            .includes(normalized),
        )
      : allRankings
    return sortedGroups(filtered).map((groupId) => ({
      id: groupId,
      name: rankingGroupById[groupId]?.name ?? groupId,
      categories: filtered.filter((category) => category.group === groupId),
    }))
  }, [query])

  return (
    <div className="sidebar-inner ranking-sidebar">
      <header className="chapter-head">
        <div className="chapter-kicker">
          <span className="chapter-number">英雄榜</span>
          <span className="arc-badge arc-tone-cinnabar">排行榜</span>
        </div>
        <h2 className="chapter-title">
          <span>水滸群英</span>
          <span>諸榜</span>
        </h2>
        <div className="chapter-meta">
          <span>
            榜單 <b>{allRankings.length}</b>
          </span>
          <span>
            分類 <b>{sortedGroups(allRankings).length}</b>
          </span>
        </div>
        <p className="chapter-note">
          以人物為單位的趣味統計：能由事件資料推算者標「依資料推定」，需人工擷取者標「趣味策展」。點榜單看排行，點人物看統計來源。
        </p>
      </header>

      <label className="hero-search ranking-search">
        <Search size={13} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜尋榜單"
          aria-label="搜尋榜單"
        />
        {query && (
          <button type="button" onClick={() => setQuery('')} aria-label="清除搜尋">
            <X size={12} />
          </button>
        )}
      </label>

      {groups.length === 0 ? (
        <div className="empty-state">
          <div className="empty-mark" aria-hidden="true">
            無
          </div>
          <strong>沒有符合的榜單</strong>
          試試其他關鍵字。
        </div>
      ) : (
        groups.map((group) => (
          <section key={group.id} className="ranking-group">
            <div className="section-heading">
              {group.name}
              <span className="section-count">{group.categories.length}</span>
            </div>
            <div className="ranking-nav">
              {group.categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`ranking-nav-item${category.id === selectedId ? ' is-active' : ''}`}
                  onClick={() => onSelect(category.id)}
                  aria-pressed={category.id === selectedId}
                >
                  <span className="ranking-nav-name">{category.name}</span>
                  <span className={`basis-dot basis-${category.basis}`} aria-hidden="true" />
                </button>
              ))}
            </div>
          </section>
        ))
      )}

      <div className="sidebar-foot">
        榜單為娛樂性整理，部分數值為概略或主觀；實際出處以來源章回為準。
      </div>
    </div>
  )
}

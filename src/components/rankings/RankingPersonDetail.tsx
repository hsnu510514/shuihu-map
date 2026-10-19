import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { chapterByNumber } from '../../data/chapters'
import { eventById } from '../../data/events'
import { figureById } from '../../data/figures'
import type { RankingCategory, RankingEntry } from '../../data/types'
import { basisLabel } from '../../lib/rankings'

interface RankingPersonDetailProps {
  category: RankingCategory
  entry: RankingEntry
  onClose: () => void
}

export function RankingPersonDetail({ category, entry, onClose }: RankingPersonDetailProps) {
  const navigate = useNavigate()
  const figure = figureById[entry.figureId]
  const valueText = entry.display ?? `${entry.value}${category.unit ?? ''}`

  return (
    <aside className="ranking-detail" aria-label={`${figure?.name ?? entry.figureId}統計來源`}>
      <button
        type="button"
        className="hero-detail-close"
        onClick={onClose}
        aria-label="關閉統計來源"
      >
        <X size={14} />
      </button>
      <div className="hero-detail-kicker">
        {category.name} · {basisLabel[category.basis]}
      </div>
      <h3 className="hero-detail-name">
        {figure?.name ?? entry.figureId}
        {figure?.nickname && <span>{figure.nickname}</span>}
      </h3>
      <div className="ranking-detail-value">
        {category.metrics ? (
          category.metrics.map((metric) => (
            <span key={metric.key} className="ranking-detail-metric">
              <em>{metric.name}</em>
              <b>{entry.metrics?.[metric.key] ?? 0}</b>
            </span>
          ))
        ) : (
          <>
            <b>{valueText}</b>
            {category.unit && <em>{category.unit}</em>}
          </>
        )}
      </div>
      {figure && (
        <p className="ranking-detail-role">
          {figure.affiliation}
          {figure.role ? ` · ${figure.role}` : ''}
        </p>
      )}
      {entry.note && <p className="hero-detail-note">{entry.note}</p>}

      <div className="ranking-source-head">統計來源</div>
      {entry.sources.length === 0 ? (
        <p className="ranking-source-empty">暫無逐條來源。</p>
      ) : (
        <ol className="ranking-source-list">
          {entry.sources.map((source, index) => {
            const chapter = chapterByNumber[source.chapter]
            const event = source.eventId ? eventById[source.eventId] : null
            return (
              <li key={`${entry.figureId}-${source.chapter}-${index}`}>
                <button
                  type="button"
                  className="ranking-source"
                  onClick={() => {
                    const params = new URLSearchParams({ chapter: String(source.chapter) })
                    if (source.eventId) params.set('event', source.eventId)
                    navigate(`/story?${params.toString()}`)
                  }}
                >
                  <span className="ranking-source-chapter">第{source.chapter}回</span>
                  <span className="ranking-source-body">
                    <span className="ranking-source-title">
                      {event?.title ?? chapter?.title ?? '章回事件'}
                    </span>
                    {source.note && <span className="ranking-source-note">{source.note}</span>}
                    {source.quote && (
                      <span className="ranking-source-quote">「{source.quote}」</span>
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      )}

      {figure?.kind === 'hero' && (
        <button
          type="button"
          className="ranking-detail-link"
          onClick={() => navigate(`/heroes?chapter=${entry.sources[0]?.chapter ?? 1}&hero=${figure.id}`)}
        >
          看好漢行蹤 →
        </button>
      )}
      {figure && (
        <button
          type="button"
          className="ranking-detail-link"
          onClick={() => navigate(`/biographies?figure=${figure.id}`)}
        >
          看人物誌 →
        </button>
      )}
    </aside>
  )
}

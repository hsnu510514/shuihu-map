import { useMemo } from 'react'
import { figureById } from '../../data/figures'
import type { RankingCategory, RankingEntry } from '../../data/types'
import { RankingPersonDetail } from './RankingPersonDetail'
import { basisLabel, reliabilityLabel } from '../../lib/rankings'

interface RankedEntry {
  entry: RankingEntry
  rank: number
}

function entryKey(entry: RankingEntry): string {
  return entry.id ?? entry.figureId
}

function rankEntries(category: RankingCategory): RankedEntry[] {
  const sorted = [...category.entries].sort((left, right) =>
    category.direction === 'asc' ? left.value - right.value : right.value - left.value,
  )
  let lastValue: number | null = null
  let rank = 0
  return sorted.map((entry, index) => {
    if (lastValue === null || entry.value !== lastValue) {
      rank = index + 1
      lastValue = entry.value
    }
    return { entry, rank }
  })
}

interface RankingBoardProps {
  category: RankingCategory
  selectedKey: string | null
  onSelectKey: (key: string | null) => void
}

export function RankingBoard({ category, selectedKey, onSelectKey }: RankingBoardProps) {
  const ranked = useMemo(() => rankEntries(category), [category])
  const showBar = category.bar !== false

  const { max, min } = useMemo(() => {
    const values = ranked.map((item) => item.entry.value)
    const positive = values.filter((value) => value > 0)
    return {
      max: Math.max(...values, 1),
      min: positive.length > 0 ? Math.min(...positive) : 1,
    }
  }, [ranked])

  const ratio = (value: number) => {
    if (category.direction === 'asc') return Math.min(1, min / Math.max(value, 1))
    return Math.min(1, value / max)
  }

  const metricScale = useMemo(() => {
    if (!category.metrics) return null
    let scale = 1
    for (const item of ranked) {
      for (const metric of category.metrics) {
        scale = Math.max(scale, item.entry.metrics?.[metric.key] ?? 0)
      }
    }
    return scale
  }, [category, ranked])

  const selected = selectedKey
    ? ranked.find((item) => entryKey(item.entry) === selectedKey) ?? null
    : null

  return (
    <div className={`ranking-board${selected ? ' has-detail' : ''}${showBar ? '' : ' is-barless'}`}>
      <div className="ranking-board-main">
        <header className="ranking-head">
          <div className="ranking-head-top">
            <h2 className="ranking-title">{category.name}</h2>
            <span className={`basis-badge basis-${category.basis}`}>
              {basisLabel[category.basis]}
            </span>
            {category.reliability && (
              <span className={`reliability-badge reliability-${category.reliability}`}>
                {reliabilityLabel[category.reliability]}
              </span>
            )}
          </div>
          <p className="ranking-description">{category.description}</p>
          <div className="ranking-head-meta">
            共 <b>{ranked.length}</b> 位
            {!category.metrics && category.unit && <span>單位：{category.unit}</span>}
          </div>
          {category.metrics && (
            <div className="ranking-legend">
              {category.metrics.map((metric) => (
                <span key={metric.key} className="ranking-legend-item">
                  <i className={`metric-${metric.key}`} aria-hidden="true" />
                  {metric.name}
                </span>
              ))}
              <span className="ranking-legend-scale">全部同尺度（滿格＝{metricScale}）</span>
            </div>
          )}
        </header>

        <ol className="ranking-list">
          {ranked.map(({ entry, rank }) => {
            const figure = figureById[entry.figureId]
            const key = entryKey(entry)
            const isSelected = key === selectedKey
            return (
              <li key={key} className="ranking-row-item">
                <button
                  type="button"
                  className={`ranking-row${isSelected ? ' is-selected' : ''}${
                    rank <= 3 ? ` is-top is-top-${rank}` : ''
                  }`}
                  onClick={() => onSelectKey(isSelected ? null : key)}
                  aria-pressed={isSelected}
                >
                  <span className="ranking-rank">{rank}</span>
                  <span className="ranking-person">
                    <span className="ranking-person-name">
                      {figure?.name ?? entry.figureId}
                      {figure?.nickname && (
                        <span className="ranking-person-nickname">{figure.nickname}</span>
                      )}
                    </span>
                    {figure?.role && <span className="ranking-person-role">{figure.role}</span>}
                  </span>
                  {showBar && (
                    <span
                      className={`ranking-bar${category.metrics ? ' is-grouped' : ''}`}
                      aria-hidden="true"
                    >
                      {category.metrics ? (
                        category.metrics.map((metric) => (
                          <span key={metric.key} className="ranking-mini-track">
                            <span
                              className={`ranking-mini-fill metric-${metric.key}`}
                              style={{
                                width: `${
                                  ((entry.metrics?.[metric.key] ?? 0) /
                                    (metricScale ?? 1)) *
                                  100
                                }%`,
                              }}
                            />
                          </span>
                        ))
                      ) : (
                        <span
                          className="ranking-bar-fill"
                          style={{ width: `${ratio(entry.value) * 100}%` }}
                        />
                      )}
                    </span>
                  )}
                  <span className="ranking-value">
                    {category.metrics ? (
                      category.metrics.map((metric) => (
                        <span key={metric.key} className="ranking-metric">
                          <em>{metric.name}</em>
                          <b>{entry.metrics?.[metric.key] ?? 0}</b>
                          {metric.unit && <i>{metric.unit}</i>}
                        </span>
                      ))
                    ) : (
                      <>
                        {entry.display ?? entry.value}
                        {category.unit && <em>{category.unit}</em>}
                      </>
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        {category.topN && ranked.length > category.topN && (
          <p className="ranking-more">其餘 {ranked.length - category.topN} 位從略。</p>
        )}
      </div>

      {selected && (
        <RankingPersonDetail
          category={category}
          entry={selected.entry}
          onClose={() => onSelectKey(null)}
        />
      )}
    </div>
  )
}

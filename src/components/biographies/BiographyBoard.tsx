import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, GitFork } from 'lucide-react'
import { chapterByNumber } from '../../data/chapters'
import { figureById } from '../../data/figures'
import { heroById } from '../../data/heroes'
import type { Figure } from '../../data/types'
import {
  buildAchievements,
  buildProfile,
  profileTypeMeta,
  profileTypeOrder,
  type FigureStats,
  type ProfileEntry,
  type ProfileEntryType,
} from '../../lib/figureProfile'
import { FigurePortrait } from './FigurePortrait'

interface BiographyBoardProps {
  figureId: string | null
  onSelectFigure: (id: string) => void
}

const fateLabel = (fate: string) => (fate === '其他' ? '遇害／自盡' : fate)

function chapterRange(entry: ProfileEntry): string {
  if (entry.endChapter && entry.endChapter !== entry.chapter) {
    return `第 ${entry.chapter}–${entry.endChapter} 回`
  }
  return `第 ${entry.chapter} 回`
}

function StatStrip({ stats }: { stats: FigureStats }) {
  const items: Array<{ label: string; value: number }> = [
    { label: '章回事蹟', value: stats.events },
    { label: '互動', value: stats.interactions },
    { label: '擒獲', value: stats.capturesMade },
    { label: '被擒', value: stats.captured },
    { label: '單挑勝', value: stats.fightsWon },
    { label: '單挑負', value: stats.fightsLost },
    { label: '殺伐', value: stats.kills },
    { label: '戰役', value: stats.campaigns },
  ].filter((item) => item.value > 0)
  if (items.length === 0) return null
  return (
    <dl className="bio-stats">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Facts({ figure }: { figure: Figure }) {
  const facts: Array<{ term: string; value: string }> = []
  if (figure.kind === 'hero' && figure.rank !== undefined) {
    facts.push({ term: '座次', value: `第 ${figure.rank} 席` })
    if (figure.star) facts.push({ term: '星號', value: figure.star })
  }
  facts.push({ term: '身分', value: figure.role })
  facts.push({ term: '陣營', value: figure.affiliation })
  if (figure.aliases && figure.aliases.length > 0) {
    facts.push({ term: '別稱', value: figure.aliases.join('、') })
  }
  if (figure.firstChapter) facts.push({ term: '初登場', value: `第 ${figure.firstChapter} 回` })
  if (figure.kind === 'hero') {
    const hero = heroById[figure.id]
    if (hero) {
      if (hero.joinChapter !== hero.firstChapter) {
        facts.push({ term: '入山', value: `第 ${hero.joinChapter} 回` })
      }
      facts.push({
        term: '結局',
        value: hero.fateChapter
          ? `第 ${hero.fateChapter} 回・${fateLabel(hero.fate)}`
          : fateLabel(hero.fate),
      })
    }
  }
  return (
    <dl className="bio-facts">
      {facts.map((fact) => (
        <div key={fact.term}>
          <dt>{fact.term}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function EntryCard({
  entry,
  onGo,
  onSelectFigure,
}: {
  entry: ProfileEntry
  onGo: (entry: ProfileEntry) => void
  onSelectFigure: (id: string) => void
}) {
  const meta = profileTypeMeta[entry.type]
  const chapter = chapterByNumber[entry.chapter]
  return (
    <li className="bio-entry">
      <div className="bio-entry-rail">
        <span className="bio-entry-chapter">{chapterRange(entry)}</span>
        {chapter && <span className="bio-entry-chapter-title">{chapter.title}</span>}
      </div>
      <div className="bio-entry-body">
        <div className="bio-entry-top">
          <span className={`bio-type-badge tone-${meta.tone}`}>{meta.label}</span>
          {entry.label && <span className="bio-entry-tag">{entry.label}</span>}
          <button type="button" className="bio-entry-title" onClick={() => onGo(entry)}>
            {entry.title}
          </button>
        </div>
        {entry.summary && <p className="bio-entry-summary">{entry.summary}</p>}
        {entry.quote && <p className="bio-entry-quote">「{entry.quote}」</p>}
        {entry.others && entry.others.length > 0 && (
          <div className="bio-entry-others">
            {entry.others.map((otherId) => {
              const other = figureById[otherId]
              if (!other) return null
              return (
                <button
                  key={otherId}
                  type="button"
                  className="bio-other-chip"
                  onClick={() => onSelectFigure(otherId)}
                >
                  {other.name}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </li>
  )
}

export function BiographyBoard({ figureId, onSelectFigure }: BiographyBoardProps) {
  const navigate = useNavigate()
  const [hiddenTypes, setHiddenTypes] = useState<Set<ProfileEntryType>>(new Set())

  const profile = figureId ? buildProfile(figureId) : null

  const visibleTypes = useMemo(() => {
    if (!profile) return [] as ProfileEntryType[]
    return profileTypeOrder.filter((type) => profile.counts[type] > 0)
  }, [profile])

  const entries = useMemo(() => {
    if (!profile) return []
    return profile.entries.filter((entry) => !hiddenTypes.has(entry.type))
  }, [profile, hiddenTypes])

  const goToEntry = (entry: ProfileEntry) => {
    const params = new URLSearchParams({ chapter: String(entry.chapter) })
    if (entry.eventId) params.set('event', entry.eventId)
    navigate(`/story?${params.toString()}`)
  }

  const toggleType = (type: ProfileEntryType) => {
    setHiddenTypes((current) => {
      const next = new Set(current)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  if (!profile) {
    return (
      <div className="biography-board is-empty">
        <div className="empty-state bio-empty">
          <div className="empty-mark" aria-hidden="true">
            傳
          </div>
          <strong>擇一人以觀其生平</strong>
          自左欄選取人物，中央將呈現其畫像、身分與編年事蹟。
        </div>
      </div>
    )
  }

  const { figure, stats } = profile

  const achievements = buildAchievements(figure.id)

  const goToAchievement = (item: { chapter?: number; eventId?: string }) => {
    const params = new URLSearchParams({ chapter: String(item.chapter ?? 1) })
    if (item.eventId) params.set('event', item.eventId)
    navigate(`/story?${params.toString()}`)
  }

  return (
    <div className="biography-board">
      <header className="bio-head">
        <div className="bio-head-kicker">
          {figure.kind === 'hero' && figure.rank !== undefined ? (
            <span>
              {figure.star} · 第 {figure.rank} 席
            </span>
          ) : (
            <span>{figure.role}</span>
          )}
          <span className="bio-head-affil">{figure.affiliation}</span>
        </div>
        <h2 className="bio-head-name">
          {figure.name}
          {figure.nickname && <span>{figure.nickname}</span>}
        </h2>
        <div className="bio-head-links">
          {figure.kind === 'hero' && (
            <button
              type="button"
              onClick={() =>
                navigate(`/heroes?chapter=${figure.firstChapter ?? 1}&hero=${figure.id}`)
              }
            >
              <BookOpen size={13} aria-hidden="true" />
              好漢行蹤
            </button>
          )}
          <button type="button" onClick={() => navigate(`/relations?figure=${figure.id}`)}>
            <GitFork size={13} aria-hidden="true" />
            人物關係
          </button>
        </div>
      </header>

      <div className="bio-overview">
        <FigurePortrait figure={figure} />
        <div className="bio-overview-side">
          <Facts figure={figure} />
          <StatStrip stats={stats} />
        </div>
      </div>

      <section className="bio-highlights" aria-label="重大事蹟">
        <div className="bio-timeline-head">
          <h3>重大事蹟</h3>
          <span className="bio-timeline-count">生平功績</span>
        </div>
        <div className="bio-highlight-prose">
          {achievements.map((item) => (
            <p key={item.id} className="bio-highlight-item">
              <button
                type="button"
                className="bio-highlight-text"
                onClick={() => goToAchievement(item)}
              >
                {item.text}
              </button>
              {item.chapter !== undefined && (
                <span className="bio-highlight-ref">第{item.chapter}回</span>
              )}
            </p>
          ))}
          {achievements.length === 0 && (
            <p className="bio-highlight-empty">暫無可考的重大事蹟，詳見下方編年事蹟。</p>
          )}
        </div>
      </section>

      <div className="bio-timeline-head">
        <h3>編年事蹟</h3>
        <span className="bio-timeline-count">完整 {entries.length} 條</span>
      </div>

      <div className="bio-filters" role="group" aria-label="事蹟類型">
        {visibleTypes.map((type) => {
          const on = !hiddenTypes.has(type)
          return (
            <button
              key={type}
              type="button"
              className={`bio-filter${on ? ' is-on' : ''}`}
              aria-pressed={on}
              onClick={() => toggleType(type)}
            >
              <i className={`tone-${profileTypeMeta[type].tone}`} aria-hidden="true" />
              {profileTypeMeta[type].label}
              <span>{profile.counts[type]}</span>
            </button>
          )
        })}
      </div>

      {entries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-mark" aria-hidden="true">
            無
          </div>
          <strong>此條件下無事蹟</strong>
          試著開啟其他類型。
        </div>
      ) : (
        <ol className="bio-entries">
          {entries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onGo={goToEntry}
              onSelectFigure={onSelectFigure}
            />
          ))}
        </ol>
      )}
    </div>
  )
}

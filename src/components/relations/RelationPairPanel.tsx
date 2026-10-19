import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { eventById } from '../../data/events'
import { interactionsForPair } from '../../data/interactions'
import { relationTypeMeta } from '../../data/relations'
import type { Figure } from '../../data/types'
import { phaseAt, phaseRange, relationsBetween } from '../../lib/relationsGraph'

interface RelationPairPanelProps {
  focusFigure: Figure
  partner: Figure
  chapter: number
  allChapters: boolean
  onClose: () => void
  onFocusPartner: () => void
}

export function RelationPairPanel({
  focusFigure,
  partner,
  chapter,
  allChapters,
  onClose,
  onFocusPartner,
}: RelationPairPanelProps) {
  const navigate = useNavigate()

  const relationPhases = useMemo(() => {
    return relationsBetween(focusFigure.id, partner.id)
      .flatMap((relation) =>
        [...relation.phases]
          .sort((a, b) => a.fromChapter - b.fromChapter)
          .map((phase) => ({
            relation,
            phase,
            isCurrent: !allChapters && phaseAt(relation, chapter) === phase,
          })),
      )
      .sort((a, b) => a.phase.fromChapter - b.phase.fromChapter)
  }, [allChapters, chapter, focusFigure.id, partner.id])

  const keyEvents = useMemo(
    () => interactionsForPair(focusFigure.id, partner.id),
    [focusFigure.id, partner.id],
  )

  const firstChapter = relationPhases[0]?.phase.fromChapter
  const lastPhase = relationPhases[relationPhases.length - 1]?.phase
  const range =
    firstChapter === undefined || !lastPhase
      ? ''
      : lastPhase.toChapter === undefined
        ? `第${firstChapter}回起`
        : lastPhase.toChapter === firstChapter
          ? `第${firstChapter}回`
          : `第${firstChapter}–${lastPhase.toChapter}回`

  return (
    <aside
      className="relation-pair-panel"
      aria-label={`${focusFigure.name}與${partner.name}的互動`}
    >
      <button
        type="button"
        className="relation-pair-close"
        onClick={onClose}
        aria-label="關閉兩人互動面板"
      >
        <X size={15} />
      </button>

      <div className="relation-pair-kicker">
        兩人互動 · {allChapters ? '全書' : `第${chapter}回`}
      </div>
      <h2 className="relation-pair-title">
        <span>{focusFigure.name}</span>
        <em>與</em>
        <span>{partner.name}</span>
      </h2>
      <div className="relation-pair-meta">
        <span>{focusFigure.role}</span>
        <span>{partner.role}</span>
        {range && <span>{range}</span>}
        <span>
          {keyEvents.length} 則互動 · {relationPhases.length} 段關係
        </span>
      </div>

      <div className="relation-pair-body">
        {keyEvents.length > 0 && (
          <>
            <div className="relation-pair-section-title">重要互動</div>
            {keyEvents.map((interaction) => {
              const event = interaction.eventId ? eventById[interaction.eventId] : null
              const isCurrent = !allChapters && interaction.chapter === chapter
              return (
                <article
                  key={interaction.id}
                  className={`relation-pair-item${isCurrent ? ' is-current' : ''}`}
                >
                  <div className="relation-pair-item-top">
                    <span className="relation-pair-range">
                      第{interaction.chapter}回
                      {interaction.endChapter && interaction.endChapter !== interaction.chapter
                        ? `–${interaction.endChapter}`
                        : ''}
                    </span>
                    {isCurrent && <span className="relation-phase-now">本章</span>}
                  </div>
                  <strong>{interaction.label}</strong>
                  <p>{interaction.summary}</p>
                  {interaction.quote && <blockquote>「{interaction.quote}」</blockquote>}
                  {event && (
                    <button
                      type="button"
                      className="relation-event-link"
                      onClick={() =>
                        navigate(`/story?chapter=${event.chapter}&event=${event.id}`)
                      }
                    >
                      第{event.chapter}回 · {event.title}
                    </button>
                  )}
                </article>
              )
            })}
          </>
        )}

        {relationPhases.length > 0 ? (
          <>
            <div className="relation-pair-section-title">關係階段</div>
            {relationPhases.map(({ relation, phase, isCurrent }) => {
              const event = phase.eventId ? eventById[phase.eventId] : null
              const meta = relationTypeMeta[phase.type]
              const showDetail = keyEvents.length === 0
              return (
                <article
                  key={`${relation.id}-${phase.fromChapter}-${phase.type}`}
                  className={`relation-pair-item relation-pair-item-phase tone-${meta.tone}${
                    isCurrent ? ' is-current' : ''
                  }`}
                >
                  <div className="relation-pair-item-top">
                    <span className="relation-pair-range">{phaseRange(phase)}</span>
                    <span className="relation-phase-type">{meta.label}</span>
                    {isCurrent && <span className="relation-phase-now">目前</span>}
                  </div>
                  <strong>{phase.label}</strong>
                  {showDetail && <p>{phase.summary}</p>}
                  {showDetail && event && (
                    <button
                      type="button"
                      className="relation-event-link"
                      onClick={() =>
                        navigate(`/story?chapter=${event.chapter}&event=${event.id}`)
                      }
                    >
                      第{event.chapter}回 · {event.title}
                    </button>
                  )}
                </article>
              )
            })}
          </>
        ) : (
          keyEvents.length === 0 && (
            <p className="relation-pair-empty">這兩人之間目前沒有收錄互動。</p>
          )
        )}
      </div>

      <div className="relation-pair-foot">
        <button type="button" className="relation-pair-jump" onClick={onFocusPartner}>
          以 {partner.name} 為中心
          <ArrowRight size={15} />
        </button>
        <span>跳轉後會重新整理周邊關係。</span>
      </div>
    </aside>
  )
}

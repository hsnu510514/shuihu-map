import { useNavigate } from 'react-router-dom'
import { arcForChapter } from '../../data/arcs'
import { chapterByNumber } from '../../data/chapters'
import { eventsForChapter } from '../../data/events'
import { heroById } from '../../data/heroes'
import { placeById } from '../../data/places'
import { useAppStore } from '../../store/appStore'
import type { EventKind, StoryEvent } from '../../data/types'

const eventKindLabel: Record<EventKind, string> = {
  journey: '行旅',
  battle: '征戰',
  rescue: '救援',
  gathering: '聚義',
  death: '生死',
  court: '朝廷',
  origin: '緣起',
  other: '記事',
}

function EventCard({ event, isSelected }: { event: StoryEvent; isSelected: boolean }) {
  const selectEvent = useAppStore((state) => state.selectEvent)
  const selectPlace = useAppStore((state) => state.selectPlace)
  const navigate = useNavigate()

  return (
    <article className={`event-card${isSelected ? ' is-selected' : ''}`}>
      <button
        type="button"
        className="event-main"
        onClick={() => selectEvent(isSelected ? null : event.id)}
        aria-pressed={isSelected}
      >
        <span className="event-kind">
          {eventKindLabel[event.kind]}
          {event.endChapter ? ` · 第${event.chapter}–${event.endChapter}回` : ''}
        </span>
        <span className="event-title">
          {event.title}
          {event.site && <span className="event-site">{event.site}</span>}
        </span>
        <span className="event-summary">{event.summary}</span>
        {event.quote && <span className="event-quote">「{event.quote}」</span>}
      </button>

      <div className="event-foot" aria-label="事件地點與人物">
        {event.placeIds.map((placeId, index) => {
          const place = placeById[placeId]
          if (!place) return null
          return (
            <span key={placeId}>
              {index > 0 && <span className="chip-sep">·</span>}
              <button
                type="button"
                className="chip"
                onClick={() => selectPlace(placeId)}
                title={`${place.name}：${place.modern}`}
              >
                {place.name}
              </button>
            </span>
          )
        })}
        {event.heroIds.length > 0 && <span className="chip-sep">｜</span>}
        {event.heroIds.map((heroId) => {
          const hero = heroById[heroId]
          if (!hero) return null
          return (
            <button
              key={heroId}
              type="button"
              className="chip chip-hero"
              onClick={() => {
                navigate(`/heroes?chapter=${event.chapter}&hero=${hero.id}`)
              }}
              title={`在好漢行蹤中查看${hero.name}`}
            >
              {hero.name}
            </button>
          )
        })}
      </div>
    </article>
  )
}

export function StorySidebar() {
  const chapter = useAppStore((state) => state.chapter)
  const selectedEventId = useAppStore((state) => state.selectedEventId)
  const chapterData = chapterByNumber[chapter]
  const arc = arcForChapter(chapter)
  const events = eventsForChapter(chapter)
  const clauses = chapterData?.title.split('　') ?? ['']
  const placeCount = new Set(events.flatMap((event) => event.placeIds)).size

  return (
    <div className="sidebar-inner">
      <header className="chapter-head">
        <div className="chapter-kicker">
          <span className="chapter-number">第 {chapter} 回</span>
          <span className={`arc-badge arc-tone-${arc.tone}`}>{arc.name}</span>
        </div>
        <h2 className="chapter-title">
          {clauses.map((clause) => (
            <span key={clause}>{clause}</span>
          ))}
        </h2>
        <div className="chapter-meta">
          <span>
            事件 <b>{events.length}</b>
          </span>
          <span>
            地點 <b>{placeCount}</b>
          </span>
          <span>
            人物 <b>{new Set(events.flatMap((event) => event.heroIds)).size}</b>
          </span>
        </div>
        <p className="chapter-note">
          事件摘要為編者整理，地名依宋代治所與小說敘事定位；虛構地名以約略位置示意。
        </p>
      </header>

      <div className="section-heading">本章事件</div>

      {events.length > 0 ? (
        <div className="event-list">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isSelected={event.id === selectedEventId}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-mark" aria-hidden="true">
            待補
          </div>
          <strong>此回事件尚在整理</strong>
          章回骨架、地名與地圖互動已就緒，事件條目會隨內容建置逐步補齊。
        </div>
      )}

      <div className="sidebar-foot">
        《水滸傳》一百二十回本 · 事件與位置為文學地圖整理，非史料考證定本。
        <br />
        點選事件可在地圖上定位；點選地名可查看考證說明。
      </div>
    </div>
  )
}

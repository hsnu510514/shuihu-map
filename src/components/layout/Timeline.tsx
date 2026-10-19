import { useEffect, useMemo, useRef, useState, type PointerEvent, type KeyboardEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, List, Pause, Play, X } from 'lucide-react'
import { arcs } from '../../data/arcs'
import { chapters, chapterByNumber } from '../../data/chapters'
import { useAppStore } from '../../store/appStore'

const TOTAL = 120
const PX_PER_CHAPTER = 20
const CANVAS_WIDTH = TOTAL * PX_PER_CHAPTER

function ChapterOverview({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const chapter = useAppStore((state) => state.chapter)
  const setChapter = useAppStore((state) => state.setChapter)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="chapter-overview-overlay" />
        <Dialog.Content className="chapter-overview">
          <div className="chapter-overview-head">
            <div>
              <Dialog.Title className="chapter-overview-title">回目總覽</Dialog.Title>
              <Dialog.Description className="chapter-overview-desc">
                點選任一回目即可跳到該章。
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button type="button" className="chapter-overview-close" aria-label="關閉回目總覽">
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>
          <div className="chapter-overview-body">
            {arcs.map((arc) => (
              <section key={arc.id} className="chapter-overview-arc">
                <h3 className={`chapter-overview-arc-name arc-tone-${arc.tone}`}>
                  {arc.name}
                  <span>
                    第{arc.from}–{arc.to}回
                  </span>
                </h3>
                <div className="chapter-overview-grid">
                  {chapters
                    .filter((item) => item.n >= arc.from && item.n <= arc.to)
                    .map((item) => (
                      <button
                        key={item.n}
                        type="button"
                        className={`chapter-overview-item${
                          item.n === chapter ? ' is-current' : ''
                        }`}
                        onClick={() => {
                          setChapter(item.n)
                          onOpenChange(false)
                        }}
                      >
                        <span className="chapter-overview-number">第{item.n}回</span>
                        <span className="chapter-overview-name">{item.title}</span>
                      </button>
                    ))}
                </div>
              </section>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export function Timeline() {
  const chapter = useAppStore((state) => state.chapter)
  const setChapter = useAppStore((state) => state.setChapter)
  const [playing, setPlaying] = useState(false)
  const [overviewOpen, setOverviewOpen] = useState(false)
  const [hoverChapter, setHoverChapter] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const chapterData = chapterByNumber[chapter]

  const chapterAt = (clientX: number): number => {
    const track = trackRef.current
    if (!track) return chapter
    const rect = track.getBoundingClientRect()
    const offset = clientX - rect.left
    return Math.min(TOTAL, Math.max(1, Math.round(offset / PX_PER_CHAPTER) + 1))
  }

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      const next = useAppStore.getState().chapter + 1
      if (next > TOTAL) {
        setPlaying(false)
        return
      }
      setChapter(next)
    }, 1700)
    return () => window.clearInterval(timer)
  }, [playing, setChapter])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const target = (chapter - 1) * PX_PER_CHAPTER
    container.scrollTo({ left: Math.max(0, target - container.clientWidth / 2), behavior: 'smooth' })
  }, [chapter])

  const ticks = useMemo(
    () =>
      Array.from({ length: TOTAL }, (_, index) => {
        const n = index + 1
        const major = n === 1 || n === TOTAL || n % 10 === 0
        return { n, left: (n - 1) * PX_PER_CHAPTER, major }
      }),
    [],
  )

  const stopAndSet = (n: number) => {
    setPlaying(false)
    setChapter(Math.min(TOTAL, Math.max(1, n)))
  }

  const togglePlay = () => {
    if (playing) {
      setPlaying(false)
      return
    }
    if (chapter >= TOTAL) setChapter(1)
    setPlaying(true)
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    const next = chapterAt(event.clientX)
    setHoverChapter(next)
    stopAndSet(next)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const next = chapterAt(event.clientX)
    setHoverChapter(next)
    if (draggingRef.current) stopAndSet(next)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next = chapter
    if (event.key === 'ArrowLeft') next = chapter - 1
    else if (event.key === 'ArrowRight') next = chapter + 1
    else if (event.key === 'Home') next = 1
    else if (event.key === 'End') next = TOTAL
    else if (event.key === 'PageUp') next = chapter - 10
    else if (event.key === 'PageDown') next = chapter + 10
    else return
    event.preventDefault()
    stopAndSet(next)
  }

  return (
    <section className="timeline" aria-label="章回時間軸">
      <div className="timeline-top">
        <div className="timeline-heading">
          <span className="timeline-chapter">第 {chapter} 回</span>
          <span className="timeline-title">{chapterData?.title}</span>
        </div>
        <div className="timeline-controls">
          <button
            type="button"
            className="timeline-button"
            onClick={() => setOverviewOpen(true)}
            aria-label="回目總覽"
            title="回目總覽"
          >
            <List size={18} />
          </button>
          <button
            type="button"
            className="timeline-button"
            onClick={() => stopAndSet(chapter - 1)}
            aria-label="上一回"
            disabled={chapter <= 1}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className={`timeline-button${playing ? ' is-play' : ''}`}
            onClick={togglePlay}
            aria-label={playing ? '暫停播放' : '自動播放章回'}
            aria-pressed={playing}
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
          <button
            type="button"
            className="timeline-button"
            onClick={() => stopAndSet(chapter + 1)}
            aria-label="下一回"
            disabled={chapter >= TOTAL}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="timeline-scroll" ref={scrollRef}>
        <div className="timeline-canvas" style={{ width: CANVAS_WIDTH }}>
          <div className="timeline-arcs" aria-hidden="true">
            {arcs
              .filter((arc) => arc.from !== arc.to)
              .map((arc) => {
                const left = (arc.from - 1) * PX_PER_CHAPTER
                const width = (arc.to - arc.from) * PX_PER_CHAPTER
                const isCurrent = chapter >= arc.from && chapter <= arc.to
                return (
                  <div
                    key={arc.id}
                    className={`arc-band arc-tone-${arc.tone}${isCurrent ? ' is-current' : ''}`}
                    style={{ left, width: Math.max(width, 10) }}
                    title={`${arc.name}（第${arc.from}–${arc.to}回）`}
                  >
                    {width > 56 && <span>{arc.name}</span>}
                  </div>
                )
              })}
          </div>

          <div
            ref={trackRef}
            className="timeline-track"
            role="slider"
            tabIndex={0}
            aria-label="選擇章回"
            aria-valuemin={1}
            aria-valuemax={TOTAL}
            aria-valuenow={chapter}
            aria-valuetext={`第${chapter}回 ${chapterData?.title ?? ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={() => {
              if (!draggingRef.current) setHoverChapter(null)
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => setHoverChapter(null)}
          >
            <div className="timeline-rule" />
            <div className="timeline-ticks">
              {ticks.map((tick) => (
                <span
                  key={tick.n}
                  className={`timeline-tick${tick.major ? ' is-major' : ''}`}
                  style={{ left: tick.left }}
                />
              ))}
            </div>
            <div className="timeline-tick-labels" aria-hidden="true">
              {ticks
                .filter((tick) => tick.major)
                .map((tick) => (
                  <span key={tick.n} style={{ left: tick.left }}>
                    {tick.n}
                  </span>
                ))}
            </div>

            {hoverChapter !== null && (
              <>
                <span
                  className="timeline-hover-band"
                  style={{
                    left: (hoverChapter - 1) * PX_PER_CHAPTER - PX_PER_CHAPTER / 2,
                    width: PX_PER_CHAPTER,
                  }}
                  aria-hidden="true"
                />
                <div
                  className="timeline-hover"
                  style={{ left: (hoverChapter - 1) * PX_PER_CHAPTER }}
                  role="tooltip"
                >
                  <strong>第 {hoverChapter} 回</strong>
                  <span>{chapterByNumber[hoverChapter]?.title}</span>
                </div>
              </>
            )}

            <span
              className="timeline-marker"
              style={{ left: (chapter - 1) * PX_PER_CHAPTER }}
              aria-hidden="true"
            >
              <span className="timeline-marker-dot" />
              <span className="timeline-marker-line" />
            </span>
          </div>
        </div>
      </div>

      <ChapterOverview open={overviewOpen} onOpenChange={setOverviewOpen} />
    </section>
  )
}

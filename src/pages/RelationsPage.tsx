import { useState } from 'react'
import { RelationCanvas } from '../components/relations/RelationCanvas'
import { RelationsSidebar } from '../components/relations/RelationsSidebar'
import { relationTypeOrder } from '../lib/relationsGraph'
import type { RelationType } from '../data/types'

export function RelationsPage() {
  const [allChapters, setAllChapters] = useState(false)
  const [depth, setDepth] = useState<1 | 2>(1)
  const [includeEnded, setIncludeEnded] = useState(false)
  const [visibleTypes, setVisibleTypes] = useState<Set<RelationType>>(
    () => new Set(relationTypeOrder),
  )

  const toggleType = (type: RelationType) => {
    setVisibleTypes((current) => {
      const next = new Set(current)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next.size === 0 ? new Set(relationTypeOrder) : next
    })
  }

  return (
    <>
      <aside className="sidebar" aria-label="人物關係側欄">
        <RelationsSidebar
          allChapters={allChapters}
          depth={depth}
          includeEnded={includeEnded}
          visibleTypes={visibleTypes}
          onAllChaptersChange={setAllChapters}
          onDepthChange={setDepth}
          onIncludeEndedChange={setIncludeEnded}
          onToggleType={toggleType}
          onResetTypes={() => setVisibleTypes(new Set(relationTypeOrder))}
        />
      </aside>
      <main className="map-pane relation-pane" aria-label="水滸人物關係圖">
        <RelationCanvas
          allChapters={allChapters}
          depth={depth}
          includeEnded={includeEnded}
          visibleTypes={visibleTypes}
          onAllChaptersChange={setAllChapters}
          onIncludeEndedChange={setIncludeEnded}
        />
      </main>
    </>
  )
}

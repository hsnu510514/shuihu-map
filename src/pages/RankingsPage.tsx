import { useEffect } from 'react'
import { RankingsSidebar } from '../components/rankings/RankingsSidebar'
import { RankingBoard } from '../components/rankings/RankingBoard'
import { allRankings, rankingById } from '../lib/rankings'
import { useAppStore } from '../store/appStore'

export function RankingsPage() {
  const selectedRankingId = useAppStore((store) => store.selectedRankingId)
  const selectRanking = useAppStore((store) => store.selectRanking)
  const selectedFigureId = useAppStore((store) => store.selectedFigureId)
  const selectFigure = useAppStore((store) => store.selectFigure)

  const activeId =
    selectedRankingId && rankingById[selectedRankingId] ? selectedRankingId : allRankings[0].id

  useEffect(() => {
    if (!selectedRankingId) selectRanking(allRankings[0].id)
  }, [selectRanking, selectedRankingId])

  return (
    <>
      <aside className="sidebar ranking-nav-pane" aria-label="英雄榜側欄">
        <RankingsSidebar selectedId={activeId} onSelect={selectRanking} />
      </aside>
      <main className="map-pane ranking-pane" aria-label="水滸英雄榜">
        <RankingBoard
          category={rankingById[activeId]}
          selectedKey={selectedFigureId}
          onSelectKey={selectFigure}
        />
      </main>
    </>
  )
}

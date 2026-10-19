import { MapCanvas } from '../components/map/MapCanvas'
import { HeroSidebar } from '../components/heroes/HeroSidebar'

export function HeroPage() {
  return (
    <>
      <aside className="sidebar" aria-label="好漢行蹤側欄">
        <HeroSidebar />
      </aside>
      <main className="map-pane" aria-label="好漢行蹤地圖">
        <MapCanvas />
      </main>
    </>
  )
}

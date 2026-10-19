import { MapCanvas } from '../components/map/MapCanvas'
import { StorySidebar } from '../components/story/StorySidebar'

export function StoryPage() {
  return (
    <>
      <aside className="sidebar" aria-label="章回事件側欄">
        <StorySidebar />
      </aside>
      <main className="map-pane" aria-label="水滸故事地圖">
        <MapCanvas />
      </main>
    </>
  )
}

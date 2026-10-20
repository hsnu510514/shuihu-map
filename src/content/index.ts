import type { AtlasContent } from '@atlas/engine'
import { achievements } from './data/achievements'
import { arcs } from './data/arcs'
import { bios } from './data/bios'
import { chapters } from './data/chapters'
import { characters } from './data/characters'
import { campaigns, captures, fights, kills } from './data/deeds'
import { events } from './data/events'
import { figures } from './data/figures'
import { heroAnchorsByHero } from './data/heroPositions'
import { heroes } from './data/heroes'
import { interactions } from './data/interactions'
import { admin1Geo } from './data/map/admin1'
import { areas, frontiers, lakes, mapExtent, mapLabels, rivers } from './data/map/features'
import { landGeo } from './data/map/land'
import { places } from './data/places'
import { portraitsByFigure } from './data/portraits'
import { curatedRankings, rankingGroups } from './data/rankings'
import { relations } from './data/relations'
import { config } from './config'

export const content: AtlasContent = {
  schemaVersion: '1',
  config,
  chapters,
  arcs,
  places,
  events,
  heroes,
  characters,
  figures,
  heroAnchors: Object.values(heroAnchorsByHero).flat(),
  relations,
  interactions,
  rankingGroups,
  curatedRankings,
  bios,
  achievements,
  deeds: { captures, fights, kills, campaigns },
  portraits: portraitsByFigure,
  map: {
    landGeo,
    admin1Geo,
    rivers,
    lakes,
    areas,
    frontiers,
    labels: mapLabels,
    extent: mapExtent,
  },
}

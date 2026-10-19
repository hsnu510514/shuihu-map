import { describe, expect, it } from 'vitest'
import { chapters } from './chapters'
import { events } from './events'
import { heroes } from './heroes'
import { anchorsForHero, resolveHeroState, statesForChapter } from './heroPositions'
import { places } from './places'

describe('data integrity', () => {
  it('has 120 chapters and 108 heroes', () => {
    expect(chapters).toHaveLength(120)
    expect(heroes).toHaveLength(108)
  })

  it('has unique place and event ids', () => {
    expect(new Set(places.map((place) => place.id)).size).toBe(places.length)
    expect(new Set(events.map((event) => event.id)).size).toBe(events.length)
    expect(new Set(heroes.map((hero) => hero.id)).size).toBe(heroes.length)
  })

  it('has a unique rank from 1 to 108', () => {
    const ranks = heroes.map((hero) => hero.rank).sort((a, b) => a - b)
    expect(ranks).toEqual(Array.from({ length: 108 }, (_, index) => index + 1))
  })

  it('has coordinates inside the map extent', () => {
    for (const place of places) {
      const [lon, lat] = place.coord
      expect(lon).toBeGreaterThan(99)
      expect(lon).toBeLessThan(125)
      expect(lat).toBeGreaterThan(26)
      expect(lat).toBeLessThan(44)
    }
  })

  it('references only known places and heroes', () => {
    const placeIds = new Set(places.map((place) => place.id))
    const heroIds = new Set(heroes.map((hero) => hero.id))
    for (const event of events) {
      expect(event.chapter).toBeGreaterThanOrEqual(1)
      expect(event.chapter).toBeLessThanOrEqual(120)
      expect(event.placeIds.length).toBeGreaterThan(0)
      for (const id of event.placeIds) expect(placeIds.has(id), `${event.id}: ${id}`).toBe(true)
      for (const id of event.route ?? []) expect(placeIds.has(id), `${event.id} route: ${id}`).toBe(true)
      for (const id of event.heroIds) expect(heroIds.has(id), `${event.id} hero: ${id}`).toBe(true)
    }
    for (const hero of heroes) {
      if (hero.fatePlaceId) {
        expect(placeIds.has(hero.fatePlaceId), `${hero.id}: ${hero.fatePlaceId}`).toBe(true)
      }
    }
  })

  it('gives every chapter at least one event', () => {
    const covered = new Set(events.map((event) => event.chapter))
    const missing = chapters.filter((chapter) => !covered.has(chapter.n)).map((chapter) => chapter.n)
    expect(missing).toEqual([])
  })
})

describe('hero positions', () => {
  it('has anchors for all 108 heroes', () => {
    for (const hero of heroes) {
      expect(anchorsForHero(hero.id).length, hero.id).toBeGreaterThan(0)
    }
  })

  it('resolves key story positions', () => {
    expect(resolveHeroState('song-jiang', 38)).toMatchObject({ status: 'present', placeId: 'jiangzhou' })
    expect(resolveHeroState('song-jiang', 43)).toMatchObject({ status: 'present', placeId: 'liangshanpo' })
    expect(resolveHeroState('lin-chong', 10)).toMatchObject({ status: 'present', placeId: 'cangzhou' })
    expect(resolveHeroState('lin-chong', 11)).toMatchObject({ status: 'present', placeId: 'liangshanpo' })
    expect(resolveHeroState('lin-chong', 119)).toMatchObject({ status: 'dead', placeId: 'hangzhou' })
    expect(resolveHeroState('wu-song', 23)).toMatchObject({ placeId: 'yanggu' })
    expect(resolveHeroState('wu-song', 31)).toMatchObject({ placeId: 'mengzhou' })
    expect(resolveHeroState('wu-song', 119)).toMatchObject({ status: 'detached', placeId: 'hangzhou' })
    expect(resolveHeroState('lu-zhi-shen', 4)).toMatchObject({ placeId: 'wutaishan' })
    expect(resolveHeroState('lu-zhi-shen', 119)).toMatchObject({ status: 'dead', placeId: 'hangzhou' })
    expect(resolveHeroState('lu-jun-yi', 112)).toMatchObject({ placeId: 'xuanzhou' })
    expect(resolveHeroState('lu-jun-yi', 120)).toMatchObject({ status: 'dead', placeId: 'luzhou' })
    expect(resolveHeroState('zhang-shun', 114)).toMatchObject({ status: 'dead', placeId: 'yongjinmen' })
    expect(resolveHeroState('gong-sun-sheng', 110)).toMatchObject({ status: 'detached', placeId: 'erxianshan' })
  })

  it('puts all heroes at Liangshan for the 71st chapter', () => {
    const states = statesForChapter(71)
    expect(states.every((state) => state.status === 'present' && state.placeId === 'liangshanpo')).toBe(true)
  })

  it('keeps anchors inside the chapter range and references known places', () => {
    const placeIds = new Set(places.map((place) => place.id))
    for (const hero of heroes) {
      const anchors = anchorsForHero(hero.id)
      for (let index = 1; index < anchors.length; index += 1) {
        expect(anchors[index].chapter).toBeGreaterThanOrEqual(anchors[index - 1].chapter)
      }
      for (const anchor of anchors) {
        expect(anchor.chapter).toBeGreaterThanOrEqual(1)
        expect(anchor.chapter).toBeLessThanOrEqual(120)
        if (anchor.placeId) expect(placeIds.has(anchor.placeId), `${hero.id}: ${anchor.placeId}`).toBe(true)
      }
    }
  })
})

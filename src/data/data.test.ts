import { describe, expect, it } from 'vitest'
import { chapters } from './chapters'
import { characters } from './characters'
import { eventById, events } from './events'
import { figureById, figures } from './figures'
import { heroes } from './heroes'
import { interactions } from './interactions'
import { anchorsForHero, resolveHeroState, statesForChapter } from './heroPositions'
import { places } from './places'
import { relationTypeMeta, relations } from './relations'
import { captures, campaigns, fights, kills } from './deeds'
import { allRankings } from '../lib/rankings'
import { bios } from './bios'
import { portraitsByFigure } from './portraits'
import { buildProfile, figureGroupOf } from '../lib/figureProfile'

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

describe('relations data', () => {
  it('has unique figure, character and relation ids', () => {
    expect(new Set(characters.map((character) => character.id)).size).toBe(characters.length)
    expect(new Set(figures.map((figure) => figure.id)).size).toBe(figures.length)
    expect(new Set(relations.map((relation) => relation.id)).size).toBe(relations.length)
    const heroIds = new Set(heroes.map((hero) => hero.id))
    for (const character of characters) expect(heroIds.has(character.id), character.id).toBe(false)
  })

  it('references only known figures and has no self relations', () => {
    for (const relation of relations) {
      expect(figureById[relation.a], `${relation.id}: ${relation.a}`).toBeDefined()
      expect(figureById[relation.b], `${relation.id}: ${relation.b}`).toBeDefined()
      expect(relation.a).not.toBe(relation.b)
      expect(relation.phases.length).toBeGreaterThan(0)
    }
  })

  it('links every hero into the relationship graph', () => {
    const linked = new Set(relations.flatMap((relation) => [relation.a, relation.b]))
    const missing = heroes.filter((hero) => !linked.has(hero.id)).map((hero) => hero.id)
    expect(missing).toEqual([])
  })

  it('has ordered, non-overlapping phases with plot summaries', () => {
    for (const relation of relations) {
      const phases = [...relation.phases].sort((a, b) => a.fromChapter - b.fromChapter)
      expect(phases, relation.id).toHaveLength(relation.phases.length)
      for (let index = 0; index < phases.length; index += 1) {
        const phase = phases[index]
        expect(phase.fromChapter, relation.id).toBeGreaterThanOrEqual(1)
        expect(phase.fromChapter, relation.id).toBeLessThanOrEqual(120)
        if (phase.toChapter !== undefined) {
          expect(phase.toChapter, relation.id).toBeGreaterThanOrEqual(phase.fromChapter)
          expect(phase.toChapter, relation.id).toBeLessThanOrEqual(120)
        }
        expect(relationTypeMeta[phase.type], `${relation.id}: ${phase.type}`).toBeDefined()
        expect(phase.label.length, relation.id).toBeGreaterThan(1)
        expect(phase.summary.length, relation.id).toBeGreaterThan(12)
        if (phase.eventId) {
          const event = eventById[phase.eventId]
          expect(event, `${relation.id}: ${phase.eventId}`).toBeDefined()
          expect(event.chapter, relation.id).toBeGreaterThanOrEqual(phase.fromChapter)
          expect(event.chapter, relation.id).toBeLessThanOrEqual(
            phase.toChapter ?? 120,
          )
        }
        const next = phases[index + 1]
        if (next) {
          expect(next.fromChapter, relation.id).toBeGreaterThan(
            phase.toChapter ?? 120,
          )
        }
      }
      expect(phases.some((phase) => phase.eventId), relation.id).toBe(true)
    }
  })
})

describe('interactions data', () => {
  it('has unique interaction ids and known endpoints', () => {
    expect(new Set(interactions.map((interaction) => interaction.id)).size).toBe(
      interactions.length,
    )
    for (const interaction of interactions) {
      expect(figureById[interaction.a], `${interaction.id}: ${interaction.a}`).toBeDefined()
      expect(figureById[interaction.b], `${interaction.id}: ${interaction.b}`).toBeDefined()
      expect(interaction.a).not.toBe(interaction.b)
    }
  })

  it('keeps interaction chapters and plot summaries valid', () => {
    for (const interaction of interactions) {
      expect(interaction.chapter, interaction.id).toBeGreaterThanOrEqual(1)
      expect(interaction.chapter, interaction.id).toBeLessThanOrEqual(120)
      expect(interaction.label.length, interaction.id).toBeGreaterThan(1)
      expect(interaction.summary.length, interaction.id).toBeGreaterThan(12)
      if (interaction.endChapter !== undefined) {
        expect(interaction.endChapter, interaction.id).toBeGreaterThanOrEqual(
          interaction.chapter,
        )
        expect(interaction.endChapter, interaction.id).toBeLessThanOrEqual(120)
      }
      if (interaction.eventId) {
        const event = eventById[interaction.eventId]
        expect(event, `${interaction.id}: ${interaction.eventId}`).toBeDefined()
        expect(event.chapter, interaction.id).toBeGreaterThanOrEqual(interaction.chapter)
        expect(event.chapter, interaction.id).toBeLessThanOrEqual(
          interaction.endChapter ?? interaction.chapter,
        )
      }
    }
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

describe('rankings data', () => {
  it('has unique ranking ids with non-empty entries', () => {
    expect(new Set(allRankings.map((category) => category.id)).size).toBe(allRankings.length)
    for (const category of allRankings) {
      expect(category.entries.length, category.id).toBeGreaterThan(0)
      expect(category.name.length, category.id).toBeGreaterThan(1)
      expect(category.description.length, category.id).toBeGreaterThan(8)
    }
  })

  it('references known figures and valid chapters and events in sources', () => {
    for (const category of allRankings) {
      const keys = category.entries.map((entry) => entry.id ?? entry.figureId)
      expect(new Set(keys).size, category.id).toBe(keys.length)
      for (const entry of category.entries) {
        expect(figureById[entry.figureId], `${category.id}: ${entry.figureId}`).toBeDefined()
        expect(entry.value, `${category.id}: ${entry.figureId}`).toBeGreaterThanOrEqual(0)
        for (const source of entry.sources) {
          expect(source.chapter, `${category.id}: ${entry.figureId}`).toBeGreaterThanOrEqual(1)
          expect(source.chapter, `${category.id}: ${entry.figureId}`).toBeLessThanOrEqual(120)
          if (source.eventId) {
            expect(eventById[source.eventId], `${category.id}: ${source.eventId}`).toBeDefined()
          }
        }
      }
    }
  })
})

describe('deeds data', () => {
  const chaptersOk = (id: string, chapter: number) => {
    expect(chapter, id).toBeGreaterThanOrEqual(1)
    expect(chapter, id).toBeLessThanOrEqual(120)
  }

  it('has unique capture ids referencing known figures and chapters', () => {
    expect(new Set(captures.map((capture) => capture.id)).size).toBe(captures.length)
    for (const capture of captures) {
      expect(figureById[capture.figureId], capture.id).toBeDefined()
      if (capture.captorId) expect(figureById[capture.captorId], capture.id).toBeDefined()
      chaptersOk(capture.id, capture.chapter)
    }
  })

  it('has unique, resolvable fight records', () => {
    expect(new Set(fights.map((fight) => fight.id)).size).toBe(fights.length)
    for (const fight of fights) {
      expect(figureById[fight.winner], fight.id).toBeDefined()
      expect(figureById[fight.loser], fight.id).toBeDefined()
      expect(fight.winner).not.toBe(fight.loser)
      chaptersOk(fight.id, fight.chapter)
    }
  })

  it('has unique kill records with known killers', () => {
    expect(new Set(kills.map((kill) => kill.id)).size).toBe(kills.length)
    for (const kill of kills) {
      expect(figureById[kill.figureId], kill.id).toBeDefined()
      expect(kill.victims.length, kill.id).toBeGreaterThan(0)
      chaptersOk(kill.id, kill.chapter)
    }
  })

  it('has unique campaigns with known participants', () => {
    expect(new Set(campaigns.map((campaign) => campaign.id)).size).toBe(campaigns.length)
    for (const campaign of campaigns) {
      expect(campaign.participants.length, campaign.id).toBeGreaterThan(0)
      for (const participant of campaign.participants) {
        expect(figureById[participant], `${campaign.id}: ${participant}`).toBeDefined()
      }
      chaptersOk(campaign.id, campaign.fromChapter)
      if (campaign.toChapter !== undefined) {
        expect(campaign.toChapter, campaign.id).toBeGreaterThanOrEqual(campaign.fromChapter)
        expect(campaign.toChapter, campaign.id).toBeLessThanOrEqual(120)
      }
    }
  })
})

describe('biography data', () => {
  it('references known figures and valid chapters in curated highlights', () => {
    for (const [figureId, items] of Object.entries(bios)) {
      expect(figureById[figureId], figureId).toBeDefined()
      for (const item of items) {
        expect(item.title.length, figureId).toBeGreaterThan(1)
        expect(item.chapter, figureId).toBeGreaterThanOrEqual(1)
        expect(item.chapter, figureId).toBeLessThanOrEqual(120)
        if (item.eventId) {
          expect(eventById[item.eventId], `${figureId}: ${item.eventId}`).toBeDefined()
        }
      }
    }
  })

  it('references known figures and valid files in portraits', () => {
    for (const [figureId, sources] of Object.entries(portraitsByFigure)) {
      expect(figureById[figureId], figureId).toBeDefined()
      for (const source of sources) {
        expect(source.id.length, figureId).toBeGreaterThan(0)
        expect(source.label.length, figureId).toBeGreaterThan(0)
        expect(source.file.length, figureId).toBeGreaterThan(0)
      }
    }
  })

  it('builds a non-empty profile for every hero', () => {
    for (const hero of heroes) {
      const profile = buildProfile(hero.id)
      expect(profile, hero.id).not.toBeNull()
      expect(profile!.entries.length, hero.id).toBeGreaterThan(0)
    }
  })

  it('assigns every figure to a valid group', () => {
    for (const figure of figures) {
      expect(['tiangang', 'disha', 'other']).toContain(figureGroupOf(figure))
    }
  })
})

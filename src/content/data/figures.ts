import { characters } from './characters'
import { heroes } from './heroes'
import type { Figure } from './types'

const heroFigures: Figure[] = heroes.map((hero) => ({
  id: hero.id,
  name: hero.name,
  nickname: hero.nickname,
  affiliation: hero.faction,
  role: `${hero.star} · 第 ${hero.rank} 席`,
  kind: 'hero',
  rank: hero.rank,
  star: hero.star,
  firstChapter: hero.firstChapter,
  note: hero.note,
}))

const characterFigures: Figure[] = characters.map((character) => ({
  id: character.id,
  name: character.name,
  aliases: character.aliases,
  affiliation: character.affiliation,
  role: character.role,
  kind: 'character',
  firstChapter: character.firstChapter,
  note: character.note,
}))

export const figures: Figure[] = [...heroFigures, ...characterFigures]

export const figureById = Object.fromEntries(figures.map((figure) => [figure.id, figure]))

export function figureName(id: string): string {
  return figureById[id]?.name ?? id
}

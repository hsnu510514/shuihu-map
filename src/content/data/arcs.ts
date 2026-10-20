import type { Arc } from './types'

export const arcs: Arc[] = [
  { id: 'prologue', name: '楔子', from: 1, to: 1, tone: 'stone' },
  { id: 'rise', name: '逼上梁山', from: 2, to: 21, tone: 'ink' },
  { id: 'wusong', name: '武松', from: 22, to: 32, tone: 'ochre' },
  { id: 'jiangzhou', name: '清風寨・江州', from: 33, to: 42, tone: 'azurite' },
  { id: 'zhujiazhuang', name: '三打祝家莊', from: 43, to: 50, tone: 'moss' },
  { id: 'sanshan', name: '三山聚義', from: 51, to: 60, tone: 'cinnabar' },
  { id: 'daming', name: '大名府・曾頭市', from: 61, to: 70, tone: 'ink' },
  { id: 'assembly', name: '排座次・招安', from: 71, to: 82, tone: 'ochre' },
  { id: 'liao', name: '征遼', from: 83, to: 90, tone: 'azurite' },
  { id: 'tianhu', name: '征田虎', from: 91, to: 100, tone: 'moss' },
  { id: 'wangqing', name: '征王慶', from: 101, to: 110, tone: 'stone' },
  { id: 'fangla', name: '征方臘', from: 111, to: 119, tone: 'cinnabar' },
  { id: 'ending', name: '結局', from: 120, to: 120, tone: 'ink' },
]

export const arcById = Object.fromEntries(arcs.map((arc) => [arc.id, arc]))

export function arcForChapter(n: number): Arc {
  return arcs.find((arc) => n >= arc.from && n <= arc.to) ?? arcs[0]
}

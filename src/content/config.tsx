import type { AtlasConfig } from '@atlas/engine'
import { About } from './About'

export const config: AtlasConfig = {
  id: 'shuihu',
  title: '水滸輿圖',
  seal: '水滸',
  subtitle: '一百二十回 · 梁山泊英雄行跡',
  chapterUnit: '回',
  nav: [
    { id: 'story', to: '/story', label: '章回事件', caption: '事件' },
    { id: 'heroes', to: '/heroes', label: '好漢行蹤', caption: '行蹤' },
    { id: 'relations', to: '/relations', label: '人物關係', caption: '關係' },
    { id: 'rankings', to: '/rankings', label: '英雄榜', caption: '榜單' },
    { id: 'biographies', to: '/biographies', label: '人物誌', caption: '列傳' },
  ],
  about: <About />,
  figureGroups: {
    tiangang: { label: '天罡三十六', order: 0 },
    disha: { label: '地煞七十二', order: 1 },
    other: { label: '其他角色', order: 2 },
  },
  figureGroupOf: (figure) => {
    if (figure.kind === 'hero' && figure.rank !== undefined) {
      return figure.rank <= 36 ? 'tiangang' : 'disha'
    }
    return 'other'
  },
  heroGroups: [
    { id: 'tiangang', label: '天罡', match: (hero) => (hero.rank ?? 108) <= 36 },
    { id: 'disha', label: '地煞', match: (hero) => (hero.rank ?? 108) > 36 },
  ],
  terms: {
    figure: '好漢',
    figurePlural: '好漢',
    figures: '人物',
    figureTrail: '好漢行蹤',
    biographyTitle: '水滸列傳',
    biographySubtitle: '群英事蹟',
    rankingsTitle: '水滸群英',
    edition: '《水滸傳》一百二十回本',
    faction: '陣營',
    searchPlaceholder: '搜尋姓名、綽號、星號、出身',
  },
  clusters: {
    'tian-gang': { label: '天罡', tone: 'cinnabar', center: { x: 290, y: 250 } },
    court: { label: '朝廷官府', tone: 'ink', center: { x: 600, y: 160 } },
    rival: { label: '祝莊曾市', tone: 'ochre', center: { x: 920, y: 260 } },
    jianghu: { label: '江湖人物', tone: 'moss', center: { x: 240, y: 640 } },
    'di-sha': { label: '地煞', tone: 'azurite', center: { x: 600, y: 610 } },
    rebel: { label: '四方勢力', tone: 'cinnabar', center: { x: 950, y: 660 } },
  },
  clusterOf: (figure) => {
    if (figure.kind === 'hero') return (figure.rank ?? 108) <= 36 ? 'tian-gang' : 'di-sha'
    if (['方臘', '田虎', '王慶', '遼'].includes(figure.affiliation)) return 'rebel'
    if (['祝家莊', '曾頭市', '扈家莊'].includes(figure.affiliation)) return 'rival'
    if (
      ['朝廷', '東京', '大名府', '江州', '青州', '高唐州', '滄州', '東平府'].includes(
        figure.affiliation,
      )
    ) {
      return 'court'
    }
    return 'jianghu'
  },
}

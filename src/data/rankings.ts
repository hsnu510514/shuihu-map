import type { RankingCategory, RankingGroup, RankingSource } from './types'

export const rankingGroups: RankingGroup[] = [
  { id: 'rank', name: '座次與身分', order: 1 },
  { id: 'battle', name: '征戰', order: 2 },
  { id: 'relation', name: '交遊', order: 3 },
  { id: 'temper', name: '性情', order: 4 },
]

export const rankingGroupById = Object.fromEntries(
  rankingGroups.map((group) => [group.id, group]),
)

function s(chapter: number, note?: string, eventId?: string, quote?: string): RankingSource {
  return { chapter, note, eventId, quote }
}

export const curatedRankings: RankingCategory[] = [
  {
    id: 'official-rank',
    name: '官職高低',
    group: 'rank',
    description:
      '同一人可重複上榜，依其不同時期的官職分別列出（上梁山前／招安後／朝中本職）。官階為概略排序，僅供參考。',
    basis: 'editorial',
    reliability: 'low',
    direction: 'desc',
    bar: false,
    entries: [
      { figureId: 'cai-jing', id: 'official-cai-jing', value: 100, display: '太師·魯國公（朝中本職）', sources: [s(39, '當朝太師、魯國公，權傾朝野')] },
      { figureId: 'gao-qiu', id: 'official-gao-qiu', value: 92, display: '殿帥府太尉（朝中本職）', sources: [s(2, '發跡後任殿帥府太尉，掌禁軍')] },
      { figureId: 'su-yuan-jing', id: 'official-su-yuan-jing', value: 90, display: '殿前太尉（朝中本職）', sources: [s(81, '殿前太尉，兩次招安之橋樑', 'ch081-yueye')] },
      { figureId: 'chen-zong-shan', id: 'official-chen-zong-shan', value: 88, display: '殿前太尉（朝中本職）', sources: [s(75, '奉詔第一次招安梁山', 'ch075-chaozhao')] },
      { figureId: 'liang-zhong-shu', id: 'official-liang-zhong-shu', value: 85, display: '大名府留守·中書（朝中本職）', sources: [s(13, '北京大名府留守司中書')] },
      { figureId: 'song-jiang', id: 'official-song-jiang-hou', value: 78, display: '楚州安撫使兼兵馬都總管（招安後）', sources: [s(120, '招安後授武德大夫，終任楚州安撫使兼兵馬都總管', 'ch120-liaowa')] },
      { figureId: 'lu-jun-yi', id: 'official-lu-jun-yi-hou', value: 76, display: '廬州安撫使兼兵馬副總管（招安後）', sources: [s(120, '招安後授武功大夫，廬州安撫使兼兵馬副總管', 'ch120-liaowa')] },
      { figureId: 'wu-yong', id: 'official-wu-yong-hou', value: 72, display: '武勝軍承宣使（招安後）', sources: [s(120, '招安後授武勝軍承宣使', 'ch120-liaowa')] },
      { figureId: 'hu-yan-zhuo', id: 'official-hu-yan-zhuo-qian', value: 70, display: '汝寧郡都統制（上梁山前）', sources: [s(54, '原為汝寧郡都統制，奉調征梁山', 'ch054-gaolian')] },
      { figureId: 'guan-sheng', id: 'official-guan-sheng-hou', value: 70, display: '大名府兵馬總管（招安後）', sources: [s(120, '招安後授大名府兵馬總管', 'ch120-liaowa')] },
      { figureId: 'qin-ming', id: 'official-qin-ming-qian', value: 68, display: '青州指揮司總管兵馬統制（上梁山前）', sources: [s(34, '原任青州指揮司總管兵馬統制', 'ch034-walichang')] },
      { figureId: 'hu-yan-zhuo', id: 'official-hu-yan-zhuo-hou', value: 68, display: '御營兵馬指揮使（招安後）', sources: [s(120, '招安後授御營兵馬指揮使', 'ch120-liaowa')] },
      { figureId: 'hua-rong', id: 'official-hua-rong-hou', value: 64, display: '應天府兵馬都統制（招安後）', sources: [s(120, '招安後授應天府兵馬都統制', 'ch120-liaowa')] },
      { figureId: 'zhu-tong', id: 'official-zhu-tong-hou', value: 62, display: '保定府都統制（招安後）', sources: [s(120, '招安後授保定府都統制', 'ch120-liaowa')] },
      { figureId: 'huang-xin', id: 'official-huang-xin-hou', value: 56, display: '青州兵馬都監（招安後）', sources: [s(120, '招安後授青州兵馬都監', 'ch120-liaowa')] },
      { figureId: 'sun-li', id: 'official-sun-li-hou', value: 54, display: '登州兵馬都監（招安後）', sources: [s(120, '招安後授登州兵馬都監', 'ch120-liaowa')] },
      { figureId: 'huang-xin', id: 'official-huang-xin-qian', value: 52, display: '青州兵馬都監（上梁山前）', sources: [s(33, '原任青州兵馬都監', 'ch033-qingfengzhai')] },
      { figureId: 'guan-sheng', id: 'official-guan-sheng-qian', value: 50, display: '蒲東巡檢（上梁山前）', sources: [s(63, '原為蒲東巡檢，奉調議取梁山', 'ch063-damingcheng')] },
      { figureId: 'sun-li', id: 'official-sun-li-qian', value: 48, display: '登州兵馬提轄（上梁山前）', sources: [s(49, '原任登州兵馬提轄', 'ch049-dengzhou')] },
      { figureId: 'lu-zhi-shen', id: 'official-lu-zhi-shen-qian', value: 48, display: '渭州經略府提轄（上梁山前）', sources: [s(3, '本名魯達，渭州經略府提轄', 'ch003-zhenguanxi')] },
      { figureId: 'yang-zhi', id: 'official-yang-zhi-qian', value: 46, display: '殿司制使（上梁山前）', sources: [s(12, '原為殿司制使，因失陷花石綱而流落')] },
      { figureId: 'hua-rong', id: 'official-hua-rong-qian', value: 46, display: '清風寨知寨（上梁山前）', sources: [s(33, '原任清風寨知寨', 'ch033-qingfengzhai')] },
      { figureId: 'lin-chong', id: 'official-lin-chong-qian', value: 44, display: '東京八十萬禁軍槍棒教頭（上梁山前）', sources: [s(7, '原任東京八十萬禁軍槍棒教頭', 'ch007-baihutang')] },
      { figureId: 'zhu-tong', id: 'official-zhu-tong-qian', value: 40, display: '鄆城縣馬兵都頭（上梁山前）', sources: [s(13, '原任鄆城縣馬兵都頭')] },
      { figureId: 'lei-heng', id: 'official-lei-heng-qian', value: 38, display: '鄆城縣步兵都頭（上梁山前）', sources: [s(13, '原任鄆城縣步兵都頭')] },
      { figureId: 'wu-song', id: 'official-wu-song-qian', value: 38, display: '陽穀縣步兵都頭（上梁山前）', sources: [s(23, '打虎後任陽穀縣步兵都頭', 'ch023-jingyanggang')] },
      { figureId: 'song-jiang', id: 'official-song-jiang-qian', value: 36, display: '鄆城縣押司（上梁山前）', sources: [s(18, '原任鄆城縣押司')] },
    ],
  },
]

import { heroById, heroes } from './heroes'
import type { Hero, HeroAnchor, HeroStatus } from './types'

type AnchorInput = Omit<HeroAnchor, 'heroId'>

export interface HeroState {
  hero: Hero
  status: HeroStatus | 'notYet'
  placeId: string | null
  confidence: 'text' | 'inferred'
  sinceChapter?: number
  note?: string
}

const campaignPhases: Array<{ from: number; to: number; placeId: string }> = [
  { from: 83, to: 83, placeId: 'chenqiao' },
  { from: 84, to: 85, placeId: 'jizhou-you' },
  { from: 86, to: 86, placeId: 'dulu' },
  { from: 87, to: 89, placeId: 'youzhou' },
  { from: 90, to: 90, placeId: 'dongjing' },
  { from: 91, to: 92, placeId: 'gaizhou' },
  { from: 93, to: 98, placeId: 'weisheng' },
  { from: 99, to: 99, placeId: 'taiyuan' },
  { from: 100, to: 100, placeId: 'dongjing' },
  { from: 101, to: 104, placeId: 'liangshanpo' },
  { from: 105, to: 106, placeId: 'wanzhou' },
  { from: 107, to: 107, placeId: 'jishan' },
  { from: 108, to: 108, placeId: 'wanzhou' },
  { from: 109, to: 109, placeId: 'fangzhou' },
  { from: 110, to: 110, placeId: 'dongjing' },
  { from: 111, to: 111, placeId: 'runzhou' },
  { from: 112, to: 112, placeId: 'changzhou' },
  { from: 113, to: 113, placeId: 'suzhou' },
  { from: 114, to: 115, placeId: 'hangzhou' },
  { from: 116, to: 117, placeId: 'muxhou' },
  { from: 118, to: 118, placeId: 'qingxidong' },
  { from: 119, to: 119, placeId: 'hangzhou' },
]

const overrides: Record<string, AnchorInput[]> = {
  'song-jiang': [
    { chapter: 18, placeId: 'yuncheng', status: 'present', confidence: 'text', note: '鄆城縣押司，私放晁蓋。' },
    { chapter: 21, placeId: 'yuncheng', status: 'present', confidence: 'text', note: '怒殺閻婆惜。' },
    { chapter: 22, placeId: 'yuncheng', status: 'traveling', confidence: 'text', note: '朱仝義釋，開始逃亡。' },
    { chapter: 23, placeId: 'cangzhou', status: 'present', confidence: 'text', note: '投奔柴進莊。' },
    { chapter: 33, placeId: 'qingfengshan', status: 'present', confidence: 'text', note: '清風山遇花榮。' },
    { chapter: 36, placeId: 'jieyang', status: 'present', confidence: 'text', note: '刺配江州途中。' },
    { chapter: 38, placeId: 'jiangzhou', status: 'present', confidence: 'text', note: '江州結識戴宗、李逵、張順。' },
    { chapter: 40, placeId: 'jiangzhou', status: 'present', confidence: 'text', note: '劫法場後上梁山。' },
    { chapter: 42, placeId: 'huandaocun', status: 'present', confidence: 'text', note: '還道村遇九天玄女。' },
    { chapter: 72, placeId: 'dongjing', status: 'present', confidence: 'text', note: '元夜入東京。' },
    { chapter: 82, placeId: 'dongjing', status: 'present', confidence: 'text', note: '全夥受招安。' },
    { chapter: 90, placeId: 'wutaishan', status: 'present', confidence: 'text', note: '五台山參禪。' },
  ],
  'lu-jun-yi': [
    { chapter: 61, placeId: 'beijing', status: 'present', confidence: 'text', note: '北京大名府員外。' },
    { chapter: 62, placeId: 'beijing', status: 'present', confidence: 'text', note: '被李固陷害下獄。' },
    { chapter: 66, placeId: 'beijing', status: 'present', confidence: 'text', note: '智取大名府後上梁山。' },
    { chapter: 84, placeId: 'jizhou-you', status: 'present', confidence: 'text', note: '征遼，大戰玉田縣。' },
    { chapter: 86, placeId: 'qingshiyu', status: 'present', confidence: 'text', note: '兵陷青石峪。' },
    { chapter: 112, placeId: 'xuanzhou', status: 'present', confidence: 'text', note: '分兵宣州道。' },
    { chapter: 116, placeId: 'shezhou', status: 'present', confidence: 'text', note: '分兵歙州道。' },
    { chapter: 118, placeId: 'yulingguan', status: 'present', confidence: 'text', note: '大戰昱嶺關。' },
    { chapter: 120, placeId: 'luzhou', status: 'dead', confidence: 'text', note: '任廬州安撫使，被毒害。' },
  ],
  'wu-yong': [
    { chapter: 14, placeId: 'dongxicun', status: 'present', confidence: 'text', note: '說動晁蓋取生辰綱。' },
    { chapter: 16, placeId: 'huangnigang', status: 'present', confidence: 'text', note: '智取生辰綱。' },
    { chapter: 19, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '梁山泊軍師。' },
    { chapter: 66, placeId: 'beijing', status: 'present', confidence: 'text', note: '智取大名府。' },
    { chapter: 120, placeId: 'chuzhou', status: 'dead', confidence: 'text', note: '宋江死後自縊。' },
  ],
  'gong-sun-sheng': [
    { chapter: 15, placeId: 'shijiecun', status: 'present', confidence: 'text', note: '應七星聚義。' },
    { chapter: 53, placeId: 'erxianshan', status: 'present', confidence: 'text', note: '回二仙山請師。' },
    { chapter: 60, placeId: 'mangdangshan', status: 'present', confidence: 'text', note: '芒碭山降魔。' },
    { chapter: 110, placeId: 'erxianshan', status: 'detached', confidence: 'text', note: '征王慶後退隱學道。' },
  ],
  'guan-sheng': [
    { chapter: 63, placeId: 'beijing', status: 'present', confidence: 'text', note: '奉詔議取梁山泊。' },
    { chapter: 64, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '歸順梁山。' },
    { chapter: 87, placeId: 'youzhou', status: 'present', confidence: 'text', note: '征遼大戰幽州。' },
    { chapter: 120, placeId: 'beijing', status: 'dead', confidence: 'text', note: '任大名府總管，墜馬病故。' },
  ],
  'hu-yan-zhuo': [
    { chapter: 55, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '以連環馬征梁山。' },
    { chapter: 87, placeId: 'youzhou', status: 'present', confidence: 'text', note: '力擒番將。' },
    { chapter: 120, placeId: 'dongjing', status: 'detached', confidence: 'text', note: '任御營指揮使。' },
  ],
  'hua-rong': [
    { chapter: 33, placeId: 'qingfengzhai', status: 'present', confidence: 'text', note: '清風寨知寨。' },
    { chapter: 35, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '梁山射雁。' },
    { chapter: 118, placeId: 'qingxidong', status: 'present', confidence: 'text', note: '征方臘。' },
    { chapter: 120, placeId: 'chuzhou', status: 'dead', confidence: 'text', note: '宋江死後自縊。' },
  ],
  'chai-jin': [
    { chapter: 9, placeId: 'cangzhou', status: 'present', confidence: 'text', note: '滄州橫海郡。' },
    { chapter: 54, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '高唐州獲救後上梁山。' },
    { chapter: 66, placeId: 'beijing', status: 'present', confidence: 'text', note: '智取大名府。' },
    { chapter: 72, placeId: 'dongjing', status: 'present', confidence: 'text', note: '簪花入禁院。' },
    { chapter: 120, placeId: 'cangzhou', status: 'detached', confidence: 'text', note: '辭官回滄州。' },
  ],
  'li-ying': [
    { chapter: 47, placeId: 'lijiazhuang', status: 'present', confidence: 'text', note: '李家莊莊主。' },
    { chapter: 50, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '三打祝家莊後上山。' },
    { chapter: 120, placeId: 'duolonggang', status: 'detached', confidence: 'text', note: '辭官回獨龍岡。' },
  ],
  'zhu-tong': [
    { chapter: 18, placeId: 'yuncheng', status: 'present', confidence: 'text', note: '鄆城馬兵都頭。' },
    { chapter: 51, placeId: 'cangzhou', status: 'present', confidence: 'text', note: '誤失小衙內，被逼上山。' },
    { chapter: 120, placeId: 'baoding', status: 'detached', confidence: 'text', note: '任保定府都統制。' },
  ],
  'dai-zong': [
    { chapter: 36, placeId: 'jiangzhou', status: 'present', confidence: 'text', note: '江州兩院押牢節級。' },
    { chapter: 41, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '劫法場後上梁山。' },
    { chapter: 53, placeId: 'jizhou-you', status: 'present', confidence: 'text', note: '往薊州請公孫勝。' },
    { chapter: 81, placeId: 'dongjing', status: 'present', confidence: 'text', note: '東京定計。' },
    { chapter: 120, placeId: 'taian', status: 'detached', confidence: 'text', note: '納官，往泰安州嶽廟出家。' },
  ],
  'li-kui': [
    { chapter: 38, placeId: 'jiangzhou', status: 'present', confidence: 'text', note: '江州結識宋江。' },
    { chapter: 41, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '上梁山。' },
    { chapter: 43, placeId: 'yishui', status: 'present', confidence: 'text', note: '沂嶺殺四虎。' },
    { chapter: 72, placeId: 'dongjing', status: 'present', confidence: 'text', note: '元夜鬧東京。' },
    { chapter: 120, placeId: 'chuzhou', status: 'dead', confidence: 'text', note: '與宋江同飲毒酒。' },
  ],
  'yan-qing': [
    { chapter: 61, placeId: 'beijing', status: 'present', confidence: 'text', note: '盧俊義家僕。' },
    { chapter: 66, placeId: 'beijing', status: 'present', confidence: 'text', note: '智取大名府。' },
    { chapter: 72, placeId: 'dongjing', status: 'present', confidence: 'text', note: '隨宋江入東京。' },
    { chapter: 81, placeId: 'dongjing', status: 'present', confidence: 'text', note: '月夜遇道君。' },
    { chapter: 110, placeId: 'qiulin', status: 'present', confidence: 'text', note: '秋林渡射雁。' },
    { chapter: 119, placeId: 'hangzhou', status: 'detached', confidence: 'text', note: '功成身退，浪跡江湖。' },
  ],
  'zhang-shun': [
    { chapter: 38, placeId: 'jiangzhou', status: 'present', confidence: 'text', note: '江州賣魚牙子。' },
    { chapter: 40, placeId: 'jiangzhou', status: 'present', confidence: 'text', note: '劫法場。' },
    { chapter: 111, placeId: 'runzhou', status: 'present', confidence: 'text', note: '夜伏金山寺。' },
    { chapter: 114, placeId: 'yongjinmen', status: 'dead', confidence: 'text', note: '夜探湧金門，中箭身亡。' },
  ],
  'li-jun': [
    { chapter: 36, placeId: 'jieyang', status: 'present', confidence: 'text', note: '揭陽嶺結識宋江。' },
    { chapter: 41, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '上梁山。' },
    { chapter: 99, placeId: 'taiyuan', status: 'present', confidence: 'text', note: '水灌太原城。' },
    { chapter: 113, placeId: 'suzhou', status: 'present', confidence: 'text', note: '太湖小結義。' },
    { chapter: 119, placeId: 'suzhou', status: 'detached', confidence: 'text', note: '出海，後為暹羅王。' },
  ],
  'lin-chong': [
    { chapter: 7, placeId: 'dongjing', status: 'present', confidence: 'text', note: '八十萬禁軍教頭。' },
    { chapter: 8, placeId: 'yezhulin', status: 'present', confidence: 'text', note: '刺配滄州。' },
    { chapter: 10, placeId: 'cangzhou', status: 'present', confidence: 'text', note: '風雪山神廟。' },
    { chapter: 11, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '雪夜上梁山。' },
    { chapter: 114, placeId: 'hangzhou', status: 'present', confidence: 'inferred', note: '征方臘時患病。' },
    { chapter: 119, placeId: 'hangzhou', status: 'dead', confidence: 'text', note: '在六和寺病故。' },
  ],
  'lu-zhi-shen': [
    { chapter: 3, placeId: 'weizhou', status: 'present', confidence: 'text', note: '渭州經略府提轄。' },
    { chapter: 4, placeId: 'wutaishan', status: 'present', confidence: 'text', note: '五台山出家。' },
    { chapter: 7, placeId: 'dongjing', status: 'present', confidence: 'text', note: '大相國寺。' },
    { chapter: 17, placeId: 'erlongshan', status: 'present', confidence: 'text', note: '二龍山落草。' },
    { chapter: 90, placeId: 'wutaishan', status: 'present', confidence: 'text', note: '隨宋江參禪。' },
    { chapter: 118, placeId: 'qingxidong', status: 'present', confidence: 'text', note: '征方臘。' },
    { chapter: 119, placeId: 'hangzhou', status: 'dead', confidence: 'text', note: '六和寺坐化。' },
  ],
  'wu-song': [
    { chapter: 23, placeId: 'yanggu', status: 'present', confidence: 'text', note: '景陽岡打虎。' },
    { chapter: 27, placeId: 'shizipo', status: 'present', confidence: 'text', note: '十字坡遇張青。' },
    { chapter: 31, placeId: 'mengzhou', status: 'present', confidence: 'text', note: '血濺鴛鴦樓。' },
    { chapter: 32, placeId: 'erlongshan', status: 'present', confidence: 'text', note: '二龍山落草。' },
    { chapter: 114, placeId: 'hangzhou', status: 'present', confidence: 'text', note: '征方臘。' },
    { chapter: 119, placeId: 'hangzhou', status: 'detached', confidence: 'text', note: '六和寺出家，八十而終。' },
  ],
  'shi-jin': [
    { chapter: 2, placeId: 'shijiazhuang', status: 'present', confidence: 'text', note: '史家莊少莊主。' },
    { chapter: 3, placeId: 'huayin', status: 'present', confidence: 'text', note: '夜走華陰。' },
    { chapter: 59, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '華山獲救後上梁山。' },
    { chapter: 112, placeId: 'xuanzhou', status: 'present', confidence: 'text', note: '隨盧俊義分兵宣州。' },
    { chapter: 118, placeId: 'yulingguan', status: 'dead', confidence: 'text', note: '戰死昱嶺關。' },
  ],
  'shi-xiu': [
    { chapter: 44, placeId: 'jizhou-you', status: 'present', confidence: 'text', note: '薊州賣柴。' },
    { chapter: 46, placeId: 'zhujiazhuang', status: 'present', confidence: 'text', note: '火燒祝家店。' },
    { chapter: 62, placeId: 'beijing', status: 'present', confidence: 'text', note: '劫法場。' },
    { chapter: 118, placeId: 'yulingguan', status: 'dead', confidence: 'text', note: '戰死昱嶺關。' },
  ],
  'qin-ming': [
    { chapter: 34, placeId: 'qingzhou', status: 'present', confidence: 'text', note: '青州指揮司統制。' },
    { chapter: 35, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '上梁山。' },
    { chapter: 118, placeId: 'qingxidong', status: 'dead', confidence: 'text', note: '戰死清溪。' },
  ],
  'hu-san-niang': [
    { chapter: 48, placeId: 'hujiazhuang', status: 'present', confidence: 'text', note: '扈家莊。' },
    { chapter: 50, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '三打祝家莊後上山。' },
    { chapter: 116, placeId: 'wulongling', status: 'dead', confidence: 'text', note: '戰死烏龍嶺。' },
  ],
  'sun-li': [
    { chapter: 49, placeId: 'dengzhou', status: 'present', confidence: 'text', note: '登州提轄。' },
    { chapter: 50, placeId: 'zhujiazhuang', status: 'present', confidence: 'text', note: '臥底祝家莊。' },
    { chapter: 120, placeId: 'dengzhou', status: 'detached', confidence: 'text', note: '回登州。' },
  ],
  'shi-qian': [
    { chapter: 46, placeId: 'zhujiazhuang', status: 'present', confidence: 'text', note: '祝家店偷雞。' },
    { chapter: 56, placeId: 'dongjing', status: 'present', confidence: 'text', note: '盜甲。' },
    { chapter: 66, placeId: 'beijing', status: 'present', confidence: 'text', note: '火燒翠雲樓。' },
    { chapter: 119, placeId: null, status: 'dead', confidence: 'text', note: '征方臘後病故。' },
  ],
  'an-dao-quan': [
    { chapter: 65, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '上梁山醫治宋江。' },
    { chapter: 110, placeId: 'dongjing', status: 'detached', confidence: 'text', note: '留東京為御醫。' },
  ],
  'xiao-rang': [
    { chapter: 39, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '被賺上梁山。' },
    { chapter: 110, placeId: 'dongjing', status: 'detached', confidence: 'text', note: '留東京，後為蔡京家庭教師。' },
  ],
  'jin-da-jian': [
    { chapter: 39, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '被賺上梁山。' },
    { chapter: 110, placeId: 'dongjing', status: 'detached', confidence: 'text', note: '留東京。' },
  ],
  'yue-he': [
    { chapter: 49, placeId: 'dengzhou', status: 'present', confidence: 'text', note: '登州牢差。' },
    { chapter: 50, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '上梁山。' },
    { chapter: 110, placeId: 'dongjing', status: 'detached', confidence: 'text', note: '留東京。' },
  ],
  'huang-fu-duan': [
    { chapter: 70, placeId: 'dongchang', status: 'present', confidence: 'text', note: '東昌府獸醫。' },
    { chapter: 110, placeId: 'dongjing', status: 'detached', confidence: 'text', note: '留東京為御馬監大使。' },
  ],
  'yang-zhi': [
    { chapter: 12, placeId: 'dongjing', status: 'present', confidence: 'text', note: '東京賣刀。' },
    { chapter: 16, placeId: 'huangnigang', status: 'present', confidence: 'text', note: '押送生辰綱。' },
    { chapter: 17, placeId: 'erlongshan', status: 'present', confidence: 'text', note: '二龍山落草。' },
    { chapter: 112, placeId: null, status: 'dead', confidence: 'text', note: '征方臘途中病故。' },
  ],
  'suo-chao': [
    { chapter: 13, placeId: 'beijing', status: 'present', confidence: 'text', note: '大名府正牌軍。' },
    { chapter: 114, placeId: 'hangzhou', status: 'dead', confidence: 'text', note: '戰死杭州。' },
  ],
  'liu-tang': [
    { chapter: 14, placeId: 'dongxicun', status: 'present', confidence: 'text', note: '醉臥靈官殿。' },
    { chapter: 16, placeId: 'huangnigang', status: 'present', confidence: 'text', note: '智取生辰綱。' },
    { chapter: 114, placeId: 'hangzhou', status: 'dead', confidence: 'text', note: '戰死杭州。' },
  ],
  'ruan-xiao-er': [
    { chapter: 15, placeId: 'shijiecun', status: 'present', confidence: 'text', note: '石碣村漁民。' },
    { chapter: 20, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '上梁山。' },
    { chapter: 116, placeId: 'wulongling', status: 'dead', confidence: 'text', note: '戰死烏龍嶺。' },
  ],
  'ruan-xiao-wu': [
    { chapter: 15, placeId: 'shijiecun', status: 'present', confidence: 'text', note: '石碣村漁民。' },
    { chapter: 118, placeId: 'qingxidong', status: 'dead', confidence: 'text', note: '戰死清溪。' },
  ],
  'ruan-xiao-qi': [
    { chapter: 15, placeId: 'shijiecun', status: 'present', confidence: 'text', note: '石碣村漁民。' },
    { chapter: 120, placeId: 'shijiecun', status: 'detached', confidence: 'text', note: '罷官回石碣村打魚。' },
  ],
  'zhang-heng': [
    { chapter: 37, placeId: 'jieyang', status: 'present', confidence: 'text', note: '潯陽江上撐船。' },
    { chapter: 41, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '上梁山。' },
    { chapter: 119, placeId: null, status: 'dead', confidence: 'text', note: '征方臘後病故。' },
  ],
  'mu-hong': [
    { chapter: 37, placeId: 'jieyang', status: 'present', confidence: 'text', note: '揭陽鎮豪族。' },
    { chapter: 112, placeId: null, status: 'dead', confidence: 'text', note: '征方臘途中病故。' },
  ],
  'lei-heng': [
    { chapter: 18, placeId: 'yuncheng', status: 'present', confidence: 'text', note: '鄆城步兵都頭。' },
    { chapter: 115, placeId: 'deqing', status: 'dead', confidence: 'text', note: '戰死德清。' },
  ],
  'jie-zhen': [
    { chapter: 49, placeId: 'dengzhou', status: 'present', confidence: 'text', note: '登州獵戶。' },
    { chapter: 116, placeId: 'wulongling', status: 'dead', confidence: 'text', note: '戰死烏龍嶺。' },
  ],
  'jie-bao': [
    { chapter: 49, placeId: 'dengzhou', status: 'present', confidence: 'text', note: '登州獵戶。' },
    { chapter: 116, placeId: 'wulongling', status: 'dead', confidence: 'text', note: '戰死烏龍嶺。' },
  ],
  'yang-xiong': [
    { chapter: 44, placeId: 'jizhou-you', status: 'present', confidence: 'text', note: '薊州兩院押獄。' },
    { chapter: 119, placeId: null, status: 'dead', confidence: 'text', note: '征方臘後病故。' },
  ],
  'dong-ping': [
    { chapter: 69, placeId: 'dongping', status: 'present', confidence: 'text', note: '東平府兵馬都監。' },
    { chapter: 115, placeId: 'dusongguan', status: 'dead', confidence: 'text', note: '戰死獨松關。' },
  ],
  'zhang-qing': [
    { chapter: 70, placeId: 'dongchang', status: 'present', confidence: 'text', note: '東昌府兵馬都監。' },
    { chapter: 98, placeId: 'weisheng', status: 'present', confidence: 'text', note: '與瓊英成婚。' },
    { chapter: 115, placeId: 'dusongguan', status: 'dead', confidence: 'text', note: '戰死獨松關。' },
  ],
  'xu-ning': [
    { chapter: 56, placeId: 'dongjing', status: 'present', confidence: 'text', note: '禁軍金鎗班教頭。' },
    { chapter: 114, placeId: 'xiuzhou', status: 'dead', confidence: 'text', note: '在秀州毒發身亡。' },
  ],
}

const earlyOverrides: Record<string, AnchorInput[]> = {
  'song-jiang': [
    { chapter: 43, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '接父後回梁山。' },
  ],
  'wu-song': [
    { chapter: 22, placeId: 'cangzhou', status: 'present', confidence: 'text', note: '在柴進莊與宋江相遇。' },
  ],
  'liu-tang': [
    { chapter: 13, placeId: 'dongxicun', status: 'present', confidence: 'text', note: '到晁蓋莊上報信。' },
  ],
  'huang-xin': [
    { chapter: 33, placeId: 'qingzhou', status: 'present', confidence: 'text', note: '青州兵馬都監。' },
  ],
  'wang-ying': [
    { chapter: 32, placeId: 'qingfengshan', status: 'present', confidence: 'text', note: '清風山次席頭領。' },
  ],
  'yan-shun': [
    { chapter: 32, placeId: 'qingfengshan', status: 'present', confidence: 'text', note: '清風山首領。' },
  ],
  'zheng-tian-shou': [
    { chapter: 32, placeId: 'qingfengshan', status: 'present', confidence: 'text', note: '清風山頭領。' },
  ],
  'kong-ming': [
    { chapter: 32, placeId: 'baishushan', status: 'present', confidence: 'text', note: '白虎山首領。' },
  ],
  'kong-liang': [
    { chapter: 32, placeId: 'baishushan', status: 'present', confidence: 'text', note: '白虎山頭領。' },
  ],
  'lv-fang': [
    { chapter: 35, placeId: 'duiyinghan', status: 'present', confidence: 'text', note: '對影山首領。' },
  ],
  'guo-sheng': [
    { chapter: 35, placeId: 'duiyinghan', status: 'present', confidence: 'text', note: '對影山首領。' },
  ],
  'ou-peng': [
    { chapter: 41, placeId: 'huangmenshan', status: 'present', confidence: 'text', note: '黃門山首領。' },
    { chapter: 42, placeId: 'liangshanpo', status: 'present', confidence: 'inferred' },
  ],
  'jiang-jing': [
    { chapter: 41, placeId: 'huangmenshan', status: 'present', confidence: 'text', note: '黃門山次席頭領。' },
    { chapter: 42, placeId: 'liangshanpo', status: 'present', confidence: 'inferred' },
  ],
  'ma-lin': [
    { chapter: 41, placeId: 'huangmenshan', status: 'present', confidence: 'text', note: '黃門山頭領。' },
    { chapter: 42, placeId: 'liangshanpo', status: 'present', confidence: 'inferred' },
  ],
  'tao-zong-wang': [
    { chapter: 41, placeId: 'huangmenshan', status: 'present', confidence: 'text', note: '黃門山頭領。' },
    { chapter: 42, placeId: 'liangshanpo', status: 'present', confidence: 'inferred' },
  ],
  'pei-xuan': [
    { chapter: 44, placeId: 'yinmachuan', status: 'present', confidence: 'text', note: '飲馬川首領。' },
  ],
  'deng-fei': [
    { chapter: 44, placeId: 'yinmachuan', status: 'present', confidence: 'text', note: '飲馬川次席頭領。' },
  ],
  'meng-kang': [
    { chapter: 44, placeId: 'yinmachuan', status: 'present', confidence: 'text', note: '飲馬川頭領。' },
  ],
  'yang-lin': [
    { chapter: 44, placeId: 'yinmachuan', status: 'present', confidence: 'text', note: '途經飲馬川。' },
  ],
  'sun-xin': [
    { chapter: 49, placeId: 'dengzhou', status: 'present', confidence: 'text', note: '登州酒店老闆。' },
  ],
  'gu-da-sao': [
    { chapter: 49, placeId: 'dengzhou', status: 'present', confidence: 'text', note: '登州酒店老闆娘。' },
  ],
  'zou-yuan': [
    { chapter: 49, placeId: 'dengzhou', status: 'present', confidence: 'text', note: '登雲山首領。' },
  ],
  'zou-run': [
    { chapter: 49, placeId: 'dengzhou', status: 'present', confidence: 'text', note: '登雲山頭領。' },
  ],
  'cai-fu': [
    { chapter: 62, placeId: 'beijing', status: 'present', confidence: 'text', note: '大名府牢役。' },
  ],
  'cai-qing': [
    { chapter: 62, placeId: 'beijing', status: 'present', confidence: 'text', note: '大名府牢役。' },
  ],
  'yu-bao-si': [
    { chapter: 68, placeId: 'zengtoushi', status: 'present', confidence: 'text', note: '曾頭市險道神。' },
  ],
  'duan-jing-zhu': [
    { chapter: 60, placeId: 'zengtoushi', status: 'present', confidence: 'text', note: '盜馬賊，曾頭市故事。' },
  ],
  'jiao-ting': [
    { chapter: 67, placeId: 'lingzhou', status: 'present', confidence: 'text', note: '凌州力士。' },
  ],
  'li-li': [
    { chapter: 36, placeId: 'jieyang', status: 'present', confidence: 'text', note: '揭陽嶺酒店老闆。' },
  ],
  'xue-yong': [
    { chapter: 36, placeId: 'jiangzhou', status: 'present', confidence: 'text', note: '江州賣藝。' },
  ],
  'mu-hong': [
    { chapter: 41, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '劫法場後上梁山。' },
  ],
  'zhang-heng': [
    { chapter: 37, placeId: 'jieyang', status: 'present', confidence: 'text', note: '潯陽江上撐船。' },
    { chapter: 41, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '上梁山。' },
  ],
  'zhu-gui': [
    { chapter: 11, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '梁山泊南山酒店。' },
  ],
  'song-wan': [
    { chapter: 11, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '梁山泊頭領。' },
  ],
  'du-qian': [
    { chapter: 11, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '梁山泊頭領。' },
  ],
  'bai-sheng': [
    { chapter: 16, placeId: 'huangnigang', status: 'present', confidence: 'text', note: '智取生辰綱。' },
  ],
  'cao-zheng': [
    { chapter: 17, placeId: 'erlongshan', status: 'present', confidence: 'text', note: '二龍山小頭領。' },
  ],
  'zhang-qing-caiyuan': [
    { chapter: 27, placeId: 'shizipo', status: 'present', confidence: 'text', note: '十字坡酒店。' },
  ],
  'sun-er-niang': [
    { chapter: 27, placeId: 'shizipo', status: 'present', confidence: 'text', note: '十字坡酒店。' },
  ],
  'shi-en': [
    { chapter: 28, placeId: 'mengzhou', status: 'present', confidence: 'text', note: '孟州牢差。' },
  ],
  'zhu-fu': [
    { chapter: 43, placeId: 'yishui', status: 'present', confidence: 'text', note: '沂水酒店老闆。' },
  ],
  'li-yun': [
    { chapter: 43, placeId: 'yishui', status: 'present', confidence: 'text', note: '沂水縣都頭。' },
  ],
  'wang-ding-liu': [
    { chapter: 65, placeId: 'jiankang', status: 'present', confidence: 'text', note: '建康府酒店老闆。' },
  ],
  'du-xing': [
    { chapter: 47, placeId: 'lijiazhuang', status: 'present', confidence: 'text', note: '李家莊主管。' },
  ],
  'tang-long': [
    { chapter: 54, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '延安府鐵匠，後上梁山。' },
  ],
  'ling-zhen': [
    { chapter: 55, placeId: 'liangshanpo', status: 'present', confidence: 'text', note: '東京砲手，被俘上梁山。' },
  ],
  'shan-ting-gui': [
    { chapter: 67, placeId: 'lingzhou', status: 'present', confidence: 'text', note: '凌州團練使。' },
  ],
  'wei-ding-guo': [
    { chapter: 67, placeId: 'lingzhou', status: 'present', confidence: 'text', note: '凌州團練使。' },
  ],
}

const generated: Record<string, HeroAnchor[]> = {}

function pushAnchor(
  map: Map<number, HeroAnchor>,
  hero: Hero,
  anchor: AnchorInput,
) {
  if (anchor.chapter < 1 || anchor.chapter > 120) return
  const existing = map.get(anchor.chapter)
  if (!existing) {
    map.set(anchor.chapter, { ...anchor, heroId: hero.id })
    return
  }
  const priority = (status: HeroStatus) =>
    status === 'dead' ? 4 : status === 'detached' ? 3 : status === 'unknown' ? 2 : 1
  if (priority(anchor.status) >= priority(existing.status)) {
    map.set(anchor.chapter, { ...anchor, heroId: hero.id })
  }
}

for (const hero of heroes) {
  const map = new Map<number, HeroAnchor>()
  pushAnchor(map, hero, {
    chapter: hero.joinChapter,
    placeId: 'liangshanpo',
    status: 'present',
    confidence: 'inferred',
    note: '入山後駐梁山泊（推定）。',
  })
  pushAnchor(map, hero, {
    chapter: 71,
    placeId: 'liangshanpo',
    status: 'present',
    confidence: 'text',
    note: '忠義堂排座次，一百單八將齊聚梁山。',
  })
  for (const phase of campaignPhases) {
    if (phase.from < hero.joinChapter) continue
    if (hero.fateChapter && phase.from >= hero.fateChapter) continue
    pushAnchor(map, hero, {
      chapter: phase.from,
      placeId: phase.placeId,
      status: 'present',
      confidence: 'inferred',
      note: '依征戰階段推定。',
    })
  }
  if (hero.fateChapter) {
    const status: HeroStatus =
      hero.fate === '戰死' || hero.fate === '病故' || hero.fate === '其他'
        ? 'dead'
        : 'detached'
    pushAnchor(map, hero, {
      chapter: hero.fateChapter,
      placeId: hero.fatePlaceId ?? null,
      status,
      confidence: 'text',
      note:
        status === 'dead'
          ? `第${hero.fateChapter}回，${hero.fate}。`
          : `第${hero.fateChapter}回後${hero.fate}。`,
    })
  }
  for (const override of overrides[hero.id] ?? []) {
    pushAnchor(map, hero, override)
  }
  for (const override of earlyOverrides[hero.id] ?? []) {
    pushAnchor(map, hero, override)
  }
  generated[hero.id] = [...map.values()].sort((a, b) => a.chapter - b.chapter)
}

export const heroAnchorsByHero = generated

export function anchorsForHero(heroId: string): HeroAnchor[] {
  return heroAnchorsByHero[heroId] ?? []
}

export function resolveHeroState(heroId: string, chapter: number): HeroState {
  const hero = heroById[heroId]
  if (!hero) {
    throw new Error(`Unknown hero: ${heroId}`)
  }
  if (chapter < hero.firstChapter) {
    return {
      hero,
      status: 'notYet',
      placeId: null,
      confidence: 'inferred',
      note: '尚未出場。',
    }
  }
  const anchors = anchorsForHero(heroId)
  let current: HeroAnchor | null = null
  for (const anchor of anchors) {
    if (anchor.chapter > chapter) break
    current = anchor
  }
  if (!current) {
    return {
      hero,
      status: 'unknown',
      placeId: null,
      confidence: 'inferred',
      note: '已出場，行蹤未載。',
    }
  }
  return {
    hero,
    status: current.status,
    placeId: current.placeId,
    confidence: current.confidence,
    sinceChapter: current.chapter,
    note: current.note,
  }
}

export function statesForChapter(chapter: number): HeroState[] {
  return heroes.map((hero) => resolveHeroState(hero.id, chapter))
}

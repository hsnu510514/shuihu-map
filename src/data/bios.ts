import type { BioHighlight } from './types'

// 人工策展的重點事蹟。僅收錄書中明載、且為該人物關鍵轉折之事，
// 與 figureProfile 自動彙整的條目合併後依章回排序顯示。
export const bios: Record<string, BioHighlight[]> = {
  'song-jiang': [
    {
      chapter: 18,
      title: '私放晁蓋',
      detail: '任鄆城縣押司時，得知官府欲捕劫生辰綱的晁蓋，冒險通風報信，種下日後上山的因緣。',
      eventId: 'ch018-fangchaogai',
    },
    {
      chapter: 41,
      title: '坐第一把交椅',
      detail: '江州劫法場後隨眾上梁山，晁蓋歿後繼為寨主，改聚義廳為忠義堂。',
      eventId: 'ch060-zengtoushi',
    },
    {
      chapter: 82,
      title: '全夥受招安',
      detail: '幾經波折促成招安，領梁山全夥歸順朝廷，轉而為國征戰。',
      eventId: 'ch082-zhaoan',
    },
    {
      chapter: 120,
      title: '楚州飲鴆',
      detail: '被奸臣於御酒下毒，恐李逵日後生事，召其共飲毒酒，同死於楚州。',
      eventId: 'ch120-liaowa',
    },
  ],
  'lu-jun-yi': [
    {
      chapter: 61,
      title: '北京員外',
      detail: '大名府富戶，棍棒天下無對，宋江慕其名設計賺其上山。',
      eventId: 'ch061-lujunyi',
    },
    {
      chapter: 68,
      title: '活捉史文恭',
      detail: '攻打曾頭市時生擒射殺晁蓋的史文恭，威震梁山。',
      eventId: 'ch068-zengtoushi',
    },
    {
      chapter: 120,
      title: '廬州被害',
      detail: '平方臘後任廬州安撫使，被奸臣於御膳中下毒，落水而亡。',
      eventId: 'ch120-liaowa',
    },
  ],
  'wu-yong': [
    {
      chapter: 16,
      title: '智取生辰綱',
      detail: '定計黃泥岡，與晁蓋等七人智劫楊志押運的生辰綱。',
      eventId: 'ch016-shengchengang',
    },
    {
      chapter: 66,
      title: '智取大名府',
      detail: '元宵夜裡應外合攻破大名府，救出盧俊義、石秀。',
      eventId: 'ch066-damingzhi',
    },
    {
      chapter: 120,
      title: '蓼兒窪自縊',
      detail: '宋江死後，與花榮同縊於楚州蓼兒窪，隨主而去。',
      eventId: 'ch120-liaowa',
    },
  ],
  'lin-chong': [
    {
      chapter: 7,
      title: '誤入白虎堂',
      detail: '高衙內圖謀其妻，高俅設計誘其持刀入白虎堂，刺配滄州。',
      eventId: 'ch007-baihutang',
    },
    {
      chapter: 10,
      title: '風雪山神廟',
      detail: '雪夜山神廟前聽得陸謙等密謀，怒殺三人，自此走上梁山。',
      eventId: 'ch010-shanshenmiao',
    },
    {
      chapter: 19,
      title: '火併王倫',
      detail: '晁蓋等上山受阻，林沖火併寨主王倫，推晁蓋為梁山之主。',
      eventId: 'ch019-duopo',
    },
  ],
  'lu-zhi-shen': [
    {
      chapter: 3,
      title: '拳打鎮關西',
      detail: '為救金翠蓮父女，三拳打死強佔民女的鄭屠，棄官出走。',
      eventId: 'ch003-zhenguanxi',
    },
    {
      chapter: 7,
      title: '倒拔垂楊柳',
      detail: '在大相國寺菜園倒拔垂楊柳，威懾眾潑皮，結識林沖。',
      eventId: 'ch007-baihutang',
    },
    {
      chapter: 119,
      title: '六和寺坐化',
      detail: '擒方臘後於杭州六和寺聽潮信而悟，沐浴坐化。',
      eventId: 'ch119-zuohua',
    },
  ],
  'wu-song': [
    {
      chapter: 23,
      title: '景陽岡打虎',
      detail: '醉上景陽岡，赤手打死吊睛白額虎，名震陽穀。',
      eventId: 'ch023-jingyanggang',
    },
    {
      chapter: 26,
      title: '為兄報仇',
      detail: '查明武大郎被害真相，殺潘金蓮、西門慶，自首刺配。',
      eventId: 'ch026-wuerlang',
    },
    {
      chapter: 119,
      title: '六和寺出家',
      detail: '征方臘斷臂，於杭州六和寺出家，八十善終。',
      eventId: 'ch119-zuohua',
    },
  ],
  'li-kui': [
    {
      chapter: 43,
      title: '沂嶺殺四虎',
      detail: '回沂水接母，母為虎所害，怒殺子母四虎。',
      eventId: 'ch043-yiling',
    },
    {
      chapter: 75,
      title: '扯詔罵欽差',
      detail: '扯碎招安詔書、怒罵陳太尉，攪亂第一次招安。',
      eventId: 'ch075-chaozhao',
    },
    {
      chapter: 120,
      title: '楚州共飲',
      detail: '宋江恐其日後造次，邀其共飲毒酒，二人同死於楚州。',
      eventId: 'ch120-liaowa',
    },
  ],
  'yan-qing': [
    {
      chapter: 62,
      title: '救主大名府',
      detail: '盧俊義陷獄，燕青乞食救主，背負主人奔走。',
      eventId: 'ch062-damingjiefa',
    },
    {
      chapter: 74,
      title: '智撲任原',
      detail: '泰安州擂台以巧勁摔倒擎天柱任原，名動江湖。',
      eventId: 'ch074-qingtianzhu',
    },
    {
      chapter: 81,
      title: '月夜見道君',
      detail: '透過李師師暗通徽宗，促成招安大計。',
      eventId: 'ch081-yueye',
    },
  ],
  'hua-rong': [
    {
      chapter: 35,
      title: '梁山射雁',
      detail: '一箭射落雁行第三隻，梁山眾人歎服，人稱小李廣。',
      eventId: 'ch035-liangshansheyan',
    },
    {
      chapter: 120,
      title: '蓼兒窪殉義',
      detail: '宋江死後，與吳用同縊於蓼兒窪。',
      eventId: 'ch120-liaowa',
    },
  ],
  'zhang-shun': [
    {
      chapter: 38,
      title: '潯陽江鬥李逵',
      detail: '水中制服黑旋風李逵，得宋江調解，結為好友。',
      eventId: 'ch038-daizong',
    },
    {
      chapter: 114,
      title: '湧金門歸神',
      detail: '夜探杭州湧金門被亂箭射死，魂歸水府，後受封金華太保。',
      eventId: 'ch114-zhangshun',
    },
  ],
  'hu-san-niang': [
    {
      chapter: 48,
      title: '陣前活捉王英',
      detail: '祝家莊之戰中輕取王矮虎，後為林沖所擒。',
      eventId: 'ch048-erda',
    },
    {
      chapter: 55,
      title: '套索擒彭玘',
      detail: '以紅錦套索拖彭玘下馬，屢建戰功。',
      eventId: 'ch055-lianhuanma',
    },
    {
      chapter: 116,
      title: '烏龍嶺殉難',
      detail: '征方臘時為救王英，被鄭彪一銅磚打死。',
      eventId: 'ch116-wulongling',
    },
  ],
}

export function bioFor(id: string): BioHighlight[] {
  return bios[id] ?? []
}

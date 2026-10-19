import type { Relation, RelationPhase, RelationType } from './types'

export const relationTypeMeta: Record<
  RelationType,
  { label: string; tone: string; directed?: boolean }
> = {
  kinship: { label: '親屬', tone: 'stone' },
  marriage: { label: '婚配', tone: 'cinnabar' },
  sworn: { label: '結義', tone: 'ochre' },
  master: { label: '師徒', tone: 'azurite', directed: true },
  patronage: { label: '恩義', tone: 'moss', directed: true },
  friendship: { label: '友誼', tone: 'moss' },
  romance: { label: '情愛', tone: 'cinnabar' },
  subordinate: { label: '隸屬', tone: 'stone', directed: true },
  alliance: { label: '同盟', tone: 'azurite' },
  rivalry: { label: '競爭', tone: 'ochre' },
  enmity: { label: '仇敵', tone: 'ink' },
  other: { label: '其他', tone: 'stone' },
}

function p(
  fromChapter: number,
  type: RelationType,
  label: string,
  summary: string,
  eventId?: string,
  toChapter?: number,
  certainty: 'text' | 'inferred' = 'text',
  quote?: string,
): RelationPhase {
  return { fromChapter, toChapter, type, label, summary, eventId, certainty, quote }
}

function r(id: string, a: string, b: string, phases: RelationPhase[], directed = false): Relation {
  return { id, a, b, phases, directed }
}

export const relations: Relation[] = [
  r('wang-jin-shi-jin', 'wang-jin', 'shi-jin', [
    p(2, 'master', '禁軍教頭授業', '王進私走延安府途經史家莊，見史進好武，收為徒弟，傳授槍棒。', 'ch002-shijia', 118),
  ]),
  r('wang-jin-gao-qiu', 'wang-jin', 'gao-qiu', [
    p(2, 'enmity', '父仇牽連', '高俅發跡後記恨王進之父舊怨，王進只得棄官私走延安府。', 'ch002-shijia'),
  ]),
  r('shi-jin-zhu-wu', 'shi-jin', 'zhu-wu', [
    p(2, 'friendship', '少華山首領', '史進與少華山朱武結識，因義氣往來，後一同歸梁山。', 'ch002-shijia', 118),
  ]),
  r('shi-jin-chen-da', 'shi-jin', 'chen-da', [
    p(2, 'friendship', '少華山聚義', '陳達攻打史家莊被擒，史進念朱武之義放還，兩家自此交好。', 'ch002-shijia', 118),
  ]),
  r('shi-jin-yang-chun', 'shi-jin', 'yang-chun', [
    p(2, 'friendship', '少華山聚義', '楊春與朱武、陳達同在少華山，後與史進一同歸梁山。', 'ch002-shijia', 118),
  ]),
  r('lu-zhi-shen-jin-cui-lian', 'lu-zhi-shen', 'jin-cui-lian', [
    p(3, 'patronage', '拳打鎮關西相救', '魯達聽金翠蓮哭訴被鄭屠強佔，贈銀助其父女回鄉，並三拳打死鄭屠。', 'ch003-zhenguanxi', 3, 'text', '你兩個只管去，這廝我來對付。'),
  ], true),
  r('zheng-tu-jin-cui-lian', 'zheng-tu', 'jin-cui-lian', [
    p(3, 'enmity', '強佔民女', '鄭屠以假契強佔金翠蓮，逼其父女流落渭州。', 'ch003-zhenguanxi', 3),
  ]),
  r('lu-zhi-shen-zheng-tu', 'lu-zhi-shen', 'zheng-tu', [
    p(3, 'enmity', '三拳打死', '魯達為金翠蓮出頭，在狀元橋下三拳打死鎮關西鄭屠。', 'ch003-zhenguanxi', 3),
  ]),
  r('lu-zhi-shen-shi-jin', 'lu-zhi-shen', 'shi-jin', [
    p(6, 'friendship', '赤松林重逢', '魯智深火燒瓦罐寺前在赤松林遇史進，二人合力殺崔道成、丘小乙。', 'ch006-waguansi', 118),
  ]),
  r('lu-zhi-shen-li-zhong', 'lu-zhi-shen', 'li-zhong', [
    p(5, 'friendship', '桃花山結識', '魯智深大鬧桃花村，痛打周通，李忠出面相認並留其上山。', 'ch005-taohuacun', 118),
  ]),
  r('lu-zhi-shen-zhou-tong', 'lu-zhi-shen', 'zhou-tong', [
    p(5, 'friendship', '桃花村痛打', '周通強娶民女，魯智深假扮新娘將其痛打，後結為山寨兄弟。', 'ch005-taohuacun', 115),
  ]),
  r('lu-zhi-shen-yang-zhi', 'lu-zhi-shen', 'yang-zhi', [
    p(17, 'sworn', '二龍山聚義', '魯智深、楊志、曹正設計殺鄧龍，奪寶珠寺，在二龍山落草。', 'ch017-erlongshan', 112),
  ]),
  r('lu-zhi-shen-cao-zheng', 'lu-zhi-shen', 'cao-zheng', [
    p(17, 'friendship', '二龍山同道', '曹正為魯智深、楊志定計奪二龍山，三人同守寶珠寺。', 'ch017-erlongshan', 112),
  ]),
  r('yang-zhi-cao-zheng', 'yang-zhi', 'cao-zheng', [
    p(17, 'friendship', '二龍山同道', '楊志與曹正同魯智深奪二龍山，後同歸梁山。', 'ch017-erlongshan', 112),
  ]),
  r('yang-zhi-liang-zhong-shu', 'liang-zhong-shu', 'yang-zhi', [
    p(13, 'patronage', '賞識押送生辰綱', '梁中書賞識楊志武藝，留其在大名府，命其押送生辰綱。', 'ch013-beijingdouwu', 16),
  ], true),
  r('yang-zhi-suo-chao', 'yang-zhi', 'suo-chao', [
    p(13, 'rivalry', '校場比武', '楊志與索超在大名府校場比武，大戰數十合不分勝負。', 'ch013-beijingdouwu', 13),
  ]),
  r('lin-chong-lin-niang-zi', 'lin-chong', 'lin-niang-zi', [
    p(7, 'marriage', '夫妻', '林沖之妻張氏，因高衙內調戲而牽出林沖一連串禍事。', 'ch007-baihutang', 8),
  ]),
  r('gao-ya-nei-lin-niang-zi', 'gao-ya-nei', 'lin-niang-zi', [
    p(7, 'enmity', '廟前調戲', '高衙內在岳廟前調戲林娘子，遭林沖制止後仍不肯罷休。', 'ch007-baihutang', 8),
  ]),
  r('lin-chong-gao-ya-nei', 'lin-chong', 'gao-ya-nei', [
    p(7, 'enmity', '調戲妻子之辱', '高衙內圖謀林娘子，林沖礙於高俅權勢一時隱忍。', 'ch007-baihutang', 8),
  ]),
  r('lin-chong-gao-qiu', 'lin-chong', 'gao-qiu', [
    p(7, 'enmity', '白虎堂誣陷', '高俅設計誘林沖持刀入白虎堂，誣其行刺，刺配滄州。', 'ch007-baihutang', 119),
  ]),
  r('lin-chong-lu-zhi-shen', 'lu-zhi-shen', 'lin-chong', [
    p(7, 'friendship', '大相國寺結識', '魯智深倒拔垂楊柳，林沖在牆外喝采，二人結為好友。', 'ch007-baihutang', 7),
    p(8, 'patronage', '野豬林救命之恩', '林沖被刺配滄州，董超、薛霸在野豬林欲下毒手，魯智深一路暗隨相救。', 'ch008-yezhulin', 119),
  ], true),
  r('lin-chong-lu-qian', 'lin-chong', 'lu-qian', [
    p(7, 'friendship', '自幼相交', '陸謙與林沖自幼相交，林沖視其為心腹朋友。', 'ch007-baihutang', 7),
    p(8, 'enmity', '出賣陷害', '陸謙投靠高俅，騙林娘子出門，又赴滄州火燒草料場，欲置林沖於死地。', 'ch010-shanshenmiao', 10),
  ]),
  r('lu-qian-gao-qiu', 'lu-qian', 'gao-qiu', [
    p(8, 'subordinate', '投靠高俅', '陸謙為高俅所用，參與設計陷害林沖。', 'ch008-yezhulin', 10),
  ], true),
  r('lu-qian-fu-an', 'lu-qian', 'fu-an', [
    p(8, 'alliance', '同謀陷害林沖', '陸謙與富安同為高衙內、高俅設計林沖。', 'ch008-yezhulin', 10),
  ]),
  r('gao-ya-nei-fu-an', 'gao-ya-nei', 'fu-an', [
    p(7, 'subordinate', '幫閒', '富安跟隨高衙內，為其圖謀林娘子出謀劃策。', 'ch007-baihutang', 8),
  ], true),
  r('lin-chong-dong-chao', 'lin-chong', 'dong-chao', [
    p(8, 'enmity', '野豬林行兇', '董超受陸謙賄囑，與薛霸在野豬林折磨林沖並欲殺之。', 'ch008-yezhulin', 8),
  ]),
  r('lin-chong-xue-ba', 'lin-chong', 'xue-ba', [
    p(8, 'enmity', '野豬林行兇', '薛霸與董超同在野豬林對林沖下毒手，被魯智深喝止。', 'ch008-yezhulin', 8),
  ]),
  r('lu-qian-dong-chao', 'lu-qian', 'dong-chao', [
    p(8, 'subordinate', '賄囑公差', '陸謙以銀兩買通董超，命其在押解途中害死林沖。', 'ch008-yezhulin', 8),
  ], true),
  r('lu-qian-xue-ba', 'lu-qian', 'xue-ba', [
    p(8, 'subordinate', '賄囑公差', '陸謙同時買通薛霸，二人合謀在野豬林動手。', 'ch008-yezhulin', 8),
  ], true),
  r('lin-chong-chai-jin', 'chai-jin', 'lin-chong', [
    p(9, 'patronage', '滄州厚待', '林沖到滄州柴進莊上，柴進厚禮相待，並讓其與洪教頭比武。', 'ch009-hongjiaotou', 10),
  ], true),
  r('lin-chong-wang-lun', 'lin-chong', 'wang-lun', [
    p(11, 'subordinate', '梁山寨主與教頭', '林沖雪夜上梁山，王倫忌其武藝，要他先納投名狀。', 'ch011-shangliangshan', 18),
    p(19, 'enmity', '火併王倫', '王倫不肯收留晁蓋等人，林沖當場火併王倫，推晁蓋為寨主。', 'ch019-duopo', 19),
  ]),
  r('chao-gai-wang-lun', 'chao-gai', 'wang-lun', [
    p(19, 'enmity', '梁山拒客', '晁蓋等投梁山，王倫不肯收留，最終被林沖火併。', 'ch019-duopo', 19),
  ]),
  r('chao-gai-lin-chong', 'chao-gai', 'lin-chong', [
    p(19, 'alliance', '推為寨主', '林沖火併王倫後推晁蓋為梁山寨主，二人共主水泊。', 'ch019-duopo', 60),
  ]),
  r('chao-gai-wu-yong', 'chao-gai', 'wu-yong', [
    p(14, 'friendship', '七星聚義', '吳用說動晁蓋，聯絡三阮、公孫勝，共謀生辰綱。', 'ch014-qixing', 60),
  ]),
  r('chao-gai-liu-tang', 'chao-gai', 'liu-tang', [
    p(14, 'friendship', '東溪村相認', '劉唐醉臥靈官殿，晁蓋認義，邀其共謀生辰綱。', 'ch014-qixing', 60),
  ]),
  r('chao-gai-gong-sun-sheng', 'chao-gai', 'gong-sun-sheng', [
    p(15, 'friendship', '七星聚義', '公孫勝應七星之數，到晁蓋莊上共議劫取生辰綱。', 'ch015-sanyuan', 60),
  ]),
  r('chao-gai-ruan-xiao-er', 'chao-gai', 'ruan-xiao-er', [
    p(15, 'friendship', '石碣村入夥', '吳用說動阮小二，阮氏兄弟到晁蓋莊上共聚大義。', 'ch015-sanyuan', 60),
  ]),
  r('chao-gai-ruan-xiao-wu', 'chao-gai', 'ruan-xiao-wu', [
    p(15, 'friendship', '石碣村入夥', '阮小五應吳用之邀，與兄長一同參與七星聚義。', 'ch015-sanyuan', 60),
  ]),
  r('chao-gai-ruan-xiao-qi', 'chao-gai', 'ruan-xiao-qi', [
    p(15, 'friendship', '石碣村入夥', '阮小七應吳用之邀，與兄長一同參與七星聚義。', 'ch015-sanyuan', 60),
  ]),
  r('song-jiang-chao-gai', 'song-jiang', 'chao-gai', [
    p(18, 'friendship', '通風報信之恩', '生辰綱事發，宋江先到東溪村通風報信，晁蓋得以及時逃走。', 'ch018-fangchaogai', 60),
  ]),
  r('song-jiang-zhu-tong', 'zhu-tong', 'song-jiang', [
    p(18, 'patronage', '鄆城私放', '朱仝奉命緝拿晁蓋等人，卻在鄆城故意放走；後又私放宋江。', 'ch018-fangchaogai', 22),
  ], true),
  r('song-jiang-lei-heng', 'lei-heng', 'song-jiang', [
    p(18, 'patronage', '鄆城私放', '雷橫與朱仝一同在鄆城放走晁蓋，後又在宋家莊暗放宋江。', 'ch018-fangchaogai', 22),
  ], true),
  r('zhu-tong-lei-heng', 'zhu-tong', 'lei-heng', [
    p(13, 'friendship', '鄆城同僚', '朱仝、雷橫同在鄆城縣任職，多次一同辦差、私放義士。', 'ch018-fangchaogai', 51),
  ]),
  r('song-jiang-yan-po-xi', 'song-jiang', 'yan-po-xi', [
    p(20, 'marriage', '外室', '宋江接濟閻婆惜母女，並將閻婆惜養為外室。', undefined, 20),
    p(21, 'enmity', '書信要脅被殺', '閻婆惜與張文遠私通，又以梁山書信要脅宋江，宋江怒而殺之。', 'ch021-shanpo-xi', 21),
  ]),
  r('yan-po-xi-zhang-wen-yuan', 'yan-po-xi', 'zhang-wen-yuan', [
    p(21, 'romance', '私通', '閻婆惜與宋江同僚張文遠私通，成為宋江殺惜的導火線。', 'ch021-shanpo-xi', 21),
  ]),
  r('song-jiang-zhang-wen-yuan', 'song-jiang', 'zhang-wen-yuan', [
    p(21, 'enmity', '私通外室', '張文遠與閻婆惜私通，宋江殺惜後二人結怨。', 'ch021-shanpo-xi', 21),
  ]),
  r('song-jiang-song-qing', 'song-jiang', 'song-qing', [
    p(22, 'kinship', '兄弟', '宋清為宋江之弟，宋江逃亡後與父親宋太公同受牽連。', 'ch022-yishi-song', 120),
  ]),
  r('song-jiang-song-tai-gong', 'song-jiang', 'song-tai-gong', [
    p(22, 'kinship', '父子', '宋太公是宋江之父，宋江回鄉接父時遭官兵追趕。', 'ch022-yishi-song', 120),
  ]),
  r('song-qing-song-tai-gong', 'song-qing', 'song-tai-gong', [
    p(22, 'kinship', '父子', '宋清與父親宋太公同住宋家莊，後隨宋江上梁山。', 'ch022-yishi-song', 120),
  ]),
  r('wu-song-wu-da-lang', 'wu-song', 'wu-da-lang', [
    p(23, 'kinship', '兄弟', '武松在陽穀與兄長武大郎重逢，兄長以賣炊餅為生。', 'ch024-wangpo', 25),
  ]),
  r('wu-song-song-jiang', 'wu-song', 'song-jiang', [
    p(23, 'friendship', '柴進莊相識', '武松在柴進莊上與宋江相遇，二人意氣相投，後同歸梁山。', 'ch023-jingyanggang', 120),
  ]),
  r('wu-song-chai-jin', 'wu-song', 'chai-jin', [
    p(22, 'patronage', '柴進莊收留', '武松落魄時曾在柴進莊上棲身，得柴進收留。', 'ch023-jingyanggang', 23),
  ], true),
  r('wu-da-lang-pan-jin-lian', 'wu-da-lang', 'pan-jin-lian', [
    p(24, 'marriage', '夫妻', '潘金蓮嫁與武大郎，卻嫌其貌醜，後與西門慶私通。', 'ch024-wangpo', 25),
  ]),
  r('pan-jin-lian-xi-men-qing', 'pan-jin-lian', 'xi-men-qing', [
    p(24, 'romance', '私通', '王婆牽線，潘金蓮與西門慶在茶坊相識並私通。', 'ch024-wangpo', 26),
  ]),
  r('wang-po-pan-jin-lian', 'wang-po', 'pan-jin-lian', [
    p(24, 'alliance', '牽線設局', '王婆貪賄，為潘金蓮與西門慶牽線，又設計毒殺武大郎。', 'ch024-wangpo', 26),
  ]),
  r('wang-po-xi-men-qing', 'wang-po', 'xi-men-qing', [
    p(24, 'alliance', '茶坊撮合', '王婆替西門慶撮合潘金蓮，並從中取利。', 'ch024-wangpo', 26),
  ]),
  r('wu-song-pan-jin-lian', 'wu-song', 'pan-jin-lian', [
    p(23, 'kinship', '叔嫂', '武松與兄長武大郎同住，潘金蓮為其嫂。', 'ch024-wangpo', 25),
    p(26, 'enmity', '殺兄之仇', '武松查得武大郎死因，在靈前殺死潘金蓮。', 'ch026-wuerlang', 26),
  ]),
  r('wu-da-lang-xi-men-qing', 'wu-da-lang', 'xi-men-qing', [
    p(24, 'enmity', '奪妻之恨', '西門慶與潘金蓮私通，後合謀以藥毒死武大郎。', 'ch025-wudailang', 25),
  ]),
  r('wu-da-lang-wang-po', 'wu-da-lang', 'wang-po', [
    p(24, 'enmity', '毒計害命', '王婆設計讓潘金蓮以藥毒死武大郎，並教其掩蓋屍身。', 'ch025-wudailang', 25),
  ]),
  r('wu-song-xi-men-qing', 'wu-song', 'xi-men-qing', [
    p(25, 'enmity', '殺兄之仇', '武松查明真相後，在獅子樓鬥殺西門慶。', 'ch026-wuerlang', 26),
  ]),
  r('wu-song-wang-po', 'wu-song', 'wang-po', [
    p(25, 'enmity', '毒計害兄', '王婆主謀毒殺武大郎，武松取得口供後將其送官。', 'ch026-wuerlang', 26),
  ]),
  r('wu-song-zhang-qing', 'wu-song', 'zhang-qing-caiyuan', [
    p(27, 'sworn', '十字坡結義', '武松刺配孟州途經十字坡，識破孫二娘，與張青結為兄弟。', 'ch027-shizipo', 118),
  ]),
  r('wu-song-sun-er-niang', 'wu-song', 'sun-er-niang', [
    p(27, 'sworn', '十字坡結義', '孫二娘在十字坡開店，與武松交手後結識，結為兄弟。', 'ch027-shizipo', 118),
  ]),
  r('zhang-qing-sun-er-niang', 'zhang-qing-caiyuan', 'sun-er-niang', [
    p(27, 'marriage', '夫妻', '張青與孫二娘夫妻二人在十字坡經營酒店。', 'ch027-shizipo', 118),
  ]),
  r('wu-song-shi-en', 'shi-en', 'wu-song', [
    p(28, 'patronage', '義奪快活林', '施恩厚待武松，武松為報恩醉打蔣門神，替其奪回快活林。', 'ch028-kuaihuolin', 31),
  ], true),
  r('wu-song-jiang-men-shen', 'wu-song', 'jiang-men-shen', [
    p(28, 'enmity', '醉打蔣門神', '武松在快活林痛打蔣門神，蔣門神懷恨報復。', 'ch029-jiangmenshen', 31),
  ]),
  r('wu-song-zhang-du-jian', 'wu-song', 'zhang-du-jian', [
    p(29, 'enmity', '設計陷害', '張都監設宴誣陷武松為賊，將其下獄並企圖在飛雲浦加害。', 'ch029-jiangmenshen', 31),
  ]),
  r('zhang-du-jian-jiang-men-shen', 'zhang-du-jian', 'jiang-men-shen', [
    p(29, 'alliance', '勾結報復', '蔣門神勾結張都監，設計陷害武松。', 'ch029-jiangmenshen', 31),
  ]),
  r('song-jiang-hua-rong', 'song-jiang', 'hua-rong', [
    p(33, 'friendship', '清風寨生死之交', '宋江在清風山被捉，花榮不顧前程出手相救，二人結為生死之交。', 'ch033-qingfengzhai', 120),
  ]),
  r('liu-gao-song-jiang', 'liu-gao', 'song-jiang', [
    p(33, 'enmity', '誣陷宋江', '清風寨知寨劉高誣陷宋江，將其捉拿，引發花榮大鬧清風寨。', 'ch033-qingfengzhai', 35),
  ]),
  r('liu-gao-hua-rong', 'liu-gao', 'hua-rong', [
    p(33, 'enmity', '正副知寨反目', '劉高與花榮同守清風寨，因宋江之事反目，誣告花榮勾結賊寇。', 'ch033-qingfengzhai', 34),
  ]),
  r('qin-ming-murong-zhifu', 'qin-ming', 'murong-zhifu', [
    p(34, 'enmity', '家小被害', '秦明奉命征討清風山被擒，慕容知府將其家小殺害，秦明被迫歸梁山。', 'ch034-walichang', 34),
  ]),
  r('qin-ming-huang-xin', 'qin-ming', 'huang-xin', [
    p(33, 'master', '師徒', '黃信為秦明徒弟，二人同守青州，後先後歸梁山。', 'ch034-walichang', 118),
  ], true),
  r('huang-xin-song-jiang', 'huang-xin', 'song-jiang', [
    p(35, 'subordinate', '歸順梁山', '秦明、黃信等隨宋江上梁山，黃信自此為梁山將領。', 'ch035-liangshansheyan', 120),
  ], true),
  r('hua-rong-qin-ming', 'hua-rong', 'qin-ming', [
    p(35, 'friendship', '清風山同歸', '花榮與秦明經清風寨一戰後同歸梁山，並肩征戰。', 'ch035-liangshansheyan', 118),
  ]),
  r('song-jiang-dai-zong', 'song-jiang', 'dai-zong', [
    p(36, 'friendship', '江州照應', '吳用派戴宗往江州照應宋江，二人結識並結為好友。', 'ch036-jieyang', 120),
  ]),
  r('song-jiang-li-jun', 'song-jiang', 'li-jun', [
    p(36, 'friendship', '揭陽嶺結識', '宋江刺配江州途經揭陽嶺，結識李俊，得其相助。', 'ch036-jieyang', 119),
  ]),
  r('song-jiang-zhang-heng', 'song-jiang', 'zhang-heng', [
    p(37, 'friendship', '潯陽江化敵為友', '張橫在潯陽江打劫宋江，李俊趕來說明緣由，眾人化敵為友。', 'ch037-xunyangjiang', 119),
  ]),
  r('li-jun-zhang-heng', 'li-jun', 'zhang-heng', [
    p(37, 'friendship', '潯陽江相識', '李俊與張橫同為江州水上一帶人物，因宋江之事結識。', 'ch037-xunyangjiang', 119),
  ]),
  r('mu-hong-mu-chun', 'mu-hong', 'mu-chun', [
    p(37, 'kinship', '兄弟', '穆弘、穆春為揭陽鎮穆家兄弟，後同歸梁山。', 'ch037-xunyangjiang', 120),
  ]),
  r('song-jiang-li-kui', 'song-jiang', 'li-kui', [
    p(38, 'friendship', '江州相隨', '宋江在江州結識李逵，李逵自此忠心相隨，直至楚州共飲毒酒。', 'ch038-daizong', 120),
  ]),
  r('song-jiang-zhang-shun', 'song-jiang', 'zhang-shun', [
    p(38, 'friendship', '江州結識', '宋江在江州結識張順，張順後為梁山屢建水功。', 'ch038-daizong', 114),
  ]),
  r('li-kui-zhang-shun', 'li-kui', 'zhang-shun', [
    p(38, 'friendship', '江中惡鬥後結交', '李逵與張順在江中惡鬥，經宋江調解後結為好友。', 'ch038-daizong', 114),
  ]),
  r('dai-zong-li-kui', 'dai-zong', 'li-kui', [
    p(38, 'friendship', '江州同夥', '戴宗與李逵同在江州，後一同隨宋江上梁山。', 'ch038-daizong', 120),
  ]),
  r('dai-zong-cai-jiu', 'dai-zong', 'cai-jiu', [
    p(38, 'subordinate', '江州節級', '戴宗為江州兩院押牢節級，在蔡九知府麾下當差。', 'ch038-daizong', 40),
  ], true),
  r('song-jiang-huang-wen-bing', 'song-jiang', 'huang-wen-bing', [
    p(39, 'enmity', '告發反詩', '黃文炳告發宋江潯陽樓反詩，致使宋江、戴宗被判斬。', 'ch039-xunyanglou', 41),
  ]),
  r('cai-jiu-huang-wen-bing', 'cai-jiu', 'huang-wen-bing', [
    p(39, 'subordinate', '通判告密', '黃文炳為江州通判，向蔡九知府告發宋江反詩。', 'ch039-xunyanglou', 41),
  ], true),
  r('dai-zong-huang-wen-bing', 'dai-zong', 'huang-wen-bing', [
    p(39, 'enmity', '識破假信', '戴宗送假信被黃文炳識破，二人一同被問斬。', 'ch039-xunyanglou', 41),
  ]),
  r('cai-jiu-song-jiang', 'cai-jiu', 'song-jiang', [
    p(39, 'enmity', '判處斬刑', '蔡九知府判宋江、戴宗死刑，引發梁山劫法場。', 'ch039-xunyanglou', 40),
  ]),
  r('cai-jiu-dai-zong', 'cai-jiu', 'dai-zong', [
    p(39, 'enmity', '判處斬刑', '戴宗因送假信被蔡九知府判斬，後被梁山好漢救出。', 'ch039-xunyanglou', 40),
  ]),
  r('zhang-shun-huang-wen-bing', 'zhang-shun', 'huang-wen-bing', [
    p(41, 'enmity', '活捉黃文炳', '梁山攻入無為軍，張順活捉黃文炳，宋江將其處死。', 'ch041-wuweijun', 41),
  ]),
  r('cai-jing-liang-zhong-shu', 'cai-jing', 'liang-zhong-shu', [
    p(12, 'kinship', '翁婿', '梁中書為蔡京女婿，每年蒐集生辰綱送往東京。', 'ch012-yangzhimaiDao', 120),
  ]),
  r('cai-jing-cai-jiu', 'cai-jing', 'cai-jiu', [
    p(38, 'kinship', '父子', '蔡九知府為蔡京之子，仗父勢鎮守江州。', 'ch038-daizong', 120),
  ]),
  r('song-jiang-gao-qiu', 'song-jiang', 'gao-qiu', [
    p(78, 'enmity', '征剿梁山與構陷', '高俅親率十節度使征梁山，三戰皆敗；招安前後仍多次阻撓、構陷梁山。', 'ch078-yibaidagao', 120),
  ]),
  r('gao-qiu-tong-guan', 'gao-qiu', 'tong-guan', [
    p(76, 'alliance', '朝中同黨', '高俅、童貫同為朝中權臣，共同主張征剿梁山。', 'ch076-jiugong', 77),
  ]),
  r('song-jiang-tong-guan', 'song-jiang', 'tong-guan', [
    p(76, 'enmity', '征剿梁山', '童貫率軍征梁山，宋江設十面埋伏兩次擊敗官軍。', 'ch076-jiugong', 77),
  ]),
  r('wu-yong-tong-guan', 'wu-yong', 'tong-guan', [
    p(76, 'enmity', '布陣迎敵', '吳用為宋江布陣，設計大敗童貫。', 'ch076-jiugong', 77),
  ]),
  r('yang-xiong-shi-xiu', 'yang-xiong', 'shi-xiu', [
    p(44, 'sworn', '長街結義', '楊雄在薊州長街遇石秀，二人意氣相投，結為兄弟。', 'ch044-yinmachuan', 118),
  ]),
  r('yang-xiong-pan-qiao-yun', 'yang-xiong', 'pan-qiao-yun', [
    p(44, 'marriage', '夫妻', '潘巧雲為楊雄之妻，與報恩寺僧裴如海私通。', 'ch044-yinmachuan', 44),
    p(45, 'enmity', '私通敗露', '石秀識破姦情，楊雄在翠屏山質問潘巧雲後將其殺害。', 'ch045-cuipingshan', 45),
  ]),
  r('pan-qiao-yun-pei-ru-hai', 'pan-qiao-yun', 'pei-ru-hai', [
    p(44, 'romance', '私通', '潘巧雲借還願之名與裴如海私通，被石秀察覺。', 'ch045-cuipingshan', 45),
  ]),
  r('shi-xiu-pan-qiao-yun', 'shi-xiu', 'pan-qiao-yun', [
    p(45, 'enmity', '識破姦情', '石秀識破潘巧雲與裴如海私通，並在翠屏山與其對質。', 'ch045-cuipingshan', 45),
  ]),
  r('shi-xiu-pei-ru-hai', 'shi-xiu', 'pei-ru-hai', [
    p(45, 'enmity', '智殺裴如海', '石秀識破姦情後殺死裴如海，替楊雄出頭。', 'ch045-cuipingshan', 45),
  ]),
  r('yang-xiong-pei-ru-hai', 'yang-xiong', 'pei-ru-hai', [
    p(45, 'enmity', '奪妻之恨', '裴如海與楊雄之妻私通，楊雄在翠屏山殺妻後與石秀投梁山。', 'ch045-cuipingshan', 45),
  ]),
  r('shi-qian-yang-xiong', 'shi-qian', 'yang-xiong', [
    p(46, 'friendship', '祝家店同行', '時遷與楊雄、石秀同投梁山，途經祝家店偷雞惹禍，三人共患難。', 'ch046-zhujiadian', 118),
  ]),
  r('shi-qian-shi-xiu', 'shi-qian', 'shi-xiu', [
    p(46, 'friendship', '祝家店同行', '時遷偷雞引發祝家莊之戰，石秀火燒店房，三人一同殺出。', 'ch046-zhujiadian', 118),
  ]),
  r('shi-qian-zhu-chao-feng', 'shi-qian', 'zhu-chao-feng', [
    p(46, 'enmity', '祝家店結怨', '時遷偷雞、石秀燒店，祝家莊與梁山結下仇怨。', 'ch046-zhujiadian', 50),
  ]),
  r('song-jiang-zhu-chao-feng', 'song-jiang', 'zhu-chao-feng', [
    p(47, 'enmity', '三打祝家莊', '宋江親征祝家莊，祝朝奉據莊抵抗，最終莊破人亡。', 'ch047-yidazhujia', 50),
  ]),
  r('li-ying-zhu-chao-feng', 'li-ying', 'zhu-chao-feng', [
    p(47, 'enmity', '修書斡旋未果', '李應與祝家莊有舊，修書為梁山斡旋，祝朝奉不聽，兩家反目。', 'ch047-yidazhujia', 50),
  ]),
  r('zhu-chao-feng-zhu-biao', 'zhu-chao-feng', 'zhu-biao', [
    p(47, 'kinship', '父子', '祝彪為祝朝奉之子，隨父守衛祝家莊。', 'ch047-yidazhujia', 50),
  ]),
  r('zhu-chao-feng-luan-ting-yu', 'zhu-chao-feng', 'luan-ting-yu', [
    p(47, 'subordinate', '莊主與教師', '欒廷玉為祝家莊教師，替祝朝奉訓練莊客、抵禦梁山。', 'ch047-yidazhujia', 50),
  ], true),
  r('hu-san-niang-wang-ying', 'hu-san-niang', 'wang-ying', [
    p(48, 'enmity', '陣前擒王英', '扈三娘在祝家莊陣前單捉王英，令梁山軍受挫。', 'ch048-erda', 49),
    p(50, 'marriage', '宋江主婚', '祝家莊破後，宋江做主將扈三娘許配王英，二人結為夫妻。', 'ch050-sandazhujia', 116),
  ]),
  r('hu-san-niang-zhu-biao', 'hu-san-niang', 'zhu-biao', [
    p(47, 'marriage', '原許婚約', '扈三娘原與祝彪有婚約，祝、扈兩莊因此結盟。', 'ch048-erda', 50),
  ]),
  r('hu-san-niang-hu-cheng', 'hu-san-niang', 'hu-cheng', [
    p(48, 'kinship', '兄妹', '扈成為扈三娘之兄，扈家莊與祝家莊同抗梁山。', 'ch048-erda', 50),
  ]),
  r('hu-san-niang-song-jiang', 'song-jiang', 'hu-san-niang', [
    p(50, 'patronage', '義兄主婚', '扈三娘歸順梁山後，宋江認其為義妹並做主婚配。', 'ch050-sandazhujia', 116),
  ], true),
  r('sun-li-luan-ting-yu', 'sun-li', 'luan-ting-yu', [
    p(49, 'friendship', '同門師兄弟', '孫立與欒廷玉同門學藝，孫立藉此混入祝家莊為內應。', 'ch049-dengzhou', 50),
  ]),
  r('sun-li-sun-xin', 'sun-li', 'sun-xin', [
    p(49, 'kinship', '兄弟', '孫立與孫新為兄弟，同為登州兵馬提轄出身。', 'ch049-dengzhou', 120),
  ]),
  r('sun-xin-gu-da-sao', 'sun-xin', 'gu-da-sao', [
    p(49, 'marriage', '夫妻', '孫新與顧大嫂夫妻二人在登州經營酒店，參與劫牢。', 'ch049-dengzhou', 120),
  ]),
  r('gu-da-sao-jie-zhen', 'gu-da-sao', 'jie-zhen', [
    p(49, 'kinship', '表姐弟', '顧大嫂為解珍、解寶表姐，二人下獄後她聯絡登州好漢劫牢。', 'ch049-dengzhou', 116),
  ]),
  r('gu-da-sao-jie-bao', 'gu-da-sao', 'jie-bao', [
    p(49, 'kinship', '表姐弟', '解寶與兄長解珍一同被毛太公陷害，顧大嫂劫牢相救。', 'ch049-dengzhou', 116),
  ]),
  r('jie-zhen-jie-bao', 'jie-zhen', 'jie-bao', [
    p(49, 'kinship', '兄弟', '解珍、解寶兄弟同守登雲山，後同歸梁山、同征方臘。', 'ch049-dengzhou', 116),
  ]),
  r('mao-tai-gong-jie-zhen', 'mao-tai-gong', 'jie-zhen', [
    p(49, 'enmity', '誣陷下獄', '毛太公誣陷解珍、解寶盜取財物，將二人下獄。', 'ch049-dengzhou', 49),
  ]),
  r('mao-tai-gong-jie-bao', 'mao-tai-gong', 'jie-bao', [
    p(49, 'enmity', '誣陷下獄', '毛太公勾結官府，將解寶與兄長一同陷害入獄。', 'ch049-dengzhou', 49),
  ]),
  r('li-kui-li-gui', 'li-kui', 'li-gui', [
    p(43, 'enmity', '假冒剪徑', '李鬼冒充李逵在沂嶺剪徑，被李逵識破後殺死。', 'ch043-yiling', 43),
  ]),
  r('li-kui-yin-tian-xi', 'li-kui', 'yin-tian-xi', [
    p(52, 'enmity', '打死殷天錫', '殷天錫強佔柴進莊園，李逵一怒將其打死，牽連柴進下獄。', 'ch052-gaotang', 52),
  ]),
  r('chai-jin-yin-tian-xi', 'chai-jin', 'yin-tian-xi', [
    p(52, 'enmity', '強佔莊園', '殷天錫倚仗高廉權勢強佔柴進莊園，柴進不肯相讓。', 'ch052-gaotang', 52),
  ]),
  r('chai-jin-gao-lian', 'chai-jin', 'gao-lian', [
    p(52, 'enmity', '陷害下獄', '高廉偏袒殷天錫，將柴進下獄，梁山發兵高唐州。', 'ch052-gaotang', 54),
  ]),
  r('gao-lian-yin-tian-xi', 'gao-lian', 'yin-tian-xi', [
    p(52, 'kinship', '妻舅', '殷天錫為高廉妻舅，倚仗其權勢橫行高唐州。', 'ch052-gaotang', 52),
  ]),
  r('gong-sun-sheng-gao-lian', 'gong-sun-sheng', 'gao-lian', [
    p(53, 'rivalry', '道法對決', '高廉以妖法困梁山軍，公孫勝以道法破之，攻破高唐州。', 'ch054-gaolian', 54),
  ]),
  r('gong-sun-sheng-luo-zhen-ren', 'luo-zhen-ren', 'gong-sun-sheng', [
    p(53, 'master', '二仙山師徒', '羅真人為公孫勝之師，公孫勝回二仙山修行，後被請下山破高廉。', 'ch053-gongsunsheng', 110),
  ], true),
  r('li-kui-luo-zhen-ren', 'li-kui', 'luo-zhen-ren', [
    p(53, 'enmity', '斧劈羅真人', '李逵誤劈羅真人，惹出禍端，後被羅真人懲戒。', 'ch053-gongsunsheng', 53),
  ]),
  r('dai-zong-gong-sun-sheng', 'dai-zong', 'gong-sun-sheng', [
    p(53, 'friendship', '二請公孫勝', '戴宗、李逵往薊州二仙山請公孫勝下山，助破高唐州。', 'ch053-gongsunsheng', 110),
  ]),
  r('li-kui-chai-jin', 'li-kui', 'chai-jin', [
    p(54, 'patronage', '下井相救', '高唐州破後，李逵下井救出柴進。', 'ch054-gaolian', 54),
  ], true),
  r('lei-heng-bai-xiu-ying', 'lei-heng', 'bai-xiu-ying', [
    p(51, 'enmity', '打死白秀英', '白秀英辱罵雷橫之母，雷橫一怒將其打死，被押入獄。', 'ch051-xiaoyanei', 51),
  ]),
  r('zhu-tong-xiao-ya-nei', 'zhu-tong', 'xiao-ya-nei', [
    p(51, 'patronage', '看顧小衙內', '朱仝被刺配滄州後看顧知府之子小衙內，對其十分愛護。', 'ch051-xiaoyanei', 51),
  ], true),
  r('li-kui-xiao-ya-nei', 'li-kui', 'xiao-ya-nei', [
    p(51, 'enmity', '殺害小衙內', '吳用、李逵設計逼朱仝上山，李逵殺死小衙內。', 'ch051-xiaoyanei', 51),
  ]),
  r('zhu-tong-li-kui', 'zhu-tong', 'li-kui', [
    p(51, 'enmity', '殺小衙內之仇', '李逵殺死小衙內，朱仝憤而要與其拼命，二人自此不睦。', 'ch051-xiaoyanei', 120),
  ]),
  r('wu-yong-zhu-tong', 'wu-yong', 'zhu-tong', [
    p(51, 'alliance', '設計逼上山', '吳用設計逼朱仝上山，安排李逵殺小衙內以絕其歸路。', 'ch051-xiaoyanei', 120),
  ]),
  r('gao-qiu-hu-yan-zhuo', 'gao-qiu', 'hu-yan-zhuo', [
    p(55, 'subordinate', '奉命征梁山', '高俅興三路兵征梁山，呼延灼以連環馬為前鋒。', 'ch055-lianhuanma', 57),
  ], true),
  r('hu-yan-zhuo-song-jiang', 'hu-yan-zhuo', 'song-jiang', [
    p(55, 'enmity', '連環馬征剿', '呼延灼奉高俅之命以連環馬征梁山，初戰得勝。', 'ch055-lianhuanma', 57),
    p(58, 'subordinate', '歸順梁山', '呼延灼敗走青州，後被梁山擒獲歸順，成為馬軍大將。', 'ch058-sanshan', 120),
  ]),
  r('xu-ning-tang-long', 'xu-ning', 'tang-long', [
    p(56, 'kinship', '表兄弟', '湯隆為徐寧表弟，協助吳用設計賺徐寧上山。', 'ch056-daoxujia', 114),
  ]),
  r('shi-qian-xu-ning', 'shi-qian', 'xu-ning', [
    p(56, 'enmity', '盜取雁翎甲', '時遷奉吳用之命盜走徐寧祖傳雁翎甲，誘其上山。', 'ch056-daoxujia', 56),
  ]),
  r('wu-yong-xu-ning', 'wu-yong', 'xu-ning', [
    p(56, 'alliance', '設計賺取', '吳用設計盜甲賺徐寧上山，徐寧此後傳授鉤鐮槍法。', 'ch056-daoxujia', 114),
  ]),
  r('xu-ning-hu-yan-zhuo', 'xu-ning', 'hu-yan-zhuo', [
    p(57, 'rivalry', '鉤鐮槍破連環馬', '徐寧以鉤鐮槍大破呼延灼連環馬，呼延灼敗走青州。', 'ch057-polianhuan', 57),
  ]),
  r('song-jiang-guan-sheng', 'song-jiang', 'guan-sheng', [
    p(64, 'patronage', '義釋歸順', '關勝奉命征梁山被擒，宋江義釋，關勝歸順。', 'ch064-guansheng', 120),
  ], true),
  r('guan-sheng-xuan-zan', 'guan-sheng', 'xuan-zan', [
    p(63, 'subordinate', '副將隨征', '宣贊隨關勝征梁山，後與關勝一同歸順。', 'ch063-damingcheng', 112),
  ], true),
  r('guan-sheng-hao-si-wen', 'guan-sheng', 'hao-si-wen', [
    p(63, 'subordinate', '副將隨征', '郝思文隨關勝征梁山，後與關勝一同歸順。', 'ch063-damingcheng', 114),
  ], true),
  r('hu-yan-zhuo-guan-sheng', 'hu-yan-zhuo', 'guan-sheng', [
    p(64, 'alliance', '月夜賺關勝', '呼延灼詐降，月夜賺關勝入伏被擒，二人同為梁山馬軍大將。', 'ch064-guansheng', 120),
  ]),
  r('song-jiang-suo-chao', 'song-jiang', 'suo-chao', [
    p(64, 'patronage', '雪天擒索超', '宋江雪天設伏擒住索超，索超歸順梁山。', 'ch064-guansheng', 114),
  ], true),
  r('lu-jun-yi-yan-qing', 'lu-jun-yi', 'yan-qing', [
    p(61, 'subordinate', '主僕患難', '燕青為盧俊義家僕，盧俊義被李固陷害時，燕青放冷箭救主。', 'ch061-lujunyi', 119),
  ], true),
  r('lu-jun-yi-li-gu', 'lu-jun-yi', 'li-gu', [
    p(61, 'subordinate', '主僕', '李固為盧家管家，受盧俊義信任。', 'ch061-lujunyi', 61),
    p(62, 'enmity', '誣陷奪產', '李固與賈氏私通，誣陷盧俊義私通梁山，圖謀其家產。', 'ch066-damingzhi', 66),
  ]),
  r('lu-jun-yi-jia-shi', 'lu-jun-yi', 'jia-shi', [
    p(61, 'marriage', '夫妻', '賈氏為盧俊義之妻，留守大名府，後與管家李固私通。', 'ch061-lujunyi', 61),
    p(62, 'enmity', '私通李固', '賈氏與李固私通，合謀陷害盧俊義。', 'ch066-damingzhi', 66),
  ]),
  r('li-gu-jia-shi', 'li-gu', 'jia-shi', [
    p(62, 'romance', '私通', '李固與主母賈氏私通，並合謀奪取盧家產業。', 'ch062-damingjiefa', 66),
  ]),
  r('wu-yong-lu-jun-yi', 'wu-yong', 'lu-jun-yi', [
    p(61, 'alliance', '智賺玉麒麟', '吳用扮算命先生賺盧俊義上梁山，後助其成為梁山副寨主。', 'ch061-lujunyi', 120),
  ]),
  r('yan-qing-zhang-shun', 'yan-qing', 'zhang-shun', [
    p(61, 'friendship', '金沙渡相助', '盧俊義途經金沙渡，燕青、張順先後出手，二人因此相識。', 'ch061-lujunyi', 114),
  ]),
  r('shi-xiu-lu-jun-yi', 'shi-xiu', 'lu-jun-yi', [
    p(62, 'patronage', '劫法場相救', '盧俊義被押赴法場，石秀獨自跳樓劫法場，雖被擒仍義無反顧。', 'ch062-damingjiefa', 66),
  ], true),
  r('yan-qing-li-gu', 'yan-qing', 'li-gu', [
    p(62, 'enmity', '護主對抗', '李固誣陷盧俊義，燕青放冷箭救主，並與其對抗。', 'ch062-damingjiefa', 66),
  ]),
  r('shi-xiu-li-gu', 'shi-xiu', 'li-gu', [
    p(62, 'enmity', '揭發陰謀', '石秀查知李固、賈氏陷害盧俊義之事，與梁山裡應外合。', 'ch062-damingjiefa', 66),
  ]),
  r('lu-jun-yi-shi-wen-gong', 'lu-jun-yi', 'shi-wen-gong', [
    p(68, 'enmity', '活捉報仇', '盧俊義設伏活捉史文恭，為晁蓋報仇。', 'ch068-zengtoushi', 68),
  ]),
  r('chao-gai-shi-wen-gong', 'chao-gai', 'shi-wen-gong', [
    p(60, 'enmity', '毒箭之仇', '晁蓋親征曾頭市，中史文恭毒箭，傷重身亡。', 'ch060-zengtoushi', 60),
  ]),
  r('song-jiang-shi-wen-gong', 'song-jiang', 'shi-wen-gong', [
    p(60, 'enmity', '為晁蓋報仇', '晁蓋死後，宋江誓破曾頭市，最終於第68回活捉史文恭。', 'ch060-zengtoushi', 68),
  ]),
  r('zeng-nong-shi-wen-gong', 'zeng-nong', 'shi-wen-gong', [
    p(60, 'subordinate', '曾頭市教師', '曾弄收留史文恭為曾頭市教師，倚其抵禦梁山。', 'ch060-zengtoushi', 68),
  ], true),
  r('song-jiang-zeng-nong', 'song-jiang', 'zeng-nong', [
    p(60, 'enmity', '曾頭市結仇', '曾頭市與梁山結仇，宋江領兵攻打，曾弄最終敗亡。', 'ch060-zengtoushi', 68),
  ]),
  r('zhang-shun-an-dao-quan', 'zhang-shun', 'an-dao-quan', [
    p(65, 'patronage', '請神醫上山', '張順奉命請安道全上梁山醫治宋江，歷經波折。', 'ch065-zhangshun', 110),
  ], true),
  r('song-jiang-an-dao-quan', 'song-jiang', 'an-dao-quan', [
    p(65, 'patronage', '神醫救治', '安道全上梁山後醫治宋江，自此留在梁山。', 'ch065-zhangshun', 110),
  ], true),
  r('song-jiang-dong-ping', 'song-jiang', 'dong-ping', [
    p(69, 'patronage', '義釋雙槍將', '董平出戰被擒，宋江義釋，董平歸順梁山。', 'ch069-dongping', 115),
  ], true),
  r('dong-ping-cheng-wan-li', 'dong-ping', 'cheng-wan-li', [
    p(69, 'enmity', '求親被拒', '董平向程萬里求親被拒，城破後殺其全家。', 'ch069-dongping', 69),
  ]),
  r('dong-ping-cheng-xiao-jie', 'dong-ping', 'cheng-xiao-jie', [
    p(69, 'romance', '城破強娶', '東平府城破後，董平強娶程萬里之女。', 'ch069-dongping', 115),
  ]),
  r('cheng-wan-li-cheng-xiao-jie', 'cheng-wan-li', 'cheng-xiao-jie', [
    p(69, 'kinship', '父女', '程小姐為東平府太守程萬里之女。', 'ch069-dongping', 69),
  ]),
  r('song-jiang-zhang-qing', 'song-jiang', 'zhang-qing', [
    p(70, 'patronage', '義釋沒羽箭', '張清以飛石連打梁山十五將，被擒後宋江義釋，張清歸順。', 'ch070-zhangqing', 115),
  ], true),
  r('zhang-qing-qiong-ying', 'zhang-qing', 'qiong-ying', [
    p(98, 'marriage', '陣前結緣', '張清與瓊英在征田虎之役中相識，後結為夫婦。', 'ch098-qiongying', 115),
  ]),
  r('qiong-ying-tian-hu', 'qiong-ying', 'tian-hu', [
    p(97, 'subordinate', '田虎軍先鋒', '瓊英為田虎軍先鋒，在陣前與張清相遇。', 'ch097-qiongying', 98),
  ], true),
  r('qiong-ying-wu-li', 'qiong-ying', 'wu-li', [
    p(97, 'kinship', '義父女', '鄔梨收瓊英為義女，瓊英因而在田虎軍中領兵。', 'ch097-qiongying', 98),
  ]),
  r('wu-li-tian-hu', 'wu-li', 'tian-hu', [
    p(97, 'kinship', '國舅', '鄔梨為田虎國舅，是田虎軍中重要將領。', 'ch097-qiongying', 98),
  ]),
  r('wu-yong-wu-li', 'wu-yong', 'wu-li', [
    p(98, 'enmity', '設計鴆殺', '吳用設計鴆殺鄔梨，使田虎勢力內部分崩離析。', 'ch098-qiongying', 98),
  ]),
  r('song-jiang-li-shi-shi', 'song-jiang', 'li-shi-shi', [
    p(72, 'alliance', '招安門路', '宋江等人在東京結識李師師，藉其門路接觸招安事宜。', 'ch072-yuanye', 82),
  ]),
  r('yan-qing-li-shi-shi', 'yan-qing', 'li-shi-shi', [
    p(72, 'friendship', '拜為姊姊', '燕青在東京與李師師相識，兩人以姊弟相稱，燕青藉此辦招安之事。', 'ch072-yuanye', 82),
  ]),
  r('li-shi-shi-song-hui-zong', 'li-shi-shi', 'song-hui-zong', [
    p(72, 'romance', '寵幸', '李師師為宋徽宗寵幸之人，是梁山接觸天子的重要管道。', 'ch072-yuanye', 120),
  ]),
  r('yan-qing-song-hui-zong', 'yan-qing', 'song-hui-zong', [
    p(81, 'friendship', '月夜遇道君', '燕青月夜在李師師處遇徽宗，奏明梁山招安之意。', 'ch081-yueye', 82),
  ]),
  r('song-jiang-su-yuan-jing', 'song-jiang', 'su-yuan-jing', [
    p(81, 'alliance', '招安橋樑', '宋江透過宿元景等朝臣促成第二次招安。', 'ch081-yueye', 120),
  ]),
  r('li-kui-yan-qing', 'li-kui', 'yan-qing', [
    p(73, 'friendship', '壽張同行', '李逵與燕青同往壽張、泰安，燕青智撲任原，李逵喬坐衙。', 'ch073-shuangxiantou', 120),
  ]),
  r('yan-qing-ren-yuan', 'yan-qing', 'ren-yuan', [
    p(74, 'rivalry', '智撲擎天柱', '燕青在泰安州擂台上以相撲絕技摔倒任原，名震江湖。', 'ch074-qingtianzhu', 74),
  ]),
  r('song-jiang-wu-yan-guang', 'song-jiang', 'wu-yan-guang', [
    p(84, 'enmity', '征遼對陣', '兀顏光為遼軍統軍，宋江率梁山軍征遼，兩軍在燕雲交鋒。', 'ch084-jizhou', 89),
  ]),
  r('gong-sun-sheng-wu-yan-guang', 'gong-sun-sheng', 'wu-yan-guang', [
    p(88, 'rivalry', '破混天象陣', '兀顏光列混天象陣，公孫勝、吳用共破遼陣。', 'ch088-huntian', 89),
  ]),
  r('song-jiang-tian-hu', 'song-jiang', 'tian-hu', [
    p(91, 'enmity', '征討田虎', '宋江兵渡黃河征討田虎，連破蓋郡、威勝等地。', 'ch091-huanghe', 100),
  ]),
  r('song-jiang-wang-qing', 'song-jiang', 'wang-qing', [
    p(105, 'enmity', '征討王慶', '宋江南下征討王慶，水陸並進，最終平定淮西。', 'ch105-bishu', 109),
  ]),
  r('lu-jun-yi-wang-qing', 'lu-jun-yi', 'wang-qing', [
    p(105, 'enmity', '分兵征剿', '盧俊義與宋江分兵征討王慶，連破州縣。', 'ch105-bishu', 109),
  ]),
  r('song-jiang-fang-la', 'song-jiang', 'fang-la', [
    p(111, 'enmity', '征討方臘', '宋江奉命征討方臘，梁山軍渡江南下，傷亡慘重。', 'ch111-runzhou', 119),
  ]),
  r('lu-jun-yi-fang-la', 'lu-jun-yi', 'fang-la', [
    p(112, 'enmity', '分兵宣州道', '盧俊義分兵征討方臘，轉戰宣州、歙州一線。', 'ch112-piling', 119),
  ]),
  r('fang-la-fang-tian-ding', 'fang-la', 'fang-tian-ding', [
    p(114, 'kinship', '父子', '方天定為方臘之子，鎮守杭州。', 'ch114-zhangshun', 115),
  ]),
  r('fang-la-shi-bao', 'fang-la', 'shi-bao', [
    p(114, 'subordinate', '元帥', '石寶為方臘軍元帥，統兵鎮守杭州、睦州。', 'ch114-zhangshun', 118),
  ], true),
  r('fang-la-deng-yuan-jue', 'fang-la', 'deng-yuan-jue', [
    p(114, 'subordinate', '國師', '鄧元覺為方臘軍國師，在睦州一線出陣。', 'ch114-zhangshun', 117),
  ], true),
  r('zhang-shun-fang-tian-ding', 'zhang-shun', 'fang-tian-ding', [
    p(114, 'enmity', '魂捉方天定', '張順夜探湧金門被射死，後魂捉方天定。', 'ch114-zhangshun', 115),
  ]),
  r('hua-rong-deng-yuan-jue', 'hua-rong', 'deng-yuan-jue', [
    p(117, 'enmity', '睦州城箭射', '睦州之戰，花榮箭射鄧元覺。', 'ch117-muzhou', 117),
  ]),
  r('shi-bao-song-jiang', 'shi-bao', 'song-jiang', [
    p(114, 'enmity', '杭州拒戰', '石寶鎮守杭州，屢挫梁山軍，至睦州之戰仍與宋江軍對抗。', 'ch114-zhangshun', 118),
  ]),
  r('shi-bao-suo-chao', 'shi-bao', 'suo-chao', [
    p(114, 'enmity', '流星錘打死索超', '杭州北關門之戰，石寶以流星錘打死索超。', 'ch114-zhangshun', 114),
  ]),
  r('song-jiang-lu-zhi-shen', 'song-jiang', 'lu-zhi-shen', [
    p(58, 'friendship', '梁山同道', '魯智深三山聚義後歸梁山，與宋江同為梁山首領；後宋江陪其上五台山參禪。', 'ch058-sanshan', 119),
  ]),
  r('song-jiang-shi-jin', 'song-jiang', 'shi-jin', [
    p(59, 'friendship', '華山相救', '史進陷於華州，宋江、吳用率軍大鬧西嶽華山將其救出。', 'ch059-huashan', 118),
  ]),
  r('yan-qing-song-jiang', 'yan-qing', 'song-jiang', [
    p(61, 'subordinate', '梁山部屬', '燕青隨盧俊義歸梁山，後為宋江麾下重要頭領。', 'ch061-lujunyi', 119),
  ], true),

  r('niu-er-yang-zhi', 'niu-er', 'yang-zhi', [
    p(12, 'enmity', '潑皮奪刀', '潑皮牛二強奪楊志寶刀、百般刁難，楊志怒起將其殺死，因此刺配大名府。', 'ch012-yangzhimaiDao'),
  ]),
  r('he-tao-bai-sheng', 'he-tao', 'bai-sheng', [
    p(17, 'enmity', '緝捕白勝', '濟州府緝捕巡檢何濤查辦生辰綱，抓獲白勝並逼問線索。', 'ch018-fangchaogai', 18),
  ]),
  r('he-tao-chao-gai', 'he-tao', 'chao-gai', [
    p(17, 'enmity', '追緝晁蓋', '何濤奉命緝拿晁蓋等人，宋江通風報信後追捕未成。', 'ch018-fangchaogai', 19),
  ]),
  r('song-jiang-chai-jin', 'chai-jin', 'song-jiang', [
    p(22, 'patronage', '柴進莊避難', '宋江殺閻婆惜後投奔柴進莊，柴進厚禮收留，並與武松相識。', 'ch023-jingyanggang', 120),
  ], true),

  r('wang-lun-song-wan', 'wang-lun', 'song-wan', [
    p(11, 'subordinate', '梁山舊部', '宋萬為梁山早期頭領，隨王倫守寨，王倫死後歸晁蓋、宋江。', 'ch011-shangliangshan', 19),
  ], true),
  r('wang-lun-du-qian', 'wang-lun', 'du-qian', [
    p(11, 'subordinate', '梁山舊部', '杜遷與宋萬同為王倫時期頭領，火併後隨晁蓋共守梁山。', 'ch011-shangliangshan', 19),
  ], true),
  r('song-wan-du-qian', 'song-wan', 'du-qian', [
    p(11, 'friendship', '梁山元老', '宋萬、杜遷同為梁山草創舊人，歷經王倫、晁蓋、宋江三任寨主。', 'ch011-shangliangshan', 111),
  ]),
  r('song-wan-chao-gai', 'song-wan', 'chao-gai', [
    p(19, 'alliance', '梁山換主', '林沖火併王倫後，宋萬等隨晁蓋共守梁山。', 'ch019-duopo', 60),
  ]),
  r('du-qian-chao-gai', 'du-qian', 'chao-gai', [
    p(19, 'alliance', '梁山換主', '杜遷隨晁蓋入主梁山，後隨宋江征戰。', 'ch019-duopo', 60),
  ]),
  r('zhu-gui-lin-chong', 'zhu-gui', 'lin-chong', [
    p(11, 'patronage', '水亭施號箭', '林沖雪夜投梁山，朱貴在水亭施號箭引路，接引其入夥。', 'ch011-shangliangshan', 119),
  ], true),
  r('zhu-gui-song-jiang', 'zhu-gui', 'song-jiang', [
    p(19, 'subordinate', '梁山耳目', '朱貴掌梁山酒店，負責打探消息、接引往來好漢。', 'ch019-duopo', 119),
  ], true),
  r('zhu-fu-zhu-gui', 'zhu-fu', 'zhu-gui', [
    p(43, 'kinship', '兄弟', '朱富為朱貴之弟，李逵沂嶺事發後設計相助，兄弟同歸梁山。', 'ch043-yiling', 119),
  ]),
  r('zhu-fu-li-yun', 'li-yun', 'zhu-fu', [
    p(43, 'master', '師徒', '朱富曾隨李雲習武，後以蒙汗藥救出李逵，勸李雲同歸梁山。', 'ch043-yiling', 118),
  ], true),
  r('zhu-fu-li-kui', 'zhu-fu', 'li-kui', [
    p(43, 'patronage', '設計相救', '李逵被李雲捉拿，朱富以藥酒相助，使其脫身。', 'ch043-yiling', 119),
  ], true),
  r('li-yun-li-kui', 'li-yun', 'li-kui', [
    p(43, 'alliance', '先擒後友', '李雲奉命捉拿李逵，後為朱富說服，棄官與李逵同上梁山。', 'ch043-yiling', 118),
  ]),

  r('bai-sheng-chao-gai', 'bai-sheng', 'chao-gai', [
    p(16, 'friendship', '七星聚義', '白勝參與智取生辰綱，扮作賣酒漢下蒙汗藥，事發後被捕供出晁蓋。', 'ch016-shengchengang', 60),
  ]),
  r('bai-sheng-wu-yong', 'bai-sheng', 'wu-yong', [
    p(16, 'alliance', '智取生辰綱', '吳用定計，白勝擔當賣酒，合力劫走生辰綱。', 'ch016-shengchengang', 119),
  ]),
  r('bai-sheng-song-jiang', 'bai-sheng', 'song-jiang', [
    p(18, 'alliance', '梁山舊人', '白勝得宋江、晁蓋等人相救，後歸梁山。', 'ch018-fangchaogai', 119),
  ]),

  r('yan-shun-song-jiang', 'yan-shun', 'song-jiang', [
    p(33, 'friendship', '清風山聚義', '燕順為清風山大頭領，宋江被捉後得花榮相救，眾人同歸梁山。', 'ch033-qingfengzhai', 116),
  ]),
  r('yan-shun-hua-rong', 'yan-shun', 'hua-rong', [
    p(33, 'friendship', '清風山同歸', '花榮大鬧清風寨後與燕順等同歸梁山，並肩征戰。', 'ch033-qingfengzhai', 116),
  ]),
  r('zheng-tian-shou-yan-shun', 'zheng-tian-shou', 'yan-shun', [
    p(32, 'friendship', '清風山同夥', '鄭天壽與燕順同為清風山頭領，一同迎宋江上山。', 'ch033-qingfengzhai', 112),
  ]),
  r('zheng-tian-shou-wang-ying', 'zheng-tian-shou', 'wang-ying', [
    p(32, 'friendship', '清風山同夥', '鄭天壽、王英同在清風山，後隨宋江歸梁山。', 'ch033-qingfengzhai', 112),
  ]),
  r('zheng-tian-shou-song-jiang', 'zheng-tian-shou', 'song-jiang', [
    p(33, 'friendship', '清風山結識', '宋江落難清風山，鄭天壽隨眾相迎，自此同歸梁山。', 'ch033-qingfengzhai', 112),
  ]),
  r('wang-ying-song-jiang', 'wang-ying', 'song-jiang', [
    p(33, 'friendship', '清風山結識', '王英在清風山結識宋江，後由宋江主婚娶扈三娘。', 'ch033-qingfengzhai', 116),
  ]),
  r('qin-ming-song-jiang', 'qin-ming', 'song-jiang', [
    p(35, 'patronage', '清風山歸順', '秦明被擒、家小被害後走投無路，隨宋江歸梁山。', 'ch035-liangshansheyan', 118),
  ], true),

  r('li-li-li-jun', 'li-li', 'li-jun', [
    p(36, 'friendship', '揭陽嶺同夥', '李立在揭陽嶺開黑店，與李俊相識；李俊趕到救下宋江。', 'ch036-jieyang', 118),
  ]),
  r('li-li-song-jiang', 'li-li', 'song-jiang', [
    p(36, 'enmity', '險遭謀害', '李立欲在揭陽嶺害宋江，被李俊及時制止。', 'ch036-jieyang', 36),
    p(37, 'alliance', '化敵為友', '李立隨李俊向宋江賠罪，後同歸梁山。', 'ch037-xunyangjiang', 118),
  ]),
  r('xue-yong-song-jiang', 'xue-yong', 'song-jiang', [
    p(37, 'patronage', '江州賣藝相識', '薛永在揭陽鎮賣藝，宋江贈銀結識；後劫法場相救。', 'ch037-xunyangjiang', 118),
  ], true),
  r('xue-yong-hou-jian', 'xue-yong', 'hou-jian', [
    p(41, 'master', '師徒', '侯健為薛永徒弟，隨其同歸梁山。', 'ch041-wuweijun', 114),
  ], true),
  r('hou-jian-song-jiang', 'hou-jian', 'song-jiang', [
    p(41, 'patronage', '歸順梁山', '侯健隨薛永歸梁山，負責裁製衣甲旗幟。', 'ch041-wuweijun', 114),
  ], true),
  r('song-jiang-mu-hong', 'mu-hong', 'song-jiang', [
    p(37, 'friendship', '揭陽鎮結識', '宋江途經揭陽鎮，穆弘、穆春兄弟由敵轉友，後同歸梁山。', 'ch037-xunyangjiang', 112),
  ]),
  r('song-jiang-mu-chun', 'mu-chun', 'song-jiang', [
    p(37, 'friendship', '揭陽鎮結識', '穆春隨兄長穆弘結識宋江，後同歸梁山。', 'ch037-xunyangjiang', 120),
  ]),
  r('li-jun-tong-wei', 'li-jun', 'tong-wei', [
    p(36, 'subordinate', '水軍部屬', '童威隨李俊在江湖行走，後同掌梁山、洞庭水軍。', 'ch036-jieyang', 119),
  ], true),
  r('li-jun-tong-meng', 'li-jun', 'tong-meng', [
    p(36, 'subordinate', '水軍部屬', '童猛隨兄長童威與李俊同歸梁山，後隨李俊出海。', 'ch036-jieyang', 119),
  ], true),
  r('tong-wei-tong-meng', 'tong-wei', 'tong-meng', [
    p(36, 'kinship', '兄弟', '童威、童猛為兄弟，同隨李俊在潯陽江一帶行走。', 'ch036-jieyang', 119),
  ]),

  r('ou-peng-song-jiang', 'ou-peng', 'song-jiang', [
    p(41, 'patronage', '黃門山歸順', '歐鵬等在黃門山落草，遇宋江後歸梁山。', 'ch041-wuweijun', 118),
  ], true),
  r('jiang-jing-song-jiang', 'jiang-jing', 'song-jiang', [
    p(41, 'patronage', '黃門山歸順', '蔣敬為黃門山頭領，歸梁山後掌錢糧會計。', 'ch041-wuweijun', 120),
  ], true),
  r('ma-lin-song-jiang', 'ma-lin', 'song-jiang', [
    p(41, 'patronage', '黃門山歸順', '馬麟隨歐鵬等歸梁山，後為馬軍將領。', 'ch041-wuweijun', 116),
  ], true),
  r('tao-zong-wang-song-jiang', 'tao-zong-wang', 'song-jiang', [
    p(41, 'patronage', '黃門山歸順', '陶宗旺隨黃門山眾人歸梁山，負責監造城垣。', 'ch041-wuweijun', 111),
  ], true),
  r('ou-peng-jiang-jing', 'ou-peng', 'jiang-jing', [
    p(41, 'friendship', '黃門山同夥', '歐鵬與蔣敬同守黃門山，後一同歸梁山。', 'ch041-wuweijun', 118),
  ]),
  r('ma-lin-tao-zong-wang', 'ma-lin', 'tao-zong-wang', [
    p(41, 'friendship', '黃門山同夥', '馬麟與陶宗旺同為黃門山頭領，一同歸順宋江。', 'ch041-wuweijun', 111),
  ]),

  r('dai-zong-yang-lin', 'dai-zong', 'yang-lin', [
    p(44, 'friendship', '薊州同行', '戴宗與楊林同往薊州打探公孫勝消息，沿途結伴。', 'ch044-yinmachuan', 120),
  ]),
  r('dai-zong-pei-xuan', 'dai-zong', 'pei-xuan', [
    p(44, 'alliance', '飲馬川結識', '戴宗路過飲馬川，結識裴宣並邀其同歸梁山。', 'ch044-yinmachuan', 120),
  ]),
  r('dai-zong-deng-fei', 'dai-zong', 'deng-fei', [
    p(44, 'alliance', '飲馬川結識', '戴宗在飲馬川結識鄧飛，一同歸梁山。', 'ch044-yinmachuan', 114),
  ]),
  r('dai-zong-meng-kang', 'dai-zong', 'meng-kang', [
    p(44, 'alliance', '飲馬川結識', '戴宗在飲馬川結識孟康，後同歸梁山造船。', 'ch044-yinmachuan', 116),
  ]),
  r('pei-xuan-deng-fei', 'pei-xuan', 'deng-fei', [
    p(44, 'friendship', '飲馬川同夥', '裴宣與鄧飛同佔飲馬川，經戴宗引介歸梁山。', 'ch044-yinmachuan', 114),
  ]),
  r('pei-xuan-meng-kang', 'pei-xuan', 'meng-kang', [
    p(44, 'friendship', '飲馬川同夥', '裴宣與孟康同在飲馬川落草，後一同歸順。', 'ch044-yinmachuan', 116),
  ]),

  r('lv-fang-guo-sheng', 'lv-fang', 'guo-sheng', [
    p(35, 'friendship', '對影山比武', '呂方、郭盛在對影山比武，花榮一箭解圍，二人同歸梁山。', 'ch035-liangshansheyan', 116),
  ]),
  r('lv-fang-song-jiang', 'lv-fang', 'song-jiang', [
    p(35, 'patronage', '對影山歸順', '呂方經宋江招納歸梁山，後為中軍護衛。', 'ch035-liangshansheyan', 116),
  ], true),
  r('guo-sheng-song-jiang', 'guo-sheng', 'song-jiang', [
    p(35, 'patronage', '對影山歸順', '郭盛隨呂方歸梁山，同為中軍護衛。', 'ch035-liangshansheyan', 116),
  ], true),

  r('hu-yan-zhuo-han-tao', 'hu-yan-zhuo', 'han-tao', [
    p(55, 'subordinate', '先鋒副將', '韓滔隨呼延灼以連環馬征梁山，敗後一同歸順。', 'ch055-lianhuanma', 112),
  ], true),
  r('hu-yan-zhuo-peng-qi', 'hu-yan-zhuo', 'peng-qi', [
    p(55, 'subordinate', '先鋒副將', '彭玘隨呼延灼征梁山，後與呼延灼同歸梁山。', 'ch055-lianhuanma', 112),
  ], true),
  r('han-tao-peng-qi', 'han-tao', 'peng-qi', [
    p(55, 'friendship', '正副先鋒', '韓滔、彭玘同為呼延灼副將，一同歸順梁山。', 'ch055-lianhuanma', 112),
  ]),
  r('han-tao-song-jiang', 'han-tao', 'song-jiang', [
    p(57, 'patronage', '歸順梁山', '韓滔隨呼延灼歸順宋江，後為馬軍將領。', 'ch057-polianhuan', 112),
  ], true),
  r('peng-qi-song-jiang', 'peng-qi', 'song-jiang', [
    p(57, 'patronage', '歸順梁山', '彭玘隨呼延灼歸順宋江，後為馬軍將領。', 'ch057-polianhuan', 112),
  ], true),
  r('ling-zhen-gao-qiu', 'ling-zhen', 'gao-qiu', [
    p(55, 'subordinate', '隨軍征剿', '凌振以火砲隨高俅征梁山，連環馬之戰中大顯聲勢。', 'ch055-lianhuanma', 55),
  ], true),
  r('ling-zhen-hu-yan-zhuo', 'ling-zhen', 'hu-yan-zhuo', [
    p(55, 'subordinate', '軍中同袍', '凌振隨呼延灼征梁山，負責施放號砲火器。', 'ch055-lianhuanma', 57),
  ], true),
  r('ling-zhen-song-jiang', 'ling-zhen', 'song-jiang', [
    p(57, 'patronage', '歸順梁山', '凌振歸順梁山後掌造火砲，成為梁山砲手。', 'ch057-polianhuan', 120),
  ], true),

  r('guan-sheng-shan-ting-gui', 'guan-sheng', 'shan-ting-gui', [
    p(67, 'patronage', '義降水火二將', '關勝降服單廷珪，單廷珪隨其歸順梁山。', 'ch067-shuihuo', 118),
  ], true),
  r('guan-sheng-wei-ding-guo', 'guan-sheng', 'wei-ding-guo', [
    p(67, 'patronage', '義降水火二將', '關勝降服魏定國，魏定國隨其歸順梁山。', 'ch067-shuihuo', 118),
  ], true),
  r('shan-ting-gui-wei-ding-guo', 'shan-ting-gui', 'wei-ding-guo', [
    p(67, 'friendship', '水火二將', '單廷珪、魏定國同守凌州，一水一火，後同歸梁山。', 'ch067-shuihuo', 118),
  ]),
  r('shan-ting-gui-song-jiang', 'shan-ting-gui', 'song-jiang', [
    p(67, 'patronage', '歸順梁山', '單廷珪歸順宋江，後為馬軍將領。', 'ch067-shuihuo', 118),
  ], true),
  r('wei-ding-guo-song-jiang', 'wei-ding-guo', 'song-jiang', [
    p(67, 'patronage', '歸順梁山', '魏定國歸順宋江，後為馬軍將領。', 'ch067-shuihuo', 118),
  ], true),

  r('zhang-qing-gong-wang', 'zhang-qing', 'gong-wang', [
    p(70, 'subordinate', '副將', '龔旺隨張清歸順梁山，同為沒羽箭麾下副將。', 'ch070-zhangqing', 115),
  ], true),
  r('zhang-qing-ding-de-sun', 'zhang-qing', 'ding-de-sun', [
    p(70, 'subordinate', '副將', '丁得孫隨張清歸順梁山，同為沒羽箭麾下副將。', 'ch070-zhangqing', 116),
  ], true),
  r('gong-wang-ding-de-sun', 'gong-wang', 'ding-de-sun', [
    p(70, 'friendship', '張清副將', '龔旺、丁得孫同隨張清，歸梁山後並肩作戰。', 'ch070-zhangqing', 115),
  ]),
  r('zhang-qing-huang-fu-duan', 'zhang-qing', 'huang-fu-duan', [
    p(70, 'friendship', '舉薦獸醫', '張清歸順時舉薦獸醫皇甫端，皇甫端隨同上山。', 'ch070-zhangqing', 110),
  ]),
  r('huang-fu-duan-song-jiang', 'huang-fu-duan', 'song-jiang', [
    p(70, 'patronage', '歸順梁山', '皇甫端歸梁山後掌醫治馬匹，後留東京任官。', 'ch070-zhangqing', 110),
  ], true),
  r('gong-wang-song-jiang', 'gong-wang', 'song-jiang', [
    p(70, 'patronage', '歸順梁山', '龔旺隨張清歸順宋江，後隨軍征方臘。', 'ch070-zhangqing', 115),
  ], true),
  r('ding-de-sun-song-jiang', 'ding-de-sun', 'song-jiang', [
    p(70, 'patronage', '歸順梁山', '丁得孫隨張清歸順宋江，後隨軍征方臘。', 'ch070-zhangqing', 116),
  ], true),

  r('wu-yong-xiao-rang', 'wu-yong', 'xiao-rang', [
    p(39, 'alliance', '偽造書信', '吳用派戴宗請蕭讓、金大堅上山，偽造蔡京書信營救宋江。', 'ch039-xunyanglou', 110),
  ]),
  r('wu-yong-jin-da-jian', 'wu-yong', 'jin-da-jian', [
    p(39, 'alliance', '偽造書信', '吳用請金大堅雕刻蔡京圖書印章，用以偽造書信。', 'ch039-xunyanglou', 110),
  ]),
  r('dai-zong-xiao-rang', 'dai-zong', 'xiao-rang', [
    p(39, 'friendship', '請人上山', '戴宗奉命請蕭讓、金大堅上梁山，協助營救宋江。', 'ch039-xunyanglou', 110),
  ]),
  r('xiao-rang-jin-da-jian', 'xiao-rang', 'jin-da-jian', [
    p(39, 'friendship', '書生與匠人', '蕭讓善書、金大堅善刻，二人合力偽造蔡京書信。', 'ch039-xunyanglou', 110),
  ]),
  r('xiao-rang-song-jiang', 'xiao-rang', 'song-jiang', [
    p(40, 'patronage', '歸順梁山', '蕭讓因偽造書信被留在梁山，掌文書。', 'ch040-jiefachang', 110),
  ], true),
  r('jin-da-jian-song-jiang', 'jin-da-jian', 'song-jiang', [
    p(40, 'patronage', '歸順梁山', '金大堅因偽造印章被留在梁山，掌刻印。', 'ch040-jiefachang', 110),
  ], true),

  r('song-jiang-kong-ming', 'song-jiang', 'kong-ming', [
    p(32, 'master', '師徒', '孔明、孔亮曾隨宋江習武，後在白虎山落草。', 'ch032-kongliang', 112),
  ], true),
  r('song-jiang-kong-liang', 'song-jiang', 'kong-liang', [
    p(32, 'master', '師徒', '孔亮為宋江徒弟，與兄長孔明同守白虎山。', 'ch032-kongliang', 113),
  ], true),
  r('kong-ming-kong-liang', 'kong-ming', 'kong-liang', [
    p(32, 'kinship', '兄弟', '孔明、孔亮為兄弟，同佔白虎山，後同歸梁山。', 'ch032-kongliang', 113),
  ]),
  r('wu-song-kong-ming', 'wu-song', 'kong-ming', [
    p(32, 'friendship', '白虎山相識', '武松醉打孔亮後與孔明、孔亮相識，一同歸梁山。', 'ch032-kongliang', 112),
  ]),
  r('wu-song-kong-liang', 'wu-song', 'kong-liang', [
    p(32, 'friendship', '白虎山相識', '武松在白虎山與孔亮交手後結識，後同歸梁山。', 'ch032-kongliang', 113),
  ]),

  r('bao-xu-song-jiang', 'bao-xu', 'song-jiang', [
    p(67, 'patronage', '歸順梁山', '鮑旭、焦挺隨宋江歸梁山，後隨軍征方臘。', 'ch067-shuihuo', 114),
  ], true),
  r('jiao-ting-song-jiang', 'jiao-ting', 'song-jiang', [
    p(67, 'patronage', '歸順梁山', '焦挺隨宋江歸梁山，後隨軍征方臘。', 'ch067-shuihuo', 111),
  ], true),
  r('bao-xu-jiao-ting', 'bao-xu', 'jiao-ting', [
    p(67, 'friendship', '枯樹山同夥', '鮑旭、焦挺同在枯樹山，經宋江招納歸梁山。', 'ch067-shuihuo', 111),
  ]),
  r('bao-xu-li-kui', 'bao-xu', 'li-kui', [
    p(67, 'friendship', '枯樹山結識', '鮑旭與李逵意氣相投，歸梁山後常一同出戰。', 'ch067-shuihuo', 114),
  ]),
  r('jiao-ting-li-kui', 'jiao-ting', 'li-kui', [
    p(67, 'friendship', '枯樹山結識', '焦挺在枯樹山結識李逵，後一同歸梁山。', 'ch067-shuihuo', 111),
  ]),

  r('gong-sun-sheng-fan-rui', 'gong-sun-sheng', 'fan-rui', [
    p(60, 'master', '收服傳法', '公孫勝在芒碭山以道法收服樊瑞，樊瑞拜其為師。', 'ch060-zengtoushi', 110),
  ], true),
  r('fan-rui-xiang-chong', 'fan-rui', 'xiang-chong', [
    p(60, 'subordinate', '芒碭山部屬', '項充隨樊瑞在芒碭山落草，後同歸梁山。', 'ch060-zengtoushi', 117),
  ], true),
  r('fan-rui-li-gun', 'fan-rui', 'li-gun', [
    p(60, 'subordinate', '芒碭山部屬', '李袞隨樊瑞在芒碭山落草，後同歸梁山。', 'ch060-zengtoushi', 117),
  ], true),
  r('xiang-chong-li-gun', 'xiang-chong', 'li-gun', [
    p(60, 'friendship', '芒碭山同夥', '項充、李袞同隨樊瑞，歸梁山後常並肩作戰。', 'ch060-zengtoushi', 117),
  ]),
  r('fan-rui-song-jiang', 'fan-rui', 'song-jiang', [
    p(60, 'patronage', '歸順梁山', '樊瑞歸順宋江，後隨公孫勝學道，最終出家。', 'ch060-zengtoushi', 120),
  ], true),
  r('xiang-chong-song-jiang', 'xiang-chong', 'song-jiang', [
    p(60, 'patronage', '歸順梁山', '項充隨樊瑞歸順宋江，後隨軍征方臘。', 'ch060-zengtoushi', 117),
  ], true),
  r('li-gun-song-jiang', 'li-gun', 'song-jiang', [
    p(60, 'patronage', '歸順梁山', '李袞隨樊瑞歸順宋江，後隨軍征方臘。', 'ch060-zengtoushi', 117),
  ], true),

  r('sun-li-yue-he', 'sun-li', 'yue-he', [
    p(49, 'alliance', '登州劫牢', '樂和參與登州劫牢，與孫立等一同投奔梁山。', 'ch049-dengzhou', 120),
  ]),
  r('yue-he-song-jiang', 'yue-he', 'song-jiang', [
    p(81, 'patronage', '招安獻計', '樂和隨燕青、戴宗入東京，以歌聲接觸徽宗促成招安。', 'ch081-yueye', 110),
  ], true),
  r('yue-he-yan-qing', 'yue-he', 'yan-qing', [
    p(81, 'friendship', '東京同行', '樂和與燕青同入東京辦招安之事，彼此照應。', 'ch081-yueye', 110),
  ]),
  r('gu-da-sao-zou-yuan', 'gu-da-sao', 'zou-yuan', [
    p(49, 'friendship', '登州劫牢', '鄒淵隨顧大嫂參與登州劫牢，後同歸梁山。', 'ch049-dengzhou', 118),
  ]),
  r('gu-da-sao-zou-run', 'gu-da-sao', 'zou-run', [
    p(49, 'friendship', '登州劫牢', '鄒潤隨顧大嫂參與登州劫牢，後同歸梁山。', 'ch049-dengzhou', 120),
  ]),
  r('sun-xin-zou-yuan', 'sun-xin', 'zou-yuan', [
    p(49, 'friendship', '登州劫牢', '鄒淵與孫新同為登州劫牢同夥。', 'ch049-dengzhou', 118),
  ]),
  r('sun-xin-zou-run', 'sun-xin', 'zou-run', [
    p(49, 'friendship', '登州劫牢', '鄒潤與孫新同為登州劫牢同夥。', 'ch049-dengzhou', 120),
  ]),

  r('cai-fu-lu-jun-yi', 'cai-fu', 'lu-jun-yi', [
    p(62, 'patronage', '暗中保全', '蔡福奉命看押盧俊義，得柴進賄賂後暗中保全，後隨梁山。', 'ch062-damingjiefa', 118),
  ], true),
  r('cai-qing-lu-jun-yi', 'cai-qing', 'lu-jun-yi', [
    p(62, 'patronage', '獄中照應', '蔡慶協助兄長蔡福照應盧俊義，後同歸梁山。', 'ch062-damingjiefa', 120),
  ], true),
  r('cai-fu-cai-qing', 'cai-fu', 'cai-qing', [
    p(62, 'kinship', '兄弟', '蔡福、蔡慶兄弟同在大名府兩院押牢。', 'ch062-damingjiefa', 118),
  ]),
  r('cai-fu-shi-xiu', 'cai-fu', 'shi-xiu', [
    p(62, 'patronage', '同獄相護', '石秀劫法場被擒，與盧俊義同囚，蔡福暗中照應。', 'ch062-damingjiefa', 118),
  ], true),
  r('chai-jin-cai-fu', 'chai-jin', 'cai-fu', [
    p(62, 'patronage', '賄賂保全', '柴進攜金賄賂蔡福，請其保全盧俊義性命。', 'ch062-damingjiefa', 118),
  ], true),
  r('cai-fu-song-jiang', 'cai-fu', 'song-jiang', [
    p(66, 'patronage', '歸順梁山', '蔡福隨梁山攻破大名府後歸順宋江。', 'ch066-damingzhi', 118),
  ], true),
  r('cai-qing-song-jiang', 'cai-qing', 'song-jiang', [
    p(66, 'patronage', '歸順梁山', '蔡慶隨兄長歸順宋江，後隨軍征方臘。', 'ch066-damingzhi', 120),
  ], true),

  r('yu-bao-si-zeng-nong', 'yu-bao-si', 'zeng-nong', [
    p(60, 'subordinate', '曾頭市部屬', '郁保四奪馬獻於曾頭市，成為曾弄部下。', 'ch060-zengtoushi', 68),
  ], true),
  r('yu-bao-si-duan-jing-zhu', 'yu-bao-si', 'duan-jing-zhu', [
    p(60, 'enmity', '奪馬之仇', '郁保四奪走段景住欲獻給梁山的照夜玉獅子馬，引發曾頭市之爭。', 'ch060-zengtoushi', 68),
  ]),
  r('yu-bao-si-song-jiang', 'yu-bao-si', 'song-jiang', [
    p(68, 'patronage', '歸順梁山', '曾頭市破後郁保四歸順宋江，掌帥字旗。', 'ch068-zengtoushi', 118),
  ], true),
  r('duan-jing-zhu-song-jiang', 'duan-jing-zhu', 'song-jiang', [
    p(60, 'friendship', '獻馬結識', '段景住盜得照夜玉獅子馬欲獻宋江，途中被曾頭市奪去。', 'ch060-zengtoushi', 114),
  ]),
  r('duan-jing-zhu-zeng-nong', 'duan-jing-zhu', 'zeng-nong', [
    p(60, 'enmity', '奪馬結怨', '曾頭市奪走段景住所獻寶馬，晁蓋因此親征曾頭市。', 'ch060-zengtoushi', 60),
  ]),

  r('wang-ding-liu-zhang-shun', 'wang-ding-liu', 'zhang-shun', [
    p(65, 'friendship', '建康相助', '王定六在建康結識張順，助其請安道全上梁山。', 'ch065-zhangshun', 112),
  ]),
  r('wang-ding-liu-song-jiang', 'wang-ding-liu', 'song-jiang', [
    p(65, 'patronage', '歸順梁山', '王定六隨張順歸梁山，後隨軍征方臘。', 'ch065-zhangshun', 112),
  ], true),

  r('shi-yong-song-jiang', 'shi-yong', 'song-jiang', [
    p(35, 'patronage', '傳遞家書', '石勇在酒店遇宋江，替宋太公送家書，後歸梁山。', 'ch035-liangshansheyan', 118),
  ], true),
  r('shi-yong-song-qing', 'shi-yong', 'song-qing', [
    p(35, 'friendship', '宋家舊識', '石勇與宋清相識，代宋太公傳書給宋江。', 'ch035-liangshansheyan', 120),
  ]),

  r('he-jiu-shu-xi-men-qing', 'he-jiu-shu', 'xi-men-qing', [
    p(25, 'enmity', '行賄掩蓋', '西門慶行賄何九叔，企圖掩蓋武大郎中毒真相。', 'ch025-wudailang', 26),
  ]),
  r('he-jiu-shu-wu-song', 'he-jiu-shu', 'wu-song', [
    p(26, 'patronage', '提供骨殖人證', '何九叔向武松交出骨殖與西門慶賄銀，助其查明真相。', 'ch026-wuerlang', 26),
  ], true),
  r('yun-ge-wu-da-lang', 'yun-ge', 'wu-da-lang', [
    p(24, 'friendship', '通風報信', '鄆哥向武大郎揭發潘金蓮與西門慶私通，引發捉姦風波。', 'ch024-wangpo', 25),
  ]),
  r('yun-ge-wang-po', 'yun-ge', 'wang-po', [
    p(24, 'enmity', '被王婆斥打', '鄆哥撞破王婆撮合之事，遭王婆痛打驅趕。', 'ch024-wangpo', 25),
  ]),
  r('yun-ge-wu-song', 'yun-ge', 'wu-song', [
    p(26, 'friendship', '挺身作證', '鄆哥為武松作證，指認潘金蓮與西門慶合謀害死武大郎。', 'ch026-wuerlang', 26),
  ]),

  r('chen-zong-shan-song-jiang', 'chen-zong-shan', 'song-jiang', [
    p(75, 'alliance', '招安欽差', '陳太尉奉詔第一次招安梁山；第二次招安方成，梁山全夥受招安。', 'ch075-chaozhao', 82),
  ]),
  r('chen-zong-shan-li-kui', 'chen-zong-shan', 'li-kui', [
    p(75, 'enmity', '扯詔罵欽差', '李逵扯碎招安詔書，怒罵欽差，首次招安告吹。', 'ch075-chaozhao', 75),
  ]),
  r('chen-zong-shan-ruan-xiao-qi', 'chen-zong-shan', 'ruan-xiao-qi', [
    p(75, 'enmity', '偷換御酒', '阮小七倒船偷喝御酒，以村酒替換，激怒梁山眾人。', 'ch075-chaozhao', 75),
  ]),
  r('du-xing-li-ying', 'li-ying', 'du-xing', [
    p(47, 'subordinate', '管家與莊主', '杜興為李應管家，祝家莊之戰中代李應修書斡旋。', 'ch047-yidazhujia', 120),
  ], true),
  r('du-xing-yang-xiong', 'du-xing', 'yang-xiong', [
    p(47, 'friendship', '修書結識', '楊雄、石秀為救時遷到李應莊求助，杜興從中引介。', 'ch047-yidazhujia', 119),
  ]),
  r('du-xing-shi-xiu', 'du-xing', 'shi-xiu', [
    p(47, 'friendship', '修書結識', '杜興替李應修書營救時遷，與石秀因此相識。', 'ch047-yidazhujia', 118),
  ]),
  r('du-xing-song-jiang', 'du-xing', 'song-jiang', [
    p(50, 'patronage', '隨李應上山', '祝家莊破後，杜興隨李應歸順宋江。', 'ch050-sandazhujia', 120),
  ], true),
]

export const relationById = Object.fromEntries(relations.map((relation) => [relation.id, relation]))

import type { StoryEvent } from './types'

export const events: StoryEvent[] = [
  {
    id: 'ch001-demons',
    chapter: 1,
    title: '誤走妖魔',
    summary:
      '洪太尉奉旨上龍虎山請張天師祈禳瘟疫，不聽勸阻掘開伏魔殿石碑，放走三十六員天罡、七十二座地煞。',
    placeIds: ['longhushan', 'xinzhou'],
    heroIds: [],
    kind: 'origin',
    quote: '一道黑氣，從穴裡滾將起來，掀塌了半個殿角。',
  },
  {
    id: 'ch002-shijia',
    chapter: 2,
    title: '大鬧史家村',
    summary:
      '王進私走延安府，路過史家莊收史進為徒。史進結識少華山朱武、陳達、楊春，因事發而火燒莊院，夜走華陰。',
    placeIds: ['shijiazhuang', 'shaohuashan', 'yanan'],
    heroIds: ['shi-jin', 'zhu-wu', 'chen-da', 'yang-chun'],
    kind: 'gathering',
  },
  {
    id: 'ch003-zhenguanxi',
    chapter: 3,
    title: '拳打鎮關西',
    summary:
      '史進夜走華陰，在渭州遇魯達。魯達為救金翠蓮父女，三拳打死鎮關西鄭屠，被迫出走。',
    placeIds: ['weizhou', 'huayin', 'shaohuashan'],
    heroIds: ['lu-zhi-shen', 'shi-jin'],
    kind: 'battle',
  },
  {
    id: 'ch004-wutaishan',
    chapter: 4,
    title: '大鬧五台山',
    summary:
      '魯達在五台山出家，法名智深。他醉酒打壞山門、金剛，屢犯清規，長老只得遣他下山。',
    placeIds: ['wutaishan', 'daizhou'],
    heroIds: ['lu-zhi-shen'],
    kind: 'other',
  },
  {
    id: 'ch005-taohuacun',
    chapter: 5,
    title: '大鬧桃花村',
    summary:
      '魯智深往東京途中借宿桃花村，假扮新娘痛打強娶民女的小霸王周通，結識桃花山李忠、周通。',
    placeIds: ['taohuashan'],
    heroIds: ['lu-zhi-shen', 'zhou-tong', 'li-zhong'],
    kind: 'rescue',
  },
  {
    id: 'ch006-waguansi',
    chapter: 6,
    title: '火燒瓦罐寺',
    summary:
      '魯智深在赤松林遇史進，二人同到瓦罐寺，殺死霸佔寺產的崔道成、丘小乙，火燒寺院。',
    placeIds: ['chisonglin', 'waguan'],
    heroIds: ['lu-zhi-shen', 'shi-jin'],
    kind: 'battle',
  },
  {
    id: 'ch007-baihutang',
    chapter: 7,
    title: '誤入白虎堂',
    summary:
      '魯智深在大相國寺倒拔垂楊柳，結識林沖。高俅設計誘林沖持刀入白虎堂，誣其行刺。',
    placeIds: ['dongjing'],
    heroIds: ['lu-zhi-shen', 'lin-chong'],
    kind: 'court',
    site: '大相國寺・白虎堂',
  },
  {
    id: 'ch008-yezhulin',
    chapter: 8,
    title: '大鬧野豬林',
    summary:
      '林沖被刺配滄州，途中在野豬林險遭公差毒手，魯智深一路暗中相隨，及時救下林沖。',
    placeIds: ['yezhulin', 'cangzhou', 'dongjing'],
    heroIds: ['lin-chong', 'lu-zhi-shen'],
    kind: 'rescue',
    route: ['dongjing', 'yezhulin', 'cangzhou'],
  },
  {
    id: 'ch009-hongjiaotou',
    chapter: 9,
    title: '棒打洪教頭',
    summary:
      '林沖到滄州柴進莊上，柴進厚待。洪教頭不服挑衅，林沖一棒將他打翻，顯出禁軍教頭手段。',
    placeIds: ['cangzhou'],
    heroIds: ['lin-chong', 'chai-jin'],
    kind: 'battle',
  },
  {
    id: 'ch010-shanshenmiao',
    chapter: 10,
    title: '風雪山神廟',
    summary:
      '林沖看守草料場，陸虞候等人火燒草料場。林沖因大雪壓塌草廳，夜宿山神廟，聽見陰謀，提槍殺出。',
    placeIds: ['shanshenmiao', 'caoliaochang', 'cangzhou'],
    heroIds: ['lin-chong'],
    kind: 'rescue',
    route: ['dongjing', 'yezhulin', 'cangzhou'],
    quote: '那雪正下得緊。',
  },
  {
    id: 'ch011-shangliangshan',
    chapter: 11,
    title: '雪夜上梁山',
    summary:
      '林沖殺死陸謙等人後，經朱貴水亭施號箭，冒雪投奔梁山泊。王倫忌其武藝，要他納投名狀。',
    placeIds: ['liangshanpo', 'shijiecun'],
    heroIds: ['lin-chong', 'zhu-gui'],
    kind: 'journey',
    route: ['cangzhou', 'jinshadu', 'liangshanpo'],
  },
  {
    id: 'ch012-yangzhimaiDao',
    chapter: 12,
    title: '楊志賣刀',
    summary:
      '林沖在梁山落草。東京街頭，楊志因盤纏用盡出賣祖傳寶刀，誤殺潑皮牛二，被刺配北京大名府。',
    placeIds: ['liangshanpo', 'dongjing'],
    heroIds: ['lin-chong', 'yang-zhi'],
    kind: 'other',
    site: '東京街市',
  },
  {
    id: 'ch013-beijingdouwu',
    chapter: 13,
    title: '北京鬥武',
    summary:
      '楊志到大名府，梁中書賞識其武藝，與急先鋒索超在校場比武，二人不分勝負。',
    placeIds: ['beijing'],
    heroIds: ['yang-zhi', 'suo-chao'],
    kind: 'battle',
  },
  {
    id: 'ch014-qixing',
    chapter: 14,
    title: '七星聚義',
    summary:
      '劉唐醉臥靈官殿，晁蓋認義東溪村。吳用說動晁蓋，聯絡三阮、公孫勝，七星聚義，共謀生辰綱。',
    placeIds: ['dongxicun', 'yuncheng'],
    heroIds: ['liu-tang', 'wu-yong'],
    kind: 'gathering',
  },
  {
    id: 'ch015-sanyuan',
    chapter: 15,
    title: '說三阮',
    summary:
      '吳用到石碣村說動阮小二、阮小五、阮小七，公孫勝也應七星之數，眾人齊聚晁蓋莊上。',
    placeIds: ['shijiecun', 'liangshanpo'],
    heroIds: ['wu-yong', 'ruan-xiao-er', 'ruan-xiao-wu', 'ruan-xiao-qi', 'gong-sun-sheng'],
    kind: 'gathering',
  },
  {
    id: 'ch016-shengchengang',
    chapter: 16,
    title: '智取生辰綱',
    summary:
      '楊志押送生辰綱往東京，吳用定計，眾人在黃泥岡假扮棗販、賣酒，用蒙汗藥麻倒楊志一行，劫走金銀擔。',
    placeIds: ['huangnigang', 'beijing', 'dongjing'],
    heroIds: ['yang-zhi', 'wu-yong', 'liu-tang', 'bai-sheng', 'gong-sun-sheng'],
    kind: 'battle',
    route: ['beijing', 'huangnigang', 'dongjing'],
  },
  {
    id: 'ch017-erlongshan',
    chapter: 17,
    title: '雙奪寶珠寺',
    summary:
      '魯智深單打二龍山失利，遇楊志、曹正。三人設計殺死鄧龍，奪下寶珠寺，在二龍山落草。',
    placeIds: ['erlongshan'],
    heroIds: ['lu-zhi-shen', 'yang-zhi', 'cao-zheng'],
    kind: 'battle',
  },
  {
    id: 'ch018-fangchaogai',
    chapter: 18,
    title: '私放晁天王',
    summary:
      '生辰綱事發，濟州府緝拿晁蓋。宋江先通風報信，朱仝、雷橫又在鄆城故意放走晁蓋等人。',
    placeIds: ['yuncheng', 'dongxicun'],
    heroIds: ['song-jiang', 'zhu-tong', 'lei-heng'],
    kind: 'rescue',
  },
  {
    id: 'ch019-duopo',
    chapter: 19,
    title: '梁山小奪泊',
    summary:
      '晁蓋等投梁山，王倫不肯收留。林沖火併王倫，推晁蓋為寨主，梁山自此換主。',
    placeIds: ['liangshanpo', 'liangshan'],
    heroIds: ['lin-chong', 'wu-yong', 'liu-tang', 'ruan-xiao-er', 'ruan-xiao-wu', 'ruan-xiao-qi'],
    kind: 'battle',
    site: '梁山泊水寨',
  },
  {
    id: 'ch020-zouliutang',
    chapter: 20,
    title: '月夜走劉唐',
    summary:
      '晁蓋在梁山站穩腳跟，派劉唐月夜下山到鄆城答謝宋江、朱仝、雷橫，梁山與鄆城一線自此相連。',
    placeIds: ['liangshanpo', 'yuncheng'],
    heroIds: ['liu-tang', 'song-jiang'],
    kind: 'journey',
    route: ['liangshanpo', 'yuncheng'],
  },
  {
    id: 'ch021-shanpo-xi',
    chapter: 21,
    title: '怒殺閻婆惜',
    summary:
      '宋江接濟閻婆惜母女，閻婆惜與張文遠私通，又以梁山書信要脅。宋江怒起，殺死閻婆惜。',
    placeIds: ['yuncheng'],
    heroIds: ['song-jiang'],
    kind: 'death',
  },
  {
    id: 'ch022-yishi-song',
    chapter: 22,
    title: '義釋宋公明',
    summary:
      '閻婆大鬧鄆城縣，朱仝、雷橫奉命緝拿宋江，卻在宋家莊暗中放走宋江，宋江開始逃亡。',
    placeIds: ['yuncheng'],
    heroIds: ['song-jiang', 'zhu-tong', 'song-qing'],
    kind: 'rescue',
  },
  {
    id: 'ch023-jingyanggang',
    chapter: 23,
    title: '景陽岡打虎',
    summary:
      '武松回清河縣途中路過陽穀，在景陽岡下喝了十八碗酒，不聽店家勸阻，獨身上岡，赤手空拳打死猛虎。',
    placeIds: ['jingyanggang', 'yanggu', 'qinghe'],
    heroIds: ['wu-song', 'chai-jin', 'song-jiang'],
    kind: 'battle',
    quote: '武松把隻左手緊緊地揪住頂花皮，偷出右手來，提起鐵鎚般大小拳頭，盡平生之力，只顧打。',
  },
  {
    id: 'ch024-wangpo',
    chapter: 24,
    title: '王婆說風情',
    summary:
      '武松在陽穀與兄長武大郎重逢。王婆貪賄，替西門慶與潘金蓮牽線，鄆哥不忿，鬧到茶肆。',
    placeIds: ['yanggu'],
    heroIds: ['wu-song'],
    kind: 'other',
    site: '陽穀縣茶肆',
  },
  {
    id: 'ch025-wudailang',
    chapter: 25,
    title: '藥鴆武大郎',
    summary:
      '王婆設下毒計，潘金蓮以藥毒死武大郎，西門慶行賄何九叔，企圖掩蓋真相。',
    placeIds: ['yanggu'],
    heroIds: ['wu-song'],
    kind: 'death',
  },
  {
    id: 'ch026-wuerlang',
    chapter: 26,
    title: '武二郎設祭',
    summary:
      '武松查得兄長死因，取得骨殖與人證，在武大郎靈前設祭，殺潘金蓮，又鬥殺西門慶。',
    placeIds: ['yanggu'],
    heroIds: ['wu-song'],
    kind: 'death',
    site: '武大郎靈前',
  },
  {
    id: 'ch027-shizipo',
    chapter: 27,
    title: '十字坡遇張青',
    summary:
      '武松被刺配孟州，途經十字坡，識破孫二娘的人肉包子店，結識張青、孫二娘，結為兄弟。',
    placeIds: ['shizipo', 'mengzhou'],
    heroIds: ['wu-song', 'sun-er-niang', 'zhang-qing-caiyuan'],
    kind: 'journey',
    route: ['yanggu', 'shizipo', 'mengzhou'],
  },
  {
    id: 'ch028-kuaihuolin',
    chapter: 28,
    title: '義奪快活林',
    summary:
      '武松到孟州安平寨，施恩厚待。為報施恩之恩，武松醉打蔣門神，替施恩奪回快活林酒店。',
    placeIds: ['anping', 'kuaihuolin', 'mengzhou'],
    heroIds: ['wu-song', 'shi-en'],
    kind: 'battle',
  },
  {
    id: 'ch029-jiangmenshen',
    chapter: 29,
    title: '醉打蔣門神',
    summary:
      '武松在快活林痛打蔣門神，蔣門神勾結張都監報復。張都監設宴誣陷武松為賊，將他下獄。',
    placeIds: ['kuaihuolin', 'mengzhou'],
    heroIds: ['wu-song', 'shi-en'],
    kind: 'battle',
  },
  {
    id: 'ch030-feiyunpu',
    chapter: 30,
    title: '大鬧飛雲浦',
    summary:
      '武松被刺配恩州，途經飛雲浦，識破公差與蔣門神徒弟的殺機，殺死眾人，連夜返回孟州。',
    placeIds: ['feiyunpu', 'mengzhou'],
    heroIds: ['wu-song'],
    kind: 'battle',
    route: ['mengzhou', 'feiyunpu', 'mengzhou'],
  },
  {
    id: 'ch031-yuanyanglou',
    chapter: 31,
    title: '血濺鴛鴦樓',
    summary:
      '武松夜入鴛鴦樓，殺張都監、蔣門神等十餘人，留下血書，夜走蜈蚣嶺，後扮作行者。',
    placeIds: ['yuanyanglou', 'mengzhou'],
    heroIds: ['wu-song'],
    kind: 'death',
    route: ['mengzhou', 'yuanyanglou'],
  },
  {
    id: 'ch032-kongliang',
    chapter: 32,
    title: '醉打孔亮',
    summary:
      '武松在白虎山醉打孔亮，結識孔明、孔亮。後在清風山遇燕順，並與宋江重逢。',
    placeIds: ['baishushan', 'qingfengshan'],
    heroIds: ['wu-song', 'kong-ming', 'kong-liang', 'yan-shun', 'song-jiang'],
    kind: 'battle',
  },
  {
    id: 'ch033-qingfengzhai',
    chapter: 33,
    title: '大鬧清風寨',
    summary:
      '宋江在清風山被捉，花榮救下。清風寨知寨劉高誣陷宋江，花榮大鬧清風寨，與青州官兵結怨。',
    placeIds: ['qingfengzhai', 'qingfengshan', 'qingzhou'],
    heroIds: ['song-jiang', 'hua-rong', 'wang-ying', 'yan-shun', 'zheng-tian-shou'],
    kind: 'rescue',
  },
  {
    id: 'ch034-walichang',
    chapter: 34,
    title: '夜走瓦礫場',
    summary:
      '秦明奉命征討清風山，中計被擒，家小被害。黃信無奈投降，眾人一同投奔梁山。',
    placeIds: ['qingzhou', 'qingfengshan'],
    heroIds: ['qin-ming', 'huang-xin', 'hua-rong', 'song-jiang'],
    kind: 'battle',
  },
  {
    id: 'ch035-liangshansheyan',
    chapter: 35,
    title: '梁山射雁',
    summary:
      '宋江等人在石將軍村店遇石勇，得知家書。眾人上梁山，花榮一箭射落雁行，顯出小李廣神技。',
    placeIds: ['qingfengshan', 'liangshanpo'],
    heroIds: ['hua-rong', 'qin-ming', 'huang-xin', 'song-jiang', 'shi-yong'],
    kind: 'gathering',
  },
  {
    id: 'ch036-jieyang',
    chapter: 36,
    title: '宋江逢李俊',
    summary:
      '宋江刺配江州，途經揭陽嶺，結識李俊、李立、穆弘、穆春、張橫等人。吳用派戴宗往江州照應。',
    placeIds: ['jieyang', 'jiangzhou', 'liangshanpo'],
    heroIds: ['song-jiang', 'li-jun', 'dai-zong', 'wu-yong', 'li-li', 'mu-hong', 'mu-chun', 'zhang-heng'],
    kind: 'journey',
    route: ['yuncheng', 'liangshanpo', 'jieyang', 'jiangzhou'],
  },
  {
    id: 'ch037-xunyangjiang',
    chapter: 37,
    title: '夜鬧潯陽江',
    summary:
      '穆弘、穆春追趕宋江，張橫在潯陽江上打劫。李俊趕到說明緣由，眾人化敵為友。',
    placeIds: ['jieyang', 'xunyang', 'jiangzhou'],
    heroIds: ['song-jiang', 'zhang-heng', 'li-jun', 'mu-hong', 'mu-chun'],
    kind: 'battle',
  },
  {
    id: 'ch038-daizong',
    chapter: 38,
    title: '會神行太保',
    summary:
      '宋江在江州結識戴宗、李逵、張順。李逵與張順在江中惡鬥，宋江調解，眾人結為好友。',
    placeIds: ['jiangzhou', 'xunyang'],
    heroIds: ['song-jiang', 'dai-zong', 'li-kui', 'zhang-shun'],
    kind: 'gathering',
  },
  {
    id: 'ch039-xunyanglou',
    chapter: 39,
    title: '潯陽樓題反詩',
    summary:
      '宋江獨上潯陽樓飲酒，乘醉題下「他時若遂凌雲志，敢笑黃巢不丈夫」，被黃文炳告發。戴宗送假信也被識破。',
    placeIds: ['xunyang', 'jiangzhou'],
    heroIds: ['song-jiang', 'dai-zong'],
    kind: 'other',
    quote: '他時若遂凌雲志，敢笑黃巢不丈夫。',
  },
  {
    id: 'ch040-jiefachang',
    chapter: 40,
    title: '劫法場',
    summary:
      '宋江、戴宗問斬，梁山好漢與李逵、張順等大鬧江州法場，救出二人，退至白龍廟小聚義。',
    placeIds: ['jiangzhou', 'bailongmiao', 'liangshanpo'],
    heroIds: ['song-jiang', 'dai-zong', 'li-kui', 'li-jun', 'zhang-shun', 'zhang-heng', 'mu-hong', 'mu-chun', 'li-li', 'xue-yong'],
    kind: 'rescue',
    route: ['liangshanpo', 'jiangzhou', 'bailongmiao'],
  },
  {
    id: 'ch041-wuweijun',
    chapter: 41,
    title: '智取無為軍',
    summary:
      '宋江設計攻入無為軍，殺死黃文炳全家。張順活捉黃文炳，眾人返回梁山。',
    placeIds: ['wuweijun', 'jiangzhou'],
    heroIds: ['song-jiang', 'zhang-shun', 'li-kui'],
    kind: 'battle',
    route: ['jiangzhou', 'wuweijun', 'liangshanpo'],
  },
  {
    id: 'ch042-huandaocun',
    chapter: 42,
    title: '還道村受天書',
    summary:
      '宋江回鄆城接父，被官兵追趕，逃入還道村玄女廟，夢中得九天玄女授三卷天書。',
    placeIds: ['huandaocun', 'yuncheng'],
    heroIds: ['song-jiang', 'song-qing'],
    kind: 'origin',
  },
  {
    id: 'ch043-yiling',
    chapter: 43,
    title: '沂嶺殺四虎',
    summary:
      '李逵回沂水接母，途中遇假李逵李鬼。母親被虎所害，李逵怒殺四虎，後被李雲、朱富設計捉拿，眾人同上梁山。',
    placeIds: ['yishui'],
    heroIds: ['li-kui', 'li-yun', 'zhu-fu'],
    kind: 'battle',
  },
  {
    id: 'ch044-yinmachuan',
    chapter: 44,
    title: '長街遇石秀',
    summary:
      '戴宗、楊林在飲馬川結識裴宣、鄧飛、孟康。楊雄在薊州長街遇石秀，二人結義。',
    placeIds: ['yinmachuan', 'jizhou-you'],
    heroIds: ['yang-lin', 'dai-zong', 'yang-xiong', 'shi-xiu', 'pei-xuan', 'deng-fei', 'meng-kang'],
    kind: 'gathering',
  },
  {
    id: 'ch045-cuipingshan',
    chapter: 45,
    title: '智殺裴如海',
    summary:
      '楊雄之妻潘巧雲與裴如海私通，石秀識破姦情，殺死裴如海，並在翠屏山與楊雄對質。',
    placeIds: ['jizhou-you', 'cuipingshan'],
    heroIds: ['yang-xiong', 'shi-xiu'],
    kind: 'death',
  },
  {
    id: 'ch046-zhujiadian',
    chapter: 46,
    title: '火燒祝家店',
    summary:
      '楊雄、石秀、時遷投梁山，途經祝家店，時遷偷雞惹禍，石秀火燒店房，三人與祝家莊結怨。',
    placeIds: ['cuipingshan', 'zhujiazhuang'],
    heroIds: ['yang-xiong', 'shi-xiu', 'shi-qian'],
    kind: 'battle',
  },
  {
    id: 'ch047-yidazhujia',
    chapter: 47,
    title: '一打祝家莊',
    summary:
      '宋江親征祝家莊，李應、杜興修書斡旋未果。梁山軍不熟盤陀路，首戰失利。',
    placeIds: ['zhujiazhuang', 'lijiazhuang'],
    heroIds: ['song-jiang', 'li-ying', 'du-xing', 'shi-qian', 'yang-xiong', 'shi-xiu'],
    kind: 'battle',
  },
  {
    id: 'ch048-erda',
    chapter: 48,
    title: '二打祝家莊',
    summary:
      '扈三娘單捉王英，梁山再攻祝家莊受挫。宋江改用計策，離間祝、扈、李三莊。',
    placeIds: ['zhujiazhuang', 'hujiazhuang'],
    heroIds: ['song-jiang', 'hu-san-niang', 'wang-ying', 'lin-chong', 'qin-ming'],
    kind: 'battle',
  },
  {
    id: 'ch049-dengzhou',
    chapter: 49,
    title: '登州劫牢',
    summary:
      '解珍、解寶被毛太公陷害下獄，顧大嫂、孫新、孫立、樂和、鄒淵、鄒潤劫牢救人，一同投梁山。',
    placeIds: ['dengzhou', 'dengyunshan', 'zhujiazhuang'],
    heroIds: ['jie-zhen', 'jie-bao', 'sun-li', 'sun-xin', 'gu-da-sao', 'yue-he', 'zou-yuan', 'zou-run'],
    kind: 'rescue',
  },
  {
    id: 'ch050-sandazhujia',
    chapter: 50,
    title: '三打祝家莊',
    summary:
      '孫立等混入祝家莊為內應，梁山裡應外合，攻破祝家莊。扈三娘歸順，李應、杜興也被請上山。',
    placeIds: ['zhujiazhuang', 'duolonggang'],
    heroIds: ['song-jiang', 'wu-yong', 'sun-li', 'hu-san-niang', 'wang-ying', 'li-ying', 'du-xing'],
    kind: 'battle',
  },
  {
    id: 'ch051-xiaoyanei',
    chapter: 51,
    title: '誤失小衙內',
    summary:
      '雷橫打死白秀英被押，朱仝私放雷橫，被刺配滄州。吳用、李逵設計逼朱仝上山，李逵殺死小衙內。',
    placeIds: ['yuncheng', 'cangzhou'],
    heroIds: ['lei-heng', 'zhu-tong', 'li-kui', 'wu-yong'],
    kind: 'death',
  },
  {
    id: 'ch052-gaotang',
    chapter: 52,
    title: '失陷高唐州',
    summary:
      '李逵打死殷天錫，柴進被高唐州知府高廉下獄。宋江發兵高唐州，卻被高廉妖法所阻。',
    placeIds: ['gaotang', 'liangshanpo'],
    heroIds: ['li-kui', 'chai-jin', 'song-jiang'],
    kind: 'battle',
  },
  {
    id: 'ch053-gongsunsheng',
    chapter: 53,
    title: '二取公孫勝',
    summary:
      '戴宗、李逵往薊州二仙山請公孫勝。李逵獨劈羅真人，惹出禍端，最終請得公孫勝下山。',
    placeIds: ['jizhou-you', 'erxianshan', 'liangshanpo'],
    heroIds: ['dai-zong', 'li-kui', 'gong-sun-sheng'],
    kind: 'journey',
    route: ['liangshanpo', 'jizhou-you', 'erxianshan'],
  },
  {
    id: 'ch054-gaolian',
    chapter: 54,
    title: '破高廉',
    summary:
      '公孫勝以道法破高廉，梁山軍攻破高唐州。李逵下井救出柴進，高唐州歸梁山。',
    placeIds: ['gaotang'],
    heroIds: ['gong-sun-sheng', 'li-kui', 'chai-jin', 'song-jiang'],
    kind: 'battle',
  },
  {
    id: 'ch055-lianhuanma',
    chapter: 55,
    title: '連環馬',
    summary:
      '高俅興三路兵征梁山，呼延灼以連環馬取勝。梁山請徐寧上山，教練鉤鐮槍破陣。',
    placeIds: ['liangshanpo', 'dongjing'],
    heroIds: ['hu-yan-zhuo', 'han-tao', 'peng-qi', 'ling-zhen'],
    kind: 'battle',
  },
  {
    id: 'ch056-daoxujia',
    chapter: 56,
    title: '盜甲賺徐寧',
    summary:
      '吳用派時遷盜取徐寧祖傳雁翎甲，湯隆誘徐寧上山。徐寧無奈留在梁山，傳授鉤鐮槍法。',
    placeIds: ['dongjing', 'liangshanpo'],
    heroIds: ['shi-qian', 'tang-long', 'xu-ning', 'wu-yong'],
    kind: 'rescue',
    route: ['liangshanpo', 'dongjing'],
  },
  {
    id: 'ch057-polianhuan',
    chapter: 57,
    title: '破連環馬',
    summary:
      '徐寧以鉤鐮槍大破連環馬，呼延灼敗走青州。梁山聲勢大振。',
    placeIds: ['liangshanpo'],
    heroIds: ['xu-ning', 'song-jiang', 'hu-yan-zhuo'],
    kind: 'battle',
  },
  {
    id: 'ch058-sanshan',
    chapter: 58,
    title: '三山聚義',
    summary:
      '魯智深、楊志、武松等二龍山、桃花山、白虎山好漢合兵打青州，與梁山會合，眾虎同心歸水泊。',
    placeIds: ['qingzhou', 'erlongshan', 'taohuashan', 'baishushan'],
    heroIds: ['lu-zhi-shen', 'yang-zhi', 'wu-song', 'shi-en', 'cao-zheng', 'zhang-qing-caiyuan', 'sun-er-niang', 'li-zhong', 'zhou-tong', 'kong-ming', 'kong-liang', 'song-jiang'],
    kind: 'gathering',
  },
  {
    id: 'ch059-huashan',
    chapter: 59,
    title: '鬧西嶽華山',
    summary:
      '宋江、吳用設計賺取金鈴吊掛，率軍大鬧西嶽華山，救出史進、魯智深等人。',
    placeIds: ['huazhou', 'shaohuashan', 'liangshanpo'],
    heroIds: ['wu-yong', 'song-jiang', 'shi-jin', 'zhu-wu', 'chen-da', 'yang-chun', 'lu-zhi-shen', 'wu-song'],
    kind: 'rescue',
    route: ['liangshanpo', 'huazhou', 'shaohuashan'],
  },
  {
    id: 'ch060-zengtoushi',
    chapter: 60,
    title: '曾頭市中箭',
    summary:
      '公孫勝在芒碭山收服樊瑞、項充、李袞。晁蓋親征曾頭市，中史文恭毒箭，傷重身亡。',
    placeIds: ['mangdangshan', 'zengtoushi', 'liangshanpo'],
    heroIds: ['gong-sun-sheng', 'fan-rui', 'xiang-chong', 'li-gun', 'song-jiang', 'duan-jing-zhu'],
    kind: 'death',
  },
  {
    id: 'ch061-lujunyi',
    chapter: 61,
    title: '智賺玉麒麟',
    summary:
      '吳用扮算命先生到北京，賺盧俊義往泰安避災。盧俊義途經梁山被擒，燕青、張順夜鬧金沙渡。',
    placeIds: ['beijing', 'liangshanpo', 'jinshadu', 'taian'],
    heroIds: ['wu-yong', 'lu-jun-yi', 'yan-qing', 'zhang-shun', 'li-kui'],
    kind: 'other',
    route: ['beijing', 'liangshanpo'],
  },
  {
    id: 'ch062-damingjiefa',
    chapter: 62,
    title: '劫法場大名府',
    summary:
      '盧俊義被管家李固陷害下獄，燕青放冷箭救主。石秀劫法場失敗被擒，梁山發兵大名府。',
    placeIds: ['beijing', 'liangshanpo'],
    heroIds: ['yan-qing', 'lu-jun-yi', 'shi-xiu', 'cai-fu', 'cai-qing'],
    kind: 'rescue',
  },
  {
    id: 'ch063-damingcheng',
    chapter: 63,
    title: '兵打大名城',
    summary:
      '宋江兵打大名城，關勝奉朝廷之命議取梁山泊，宣贊、郝思文隨行，戰局轉急。',
    placeIds: ['beijing', 'liangshanpo'],
    heroIds: ['song-jiang', 'guan-sheng', 'xuan-zan', 'hao-si-wen', 'suo-chao'],
    kind: 'battle',
  },
  {
    id: 'ch064-guansheng',
    chapter: 64,
    title: '雪天擒索超',
    summary:
      '呼延灼月夜賺關勝，關勝歸順梁山。宋江雪天設伏，擒住索超，大名府攻勢暫歇。',
    placeIds: ['liangshanpo', 'beijing'],
    heroIds: ['hu-yan-zhuo', 'guan-sheng', 'suo-chao', 'song-jiang'],
    kind: 'battle',
  },
  {
    id: 'ch065-zhangshun',
    chapter: 65,
    title: '張順水上報冤',
    summary:
      '晁蓋託夢宋江。張順在水上遇險，安道全被請上梁山醫治宋江，張順水上報冤。',
    placeIds: ['beijing', 'liangshanpo'],
    heroIds: ['zhang-shun', 'an-dao-quan', 'song-jiang'],
    kind: 'death',
  },
  {
    id: 'ch066-damingzhi',
    chapter: 66,
    title: '智取大名府',
    summary:
      '時遷火燒翠雲樓，吳用裡應外合智取大名府，救出盧俊義、石秀，李固、賈氏伏誅。',
    placeIds: ['beijing', 'liangshanpo'],
    heroIds: ['shi-qian', 'wu-yong', 'lu-jun-yi', 'yan-qing', 'cai-fu', 'cai-qing'],
    kind: 'battle',
    site: '翠雲樓',
  },
  {
    id: 'ch067-shuihuo',
    chapter: 67,
    title: '降水火二將',
    summary:
      '宋江賞馬步三軍，關勝降服單廷珪、魏定國，鮑旭、焦挺等也歸梁山，兵力更盛。',
    placeIds: ['beijing', 'liangshanpo'],
    heroIds: ['song-jiang', 'guan-sheng', 'shan-ting-gui', 'wei-ding-guo', 'bao-xu', 'jiao-ting'],
    kind: 'battle',
  },
  {
    id: 'ch068-zengtoushi',
    chapter: 68,
    title: '活捉史文恭',
    summary:
      '宋江夜打曾頭市，盧俊義設伏活捉史文恭，為晁蓋報仇。曾頭市歸梁山。',
    placeIds: ['zengtoushi', 'liangshanpo'],
    heroIds: ['song-jiang', 'lu-jun-yi', 'yan-qing', 'duan-jing-zhu'],
    kind: 'battle',
  },
  {
    id: 'ch069-dongping',
    chapter: 69,
    title: '義釋雙槍將',
    summary:
      '宋江攻東平府，史進誤陷城中。董平出戰被擒，宋江義釋，董平歸順梁山。',
    placeIds: ['dongping', 'dongchang'],
    heroIds: ['shi-jin', 'dong-ping', 'song-jiang', 'wang-ying', 'hu-san-niang'],
    kind: 'battle',
  },
  {
    id: 'ch070-zhangqing',
    chapter: 70,
    title: '飛石打英雄',
    summary:
      '張清以飛石連打梁山十五員大將，宋江棄糧誘敵，設計擒住張清。龔旺、丁得孫、皇甫端一同歸順。',
    placeIds: ['dongchang', 'liangshanpo'],
    heroIds: ['zhang-qing', 'song-jiang', 'lu-jun-yi', 'gong-wang', 'ding-de-sun', 'huang-fu-duan'],
    kind: 'battle',
  },
  {
    id: 'ch071-paizuoci',
    chapter: 71,
    title: '英雄排座次',
    summary:
      '忠義堂石碣出土，天罡地煞星號排定。宋江為首，盧俊義次之，一百單八將自此齊聚梁山。',
    placeIds: ['liangshanpo', 'liangshan'],
    heroIds: ['song-jiang', 'lu-jun-yi', 'wu-yong', 'gong-sun-sheng'],
    kind: 'gathering',
    site: '忠義堂',
    quote: '天地顯罡煞之精，人境合傑靈之美。',
  },
  {
    id: 'ch072-yuanye',
    chapter: 72,
    title: '元夜鬧東京',
    summary:
      '柴進簪花入禁院，探看御書四大寇姓名。李逵元夜鬧東京，宋江等人在東京與李師師、徽宗近距離接觸。',
    placeIds: ['dongjing', 'liangshanpo'],
    heroIds: ['chai-jin', 'li-kui', 'song-jiang', 'yan-qing', 'shi-qian'],
    kind: 'other',
    route: ['liangshanpo', 'dongjing'],
  },
  {
    id: 'ch073-shuangxiantou',
    chapter: 73,
    title: '雙獻頭',
    summary:
      '李逵喬捉鬼，殺死冒充宋江、柴進劫掠民女的歹徒，提頭回梁山獻上，表明宋江清白。',
    placeIds: ['liangshanpo', 'shouzhang'],
    heroIds: ['li-kui', 'yan-qing'],
    kind: 'other',
  },
  {
    id: 'ch074-qingtianzhu',
    chapter: 74,
    title: '智撲擎天柱',
    summary:
      '燕青在泰安州智撲擎天柱任原，名震江湖。李逵在壽張喬坐衙，鬧出一場笑話。',
    placeIds: ['taian', 'shouzhang'],
    heroIds: ['yan-qing', 'li-kui'],
    kind: 'battle',
  },
  {
    id: 'ch075-chaozhao',
    chapter: 75,
    title: '扯詔罵欽差',
    summary:
      '朝廷第一次招安，陳太尉到梁山。阮小七倒船偷御酒，李逵扯詔罵欽差，招安不成。',
    placeIds: ['liangshanpo', 'dongjing'],
    heroIds: ['ruan-xiao-qi', 'li-kui', 'song-jiang'],
    kind: 'court',
  },
  {
    id: 'ch076-jiugong',
    chapter: 76,
    title: '九宮八卦陣',
    summary:
      '吳用布四斗五方旗，宋江排九宮八卦陣，梁山軍容大盛，準備迎擊童貫。',
    placeIds: ['liangshanpo'],
    heroIds: ['wu-yong', 'song-jiang', 'zhu-wu'],
    kind: 'battle',
  },
  {
    id: 'ch077-liangyingtongguan',
    chapter: 77,
    title: '兩贏童貫',
    summary:
      '童貫率軍征梁山，宋江設十面埋伏，兩次擊敗官軍，童貫狼狽退走。',
    placeIds: ['liangshanpo'],
    heroIds: ['song-jiang', 'wu-yong', 'hu-yan-zhuo', 'guan-sheng', 'lin-chong', 'qin-ming'],
    kind: 'battle',
  },
  {
    id: 'ch078-yibaidagao',
    chapter: 78,
    title: '一敗高太尉',
    summary:
      '高俅親率十節度使征梁山，宋江、吳用調度兵馬，張清飛石建功，官軍初戰失利。',
    placeIds: ['liangshanpo', 'dongjing'],
    heroIds: ['song-jiang', 'wu-yong', 'zhang-qing', 'hu-yan-zhuo'],
    kind: 'battle',
  },
  {
    id: 'ch079-huo-shaochuan',
    chapter: 79,
    title: '火燒戰船',
    summary:
      '劉唐火燒官軍戰船，宋江兩敗高太尉。水軍將領在梁山泊中發揮所長。',
    placeIds: ['liangshanpo'],
    heroIds: ['liu-tang', 'song-jiang', 'li-jun', 'ruan-xiao-er', 'ruan-xiao-wu', 'ruan-xiao-qi', 'zhang-shun'],
    kind: 'battle',
  },
  {
    id: 'ch080-sanbaigao',
    chapter: 80,
    title: '三敗高太尉',
    summary:
      '張順鑿漏海鰍船，宋江三敗高太尉。高俅被擒上梁山，招安之事出現轉機。',
    placeIds: ['liangshanpo'],
    heroIds: ['zhang-shun', 'song-jiang', 'shi-qian', 'ling-zhen'],
    kind: 'battle',
  },
  {
    id: 'ch081-yueye',
    chapter: 81,
    title: '月夜遇道君',
    summary:
      '燕青月夜遇徽宗，戴宗定計請出樂和。梁山透過李師師、宿太尉等管道，促成第二次招安。',
    placeIds: ['dongjing', 'liangshanpo'],
    heroIds: ['yan-qing', 'dai-zong', 'yue-he', 'li-kui', 'song-jiang'],
    kind: 'court',
    route: ['liangshanpo', 'dongjing'],
  },
  {
    id: 'ch082-zhaoan',
    chapter: 82,
    title: '全夥受招安',
    summary:
      '梁山泊分金大買市，宋江率一百單八將全夥受招安，梁山時代進入尾聲。',
    placeIds: ['liangshanpo', 'dongjing'],
    heroIds: ['song-jiang', 'lu-jun-yi', 'wu-yong', 'yan-qing'],
    kind: 'court',
    route: ['liangshanpo', 'dongjing'],
  },
  {
    id: 'ch083-chenqiao',
    chapter: 83,
    title: '陳橋驛斬小卒',
    summary:
      '宋江奉詔破遼，於陳橋驛誓師。因小卒違令，宋江滴淚斬之，梁山軍開赴北境。',
    placeIds: ['chenqiao', 'dongjing', 'tanzhou'],
    heroIds: ['song-jiang', 'li-kui', 'lu-jun-yi'],
    kind: 'journey',
    route: ['dongjing', 'chenqiao', 'tanzhou'],
  },
  {
    id: 'ch084-jizhou',
    chapter: 84,
    title: '兵打薊州',
    summary:
      '宋江兵打薊州城，盧俊義大戰玉田縣。梁山軍在燕雲之地與遼軍交鋒。',
    placeIds: ['jizhou-you', 'yutian'],
    heroIds: ['song-jiang', 'lu-jun-yi', 'guan-sheng', 'lin-chong'],
    kind: 'battle',
  },
  {
    id: 'ch085-wenan',
    chapter: 85,
    title: '智取文安縣',
    summary:
      '宋江夜度益津關，吳用智取文安縣。梁山軍繞過正面防線，接連拿下霸州、文安。',
    placeIds: ['bazhou', 'wenan', 'jizhou-you'],
    heroIds: ['song-jiang', 'wu-yong', 'lu-jun-yi', 'shi-qian'],
    kind: 'battle',
    route: ['jizhou-you', 'bazhou', 'wenan'],
  },
  {
    id: 'ch086-qingshiyu',
    chapter: 86,
    title: '兵陷青石峪',
    summary:
      '宋江大戰獨鹿山，盧俊義兵陷青石峪。梁山軍分兵作戰，一度陷入險境。',
    placeIds: ['dulu', 'qingshiyu'],
    heroIds: ['song-jiang', 'lu-jun-yi', 'hu-yan-zhuo', 'shi-jin'],
    kind: 'battle',
  },
  {
    id: 'ch087-youzhou',
    chapter: 87,
    title: '大戰幽州',
    summary:
      '宋江大戰幽州，呼延灼力擒番將。梁山軍兵臨燕京城下。',
    placeIds: ['youzhou'],
    heroIds: ['song-jiang', 'hu-yan-zhuo', 'guan-sheng', 'lin-chong'],
    kind: 'battle',
  },
  {
    id: 'ch088-huntian',
    chapter: 88,
    title: '混天象陣',
    summary:
      '遼軍顏統軍列混天象陣，宋江夢授玄女法，公孫勝、吳用共破遼陣。',
    placeIds: ['youzhou'],
    heroIds: ['wu-yong', 'song-jiang', 'gong-sun-sheng'],
    kind: 'battle',
  },
  {
    id: 'ch089-pozhen',
    chapter: 89,
    title: '破陣成功',
    summary:
      '宋江破陣成功，遼國請降。宿太尉頒恩降詔，梁山軍班師回朝。',
    placeIds: ['youzhou', 'dongjing'],
    heroIds: ['song-jiang', 'lu-jun-yi', 'wu-yong'],
    kind: 'court',
    route: ['youzhou', 'dongjing'],
  },
  {
    id: 'ch090-wutaishan',
    chapter: 90,
    title: '五台山參禪',
    summary:
      '宋江上五台山參禪，與魯智深同訪故地。燕青在雙林鎮遇故人，眾人各有感悟。',
    placeIds: ['wutaishan', 'shuanglin'],
    heroIds: ['song-jiang', 'lu-zhi-shen', 'yan-qing'],
    kind: 'other',
  },
  {
    id: 'ch091-huanghe',
    chapter: 91,
    title: '兵渡黃河',
    summary:
      '宋江兵渡黃河，征討田虎。盧俊義黑夜賺城，梁山軍進入河東。',
    placeIds: ['dongjing', 'gaizhou', 'weisheng'],
    heroIds: ['song-jiang', 'lu-jun-yi', 'zhang-qing', 'li-kui'],
    kind: 'journey',
    route: ['dongjing', 'gaizhou', 'weisheng'],
  },
  {
    id: 'ch092-gaijun',
    chapter: 92,
    title: '打蓋郡',
    summary:
      '花榮神箭振軍威，吳用密籌攻打蓋郡。梁山軍在河東連戰連捷。',
    placeIds: ['gaizhou', 'weisheng'],
    heroIds: ['hua-rong', 'wu-yong', 'song-jiang', 'lu-jun-yi'],
    kind: 'battle',
  },
  {
    id: 'ch093-tianchi',
    chapter: 93,
    title: '夢鬧天池',
    summary:
      '李逵夢鬧天池，宋江兵分兩路進攻田虎。梁山軍在威勝、昭德之間展開攻勢。',
    placeIds: ['weisheng', 'zhaode'],
    heroIds: ['li-kui', 'song-jiang', 'lu-jun-yi'],
    kind: 'other',
  },
  {
    id: 'ch094-yijiang',
    chapter: 94,
    title: '義降三將',
    summary:
      '關勝義降三將，李逵莽撞陷入敵陣。宋江調兵救援，逐步逼近田虎腹地。',
    placeIds: ['zhaode', 'weisheng'],
    heroIds: ['guan-sheng', 'li-kui', 'song-jiang'],
    kind: 'battle',
  },
  {
    id: 'ch095-houtu',
    chapter: 95,
    title: '術敗宋兵',
    summary:
      '宋江忠感后土，喬道清以法術擊敗宋軍。公孫勝出山，與喬道清鬥法。',
    placeIds: ['weisheng', 'wulongshan'],
    heroIds: ['song-jiang', 'gong-sun-sheng'],
    kind: 'battle',
  },
  {
    id: 'ch096-baiguling',
    chapter: 96,
    title: '兵圍百穀嶺',
    summary:
      '喬道清術窘五龍山，公孫勝兵圍百穀嶺。梁山軍以道法與兵法並用，逆轉戰局。',
    placeIds: ['wulongshan', 'baiguling'],
    heroIds: ['gong-sun-sheng', 'fan-rui', 'li-kui'],
    kind: 'battle',
  },
  {
    id: 'ch097-qiongying',
    chapter: 97,
    title: '瓊英做先鋒',
    summary:
      '陳觀升任安撫，瓊英做了田虎軍先鋒。張清與瓊英在陣前相遇，故事轉入情感與征戰交織。',
    placeIds: ['weisheng', 'zhaode'],
    heroIds: ['zhang-qing', 'song-jiang'],
    kind: 'battle',
  },
  {
    id: 'ch098-qiongying',
    chapter: 98,
    title: '張清配瓊英',
    summary:
      '張清與瓊英結為夫婦，吳用設計鴆殺鄔梨。田虎勢力內部分崩離析。',
    placeIds: ['weisheng', 'zhaode'],
    heroIds: ['zhang-qing', 'wu-yong', 'song-jiang'],
    kind: 'other',
  },
  {
    id: 'ch099-taiyuan',
    chapter: 99,
    title: '水灌太原城',
    summary:
      '魯智深解脫緣纏井，李俊水灌太原城。梁山軍攻破田虎最後據點。',
    placeIds: ['taiyuan'],
    heroIds: ['lu-zhi-shen', 'li-jun', 'song-jiang', 'lu-jun-yi'],
    kind: 'battle',
  },
  {
    id: 'ch100-zoujie',
    chapter: 100,
    title: '宋江奏捷',
    summary:
      '張清、瓊英雙建功，陳觀、宋江同奏捷。田虎之亂平定，梁山軍回師東京。',
    placeIds: ['taiyuan', 'dongjing'],
    heroIds: ['zhang-qing', 'song-jiang', 'lu-jun-yi'],
    kind: 'court',
    route: ['taiyuan', 'dongjing'],
  },
  {
    id: 'ch101-wangqing',
    chapter: 101,
    title: '王慶產逆',
    summary:
      '東京富戶王慶因墳地、春陽之事生出禍端，逐步走上反叛之路。此回多為王慶出身鋪墊。',
    placeIds: ['dongjing', 'fangzhou'],
    heroIds: [],
    kind: 'origin',
  },
  {
    id: 'ch102-wangqing-guan',
    chapter: 102,
    title: '王慶吃官司',
    summary:
      '王慶因姦情吃官司，龔端被刺配。王慶在流放途中逐漸聚集亡命之徒。',
    placeIds: ['dongjing', 'fangzhou'],
    heroIds: [],
    kind: 'other',
  },
  {
    id: 'ch103-zhangguan',
    chapter: 103,
    title: '張管營喪身',
    summary:
      '張管營因妾弟喪身，范節級為表兄醫臉。王慶在房州、宛州一帶的勢力開始成形。',
    placeIds: ['fangzhou', 'wanzhou'],
    heroIds: [],
    kind: 'other',
  },
  {
    id: 'ch104-fangshan',
    chapter: 104,
    title: '房山寨',
    summary:
      '段家莊重招新女婿，房山寨併吞舊強人。王慶整合山寨勢力，聲勢漸大。',
    placeIds: ['fangzhou', 'wanzhou'],
    heroIds: [],
    kind: 'gathering',
  },
  {
    id: 'ch105-bishu',
    chapter: 105,
    title: '避暑療軍',
    summary:
      '宋江避暑療軍，喬道清迴風燒賊寇。梁山軍南下征討王慶，首戰告捷。',
    placeIds: ['wanzhou', 'jishan'],
    heroIds: ['song-jiang', 'gong-sun-sheng', 'wu-yong', 'lu-jun-yi'],
    kind: 'battle',
  },
  {
    id: 'ch106-shuijun',
    chapter: 106,
    title: '水軍破城',
    summary:
      '書生談笑卻強敵，水軍汩沒破堅城。李俊、張順等水軍將領在宛州一帶建立奇功。',
    placeIds: ['wanzhou', 'jishan'],
    heroIds: ['wu-yong', 'li-jun', 'zhang-shun', 'ruan-xiao-er', 'ruan-xiao-wu', 'ruan-xiao-qi'],
    kind: 'battle',
  },
  {
    id: 'ch107-jishan',
    chapter: 107,
    title: '大勝紀山',
    summary:
      '宋江大勝紀山軍，朱武打破六花陣。王慶軍節節敗退。',
    placeIds: ['jishan'],
    heroIds: ['song-jiang', 'zhu-wu', 'guan-sheng'],
    kind: 'battle',
  },
  {
    id: 'ch108-xingwu',
    chapter: 108,
    title: '興霧取城',
    summary:
      '喬道清興霧取城，小旋風柴進藏炮擊賊。梁山軍攻破王慶多處城寨。',
    placeIds: ['wanzhou', 'fangzhou'],
    heroIds: ['chai-jin', 'gong-sun-sheng', 'song-jiang'],
    kind: 'battle',
  },
  {
    id: 'ch109-wangqing-zhua',
    chapter: 109,
    title: '王慶被捉',
    summary:
      '王慶渡江被捉，宋江剿寇成功。王慶之亂平定，梁山軍再次班師。',
    placeIds: ['fangzhou', 'nanfeng'],
    heroIds: ['song-jiang', 'lu-jun-yi', 'li-jun', 'zhang-shun'],
    kind: 'battle',
  },
  {
    id: 'ch110-qiulin',
    chapter: 110,
    title: '秋林渡射雁',
    summary:
      '燕青秋林渡射雁，宋江東京城獻俘。梁山軍凱旋，卻已暗伏離散之兆。',
    placeIds: ['qiulin', 'dongjing'],
    heroIds: ['yan-qing', 'song-jiang'],
    kind: 'other',
    route: ['fangzhou', 'dongjing'],
  },
  {
    id: 'ch111-runzhou',
    chapter: 111,
    title: '智取潤州',
    summary:
      '張順夜伏金山寺，宋江智取潤州城。征方臘之戰打響，梁山軍渡江南下。',
    placeIds: ['runzhou', 'jinshansi'],
    heroIds: ['zhang-shun', 'song-jiang', 'lu-jun-yi', 'shi-jin'],
    kind: 'battle',
    route: ['dongjing', 'runzhou', 'jinshansi'],
  },
  {
    id: 'ch112-piling',
    chapter: 112,
    title: '大戰毗陵',
    summary:
      '盧俊義分兵宣州道，宋江大戰毗陵郡。梁山軍分兩路進逼方臘。',
    placeIds: ['xuanzhou', 'changzhou'],
    heroIds: ['lu-jun-yi', 'song-jiang', 'shi-jin', 'han-tao', 'peng-qi', 'xuan-zan'],
    kind: 'battle',
  },
  {
    id: 'ch113-suzhou',
    chapter: 113,
    title: '蘇州大會垓',
    summary:
      '混江龍李俊在太湖小結義，宋江在蘇州大會垓。水軍與步軍協同作戰。',
    placeIds: ['suzhou', 'taihu'],
    heroIds: ['li-jun', 'tong-wei', 'tong-meng', 'song-jiang', 'lu-jun-yi'],
    kind: 'battle',
  },
  {
    id: 'ch114-zhangshun',
    chapter: 114,
    title: '張順歸神',
    summary:
      '宋江在杭州弔孝，張順夜探湧金門，被方臘軍射死，魂歸水府。',
    placeIds: ['hangzhou', 'yongjinmen'],
    heroIds: ['song-jiang', 'zhang-shun', 'lu-zhi-shen', 'wu-song'],
    kind: 'death',
  },
  {
    id: 'ch115-ninghai',
    chapter: 115,
    title: '智取寧海軍',
    summary:
      '張順魂捉方天定，宋江智取寧海軍。杭州一線的戰事出現轉機。',
    placeIds: ['hangzhou'],
    heroIds: ['zhang-shun', 'song-jiang', 'lu-jun-yi', 'dong-ping', 'zhang-qing'],
    kind: 'battle',
  },
  {
    id: 'ch116-wulongling',
    chapter: 116,
    title: '大戰烏龍嶺',
    summary:
      '盧俊義分兵歙州道，宋江大戰烏龍嶺。解珍、解寶等將領在此役中犧牲。',
    placeIds: ['shezhou', 'wulongling'],
    heroIds: ['lu-jun-yi', 'song-jiang', 'jie-zhen', 'jie-bao', 'ruan-xiao-er'],
    kind: 'battle',
  },
  {
    id: 'ch117-muzhou',
    chapter: 117,
    title: '神助宋公明',
    summary:
      '睦州城箭射鄧元覺，烏龍嶺神助宋公明。梁山軍付出慘重代價，攻勢未止。',
    placeIds: ['muxhou', 'wulongling'],
    heroIds: ['song-jiang', 'lu-zhi-shen', 'wu-song', 'hua-rong'],
    kind: 'battle',
  },
  {
    id: 'ch118-qingxi',
    chapter: 118,
    title: '智取清溪洞',
    summary:
      '盧俊義大戰昱嶺關，宋江智取清溪洞。方臘最後據點被攻破，梁山將領傷亡慘重。',
    placeIds: ['yulingguan', 'qingxidong'],
    heroIds: ['lu-jun-yi', 'song-jiang', 'shi-jin', 'shi-xiu', 'chen-da', 'yang-chun', 'qin-ming', 'ruan-xiao-wu'],
    kind: 'battle',
  },
  {
    id: 'ch119-zuohua',
    chapter: 119,
    title: '魯智深坐化',
    summary:
      '魯智深在杭州六和寺坐化，武松出家。宋江衣錦還鄉，梁山舊人陸續離散。',
    placeIds: ['hangzhou', 'qingxidong', 'dongjing'],
    heroIds: ['lu-zhi-shen', 'wu-song', 'lin-chong', 'song-jiang', 'yan-qing', 'li-jun'],
    kind: 'death',
  },
  {
    id: 'ch120-liaowa',
    chapter: 120,
    title: '神聚蓼兒窪',
    summary:
      '宋江、李逵飲毒酒而死，吳用、花榮自縊於楚州蓼兒窪。徽宗夢遊梁山泊，一百單八將的故事歸於寂滅。',
    placeIds: ['chuzhou', 'liaowa', 'dongjing', 'liangshanpo'],
    heroIds: ['song-jiang', 'li-kui', 'wu-yong', 'hua-rong', 'lu-jun-yi'],
    kind: 'death',
    quote: '天罡盡已歸天界，地煞還應入地中。',
  },
]

export const eventById = Object.fromEntries(events.map((event) => [event.id, event]))

export const eventsByChapter = events.reduce<Record<number, StoryEvent[]>>((acc, event) => {
  for (let n = event.chapter; n <= (event.endChapter ?? event.chapter); n += 1) {
    acc[n] = [...(acc[n] ?? []), event]
  }
  return acc
}, {})

export function eventsForChapter(chapter: number): StoryEvent[] {
  return eventsByChapter[chapter] ?? []
}

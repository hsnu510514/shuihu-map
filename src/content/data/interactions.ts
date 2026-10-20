import type { Interaction } from './types'

function i(
  id: string,
  a: string,
  b: string,
  chapter: number,
  label: string,
  summary: string,
  eventId?: string,
  endChapter?: number,
  quote?: string,
): Interaction {
  return { id, a, b, chapter, endChapter, label, summary, eventId, quote }
}

export const interactions: Interaction[] = [
  i('song-jiang-li-kui-38a', 'song-jiang', 'li-kui', 38, '江州結識', '宋江在江州結識李逵，替其還清賭債，李逵自此傾心追隨。', 'ch038-daizong'),
  i('song-jiang-li-kui-38b', 'song-jiang', 'li-kui', 38, '江中惡鬥', '李逵與張順在潯陽江中惡鬥，宋江趕到調解，三人結為好友。', 'ch038-daizong'),
  i('song-jiang-li-kui-40', 'song-jiang', 'li-kui', 40, '大鬧江州法場', '宋江、戴宗問斬，李逵率先跳樓劫法場，殺入江州救出二人。', 'ch040-jiefachang'),
  i('song-jiang-li-kui-41', 'song-jiang', 'li-kui', 41, '智取無為軍', '李逵隨軍攻入無為軍，擒殺告發宋江的黃文炳。', 'ch041-wuweijun'),
  i('song-jiang-li-kui-43', 'song-jiang', 'li-kui', 43, '沂嶺殺四虎', '李逵請命回沂水接母，母親被虎所害，怒殺四虎；宋江在梁山接應。', 'ch043-yiling'),
  i('song-jiang-li-kui-51', 'song-jiang', 'li-kui', 51, '殺小衙內', '宋江、吳用設計逼朱仝上山，李逵動手殺死小衙內。', 'ch051-xiaoyanei'),
  i('song-jiang-li-kui-52', 'song-jiang', 'li-kui', 52, '打死殷天錫', '李逵打死殷天錫，宋江發兵高唐州救柴進。', 'ch052-gaotang'),
  i('song-jiang-li-kui-53', 'song-jiang', 'li-kui', 53, '斧劈羅真人', '李逵隨戴宗二請公孫勝，誤劈羅真人，宋江遣其賠罪。', 'ch053-gongsunsheng'),
  i('song-jiang-li-kui-54', 'song-jiang', 'li-kui', 54, '下井救柴進', '高唐州破後，李逵下井救出柴進。', 'ch054-gaolian'),
  i('song-jiang-li-kui-61', 'song-jiang', 'li-kui', 61, '賺盧俊義上山', '李逵奉宋江之命參與賺取盧俊義，途中在金沙渡大鬧。', 'ch061-lujunyi'),
  i('song-jiang-li-kui-62', 'song-jiang', 'li-kui', 62, '大名府劫法場', '李逵隨軍攻打大名府，救盧俊義、石秀。', 'ch062-damingjiefa'),
  i('song-jiang-li-kui-66', 'song-jiang', 'li-kui', 66, '智取大名府', '李逵隨宋江裡應外合，攻破大名府。', 'ch066-damingzhi'),
  i('song-jiang-li-kui-72', 'song-jiang', 'li-kui', 72, '元夜鬧東京', '李逵隨宋江入東京，元夜大鬧，攪亂招安佈局。', 'ch072-yuanye'),
  i('song-jiang-li-kui-73', 'song-jiang', 'li-kui', 73, '雙獻頭', '李逵殺死冒充宋江劫掠民女之徒，提頭回梁山為宋江辨白。', 'ch073-shuangxiantou'),
  i('song-jiang-li-kui-74', 'song-jiang', 'li-kui', 74, '壽張喬坐衙', '李逵與燕青同往泰安，在壽張縣喬坐衙鬧出笑話。', 'ch074-qingtianzhu'),
  i('song-jiang-li-kui-75', 'song-jiang', 'li-kui', 75, '扯詔罵欽差', '李逵扯碎招安詔書，怒罵陳太尉，第一次招安告吹。', 'ch075-chaozhao'),
  i('song-jiang-li-kui-78', 'song-jiang', 'li-kui', 78, '迎戰高太尉', '李逵隨宋江迎戰高俅官軍，一敗高太尉。', 'ch078-yibaidagao'),
  i('song-jiang-li-kui-80', 'song-jiang', 'li-kui', 80, '三敗高太尉', '李逵參與梁山泊水戰，助張順鑿漏海鰍船。', 'ch080-sanbaigao'),
  i('song-jiang-li-kui-83', 'song-jiang', 'li-kui', 83, '陳橋驛斬小卒', '宋江奉詔破遼，在陳橋驛滴淚斬違令小卒，李逵在側。', 'ch083-chenqiao'),
  i('song-jiang-li-kui-93', 'song-jiang', 'li-kui', 93, '夢鬧天池', '李逵夢鬧天池，宋江分兵兩路進攻田虎。', 'ch093-tianchi'),
  i('song-jiang-li-kui-94', 'song-jiang', 'li-kui', 94, '莽撞陷陣', '李逵莽撞陷入敵陣，宋江調兵救援，義降三將。', 'ch094-yijiang'),
  i('song-jiang-li-kui-120', 'song-jiang', 'li-kui', 120, '楚州共飲毒酒', '宋江恐李逵日後造反，請其共飲毒酒，二人同死於楚州。', 'ch120-liaowa', undefined, '我死之後，恐怕你造次，壞了我梁山泊替天行道之名。'),

  i('song-jiang-wu-song-23', 'song-jiang', 'wu-song', 23, '柴進莊相識', '武松落魄柴進莊上，與宋江相遇，一見如故。', 'ch023-jingyanggang'),
  i('song-jiang-wu-song-32', 'song-jiang', 'wu-song', 32, '清風山重逢', '武松醉打孔亮後，在清風山與宋江重逢，同歸梁山。', 'ch032-kongliang'),
  i('song-jiang-wu-song-58', 'song-jiang', 'wu-song', 58, '三山聚義', '武松隨二龍山、桃花山、白虎山眾好漢合兵，歸梁山與宋江會合。', 'ch058-sanshan'),
  i('song-jiang-wu-song-59', 'song-jiang', 'wu-song', 59, '大鬧華山', '宋江、吳用率軍救史進、魯智深，武松隨征華州。', 'ch059-huashan'),
  i('song-jiang-wu-song-114', 'song-jiang', 'wu-song', 114, '杭州弔孝', '武松隨宋江在杭州弔孝，張順夜探湧金門陣亡。', 'ch114-zhangshun'),
  i('song-jiang-wu-song-117', 'song-jiang', 'wu-song', 117, '睦州之戰', '武松隨宋江大戰睦州，梁山軍付出慘重代價。', 'ch117-muzhou'),
  i('song-jiang-wu-song-119', 'song-jiang', 'wu-song', 119, '六和寺告別', '魯智深坐化，武松在六和寺出家，宋江與之告別。', 'ch119-zuohua'),

  i('song-jiang-hua-rong-33', 'song-jiang', 'hua-rong', 33, '清風寨相救', '花榮不顧前程出手救宋江，大鬧清風寨。', 'ch033-qingfengzhai'),
  i('song-jiang-hua-rong-34', 'song-jiang', 'hua-rong', 34, '設計擒秦明', '花榮助宋江設計擒秦明，收其歸梁山。', 'ch034-walichang'),
  i('song-jiang-hua-rong-35', 'song-jiang', 'hua-rong', 35, '梁山射雁', '花榮一箭射落雁行，隨宋江上梁山。', 'ch035-liangshansheyan'),
  i('song-jiang-hua-rong-40', 'song-jiang', 'hua-rong', 40, '江州劫法場', '花榮隨梁山眾人江州劫法場，救出宋江、戴宗。', 'ch040-jiefachang'),
  i('song-jiang-hua-rong-48', 'song-jiang', 'hua-rong', 48, '二打祝家莊', '花榮隨宋江征祝家莊，陣前立功。', 'ch048-erda'),
  i('song-jiang-hua-rong-117', 'song-jiang', 'hua-rong', 117, '箭射鄧元覺', '睦州之戰，花榮箭射方臘國師鄧元覺。', 'ch117-muzhou'),
  i('song-jiang-hua-rong-120', 'song-jiang', 'hua-rong', 120, '蓼兒窪自縊', '宋江死後，花榮與吳用自縊於楚州蓼兒窪。', 'ch120-liaowa'),

  i('song-jiang-dai-zong-36', 'song-jiang', 'dai-zong', 36, '江州照應', '吳用派戴宗往江州照應宋江，二人相識。', 'ch036-jieyang'),
  i('song-jiang-dai-zong-38', 'song-jiang', 'dai-zong', 38, '會神行太保', '宋江在江州與戴宗正式結交。', 'ch038-daizong'),
  i('song-jiang-dai-zong-39', 'song-jiang', 'dai-zong', 39, '送假信被識破', '戴宗為宋江送假信被黃文炳識破，二人同囚待斬。', 'ch039-xunyanglou'),
  i('song-jiang-dai-zong-40', 'song-jiang', 'dai-zong', 40, '江州劫法場', '梁山好漢劫法場，救出宋江與戴宗。', 'ch040-jiefachang'),
  i('song-jiang-dai-zong-53', 'song-jiang', 'dai-zong', 53, '二請公孫勝', '戴宗、李逵往薊州二仙山請公孫勝下山。', 'ch053-gongsunsheng'),
  i('song-jiang-dai-zong-81', 'song-jiang', 'dai-zong', 81, '月夜遇道君', '戴宗定計請出樂和，助燕青夜見徽宗促成招安。', 'ch081-yueye'),

  i('lin-chong-lu-zhi-shen-7', 'lin-chong', 'lu-zhi-shen', 7, '相國寺結識', '魯智深倒拔垂楊柳，林沖在牆外喝采，二人結為好友。', 'ch007-baihutang'),
  i('lin-chong-lu-zhi-shen-8', 'lin-chong', 'lu-zhi-shen', 8, '野豬林救命', '林沖刺配滄州，董超、薛霸在野豬林欲下毒手，魯智深及時相救。', 'ch008-yezhulin'),
  i('lin-chong-lu-zhi-shen-119', 'lin-chong', 'lu-zhi-shen', 119, '六和寺坐化', '魯智深在杭州六和寺坐化，林沖病重留寺，二人先後了卻塵緣。', 'ch119-zuohua'),

  i('wu-song-lu-zhi-shen-58', 'wu-song', 'lu-zhi-shen', 58, '三山聚義', '武松隨魯智深二龍山眾好漢歸梁山。', 'ch058-sanshan'),
  i('wu-song-lu-zhi-shen-117', 'wu-song', 'lu-zhi-shen', 117, '睦州之戰', '武松、魯智深隨宋江大戰睦州。', 'ch117-muzhou'),
  i('wu-song-lu-zhi-shen-119', 'wu-song', 'lu-zhi-shen', 119, '六和寺', '魯智深坐化，武松留在六和寺出家，相伴至終。', 'ch119-zuohua'),

  i('yang-xiong-shi-xiu-44', 'yang-xiong', 'shi-xiu', 44, '長街結義', '楊雄在薊州長街遇石秀，二人意氣相投結為兄弟。', 'ch044-yinmachuan'),
  i('yang-xiong-shi-xiu-45', 'yang-xiong', 'shi-xiu', 45, '翠屏山對質', '石秀識破潘巧雲與裴如海姦情，助楊雄在翠屏山處置二人。', 'ch045-cuipingshan'),
  i('yang-xiong-shi-xiu-46', 'yang-xiong', 'shi-xiu', 46, '祝家店惹禍', '二人與時遷投梁山，途經祝家店，時遷偷雞、石秀燒店。', 'ch046-zhujiadian'),
  i('yang-xiong-shi-xiu-62', 'yang-xiong', 'shi-xiu', 62, '大名府劫法場', '石秀跳樓劫法場被擒，楊雄隨梁山軍攻打大名府相救。', 'ch062-damingjiefa'),
  i('yang-xiong-shi-xiu-118', 'yang-xiong', 'shi-xiu', 118, '昱嶺關陣亡', '征方臘時石秀陣亡於昱嶺關，楊雄其後亦病故。', 'ch118-qingxi'),

  i('lu-jun-yi-yan-qing-61', 'lu-jun-yi', 'yan-qing', 61, '主僕相隨', '盧俊義被吳用賺上梁山，燕青一路相隨。', 'ch061-lujunyi'),
  i('lu-jun-yi-yan-qing-62', 'lu-jun-yi', 'yan-qing', 62, '放冷箭救主', '李固陷害盧俊義，燕青放冷箭救主，石秀劫法場。', 'ch062-damingjiefa'),
  i('lu-jun-yi-yan-qing-66', 'lu-jun-yi', 'yan-qing', 66, '智取大名府', '梁山裡應外合攻破大名府，救出盧俊義、石秀。', 'ch066-damingzhi'),
  i('lu-jun-yi-yan-qing-68', 'lu-jun-yi', 'yan-qing', 68, '活捉史文恭', '盧俊義設伏活捉史文恭，燕青隨征曾頭市。', 'ch068-zengtoushi'),
  i('lu-jun-yi-yan-qing-90', 'lu-jun-yi', 'yan-qing', 90, '雙林鎮同行', '征遼途中燕青在雙林鎮遇故人，與盧俊義同行。', 'ch090-wutaishan'),
  i('lu-jun-yi-yan-qing-110', 'lu-jun-yi', 'yan-qing', 110, '秋林渡射雁', '燕青在秋林渡射雁，隨宋江東京獻俘。', 'ch110-qiulin'),
  i('lu-jun-yi-yan-qing-119', 'lu-jun-yi', 'yan-qing', 119, '辭別隱居', '征方臘後燕青勸盧俊義急流勇退未果，獨自辭別隱居江湖。', 'ch119-zuohua'),

  i('hu-san-niang-wang-ying-48', 'hu-san-niang', 'wang-ying', 48, '陣前擒王英', '扈三娘在祝家莊陣前單捉王英，令梁山軍受挫。', 'ch048-erda'),
  i('hu-san-niang-wang-ying-50', 'hu-san-niang', 'wang-ying', 50, '宋江主婚', '祝家莊破後，宋江做主將扈三娘許配王英。', 'ch050-sandazhujia'),
  i('hu-san-niang-wang-ying-69', 'hu-san-niang', 'wang-ying', 69, '東平府之戰', '二人隨宋江征東平府，義釋董平。', 'ch069-dongping'),
  i('hu-san-niang-wang-ying-116', 'hu-san-niang', 'wang-ying', 116, '烏龍嶺陣亡', '征方臘時王英、扈三娘先後陣亡於烏龍嶺。', 'ch116-wulongling'),

  i('gao-qiu-lin-chong-7', 'gao-qiu', 'lin-chong', 7, '白虎堂誣陷', '高俅設計誘林沖持刀入白虎堂，誣其行刺。', 'ch007-baihutang'),
  i('gao-qiu-lin-chong-8', 'gao-qiu', 'lin-chong', 8, '買通公差', '高俅、陸謙買通董超、薛霸，命其於野豬林害林沖。', 'ch008-yezhulin'),
  i('gao-qiu-lin-chong-10', 'gao-qiu', 'lin-chong', 10, '火燒草料場', '陸謙奉命火燒草料場，企圖燒死林沖，林沖夜奔山神廟逃過一劫。', 'ch010-shanshenmiao'),
  i('gao-qiu-lin-chong-78', 'gao-qiu', 'lin-chong', 78, '迎戰高太尉', '高俅率十節度使征梁山，林沖隨宋江迎戰，一敗官軍。', 'ch078-yibaidagao'),

  i('song-jiang-zhang-shun-38', 'song-jiang', 'zhang-shun', 38, '江州結識', '李逵與張順江中惡鬥，宋江調解，三人結為好友。', 'ch038-daizong'),
  i('song-jiang-zhang-shun-41', 'song-jiang', 'zhang-shun', 41, '活捉黃文炳', '梁山攻入無為軍，張順活捉告發宋江的黃文炳。', 'ch041-wuweijun'),
  i('song-jiang-zhang-shun-65', 'song-jiang', 'zhang-shun', 65, '請神醫上山', '宋江背疽發作，張順奉命請安道全上山醫治。', 'ch065-zhangshun'),
  i('song-jiang-zhang-shun-111', 'song-jiang', 'zhang-shun', 111, '智取潤州', '張順夜伏金山寺，助宋江智取潤州城。', 'ch111-runzhou'),
  i('song-jiang-zhang-shun-114', 'song-jiang', 'zhang-shun', 114, '湧金門歸神', '張順夜探湧金門被方臘軍射死，宋江在杭州弔孝。', 'ch114-zhangshun'),

  i('song-jiang-li-jun-36', 'song-jiang', 'li-jun', 36, '揭陽嶺結識', '宋江刺配江州途經揭陽嶺，李俊趕到相救並結識。', 'ch036-jieyang'),
  i('song-jiang-li-jun-37', 'song-jiang', 'li-jun', 37, '潯陽江化敵為友', '張橫在潯陽江打劫宋江，李俊趕來說明緣由，眾人化敵為友。', 'ch037-xunyangjiang'),
  i('song-jiang-li-jun-99', 'song-jiang', 'li-jun', 99, '水灌太原城', '李俊水灌太原城，助宋江攻破田虎最後據點。', 'ch099-taiyuan'),
  i('song-jiang-li-jun-106', 'song-jiang', 'li-jun', 106, '水軍破城', '李俊、張順等水軍將領在宛州一帶建立奇功。', 'ch106-shuijun'),
  i('song-jiang-li-jun-113', 'song-jiang', 'li-jun', 113, '蘇州大會垓', '李俊在太湖小結義，宋江在蘇州大會垓。', 'ch113-suzhou'),
  i('song-jiang-li-jun-119', 'song-jiang', 'li-jun', 119, '詐病出海', '征方臘後李俊詐病，與童威、童猛出海而去。', 'ch119-zuohua'),

  i('song-jiang-wu-yong-39', 'song-jiang', 'wu-yong', 39, '偽造書信', '吳用派戴宗請蕭讓、金大堅偽造蔡京書信，營救宋江。', 'ch039-xunyanglou'),
  i('song-jiang-wu-yong-40', 'song-jiang', 'wu-yong', 40, '江州劫法場', '吳用調度梁山好漢江州劫法場，救出宋江、戴宗。', 'ch040-jiefachang'),
  i('song-jiang-wu-yong-51', 'song-jiang', 'wu-yong', 51, '設計逼朱仝', '吳用設計逼朱仝上山，安排李逵殺小衙內。', 'ch051-xiaoyanei'),
  i('song-jiang-wu-yong-56', 'song-jiang', 'wu-yong', 56, '盜甲賺徐寧', '吳用派時遷盜取徐寧雁翎甲，賺其上山教鉤鐮槍。', 'ch056-daoxujia'),
  i('song-jiang-wu-yong-61', 'song-jiang', 'wu-yong', 61, '智賺玉麒麟', '吳用扮算命先生賺盧俊義上梁山。', 'ch061-lujunyi'),
  i('song-jiang-wu-yong-76', 'song-jiang', 'wu-yong', 76, '九宮八卦陣', '吳用布四斗五方旗，宋江排九宮八卦陣迎擊童貫。', 'ch076-jiugong'),
  i('song-jiang-wu-yong-77', 'song-jiang', 'wu-yong', 77, '兩贏童貫', '宋江設十面埋伏，吳用調度兩次擊敗童貫。', 'ch077-liangyingtongguan'),
  i('song-jiang-wu-yong-120', 'song-jiang', 'wu-yong', 120, '蓼兒窪自縊', '宋江死後，吳用與花榮自縊於蓼兒窪。', 'ch120-liaowa'),

  i('song-jiang-lu-jun-yi-61', 'song-jiang', 'lu-jun-yi', 61, '智賺上山', '吳用賺盧俊義上梁山，宋江禮待並請其坐第二把交椅。', 'ch061-lujunyi'),
  i('song-jiang-lu-jun-yi-66', 'song-jiang', 'lu-jun-yi', 66, '智取大名府', '宋江發兵大名府，救出盧俊義、石秀，李固賈氏伏誅。', 'ch066-damingzhi'),
  i('song-jiang-lu-jun-yi-68', 'song-jiang', 'lu-jun-yi', 68, '活捉史文恭', '盧俊義設伏活捉史文恭，為晁蓋報仇。', 'ch068-zengtoushi'),
  i('song-jiang-lu-jun-yi-71', 'song-jiang', 'lu-jun-yi', 71, '英雄排座次', '忠義堂排座次，宋江居首，盧俊義次之。', 'ch071-paizuoci'),
  i('song-jiang-lu-jun-yi-111', 'song-jiang', 'lu-jun-yi', 111, '征討方臘', '宋江、盧俊義分兵渡江南下征方臘。', 'ch111-runzhou'),
  i('song-jiang-lu-jun-yi-120', 'song-jiang', 'lu-jun-yi', 120, '神聚蓼兒窪', '盧俊義先被水銀毒害落水而死，宋江其後飲鴆於楚州。', 'ch120-liaowa'),

  i('wu-song-zhang-qing-27', 'wu-song', 'zhang-qing-caiyuan', 27, '十字坡結義', '武松刺配孟州途經十字坡，識破孫二娘，與張青結為兄弟。', 'ch027-shizipo'),
  i('wu-song-sun-er-niang-27', 'wu-song', 'sun-er-niang', 27, '十字坡結義', '孫二娘與武松交手後結識，夫婦二人助其上路。', 'ch027-shizipo'),
  i('wu-song-zhang-qing-58', 'wu-song', 'zhang-qing-caiyuan', 58, '三山聚義', '張青隨二龍山眾好漢歸梁山。', 'ch058-sanshan'),
  i('wu-song-sun-er-niang-58', 'wu-song', 'sun-er-niang', 58, '三山聚義', '孫二娘隨二龍山眾好漢歸梁山。', 'ch058-sanshan'),
  i('wu-song-zhang-qing-118', 'wu-song', 'zhang-qing-caiyuan', 118, '歙州陣亡', '征方臘時張青陣亡於歙州，孫二娘其後亦戰死。', 'ch118-qingxi'),
  i('wu-song-sun-er-niang-118', 'wu-song', 'sun-er-niang', 118, '歙州陣亡', '孫二娘隨軍征方臘，在歙州一役中陣亡，武松痛失舊交。', 'ch118-qingxi'),

  i('li-kui-zhang-shun-38', 'li-kui', 'zhang-shun', 38, '江中惡鬥', '李逵與張順在潯陽江中惡鬥，經宋江調解結為好友。', 'ch038-daizong'),
  i('li-kui-dai-zong-53', 'li-kui', 'dai-zong', 53, '二請公孫勝', '戴宗帶李逵往薊州請公孫勝，李逵途中闖禍。', 'ch053-gongsunsheng'),
  i('li-kui-yan-qing-73', 'li-kui', 'yan-qing', 73, '壽張同行', '李逵與燕青同往泰安，燕青智撲任原，李逵喬坐衙。', 'ch073-shuangxiantou'),
  i('li-kui-yan-qing-74', 'li-kui', 'yan-qing', 74, '智撲擎天柱', '燕青在泰安州摔倒任原，李逵在壽張縣鬧出笑話。', 'ch074-qingtianzhu'),

  i('shi-xiu-lu-jun-yi-62', 'shi-xiu', 'lu-jun-yi', 62, '劫法場相救', '盧俊義被押赴法場，石秀獨自跳樓劫法場，雖被擒仍義無反顧。', 'ch062-damingjiefa'),
  i('shi-xiu-lu-jun-yi-66', 'shi-xiu', 'lu-jun-yi', 66, '智取大名府', '梁山攻破大名府，石秀與盧俊義同被救出。', 'ch066-damingzhi'),
  i('shi-xiu-lu-jun-yi-118', 'shi-xiu', 'lu-jun-yi', 118, '昱嶺關陣亡', '征方臘時石秀陣亡於昱嶺關。', 'ch118-qingxi'),

  i('wu-song-pan-jin-lian-24', 'wu-song', 'pan-jin-lian', 24, '叔嫂重逢', '武松在陽穀與兄長重逢，潘金蓮見武松英武，心生別念。', 'ch024-wangpo'),
  i('wu-song-pan-jin-lian-25', 'wu-song', 'pan-jin-lian', 25, '毒殺武大郎', '潘金蓮與西門慶、王婆合謀，以藥毒死武大郎。', 'ch025-wudailang'),
  i('wu-song-pan-jin-lian-26', 'wu-song', 'pan-jin-lian', 26, '靈前殺嫂', '武松查得真相，在武大郎靈前殺死潘金蓮。', 'ch026-wuerlang'),
  i('wu-song-xi-men-qing-25', 'wu-song', 'xi-men-qing', 25, '合謀害兄', '西門慶與潘金蓮私通，合謀毒殺武大郎並行賄掩蓋。', 'ch025-wudailang'),
  i('wu-song-xi-men-qing-26', 'wu-song', 'xi-men-qing', 26, '獅子樓鬥殺', '武松在獅子樓與西門慶惡鬥，將其殺死為兄報仇。', 'ch026-wuerlang'),
  i('wu-song-wu-da-lang-23', 'wu-song', 'wu-da-lang', 24, '兄弟重逢', '武松景陽岡打虎後與兄長武大郎在陽穀重逢。', 'ch024-wangpo'),
  i('wu-song-wu-da-lang-25', 'wu-song', 'wu-da-lang', 25, '兄長被害', '武大郎被潘金蓮毒死，武松自此走上報仇之路。', 'ch025-wudailang'),
  i('wu-song-shi-en-28', 'wu-song', 'shi-en', 28, '義奪快活林', '施恩厚待武松，武松醉打蔣門神替其奪回快活林。', 'ch028-kuaihuolin'),
  i('wu-song-jiang-men-shen-29', 'wu-song', 'jiang-men-shen', 29, '醉打蔣門神', '武松在快活林借酒痛打蔣門神，替施恩奪回酒店。', 'ch029-jiangmenshen'),
  i('wu-song-zhang-du-jian-29', 'wu-song', 'zhang-du-jian', 29, '設計陷害', '張都監設宴誣陷武松為賊，將其下獄並欲於飛雲浦加害。', 'ch029-jiangmenshen'),
  i('wu-song-jiang-men-shen-31', 'wu-song', 'jiang-men-shen', 31, '鴛鴦樓被殺', '武松夜入鴛鴦樓，殺張都監、蔣門神等十餘人報仇。', 'ch031-yuanyanglou'),
  i('wu-song-zhang-du-jian-31', 'wu-song', 'zhang-du-jian', 31, '血濺鴛鴦樓', '武松血濺鴛鴦樓，殺死張都監全家。', 'ch031-yuanyanglou'),

  i('lin-chong-lu-qian-7', 'lin-chong', 'lu-qian', 7, '自幼相交', '陸謙與林沖自幼相交，林沖視其為心腹朋友。', 'ch007-baihutang'),
  i('lin-chong-lu-qian-8', 'lin-chong', 'lu-qian', 8, '誘騙林娘子', '陸謙投靠高俅，騙林娘子出門，圖謀陷害林沖。', 'ch008-yezhulin'),
  i('lin-chong-lu-qian-10', 'lin-chong', 'lu-qian', 10, '火燒草料場', '陸謙赴滄州火燒草料場，欲置林沖於死地，反被林沖所殺。', 'ch010-shanshenmiao'),
  i('lin-chong-gao-ya-nei-7', 'lin-chong', 'gao-ya-nei', 7, '調戲林娘子', '高衙內在岳廟前調戲林娘子，遭林沖制止仍不肯罷休。', 'ch007-baihutang'),
  i('lin-chong-gao-ya-nei-8', 'lin-chong', 'gao-ya-nei', 8, '設計誘騙', '高衙內與陸謙合謀，以看刀為名誘林沖入白虎堂。', 'ch008-yezhulin'),

  i('song-jiang-huang-wen-bing-39', 'song-jiang', 'huang-wen-bing', 39, '告發反詩', '黃文炳告發宋江潯陽樓反詩，宋江、戴宗因此被判斬。', 'ch039-xunyanglou'),
  i('song-jiang-huang-wen-bing-41', 'song-jiang', 'huang-wen-bing', 41, '無為軍復仇', '梁山攻入無為軍，張順活捉黃文炳，宋江將其處死。', 'ch041-wuweijun'),
  i('yang-zhi-liang-zhong-shu-13', 'yang-zhi', 'liang-zhong-shu', 13, '大名府賞識', '梁中書賞識楊志武藝，留其在大名府任職。', 'ch013-beijingdouwu'),
  i('yang-zhi-liang-zhong-shu-16', 'yang-zhi', 'liang-zhong-shu', 16, '生辰綱失陷', '楊志押送生辰綱被吳用等人智取，走投無路。', 'ch016-shengchengang'),

  i('chao-gai-song-jiang-18', 'chao-gai', 'song-jiang', 18, '通風報信', '生辰綱事發，宋江先到東溪村通風報信，晁蓋得以及時逃走。', 'ch018-fangchaogai'),
  i('chao-gai-song-jiang-20', 'chao-gai', 'song-jiang', 20, '月夜走劉唐', '晁蓋派劉唐月夜下山，到鄆城答謝宋江、朱仝、雷橫。', 'ch020-zouliutang'),
  i('chao-gai-song-jiang-60', 'chao-gai', 'song-jiang', 60, '曾頭市中箭', '晁蓋親征曾頭市，中史文恭毒箭，傷重身亡，宋江繼任寨主。', 'ch060-zengtoushi'),
  i('chao-gai-wu-yong-14', 'chao-gai', 'wu-yong', 14, '說動聚義', '吳用說動晁蓋，聯絡三阮、公孫勝，共謀生辰綱。', 'ch014-qixing'),
  i('chao-gai-wu-yong-15', 'chao-gai', 'wu-yong', 15, '石碣村說三阮', '吳用到石碣村說動阮氏三雄，齊聚晁蓋莊上。', 'ch015-sanyuan'),
  i('chao-gai-wu-yong-16', 'chao-gai', 'wu-yong', 16, '智取生辰綱', '吳用定計，晁蓋率眾在黃泥岡劫走生辰綱。', 'ch016-shengchengang'),
  i('chao-gai-wu-yong-19', 'chao-gai', 'wu-yong', 19, '入主梁山', '林沖火併王倫，吳用輔佐晁蓋入主梁山。', 'ch019-duopo'),
  i('chao-gai-wu-yong-60', 'chao-gai', 'wu-yong', 60, '晁蓋身亡', '晁蓋中箭身亡，吳用轉而輔佐宋江。', 'ch060-zengtoushi'),

  i('gong-sun-sheng-gao-lian-53', 'gong-sun-sheng', 'gao-lian', 53, '道法對決', '高廉以妖法困梁山軍，戴宗、李逵請公孫勝下山破法。', 'ch053-gongsunsheng'),
  i('gong-sun-sheng-gao-lian-54', 'gong-sun-sheng', 'gao-lian', 54, '破高廉', '公孫勝以道法大破高廉，梁山軍攻破高唐州。', 'ch054-gaolian'),

  i('lu-jun-yi-li-gu-61', 'lu-jun-yi', 'li-gu', 61, '主僕', '李固為盧家管家，受盧俊義信任。', 'ch061-lujunyi'),
  i('lu-jun-yi-li-gu-62', 'lu-jun-yi', 'li-gu', 62, '誣陷奪產', '李固與賈氏私通，誣陷盧俊義私通梁山，圖謀其家產。', 'ch062-damingjiefa'),
  i('lu-jun-yi-li-gu-66', 'lu-jun-yi', 'li-gu', 66, '伏誅', '梁山攻破大名府，李固、賈氏伏誅。', 'ch066-damingzhi'),
  i('lu-jun-yi-jia-shi-61', 'lu-jun-yi', 'jia-shi', 61, '夫妻', '賈氏為盧俊義之妻，留守大名府，後與管家李固私通。', 'ch061-lujunyi'),
  i('lu-jun-yi-jia-shi-62', 'lu-jun-yi', 'jia-shi', 62, '私通李固', '賈氏與李固私通，合謀陷害盧俊義。', 'ch062-damingjiefa'),

  i('hu-san-niang-zhu-biao-47', 'hu-san-niang', 'zhu-biao', 47, '原許婚約', '扈三娘原與祝彪有婚約，祝、扈兩莊因此結盟。', 'ch047-yidazhujia'),
  i('hu-san-niang-zhu-biao-48', 'hu-san-niang', 'zhu-biao', 48, '陣前相見', '梁山二打祝家莊，扈三娘與祝彪同守莊門。', 'ch048-erda'),

  i('guan-sheng-song-jiang-63', 'guan-sheng', 'song-jiang', 63, '奉令征梁山', '關勝奉朝廷之命議取梁山泊，宣贊、郝思文隨行。', 'ch063-damingcheng'),
  i('guan-sheng-song-jiang-64', 'guan-sheng', 'song-jiang', 64, '月夜被擒義釋', '呼延灼詐降賺關勝入伏，宋江義釋，關勝歸順梁山。', 'ch064-guansheng'),
  i('hu-yan-zhuo-song-jiang-55', 'hu-yan-zhuo', 'song-jiang', 55, '連環馬征剿', '高俅興三路兵征梁山，呼延灼以連環馬取勝。', 'ch055-lianhuanma'),
  i('hu-yan-zhuo-song-jiang-57', 'hu-yan-zhuo', 'song-jiang', 57, '鉤鐮槍破陣', '徐寧以鉤鐮槍大破連環馬，呼延灼敗走青州。', 'ch057-polianhuan'),
  i('hu-yan-zhuo-song-jiang-58', 'hu-yan-zhuo', 'song-jiang', 58, '青州歸順', '呼延灼青州兵敗被擒，經宋江義釋歸順梁山。', 'ch058-sanshan'),
  i('qin-ming-song-jiang-34', 'qin-ming', 'song-jiang', 34, '家小被害', '秦明奉命征討清風山被擒，慕容知府殺其家小，秦明被迫歸梁山。', 'ch034-walichang'),
  i('qin-ming-song-jiang-35', 'qin-ming', 'song-jiang', 35, '隨宋江上山', '秦明隨宋江、花榮等一同上梁山。', 'ch035-liangshansheyan'),
  i('hua-rong-qin-ming-34', 'hua-rong', 'qin-ming', 34, '設計擒秦明', '花榮助宋江設伏擒住秦明，勸其歸順。', 'ch034-walichang'),
  i('hua-rong-qin-ming-35', 'hua-rong', 'qin-ming', 35, '同歸梁山', '花榮、秦明經清風寨一戰後同歸梁山，並肩征戰。', 'ch035-liangshansheyan'),

  i('yan-qing-li-shi-shi-72', 'yan-qing', 'li-shi-shi', 72, '東京相識', '燕青在東京與李師師相識，以姊弟相稱。', 'ch072-yuanye'),
  i('yan-qing-li-shi-shi-81', 'yan-qing', 'li-shi-shi', 81, '助見徽宗', '燕青藉李師師引見徽宗，奏明梁山招安之意。', 'ch081-yueye'),
  i('song-jiang-li-shi-shi-72', 'song-jiang', 'li-shi-shi', 72, '招安門路', '宋江在東京結識李師師，藉其門路接觸招安。', 'ch072-yuanye'),
  i('song-jiang-li-shi-shi-81', 'song-jiang', 'li-shi-shi', 81, '月夜見道君', '燕青、戴宗透過李師師安排，梁山下招安之事出現轉機。', 'ch081-yueye'),
  i('song-jiang-su-yuan-jing-81', 'song-jiang', 'su-yuan-jing', 81, '招安橋樑', '宋江透過宿元景等朝臣促成第二次招安。', 'ch081-yueye'),
  i('song-jiang-su-yuan-jing-82', 'song-jiang', 'su-yuan-jing', 82, '全夥受招安', '梁山分金大買市，宋江率一百單八將全夥受招安。', 'ch082-zhaoan'),

  i('song-jiang-fang-la-111', 'song-jiang', 'fang-la', 111, '渡江征討', '宋江奉命征討方臘，張順夜伏金山寺，智取潤州。', 'ch111-runzhou'),
  i('song-jiang-fang-la-114', 'song-jiang', 'fang-la', 114, '杭州之戰', '宋江在杭州弔孝，張順夜探湧金門陣亡。', 'ch114-zhangshun'),
  i('song-jiang-fang-la-118', 'song-jiang', 'fang-la', 118, '清溪洞', '宋江智取清溪洞，方臘最後據點被攻破。', 'ch118-qingxi'),
  i('song-jiang-tian-hu-91', 'song-jiang', 'tian-hu', 91, '兵渡黃河', '宋江兵渡黃河征討田虎，盧俊義黑夜賺城。', 'ch091-huanghe'),
  i('song-jiang-tian-hu-98', 'song-jiang', 'tian-hu', 98, '張清配瓊英', '張清與瓊英結為夫婦，吳用設計鴆殺鄔梨。', 'ch098-qiongying'),
  i('song-jiang-tian-hu-100', 'song-jiang', 'tian-hu', 100, '宋江奏捷', '田虎之亂平定，宋江、盧俊義回師東京。', 'ch100-zoujie'),
  i('song-jiang-wang-qing-105', 'song-jiang', 'wang-qing', 105, '避暑療軍', '宋江避暑療軍，梁山軍南下征討王慶，首戰告捷。', 'ch105-bishu'),
  i('song-jiang-wang-qing-109', 'song-jiang', 'wang-qing', 109, '王慶被捉', '王慶渡江被捉，宋江剿寇成功，淮西平定。', 'ch109-wangqing-zhua'),

  i('li-kui-li-gui-43', 'li-kui', 'li-gui', 43, '假冒剪徑', '李鬼冒充李逵在沂嶺剪徑，被李逵識破殺死。', 'ch043-yiling'),
  i('li-kui-luo-zhen-ren-53', 'li-kui', 'luo-zhen-ren', 53, '斧劈羅真人', '李逵獨劈羅真人，惹出禍端，險些壞了請公孫勝之事。', 'ch053-gongsunsheng'),
  i('li-kui-zhu-tong-51', 'li-kui', 'zhu-tong', 51, '殺小衙內', '吳用、李逵設計逼朱仝上山，李逵殺死小衙內。', 'ch051-xiaoyanei'),
  i('li-kui-chai-jin-52', 'li-kui', 'chai-jin', 52, '打死殷天錫', '李逵打死殷天錫，柴進因此被高廉下獄。', 'ch052-gaotang'),
  i('li-kui-chai-jin-54', 'li-kui', 'chai-jin', 54, '下井救柴進', '高唐州破後，李逵下井救出柴進。', 'ch054-gaolian'),

  i('zhang-shun-an-dao-quan-65', 'zhang-shun', 'an-dao-quan', 65, '請神醫上山', '宋江背疽發作，張順奉命請安道全上梁山醫治。', 'ch065-zhangshun'),
  i('yan-qing-ren-yuan-74', 'yan-qing', 'ren-yuan', 74, '智撲擎天柱', '燕青在泰安州擂台上摔倒任原，名震江湖。', 'ch074-qingtianzhu'),

  i('shi-xiu-pan-qiao-yun-45', 'shi-xiu', 'pan-qiao-yun', 45, '識破姦情', '石秀識破潘巧雲與裴如海私通，並在翠屏山與其對質。', 'ch045-cuipingshan'),
  i('yang-xiong-pan-qiao-yun-44', 'yang-xiong', 'pan-qiao-yun', 44, '夫妻', '潘巧雲為楊雄之妻，卻與報恩寺僧裴如海私通。', 'ch044-yinmachuan'),
  i('yang-xiong-pan-qiao-yun-45', 'yang-xiong', 'pan-qiao-yun', 45, '翠屏山殺妻', '石秀識破姦情，楊雄在翠屏山質問潘巧雲後將其殺害。', 'ch045-cuipingshan'),

  i('wang-po-pan-jin-lian-24', 'wang-po', 'pan-jin-lian', 24, '牽線設局', '王婆貪賄，為潘金蓮與西門慶牽線。', 'ch024-wangpo'),
  i('wang-po-pan-jin-lian-25', 'wang-po', 'pan-jin-lian', 25, '毒計害命', '王婆設下毒計，教潘金蓮以藥毒死武大郎。', 'ch025-wudailang'),
  i('wang-po-xi-men-qing-24', 'wang-po', 'xi-men-qing', 24, '茶坊撮合', '王婆替西門慶撮合潘金蓮，並從中取利。', 'ch024-wangpo'),
  i('huang-wen-bing-cai-jiu-39', 'huang-wen-bing', 'cai-jiu', 39, '通判告密', '黃文炳向蔡九知府告發宋江反詩，宋江、戴宗被判斬。', 'ch039-xunyanglou'),

  i('chai-jin-gao-lian-52', 'chai-jin', 'gao-lian', 52, '陷害下獄', '高廉偏袒殷天錫，將柴進下獄，梁山發兵高唐州。', 'ch052-gaotang'),
  i('chai-jin-yin-tian-xi-52', 'chai-jin', 'yin-tian-xi', 52, '強佔莊園', '殷天錫倚仗高廉權勢強佔柴進莊園。', 'ch052-gaotang'),
  i('lei-heng-bai-xiu-ying-51', 'lei-heng', 'bai-xiu-ying', 51, '打死白秀英', '白秀英辱罵雷橫之母，雷橫一怒將其打死。', 'ch051-xiaoyanei'),
  i('zhu-tong-xiao-ya-nei-51', 'zhu-tong', 'xiao-ya-nei', 51, '看顧小衙內', '朱仝被刺配滄州後看顧知府之子小衙內。', 'ch051-xiaoyanei'),

  i('chao-gai-shi-wen-gong-60', 'chao-gai', 'shi-wen-gong', 60, '毒箭之仇', '晁蓋親征曾頭市，中史文恭毒箭，傷重身亡。', 'ch060-zengtoushi'),
  i('lu-jun-yi-shi-wen-gong-68', 'lu-jun-yi', 'shi-wen-gong', 68, '活捉報仇', '盧俊義設伏活捉史文恭，為晁蓋報仇。', 'ch068-zengtoushi'),
  i('zeng-nong-shi-wen-gong-60', 'zeng-nong', 'shi-wen-gong', 60, '收留教師', '曾弄收留史文恭為曾頭市教師，倚其抵禦梁山。', 'ch060-zengtoushi'),
  i('sun-li-luan-ting-yu-49', 'sun-li', 'luan-ting-yu', 49, '同門師兄弟', '孫立與欒廷玉同門學藝，孫立藉此混入祝家莊為內應。', 'ch049-dengzhou'),
  i('song-jiang-zhu-chao-feng-47', 'song-jiang', 'zhu-chao-feng', 47, '一打祝家莊', '宋江親征祝家莊，首戰因不熟盤陀路失利。', 'ch047-yidazhujia'),
  i('song-jiang-zhu-chao-feng-50', 'song-jiang', 'zhu-chao-feng', 50, '三打祝家莊', '孫立等為內應，梁山裡應外合攻破祝家莊。', 'ch050-sandazhujia'),

  i('gao-qiu-song-jiang-78', 'gao-qiu', 'song-jiang', 78, '一敗高太尉', '高俅親率十節度使征梁山，宋江、吳用調度兵馬，官軍初戰失利。', 'ch078-yibaidagao'),
  i('gao-qiu-song-jiang-79', 'gao-qiu', 'song-jiang', 79, '火燒戰船', '劉唐火燒官軍戰船，宋江兩敗高太尉。', 'ch079-huo-shaochuan'),
  i('gao-qiu-song-jiang-80', 'gao-qiu', 'song-jiang', 80, '三敗高太尉', '張順鑿漏海鰍船，宋江三敗高太尉，高俅被擒上梁山。', 'ch080-sanbaigao'),

]

export const interactionById = Object.fromEntries(
  interactions.map((interaction) => [interaction.id, interaction]),
)

export function interactionsForPair(a: string, b: string): Interaction[] {
  return interactions
    .filter(
      (interaction) =>
        (interaction.a === a && interaction.b === b) ||
        (interaction.a === b && interaction.b === a),
    )
    .sort((left, right) => left.chapter - right.chapter)
}

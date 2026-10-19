import type { Achievement } from './types'

// 人工策展的「重大事蹟」：只收錄光彩功績（戰功、義舉、封賞、稱號），
// 不含敗績、被擒、上山過程等。以敘述句呈現。
// 未收錄者由 figureProfile 依事件資料推導（僅取正面事蹟）。
export const achievements: Record<string, Achievement[]> = {
  'song-jiang': [
    { id: 'sj1', chapter: 18, text: '任鄆城縣押司時暗通消息，私放劫取生辰綱的晁蓋，江湖義名自此遠播。', eventId: 'ch018-fangchaogai' },
    { id: 'sj2', chapter: 40, text: '潯陽樓醉題反詩下獄，梁山好漢劫法場相救，自此聚義梁山。', eventId: 'ch040-jiefachang' },
    { id: 'sj3', chapter: 42, text: '還道村親受九天玄女三卷天書，得「替天行道」之旨。', eventId: 'ch042-huandaocun' },
    { id: 'sj4', chapter: 71, text: '忠義堂石碣排座次位居第一，統領一百單八將，兩贏童貫、三敗高俅。', eventId: 'ch071-paizuoci' },
    { id: 'sj5', chapter: 82, text: '促成朝廷招安，率全夥北征遼國、平定田虎、王慶、方臘，官授楚州安撫使。', eventId: 'ch082-zhaoan' },
  ],
  'lu-jun-yi': [
    { id: 'ljy1', chapter: 61, text: '大名府富戶，棍棒天下無對，人稱「玉麒麟」。', eventId: 'ch061-lujunyi' },
    { id: 'ljy2', chapter: 68, text: '曾頭市陣前活捉射殺晁蓋的史文恭，威震梁山。', eventId: 'ch068-zengtoushi' },
    { id: 'ljy3', chapter: 71, text: '排座次居第二，征遼平寇屢為先鋒，官授廬州安撫使。', eventId: 'ch071-paizuoci' },
  ],
  'wu-yong': [
    { id: 'wy1', chapter: 16, text: '黃泥岡上定計，智取楊志押運的不義生辰綱。', eventId: 'ch016-shengchengang' },
    { id: 'wy2', chapter: 66, text: '裡應外合智取大名府，救出盧俊義、石秀。', eventId: 'ch066-damingzhi' },
    { id: 'wy3', chapter: 77, text: '運籌帷幄，兩贏童貫、三敗高俅，人稱「智多星」。', eventId: 'ch077-liangyingtongguan' },
  ],
  'gong-sun-sheng': [
    { id: 'gss1', chapter: 16, text: '應七星聚義，共劫生辰綱。', eventId: 'ch016-shengchengang' },
    { id: 'gss2', chapter: 53, text: '二仙山受請下山，以道法破高唐州高廉妖術。', eventId: 'ch053-gongsunsheng' },
    { id: 'gss3', chapter: 110, text: '征方臘後功成身退，歸隱二仙山學道，得善終。' },
  ],
  'guan-sheng': [
    { id: 'gs1', chapter: 64, text: '大刀關勝奉詔征梁山，連敗梁山諸將，威震一時。', eventId: 'ch064-guansheng' },
    { id: 'gs2', chapter: 71, text: '歸順後位居馬軍五虎將之首，征戰屢為先鋒。', eventId: 'ch071-paizuoci' },
  ],
  'lin-chong': [
    { id: 'lc1', chapter: 7, text: '東京八十萬禁軍槍棒教頭，人稱「豹子頭」。', eventId: 'ch007-baihutang' },
    { id: 'lc2', chapter: 10, text: '風雪山神廟前誅陸謙等三人，手刃仇讎，快意恩仇。', eventId: 'ch010-shanshenmiao' },
    { id: 'lc3', chapter: 19, text: '火併王倫，推晁蓋為梁山之主，開梁山新局面。', eventId: 'ch019-duopo' },
    { id: 'lc4', chapter: 48, text: '祝家莊陣前活捉「一丈青」扈三娘，居功至偉。', eventId: 'ch048-erda' },
  ],
  'qin-ming': [
    { id: 'qm1', chapter: 34, text: '青州兵馬統制，性如烈火，人稱「霹靂火」。', eventId: 'ch034-walichang' },
    { id: 'qm2', chapter: 48, text: '征祝家莊，一棍搠宣贊下馬，陣前立功。', eventId: 'ch048-erda' },
  ],
  'hu-yan-zhuo': [
    { id: 'hyz1', chapter: 55, text: '以連環馬連敗梁山，一時無敵。', eventId: 'ch055-lianhuanma' },
    { id: 'hyz2', chapter: 71, text: '歸梁山後位居馬軍五虎將，征遼平寇多建戰功。', eventId: 'ch071-paizuoci' },
  ],
  'hua-rong': [
    { id: 'hr1', chapter: 33, text: '清風寨知寨，箭術神準，人稱「小李廣」。', eventId: 'ch033-qingfengzhai' },
    { id: 'hr2', chapter: 35, text: '梁山射雁，一箭射落雁行第三隻，眾人歎服。', eventId: 'ch035-liangshansheyan' },
    { id: 'hr3', chapter: 117, text: '睦州之戰箭射方臘國師鄧元覺，陣前立功。', eventId: 'ch117-muzhou' },
  ],
  'chai-jin': [
    { id: 'cj1', chapter: 9, text: '後周皇裔，仗義疏財，人稱「小旋風」，廣納江湖豪傑。', eventId: 'ch009-hongjiaotou' },
    { id: 'cj2', chapter: 54, text: '陷高唐州死牢，梁山發兵相救，得脫大難，後掌梁山錢糧。', eventId: 'ch054-gaolian' },
  ],
  'li-ying': [
    { id: 'ly1', chapter: 47, text: '獨龍岡李應莊主，身手矯捷，人稱「撲天雕」。', eventId: 'ch047-yidazhujia' },
    { id: 'ly2', chapter: 50, text: '祝家莊之戰中立功，後總管梁山錢糧。', eventId: 'ch050-sandazhujia' },
  ],
  'zhu-tong': [
    { id: 'zt1', chapter: 13, text: '鄆城縣馬兵都頭，美鬚髯，人稱「美髯公」。', eventId: 'ch013-beijingdouwu' },
    { id: 'zt2', chapter: 51, text: '義釋雷橫，代其受過刺配滄州；後隨梁山，征戰有功。', eventId: 'ch051-xiaoyanei' },
  ],
  'lu-zhi-shen': [
    { id: 'lzs1', chapter: 3, text: '渭州三拳打死強佔民女的鎮關西鄭屠，義救金翠蓮父女。', eventId: 'ch003-zhenguanxi' },
    { id: 'lzs2', chapter: 7, text: '大相國寺菜園倒拔垂楊柳，威懾眾潑皮。', eventId: 'ch007-baihutang' },
    { id: 'lzs3', chapter: 8, text: '野豬林救下刺配途中的林沖，義薄雲天。', eventId: 'ch008-yezhulin' },
    { id: 'lzs4', chapter: 119, text: '生擒方臘，於杭州六和寺聽潮信而悟，沐浴坐化。', eventId: 'ch119-zuohua' },
  ],
  'wu-song': [
    { id: 'ws1', chapter: 23, text: '景陽岡上赤手打死吊睛白額虎，名震陽穀，得授步兵都頭。', eventId: 'ch023-jingyanggang' },
    { id: 'ws2', chapter: 29, text: '快活林醉打蔣門神，替施恩奪回酒店。', eventId: 'ch029-jiangmenshen' },
    { id: 'ws3', chapter: 31, text: '血濺鴛鴦樓，誅張都監、蔣門神等，快意恩仇。', eventId: 'ch031-yuanyanglou' },
    { id: 'ws4', chapter: 119, text: '征方臘斷臂，於六和寺出家，八十善終。', eventId: 'ch119-zuohua' },
  ],
  'dong-ping': [
    { id: 'dp1', chapter: 69, text: '東平府兵馬都監，雙槍出神入化，人稱「雙槍將」。', eventId: 'ch069-dongping' },
    { id: 'dp2', chapter: 69, text: '義釋歸梁山，居馬軍五虎將，征遼平寇屢建奇功。', eventId: 'ch069-dongping' },
  ],
  'zhang-qing': [
    { id: 'zq1', chapter: 70, text: '東昌府將，飛石百發百中，人稱「沒羽箭」，連打梁山十五員大將。', eventId: 'ch070-zhangqing' },
    { id: 'zq2', chapter: 70, text: '歸順後居馬軍八驃騎，征戰多立功勳。', eventId: 'ch070-zhangqing' },
  ],
  'yang-zhi': [
    { id: 'yz1', chapter: 12, text: '三代將門之後，武藝高強，人稱「青面獸」。', eventId: 'ch012-shangliangshan' },
    { id: 'yz2', chapter: 16, text: '押運生辰綱雖遭智取，然其謹慎勇武為江湖所重。', eventId: 'ch016-shengchengang' },
    { id: 'yz3', chapter: 58, text: '隨二龍山歸梁山，征遼平寇屢為先鋒。', eventId: 'ch058-sanshan' },
  ],
  'xu-ning': [
    { id: 'xn1', chapter: 56, text: '東京金槍班教師，鉤鐮槍法獨步，人稱「金槍手」。', eventId: 'ch056-daoxujia' },
    { id: 'xn2', chapter: 57, text: '傳授鉤鐮槍法，大破呼延灼連環馬。', eventId: 'ch057-polianhuan' },
  ],
  'suo-chao': [
    { id: 'sc1', chapter: 13, text: '大名府急先鋒，性急勇猛，人稱「急先鋒」。', eventId: 'ch013-beijingdouwu' },
    { id: 'sc2', chapter: 65, text: '歸順梁山後隨軍征戰，屢為先鋒陷陣。', eventId: 'ch065-zhangshun' },
  ],
  'dai-zong': [
    { id: 'dz1', chapter: 38, text: '江州兩院押牢節級，神行法日行八百里，人稱「神行太保」。', eventId: 'ch038-daizong' },
    { id: 'dz2', chapter: 81, text: '定計請出樂和，助燕青夜見徽宗，促成招安。', eventId: 'ch081-yueye' },
  ],
  'liu-tang': [
    { id: 'lt1', chapter: 13, text: '赤髮黃鬚，勇悍過人，人稱「赤髮鬼」。', eventId: 'ch013-beijingdouwu' },
    { id: 'lt2', chapter: 16, text: '參與智取生辰綱，為七星之一。', eventId: 'ch016-shengchengang' },
    { id: 'lt3', chapter: 57, text: '陣前拿得韓滔綁縛解寨，征戰有功。', eventId: 'ch057-polianhuan' },
  ],
  'li-kui': [
    { id: 'lk1', chapter: 40, text: '江州劫法場中率先跳樓殺入，救出宋江、戴宗。', eventId: 'ch040-jiefachang' },
    { id: 'lk2', chapter: 43, text: '沂嶺怒殺子母四虎，為母報仇。', eventId: 'ch043-yiling' },
    { id: 'lk3', chapter: 75, text: '扯碎招安詔書、怒罵陳太尉，攪亂第一次招安。', eventId: 'ch075-chaozhao' },
  ],
  'shi-jin': [
    { id: 'sjj1', chapter: 2, text: '史家莊少莊主，得王進傳授槍棒，一身九龍刺青，人稱「九紋龍」。', eventId: 'ch002-shijia' },
    { id: 'sjj2', chapter: 2, text: '大鬧史家村，與少華山朱武等結義。', eventId: 'ch002-shijia' },
    { id: 'sjj3', chapter: 59, text: '陷華州死牢，梁山發兵相救，共破華州。', eventId: 'ch059-huashan' },
  ],
  'mu-hong': [
    { id: 'mh1', chapter: 37, text: '揭陽鎮豪強，人稱「沒遮攔」。', eventId: 'ch037-xunyangjiang' },
    { id: 'mh2', chapter: 41, text: '隨眾劫法場、智取無為軍，為江州派系要角。', eventId: 'ch041-wuweijun' },
  ],
  'lei-heng': [
    { id: 'lh1', chapter: 13, text: '鄆城縣步兵都頭，膂力過人，能跳二三丈澗，人稱「插翅虎」。', eventId: 'ch013-beijingdouwu' },
    { id: 'lh2', chapter: 50, text: '隨宋江征祝家莊，陣前立功。', eventId: 'ch050-sandazhujia' },
  ],
  'li-jun': [
    { id: 'lj1', chapter: 36, text: '潯陽江艄公，水性精熟，人稱「混江龍」。', eventId: 'ch036-jieyang' },
    { id: 'lj2', chapter: 80, text: '水戰三敗高俅，鑿漏海鰍船，大建奇功。', eventId: 'ch080-sanbaigao' },
    { id: 'lj3', chapter: 119, text: '征方臘後揚帆出海，後為暹羅國主。' },
  ],
  'ruan-xiao-er': [
    { id: 'rxe1', chapter: 15, text: '石碣村漁戶，阮氏三雄之長，人稱「立地太歲」。', eventId: 'ch015-sanyuan' },
    { id: 'rxe2', chapter: 19, text: '水泊全殲官軍，活捉黃安，揚威水寨。', eventId: 'ch019-duopo' },
  ],
  'zhang-heng': [
    { id: 'zh1', chapter: 37, text: '潯陽江上撐船擺渡、專劫商旅，人稱「船火兒」。', eventId: 'ch037-xunyangjiang' },
    { id: 'zh2', chapter: 58, text: '隨二龍山歸梁山，充水軍頭領。', eventId: 'ch058-sanshan' },
  ],
  'ruan-xiao-wu': [
    { id: 'rxw1', chapter: 15, text: '石碣村阮氏三雄之一，人稱「短命二郎」。', eventId: 'ch015-sanyuan' },
    { id: 'rxw2', chapter: 16, text: '參與智取生辰綱。', eventId: 'ch016-shengchengang' },
  ],
  'zhang-shun': [
    { id: 'zs1', chapter: 38, text: '潯陽江水中制服黑旋風李逵，人稱「浪裡白條」。', eventId: 'ch038-daizong' },
    { id: 'zs2', chapter: 41, text: '水底活捉黃文炳，為宋江報仇。', eventId: 'ch041-wuweijun' },
    { id: 'zs3', chapter: 80, text: '鑿漏海鰍船，三敗高俅水軍，功勳卓著。', eventId: 'ch080-sanbaigao' },
  ],
  'ruan-xiao-qi': [
    { id: 'rxq1', chapter: 15, text: '石碣村阮氏三雄之幼，人稱「活閻羅」。', eventId: 'ch015-sanyuan' },
    { id: 'rxq2', chapter: 75, text: '偷換御酒，攪亂朝廷第一次招安。', eventId: 'ch075-chaozhao' },
    { id: 'rxq3', chapter: 70, text: '陣前擒獲沒羽箭張清，繩纏索綁送入寨中。', eventId: 'ch070-zhangqing' },
  ],
  'yang-xiong': [
    { id: 'yx1', chapter: 44, text: '薊州兩院押獄，面色微黃，人稱「病關索」。', eventId: 'ch044-yinmachuan' },
    { id: 'yx2', chapter: 45, text: '翠屏山誅姦夫淫婦，與石秀同上梁山。', eventId: 'ch045-cuipingshan' },
  ],
  'shi-xiu': [
    { id: 'sx1', chapter: 44, text: '金陵建康府人，精細驍勇，人稱「拼命三郎」。', eventId: 'ch044-yinmachuan' },
    { id: 'sx2', chapter: 45, text: '識破姦情，翠屏山助楊雄誅淫婦惡僧。', eventId: 'ch045-cuipingshan' },
    { id: 'sx3', chapter: 62, text: '大名府孤身劫法場救盧俊義，雖寡不敵眾而義名遠播。', eventId: 'ch062-damingjiefa' },
  ],
  'jie-zhen': [
    { id: 'jz1', chapter: 49, text: '登州獵戶，翻山越嶺如飛，人稱「兩頭蛇」。', eventId: 'ch049-dengzhou' },
    { id: 'jz2', chapter: 50, text: '登州劫牢反獄，隨孫立歸梁山。', eventId: 'ch050-sandazhujia' },
  ],
  'jie-bao': [
    { id: 'jb1', chapter: 49, text: '登州獵戶，解珍之弟，人稱「雙尾蠍」。', eventId: 'ch049-dengzhou' },
    { id: 'jb2', chapter: 50, text: '登州劫牢反獄，隨眾歸梁山。', eventId: 'ch050-sandazhujia' },
  ],
  'yan-qing': [
    { id: 'yq1', chapter: 62, text: '盧俊義親隨，相撲天下無對，人稱「浪子燕青」。', eventId: 'ch062-damingjiefa' },
    { id: 'yq2', chapter: 74, text: '泰安州擂台智撲擎天柱任原，名動江湖。', eventId: 'ch074-qingtianzhu' },
    { id: 'yq3', chapter: 81, text: '月夜進見道君皇帝，成就招安大計，功成後隱退。', eventId: 'ch081-yueye' },
  ],
  'zhu-wu': [
    { id: 'zw1', chapter: 2, text: '少華山首領，精通陣法，人稱「神機軍師」。', eventId: 'ch002-shijia' },
    { id: 'zw2', chapter: 59, text: '歸梁山後掌軍務，征方臘屢獻良策。', eventId: 'ch059-huashan' },
  ],
  'huang-xin': [
    { id: 'hxi1', chapter: 33, text: '青州兵馬都監，人稱「鎮三山」。', eventId: 'ch033-qingfengzhai' },
    { id: 'hxi2', chapter: 58, text: '歸梁山後征戰有功。', eventId: 'ch058-sanshan' },
  ],
  'sun-li': [
    { id: 'sl1', chapter: 49, text: '登州兵馬提轄，鋼鞭神勇，人稱「病尉遲」。', eventId: 'ch049-dengzhou' },
    { id: 'sl2', chapter: 50, text: '祝家莊之戰裡應外合，為破莊立功。', eventId: 'ch050-sandazhujia' },
  ],
  'xiao-rang': [
    { id: 'xr1', chapter: 39, text: '濟州書生，善摹天下字體，人稱「聖手書生」。', eventId: 'ch039-xunyanglou' },
    { id: 'xr2', chapter: 39, text: '為梁山偽造蔡京文書，行計救宋江。', eventId: 'ch039-xunyanglou' },
  ],
  'an-dao-quan': [
    { id: 'adq1', chapter: 65, text: '建康府神醫，妙手回春，人稱「神醫」。', eventId: 'ch065-zhangshun' },
    { id: 'adq2', chapter: 65, text: '張順請其上山醫治宋江背疾，後隨軍療傷。', eventId: 'ch065-zhangshun' },
  ],
  'jin-da-jian': [
    { id: 'jdj1', chapter: 39, text: '金石雕刻名家，人稱「玉臂匠」。', eventId: 'ch039-xunyanglou' },
    { id: 'jdj2', chapter: 39, text: '為梁山刻蔡京圖書印信，助成救宋江之計。', eventId: 'ch039-xunyanglou' },
  ],
  'shi-qian': [
    { id: 'sq1', chapter: 46, text: '身手矯捷、飛簷走壁，人稱「鼓上蚤」。', eventId: 'ch046-zhujiadian' },
    { id: 'sq2', chapter: 56, text: '盜取雁翎圈金甲，賺徐寧上梁山。', eventId: 'ch056-daoxujia' },
  ],
  'chen-da': [
    { id: 'cd1', chapter: 2, text: '少華山三頭領，人稱「跳澗虎」。', eventId: 'ch002-shijia' },
    { id: 'cd2', chapter: 2, text: '攻打史家莊與史進交手，雖敗猶顯勇武，後結義同歸梁山。', eventId: 'ch002-shijia' },
  ],
  'zheng-tian-shou': [
    { id: 'zts1', chapter: 32, text: '清風山頭領，人稱「白面郎君」。', eventId: 'ch032-kongliang' },
    { id: 'zts2', chapter: 35, text: '隨清風山眾歸梁山。', eventId: 'ch035-liangshansheyan' },
  ],
  'wang-ying': [
    { id: 'wyy1', chapter: 32, text: '清風山頭領，身材短小，人稱「矮腳虎」。', eventId: 'ch032-kongliang' },
    { id: 'wyy2', chapter: 55, text: '征連環馬、祝家莊等役隨軍，後與扈三娘成婚。', eventId: 'ch055-lianhuanma' },
  ],
  'fan-rui': [
    { id: 'fr1', chapter: 59, text: '芒碭山首領，善使妖法，人稱「混世魔王」。', eventId: 'ch059-huashan' },
    { id: 'fr2', chapter: 60, text: '為公孫勝降服，歸梁山。', eventId: 'ch060-zengtoushi' },
  ],
  'hu-san-niang': [
    { id: 'hsn1', chapter: 48, text: '扈家莊女將，紅錦套索神技，人稱「一丈青」。', eventId: 'ch048-erda' },
    { id: 'hsn2', chapter: 48, text: '陣前活捉矮腳虎王英，威震祝家莊。', eventId: 'ch048-erda' },
    { id: 'hsn3', chapter: 55, text: '以套索拖彭玘下馬，屢建戰功。', eventId: 'ch055-lianhuanma' },
  ],
  'sun-er-niang': [
    { id: 'sen1', chapter: 27, text: '十字坡開黑店，膽識過人，人稱「母夜叉」。', eventId: 'ch027-shizipo' },
    { id: 'sen2', chapter: 27, text: '十字坡交手武松，女中豪傑；後隨夫張青歸梁山。', eventId: 'ch027-shizipo' },
  ],
  'gu-da-sao': [
    { id: 'gds1', chapter: 49, text: '登州豪傑，性烈膽壯，人稱「母大蟲」。', eventId: 'ch049-dengzhou' },
    { id: 'gds2', chapter: 50, text: '策動登州劫牢，隨眾歸梁山。', eventId: 'ch050-sandazhujia' },
  ],
  'duan-jing-zhu': [
    { id: 'djz1', chapter: 60, text: '涿州盜馬賊，相馬如神，人稱「金毛犬」。', eventId: 'ch060-zengtoushi' },
    { id: 'djz2', chapter: 60, text: '盜得照夜玉獅子馬獻梁山，引發曾頭市之戰。', eventId: 'ch060-zengtoushi' },
  ],
}

export function achievementsFor(id: string): Achievement[] {
  return achievements[id] ?? []
}

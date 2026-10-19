# 水滸輿圖

以《水滸傳》一百二十回為時間軸的互動文學地圖。主畫面為北宋、遼、西夏形勢的宋代風格示意圖，可瀏覽章回事件與一百單八將的位置。

## 功能

- **章回事件**：120 回時間軸；每一回至少一個事件；點事件在地圖上定位、高亮地點與小說行程。
- **好漢行蹤**：同一條時間軸；108 位好漢依章回錨點定位；聚合標記、所在分組、個人行蹤軌跡、明載／推定區分。
 - **人物關係**：以具體劇情為據的節點關係圖，收錄好漢與主要非好漢角色；每條關係標註類型與劇情說明，並分成多個章回階段。全覽看陣營群像，點人物進入一度或二度聚焦；聚焦時點外圍人物，會列出兩人之間的重要互動事件，再可跳轉以對方為中心。底部時間軸可看關係的成立、轉變與結束。
- **英雄榜**：多種排行榜（官職高低、座次、登場早晚、出場回數、互動數、被俘虜、打架勝負、明載殺人記錄、戰役參與與勝負）。左側分類可擴充；每榜標明統計方式與可靠度（高／中／低），點人物查看統計來源（章回＋原文），可跳轉章回事件。
- **人物誌**：左側人物選單（天罡／地煞／其他角色），擇一呈現其畫像、身分、生平、重大事蹟與完整編年。事蹟彙整自章回事件、互動、擒縱、單挑、殺伐、戰役與關係，並輔以人工策展重點；系統自動標舉「重大事蹟」（生涯高光）並保留全部「編年事蹟」，可依類型篩選，每條附出處並可跳轉章回。畫像可切換多個公版古本版本，無公版者以名號印記示意。
- **地名考證**：州府治所、縣鎮、山寨、虛構地名與小說錯置分別標示，地點卡可查看說明。
- **圖層開關**：圖例視窗可逐項勾選京城、州府、縣鎮、山岳、水泊、關隘、寺廟、河流、湖泊、行政區界（今省界示意）、好漢、小說行程、好漢行蹤與地名標籤。
- **可捲動時間軸**：120 回以可橫向捲動／拖拽的畫布呈現，字級放大後仍可瀏覽全書脈絡。
- **可分享網址**：`/story?chapter=39&event=ch039-xunyanglou`、`/heroes?chapter=114&hero=zhang-shun`、`/relations?chapter=50&figure=hu-san-niang`、`/rankings?list=captured&figure=li-kui`、`/biographies?figure=wu-song`。
- 響應式版面、鍵盤操作、`prefers-reduced-motion`、可縮放／平移的 SVG 地圖。

## 技術

- React 19 + TypeScript + Vite
- D3（`d3-geo`、`d3-zoom`、`d3-shape`）繪製 SVG 地圖
- Zustand 狀態管理、React Router
- Vitest 資料驗證
- 自架 Noto Serif TC／Noto Sans TC 子集字體（SIL OFL）

沒有後端、沒有外部圖磚；所有資料隨靜態 bundle 載入。

## 開發

```bash
npm install
npm run dev
npm run test
npm run typecheck
npm run build
```

`npm run validate:data` 會檢查章回覆蓋、108 人座次、地點與人物參照、座標範圍、章回錨點，以及關係端點、階段章回是否重疊、出處事件。

### 英雄榜資料抽取（開發期）

英雄榜中「被俘虜、打架勝負、明載殺人記錄、戰役」等來自全書文本的抽取結果。流程（需網路，非建置必需）：

```bash
npm run fetch:text      # 由維基文庫抓《水滸傳 (120回本)》120 回至 .cache/（已 gitignore）
npm run extract:deeds   # 去標記、關鍵詞掃描，產出候選 .cache/shuihu/cand-*.jsonl
npm run build:deeds     # 由 data/deeds/*.jsonl 產生 src/data/deeds.ts
```

`data/deeds/*.jsonl` 為人工校訂後的抽取結果（進版控），`src/data/deeds.ts` 為自動生成檔，請勿手改。抽取為關鍵詞命中後人工校訂，非全量，結果標為可靠度低。

### 人物畫像（公版）

人物誌畫像取自公有領域古本，下載、裁切與縮圖後存放於 `public/portraits/`（進版控）：

```bash
npm run fetch:portraits   # 依 data/portraits/manifest.json 下載公版圖像至 public/portraits/
npm run build:portraits   # 由 data/portraits/manifest.json 產生 src/data/portraits.ts
```

`data/portraits/manifest.json` 記錄每位人物各版本的畫家、年代、授權與出處；`src/data/portraits.ts` 為自動生成檔，請勿手改。無公版畫像者於前端以名號印記示意。

## 資料結構

- `src/data/places.ts`：地點、今地、經緯度、精度、考證 note。
- `src/data/chapters.ts`：120 回回目與所屬段落。
- `src/data/events.ts`：章回事件、地點、人物、路線。
- `src/data/heroes.ts`：108 人座次、星號、綽號、初登場／入山／結局。
- `src/data/heroPositions.ts`：章回錨點、征戰階段推定、位置解析。
- `src/data/characters.ts`：好漢之外的主要角色（朝廷、祝家莊、曾頭市、方臘等）。
- `src/data/relations.ts`：人物關係與其章回階段；每段含關係類型、線標、劇情摘要、出處事件與明載／推定。
- `src/data/interactions.ts`：兩人之間的重要互動事件；同一對人物可有多則，依章回排序，供關係圖的兩人面板顯示。
- `data/deeds/*.jsonl`：全書抽取的英雄榜事實（被俘虜、單挑勝負、殺人記錄、戰役結果），每條附章回與原文；`src/data/deeds.ts` 為其自動生成檔。
- `src/data/rankings.ts`：人工策展榜單（官職高低）與榜單分類。其餘榜單由 `src/lib/rankings.ts` 從事件、互動與 deeds 即時推導。
- `src/data/bios.ts`：人物誌的人工策展重點事蹟；`src/lib/figureProfile.ts` 彙整單人畫像以外的全部事蹟。
- `data/portraits/manifest.json`：人物畫像的公版來源（畫家、年代、授權、出處）；`src/data/portraits.ts` 為其自動生成檔，`public/portraits/` 存放下載縮圖。
- `src/data/map/`：底圖 GeoJSON（Natural Earth 裁切）、手繪河流／湖泊／疆界／標籤。

事件摘要、人物關係與地圖整理為本專案原創內容；回目為公有領域文本。好漢位置不是逐日行程：書中明載與推定會分開標示，未出場、陣亡、行蹤未載不上圖。人物關係只收錄有具體劇情描述者，同場出戰、同營共事不列；現已涵蓋一百單八將與主要非好漢角色，細節關係仍持續增補。

## 地名精度

- 州府、縣治：依宋代治所對應今地經緯度定位。
- 山寨、莊院、渡口：依小說敘述與地方考證取近似位置。
- 虛構地名：如祝家莊、曾頭市，依小說方位示意。
- 小說與史實不符：如薊州、高唐州、無為軍，保留真實座標並在考證欄說明。

底圖是文學示意圖，不是歷史測繪。北宋黃河走北流故道、梁山泊今日已淤平，兩者為手繪重構；海岸線以現代 Natural Earth 資料簡化。CHGIS 因授權限制未納入公開版本。

## GitHub Pages 部署

1. 在 GitHub 建立獨立 repo（建議 `shuihu-map`），不要把 `D:\Coding` 上層 repo 直接公開。
2. 將本專案推送到 `main`。
3. 在 repo 的 **Settings → Pages → Build and deployment** 選擇 **GitHub Actions**。
4. workflow `.github/workflows/deploy.yml` 會自動以 `/<repo>/` 為 base path 建置並部署。
5. 若使用自訂網域或 `username.github.io` 根路徑，請把 base 改為 `/`，並把 `public/404.html` 的 `pathSegmentsToKeep` 改為 `0`。
6. 部署後測試直接開啟並重新整理：
   - `/story?chapter=10`
   - `/heroes?chapter=38&hero=song-jiang`

若 GitHub Pages 的 SPA fallback 出現問題，可將 `src/main.tsx` 的 `BrowserRouter` 改為 `HashRouter`，網址會變成 `/#/story?...`，其餘不變。

## 資料來源與授權

- 《水滸傳》一百二十回本，維基文庫（作品為公有領域）。
- 維基百科「一百單八將」：座次、星號、初登場、入山與結局交叉核對。
- 譚其驤主編《中國歷史地圖集》第六冊：州府位置與北宋水文參考。
- 周岩壁〈《水滸傳》裡的地理學〉（光明日報，2013）：小說地理錯置參考。
- 人物畫像（公有領域）：歌川國芳《通俗水滸傳豪傑百八人一個》（1827–1830）、《繡像第五才子書》、《第五才子書水滸傳》；同一人物可切換多版本，未收錄者以名號印記示意。
- 參考圖層：public/portraits/ref/ 可另置非公版之劇照、英雄卡等，版權歸原權利人，不適用本站授權，僅供非商業賞析，侵權即移除。
- [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/)：公有領域地圖資料。
- Noto Serif TC／Noto Sans TC：SIL Open Font License。

程式碼採 MIT；本專案整理的中文資料採 CC BY-SA 4.0。地圖與事件仍在持續校訂。


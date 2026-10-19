# 參考圖層（ref）

此目錄用於存放**非公版**的參考圖像（例如電視劇劇照、零食隨附英雄卡等），
僅供非商業賞析與研究對照之用。

- 這些圖像**不適用本站的 CC BY-SA 4.0 授權**，著作權歸原權利人所有。
- 請勿將此目錄內容用於商業用途。
- 如權利人認為不妥，請通知我們，將立即移除相關檔案。
- 前端會以「版權歸原權利人」標示，並與公版畫像明確區分。

## 目前收錄

- 戴敦邦《水滸人物一百零八圖》108 幅（現代創作，版權歸戴敦邦及出版方所有）。
  來源：<https://zhuanlan.zhihu.com/p/551699283>。僅作人物形象參考對照，非本站原創。

## 加入方式

1. 將圖檔放入本目錄，例如 `public/portraits/ref/wu-song-tv.jpg`。
2. 在 `data/portraits/manifest.json` 對應人物加入一筆（`license` 設為 `ref`）：

   ```json
   {
     "id": "tv",
     "label": "影視參考",
     "license": "ref",
     "file": "portraits/ref/wu-song-tv.jpg",
     "sourceUrl": "https://example.com/source"
   }
   ```

   - `file` 為相對於網站根目錄的路徑（可省略，預設為 `portraits/<人物>-<id>.jpg`）。
   - `commons` 留空即可（`fetch:portraits` 會略過沒有 `commons` 的條目）。
3. 執行 `npm run build:portraits` 重新產生 `src/data/portraits.ts`。

圖檔已放在本目錄，不需下載步驟。

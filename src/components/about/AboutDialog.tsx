import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

interface AboutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="about-overlay" />
        <Dialog.Content className="about-content">
          <Dialog.Close asChild>
            <button type="button" className="about-close" aria-label="關閉">
              <X size={16} />
            </button>
          </Dialog.Close>

          <div className="about-kicker">凡例 · 考證 · 資料來源</div>
          <Dialog.Title className="about-title">關於水滸輿圖</Dialog.Title>
          <Dialog.Description className="about-lede">
            這是一張以《水滸傳》一百二十回本為時間軸的文學地圖。地點依宋代治所與現代對應位置定位；
            山寨、村莊與小說虛構地名，則以小說敘述、地方考證與原型推定標示，並在圖上區分精度。
          </Dialog.Description>

          <div className="about-grid">
            <section className="about-section">
              <h2>地名分級</h2>
              <ul>
                <li>治所明確：州府、縣治依今地經緯度定位。</li>
                <li>位置約略：山寨、渡口、莊院等，取縣級或文獻推定位置。</li>
                <li>小說虛構：祝家莊、曾頭市等，依小說方位示意。</li>
                <li>小說與史實不符：如薊州、高唐州、無為軍，附考證說明。</li>
              </ul>
            </section>

            <section className="about-section">
              <h2>地圖限制</h2>
              <ul>
                <li>底圖為宋代風格示意，非精確歷史測繪。</li>
                <li>北宋黃河走北流故道，與今日河道不同。</li>
                <li>梁山泊今已淤平，水域範圍依歷史記載示意。</li>
                <li>可切換顯示的行政區界為今省界示意，非宋代路界。</li>
                <li>小說地理常有錯置或繞行，本圖保留真實座標並加註說明。</li>
              </ul>
            </section>

            <section className="about-section">
              <h2>版本與文本</h2>
              <p>
                章回依《水滸傳》一百二十回本；回目取自維基文庫公有領域文本。事件摘要與地圖整理為本專案原創內容。
              </p>
            </section>

            <section className="about-section">
              <h2>地圖資料</h2>
              <p>
                海岸線與陸地輪廓使用 Natural Earth 1:50m 資料（公有領域），裁切、簡化後重新繪製；
                河流、湖泊、宋代疆界與路線為本專案手繪示意。
              </p>
            </section>

            <section className="about-section about-section-wide">
              <h2>主要參考</h2>
              <ul>
                <li>
                  <a href="https://zh.wikisource.org/zh-hant/%E6%B0%B4%E6%BB%B8%E5%82%B3_(120%E5%9B%9E%E6%9C%AC)" target="_blank" rel="noreferrer">
                    維基文庫《水滸傳》一百二十回本
                  </a>
                  ：回目與文本核對。
                </li>
                <li>
                  維基百科「一百單八將」條目：座次、星號、初登場與入山回數交叉核對。
                </li>
                <li>
                  譚其驤主編《中國歷史地圖集》第六冊（宋遼金時期）：州府位置與北宋水文參考。
                </li>
                <li>
                  周岩壁〈《水滸傳》裡的地理學〉（光明日報，2013）：小說地理錯置與路線問題參考。
                </li>
                <li>
                  <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noreferrer">
                    Natural Earth Terms of Use
                  </a>
                  ：公有領域地圖資料。
                </li>
              </ul>
            </section>

            <section className="about-section about-section-wide">
              <h2>授權與技術</h2>
              <p>
                程式碼採 MIT 授權；本專案整理的中文資料採 CC BY-SA 4.0。字體使用 Noto Serif TC 與 Noto Sans TC（SIL Open Font License）。
                地圖以 React、TypeScript、D3 繪製，不使用外部圖磚；CHGIS 因授權限制未納入公開版本。
              </p>
            </section>
          </div>

          <div className="about-legal">
            水滸輿圖 · 文學示意圖 · 非歷史測繪 · 事件與位置持續校訂中
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

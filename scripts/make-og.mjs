import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })
await page.goto('http://127.0.0.1:5173/heroes?chapter=71', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(700)
await page.screenshot({ path: 'public/og.png' })
await browser.close()
console.log('wrote public/og.png')

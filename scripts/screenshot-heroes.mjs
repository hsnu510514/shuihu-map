import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const errors = []
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
page.on('pageerror', (e) => errors.push(e.message))
await page.goto('http://127.0.0.1:5173/heroes?chapter=38', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(500)
await page.getByRole('button', { name: /宋江/ }).first().click()
await page.waitForTimeout(1000)
await page.screenshot({ path: 'screens/hero-selected.png' })

await page.goto('http://127.0.0.1:5173/heroes?chapter=114', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.getByRole('button', { name: /張順/ }).first().click().catch(() => {})
await page.waitForTimeout(1000)
await page.screenshot({ path: 'screens/hero-death.png' })

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
await mobile.goto('http://127.0.0.1:5173/heroes?chapter=71', { waitUntil: 'networkidle' })
await mobile.waitForTimeout(500)
await mobile.screenshot({ path: 'screens/hero-mobile.png' })

console.log(errors.length ? errors.join('\n') : 'no errors')
await browser.close()

import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
const errors = []
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`)
})
page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))

await page.goto('http://127.0.0.1:5173/story?chapter=10', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(800)
await page.screenshot({ path: 'screens/story.png' })

await page.goto('http://127.0.0.1:5173/story?chapter=39', { waitUntil: 'networkidle' })
await page.waitForTimeout(400)
await page.getByRole('button', { name: /潯陽樓題反詩/ }).first().click().catch(() => {})
await page.waitForTimeout(900)
await page.screenshot({ path: 'screens/story-event.png' })

await page.goto('http://127.0.0.1:5173/heroes?chapter=71', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
await page.screenshot({ path: 'screens/heroes.png' })

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })
mobile.on('pageerror', (error) => errors.push(`mobile pageerror: ${error.message}`))
await mobile.goto('http://127.0.0.1:5173/story?chapter=23', { waitUntil: 'networkidle' })
await mobile.waitForTimeout(600)
await mobile.screenshot({ path: 'screens/mobile.png' })

console.log(errors.length ? errors.join('\n') : 'no errors')
await browser.close()

// 依 data/portraits/manifest.json 下載公版人物畫像至 public/portraits/。
// 先以 Commons API 解析檔名（處理重新導向與正規化），再下載指定寬度縮圖。
// 用法：node scripts/fetch-portraits.mjs [--force]
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = resolve(root, 'data/portraits/manifest.json')
const outDir = resolve(root, 'public/portraits')
const width = 480
const force = process.argv.includes('--force')
const userAgent = 'shuihu-map/0.0 (portrait fetch; public-domain art)'

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
const targets = []
for (const [figureId, sources] of Object.entries(manifest.figures)) {
  for (const source of sources) {
    targets.push({ figureId, source })
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function api(params) {
  const url = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams(params).toString()
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const res = await fetch(url, { headers: { 'User-Agent': userAgent } })
    const text = await res.text()
    if (res.status === 429 || text.startsWith('You are making')) {
      await sleep(4000 * (attempt + 1))
      continue
    }
    if (!res.ok) throw new Error(`API HTTP ${res.status}`)
    return JSON.parse(text)
  }
  throw new Error('API rate limited')
}

async function resolveTitles(titles) {
  const resolved = new Map()
  for (let i = 0; i < titles.length; i += 40) {
    const chunk = titles.slice(i, i + 40)
    const data = await api({
      action: 'query',
      format: 'json',
      formatversion: '2',
      redirects: '1',
      prop: 'imageinfo',
      iiprop: 'url',
      iiurlwidth: String(width),
      titles: chunk.map((t) => `File:${t}`).join('|'),
    })
    const normal = new Map()
    for (const item of data.query?.normalized ?? []) normal.set(item.from, item.to)
    for (const item of data.query?.redirects ?? []) normal.set(item.from, item.to)
    const pages = new Map()
    for (const page of data.query?.pages ?? []) pages.set(page.title, page)
    for (const title of chunk) {
      let key = `File:${title}`
      while (normal.has(key)) key = normal.get(key)
      const page = pages.get(key)
      const info = page?.imageinfo?.[0]
      if (info?.thumburl) resolved.set(title, info.thumburl)
    }
    await sleep(1500)
  }
  return resolved
}

async function download(url, dest, attempt = 0) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': userAgent } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length < 512) throw new Error('response too small')
    writeFileSync(dest, buffer)
    return buffer.length
  } catch (error) {
    if (attempt < 6) {
      await sleep(5000 * (attempt + 1))
      return download(url, dest, attempt + 1)
    }
    throw error
  }
}

async function run() {
  mkdirSync(outDir, { recursive: true })
  const pending = targets.filter(({ figureId, source }) => {
    if (!source.commons) return false
    const dest = resolve(outDir, `${figureId}-${source.id}.jpg`)
    return force || !existsSync(dest)
  })
  const uniqueTitles = [...new Set(pending.map((t) => t.source.commons))]

  console.log(`解析 ${uniqueTitles.length} 個檔名…`)
  const resolved = await resolveTitles(uniqueTitles)

  let ok = 0
  let skipped = 0
  const failed = []
  for (const { figureId, source } of targets) {
    if (!source.commons) {
      skipped += 1
      continue
    }
    const dest = resolve(outDir, `${figureId}-${source.id}.jpg`)
    if (!force && existsSync(dest)) {
      skipped += 1
      continue
    }
    const thumb = resolved.get(source.commons)
    if (!thumb) {
      failed.push({ figureId, commons: source.commons, error: 'Commons 查無此檔' })
      continue
    }
    try {
      await download(thumb, dest)
      ok += 1
      process.stdout.write(`ok  ${figureId}\n`)
    } catch (error) {
      failed.push({ figureId, commons: source.commons, error: String(error) })
      process.stdout.write(`ERR ${figureId} ${error}\n`)
    }
    await sleep(1800)
  }

  console.log(`\n下載完成：新增 ${ok}，略過 ${skipped}，失敗 ${failed.length}／共 ${targets.length}`)
  if (failed.length > 0) {
    console.log('失敗清單（請檢查 Commons 檔名）：')
    for (const item of failed) console.log(`  - ${item.figureId}: ${item.commons} (${item.error})`)
    process.exitCode = 1
  }
}

run()

import fs from 'node:fs'
import path from 'node:path'

const API = 'https://zh.wikisource.org/w/api.php'
const PREFIX = '水滸傳 (120回本)/'
const OUT = path.join(process.cwd(), '.cache', 'shuihu')
const TOTAL = 120
const BATCH = 20

const chapterTitle = (n) => `${PREFIX}第${String(n).padStart(3, '0')}回`
const chapterFile = (n) => path.join(OUT, `第${String(n).padStart(3, '0')}回.txt`)

async function api(params) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const res = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'shuihu-map-dev/1.0 (one-time text extraction; local build script)',
      },
      body: new URLSearchParams(params),
    })
    if (res.status === 429) {
      const wait = (attempt + 1) * 8000
      console.log(`429 rate limited, waiting ${wait}ms`)
      await new Promise((resolve) => setTimeout(resolve, wait))
      continue
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
  }
  throw new Error('too many retries (429)')
}

fs.mkdirSync(OUT, { recursive: true })

const missing = []
for (let n = 1; n <= TOTAL; n += 1) {
  const file = chapterFile(n)
  if (!(fs.existsSync(file) && fs.statSync(file).size > 200)) missing.push(n)
}

for (let start = 0; start < missing.length; start += BATCH) {
  const group = missing.slice(start, start + BATCH)
  const data = await api({
    action: 'query',
    prop: 'revisions',
    rvslots: 'main',
    rvprop: 'content',
    format: 'json',
    formatversion: '2',
    titles: group.map(chapterTitle).join('|'),
  })
  for (const page of data.query?.pages ?? []) {
    const index = group.find((n) => chapterTitle(n) === page.title)
    if (!index) continue
    const content = page.revisions?.[0]?.slots?.main?.content
    if (!content) {
      console.log(`missing content for ${page.title}`)
      continue
    }
    fs.writeFileSync(chapterFile(index), content, 'utf8')
  }
  const last = group[group.length - 1]
  console.log(`batch up to ${String(last).padStart(3, '0')} done`)
  if (start + BATCH < missing.length) await new Promise((resolve) => setTimeout(resolve, 2000))
}

const files = fs.readdirSync(OUT).filter((name) => name.endsWith('.txt'))
console.log(`done. chapters=${files.length}, cache=${path.relative(process.cwd(), OUT)}`)

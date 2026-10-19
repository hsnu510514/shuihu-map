import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const CACHE = path.join(ROOT, '.cache', 'shuihu')
const OUT = path.join(CACHE, 'candidates.jsonl')

const GROUPS = {
  kill: ['殺死', '殺害', '打殺', '斬', '打死', '戳死', '搠死', '砍死', '剁死', '勒死', '毒死', '誤殺', '結果了', '刺死'],
  capture: ['活捉', '生擒', '擒獲', '擒住', '拿住', '綁縛', '捉住', '捉了'],
  fight: ['廝殺', '單挑', '交手', '大戰', '鬥不過', '敵不住', '打翻', '打倒', '撲倒', '一棒打', '一槍', '一刀砍'],
  emotion: ['大哭', '大喜', '大怒', '痛哭', '喝罵', '笑罵', '大哭一場', '眼淚'],
  campaign: ['大敗', '大勝', '得勝', '奏凱', '班師', '攻破', '打破', '敗走', '潰散'],
}

function readFigureNames() {
  const names = new Set()
  const heroes = fs.readFileSync(path.join(ROOT, 'src', 'data', 'heroes.ts'), 'utf8')
  for (const line of heroes.split('\n')) {
    const row = line.match(
      /^\s*\[('[^']*'),\s*\d+,\s*'[^']*',\s*'([^']*)',\s*'([^']*)'/,
    )
    if (row) {
      names.add(row[2])
      names.add(row[3])
    }
  }
  const characters = fs.readFileSync(path.join(ROOT, 'src', 'data', 'characters.ts'), 'utf8')
  for (const match of characters.matchAll(/name:\s*'([^']+)'/g)) names.add(match[1])
  for (const match of characters.matchAll(/aliases:\s*\[([^\]]+)\]/g)) {
    for (const alias of match[1].matchAll(/'([^']+)'/g)) names.add(alias[1])
  }
  names.delete('')
  return [...names]
}

const FIGURE_NAMES = readFigureNames()

const mentionsFigure = (text) => FIGURE_NAMES.some((name) => text.includes(name))


function stripWikitext(input) {
  let text = input
  text = text.replace(/<!--[\s\S]*?-->/g, '')
  for (let i = 0; i < 4; i += 1) text = text.replace(/\{\{[^{}]*\}\}/g, '')
  text = text.replace(/\{\{[\s\S]*?\}\}/g, '')
  text = text.replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, '$1')
  text = text.replace(/\[\[([^\]]*)\]\]/g, '$1')
  text = text.replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, '')
  text = text.replace(/<\/?(?:onlyinclude|poem|noinclude|includeonly|br|p|div|center|small|big|nowiki)[^>]*>/gi, '')
  text = text.replace(/__[A-Z]+__/g, '')
  text = text.replace(/'''?/g, '')
  return text
}

function splitSentences(paragraph) {
  return paragraph
    .split(/(?<=[。！？；])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 1)
}

const keywordsFor = (sentence) => {
  const hits = []
  for (const [group, words] of Object.entries(GROUPS)) {
    for (const word of words) {
      if (sentence.includes(word)) {
        hits.push(`${group}:${word}`)
      }
    }
  }
  return hits
}

const files = fs
  .readdirSync(CACHE)
  .filter((name) => /^第\d{3}回\.txt$/.test(name))
  .sort()

const stats = {}
const lines = []

for (const name of files) {
  const chapter = Number(name.slice(1, 4))
  const raw = fs.readFileSync(path.join(CACHE, name), 'utf8')
  const text = stripWikitext(raw)
  const paragraphs = text.split(/\n+/).map((p) => p.trim()).filter((p) => p.length > 4)

  for (const paragraph of paragraphs) {
    const sentences = splitSentences(paragraph)
    for (let i = 0; i < sentences.length; i += 1) {
      const hits = keywordsFor(sentences[i])
      if (hits.length === 0) continue
      const window = sentences.slice(Math.max(0, i - 1), Math.min(sentences.length, i + 2)).join('')
      if (!mentionsFigure(window)) continue
      const groups = [...new Set(hits.map((h) => h.split(':')[0]))]
      for (const group of groups) stats[group] = (stats[group] ?? 0) + 1
      lines.push(
        JSON.stringify({
          chapter,
          id: `ch${String(chapter).padStart(3, '0')}-${i}`,
          groups,
          keywords: hits,
          text: window,
        }),
      )
    }
  }
}

fs.writeFileSync(OUT, `${lines.join('\n')}\n`, 'utf8')
console.log('candidates:', lines.length)
console.log('by group:', stats)

for (const group of Object.keys(GROUPS)) {
  const groupLines = lines.filter((line) => JSON.parse(line).groups.includes(group))
  fs.writeFileSync(
    path.join(CACHE, `cand-${group}.jsonl`),
    groupLines.length ? `${groupLines.join('\n')}\n` : '',
    'utf8',
  )
}
console.log('out:', path.relative(ROOT, OUT))

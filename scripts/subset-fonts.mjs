import fs from 'node:fs'
import path from 'node:path'
import subsetFont from 'subset-font'

const root = process.cwd()
const sourceRoots = ['src', 'index.html']
const files = []

function walk(target) {
  const stat = fs.statSync(target)
  if (stat.isDirectory()) {
    for (const entry of fs.readdirSync(target)) walk(path.join(target, entry))
    return
  }
  if (/\.(tsx?|css|html|json)$/.test(target)) files.push(target)
}

for (const target of sourceRoots) walk(path.join(root, target))

const chars = new Set()
for (let code = 32; code <= 126; code += 1) chars.add(String.fromCharCode(code))
for (const ch of '，。、；：？！「」『』（）〈〉《》【】…—·　～％＃＠＆＊＋－／＝｜') chars.add(ch)
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  for (const ch of text) {
    if (ch.codePointAt(0) > 126) chars.add(ch)
  }
}

const text = [...chars].sort().join('')
const jobs = [
  ['noto-serif-tc', 'noto-serif-tc-chinese-traditional-400-normal.woff2', 'noto-serif-tc-400.woff2'],
  ['noto-serif-tc', 'noto-serif-tc-chinese-traditional-700-normal.woff2', 'noto-serif-tc-700.woff2'],
  ['noto-sans-tc', 'noto-sans-tc-chinese-traditional-400-normal.woff2', 'noto-sans-tc-400.woff2'],
  ['noto-sans-tc', 'noto-sans-tc-chinese-traditional-500-normal.woff2', 'noto-sans-tc-500.woff2'],
]

for (const [pkg, source, output] of jobs) {
  const input = fs.readFileSync(
    path.join(root, 'node_modules', '@fontsource', pkg, 'files', source),
  )
  const result = await subsetFont(input, text, { targetFormat: 'woff2' })
  const outPath = path.join(root, 'src', 'assets', 'fonts', output)
  fs.writeFileSync(outPath, result)
  console.log(output, `${(result.length / 1024).toFixed(0)} KB`)
}
console.log('characters:', chars.size)

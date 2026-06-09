#!/usr/bin/env node
/**
 * Sync DigiKey L1/L2 category icons from outputs/digikey_icon_prompts/generated_icons
 * into YuanQiSeoWeb/public/category-icons for static serving.
 */
import { createReadStream, existsSync, mkdirSync, copyFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '../..')
const taxonomyCsv = join(repoRoot, 'YuanQiService/data/digikey_category_taxonomy.csv')
const sourceDir = join(repoRoot, 'outputs/digikey_icon_prompts/generated_icons')
const targetDir = join(repoRoot, 'YuanQiSeoWeb/public/category-icons')

const L1_ALIASES = {
  'fans-thermal-management': 'fans-blowers-thermal-management',
  'maker-diy-educational': 'maker-diy-educational-educational-kits',
  optics: 'optics-lenses',
  'tools-and-accessories': 'tools',
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseCsvLine(line) {
  const fields = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i += 1
      } else {
        inQuotes = !inQuotes
      }
      continue
    }
    if (char === ',' && !inQuotes) {
      fields.push(current)
      current = ''
      continue
    }
    current += char
  }
  fields.push(current)
  return fields.map((field) => field.trim())
}

async function readTaxonomyRows() {
  const l1Names = []
  const l1Seen = new Set()
  const l2Pairs = []
  const l2Seen = new Set()
  const rl = createInterface({ input: createReadStream(taxonomyCsv), crlfDelay: Infinity })
  let header = true
  for await (const line of rl) {
    if (header) {
      header = false
      continue
    }
    const [l1 = '', l2 = ''] = parseCsvLine(line)
    if (!l1) continue
    if (!l1Seen.has(l1)) {
      l1Seen.add(l1)
      l1Names.push(l1)
    }
    if (!l2) continue
    const key = `${l1}\x00${l2}`
    if (l2Seen.has(key)) continue
    l2Seen.add(key)
    l2Pairs.push({ l1, l2 })
  }
  return { l1Names, l2Pairs }
}

function copyIcon(slug, aliases = L1_ALIASES) {
  const sourceSlug = aliases[slug] ?? slug
  const source = join(sourceDir, `${sourceSlug}.png`)
  const target = join(targetDir, `${slug}.png`)
  if (!existsSync(source)) return false
  copyFileSync(source, target)
  return true
}

const { l1Names, l2Pairs } = await readTaxonomyRows()
mkdirSync(targetDir, { recursive: true })

let l1Copied = 0
let l1Missing = 0
for (const name of l1Names) {
  const slug = slugify(name)
  if (copyIcon(slug)) l1Copied += 1
  else {
    l1Missing += 1
    console.warn(`missing L1 icon for ${slug} (${name})`)
  }
}

let l2Copied = 0
let l2Missing = 0
for (const { l1, l2 } of l2Pairs) {
  const slug = `${slugify(l1)}-${slugify(l2)}`
  if (copyIcon(slug, {})) l2Copied += 1
  else {
    l2Missing += 1
  }
}

console.log(`Synced ${l1Copied}/${l1Names.length} L1 icons`)
console.log(`Synced ${l2Copied}/${l2Pairs.length} L2 icons to ${targetDir}`)
if (l1Missing || l2Missing) process.exitCode = 1

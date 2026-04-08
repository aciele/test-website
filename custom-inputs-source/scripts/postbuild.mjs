import { cpSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../../custom-inputs')

const routes = ['mui', 'shadcn', 'antd', 'chakra']

for (const route of routes) {
  const dir = join(outDir, route)
  mkdirSync(dir, { recursive: true })
  cpSync(join(outDir, 'index.html'), join(dir, 'index.html'))
  console.log(`✓ ${route}/index.html`)
}

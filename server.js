import http from 'node:http'
import { URL } from 'node:url'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dotenvPath = path.join(__dirname, '.env')

if (existsSync(dotenvPath)) {
  const envContent = readFileSync(dotenvPath, 'utf8')
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const [key, ...rest] = trimmed.split('=')
    if (!key || process.env[key]) continue
    process.env[key] = rest.join('=').trim()
  }
}

const API_KEY = process.env.YOUTUBE_API_KEY
const PORT = Number(process.env.PORT ?? 3000)

if (!API_KEY) {
  console.error('Missing YOUTUBE_API_KEY environment variable.')
  process.exit(1)
}

const createYouTubeUrl = (regionCode = 'KR') => {
  const url = new URL('https://www.googleapis.com/youtube/v3/videoCategories')
  url.searchParams.set('part', 'snippet')
  url.searchParams.set('regionCode', regionCode)
  url.searchParams.set('key', API_KEY)
  return url
}

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (!req.url) {
    res.writeHead(400)
    res.end(JSON.stringify({ error: 'Invalid request URL.' }))
    return
  }

  const url = new URL(req.url, `http://${req.headers.host}`)
  const regionCode = url.searchParams.get('regionCode') ?? 'KR'

  if (url.pathname === '/api/youtube/videoCategories' || url.pathname === '/api/youtube/validateKey') {
    try {
      const apiResponse = await fetch(createYouTubeUrl(regionCode).toString())
      const body = await apiResponse.json().catch(() => null)

      if (!apiResponse.ok) {
        res.writeHead(apiResponse.status)
        res.end(JSON.stringify(body ?? { error: 'YouTube API request failed.' }))
        return
      }

      if (url.pathname === '/api/youtube/validateKey') {
        res.writeHead(200)
        res.end(JSON.stringify({ ok: true, regionCode }))
        return
      }

      res.writeHead(200)
      res.end(JSON.stringify(body))
    } catch (error) {
      res.writeHead(500)
      res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }))
    }

    return
  }

  res.writeHead(404)
  res.end(JSON.stringify({ error: 'Route not found.' }))
})

server.listen(PORT, () => {
  console.log(`YouTube API proxy server is running on http://localhost:${PORT}`)
})

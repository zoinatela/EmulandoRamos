/**
 * Scraper ScreenScraper — ROMs / consoles.
 * Docs: https://www.screenscraper.fr/apiintro.php
 */
import { getPlatform } from '../../shared/platforms'
import type { PlatformId } from '../../shared/types'
import type { ScrapeMeta } from './scraper-rawg'

export async function scrapeScreenScraper(
  title: string,
  platform: PlatformId
): Promise<ScrapeMeta | null> {
  const devid = process.env.SCREENSCRAPER_DEV_ID
  const devpassword = process.env.SCREENSCRAPER_DEV_PASSWORD
  const softname = process.env.SCREENSCRAPER_SOFTNAME || 'EmulandoRamos'
  const ssid = process.env.SCREENSCRAPER_SSID
  const sspassword = process.env.SCREENSCRAPER_SSPASSWORD

  if (!devid || !ssid) {
    console.warn('[ScreenScraper] Credenciais incompletas no .env')
    return null
  }

  const systemeid = getPlatform(platform)?.screenscraperId
  if (!systemeid) {
    console.warn(`[ScreenScraper] Plataforma sem mapeamento: ${platform}`)
    return null
  }

  try {
    const url = new URL('https://www.screenscraper.fr/api2/jeuInfos.php')
    url.searchParams.set('devid', devid)
    if (devpassword) url.searchParams.set('devpassword', devpassword)
    url.searchParams.set('softname', softname)
    url.searchParams.set('ssid', ssid)
    if (sspassword) url.searchParams.set('sspassword', sspassword)
    url.searchParams.set('output', 'json')
    url.searchParams.set('systemeid', String(systemeid))
    url.searchParams.set('romnom', title)

    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = (await res.json()) as {
      response?: {
        jeu?: {
          developpeur?: { text?: string }
          dates?: Array<{ region?: string; text?: string }>
          synopsis?: Array<{ langue?: string; text?: string }>
          medias?: Array<{ type?: string; region?: string; url?: string }>
        }
      }
    }

    const jeu = json.response?.jeu
    if (!jeu) return null

    const synopsis =
      jeu.synopsis?.find((s) => s.langue === 'pt')?.text ||
      jeu.synopsis?.find((s) => s.langue === 'en')?.text ||
      jeu.synopsis?.[0]?.text

    const cover =
      jeu.medias?.find((m) => m.type === 'box-2D' && m.region === 'us')?.url ||
      jeu.medias?.find((m) => m.type === 'box-2D')?.url ||
      jeu.medias?.find((m) => m.type === 'ss')?.url

    const date = jeu.dates?.[0]?.text
    const year = date ? Number(date.slice(0, 4)) : undefined

    return {
      coverUrl: cover,
      synopsis: synopsis?.slice(0, 800),
      year: Number.isFinite(year) ? year : undefined,
      developer: jeu.developpeur?.text
    }
  } catch (err) {
    console.error('[ScreenScraper]', err)
    return null
  }
}

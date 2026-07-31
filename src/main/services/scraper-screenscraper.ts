/**
 * Scraper ScreenScraper — ROMs / consoles.
 * Docs: https://www.screenscraper.fr/apiintro.php
 */
import type { PlatformId } from '../../shared/types'
import type { ScrapeMeta } from './scraper-rawg'

/** IDs de sistema ScreenScraper — https://www.screenscraper.fr/api2/systemesListe.php */
const SS_SYSTEM: Partial<Record<PlatformId, number>> = {
  nes: 3,
  snes: 4,
  n64: 14,
  gamecube: 13,
  wii: 16,
  wiiu: 18,
  switch: 225,
  gb: 9,
  gbc: 10,
  gba: 12,
  nds: 15,
  '3ds': 17,
  virtualboy: 11,
  ps1: 57,
  ps2: 58,
  ps3: 59,
  psp: 61,
  psvita: 62,
  mastersystem: 2,
  genesis: 1,
  sega32x: 19,
  segacd: 20,
  saturn: 22,
  dreamcast: 23,
  gamegear: 21,
  sg1000: 109,
  xbox: 32,
  xbox360: 33,
  neogeo: 142,
  neogeocd: 70,
  neogeopocket: 25,
  arcade: 75,
  pcengine: 31,
  supergrafx: 105,
  wonderswan: 45,
  wonderswancolor: 46,
  atari2600: 26,
  atari5200: 40,
  atari7800: 41,
  jaguar: 27,
  lynx: 28,
  amiga: 64,
  c64: 66,
  msx: 113,
  dos: 135,
  scummvm: 123
}

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

  const systemeid = SS_SYSTEM[platform]
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

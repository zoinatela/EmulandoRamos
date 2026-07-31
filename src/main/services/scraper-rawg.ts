/**
 * Scraper RAWG.io — jogos de PC.
 * Docs: https://api.rawg.io/docs/
 */
export interface ScrapeMeta {
  coverUrl?: string
  synopsis?: string
  year?: number
  developer?: string
}

export async function scrapeRawg(title: string): Promise<ScrapeMeta | null> {
  const key = process.env.RAWG_API_KEY
  if (!key) {
    console.warn('[RAWG] RAWG_API_KEY não definida no .env')
    return null
  }

  try {
    const searchUrl = new URL('https://api.rawg.io/api/games')
    searchUrl.searchParams.set('key', key)
    searchUrl.searchParams.set('search', title)
    searchUrl.searchParams.set('page_size', '1')

    const searchRes = await fetch(searchUrl)
    if (!searchRes.ok) throw new Error(`HTTP ${searchRes.status}`)
    const searchJson = (await searchRes.json()) as {
      results?: Array<{ id: number; background_image?: string; released?: string }>
    }
    const hit = searchJson.results?.[0]
    if (!hit) return null

    const detailRes = await fetch(`https://api.rawg.io/api/games/${hit.id}?key=${key}`)
    if (!detailRes.ok) throw new Error(`HTTP ${detailRes.status}`)
    const detail = (await detailRes.json()) as {
      description_raw?: string
      background_image?: string
      released?: string
      developers?: Array<{ name: string }>
    }

    return {
      coverUrl: detail.background_image ?? hit.background_image,
      synopsis: detail.description_raw?.slice(0, 800),
      year: detail.released ? Number(detail.released.slice(0, 4)) : undefined,
      developer: detail.developers?.[0]?.name
    }
  } catch (err) {
    console.error('[RAWG]', err)
    return null
  }
}

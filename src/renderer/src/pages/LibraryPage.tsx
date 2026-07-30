import { useCallback, useEffect, useMemo, useState } from 'react'
import { PLATFORMS } from '../../../shared/platforms'
import type { Game, PlatformId } from '../../../shared/types'
import GameGrid from '../components/GameGrid'
import HeroFeatured from '../components/HeroFeatured'
import '../styles/library.css'

type SortMode = 'title' | 'recent' | 'favorites'

const ENRICH_DELAY_MS = 400

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function sortGames(list: Game[], mode: SortMode): Game[] {
  const copy = [...list]
  if (mode === 'recent') {
    return copy.sort((a, b) => {
      const ta = a.lastPlayedAt ? Date.parse(a.lastPlayedAt) : 0
      const tb = b.lastPlayedAt ? Date.parse(b.lastPlayedAt) : 0
      if (tb !== ta) return tb - ta
      return a.title.localeCompare(b.title, 'pt', { sensitivity: 'base' })
    })
  }
  if (mode === 'favorites') {
    return copy.sort((a, b) => {
      const fa = a.favorite ? 1 : 0
      const fb = b.favorite ? 1 : 0
      if (fb !== fa) return fb - fa
      return a.title.localeCompare(b.title, 'pt', { sensitivity: 'base' })
    })
  }
  return copy.sort((a, b) => a.title.localeCompare(b.title, 'pt', { sensitivity: 'base' }))
}

export default function LibraryPage() {
  const [games, setGames] = useState<Game[]>([])
  const [platform, setPlatform] = useState<PlatformId | 'all'>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortMode>('title')
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [enriching, setEnriching] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [selected, setSelected] = useState<Game | null>(null)

  const patchGame = useCallback((updated: Game) => {
    setGames((prev) => prev.map((g) => (g.id === updated.id ? updated : g)))
    setSelected((prev) => (prev?.id === updated.id ? updated : prev))
  }, [])

  const refresh = useCallback(async () => {
    if (!window.emulando) return
    const list = await window.emulando.listGames(platform, query)
    setGames(list)
    setSelected((prev) => {
      if (!prev) return list[0] ?? null
      return list.find((g) => g.id === prev.id) ?? list[0] ?? null
    })
  }, [platform, query])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    const t = setTimeout(() => {
      refresh()
        .catch(console.error)
        .finally(() => {
          if (!cancelled) setLoading(false)
        })
    }, 120)
    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [refresh])

  const sortedGames = useMemo(() => sortGames(games, sort), [games, sort])

  const recentGames = useMemo(() => {
    return [...games]
      .filter((g) => g.lastPlayedAt)
      .sort((a, b) => Date.parse(b.lastPlayedAt!) - Date.parse(a.lastPlayedAt!))
      .slice(0, 12)
  }, [games])

  const featured = useMemo(() => selected ?? sortedGames[0] ?? null, [selected, sortedGames])

  async function enrichBatch(newGames: Game[]) {
    if (!window.emulando || newGames.length === 0) return

    const status = await window.emulando.getApiStatus()
    const eligible = newGames.filter((g) =>
      g.platform === 'pc' ? status.rawg : status.screenscraper
    )

    if (eligible.length === 0) {
      const needsKeys = newGames.some((g) =>
        g.platform === 'pc' ? !status.rawg : !status.screenscraper
      )
      if (needsKeys) {
        setToast(
          'Jogos importados. Configure as chaves de API no .env para buscar capas automaticamente.'
        )
      }
      return
    }

    setEnriching(true)
    let withCover = 0
    try {
      for (let i = 0; i < eligible.length; i++) {
        setToast(`Buscando capas… ${i + 1}/${eligible.length}`)
        const updated = await window.emulando.enrichGame(eligible[i].id)
        if (updated) {
          if (updated.coverUrl) withCover++
          patchGame(updated)
        }
        if (i < eligible.length - 1) await sleep(ENRICH_DELAY_MS)
      }
      setToast(`Capas atualizadas: ${withCover} de ${eligible.length}`)
      await refresh()
    } finally {
      setEnriching(false)
    }
  }

  async function handleScan() {
    setBusy(true)
    setToast(null)
    try {
      const result = await window.emulando.scanLibrary()
      if (result.added === 0 && result.skipped === 0 && result.games.length === 0) {
        setToast('Importação cancelada')
        return
      }
      setToast(`Importação: ${result.added} novos · ${result.skipped} já existiam`)
      await refresh()
      if (result.games.length > 0) {
        await enrichBatch(result.games)
      }
    } finally {
      setBusy(false)
    }
  }

  async function handlePlay(game: Game) {
    const result = await window.emulando.playGame(game.id)
    if (!result.ok) {
      setToast(result.message ?? 'Falha ao iniciar')
      return
    }
    setToast(`Iniciando: ${game.title}`)
    const played: Game = { ...game, lastPlayedAt: new Date().toISOString() }
    patchGame(played)
  }

  async function handleEnrich(game: Game) {
    setEnriching(true)
    try {
      const updated = await window.emulando.enrichGame(game.id)
      if (updated) {
        const changed =
          updated.coverUrl !== game.coverUrl ||
          updated.synopsis !== game.synopsis ||
          updated.year !== game.year ||
          updated.developer !== game.developer
        setToast(
          changed
            ? `Metadata atualizada: ${updated.title}`
            : 'Sem resultados do scraper (verifique .env / nome do arquivo)'
        )
        patchGame(updated)
        await refresh()
      } else {
        setToast('Sem resultados do scraper (verifique .env / nome do arquivo)')
      }
    } finally {
      setEnriching(false)
    }
  }

  async function handleToggleFavorite(game: Game) {
    const next = !game.favorite
    const updated = await window.emulando.setFavorite(game.id, next)
    if (updated) patchGame(updated)
    else patchGame({ ...game, favorite: next })
  }

  const emptyMessage =
    games.length === 0 && !query && platform === 'all'
      ? undefined
      : 'Nenhum jogo corresponde aos filtros.'

  const isBusy = busy || enriching

  return (
    <div className="library">
      <HeroFeatured
        game={featured}
        enriching={enriching}
        onPlay={handlePlay}
        onEnrich={handleEnrich}
        onToggleFavorite={handleToggleFavorite}
      />

      <section className="toolbar">
        <div className="search-wrap">
          <input
            className="search"
            placeholder="Buscar por título ou desenvolvedora…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select
          className="filter"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortMode)}
          aria-label="Ordenar biblioteca"
        >
          <option value="title">Ordenar: Título</option>
          <option value="recent">Ordenar: Últimos jogados</option>
          <option value="favorites">Ordenar: Favoritos</option>
        </select>

        <button className="btn primary" disabled={isBusy} onClick={handleScan}>
          {busy ? 'Importando…' : enriching ? 'Buscando capas…' : 'Importar pasta'}
        </button>
      </section>

      <div className="platform-rail" role="toolbar" aria-label="Filtrar por plataforma">
        <button
          type="button"
          className={platform === 'all' ? 'chip active' : 'chip'}
          onClick={() => setPlatform('all')}
        >
          Todas
        </button>
        {PLATFORMS.filter((p) => p.id !== 'other').map((p) => (
          <button
            key={p.id}
            type="button"
            className={platform === p.id ? 'chip active' : 'chip'}
            onClick={() => setPlatform(p.id)}
            title={p.family}
          >
            {p.name}
          </button>
        ))}
      </div>

      {toast && (
        <p className="toast" role="status">
          {toast}
          {enriching && <span className="toast-spinner" aria-hidden />}
        </p>
      )}

      {!loading && recentGames.length > 0 && sort !== 'recent' && (
        <section className="library-row" aria-labelledby="recent-heading">
          <div className="row-header">
            <h2 id="recent-heading">Últimos jogados</h2>
            <button type="button" className="row-link" onClick={() => setSort('recent')}>
              Ver todos
            </button>
          </div>
          <div className="row-scroll" role="list">
            {recentGames.map((game) => {
              const platformName =
                PLATFORMS.find((p) => p.id === game.platform)?.name ?? game.platform
              return (
                <article
                  key={game.id}
                  role="listitem"
                  className={game.id === featured?.id ? 'cover row-cover active' : 'cover row-cover'}
                  onClick={() => setSelected(game)}
                  onDoubleClick={() => handlePlay(game)}
                >
                  <div
                    className="cover-art"
                    style={
                      game.coverUrl
                        ? { backgroundImage: `url(${game.coverUrl})` }
                        : undefined
                    }
                  >
                    {!game.coverUrl && (
                      <span className="cover-fallback">{game.title.slice(0, 1)}</span>
                    )}
                    <button
                      type="button"
                      className={game.favorite ? 'fav-btn on' : 'fav-btn'}
                      title={game.favorite ? 'Remover dos favoritos' : 'Favoritar'}
                      aria-label={game.favorite ? 'Remover dos favoritos' : 'Favoritar'}
                      aria-pressed={Boolean(game.favorite)}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleFavorite(game)
                      }}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                        <path
                          d="M12 3.6l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 15.9l-4.8 2.52.92-5.34L4.24 9.24l5.36-.78L12 3.6z"
                          fill={game.favorite ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="cover-meta">
                    <h3 title={game.title}>{game.title}</h3>
                    <span>{platformName}</span>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      <GameGrid
        games={sortedGames}
        activeId={featured?.id}
        loading={loading}
        emptyMessage={emptyMessage}
        onSelect={setSelected}
        onPlay={handlePlay}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  )
}

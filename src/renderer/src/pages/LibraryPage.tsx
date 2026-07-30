import { useCallback, useEffect, useMemo, useState } from 'react'
import { PLATFORMS } from '../../../shared/platforms'
import type { Game, PlatformId } from '../../../shared/types'
import GameGrid from '../components/GameGrid'
import HeroFeatured from '../components/HeroFeatured'
import '../styles/library.css'

export default function LibraryPage() {
  const [games, setGames] = useState<Game[]>([])
  const [platform, setPlatform] = useState<PlatformId | 'all'>('all')
  const [query, setQuery] = useState('')
  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [selected, setSelected] = useState<Game | null>(null)

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
    const t = setTimeout(() => {
      refresh().catch(console.error)
    }, 120)
    return () => clearTimeout(t)
  }, [refresh])

  const featured = useMemo(() => selected ?? games[0] ?? null, [selected, games])

  async function handleScan() {
    setBusy(true)
    setToast(null)
    try {
      const result = await window.emulando.scanLibrary()
      setToast(`Importação: ${result.added} novos · ${result.skipped} já existiam`)
      await refresh()
    } finally {
      setBusy(false)
    }
  }

  async function handlePlay(game: Game) {
    const result = await window.emulando.playGame(game.id)
    if (!result.ok) setToast(result.message ?? 'Falha ao iniciar')
    else setToast(`Iniciando: ${game.title}`)
  }

  async function handleEnrich(game: Game) {
    setBusy(true)
    try {
      const updated = await window.emulando.enrichGame(game.id)
      if (updated) {
        setToast(`Metadata atualizada: ${updated.title}`)
        await refresh()
      } else {
        setToast('Sem resultados do scraper (verifique .env / nome do arquivo)')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="library">
      <HeroFeatured game={featured} onPlay={handlePlay} onEnrich={handleEnrich} />

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
          value={platform}
          onChange={(e) => setPlatform(e.target.value as PlatformId | 'all')}
        >
          <option value="all">Todas as plataformas</option>
          {PLATFORMS.filter((p) => p.id !== 'other').map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <button className="btn primary" disabled={busy} onClick={handleScan}>
          {busy ? 'Aguarde…' : 'Importar pasta'}
        </button>
      </section>

      {toast && (
        <p className="toast" role="status">
          {toast}
        </p>
      )}

      <GameGrid
        games={games}
        activeId={featured?.id}
        onSelect={setSelected}
        onPlay={handlePlay}
      />
    </div>
  )
}

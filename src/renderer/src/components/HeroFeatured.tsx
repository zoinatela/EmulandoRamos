import type { Game } from '../../../shared/types'
import { PLATFORMS } from '../../../shared/platforms'
import '../styles/hero.css'

interface Props {
  game: Game | null
  enriching?: boolean
  onPlay: (game: Game) => void
  onEnrich: (game: Game) => void
  onToggleFavorite?: (game: Game) => void
}

export default function HeroFeatured({
  game,
  enriching,
  onPlay,
  onEnrich,
  onToggleFavorite
}: Props) {
  if (!game) {
    return (
      <section className="hero empty">
        <div className="hero-copy">
          <p className="eyebrow">Sua biblioteca</p>
          <h1 className="hero-title">Nenhum jogo ainda</h1>
          <p className="hero-lead">
            Importe uma pasta com .exe ou ROMs. O Emulando Ramos organiza capas, filtros e o play
            com um clique.
          </p>
        </div>
        <div className="hero-art placeholder" aria-hidden />
      </section>
    )
  }

  const platformName = PLATFORMS.find((p) => p.id === game.platform)?.name ?? game.platform

  return (
    <section className="hero">
      <div
        className="hero-backdrop"
        style={
          game.coverUrl
            ? { backgroundImage: `url(${game.coverUrl})` }
            : undefined
        }
      />
      <div className="hero-copy">
        <p className="eyebrow">{platformName}</p>
        <h1 className="hero-title">{game.title}</h1>
        <p className="hero-lead">
          {game.synopsis ||
            'Sinopse ainda não raspada. Use “Buscar capa” para puxar metadata da RAWG ou ScreenScraper.'}
        </p>
        <div className="hero-actions">
          <button className="btn primary pulse" onClick={() => onPlay(game)}>
            Jogar
          </button>
          <button className="btn ghost" disabled={enriching} onClick={() => onEnrich(game)}>
            {enriching ? 'Buscando…' : 'Buscar capa'}
          </button>
          {onToggleFavorite && (
            <button
              className={game.favorite ? 'btn ghost fav-hero on' : 'btn ghost fav-hero'}
              onClick={() => onToggleFavorite(game)}
              aria-pressed={Boolean(game.favorite)}
            >
              {game.favorite ? '★ Favorito' : '☆ Favoritar'}
            </button>
          )}
        </div>
        {(game.year || game.developer) && (
          <p className="hero-meta">
            {[game.year, game.developer].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </section>
  )
}

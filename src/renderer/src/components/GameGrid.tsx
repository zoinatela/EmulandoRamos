import type { Game } from '../../../shared/types'
import { PLATFORMS } from '../../../shared/platforms'
import '../styles/grid.css'

interface Props {
  games: Game[]
  activeId?: string
  loading?: boolean
  emptyMessage?: string
  onSelect: (game: Game) => void
  onPlay: (game: Game) => void
  onToggleFavorite?: (game: Game) => void
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        d="M12 3.6l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 15.9l-4.8 2.52.92-5.34L4.24 9.24l5.36-.78L12 3.6z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function GameGrid({
  games,
  activeId,
  loading,
  emptyMessage,
  onSelect,
  onPlay,
  onToggleFavorite
}: Props) {
  if (loading) {
    return (
      <div className="empty-grid loading" role="status">
        <span className="spinner" aria-hidden />
        <p>Carregando biblioteca…</p>
      </div>
    )
  }

  if (games.length === 0) {
    return (
      <div className="empty-grid">
        <p>
          {emptyMessage ?? (
            <>
              Nada por aqui. Clique em <strong>Importar pasta</strong> para começar.
            </>
          )}
        </p>
      </div>
    )
  }

  return (
    <div className="grid" role="list">
      {games.map((game, i) => {
        const platform = PLATFORMS.find((p) => p.id === game.platform)?.name ?? game.platform
        return (
          <article
            key={game.id}
            role="listitem"
            className={game.id === activeId ? 'cover active' : 'cover'}
            style={{ animationDelay: `${Math.min(i, 20) * 30}ms` }}
            onClick={() => onSelect(game)}
            onDoubleClick={() => onPlay(game)}
          >
            <div
              className="cover-art"
              style={
                game.coverUrl
                  ? { backgroundImage: `url(${game.coverUrl})` }
                  : undefined
              }
            >
              {!game.coverUrl && <span className="cover-fallback">{game.title.slice(0, 1)}</span>}
              {onToggleFavorite && (
                <button
                  type="button"
                  className={game.favorite ? 'fav-btn on' : 'fav-btn'}
                  title={game.favorite ? 'Remover dos favoritos' : 'Favoritar'}
                  aria-label={game.favorite ? 'Remover dos favoritos' : 'Favoritar'}
                  aria-pressed={Boolean(game.favorite)}
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleFavorite(game)
                  }}
                >
                  <StarIcon filled={Boolean(game.favorite)} />
                </button>
              )}
            </div>
            <div className="cover-meta">
              <h3 title={game.title}>{game.title}</h3>
              <span>{platform}</span>
            </div>
          </article>
        )
      })}
    </div>
  )
}

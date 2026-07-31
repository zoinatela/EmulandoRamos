import type { Game } from '../../../shared/types'
import { PLATFORMS } from '../../../shared/platforms'
import '../styles/grid.css'

interface Props {
  games: Game[]
  activeId?: string
  onSelect: (game: Game) => void
  onPlay: (game: Game) => void
}

export default function GameGrid({ games, activeId, onSelect, onPlay }: Props) {
  if (games.length === 0) {
    return (
      <div className="empty-grid">
        <p>Nada por aqui. Clique em <strong>Importar pasta</strong> para começar.</p>
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

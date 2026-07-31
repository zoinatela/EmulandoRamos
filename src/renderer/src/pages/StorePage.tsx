import { useState } from 'react'
import type { StoreItem } from '../../../shared/types'
import '../styles/store.css'

/** Catálogo inicial de exemplo — troque/adicione seus repositórios depois. */
const CATALOG: StoreItem[] = [
  {
    id: 'demo-1',
    title: 'Exemplo Freeware (placeholder)',
    description:
      'Item de demonstração. Substitua downloadUrl pelos links dos seus repositórios de homebrew/freeware.',
    downloadUrl: '',
    platform: 'pc',
    source: 'local-catalog'
  }
]

export default function StorePage() {
  const [dest, setDest] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

  async function handleDownload(item: StoreItem) {
    if (!item.downloadUrl) {
      setMessage('Este item ainda não tem URL. Edite o catálogo em StorePage.tsx.')
      return
    }
    if (!dest.trim()) {
      setMessage('Informe a pasta de destino do download.')
      return
    }
    setBusyId(item.id)
    setMessage(null)
    try {
      const result = await window.emulando.downloadStoreItem(item.downloadUrl, dest.trim())
      setMessage(result.ok ? `Baixado: ${result.extractPath ?? result.archivePath}` : result.message)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="store">
      <header className="store-hero">
        <h1>Loja</h1>
        <p>
          Downloads de freeware e homebrew via links diretos. O módulo de download/unzip é genérico —
          adicione suas URLs no catálogo quando quiser.
        </p>
      </header>

      <label className="dest-field">
        Pasta de destino
        <input
          value={dest}
          onChange={(e) => setDest(e.target.value)}
          placeholder="C:\Games\Downloads"
        />
      </label>

      {message && <p className="toast">{message}</p>}

      <ul className="store-list">
        {CATALOG.map((item) => (
          <li key={item.id} className="store-item">
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className="meta">
                {item.platform.toUpperCase()} · {item.source}
              </span>
            </div>
            <button
              className="btn primary"
              disabled={busyId === item.id}
              onClick={() => handleDownload(item)}
            >
              {busyId === item.id ? 'Baixando…' : 'Baixar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

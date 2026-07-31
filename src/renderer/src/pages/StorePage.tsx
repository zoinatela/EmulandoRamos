import { useState } from 'react'
import { STORE_CATALOG } from '../../../shared/store-catalog'
import type { StoreItem } from '../../../shared/types'
import '../styles/store.css'

export default function StorePage() {
  const [dest, setDest] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [pendingScanPath, setPendingScanPath] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)

  async function handlePickDest() {
    const picked = await window.emulando.pickDirectory('Selecionar pasta de destino do download')
    if (picked) {
      setDest(picked)
      setMessage(null)
    }
  }

  async function handleDownload(item: StoreItem) {
    if (!item.downloadUrl) {
      setMessage(
        'Este item ainda não tem URL. Edite src/shared/store-catalog.ts e coloque um link direto de freeware/homebrew.'
      )
      return
    }
    if (!dest.trim()) {
      setMessage('Informe ou selecione a pasta de destino do download.')
      return
    }
    setBusyId(item.id)
    setMessage(null)
    setPendingScanPath(null)
    try {
      const result = await window.emulando.downloadStoreItem(item.downloadUrl, dest.trim())
      if (!result.ok) {
        setMessage(result.message ?? 'Falha no download.')
        return
      }
      const scanTarget = result.extractPath ?? dest.trim()
      setPendingScanPath(scanTarget)
      setMessage(
        result.extractPath
          ? `Baixado e extraído em: ${result.extractPath}`
          : `Baixado: ${result.archivePath}${result.message ? ` — ${result.message}` : ''}`
      )
    } finally {
      setBusyId(null)
    }
  }

  async function handleScanIntoLibrary() {
    if (!pendingScanPath) return
    setScanning(true)
    try {
      const result = await window.emulando.scanLibraryPath(pendingScanPath)
      setMessage(
        `Importado para a biblioteca: ${result.added} novos · ${result.skipped} já existiam`
      )
      setPendingScanPath(null)
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="store">
      <header className="store-hero">
        <h1>Loja</h1>
        <p>
          Downloads de freeware e homebrew via links diretos. Edite o catálogo em{' '}
          <code>src/shared/store-catalog.ts</code> para adicionar suas URLs.
        </p>
      </header>

      <label className="dest-field">
        Pasta de destino
        <div className="dest-row">
          <input
            value={dest}
            onChange={(e) => setDest(e.target.value)}
            placeholder="C:\Games\Downloads"
          />
          <button type="button" className="btn ghost" onClick={handlePickDest}>
            Escolher…
          </button>
        </div>
      </label>

      {message && (
        <p className="toast store-toast" role="status">
          {message}
        </p>
      )}

      {pendingScanPath && (
        <div className="scan-offer">
          <p>Deseja importar esta pasta para a biblioteca?</p>
          <code className="scan-path">{pendingScanPath}</code>
          <div className="scan-actions">
            <button
              type="button"
              className="btn primary"
              disabled={scanning}
              onClick={handleScanIntoLibrary}
            >
              {scanning ? 'Importando…' : 'Importar para a biblioteca'}
            </button>
            <button
              type="button"
              className="btn ghost"
              disabled={scanning}
              onClick={() => setPendingScanPath(null)}
            >
              Agora não
            </button>
          </div>
        </div>
      )}

      <ul className="store-list">
        {STORE_CATALOG.map((item) => (
          <li key={item.id} className="store-item">
            <div>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className="meta">
                {item.platform.toUpperCase()} · {item.source}
              </span>
            </div>
            <button
              type="button"
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

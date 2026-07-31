import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { PLATFORMS } from '../../../shared/platforms'
import type { StoreItem } from '../../../shared/types'
import '../styles/store.css'

type FormState = {
  id: string
  title: string
  description: string
  platform: string
  downloadUrl: string
  coverUrl: string
  source: string
}

const EMPTY_FORM: FormState = {
  id: '',
  title: '',
  description: '',
  platform: 'pc',
  downloadUrl: '',
  coverUrl: '',
  source: 'meu-link'
}

function newItemId(): string {
  return `user-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function platformLabel(id: string): string {
  return PLATFORMS.find((p) => p.id === id)?.name ?? id
}

function toForm(item?: StoreItem | null): FormState {
  if (!item) return { ...EMPTY_FORM, id: newItemId() }
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    platform: item.platform,
    downloadUrl: item.downloadUrl,
    coverUrl: item.coverUrl ?? '',
    source: item.source
  }
}

function toStoreItem(form: FormState): StoreItem {
  return {
    id: form.id.trim() || newItemId(),
    title: form.title.trim(),
    description: form.description.trim(),
    platform: form.platform.trim() || 'pc',
    downloadUrl: form.downloadUrl.trim(),
    coverUrl: form.coverUrl.trim() || undefined,
    source: form.source.trim() || 'meu-link'
  }
}

export default function StorePage() {
  const [items, setItems] = useState<StoreItem[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [dest, setDest] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [pendingScanPath, setPendingScanPath] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState<FormState>(() => toForm())
  const [saving, setSaving] = useState(false)

  const platformOptions = useMemo(
    () => PLATFORMS.filter((p) => p.id !== 'other'),
    []
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => {
      const hay = [
        item.title,
        item.description,
        item.platform,
        item.source,
        platformLabel(item.platform)
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [items, query])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        if (!window.emulando) return
        const list = await window.emulando.listCatalog()
        if (!cancelled) setItems(list)
      } catch (err) {
        if (!cancelled) {
          setMessage(err instanceof Error ? err.message : 'Falha ao carregar o catálogo.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  function openAdd() {
    setEditing(false)
    setForm(toForm())
    setFormOpen(true)
    setMessage(null)
  }

  function openEdit(item: StoreItem) {
    setEditing(true)
    setForm(toForm(item))
    setFormOpen(true)
    setMessage(null)
  }

  function closeForm() {
    setFormOpen(false)
    setSaving(false)
  }

  async function handleSaveForm(e: FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) {
      setMessage('Informe um título.')
      return
    }
    setSaving(true)
    try {
      const list = await window.emulando.upsertCatalogItem(toStoreItem(form))
      setItems(list)
      setMessage(editing ? 'Item atualizado.' : 'Item adicionado ao catálogo.')
      closeForm()
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Falha ao salvar o item.')
    } finally {
      setSaving(false)
    }
  }

  async function handleRemove(item: StoreItem) {
    const ok = window.confirm(`Remover “${item.title}” do catálogo?`)
    if (!ok) return
    try {
      const list = await window.emulando.removeCatalogItem(item.id)
      setItems(list)
      setMessage(`Removido: ${item.title}`)
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Falha ao remover.')
    }
  }

  async function handlePickDest() {
    const picked = await window.emulando.pickDirectory('Selecionar pasta de destino do download')
    if (picked) {
      setDest(picked)
      setMessage(null)
    }
  }

  async function importPath(path: string) {
    setScanning(true)
    try {
      const result = await window.emulando.scanLibraryPath(path)
      setMessage(
        `Importado para a biblioteca: ${result.added} novos · ${result.skipped} já existiam`
      )
      setPendingScanPath(null)
      return true
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Falha ao importar para a biblioteca.')
      return false
    } finally {
      setScanning(false)
    }
  }

  async function handleDownloadAndImport(item: StoreItem) {
    if (!item.downloadUrl.trim()) {
      setMessage('Este item não tem URL de download. Edite e informe um link direto.')
      return
    }
    if (!/^https?:\/\//i.test(item.downloadUrl.trim())) {
      setMessage('A URL deve começar com http:// ou https:// (link direto).')
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
      const imported = await importPath(scanTarget)
      if (!imported) {
        setPendingScanPath(scanTarget)
        setMessage(
          result.extractPath
            ? `Baixado e extraído em: ${result.extractPath}. Importação automática falhou — tente de novo.`
            : `Baixado: ${result.archivePath}. Importação automática falhou — tente de novo.`
        )
      }
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div className="store">
      <header className="store-hero">
        <h1>Loja</h1>
        <p>
          Gerencie seus próprios links de download direto (freeware, homebrew, demos). O catálogo
          fica salvo localmente neste PC.
        </p>
      </header>

      <div className="store-toolbar">
        <label className="store-search">
          Buscar
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Título, plataforma, origem…"
          />
        </label>
        <button type="button" className="btn primary" onClick={openAdd}>
          Adicionar link
        </button>
      </div>

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
              onClick={() => importPath(pendingScanPath)}
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

      {formOpen && (
        <form className="store-form" onSubmit={handleSaveForm}>
          <div className="store-form-head">
            <h2>{editing ? 'Editar item' : 'Novo link de download'}</h2>
            <button type="button" className="btn ghost" onClick={closeForm}>
              Fechar
            </button>
          </div>

          <label>
            Título
            <input
              required
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Nome do jogo / pacote"
            />
          </label>

          <label>
            Descrição
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Opcional"
            />
          </label>

          <div className="store-form-grid">
            <label>
              Plataforma
              <input
                list="store-platforms"
                value={form.platform}
                onChange={(e) => setForm((f) => ({ ...f, platform: e.target.value }))}
                placeholder="pc, snes, …"
              />
              <datalist id="store-platforms">
                {platformOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </datalist>
            </label>

            <label>
              Origem (rótulo)
              <input
                value={form.source}
                onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))}
                placeholder="meu-link"
              />
            </label>
          </div>

          <label>
            URL de download (direta)
            <input
              value={form.downloadUrl}
              onChange={(e) => setForm((f) => ({ ...f, downloadUrl: e.target.value }))}
              placeholder="https://…/arquivo.zip"
              inputMode="url"
              autoComplete="off"
            />
          </label>

          <label>
            URL da capa (opcional)
            <input
              value={form.coverUrl}
              onChange={(e) => setForm((f) => ({ ...f, coverUrl: e.target.value }))}
              placeholder="https://…/capa.jpg"
              inputMode="url"
              autoComplete="off"
            />
          </label>

          <div className="store-form-actions">
            <button type="submit" className="btn primary" disabled={saving}>
              {saving ? 'Salvando…' : editing ? 'Salvar alterações' : 'Adicionar ao catálogo'}
            </button>
            <button type="button" className="btn ghost" onClick={closeForm} disabled={saving}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="store-empty">Carregando catálogo…</p>
      ) : filtered.length === 0 ? (
        <p className="store-empty">
          {items.length === 0
            ? 'Nenhum item ainda. Clique em “Adicionar link” e cole uma URL direta.'
            : 'Nenhum resultado para esta busca.'}
        </p>
      ) : (
        <ul className="store-list">
          {filtered.map((item) => (
            <li key={item.id} className="store-item">
              <div className="store-item-body">
                {item.coverUrl ? (
                  <img className="store-cover" src={item.coverUrl} alt="" loading="lazy" />
                ) : null}
                <div>
                  <h2>{item.title}</h2>
                  {item.description ? <p>{item.description}</p> : null}
                  <span className="meta">
                    {platformLabel(item.platform)} · {item.source}
                    {!item.downloadUrl ? ' · sem URL' : ''}
                  </span>
                </div>
              </div>
              <div className="store-item-actions">
                <button
                  type="button"
                  className="btn primary"
                  disabled={busyId === item.id || scanning}
                  onClick={() => handleDownloadAndImport(item)}
                >
                  {busyId === item.id ? 'Baixando…' : 'Baixar e importar'}
                </button>
                <button
                  type="button"
                  className="btn ghost"
                  disabled={busyId === item.id}
                  onClick={() => openEdit(item)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="btn ghost danger"
                  disabled={busyId === item.id}
                  onClick={() => handleRemove(item)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

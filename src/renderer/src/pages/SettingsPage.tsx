import { useCallback, useEffect, useMemo, useState } from 'react'
import { PLATFORMS } from '../../../shared/platforms'
import type { PlatformId } from '../../../shared/types'
import '../styles/settings.css'

const DEFAULT_ARGS = '-L {core} "{rom}"'

type Draft = {
  executable: string
  argsTemplate: string
  corePath: string
}

const EMU_PLATFORMS = PLATFORMS.filter((p) => p.id !== 'pc' && p.id !== 'other')

function emptyDraft(platform: PlatformId): Draft {
  const def = PLATFORMS.find((p) => p.id === platform)
  return {
    executable: '',
    argsTemplate: DEFAULT_ARGS,
    corePath: def?.defaultCore ?? ''
  }
}

export default function SettingsPage() {
  const [platform, setPlatform] = useState<PlatformId>('snes')
  const [drafts, setDrafts] = useState<Partial<Record<PlatformId, Draft>>>({})
  const [apiStatus, setApiStatus] = useState({ rawg: false, screenscraper: false })
  const [toast, setToast] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const draft = drafts[platform] ?? emptyDraft(platform)
  const selectedDef = useMemo(
    () => PLATFORMS.find((p) => p.id === platform),
    [platform]
  )

  const loadAll = useCallback(async () => {
    if (!window.emulando) return
    const [status, saved] = await Promise.all([
      window.emulando.getApiStatus(),
      window.emulando.listEmulators()
    ])
    setApiStatus(status)

    const next: Partial<Record<PlatformId, Draft>> = {}
    for (const p of EMU_PLATFORMS) {
      const row = saved.find((e) => e.platform === p.id)
      next[p.id] = row
        ? {
            executable: row.executable,
            argsTemplate: row.argsTemplate || DEFAULT_ARGS,
            corePath: row.corePath ?? p.defaultCore ?? ''
          }
        : emptyDraft(p.id)
    }
    setDrafts(next)
    setLoaded(true)
  }, [])

  useEffect(() => {
    loadAll().catch(console.error)
  }, [loadAll])

  function updateDraft(patch: Partial<Draft>) {
    setDrafts((prev) => ({
      ...prev,
      [platform]: { ...(prev[platform] ?? emptyDraft(platform)), ...patch }
    }))
  }

  async function pickExecutable() {
    const path = await window.emulando.pickFile({
      title: 'Selecionar emulador (.exe)',
      filters: [
        { name: 'Executáveis', extensions: ['exe'] },
        { name: 'Todos', extensions: ['*'] }
      ]
    })
    if (path) updateDraft({ executable: path })
  }

  async function pickCore() {
    const path = await window.emulando.pickFile({
      title: 'Selecionar core libretro (.dll)',
      filters: [
        { name: 'Cores Libretro', extensions: ['dll'] },
        { name: 'Todos', extensions: ['*'] }
      ]
    })
    if (path) updateDraft({ corePath: path })
  }

  async function handleSave() {
    if (!draft.executable.trim()) {
      setToast('Informe o caminho do executável do emulador.')
      return
    }
    setSaving(true)
    setToast(null)
    try {
      await window.emulando.setEmulator(
        platform,
        draft.executable.trim(),
        draft.argsTemplate.trim() || DEFAULT_ARGS,
        draft.corePath.trim() || undefined
      )
      setToast(`Emulador salvo para ${selectedDef?.name ?? platform}.`)
    } catch (err) {
      setToast(`Erro ao salvar: ${String(err)}`)
    } finally {
      setSaving(false)
    }
  }

  function applyRetroArchDefaults() {
    updateDraft({
      argsTemplate: DEFAULT_ARGS,
      corePath: selectedDef?.defaultCore ?? ''
    })
  }

  const configuredCount = EMU_PLATFORMS.filter((p) => drafts[p.id]?.executable?.trim()).length

  return (
    <div className="settings">
      <header className="settings-hero">
        <h1>Configurações</h1>
        <p>
          Defina o RetroArch (ou outro emulador) por plataforma. Jogos de PC rodam o .exe
          diretamente — não precisam de emulador aqui.
        </p>
      </header>

      <section className="settings-section" aria-labelledby="api-heading">
        <h2 id="api-heading">Chaves de API</h2>
        <p className="settings-lead">
          As chaves ficam no arquivo <code>.env</code> na raiz do projeto (nunca neste painel).
          Reinicie o app após editar.
        </p>
        <ul className="api-status-list">
          <li>
            <span className={apiStatus.rawg ? 'status-dot on' : 'status-dot'} />
            <div>
              <strong>RAWG</strong>
              <span>{apiStatus.rawg ? 'Configurada' : 'Ausente'} — variável <code>RAWG_API_KEY</code></span>
            </div>
          </li>
          <li>
            <span className={apiStatus.screenscraper ? 'status-dot on' : 'status-dot'} />
            <div>
              <strong>ScreenScraper</strong>
              <span>
                {apiStatus.screenscraper ? 'Configurada' : 'Ausente'} —{' '}
                <code>SCREENSCRAPER_DEV_ID</code>, <code>SCREENSCRAPER_SSID</code> (e senha se
                necessário)
              </span>
            </div>
          </li>
        </ul>
      </section>

      <section className="settings-section" aria-labelledby="retro-heading">
        <h2 id="retro-heading">RetroArch — guia rápido</h2>
        <ol className="guide-list">
          <li>
            Instale o <strong>RetroArch</strong> e baixe os cores (Online Updater → Core
            Downloader).
          </li>
          <li>
            Em cada plataforma abaixo, aponte o executável para{' '}
            <code>retroarch.exe</code>.
          </li>
          <li>
            Use o template de args <code>-L {'{core}'} &quot;{'{rom}'}&quot;</code> (padrão).
          </li>
          <li>
            O campo <strong>core</strong> pode ser relativo à pasta do RetroArch (ex.:{' '}
            <code>cores\snes9x_libretro.dll</code>) ou um caminho absoluto.
          </li>
        </ol>
        <div className="core-hints">
          <p>Cores sugeridos:</p>
          <ul>
            {EMU_PLATFORMS.filter((p) => p.defaultCore).map((p) => (
              <li key={p.id}>
                <span>{p.name}</span>
                <code>{p.defaultCore}</code>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="settings-section emu-section" aria-labelledby="emu-heading">
        <div className="emu-head">
          <h2 id="emu-heading">Emuladores por plataforma</h2>
          <span className="emu-count">
            {loaded ? `${configuredCount} de ${EMU_PLATFORMS.length} configurados` : 'Carregando…'}
          </span>
        </div>

        <div className="emu-layout">
          <nav className="platform-nav" aria-label="Plataformas">
            {EMU_PLATFORMS.map((p) => {
              const has = Boolean(drafts[p.id]?.executable?.trim())
              return (
                <button
                  key={p.id}
                  type="button"
                  className={
                    platform === p.id
                      ? 'platform-nav-btn active'
                      : has
                        ? 'platform-nav-btn configured'
                        : 'platform-nav-btn'
                  }
                  onClick={() => setPlatform(p.id)}
                >
                  {p.name}
                </button>
              )
            })}
          </nav>

          <div className="emu-form">
            <h3>{selectedDef?.name}</h3>
            <p className="settings-lead">
              Extensões: {(selectedDef?.extensions ?? []).join(', ') || '—'}
            </p>

            <label className="field">
              Executável do emulador
              <div className="field-row">
                <input
                  value={draft.executable}
                  onChange={(e) => updateDraft({ executable: e.target.value })}
                  placeholder="C:\RetroArch\retroarch.exe"
                />
                <button type="button" className="btn ghost" onClick={pickExecutable}>
                  Procurar…
                </button>
              </div>
            </label>

            <label className="field">
              Template de argumentos
              <input
                value={draft.argsTemplate}
                onChange={(e) => updateDraft({ argsTemplate: e.target.value })}
                placeholder={DEFAULT_ARGS}
              />
              <span className="field-hint">
                Placeholders: <code>{'{rom}'}</code> (caminho do jogo), <code>{'{core}'}</code>{' '}
                (DLL libretro)
              </span>
            </label>

            <label className="field">
              Core (opcional)
              <div className="field-row">
                <input
                  value={draft.corePath}
                  onChange={(e) => updateDraft({ corePath: e.target.value })}
                  placeholder={selectedDef?.defaultCore ?? 'cores\\….dll'}
                />
                <button type="button" className="btn ghost" onClick={pickCore}>
                  Procurar…
                </button>
              </div>
              <span className="field-hint">
                Se vazio, usa o padrão da plataforma ao iniciar o jogo.
              </span>
            </label>

            <div className="emu-actions">
              <button type="button" className="btn ghost" onClick={applyRetroArchDefaults}>
                Restaurar padrão RetroArch
              </button>
              <button
                type="button"
                className="btn primary"
                disabled={saving || !loaded}
                onClick={handleSave}
              >
                {saving ? 'Salvando…' : 'Salvar plataforma'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {toast && (
        <p className="toast" role="status">
          {toast}
        </p>
      )}
    </div>
  )
}

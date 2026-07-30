import { useEffect, useState } from 'react'
import LibraryPage from './pages/LibraryPage'
import StorePage from './pages/StorePage'
import './styles/app.css'

type Tab = 'library' | 'store'

export default function App() {
  const [tab, setTab] = useState<Tab>('library')
  const [apiStatus, setApiStatus] = useState({ rawg: false, screenscraper: false })

  useEffect(() => {
    window.emulando?.getApiStatus().then(setApiStatus).catch(() => undefined)
  }, [])

  return (
    <div className="shell">
      <header className="topbar">
        <div className="brand-block">
          <p className="brand">Emulando Ramos</p>
          <p className="brand-sub">Launcher universal · PC &amp; retrogaming</p>
        </div>

        <nav className="nav" aria-label="Principal">
          <button
            className={tab === 'library' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setTab('library')}
          >
            Biblioteca
          </button>
          <button
            className={tab === 'store' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setTab('store')}
          >
            Loja
          </button>
        </nav>

        <div className="api-pills" title="Status das APIs (.env)">
          <span className={apiStatus.rawg ? 'pill on' : 'pill'}>RAWG</span>
          <span className={apiStatus.screenscraper ? 'pill on' : 'pill'}>ScreenScraper</span>
        </div>
      </header>

      <main className="main">{tab === 'library' ? <LibraryPage /> : <StorePage />}</main>
    </div>
  )
}

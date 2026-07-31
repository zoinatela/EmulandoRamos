import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import { join } from 'path'
import { config as loadEnv } from 'dotenv'
import { initDatabase, listGames, upsertGame, getGameById } from './db/database'
import { scanFolder } from './services/scanner'
import { launchGame } from './services/launcher'
import { scrapeRawg } from './services/scraper-rawg'
import { scrapeScreenScraper } from './services/scraper-screenscraper'
import { downloadAndExtract } from './services/downloader'
import type { Game, PlatformId } from '../shared/types'

loadEnv({ path: join(process.cwd(), '.env') })

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: false,
    backgroundColor: '#0a0a0c',
    title: 'Emulando Ramos',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow?.show())

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

const IPC_CHANNELS = [
  'game:list',
  'game:get',
  'game:play',
  'library:scan',
  'scraper:enrich',
  'store:download',
  'shell:openPath',
  'app:getApiStatus'
] as const

function registerIpc(): void {
  for (const ch of IPC_CHANNELS) {
    ipcMain.removeHandler(ch)
  }

  ipcMain.handle('game:list', async (_e, platform?: PlatformId | 'all', query?: string) => {
    return listGames(platform ?? 'all', query ?? '')
  })

  ipcMain.handle('game:get', async (_e, id: string) => getGameById(id))

  ipcMain.handle('game:play', async (_e, id: string) => {
    const game = getGameById(id)
    if (!game) return { ok: false, message: 'Jogo não encontrado' }
    return launchGame(game)
  })

  ipcMain.handle('library:scan', async () => {
    const win = BrowserWindow.getFocusedWindow() ?? mainWindow
    const result = await dialog.showOpenDialog(win ?? undefined!, {
      title: 'Selecionar pasta de jogos / ROMs',
      properties: ['openDirectory']
    })
    if (result.canceled || !result.filePaths[0]) {
      return { added: 0, skipped: 0, games: [] as Game[] }
    }
    return scanFolder(result.filePaths[0])
  })

  ipcMain.handle('scraper:enrich', async (_e, id: string) => {
    const game = getGameById(id)
    if (!game) return null

    const meta =
      game.platform === 'pc'
        ? await scrapeRawg(game.title)
        : await scrapeScreenScraper(game.title, game.platform)

    if (!meta) return game

    const updated: Game = {
      ...game,
      coverUrl: meta.coverUrl ?? game.coverUrl,
      synopsis: meta.synopsis ?? game.synopsis,
      year: meta.year ?? game.year,
      developer: meta.developer ?? game.developer
    }
    upsertGame(updated)
    return updated
  })

  ipcMain.handle('store:download', async (_e, url: string, destDir: string) => {
    return downloadAndExtract(url, destDir)
  })

  ipcMain.handle('shell:openPath', async (_e, target: string) => shell.openPath(target))

  ipcMain.handle('app:getApiStatus', async () => ({
    rawg: Boolean(process.env.RAWG_API_KEY),
    screenscraper: Boolean(
      process.env.SCREENSCRAPER_DEV_ID && process.env.SCREENSCRAPER_SSID
    )
  }))

  console.log('[ipc] handlers registrados')
}

// IPC antes do whenReady — evita race com o renderer
registerIpc()

app.whenReady().then(async () => {
  try {
    await initDatabase()
    console.log('[boot] database ok')
  } catch (err) {
    console.error('[boot] Falha no database:', err)
  }

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

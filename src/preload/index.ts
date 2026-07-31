import { contextBridge, ipcRenderer } from 'electron'
import type {
  DownloadResult,
  EmulatorConfig,
  Game,
  LaunchResult,
  PlatformId,
  ScanResult,
  StoreItem
} from '../shared/types'

export const api = {
  listGames: (platform?: PlatformId | 'all', query?: string): Promise<Game[]> =>
    ipcRenderer.invoke('game:list', platform, query),

  getGame: (id: string): Promise<Game | null> => ipcRenderer.invoke('game:get', id),

  playGame: (id: string): Promise<LaunchResult> => ipcRenderer.invoke('game:play', id),

  scanLibrary: (): Promise<ScanResult> => ipcRenderer.invoke('library:scan'),

  /** Escaneia uma pasta já conhecida (sem abrir o diálogo). */
  scanLibraryPath: (dirPath: string): Promise<ScanResult> =>
    ipcRenderer.invoke('library:scanPath', dirPath),

  pickDirectory: (title?: string): Promise<string | null> =>
    ipcRenderer.invoke('dialog:pickDirectory', title),

  pickFile: (opts?: {
    title?: string
    filters?: { name: string; extensions: string[] }[]
  }): Promise<string | null> => ipcRenderer.invoke('dialog:pickFile', opts),

  enrichGame: (id: string): Promise<Game | null> => ipcRenderer.invoke('scraper:enrich', id),

  downloadStoreItem: (url: string, destDir: string): Promise<DownloadResult> =>
    ipcRenderer.invoke('store:download', url, destDir),

  listCatalog: (): Promise<StoreItem[]> => ipcRenderer.invoke('catalog:list'),

  saveCatalog: (items: StoreItem[]): Promise<StoreItem[]> =>
    ipcRenderer.invoke('catalog:save', items),

  upsertCatalogItem: (item: StoreItem): Promise<StoreItem[]> =>
    ipcRenderer.invoke('catalog:upsert', item),

  removeCatalogItem: (id: string): Promise<StoreItem[]> =>
    ipcRenderer.invoke('catalog:remove', id),

  openPath: (path: string): Promise<string> => ipcRenderer.invoke('shell:openPath', path),

  getApiStatus: (): Promise<{ rawg: boolean; screenscraper: boolean }> =>
    ipcRenderer.invoke('app:getApiStatus'),

  setFavorite: (id: string, favorite: boolean): Promise<Game | null> =>
    ipcRenderer.invoke('game:favorite', id, favorite),

  getEmulator: (platform: PlatformId): Promise<EmulatorConfig | null> =>
    ipcRenderer.invoke('emulator:get', platform),

  listEmulators: (): Promise<EmulatorConfig[]> => ipcRenderer.invoke('emulator:list'),

  setEmulator: (
    platform: PlatformId,
    executable: string,
    argsTemplate: string,
    corePath?: string
  ): Promise<{ ok: boolean }> =>
    ipcRenderer.invoke('emulator:set', platform, executable, argsTemplate, corePath)
}

contextBridge.exposeInMainWorld('emulando', api)

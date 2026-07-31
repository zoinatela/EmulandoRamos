import { contextBridge, ipcRenderer } from 'electron'
import type { Game, LaunchResult, PlatformId, ScanResult } from '../shared/types'

export const api = {
  listGames: (platform?: PlatformId | 'all', query?: string): Promise<Game[]> =>
    ipcRenderer.invoke('game:list', platform, query),

  getGame: (id: string): Promise<Game | null> => ipcRenderer.invoke('game:get', id),

  playGame: (id: string): Promise<LaunchResult> => ipcRenderer.invoke('game:play', id),

  scanLibrary: (): Promise<ScanResult> => ipcRenderer.invoke('library:scan'),

  enrichGame: (id: string): Promise<Game | null> => ipcRenderer.invoke('scraper:enrich', id),

  downloadStoreItem: (url: string, destDir: string) =>
    ipcRenderer.invoke('store:download', url, destDir),

  openPath: (path: string): Promise<string> => ipcRenderer.invoke('shell:openPath', path),

  getApiStatus: (): Promise<{ rawg: boolean; screenscraper: boolean }> =>
    ipcRenderer.invoke('app:getApiStatus')
}

contextBridge.exposeInMainWorld('emulando', api)

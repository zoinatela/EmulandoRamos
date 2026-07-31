/** Identificador de plataforma (slug Batocera / app). */
export type PlatformId = string

export interface PlatformDef {
  id: PlatformId
  name: string
  family: string
  extensions: string[]
  /** Ex.: cores\snes9x_libretro.dll — relativo ao emulador ou absoluto */
  defaultCore?: string
  /** Palavras no caminho da pasta que ajudam a detectar plataforma */
  pathHints?: string[]
  /** ID do sistema na API ScreenScraper (systemeid) */
  screenscraperId?: number
}

export interface Game {
  id: string
  title: string
  filePath: string
  platform: PlatformId
  coverUrl?: string
  synopsis?: string
  year?: number
  developer?: string
  favorite?: boolean
  lastPlayedAt?: string
  createdAt: string
}

export interface EmulatorConfig {
  platform: PlatformId
  executable: string
  argsTemplate: string
  corePath?: string
}

export interface StoreItem {
  id: string
  title: string
  description: string
  downloadUrl: string
  platform: PlatformId
  coverUrl?: string
  source: string
}

export interface ScanResult {
  added: number
  skipped: number
  games: Game[]
}

export interface LaunchResult {
  ok: boolean
  message?: string
}

export interface DownloadResult {
  ok: boolean
  archivePath?: string
  extractPath?: string
  message?: string
}

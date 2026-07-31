export type PlatformId =
  | 'pc'
  | 'snes'
  | 'nes'
  | 'n64'
  | 'gb'
  | 'gba'
  | 'nds'
  | 'ps1'
  | 'ps2'
  | 'psp'
  | 'dreamcast'
  | 'genesis'
  | 'mastersystem'
  | 'other'

export interface PlatformDef {
  id: PlatformId
  name: string
  extensions: string[]
  /** Ex.: cores\snes9x_libretro.dll — relativo ao emulador ou absoluto */
  defaultCore?: string
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
  /** Caminho do executável (ex.: retroarch.exe) */
  executable: string
  /** Template: {rom} {core} — args separados por espaço */
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

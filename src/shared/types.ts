export type PlatformId =
  | 'pc'
  // Nintendo
  | 'nes'
  | 'snes'
  | 'n64'
  | 'gamecube'
  | 'wii'
  | 'wiiu'
  | 'switch'
  | 'gb'
  | 'gbc'
  | 'gba'
  | 'nds'
  | '3ds'
  | 'virtualboy'
  // Sony
  | 'ps1'
  | 'ps2'
  | 'ps3'
  | 'psp'
  | 'psvita'
  // Sega
  | 'mastersystem'
  | 'genesis'
  | 'segacd'
  | 'sega32x'
  | 'saturn'
  | 'dreamcast'
  | 'gamegear'
  | 'sg1000'
  // Microsoft
  | 'xbox'
  | 'xbox360'
  // Others
  | 'neogeo'
  | 'neogeocd'
  | 'neogeopocket'
  | 'arcade'
  | 'pcengine'
  | 'supergrafx'
  | 'wonderswan'
  | 'wonderswancolor'
  | 'atari2600'
  | 'atari5200'
  | 'atari7800'
  | 'jaguar'
  | 'lynx'
  | 'amiga'
  | 'c64'
  | 'msx'
  | 'dos'
  | 'scummvm'
  | 'other'

export interface PlatformDef {
  id: PlatformId
  name: string
  family: string
  extensions: string[]
  /** Ex.: cores\snes9x_libretro.dll — relativo ao emulador ou absoluto */
  defaultCore?: string
  /** Palavras no caminho da pasta que ajudam a detectar plataforma */
  pathHints?: string[]
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

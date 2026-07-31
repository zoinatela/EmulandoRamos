import type { PlatformDef, PlatformId } from './types'

export const PLATFORMS: PlatformDef[] = [
  { id: 'pc', name: 'PC', extensions: ['.exe', '.lnk', '.bat', '.cmd'] },
  {
    id: 'snes',
    name: 'Super Nintendo',
    extensions: ['.smc', '.sfc', '.fig', '.swc'],
    defaultCore: 'cores\\snes9x_libretro.dll'
  },
  { id: 'nes', name: 'NES', extensions: ['.nes', '.fds'], defaultCore: 'cores\\fceumm_libretro.dll' },
  { id: 'n64', name: 'Nintendo 64', extensions: ['.n64', '.z64', '.v64'], defaultCore: 'cores\\mupen64plus_next_libretro.dll' },
  { id: 'gb', name: 'Game Boy', extensions: ['.gb'], defaultCore: 'cores\\gambatte_libretro.dll' },
  { id: 'gba', name: 'Game Boy Advance', extensions: ['.gba'], defaultCore: 'cores\\mgba_libretro.dll' },
  { id: 'nds', name: 'Nintendo DS', extensions: ['.nds'], defaultCore: 'cores\\melonds_libretro.dll' },
  { id: 'ps1', name: 'PlayStation', extensions: ['.cue', '.bin', '.iso', '.chd', '.pbp'], defaultCore: 'cores\\pcsx_rearmed_libretro.dll' },
  { id: 'ps2', name: 'PlayStation 2', extensions: ['.iso', '.bin', '.chd'], defaultCore: 'cores\\pcsx2_libretro.dll' },
  { id: 'psp', name: 'PSP', extensions: ['.iso', '.cso', '.pbp'], defaultCore: 'cores\\ppsspp_libretro.dll' },
  { id: 'dreamcast', name: 'Dreamcast', extensions: ['.gdi', '.cdi', '.chd'], defaultCore: 'cores\\flycast_libretro.dll' },
  { id: 'genesis', name: 'Mega Drive', extensions: ['.md', '.gen', '.bin', '.smd'], defaultCore: 'cores\\genesis_plus_gx_libretro.dll' },
  { id: 'mastersystem', name: 'Master System', extensions: ['.sms'], defaultCore: 'cores\\genesis_plus_gx_libretro.dll' },
  { id: 'other', name: 'Outros', extensions: [] }
]

export function detectPlatform(filePath: string): PlatformId {
  const lower = filePath.toLowerCase()
  const ext = lower.slice(lower.lastIndexOf('.'))

  if (['.exe', '.lnk', '.bat', '.cmd'].includes(ext)) return 'pc'

  // Preferência por extensões exclusivas antes das ambíguas (.bin, .iso)
  const exclusive: PlatformId[] = [
    'snes',
    'nes',
    'n64',
    'gb',
    'gba',
    'nds',
    'psp',
    'dreamcast',
    'genesis',
    'mastersystem'
  ]

  for (const id of exclusive) {
    const def = PLATFORMS.find((p) => p.id === id)
    if (def?.extensions.includes(ext)) return id
  }

  if (['.cue', '.pbp'].includes(ext)) return 'ps1'
  if (['.iso', '.bin', '.chd'].includes(ext)) return 'ps1'

  return 'other'
}

export function titleFromFilename(filePath: string): string {
  const base = filePath.replace(/^.*[\\/]/, '')
  return base
    .replace(/\.[^.]+$/, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const ALL_EXTENSIONS = Array.from(
  new Set(PLATFORMS.flatMap((p) => p.extensions))
)

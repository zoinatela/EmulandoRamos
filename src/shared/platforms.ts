import type { PlatformDef, PlatformId } from './types'

export const PLATFORMS: PlatformDef[] = [
  {
    id: 'pc',
    name: 'PC',
    family: 'PC',
    extensions: ['.exe', '.lnk', '.bat', '.cmd', '.url']
  },

  // ——— Nintendo ———
  {
    id: 'nes',
    name: 'NES / Famicom',
    family: 'Nintendo',
    extensions: ['.nes', '.fds', '.unf', '.unif'],
    defaultCore: 'cores\\fceumm_libretro.dll',
    pathHints: ['nes', 'famicom', 'nintendo entertainment']
  },
  {
    id: 'snes',
    name: 'Super Nintendo',
    family: 'Nintendo',
    extensions: ['.smc', '.sfc', '.fig', '.swc'],
    defaultCore: 'cores\\snes9x_libretro.dll',
    pathHints: ['snes', 'super nintendo', 'super famicom', 'sfc']
  },
  {
    id: 'n64',
    name: 'Nintendo 64',
    family: 'Nintendo',
    extensions: ['.n64', '.z64', '.v64'],
    defaultCore: 'cores\\mupen64plus_next_libretro.dll',
    pathHints: ['n64', 'nintendo 64', 'nintendo64']
  },
  {
    id: 'gamecube',
    name: 'GameCube',
    family: 'Nintendo',
    extensions: ['.iso', '.gcm', '.gcz', '.rvz', '.wia', '.dol', '.elf'],
    defaultCore: 'cores\\dolphin_libretro.dll',
    pathHints: ['gamecube', 'gc', 'ngc', 'dolphin']
  },
  {
    id: 'wii',
    name: 'Wii',
    family: 'Nintendo',
    extensions: ['.iso', '.wbfs', '.wad', '.rvz', '.wia', '.dol'],
    defaultCore: 'cores\\dolphin_libretro.dll',
    pathHints: ['wii', 'wbfs']
  },
  {
    id: 'wiiu',
    name: 'Wii U',
    family: 'Nintendo',
    extensions: ['.wud', '.wux', '.rpx', '.wad'],
    pathHints: ['wiiu', 'wii u', 'cemu']
  },
  {
    id: 'switch',
    name: 'Nintendo Switch',
    family: 'Nintendo',
    extensions: ['.xci', '.nsp', '.nca', '.nro'],
    pathHints: ['switch', 'yuzu', 'ryujinx']
  },
  {
    id: 'gb',
    name: 'Game Boy',
    family: 'Nintendo',
    extensions: ['.gb'],
    defaultCore: 'cores\\gambatte_libretro.dll',
    pathHints: ['game boy', 'gameboy', '\\gb\\']
  },
  {
    id: 'gbc',
    name: 'Game Boy Color',
    family: 'Nintendo',
    extensions: ['.gbc'],
    defaultCore: 'cores\\gambatte_libretro.dll',
    pathHints: ['gbc', 'game boy color', 'gameboy color']
  },
  {
    id: 'gba',
    name: 'Game Boy Advance',
    family: 'Nintendo',
    extensions: ['.gba', '.agb', '.mb'],
    defaultCore: 'cores\\mgba_libretro.dll',
    pathHints: ['gba', 'game boy advance']
  },
  {
    id: 'nds',
    name: 'Nintendo DS',
    family: 'Nintendo',
    extensions: ['.nds', '.dsi'],
    defaultCore: 'cores\\melonds_libretro.dll',
    pathHints: ['nds', 'nintendo ds', 'desmume']
  },
  {
    id: '3ds',
    name: 'Nintendo 3DS',
    family: 'Nintendo',
    extensions: ['.3ds', '.cci', '.cxi', '.app', '.cia'],
    defaultCore: 'cores\\citra_libretro.dll',
    pathHints: ['3ds', 'citra']
  },
  {
    id: 'virtualboy',
    name: 'Virtual Boy',
    family: 'Nintendo',
    extensions: ['.vb'],
    defaultCore: 'cores\\beetle_vb_libretro.dll',
    pathHints: ['virtual boy', 'virtualboy']
  },

  // ——— Sony ———
  {
    id: 'ps1',
    name: 'PlayStation',
    family: 'Sony',
    extensions: ['.cue', '.bin', '.iso', '.chd', '.pbp', '.img', '.mdf', '.toc'],
    defaultCore: 'cores\\pcsx_rearmed_libretro.dll',
    pathHints: ['ps1', 'psx', 'playstation', 'psone']
  },
  {
    id: 'ps2',
    name: 'PlayStation 2',
    family: 'Sony',
    extensions: ['.iso', '.bin', '.chd', '.cso', '.gz'],
    defaultCore: 'cores\\pcsx2_libretro.dll',
    pathHints: ['ps2', 'playstation 2', 'pcsx2']
  },
  {
    id: 'ps3',
    name: 'PlayStation 3',
    family: 'Sony',
    extensions: ['.iso', '.pkg', '.rap'],
    pathHints: ['ps3', 'playstation 3', 'rpcs3']
  },
  {
    id: 'psp',
    name: 'PSP',
    family: 'Sony',
    extensions: ['.iso', '.cso', '.pbp', '.prx'],
    defaultCore: 'cores\\ppsspp_libretro.dll',
    pathHints: ['psp', 'ppsspp']
  },
  {
    id: 'psvita',
    name: 'PS Vita',
    family: 'Sony',
    extensions: ['.vpk', '.mai', '.psv'],
    pathHints: ['vita', 'psvita', 'ps vita', 'vita3k']
  },

  // ——— Sega ———
  {
    id: 'sg1000',
    name: 'SG-1000',
    family: 'Sega',
    extensions: ['.sg'],
    defaultCore: 'cores\\genesis_plus_gx_libretro.dll',
    pathHints: ['sg-1000', 'sg1000']
  },
  {
    id: 'mastersystem',
    name: 'Master System',
    family: 'Sega',
    extensions: ['.sms'],
    defaultCore: 'cores\\genesis_plus_gx_libretro.dll',
    pathHints: ['master system', 'mastersystem', 'sms']
  },
  {
    id: 'genesis',
    name: 'Mega Drive / Genesis',
    family: 'Sega',
    extensions: ['.md', '.gen', '.smd'],
    defaultCore: 'cores\\genesis_plus_gx_libretro.dll',
    pathHints: ['mega drive', 'megadrive', 'genesis', 'md']
  },
  {
    id: 'sega32x',
    name: '32X',
    family: 'Sega',
    extensions: ['.32x', '.bin'],
    defaultCore: 'cores\\picodrive_libretro.dll',
    pathHints: ['32x', 'sega 32x']
  },
  {
    id: 'segacd',
    name: 'Sega CD / Mega-CD',
    family: 'Sega',
    extensions: ['.cue', '.iso', '.chd', '.bin'],
    defaultCore: 'cores\\genesis_plus_gx_libretro.dll',
    pathHints: ['sega cd', 'megacd', 'mega-cd', 'segacd']
  },
  {
    id: 'saturn',
    name: 'Sega Saturn',
    family: 'Sega',
    extensions: ['.cue', '.iso', '.chd', '.bin', '.mds'],
    defaultCore: 'cores\\mednafen_saturn_libretro.dll',
    pathHints: ['saturn', 'sega saturn']
  },
  {
    id: 'dreamcast',
    name: 'Dreamcast',
    family: 'Sega',
    extensions: ['.gdi', '.cdi', '.chd', '.cue'],
    defaultCore: 'cores\\flycast_libretro.dll',
    pathHints: ['dreamcast', 'dc', 'flycast']
  },
  {
    id: 'gamegear',
    name: 'Game Gear',
    family: 'Sega',
    extensions: ['.gg'],
    defaultCore: 'cores\\genesis_plus_gx_libretro.dll',
    pathHints: ['game gear', 'gamegear']
  },

  // ——— Microsoft ———
  {
    id: 'xbox',
    name: 'Xbox',
    family: 'Microsoft',
    extensions: ['.iso', '.xbe'],
    pathHints: ['xbox', 'xemu', '\\og xbox']
  },
  {
    id: 'xbox360',
    name: 'Xbox 360',
    family: 'Microsoft',
    extensions: ['.iso', '.god', '.xex'],
    pathHints: ['xbox 360', 'xbox360', 'xenia']
  },

  // ——— SNK / Arcade / others ———
  {
    id: 'neogeo',
    name: 'Neo Geo',
    family: 'SNK',
    extensions: ['.zip', '.neo'],
    defaultCore: 'cores\\fbneo_libretro.dll',
    pathHints: ['neogeo', 'neo geo', 'neo-geo']
  },
  {
    id: 'neogeocd',
    name: 'Neo Geo CD',
    family: 'SNK',
    extensions: ['.cue', '.chd', '.iso'],
    defaultCore: 'cores\\neocd_libretro.dll',
    pathHints: ['neogeo cd', 'neo geo cd']
  },
  {
    id: 'neogeopocket',
    name: 'Neo Geo Pocket',
    family: 'SNK',
    extensions: ['.ngp', '.ngc'],
    defaultCore: 'cores\\mednafen_ngp_libretro.dll',
    pathHints: ['neo geo pocket', 'ngp']
  },
  {
    id: 'arcade',
    name: 'Arcade (MAME)',
    family: 'Arcade',
    extensions: ['.zip', '.7z'],
    defaultCore: 'cores\\mame_libretro.dll',
    pathHints: ['arcade', 'mame', 'fbneo', 'fba']
  },
  {
    id: 'pcengine',
    name: 'PC Engine / TurboGrafx',
    family: 'NEC',
    extensions: ['.pce', '.sgx', '.cue', '.chd'],
    defaultCore: 'cores\\mednafen_pce_fast_libretro.dll',
    pathHints: ['pc engine', 'pcengine', 'turbografx', 'tg16']
  },
  {
    id: 'supergrafx',
    name: 'SuperGrafx',
    family: 'NEC',
    extensions: ['.sgx'],
    defaultCore: 'cores\\mednafen_supergrafx_libretro.dll',
    pathHints: ['supergrafx']
  },
  {
    id: 'wonderswan',
    name: 'WonderSwan',
    family: 'Bandai',
    extensions: ['.ws'],
    defaultCore: 'cores\\mednafen_wswan_libretro.dll',
    pathHints: ['wonderswan']
  },
  {
    id: 'wonderswancolor',
    name: 'WonderSwan Color',
    family: 'Bandai',
    extensions: ['.wsc'],
    defaultCore: 'cores\\mednafen_wswan_libretro.dll',
    pathHints: ['wonderswan color']
  },
  {
    id: 'atari2600',
    name: 'Atari 2600',
    family: 'Atari',
    extensions: ['.a26', '.bin'],
    defaultCore: 'cores\\stella_libretro.dll',
    pathHints: ['atari 2600', 'atari2600', 'vcs']
  },
  {
    id: 'atari5200',
    name: 'Atari 5200',
    family: 'Atari',
    extensions: ['.a52', '.bin'],
    defaultCore: 'cores\\atari800_libretro.dll',
    pathHints: ['atari 5200', 'atari5200']
  },
  {
    id: 'atari7800',
    name: 'Atari 7800',
    family: 'Atari',
    extensions: ['.a78', '.bin'],
    defaultCore: 'cores\\prosystem_libretro.dll',
    pathHints: ['atari 7800', 'atari7800']
  },
  {
    id: 'jaguar',
    name: 'Atari Jaguar',
    family: 'Atari',
    extensions: ['.j64', '.jag', '.cof'],
    defaultCore: 'cores\\virtualjaguar_libretro.dll',
    pathHints: ['jaguar', 'atari jaguar']
  },
  {
    id: 'lynx',
    name: 'Atari Lynx',
    family: 'Atari',
    extensions: ['.lnx'],
    defaultCore: 'cores\\handy_libretro.dll',
    pathHints: ['lynx', 'atari lynx']
  },
  {
    id: 'amiga',
    name: 'Amiga',
    family: 'Commodore',
    extensions: ['.adf', '.ipf', '.lha', '.hdf'],
    defaultCore: 'cores\\puae_libretro.dll',
    pathHints: ['amiga']
  },
  {
    id: 'c64',
    name: 'Commodore 64',
    family: 'Commodore',
    extensions: ['.d64', '.t64', '.prg', '.crt'],
    defaultCore: 'cores\\vice_x64_libretro.dll',
    pathHints: ['c64', 'commodore 64']
  },
  {
    id: 'msx',
    name: 'MSX',
    family: 'Microsoft',
    extensions: ['.rom', '.mx1', '.mx2', '.dsk'],
    defaultCore: 'cores\\bluemsx_libretro.dll',
    pathHints: ['msx']
  },
  {
    id: 'dos',
    name: 'DOS',
    family: 'PC',
    extensions: ['.exe', '.com', '.bat'],
    defaultCore: 'cores\\dosbox_pure_libretro.dll',
    pathHints: ['dos', 'dosbox', 'ms-dos']
  },
  {
    id: 'scummvm',
    name: 'ScummVM',
    family: 'PC',
    extensions: [],
    defaultCore: 'cores\\scummvm_libretro.dll',
    pathHints: ['scummvm']
  },
  { id: 'other', name: 'Outros', family: 'Outros', extensions: [] }
]

/** Extensões únicas (só uma plataforma) — prioridade na detecção */
const UNIQUE_EXT_PLATFORM: Record<string, PlatformId> = {
  '.nes': 'nes',
  '.fds': 'nes',
  '.smc': 'snes',
  '.sfc': 'snes',
  '.n64': 'n64',
  '.z64': 'n64',
  '.v64': 'n64',
  '.gb': 'gb',
  '.gbc': 'gbc',
  '.gba': 'gba',
  '.nds': 'nds',
  '.3ds': '3ds',
  '.cia': '3ds',
  '.vb': 'virtualboy',
  '.xci': 'switch',
  '.nsp': 'switch',
  '.nro': 'switch',
  '.wbfs': 'wii',
  '.gcm': 'gamecube',
  '.rvz': 'gamecube',
  '.vpk': 'psvita',
  '.sms': 'mastersystem',
  '.md': 'genesis',
  '.gen': 'genesis',
  '.smd': 'genesis',
  '.gg': 'gamegear',
  '.32x': 'sega32x',
  '.gdi': 'dreamcast',
  '.cdi': 'dreamcast',
  '.pce': 'pcengine',
  '.sgx': 'supergrafx',
  '.ws': 'wonderswan',
  '.wsc': 'wonderswancolor',
  '.a26': 'atari2600',
  '.a52': 'atari5200',
  '.a78': 'atari7800',
  '.j64': 'jaguar',
  '.lnx': 'lynx',
  '.adf': 'amiga',
  '.d64': 'c64',
  '.ngp': 'neogeopocket',
  '.pbp': 'psp'
}

function hintScore(filePath: string, platform: PlatformDef): number {
  const lower = filePath.toLowerCase().replace(/\//g, '\\')
  let score = 0
  for (const hint of platform.pathHints ?? []) {
    if (lower.includes(hint.toLowerCase())) score += hint.length
  }
  return score
}

export function detectPlatform(filePath: string): PlatformId {
  const lower = filePath.toLowerCase()
  const ext = lower.slice(lower.lastIndexOf('.'))

  // PC shortcuts / launchers (pasta dos não conta como DOS)
  if (['.lnk', '.url'].includes(ext)) return 'pc'
  if (['.exe', '.bat', '.cmd'].includes(ext)) {
    if (hintScore(filePath, PLATFORMS.find((p) => p.id === 'dos')!) > 0) return 'dos'
    return 'pc'
  }

  if (UNIQUE_EXT_PLATFORM[ext]) return UNIQUE_EXT_PLATFORM[ext]

  // Extensões ambíguas: usa pasta / nome
  const ambiguous = ['.iso', '.bin', '.chd', '.cue', '.zip', '.7z', '.cso', '.img']
  if (ambiguous.includes(ext)) {
    let best: PlatformId = 'other'
    let bestScore = 0
    for (const p of PLATFORMS) {
      if (p.id === 'pc' || p.id === 'other') continue
      if (!p.extensions.includes(ext) && !ambiguous.includes(ext)) continue
      const s = hintScore(filePath, p)
      if (s > bestScore) {
        bestScore = s
        best = p.id
      }
    }
    if (bestScore > 0) return best

    if (ext === '.cue' || ext === '.pbp') return 'ps1'
    if (ext === '.zip' || ext === '.7z') return 'arcade'
    if (ext === '.iso' || ext === '.bin' || ext === '.chd') return 'ps1'
  }

  for (const p of PLATFORMS) {
    if (p.extensions.includes(ext)) return p.id
  }

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

export const PLATFORM_FAMILIES = Array.from(
  new Set(PLATFORMS.filter((p) => p.id !== 'other').map((p) => p.family))
)

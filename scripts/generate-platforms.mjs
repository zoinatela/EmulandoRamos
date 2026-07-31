/**
 * Gera src/shared/platforms.ts a partir de .tmp-systems.json
 * + mapeamentos ScreenScraper (Batocera ScreenScraper.cpp / PlatformId.cpp).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const systems = JSON.parse(fs.readFileSync(path.join(root, '.tmp-systems.json'), 'utf8'))
const ssCpp = fs.readFileSync(path.join(root, '.tmp-screenscraper.cpp'), 'utf8')
const platCpp = fs.readFileSync(path.join(root, '.tmp-platformid.cpp'), 'utf8')

const enumToSs = {}
for (const m of ssCpp.matchAll(/\{\s*([A-Z0-9_]+),\s*(\d+)\s*\}/g)) {
  enumToSs[m[1]] = Number(m[2])
}

const strToEnum = {}
for (const m of platCpp.matchAll(/\{\s*"([^"]+)",\s*([A-Z0-9_]+)\s*\}/g)) {
  strToEnum[m[1]] = m[2]
}

const strToSs = {}
for (const [k, e] of Object.entries(strToEnum)) {
  if (enumToSs[e] != null) strToSs[k] = enumToSs[e]
}

const batoceraToAppId = {
  psx: 'ps1',
  gc: 'gamecube',
  ngp: 'neogeopocket',
  megacd: 'segacd',
  megadrive: 'genesis',
  atarilynx: 'lynx',
  atarijaguar: 'jaguar',
  n3ds: '3ds',
  watara: 'supervision',
  wswan: 'wonderswan',
  wswanc: 'wonderswancolor',
  amiga500: 'amiga',
  mame: 'arcade',
  msx1: 'msx',
  fbneo: 'arcade'
}

const defaultCores = {
  nes: 'cores\\fceumm_libretro.dll',
  snes: 'cores\\snes9x_libretro.dll',
  n64: 'cores\\mupen64plus_next_libretro.dll',
  gamecube: 'cores\\dolphin_libretro.dll',
  wii: 'cores\\dolphin_libretro.dll',
  gb: 'cores\\gambatte_libretro.dll',
  gbc: 'cores\\gambatte_libretro.dll',
  gba: 'cores\\mgba_libretro.dll',
  nds: 'cores\\melonds_libretro.dll',
  '3ds': 'cores\\citra_libretro.dll',
  virtualboy: 'cores\\beetle_vb_libretro.dll',
  ps1: 'cores\\pcsx_rearmed_libretro.dll',
  ps2: 'cores\\pcsx2_libretro.dll',
  psp: 'cores\\ppsspp_libretro.dll',
  sg1000: 'cores\\genesis_plus_gx_libretro.dll',
  mastersystem: 'cores\\genesis_plus_gx_libretro.dll',
  genesis: 'cores\\genesis_plus_gx_libretro.dll',
  sega32x: 'cores\\picodrive_libretro.dll',
  segacd: 'cores\\genesis_plus_gx_libretro.dll',
  saturn: 'cores\\mednafen_saturn_libretro.dll',
  dreamcast: 'cores\\flycast_libretro.dll',
  gamegear: 'cores\\genesis_plus_gx_libretro.dll',
  neogeo: 'cores\\fbneo_libretro.dll',
  neogeocd: 'cores\\neocd_libretro.dll',
  neogeopocket: 'cores\\mednafen_ngp_libretro.dll',
  ngpc: 'cores\\mednafen_ngp_libretro.dll',
  arcade: 'cores\\mame_libretro.dll',
  mame: 'cores\\mame_libretro.dll',
  fbneo: 'cores\\fbneo_libretro.dll',
  pcengine: 'cores\\mednafen_pce_fast_libretro.dll',
  pcenginecd: 'cores\\mednafen_pce_libretro.dll',
  supergrafx: 'cores\\mednafen_supergrafx_libretro.dll',
  wonderswan: 'cores\\mednafen_wswan_libretro.dll',
  wonderswancolor: 'cores\\mednafen_wswan_libretro.dll',
  atari2600: 'cores\\stella_libretro.dll',
  atari5200: 'cores\\atari800_libretro.dll',
  atari7800: 'cores\\prosystem_libretro.dll',
  jaguar: 'cores\\virtualjaguar_libretro.dll',
  lynx: 'cores\\handy_libretro.dll',
  amiga: 'cores\\puae_libretro.dll',
  c64: 'cores\\vice_x64_libretro.dll',
  msx: 'cores\\bluemsx_libretro.dll',
  msx2: 'cores\\bluemsx_libretro.dll',
  dos: 'cores\\dosbox_pure_libretro.dll',
  scummvm: 'cores\\scummvm_libretro.dll',
  atari800: 'cores\\atari800_libretro.dll',
  atarist: 'cores\\hatari_libretro.dll',
  amstradcpc: 'cores\\cap32_libretro.dll',
  zxspectrum: 'cores\\fuse_libretro.dll',
  colecovision: 'cores\\bluemsx_libretro.dll',
  intellivision: 'cores\\freeintv_libretro.dll',
  vectrex: 'cores\\vecx_libretro.dll',
  '3do': 'cores\\opera_libretro.dll',
  pcfx: 'cores\\mednafen_pcfx_libretro.dll',
  pokemini: 'cores\\pokemini_libretro.dll',
  pico8: 'cores\\pico8_libretro.dll',
  tic80: 'cores\\tic80_libretro.dll',
  supervision: 'cores\\potator_libretro.dll',
  wasm4: 'cores\\wasm4_libretro.dll',
  arduboy: 'cores\\arduous_libretro.dll',
  vic20: 'cores\\vice_xvic_libretro.dll',
  c128: 'cores\\vice_x128_libretro.dll',
  cplus4: 'cores\\vice_xplus4_libretro.dll',
  x68000: 'cores\\px68k_libretro.dll',
  pc98: 'cores\\np2kai_libretro.dll',
  atomiswave: 'cores\\flycast_libretro.dll',
  naomi: 'cores\\flycast_libretro.dll',
  'snes-msu1': 'cores\\snes9x_libretro.dll',
  fds: 'cores\\fceumm_libretro.dll',
  sgb: 'cores\\mgba_libretro.dll',
  n64dd: 'cores\\mupen64plus_next_libretro.dll'
}

const skip = new Set([
  'imageviewer', 'moonlight', 'windows', 'prboom', 'tyrquake', 'mrboom', 'sonicretro',
  'cannonball', 'lutro', 'easyrpg', 'solarus', 'openbor', 'vpinball', 'fpinball',
  'teknoparrot', 'pcarcade', 'chihiro', 'model2', 'model3', 'flatpak', 'steam', 'ports',
  'windows_installers', 'amazon', 'epic', 'gog', 'humble', 'itchio', 'plugnplay',
  'ecwolf', 'hurrican', 'eduke32', 'raze', 'dxx-rebirth', 'abuse', 'cdogs', 'devilutionx',
  'fallout1-ce', 'fallout2-ce', 'thextech', 'xash3d_fwgs', 'corsixth', 'cgenius',
  'openjazz', 'openlara', 'reminiscence', 'cavestory', 'library', 'mugen', 'ikemen',
  'flash', 'quake', 'quake2', 'j2me', 'zc210', 'vemulator', 'tyrian', 'hcl', 'fury',
  'traider', 'rtcw', 'etlegacy', 'sonic3-air', 'sonic-mania', 'uqm', 'rott',
  'commanderx16', 'catacomb', 'lindbergh', 'jknight', 'mohaa', 'bennugd', 'superbroswar',
  'segaai', 'beena', 'doom3', 'vitaquake2', 'bomberman', 'ecwolf'
])

const extraSs = {
  fds: 106, n64dd: 122, sgb: 127, ps1: 57, gamecube: 13, neogeopocket: 25, segacd: 20,
  genesis: 1, lynx: 28, jaguar: 27, dos: 135, mame: 75, fbneo: 75, cps1: 6, cps2: 7, cps3: 8,
  neogeomvs: 68, megadrive: 1, psx: 57, gc: 13, ngp: 25, ngpc: 82, megacd: 20,
  atarijaguar: 27, atarilynx: 28, supervision: 207, watara: 207, snes: 4, nes: 3,
  'snes-msu1': 210, switch: 225, wiiu: 18, wii: 16, n64: 14, nds: 15, gb: 9, gbc: 10,
  gba: 12, virtualboy: 11, ps2: 58, ps3: 59, psp: 61, psvita: 62, xbox: 32, xbox360: 33,
  mastersystem: 2, sega32x: 19, saturn: 22, dreamcast: 23, gamegear: 21, sg1000: 109,
  arcade: 75, pcengine: 31, supergrafx: 105, wonderswan: 45, wonderswancolor: 46,
  atari2600: 26, atari5200: 40, atari7800: 41, amiga: 64, c64: 66, '3ds': 17, n3ds: 17,
  neogeocd: 70, neogeo: 142, scummvm: 123, msx: 113, msx1: 113, msx2: 116, jaguarcd: 171,
  atarijaguarcd: 171, c16: 99, cplus4: 99, amiga1200: 64, amigacd32: 130, amigacdtv: 129,
  gbc2players: 10, gb2players: 9, wswanc: 46, tic80: 222, vircon32: 272,
  odyssey2: 104, videopac: 104, zx81: 77, thomson: 141, cassettevision: 300, megaduck: 90,
  gamate: 266, vsmile: 120, bbcmicro: 37, bbc: 37, gmaster: 103, coco: 144, vc4000: 281,
  samcoupe: 213, macintosh: 146, gp32: 101, spectravideo: 218, ps4: 60, loopy: 98,
  oricatmos: 131, oric: 131, c20: 73, vic20: 73, actionmax: 81, channelf: 80, daphne: 49,
  naomi: 56, atomiswave: 53, pcfx: 72, pokemini: 211, satellaview: 107, sufami: 108,
  pico8: 234, '3do': 29, pcenginecd: 114, gx4000: 87, zxspectrum: 76, amstradcpc: 65,
  apple2: 86, apple2gs: 217, atari800: 43, atarist: 42, colecovision: 48, intellivision: 115,
  vectrex: 102, fmtowns: 253, cdi: 133, fm7: 97, pv1000: 74, gamecom: 121, advision: 78,
  arcadia: 94, crvision: 241, arduboy: 263, camplynx: 88, gamepock: 95, wasm4: 262,
  palm: 219, pet: 240, atom: 36, electron: 85, ngage: 30, astrocade: 44, archimedes: 84,
  adam: 89, bk: 93, x1: 220, x68000: 79, pc88: 221, pc98: 208, lowresnx: 244, scv: 67,
  multivision: 109, dragon32: 91, 'trs-80': 144, uzebox: 216, hikaru: 75, gaelco: 194,
  cave3rd: 75, namco22: 156, vis: 144, socrates: 75
}

function getSsId(id) {
  if (extraSs[id] != null) return extraSs[id]
  if (strToSs[id] != null) return strToSs[id]
  return null
}

function normExts(extCsv) {
  const skipExt = new Set(['squashfs', 'pcf', 'desktop', 'appimage', 'flatpak'])
  const out = []
  for (const raw of String(extCsv || '').split(',')) {
    let e = raw.trim().toLowerCase()
    if (!e || skipExt.has(e)) continue
    if (!e.startsWith('.')) e = '.' + e
    if (!out.includes(e)) out.push(e)
  }
  return out
}

const seen = new Set()
const list = []

list.push({
  id: 'pc',
  name: 'PC',
  family: 'PC',
  extensions: ['.exe', '.lnk', '.bat', '.cmd', '.url'],
  pathHints: ['pc games', 'steam', 'epic']
})
seen.add('pc')

for (const s of systems) {
  const bid = String(s.id)
  if (skip.has(bid)) continue
  const appId = batoceraToAppId[bid] || bid
  if (seen.has(appId)) continue

  const extensions = normExts(s.extensions)
  // ScummVM usa extensão .scummvm (e squashfs filtrado)
  if (!extensions.length && bid !== 'scummvm') continue
  if (bid === 'scummvm' && !extensions.includes('.scummvm')) extensions.push('.scummvm')
  if (!extensions.length) continue

  let screenscraperId = getSsId(appId)
  if (screenscraperId == null) screenscraperId = getSsId(bid)

  let family = s.manufacturer ? String(s.manufacturer) : 'Outros'
  if (family === 'Misc' || family === 'Ports' || family === 'LucasArts') {
    if (bid === 'scummvm') family = 'PC'
    else if (family === 'Misc') family = 'Outros'
  }

  const pathHints = [...new Set([appId, bid, s.name ? String(s.name).toLowerCase() : null].filter(Boolean))]
  const item = {
    id: appId,
    name: s.name ? String(s.name) : appId,
    family,
    extensions,
    pathHints
  }
  if (defaultCores[appId]) item.defaultCore = defaultCores[appId]
  if (screenscraperId != null) item.screenscraperId = screenscraperId

  list.push(item)
  seen.add(appId)
}

// Garantir plataformas clássicas do app (aliases Batocera / gaps)
const ensure = [
  {
    id: 'genesis',
    name: 'Mega Drive / Genesis',
    family: 'Sega',
    extensions: ['.md', '.gen', '.smd', '.bin', '.zip', '.7z'],
    defaultCore: 'cores\\genesis_plus_gx_libretro.dll',
    screenscraperId: 1,
    pathHints: ['genesis', 'megadrive', 'mega drive']
  },
  {
    id: 'arcade',
    name: 'Arcade (MAME)',
    family: 'Arcade',
    extensions: ['.zip', '.7z'],
    defaultCore: 'cores\\mame_libretro.dll',
    screenscraperId: 75,
    pathHints: ['arcade', 'mame', 'fbneo']
  },
  {
    id: 'amiga',
    name: 'Amiga',
    family: 'Commodore',
    extensions: ['.adf', '.ipf', '.lha', '.hdf', '.zip', '.7z'],
    defaultCore: 'cores\\puae_libretro.dll',
    screenscraperId: 64,
    pathHints: ['amiga', 'amiga500']
  },
  {
    id: 'msx',
    name: 'MSX',
    family: 'Microsoft',
    extensions: ['.rom', '.mx1', '.mx2', '.dsk', '.zip', '.7z'],
    defaultCore: 'cores\\bluemsx_libretro.dll',
    screenscraperId: 113,
    pathHints: ['msx', 'msx1']
  },
  {
    id: 'wonderswan',
    name: 'WonderSwan',
    family: 'Bandai',
    extensions: ['.ws', '.zip', '.7z'],
    defaultCore: 'cores\\mednafen_wswan_libretro.dll',
    screenscraperId: 45,
    pathHints: ['wonderswan', 'wswan']
  },
  {
    id: 'wonderswancolor',
    name: 'WonderSwan Color',
    family: 'Bandai',
    extensions: ['.wsc', '.zip', '.7z'],
    defaultCore: 'cores\\mednafen_wswan_libretro.dll',
    screenscraperId: 46,
    pathHints: ['wonderswan color', 'wswanc']
  },
  {
    id: 'scummvm',
    name: 'ScummVM',
    family: 'PC',
    extensions: ['.scummvm'],
    defaultCore: 'cores\\scummvm_libretro.dll',
    screenscraperId: 123,
    pathHints: ['scummvm']
  },
  {
    id: 'switch',
    name: 'Nintendo Switch',
    family: 'Nintendo',
    extensions: ['.xci', '.nsp', '.nca', '.nro'],
    screenscraperId: 225,
    pathHints: ['switch', 'yuzu', 'ryujinx']
  }
]

for (const p of ensure) {
  if (!seen.has(p.id)) {
    list.push(p)
    seen.add(p.id)
  }
}

if (!seen.has('dos')) {
  list.push({
    id: 'dos',
    name: 'DOS',
    family: 'PC',
    extensions: ['.exe', '.com', '.bat'],
    screenscraperId: 135,
    defaultCore: 'cores\\dosbox_pure_libretro.dll',
    pathHints: ['dos', 'dosbox', 'ms-dos']
  })
  seen.add('dos')
}

list.push({
  id: 'other',
  name: 'Outros',
  family: 'Outros',
  extensions: [],
  pathHints: []
})

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")

let out = `import type { PlatformDef } from './types'\n\n`
out += `/** Plataformas com ROMs/ISOs - Batocera es_systems + ScreenScraper IDs */\n`
out += `export const PLATFORMS: PlatformDef[] = [\n`

for (const p of list) {
  out += `  {\n`
  out += `    id: '${esc(p.id)}',\n`
  out += `    name: '${esc(p.name)}',\n`
  out += `    family: '${esc(p.family)}',\n`
  out += `    extensions: [${(p.extensions || []).map((e) => `'${esc(e)}'`).join(', ')}],\n`
  if (p.defaultCore) out += `    defaultCore: '${esc(p.defaultCore)}',\n`
  if (p.screenscraperId != null) out += `    screenscraperId: ${p.screenscraperId},\n`
  out += `    pathHints: [${(p.pathHints || []).map((h) => `'${esc(h)}'`).join(', ')}]\n`
  out += `  },\n`
}
out += `]\n\n`

const extMap = {}
for (const p of list) {
  if (p.id === 'pc' || p.id === 'other' || p.id === 'dos') continue
  for (const e of p.extensions || []) {
    if (!extMap[e]) extMap[e] = []
    extMap[e].push(p.id)
  }
}

out += `/** Extensões únicas (só uma plataforma) — prioridade na detecção */\n`
out += `const UNIQUE_EXT_PLATFORM: Record<string, string> = {\n`
for (const e of Object.keys(extMap).sort()) {
  if (extMap[e].length === 1) out += `  '${esc(e)}': '${esc(extMap[e][0])}',\n`
}
out += `}\n\n`

out += `function hintScore(filePath: string, platform: PlatformDef): number {
  const lower = filePath.toLowerCase().replace(/\\//g, '\\\\')
  let score = 0
  for (const hint of platform.pathHints ?? []) {
    if (lower.includes(hint.toLowerCase())) score += hint.length
  }
  return score
}

export function detectPlatform(filePath: string): string {
  const lower = filePath.toLowerCase()
  const ext = lower.slice(lower.lastIndexOf('.'))

  if (['.lnk', '.url'].includes(ext)) return 'pc'
  if (['.exe', '.bat', '.cmd'].includes(ext)) {
    const dos = PLATFORMS.find((p) => p.id === 'dos')
    if (dos && hintScore(filePath, dos) > 0) return 'dos'
    return 'pc'
  }

  if (UNIQUE_EXT_PLATFORM[ext]) return UNIQUE_EXT_PLATFORM[ext]

  const ambiguous = ['.iso', '.bin', '.chd', '.cue', '.zip', '.7z', '.cso', '.img', '.ccd', '.mds', '.nrg', '.m3u']
  if (ambiguous.includes(ext)) {
    let best = 'other'
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
  const base = filePath.replace(/^.*[\\\\/]/, '')
  return base
    .replace(/\\.[^.]+$/, '')
    .replace(/\\(.*?\\)/g, '')
    .replace(/\\[.*?\\]/g, '')
    .replace(/[_]+/g, ' ')
    .replace(/\\s+/g, ' ')
    .trim()
}

export const ALL_EXTENSIONS = Array.from(new Set(PLATFORMS.flatMap((p) => p.extensions)))

export const PLATFORM_FAMILIES = Array.from(
  new Set(PLATFORMS.filter((p) => p.id !== 'other').map((p) => p.family))
)

export function getPlatform(id: string): PlatformDef | undefined {
  return PLATFORMS.find((p) => p.id === id)
}
`

fs.writeFileSync(path.join(root, 'src/shared/platforms.ts'), out)
const withSs = list.filter((p) => p.screenscraperId != null).length
console.log(JSON.stringify({ total: list.length, withScreenscraperId: withSs }, null, 2))

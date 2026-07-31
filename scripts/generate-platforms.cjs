/**
 * Gera catálogo de plataformas a partir do es_systems.yml do Batocera
 * + mapeamento ScreenScraper (Batocera ScreenScraper.cpp).
 */
const fs = require('fs')
const path = require('path')

const ymlPath =
  'C:/Users/PC/.cursor/projects/c-Users-PC-OneDrive-rea-de-Trabalho-Emulando-Ramos-Emulando-Ramos/agent-tools/1a5c01e7-25f3-4da2-9ee4-06529b6af7cd.txt'
const cppPath =
  'C:/Users/PC/.cursor/projects/c-Users-PC-OneDrive-rea-de-Trabalho-Emulando-Ramos-Emulando-Ramos/agent-tools/97e17ca0-e6de-4b8d-9a27-4d6a997d2ac2.txt'
const outJson = path.join(__dirname, '_platforms_raw.json')
const outTs = path.join(__dirname, '../src/shared/platforms-catalog.ts')

const yml = fs.readFileSync(ymlPath, 'utf8')
const cpp = fs.readFileSync(cppPath, 'utf8')

const systems = []
let cur = null
for (const line of yml.split(/\r?\n/)) {
  const sys = line.match(/^([a-z0-9][a-z0-9+_.-]*)\s*:\s*$/)
  if (sys) {
    if (cur) systems.push(cur)
    cur = {
      id: sys[1],
      name: sys[1],
      manufacturer: 'Other',
      hardware: 'console',
      extensions: []
    }
    continue
  }
  if (!cur) continue
  const name = line.match(/^\s+name:\s*(.+)$/)
  if (name) {
    cur.name = name[1].trim()
    continue
  }
  const man = line.match(/^\s+manufacturer:\s*(.+)$/)
  if (man) {
    cur.manufacturer = man[1].trim()
    continue
  }
  const hw = line.match(/^\s+hardware:\s*(.+)$/)
  if (hw) {
    cur.hardware = hw[1].trim()
    continue
  }
  const ext = line.match(/^\s+extensions:\s*\[(.*)\]\s*$/)
  if (ext) {
    cur.extensions = ext[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((e) => (e.startsWith('.') ? e.toLowerCase() : '.' + e.toLowerCase()))
  }
}
if (cur) systems.push(cur)

/** ScreenScraper IDs — pasta Batocera / aliases comuns */
const SS = {
  snes: 4,
  'snes-msu1': 210,
  snesmsu1: 210,
  nes: 3,
  famicom: 3,
  fds: 106,
  n64: 14,
  n64dd: 122,
  gamecube: 13,
  gc: 13,
  wii: 16,
  wiiu: 18,
  switch: 225,
  gb: 9,
  gbc: 10,
  gba: 12,
  nds: 15,
  '3ds': 17,
  n3ds: 17,
  virtualboy: 11,
  vb: 11,
  gameandwatch: 52,
  gw: 52,
  satellaview: 107,
  sufami: 108,
  pokemini: 211,
  sgb: 127,
  psx: 57,
  ps1: 57,
  playstation: 57,
  ps2: 58,
  ps3: 59,
  ps4: 60,
  psp: 61,
  psvita: 62,
  psv: 62,
  mastersystem: 2,
  sms: 2,
  megadrive: 1,
  genesis: 1,
  sega32x: 19,
  '32x': 19,
  segacd: 20,
  megacd: 20,
  saturn: 22,
  dreamcast: 23,
  gamegear: 21,
  sg1000: 109,
  pico: 250,
  xbox: 32,
  xbox360: 33,
  xboxone: 34,
  neogeo: 142,
  neogeocd: 70,
  ngp: 25,
  ngpc: 82,
  mame: 75,
  arcade: 75,
  fbneo: 75,
  naomi: 56,
  atomiswave: 53,
  model2: 54,
  model3: 55,
  daphne: 49,
  pcengine: 31,
  pce: 31,
  tg16: 31,
  pcenginecd: 114,
  pcecd: 114,
  tg16cd: 114,
  supergrafx: 105,
  pcfx: 72,
  wonderswan: 45,
  wswan: 45,
  wonderswancolor: 46,
  wswancolor: 46,
  atari2600: 26,
  atari5200: 40,
  atari7800: 41,
  jaguar: 27,
  jaguarcd: 171,
  lynx: 28,
  atarist: 42,
  atari800: 43,
  amiga: 64,
  amiga500: 64,
  amiga1200: 64,
  amigacd32: 130,
  amigacdtv: 129,
  c64: 66,
  c128: 66,
  c20: 73,
  vic20: 73,
  cplus4: 99,
  pet: 240,
  msx: 113,
  msx1: 113,
  msx2: 116,
  msx2plus: 117,
  msxturbor: 118,
  dos: 135,
  pc: 135,
  windows: 135,
  scummvm: 123,
  '3do': 29,
  colecovision: 48,
  intellivision: 115,
  vectrex: 102,
  odyssey2: 104,
  videopac: 104,
  zxspectrum: 76,
  zx81: 77,
  x68000: 79,
  channelf: 80,
  amstradcpc: 65,
  gx4000: 87,
  apple2: 86,
  apple2gs: 217,
  macintosh: 146,
  mac: 146,
  bbc: 37,
  bbcmicro: 37,
  electron: 85,
  adam: 89,
  arcadia: 94,
  supervision: 207,
  vsmile: 120,
  gamecom: 121,
  loopy: 98,
  pv1000: 74,
  megaduck: 90,
  gp32: 101,
  uzebox: 216,
  wasm4: 262,
  arduboy: 263,
  lowresnx: 244,
  vircon32: 272,
  gamate: 266,
  vc4000: 281,
  pico8: 234,
  tic80: 222,
  openbor: 214,
  easyrpg: 231,
  solarus: 223,
  fmntowns: 253,
  fmtowns: 253,
  fm7: 97,
  pc88: 221,
  pc98: 208,
  x1: 220,
  oric: 131,
  samcoupe: 213,
  palm: 219,
  moonlight: 138,
  teknoparrot: 269,
  cdi: 133,
  ngage: 30,
  actionmax: 81,
  adventurevision: 78,
  creativision: 241,
  gamemaster: 103,
  superaican: 100,
  gamepocket: 95,
  scv: 67,
  cassettevision: 300,
  archimedes: 84,
  atom: 36,
  trs80coco: 144,
  ti99: 205,
  dragon32: 91,
  spectravideo: 218,
  thomson: 141,
  to8: 141,
  visualpinball: 198,
  futurepinball: 199,
  lutro: 206,
  prboom: 135,
  cavestory: 135,
  naomi2: 230,
  hikaru: 0,
  triforce: 0,
  chihiro: 0
}

function slugify(id) {
  return String(id)
    .toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/\./g, '')
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const DEFAULT_CORES = {
  snes: 'cores\\snes9x_libretro.dll',
  nes: 'cores\\fceumm_libretro.dll',
  n64: 'cores\\mupen64plus_next_libretro.dll',
  gamecube: 'cores\\dolphin_libretro.dll',
  wii: 'cores\\dolphin_libretro.dll',
  gb: 'cores\\gambatte_libretro.dll',
  gbc: 'cores\\gambatte_libretro.dll',
  gba: 'cores\\mgba_libretro.dll',
  nds: 'cores\\melonds_libretro.dll',
  n3ds: 'cores\\citra_libretro.dll',
  '3ds': 'cores\\citra_libretro.dll',
  virtualboy: 'cores\\beetle_vb_libretro.dll',
  psx: 'cores\\pcsx_rearmed_libretro.dll',
  ps1: 'cores\\pcsx_rearmed_libretro.dll',
  ps2: 'cores\\pcsx2_libretro.dll',
  psp: 'cores\\ppsspp_libretro.dll',
  mastersystem: 'cores\\genesis_plus_gx_libretro.dll',
  megadrive: 'cores\\genesis_plus_gx_libretro.dll',
  genesis: 'cores\\genesis_plus_gx_libretro.dll',
  sega32x: 'cores\\picodrive_libretro.dll',
  segacd: 'cores\\genesis_plus_gx_libretro.dll',
  saturn: 'cores\\mednafen_saturn_libretro.dll',
  dreamcast: 'cores\\flycast_libretro.dll',
  gamegear: 'cores\\genesis_plus_gx_libretro.dll',
  sg1000: 'cores\\genesis_plus_gx_libretro.dll',
  neogeo: 'cores\\fbneo_libretro.dll',
  arcade: 'cores\\mame_libretro.dll',
  mame: 'cores\\mame_libretro.dll',
  fbneo: 'cores\\fbneo_libretro.dll',
  pcengine: 'cores\\mednafen_pce_fast_libretro.dll',
  pce: 'cores\\mednafen_pce_fast_libretro.dll',
  supergrafx: 'cores\\mednafen_supergrafx_libretro.dll',
  wonderswan: 'cores\\mednafen_wswan_libretro.dll',
  wonderswancolor: 'cores\\mednafen_wswan_libretro.dll',
  atari2600: 'cores\\stella_libretro.dll',
  atari5200: 'cores\\atari800_libretro.dll',
  atari7800: 'cores\\prosystem_libretro.dll',
  jaguar: 'cores\\virtualjaguar_libretro.dll',
  lynx: 'cores\\handy_libretro.dll',
  amiga: 'cores\\puae_libretro.dll',
  amiga500: 'cores\\puae_libretro.dll',
  c64: 'cores\\vice_x64_libretro.dll',
  msx: 'cores\\bluemsx_libretro.dll',
  dos: 'cores\\dosbox_pure_libretro.dll',
  scummvm: 'cores\\scummvm_libretro.dll',
  '3do': 'cores\\opera_libretro.dll',
  colecovision: 'cores\\bluemsx_libretro.dll',
  intellivision: 'cores\\freeintv_libretro.dll',
  vectrex: 'cores\\vecx_libretro.dll',
  zxspectrum: 'cores\\fuse_libretro.dll',
  ngp: 'cores\\mednafen_ngp_libretro.dll',
  ngpc: 'cores\\mednafen_ngp_libretro.dll',
  neogeocd: 'cores\\neocd_libretro.dll',
  pcenginecd: 'cores\\mednafen_pce_libretro.dll',
  pcecd: 'cores\\mednafen_pce_libretro.dll',
  fds: 'cores\\fceumm_libretro.dll',
  virtualboy: 'cores\\beetle_vb_libretro.dll',
  pico8: 'cores\\pico8_libretro.dll',
  tic80: 'cores\\tic80_libretro.dll'
}

const ARCHIVE_ONLY = new Set(['.zip', '.7z', '.squashfs', '.rar'])

function pickExtensions(exts) {
  const nonArchive = exts.filter((e) => !ARCHIVE_ONLY.has(e))
  // Arcade / MAME: keep zip
  if (nonArchive.length === 0) return exts.slice(0, 8)
  return [...nonArchive, ...exts.filter((e) => ARCHIVE_ONLY.has(e)).slice(0, 2)].slice(0, 24)
}

const filtered = systems.filter((s) => s.extensions.length > 0)

const mapped = filtered.map((s) => {
  const id = slugify(s.id)
  const ss =
    SS[s.id] ??
    SS[id] ??
    SS[s.id.replace(/-/g, '')] ??
    SS[id.replace(/-/g, '')] ??
    null
  return {
    id,
    folderId: s.id,
    name: s.name,
    family: s.manufacturer || 'Other',
    hardware: s.hardware || 'console',
    extensions: pickExtensions(s.extensions),
    screenscraperId: ss,
    defaultCore: DEFAULT_CORES[id] || DEFAULT_CORES[s.id] || undefined,
    pathHints: [s.id, s.name.toLowerCase()].filter(Boolean)
  }
})

// Dedup by id
const byId = new Map()
for (const p of mapped) {
  const prev = byId.get(p.id)
  if (!prev || (p.screenscraperId && !prev.screenscraperId)) byId.set(p.id, p)
  else if (!prev) byId.set(p.id, p)
}
let unique = [...byId.values()]

// Ensure PC launcher platform exists first
unique = unique.filter((p) => p.id !== 'pc' && p.id !== 'windows')
unique.unshift({
  id: 'pc',
  folderId: 'pc',
  name: 'PC',
  family: 'PC',
  hardware: 'computer',
  extensions: ['.exe', '.lnk', '.bat', '.cmd', '.url'],
  screenscraperId: 135,
  pathHints: ['pc games', 'windows']
})
unique.push({
  id: 'other',
  folderId: 'other',
  name: 'Outros',
  family: 'Outros',
  hardware: 'console',
  extensions: [],
  screenscraperId: null,
  pathHints: []
})

fs.writeFileSync(outJson, JSON.stringify(unique, null, 2))

function esc(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

const lines = []
lines.push(`/** Auto-gerado a partir do catálogo Batocera + IDs ScreenScraper. */`)
lines.push(`import type { PlatformDef } from './types'`)
lines.push(``)
lines.push(`export const PLATFORM_CATALOG: PlatformDef[] = [`)
for (const p of unique) {
  const parts = [
    `  {`,
    `    id: '${esc(p.id)}',`,
    `    name: '${esc(p.name)}',`,
    `    family: '${esc(p.family)}',`,
    `    extensions: [${p.extensions.map((e) => `'${esc(e)}'`).join(', ')}],`
  ]
  if (p.screenscraperId != null) parts.push(`    screenscraperId: ${p.screenscraperId},`)
  if (p.defaultCore) parts.push(`    defaultCore: '${esc(p.defaultCore)}',`)
  if (p.pathHints?.length) {
    parts.push(`    pathHints: [${p.pathHints.map((h) => `'${esc(h)}'`).join(', ')}],`)
  }
  parts.push(`  },`)
  lines.push(parts.join('\n'))
}
lines.push(`]`)
lines.push(``)
lines.push(`export const SS_SYSTEM_IDS: Record<string, number> = Object.fromEntries(`)
lines.push(`  PLATFORM_CATALOG.filter((p) => p.screenscraperId != null).map((p) => [p.id, p.screenscraperId as number])`)
lines.push(`)`)
lines.push(``)

fs.writeFileSync(outTs, lines.join('\n'))
console.log('systems:', unique.length)
console.log('with screenscraperId:', unique.filter((p) => p.screenscraperId != null).length)
console.log('wrote', outTs)

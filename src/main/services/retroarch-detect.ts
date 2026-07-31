/**
 * Auto-detect RetroArch on common Windows paths and seed emulator rows
 * for platforms with defaultCore that have no config, or whose executable
 * path no longer exists on disk (does not overwrite a working custom path).
 */
import { existsSync } from 'fs'
import { join } from 'path'
import { PLATFORMS } from '../../shared/platforms'
import { getEmulator, setEmulator } from '../db/database'

const DEFAULT_ARGS = '-L {core} "{rom}"'
const PREFERRED_EXE = 'C:\\RetroArch-Win64\\retroarch.exe'

function candidatePaths(): string[] {
  const pf = process.env['ProgramFiles'] ?? 'C:\\Program Files'
  const pf86 = process.env['ProgramFiles(x86)'] ?? 'C:\\Program Files (x86)'
  const local = process.env.LOCALAPPDATA ?? ''
  const home = process.env.USERPROFILE ?? ''
  const appData = process.env.APPDATA ?? ''

  return [
    // Preferred install (user-provided)
    PREFERRED_EXE,
    'C:\\RetroArch-Win64\\RetroArch.exe',
    join(pf, 'RetroArch', 'retroarch.exe'),
    join(pf86, 'RetroArch', 'retroarch.exe'),
    join(local, 'Programs', 'RetroArch', 'retroarch.exe'),
    join(appData, 'RetroArch', 'retroarch.exe'),
    join(home, 'RetroArch', 'retroarch.exe'),
    join(home, 'Desktop', 'RetroArch', 'retroarch.exe'),
    join(home, 'Documents', 'RetroArch', 'retroarch.exe'),
    join(home, 'scoop', 'apps', 'retroarch', 'current', 'retroarch.exe'),
    'C:\\RetroArch\\retroarch.exe',
    'D:\\RetroArch\\retroarch.exe',
    'E:\\RetroArch\\retroarch.exe',
    'C:\\Emulators\\RetroArch\\retroarch.exe',
    'D:\\Emulators\\RetroArch\\retroarch.exe',
    'E:\\Emulators\\RetroArch\\retroarch.exe',
    join(pf86, 'Steam', 'steamapps', 'common', 'RetroArch', 'retroarch.exe'),
    join(pf, 'Steam', 'steamapps', 'common', 'RetroArch', 'retroarch.exe'),
    join(local, 'Steam', 'steamapps', 'common', 'RetroArch', 'retroarch.exe')
  ]
}

export function findRetroArchExecutable(): string | null {
  for (const p of candidatePaths()) {
    if (p && existsSync(p)) return p
  }
  return null
}

/** Seed SQLite emulator configs for platforms with defaultCore (empty / broken exe only). */
export function seedRetroArchDefaults(): { path: string; seeded: number } | null {
  const exe = findRetroArchExecutable()
  if (!exe) return null

  let seeded = 0
  for (const p of PLATFORMS) {
    if (p.id === 'pc' || p.id === 'other') continue
    if (!p.defaultCore) continue
    const existing = getEmulator(p.id)
    if (existing?.executable && existsSync(existing.executable)) continue
    setEmulator(p.id, exe, DEFAULT_ARGS, p.defaultCore)
    seeded++
  }

  if (seeded > 0) {
    console.log(`[boot] RetroArch em ${exe} — ${seeded} plataforma(s) configuradas`)
  } else {
    console.log(`[boot] RetroArch em ${exe} — nenhuma plataforma nova (já configuradas)`)
  }
  return { path: exe, seeded }
}

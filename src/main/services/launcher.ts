/**
 * Launcher fire-and-forget: nunca bloqueia o processo principal do Electron.
 * cwd = pasta do emulador (cores relativos do RetroArch funcionam).
 */
import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { dirname, isAbsolute, join } from 'path'
import { shell } from 'electron'
import { getEmulator, markPlayed } from '../db/database'
import { PLATFORMS } from '../../shared/platforms'
import type { Game, LaunchResult } from '../../shared/types'

function expandArgs(template: string, rom: string, core?: string): string[] {
  const expanded = template.split('{rom}').join(rom).split('{core}').join(core ?? '')
  return (
    expanded
      .match(/(?:[^\s"]+|"[^"]*")+/g)
      ?.map((t: string) => t.replace(/^"|"$/g, ''))
      .filter((t: string) => t.length > 0) ?? []
  )
}

function resolveCorePath(emulatorExe: string, core?: string): string | undefined {
  if (!core) return undefined
  if (isAbsolute(core)) return existsSync(core) ? core : core
  const relative = join(dirname(emulatorExe), core)
  return relative
}

/** Dispara processo totalmente desacoplado do Electron (Windows-safe). */
function spawnDetached(executable: string, args: string[], cwd: string): void {
  const child = spawn(executable, args, {
    cwd,
    detached: true,
    stdio: 'ignore',
    windowsHide: false,
    shell: false,
    env: process.env
  })

  child.on('error', (err) => {
    console.error('[launch] erro ao spawnar:', executable, err)
  })

  // Impede o Electron de esperar o filho
  child.unref()
}

export async function launchGame(game: Game): Promise<LaunchResult> {
  if (!existsSync(game.filePath)) {
    return { ok: false, message: `Arquivo não encontrado: ${game.filePath}` }
  }

  // PC: shell.openPath não prende o main process
  if (game.platform === 'pc') {
    try {
      const errMsg = await shell.openPath(game.filePath)
      if (errMsg) {
        // fallback spawn
        spawnDetached(game.filePath, [], dirname(game.filePath))
      }
      markPlayed(game.id)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: String(err) }
    }
  }

  const emu = getEmulator(game.platform)
  if (!emu) {
    const name = PLATFORMS.find((p) => p.id === game.platform)?.name ?? game.platform
    return {
      ok: false,
      message: `Nenhum emulador configurado para ${name}. Vá em Configurações e aponte o RetroArch (ou outro .exe).`
    }
  }

  if (!existsSync(emu.executable)) {
    return { ok: false, message: `Emulador não encontrado: ${emu.executable}` }
  }

  const platformDef = PLATFORMS.find((p) => p.id === game.platform)
  const core = resolveCorePath(emu.executable, emu.corePath ?? platformDef?.defaultCore)
  const args = expandArgs(emu.argsTemplate || '-L {core} "{rom}"', game.filePath, core)
  const cwd = dirname(emu.executable)

  try {
    // Retorna imediatamente — emulador roda fora do Electron
    spawnDetached(emu.executable, args, cwd)
    markPlayed(game.id)
    return { ok: true }
  } catch (err) {
    return { ok: false, message: String(err) }
  }
}

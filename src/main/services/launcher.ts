import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { getEmulator, markPlayed } from '../db/database'
import { PLATFORMS } from '../../shared/platforms'
import type { Game, LaunchResult } from '../../shared/types'

function expandArgs(template: string, rom: string, core?: string): string[] {
  return template
    .replaceAll('{rom}', rom)
    .replaceAll('{core}', core ?? '')
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    ?.map((t) => t.replace(/^"|"$/g, ''))
    .filter((t) => t.length > 0) ?? []
}

export async function launchGame(game: Game): Promise<LaunchResult> {
  if (!existsSync(game.filePath)) {
    return { ok: false, message: `Arquivo não encontrado: ${game.filePath}` }
  }

  // PC: executa o .exe / atalho diretamente
  if (game.platform === 'pc') {
    try {
      spawn(game.filePath, [], {
        detached: true,
        stdio: 'ignore',
        shell: true
      }).unref()
      markPlayed(game.id)
      return { ok: true }
    } catch (err) {
      return { ok: false, message: String(err) }
    }
  }

  const emu = getEmulator(game.platform)
  if (!emu) {
    return {
      ok: false,
      message: `Nenhum emulador configurado para ${game.platform}. Defina o caminho do RetroArch (ou outro) nas configurações.`
    }
  }

  if (!existsSync(emu.executable)) {
    return { ok: false, message: `Emulador não encontrado: ${emu.executable}` }
  }

  const platformDef = PLATFORMS.find((p) => p.id === game.platform)
  const core = emu.corePath ?? platformDef?.defaultCore
  const args = expandArgs(emu.argsTemplate || '-L {core} "{rom}"', game.filePath, core)

  try {
    spawn(emu.executable, args, {
      detached: true,
      stdio: 'ignore',
      shell: false
    }).unref()
    markPlayed(game.id)
    return { ok: true }
  } catch (err) {
    return { ok: false, message: String(err) }
  }
}

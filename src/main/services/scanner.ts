import { readdirSync, statSync } from 'fs'
import { join, extname } from 'path'
import { randomUUID } from 'crypto'
import { ALL_EXTENSIONS, detectPlatform, titleFromFilename } from '../../shared/platforms'
import { getGameByPath, upsertGame } from '../db/database'
import type { Game, ScanResult } from '../../shared/types'

function walk(dir: string, acc: string[] = []): string[] {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return acc
  }

  for (const name of entries) {
    const full = join(dir, name)
    let st
    try {
      st = statSync(full)
    } catch {
      continue
    }
    if (st.isDirectory()) {
      walk(full, acc)
    } else if (st.isFile()) {
      const ext = extname(full).toLowerCase()
      if (ALL_EXTENSIONS.includes(ext)) acc.push(full)
    }
  }
  return acc
}

export function scanFolder(root: string): ScanResult {
  const files = walk(root)
  let added = 0
  let skipped = 0
  const games: Game[] = []

  for (const filePath of files) {
    if (getGameByPath(filePath)) {
      skipped++
      continue
    }

    const game: Game = {
      id: randomUUID(),
      title: titleFromFilename(filePath),
      filePath,
      platform: detectPlatform(filePath),
      createdAt: new Date().toISOString()
    }
    upsertGame(game)
    games.push(game)
    added++
  }

  return { added, skipped, games }
}

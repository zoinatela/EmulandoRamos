import { app } from 'electron'
import { join } from 'path'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import type { Database, SqlJsStatic } from 'sql.js'
import type { EmulatorConfig, Game, PlatformId } from '../../shared/types'

let SQL: SqlJsStatic
let db: Database
let dbPath: string
let ready = false

export function isDbReady(): boolean {
  return ready
}

export async function initDatabase(): Promise<void> {
  const dataDir = join(app.getPath('userData'), 'data')
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
  dbPath = join(dataDir, 'library.sqlite')

  // sql.js é externalizado pelo electron-vite → require em runtime
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mod = require('sql.js') as ((opts?: object) => Promise<SqlJsStatic>) & {
    default?: (opts?: object) => Promise<SqlJsStatic>
  }
  const initSqlJs = mod.default ?? mod

  const wasmPath = join(process.cwd(), 'node_modules', 'sql.js', 'dist')
  SQL = await initSqlJs({
    locateFile: (file: string) => join(wasmPath, file)
  })

  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath)
    db = new SQL.Database(buffer)
  } else {
    db = new SQL.Database()
  }
  ready = true

  db.run(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      filePath TEXT NOT NULL UNIQUE,
      platform TEXT NOT NULL,
      coverUrl TEXT,
      synopsis TEXT,
      year INTEGER,
      developer TEXT,
      favorite INTEGER DEFAULT 0,
      lastPlayedAt TEXT,
      createdAt TEXT NOT NULL
    );
  `)

  db.run(`
    CREATE TABLE IF NOT EXISTS emulators (
      platform TEXT PRIMARY KEY,
      executable TEXT NOT NULL,
      argsTemplate TEXT NOT NULL,
      corePath TEXT
    );
  `)

  persist()
}

function persist(): void {
  const data = db.export()
  writeFileSync(dbPath, Buffer.from(data))
}

function rowToGame(row: Record<string, unknown>): Game {
  return {
    id: String(row.id),
    title: String(row.title),
    filePath: String(row.filePath),
    platform: row.platform as PlatformId,
    coverUrl: row.coverUrl ? String(row.coverUrl) : undefined,
    synopsis: row.synopsis ? String(row.synopsis) : undefined,
    year: row.year != null ? Number(row.year) : undefined,
    developer: row.developer ? String(row.developer) : undefined,
    favorite: Boolean(row.favorite),
    lastPlayedAt: row.lastPlayedAt ? String(row.lastPlayedAt) : undefined,
    createdAt: String(row.createdAt)
  }
}

export function listGames(platform: PlatformId | 'all', query: string): Game[] {
  if (!ready || !db) return []

  let sql = 'SELECT * FROM games WHERE 1=1'
  const params: (string | number)[] = []

  if (platform !== 'all') {
    sql += ' AND platform = ?'
    params.push(platform)
  }
  if (query.trim()) {
    sql += ' AND (title LIKE ? OR developer LIKE ?)'
    const q = `%${query.trim()}%`
    params.push(q, q)
  }
  sql += ' ORDER BY title COLLATE NOCASE ASC'

  const stmt = db.prepare(sql)
  stmt.bind(params)

  const games: Game[] = []
  while (stmt.step()) {
    games.push(rowToGame(stmt.getAsObject()))
  }
  stmt.free()
  return games
}

export function getGameById(id: string): Game | null {
  const stmt = db.prepare('SELECT * FROM games WHERE id = ?')
  stmt.bind([id])
  if (!stmt.step()) {
    stmt.free()
    return null
  }
  const game = rowToGame(stmt.getAsObject())
  stmt.free()
  return game
}

export function getGameByPath(filePath: string): Game | null {
  const stmt = db.prepare('SELECT * FROM games WHERE filePath = ?')
  stmt.bind([filePath])
  if (!stmt.step()) {
    stmt.free()
    return null
  }
  const game = rowToGame(stmt.getAsObject())
  stmt.free()
  return game
}

export function upsertGame(game: Game): void {
  db.run(
    `INSERT INTO games (id, title, filePath, platform, coverUrl, synopsis, year, developer, favorite, lastPlayedAt, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(filePath) DO UPDATE SET
       title=excluded.title,
       platform=excluded.platform,
       coverUrl=excluded.coverUrl,
       synopsis=excluded.synopsis,
       year=excluded.year,
       developer=excluded.developer,
       favorite=excluded.favorite,
       lastPlayedAt=excluded.lastPlayedAt`,
    [
      game.id,
      game.title,
      game.filePath,
      game.platform,
      game.coverUrl ?? null,
      game.synopsis ?? null,
      game.year ?? null,
      game.developer ?? null,
      game.favorite ? 1 : 0,
      game.lastPlayedAt ?? null,
      game.createdAt
    ]
  )
  persist()
}

export function markPlayed(id: string): void {
  db.run('UPDATE games SET lastPlayedAt = ? WHERE id = ?', [new Date().toISOString(), id])
  persist()
}

export function setFavorite(id: string, favorite: boolean): Game | null {
  if (!ready || !db) return null
  const game = getGameById(id)
  if (!game) return null
  db.run('UPDATE games SET favorite = ? WHERE id = ?', [favorite ? 1 : 0, id])
  persist()
  return { ...game, favorite }
}

function rowToEmulator(row: Record<string, unknown>): EmulatorConfig {
  return {
    platform: row.platform as PlatformId,
    executable: String(row.executable),
    argsTemplate: String(row.argsTemplate),
    corePath: row.corePath ? String(row.corePath) : undefined
  }
}

export function getEmulator(platform: PlatformId): EmulatorConfig | null {
  if (!ready || !db) return null
  const stmt = db.prepare('SELECT * FROM emulators WHERE platform = ?')
  stmt.bind([platform])
  if (!stmt.step()) {
    stmt.free()
    return null
  }
  const row = stmt.getAsObject()
  stmt.free()
  return rowToEmulator(row)
}

export function listEmulators(): EmulatorConfig[] {
  if (!ready || !db) return []
  const result: EmulatorConfig[] = []
  const stmt = db.prepare('SELECT * FROM emulators ORDER BY platform')
  while (stmt.step()) {
    result.push(rowToEmulator(stmt.getAsObject()))
  }
  stmt.free()
  return result
}

export function setEmulator(
  platform: PlatformId,
  executable: string,
  argsTemplate: string,
  corePath?: string
): void {
  db.run(
    `INSERT INTO emulators (platform, executable, argsTemplate, corePath)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(platform) DO UPDATE SET
       executable=excluded.executable,
       argsTemplate=excluded.argsTemplate,
       corePath=excluded.corePath`,
    [platform, executable, argsTemplate, corePath ?? null]
  )
  persist()
}

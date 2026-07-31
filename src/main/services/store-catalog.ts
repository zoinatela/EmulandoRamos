import { app } from 'electron'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { STORE_CATALOG } from '../../shared/store-catalog'
import type { StoreItem } from '../../shared/types'

function catalogPath(): string {
  return join(app.getPath('userData'), 'store-catalog.json')
}

function isStoreItem(value: unknown): value is StoreItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.description === 'string' &&
    typeof item.downloadUrl === 'string' &&
    typeof item.platform === 'string' &&
    typeof item.source === 'string' &&
    (item.coverUrl === undefined || typeof item.coverUrl === 'string')
  )
}

function normalizeItem(item: StoreItem): StoreItem {
  return {
    id: item.id.trim(),
    title: item.title.trim(),
    description: (item.description ?? '').trim(),
    downloadUrl: (item.downloadUrl ?? '').trim(),
    platform: item.platform.trim() || 'pc',
    coverUrl: item.coverUrl?.trim() || undefined,
    source: (item.source ?? '').trim() || 'meu-link'
  }
}

function writeCatalog(items: StoreItem[]): StoreItem[] {
  const normalized = items.map(normalizeItem)
  const file = catalogPath()
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(normalized, null, 2), 'utf-8')
  return normalized
}

/** Lê o catálogo do userData; na primeira vez grava o seed (placeholders). */
export function listCatalog(): StoreItem[] {
  const file = catalogPath()
  if (!existsSync(file)) {
    return writeCatalog(STORE_CATALOG.map((item) => ({ ...item })))
  }

  try {
    const raw = JSON.parse(readFileSync(file, 'utf-8')) as unknown
    if (!Array.isArray(raw)) {
      return writeCatalog(STORE_CATALOG.map((item) => ({ ...item })))
    }
    const items = raw.filter(isStoreItem).map(normalizeItem)
    return items
  } catch {
    return writeCatalog(STORE_CATALOG.map((item) => ({ ...item })))
  }
}

export function saveCatalog(items: StoreItem[]): StoreItem[] {
  if (!Array.isArray(items)) {
    throw new Error('Catálogo inválido')
  }
  const valid = items.filter(isStoreItem)
  return writeCatalog(valid)
}

export function upsertCatalogItem(item: StoreItem): StoreItem[] {
  if (!item || typeof item !== 'object') {
    throw new Error('Item inválido')
  }
  const next = normalizeItem(item)
  if (!next.id || !next.title) {
    throw new Error('Título e id são obrigatórios')
  }
  const items = listCatalog()
  const idx = items.findIndex((x) => x.id === next.id)
  if (idx >= 0) {
    items[idx] = next
  } else {
    items.push(next)
  }
  return writeCatalog(items)
}

export function removeCatalogItem(id: string): StoreItem[] {
  const target = id?.trim()
  if (!target) return listCatalog()
  const items = listCatalog().filter((item) => item.id !== target)
  return writeCatalog(items)
}

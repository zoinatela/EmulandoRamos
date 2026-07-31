/**
 * Downloader genérico e modular para a aba Loja.
 * Aceita URL direta de arquivo (.zip, .7z ainda não — use zip por enquanto).
 * Extração via extract-zip; fácil de estender para outros formatos.
 */
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { join, basename } from 'path'
import { pipeline } from 'stream/promises'
import { Readable } from 'stream'
import extract from 'extract-zip'
import type { DownloadResult } from '../../shared/types'

export type { DownloadResult }

export async function downloadAndExtract(
  url: string,
  destDir: string
): Promise<DownloadResult> {
  try {
    if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true })

    const res = await fetch(url)
    if (!res.ok || !res.body) {
      return { ok: false, message: `Falha no download: HTTP ${res.status}` }
    }

    const fileName = basename(new URL(url).pathname) || `download-${Date.now()}.zip`
    const archivePath = join(destDir, fileName)

    const nodeStream = Readable.fromWeb(res.body as import('stream/web').ReadableStream)
    await pipeline(nodeStream, createWriteStream(archivePath))

    if (fileName.toLowerCase().endsWith('.zip')) {
      const extractPath = join(destDir, fileName.replace(/\.zip$/i, ''))
      if (!existsSync(extractPath)) mkdirSync(extractPath, { recursive: true })
      await extract(archivePath, { dir: extractPath })
      return { ok: true, archivePath, extractPath }
    }

    return {
      ok: true,
      archivePath,
      message: 'Arquivo baixado (não é zip — extração ignorada).'
    }
  } catch (err) {
    return { ok: false, message: String(err) }
  }
}

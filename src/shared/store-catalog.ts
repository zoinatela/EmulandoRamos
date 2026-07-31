import type { StoreItem } from './types'

/**
 * Seed opcional da Loja — placeholders vazios / freeware genéricos.
 * O catálogo real do usuário fica em userData/store-catalog.json
 * e é gerenciado pela UI (adicionar / editar / remover links diretos).
 *
 * NÃO coloque links de ROMs comerciais ou conteúdo ilegal aqui.
 */
export const STORE_CATALOG: StoreItem[] = [
  {
    id: 'demo-freeware-1',
    title: 'Exemplo Freeware (placeholder)',
    description:
      'Item de demonstração. Substitua pela sua URL direta de download (freeware/homebrew).',
    downloadUrl: '',
    platform: 'pc',
    source: 'local-catalog'
  },
  {
    id: 'demo-homebrew-1',
    title: 'Exemplo Homebrew (placeholder)',
    description:
      'Outro placeholder. Use a Loja para adicionar seus próprios links diretos.',
    downloadUrl: '',
    platform: 'snes',
    source: 'local-catalog'
  }
]

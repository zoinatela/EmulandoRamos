import type { StoreItem } from './types'

/**
 * Catálogo da Loja — edite este arquivo para adicionar itens.
 *
 * Como adicionar um download:
 * 1. Copie um bloco do array abaixo.
 * 2. Preencha title, description, platform e source.
 * 3. Coloque em downloadUrl um link DIRETO para um arquivo (.zip preferencialmente)
 *    de freeware / homebrew / demos oficiais que você tenha permissão de baixar.
 *
 * NÃO coloque links de ROMs comerciais ou conteúdo pirateado.
 * URLs vazias (`''`) mostram o item, mas o botão Baixar avisa que falta a URL.
 */
export const STORE_CATALOG: StoreItem[] = [
  {
    id: 'demo-freeware-1',
    title: 'Exemplo Freeware (placeholder)',
    description:
      'Item de demonstração. Substitua downloadUrl por um link direto de freeware/homebrew.',
    // Ex.: 'https://exemplo.com/meujogo.zip'
    downloadUrl: '',
    platform: 'pc',
    source: 'local-catalog'
  },
  {
    id: 'demo-homebrew-1',
    title: 'Exemplo Homebrew (placeholder)',
    description:
      'Outro placeholder. Use para testar a UI; depois aponte para o seu próprio zip.',
    downloadUrl: '',
    platform: 'snes',
    source: 'local-catalog'
  }
]

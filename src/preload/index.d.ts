import type { api } from './index'

declare global {
  interface Window {
    emulando: typeof api
  }
}

export {}

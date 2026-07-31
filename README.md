# Emulando Ramos

Game launcher universal (PC + emuladores) com UI estilo Netflix.

## Stack

- Electron + Vite + React + TypeScript
- SQLite via `sql.js` (sem Visual Studio Build Tools)
- Scrapers: RAWG.io (PC) e ScreenScraper (ROMs)

## Setup rápido

```powershell
# Atualizar PATH da sessão (se node/npm não aparecerem)
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

npm.cmd install
copy .env.example .env
npm.cmd run dev
```

Preencha as chaves no arquivo `.env`.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | App em modo desenvolvimento |
| `npm run build` | Compila main/preload/renderer para `out/` |
| `npm run preview` | Preview do build Electron |
| `npm run dist` | Build + empacota instalador NSIS e portable (Windows) em `release/` |

### Empacotamento (uso pessoal)

```powershell
npm.cmd run build   # só compila
npm.cmd run dist    # compila e gera instalador + portable em release/
```

O `electron-builder` está configurado em `package.json` (`build.win`: nsis + portable). Ícone customizado é opcional — sem `build/icon.ico` o builder usa o padrão.

## Loja (catálogo)

Itens e URLs de download ficam em `src/shared/store-catalog.ts` (placeholders de freeware/homebrew). Não adicione links de ROMs comerciais.

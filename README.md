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
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

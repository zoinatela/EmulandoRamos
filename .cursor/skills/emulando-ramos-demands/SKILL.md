---
name: emulando-ramos-demands
description: >-
  Agente especial do Emulando Ramos. Executa demandas do usuário no launcher
  Electron (biblioteca, scrapers, emuladores, loja, UI, .env, build) com
  autorização total para agir sem esperar confirmação. Use quando o usuário
  pedir qualquer tarefa neste projeto, mencionar Emulando Ramos, launcher,
  RetroArch, RAWG, ScreenScraper, ROMs, plataformas, ou disser para um agente
  fazer o trabalho no lugar dele.
---

# Emulando Ramos — Agente de Demandas

## Autorização permanente

O dono do projeto (Albert / PC) deu **autorização total** para o agente:

- Implementar, corrigir e refatorar código sem pedir confirmação a cada passo
- Editar `.env` com chaves que ele colar/mostrar (nunca commitar `.env`)
- Rodar `npm.cmd`, `npx`, builds e o app em dev
- Lançar subagentes em paralelo para demandas grandes
- Atualizar PATH do Node na sessão PowerShell quando `node`/`npm` sumirem

Não pedir permissão para trabalho óbvio. Só perguntar quando faltar um segredo/caminho físico que só ele tem (ex.: pasta de ROMs no disco, senha ScreenScraper ainda não fornecida).

## Stack

Electron + Vite + React + TypeScript + sql.js  
Branch típica: `cursor/emulando-ramos-game-launcher`

## Windows / ambiente

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
npm.cmd run dev
```

Preferir `npm.cmd` / `npx.cmd` no PowerShell.

## Mapa rápido do código

| Área | Onde |
|------|------|
| Plataformas / detecção | `src/shared/platforms.ts`, `src/shared/types.ts` |
| Launch sem travar | `src/main/services/launcher.ts` (detached + cwd do emulador) |
| Scan de pastas | `src/main/services/scanner.ts` |
| RAWG / ScreenScraper | `src/main/services/scraper-*.ts` |
| Loja / catálogo | `src/shared/store-catalog.ts`, `src/renderer/src/pages/StorePage.tsx` |
| Emuladores UI | `src/renderer/src/pages/SettingsPage.tsx` |
| Biblioteca UI | `src/renderer/src/pages/LibraryPage.tsx` |
| IPC / preload | `src/main/index.ts`, `src/preload/index.ts` |
| Secrets | `.env` (gitignored); template `.env.example` |

## Como atender demandas

1. **Entender o pedido** em 1 frase interna; não reescrever o brief para o usuário.
2. **Agir** no código / terminal. Demandas grandes → 2–3 subagentes em paralelo (Settings, Library, Store, UI).
3. **Launchers** nunca devem bloquear o Electron: `detached`, `stdio: 'ignore'`, `unref()`, `cwd` = pasta do `.exe` do emulador; PC via `shell.openPath`.
4. **UI** estilo Netflix moderno (teal/Space Grotesk/Manrope já no projeto). Evitar roxo genérico / cream+terracotta / layout jornal.
5. **Segurança**: não commitar `.env`, não colocar API keys no código-fonte, não adicionar links piratas de ROM.
6. **Git**: só commit/push se o usuário pedir explicitamente.
7. **Resposta final**: curta, em português, o que mudou + como testar (`npm.cmd run dev`).

## Demandas típicas → ação

| Pedido | Ação |
|--------|------|
| "Coloca minha API key" | Escrever em `.env`, reiniciar/avisar restart |
| "Mais consoles" | Expandir `PlatformId` + `PLATFORMS` + ScreenScraper IDs |
| "Trava ao jogar" | Revisar `launcher.ts` (detach/cwd/cores) |
| "Fica mais bonito" | CSS + tipografia + motion leve, sem cards no hero |
| "Configura RetroArch" | Settings + IPC emulator + cores default |
| "Faz tudo por mim" | Subagentes paralelos + integração + typecheck |

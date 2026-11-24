# Development Guide

Practical instructions for running, testing and debugging the project.

## Repository structure

```
.
├── apps/
│   ├── api/                    Express backend
│   │   ├── src/server.ts       the whole API (exports `app`)
│   │   ├── src/server.test.ts  API tests (Vitest + Supertest)
│   │   ├── tsconfig.json       type checking (source + tests)
│   │   ├── tsconfig.build.json production build (src → dist)
│   │   └── eslint.config.js
│   └── web/                    React frontend
│       ├── src/App.tsx         starter page
│       ├── src/api.ts          functions that call the backend
│       ├── src/App.test.tsx    component tests (Vitest + React Testing Library)
│       ├── src/test/setup.ts   test setup (jest-dom matchers, cleanup)
│       ├── vite.config.ts      Vite, /api proxy and Vitest settings
│       └── eslint.config.js
├── e2e/                        Playwright tests
├── docs/                       requirements, architecture, this guide
├── .opencode/                  OpenCode agents and commands
├── AGENTS.md                   instructions for AI agents
├── opencode.jsonc              OpenCode configuration
├── playwright.config.ts
└── package.json                workspace root and shared scripts
```

## Requirements

- Node.js **22.18 or newer** (an LTS version is recommended) and npm.
- Git.

Check your versions:

```bash
node --version
npm --version
```

## Install

Run once from the repository root. It installs the dependencies of both apps:

```bash
npm install
```

The root `package.json` contains `"allowScripts": { "fsevents": false }`. Newer npm versions ask you to review which packages may run install scripts; `fsevents` (macOS file watching used by Vite) ships a prebuilt binary and needs no install step, so its script is explicitly denied. Older npm versions ignore this field.

To add a dependency to one app, run from the root:

```bash
npm install <package> -w apps/web
npm install -D <package> -w apps/api
```

## Run the application

```bash
npm run dev
```

This starts both apps together (output is prefixed with `[api]` and `[web]`):

- Frontend: http://localhost:5173
- Backend: http://localhost:3001 (try http://localhost:3001/api/version)

Both reload automatically when you save a file. Stop them with `Ctrl+C`.

Run only one app: `npm run dev -w apps/api` or `npm run dev -w apps/web`.

## Run the production build

```bash
npm run build
npm start
```

`npm start` runs the compiled API (`apps/api/dist/server.js`), which also serves the built frontend from `apps/web/dist`. Open http://localhost:3001: the whole app runs on one port, the same way it runs on a hosting platform. Set the port with `PORT` (hosting platforms do this for you) or `API_PORT`.

## How the frontend talks to the backend

1. The React code calls `fetch('/api/version')` with a relative URL.
2. The request goes to the Vite dev server on port 5173.
3. Vite's proxy (`server.proxy` in `apps/web/vite.config.ts`) forwards everything under `/api` to `http://localhost:3001`.
4. Express answers and Vite passes the response back to the browser.

Because the browser only talks to one origin, you do not need CORS. **Rule:** every backend route must start with `/api`.

In production there is no Vite: Express serves the frontend itself, so the same relative URLs reach the API directly.

## All scripts

Run from the repository root.

| Command | What it does |
| --- | --- |
| `npm run dev` | Start backend and frontend in development mode |
| `npm run build` | Type check and build both apps (`apps/*/dist`) |
| `npm start` | Run the production build: API + built frontend on one port |
| `npm run lint` | Run ESLint in both apps |
| `npm run typecheck` | Run TypeScript checks in both apps and `e2e/` |
| `npm run test` | Run Vitest unit tests in both apps |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run test:e2e:install` | Download the Chromium browser for Playwright (once) |
| `npm run verify` | lint + typecheck + test + build |

Per app: add `-w apps/web` or `-w apps/api`, for example `npm run test -w apps/api`.

Other app scripts: `npm run test:watch -w apps/web` (re-run tests on save), `npm run preview -w apps/web` (serve the built frontend), `npm run start -w apps/api` (run the built API from `dist/`).

## Unit tests (Vitest)

```bash
npm run test                        # both apps, once
npm run test -w apps/web            # frontend only
npm run test:watch -w apps/api      # backend, re-run on every save
```

- Test files live next to the code and end with `.test.ts` or `.test.tsx`.
- Backend example: `apps/api/src/server.test.ts` sends requests to the exported `app` with Supertest. No server is started.
- Frontend example: `apps/web/src/App.test.tsx` renders the component in a simulated browser (jsdom), replaces `fetch` with a mock and checks what the user sees.

To add a test, copy the structure of an existing test: `describe` → `it` → arrange, act, assert.

## End-to-end tests (Playwright)

Playwright opens a real browser and clicks through the running application.

```bash
npm run test:e2e:install   # once: downloads Chromium
npm run test:e2e
```

- `playwright.config.ts` starts the API and the frontend automatically and stops them afterwards. If `npm run dev` is already running, Playwright reuses those servers.
- On Linux you may also need system libraries: `npx playwright install --with-deps chromium`.
- After a run, open the HTML report with `npx playwright show-report`. Failed tests keep a trace (`test-results/`) that you can open in the report.
- Debug interactively: `npx playwright test --ui` or `npx playwright test --headed`.
- Tests live in `e2e/*.spec.ts`. Keep E2E tests for important user flows; test details with unit tests.

## Troubleshooting

### `npm install` fails

- Check `node --version`. Node.js older than 22.18 is not supported; install the current LTS.
- Run the command from the repository root (the folder with the root `package.json`).
- Delete installed files and try again:
  ```bash
  rm -rf node_modules apps/*/node_modules
  npm install
  ```
  On Windows (PowerShell): `Remove-Item -Recurse -Force node_modules, apps/web/node_modules, apps/api/node_modules`. The `apps/*/node_modules` folders may not exist; that is fine.
- Behind a company or university proxy, npm may need proxy settings (`npm config set proxy ...`).

### A port is already in use

Errors such as `EADDRINUSE: address already in use :::3001` or `Port 5173 is already in use` mean another program uses the port — often an old `npm run dev` in another terminal or a different project.

- Stop the other process (`Ctrl+C` in its terminal), or find it:
  ```bash
  # macOS / Linux
  lsof -i :3001
  # Windows (PowerShell)
  Get-NetTCPConnection -LocalPort 3001 | Select-Object OwningProcess
  ```
- Or use other ports. Set the same variables for `dev` and `test:e2e`:
  ```bash
  API_PORT=4001 WEB_PORT=5174 npm run dev
  ```
  PowerShell: `$env:API_PORT=4001; $env:WEB_PORT=5174; npm run dev`

### The page says "Cannot reach the API"

- Is the backend running? Look for `[api] API server listening on http://localhost:3001` in the terminal. Start everything with `npm run dev`, not only the frontend.
- Open http://localhost:3001/api/version directly. If it fails, the problem is in the backend: read the `[api]` output.
- If the backend works but the page does not, check that your route starts with `/api` and that the frontend uses a relative URL (`/api/...`, not `http://localhost:3001/...`).
- Open the browser DevTools → Network tab and inspect the failing request (status code and response).

### Changes do not appear

- Frontend changes appear on save. Try a hard reload (`Ctrl+Shift+R` / `Cmd+Shift+R`).
- After changing `vite.config.ts`, `package.json` or installing a package, restart `npm run dev`.

### Tests fail

- Read the first error message: it shows the expected and the actual value.
- Run one app or one file: `npm run test -w apps/web -- App.test.tsx`.
- Use watch mode while fixing: `npm run test:watch -w apps/web`.
- A frontend test cannot find an element: use `await screen.findBy...` for content that appears after a request, and check the exact text or role.

### Playwright fails

- `Executable doesn't exist` → run `npm run test:e2e:install`.
- `Timed out waiting ... from config.webServer` → a server did not start. Run `npm run dev` and read the errors, and check that no other project is using ports 3001/5173.
- Tests run against the wrong application → another project's server is running on the same port and Playwright reused it. Stop it, or use different ports (see above).

### Type or lint errors

- `npm run typecheck` and `npm run lint` print the file and line. Fix the first error first; later ones are often caused by it.
- Backend import errors (`Cannot find module './routes'`): relative imports in `apps/api` need the `.ts` extension, e.g. `./routes.ts`.

### OpenCode cannot use a model

- Run `/connect` and check that a provider is connected, then pick a model with `/models`.
- `Model unavailable` or a payment request: the free model was removed, is not available in your region, or is no longer free. Pick another one.
- Check `opencode --version` and your internet connection.
- Logs: `~/.local/share/opencode/log/opencode.log`.

### A free model hit its limit

- Wait (limits are often daily) or switch to another free model with `/models`.
- Save requests: start a new session (`/new`) for each task, write specific prompts, attach only the files that matter (`@file`).

### The agent wrote broken or incomplete code

This is normal. Run the checks, give the agent the **exact** error, make the step smaller, undo with `/undo` or `git restore .`, start a fresh session with `/new`, or try another model. More tips: [docs/guide/06-build-the-mvp.md](guide/06-build-the-mvp.md#64-when-the-agent-gets-stuck).

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express, { type Express } from 'express';

interface PackageInfo {
  name: string;
  version: string;
}

// Read the name and version from apps/api/package.json.
// The relative URL works both from src/ (development) and dist/ (production build).
const packageInfo = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as PackageInfo;

// The Express app is exported so tests can call it without opening a network port.
export const app = express();

// Parse JSON request bodies (needed as soon as you add POST/PUT endpoints).
app.use(express.json());

app.get('/api/version', (_request, response) => {
  response.json({ name: packageInfo.name, version: packageInfo.version });
});

// Production: serve the built frontend (apps/web/dist) from Express, so the whole
// application runs as one service on one port. Unknown /api routes still return 404,
// every other GET request gets index.html (the React app decides what to show).
// In development Vite serves the frontend instead, so this is not used there.
export function serveFrontend(target: Express, distDir: string) {
  target.use(express.static(distDir));
  target.use((request, response, next) => {
    if (request.method !== 'GET' || request.path.startsWith('/api')) {
      next();
      return;
    }
    response.sendFile(path.join(distDir, 'index.html'));
  });
}

// Start the HTTP server only when this file is run directly
// (`npm run dev` / `npm start`), not when it is imported by tests.
if (import.meta.main) {
  // Hosting platforms usually pass the port in PORT. Locally API_PORT or 3001 is used.
  const port = Number(process.env.PORT) || Number(process.env.API_PORT) || 3001;

  // Serve the frontend only from the production build (`npm run build`, then `npm start`
  // runs dist/server.js). `npm run dev` runs src/server.ts and leaves the frontend to Vite.
  const runningBuild = path.basename(path.dirname(fileURLToPath(import.meta.url))) === 'dist';
  const webDist = fileURLToPath(new URL('../../web/dist', import.meta.url));
  if (runningBuild && existsSync(path.join(webDist, 'index.html'))) {
    serveFrontend(app, webDist);
    console.log(`Serving the frontend from ${webDist}`);
  }

  app.listen(port, (error) => {
    // Express 5 reports startup problems here, for example "port already in use".
    if (error) throw error;

    console.log(`API server listening on http://localhost:${port}`);
  });
}

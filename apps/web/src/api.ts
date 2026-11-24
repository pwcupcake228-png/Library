// Functions that call the backend live here. Add new API calls next to this one.

export interface VersionInfo {
  name: string;
  version: string;
}

export async function fetchVersion(signal?: AbortSignal): Promise<VersionInfo> {
  // A relative URL: in development Vite forwards /api/* to the Express server.
  const response = await fetch('/api/version', { signal });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as VersionInfo;
}

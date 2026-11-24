import { useEffect, useState } from 'react';
import { fetchVersion, type VersionInfo } from './api.ts';

type ApiStatus =
  | { state: 'loading' }
  | { state: 'connected'; info: VersionInfo }
  | { state: 'error'; message: string };

export default function App() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({ state: 'loading' });

  useEffect(() => {
    const controller = new AbortController();

    fetchVersion(controller.signal)
      .then((info) => setApiStatus({ state: 'connected', info }))
      .catch((error: unknown) => {
        // The request was cancelled because the component unmounted. Nothing to show.
        if (controller.signal.aborted) return;

        const message = error instanceof Error ? error.message : 'Unknown error';
        setApiStatus({ state: 'error', message });
      });

    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
          AI-Ready Full-Stack Starter
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Welcome! Your workspace is ready.</h1>
        <p className="mt-4 text-slate-600">
          This page only checks that everything is connected. Describe your own application in{' '}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm">docs/requirements.md</code>{' '}
          and build it step by step with OpenCode.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-medium text-slate-500">Frontend</h2>
            <p className="mt-1 font-semibold text-emerald-700">React is running</p>
          </li>

          <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-medium text-slate-500">Backend</h2>
            <div role="status" aria-live="polite" className="mt-1">
              {apiStatus.state === 'loading' && (
                <p className="font-semibold text-slate-500">Connecting to the API…</p>
              )}

              {apiStatus.state === 'connected' && (
                <p className="font-semibold text-emerald-700">
                  Connected to {apiStatus.info.name} v{apiStatus.info.version}
                </p>
              )}

              {apiStatus.state === 'error' && (
                <>
                  <p className="font-semibold text-red-700">Cannot reach the API</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Is the backend running? Start both apps with{' '}
                    <code className="rounded bg-slate-200 px-1 text-xs">npm run dev</code>.
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Details: {apiStatus.message}</p>
                </>
              )}
            </div>
          </li>
        </ul>
      </div>
    </main>
  );
}

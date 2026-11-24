import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App.tsx';

describe('App', () => {
  it('shows the backend version when the API responds', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ name: 'api', version: '1.2.3' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/welcome/i);
    expect(screen.getByRole('status')).toHaveTextContent('Connecting to the API…');
    expect(await screen.findByText('Connected to api v1.2.3')).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/version', expect.anything());
  });

  it('shows an error message when the API cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    render(<App />);

    expect(await screen.findByText('Cannot reach the API')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Failed to fetch');
  });
});

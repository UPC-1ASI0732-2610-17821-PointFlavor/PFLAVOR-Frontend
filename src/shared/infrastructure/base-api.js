import { BASE_ENDPOINT } from './base-endpoint';

export async function api(path, opts = {}) {
    const base = BASE_ENDPOINT();
    const url = `${base}${path}`;
    const method = (opts.method || 'GET').toUpperCase();
    console.info('[api]', method, url);

    const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
        ...opts
    });
    if (!res.ok) {
        const body = await res.text();
        console.error('[api]', method, url, res.status, res.statusText, body);
        throw new Error(`${res.status} ${res.statusText}`);
    }
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
}

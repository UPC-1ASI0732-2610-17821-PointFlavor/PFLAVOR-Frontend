import { BASE_ENDPOINT } from './base-endpoint';

export async function api(path, opts = {}) {
    const res = await fetch(`${BASE_ENDPOINT()}${path}`, {
        headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
        ...opts
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
}

// src/auth/application/get-session.query.js

const KEY = 'ps-session';
const LEGACY_KEY = 'ps-user';


export function getSession() {
    try {

        const raw = localStorage.getItem(KEY) ?? localStorage.getItem(LEGACY_KEY);
        if (!raw) return null;

        const data = JSON.parse(raw);
        if (data?.role) data.role = String(data.role).toLowerCase(); // normaliza
        return data;
    } catch {
        return null;
    }
}

export function setSession(partial) {
    const prev = getSession() || {};
    const next = { ...prev, ...partial };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
}

export function clearSession() {
    localStorage.removeItem(KEY);
    localStorage.removeItem(LEGACY_KEY);
}

export default { getSession, setSession, clearSession };

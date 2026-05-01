const STORAGE_KEY = 'ps-favorites';

function load() {
    if (typeof localStorage === 'undefined') return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function save(list) {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function getFavorites() {
    return load();
}

export function isFavorite(id) {
    const list = load();
    return list.some(h => Number(h.id) === Number(id));
}

export function toggleFavorite(huarique) {
    const list = load();
    const id = Number(huarique.id);
    const idx = list.findIndex(h => Number(h.id) === id);

    let updated;
    if (idx === -1) {
        const item = {
            id,
            name: huarique.name,
            category: huarique.category,
            district: huarique.district,
            address: huarique.address,
            imgUrl: huarique.imgUrl,
            price: huarique.price,
            rating: huarique.rating
        };
        updated = [...list, item];
    } else {
        updated = list.filter(h => Number(h.id) !== id);
    }

    save(updated);
    return updated;
}

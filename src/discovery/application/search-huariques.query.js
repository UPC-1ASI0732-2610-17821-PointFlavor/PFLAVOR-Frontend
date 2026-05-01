import { DiscoveryRepository } from '../infrastructure/discovery.repository.js';
export async function searchHuariquesQuery(q){
    const list = await DiscoveryRepository.search(q || '');
    return list.map(h => ({ id:h.id, name:h.name, category:h.category, price:h.price, rating:h.rating, district:h.district }));
}

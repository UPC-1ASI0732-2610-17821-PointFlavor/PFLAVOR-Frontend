import { PromosRepository } from '../infrastructure/promos.repository.js';
import { PromotionEntity } from '../domain/model/promotion.entity.js';

export const listPromosQuery = async () => {

    const all = await PromosRepository.list();

    const expired = (all || []).filter(p => {
        try {
            if (!p.startDate || !p.endDate) return false;
            const pe = new PromotionEntity(p);
            return pe.hasExpired();
        } catch (e) {
            return false;
        }
    });

    if (expired.length) {
        try {
            await Promise.all(expired.map(p => PromosRepository.delete(p.id)));
        } catch (e) {
            console.warn('Error eliminando promos expiradas:', e.message || e);
        }
    }

    return await PromosRepository.list();
};

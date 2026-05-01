import { PromotionsRepository } from '../infrastructure/promos.repository.js';
import { PromotionEntity } from '../domain/model/promotion.entity.js';

export async function listFeaturedPromotionsQuery(filters = {}) {
    try {
        const allPromos = await PromotionsRepository.list();

        const expired = (allPromos || []).filter(p => {
            try {
                const pe = new PromotionEntity(p);
                return pe.hasExpired();
            } catch (e) {
                return false;
            }
        });

        if (expired.length) {
            try {
                await Promise.all(expired.map(p => PromotionsRepository.delete(p.id)));
            } catch (err) {

                console.warn('No se pudieron eliminar promociones expiradas:', err.message || err);
            }
        }

        const freshPromos = await PromotionsRepository.list();

        const promotions = freshPromos
            .map(promo => new PromotionEntity(promo))
            .filter(promo => {

                if (!promo.featured) return false;

                if (promo.hasExpired()) {
                    return false;
                }

                if (!promo.isActive()) {
                    return false;
                }

                if (filters.huariqueId && promo.huariqueId !== filters.huariqueId) {
                    return false;
                }

                if (filters.ownerId && promo.ownerId !== filters.ownerId) {
                    return false;
                }

                return true;
            })
            .sort((a, b) => {

                return a.endDate - b.endDate;
            });

        return {
            total: promotions.length,
            promotions: promotions.map(promo => ({
                id: promo.id,
                title: promo.title,
                description: promo.description,
                huariqueId: promo.huariqueId,
                discount: promo.discount,
                daysRemaining: promo.getDaysRemaining(),
                maxUses: promo.maxUses,
                currentUses: promo.currentUses,
                usagePercentage: promo.getUsagePercentage(),
                featured: true,
                status: promo.getStatus()
            }))
        };

    } catch (error) {
        throw new Error(`Error al listar promociones: ${error.message}`);
    }
}

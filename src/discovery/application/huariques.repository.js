import { api } from '@/shared/infrastructure/base-api';

export const HuariquesRepository = {
    patch(id, patch) {
        return api(`/huariques/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(patch),
        });
    },
};

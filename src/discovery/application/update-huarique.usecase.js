import { DiscoveryRepository } from '../infrastructure/discovery.repository';

export async function updateHuarique(id, payload) {
    const repo = new DiscoveryRepository();
    return await repo.updateHuarique(id, payload);
}

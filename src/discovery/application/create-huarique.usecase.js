import { DiscoveryRepository } from '../infrastructure/discovery.repository';

export async function createHuarique(payload) {

    const repo = new DiscoveryRepository();
    return await repo.createHuarique(payload);
}

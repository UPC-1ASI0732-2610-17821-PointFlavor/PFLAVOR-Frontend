import { DiscoveryRepository } from '../infrastructure/discovery.repository.js';
export const listCategoriesQuery = () => DiscoveryRepository.listCategories();

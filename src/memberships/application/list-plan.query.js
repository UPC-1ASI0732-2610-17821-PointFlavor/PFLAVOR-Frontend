import { MembershipsRepository } from '../infrastructure/memberships.repository.js';
export const listPlansQuery = () => MembershipsRepository.list();

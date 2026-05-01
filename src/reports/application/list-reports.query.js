import { ReportsRepository } from '@/reports/infrastructure/reports.repository.js';

export function listReportsQuery({ sort = 'createdAt', order = 'desc' } = {}) {
    return ReportsRepository.list({ _sort: sort, _order: order });
}

import { ReportsRepository } from '@/reports/infrastructure/reports.repository.js';
import { HuariquesRepository } from '@/discovery/infrastructure/huariques.repository.js';

/**
 * Aplica la corrección del reporte al huarique y marca el reporte como "applied".
 * @param {Object} report - { id, huariqueId, field, suggestedValue, ... }
 */
export async function applyReportUseCase(report) {
    if (!report || report.id == null) throw new Error('id de reporte requerido');
    const huariqueId = Number(report.huariqueId);
    if (!huariqueId) throw new Error('huariqueId requerido');

    const { field, suggestedValue } = report;
    if (!field || typeof suggestedValue === 'undefined') {
        throw new Error('Campo/sugerencia incompletos');
    }

    await HuariquesRepository.patch(huariqueId, { [field]: suggestedValue });

    return ReportsRepository.patch(report.id, {
        status: 'applied',
        resolvedAt: new Date().toISOString(),
    });
}

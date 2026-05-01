import { Report } from '@/reports/domain/model/report.entity.js';
import { isValidField } from '@/reports/domain/model/report-field.vo.js';
import { ReportsRepository } from '@/reports/infrastructure/reports.repository.js';

/**
 * Crea un reporte (status=open).
 * input: { huariqueId, field, currentValue, suggestedValue, comment?, userId? }
 */
export async function createReportUseCase(input) {
    if (!input?.huariqueId) throw new Error('huariqueId requerido');
    if (!isValidField(input.field)) throw new Error('Campo inválido');
    if (!String(input.suggestedValue ?? '').trim()) throw new Error('Valor sugerido requerido');

    const report = new Report({
        ...input,
        huariqueId: Number(input.huariqueId),
        status: 'open',
        createdAt: new Date().toISOString(),
    });

    return ReportsRepository.create(report);
}

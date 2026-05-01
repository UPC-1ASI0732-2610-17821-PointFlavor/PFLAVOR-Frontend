/**
 * Caso de uso: Solicitar recuperación de contraseña
 */

import { AuthRepository } from '../infrastructure/auth.repository.js';
import { PasswordRecoveryService } from '../domain/services/password-recovery.service.js';

export async function requestPasswordRecoveryUseCase(email) {
    if (!email) {
        throw new Error('Email es requerido');
    }

    if (!PasswordRecoveryService.isValidEmail(email)) {
        throw new Error('Email inválido');
    }

    try {

        const user = await AuthRepository.findByEmail(email);

        if (!user) {

            return {
                success: true,
                message: 'Si la cuenta existe, recibirás instrucciones de recuperación'
            };
        }


        const token = PasswordRecoveryService.generateRecoveryToken(email);


        const emailData = PasswordRecoveryService.generateRecoveryEmail(email, token);

        console.log('Email de recuperación generado:', emailData);

        return {
            success: true,
            message: 'Instrucciones de recuperación enviadas',
            token // En desarrollo, retornar token para testing
        };

    } catch (error) {
        throw new Error(`Error en recuperación: ${error.message}`);
    }
}

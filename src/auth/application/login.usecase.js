import { AuthRepository } from '../infrastructure/auth.repository.js';
import { setSession } from './get-session.query.js';

export async function loginUseCase(email) {
    const user = await AuthRepository.login(email);
    if (!user) throw new Error('Usuario no encontrado');

    setSession({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || 'explorer'
    });

    return user;
}

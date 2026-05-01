import { AuthRepository } from '../infrastructure/auth.repository.js';
import { setSession } from './get-session.query.js';

export async function registerUseCase({ name, email }) {
    const created = await AuthRepository.register({ name, email });

    // Guarda la sesión igual que en el login
    setSession({
        id: created.id,
        email: created.email,
        name: created.name,
        role: created.role || 'explorer'
    });

    return created;
}

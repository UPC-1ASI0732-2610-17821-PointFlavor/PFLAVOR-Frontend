import { updateUserPreferencesByEmail } from '../infrastructure/preferences.repository';

export async function updatePreferencesUsecase(email, preferences) {
    return await updateUserPreferencesByEmail(email, preferences);
}

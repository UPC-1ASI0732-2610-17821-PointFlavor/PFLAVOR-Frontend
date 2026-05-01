import { getUserPreferencesByEmail } from '../infrastructure/preferences.repository';

export async function getPreferencesQuery(email) {
    return await getUserPreferencesByEmail(email);
}

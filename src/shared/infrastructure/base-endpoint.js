export const BASE_ENDPOINT = () => {
    const url = import.meta.env.VITE_API_URL || 'http://localhost:5048';
    return url.replace(/\/$/, '');
};

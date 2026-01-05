
const API_VERSION = 'api/v1';
export const DJANGO_API_URL = import.meta.env.VITE_DJANGO_API_URL || 'http://localhost:8001';
export const API_BASE_URL = `${DJANGO_API_URL}/${API_VERSION}`;


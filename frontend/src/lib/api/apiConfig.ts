const browserApiBaseUrl = typeof window !== 'undefined'
	? `${window.location.protocol}//${window.location.hostname}:8000/api`
	: 'http://localhost:8000/api';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || browserApiBaseUrl).replace(/\/$/, '');

export function resolveMediaUrl(url: string): string {
	if (/^https?:\/\//.test(url)) return url;
	return `${API_BASE_URL.replace(/\/api$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
}

export function extractResults<T>(data: T[] | { results?: T[] }): T[] {
	return Array.isArray(data) ? data : data.results || [];
}

export default API_BASE_URL;

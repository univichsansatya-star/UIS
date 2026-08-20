// News API
import API_BASE_URL, { extractResults } from './apiConfig';

export async function getNewsList(category?: string, search?: string) {
  try {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    const response = await fetch(`${API_BASE_URL}/berita/?${params.toString()}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return extractResults<any>(await response.json());
  } catch (error) {
    console.error('Error fetching news list:', error);
    return [];
  }
}

export async function getNewsBySlug(slug: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/berita/?slug=${encodeURIComponent(slug)}`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    return extractResults<any>(data)[0] || null;
  } catch (error) {
    console.error('Error fetching news:', error);
    return null;
  }
}
